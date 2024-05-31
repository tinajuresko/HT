import React, { useState, useEffect } from 'react';
import { getShipments, deleteShipment, updateShipment } from '../api/api';
import '../css/showdeliveries.css';
import EditDelivery from './EditDelivery';
import SearchBar from './SearchBar';

const Deliveries = ({ searchTerm }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = 4;
    const [totalPages, setTotalPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [currentShipment, setCurrentShipment] = useState(null);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const data = await getShipments();
                setDeliveries(data.data);
                const totalItems = data.totalCount;
                setTotalPages(Math.ceil(totalItems / pageSize));
            } catch (error) {
                console.error('Error fetching deliveries:', error);
            }
        };

        fetchDeliveries();
    }, []);

    // Reset pagination when searchTerm changes
    useEffect(() => {
        setStartIndex(0);
    }, [searchTerm]);

    function handleNextPage() {
        setStartIndex(prevIndex => prevIndex + pageSize);
    }

    function handlePrevPage() {
        setStartIndex(prevIndex => Math.max(0, prevIndex - pageSize));
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this delivery?");
        if (confirmDelete) {
            try {
                await deleteShipment(id);
                setDeliveries(deliveries.filter(delivery => delivery.id !== id));
            } catch (error) {
                console.error('Error deleting delivery:', error);
            }
        }
    };

    const handleEditClick = (shipment) => {
        setCurrentShipment(shipment);
        setIsEditing(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setCurrentShipment(null);
    };

    const handleSaveShipment = (updatedShipment) => {
        setDeliveries(deliveries.map(delivery =>
            delivery.id === updatedShipment.id ? { ...delivery, ...updatedShipment } : delivery
        ));
        setIsEditing(false);
    };

    const filteredDeliveries = deliveries.filter(delivery =>
        delivery.customerId.includes(searchTerm) ||
        delivery.orderId.includes(searchTerm) ||
        delivery.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="deliveries-list">
            <h2>Deliveries</h2>
            <div className="delivery-container">
                {filteredDeliveries.slice(startIndex, startIndex + pageSize).map((delivery) => (
                    <div className="delivery-card" key={delivery.id}>
                        <div>
                            <h3>{delivery.title}</h3>
                            <p><b>Customer Id: </b> {delivery.customerId}</p>
                            <p><b>Order Id: </b> {delivery.orderId}</p>
                            <p><b>Date: </b> {delivery.date}</p>
                            <p><b>Time: </b> {delivery.time}</p>
                            <p><b>Status: </b> {delivery.status}</p>
                        </div>
                        <div className='buttons'>
                            <button className="delete-button" onClick={() => handleDelete(delivery.id)}>Delete</button>
                            <button className="edit-button" onClick={() => handleEditClick(delivery)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className='pagination' onClick={handlePrevPage} disabled={startIndex === 0}>Prev</button>
                <button className='pagination' onClick={handleNextPage} disabled={startIndex + pageSize >= filteredDeliveries.length}>Next</button>
            </div>
            {isEditing && (
                <EditDelivery
                    shipment={currentShipment}
                    onClose={handleCloseModal}
                    onSave={handleSaveShipment}
                />
            )}
        </div>
    );
};

export default Deliveries;
