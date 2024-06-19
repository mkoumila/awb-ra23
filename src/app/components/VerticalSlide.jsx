"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/hash-navigation";

// import required modules
import { Pagination, Keyboard } from "swiper/modules";
import { createRef, useEffect, useRef, useState } from "react";
import { chiffresData, cloudinaryName } from "../data";
import Intro from "./Intro";
import SwiperPagination from "./SwiperPagination";
import SwiperItemMobile from "./SwiperItemMobile";
import SwiperItemDesktop from "./SwiperItemDesktop";
import { useBreakPoint } from "../hooks/useBreakPoint";
import VideoPlayer, { ControlsDesktop, ControlsMobile } from "./VideoPlayer";
import { MenuOverlay } from "./MenuOverlay";

export const VerticalSlider = ({ data, slug }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [chosenVideo, setChosenVideo] = useState({
    openVideo: false,
    isThumbnail: false,
    video: null,
    id: null,
  });

  const openMenuOverlay = () => {
    setIsOpen(true);
  };

  const closeMenuOverlay = () => {
    setIsOpen(false);
  };

  // get the current device ( changes of viewport resizing )
  const device = useBreakPoint();

  // Swiper Instance
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Pagination state to handle the pagination visibility
  const [paginationText, setPaginationText] = useState("");

  // Function to create refs for each item and its children recursively
  const createRefs = (items) => {
    const refs = {};
    items.forEach((item) => {
      if (item.id) {
        refs[item.id] = createRef();
        if (item.children && Array.isArray(item.children)) {
          Object.assign(refs, createRefs(item.children));
        }
      }
    });
    return refs;
  };

  // Create refs for the data and its children
  const videoRefs = useRef(createRefs(data));

  const initializeVisibility = (items) => {
    let visibility = [];
    items.forEach((item) => {
      visibility.push({ id: item.id, visibility: true });
      if (item.children && Array.isArray(item.children)) {
        visibility = visibility.concat(initializeVisibility(item.children));
      }
    });
    return visibility;
  };

  const [overlayVisibility, setOverlayVisibility] = useState(
    initializeVisibility(data)
  );

  // Modify the playVideo function to also hide the overlay
  const playVideo = (id) => {
    // Update the overlay visibility state
    setOverlayVisibility(
      overlayVisibility.map((item) =>
        item.id !== id
          ? { ...item, visibility: true }
          : { ...item, visibility: false }
      )
    );

    // Wait for the next render to ensure the state is updated
    setTimeout(() => {
      const videoElement = videoRefs.current[id]?.current;
      if (videoElement) {
        videoElement.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    }, 100);
  };
  // Function to update pagination and reset overlays on slide change
  const updatePagination = (swiper) => {
    // Reset the chosen video data
    setChosenVideo({
      openVideo: false,
      isThumbnail: false,
      video: null,
      id: null,
    });

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
    setOverlayVisibility(initializeVisibility(data));

    // Update url with the correct slide's id
    if (
      typeof window !== "undefined" &&
      data[swiper?.realIndex]?.id !== undefined
    ) {
      // Handle First slide which is not from data
      if (swiper?.realIndex === 0) {
        const newPath = `/`;
        const newUrl = window.location.origin + newPath;
        window?.history?.pushState({}, "", newUrl);

        // handle other slides
      } else if (swiper?.realIndex > 0) {
        const newPath = `/${data[swiper?.realIndex - 1]?.id}`;
        const newUrl = window.location.origin + newPath;
        window?.history?.pushState({}, "", newUrl);
      }
    }
  };

  // Go to specific slide depends on slug value
  useEffect(() => {
    slug && swiperInstance?.slideTo(data.findIndex((el) => el.id === slug) + 1);
  }, [swiperInstance]);

  return (
    <>
      <div className="relative">
        {isOpen && (
          <MenuOverlay
          cloudinaryName={cloudinaryName}
          chiffresData={chiffresData}
          onClose={closeMenuOverlay}
          />
        )}

        <Swiper
          cssMode
          speed={500}
          direction="vertical"
          modules={[Pagination, Keyboard]}
          onInit={(swiper) => {
            setSwiperInstance(swiper);
            updatePagination(swiper);
          }}
          onSlideChange={(swiper) => updatePagination(swiper)}
          lazy="true"
          className={`h-dvh transition-all duration-500 ${
            overlayVisibility.some((el) => el.visibility === false)
              ? "bg-black"
              : "bg-white"
          }`}
        >
          <SwiperSlide data-hash="intro">
            <Intro
              swiperInstance={swiperInstance}
              data={data}
              cloudinaryName={cloudinaryName}
              openMenuOverlay={openMenuOverlay}
            />
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
                    {...item}
                    cloudinaryName={cloudinaryName}
                    title={item.title}
                    id={item.id}
                    content={item.content}
                    delai={item?.delai}
                    image={item.image}
                    alt={item.alt}
                    video={item.video}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    isVisible={overlayVisibility} // Pass visibility state
                    swiperInstance={swiperInstance}
                    isMultiple={item.isMultiple}
                    children={item.children}
                    openMenuOverlay={openMenuOverlay}
                    resetOverlayVisibility={() =>
                      setOverlayVisibility(initializeVisibility(data))
                    }
                    setChosenVideo={setChosenVideo}
                  />
                ) : (
                  <SwiperItemMobile
                    {...item}
                    cloudinaryName={cloudinaryName}
                    title={item.title}
                    id={item.id}
                    content={item.content}
                    delai={item?.delai}
                    image={item.image}
                    alt={item.alt}
                    video={item.video}
                    index={index}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    swiperInstance={swiperInstance}
                    isMultiple={item.isMultiple}
                    children={item.children}
                    openMenuOverlay={openMenuOverlay}
                    setChosenVideo={setChosenVideo}
                  />
                )}
              </SwiperSlide>
            );
          })}
          {chosenVideo?.openVideo ? (
            <>
              <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center z-[10]">
                <VideoPlayer
                  cloudinaryName={cloudinaryName}
                  video={chosenVideo?.video}
                  videoRefs={videoRefs}
                  id={chosenVideo?.id}
                  swiperInstance={swiperInstance}
                  resetOverlayVisibility={() =>
                    setOverlayVisibility(initializeVisibility(data))
                  }
                  setChosenVideo={setChosenVideo}
                />
              </div>
              {device === "desktop" ? (
                <ControlsDesktop
                  swiperInstance={swiperInstance}
                  resetOverlayVisibility={() =>
                    setOverlayVisibility(initializeVisibility(data))
                  }
                  videoRefs={videoRefs}
                  id={chosenVideo?.id}
                  chosenVideo={chosenVideo}
                  setChosenVideo={setChosenVideo}
                />
              ) : (
                <ControlsMobile
                  swiperInstance={swiperInstance}
                  resetOverlayVisibility={() =>
                    setOverlayVisibility(initializeVisibility(data))
                  }
                  videoRefs={videoRefs}
                  id={chosenVideo?.id}
                  chosenVideo={chosenVideo}
                  setChosenVideo={setChosenVideo}
                />
              )}
            </>
          ) : null}
        </Swiper>
        {/* Pagiation */}
        {paginationText &&
          !overlayVisibility.some((el) => el.visibility === false) &&
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
