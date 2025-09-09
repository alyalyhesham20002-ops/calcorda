import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Improve file watching in containerized environments to prevent HMR issues
  server: {
    watch: {
      usePolling: true,
    }
  }
});
