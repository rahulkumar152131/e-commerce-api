import { LikeRepository } from "./like.repository.js";
export class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }
    like = async (req, res, next) => {
        try {
            const { id, type } = req.query;
            if (type != "products" && type != "ratings") {
                return res.status(400).send("Invalid")
            }
            if (type == "products") {
                const likes = await this.likeRepository.likeProduct(req.userID, id);
                return res.status(201).send(likes);
            } else {
                // console.log(id, type);
                // console.log(req.userID);
                const likes = await this.likeRepository.likeRating(req.userID, id);
                console.log(likes);
                return res.status(201).send(likes);
            }

        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    getLikes = async (req, res, next) => {
        try {
            const { id, type } = req.query;
            const likes = await this.likeRepository.getLikes(type, id)
            res.status(200).send(likes);

        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}