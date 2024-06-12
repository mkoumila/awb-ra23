import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import Image from "next/image";
import { Animate } from "./Animate";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

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

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        const videoElement = videoRefs.current[index].current;
        if (videoElement) {
          resetOverlayVisibility();
        }
      }
    });
  }, [index]);

  return (
    <>
      {/* Overlay component */}
      <div
        className="absolute left-5 top-5 z-10 h-[calc(100%-40px)] w-[calc(100%-40px)] text-white overflow-hidden"
        style={overlayStyle}
      >
        <div className="absolute top-0 left-0 z-[10] w-full flex items-start justify-between px-8 pt-7">
          <Link href="/">
            <Image
              src="/logo-fr.png"
              width={203}
              height={65}
              alt="Agency Africa Logo"
              className=""
            />
          </Link>
          <div className="flex items-baseline gap-8">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={clsx(
                  "font-sofia-condensed text-4xl leading-[30px] tracking-[0.72px]",
                  "border-b-2 border-white"
                )}
              >
                FR
              </a>
              <a
                href="#"
                className={clsx(
                  "font-sofia-condensed text-4xl leading-[30px] tracking-[0.72px]"
                )}
              >
                EN
              </a>
            </div>
            <button
              className="bg-transparent border-0 cursor-pointer"
              onClick={openMenuOverlay}
            >
              <Image
                src={"/menu-burger.svg"}
                width={27}
                height={22}
                alt="ouvrir le menu"
              />
            </button>
          </div>
        </div>

        <Image
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75 grayscale"
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${image}`}
          alt={alt}
          fill
        />
        <div className="absolute top-0 left-0 h-full w-full bg-yellow-gradient z-[1]">
          <div
            className="cursor-pointer absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
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
              className="xl:w-[124px] xl:h-[124px]"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[58%] xl:h-[60%] flex items-start gap-10">
          <div className="group ml-10">
            <Animate
              animationType="fade"
              direction="down"
              cascade
              duration={300}
              triggerOnce={false}
            >
              {delai && (
                <p className="font-sofia-condensed text-[25px] font-bold leading-[25px] tracking-[0.5px] mb-2">
                  {delai}
                </p>
              )}
              {title && (
                <h2 className="font-montserrat text-[clamp(50px,calc(-27.56px+7.211vw),80px)] font-bold leading-[0.8] -tracking-[4px] mb-3 uppercase -ml-[6px] whitespace-pre-wrap">
                  {title}
                </h2>
              )}
              {content && (
                <p className="font-sofia-condensed text-[clamp(18px,calc(-0.10px+1.768vw),25px)] font-bold leading-[25px] tracking-[0.5px] whitespace-pre-wrap">
                  {content}
                </p>
              )}
            </Animate>
          </div>
        </div>

        {/** file */}
        <a
          href="#"
          className="absolute bottom-6 right-6 inline-flex items-center gap-1 text-base font-bold leading-[30px] tracking-[0.02em] text-center text-white cursor-pointer z-[2]"
        >
          <Image
            src="/download-file.svg"
            width={21}
            height={21}
            className="relative top-1"
          />
          Télécherger le rapport financier
        </a>
      </div>

      {/* Video component */}
      {showVideo && (
        <CloudinaryContext
          cloudName={cloudinaryName}
          className="h-full overflow-hidden relative"
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
