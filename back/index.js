const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./models/Contacts');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dovevivo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'dovevivo',
  autoCreate: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
  console.log('Connected to the database.');

  try {
    const collections = await mongoose.connection.db.listCollections().toArray();

    const contactCollectionExists = collections.some(
      (collection) => collection.name === 'contacts'
    );
    if (!contactCollectionExists) {
      await mongoose.connection.db.createCollection('contacts');
      console.log('Contact collection created.');
    } else {
      console.log('Contact collection already exists.');
    }
  } catch (error) {
    console.error('Error creating collections:', error);
  }
});

// Routes

app.use('/contacts', contactRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});