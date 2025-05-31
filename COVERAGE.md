# Coverage Enforcement Demo

This package enforces 100% test coverage on all utility functions. Here's what the coverage configuration includes:

## Coverage Configuration (vitest.config.ts)

```typescript
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
```

## Scripts with Coverage Enforcement

- `npm run test:coverage-check` - Runs tests with 100% coverage enforcement
- `npm run check` - TypeScript check + coverage validation
- `npm run prepublishOnly` - Full validation pipeline before publishing

## Coverage Requirements

All utility functions must maintain:
- **100% Statement Coverage** - Every line of code is executed
- **100% Branch Coverage** - Every condition/branch is tested
- **100% Function Coverage** - Every function is called
- **100% Line Coverage** - Every line is covered

The build will fail if any utility function doesn't meet these thresholds.
