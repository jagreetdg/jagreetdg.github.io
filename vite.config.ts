import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable SWC for faster compilation
      babel: {
        compact: true,
        minified: true,
      },
    }),
  ],
  // For custom domain (ripplyapp.me), base should be root
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable sourcemaps for debugging
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: false, // Disable CSS code splitting for simpler debugging
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Simplified chunking
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // Enable dependency pre-bundling for faster dev server
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
}) 