"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/hash-navigation";

// import required modules
import { Pagination, Keyboard, HashNavigation } from "swiper/modules";
import { createRef, useRef, useState } from "react";
import { sliderData, cloudinaryName } from "./data";
import Intro from "./components/Intro";
import SwiperPagination from "./components/SwiperPagination";
import SwiperItemMobile from "./components/SwiperItemMobile";
import SwiperItemDesktop from "./components/SwiperItemDesktop";
import { useBreakPoint } from "./hooks/useBreakPoint";

const VerticalSlider = ({ data = sliderData }) => {
  // Swiper Instance
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Pagination state to handle the pagination visibility
  const [paginationText, setPaginationText] = useState("");

  // Create an array of refs to store references to the video DOM elements
  const videoRefs = useRef(data.map(() => createRef()));

  const [overlayVisibility, setOverlayVisibility] = useState(
    data.map(() => true)
  );

  // Modify the playVideo function to also hide the overlay
  const playVideo = (index) => {
    // Update the overlay visibility state
    setOverlayVisibility(
      overlayVisibility.map((visible, idx) => (idx !== index ? visible : false))
    );

    // Wait for the next render to ensure the state is updated
    setTimeout(() => {
      const videoElement = videoRefs.current[index]?.current;
      if (videoElement) {
        videoElement.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    }, 0);
  };
  // Function to update pagination and reset overlays on slide change
  const updatePagination = (swiper) => {
    const currentIndex = swiper.realIndex - 1;
    const totalSlides = swiper?.slides?.length - 1 || data.length;

    // Conditionally setting the pagination text
    if (currentIndex >= 0) {
      setPaginationText(
        `<span>${currentIndex + 1}</span><span>${totalSlides}</span>`
      );
    } else {
      setPaginationText(""); // Hide pagination for the first slide
    }

    // Reset the overlay visibility
    setOverlayVisibility(data.map(() => true));
  };

  // get the current device ( changes of viewport resizing )
  const device = useBreakPoint();

  return (
    <>
      <div className="relative">
        <Swiper
          cssMode
          speed={500}
          direction="vertical"
          hashNavigation={true}
          modules={[Pagination, Keyboard, HashNavigation]}
          onInit={(swiper) => {
            setSwiperInstance(swiper);
            updatePagination(swiper);
          }}
          onSlideChange={(swiper) => updatePagination(swiper)}
          lazy="true"
          className={`h-dvh transition-all duration-500 ${
            overlayVisibility.some((el) => el === false)
              ? "bg-black"
              : "bg-silver"
          }`}
          id="slider"
        >
          <SwiperSlide>
            <Intro swiperInstance={swiperInstance} />
          </SwiperSlide>
          {data.map((item, index) => {
            return (
              <SwiperSlide
                className="lg:p-5 relative"
                key={index}
                data-hash={item.id}
              >
                {device === "desktop" ? (
                  <SwiperItemDesktop
                    cloudinaryName={cloudinaryName}
                    title={item.title}
                    content={item.content}
                    image={item.image}
                    video={item.video}
                    isAward={item.isAward}
                    isStrategiesGrandPrix={item.isStrategiesGrandPrix}
                    index={index}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    isVisible={overlayVisibility[index]} // Pass visibility state
                    swiperInstance={swiperInstance}
                    resetOverlayVisibility={() =>
                      setOverlayVisibility(data.map(() => true))
                    }
                  />
                ) : (
                  <SwiperItemMobile
                    cloudinaryName={cloudinaryName}
                    title={item.title}
                    content={item.content}
                    image={item.image}
                    video={item.video}
                    isAward={item.isAward}
                    isStrategiesGrandPrix={item.isStrategiesGrandPrix}
                    index={index}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    isVisible={overlayVisibility[index]} // Pass visibility state
                    swiperInstance={swiperInstance}
                    resetOverlayVisibility={() =>
                      setOverlayVisibility(data.map(() => true))
                    }
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* Pagiation */}
        {paginationText && !overlayVisibility.some((el) => el === false) && (
          <SwiperPagination
            swiperInstance={swiperInstance}
            paginationText={paginationText}
          />
        )}
      </div>
    </>
  );
};

export default VerticalSlider;
