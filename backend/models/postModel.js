const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter product Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    imageUrl: String, // Add a field to store the Cloudinary image URL
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Post", postModel);