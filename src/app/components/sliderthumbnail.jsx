import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const SliderThumbnail = ({
  slideChildrenData,
  swiperInstance,
  cloudinaryName,
}) => {
  return (
    <div className="absolute left-1/2 bottom-[90px] -translate-x-1/2 w-full z-10 px-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
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
        className={slideChildrenData.length < 5 ? "mySwiperThumbnail" : null}
      >
        {slideChildrenData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
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
  cloudinaryName,
  index,
  title,
  delai,
  video,
  color,
  swiperInstance = null,
  onClick = null,
}) => {
  return (
    <div
      className="aspect-[250/158] relative text-white flex items-end justify-center rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => {
        //swiperInstance && swiperInstance.slideTo(index);
        onClick && onClick();
      }}
    >
      <div
        className="absolute w-full h-full top-0 left-0 transition-all opacity-50 group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
      <div className="absolute w-full h-full top-0 left-0 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">{delai}</span>
          <Image src="/play.svg" width={24} height={24} alt="play video" />
        </div>
        <h3 className="text-[35px] font-semibold block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title}
        </h3>
      </div>
    </div>
  );
};
