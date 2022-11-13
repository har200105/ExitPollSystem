const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const { Handler } = require("./errorMiddlewares/error");
require("dotenv").config();
require("./db/db");


cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const partyRouter = require("./router/partyRouter");
const voterRouter = require("./router/voterRouter");
const adminRouter = require("./router/adminRouter");
const voterIDCardRouter = require("./router/voterIDCardRouter");

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use("/",voterRouter);
app.use("/",partyRouter);
app.use("/", adminRouter);
app.use("/", voterIDCardRouter);


app.use(Handler);


app.listen(PORT, (err, res) => {
  console.log(`Server is Running`);
});
