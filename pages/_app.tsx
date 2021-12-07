import { ThemeProvider } from "next-themes";
import NavBar from "components/NavBar";
import "styles/global.scss";
import "styles/footer.scss";
import "styles/home.scss";
import "styles/lost.scss";
import "styles/legal.scss";
import "styles/navbar.scss";
import "styles/langstyles.scss";
import "styles/snippet.scss";
import type { AppProps } from "next/app";
import { Spinner, Pane } from "evergreen-ui";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

export default function App({ Component, pageProps }: AppProps) {
  TimeAgo.addDefaultLocale(en);
  return (
    <ThemeProvider attribute="class">
      <NavBar />
      <Pane className="main">
	  	<Component {...pageProps} />
      </Pane>
    </ThemeProvider>
  );
}
