const Contact = require('../models/Contacts');

async function createContact(req, res, next) {
  try {
    const { name, surname, phone } = req.body;

    // Check if the contact already exists
    const existingContact = await Contact.findOne({ name, surname, phone });
    if (existingContact) {
      return res.status(409).json({ message: 'Contact already exists' });
    }

    // Create new contact
    const newContact = new Contact({ name, surname, phone });
    await newContact.save();

    res.json({ message: 'Contact added successfully' });
  } catch (error) {
    next(error);
  }
}

async function getContacts(req, res, next) {
  try {
    // Retrieve all contacts
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    next(error);
  }
}


module.exports = { createContact, getContacts };