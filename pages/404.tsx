import Link from 'next/link';
export default function Lost() {
	return (
		<div className="parent">
            <div className="vertical">
                <h1 className="pink">404</h1>
                <h2>
                    Looks like you ended up somewhere you shouldn&apos;t be! <br />
                    <Link href="/">
                        <a className="blue">Here&apos;s the way home</a>
                    </Link>
                </h2>
            </div>
        </div>
	);
}
