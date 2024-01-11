import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    desc: {
        type: String,
        required: [true, "Description is Required"]
    },
    price: {
        type: Number,
        required: [true, "Price is Required"]
    },
    imageurl: {
        type: String,
        required: [true, "Image is Required"]
    },
    inCart: {
        type: Boolean,
        default: false
    },
    stocks: {
        type: Number,
        required: [true, "Image is Required"]
    },
    sizes: [
        {
            type: String,
        }
    ],
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratings'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'likes'
        }
    ],
    category: [

        {
            type: String,
            required: true
        }

    ]
})
const productModel = mongoose.model('products', productSchema)
export default productModel;