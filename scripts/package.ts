import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const platforms = ['chrome', 'edge', 'firefox'] as const;
type Platform = (typeof platforms)[number];

const distRoot = path.resolve(__dirname, '../dist');
const outputRoot = path.resolve(__dirname, '..');

async function packagePlatform(platform: Platform): Promise<void> {
  console.log(`📦 Packaging ${platform}...`);

  const sourceDir = path.join(distRoot, platform);
  const outputFile = path.join(outputRoot, `(${capitalize(platform)})(zh-cn)refined-prun.zip`);

  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠️  Skipping ${platform}: dist/${platform}/ not found`);
    return;
  }

  // Attempt to delete existing output file first to check for locks
  if (fs.existsSync(outputFile)) {
    try {
      fs.unlinkSync(outputFile);
    } catch (err: any) {
      if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'UNKNOWN') {
        throw new Error(
          `无法覆盖文件 ${path.basename(outputFile)}。请检查该 zip 文件是否已被其他程序（如压缩软件或浏览器）打开锁定。`,
        );
      }
      throw err;
    }
  }

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Maximum compression
    });

    output.on('close', () => {
      const sizeKB = (archive.pointer() / 1024).toFixed(2);
      console.log(`✓ ${platform}: ${outputFile} (${sizeKB} KB)`);
      resolve();
    });

    archive.on('error', err => {
      reject(err);
    });

    output.on('error', err => {
      reject(
        new Error(
          `写入文件出错 (${path.basename(outputFile)}): ${err.message}. 这通常是因为文件被占用。`,
        ),
      );
    });

    archive.pipe(output);

    // Add all files from the dist directory
    archive.directory(sourceDir, false);

    archive.finalize();
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function packageAll(): Promise<void> {
  console.log('\n📦 Packaging all platforms...\n');

  const startTime = Date.now();

  for (const platform of platforms) {
    await packagePlatform(platform);
  }

  // Note: Tampermonkey (.user.js) and local builds are not packaged as zip
  console.log('\nℹ️  Note: Tampermonkey (.user.js) and local builds are not packaged');

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ Packaging completed in ${duration}s`);
}

packageAll().catch(error => {
  console.error('\n❌ Packaging failed:', error);
  process.exit(1);
});
