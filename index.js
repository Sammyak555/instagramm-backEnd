// const express = require("express");
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const dotenv = require('dotenv')
// const helmet = require('helmet')
// const multer = require('multer')
import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv"
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import  {register}  from "./Controllers/auth.js";
import authRoutes from "./Routes/auth.js"

/*CONFIGURATION*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit:"30mb" , extended : true }))
app.use(bodyParser.urlencoded({ limit: "30mb" ,extended : true }));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) /*here we are setting the
directory where we are going to store assets ie images
*/
// FILE STORAGE

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/assets')
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

//Routes with files

app.post('/auth/register', upload.single('picture', register))

//Routes 

app.use('/auth',authRoutes)

// Mongoose Setup

const PORT = process.env.PORT || 8081

mongoose.connect(process.env.mongoURl, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=> {
    app.listen(PORT, () => {
        console.log(`connected to ${PORT}`)
    })
}).catch((err)=>console.log(`didnt connect`,err))
