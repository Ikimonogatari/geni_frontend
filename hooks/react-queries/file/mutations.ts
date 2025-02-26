import { client } from "@/api/axios";
import {
  PresignUrlDownloadRequestSchema,
  PresignUrlUploadRequestSchema,
  UnknownResponseSchema,
} from "@/api/dtos";
import { createPostMutationHook } from "@/api/helpers";
import { useMutation } from "@tanstack/react-query";

const postDataWithFormData = async (formDataFields: Record<string, any>) => {
  const formData = new FormData();
  for (const key in formDataFields) {
    formData.append(key, formDataFields[key]);
  }
  try {
    const { data } = await client.post(
      process.env.NEXT_PUBLIC_AWS_URL + "/api/admin/private/file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    //   toast.error(`File upload failed: ${error}`);
    throw error;
  }
};

export const useUploadFile = () =>
  useMutation({
    mutationFn: postDataWithFormData,
  });

// POST /api/admin/private/file/presign
export const useUploadByPresignUrl = createPostMutationHook({
  endpoint: "/api/admin/private/file/presign",
  bodySchema: PresignUrlUploadRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/admin/private/file/url
export const useGetImagePresignedUrl = createPostMutationHook({
  endpoint: "/api/admin/private/file/url",
  bodySchema: PresignUrlDownloadRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/admin/private/file/url
export const useGetFilePresignedUrl = createPostMutationHook({
  endpoint: "/api/admin/private/file/url",
  bodySchema: PresignUrlDownloadRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});
