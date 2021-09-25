import { ThemeProvider } from 'next-themes';
import NavBar from 'components/NavBar';
import 'styles/global.scss';
import 'styles/main.scss';
import 'styles/home.scss';

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
