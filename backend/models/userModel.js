const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        select: false,
    },
})

module.exports = mongoose.model("User", userSchema);