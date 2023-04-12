const express = require('express');
const router = express.Router();
// const { User, Billboard, Order, City, Status } = require('../models/models');

// Register route
router.post('/register', async (req, res) => {
  const { email, password, type } = req.body;
  try {

    // const user = await User.create({ email, password, type });
    // res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await User.findOne({ where: { email } });
    // if (user && user.password === password) {
    //   res.status(200).json(user);
    // } else {  
    //   res.status(401).json({ error: 'Invalid credentials' });
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get billboard by ID route
router.get('/billboard/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // const billboard = await Billboard.findByPk(id);
    // if (billboard) {
    //   res.status(200).json(billboard);
    // } else {
    //   res.status(404).json({ error: 'Billboard not found' });
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create order route
router.post('/order', async (req, res) => {
  const { billboardId, startDate, endDate, statusId, userId, cityId } = req.body;
  try {
    // const order = await Order.create({ billboardId, startDate, endDate, statusId, userId, cityId });
    // res.status(201).json(order);
    res.status(200).json('created');
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define the list of orders
const orders = [
  {
    size: 'Small',
    type: '1-side',
    location: 'Almaty',
    startDate: '2023-04-12T00:00:00.000',
    endDate: '2023-04-13T00:00:00.000',
    minCost: '20.0',
    maxCost: '30.0'
  },
  {
    size: 'Medium',
    type: '2-side',
    location: 'Astana',
    startDate: '2023-04-13T00:00:00.000',
    endDate: '2023-04-14T00:00:00.000',
    minCost: '30.0',
    maxCost: '40.0'
  }
];

// Get orders by current user route
router.get('/orders', async (req, res) => {
  // const userId = req.currentUser.id;
  try {
    // const orders = await Order.findAll({ where: { userId } });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
