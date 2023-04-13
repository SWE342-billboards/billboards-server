const express = require('express');
const router = express.Router();
const { User, Billboard, Order, City, Status } = require('../models/models');

// Get all billboards
router.get('/billboards', (req, res) => {
  Billboard.findAll((err, billboards) => {
    if (err) {
      console.error('Error retrieving billboards:', err);
      res.status(500).send('Error retrieving billboards');
    } else {
      res.send(billboards);
    }
  });
});

// Create a new billboard
router.post('/billboard', (req, res) => {
  const newBillboard = req.body;
  Billboard.create(newBillboard, (err, billboardId) => {
    if (err) {
      console.error('Error creating billboard:', err);
      res.status(500).send('Error creating billboard');
    } else {
      res.status(201).send({ id: billboardId });
    }
  });
});

// curl -X POST -H "Content-Type: application/json" -d '{"email":"example@example.com","password":"password","type":"customer"}' http://localhost:3005/api/register
router.post('/register', (req, res) => {
  console.log(req.body);

  const user = req.body;
  User.create(user, (err, userId) => {
    if (err) return res.status(500).json({ error: 'Failed to create user.' });
    res.json({ id: userId });
  });
});

// Handle POST requests to /login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.getByEmailAndPassword(email, password, (err, user) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate user.' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    res.json(user);
  });
});

// Handle GET requests to /users
router.get('/users', (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve users.' });
    res.json(users);
  });
});

// -------------------------------

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
    orderId: '001',
    size: 'Small',
    type: '1-side',
    location: 'Almaty',
    startDate: '2023-04-12T00:00:00.000',
    endDate: '2023-04-13T00:00:00.000',
    cost: '200.0',
    status:'success'
  },
  {
    orderId: '002',
    size: 'Medium',
    type: '2-side',
    location: 'Astana',
    startDate: '2023-04-13T00:00:00.000',
    endDate: '2023-04-14T00:00:00.000',
    cost: '400.0',
    status:'pending'
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
