import React from "react";
import { ClipLoader } from "react-spinners";

interface ContentUploadProgressProps {
  isLoading?: boolean;
  progress?: number;
  className?: string;
}

const ContentUploadProgress: React.FC<ContentUploadProgressProps> = ({
  isLoading = false,
  progress = 0,
  className = "",
}) => {
  return (
    <div
      className={`bg-[#F5F4F0] aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl flex flex-col gap-6 justify-center items-center ${className}`}
    >
      <ClipLoader
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
        size={50}
      />
      <div className="w-2/3 h-5 border border-primary rounded-full">
        <div
          className="bg-geni-pink h-full p-[1px] rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ContentUploadProgress;
