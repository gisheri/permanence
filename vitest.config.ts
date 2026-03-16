import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false, // Disable watch mode to prevent infinite loading
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'packages/**/*'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules/',
        'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        'dist/',
        '*.config.*',
        'src/index.ts', // Exclude the main index file from coverage
        '**/*.d.ts'
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  },
  esbuild: {
    target: 'node18'
  }
})
