import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu,
  Popover,
  Pane,
  IconButton,
  SearchInput,
  Tooltip,
  MoonIcon,
  StarIcon,
} from "evergreen-ui";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
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
    <header className="nav-header">
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
            className="searchbar"
            placeholder="Search for a snippet..."
            backgroundColor={theme === "dark" ? "var(--hover)" : "var(--background)"}
          />
        </ul>
        <div className="buttons">
          <Tooltip content="Switch Theme">
            <IconButton
              className="button"
              onClick={switchTheme}
              appearance="minimal"
              icon={theme === "light" ? StarIcon : MoonIcon}
            />
          </Tooltip>
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
                    <Menu.Item key={name} className="link">
                      {name}
                    </Menu.Item>
                  ))}
                  <Menu.Divider />
                  <SearchInput
                    marginTop={10}
                    placeholder="Search for a snippet..."
                    className="searchbar"
                  />
                </Menu>
              </Pane>
            }
          >
            <button className={classes("button", "menu_button")}>
              <MenuIcon />
            </button>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
