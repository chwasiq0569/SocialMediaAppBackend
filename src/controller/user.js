const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log(req.body.password);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      );
      if (updatedUser) {
        console.log("Updated User: ", updatedUser);
        return res.status(200).json(updatedUser);
      } else {
        console.log("User not Updated");
        return res.status(400).json({ message: "Account is not Updated!" });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res
      .status(500)
      .json({ message: "You can update only your account!" });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      if (updatedUser) {
        console.log("Updated User: ", updatedUser);
        return res.status(200).json({ message: "Account Deleted" });
      } else {
        console.log("User not Deleted");
        return res.status(400).json({ message: "Account is not Deleted!" });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res
      .status(500)
      .json({ message: "You can delete only your account!" });
  }
};
