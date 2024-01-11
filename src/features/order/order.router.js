import express from "express";

import OrderController from "./order.controller.js";

const orderRouter = express.Router();
const orderController = new OrderController();
orderRouter.get("/get-all-order", orderController.getAllorder);
orderRouter.post("/place-order", orderController.placeOrder);
export default orderRouter;