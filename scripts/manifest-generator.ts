import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Platform = 'chrome' | 'firefox' | 'edge' | 'local';

interface ManifestBase {
  name: string;
  version: string;
  short_name?: string;
  author?: string;
  homepage_url?: string;
  description: string;
  manifest_version: number;
  minimum_chrome_version?: string;
  browser_specific_settings?: {
    gecko?: {
      id: string;
      strict_min_version: string;
      data_collection_permissions?: {
        required: string[];
      };
    };
  };
  permissions: string[];
  host_permissions: string[];
  action?: {
    default_icon?: {
      '16': string;
      '32': string;
    };
  };
  content_scripts: Array<{
    matches: string[];
    js: string[];
    run_at: string;
  }>;
  web_accessible_resources: Array<{
    resources: string[];
    matches: string[];
  }>;
  icons: {
    '16': string;
    '32': string;
    '48': string;
    '128': string;
  };
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
      // Chrome doesn't support browser_specific_settings
      delete manifest.browser_specific_settings;
      break;

    case 'firefox':
      // Firefox requires browser_specific_settings
      // Keep browser_specific_settings from base
      delete manifest.minimum_chrome_version;
      delete manifest.action; // Firefox uses browser_action in V2 or doesn't need it in V3
      break;

    case 'edge':
      // Edge is similar to Chrome but may have specific requirements
      delete manifest.browser_specific_settings;
      break;

    case 'local':
      // Local dev build - keep everything for maximum compatibility
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

// CLI entry point
const platform = process.argv[2] as Platform;

if (!platform || !['chrome', 'firefox', 'edge', 'local'].includes(platform)) {
  console.error('❌ Platform argument required!');
  console.error('Usage: tsx manifest-generator.ts <chrome|firefox|edge|local>');
  process.exit(1);
}

const distRoot = path.resolve(__dirname, '../dist');
const outDir = path.join(distRoot, platform);

writeManifest(platform, outDir)
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Failed to generate manifest:', error);
    process.exit(1);
  });
