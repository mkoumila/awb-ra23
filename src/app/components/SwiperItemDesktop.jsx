import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import Image from "next/image";
import { Animate } from "./Animate";
import { useEffect, useState } from "react";
import Link from "next/link";

const SwiperItemDesktop = ({
  cloudinaryName,
  title,
  content,
  delai,
  image,
  thumbnail,
  thumbnail_alt,
  alt,
  video,
  isAward,
  isStrategiesGrandPrix,
  index,
  playVideo,
  videoRefs,
  isVisible,
  swiperInstance,
  file,
  openMenuOverlay,
  resetOverlayVisibility,
}) => {
  // Control the visibility of the overlay using the isVisible prop
  const overlayStyle = { display: isVisible[index] ? "block" : "none" };

  // State to handle showing video component
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const videoElement = videoRefs.current[index]?.current;
    if (videoElement) {
      videoElement.controls = false; // Attempt to explicitly remove controls
      videoElement.setAttribute("playsinline", ""); // Encourage inline playback on iOS
      videoElement.setAttribute("webkit-playsinline", ""); // For older iOS webviews
      videoElement.removeAttribute("controls"); // Ensure controls attribute is removed
    }
  }, [index]);

  // Play or pause the video
  const togglePlayPause = () => {
    const videoElement = videoRefs.current[index].current;
    if (videoElement) {
      if (videoElement.paused || videoElement.ended) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  return (
    <>
      {/* Overlay component */}
      <div
        className="absolute left-5 top-5 z-10 h-[calc(100%-40px)] w-[calc(100%-40px)] text-white rounded-[32px] overflow-hidden"
        style={overlayStyle}
      >
        <button
          className="absolute top-6 left-5 z-[10] bg-transparent border-0 cursor-pointer"
          onClick={openMenuOverlay}
        >
          <Image
            src={"/menu-burger.svg"}
            width={24}
            height={24}
            alt="ouvrir le menu"
          />
        </button>
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${image}`}
          alt={alt}
          fill
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div
            onClick={() => playVideo(index)}
            className="group cursor-pointer flex flex-col items-center"
          >
            <Animate
              animationType="fade"
              direction="down"
              cascade
              duration={300}
              triggerOnce={false}
            >
              {title && (
                <h2 className="text-[100px] font-extrabold leading-none text-center">
                  {title}
                </h2>
              )}
              {content && (
                <p className="text-3xl font-bold leading-[30px] tracking-[0.02em] text-center whitespace-pre-wrap max-w-[1000px] mt-2">
                  {content}
                </p>
              )}
              {delai && (
                <p className="text-3xl font-bold leading-[30px] tracking-[0.02em] text-center whitespace-pre-wrap max-w-[1000px] mt-6">
                  {delai}
                </p>
              )}
            </Animate>
          </div>
          <div
            className="cursor-pointer absolute left-1/2 -translate-x-1/2 bottom-10"
            onClick={() => {
              // To show the video component ( for better performance )
              setShowVideo(true);
              // Play the video
              playVideo(index);
            }}
          >
            <Image
              src="/play.svg"
              width={84}
              height={84}
              alt="play video"
              className=""
            />
          </div>
        </div>
        {isAward && (
          <Animate
            animationType="fade"
            direction="left"
            className="absolute left-0 top-24 shadow-lg"
          >
            <Image
              src="/awards_clapclaptours.png"
              alt="awards clapclaptours"
              width={362}
              height={125}
            />
          </Animate>
        )}
        {isStrategiesGrandPrix && (
          <Animate
            animationType="fade"
            direction="left"
            className="absolute left-0 top-24 shadow-lg"
          >
            <Image
              src="/strategies_grand_prix.png"
              alt="strategies grand prix"
              width={250}
              height={125}
            />
          </Animate>
        )}

        {/** file */}
        <p
          //href="/"
          className="absolute bottom-6 right-6 inline-flex items-center gap-2 text-base font-bold leading-[30px] tracking-[0.02em] text-center text-white cursor-pointer"
        >
          <Image
            src="/download-file.svg"
            width={34}
            height={43}
            className="relative top-1"
          />
          <span className="text-left text-[15px] leading-[17px]">
            Télécherger <br />
            le rapport financier
          </span>
        </p>
      </div>

      {/* Video component */}
      {showVideo && (
        <CloudinaryContext
          cloudName={cloudinaryName}
          className="h-full overflow-hidden rounded-[32px] relative"
        >
          <Video
            publicId={video}
            className="h-full w-full object-cover"
            innerRef={videoRefs.current[index]} // Link the ref to the video element
            poster=""
            secure="true"
            preload="metadata"
            onClick={togglePlayPause}
          >
            <Transformation fetchFormat="webm" quality="auto" />
          </Video>
          <Controls
            swiperInstance={swiperInstance}
            resetOverlayVisibility={resetOverlayVisibility}
            videoRefs={videoRefs}
            index={index}
          />
        </CloudinaryContext>
      )}
    </>
  );
};

const Controls = ({
  swiperInstance,
  resetOverlayVisibility,
  videoRefs,
  index,
}) => {
  const [isMuted, setIsMuted] = useState(false); // Initial mute status

  // Adjusted toggleMute function to update state
  const toggleMute = () => {
    const videoElement = videoRefs.current[index].current;
    if (videoElement) {
      const currentMuteStatus = videoElement.muted;
      videoElement.muted = !currentMuteStatus;
      setIsMuted(!currentMuteStatus); // Update state to reflect change
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
      className={`absolute bottom-10 left-[calc(50%+28px)] -translate-x-1/2 flex items-center gap-x-5 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
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
        className="flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full bg-bloody text-white font-extrabold leading-[47px] text-xl uppercase"
        onClick={() =>
          !(swiperInstance?.realIndex === swiperInstance?.slides.length - 1)
            ? swiperInstance.slideNext()
            : swiperInstance.slideTo(1)
        }
      >
        NEXT
      </div>
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer"
        onClick={() => resetOverlayVisibility()}
      >
        <Image
          src="/close.svg"
          width={14}
          height={14}
          alt="Slide Up"
          className="group-hover:brightness-0"
        />
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

export default SwiperItemDesktop;
