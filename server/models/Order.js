const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    location: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, default: 0 }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    payment: {
        type: String,
        enum: ['Nan', 'COD', 'Gpay'],
        default: 'Nan',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', orderSchema);
