const express = require('express');
const router = express.Router();
const products = require('./products');
const categories = require('./categories');
const users = require('./users');
const orders = require('./orders');

router.use('/products', products);
router.use('/categories', categories);
router.use('/users', users);
router.use('/orders', orders);

module.exports = router;