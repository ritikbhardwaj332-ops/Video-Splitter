const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

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
          .output(output)
          .on("end", () => {

            clips.push(`http://localhost:5000/${output}`);

            start += segmentTime;
            index++;

            processClip();
          })
          .on("error", reject)
          .run();

      };

      processClip();

    });

  });

};

module.exports = splitVideo;