import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient";

export const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    async function fetchData() {
      if(supabase.auth.user()) {
        const { data: userObj }= await supabase.from("profiles").select("*").eq("id", supabase.auth.user().id).single();
        setLoggedIn(userObj);
      }
    }

    fetchData();
  }, []);

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      const { data: userObj }= await supabase.from("profiles").select("*").eq("id", supabase.auth.user().id).single();
      setLoggedIn(userObj);
    }
    else if(event === "SIGNED_OUT") {
      setLoggedIn(null);
    }
  });

  return [loggedIn, setLoggedIn];
};
