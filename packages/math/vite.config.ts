import { defineConfig } from 'vite';
import { createPackageConfig } from '../../vite.base.config';

export default defineConfig(createPackageConfig({
  packageName: 'math',
  packageDir: __dirname,
  includeTestConfig: false,
}));
