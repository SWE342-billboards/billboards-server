const express = require('express');
const router = express.Router();
const { User, Billboard, Order, City, Status } = require('../models/models');

router.post('/register', (req, res) => {
  console.log(req.body);

  const user = req.body;
  User.create(user, (err, userId) => {
    if (err) return res.status(500).json({ error: 'Failed to create user.' });
    res.json({ id: userId });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.getByEmailAndPassword(email, password, (err, user) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate user.' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    res.json(user);
  });
});

router.get('/users', (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve users.' });
    res.json(users);
  });
});

router.post('/make_order', (req, res) => {
  const order = req.body;
  
  // Get the city ID from the city name in the request body
  const cityName = order.location;
  City.getIdByName(cityName, (err, cityId) => {
    if (err) return res.status(500).json({ error: 'Failed to get/create city.' });

    // Update the order object with the city ID
    order.city_id = cityId;

    console.log(order);
    
    // Get the billboard based on the order parameters
    const { type, material, size, min_cost, max_cost } = order;
    Billboard.getBillboardByParams(type, material, size, min_cost, max_cost, (err, billboard) => {
      if (err) return res.status(500).json({ error: 'Failed to get/create billboard.' });

      // Update the order object with the billboard ID and cost per day
      order.billboard_id = billboard.id;
      order.cost = billboard.costPerDay;

      // Create the order with the updated city and billboard IDs
      Order.create(order, (err, orderId) => {
        if (err) return res.status(500).json({ error: 'Failed to create order.' });
        res.json({ id: orderId });
      });
    });
  });
});

// Get all orders
router.get('/orders', (req, res) => {
  Order.getAll((err, orders) => {
    if (err) return res.status(500).json({ error: 'Failed to get orders.' });
    res.json(orders);
  });
});

module.exports = router;
