import express from "express";
import { LikeController } from "./like.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();
likeRouter.post("/", likeController.like);
likeRouter.get("/", likeController.getLikes);

export default likeRouter;
