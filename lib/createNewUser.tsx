import { supabase } from "./supabaseClient";

export async function createNewUser() {
  await supabase.from("profiles").upsert({
    id: supabase.auth.user().id,
    username: supabase.auth.user().user_metadata.user_name,
    avatar: supabase.auth.user().user_metadata.avatar_url,
    github_id: `https://github.com/${
      supabase.auth.user().user_metadata.user_name
    }`,
  });
}
