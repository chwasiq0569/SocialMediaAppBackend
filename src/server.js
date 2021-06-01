const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const connectDB = require("./config/db");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
