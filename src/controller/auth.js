const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res) => {
  let profilePicUrl;
  if (req.file) {
    profilePicUrl = req.file.filename;
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const userCreated = await user.save();
    userCreated
      ? res.status(200).json(user)
      : res.status(400).json({ message: "User not Created" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("loginUser: ", user);
    if (user) {
      const passwordMathced = await bcrypt.compare(
        req.body.password,
        user.password
      );
      passwordMathced
        ? res.status(200).json(user)
        : res.status(400).json({ message: "Invalid Email or Password" });
    } else {
      res.status(400).json({ message: "User not Found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
