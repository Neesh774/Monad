import Link from "next/link";

export default function Footer() {
  return (
    <div className="foreground footer">
      <footer>
        <div>
          <h3>Monad</h3>
          <div><Link href="/">Create A Snippet</Link></div>
          <div><Link href="/terms">Terms and Conditions</Link></div>
          <div><Link href="/privacy">Privacy Policy</Link></div>
        </div>
        <div>
          <h3>Contact Us</h3>
          <div><a href="https://discord.gg/b8ugMm7nvc">Discord</a></div>
          <div><a href="https://twitter.com/IliosLabs">Twitter</a></div>
          <div><a href="mailto:Kanishq0106@gmail.com">Email</a></div>
        </div>
      </footer>
      <div className="copyright">Ilios Labs © 2021 </div>
    </div>
  );
}
