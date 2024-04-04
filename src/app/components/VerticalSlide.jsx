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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Animate } from "./Animate";

export const VerticalSlider = ({ data, slug }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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

    // Update url with the correct slide's id
    if (
      typeof window !== "undefined" &&
      data[swiper?.realIndex - 1]?.id !== undefined
    ) {
      const newPath = `/${data[swiper?.realIndex - 1]?.id}`;
      const newUrl = window.location.origin + newPath;
      window.history.pushState(null, "", newUrl);
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
            overlayVisibility.some((el) => el === false)
              ? "bg-black"
              : "bg-silver"
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
                    content={item.content}
                    delai={item?.delai}
                    image={item.image}
                    thumbnail={item?.thumbnail}
                    alt={item.alt}
                    video={item.video}
                    isAward={item.isAward}
                    isStrategiesGrandPrix={item.isStrategiesGrandPrix}
                    index={index}
                    playVideo={playVideo}
                    videoRefs={videoRefs}
                    isVisible={overlayVisibility} // Pass visibility state
                    swiperInstance={swiperInstance}
                    openMenuOverlay={openMenuOverlay}
                    resetOverlayVisibility={() =>
                      setOverlayVisibility(data.map(() => true))
                    }
                  />
                ) : (
                  <SwiperItemMobile
                    {...item}
                    cloudinaryName={cloudinaryName}
                    title={item.title}
                    content={item.content}
                    delai={item?.delai}
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

export const MenuOverlay = ({ onClose }) => {
  return (
    <Animate
      animationType="fade"
      //direction="down"
      cascade
      duration={500}
      triggerOnce={false}
      className="fixed top-0 left-0 w-full h-full p-14 pt-0 bg-black z-[9]"
    >
      <div className="relative w-full h-full">
        <button
          className="absolute top-10 left-[-16px] z-[10] bg-transparent border-0 cursor-pointer"
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
          src="/Super-menu.png"
          fill
          alt="menu overlay"
          className="w-full h-full object-cover"
        />
      </div>
    </Animate>
  );
};
