import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Rapport annuel de Attijariwafabank - 2023",
  description:
    "Identité, stratégie, développement, gouvernance, chiffres et performances. Découvrez en vidéo les faits marquants de l'année 2023 du Groupe Attijariwafa bank.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        href: "/favicon.png",
      },
      ,
    ],
  },
};

export default function RootLayout({ children }) {
  // Your Google Tag Manager container ID
  const GTM_ID = "GTM-PS9S9SS3";

  return (
    <html lang="fr">
      <head>
{/*        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${GTM_ID}');
        `,
          }}
        />*/}
      </head>
      <body>
{/*        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>*/}
        {children}
      </body>
      <Script async src="https://static.addtoany.com/menu/page.js" />
    </html>
  );
}
