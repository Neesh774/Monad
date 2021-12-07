import { supabase } from "../lib/supabaseClient";
import {
  Pane,
  Dialog,
  Button,
  TextInputField,
  Checkbox,
  EyeOffIcon,
  EyeOpenIcon,
  IconButton,
  Tooltip,
} from "evergreen-ui";
import { useState } from "react";

export default function SignIn() {
  const [loggedIn, setLoggedIn] = useState(supabase.auth.user());
  const [isShown, setIsShown] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signIn = async (e) => {
    if (window !== undefined) {
      e.preventDefault();
      
    }
  };
  return (
    <Pane>
      <form className="sign-in-form">
        <Dialog
          isShown={isShown}
          title="Sign In To Monad"
          onCloseComplete={() => setIsShown(false)}
          footer={({ close }) => {
            return (
              <Pane display="flex" gap="1rem">
                <Button onClick={close}>Cancel</Button>
                <Button className="sign-in-button" appearance="primary" onClick={signIn} backgroundColor="var(--green)" border="none">
                  Sign In
                </Button>
              </Pane>
            );
          }}
        >
          <TextInputField placeholder="MonadUser123" label="Username" className="username"/>
          <TextInputField
            placeholder="Password..."
            type={`${showPassword ? "text" : "password"}`}
            label="Password"
            description="Use a strong password with capital and lowercase letters, numbers, and symbols."
            hint={
              <Pane
                display="flex"
                alignItems="center"
                fontSize="0.8rem"
                marginTop="0.4rem"
                color="var(--text-secondary)"
                justifyContent="space-between"
              >
                <Tooltip
                  content={showPassword ? "Hide Password" : "Show Password"}
                >
                  <IconButton
                    appearance="minimal"
                    icon={showPassword ? EyeOpenIcon : EyeOffIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </Tooltip>
                <Button appearance="minimal" paddingX="0.4rem">
                  Forgot your password?
                </Button>
              </Pane>
            }
          />
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            label="Remember me"
          />
          <Button appearance="minimal" paddingX="0.4rem" color="var(--blue)">
            Don&apos;t have an account?
          </Button>
        </Dialog>
      </form>
      {!loggedIn ? (
        <Button
          className="sign-in"
          appearance="default"
          fontSize="0.9rem"
          backgroundColor="var(--green)"
          color="white"
          border="none"
          onClick={() => {
            setIsShown(true);
          }}
        >
          Sign In
        </Button>
      ) : (
        ''
      )}
    </Pane>
  );
}
