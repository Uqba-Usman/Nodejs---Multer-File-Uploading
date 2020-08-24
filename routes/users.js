var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res) => {
  if (req.files) {
    var file = req.files.filename,
      filename = file.name;
    file.mv("public/upload" + filename, (err) => {
      if (err) {
        console.log("ERROR: ", err);
        res.send("ERROR OCCURED");
      } else {
        res.send("DONE...");
      }
    });
  }
});

module.exports = router;
