import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export interface PackageViteConfig {
  /** Package name (e.g., 'string', 'array', 'capitalize') */
  packageName: string;
  /** Package directory (defaults to __dirname) */
  packageDir?: string;
  /** Library name for UMD builds (defaults to 'Permanence{PackageName}') */
  libraryName?: string;
  /** Additional external dependencies to exclude from bundle */
  external?: string[];
  /** Whether to generate TypeScript declarations (defaults to true) */
  generateDts?: boolean;
  /** Additional vite plugins */
  additionalPlugins?: any[];
}

/**
 * Creates a standardized Vite configuration for Permanence packages
 */
export function createPackageConfig(config: PackageViteConfig) {
  const {
    packageName,
    packageDir = process.cwd(),
    libraryName = `Permanence${packageName.charAt(0).toUpperCase() + packageName.slice(1)}`,
    external = [],
    generateDts = true,
    additionalPlugins = [],
  } = config;

  const plugins = [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    ...additionalPlugins,
  ];

  if (generateDts) {
    plugins.push(
      dts({
        entryRoot: 'src',
      })
    );
  }

  return {
    root: packageDir,
    cacheDir: `../../node_modules/.vite/packages/${packageName}`,
    plugins,
    build: {
      lib: {
        entry: resolve(packageDir, 'src/index.ts'),
        name: libraryName,
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external,
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: 'node',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: `../../coverage/packages/${packageName}`,
        provider: 'v8' as const,
      },
    },
  };
}
