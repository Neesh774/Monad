import { Container, Row, Col, Image } from 'react-bootstrap'
import Link from 'next/link';

import MetaTags from 'components/MetaTags';
import Code from 'components/Code';
import Footer from 'components/Footer';

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
		<Container>
			<MetaTags />
			<Row className='mb-5 index-texts'>
				<Col sm id='content'>
					<h1 className='header'>
						Share <span className='blue'>snippets</span> in seconds
					</h1>
					<Link href="/create" passHref>
						<button className="createsnippet">
							Create a Snippet
						</button>
					</Link>
				</Col>
				<Col sm>
					<Image fluid src={'/Collaboration.svg'} alt="Collaboration" className="hero"/>
				</Col>
			</Row>
			<Row id='about' className="mb-5 index-texts">
				<Col sm>
					<pre>
						<Code language='javascript' code={snippetCode} />
					</pre>
				</Col>
				<Col sm>
					<span className='text'>
						<p className='badge green'>Built Socially</p>
						<h1>Share With Everyone</h1>
						<p>
							It has never been easier to assign tags and share your short code snippets
							with the dev community. Monad was created with SEO in mind so your snippets
							can always be found!
						</p>
					</span>
				</Col>
			</Row>
			<Row className='mb-5 index-texts'>
				<Col sm >
					<span className='text'>
						<p className='badge red'>Collaborate With Ease</p>
						<h1>Work in Private</h1>
						<p>
							Keep your snippets unlisted or share them with all of Monad, we don&apos;t judge! Rest assured, they will be protected by our best security guards.
						</p>
					</span>
				</Col>
				<Col sm>
					<Image fluid src={'/Security.svg'} alt="Security"/>
				</Col>
			</Row>
			<Row className='right index-texts' id='integrations'>
				<Col sm>
					<Image fluid src={'/Integrations.svg'} alt="Integrations"/>
				</Col>
				<Col sm>
					<span className='text'>
						<p className='badge blue'>Use Monad Everywhere</p>
						<h1>Integrations</h1>
						<p>
							Monad has plenty of integrations with other services like VSCode, Discord,
							and more. It makes it easy to share your snippets from all your favorite code resources.
						</p>
					</span>
				</Col>
			</Row>
		</Container>
		<Footer />
		</>
	);
}
