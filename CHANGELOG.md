# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-05-31

### Added
- **New Functions**: Added 3 new utility functions for enhanced functionality
  - `flatten`: Flattens an array one level deep with proper TypeScript support
  - `throttle`: Throttles function execution to at most once per specified interval
  - `randomInt`: Generates random integers within a specified range with validation
- **Performance Benchmarks**: Added comprehensive benchmark suite with 23 performance tests
- **Enhanced Package Scripts**: Added `benchmark` and `benchmark:run` scripts
- **Bundle Size Monitoring**: Added size limits for all new functions (149B-198B gzipped)

### Changed
- **Package Exports**: Updated subpath exports to include new functions
- **Build Configuration**: Enhanced build scripts to include all 13 utility functions
- **Test Coverage**: Maintained 100% test coverage across 117 tests (33 new tests added)
- **Documentation**: Updated README and JSDoc comments for better clarity

### Performance
- `flatten`: 9.4M ops/sec for nested arrays, 200K ops/sec for large arrays
- `throttle`: 22.7M ops/sec for function creation (fastest in category)
- `randomInt`: 20.6M ops/sec for random generation across all ranges

## [0.3.0] - 2025-05-31

### Added

#### Array Functions
- `union<T>(...arrays: readonly (readonly T[])[]): T[]` - Creates an array of unique values from all given arrays, in order of first occurrence

#### Utility Functions
- `cloneDeep<T>(value: T): T` - Creates a deep clone of the given value. Supports primitives, arrays, objects, Date, RegExp, and nested structures

### Changed
- Updated package exports to include new utility functions
- Enhanced build scripts to compile new functions
- Added bundlesize monitoring for new functions (union: 300B, cloneDeep: 600B)
- Updated documentation with comprehensive examples for new functions

### Development
- ✅ Maintained 100% test coverage with comprehensive test suites for new functions
- ✅ All functions properly typed and documented with JSDoc
- ✅ Tree-shakeable individual imports support maintained

## [0.2.0] - 2025-05-31

### Added

#### Array Functions
- `chunk<T>(array: readonly T[], size: number): T[][]` - Split arrays into chunks of specified size
- `compact<T>(array: readonly (T | null | undefined | false | 0 | '')[]): T[]` - Remove all falsy values from an array

#### Type Functions
- `isNil(value: unknown): value is null | undefined` - Check if a value is null or undefined with type guard

#### Function Functions
- `debounce<TArgs>(func: (...args: TArgs) => void, wait: number): (...args: TArgs) => void` - Delay function execution until after wait milliseconds

### Changed
- Enhanced TypeScript types (replaced `any` with `unknown` where appropriate)
- Updated package.json with ES module type and proper exports order
- Improved build process to include all new utility functions

### Development
- ✅ Added ESLint with TypeScript support and custom rules
- ✅ Added Prettier for consistent code formatting
- ✅ Added bundlesize monitoring for performance tracking
- ✅ Added GitHub Actions CI/CD workflow
- ✅ Enhanced test coverage to 74 tests with 100% coverage enforcement
- ✅ Added comprehensive development documentation (CONTRIBUTING.md, COVERAGE.md, PUBLISHING.md)

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
