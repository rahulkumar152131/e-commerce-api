import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: [5, "Name can't be less than 5 characters"],
        maxLength: [25, "Name can't be greate than 25 characters"]
    },
    email: {
        type: String,
        select:false,
        // unique: [true, "Email already exists."],
        required: [true, "Email is required"],
        validate: [
            {
                validator: async function (value) {
                    const user = await this.constructor.findOne({ email: value });
                    return !user; // Return true if email is unique, false if not
                },
                message: 'You are Already Registered',
            },
            {
                validator: function (value) {
                    return /.+\@.+\../.test(value);
                },
                message: 'Email Formate is not Valid',
            },
        ],
    },
    password: {
        type: String,
        unique: false,
        select: false,
        validate: {
            validator: async function (value) {
                const errors = [];
                if (value.length < 8 || value.length > 24) {
                    errors.push("Password must be between 8 and 24 characters.");
                }
                if (!/[A-Z]/.test(value)) {
                    errors.push("Password must contain at least one uppercase letter.");
                }

                if (!/[a-z]/.test(value)) {
                    errors.push("Password must contain at least one lowercase letter.");
                }

                if (!/\d/.test(value)) {
                    errors.push("Password must contain at least one digit.");
                }

                if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
                    errors.push("Password must contain at least one special character.");
                }

                if (errors.length > 0) {
                    throw errors;
                }

                this.password = await bcrypt.hash(value, 12);
                return true;
            },
            message: "Invalid password"
        },
        required: [true, "Password is required"],

    },
    type: {
        type: String,
        required: [true, "User type is required"],
        enum: { values: ["customer", "seller"], message: '{VALUE} is not supported' }
    },
    profileImage: {
        type: String,
        required: [true, "Profile Image is required"],
    }
})

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const userModel = mongoose.model("users", userSchema);
export default userModel;