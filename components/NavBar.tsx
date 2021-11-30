/* eslint-disable @next/next/no-html-link-for-pages */
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  XIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import a from "next/link";
import styles from "styles/navbar.module.scss";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={`navbar ${theme === "dark"? 'is-dark' : 'is-light'}`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          Monad{" "}
          <img
            src="/monad.svg"
            className="logo"
            alt="Monad"
            width="60"
            height="60"
          />
        </a>
        <button onClick={switchTheme} className={`${styles.button}  ${styles.theme} navbar-item`}>
            {theme === "dark" ? (
              <MoonIcon width="25" height="25" />
            ) : (
              <SunIcon width="25" height="25" />
            )}
          </button>
        <button onClick={() => {setActive(!active)}} role="button" className={`navbar-burger ${active? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="monadNavBar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className={`navbar-menu ${active? 'is-active' : ''}`} id="monadNavBar">
        <div className="navbar-start">
          <a href="/create" className="navbar-item">Create</a>
          <a href="/discover" className="navbar-item">Discover</a>
          <input placeholder="Search for a snippet..." />
        </div>
        <div className="navbar-end">
        </div>
      </div>
    </nav>
  );
}
