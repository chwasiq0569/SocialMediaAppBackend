const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const connectDB = require("./config/db");
var cors = require("cors");

const app = express();

dotenv.config();
app.use(cors());

connectDB();

app.use(express.json());
app.use(express.static("./public"));

// app.use("/public/images", express.static(__dirname + "/public/images/"));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
