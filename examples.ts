/**
 * Example usage of @permanence/core utility functions
 * This file demonstrates the recommended import patterns and usage
 */

// Individual function imports (recommended for tree-shaking)
import { capitalize } from '@permanence/core/string/capitalize';
import { kebabCase } from '@permanence/core/string/kebabCase';
import { omit } from '@permanence/core/object/omit';
import { pick } from '@permanence/core/object/pick';

// Example data
const rawTitle = 'hello WORLD example';
const userProfile = {
  id: 123,
  username: 'johndoe',
  email: 'john@example.com',
  password: 'secretPassword123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'admin',
  lastLogin: '2025-05-31',
  createdAt: '2025-01-15'
};

// String transformations
console.log('=== String Utilities ===');
const title = capitalize(rawTitle);
console.log(`Title: "${rawTitle}" → "${title}"`);

const slug = kebabCase('User Profile Settings');
console.log(`Slug: "User Profile Settings" → "${slug}"`);

// Object utilities
console.log('\n=== Object Utilities ===');

// Remove sensitive data
const publicProfile = omit(userProfile, ['password', 'lastLogin']);
console.log('Public profile (omit password, lastLogin):', publicProfile);

// Extract only display data
const displayName = pick(userProfile, ['firstName', 'lastName', 'username']);
console.log('Display data (pick name fields):', displayName);

// API response formatting
const apiResponse = pick(userProfile, ['id', 'username', 'email', 'role']);
console.log('API response (pick safe fields):', apiResponse);

export {
  // Re-export for module consumers
  capitalize,
  kebabCase,
  omit,
  pick
};
