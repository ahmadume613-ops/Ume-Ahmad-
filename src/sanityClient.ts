import { createClient } from "@sanity/client";

// Safe loading of Sanity environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2023-05-03";

export const isSanityConfigured = !!projectId;

export const sanityClient = createClient({
  projectId: projectId || "mock-project-id",
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: true, // Enable edge cache
});

// Interface for standard Sanity blog schema
export interface SanityBlogPost {
  _id: string;
  title: string | { en: string; ur: string };
  slug?: { current: string };
  publishDate?: string;
  content: string | { en: string; ur: string };
  category?: string | { en: string; ur: string };
  readTime?: string;
  author?: string;
  excerpt?: string | { en: string; ur: string };
  imageUrl?: string;
}

/**
 * Fetches blog posts from Sanity and transforms them into our native BlogPost structure.
 * Supports both localized fields (en/ur objects) and simple string fallbacks.
 */
export async function fetchSanityBlogPosts(): Promise<any[]> {
  if (!isSanityConfigured) {
    console.warn("Sanity Project ID not configured. Falling back to local storage and default blog posts.");
    return [];
  }

  const query = `*[_type == "blog"] | order(publishDate desc) {
    _id,
    title,
    slug,
    publishDate,
    content,
    category,
    readTime,
    author,
    excerpt,
    "imageUrl": image.asset->url
  }`;

  try {
    const rawPosts = await sanityClient.fetch<SanityBlogPost[]>(query);
    
    return rawPosts.map((post) => {
      // Direct string or localized object extraction helper
      const extractField = (field: any, defaultVal = "") => {
        if (!field) return { en: defaultVal, ur: defaultVal };
        if (typeof field === "object" && ("en" in field || "ur" in field)) {
          return {
            en: field.en || defaultVal,
            ur: field.ur || field.en || defaultVal
          };
        }
        return { en: String(field), ur: String(field) };
      };

      return {
        id: post._id,
        category: extractField(post.category, "parents"),
        title: extractField(post.title, "Untitled"),
        readTime: post.readTime || "5 min read",
        date: post.publishDate
          ? new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
        author: post.author || "Academy Instructor",
        excerpt: extractField(post.excerpt, ""),
        content: extractField(post.content, ""),
        imagePlaceholderColor: "from-emerald-600 via-teal-700 to-emerald-900",
        imageUrl: post.imageUrl || undefined,
      };
    });
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity.io:", error);
    return [];
  }
}
