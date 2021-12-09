import { supabase } from "lib/supabaseClient";
import MetaTags from "../../components/MetaTags";

interface user {
  id: number;
  created_at: string;
  avatar: string;
  snippets: snippet[];
  activity: activity[];
}
interface snippet {
  id: number;
  created_at: string;
  title: string;
  code: string;
  lang: string;
  tags: string[];
}
interface activity {
  snippet_id: number;
  activity: number;
}

export default function User(props) {
console.log(props);
  if (!props.user) return null;
  return (
      <div>
          <MetaTags title={props.user.name} description={`View ${props.user.name}'s profile on Monad.`}/>
      </div>
  );
}
export async function getServerProps(context) {
  const slug = context.params.slug;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", slug)
    .limit(1);
  if (!data) return { props: { statusCode: 404 } };
  const user: user = data[0];
  return {
    props: {
      user,
    },
  };
}

export async function getServerPaths() {
  const { data } = await supabase.from("profiles").select("username");
  if (!data) return { paths: [], fallback: true };
  const paths = data.map((item) => {
    return {
      params: {
        slug: item.username,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
