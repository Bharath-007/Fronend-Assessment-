import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Fronend-Assessment-/", // Set base path to the root since you're not using a subdirectory
});
