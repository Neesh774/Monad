import MetaTags from 'components/MetaTags';
import Divider from 'components/Divider';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import React, { useEffect } from "react";

const snippetCode = `
const App = props => {
	return (
		<div>
		<h1> Monad </h1>
		<div>Share snippets in seconds</div>
		</div>
	);
};`;

export default function Home() {
	useEffect(() => {
		Prism.highlightAll();
	  }, []);

	return (
		<>
			<MetaTags />
			<section>
				<div id='content'>
					<h1 className="header">Share <span className="snippets">snippets</span> in seconds</h1>
				</div>
				<Divider />
			</section>
			<section className='foreground right'>
				<pre>
					<code className="language-js">{snippetCode}</code>
				</pre>
				<div id='content'>
					<p className="badge green">Built Socially</p>
					<h1>Share With Everyone</h1>
					<p>
					It has never been easier to assign tags and share your short code snippets with the dev community. Monad was created with SEO in mind so your snippets can always be found!
					</p>
				</div>
				<Divider foreground={true} />
			</section>
			<section>
				<div id='content'>
					<p className="badge pink">Collaborate With Ease</p>
					<h1>Work in Private</h1>
					<p>
						Easily share snippets with everyone in Monad, or just a couple people you trust. Keep your snippets unlisted, or public to anyone to view.
					</p>
				</div>
				<Divider />
			</section>
		</>
	);
}
