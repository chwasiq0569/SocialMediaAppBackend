const router = require("express").Router();
const multer = require("multer");
const { registerUser, loginUser } = require("../controller/auth");
const { v4: uuidv4 } = require("uuid");

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => { // setting destination of uploading files
//       if (file.fieldname === "profilePicture") { // if uploading profile
//         cb(null, './public/PostImages');
//       } else if(file.fieldname === "coverPicture") { // else uploading image
//         cb(null, './public/CoverImages');
//       }
//     },
//     filename: (req, file, cb) => { // naming file
//       cb(null, file.fieldname+"-"+uuidv4()+path.extname(file.originalname));
//     }
// });

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
