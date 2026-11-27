import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative, so the build works at any path: /Portfolio/ today, the domain root later.
  base: './',
})