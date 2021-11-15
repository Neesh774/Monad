import Link from 'next/link';

export default function Footer() {
    return (
        <div className="foreground footer">
				<footer>
					<div>
						<h3>Monad</h3>
						<Link href="/create">Create A Snippet</Link>
						<Link href="/terms">Terms and Conditions</Link>
						<Link href="/privacy">Privacy Policy</Link>
					</div>
					<div>
						<h3>Contact Us</h3>
						<a href="https://discord.gg/b8ugMm7nvc">Discord</a>
						<a href="https://twitter.com/TeamMonad">Twitter</a>
						<a href="mailto:Kanishq0106@gmail.com">Email</a>
					</div>
				</footer>
				<div className="copyright">Made by Monad © 2021	</div>
			</div>
    )   
}