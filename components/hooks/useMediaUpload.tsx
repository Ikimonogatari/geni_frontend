import { useUploadFileMutation } from "@/app/services/service";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

function useMediaUpload({
  onDrop,
}: {
  onDrop?: ({ ids }: { ids: string[] }) => void;
}) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = useUploadFileMutation();

  useEffect(() => {
    if (uploadFileError) {
      //@ts-ignore
      toast.error(uploadFileError?.data?.error || "Error uploading file");
    }
  }, [uploadFileData, uploadFileError]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      const fileUploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "product-pic");

        const response = await uploadFile(formData);
        if (response.data) {
          return response.data;
        } else {
          return null;
        }
      });

      Promise.all(fileUploadPromises).then((responses) => {
        const validResponses = responses.filter(
          (response) => response !== null
        );
        const urls = validResponses.map((response) => response.Url);

        const ids = validResponses.map((response) => response.FileId);

        setImageUrls((prev) => [...prev, ...urls]);

        onDrop && onDrop({ ids });
      });
    },
  });

  return {
    getRootProps,
    getInputProps,
    imageUrls,
    uploadFileLoading,
  };
}

export { useMediaUpload };
