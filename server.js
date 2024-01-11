import "./env.js"

import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.router.js";
import basicAuthorizer from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartItemRouter from "./src/features/cartItem/cartItem.routes.js";
import apiDocs from './swagger3.0.json' assert{type: 'json'};
import { loggerMiddleware } from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.router.js";
import { connectUsingMongoose } from "./src/config/mongooseMongodb.js";
import likeRouter from "./src/features/like/like.routes.js";
// const {bodyParser}=pkg;

const server = express();

//load all the environment variable in the application


server.use(cors({
    origin: '*',
}));

// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     if (req.method == "OPTIONS") {
//         return res.sendStatus(200);
//     }

//     next();
// })

server.use('/uploads', express.static('uploads'))
server.use(cookieParser());
// server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));


// for all requrests related to product, redirect to product routes.
server.use(loggerMiddleware);
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);
server.use('/api/carts', jwtAuth, cartItemRouter);
server.use('/api/orders', jwtAuth, orderRouter);
server.use("/api/likes", jwtAuth, likeRouter);

// server.get('/', (req, res) => {
//     res.send('Hello world');
// })

server.use("/", swagger.serve, swagger.setup(apiDocs));

//Error handler middleware
server.use((err, req, res, next) => {

    if (err instanceof ApplicationError) {
        console.log(err.status, 'error in ---');
        res.status(err.code).send(err.message)
    }
    // console.log(err);
    res.status(500).send('Something went wrong, please try later');

})

//middleware to handle 404 requests.
server.use((req, res) => {
    res.status(404).send("API not found");
})


server.listen(4100, () => {
    console.log('server is listening on port : 4100');
    // connectToMongoDB();
    connectUsingMongoose();
})