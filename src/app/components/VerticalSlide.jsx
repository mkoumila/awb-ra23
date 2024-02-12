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
import { cloudinaryName } from "../data";
import Intro from "./Intro";
import SwiperPagination from "./SwiperPagination";
import SwiperItemMobile from "./SwiperItemMobile";
import SwiperItemDesktop from "./SwiperItemDesktop";
import { useBreakPoint } from "../hooks/useBreakPoint";

export const VerticalSlider = ({ data }) => {
  // get the current device ( changes of viewport resizing )
  const device = useBreakPoint();

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
    const currentIndex = swiper?.realIndex - 1;
    const totalSlides = swiper?.slides?.length - 1 || data.length;

    // Conditionally setting the pagination text
    if (currentIndex >= 0) {
      setPaginationText(
        `<span>${currentIndex + 1}</span>${
          device !== "desktop" ? "/" : ""
        }<span>${totalSlides}</span>`
      );
    } else {
      setPaginationText(""); // Hide pagination for the first slide
    }

    // Reset the overlay visibility
    setOverlayVisibility(data.map(() => true));
  };

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
        >
          <SwiperSlide data-hash="intro">
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
                    alt={item.alt}
                    video={item.video}
                    isAward={item.isAward}
                    isStrategiesGrandPrix={item.isStrategiesGrandPrix}
                    index={index}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    isVisible={overlayVisibility} // Pass visibility state
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
                    alt={item.alt}
                    video={item.video}
                    isAward={item.isAward}
                    isStrategiesGrandPrix={item.isStrategiesGrandPrix}
                    index={index}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    isVisible={overlayVisibility} // Pass visibility state
                    swiperInstance={swiperInstance}
                    resetOverlayVisibility={() =>
                      setOverlayVisibility(data.map(() => true))
                    }
                    paginationText={paginationText}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* Pagiation */}
        {paginationText &&
          !overlayVisibility.some((el) => el === false) &&
          device === "desktop" && (
            <SwiperPagination
              swiperInstance={swiperInstance}
              paginationText={paginationText}
            />
          )}
      </div>
    </>
  );
};
