import { useState } from "react";
import Navbar from "../components/NavBar";
import VideoUpload from "../components/VideoUpload";
import ProgressBar from "../components/ProgressBar";
import ClipCard from "../components/ClipCard";
import { uploadVideo } from "../services/api";
import DownloadAll from "../components/DownloadAll";

const Home = () => {

    const [progress, setProgress] = useState(0);
    const [clips, setClips] = useState([]);
    
    const handleUpload = async (video, duration) => {

        try {

            setProgress(0);

            const result = await uploadVideo(video, duration, setProgress);

            setClips(result.clips);

        } catch (error) {

            console.error(error);
            alert("Video upload failed");

        }
    };

    return (
        <div>

            <Navbar />

            <div className="max-w-4xl mx-auto mt-10">

                <VideoUpload onUpload={handleUpload} />

                {progress > 0 && <ProgressBar progress={progress} />}
                {clips.length > 0 && (
                    <DownloadAll clips={clips} />)}

                <div className="grid grid-cols-3 gap-4 mt-6">
                    {clips.map((clip, index) => (
                        <ClipCard key={index} clip={clip} />
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Home;