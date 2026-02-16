const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('./models/Order');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected');
        try {
            await Order.collection.dropIndexes();
            console.log('Indexes dropped successfully');
        } catch (e) {
            console.log('Error dropping indexes (might not exist):', e.message);
        }
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
