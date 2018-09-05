const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers');

router.get('/', Controllers.products.allAction);

router.post('/', Controllers.products.createAction);

router.get('/:id', Controllers.products.singleAction);

router.put('/:id', Controllers.products.updateAction);

router.delete('/:id', Controllers.products.deleteAction);

module.exports = router;