import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const VideoPlayer = ({ cloudinaryName, video, videoRefs, id }) => {
  return (
    <CloudinaryContext
      cloudName={cloudinaryName}
      className="lgDown:flex lgDown:items-center fixed w-full h-full top-0 left-0 lg:overflow-hidden"
    >
      <Video
        publicId={video}
        className="relative lg:h-full lg:w-full lg:object-contain"
        innerRef={videoRefs.current[id]} // Link the ref to the video element
        poster=""
        secure="true"
        preload="metadata"
        playsInline // This prop ensures inline playback on iOS.
        webkit-playsinline="true" // This ensures inline playback on older webkit browsers.
      >
        <Transformation fetchFormat="webm" quality="auto" />
      </Video>
    </CloudinaryContext>
  );
};

export const ControlsDesktop = ({
  swiperInstance,
  resetOverlayVisibility,
  videoRefs,
  id,
  chosenVideo,
  setChosenVideo,
}) => {
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        const videoElement = videoRefs.current[id].current;
        if (videoElement) {
          resetOverlayVisibility();
          setIsPaused(false);
          setChosenVideo({
            openVideo: false,
            isThumbnail: false,
            video: null,
            id: null,
          });
        }
      }
    });
  }, []);
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

  // Play or pause the video
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

  // Controls visibility
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer;

    const handleMouseMove = () => {
      clearTimeout(timer); // Clear the previous timer on mouse move
      setIsVisible(true); // Make sure the div is visible when the mouse moves

      // Set a new timer to hide the div after 3 seconds of inactivity
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    // Add event listener to the whole document to track mouse movement
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer); // Also clear the timer to prevent it from running after component unmounts
    };
  }, []);

  const handleShareClick = () => {
    const currentUrl = `${window.location.href}`; // This includes the hash
    const shareUrl = `https://www.addtoany.com/share?url=${encodeURIComponent(
      currentUrl
    )}`;
    // Specify dimensions and features of the popup window
    const popupWidth = 600;
    const popupHeight = 400;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;
    const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;

    // Open the AddToAny share page in a popup window
    window.open(shareUrl, "Share", popupFeatures);
  };

  return (
    <div
      className={`absolute bottom-10 left-[calc(50%+28px)] -translate-x-1/2 flex items-center gap-x-5 transition-all duration-500 z-[11] ${
        isVisible ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer"
        onClick={() => {
          resetOverlayVisibility();
          setIsPaused(false);
          setChosenVideo({
            openVideo: false,
            isThumbnail: false,
            video: null,
            id: null,
          });
        }}
      >
        <Image
          src="/close.svg"
          width={14}
          height={14}
          alt="Slide Up"
          className="invert group-hover:brightness-0 group-hover:invert-0"
        />
      </div>
      {!chosenVideo?.isThumbnail ? (
        <div
          className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer"
          onClick={() => {
            setChosenVideo({
              openVideo: false,
              isThumbnail: false,
              video: null,
              id: null,
            });
            !(swiperInstance?.realIndex === swiperInstance?.slides.length - 1)
              ? swiperInstance.slideNext()
              : swiperInstance.slideTo(1);
          }}
        >
          <Image
            src="/forward.svg"
            width={14}
            height={14}
            alt="Slide Up"
            className="group-hover:brightness-0"
          />
        </div>
      ) : (
        <div className="h-9 w-9 order-first" />
      )}
      <div
        className="flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full bg-orange group hover:bg-white"
        onClick={togglePlayPause}
      >
        <Image
          src={isPaused ? "/play.svg" : "/pause.svg"}
          width={21}
          height={24}
          alt={isPaused ? "play video" : "pause video"}
          className={clsx(isPaused ? "ml-2" : "", "group-hover:brightness-0")}
        />
      </div>

      <div className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer">
        <div className="w-full h-full a2a_kit a2a_kit_size_32 a2a_default_style">
          <div
            className="w-full h-full flex items-center justify-center a2a_dd"
            onClick={handleShareClick}
          >
            <Image
              src="/share.svg"
              width={14}
              height={14}
              alt="Slide Up"
              className="group-hover:brightness-0"
            />
          </div>
        </div>
      </div>
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer"
        onClick={() => toggleMute()}
      >
        <Image
          src={isMuted ? "/sound-off.svg" : "/sound-on.svg"} // Conditional image source based on mute status
          width={20}
          height={20}
          alt={isMuted ? "Sound off" : "Sound on"}
          className="group-hover:brightness-0"
        />
      </div>
    </div>
  );
};

export const ControlsMobile = ({
  swiperInstance,
  resetOverlayVisibility,
  videoRefs,
  id,
  chosenVideo,
  setChosenVideo,
}) => {
  console.log(chosenVideo);
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-5 items-center z-10">
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center transition-all bg-black bg-opacity-10 cursor-pointer"
        onClick={() => {
          resetOverlayVisibility();
          setIsPaused(false);
          setChosenVideo({
            openVideo: false,
            isThumbnail: false,
            video: null,
            id: null,
          });
        }}
      >
        <Image src="/close.svg" width={14} height={14} alt="Slide Up" />
      </div>

      {!chosenVideo?.isThumbnail ? (
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
      ) : (
        <div className="h-9 w-9 order-first" />
      )}
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

export default VideoPlayer;
