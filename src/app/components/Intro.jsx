import Image from "next/image";
import Link from "next/link";

import { SliderThumbnail } from "./sliderthumbnail";

const Intro = ({ swiperInstance, data, cloudinaryName, openMenuOverlay}) => {
  return (
    <div className="lg:p-5 lg:h-dvh relative min-h-screen">
      <div className="relative bg-white lg:rounded-[32px] overflow-y-scroll h-dvh lg:h-full p-8 pb-28 md:px-11 md:py-7 flex flex-col justify-between">
        <button
          className="absolute top-6 left-5 z-[10] bg-transparent border-0 cursor-pointer"
          onClick={openMenuOverlay}
        >
          <Image
            src={"/menu-burger.svg"}
            width={24}
            height={24}
            alt="ouvrir le menu"
          />
        </button>
        <Image
          src="/backgrounds/Background01.png"
          fill
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="relative">
          <div className="flex justify-end">
            <h1 className="sr-only">
              Bienvenue sur Agency.Africa, l'offre de création publicitaire et
              contenus de marque de l'agence digitale Void.
            </h1>
            <Image
              src="/logo.png"
              width={203}
              height={65}
              alt="Agency Africa Logo"
              className=""
            />
          </div>
          <div className="text-white grid md:grid-cols-2 mt-5">
            <div>
              <Image
                src="/Logo_Rapport-annuel.png"
                width={442}
                height={291}
                alt="rapport annuel 2023"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 relative text-white mt-[60px]">
            <div className="relative text-[20px] leading-[24px] md:text-[25px] font-medium md:leading-7 md:pr-8">
              <p>
                Identité, stratégie, développement, gouvernance, chiffres et
                performances.
                <br />
                Découvrez en vidéo les faits marquants de l’année 2023 du Groupe
                Attijariwafa bank.
              </p>
            </div>
            <button
              className="flex flex-col items-center py-3 cursor-pointer bg-transparent border-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={() => swiperInstance.slideTo(1)}
            >
              <Image
                src="/play.svg"
                width={84}
                height={84}
                alt="play video"
                className="w-[55px] h-[55px] md:w-[84px] md:h-[84px]"
              />
            </button>
          </div>
        </div>
        <div className="relative">
          <SliderThumbnail
            swiperInstance={swiperInstance}
            data={data}
            cloudinaryName={cloudinaryName}
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
