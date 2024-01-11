
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import UserModel from "./user.model.js";
import { transporter } from '../../config/sendMail.js'
import CartItemModel from "../cartItem/cartItem.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";
import otpGenerator from "otp-generator";
import mongoose from "mongoose";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    signUp = async (req, res, next) => {
        // console.log(req.body);
        // console.log("object");
        try {
            const { name, email, password, type } = req.body;
            // console.log(req.body);
            const newUser = new UserModel(name, email, password, type, req.file.path);
            const response = await this.userRepository.signUp(newUser);
            if (response.success) {
                return res.status(201).send(response.res);
            } else {
                return res.status(400).send(response.res);
            }
        } catch (error) {
            // console.log("Error in signup controller ", error);
            if (error instanceof mongoose.Error.ValidationError) {
                console.log(error);
                const { userName, email, password } = error.errors;
                res.status(500).json({
                    status: false, msg: {
                        userName: userName?.message,
                        email: email?.message,
                        password: password?.reason
                    }
                });
            } else {
                next(error)
            }


            // res.json({ error })
            // throw new ApplicationError("Something went wrong", 500);
        }
    }

    signIn = async (req, res) => {
        console.log(req.body);
        try {
            const { email, password } = req.body;
            //1.find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send('Incorrect Credentials');
            } else {

                // 2.compate password to hashed password
                const result = await bcrypt.compare(password, user.password);
                if (result) {

                    //3.Create token.
                    const token = jwt.sign(
                        { userID: user._id, email: user.email, userName: user.userName },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' });

                    const loginUser = {
                        userID: user._id,
                        userName: user.userName,
                        email: user.email,
                        profileImage: user.profileImage,
                        type: user.type
                    }

                    res.json({ message: 'Authentication successful', token, user: loginUser });
                } else {
                    return res.status(400).send('Incorrect Credentials');
                }

            }
        } catch (err) {
            console.log("error in signin controller", err);
            res.status(500).send("Something went wrong");
        }

    }

    resetPassword = async (req, res) => {
        console.log(req.body);
        try {
            const { password, token } = req.body;
            const payload = jwt.verify(token,
                process.env.JWT_SECRET
            )
            if (!payload) {
                return res.json({ success: false, msg: "Link Expired" })
            }
            const user = await this.userRepository.findByEmail(payload.email);
            if (!user) {
                return res.json({ success: false, msg: "User not found" });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const result = await this.userRepository.resetPassword(payload.email, hashPassword);
            if (!result) {
                return res.json({ succes: false, msg: "Password Resetting unsuccessfly" })
            }
            return res.json({ succes: true, msg: "Password Resetting successful" })


        } catch (err) {
            console.log("error in signin controller", err);
            res.status(500).send("Something went wrong");
        }

    }

    sendLink = async (req, res) => {
        // console.log(req.body);
        try {
            const user = await this.userRepository.findByEmail(req.body.email);
            if (!user) {
                return res.json({ success: false, msg: "You are not registered" });
            }
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' });
            var link = `http://localhost:8000/reset-password/?accesstoken=${token}`;

            const htmlContent = `
                    <p>Click the button below to reset your password:</p>
                    <a href="${link}">
                    <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Reset Password
                    </button>
                    </a> `;


            const mailOptions = {
                from: "rk152531@gmail.com",
                to: req.body.email,
                subject: "Reset Password",
                html: htmlContent
            }
            const result = await transporter.sendMail(mailOptions);
            if (!result) {
                return res.json({ success: false, msg: "Mail sending unsuccessful" })
            }
            return res.json({ success: true, msg: "Mail sending successful" })
            // console.log(result);

        } catch (err) {
            console.log("error in signin controller", err);
            res.status(500).send("Something went wrong");
        }

    }
}