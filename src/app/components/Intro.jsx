import Image from "next/image";
import Link from "next/link";

const Intro = ({ swiperInstance }) => {
  return (
    <div className="lg:p-5 lg:h-dvh relative">
      <div className="bg-white lg:rounded-[32px] overflow-y-scroll h-dvh lg:h-full p-8 pb-28 md:px-11 md:py-7 flex flex-col">
        <div className="flex items-baseline justify-between md:justify-end md:gap-x-16 mb-16">
          <div className="font-bold text-lg uppercase flex flex-wrap gap-x-3">
            <span>
              casablanca
              <Link className="font-light ml-1" href="tel:+212667042085">
                +212 667 042 085
              </Link>
            </span>
            <span className="hidden md:block">-</span>
            <span>
              paris
              <Link className="font-light ml-1" href="tel:+33610333750">
                +33 610 333 750
              </Link>
            </span>
          </div>
          <Link href="mailto:paris@void.fr" className="shrink-0">
            <Image src="/mail.svg" width={23} height={15} alt="Mail us" />
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:justify-between lg:items-baseline">
          <div className="mb-8">
            <div>
              <h1 className="sr-only">
                Bienvenue sur Agency.Africa, l'offre de création publicitaire et
                contenus de marque de l'agence digitale Void.
              </h1>
              <Image
                src="/logo.svg"
                width={100}
                height={100}
                alt="Agency Africa Logo"
                className="w-full mb-4"
              />
            </div>
            <div className="font-light uppercase text-[26px] leading-[normal] lg:text-[40px] lg:leading-[47px]">
              <h3>Films institutionnels</h3>
              <h3>campagnes publicitaires</h3>
              <h3>Rapports d'activité d'entreprises</h3>
              <h3>Dispositifs événementiels</h3>
              <h3>reportages et interviews </h3>
              <h3>Capsules motion design</h3>
              <h3>Prises de vues drone</h3>
              <h3>Animations 3D</h3>
            </div>
          </div>
          <div className="font-sofia font-normal leading-6 lg:max-w-[424px]">
            <p className="mb-4">
              Bienvenue sur Agency.Africa, l'offre de
              <b>&nbsp;création publicitaire</b> et
              <b>&nbsp;contenus de marque</b> de l'agence digitale&nbsp;
              <Link
                href="https://void.fr/fr"
                target="_blank"
                className="underline"
              >
                Void
              </Link>
              .
            </p>
            <p className="mb-4">
              Nous concevons et réalisons des films, campagnes et dispositifs de
              communication événementielle pour des entreprises panafricaines et
              européennes dans tous les secteurs d'activité.
            </p>
            <p className="mb-4">
              Natif du digital, nous avons l'agilité d'une agence conseil,
              augmenté par un réseau pluridisciplinaire de production
              audiovisuelle.
            </p>
            <p className="mb-4">
              Avec nos clients, nous construisons des récits de marque avec une
              approche centrée sur l'émotion, l'engagement et la performance
              pour des audiences corporate comme grand public.
            </p>
            <p>Découvrez nos réalisations.</p>
          </div>
        </div>
        <div
          className="flex flex-col items-center gap-y-2 absolute bottom-4 lg:bottom-8 lgDown:-right-5 lg:left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => swiperInstance.slideTo(1)}
        >
          <span className="flex h-[67px] w-[67px] items-center justify-center rounded-full bg-bloody text-white font-extrabold leading-[47px] text-xl uppercase">
            Watch
          </span>
          <Image
            src="/arrow-down.svg"
            width={20}
            height={20}
            alt="Go to sliders"
            className="invert animate-bounce lgDown:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
