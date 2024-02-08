import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Agency Africa",
  description: "Agency Africa Description",
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
  return (
    <html lang="fr">
      <body>{children}</body>
      <Script src="https://static.addtoany.com/menu/page.js" />
    </html>
  );
}
