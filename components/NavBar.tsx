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
  Button,
  Menu,
  Avatar,
  Popover,
  UserIcon,
  toaster,
  CogIcon,
  LogOutIcon,
} from "evergreen-ui";
import classes from "lib/classes";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Search from "./Search";
import router from "next/router";
import { useLoggedIn } from "lib/useLoggedIn";

const navigation = [
  { name: "Create", href: "/" },
  { name: "Discover", href: "/discover" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const loggedIn = useLoggedIn();
  const [menuOpen, setMenuOpen] = useState(false);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("snippets").select("*");
      setSnippets(data);
    }

    fetchData();
  }, []);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toaster.danger("There was an error signing out. Please try again later.");
      return;
    }
    router.push(router.asPath);
  };

  return (
    <Pane
      className="nav-header"
      backgroundColor={
        theme === "dark" ? "var(--foreground)" : "var(--background)"
      }
    >
      <nav>
        <Link href="/" passHref>
          <a className={classes("logo", "link")}>
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
                type="search"
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
          {!loggedIn ? (
            <Button
              className="sign-in"
              appearance="default"
              fontSize="0.9rem"
              backgroundColor="var(--green)"
              color="white"
              border="none"
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign In
            </Button>
          ) : (
            <Popover
              position={Position.BOTTOM_RIGHT}
              content={
                <Pane
                  backgroundColor="var(--input)"
                  className="nav-account-menu"
                >
                  <Menu>
                    <Menu.Group>
                      <Menu.Item
                        icon={UserIcon}
                        onClick={() => {
                          router.push(`/user/${loggedIn.username}`);
                        }}
                      >
                        Account
                      </Menu.Item>
                      <Menu.Item icon={CogIcon} onClick={() => {
                          router.push('/user/settings');
                        }}>Settings</Menu.Item>
                    </Menu.Group>
                    <hr />
                    <Menu.Item
                      onClick={logOut}
                      icon={<LogOutIcon color="danger" className="log-out"/>}
                      intent="danger"
                      color="#d14343"
                      className="nav-log-out"
                    >
                      Log Out
                    </Menu.Item>
                  </Menu>
                </Pane>
              }
            >
              <Button
                paddingX={0}
                borderRadius={50}
                border="none"
                className="user-avatar"
              >
                <Avatar
                  src={loggedIn.avatar}
                  name={loggedIn.username}
                  size={32}
                  border="none"
                />
              </Button>
            </Popover>
          )}
        </Pane>
      </nav>
    </Pane>
  );
}
