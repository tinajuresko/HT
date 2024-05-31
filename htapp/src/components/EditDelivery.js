import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateShipment } from '../api/api';
import '../css/editdelivery.css';

const EditDelivery = ({ shipment, onClose, onSave }) => {
  const [title, setTitle] = useState(shipment ? shipment.title : '');
  const [date, setDate] = useState(shipment ? new Date(shipment.date) : new Date());
  const [status, setStatus] = useState(shipment ? shipment.status : '');
  const [orderId, setOrderId] = useState(shipment ? shipment.orderId : '');
  const [customerId, setCustomerId] = useState(shipment ? shipment.customerId : '');
  const [message, setMessage] = useState('');

  const convertTo24HourFormat = (time) => {
    const [timeString, modifier] = time.split(' ');
    let [hours, minutes] = timeString.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const [time, setTime] = useState(shipment ? convertTo24HourFormat(shipment.time) : '');

  useEffect(() => {
    if (shipment) {
      setTitle(shipment.title);
      setDate(new Date(shipment.date));
      setTime(convertTo24HourFormat(shipment.time));
      setStatus(shipment.status);
      setOrderId(shipment.orderId);
      setCustomerId(shipment.customerId);
    }
  }, [shipment]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedShipment = {
      ...shipment,
      title,
      date: date.toISOString().split('T')[0],
      time,
      status,
      orderId,
      customerId
    };
    try {
      await updateShipment(shipment.id, updatedShipment);
      setMessage('Delivery successfully updated!');
      onSave(updatedShipment);
      onClose();
    } catch (error) {
      console.error('Error updating shipment:', error);
      setMessage('Error updating delivery. Please try again.');
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2 className='editDelivery'>Edit Delivery</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Title:</label>
            <input className='title' type="text" value={title} onChange={handleTitleChange} required />
          </div>
          <div className='form-group'>
            <label>Date:</label>
            <DatePicker className='date' selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy-MM-dd" required />
          </div>
          <div className='form-group'>
            <label>Time:</label>
            <input className='time' type="time" value={time} onChange={handleTimeChange} required />
          </div>
          <div className='form-group'>
            <label>Status:</label>
            <input className='status' type="text" value={status} onChange={handleStatusChange} required />
          </div>
          <div className='form-group'>
            <label>Order ID:</label>
            <input className='orderId' type="text" value={orderId} onChange={handleOrderIdChange} required />
          </div>
          <div className='form-group'>
            <label>Customer ID:</label>
            <input className='customerId' type="text" value={customerId} onChange={handleCustomerIdChange} required />
          </div>
          <div className='modal-buttons'>
            <button className='submit' type="submit">Save Changes</button>
            <button className='cancel' type="button" onClick={onClose}>Cancel</button>
          </div>
          {message && <p className='message'>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditDelivery;
