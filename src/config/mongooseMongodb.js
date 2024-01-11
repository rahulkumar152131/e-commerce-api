import mongoose from "mongoose";
import CategoryModel from "../features/product/category.schema.js";

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        // await mongoose.connect(process.env.DB_URL, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });
        console.log("MongoDB connected using mongoose");
        // addCategories();
    } catch (err) {
        console.log("MongoDb Error", err);
    }
}

async function addCategories() {
    const categories = CategoryModel.find()
    // console.log(categories.length);
    if (!categories.length || categories.length == 0) {
        await CategoryModel.insertMany([
            { name: "electronics" },
            { name: "jewellery" },
            { name: "men-s-clothing" },
            { name: "women-s-clothing" },
            { name: "mobile" },
            { name: "shirt" }

        ])
    }
}