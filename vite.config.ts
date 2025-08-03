import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // Gitpod jaise cloud environments ke liye server configuration
  server: {
    host: true, // Sabhi network interfaces par listen karega
    
    // Sabhi Gitpod URLs ko allow karne ke liye
    allowedHosts: ['.gitpod.io'],

    // HMR (Hot Module Replacement) ko theek se kaam karne ke liye
    hmr: {
      clientPort: 443,
    }
  }
})
