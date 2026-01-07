import { defineConfig, PluginOption } from 'vite';
import monkey from 'vite-plugin-monkey';
import { resolve } from 'path';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unimport from 'unimport/unplugin';
import { createHash } from 'crypto';

const isDev = process.env.NODE_ENV === 'development';

const srcDir = resolve(__dirname, 'src');

const noise = new Set([
  'index',
  'dist',
  'src',
  'source',
  'distribution',
  'node_modules',
  '.pnpm',
  'main',
  'esm',
  'cjs',
  'build',
  'built',
]);

const outDir = resolve(__dirname, 'dist');

const isTM = process.env.TARGET_PLATFORM === 'tm';

const plugins: PluginOption[] = [
  vue(),
  vueJsx(),
  unimport.vite({
    presets: [
      'vue',
      {
        from: '@src/utils/select-dom',
        imports: ['$', '$$', '_$', '_$$'],
      },
    ],
    imports: [
      { name: 'C', from: '@src/infrastructure/prun-ui/prun-css' },
      { name: 'subscribe', from: '@src/utils/subscribe-async-generator' },
      { name: 'default', as: 'tiles', from: '@src/infrastructure/prun-ui/tiles' },
      { name: 'default', as: 'features', from: '@src/features/feature-registry' },
      { name: 'default', as: 'xit', from: '@src/features/XIT/xit-registry' },
      { name: 'default', as: 'config', from: '@src/infrastructure/shell/config' },
      { name: 'createFragmentApp', from: '@src/utils/vue-fragment-app' },
      { name: 'applyCssRule', from: '@src/infrastructure/prun-ui/refined-prun-css' },
      { name: 't', from: '@src/infrastructure/i18n' },
    ],
    //dts: 'src/types/unimport.d.ts',
    addons: {
      vueTemplate: true,
    },
  }),
  !isTM && libAssetsPlugin({
    outputPath: 'assets',
    name: '[name].[contenthash:8].[ext]',
  }),
].filter(Boolean) as PluginOption[];

if (isTM) {
  plugins.push(
    monkey({
      entry: resolve(srcDir, 'main.tm.ts'),
      userscript: {
        name: '(zh-cn)refined-prun',
        namespace: 'refined-prun-cn',
        match: ['https://apex.prosperousuniverse.com/*'],
        version: '1.1.0',
        author: 'SupCH',
        description: 'Prosperous Universe 界面汉化与增强插件 (油猴脚本版)',
        grant: ['GM_getValue', 'GM_setValue', 'GM_addStyle'],
      },
    })
  );
}

export default defineConfig({
  resolve: {
    alias: {
      '@src': srcDir,
      '~': resolve(srcDir, 'assets'),
    },
  },
  plugins,
  publicDir: isTM ? false : resolve(__dirname, 'public'),
  build: {
    outDir: process.env.TARGET_PLATFORM
      ? resolve(__dirname, 'dist', process.env.TARGET_PLATFORM)
      : outDir,
    emptyOutDir: !isDev,
    sourcemap: isDev || process.env.TARGET_PLATFORM === 'local' ? 'inline' : false,
    minify: process.env.TARGET_PLATFORM === 'local' || isTM ? false : 'esbuild',
    reportCompressedSize: false,
    ...(isTM
      ? {}
      : {
        lib: {
          entry: {
            'refined-prun-prepare': resolve(srcDir, 'refined-prun-prepare.ts'),
            'refined-prun-startup': resolve(srcDir, 'refined-prun-startup.ts'),
            'refined-prun': resolve(srcDir, 'refined-prun.ts'),
          },
          formats: ['es'],
        },
        rollupOptions: {
          external: ['chrome'],
          output: {
            preserveModules: true,
            preserveModulesRoot: 'source',
            sanitizeFileName: name =>
              name.replace('_virtual', 'virtual').replace('\x00', '').replace(':', '_'),
            entryFileNames(chunkInfo) {
              if (chunkInfo.name.includes('node_modules')) {
                const cleanName = chunkInfo.name
                  .split('/')
                  .filter(part => !noise.has(part))
                  .join('-');
                return `npm/${cleanName}.js`;
              }

              return chunkInfo.name + '.js';
            },
          },
        },
      }),
  },
  css: {
    modules: {
      generateScopedName: sanitizeModuleClassname,
    },
  },
  define: {
    // This define is needed for vue npm packages
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
});

function sanitizeModuleClassname(name: string, filename: string | undefined): string {
  if (typeof filename !== 'string') {
    throw new Error('The filename must be string and cannot be undefined.');
  }

  const parts = filename.split('?')[0].split('/');
  const lastSegment = parts.pop();

  if (!lastSegment) {
    throw new Error('Filename must include a valid file name.');
  }

  const baseFilename = lastSegment.replace(/(\.vue|\.module)?(\.\w+)$/, '');

  const classname = `${baseFilename}__${name}`;
  const hash = getHash(`${classname}`);

  return `rp-${classname}___${hash}`;
}

function getHash(input: string): string {
  return createHash('sha256').update(input).digest('hex').slice(0, 7);
}
