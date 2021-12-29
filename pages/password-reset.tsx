import { supabase } from "../lib/supabaseClient";
import { Pane, Button, TextInputField, toaster, Heading } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLoggedIn } from "lib/useLoggedIn";
import MetaTags from "../components/MetaTags";

export default function ResetPassword() {
  const loggedIn = useLoggedIn();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState<string>();

  const router = useRouter();
  const access_token = router.query.access_token as string;
  console.log(access_token);

  if (!access_token) {
    router.push("/");
  }

  const updatePassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.api.updateUser(access_token, {
      password: newPassword,
    });
    if(error) {
      toaster.danger(error.message);
    }
    setLoading(false);
    toaster.success("Successfully updated your password!");
    router.push("/login");
  };

  return (
    <>
      <MetaTags title="Monad Password Reset" description="" />
      <Pane className="sign-in-parent">
        <Pane className="sign-in-island">
          <Heading className="header" size={600}>
            Reset your Password
          </Heading>
          <TextInputField
            autoFocus
            label="New Password"
            type="password"
            description="Enter your new password, containing lowercase and uppercase characters, numbers, and symbols."
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Pane display="flex" gap="1rem" className="sign-in-footer">
          <Button
            className="sign-in-button"
            appearance="primary"
            onClick={() => {
              updatePassword();
            }}
            backgroundColor="var(--green)"
            border="none"
            isLoading={loading}
          >
            Save
          </Button>
        </Pane>
        </Pane>
      </Pane>
    </>
  );
}
