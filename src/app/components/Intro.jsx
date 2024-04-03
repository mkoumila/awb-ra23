import Image from "next/image";
import Link from "next/link";

import { SliderThumbnail } from "./sliderthumbnail";

const Intro = ({ swiperInstance, data, cloudinaryName }) => {
  return (
    <div className="lg:p-5 lg:h-dvh relative min-h-screen">
      <div className="relative bg-white background-root lg:rounded-[32px] overflow-y-scroll h-dvh lg:h-full p-8 pb-28 md:px-11 md:py-7 flex flex-col justify-between">
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
          <div className="text-white">
            <h1 className="text-[27px] leading-[57px] font-black tracking-[0.61em]">
              Rapport annuel <br />
              <span className="text-[191px] leading-[57px] mt-10 inline-block font-light">
                2023
              </span>
            </h1>
            <div className="text-[25px] font-medium leading-7 mt-[60px]">
              <p>
                Identité, stratégie, développement, gouvernance, chiffres et
                performances.
                <br />
                Découvrez en vidéo les faits marquants de l’année 2023 du Groupe
                Attijariwafa bank.
              </p>
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-y-2 cursor-pointer"
            onClick={() => swiperInstance.slideTo(1)}
          >
            <Image
              src="/play.svg"
              width={84}
              height={84}
              alt="play video"
              className=""
            />
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
