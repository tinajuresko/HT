const express = require('express');
const cors = require('cors');
const {
  getShipments,
  getShipmentById,
  getShipmentsByCriteria,
  createShipment,
  updateShipment
} = require('./api/api');

const app = express();
const PORT = 8017; // Port number for your Express server

// Enable CORS
app.use(cors());

// Define routes

// Route to fetch shipments
app.get('/shipments', async (req, res) => {
  try {
    const response = await getShipments(req.query);
    res.setHeader('X-Total-Count', response.totalCount);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch a shipment by ID
app.get('/shipments/:id', async (req, res) => {
  try {
    const shipment = await getShipmentById(req.params.id);
    res.json(shipment);
  } catch (error) {
    console.error('Error fetching shipment by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch shipments by criteria
app.get('/shipmentTracking', async (req, res) => {
  try {
    const shipments = await getShipmentsByCriteria(req.query);
    res.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments by criteria:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a shipment
app.post('/shipments', async (req, res) => {
  try {
    const shipment = await createShipment(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a shipment
app.patch('/shipments/:id', async (req, res) => {
  try {
    const shipment = await updateShipment(req.params.id, req.body);
    res.json(shipment);
  } catch (error) {
    console.error('Error updating shipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
