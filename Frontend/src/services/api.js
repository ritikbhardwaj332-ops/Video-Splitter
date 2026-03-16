import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/video"
});

export const uploadVideo = async (video, duration, setProgress) => {

  const formData = new FormData();

  formData.append("video", video);
  formData.append("duration", duration);

  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    }
  });

  return response.data;
};