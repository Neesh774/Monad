import { supabase } from "../lib/supabaseClient";
import { Pane, Button, TextInputField, toaster, Heading } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "lib/types";
import { useLoggedIn } from "lib/useLoggedIn";
import MetaTags from "components/MetaTags";

export default function SignIn() {
  const loggedIn = useLoggedIn();
  const [logInLoading, setLogInLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.push("/", undefined, { shallow: true });
    }
  }, [loggedIn, router]);

  const handleLogin = async (email) => {
    setLogInLoading(true);
    await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .then(async (res) => {
        if (res.data.length > 0) {
          toaster.danger("Email already exists");
          setLogInLoading(false);
          return;
        } else if (username.length < 3) {
          toaster.danger("Username must be at least 3 characters");
          setLogInLoading(false);
          return;
        } else if (username.length > 20) {
          toaster.danger("Username must be less than 20 characters");
          setLogInLoading(false);
          return;
        } else if (!(/^[0-9a-zA-Z_.-]+$/.test(username))) {
          toaster.danger("Usernames may only contain alphanumeric characters, dashes, underscores, and periods.");
          setLogInLoading(false);
          return;
        }
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          toaster.danger(error.message);
          setLogInLoading(false);
          return;
        }
        supabase.auth.onAuthStateChange(async (event) => {
          if (event === "SIGNED_IN") {
            const userObj: User = {
              id: user.id,
              email,
              username,
              snippets: [],
              activity: [],
              tags: [],
              bio: "Nice to meet you, I'm new here!",
            };
            const {
              data: profile,
              error: profileErr,
            }: { data: User; error: any } = await supabase
              .from("profiles")
              .insert(userObj)
              .single();
            if (profileErr) {
              toaster.danger(profileErr.message);
              return;
            } else {
              toaster.notify("Logged in!");
            }
          }
        });
        toaster.notify(
          "Success! Please check your email for a verification link and don't close this tab."
        );
        setLogInLoading(false);
      });
  };

  return (
    <>
      <MetaTags title="Sign up for Monad" />
      <Pane className="sign-in-parent">
        <Pane className="sign-in-island">
          <Heading size={600} className="header">
            Sign Up for Monad
          </Heading>
          <TextInputField
            placeholder="MonadUser@gmail.com"
            label="Email"
            className="email"
            onChange={(e) => setEmail(e.target.value)}
            description="We'll send you a verification link to verify your email."
          />
          <TextInputField
            placeholder="MonadUser123"
            label="Username"
            className="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInputField
            placeholder="Password..."
            type={`password`}
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            description="Use a strong password with capital and lowercase letters, numbers, and symbols."
          />
          <Button
            appearance="minimal"
            paddingX="0.4rem"
            color="var(--blue)"
            onClick={() => {
              router.push("/login", undefined, { shallow: true });
            }}
          >
            Already have an account?
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
    </>
  );
}
