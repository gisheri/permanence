import { defineConfig } from 'vite';
import { createPackageConfig } from '../../vite.base.config';

export default defineConfig(createPackageConfig({
  packageName: 'string',
  packageDir: __dirname,
}));
