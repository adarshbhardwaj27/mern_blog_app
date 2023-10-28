const User = require('../models/userModel');
const cloudinary = require('cloudinary');
const Post = require('../models/postModel');
const getDataUri = require('../dataUri');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (password != user.password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ user }, 'secret', { expiresIn: '1d' });


        res.json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.verifyuser = async (req, res) => {
    try {
        jwt.verify(req.headers.tokennum, 'secret', async (err, data) => {
            if (err) {
                res.status(401).json({
                    status: 'fail',
                    message: 'Invalid token',
                    error: err
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'User verified successfully'
                })
            }

        })

    } catch (err) {
        res.send(err)
    }
}
exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({
            username,
            password,
        });
        const token = jwt.sign({ user }, 'secret', { expiresIn: '1d' });
        res.status(201).json({
            status: 'success',
            data: {
                user
            },
            token
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }

}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }

}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }

}



exports.createPost = async (req, res) => {
    try {
        const jwtdecode = jwt_decode(req.body.author);


        // Create a new post with the image URL
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            author: jwtdecode.user._id,
        });

        // Save the new post to the database
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
};

exports.upload = async (req, res) => {
    try {

        const file = req.file;

        const fileUri = getDataUri(file);
        const result = await cloudinary.v2.uploader.upload(fileUri.content, {
            folder: 'uploads',
        });
        res.status(201).json(result.secure_url);
    } catch (error) {
        res.status(500).json(error)
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getmyposts = async (req, res) => {
    try {
        authorid = (jwt_decode(req.params.author)).user._id;
        const post = await Post.find({ author: authorid }).populate('author');
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.updatePost = async (req, res) => {
    const jwtdecode = jwt_decode(req.body.author).user._id;
    req.body.author = jwtdecode;
    const objectId = new ObjectId(req.params.id);
    try {

        // req.params.id = jwtdecode.user._id;
        const update = { $set: req.body };



        const result = await Post.updateOne(
            { _id: objectId }, // Filter by the document's ID
            update
        );
        await Post.updateOne(
            { _id: objectId }, // Filter by the document's ID
            {
                $set: {
                    updatedAt: Date.now(),
                }
            }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).json({ message: 'Post updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const result = await Post.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(200).json({ message: 'Post deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}