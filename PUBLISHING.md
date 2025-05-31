# Publishing Guide

## Pre-publication Checklist

1. **Run all checks**:
   ```bash
   npm run check
   ```
   This runs both TypeScript checking and tests.

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Update version** (if needed):
   ```bash
   npm version patch|minor|major
   ```

## Available Scripts

- `npm run typecheck` - Check TypeScript types without emitting files
- `npm run check` - Run TypeScript check, tests, and coverage validation (100% required)
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:coverage-check` - Run tests with coverage and enforce 100% thresholds
- `npm run build` - Build the package for distribution

## Coverage Requirements

This package maintains **100% test coverage** on all utility functions. The coverage check will fail if any of the following thresholds are not met:

- **Statements**: 100%
- **Branches**: 100% 
- **Functions**: 100%
- **Lines**: 100%

Coverage is automatically enforced during:
- `npm run check` - Development validation
- `npm run prepublishOnly` - Pre-publication hook

## Publishing to npm

1. **Login to npm**:
   ```bash
   npm login
   ```

2. **Publish the package**:
   ```bash
   npm publish --access public
   ```

## Usage After Publishing

Once published, users can install and use the package:

```bash
npm install @permanence/core
```

### Tree-shakeable Imports
```typescript
// Import only what you need
import { capitalize } from '@permanence/core/string/capitalize';
import { omit } from '@permanence/core/object/omit';

// Use the functions
const title = capitalize('hello world');
const safeData = omit(userData, ['password']);
```

### Bundle Analysis
To verify tree-shaking is working, users can analyze their bundle size with tools like:
- webpack-bundle-analyzer
- rollup-plugin-visualizer
- Vite's built-in bundle analyzer

The individual imports should only include the specific function and its dependencies, not the entire package.
