import { supabase } from "./supabaseClient";

export async function createNewUser() {
  console.log(supabase.auth.user());
  if (
    !supabase.from("profiles").select("id").contains("id", supabase.auth.user().id)
  ) {
    await supabase.from("profiles").insert({
      id: supabase.auth.user().id,
      username: supabase.auth.user().user_metadata.user_name,
      avatar: supabase.auth.user().user_metadata.avatar_url,
      github_id: `https://github.com/${
        supabase.auth.user().user_metadata.user_name
      }`,
    });
  }
}
