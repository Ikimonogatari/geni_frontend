import { useUploadFileMutation } from "@/app/services/service";
import { useEffect, useState, useRef } from "react";
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
  // Track initial images that haven't been removed
  const [activeInitialImages, setActiveInitialImages] =
    useState<ImageData[]>(initialImages);
  // Track newly uploaded images
  const [newImages, setNewImages] = useState<ImageData[]>([]);
  // Track if initial images have been set
  const initialImagesSet = useRef(false);

  // Update initial images only once when they first arrive
  useEffect(() => {
    if (!initialImagesSet.current && initialImages.length > 0) {
      setActiveInitialImages(initialImages);
      initialImagesSet.current = true;
    }
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
    // Calculate which array the index belongs to
    const initialImagesLength = activeInitialImages.length;

    if (index < initialImagesLength) {
      // Remove from initial images
      const imageToRemove = activeInitialImages[index];
      setActiveInitialImages((prev) =>
        prev.filter((img) => img.fileId !== imageToRemove.fileId)
      );
      onRemove && onRemove(imageToRemove.fileId);
    } else {
      // Remove from new images
      const newIndex = index - initialImagesLength;
      const imageToRemove = newImages[newIndex];
      if (imageToRemove) {
        setNewImages((prev) =>
          prev.filter((img) => img.fileId !== imageToRemove.fileId)
        );
        onRemove && onRemove(imageToRemove.fileId);
      }
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

  // Combine active initial images and new images for display
  const allImages = [...activeInitialImages, ...newImages];

  return {
    getRootProps,
    getInputProps,
    images: allImages,
    uploadFileLoading,
    removeImage,
  };
}

export { useMediaUpload };
