import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base works on GitHub Pages for any repo name (https://<user>.github.io/<repo>/)
export default defineConfig({
  plugins: [react()],
  base: './',
})
