require('dotenv').config();
const express = require("express");
const cors = require("cors")
const app = express();

const router = require("./router/router");
// DB connection ............
require("./config/db");

//body parser .........
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotuer ........
app.use(router);

// server ..........................
app.listen(process.env.PORT,()=>{
    console.log(`Server = ${process.env.BASE_URL}${process.env.PORT}`);
});