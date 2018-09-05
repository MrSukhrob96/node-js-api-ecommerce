const express = require('express');
const router = express.Router();
const Controllers = require('../../../controllers');

router.get('/', Controllers.users.allAction);

router.post('/', Controllers.users.createAction);

router.get('/:id', Controllers.users.singleAction);

router.put('/:id', Controllers.users.updateAction);

router.delete('/:id', Controllers.users.deleteAction);

module.exports = router;