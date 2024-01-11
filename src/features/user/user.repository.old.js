import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository {
    constructor() {
        this.collection = "users"
    }
    async signUp(newUser) {
        try {
            //1. get the database
            const db = getDB();
            // console.log(db);
            //2. get the collection
            const collection = db.collection(this.collection);
            //3.
            const alreadyUser = await collection.findOne({ email: newUser.email });
            // console.log(alreadyUser, 'already');
            if (!alreadyUser) {
                await collection.insertOne(newUser);
                delete newUser.password;
                return { success: true, res: newUser };
            } else {
                return { success: false, res: "User is already Registered" };
            }
        } catch (err) {
            console.log("error in user repository", err);
            throw new ApplicationError('Something went wrong with user collection', 500);
        }

    }
    async findByEmail(email) {
        try {
            const db = getDB();
            //2. get the collection
            const collection = db.collection(this.collection);
            // console.log(email, password);
            return await collection.findOne({ email });
            // console.log(user, 'user');
            // const user = users.find((user) => user.email == email && user.password == password);

        } catch (err) {
            console.log("error in signin", err);
            throw new ApplicationError('Something went wrong with database', 500);
        }

    }
}
export default UserRepository;