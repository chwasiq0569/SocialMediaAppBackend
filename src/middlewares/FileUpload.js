const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // setting destination of uploading files
    if (file.fieldname === "postImage") {
      // if uploading profile
      cb(null, "./public/PostImages");
    } else if (file.fieldname === "profilePicture") {
      // if uploading profile
      cb(null, "./public/PostImages");
    } else if (file.fieldname === "coverPicture") {
      // else uploading image
      cb(null, "./public/CoverImages");
    }
  },
  filename: (req, file, cb) => {
    // naming file
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});
module.exports = upload = multer({
  storage: fileStorage,
});
