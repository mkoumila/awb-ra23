import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import Image from "next/image";
import { Animate } from "./Animate";
import Link from "next/link";
import { useEffect, useState } from "react";

const SwiperItemMobile = ({
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
  const overlayStyle = { display: !isVisible ? "flex" : "none" };

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
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 relative">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${image}`}
          alt={image}
          fill
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <Animate
          animationType="fade"
          direction="down"
          cascade
          duration={600}
          triggerOnce={false}
        >
          {title && (
            <h2 className="text-4xl font-extrabold text-center uppercase">
              {title}
            </h2>
          )}
          {content && (
            <p className="text-xl font-bold text-center max-w-[250px] mx-auto leading-[normal]">
              {content}
            </p>
          )}
        </Animate>
        <div
          className="flex h-[67px] w-[67px] cursor-pointer items-center justify-center rounded-full bg-bloody text-white font-extrabold leading-[47px] text-xl absolute right-4 bottom-4 uppercase shadow-lg"
          onClick={() => playVideo(index)}
        >
          PLAY
        </div>
        {isAward && (
          <Animate
            animationType="fade"
            direction="left"
            className="absolute left-0 top-[43%] -translate-y-1/2 shadow-lg"
          >
            <Image
              src="/awards_clapclaptours.png"
              width={362}
              height={125}
              className="w-72 h-auto"
              alt="awards clapclaptours"
            />
          </Animate>
        )}
        {isStrategiesGrandPrix && (
          <Animate
            animationType="fade"
            direction="left"
            className="absolute left-0 top-[43%] -translate-y-1/2 shadow-lg"
          >
            <Image
              src="/strategies_grand_prix.png"
              width={250}
              height={125}
              className="w-64 h-auto"
              alt="strategies grand prix"
            />
          </Animate>
        )}
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center"
        style={overlayStyle}
      >
        <CloudinaryContext cloudName={cloudinaryName} className="relative">
          <Video
            publicId={video}
            className=""
            innerRef={videoRefs.current[index]} // Link the ref to the video element
            poster=""
            secure="true"
            preload="metadata"
            onClick={togglePlayPause}
          >
            <Transformation fetchFormat="auto" quality="auto" />
          </Video>
        </CloudinaryContext>
        <Controls
          swiperInstance={swiperInstance}
          resetOverlayVisibility={resetOverlayVisibility}
          videoRefs={videoRefs}
          index={index}
        />
      </div>
    </div>
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

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-center gap-[10px]">
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
      <div
        className="h-9 w-9 border border-white rounded-full flex items-center justify-center transition-all bg-black bg-opacity-10 cursor-pointer"
        onClick={() => resetOverlayVisibility()}
      >
        <Image src="/close.svg" width={14} height={14} alt="Slide Up" />
      </div>
      <div className="h-9 w-9 border border-white rounded-full flex items-center justify-center transition-all bg-black bg-opacity-10 cursor-pointer">
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

              /* onClick={() => copyToClipboard()} */
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
    </div>
  );
};

export default SwiperItemMobile;
