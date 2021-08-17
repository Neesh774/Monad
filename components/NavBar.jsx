import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu } from '@headlessui/react';
import { MoonIcon, SunIcon, XIcon, MenuIcon } from '@heroicons/react/outline';
import styles from 'styles/navbar.module.scss';
import classes from 'lib/classes';

const navigation = [
	{ name: 'About', href: '#about' },
	{ name: 'Newsletter', href: '#newsletter' },
	{ name: 'Discord', href: '/discord' },
];

export default function Navbar() {
	const { theme, setTheme } = useTheme();

	const switchTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<Menu>
			{({ open }) => (
				<>
					<header className={styles.header}>
						<nav>
							<Link href='/'>
								<a className={classes('logo', styles.logo)}>
									<span>Monad</span>
									<img src='/MonadLogo.png' alt='Monad Logo' />
								</a>
							</Link>
							<ul className={styles.links}>
								{navigation.map(({ name, href }) => (
									<li key={name}>
										<Link href={href}>{name}</Link>
									</li>
								))}
							</ul>
							<div className={styles.buttons}>
								<button className={styles.button} onClick={switchTheme}>
									{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
								</button>
								<Menu.Button
									className={classes(styles.button, styles.menu_button)}>
									{open ? <XIcon /> : <MenuIcon />}
								</Menu.Button>
							</div>
						</nav>
					</header>
					<Menu.Items className={styles.mobile}>
						{navigation.map(({ name, href }) => (
							<Menu.Item key={name}>
								{({ active }) => (
									<Link href={href} passHref>
										<Menu.Button as='a' className={active ? styles.active : ''}>
											{name}
										</Menu.Button>
									</Link>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</>
			)}
		</Menu>
	);
}
