import { supabase } from "../lib/supabaseClient";
import { Pane, Button, TextInputField, toaster, Heading } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ResetPassword from "components/resetPasswordEmail";
import { useLoggedIn } from "lib/useLoggedIn";
import MetaTags from "../components/MetaTags"

export default function SignIn() {
  const loggedIn = useLoggedIn();
  const [logInLoading, setLogInLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if(loggedIn) {
      router.push('/');
    }
  }, [loggedIn, router]);

  const handleLogin = async (email) => {
    setLogInLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      toaster.danger(error.message);
      return;
    }
    setLogInLoading(false);
  };

  return (
    <>
      <MetaTags title="Log in to Monad" description=""/>
      <Pane className="sign-in-parent">
        <Pane className="sign-in-island">
          <Heading className="header" size={600}>Sign In to Monad</Heading>
          <TextInputField
            placeholder="MonadUser@gmail.com"
            label="Email"
            className="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInputField
            placeholder="Password..."
            type='password'
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            hint={
              <Button
                appearance="minimal"
                paddingX="0.4rem"
                marginY="0.2rem"
                color="var(--blue)"
                onClick={() => {
                    setShowReset(true)
                }}
              >
                Forgot Password?
              </Button>
            }
          />
          <Button
            appearance="minimal"
            paddingX="0.4rem"
            color="var(--blue)"
            onClick={() => router.push("/signup")}
          >
            Don&apos;t have an account?
          </Button>
          <Pane display="flex" gap="1rem" className="sign-in-footer">
            <Button
              className="sign-in-button"
              appearance="primary"
              onClick={() => {
                handleLogin(email);
              }}
              backgroundColor="var(--green)"
              border="none"
              isLoading={logInLoading}
            >
              Sign In
            </Button>
          </Pane>
        </Pane>
      </Pane>
      <ResetPassword shown={showReset} close={() => setShowReset(false)} />
    </>
  );
}
