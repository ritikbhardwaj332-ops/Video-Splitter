import { useState } from "react";

const VideoUpload = ({ onUpload }) => {

  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(90);

  const handleUpload = () => {

    if (!video) {
      alert("Please select a video");
      return;
    }

    onUpload(video, duration);
  };

  return (
    <div className="bg-white p-6 rounded shadow text-center">

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        className="mb-4"
      />

      <div className="mb-4">

        <label className="mr-2 font-medium">
          Clip Duration (seconds):
        </label>

        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-1 rounded w-20"
          min="10"
        />

      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Upload & Split
      </button>

    </div>
  );
};

export default VideoUpload;