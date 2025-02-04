import { Poppins, Open_Sans, Playfair_Display } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const openSans = Open_Sans({
  weight: ["400", "600", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const playfairDisplay = Playfair_Display({
  weight: ["700", "900"],
  style: ["normal"],
  subsets: ["latin"],
});
