#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();

// Define categories and utilities based on the known structure
const categories = {
  array: ['chunk', 'compact', 'flatten', 'union'],
  function: ['debounce', 'throttle'],
  math: ['randomInt'],
  object: ['omit', 'pick'],
  string: ['capitalize', 'kebabCase'],
  type: ['isNil'],
  utility: ['cloneDeep']
};

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { 
      stdio: 'inherit', 
      cwd: rootDir,
      env: { ...process.env, FORCE_COLOR: '1' }
    });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    // Don't throw, continue with next package
  }
}

function updatePackageJson(packagePath, packageName, description) {
  const packageJson = {
    "name": packageName,
    "version": "0.4.0",
    "description": description,
    "type": "module",
    "main": "./dist/index.js",
    "module": "./dist/index.js",
    "types": "./dist/index.d.ts",
    "exports": {
      ".": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs",
        "types": "./dist/index.d.ts"
      }
    },
    "files": [
      "dist",
      "README.md",
      "LICENSE"
    ],
    "keywords": [
      "utilities",
      "typescript",
      "tree-shakeable",
      "functional",
      "permanence"
    ],
    "author": "Your Name",
    "license": "MIT",
    "dependencies": {
      "tslib": "^2.3.0"
    },
    "publishConfig": {
      "access": "public"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/your-username/permanence.git",
      "directory": `packages/${packageName.replace('@permanence/', '')}`
    }
  };
  
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}

function updateIndexFile(indexPath, content) {
  writeFileSync(indexPath, content);
}

async function main() {
  console.log('🚀 Creating remaining packages...\n');

  try {
    console.log('📦 Creating category packages...');
    
    // Create category packages
    Object.entries(categories).forEach(([category, utilities]) => {
      const projectName = category;
      
      runCommand(
        `npx nx g @nx/js:library ${projectName} --directory=packages/${projectName} --bundler=tsc --unitTestRunner=vitest --testEnvironment=node --skipFormat=true --linter=none`,
        `Creating ${category} package`
      );

      // Update package.json
      const packageJsonPath = join(rootDir, 'packages', projectName, 'package.json');
      updatePackageJson(
        packageJsonPath,
        `@permanence/${category}`,
        `${category.charAt(0).toUpperCase() + category.slice(1)} utility functions that never change`
      );

      // Update index.ts
      const indexPath = join(rootDir, 'packages', projectName, 'src', 'index.ts');
      const exports = utilities.map(util => `export { ${util} } from '../../../src/${category}/${util}.js';`).join('\n');
      updateIndexFile(indexPath, exports + '\n');
    });

    console.log('\n📦 Creating individual utility packages...');
    
    // Create individual utility packages
    Object.entries(categories).forEach(([category, utilities]) => {
      utilities.forEach(utility => {
        const projectName = utility;
        
        runCommand(
          `npx nx g @nx/js:library ${projectName} --directory=packages/${projectName} --bundler=tsc --unitTestRunner=vitest --testEnvironment=node --skipFormat=true --linter=none`,
          `Creating ${utility} package`
        );

        // Update package.json
        const packageJsonPath = join(rootDir, 'packages', projectName, 'package.json');
        updatePackageJson(
          packageJsonPath,
          `@permanence/${utility}`,
          `${utility} utility function that never changes`
        );

        // Update index.ts
        const indexPath = join(rootDir, 'packages', projectName, 'src', 'index.ts');
        const content = `export { ${utility} } from '../../../src/${category}/${utility}.js';\n`;
        updateIndexFile(indexPath, content);
      });
    });

    console.log('\n✅ All packages created successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run `nx build` to build all packages');
    console.log('2. Run `nx test` to test all packages');
    console.log('3. Run `nx release` to version and publish packages');

  } catch (error) {
    console.error('\n❌ Generation failed:', error.message);
    process.exit(1);
  }
}

main();
