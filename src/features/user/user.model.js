import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
    constructor(name, email, password, type, profileImage) {
        this.userName = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.profileImage = profileImage;
    }
    // static async signUp(name, email, password, type, profileImage) {
    //     try {
    //         //1. get the database
    //         const db = getDB();
    //         console.log(db);
    //         //2. get the collection
    //         const collection = db.collection('users');
    //         //3.
    //         const alreadyUser = users.some((user) => user.email == email);
    //         // console.log(alreadyUser, 'already');
    //         if (!alreadyUser) {
    //             const newUser = new UserModel(name, email, password, type, profileImage);
    //             await collection.insertOne(newUser);
    //             return { success: true, res: newUser };
    //         } else {
    //             return { success: false, res: "User is already Registered" };
    //         }
    //     } catch (err) {
    //         throw ApplicationError('Something went wrong', 500);
    //     }

    // }
    // static signIn(email, password) {
    //     const user = users.find((user) => user.email == email && user.password == password);
    //     return user;
    // }
    // static getAllUser() {
    //     return users;
    // }
}
