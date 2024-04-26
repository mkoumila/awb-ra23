"use client";

import Image from "next/image";
import { Thumbnail } from "./sliderthumbnail";
import { useRouter } from "next/navigation";

import { sliderData } from "../data";
function createArrayWithIncrementedValues(length) {
  if (typeof length !== "number" || isNaN(length) || length <= 0) {
    return null;
  }

  const resultArray = Array.from({ length }, (_, index) => index + 1);
  return resultArray;
}

export const ImageSlider = ({
  title,
  nodes,
  showGif = false,
  countpagination = 0,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/rapport-annuel");
  };
  return (
    <div className="pb-10">
      <h2 className="text-[35px] leading-[36px] font-extrabold mb-5 text-white">
        {title}
      </h2>
      <div className="grid grid-cols-5 gap-5">
        {showGif && (
          <Thumbnail
            index={"static"}
            //swiperInstance={swiperInstance}
            //cloudinaryName={cloudinaryName}
            {...sliderData[1]}
            title={"2023"}
            bigtitle={true}
            onClick={handleClick}
          />
        )}
        {nodes?.map((item) => {
          return (
            <div className="group aspect-[250/158] relative text-white flex items-end justify-center rounded-2xl overflow-hidden">
              <Image
                src={item?.img?.src}
                width={item?.img?.width}
                height={item?.img?.height}
                alt={item?.img_alt}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
      <ImagePagination countpagination={countpagination} />
    </div>
  );
};

export const ImagePagination = ({ countpagination = 3 }) => {
  if (countpagination < 2) return null;

  const paginationArray = createArrayWithIncrementedValues(countpagination);

  return (
    <div className="flex items-center gap-4 justify-center pt-5">
      {paginationArray?.map((_, index) => {
        if (index === 0)
          return (
            <span className="w-[18px] h-[18px] rounded-full bg-white border border-white"></span>
          );
        return (
          <span className="w-[18px] h-[18px] rounded-full border border-white"></span>
        );
      })}
    </div>
  );
};
