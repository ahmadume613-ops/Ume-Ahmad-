import { createClient } from "@sanity/client";
import { BlogPost } from "./types";
import { DEFAULT_BLOGS } from "./data";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "9kbc5fi1";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = "2023-05-03";

// Create Sanity Client
export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: true, // true for fast response, false for real-time draft/updates
});

/**
 * Fetch all blogs. Falls back to static local default blogs if query fails or is not configured.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!projectId || projectId === "your_project_id") {
    console.log("Sanity Project ID not configured. Using static local fallback blogs.");
    return DEFAULT_BLOGS as BlogPost[];
  }

  try {
    const query = `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      author
    }`;
    const posts = await sanityClient.fetch(query);
    if (posts && posts.length > 0) {
      return posts as BlogPost[];
    }
    return DEFAULT_BLOGS as BlogPost[];
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity CMS, using static fallback:", error);
    return DEFAULT_BLOGS as BlogPost[];
  }
}

/**
 * Fetch a single blog post by its slug current.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!projectId || projectId === "your_project_id") {
    const local = DEFAULT_BLOGS.find((p) => p.slug.current === slug);
    return (local as BlogPost) || null;
  }

  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      author
    }`;
    const post = await sanityClient.fetch(query, { slug });
    if (post) {
      return post as BlogPost;
    }
    // Fallback to local search
    const local = DEFAULT_BLOGS.find((p) => p.slug.current === slug);
    return (local as BlogPost) || null;
  } catch (error) {
    console.error(`Failed to fetch blog post for slug "${slug}" from Sanity, using fallback:`, error);
    const local = DEFAULT_BLOGS.find((p) => p.slug.current === slug);
    return (local as BlogPost) || null;
  }
}
