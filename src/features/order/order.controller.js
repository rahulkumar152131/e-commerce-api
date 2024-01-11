import CartItemRepository from "../cartItem/cartItem.repository.js";
import OrderModel from "./order.model.js";
import OrderRepository from "./order.repository.js";

export default class OrderController {
    constructor() {
        this.orderRepository = new OrderRepository();
        this.cartItemRepository = new CartItemRepository();
    }
    placeOrder = async (req, res, next) => {
        try {
            const userID = req.userID;
            // console.log("userID");
            // const allItems = await this.cartItemRepository.getAllCartItem(userID);
            const order = await this.orderRepository.placeOrder(userID);
            // const order = OrderModel(userID, totalAmount, allItems,)
            // console.log(order);
            return res.status(200).send(order);
        } catch (err) {
            // console.log("Error in placing order", err);
            next(err)
        }
    }
    getAllorder = async (req, res) => {
        try {
            const userID = req.userID;
            // console.log(userID);
            const orders = await this.orderRepository.getAllOrder(userID);
            res.status(200).send(orders);
        } catch (err) {
            console.log("Error in placing order", err);
            res.status(500).send("Something went wrong")
        }
    }
}