import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";



import userModel from "../user/user.schema.js";
import productModel from "./product.schema.js";
import RatingModel from "./rating.schema.js";
import CategoryModel from "./category.schema.js";

class ProductRepository {

    async getAllProduct() {
        try {
            const products = await productModel.find()
                .populate('category')
                .populate({
                    path: 'likes',
                    model: "likes"
                })
                .populate('ratings').lean();
            // console.log(products, 'new');
            return products;
        } catch (err) {
            console.log("error in product repository", err);
            throw new ApplicationError("Something went wrong with product collection", 500);
        }
    }

    async addProduct(newProduct, userID) {
        try {
            const user = await userModel.findById(userID);
            if (user && user.type == 'seller') {
                console.log(newProduct);
                //1. adding product
                const product = new productModel(newProduct);
                const savedProduct = await product.save();

                //2. update category
                // await CategoryModel.updateMany(
                //     { _id: { $in: newProduct.category } },
                //     { $push: { products: new ObjectId(savedProduct._id) } }
                // )
                return { success: true, res: savedProduct };
            } else {
                return { success: false, res: "You are not authorized to add product" }
            }
        } catch (err) {
            console.log("error in product repository", err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async getOneProduct(id) {
        try {
            return await productModel.findById(id)
                .populate({
                    path: 'ratings',
                    populate: {
                        path: 'likes',
                        model: 'likes'
                    }
                })
                .populate({
                    path: 'ratings',
                    populate: {
                        path: 'userID',
                        model: 'users',
                    }
                })
                .populate({
                    path: 'likes',
                    model: "likes"
                })
        } catch (err) {
            console.log("error in product repository", err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async filter(minPrice, maxPrice, category) {
        console.log(category, 'category');
        try {
            const filterExpression = {};
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) }
            }
            if (maxPrice) {
                filterExpression.price = { ...filterExpression.price, $lte: parseFloat(maxPrice) }
            }
            if (category && category.length > 0) {
                filterExpression.category = { $in: category };
            }
            const products = await productModel.find(filterExpression)
                .populate('category')
                .populate({
                    path: 'ratings',
                    populate: {
                        path: 'userID',
                        model: 'users',
                        select: '-password'
                    },
                })
                .lean();
            console.log(products);
            return products;
        } catch (err) {
            // console.log("error in product repository", err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async reteProduct(userID, productID, rating, text) {
        try {
            //1. check if product exist
            const productToUpdate = await productModel.findById(productID);
            if (!productToUpdate) {
                return { success: false, msg: "Product, not found" }
            }
            //find the existing review
            const userRating = await RatingModel.findOne({ productID: new ObjectId(productID), userID: new ObjectId(userID) });
            // console.log(userRating);
            if (userRating) {
                userRating.rating = rating;
                userRating.text=text;
                const newRating = await userRating.save();
                // await productModel.updateOne(
                //     { _id: new ObjectId(productID) },
                //     { $push: { ratings: new ObjectId(newRating._id) } }
                // )
            } else {
                const newRating = new RatingModel({
                    productID: new ObjectId(productID),
                    userID: new ObjectId(userID),
                    rating: rating,
                    text
                })
                await newRating.save();
                //  console.log(newRating, 'new');
                await productModel.updateOne(
                    { _id: new ObjectId(productID) },
                    { $push: { ratings: new ObjectId(newRating._id) } }
                )
            }
            // console.log(userRating, 'userrating');
            const updatedProduct = await productModel.findById(productID).select("-password").populate('category')
                .populate({
                    path: 'ratings',
                    populate: {
                        path: 'userID',
                        model: 'users',
                    }
                })
            return updatedProduct;

        } catch (err) {
            console.log("error in product repository", err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}
export default ProductRepository;