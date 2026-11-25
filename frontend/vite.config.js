import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const apiPort = env.API_PORT || env.PORT || '5000';
  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT || 5173),
      strictPort: true,
      proxy: {
        '/api': `http://localhost:${apiPort}`,
        '/uploads': `http://localhost:${apiPort}`,
      },
    },
  };
});
