const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfully established");
  })
  .catch((err) => {
    console.log(err);
  });
