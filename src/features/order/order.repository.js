// start repliset
// mongod --replSet rs0


// use admin
// db.shutdownServer()

// command to create replica set
// use local
// db.system.replset.remove({})

// rs.initiate({
//     _id: 'rs0',
//     members: [
//       { _id: 0, host: '127.0.0.1:27017' }
//     ]
//   });


import mongoose from "mongoose";
import { getClient, getDB } from "../../config/mongodb.js"
import CartItemModel from "../cartItem/cartItem.schema.js";
import OrderModel from "./order.schema.js";
import productModel from "../product/product.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OrderRepository {
    async getAllOrder(userID) {
        try {
            console.log(userID);
            const orders = await OrderModel.find({ userID })
                .populate({
                    path: 'items.productID',
                    model: 'products',
                    select: 'name price'
                }).exec()
            // .populate('userID');
            console.log(orders);
            return orders
        } catch (err) {
            console.log("Error in getting order", err);
            throw new ApplicationError("Something went wrong with order collection", 500);
        }
    }
    async placeOrder(userID) {
        const session = await mongoose.startSession();

        try {

            const cartItems = await CartItemModel.find({ userID }).populate('productID').session(session);
            session.startTransaction();
            const newOrder = new OrderModel({
                userID,
                items: cartItems,
                orderDate: new Date()
            });
            // console.log(newOrder);

            await newOrder.save({ session });

            for (const item of cartItems) {
                await productModel.updateOne(
                    { _id: item.productID._id },
                    { $inc: { stocks: -item.quantity } },
                    { session }
                );
            }
            await CartItemModel.deleteMany({ userID }, { session });

            await session.commitTransaction();
            return newOrder
        } catch (err) {
            await session.abortTransaction();
            console.error("Error in placing order", err);
            throw new ApplicationError("Something went wrong with order collection");
        } finally {
            session.endSession();
        }
    }
}