import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const Intro = ({ swiperInstance, data, cloudinaryName, openMenuOverlay }) => {
  return (
    <div className="lg:p-5 h-dvh relative">
      <div className="absolute top-0 left-0 z-[10] w-full flex items-start justify-between pt-4 pl-5 pr-4 lg:px-8 lg:pt-7 text-white">
        <Link href="/">
          <Image
            src="/logo-fr.png"
            width={203}
            height={65}
            alt="Attijari Wafabank Logo"
            className="w-[187px] lg:w-[203px]"
          />
        </Link>
        <div className="flex items-end lg:items-baseline gap-5 lg:gap-8">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className={clsx(
                "font-sofia-condensed text-xl leading-[15px] tracking-[0.4px] lg:text-4xl lg:leading-[30px] lg:tracking-[0.72px] transition-all border-b-2 border-transparent",
                "!border-white"
              )}
            >
              FR
            </a>
            <a
              href="#"
              className={clsx(
                "font-sofia-condensed text-xl leading-[15px] tracking-[0.4px] lg:text-4xl lg:leading-[30px] lg:tracking-[0.72px] transition-all border-b-2 border-transparent"
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
      <div className="h-full flex flex-col lg:flex-row">
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
          <h1 className="relative text-white font-montserrat z-[1] flex flex-col items-center leading-[1] w-full lgDown:mt-[60px]">
            <span className="text-[23px] font-light tracking-[1.38px] uppercase lg:text-[40px] lg:tracking-[2.4px]">
              Rapport Annuel
            </span>
            <p className="text-[120px] italic font-thin tracking-[-10.8px] -ml-[60px] lg:text-[300px] lg:ml-[-180px]">
              <span>2</span>
              <span className="absolute top-[46%]">3</span>
            </p>
          </h1>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-[#d39d36] h-full flex flex-col pt-8 px-[21px]">
            {data.map((el, i) => {
              return (
                <Link
                  href={`/${el.id}`}
                  key={i}
                  className="flex items-center gap-3"
                >
                  <h2 className="font-montserrat text-[40px] font-light tracking-[-1.6px] uppercase text-white">
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
  );
};

export default Intro;
