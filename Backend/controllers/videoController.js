const path = require("path");
const splitVideoService = require("../services/videoSplitter");

exports.splitVideo = async (req, res) => {

  try {

    const videoPath = req.file.path;

    // convert duration to number
    const duration = parseInt(req.body.duration) || 90;

    const clips = await splitVideoService(videoPath, duration);

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