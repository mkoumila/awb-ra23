import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//import { Pagination } from "swiper/modules";
import Image from "next/image";

export const SliderThumbnail = ({ data, cloudinaryName, swiperInstance }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="pb-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
        }}
        pagination={{
          clickable: true,
          /*
          renderBullet: function (index, className) {
            return (
              '<span class="w-[18px] h-[18px] border-white bg-transparent ' +
              className +
              '">' +
              (index + 1) +
              "</span>"
            );
          },
          */
        }}
        onInit={(swiper) => {
          setIsLoaded(true);
        }}
        //modules={[Pagination]}
        className={`mySwiper ${
          isLoaded ? "grid grid-cols-5 gap-5" : "grid grid-cols-5 gap-5"
        }`}
      >
        {data?.map((item, index) => {
          if (index === 0) return null;
          return (
            <SwiperSlide>
              <Thumbnail
                index={index + 1}
                swiperInstance={swiperInstance}
                cloudinaryName={cloudinaryName}
                {...item}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <ThumbnailPagination /> */}
    </div>
  );
};

/* export const ThumbnailPagination = () => {
  return (
    <div className="flex items-center gap-4 justify-center pt-5">
      <span className="w-[18px] h-[18px] rounded-full bg-white border border-white"></span>
      <span className="w-[18px] h-[18px] rounded-full border border-white"></span>
      <span className="w-[18px] h-[18px] rounded-full border border-white"></span>
    </div>
  );
}; */

export const Thumbnail = ({
  index,
  thumbnail,
  thumbnail_gif,
  alt,
  title,
  delai,
  cloudinaryName = "",
  swiperInstance = null,
  onClick = null,
  bigtitle = false,
}) => {
  return (
    <div
      className="group aspect-[250/158] relative text-white flex items-end justify-center rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => {
        swiperInstance && swiperInstance.slideTo(index);
        onClick && onClick();
      }}
    >
      <span className="text-base font-semibold leading-7 absolute top-1 left-4 z-[2]">
        {delai}
      </span>
      <div className="block group-hover:hidden">
        <Image src={`${thumbnail}`} alt={alt} fill />
      </div>
      <div className="hidden group-hover:block">
        <Image src={`${thumbnail_gif}`} alt={alt} fill priority={true} />
      </div>
      <h3
        className={
          bigtitle
            ? "text-[53px] leading-[25px] font-semibold fnt-sofia-extra text-center relative max-w-[150px] pb-[27px]"
            : "text-[25px] leading-[25px] font-semibold fnt-sofia-extra text-center relative max-w-[150px] pb-5"
        }
      >
        {title}
      </h3>
    </div>
  );
};
