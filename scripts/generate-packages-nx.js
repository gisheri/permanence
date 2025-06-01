#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');

// Read the source structure to understand utilities
function readSourceStructure() {
  const categories = {};

  try {
    const categoryDirs = readdirSync(srcDir);
    categoryDirs.forEach(category => {
      const categoryPath = join(srcDir, category);
      if (statSync(categoryPath).isDirectory()) {
        categories[category] = [];
        const files = readdirSync(categoryPath);
        files.forEach(file => {
          if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
            const utilName = file.replace('.ts', '');
            categories[category].push(utilName);
          }
        });
      }
    });
  } catch (err) {
    console.error('Error reading source structure:', err.message);
  }

  return categories;
}

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
    throw error;
  }
}

function createPackageJson(packageName, description, dependencies = {}) {
  return {
    name: packageName,
    version: "0.1.0",
    description,
    type: "module",
    main: "./dist/index.js",
    module: "./dist/index.js",
    types: "./dist/index.d.ts",
    exports: {
      ".": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs",
        "types": "./dist/index.d.ts"
      }
    },
    files: [
      "dist",
      "README.md",
      "LICENSE"
    ],
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
    },
    repository: {
      type: "git",
      url: "https://github.com/your-username/permanence.git",
      directory: `packages/${packageName.replace('@permanence/', '')}`
    }
  };
}

function generateProjectJson(projectName, sourceRoot, buildOptions = {}) {
  return {
    name: projectName,
    $schema: "../../node_modules/nx/schemas/project-schema.json",
    sourceRoot,
    projectType: "library",
    targets: {
      build: {
        executor: "@nx/js:tsc",
        outputs: ["{options.outputPath}"],
        options: {
          outputPath: `dist/packages/${projectName}`,
          tsConfig: `packages/${projectName}/tsconfig.lib.json`,
          packageJson: `packages/${projectName}/package.json`,
          main: `packages/${projectName}/src/index.ts`,
          assets: [
            `packages/${projectName}/README.md`,
            `packages/${projectName}/LICENSE`
          ],
          ...buildOptions
        }
      },
      lint: {
        executor: "@nx/eslint:lint",
        outputs: ["{options.outputFile}"],
        options: {
          lintFilePatterns: [`packages/${projectName}/**/*.{ts,tsx,js,jsx}`]
        }
      },
      test: {
        executor: "@nx/vite:test",
        outputs: ["{options.reportsDirectory}"],
        options: {
          passWithNoTests: true,
          reportsDirectory: `../../coverage/packages/${projectName}`
        }
      },
      "version": {
        "executor": "@nx/js:release-version",
        "options": {}
      },
      "nx-release-publish": {
        "executor": "@nx/js:release-publish",
        "options": {
          "packageRoot": `dist/packages/${projectName}`
        }
      }
    },
    tags: []
  };
}

function generateTsConfig(extends = "../../tsconfig.base.json") {
  return {
    extends,
    compilerOptions: {
      outDir: "../../dist/out-tsc",
      declaration: true,
      types: ["vitest"]
    },
    include: ["src/**/*.ts"],
    exclude: ["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]
  };
}

function createAllPackage() {
  const packageName = '@permanence/all';
  const projectName = 'all';
  
  runCommand(`npx nx g @nx/js:library ${projectName} --directory=packages/${projectName} --bundler=tsc --unitTestRunner=vitest --testEnvironment=node --skipFormat=true`, 
    'Creating main package');

  // Update package.json
  const packageJsonPath = join(rootDir, 'packages', projectName, 'package.json');
  const packageJson = createPackageJson(
    packageName,
    'A comprehensive suite of utility functions that never change'
  );
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Create index.ts that exports everything
  const indexPath = join(rootDir, 'packages', projectName, 'src', 'index.ts');
  const indexContent = `// Export all utilities from all categories
export * from '../../../src/index.js';
`;
  writeFileSync(indexPath, indexContent);

  // Update project.json
  const projectJsonPath = join(rootDir, 'packages', projectName, 'project.json');
  const projectJson = generateProjectJson(projectName, `packages/${projectName}/src`);
  writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2));
}

function createCategoryPackages(categories) {
  Object.entries(categories).forEach(([category, utilities]) => {
    if (utilities.length === 0) return;

    const packageName = `@permanence/${category}`;
    const projectName = category;
    
    runCommand(`npx nx g @nx/js:library ${projectName} --directory=packages/${projectName} --bundler=tsc --unitTestRunner=vitest --testEnvironment=node --skipFormat=true`, 
      `Creating ${category} package`);

    // Update package.json
    const packageJsonPath = join(rootDir, 'packages', projectName, 'package.json');
    const packageJson = createPackageJson(
      packageName,
      `${category.charAt(0).toUpperCase() + category.slice(1)} utility functions that never change`
    );
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Create index.ts that exports all utilities in the category
    const indexPath = join(rootDir, 'packages', projectName, 'src', 'index.ts');
    const exports = utilities.map(util => `export { ${util} } from '../../../src/${category}/${util}.js';`).join('\n');
    writeFileSync(indexPath, exports + '\n');

    // Update project.json
    const projectJsonPath = join(rootDir, 'packages', projectName, 'project.json');
    const projectJson = generateProjectJson(projectName, `packages/${projectName}/src`);
    writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2));
  });
}

function createIndividualPackages(categories) {
  Object.entries(categories).forEach(([category, utilities]) => {
    utilities.forEach(utility => {
      const packageName = `@permanence/${utility}`;
      const projectName = utility;
      
      runCommand(`npx nx g @nx/js:library ${projectName} --directory=packages/${projectName} --bundler=tsc --unitTestRunner=vitest --testEnvironment=node --skipFormat=true`, 
        `Creating ${utility} package`);

      // Update package.json
      const packageJsonPath = join(rootDir, 'packages', projectName, 'package.json');
      const packageJson = createPackageJson(
        packageName,
        `${utility} utility function that never changes`
      );
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // Create index.ts that exports just this utility
      const indexPath = join(rootDir, 'packages', projectName, 'src', 'index.ts');
      const content = `export { ${utility} } from '../../../src/${category}/${utility}.js';\n`;
      writeFileSync(indexPath, content);

      // Update project.json
      const projectJsonPath = join(rootDir, 'packages', projectName, 'project.json');
      const projectJson = generateProjectJson(projectName, `packages/${projectName}/src`);
      writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2));
    });
  });
}

async function main() {
  console.log('🚀 Generating monorepo packages with NX...\n');

  try {
    // Read source structure
    const categories = readSourceStructure();
    console.log('📁 Found categories:', Object.keys(categories));
    console.log('📦 Total utilities:', Object.values(categories).flat().length);

    // Create packages directory if it doesn't exist
    const packagesDir = join(rootDir, 'packages');
    if (!existsSync(packagesDir)) {
      mkdirSync(packagesDir, { recursive: true });
    }

    // Generate packages
    console.log('\n📦 Creating packages...');
    
    // 1. Create the main @permanence/all package
    createAllPackage();

    // 2. Create category packages (@permanence/array, @permanence/object, etc.)
    createCategoryPackages(categories);

    // 3. Create individual utility packages (@permanence/capitalize, etc.)
    createIndividualPackages(categories);

    console.log('\n✅ All packages generated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run `nx build` to build all packages');
    console.log('2. Run `nx test` to test all packages');
    console.log('3. Run `nx release` to publish packages');

  } catch (error) {
    console.error('\n❌ Generation failed:', error.message);
    process.exit(1);
  }
}

main();
