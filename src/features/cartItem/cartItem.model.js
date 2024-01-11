import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";

// productId, userId, quantity, 
export default class CartItemModel {
    constructor(productID, userID, quantity) {
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
    }
    // static add(productID, userID, quantity) {
    //     const user = UserModel.getAllUser().find((u) => u.id == userID);
    //     if (!user) {
    //         return { status: false, msg: 'User not found' };
    //     }
    //     // Validate Product;
    //     const product = ProductModel.getAllProduct().find((p) => p.id == productID);
    //     if (!product) {
    //         return { status: false, msg: { status: false, msg: 'Item not found' } };
    //     }
    //     const cartItem = new CartItemModel(productID, product.price, userID, quantity, cartItems.length + 1, product.imageurl);
    //     cartItems.push(cartItem);
    //     return cartItem;
    // }
    // static getAllCartItem(userId) {
    //     const user = UserModel.getAllUser().find((u) => u.id == userId);
    //     if (!user) {
    //         return { status: false, msg: 'User not found' };
    //     }
    //     // ProductModel.toggleCart(userId);
    //     const items = cartItems.filter((item) => item.userID == userId);
    //     return { status: true, msg: items };
    // }
    // static increaseCartItemQuantity(productID, userID) {
    //     const user = UserModel.getAllUser().find((u) => u.id == userID);
    //     if (!user) {
    //         return { status: false, msg: 'User not found' };
    //     }
    //     const item = cartItems.find((i) => i.id == productID && i.userID == userID);
    //     if (!item) {
    //         return { status: false, msg: 'Item not found' };
    //     }
    //     item.quantity += 1;
    //     // console.log(item);
    //     return { status: true, msg: item };
    // }
    // static decreaseCartItemQuantity(productID, userID) {
    //     const user = UserModel.getAllUser().find((u) => u.id == userID);
    //     if (!user) {
    //         return { status: false, msg: 'User not found' };
    //     }
    //     const item = cartItems.find((i) => i.id == productID && i.userID == userID);
    //     if (!item) {
    //         return { status: false, msg: 'Item not found' };
    //     }
    //     if (item.quantity > 1) {
    //         item.quantity -= 1;
    //     }
    //     return { status: true, msg: item };
    // }
    // static deleteCartItem(cartItemID, userID) {
    //     const user = UserModel.getAllUser().find((u) => u.id == userID);
    //     if (!user) {
    //         return { status: false, msg: 'User not found' };
    //     }
    //     const item = cartItems.find((i) => i.id == cartItemID && i.userID == userID);
    //     if (!item) {
    //         return { status: false, msg: 'Item not found' };
    //     } else {
    //         const itemIndex = cartItems.findIndex((item) => item.productID == cartItemID && item.userID == userID);
    //         cartItems.splice(itemIndex, 1);
    //     }
    //     return { status: true, msg: item }

    // }

}

var cartItems = [
    new CartItemModel(
        1,
        19.99,
        2,
        1,
        1,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new CartItemModel(
        1,
        29.99,
        1,
        2,
        2, 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg')

]