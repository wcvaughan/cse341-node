const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
// const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);
router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);
router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;