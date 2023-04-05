import react from '@vitejs/plugin-react';
import eslint from '@rollup/plugin-eslint';

export default {
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.js'],
      exclude: ['node_modules/**', 'dist/**'],
      throwOnError: true,
      throwOnWarning: true,
    }),
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
    },
  },
};
