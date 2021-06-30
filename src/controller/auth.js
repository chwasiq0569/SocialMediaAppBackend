const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  let profilePicUrl;
  if (req.file) {
    profilePicUrl = req.file.filename;
  }
  try {
    User.findOne({
      email: req.body.email,
    })
      .then(async (user) => {
        if (user) {
          res.status(400).json({
            status: 0,
            message: "User Already Exists",
          });
        } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
          const userCreated = await user.save();
          userCreated
            ? res.status(200).json({
                status: 1,
                user,
              })
            : res.status(400).json({ status: 0, message: "User not Created" });
        }
      })
      .catch((err) =>
        res.status(400).json({
          message: "Something Went Wrong while Finding or Creating User!!",
        })
      );
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("loginUser: ", user);
    if (user) {
      const passwordMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordMatched) {
        let token = jwt.sign({ user: user }, process.env.JWT_SECURITY_KEY, {
          expiresIn: "1h",
        });
        res.status(201).json({
          status: 1,
          user,
          token,
        });
      } else {
        res
          .status(400)
          .json({ status: 0, message: "Invalid Email or Password" });
      }
    } else {
      res.status(400).json({ status: 0, message: "User not Found" });
    }
  } catch (err) {
    res.status(500).send({
      status: 0,
      err,
    });
  }
};
