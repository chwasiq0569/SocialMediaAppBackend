const router = require("express").Router();
const { updateUser, deleteUser } = require("../controller/user");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
