import { supabase } from "lib/supabaseClient";
import { Dialog, TextInputField, toaster } from "evergreen-ui";
import { useState } from "react";

export default function ResetPassword({ shown, close }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Dialog
      isShown={shown}
      title="Reset Password"
      confirmLabel="Reset"
      onCloseComplete={() => {
        close();
      }}
      isConfirmLoading={loading}
      onConfirm={async () => {
        setLoading(true);
        const { data, error } =
          await supabase.auth.api.resetPasswordForEmail(email);
        if(error) {
            toaster.danger(error.message);
            setLoading(false);
            return;
        }
        toaster.success(`Password reset email sent to ${email}`);
        setLoading(false);
        close();
      }}
    >
      <TextInputField
        autoFocus
        placeholder="MonadUser@gmail.com"
        label="Email"
        type="email"
        description="We'll send you a link to reset your password."
        onChange={(e) => setEmail(e.target.value)}
      />
    </Dialog>
  );
}
