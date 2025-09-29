import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: "stats.html", // report file name
      template: "treemap",    // options: sunburst, treemap, network
      gzipSize: true,         // show gzip sizes
      brotliSize: true        // show brotli sizes
    }),
    ViteImageOptimizer({
      jpg: { quality: 70 },
      jpeg: { quality: 70 },
      png: { quality: 70 },
      webp: { quality: 70 },   // compress .webp (important for your case)
      avif: { quality: 60 },   // generate AVIF for extra savings
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React core
          react: ["react", "react-dom"],

          // Split router (only if you're using it)
          router: ["react-router-dom"],
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://spark-borders-server.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
