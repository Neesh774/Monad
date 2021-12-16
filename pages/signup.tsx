import { supabase } from "../lib/supabaseClient";
import { Pane, Button, TextInputField, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "lib/types";

export default function SignIn() {
  const [loggedIn, setLoggedIn] = useState(supabase.auth.user());
  const [logInLoading, setLogInLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (supabase.auth.user()) {
      router.push("/");
    }
  });

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
            }
          }
        });

        setLoggedIn(user);
        toaster.notify(
          "Success! Please check your email for a verification link."
        );
        setLogInLoading(false);
      });
  };

  return (
    <Pane className="sign-in-parent">
      <Pane className="sign-in-island">
        <h4 className="header">Sign Up for Monad</h4>
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
            router.push("/login");
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
  );
}
