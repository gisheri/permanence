import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

/**
 * Creates a standardized Vite configuration for Permanence packages
 */
export function createPackageConfig(config) {
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
        provider: 'v8',
      },
    },
  };
}
