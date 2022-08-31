const mongoose = require("mongoose");

const db = async () => {
    await mongoose.connect(process.env.DB_URL);
}

module.exports = db;