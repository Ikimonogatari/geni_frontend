import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface ContentReceiveModalProps {
  contentVideoFileId: string;
  contentThumbnailFileId: string;
  caption: string;
  handleDialogTrigger: (videoFileId: string, thumbnailFileId: string) => void;
  contentVideo: string;
  contentThumbnail: string;
  handleContentReceive: (contentId: string) => void;
  copyCaptionToClipboard: (caption: string) => void;
  guidelineScore: number;
  setGuidelineScore: (score: number) => void;
  conceptScore: number;
  setConceptScore: (score: number) => void;
  qualityScore: number;
  setQualityScore: (score: number) => void;
  isCommenting: boolean;
  setIsCommenting: (isCommenting: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
  renderStars: (
    score: number,
    setScore: (score: number) => void,
    playSound: () => void
  ) => React.ReactNode;
  playSound: () => void;
  p: any;
}

function ContentReceiveModal({
  contentVideoFileId,
  contentThumbnailFileId,
  caption,
  handleDialogTrigger,
  contentVideo,
  contentThumbnail,
  handleContentReceive,
  copyCaptionToClipboard,
  guidelineScore,
  setGuidelineScore,
  conceptScore,
  setConceptScore,
  qualityScore,
  setQualityScore,
  isCommenting,
  setIsCommenting,
  comment,
  setComment,
  renderStars,
  playSound,
  p,
}: ContentReceiveModalProps) {
  // Get the file ID from the URL
  const getFileIdFromUrl = (url: string): string => {
    if (!url) return "";
    const segments = url.split("/");
    return segments[segments.length - 1] || "";
  };

  // For the content video
  const videoFileId = contentVideoFileId || getFileIdFromUrl(contentVideo);
  // For the thumbnail image
  const thumbnailFileId =
    contentThumbnailFileId || getFileIdFromUrl(contentThumbnail);

  // Using the download API endpoint
  const getDownloadUrl = (fileId: string): string => {
    return `${process.env.NEXT_PUBLIC_AWS_URL}api/web/file/download/${fileId}`;
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={() =>
          handleDialogTrigger(p.ContentThumbnailFileId, p.ContentVideoFileId)
        }
        type="submit"
        className="border-[1px] border-[#F5F4F0] p-2 rounded-lg d"
      >
        <Image src={"/hamburger-menu-icon.png"} alt="" width={24} height={24} />
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start p-6 max-h-[739px] max-w-[1000px] w-full sm:w-auto lg:w-full rounded-3xl">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-row items-center justify-between">
              <span className="text-base font-semibold">Контент</span>
              {videoFileId &&
                !p.CurrentStepName?.String?.includes("BrandConfirming") && (
                  <a
                    href={getDownloadUrl(videoFileId)}
                    download="video.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#4D55F5] text-sm font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Татах
                  </a>
                )}
            </div>
            {contentVideo ? (
              <div className="relative">
                <video
                  controls
                  controlsList="nodownload"
                  className="aspect-[9/16] w-full h-full rounded-2xl"
                >
                  <source src={contentVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-row items-center justify-between">
              <span className="text-base font-semibold">Thumbnail зураг</span>
              {thumbnailFileId && (
                <a
                  href={getDownloadUrl(thumbnailFileId)}
                  download="thumbnail.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#4D55F5] text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Татах
                </a>
              )}
            </div>
            {contentThumbnail ? (
              <div className="relative">
                <img
                  src={contentThumbnail}
                  alt=""
                  className="aspect-[9/16] w-full h-full rounded-2xl"
                />
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 w-full">
            <div className="w-full flex flex-row items-center justify-between">
              <span className="text-base font-semibold">Тайлбар</span>
              <button
                className="p-2 bg-[#CA7FFE] rounded-xl hidden lg:block"
                onClick={() => copyCaptionToClipboard(p.Caption)}
              >
                <Image
                  src={"/copy-button.png"}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            </div>
            <div className="w-full h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex flex-row items-start gap-2">
                  <span className="w-full text-sm text-[#6F6F6F] p-3 bg-[#F5F4F0] rounded-xl">
                    {p.Caption}
                  </span>
                  <button
                    className="p-2 bg-[#CA7FFE] rounded-xl block lg:hidden"
                    onClick={() => copyCaptionToClipboard(p.Caption)}
                  >
                    <Image
                      src={"/copy-button.png"}
                      alt=""
                      width={24}
                      height={24}
                      className="min-w-4 min-h-4 sm:min-w-6 sm:min-h-6"
                    />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold">
                    Та контент бүтээгчид оноо өгнө үү
                  </span>
                  <div className="border-[1px] border-[#000000] rounded-2xl bg-[#F5F4F0] p-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">
                        Брэндийн өгсөн чиглүүлэгийн дагуу хийсэн эсэх
                      </span>
                      <div className="flex flex-row gap-[6px] items-center">
                        {renderStars(
                          guidelineScore,
                          setGuidelineScore,
                          playSound
                        )}
                      </div>
                      <span className="text-sm">Контентын агуулга</span>
                      <div className="flex flex-row gap-[6px] items-center">
                        {renderStars(conceptScore, setConceptScore, playSound)}
                      </div>
                      <span className="text-sm">Контентын хийцлэл</span>
                      <div className="flex flex-row gap-[6px] items-center">
                        {renderStars(qualityScore, setQualityScore, playSound)}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setIsCommenting(true)}
                          className="text-sm text-[#4D55F5] underline text-start"
                        >
                          Та контент бүтээгчид сэтгэгдэлээ үлдээнэ үү
                        </button>
                        {isCommenting ? (
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="text-sm p-3 h-[127px] w-full lg:max-w-[445px] bg-white outline-none border rounded-xl"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {guidelineScore != 0 && qualityScore != 0 && conceptScore != 0 ? (
              <button
                onClick={() => handleContentReceive(p.ContentId)}
                className="bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
              >
                Хүлээж авах
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContentReceiveModal;
