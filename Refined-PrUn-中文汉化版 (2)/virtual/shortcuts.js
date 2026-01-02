import xit from './xit-registry.js';
import _sfc_main from './WEB.vue.js';
import { castArray } from './cast-array.js';
import { isEmpty } from './is-empty.js';
const shortcuts = /* @__PURE__ */ new Map();
function shortcut(commands, name, description, url, mandatoryParameters, optionalParameters) {
  xit.add({
    command: commands,
    name,
    description,
    optionalParameters,
    mandatoryParameters,
    component: () => _sfc_main,
  });
  for (const command of castArray(commands)) {
    shortcuts.set(command.toUpperCase(), url);
  }
}
shortcut(
  'PRUN',
  'PRUN-CEPTION',
  'Opens PrUn... in PrUn!',
  () => 'https://apex.prosperousuniverse.com/',
);
shortcut('PROSPERITY', 'PROSPERITY', 'Prosperity map.', parameters => {
  let url = 'https://prosperity-prun.netlify.app/';
  if (parameters.length == 2) {
    url += `?from=${parameters[0]}&to=${parameters[1]}`;
  }
  return url;
});
shortcut(
  ['SHEET', 'SHEETS'],
  'GOOGLE SHEETS',
  'Opens Google Sheets.',
  parameters => {
    if (isEmpty(parameters)) {
      return void 0;
    }
    let documentId = parameters.join('_');
    let gid;
    if (documentId.length > 45) {
      const lastUnderscoreIndex = documentId.lastIndexOf('_');
      if (lastUnderscoreIndex !== -1) {
        const possibleGid = documentId.substring(lastUnderscoreIndex + 1);
        const trimmedDocumentId = documentId.substring(0, lastUnderscoreIndex);
        if (/^\d{5,12}/.test(possibleGid) && trimmedDocumentId.length > 25) {
          documentId = trimmedDocumentId;
          gid = possibleGid;
        }
      }
    }
    let url = `https://docs.google.com/spreadsheets/d/${documentId}/edit?usp=sharing&rm=minimal`;
    if (gid) {
      url += `&gid=${gid}`;
    }
    return url;
  },
  'Document ID',
  'Sheet ID',
);
shortcut(['PLANNER', 'PLAN', 'PRUN PLANNER'], 'PRUN PLANNER', 'PrUn Planner.', parameters => {
  return 'https://prunplanner.org/' + parameters.join('/');
});
shortcut('MAP', "Taiyi's Map", "Taiyi's map.", () => 'https://universemap.duckdns.org/');
shortcut(
  'YAPT',
  'Yet another PrUn tool',
  'Opens the Yet Another PrUn Tool website.',
  () => 'https://aeryen23.github.io/yapt/',
);
shortcut(
  ['PRUNSTATS', 'PRUNSTAT'],
  'PrUn Financial Report',
  'Opens the PrUn Financial Report website.',
  parameters => {
    let url =
      'https://pmmg-products.github.io/reports/?' +
      parameters.map(param => param.replace('-', '=')).join('&');
    if (parameters.length > 0) {
      url += '&';
    }
    url += 'cb=' + Date.now();
    return url;
  },
);
export { shortcuts };
