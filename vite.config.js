import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'Dream-Workshop-React';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${repoName}/` : '/', 
}));
