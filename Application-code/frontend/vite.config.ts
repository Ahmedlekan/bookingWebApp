import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: './', // This ensures relative paths for production
  build: {
    rollupOptions: {
      input: './index.html', // Ensure this path points correctly to the root
    }
  }
})