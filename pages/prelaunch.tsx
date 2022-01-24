import Link from "next/link";
import MetaTags from "components/MetaTags";
import Code from "components/Code";

const snippetCode = `
export default function App(props) {
	return (
		<div>
			<h1> Monad </h1>
			<div>Share snippets in seconds</div>
		</div>
	);
};`;

export default function Home() {
  return (
    <div className="prelaunch">
      <MetaTags />
      <div className="section container 2xl:px-18 md:px-8 sm:px-0 py-10 mx-auto">
        <section className="grid md:grid-cols-2 my-16 gap-5 animate-fade-up">
          <div className="flex order-2 md:order-first flex-wrap items-center text-5xl">
            <h3 className="font-extrabold">
              Share{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">
                &nbsp;snippets&nbsp;
              </span>{" "}
              in seconds
            </h3>
          </div>
          <img
            src={"/Collaboration.svg"}
            alt="Collaboration"
            className="max-w-sm w-full my-auto mx-auto max-w-maxcontent"
          />
        </section>
        <section className="grid md:grid-cols-2 my-16 gap-5 animate-fade-up-1" id="about">
          <pre className="flex items-center">
            <Code
              code={snippetCode}
            />
          </pre>
          <span className="flex order-2 flex-wrap items-center">
            <div className="lg:px-12 pt-10 mx-auto">
              <p className="badge green">Built Socially</p>
              <h1 className="text-light-01 text-4xl md:leading-tight mb-5 font-semibold pb-0">
                Share With Everyone
              </h1>
              <p className="lg:text-lg xs:text-lg md:text-base leading-normal  text-light-02 max-w-md mx-auto mt-0 sm:mx-0">
                It has never been easier to assign tags and share your short
                code snippets with the dev community. Monad was created with SEO
                in mind so your snippets can always be found!
              </p>
            </div>
          </span>
        </section>
        <section className="grid md:grid-cols-2 my-16 gap-5 animate-fade-up-2">
          <span className="flex order-2 md:order-first flex-wrap items-center">
            <div className="lg:px-12 pt-10 mx-auto">
              <p className="badge red">Collaborate With Ease</p>
              <h1 className="text-light-01 text-4xl md:leading-tight mb-5 font-semibold pb-0">
                Work in Private
              </h1>
              <p className="lg:text-lg xs:text-lg md:text-base leading-normal  text-light-02 max-w-md mx-auto mt-0 sm:mx-0">
                Easily share snippets with everyone in Monad, or just a couple
                people you trust. Keep your snippets unlisted, or public to
                anyone to view.
              </p>
            </div>
          </span>
          <img
            src={"/Security.svg"}
            alt="Security"
            className="max-w-sm w-full my-auto mx-auto max-w-maxcontent"
          />
        </section>
        <section className="grid md:grid-cols-2 my-16 gap-5 animate-fade-up-3" id="integrations">
          <img
            src={"/Integrations.svg"}
            alt="Integrations"
            className="max-w-sm w-full my-auto mx-auto max-w-maxcontent"
          />
          <span className="flex order-2 flex-wrap items-center">
            <div className="lg:px-12 pt-10 mx-auto">
              <p className="badge blue">Use Monad Everywhere</p>
              <h1 className="text-light-01 text-4xl md:leading-tight mb-5 font-semibold pb-0">
                Integrations
              </h1>
              <p className="lg:text-lg xs:text-lg md:text-base leading-normal  text-light-02 max-w-md mx-auto mt-0 sm:mx-0">
                Monad will have plenty of integrations with other services like
                VSCode, Discord, and more. You&apos;ll be able to share your
                snippets from all your favorite code resources.
              </p>
            </div>
          </span>
        </section>
      </div>
      <div className="footer">
        <footer className="grid md:grid-cols-2 gap-5 top-0">
          <div>
            <h3>Monad</h3>
            <Link href="/terms">Terms and Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <span className="cursor-not-allowed text-gray-500">Beta</span>
          </div>
          <div>
            <h3>Contact Us</h3>
            <a href="https://discord.gg/b8ugMm7nvc">Discord</a>
            <a href="https://twitter.com/IliosLabs">Twitter</a>
            <a href="mailto:Kanishq0106@gmail.com">Email</a>
          </div>
        </footer>
        <div className="copyright">Made by Ilios Labs © 2021 </div>
      </div>
    </div>
  );
}
