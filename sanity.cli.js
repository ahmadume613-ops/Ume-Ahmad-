import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID || "9kbc5fi1",
    dataset: process.env.VITE_SANITY_DATASET || "production",
  }
});
