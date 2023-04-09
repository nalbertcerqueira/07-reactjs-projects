import react from "@vitejs/plugin-react"
import autoprefixer from "autoprefixer"
import { defineConfig } from "vite"
import { createHtmlPlugin } from "vite-plugin-html"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), createHtmlPlugin({ minify: true })],
    css: {
        postcss: {
            plugins: [autoprefixer()]
        }
    }
})
