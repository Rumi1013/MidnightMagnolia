#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const blockedExtensions = new Set([
  '.csv',
  '.doc',
  '.docx',
  '.indd',
  '.key',
  '.numbers',
  '.pages',
  '.pdf',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsb',
  '.xlsm',
  '.xlsx',
  '.zip',
]);

const allowedPatterns = [
  /^data\/inventory-[^/]+\.csv$/,
];

const blockedPathPrefixes = [
  'admin/',
  'automations/',
  'CareerSystem/',
  'completeairtable/',
  'files/',
  'Midnight Magnolia Genealogy Archive/',
  'my-app/',
  'private/',
  'tools/midnight-magnolia-dashboard/',
];

function gitLines(args) {
  const output = execFileSync('git', args, { encoding: 'utf8' });
  return output.split('\n').map((line) => line.trim()).filter(Boolean);
}

function extensionOf(file) {
  const last = file.split('/').pop() || '';
  const index = last.lastIndexOf('.');
  return index === -1 ? '' : last.slice(index).toLowerCase();
}

function isAllowed(file) {
  return allowedPatterns.some((pattern) => pattern.test(file));
}

function isBlocked(file) {
  if (isAllowed(file)) return false;
  if (blockedPathPrefixes.some((prefix) => file.startsWith(prefix))) return true;
  return blockedExtensions.has(extensionOf(file));
}

const trackedBlocked = gitLines(['ls-files']).filter(isBlocked);
const stagedBlocked = gitLines([
  'diff',
  '--cached',
  '--name-only',
  '--diff-filter=ACMR',
]).filter(isBlocked);

const blocked = Array.from(new Set([...trackedBlocked, ...stagedBlocked])).sort();

if (blocked.length) {
  console.error('Private/admin files are tracked or staged and must not be committed:');
  blocked.forEach((file) => console.error(`- ${file}`));
  console.error('\nMove these files to local-only storage, untrack them with git rm --cached <path>, or unstage them with git restore --staged <path>.');
  process.exit(1);
}

console.log('No private/admin files are tracked or staged.');
