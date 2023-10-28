const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const MONGOOSE_URI = 'mongodb+srv://adarsh27:adarsh123@cluster0.sg7yuei.mongodb.net/?retryWrites=true&w=majority'

const corsOptions = {
    origin: "http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Allow cookies, if your app uses them
};


app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data) => {
    console.log(`Connected to MongoDB ${data.connection.host}`);
}).catch((err) => {
    console.log(err);
});

cloudinary.v2.config({
    cloud_name: 'dhc0yrl3p',
    api_key: '877752656695247',
    api_secret: 'bZ_-Qv_VWPWYMyozRz-chL3G5tQ',
    secure: true,
});


const routes = require('./router');

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Connected Succesfully to port ${PORT}`);
})