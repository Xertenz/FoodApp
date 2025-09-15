const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

connectDB().then(() => console.log("mongodb connected successfully"));

module.exports = connectDB;
