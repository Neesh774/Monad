import { useTheme } from "next-themes";
import { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  XIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import styles from "styles/navbar.module.scss";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function NavBar() {
  const { theme, setTheme } = useTheme();


  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Navbar
      collapseOnSelect
      bg={theme}
      variant={theme === "light" ? "light" : "dark"}
      expand="md"
      className={styles.navbar}
    >
      <Container>
        <Navbar.Brand href="/" className="fs-4">
          Monad{" "}
          <img
            src="/monad.svg"
            className="logo"
            alt="Monad"
            width="60"
            height="60"
          />
        </Navbar.Brand>
        <div className={styles.mobileFlex}>
          <button onClick={switchTheme} className={`${styles.button} ${styles.mobiletheme}`}>
            {theme === "dark" ? (
              <MoonIcon width="25" height="25" />
            ) : (
              <SunIcon width="25" height="25" />
            )}
          </button>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>
        <Navbar.Collapse id="navbarScroll" className={styles.collapse}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/create">Create</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>
          </Nav>
          <input placeholder="Search for a snippet..." className={styles.searchbar} />
        </Navbar.Collapse>
		<button onClick={switchTheme} className={`${styles.button}  ${styles.theme}`}>
            {theme === "dark" ? (
              <MoonIcon width="25" height="25" />
            ) : (
              <SunIcon width="25" height="25" />
            )}
          </button>
      </Container>
    </Navbar>
  );
}
