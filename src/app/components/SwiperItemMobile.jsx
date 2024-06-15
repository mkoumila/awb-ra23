import Image from "next/image";
import { Animate } from "./Animate";
import { useEffect } from "react";
import { SliderThumbnail } from "./SliderThumbnailComponent";

const SwiperItemMobile = ({
  cloudinaryName,
  title,
  content,
  delai,
  image,
  alt,
  video,
  index,
  id,
  playVideo,
  videoRefs,
  swiperInstance,
  openMenuOverlay,
  isMultiple,
  children,
  setChosenVideo,
}) => {
  useEffect(() => {
    const videoElement = videoRefs.current[id]?.current;
    if (videoElement) {
      videoElement.controls = false; // Attempt to explicitly remove controls
      videoElement.setAttribute("playsinline", ""); // Encourage inline playback on iOS
      videoElement.setAttribute("webkit-playsinline", ""); // For older iOS webviews
      videoElement.removeAttribute("controls"); // Ensure controls attribute is removed
    }
  }, [index]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 relative">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75 grayscale"
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${image}`}
          alt={alt}
          fill
        />
        <button
          className="bg-transparent border-0 absolute top-6 right-5 z-[4]"
          onClick={openMenuOverlay}
        >
          <Image
            src={"/menu-burger.svg"}
            width={27}
            height={22}
            alt="ouvrir le menu"
          />
        </button>
        <div className="absolute top-0 left-0 h-full w-full bg-yellow-gradient z-[1] flex items-center justify-center">
          {video && (
            <>
              <div
                onClick={() => {
                  // Play the video
                  playVideo(id);
                  setChosenVideo({ openVideo: true, video: video, id: id });
                }}
                className="flex flex-col items-center gap-1"
              >
                <Image
                  src="/play-circle.svg"
                  width={80}
                  height={80}
                  alt="play video"
                  className="xl:w-[124px] xl:h-[124px]"
                />
                <p className="text-white text-[25px] font-bold tracking-[0.5px]">
                  {delai}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col py-4">
        <Animate animationType="fade" duration={1000} triggerOnce={false}>
          {title && (
            <h2 className="uppercase font-montserrat text-[40px] font-light leading-[40px] tracking-[-1.6px] mx-[21px] mb-2">
              {title}
            </h2>
          )}
          {content && (
            <p className="text-lg font-bold leading-[20px] mx-[21px] mb-8">
              {content}
            </p>
          )}
        </Animate>

        {isMultiple ? (
          <SliderThumbnail
            slideChildrenData={children}
            swiperInstance={swiperInstance}
            cloudinaryName={cloudinaryName}
          />
        ) : null}

        {/* Show Next Slide Arrow only if it's not the last slide */}
        {!(
          swiperInstance?.realIndex ===
          swiperInstance?.slides?.length - 1
        ) && (
          <div
            className="brightness-0 ml-auto mr-8"
            onClick={() => swiperInstance?.slideNext()}
          >
            <Image
              src="/arrow-down.svg"
              width={20}
              height={20}
              alt="Go to next slide"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SwiperItemMobile;
