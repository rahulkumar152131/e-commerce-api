import mongoose from "mongoose"
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model'
    },
    on_model: {
        type: String,
        enum: ["products", "ratings"]
    }

})
const LikeModel = mongoose.model("likes", likeSchema);
export default LikeModel;