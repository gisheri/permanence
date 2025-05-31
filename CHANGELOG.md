# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-05-31

### Added

#### String Functions
- `capitalize(str: string): string` - Capitalizes the first letter of a string
- `kebabCase(str: string): string` - Converts strings to kebab-case

#### Object Functions  
- `omit<T, K>(obj: T, keys: K[]): Omit<T, K>` - Creates object with specified keys omitted
- `pick<T, K>(obj: T, keys: K[]): Pick<T, K>` - Creates object with only specified keys

### Features
- ✅ Fully tree-shakeable with individual function imports
- ✅ Complete TypeScript support with full type safety
- ✅ Zero dependencies
- ✅ ESM and CommonJS dual package support
- ✅ Comprehensive JSDoc documentation with examples
- ✅ Optimized bundle sizes (150-210B per function)
- ✅ Subpath exports for `@permanence/core/string/functionName` pattern
