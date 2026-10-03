#!/usr/bin/env node
/**
 * Export cropped public preview JPGs from Drive sources.
 * Does not copy PDFs/.indd into git. Does not export obituaries.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const DRIVE =
  '/Users/latishaimara/Library/CloudStorage/GoogleDrive-latisha.ford1@gmail.com/My Drive';
const SCSTATE = path.join(DRIVE, 'SCSTATE');
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ASSETS = '/Users/latishaimara/Development/Projects/Active/MidnightMagnolia-Assets/print-samples';
const PUBLIC = path.join(REPO, 'public/brand/print-samples');
const MAX_W = 1400;

const JOBS = [
  {
    out: 'scstate-winter-2015-cover.jpg',
    sources: [
      path.join(SCSTATE, 'winter-cover-2015-0126_all.jpg'),
      path.join(SCSTATE, 'Winter_cover_15final_all2.pdf'),
    ],
  },
  {
    out: 'scstate-fall-2014-cover.jpg',
    sources: [path.join(SCSTATE, 'Cover_2014_all-2.pdf')],
  },
  {
    out: 'scstate-spring-summer-2015-cover.jpg',
    sources: [path.join(SCSTATE, 'COVER_Summer2015_33015-5.pdf')],
  },
  {
    out: 'scstate-fall-2014-interior.jpg',
    sources: [path.join(SCSTATE, 'Inside Pages_Fall_1013_14.pdf')],
  },
];

function which(bin) {
  const r = spawnSync('which', [bin], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : '';
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8' });
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} failed: ${r.stderr || r.stdout}`);
  }
  return r;
}

function firstExisting(paths) {
  return paths.find((p) => fs.existsSync(p));
}

function rasterizePdf(src, destPng) {
  const pdftoppm = which('pdftoppm');
  if (pdftoppm) {
    const prefix = destPng.replace(/\.png$/i, '');
    run(pdftoppm, ['-png', '-r', '110', '-f', '1', '-l', '1', '-singlefile', src, prefix]);
    return `${prefix}.png`;
  }
  const magick = which('magick') || which('convert');
  if (magick) {
    run(magick, ['-density', '110', `${src}[0]`, destPng]);
    return destPng;
  }
  const ql = which('qlmanage');
  if (ql) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mm-ql-'));
    run(ql, ['-t', '-s', String(MAX_W), '-o', tmp, src]);
    const made = fs.readdirSync(tmp).find((f) => /\.(png|jpg|jpeg)$/i.test(f));
    if (!made) throw new Error(`qlmanage produced no thumbnail for ${src}`);
    fs.copyFileSync(path.join(tmp, made), destPng);
    fs.rmSync(tmp, { recursive: true, force: true });
    return destPng;
  }
  throw new Error('No PDF rasterizer (pdftoppm, magick/convert, or qlmanage)');
}

function toJpeg(src, dest) {
  const sips = which('sips');
  if (sips) {
    run(sips, ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', String(MAX_W), src, '--out', dest]);
    return;
  }
  const magick = which('magick') || which('convert');
  if (magick) {
    run(magick, [src, '-resize', `${MAX_W}x${MAX_W}>`, '-quality', '82', dest]);
    return;
  }
  throw new Error('No JPEG encoder (sips or magick)');
}

fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(PUBLIC, { recursive: true });

const report = [];
for (const job of JOBS) {
  const src = firstExisting(job.sources);
  if (!src) {
    report.push(`MISSING ${job.out} — none of: ${job.sources.join(' | ')}`);
    continue;
  }
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mm-print-'));
  const raster = path.extname(src).toLowerCase() === '.pdf'
    ? rasterizePdf(src, path.join(tmpDir, 'page.png'))
    : src;
  const destA = path.join(ASSETS, job.out);
  const destB = path.join(PUBLIC, job.out);
  toJpeg(raster, destA);
  fs.copyFileSync(destA, destB);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  const size = fs.statSync(destB).size;
  report.push(`OK ${job.out} ← ${path.basename(src)} (${size} bytes)`);
}

console.log(report.join('\n'));
