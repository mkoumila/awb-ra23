import Image from "next/image";
import { Animate } from "./Animate";
import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { SliderThumbnail } from "./SliderThumbnailComponent";

const SwiperItemDesktop = ({
  cloudinaryName,
  title,
  id,
  content,
  delai,
  image,
  alt,
  video,
  playVideo,
  videoRefs,
  swiperInstance,
  openMenuOverlay,
  isMultiple,
  children,
  setChosenVideo,
}) => {
  useEffect(() => {
    const videoElement = videoRefs.current[id]?.current;
    if (videoElement) {
      videoElement.controls = false; // Attempt to explicitly remove controls
      videoElement.setAttribute("playsinline", ""); // Encourage inline playback on iOS
      videoElement.setAttribute("webkit-playsinline", ""); // For older iOS webviews
      videoElement.removeAttribute("controls"); // Ensure controls attribute is removed
    }
  }, [id]);

  return (
    <>
      {/* Overlay component */}
      <div
        className="absolute left-5 top-5 z-10 h-[calc(100%-40px)] w-[calc(100%-40px)] text-white overflow-hidden"
        /* style={overlayStyle} */
      >
        <div className="absolute top-0 left-0 z-[10] w-full flex items-start justify-between px-8 pt-7">
          <Link href="/">
            <Image
              src="/logo-fr.png"
              width={203}
              height={65}
              alt="Attijari Wafabank Logo"
              className=""
            />
          </Link>
          <div className="flex items-baseline gap-8">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={clsx(
                  "font-sofia-condensed text-4xl leading-[30px] tracking-[0.72px] transition-all border-b-2 border-transparent hover:border-white",
                  "!border-white"
                )}
              >
                FR
              </a>
              <a
                href="#"
                className={clsx(
                  "font-sofia-condensed text-4xl leading-[30px] tracking-[0.72px] transition-all border-b-2 border-transparent hover:border-white"
                )}
              >
                EN
              </a>
            </div>
            <button
              className="bg-transparent border-0 cursor-pointer"
              onClick={openMenuOverlay}
            >
              <Image
                src={"/menu-burger.svg"}
                width={27}
                height={22}
                alt="ouvrir le menu"
              />
            </button>
          </div>
        </div>

        <Image
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75 grayscale"
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${image}`}
          alt={alt}
          fill
        />
        <div className="absolute top-0 left-0 h-full w-full bg-yellow-gradient z-[1]">
          {video && (
            <div
              className="cursor-pointer absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-all hover:drop-shadow-[0px_0px_6px_#000000a3] hover:scale-105"
              onClick={() => {
                // Play the video
                playVideo(id);
                setChosenVideo({
                  openVideo: true,
                  isThumbnail: false,
                  video: video,
                  id: id,
                });
              }}
            >
              <Image
                src="/play-circle.svg"
                width={84}
                height={84}
                alt="play video"
                className="xl:w-[124px] xl:h-[124px]"
              />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 h-[58%] xl:h-[60%] flex items-start gap-10">
          <div className="group ml-10">
            <Animate
              animationType="fade"
              direction="down"
              cascade
              duration={300}
              triggerOnce={false}
            >
              <p className="font-sofia-condensed text-[25px] font-bold leading-[25px] tracking-[0.5px] mb-2 whitespace-pre-wrap">
                {delai ? delai : "\n"}
              </p>

              {title && (
                <h2 className="font-montserrat text-[clamp(50px,calc(-27.56px+7.211vw),80px)] font-bold leading-[0.8] -tracking-[4px] mb-3 uppercase -ml-[6px] whitespace-pre-wrap">
                  {title}
                </h2>
              )}
              {content && (
                <p className="font-sofia-condensed text-[clamp(18px,calc(-0.10px+1.768vw),25px)] font-bold leading-[25px] tracking-[0.5px] whitespace-pre-wrap">
                  {content}
                </p>
              )}
            </Animate>
          </div>
        </div>

        {/** file */}
        <a
          href="#"
          className="absolute bottom-6 right-8 inline-flex items-center gap-1 text-base font-bold leading-[30px] tracking-[0.02em] text-center text-white cursor-pointer z-[2] hover:underline"
        >
          <Image
            src="/download-file.svg"
            width={21}
            height={21}
            className="relative top-1"
            alt="Télécharger le rapport financier"
          />
          Télécharger le rapport financier
        </a>
        {isMultiple ? (
          <SliderThumbnail
            slideChildrenData={children}
            swiperInstance={swiperInstance}
            cloudinaryName={cloudinaryName}
            setChosenVideo={setChosenVideo}
            playVideo={playVideo}
          />
        ) : null}
      </div>
    </>
  );
};

export default SwiperItemDesktop;
