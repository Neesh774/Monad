import { ThemeProvider } from 'next-themes';
import NavBar from 'components/NavBar';
import 'styles/global.scss';
import 'styles/main.scss';
import 'styles/home.scss';
import 'styles/lost.scss';
import 'styles/legal.scss';
import 'bulma/css/bulma.min.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute='class'>
			<NavBar />
			<main>
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	);
}
