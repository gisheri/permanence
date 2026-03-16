import { defineConfig } from 'vite';
import { createPackageConfig } from '../../vite.base.config';

export default defineConfig(createPackageConfig({
  packageName: 'array',
  packageDir: __dirname,
  includeTestConfig: false,
}));
