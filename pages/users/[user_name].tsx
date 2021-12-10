import { supabase } from "lib/supabaseClient";
import MetaTags from "../../components/MetaTags";
import { User, Snippet, Activity} from "lib/types";

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
  const user: User = data[0];
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
