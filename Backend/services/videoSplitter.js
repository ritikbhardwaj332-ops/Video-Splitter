const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// create clips folder if not exists
if (!fs.existsSync("clips")) {
  fs.mkdirSync("clips");
}

const splitVideo = (videoPath, segmentTime) => {

  return new Promise((resolve, reject) => {

    const clips = [];

    ffmpeg.ffprobe(videoPath, (err, metadata) => {

      if (err) return reject(err);

      const duration = metadata.format.duration;

      let start = 0;
      let index = 0;

      const processClip = () => {

        if (start >= duration) {
          return resolve(clips);
        }

        const output = `clips/clip_${index}.mp4`;

        ffmpeg(videoPath)
          .setStartTime(start)
          .setDuration(segmentTime)
          .videoFilters([
            `pad=iw:ih+120:0:120:color=black`,
            `drawtext=fontfile=C\\:/Windows/Fonts/arial.ttf:text='Part ${index + 1}':x=(w-text_w)/2:y=40:fontsize=50:fontcolor=white:box=1:boxcolor=black@0.6`
          ])
          .outputOptions([
            "-preset ultrafast"
          ])
          .output(output)
          .on("end", () => {

            clips.push(`http://localhost:5000/${output}`);

            start += segmentTime;
            index++;

            processClip();

          })
          .on("error", (err, stdout, stderr) => {

            console.error("FFMPEG ERROR:", stderr);
            reject(err);

          })
          .run();

      };

      processClip();

    });

  });

};

module.exports = splitVideo;