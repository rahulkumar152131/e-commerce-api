import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'likes'
        }
    ],
    rating: {
        type: Number,
        min: [1, "rating should be between 1 to 5"],
        max: [5, "rating should be between 1 to 5"]
    }
})

const RatingModel = mongoose.model("ratings", ratingSchema);
export default RatingModel;