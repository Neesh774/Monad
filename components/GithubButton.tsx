import { supabase } from "../lib/supabaseClient";
import {
  Pane,
  Button,
  Popover,
  Position,
  Avatar,
  Menu,
  UserIcon,
  LogOutIcon,
  CogIcon,
  toaster,
} from "evergreen-ui";
import { useState } from "react";
import { Github } from "../public/github";
import { useRouter } from "next/router";
import { createNewUser } from "../lib/createNewUser";

export default function SignUp() {
  const [loggedIn, setLoggedIn] = useState(supabase.auth.user());
  const [logInLoading, setLogInLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    if (window !== undefined) {
      const href = window.location.href;
      setLogInLoading(true);
      await supabase.auth
        .signIn(
          {
            provider: "github",
          },
          {
            redirectTo: href,
          }
        )
        .then(async ({ error }) => {
          if (error) {
            toaster.danger(
              "There was an error signing in. Please try again later."
            );
            return;
          }
          await createNewUser();
        });
      setLoggedIn(supabase.auth.user());
      setLogInLoading(false);
    }
  };
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toaster.danger("There was an error signing out. Please try again later.");
      return;
    }
    setLoggedIn(supabase.auth.user());
  };

  return (
    <Pane>
      {!loggedIn ? (
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={
            <Pane
              background="var(--foreground)"
              width={240}
              height={80}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Button
                isLoading={logInLoading}
                onClick={signIn}
                iconBefore={Github}
              >
                Sign In With Github
              </Button>
            </Pane>
          }
        >
          <Button
            className="sign-in"
            appearance="default"
            fontSize="0.9rem"
            color="white"
            border="none"
          >
            Sign In
          </Button>
        </Popover>
      ) : (
        <Popover
          position={Position.BOTTOM_RIGHT}
          content={
            <Pane backgroundColor="var(--input)" className="nav-account-menu">
              <Menu>
                <Menu.Group>
                  <Menu.Item
                    icon={UserIcon}
                    onClick={() => {
                      router.push(`/users/${loggedIn.user_metadata.user_name}`);
                    }}
                  >
                    Account
                  </Menu.Item>
                  <Menu.Item icon={CogIcon}>Settings</Menu.Item>
                </Menu.Group>
                <hr />
                <Menu.Item onClick={logOut} icon={LogOutIcon} intent="danger">
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
              src={loggedIn.user_metadata.avatar_url}
              name={loggedIn.user_metadata.user_name}
              size={32}
              border="none"
            />
          </Button>
        </Popover>
      )}
    </Pane>
  );
}
