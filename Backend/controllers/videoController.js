const path = require("path");
const fs = require("fs");
const splitVideoService = require("../services/videoSplitter");

exports.splitVideo = async (req, res) => {

  try {

    const videoPath = req.file.path;

    // convert duration to number
    const duration = parseInt(req.body.duration) || 90;

    const clips = await splitVideoService(videoPath, duration);

    // DELETE uploaded video after splitting
    fs.unlink(videoPath, (err) => {
      if (err) {
        console.log("Error deleting uploaded video:", err);
      } else {
        console.log("Uploaded video deleted:", videoPath);
      }
    });

    // AUTO DELETE all clips after 10 minutes
    setTimeout(() => {
      const clipsDir = path.join(__dirname, "../clips"); // adjust path if needed
      fs.readdir(clipsDir, (err, files) => {
        if (err) return console.log("Error reading clips folder:", err);

        files.forEach(file => {
          fs.unlink(path.join(clipsDir, file), (err) => {
            if (err) console.log("Error deleting clip:", file, err);
            else console.log("Deleted clip:", file);
          });
        });
      });
    }, 1 * 60 * 1000); // 10 minutes

    res.json({
      success: true,
      clips
    });

  } catch (error) {

    console.error("VIDEO SPLIT ERROR:", error);

    res.status(500).json({
      message: "Video processing failed"
    });

  }

};