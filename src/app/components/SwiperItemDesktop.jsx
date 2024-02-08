import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import Image from "next/image";
import { Animate } from "./Animate";
import Link from "next/link";
import { useEffect, useState } from "react";

const SwiperItemDesktop = ({
  cloudinaryName,
  title,
  content,
  image,
  video,
  isAward,
  isStrategiesGrandPrix,
  index,
  playVideo,
  videoRefs,
  isVisible,
  swiperInstance,
  resetOverlayVisibility,
}) => {
  // Control the visibility of the overlay using the isVisible prop
  const overlayStyle = { display: isVisible ? "block" : "none" };

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
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${image}`}
          alt={image}
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
                <h2 className="w-fit text-[100px] font-extrabold text-center uppercase relative before:absolute before:content-[''] before:bg-white before:h-1 before:left-0 before:bottom-8 before:transition-all before:duration-500 before:w-0 group-hover:before:w-full ">
                  {title}
                </h2>
              )}
              {content && (
                <p className="text-[30px] font-bold leading-[30px] text-center mb-8">
                  {content}
                </p>
              )}
            </Animate>
          </div>
          <div
            className="flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full bg-bloody text-white font-extrabold leading-[47px] text-xl absolute left-1/2 -translate-x-1/2 bottom-10 uppercase"
            onClick={() => playVideo(index)}
          >
            PLAY
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
      </div>

      {/* Video component */}
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
          <Transformation fetchFormat="auto" quality="auto" />
        </Video>
        <Controls
          swiperInstance={swiperInstance}
          resetOverlayVisibility={resetOverlayVisibility}
          videoRefs={videoRefs}
          index={index}
        />
      </CloudinaryContext>
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

  return (
    <div
      className={`absolute bottom-10 left-[calc(50%+28px)] -translate-x-1/2 flex items-center gap-x-5 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <div className="h-9 w-9 border border-white rounded-full flex items-center justify-center group transition-all bg-black bg-opacity-10 hover:bg-white cursor-pointer">
        <div className="w-full h-full a2a_kit a2a_kit_size_32 a2a_default_style">
          <Link
            className="w-full h-full flex items-center justify-center a2a_dd"
            href="https://www.addtoany.com/share"
          >
            <Image
              src="/share.svg"
              width={14}
              height={14}
              alt="Slide Up"
              className="group-hover:brightness-0"
            />
          </Link>
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
