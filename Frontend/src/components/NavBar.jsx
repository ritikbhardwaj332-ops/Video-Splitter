import { FaVideo } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xl font-bold">
        <FaVideo />
        Video Splitter
      </div>

      <div className="text-sm">
        Split long videos into clips
      </div>
    </div>
  );
};

export default Navbar;
