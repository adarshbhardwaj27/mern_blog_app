const express = require('express');
const { createUser, getAllUser, getUser, createPost, getAllPosts, getPost, updatePost, deletePost, login, verifyuser, upload, getmyposts } = require('./controllers/userController');
const singleUpload = require('./multer');
const router = express.Router();


router.route('/createuser').post(createUser);
router.route('/getallusers').get(getAllUser);
router.route('/getuser/:id').get(getUser);
router.route('/login').post(login);
router.route('/verifyuser').post(verifyuser);
router.route('/createpost').post(singleUpload, createPost);
router.route('/upload').post(singleUpload, upload);
router.route('/getallposts').get(getAllPosts);
router.route('/getpost/:id').get(getPost);
router.route('/getmyposts/:author').get(getmyposts);
router.route('/updatepost/:id').put(singleUpload, updatePost);
router.route('/deletepost/:id').delete(deletePost);

module.exports = router;