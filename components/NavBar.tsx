import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Popover, Pane, IconButton, TextInput } from "evergreen-ui";
import { MoonIcon, SunIcon, XIcon, MenuIcon } from "@heroicons/react/outline";
import styles from "styles/navbar.module.scss";
import classes from "lib/classes";
import { useState } from "react";

const navigation = [
  { name: "Create", href: "/" },
  { name: "Discover", href: "/discover" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={styles.header}>
    	<nav>
			<Link href="/" passHref>
				<a className={classes("logo", styles.logo, styles.a)}>
					<span>Monad</span>
					<img src="/monad.svg" alt="Monad Logo" />
				</a>
			</Link>
			<ul className={styles.links}>
				{navigation.map(({ name, href }) => (
					<li key={name}>
						<Link href={href}>{name}</Link>
					</li>
				))}
				<TextInput placeholder="Search for a snippet..." />
			</ul>
			<div className={styles.buttons}>
				<IconButton
					className={styles.button}
					onClick={switchTheme}
					appearance="minimal"
				>
					{theme === "dark" ? <SunIcon /> : <MoonIcon />}
				</IconButton>
				<Popover
					minWidth="30%"
					content={
					<Pane
						paddingX={20}
						paddingY={10}
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
					>
						<Menu>
						{navigation.map(({ name, href }) => (
							<Menu.Item key={name}>{name}</Menu.Item>
						))}
						<Menu.Divider />
						<TextInput
							marginTop={10}
							placeholder="Search for a snippet..."
						/>
						</Menu>
					</Pane>
					}
				>
					<button className={classes(styles.button, styles.menu_button)}>
					<MenuIcon />
					</button>
				</Popover>
			</div>
    	</nav>
    </header>
  );
}
