import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const outputFile = path.join(rootDir, 'refined-prun-source.zip');

async function packageSource(): Promise<void> {
  console.log('📦 Packaging source code for Firefox submission...');

  // Delete existing source zip if any
  if (fs.existsSync(outputFile)) {
    try {
      fs.unlinkSync(outputFile);
    } catch (err: any) {
      if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'UNKNOWN') {
        throw new Error(
          `无法覆盖文件 ${path.basename(outputFile)}。请检查该 zip 文件是否已被其他程序（如压缩软件或浏览器）打开锁定，请关闭后再试。`,
        );
      }
      throw err;
    }
  }

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      const sizeMB = (archive.pointer() / (1024 * 1024)).toFixed(2);
      console.log(`✓ Source package created: ${outputFile} (${sizeMB} MB)`);
      resolve();
    });

    archive.on('error', err => {
      reject(err);
    });

    archive.pipe(output);

    // Files and directories to include
    const includes = [
      'src',
      'scripts',
      'icons',
      'public',
      'manifest.base.json',
      'package.json',
      'pnpm-lock.yaml',
      'vite.config.ts',
      'tsconfig.json',
      'tsconfig.node.json',
      'tsconfig.app.json',
      '.gitignore',
      'README.md',
      'LICENSE',
    ];

    for (const item of includes) {
      const fullPath = path.join(rootDir, item);
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          archive.directory(fullPath, item);
        } else {
          archive.file(fullPath, { name: item });
        }
      }
    }

    archive.finalize();
  });
}

packageSource().catch(error => {
  console.error('\n❌ Source packaging failed:', error);
  process.exit(1);
});
