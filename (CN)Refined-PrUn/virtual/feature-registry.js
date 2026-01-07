import config from './config.js';
import getBrowserVersion from './browser-version.js';
import { userData } from './user-data.js';
const registry = [];
const log = {
  info: console.log,
  http: console.log,
  error: logError,
};
function logError(id, error) {
  const message = error instanceof Error ? error.message : String(error);
  const searchIssueUrl = new URL('https://github.com/refined-prun/refined-prun/issues');
  searchIssueUrl.searchParams.set('q', `is:issue is:open label:bug ${id}`);
  const newIssueUrl = new URL('https://github.com/refined-prun/refined-prun/issues/new');
  newIssueUrl.searchParams.set('template', 'bug_report.yml');
  newIssueUrl.searchParams.set('title', `\`${id}\`: ${message}`);
  newIssueUrl.searchParams.set('version', config.version.toString());
  newIssueUrl.searchParams.set('browser', getBrowserVersion());
  newIssueUrl.searchParams.set(
    'description',
    ['```', String(error instanceof Error ? error.stack : error).trim(), '```'].join('\n'),
  );
  console.group(`❌ Refined PrUn: ${id}`);
  console.log(`📕 ${config.version}`, error);
  console.log('🔍 Search issue', searchIssueUrl.href);
  console.log('🚨 Report issue', newIssueUrl.href);
  console.groupEnd();
}
function add(path, init2, description) {
  const parts = path.split('/');
  const id = parts.pop().split('.')[0];
  let mode = parts.pop();
  if (mode === id) {
    mode = parts.pop();
  }
  registry.push({
    id,
    description,
    init: init2,
    advanced: mode === 'advanced',
  });
}
function init() {
  const disabledFeatures = new Set(userData.settings.disabled);
  for (const feature of registry) {
    if (userData.settings.mode !== 'FULL' && feature.advanced) {
      continue;
    }
    if (disabledFeatures.has(feature.id)) {
      log.info('↩️', 'Skipping ' + feature.id);
      continue;
    }
    features.current = feature.id;
    try {
      feature.init();
      log.info('✅', feature.id);
    } catch (error) {
      log.error(feature.id, error);
    } finally {
      features.current = void 0;
    }
  }
}
const features = {
  add,
  init,
  current: void 0,
  registry,
};
export { features as default };
