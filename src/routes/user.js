const router = require("express").Router();
const { updateUser } = require("../controller/user");

router.put("/update/:id", updateUser);

module.exports = router;
