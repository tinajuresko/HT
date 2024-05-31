import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createShipment } from '../api/api';  

import '../css/adddelivery.css';

const AddForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');

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
    const newShipment = {
      title,
      date: date.toISOString().split('T')[0], // format date as YYYY-MM-DD
      time,
      status,
      orderId,
      customerId
    };
    try {
      await createShipment(newShipment);
      setMessage('Delivery successfully created!');
      // Reset input values to default after successful submission
      setTitle('');
      setDate(new Date());
      setTime('');
      setStatus('');
      setOrderId('');
      setCustomerId('');
    } catch (error) {
      console.error('Error creating shipment:', error);
      setMessage('Error creating delivery. Please try again.');
    }
  };

  return (
    <div className='content'>
      <div className='main'>
        <h2 className='addDelivery'>New Delivery</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input className='title' type="text" value={title} onChange={handleTitleChange} required />
          </div>
          <div>
            <label>Date:</label>
            <DatePicker className='date' selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy-MM-dd" required />
          </div>
          <div>
            <label>Time:</label>
            <input className='time' type="time" value={time} onChange={handleTimeChange} required />
          </div>
          <div>
            <label>Status:</label>
            <input className='status' type="text" value={status} onChange={handleStatusChange} required />
          </div>
          <div>
            <label>Order ID:</label>
            <input className='orderId' type="text" value={orderId} onChange={handleOrderIdChange} required />
          </div>
          <div>
            <label>Customer ID:</label>
            <input className='customerId' type="text" value={customerId} onChange={handleCustomerIdChange} required />
          </div>
          <button className='submit' type="submit">Add Delivery</button>
          {message && <p className='message'>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddForm;
