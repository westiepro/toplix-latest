#!/usr/bin/env node

/**
 * Helper script to generate secure random keys for Strapi environment variables
 * Run this with: node generate-keys.js
 */

const crypto = require('crypto');

function generateKey() {
  return crypto.randomBytes(32).toString('base64');
}

console.log('\n=== Strapi Environment Variable Keys ===\n');
console.log('Copy these values to your strapi/.env file:\n');

console.log('APP_KEYS=' + [
  generateKey(),
  generateKey(),
  generateKey(),
  generateKey()
].join(','));

console.log('\nAPI_TOKEN_SALT=' + generateKey());
console.log('ADMIN_JWT_SECRET=' + generateKey());
console.log('TRANSFER_TOKEN_SALT=' + generateKey());
console.log('JWT_SECRET=' + generateKey());

console.log('\n=== Instructions ===');
console.log('1. Copy each value above to your strapi/.env file');
console.log('2. Replace the "toBeModified" values');
console.log('3. Keep these keys secure and never commit them to Git!\n');

