import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: "default",
  title: "Worldwide Quran Academy Studio",

  projectId: process.env.VITE_SANITY_PROJECT_ID || "9kbc5fi1",
  dataset: process.env.VITE_SANITY_DATASET || "production",

  plugins: [deskTool()],

  schema: {
    types: [
      {
        name: "blog",
        title: "Blog Post",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
          { name: "publishedAt", title: "Published At", type: "datetime" },
          { name: "excerpt", title: "Excerpt", type: "text" },
          { name: "body", title: "Body", type: "text" },
          { name: "author", title: "Author", type: "string" }
        ]
      }
    ]
  }
});
