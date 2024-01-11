

export default class ProductModel {
    constructor(name, desc, price, imageurl, category, sizes, stocks) {
        this.name = name,
            this.desc = desc,
            this.price = price,
            this.imageurl = imageurl,
            this.category = category,
            this.sizes = sizes,
            this.stocks = stocks;
            this.inCart = false
    }
    // static getAllProduct() {
    //     return products;
    // }
    // static addProduct(product) {
    //     product.id = products.length + 1;
    //     products.push(product);
    //     return product;
    // }
    // static getProductById(id) {
    //     const product = products.find((product) => product.id.toString() === id);
    //     return product;
    // }

    // static filter(minPrice, maxPrice, category) {
    //     console.log(category);
    //     const result = products.filter((product) =>
    //         (!minPrice || product.price >= minPrice) &&
    //         (!maxPrice || product.price <= maxPrice) &&
    //         (!category || category.includes(product.category))
    //     )
    //     return result;
    // }

    // static reteProduct(userID, productID, rating) {
    //     //1. validate user and product.
    //     const user = UserModel.getAllUser().find((u) => u.id == userID);
    //     if (!user) {
    //         throw new ApplicationError('User not found', 404);
    //     }
    //     // Validate Product;
    //     const product = products.find((p) => p.id == productID);
    //     if (!product) {
    //         throw new ApplicationError('Product not found', 400);
    //     }

    //     //2. check if there are any ratings and if not then add ratings array.
    //     if (!product.ratings) {
    //         product.ratings = [];
    //         product.ratings.push({ userID: userID, name: user.name, rating: rating });
    //     } else {
    //         //3. check if use rating is already available
    //         const existingRating = product.ratings.findIndex((r) => r.userID == userID);
    //         if (existingRating >= 0) {
    //             product.ratings[existingRating] = { userID: userID, name: user.name, rating: rating }
    //         } else {
    //             //4. if no existing rating. then add new rating.
    //             console.log(product.ratings);
    //             product.ratings.push({ userID: userID, name: user.name, rating: rating });
    //         }
    //     }
    //     return product;
    // }

    // static InitialtoggleCart(userID) {
    //     const cartItemId = CartItemModel.getAllCartItem(userID).msg.map((item) => item.id);
    //     console.log(cartItemId);
    //     products = products.map((product) => {

    //         if (cartItemId.includes(product.id)) {
    //             product.inCart = true;
    //         }
    //         return product
    //     })
    // }
    // static toggleCart(userID, productID, inCart) {

    //     products = products.map((product) => {
    //         if (productID == product.id) {
    //             product.inCart = inCart;
    //         }
    //         return product
    //     })

    // }
}

// var products = [
//     new ProductModel(
//         'Product 1',
//         'Description for Product 1',
//         19.99,
//         'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
//         'Category1'
//     ),
//     new ProductModel(
//         'Product 2',
//         'Description for Product 2',
//         29.99,
//         'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
//         'Category2',
//         ['M', 'XL']
//     ),
//     new ProductModel(
//         'Product 3',
//         'Description for Product 3',
//         39.99,
//         'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
//         'Category3',
//         ['M', 'XL', 'S']
//     )];


