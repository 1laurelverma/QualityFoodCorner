const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    isPaid: Boolean,
    amount: Number,
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

const Order = mongoose.model("Order", OrderSchema);