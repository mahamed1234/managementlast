import express from "express";
import api from './routes/index.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";

dotenv.config()
mongoose.connect(process.env.MONGODB_PATH, () => {
    console.log('connect');
}, (e) => console.log(e))

const app = express()

app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url);
    next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,

}));

app.use((req, res, next) => {
    console.log('Headers after CORS:', res.getHeaders());
    next();
});
app.use(express.json())
app.use(express.urlencoded())

app.use(api)

app.listen(9000, () => {
    console.log(`Your app is running in http://localhost:9000`)
})
