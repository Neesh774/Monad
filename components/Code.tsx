import Prism from 'prismjs';
import { useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';

export default function Code({
	code,
	plugins,
	language,
}: {
	code: string;
	plugins?: string[];
	language: string;
}) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<pre className={!plugins ? '' : plugins.join(' ')}>
			<code className={`language-${language}`}>{code.trim()}</code>
		</pre>
	);
}
