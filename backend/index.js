const express = require("express");
const app = express();
require("dotenv").config();


const electionRouter = require("./routes/electionRouter");
app.use("/", electionRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING`);
});