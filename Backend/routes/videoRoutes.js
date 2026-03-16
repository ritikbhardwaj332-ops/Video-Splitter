const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddlewares");
const { splitVideo } = require("../controllers/videoController");

router.post("/upload", upload.single("video"), splitVideo);

module.exports = router;
