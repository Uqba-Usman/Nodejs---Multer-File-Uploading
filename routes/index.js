var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "public/upload",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    // checkFileType(file, cb);
  },
}).single("myimage");

//Check File Type
const checkFileType = (file, cb) => {
  // Allowed extensions
  const fileTypes = /jpeg|jpg|png|gif/;
  //Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //Check mimetype
  const mimeType = fileTypes.test(file.mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("ERROR: Images Only");
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("ERROR: ", err);
      res.render("index", { msg: err });
    } else {
      console.log(req.file);
      res.send("test");
    }
  });
});

module.exports = router;
