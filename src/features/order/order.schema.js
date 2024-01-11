import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userID is a string, adjust if it's another type
        required: true
    },
    quantity: { 
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userID is a string, adjust if it's another type
        required: true
    },
    items: [orderItemSchema], // Embed the orderItemSchema for each item in the items array
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const OrderModel = mongoose.model('orders', orderSchema);
export default OrderModel;