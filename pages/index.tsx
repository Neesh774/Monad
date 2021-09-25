import MetaTags from 'components/MetaTags';
import Divider from 'components/Divider';
import Code from 'components/Code';

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
		<>
			<MetaTags />
			<section className='left'>
				<div id='content'>
					<h1 className='header'>
						Share <span className='blue'>snippets</span> in seconds
					</h1>
				</div>
				<Divider />
			</section>
			<section className='foreground right'>
				<div id='content' className='inline'>
					<pre>
						<Code language='jsx' code={snippetCode} />
					</pre>
					<span className='text'>
						<p className='badge green'>Built Socially</p>
						<h1>Share With Everyone</h1>
						<p>
							It has never been easier to assign tags and share your short code snippets
							with the dev community. Monad was created with SEO in mind so your snippets
							can always be found!
						</p>
					</span>
				</div>
				<Divider foreground={true} />
			</section>
			<section className='left'>
				<div id='content'>
					<span className='text'>
						<p className='badge red'>Collaborate With Ease</p>
						<h1>Work in Private</h1>
						<p>
							Easily share snippets with everyone in Monad, or just a couple people you
							trust. Keep your snippets unlisted, or public to anyone to view.
						</p>
					</span>
				</div>
				<Divider />
			</section>
		</>
	);
}
