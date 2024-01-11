import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ]
})
const CategoryModel = mongoose.model('categories', categorySchema)

export default CategoryModel;