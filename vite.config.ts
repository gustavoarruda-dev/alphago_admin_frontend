import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  const apiTarget = process.env.VITE_API_PROXY_TARGET;
  const brainTarget = process.env.BRAIN_API_PROXY_TARGET;
  const nexusTarget = process.env.NEXUS_PROXY_TARGET;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['highcharts/modules/map'],
    },
    server: {
      port: 5174,
      host: true,
      proxy: {
        ...(apiTarget
          ? {
              '/api': {
                target: apiTarget,
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (p: string) => p,
              },
              '/storage': {
                target: apiTarget,
                changeOrigin: true,
                secure: false,
                rewrite: (p: string) => p,
              },
            }
          : {}),
        ...(brainTarget
          ? {
              '/brain-api': {
                target: brainTarget,
                changeOrigin: true,
                secure: false,
                rewrite: (p: string) => p.replace(/^\/brain-api/, ''),
              },
            }
          : {}),
        ...(nexusTarget
          ? {
              '/nexus': {
                target: nexusTarget,
                changeOrigin: true,
                secure: false,
                rewrite: (p: string) => p.replace(/^\/nexus/, '/api'),
              },
            }
          : {}),
      },
    },
  };
});
