import ProductModel from "../product/product.model.js";
import CartItemModel from "./cartItem.model.js";
import CartItemRepository from './cartItem.repository.js';

export default class CartItemController {
    constructor() {
        this.cartItemRepository = new CartItemRepository();
    }
    add = async (req, res) => {
        try {
            // console.log(req.query);
            const { productID, quantity } = req.query;
            const userID = req.userID;
            const response = await this.cartItemRepository.add(productID, userID, parseInt(quantity));
            // console.log(cartItem);
            return res.status(201).send(response);

        } catch (err) {
            console.log("Something went wrong in adding cart item", err);
            res.status(400).send('Something went wrong')
        }
    }
    get = async (req, res) => {
        // console.log(req.email);

        try {
            const userID = req.userID;
            const cartItems = await this.cartItemRepository.getAllCartItem(userID);
            res.status(200).send(cartItems);
        } catch (err) {
            console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }

    }
    // get(req, res) {
    //     // console.log(req.email);
    //     const userID = req.userID;
    //     const items = CartItemModel.getAllCartItem(userID);
    //     return res.status(200).send(items);
    // }
    increaseQuantity = async (req, res) => {
        try {
            // console.log(req.email);
            const userID = req.userID;
            // console.log(req.params);
            const productID = req.params.id;
            // console.log(productID);
            const item = await this.cartItemRepository.increaseCartItemQuantity(productID, userID);
            console.log(item);
            return res.status(200).send(item);
        } catch (err) {
            console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }
    }
    decreaseQuantity = async (req, res) => {
        try {
            const userID = req.userID;
            const productID = req.params.id;
            console.log(productID);
            const item = await this.cartItemRepository.decreaseCartItemQuantity(productID, userID);
            console.log(item);
            return res.status(200).send(item);
        } catch (err) {
            console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }
    }
    deleteCartItem = async (req, res) => {
        try {
            const userID = req.userID;
            const productID = req.params.id;
            // console.log(productID);
            const item = await this.cartItemRepository.deleteCartItem(productID, userID);
            // console.log(item, 'item');
            return res.status(200).send(item);
            // ProductModel.toggleCart(userID, productID, false);
            // console.log(response.msg);
            // if (!response.status) {
            //     return res.status(404).send(response.msg);
            // } else {
            //     return res.status(200).send(response.msg);
            // }


        } catch (err) {
            console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }
    }




}