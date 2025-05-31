# Publishing Guide

## Pre-publication Checklist

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Run tests**:
   ```bash
   npm run test:run
   ```

3. **Update version** (if needed):
   ```bash
   npm version patch|minor|major
   ```

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
