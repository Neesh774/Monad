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

  let defaultTheme = "light";

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Navbar
      collapseOnSelect
      bg={theme ?? defaultTheme}
      variant={(theme ?? defaultTheme) === "light" ? "light" : "dark"}
      expand="md"
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
          <button onClick={switchTheme} className={`${styles.button} ${styles.theme}`}>
            {theme === "dark" ? (
              <MoonIcon width="25" height="25" />
            ) : (
              <SunIcon width="25" height="25" />
            )}
          </button>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/create">Create</Nav.Link>
            <Nav.Link href="/discover">Discover</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search for a snippet..."
              className={`me-2 bg-${theme} text-${
                theme === "light" ? "dark" : "light"
              }`}
              aria-label="Search"
            />
          </Form>
          <button onClick={switchTheme} className={styles.button}>
            {theme === "dark" ? (
              <MoonIcon width="25" height="25" />
            ) : (
              <SunIcon width="25" height="25" />
            )}
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
