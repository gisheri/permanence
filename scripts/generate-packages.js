#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const srcDir = path.join(rootDir, 'src');

// Categories and their utilities
const categories = {
  array: ['chunk', 'compact', 'flatten', 'union'],
  function: ['debounce', 'throttle'],
  math: ['randomInt'],
  object: ['omit', 'pick'],
  string: ['capitalize', 'kebabCase'],
  type: ['isNil'],
  utility: ['cloneDeep']
};

// Utility to create directories
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy file with content replacement
function copyFile(src, dest, replacements = {}) {
  let content = fs.readFileSync(src, 'utf8');
  
  Object.entries(replacements).forEach(([key, value]) => {
    content = content.replace(new RegExp(key, 'g'), value);
  });
  
  fs.writeFileSync(dest, content);
}

// Generate package.json for a package
function generatePackageJson(packageName, description, main = 'index', dependencies = {}) {
  return {
    name: `@permanence/${packageName}`,
    version: "0.4.0",
    description,
    type: "module",
    main: `./dist/${main}.js`,
    module: `./dist/${main}.mjs`,
    types: `./dist/${main}.d.ts`,
    exports: {
      ".": {
        types: `./dist/${main}.d.ts`,
        import: `./dist/${main}.mjs`,
        require: `./dist/${main}.js`
      }
    },
    files: [
      "dist",
      "README.md"
    ],
    scripts: {
      build: "npm run clean && npm run build:esm && npm run build:cjs && npm run build:types",
      "build:esm": `esbuild src/${main}.ts --outdir=dist --format=esm --out-extension:.js=.mjs --tree-shaking=true`,
      "build:cjs": `esbuild src/${main}.ts --outdir=dist --format=cjs --tree-shaking=true`,
      "build:types": "tsc --emitDeclarationOnly --outDir dist",
      clean: "rm -rf dist",
      dev: "npm run build -- --watch",
      typecheck: "tsc --noEmit",
      lint: "eslint src --ext .ts",
      "lint:fix": "eslint src --ext .ts --fix",
      format: "prettier --write src/**/*.ts",
      "format:check": "prettier --check src/**/*.ts",
      check: "npm run typecheck && npm run lint && npm run test:coverage-check",
      test: "vitest",
      "test:run": "vitest run",
      "test:coverage": "vitest run --coverage",
      "test:coverage-check": "vitest run --coverage --reporter=verbose",
      bundlesize: "bundlesize",
      prepublishOnly: "npm run check && npm run build"
    },
    keywords: [
      "utilities",
      "typescript",
      "tree-shakeable",
      "functional"
    ],
    author: "Your Name",
    license: "MIT",
    dependencies,
    publishConfig: {
      access: "public"
    }
  };
}

// 1. Create @permanence/all package (main package with everything)
console.log('Creating @permanence/all package...');
const allPackageDir = path.join(packagesDir, 'all');
ensureDir(path.join(allPackageDir, 'src'));

// Copy all source files to the all package
function copyDirectory(src, dest) {
  ensureDir(dest);
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDirectory(srcDir, path.join(allPackageDir, 'src'));

const allPackageJson = generatePackageJson('all', 'Complete collection of permanence utilities');
fs.writeFileSync(path.join(allPackageDir, 'package.json'), JSON.stringify(allPackageJson, null, 2));

// Create README for all package
fs.writeFileSync(path.join(allPackageDir, 'README.md'), `# @permanence/all

Complete collection of permanence utilities. This package includes all utility functions from all categories.

## Installation

\`\`\`bash
npm install @permanence/all
\`\`\`

## Usage

\`\`\`typescript
import { capitalize, omit, chunk } from '@permanence/all';
\`\`\`
`);

// 2. Create category packages
Object.entries(categories).forEach(([category, utilities]) => {
  console.log(`Creating @permanence/${category} package...`);
  const categoryPackageDir = path.join(packagesDir, category);
  ensureDir(path.join(categoryPackageDir, 'src'));
  
  // Copy category files
  const categorySrcDir = path.join(srcDir, category);
  if (fs.existsSync(categorySrcDir)) {
    copyDirectory(categorySrcDir, path.join(categoryPackageDir, 'src'));
  }
  
  // Create index.ts that exports all utilities in this category
  const indexContent = utilities
    .map(util => `export { ${util} } from './${util}';`)
    .join('\n');
  
  fs.writeFileSync(path.join(categoryPackageDir, 'src', 'index.ts'), indexContent);
  
  const categoryPackageJson = generatePackageJson(
    category, 
    `${category.charAt(0).toUpperCase() + category.slice(1)} utilities from permanence`
  );
  fs.writeFileSync(path.join(categoryPackageDir, 'package.json'), JSON.stringify(categoryPackageJson, null, 2));
  
  // Create README for category package
  fs.writeFileSync(path.join(categoryPackageDir, 'README.md'), `# @permanence/${category}

${category.charAt(0).toUpperCase() + category.slice(1)} utilities from permanence.

## Installation

\`\`\`bash
npm install @permanence/${category}
\`\`\`

## Usage

\`\`\`typescript
import { ${utilities.join(', ')} } from '@permanence/${category}';
\`\`\`

## Available functions

${utilities.map(util => `- \`${util}\``).join('\n')}
`);
});

// 3. Create individual utility packages
Object.entries(categories).forEach(([category, utilities]) => {
  utilities.forEach(utility => {
    console.log(`Creating @permanence/${utility} package...`);
    const utilPackageDir = path.join(packagesDir, utility);
    ensureDir(path.join(utilPackageDir, 'src'));
    
    // Copy the utility file and its test
    const utilFile = path.join(srcDir, category, `${utility}.ts`);
    const testFile = path.join(srcDir, category, `${utility}.test.ts`);
    
    if (fs.existsSync(utilFile)) {
      fs.copyFileSync(utilFile, path.join(utilPackageDir, 'src', 'index.ts'));
    }
    if (fs.existsSync(testFile)) {
      copyFile(testFile, path.join(utilPackageDir, 'src', 'index.test.ts'), {
        [`from './${utility}'`]: "from './index'"
      });
    }
    
    const utilPackageJson = generatePackageJson(
      utility,
      `${utility} utility from permanence`
    );
    fs.writeFileSync(path.join(utilPackageDir, 'package.json'), JSON.stringify(utilPackageJson, null, 2));
    
    // Create README for individual utility package
    fs.writeFileSync(path.join(utilPackageDir, 'README.md'), `# @permanence/${utility}

${utility} utility from permanence.

## Installation

\`\`\`bash
npm install @permanence/${utility}
\`\`\`

## Usage

\`\`\`typescript
import { ${utility} } from '@permanence/${utility}';
\`\`\`
`);
  });
});

console.log('Package generation complete!');
