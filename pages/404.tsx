import Link from "next/link";
import MetaTags from "components/MetaTags";

export default function Lost() {
  return (
    <>
      <MetaTags title="404 NOT FOUND" description="" />
      <div className="lost-parent">
        <div className="vertical">
          <h1 className="pink">404</h1>
          <h2>
            Looks like you ended up somewhere you shouldn&apos;t be! <br />
            <Link href="/">
              <a className="home-link">Here&apos;s the way home</a>
            </Link>
          </h2>
          <img src={"/404.svg"} alt="404" />
        </div>
      </div>
    </>
  );
}
