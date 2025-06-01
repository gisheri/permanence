#!/usr/bin/env node

// Script to create individual utility packages for the permanence monorepo

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Define all utilities organized by category
const utilities = {
  array: ['chunk', 'compact', 'flatten', 'union'],
  object: ['omit', 'pick'],
  string: ['kebabCase'], // capitalize already exists
  function: ['debounce', 'throttle'],
  math: ['randomInt'],
  type: ['isNil'],
  utility: ['cloneDeep']
};

// Function to create package.json content for individual utility
function createPackageJson(utilityName, category) {
  return {
    name: `@permanence/${utilityName}`,
    version: "0.0.1",
    description: `${utilityName} utility that never changes`,
    type: "module",
    exports: {
      ".": {
        types: "./index.d.ts",
        import: "./index.js",
        require: "./index.cjs"
      }
    },
    main: "./index.js",
    module: "./index.js",
    types: "./index.d.ts",
    files: [
      "index.js",
      "index.d.ts",
      "index.cjs",
      "README.md",
      "LICENSE"
    ],
    keywords: [
      utilityName,
      category,
      "utilities",
      "typescript",
      "tree-shakeable"
    ],
    homepage: "https://github.com/yourusername/permanence#readme",
    repository: {
      type: "git",
      url: "https://github.com/yourusername/permanence.git",
      directory: `packages/${utilityName}`
    },
    bugs: "https://github.com/yourusername/permanence/issues",
    license: "MIT",
    publishConfig: {
      access: "public"
    },
    dependencies: {}
  };
}

// Function to create index.ts content for individual utility
function createIndexTs(utilityName) {
  return `export * from './lib/${utilityName}';`;
}

console.log('Creating individual utility packages...');

for (const [category, utilityList] of Object.entries(utilities)) {
  for (const utility of utilityList) {
    try {
      console.log(`Creating package for ${utility}...`);
      
      // Generate the NX library
      const command = `npx nx generate @nx/js:library packages/${utility} --bundler=vite --unitTestRunner=vitest --publishable=true --importPath=@permanence/${utility} --linter=eslint`;
      execSync(command, { stdio: 'pipe' });
      
      // Update package.json
      const packageJsonPath = `packages/${utility}/package.json`;
      const packageJson = createPackageJson(utility, category);
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      
      // Copy utility files
      const srcFile = `src/${category}/${utility}.ts`;
      const testFile = `src/${category}/${utility}.test.ts`;
      const destLibDir = `packages/${utility}/src/lib`;
      
      if (fs.existsSync(srcFile)) {
        execSync(`cp ${srcFile} ${destLibDir}/`);
      }
      if (fs.existsSync(testFile)) {
        execSync(`cp ${testFile} ${destLibDir}/`);
      }
      
      // Remove generated stub files
      const stubFile = `packages/${utility}/src/lib/${utility}.ts`;
      const stubTestFile = `packages/${utility}/src/lib/${utility}.spec.ts`;
      
      if (fs.existsSync(stubFile) && fs.readFileSync(stubFile, 'utf8').includes('export function')) {
        fs.unlinkSync(stubFile);
      }
      if (fs.existsSync(stubTestFile)) {
        fs.unlinkSync(stubTestFile);
      }
      
      // Update index.ts
      const indexPath = `packages/${utility}/src/index.ts`;
      fs.writeFileSync(indexPath, createIndexTs(utility));
      
      console.log(`✅ Created package for ${utility}`);
      
    } catch (error) {
      console.error(`❌ Failed to create package for ${utility}:`, error.message);
    }
  }
}

console.log('✅ All individual utility packages created!');
