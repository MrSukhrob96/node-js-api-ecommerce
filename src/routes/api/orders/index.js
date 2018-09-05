const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers');

router.get('/', Controllers.orders.allAction);

router.post('/', Controllers.orders.createAction);

router.get('/:id', Controllers.orders.singleAction);

router.put('/:id', Controllers.orders.updateAction);

router.delete('/:id', Controllers.orders.deleteAction);

module.exports = router;