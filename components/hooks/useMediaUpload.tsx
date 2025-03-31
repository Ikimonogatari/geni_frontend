import { useUploadFileMutation } from "@/app/services/service";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface ImageData {
  url: string;
  fileId: string;
}

function useMediaUpload({
  onDrop,
  onRemove,
  initialImages = [],
}: {
  onDrop?: ({ ids }: { ids: string[] }) => void;
  onRemove?: (fileId: string) => void;
  initialImages?: { url: string; fileId: string }[];
}) {
  // Track both initial and new images separately
  const [initialImageState, setInitialImageState] =
    useState<ImageData[]>(initialImages);
  const [newImages, setNewImages] = useState<ImageData[]>([]);

  // Combined images for display
  const [allImages, setAllImages] = useState<ImageData[]>([]);

  useEffect(() => {
    setAllImages([...initialImageState, ...newImages]);
  }, [initialImageState, newImages]);

  // Update initial images when prop changes
  useEffect(() => {
    setInitialImageState(initialImages);
  }, [initialImages]);

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

  const removeImage = (index: number) => {
    const imageToRemove = allImages[index];
    if (!imageToRemove) return;

    // Check if the image is from initial images
    const isInitialImage = initialImageState.some(
      (img) => img.fileId === imageToRemove.fileId
    );

    if (isInitialImage) {
      // Remove from initial images and notify parent
      setInitialImageState((prev) =>
        prev.filter((img) => img.fileId !== imageToRemove.fileId)
      );
      onRemove && onRemove(imageToRemove.fileId);
    } else {
      // Remove from newly uploaded images and notify parent
      setNewImages((prev) =>
        prev.filter((img) => img.fileId !== imageToRemove.fileId)
      );
      onRemove && onRemove(imageToRemove.fileId);
    }
  };

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

        const newImageData = validResponses.map((response) => ({
          url: response.Url,
          fileId: response.FileId,
        }));

        setNewImages((prev) => [...prev, ...newImageData]);

        // Extract just the FileIds for the onDrop callback
        const ids = validResponses.map((response) => response.FileId);
        onDrop && onDrop({ ids });
      });
    },
  });

  return {
    getRootProps,
    getInputProps,
    images: allImages,
    uploadFileLoading,
    removeImage,
  };
}

export { useMediaUpload };
