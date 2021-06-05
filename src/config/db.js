const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("DB Connection Established");
    })
    .catch((err) => {
      console.log("Connection Failed", err);
    });
};

module.exports = connectDB;
