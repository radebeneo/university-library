import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import {ReactNode} from "react";

const imbPlexSans = localFont({
  src: [
      {path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal'},
      {path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal'},
      {path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal'},
      {path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal'},
  ],
  variable: '--font-ibm-plex-sans',
});

const bebasNeue = localFont({
  src : [
      {path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal'},
  ],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: "Library",
  description: "Library is a digital library management system",
};

const RootLayout = ({children,}: { children: ReactNode; }) => {
  return (
    <html lang="en">
      <body
        className={`${imbPlexSans.className} ${imbPlexSans.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;