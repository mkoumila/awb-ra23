import Image from "next/image";

const SwiperPagination = ({ swiperInstance, paginationText }) => {
  return (
    <div className="custom-pagination-container flex lgDown:hidden">
      <Image
        src="/arrow-up.svg"
        width={20}
        height={20}
        alt="Slide Up"
        className={
          !(swiperInstance?.realIndex === 1)
            ? "cursor-pointer"
            : "invisible opacity-0"
        }
        onClick={() => swiperInstance?.slidePrev()}
      />
      <div
        className="custom-pagination"
        dangerouslySetInnerHTML={{ __html: paginationText }}
      ></div>
      <Image
        src="/arrow-down.svg"
        width={20}
        height={20}
        alt="Slide Down"
        className={
          !(swiperInstance?.realIndex === swiperInstance?.slides?.length - 1)
            ? "cursor-pointer"
            : "invisible opacity-0"
        }
        onClick={() => swiperInstance?.slideNext()}
      />
    </div>
  );
};

export default SwiperPagination;
