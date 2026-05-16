import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/three/') || id.includes('@react-three'))   return 'vendor-three'
          if (id.includes('/gsap/') || id.includes('@gsap'))           return 'vendor-gsap'
          if (id.includes('/motion/') || id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('/react/') || id.includes('/react-dom/'))    return 'vendor-react'
        },
      },
    },
  },
})
