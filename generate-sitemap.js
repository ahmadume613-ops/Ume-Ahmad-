import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load local environment variables from .env if present
dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID || "9kbc5fi1";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const apiVersion = "2023-05-03";

// Your production domain
const siteUrl = "https://worldwidequranacademy.com";

async function generateSitemap() {
  console.log("Generating sitemap.xml dynamically from Sanity CMS...");
  
  // 1. Core pages of Worldwide Quran Academy website
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "courses", priority: "0.9", changefreq: "weekly" },
    { url: "prices", priority: "0.8", changefreq: "weekly" },
    { url: "about", priority: "0.8", changefreq: "monthly" },
    { url: "contact", priority: "0.9", changefreq: "monthly" },
    { url: "blog", priority: "0.9", changefreq: "daily" }
  ];

  let blogUrls = [];

  // 2. Fetch blog posts from Sanity if configured
  if (projectId && projectId !== "your_project_id") {
    try {
      const client = createClient({
        projectId: projectId,
        dataset: dataset,
        apiVersion: apiVersion,
        useCdn: false // Don't use CDN to get absolute freshest posts during build
      });

      const query = `*[_type == "blog" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }`;

      const posts = await client.fetch(query);
      console.log(`Successfully fetched ${posts.length} blog posts from Sanity.`);

      blogUrls = posts.map(post => ({
        url: `blog/${post.slug}`,
        priority: "0.7",
        changefreq: "weekly",
        lastmod: post._updatedAt ? post._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]
      }));
    } catch (err) {
      console.error("Error fetching blog posts from Sanity CMS:", err.message);
      console.log("Proceeding with static pages only.");
    }
  } else {
    console.log("Sanity Project ID not configured. Generating static pages only.");
  }

  const allPages = [...staticPages, ...blogUrls];

  // 3. Build XML structure
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  allPages.forEach(page => {
    const fullUrl = page.url ? `${siteUrl}/${page.url}` : `${siteUrl}/`;
    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    if (page.lastmod) {
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    } else {
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    }
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  // 4. Ensure target directories exist and write file
  const publicDir = path.resolve(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf8");

  console.log(`Sitemap generated successfully at ${sitemapPath}!`);
}

generateSitemap();
