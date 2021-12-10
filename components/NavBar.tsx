import Link from "next/link";
import { useTheme } from "next-themes";
import {
  SideSheet,
  Pane,
  IconButton,
  SearchInput,
  MoonIcon,
  FlashIcon,
  MenuIcon,
  Position,
} from "evergreen-ui";
import classes from "lib/classes";
import { useState, useEffect } from "react";
import { useLoaded } from "lib/useLoaded";
import { supabase } from "../lib/supabaseClient";
import GithubButton from "./GithubButton";
import Search from "./Search";

const navigation = [
  { name: "Create", href: "/" },
  { name: "Discover", href: "/discover" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const loaded = useLoaded();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("snippets").select("*");
      setSnippets(data);
    }
    fetchData();
  }, [])

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!loaded) return null;
  return (
    <Pane
      className="nav-header"
      backgroundColor={
        theme === "dark" ? "var(--foreground)" : "var(--background)"
      }
    >
      <nav>
        <Link href="/" passHref>
          <a className={classes("logo", "logo", "link")}>
            <span>Monad</span>
            <img src="/monad.svg" alt="Monad Logo" />
          </a>
        </Link>
        <ul className="links">
          {navigation.map(({ name, href }) => (
            <li key={name}>
              <a href={href} className="link">
                {name}
              </a>
            </li>
          ))}
          <Search snippets={snippets} />
        </ul>
        <Pane className="buttons">
          <IconButton
            className="button"
            onClick={switchTheme}
            appearance="minimal"
            icon={theme === "light" ? FlashIcon : MoonIcon}
          />
          <SideSheet
            isShown={menuOpen}
            onCloseComplete={() => setMenuOpen(false)}
            position={Position.TOP}
            preventBodyScrolling
          >
            <Pane
              width="100%"
              paddingY={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              backgroundColor={
                theme === "light" ? "var(--hover)" : "var(--background)"
              }
              className="nav-menu"
            >
              <SearchInput
                className="searchbar"
                placeholder="Search for a snippet..."
                backgroundColor="var(--input)"
              />
              <ul className="links">
                {navigation.map(({ name, href }) => (
                  <li key={name}>
                    <a href={href} className="link">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </Pane>
          </SideSheet>
          <IconButton
            icon={MenuIcon}
            className={classes("button", "menu_button")}
            onClick={() => setMenuOpen(!menuOpen)}
            appearance="minimal"
          />
          <GithubButton />
        </Pane>
      </nav>
    </Pane>
  );
}