import { forwardRef } from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaUpload } from "../hooks";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PlusCircleIcon } from "lucide-react";

interface MediaUploaderProps {
  onChange: (file: string) => void;
  onDrop: ({ ids }: { ids: string[] }) => void;
  initialImageUrls?: string[]; // Add this prop for preset values
}

const MediaUploader = forwardRef<HTMLInputElement, MediaUploaderProps>(
  ({ onChange, onDrop, initialImageUrls = [], ...props }, ref) => {
    // Destructure initialImageUrls and merge with imageUrls from the hook
    const { getRootProps, getInputProps, imageUrls, uploadFileLoading } =
      useMediaUpload({ onDrop }); // No need to pass initialImageUrls to the hook

    // Combine the initialImageUrls and the imageUrls from the hook
    const allImageUrls = [...initialImageUrls, ...imageUrls];

    return (
      <div className="flex flex-col w-full">
        {allImageUrls.length < 1 && !uploadFileLoading ? (
          <div
            {...getRootProps()}
            className="cursor-pointer bg-[#F5F4F0] rounded-2xl min-h-[320px] sm:w-[554px] lg:h-[554px] p-5 h-full w-full flex flex-col justify-center items-center gap-4"
          >
            <input {...getInputProps()} />
            <div className="rounded-xl bg-geni-blue w-14 h-14 flex justify-center items-center">
              <Image
                src={"/add-icon.png"}
                width={24}
                height={24}
                alt=""
                className="w-6 h-6"
              />
            </div>
            <p>Зураг оруулах</p>
            <p className="text-center w-full sm:w-2/3 text-xs sm:text-sm">
              Зураг оруулахдаа зөвхөн 1х1 хэмжээтэй дөрвөлжин зураг оруулна уу.
            </p>
          </div>
        ) : (
          <></>
        )}

        {!uploadFileLoading ? (
          allImageUrls.length > 0 && (
            <div className="flex flex-col gap-10 w-full">
              <div className="w-full max-w-[554px]">
                <Swiper
                  style={{
                    // @ts-ignore
                    "--swiper-pagination-color": "#CA7FFE",
                    "--swiper-pagination-bullet-inactive-color": "#CDCDCD",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "10px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                  }}
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                >
                  {allImageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        layout="responsive"
                        width={554}
                        height={554}
                        className="object-cover aspect-square rounded-lg max-w-[554px] max-h-[554px] border shadow-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div
                {...getRootProps()}
                className="bg-[#F5F4F0] rounded-2xl p-5 max-w-[554px] max-h-[554px] min-h-[227px] w-full flex flex-col justify-center items-center gap-4"
              >
                <input {...getInputProps()} />
                <div className="rounded-xl bg-geni-blue w-14 h-14 flex justify-center items-center">
                  <PlusCircleIcon color="white" size={26} />
                </div>
                <p>Нэмэлт зураг оруулах</p>
              </div>
            </div>
          )
        ) : (
          <div className="max-w-[554px] max-h-[554px] w-full h-full flex justify-center items-center">
            <ClipLoader
              loading={uploadFileLoading}
              aria-label="Loading Spinner"
              data-testid="loader"
              size={50}
            />
          </div>
        )}
      </div>
    );
  }
);

export default MediaUploader;
