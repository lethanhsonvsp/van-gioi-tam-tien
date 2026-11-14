import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Build is served from the GitHub Pages sub-path; dev server stays at '/'.
export default defineConfig(({ command }) => ({ plugins: [react()], base: command === 'build' ? '/van-gioi-tam-tien/' : '/' }));
