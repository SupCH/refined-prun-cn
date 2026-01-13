import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const platforms = ['chrome', 'edge', 'firefox'] as const;
type Platform = (typeof platforms)[number];

const distRoot = path.resolve(__dirname, '../dist');

// Manifest generator logic (copied to avoid import issues)
interface ManifestBase {
  name: string;
  version: string;
  short_name?: string;
  author?: string;
  homepage_url?: string;
  description: string;
  manifest_version: number;
  minimum_chrome_version?: string;
  browser_specific_settings?: any;
  permissions: string[];
  host_permissions: string[];
  action?: any;
  content_scripts: any[];
  web_accessible_resources: any[];
  icons: any;
}

async function generateManifest(platform: Platform): Promise<string> {
  const baseManifestPath = path.resolve(__dirname, '../manifest.base.json');
  const packageJsonPath = path.resolve(__dirname, '../package.json');

  const baseManifest: ManifestBase = JSON.parse(await fs.readFile(baseManifestPath, 'utf-8'));
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  const manifest: Partial<ManifestBase> = {
    ...baseManifest,
    version: packageJson.version,
  };

  switch (platform) {
    case 'chrome':
      delete manifest.browser_specific_settings;
      break;
    case 'firefox':
      delete manifest.minimum_chrome_version;
      delete manifest.action;
      break;
    case 'edge':
      delete manifest.browser_specific_settings;
      break;
    case 'local':
      break;
  }

  return JSON.stringify(manifest, null, 2);
}

async function writeManifest(platform: Platform, outDir: string): Promise<void> {
  const manifestContent = await generateManifest(platform);
  const manifestPath = path.join(outDir, 'manifest.json');

  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, manifestContent);

  console.log(`✓ Generated manifest.json for ${platform} -> ${manifestPath}`);
}

async function buildPlatform(platform: Platform): Promise<void> {
  console.log(`\n🔨 Building for ${platform}...`);

  const outDir = path.join(distRoot, platform);

  try {
    const env = {
      ...process.env,
      TARGET_PLATFORM: platform,
    };

    execSync(`pnpm run compile`, {
      stdio: 'inherit',
      env,
    });

    execSync(`vite build --outDir ${outDir}`, {
      stdio: 'inherit',
      env,
      cwd: path.resolve(__dirname, '..'),
    });

    if (platform !== 'tm') {
      await writeManifest(platform, outDir);
    }

    console.log(`✅ Successfully built ${platform}\n`);
  } catch (error) {
    console.error(`❌ Failed to build ${platform}:`, error);
    throw error;
  }
}

async function buildAll(): Promise<void> {
  console.log('🚀 Starting multi-platform build...\n');

  const startTime = Date.now();

  for (const platform of platforms) {
    await buildPlatform(platform);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✨ All platforms built successfully in ${duration}s`);
  console.log(`\n📦 Build outputs:`);
  for (const platform of platforms) {
    console.log(`   - dist/${platform}/`);
  }
}

buildAll().catch(error => {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
});
