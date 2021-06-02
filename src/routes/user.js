const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
} = require("../controller/user");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/:id/followUser", followUser);

module.exports = router;
