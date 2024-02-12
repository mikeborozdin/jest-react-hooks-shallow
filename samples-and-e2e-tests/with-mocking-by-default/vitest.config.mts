import { defineConfig } from 'vitest/config';
import reactPlugin from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [reactPlugin()],
  test: {
    environment: 'jsdom',
    include: ['./**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./setupTests.js'],
  }
});

