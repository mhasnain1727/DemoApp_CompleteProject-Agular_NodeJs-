require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const app = express();

// const port = 2000
const port = process.env.Port || 2000

// establishing connection with the database
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}....`)
        })
    } catch (error) {
        console.log(error);
    }
}

// Importing All Routes
const user = require('./routes/user');

// express in built middleware for body-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using Cors before all the routes
app.use(cors())


// Using all routes
app.use('/', user);


start();


// MONGO_URI = mongodb+srv://shivam:shivamsingh97166@nodeexpressproject.ifcex.mongodb.net/QuizApp?retryWrites=true&w=majority
// MONGO_URI = mongodb+srv://mhasnain:mhasnain1727@cluster0.atwao.mongodb.net/test
// ACCESS_TOKEN_SECRET=25dc40b74921b445b3998e3a62317c6875ad99483289e2c966b3bb17c105c381b1f9e95e9cddc6cfb10e9d157435d437c0e32110c89fc6437a2697502cc58170