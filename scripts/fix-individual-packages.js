#!/usr/bin/env node

// Script to fix individual utility packages by copying the correct files

import { execSync } from 'child_process';
import fs from 'fs';

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

console.log('Fixing individual utility packages...');

for (const [category, utilityList] of Object.entries(utilities)) {
  for (const utility of utilityList) {
    try {
      console.log(`Fixing package for ${utility}...`);
      
      const destLibDir = `packages/${utility}/src/lib`;
      
      // Copy utility files
      const srcFile = `src/${category}/${utility}.ts`;
      const testFile = `src/${category}/${utility}.test.ts`;
      
      if (fs.existsSync(srcFile)) {
        execSync(`cp "${srcFile}" "${destLibDir}/"`);
        console.log(`  ✅ Copied ${srcFile}`);
      } else {
        console.log(`  ❌ Source file not found: ${srcFile}`);
      }
      
      if (fs.existsSync(testFile)) {
        execSync(`cp "${testFile}" "${destLibDir}/"`);
        console.log(`  ✅ Copied ${testFile}`);
      }
      
      // Remove generated stub files if they exist
      const stubFile = `${destLibDir}/${utility}.ts`;
      const stubTestFile = `${destLibDir}/${utility}.spec.ts`;
      
      if (fs.existsSync(stubFile)) {
        const content = fs.readFileSync(stubFile, 'utf8');
        // Check if it's a generated stub (contains the generic export function pattern)
        if (content.includes(`export function ${utility}(): string`) && content.includes(`return '${utility}';`)) {
          fs.unlinkSync(stubFile);
          console.log(`  ✅ Removed stub file: ${stubFile}`);
        }
      }
      
      if (fs.existsSync(stubTestFile)) {
        fs.unlinkSync(stubTestFile);
        console.log(`  ✅ Removed stub test file: ${stubTestFile}`);
      }
      
      console.log(`✅ Fixed package for ${utility}`);
      
    } catch (error) {
      console.error(`❌ Failed to fix package for ${utility}:`, error.message);
    }
  }
}

console.log('✅ All individual utility packages fixed!');
