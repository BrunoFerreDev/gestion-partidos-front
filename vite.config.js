import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            primary: "#0df259",
            "background-light": "#f5f8f6",
            "background-dark": "#102216",
            "card-light": "#ffffff",
            "card-dark": "#1c3024",
            "text-primary-light": "#111813",
            "text-primary-dark": "#ffffff",
            "text-secondary-light": "#608a6e",
            "text-secondary-dark": "#a3c2af",
            "border-light": "#dbe6df",
            "border-dark": "#2a4232",
          },
          fontFamily: {
            inter: ["Inter", "sans-serif"],
          },
          borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
      },
    }),
  ],
});
