// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/hello-world', dashboardController.HelloWorld);
router.post('/add-cart', dashboardController.SendCart);

module.exports = router;
