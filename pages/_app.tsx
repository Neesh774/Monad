import { ThemeProvider } from 'next-themes';
import 'styles/global.scss';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute='class'>
			<NavBar />
			<main>
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	);
}

export default MyApp;
