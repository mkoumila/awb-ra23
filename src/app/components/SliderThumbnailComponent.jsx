import clsx from "clsx";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export const SliderThumbnail = ({
  slideChildrenData,
  swiperInstance,
  cloudinaryName,
  setChosenVideo,
  playVideo,
}) => {
  return (
    <div className="lgDown:mb-8 lg:absolute lg:left-1/2 lg:bottom-[90px] lg:-translate-x-1/2 w-full z-10 lg:px-10">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 4,
            centeredSlides: false,
          },
          1100: {
            slidesPerView: 5,
            centeredSlides: false,
          },
        }}
        className={clsx(
          slideChildrenData.length < 5 ? "mySwiperThumbnail" : null,
          "slide-thumbnail-style"
        )}
      >
        {slideChildrenData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Thumbnail
                swiperInstance={swiperInstance}
                cloudinaryName={cloudinaryName}
                setChosenVideo={setChosenVideo}
                playVideo={playVideo}
                {...item}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export const Thumbnail = ({
  id,
  title,
  delai,
  video,
  color,
  setChosenVideo,
  playVideo,
}) => {
  return (
    <div
      className="aspect-[250/158] relative text-white flex items-end justify-center rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => {
        setChosenVideo({
          openVideo: true,
          isThumbnail: true,
          video: video,
          id: id,
        });
        playVideo(id);
      }}
    >
      <div
        className="absolute w-full h-full top-0 left-0 transition-all opacity-50 lg:group-hover:opacity-100 thumbnail-slide"
        style={{ backgroundColor: color }}
      />
      <div className="absolute w-full h-full top-0 left-0 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">{delai}</span>
          <Image
            src="/play-circle.svg"
            width={24}
            height={24}
            alt="play video"
          />
        </div>
        <h3 className="text-[30px] lg:text-[clamp(28px,calc(10.76px+1.683vw),35px)] leading-[1] font-semibold block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};
