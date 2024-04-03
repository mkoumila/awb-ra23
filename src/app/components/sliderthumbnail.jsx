import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

export const SliderThumbnail = ({ data, cloudinaryName, swiperInstance }) => {
  console.log({ data });

  return (
    <div className="pb-10">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="w-[18px] h-[18px] border-white bg-transparent ' +
              className +
              '">' +
              (index + 1) +
              "</span>"
            );
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((item, index) => {
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
    </div>
  );
};

export const ThumbnailPagination = () => {
  return <div></div>;
};

export const Thumbnail = ({
  index,
  thumbnail,
  thumbnail_gif,
  alt,
  title,
  delai,
  cloudinaryName = "",
  swiperInstance,
}) => {
  return (
    <div
      className="group aspect-video relative text-white flex pb-5 items-end justify-center rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => swiperInstance.slideTo(index)}
    >
      <span className="text-base font-semibold leading-7 absolute top-4 left-4 z-[2]">
        {delai}
      </span>
      <div className="block group-hover:hidden">
        <Image
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${thumbnail}`}
          alt={alt}
          fill
        />
      </div>
      <div className="hidden group-hover:block">
        <Image
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${thumbnail_gif}`}
          alt={alt}
          fill
        />
      </div>
      <h3 className="text-[28px] font-semibold leading-7 text-center relative">
        {title}
      </h3>
    </div>
  );
};
