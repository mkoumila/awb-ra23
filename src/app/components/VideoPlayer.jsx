import { CloudinaryContext, Transformation, Video } from "cloudinary-react";
import { useBreakPoint } from "../hooks/useBreakPoint";
import { ControlsDesktop } from "./SwiperItemDesktop";
import { ControlsMobile } from "./SwiperItemMobile";

const VideoPlayer = ({
  cloudinaryName,
  video,
  videoRefs,
  id,
  swiperInstance,
  resetOverlayVisibility,
}) => {
  const device = useBreakPoint();

  return (
    <CloudinaryContext
      cloudName={cloudinaryName}
      className="lg:h-full lg:overflow-hidden lg:relative"
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
      {device === "desktop" ? (
        <ControlsDesktop
          swiperInstance={swiperInstance}
          resetOverlayVisibility={resetOverlayVisibility}
          videoRefs={videoRefs}
          id={id}
        />
      ) : (
        <ControlsMobile
          swiperInstance={swiperInstance}
          resetOverlayVisibility={resetOverlayVisibility}
          videoRefs={videoRefs}
          id={id}
        />
      )}
    </CloudinaryContext>
  );
};

export default VideoPlayer;
