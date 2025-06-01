// Simple script to copy utility files to individual packages

const { execSync } = require('child_process');
const fs = require('fs');

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
      
      console.log(`✅ Fixed package for ${utility}`);
      
    } catch (error) {
      console.error(`❌ Failed to fix package for ${utility}:`, error.message);
    }
  }
}

console.log('✅ All individual utility packages fixed!');
