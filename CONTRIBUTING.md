# Contributing to @permanence/core

We welcome contributions to @permanence/core! This document provides guidelines for contributing.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd permanence
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development workflow**:
   ```bash
   npm run check  # TypeScript + ESLint + Tests + Coverage
   ```

## Development Workflow

### Adding a New Utility Function

1. **Create the function file**: `src/category/functionName.ts`
2. **Add comprehensive JSDoc** with examples
3. **Create test file**: `src/category/functionName.test.ts` with 100% coverage
4. **Export from main index**: Add to `src/index.ts`
5. **Add to package.json exports**: Add subpath export pattern
6. **Update build script**: Add file to esbuild commands
7. **Update README.md**: Add documentation and examples
8. **Update CHANGELOG.md**: Add to unreleased section

### Code Quality Standards

- **100% Test Coverage**: All functions must have complete test coverage
- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code must pass linting
- **Prettier**: Code must be formatted consistently
- **JSDoc**: Comprehensive documentation with examples

### Testing

```bash
npm run test           # Run tests in watch mode
npm run test:run       # Run tests once
npm run test:coverage  # Run with coverage report
```

### Building

```bash
npm run build    # Full build (ESM + CJS + types)
npm run dev      # Build in watch mode
npm run clean    # Clean dist folder
```

### Quality Checks

```bash
npm run typecheck     # TypeScript type checking
npm run lint          # ESLint checking
npm run lint:fix      # Auto-fix ESLint issues
npm run format        # Format with Prettier
npm run format:check  # Check Prettier formatting
npm run check         # Run all quality checks
```

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the development workflow
3. **Ensure all checks pass**: `npm run check`
4. **Update documentation** as needed
5. **Submit a pull request** with a clear description

## Function Design Principles

1. **Pure Functions**: No side effects, same input → same output
2. **TypeScript First**: Full type safety and inference
3. **Tree-Shakeable**: Each function should be independently importable
4. **Zero Dependencies**: No external dependencies
5. **Performance**: Optimized for minimal bundle size
6. **Comprehensive**: Handle edge cases and provide good defaults

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run `npm run check` to ensure quality
4. Run `npm run build` to create distribution files
5. Create a git tag: `git tag v0.1.1`
6. Push: `git push origin main --tags`
7. Publish: `npm publish`

## Questions?

Feel free to open an issue for any questions or suggestions!
