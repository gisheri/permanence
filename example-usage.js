// Example usage demonstrating tree-shakeable imports
// This file shows how consumers would use the package

// Import only what you need - each import is tree-shakeable
import { capitalize } from '@permanence/core/string/capitalize';
import { kebabCase } from '@permanence/core/string/kebabCase';
import { omit } from '@permanence/core/object/omit';
import { pick } from '@permanence/core/object/pick';

// Or import from the main entry point
// import { capitalize, kebabCase, omit, pick } from '@permanence/core';

// Usage examples
console.log('String utilities:');
console.log('capitalize("hello world"):', capitalize('hello world'));
console.log('kebabCase("HelloWorldExample"):', kebabCase('HelloWorldExample'));

console.log('\nObject utilities:');
const data = { name: 'John', age: 30, email: 'john@example.com', password: 'secret' };
console.log('omit(data, ["password"]):', omit(data, ['password']));
console.log('pick(data, ["name", "age"]):', pick(data, ['name', 'age']));
