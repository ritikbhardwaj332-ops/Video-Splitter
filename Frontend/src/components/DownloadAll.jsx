import JSZip from "jszip";
import { saveAs } from "file-saver";

const DownloadAll = ({ clips }) => {

  const downloadAll = async () => {

    const zip = new JSZip();

    for (let i = 0; i < clips.length; i++) {

      const response = await fetch(clips[i]);
      const blob = await response.blob();

      zip.file(`clip-${i + 1}.mp4`, blob);
    }

    const zipFile = await zip.generateAsync({ type: "blob" });

    saveAs(zipFile, "video-clips.zip");
  };

  return (
    <button
      onClick={downloadAll}
      className="bg-purple-600 text-white px-6 py-2 rounded mt-6"
    >
      Download All Clips
    </button>
  );
};

export default DownloadAll;