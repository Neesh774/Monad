import { ThemeProvider } from 'next-themes';
import 'tailwindcss/tailwind.css';
import NavBar from './components/NavBar.jsx';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute='class'>
			<NavBar />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
