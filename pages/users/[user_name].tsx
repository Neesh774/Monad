import { supabase } from "lib/supabaseClient";
import MetaTags from "../../components/MetaTags";
import { User, Snippet, Activity } from "lib/types";
import { useState } from "react";
import { EmptyState } from "evergreen-ui";

export default function UserPage({ user } : { user: User }) {
  const [loading, setLoading] = useState(true);

  return (
    <div></div>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.user_name;
  const { data: user } = await supabase.from("profiles").select(`*`).eq("username", slug);
  return {
    props: {
      user: user[0],
    },
  };
}

export async function getStaticPaths() {
  const { data } = await supabase.from("profiles").select("username");
  if (!data) return { paths: [], fallback: true };
  const paths = data.map((item) => {
    return {
      params: {
        user_name: item.username,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
