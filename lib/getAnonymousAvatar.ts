import { supabase } from "./supabaseClient";
export function getAnonymous() {
  try {
    const { data, error } = supabase.storage
      .from("avatars")
      .getPublicUrl("anonymous.png");
    if (error) {
      throw error;
    }
    return data.publicURL;
  } catch (error) {
    alert(error.message);
  }
}