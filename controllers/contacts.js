const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contacts = await mongodb.getDatabase().db().collection('contacts2').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }

        const contact = await mongodb.getDatabase().db().collection('contacts2').findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contact', error: error.message });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('contacts2').insertOne(contact);

        if (!response.acknowledged) {
            throw new Error('Failed to create contact');
        }

        res.status(201).json({ message: 'Contact created successfully', contactId: response.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('contacts2').replaceOne({ _id: new ObjectId(contactId) }, contact);

        if (response.modifiedCount === 0) {
            return res.status(404).json({ error: 'No contact updated. Contact may not exist.' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error: error.message });
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contact ID' });
        }

        const response = await mongodb.getDatabase().db().collection('contacts2').deleteOne({ _id: new ObjectId(contactId) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'No contact deleted. Contact may not exist.' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
