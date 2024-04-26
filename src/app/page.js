import Image from "next/image";

import introImg from "../../public/hp/Logo-VoD.png";
import { ImageSlider } from "./components/ImageSlider";

import { SLIDERS_DATA_IMAGES } from "./data";

export default function Page() {
  return (
    <div className="w-[calc(100%-40px)] text-white mx-auto pt-10">
      <div className="relative min-h-screen w-full bg-black rounded-[32px] overflow-hidden pt-14 px-10 pb-14 background-root-hp">
        <button
          className="absolute top-6 left-5 z-[10] bg-transparent border-0 cursor-pointer"
          //onClick={openMenuOverlay}
        >
          <Image
            src={"/menu-burger.svg"}
            width={24}
            height={24}
            alt="ouvrir le menu"
          />
        </button>
        <div className="absolute top-6 right-5">
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
        <div className="md:px-[104px] mb-14">
          <div className="flex flex-col lg:flex-row md:items-start">
            <Image
              src={introImg?.src}
              width={introImg?.width}
              height={introImg?.height}
              alt="intro"
              className="w-[442px]"
            />
            <div className="">
              <div className="max-w-[503px]">
                <p className="text-[35px] leading-[36px] font-[300] mb-4">
                  Le Groupe Attijariwafa bank met à votre disposition des
                  ressources en vidéo à la demande, à consommer partout et à
                  tout moment, des publications et des actualités sous un format
                  riche et actualisé.
                </p>
                <p className="text-[35px] leading-[36px] font-[300]">
                  Sélectionnez la thématique recherchée parmi les archives de
                  notre banque vidéos. Bon visionnage !
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {SLIDERS_DATA_IMAGES?.map((item, index) => {
            return (
              <ImageSlider
                key={index}
                showGif={item?.showGif || false}
                title={item?.title}
                nodes={item.nodes}
                countpagination={item?.countpagination}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
