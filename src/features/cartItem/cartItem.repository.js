import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import CartItemModel, { cartItemSchema } from "./cartItem.schema.js";

export default class CartItemRepository {

    async add(productID, userID, quantity) {
        try {
            const isalreadyinCart = await CartItemModel.findOne({ productID: new ObjectId(productID), userID: new ObjectId(userID) });
            if (isalreadyinCart) {
                return { success: false, msg: "Already in Cart" };
            }
            const newItem = new CartItemModel({ productID: new ObjectId(productID), userID: new ObjectId(userID), quantity });
            await newItem.save();
            return { success: true, msg: "successfully added", res: newItem };
        } catch (err) {
            console.log(err);
            res.status(400).send("Error in cartsItem Collection")
        }
    }
    async getAllCartItem(userID) {
        try {

            const items = await CartItemModel.find({ userID }).populate('productID').lean()
            console.log(items);
            return items;

        } catch (err) {
            console.log(err);
            res.status(400).send("Error in cartsItem Collection")
        }

    }
    async increaseCartItemQuantity(cartItemID, userID) {
        try {
            // console.log(cartItemID, userID);
            return await CartItemModel.findOneAndUpdate(
                { _id: new ObjectId(cartItemID), userID: new ObjectId(userID) },
                { $inc: { 'quantity': 1 } },
                { new: true }).populate('productID');

        } catch (err) {
            console.log(err);
            res.status(400).send("Error in cartsItem Collection")
        }

    }
    async decreaseCartItemQuantity(cartItemID, userID) {
        try {
            return await CartItemModel.findOneAndUpdate(
                { _id: new ObjectId(cartItemID), userID: new ObjectId(userID) },
                { $inc: { 'quantity': -1 } },
                { new: true }).populate('productID');
        } catch (err) {
            console.log(err);
            res.status(400).send("Error in cartsItem Collection")
        }
    }
    async deleteCartItem(productID, userID) {

        try {
            // console.log(productID, userID);
            const item = await CartItemModel.findOneAndDelete({ userID: new ObjectId(userID), _id: new ObjectId(productID) });
            // console.log(item);
            return item;
            // if (!item) {
            //     return { status: false, msg: 'Item not found' };
            // } else {
            //     await collection.deleteOne({ userID, productID });
            //     return { status: true, msg: item }
            // }
        } catch (err) {
            console.log(err);
            res.status(400).send("Error in cartsItem Collection")
        }

    }

}