import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src', // Adjust this if needed (by default, root is project directory)
  build: {
    outDir: 'dist', // The output directory
    rollupOptions: {
      input: './index.html' // Ensure this is correct
    }
  }
})