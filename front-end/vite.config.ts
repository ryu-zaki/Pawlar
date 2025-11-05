import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    chunkSizeWarningLimit: 1000, // increase from 500 KB to 1 MB
  },
})
