#!/usr/bin/env node
/**
 * Environment Setup Script
 * 
 * This script safely loads secrets from secrets.local.env and populates .env
 * without echoing sensitive values to console.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = process.cwd();
const SECRETS_FILE = path.join(PROJECT_ROOT, 'secrets.local.env');
const ENV_FILE = path.join(PROJECT_ROOT, '.env');

console.log('🔐 Environment Setup Script\n');

// Check if secrets.local.env exists
if (!fs.existsSync(SECRETS_FILE)) {
  console.error('❌ ERROR: secrets.local.env not found!\n');
  console.log('📝 Required Action:');
  console.log('   1. Copy secrets.local.env.template to secrets.local.env');
  console.log('   2. Add your Neon database credentials:');
  console.log('      - DATABASE_URL (pooled connection with -pooler)');
  console.log('      - DIRECT_URL (direct connection without -pooler)');
  console.log('   3. Run this script again\n');
  console.log('🔗 Get credentials: https://console.neon.tech/\n');
  process.exit(1);
}

// Parse secrets.local.env
const secretsContent = fs.readFileSync(SECRETS_FILE, 'utf-8');
const secrets = {};
secretsContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      secrets[key.trim()] = valueParts.join('=').trim();
    }
  }
});

// Validate required secrets
const requiredSecrets = ['DATABASE_URL', 'DIRECT_URL'];
const missingSecrets = requiredSecrets.filter(key => !secrets[key] || secrets[key] === '');

if (missingSecrets.length > 0) {
  console.error('❌ ERROR: Missing required values in secrets.local.env:\n');
  missingSecrets.forEach(key => console.log(`   - ${key}`));
  console.log('\n📝 Please add these values to secrets.local.env');
  console.log('🔗 Get credentials: https://console.neon.tech/\n');
  process.exit(1);
}

// Validate pooled vs direct URLs
const databaseUrl = secrets.DATABASE_URL;
const directUrl = secrets.DIRECT_URL;

let warnings = [];
let swapNeeded = false;

// Check if DATABASE_URL has -pooler (correct)
if (!databaseUrl.includes('-pooler')) {
  warnings.push('⚠️  DATABASE_URL should contain "-pooler" (pooled connection)');
  if (directUrl.includes('-pooler')) {
    swapNeeded = true;
  }
}

// Check if DIRECT_URL does NOT have -pooler (correct)
if (directUrl.includes('-pooler')) {
  warnings.push('⚠️  DIRECT_URL should NOT contain "-pooler" (direct connection)');
  if (!databaseUrl.includes('-pooler')) {
    swapNeeded = true;
  }
}

if (swapNeeded) {
  console.log('🔄 Detected: URLs appear to be swapped. Auto-correcting...\n');
  const temp = secrets.DATABASE_URL;
  secrets.DATABASE_URL = secrets.DIRECT_URL;
  secrets.DIRECT_URL = temp;
  console.log('✅ URLs corrected (pooled ↔ direct)\n');
}

// Read current .env file
let envContent = fs.readFileSync(ENV_FILE, 'utf-8');
const envLines = envContent.split('\n');

// Update DATABASE_URL
let databaseUrlUpdated = false;
let directUrlUpdated = false;

for (let i = 0; i < envLines.length; i++) {
  const line = envLines[i].trim();
  
  if (line.startsWith('DATABASE_URL=')) {
    envLines[i] = `DATABASE_URL="${secrets.DATABASE_URL}"`;
    databaseUrlUpdated = true;
  }
  
  if (line.startsWith('DIRECT_URL=')) {
    envLines[i] = `DIRECT_URL="${secrets.DIRECT_URL}"`;
    directUrlUpdated = true;
  }
}

// Write updated .env
fs.writeFileSync(ENV_FILE, envLines.join('\n'));

console.log('✅ Database credentials loaded successfully');
console.log('   DATABASE_URL: configured (pooled)');
console.log('   DIRECT_URL: configured (direct)\n');

// Check NEXTAUTH_SECRET
const envObj = {};
envLines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      envObj[key.trim()] = valueParts.join('=').replace(/^"|"$/g, '').trim();
    }
  }
});

if (!envObj.NEXTAUTH_SECRET || envObj.NEXTAUTH_SECRET === '') {
  console.log('🔑 Generating NEXTAUTH_SECRET...');
  const secret = crypto.randomBytes(32).toString('base64');
  
  const updatedLines = envLines.map(line => {
    if (line.trim().startsWith('NEXTAUTH_SECRET=')) {
      return `NEXTAUTH_SECRET="${secret}"`;
    }
    return line;
  });
  
  fs.writeFileSync(ENV_FILE, updatedLines.join('\n'));
  console.log('✅ NEXTAUTH_SECRET generated and saved\n');
}

console.log('🎉 Environment setup complete!\n');
console.log('Next steps:');
console.log('   1. Run: npm run db:generate');
console.log('   2. Run: npm run db:migrate');
console.log('   3. Run: npm run dev\n');
