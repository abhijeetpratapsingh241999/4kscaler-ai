import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    // यह Vite को बताएगा कि .gitpod.io वाले सभी होस्ट्स को अनुमति है
    allowedHosts: [".gitpod.io"], 
  }
})