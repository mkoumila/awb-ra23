// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { Animate } from "./Animate";
import Image from "next/image";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

export const MenuOverlay = ({ cloudinaryName, chiffresData, onClose }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    });
  }, []);

  return (
    <Animate
      animationType="fade"
      duration={500}
      triggerOnce={false}
      className="fixed top-0 left-0 w-full h-full z-20 "
    >
      <div className="h-full relative flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover object-left"
          >
            <source src="/backgrounds/background-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-[#878787] mix-blend-multiply" />
        </div>
        <div className="absolute top-0 left-0 w-full flex items-start justify-between pt-4 pl-5 pr-4 lg:px-[52px] lg:pt-[48px] text-white z-30">
          <Link href="/">
            <Image
              src="/logo-fr.png"
              width={203}
              height={65}
              alt="Attijari Wafabank Logo"
              className="lgDown:w-[187px]"
            />
          </Link>
          <div className="flex items-end lg:items-baseline gap-6 lg:gap-9">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={clsx(
                  "font-sofia-condensed text-xl leading-[15px] tracking-[0.4px] lg:text-4xl lg:leading-[30px] lg:tracking-[0.72px] transition-all border-b-2 border-transparent hover:border-white",
                  "!border-white"
                )}
              >
                FR
              </a>
              <a
                href="#"
                className={clsx(
                  "font-sofia-condensed text-xl leading-[15px] tracking-[0.4px] lg:text-4xl lg:leading-[30px] lg:tracking-[0.72px] transition-all border-b-2 border-transparent hover:border-white"
                )}
              >
                EN
              </a>
            </div>
            <button
              className="bg-transparent border-0 cursor-pointer"
              onClick={onClose}
            >
              <Image
                src={"/close.svg"}
                width={22}
                height={22}
                alt="close le menu"
                className="invert"
              />
            </button>
          </div>
        </div>
        <div className="w-full">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            speed={500}
            modules={[Pagination]}
            onInit={(swiper) => {
              setSwiperInstance(swiper);
            }}
            className="h-full chiffres-pagination"
          >
            {chiffresData.map((el, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="px-4 !flex justify-center relative"
                >
                  <div className="max-w-[626px] relative">
                    <p className="text-lg lg:text-[25px] font-medium leading-[25px] text-white text-center mb-4 lg:mb-8">
                      {el.title}
                    </p>

                    <Image
                      src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${el.image}`}
                      alt={el.alt}
                      width={1000}
                      height={1000}
                    />
                    <SwiperPagination swiperInstance={swiperInstance} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </Animate>
  );
};

const SwiperPagination = ({ swiperInstance }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flex justify-between w-[90%]">
      <Image
        src="/arrow-up.svg"
        height={46}
        width={37}
        alt="Slide Left"
        className="cursor-pointer rotate-[270deg] invert"
        onClick={() => swiperInstance?.slidePrev()}
      />

      <Image
        src="/arrow-down.svg"
        height={46}
        width={37}
        alt="Slide Right"
        className="cursor-pointer rotate-[270deg] invert"
        onClick={() => swiperInstance?.slideNext()}
      />
    </div>
  );
};
