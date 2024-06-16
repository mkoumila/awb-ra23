import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useBreakPoint } from "../hooks/useBreakPoint";

const Intro = ({ swiperInstance, data, cloudinaryName, openMenuOverlay }) => {
  const device = useBreakPoint();

  return device === "desktop" ? (
    <div className="p-5 h-dvh">
      <div className="relative h-full">
        <div className="absolute top-0 left-0 z-[10] w-full flex items-start justify-between px-8 pt-7 text-white">
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
        <div
          className="absolute right-[60px] top-0 h-full w-1/2 bg-[#d39d36]"
          style={{ clipPath: "polygon(40% 0, 100% 0%, 100% 100%, 0% 100%)" }}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/2 flex items-end justify-end bg-[#EAAE3C]"
          style={{ clipPath: "polygon(40% 0, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          <a
            href="#"
            className="absolute bottom-6 right-8 inline-flex items-center gap-1 text-base font-bold leading-[30px] tracking-[0.02em] text-center text-black cursor-pointer z-[2] hover:underline"
          >
            <Image
              src="/download-file.svg"
              width={21}
              height={21}
              className="relative top-1 brightness-0"
              alt="Télécherger le rapport financier"
            />
            Télécherger le rapport financier
          </a>
        </div>
        <div className="absolute left-[46%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10 xl:gap-[151px]">
          <h1 className="relative text-white font-montserrat z-[1] flex flex-col items-center leading-[1] w-full">
            <span className="text-[clamp(32px,calc(12.31248px+1.923vw),40px)] font-light tracking-[2.4px] uppercase text-nowrap">
              Rapport Annuel
            </span>
            <p className="text-[clamp(250px,calc(126.92544px+12.019vw),300px)] italic font-thin tracking-[-27px] -ml-[200px]">
              <span>2</span>
              <span className="absolute top-[46%]">3</span>
            </p>
          </h1>
          <div className="flex flex-col gap-2 xl:gap-0">
            {data.map((el, i) => {
              return (
                <Link
                  href={`/${el.id}`}
                  key={i}
                  className="flex items-center gap-3 group"
                >
                  <h2 className="font-montserrat text-[clamp(40px,calc(-58.4896px+9.615vw),80px)] font-bold leading-[1] tracking-[-4px] uppercase text-white">
                    {el.linkTitle}
                  </h2>
                  <Image
                    src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${el.imageGifOff}`}
                    alt={el.alt}
                    width={88}
                    height={56}
                    className="aspect-[88/56] rounded-[10px] object-cover grayscale group-hover:hidden"
                  />
                  <Image
                    src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${el.imageGifOn}`}
                    alt={el.alt}
                    width={88}
                    height={56}
                    className="aspect-[88/56] rounded-[10px] object-cover hidden group-hover:block"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : device === "tablet" || device === "mobile" ? (
    <div className="h-dvh relative">
      <div className="absolute top-0 left-0 z-[10] w-full flex items-start justify-between pt-4 pl-5 pr-4 text-white">
        <Link href="/">
          <Image
            src="/logo-fr.png"
            width={203}
            height={65}
            alt="Attijari Wafabank Logo"
            className="w-[187px]"
          />
        </Link>
        <div className="flex items-end gap-5">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className={clsx(
                "font-sofia-condensed text-xl leading-[15px] tracking-[0.4px] transition-all border-b-2 border-transparent",
                "!border-white"
              )}
            >
              FR
            </a>
            <a
              href="#"
              className={clsx(
                "font-sofia-condensed text-xl leading-[15px] tracking-[0.4px] transition-all border-b-2 border-transparent"
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
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover object-left"
            >
              <source
                src="/backgrounds/background-video.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-[#878787] mix-blend-multiply" />
          </div>
          <h1 className="relative text-white font-montserrat z-[1] flex flex-col items-center leading-[1] w-full mt-[60px]">
            <span className="text-[23px] font-light tracking-[1.38px] uppercase">
              Rapport Annuel
            </span>
            <p className="text-[120px] italic font-thin tracking-[-10.8px] -ml-[60px]">
              <span>2</span>
              <span className="absolute top-[46%]">3</span>
            </p>
          </h1>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-[#d39d36] h-full flex flex-col justify-evenly py-8 px-[21px]">
            {data.map((el, i) => {
              return (
                <Link
                  href={`/${el.id}`}
                  key={i}
                  className="flex items-center gap-3"
                >
                  <h2 className="font-montserrat text-[40px] font-light leading-[1] tracking-[-1.6px] uppercase text-white">
                    {el.linkTitle}
                  </h2>
                  <Image
                    src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/f_webp,q_auto/v1/${el.image}`}
                    alt={el.alt}
                    width={50}
                    height={30}
                    className="aspect-[50/30] rounded object-cover grayscale"
                  />
                </Link>
              );
            })}
          </div>
          <div className="bg-[#EAAE3C] h-[70px] w-full flex items-center justify-between px-6">
            <a
              href="#"
              className="text-base font-bold tracking-[0.32px] flex items-center gap-1"
            >
              <Image
                src="/download-file.svg"
                width={21}
                height={21}
                className="relative top-1 brightness-0"
                alt="Rapport financier"
              />
              Rapport financier
            </a>
            <div onClick={() => swiperInstance?.slideNext()}>
              <Image
                src="/arrow-down.svg"
                width={20}
                height={20}
                alt="Rapport financier"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Intro;
