const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require("../controller/user");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/:id/followUser", followUser);
router.put("/:id/unfollowUser", unfollowUser);

module.exports = router;
