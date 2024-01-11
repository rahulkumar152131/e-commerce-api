import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    userID: {
        type: String,
        ref: 'users'
    },
    quantity: {
        type: Number,
        min: [1, "Quantity must be greater than 1"]
    }
})
const CartItemModel = mongoose.model("cartItems", cartItemSchema);
export default CartItemModel;