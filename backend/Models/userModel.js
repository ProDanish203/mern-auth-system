import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    pass: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password length should be greater than 6 characters"]
    }
},
    { timestamps: true}
)

// Hashing the password
UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt)
})

// Comparing the passwords
UserSchema.methods.comparePassword = async function(userPass){
    const isMatch = await bcrypt.compare(userPass, this.pass);
    return isMatch
}

const userModel = mongoose.model("user", UserSchema);

export default userModel;