import Image from "next/image";

const SwiperPagination = ({ swiperInstance, paginationText }) => {
  return (
    <div className="flex absolute lg:right-[63px] top-12 lg:top-1/2 z-10 -translate-y-1/2 flex-col items-center lg:gap-[10px]">
      <Image
        src="/arrow-up.svg"
        width={20}
        height={20}
        alt="Slide Up"
        className={`${
          !(swiperInstance?.realIndex === 1)
            ? "cursor-pointer"
            : "invisible opacity-0"
        } lgDown:hidden`}
        onClick={() => swiperInstance?.slidePrev()}
      />
      <div
        className="text-black text-sm font-bold lg:w-[67px] lg:h-[67px] lg:border lg:border-white rounded-full flex lg:flex-col items-center justify-center lg:text-white lg:font-extrabold lg:!leading-[14px] lg:text-3xl uppercase lg:gap-4 lg:before:absolute lg:before:content[''] lg:before:w-[70%] lg:before:h-[1px] lg:before:bg-white"
        dangerouslySetInnerHTML={{ __html: paginationText }}
      ></div>
      <Image
        src="/arrow-down.svg"
        width={20}
        height={20}
        alt="Slide Down"
        className={`${
          !(swiperInstance?.realIndex === swiperInstance?.slides?.length - 1)
            ? "cursor-pointer"
            : "invisible opacity-0"
        } lgDown:hidden`}
        onClick={() => swiperInstance?.slideNext()}
      />
    </div>
  );
};

export default SwiperPagination;
