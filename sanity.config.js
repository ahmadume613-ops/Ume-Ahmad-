import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: "worldwide-quran-academy",
  title: "Worldwide Quran Academy CMS",

  // Using the project's environment variables (with fallback)
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
          {
            name: "title",
            title: "Title (English)",
            type: "string",
            validation: (Rule) => Rule.required(),
          },
          {
            name: "titleUr",
            title: "Title (Urdu) - Optional",
            type: "string",
          },
          {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
              source: "title",
              maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: "category",
            title: "Category",
            type: "string",
            options: {
              list: [
                { title: "Parents Guidance", value: "parents" },
                { title: "Tajweed & Recitation", value: "tajweed" },
                { title: "Hifz Benefits", value: "hifz" },
              ],
            },
            initialValue: "parents",
          },
          {
            name: "publishDate",
            title: "Publish Date",
            type: "date",
            validation: (Rule) => Rule.required(),
          },
          {
            name: "author",
            title: "Author Name",
            type: "string",
            initialValue: "Academy Instructor",
          },
          {
            name: "readTime",
            title: "Estimated Read Time",
            type: "string",
            initialValue: "5 min read",
          },
          {
            name: "excerpt",
            title: "Excerpt / Summary (English)",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required(),
          },
          {
            name: "excerptUr",
            title: "Excerpt / Summary (Urdu) - Optional",
            type: "text",
            rows: 3,
          },
          {
            name: "content",
            title: "Full Blog Content (English)",
            type: "text",
            validation: (Rule) => Rule.required(),
          },
          {
            name: "contentUr",
            title: "Full Blog Content (Urdu) - Optional",
            type: "text",
          },
          {
            name: "image",
            title: "Featured Image",
            type: "image",
            options: {
              hotspot: true,
            },
          },
        ],
      },
    ],
  },
});
