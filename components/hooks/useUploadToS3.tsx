import { useState } from "react";
import axios from "axios";

const useS3Upload = () => {
  const [progress, setProgress] = useState<{ video: number; image: number }>({
    video: 0,
    image: 0,
  });

  const [isUploading, setIsUploading] = useState<{
    video: boolean;
    image: boolean;
  }>({
    video: false,
    image: false,
  });

  const uploadToS3 = async (
    url: string,
    file: File,
    type: "video" | "image"
  ): Promise<boolean> => {
    setIsUploading((prev) => ({ ...prev, [type]: true }));
    setProgress((prev) => ({ ...prev, [type]: 0 }));

    try {
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress((prev) => ({ ...prev, [type]: percentCompleted }));
          }
        },
      });

      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    } finally {
      setIsUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return { uploadToS3, progress, isUploading };
};

export default useS3Upload;
