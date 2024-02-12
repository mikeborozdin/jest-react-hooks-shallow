import { defineConfig } from 'vitest/config';
import reactPlugin from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [reactPlugin()],
  test: {
    include: [
      './src/**/*.test.ts',
    ],
  }
});
