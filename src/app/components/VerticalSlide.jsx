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
import { cloudinaryName } from "../data";
import Intro from "./Intro";
import SwiperPagination from "./SwiperPagination";
import SwiperItemMobile from "./SwiperItemMobile";
import SwiperItemDesktop from "./SwiperItemDesktop";
import { useBreakPoint } from "../hooks/useBreakPoint";
import Image from "next/image";
import { Animate } from "./Animate";
import VideoPlayer, { ControlsDesktop, ControlsMobile } from "./VideoPlayer";

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

  const [currentIndexSwiper, setCurrentIndexSwiper] = useState(0);

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

    setCurrentIndexSwiper(currentIndex);
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
      data[swiper?.realIndex - 1]?.id !== undefined
    ) {
      const newPath = `/${data[swiper?.realIndex - 1]?.id}`;
      const newUrl = window.location.origin + newPath;
      window?.history?.pushState(null, "", newUrl);
    }
  };

  // Go to specific slide depends on slug value
  useEffect(() => {
    slug && swiperInstance?.slideTo(data.findIndex((el) => el.id === slug) + 1);
  }, [swiperInstance]);

  return (
    <>
      <div className="relative">
        {isOpen && <MenuOverlay onClose={closeMenuOverlay} />}

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

export const MenuOverlay = ({ onClose }) => {
  return (
    <Animate
      animationType="fade"
      //direction="down"
      cascade
      duration={500}
      triggerOnce={false}
      className="fixed top-0 left-0 w-full h-full z-[11]"
    >
      <div className="bg-black pl-7 pb-5 md:pl-14 w-full h-full flex items-center justify-center">
        <button
          className="absolute top-10 left-10 z-[10] bg-transparent border-0 cursor-pointer"
          onClick={onClose}
        >
          <Image
            src={"/close.svg"}
            width={24}
            height={24}
            alt="ouvrir le menu"
          />
        </button>
        <Image
          src="/logo-fr.png"
          width={203}
          height={65}
          alt="Attijari Wafabank Logo"
          className="absolute top-[49px] right-[64px]"
        />
        <div className="relative w-full h-full">
          <Image
            src="/Super-menu.png"
            fill
            alt="menu overlay"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </Animate>
  );
};
