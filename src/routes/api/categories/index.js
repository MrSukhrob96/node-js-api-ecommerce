const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers');

router.get('/', Controllers.categories.allAction);

router.post('/', Controllers.categories.createAction);

router.get('/:id', Controllers.categories.singleAction);

router.put('/:id', Controllers.categories.updateAction);

router.delete('/:id', Controllers.categories.deleteAction);

module.exports = router;