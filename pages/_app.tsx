import { ThemeProvider } from "next-themes";
import NavBar from "components/NavBar";
import "styles/global.scss";
import "styles/home.scss";
import "styles/lost.scss";
import "styles/legal.scss";
import "styles/navbar.scss";
import "styles/langstyles.scss";
import "styles/snippet.scss";
import type { AppProps } from "next/app";
import { useLoaded } from "lib/useLoaded";
import { Spinner, Pane } from "evergreen-ui";

export default function App({ Component, pageProps }: AppProps) {
  const loaded = useLoaded();
  return (
    <ThemeProvider attribute="class">
      <NavBar />
      <Pane className="main">
	  	<Component {...pageProps} />
      </Pane>
    </ThemeProvider>
  );
}
