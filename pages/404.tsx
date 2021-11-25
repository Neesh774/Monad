import Link from 'next/link';
import { Image } from 'react-bootstrap';

export default function Lost() {
	return (
		<div className="lost-parent">
            <div className="vertical">
                <h1 className="pink">404</h1>
                <h2>
                    Looks like you ended up somewhere you shouldn&apos;t be! <br />
                    <Link href="/">
                        <a className="home-link">Here&apos;s the way home</a>
                    </Link>
                </h2>
                <Image fluid src={'/404.svg'} alt="404" />
            </div>
        </div>
	);
}
