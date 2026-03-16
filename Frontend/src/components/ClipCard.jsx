const ClipCard = ({ clip }) => {

  const handleDownload = async () => {
    const response = await fetch(clip);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = clip.split("/").pop();

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="bg-white p-2 shadow rounded">

      <video
        src={clip}
        controls
        className="rounded"
      />

      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-3 py-1 mt-2 rounded w-full"
      >
        Download
      </button>

    </div>
  );
};

export default ClipCard;