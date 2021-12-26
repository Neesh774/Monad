import { supabase } from "./supabaseClient";
import { getAnonymous } from "./getAnonymousAvatar";
export function downloadImage(id : string) : string {
    try {
      const { data, error } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${id}/avatar.png`);
      if (error || !data) {
        throw error;
      }
      return data.publicURL;
    } catch (error) {
      const anonymous = getAnonymous();
      return anonymous;
    }
  }