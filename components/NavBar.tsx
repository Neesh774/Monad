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
import { useState } from "react";
import { useLoaded } from "lib/useLoaded";

const navigation = [
  { name: "Create", href: "/" },
  { name: "Discover", href: "/discover" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const loaded = useLoaded();

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if(!loaded) return null;
  return (
    <Pane className="nav-header"
      backgroundColor={theme === "dark" ? "var(--foreground)" : "var(--background)"}
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
          <SearchInput
            className={classes('searchbar', theme)}
            placeholder="Search for a snippet..."
          />
        </ul>
        <div className="buttons">
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
              width='100%'
              paddingY={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              backgroundColor={theme === "light" ? "var(--hover)" : "var(--background)"}
              className="nav-menu"
            >
              <SearchInput
                  className="searchbar"
                  placeholder="Search for a snippet..."
                  backgroundColor={
                    theme === "dark" ? "var(--hover)" : "var(--background)"
                  }
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
        </div>
      </nav>
    </Pane>
  );
}
