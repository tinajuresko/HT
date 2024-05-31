import axios from 'axios';


const API_BASE_URL = 'http://localhost:8017'; 

export const getShipments = async (params) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shipments`, { params });
      
      const totalCount = response.data.length;
      console.log("totalcount: ", totalCount);
      
      return { data: response.data, totalCount: totalCount };
    } catch (error) {
      console.error('Error fetching shipments:', error);
      throw error;
    }
  };
export const getShipmentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error;
  }
};

export const getShipmentsByCriteria = async ({ customerId, status, orderId }) => {
    try {
      const params = { customerId, status, orderId };
      const response = await axios.get(`${API_BASE_URL}/shipmentTracking`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching shipments by criteria:', error);
      throw error;
    }
};

export const createShipment = async (shipmentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/shipments`, shipmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
};
export const updateShipment = async (id, shipmentData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/shipments/${id}`, shipmentData);
    return response.data;
  } catch (error) {
    console.error('Error updating shipment:', error);
    throw error;
  }
};
export const deleteShipment = async (id) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/shipments/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error deleting shipment:', error);
      throw error;
  }
};
