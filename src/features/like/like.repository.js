import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import LikeModel from "./like.schema.js"
import RatingModel from "../product/rating.schema.js";
import productModel from "../product/product.schema.js";

export class LikeRepository {
    async getLikes(type, id) {
        try {
            return await LikeModel.find({
                likeable: new ObjectId(id),
                on_model: type
            }).populate('user')
                .populate({
                    path: 'likeable', model: type
                })
        } catch (err) {
            console.log(err);
            throw ApplicationError("something went wrong", 500);
        }
    }
    async likeProduct(userID, productID) {
        try {
            const productToUpdate = await productModel.findById(productID);
            if (!productToUpdate) {
                return { success: false, msg: "Product, not found" }
            }
            //find the existing like
            const userLike = await LikeModel.findOne({ user: new ObjectId(userID), likeable: new ObjectId(productID) });
            // console.log(userproduct);
            // console.log(userLike);
            if (userLike) {
                await LikeModel.findOneAndDelete({ user: new ObjectId(userID), likeable: new ObjectId(productID) });
                await productModel.updateOne(
                    { _id: new ObjectId(productID) },
                    { $pull: { likes: new ObjectId(userLike._id) } }
                )
            } else {
                const newLike = new LikeModel({
                    user: new ObjectId(userID),
                    likeable: new ObjectId(productID),
                    on_model: 'products'
                })
                await newLike.save();
                await productModel.updateOne(
                    { _id: new ObjectId(productID) },
                    { $push: { likes: new ObjectId(newLike._id) } }
                )
            }
            // console.log(userproduct, 'userproduct');
            const updatedproduct = await productModel.findById(productID)
                .populate({
                    path: 'likes',
                    model: 'likes'
                })
            // console.log(updatedproduct);
            return updatedproduct;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong", 500);
        }
    }
    async likeRating(userID, ratingID) {
        try {

            const ratingToUpdate = await RatingModel.findById(ratingID);
            if (!ratingToUpdate) {
                return { success: false, msg: "Rating, not found" }
            }
            //find the existing like
            const userLike = await LikeModel.findOne({ user: new ObjectId(userID), likeable: new ObjectId(ratingID) });
            // console.log(userRating);
            // console.log(userLike);
            if (userLike) {
                await LikeModel.findOneAndDelete({ user: new ObjectId(userID), likeable: new ObjectId(ratingID) });
                await RatingModel.updateOne(
                    { _id: new ObjectId(ratingID) },
                    { $pull: { likes: new ObjectId(userLike._id) } }
                )
            } else {
                const newLike = new LikeModel({
                    user: new ObjectId(userID),
                    likeable: new ObjectId(ratingID),
                    on_model: 'ratings'
                })
                await newLike.save();
                await RatingModel.updateOne(
                    { _id: new ObjectId(ratingID) },
                    { $push: { likes: new ObjectId(newLike._id) } }
                )
            }
            // console.log(userRating, 'userrating');
            const updatedRating = await RatingModel.findById(ratingID)
                .populate({
                    path: 'userID',
                    model: 'users',
                })
                .populate({
                    path: 'likes',
                    model: 'likes'
                })
            // console.log(updatedRating);
            return updatedRating;


        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong", 500);
        }
    }
}