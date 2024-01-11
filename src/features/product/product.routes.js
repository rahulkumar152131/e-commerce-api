//manage routes/paths to productController

//1. Import express.
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middleware/fileupload.middleware.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

//2. Initialize express router.
const productRouter = express.Router();

const productController = new ProductController();
//localhost:3000/api/products
productRouter.get("/get-products", productController.getAllProducts);
productRouter.post("/add-product", jwtAuth, upload.single('imageurl'), productController.addProduct);
productRouter.get("/get-one/:id", productController.getOneProduct);
productRouter.post("/filter", productController.filterProduct);
productRouter.post('/rate', jwtAuth, productController.rateProduct);
productRouter.get('/average-price', productController.avaragePrice);
productRouter.get('/average-rating', productController.avarageRating);

export default productRouter;