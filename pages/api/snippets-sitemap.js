import { SitemapStream, streamToPromise } from 'sitemap';
import { supabase } from "lib/supabaseClient.js";

export default async function SiteMap(req, res) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of snippets
    const { data: snippets } = await supabase.from("snippets").select("slug");

    // Create each URL row
    snippets.forEach(snippet => {
      smStream.write({
        url: `/snippets/${snippet.slug}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    // List of users
    const { data: users } = await supabase.from("profiles").select("username");

    // Create each URL row
    users.forEach(user => {
      smStream.write({
        url: `/user/${user.username}`,
        changefreq: 'daily',
        priority: 0.9
      })
    })

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }

}