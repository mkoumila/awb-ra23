import Image from "next/image";
import { Animate } from "./Animate";
import { useEffect, useState } from "react";
import { SliderThumbnail } from "./SliderThumbnailComponent";
import VideoPlayer from "./VideoPlayer";

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
  isVisible,
  swiperInstance,
  openMenuOverlay,
  resetOverlayVisibility,
  paginationText,
  isMultiple,
  children,
}) => {
  // Control the visibility of the overlay using the isVisible prop
  const overlayStyle = { display: isVisible.find(el => el.id === id)?.visibility ? "none" : "flex" };

  // State to handle showing video component
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const videoElement = videoRefs.current[id]?.current;
    if (videoElement) {
      videoElement.controls = false; // Attempt to explicitly remove controls
      videoElement.setAttribute("playsinline", ""); // Encourage inline playback on iOS
      videoElement.setAttribute("webkit-playsinline", ""); // For older iOS webviews
      videoElement.removeAttribute("controls"); // Ensure controls attribute is removed
    }
  }, [index]);

  // Play or pause the video
  /*  const togglePlayPause = () => {
    const videoElement = videoRefs.current[index].current;
    if (videoElement) {
      if (videoElement.paused || videoElement.ended) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  }; */

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
                  // To show the video component ( for better performance )
                  setShowVideo(true);
                  // Play the video
                  playVideo(id);
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
        {/* Pagination */}
        {/* {paginationText && !isVisible.some((el) => el === false) && (
          <SwiperPagination
            swiperInstance={swiperInstance}
            paginationText={paginationText}
          />
        )} */}
      </div>
      {showVideo && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center z-[10]"
          style={overlayStyle}
        >
          <VideoPlayer
            cloudinaryName={cloudinaryName}
            video={video}
            videoRefs={videoRefs}
            index={index}
            id={id}
            swiperInstance={swiperInstance}
            resetOverlayVisibility={resetOverlayVisibility}
          />
        </div>
      )}
    </div>
  );
};

export const ControlsMobile = ({
  swiperInstance,
  resetOverlayVisibility,
  videoRefs,
  id
}) => {
  const [isMuted, setIsMuted] = useState(false); // Initial mute status

  // Adjusted toggleMute function to update state
  const toggleMute = () => {
    const videoElement = videoRefs.current[id].current;
    if (videoElement) {
      const currentMuteStatus = videoElement.muted;
      videoElement.muted = !currentMuteStatus;
      setIsMuted(!currentMuteStatus); // Update state to reflect change
    }
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href; // Includes the hash

    // Check if the Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: "Share This Page",
          url: currentUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback to opening the share URL in a new tab/popup
      const shareUrl = `https://www.addtoany.com/share?url=${encodeURIComponent(
        currentUrl
      )}`;
      const popupFeatures = `width=300,height=300,resizable=yes,scrollbars=yes,status=yes`;
      window.open(shareUrl, "Share", popupFeatures);
    }
  };

  const [isPaused, setIsPaused] = useState(false);
  const togglePlayPause = () => {
    const videoElement = videoRefs.current[id].current;
    if (videoElement) {
      if (videoElement.paused || videoElement.ended) {
        videoElement.play();
        setIsPaused(false);
      } else {
        videoElement.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-5 items-center">
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center transition-all bg-black bg-opacity-10 cursor-pointer"
        onClick={() => {
          resetOverlayVisibility();
          setIsPaused(false);
        }}
      >
        <Image src="/close.svg" width={14} height={14} alt="Slide Up" />
      </div>

      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer"
        onClick={() =>
          !(swiperInstance?.realIndex === swiperInstance?.slides.length - 1)
            ? swiperInstance.slideNext()
            : swiperInstance.slideTo(1)
        }
      >
        <Image
          src="/forward.svg"
          width={14}
          height={14}
          alt="Slide Up"
          className="group-hover:brightness-0"
        />
      </div>
      <div
        className="flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full bg-orange"
        onClick={togglePlayPause}
      >
        <Image
          src={isPaused ? "/play.svg" : "/pause.svg"}
          width={21}
          height={24}
          alt={isPaused ? "play video" : "pause video"}
          className={isPaused ? "ml-2" : null}
        />
      </div>
      <div className="h-9 w-9 border border-white rounded-full flex items-center justify-center transition-all bg-black bg-opacity-10 cursor-pointer">
        <div className="w-full h-full a2a_kit a2a_kit_size_32 a2a_default_style">
          <div
            className="w-full h-full flex items-center justify-center a2a_dd"
            onClick={handleShareClick}
          >
            <Image src="/share.svg" width={14} height={14} alt="Slide Up" />
          </div>
        </div>
      </div>
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center transition-all bg-black bg-opacity-10 cursor-pointer"
        onClick={() => toggleMute()}
      >
        <Image
          src={isMuted ? "/sound-off.svg" : "/sound-on.svg"} // Conditional image source based on mute status
          width={20}
          height={20}
          alt={isMuted ? "Sound off" : "Sound on"}
        />
      </div>
    </div>
  );
};

export default SwiperItemMobile;
