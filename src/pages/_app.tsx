import AppLayout from "@/layouts/AppLayout";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { FavoritesProvider } from "@/contexts/Favorites/FavoritesProvider";

/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
      <FavoritesProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </FavoritesProvider>
    </StyledComponentsRegistry>
  );
}
