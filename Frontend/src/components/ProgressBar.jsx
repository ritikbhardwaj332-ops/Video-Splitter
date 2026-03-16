const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded mt-4">
      <div
        className="bg-green-500 text-xs text-white text-center p-1 rounded"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
