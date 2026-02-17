const express = require('express');
const router = express.Router();
// Create Order Route
const Order = require('../models/Order');
router.post('/', async (req, res) => {
    try {
        const { name, contact, location, rollNo, items, totalAmount } = req.body;
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Received Body:', req.body);
        console.log('Items type:', typeof items);

        // Validation Checks
        if (!name || !contact || !location || !rollNo || !items || !totalAmount) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!/^\d{10}$/.test(contact)) {
            return res.status(400).json({ error: 'Contact number must be exactly 10 digits' });
        }

        let parsedItems = [];
        try {
            parsedItems = JSON.parse(items);
        } catch (e) {
            return res.status(400).json({ error: 'Invalid items format' });
        }

        const newOrder = new Order({
            name,
            contact,
            location,
            rollNo,
            items: parsedItems,
            totalAmount
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });

    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Transaction ID already exists' });
        }
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});
router.get('/getorders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        console.log(orders);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🔹 Update order status & payment
router.put('/getorders/:id', async (req, res) => {
    try {
        const { status, payment } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status, payment },
            { new: true }
        );

        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;
