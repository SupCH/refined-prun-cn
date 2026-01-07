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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1dFQi9zaG9ydGN1dHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdFQiBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9XRUIvV0VCLnZ1ZSc7XG5pbXBvcnQgeyBjYXN0QXJyYXkgfSBmcm9tICdAc3JjL3V0aWxzL2Nhc3QtYXJyYXknO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5cbmV4cG9ydCBjb25zdCBzaG9ydGN1dHMgPSBuZXcgTWFwPHN0cmluZywgKHBhcmFtZXRlcnM6IHN0cmluZ1tdKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQ+KCk7XG5cbmZ1bmN0aW9uIHNob3J0Y3V0KFxuICBjb21tYW5kczogc3RyaW5nIHwgc3RyaW5nW10sXG4gIG5hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgdXJsOiAocGFyYW1ldGVyczogc3RyaW5nW10pID0+IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgbWFuZGF0b3J5UGFyYW1ldGVycz86IHN0cmluZyxcbiAgb3B0aW9uYWxQYXJhbWV0ZXJzPzogc3RyaW5nLFxuKSB7XG4gIHhpdC5hZGQoe1xuICAgIGNvbW1hbmQ6IGNvbW1hbmRzLFxuICAgIG5hbWUsXG4gICAgZGVzY3JpcHRpb24sXG4gICAgb3B0aW9uYWxQYXJhbWV0ZXJzLFxuICAgIG1hbmRhdG9yeVBhcmFtZXRlcnMsXG4gICAgY29tcG9uZW50OiAoKSA9PiBXRUIsXG4gIH0pO1xuICBmb3IgKGNvbnN0IGNvbW1hbmQgb2YgY2FzdEFycmF5KGNvbW1hbmRzKSkge1xuICAgIHNob3J0Y3V0cy5zZXQoY29tbWFuZC50b1VwcGVyQ2FzZSgpLCB1cmwpO1xuICB9XG59XG5cbnNob3J0Y3V0KFxuICAnUFJVTicsXG4gICdQUlVOLUNFUFRJT04nLFxuICAnT3BlbnMgUHJVbi4uLiBpbiBQclVuIScsXG4gICgpID0+ICdodHRwczovL2FwZXgucHJvc3Blcm91c3VuaXZlcnNlLmNvbS8nLFxuKTtcblxuc2hvcnRjdXQoJ1BST1NQRVJJVFknLCAnUFJPU1BFUklUWScsICdQcm9zcGVyaXR5IG1hcC4nLCBwYXJhbWV0ZXJzID0+IHtcbiAgbGV0IHVybCA9ICdodHRwczovL3Byb3NwZXJpdHktcHJ1bi5uZXRsaWZ5LmFwcC8nO1xuICBpZiAocGFyYW1ldGVycy5sZW5ndGggPT0gMikge1xuICAgIHVybCArPSBgP2Zyb209JHtwYXJhbWV0ZXJzWzBdfSZ0bz0ke3BhcmFtZXRlcnNbMV19YDtcbiAgfVxuICByZXR1cm4gdXJsO1xufSk7XG5cbnNob3J0Y3V0KFxuICBbJ1NIRUVUJywgJ1NIRUVUUyddLFxuICAnR09PR0xFIFNIRUVUUycsXG4gICdPcGVucyBHb29nbGUgU2hlZXRzLicsXG4gIHBhcmFtZXRlcnMgPT4ge1xuICAgIGlmIChpc0VtcHR5KHBhcmFtZXRlcnMpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZXQgZG9jdW1lbnRJZCA9IHBhcmFtZXRlcnMuam9pbignXycpO1xuICAgIGxldCBnaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAoZG9jdW1lbnRJZC5sZW5ndGggPiA0NSkge1xuICAgICAgY29uc3QgbGFzdFVuZGVyc2NvcmVJbmRleCA9IGRvY3VtZW50SWQubGFzdEluZGV4T2YoJ18nKTtcblxuICAgICAgaWYgKGxhc3RVbmRlcnNjb3JlSW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlR2lkID0gZG9jdW1lbnRJZC5zdWJzdHJpbmcobGFzdFVuZGVyc2NvcmVJbmRleCArIDEpO1xuICAgICAgICBjb25zdCB0cmltbWVkRG9jdW1lbnRJZCA9IGRvY3VtZW50SWQuc3Vic3RyaW5nKDAsIGxhc3RVbmRlcnNjb3JlSW5kZXgpO1xuXG4gICAgICAgIGlmICgvXlxcZHs1LDEyfS8udGVzdChwb3NzaWJsZUdpZCkgJiYgdHJpbW1lZERvY3VtZW50SWQubGVuZ3RoID4gMjUpIHtcbiAgICAgICAgICBkb2N1bWVudElkID0gdHJpbW1lZERvY3VtZW50SWQ7XG4gICAgICAgICAgZ2lkID0gcG9zc2libGVHaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHVybCA9IGBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8ke2RvY3VtZW50SWR9L2VkaXQ/dXNwPXNoYXJpbmcmcm09bWluaW1hbGA7XG4gICAgaWYgKGdpZCkge1xuICAgICAgdXJsICs9IGAmZ2lkPSR7Z2lkfWA7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH0sXG4gICdEb2N1bWVudCBJRCcsXG4gICdTaGVldCBJRCcsXG4pO1xuXG5zaG9ydGN1dChbJ1BMQU5ORVInLCAnUExBTicsICdQUlVOIFBMQU5ORVInXSwgJ1BSVU4gUExBTk5FUicsICdQclVuIFBsYW5uZXIuJywgcGFyYW1ldGVycyA9PiB7XG4gIHJldHVybiAnaHR0cHM6Ly9wcnVucGxhbm5lci5vcmcvJyArIHBhcmFtZXRlcnMuam9pbignLycpO1xufSk7XG5cbnNob3J0Y3V0KCdNQVAnLCBcIlRhaXlpJ3MgTWFwXCIsIFwiVGFpeWkncyBtYXAuXCIsICgpID0+ICdodHRwczovL3VuaXZlcnNlbWFwLmR1Y2tkbnMub3JnLycpO1xuXG5zaG9ydGN1dChcbiAgJ1lBUFQnLFxuICAnWWV0IGFub3RoZXIgUHJVbiB0b29sJyxcbiAgJ09wZW5zIHRoZSBZZXQgQW5vdGhlciBQclVuIFRvb2wgd2Vic2l0ZS4nLFxuICAoKSA9PiAnaHR0cHM6Ly9hZXJ5ZW4yMy5naXRodWIuaW8veWFwdC8nLFxuKTtcblxuc2hvcnRjdXQoXG4gIFsnUFJVTlNUQVRTJywgJ1BSVU5TVEFUJ10sXG4gICdQclVuIEZpbmFuY2lhbCBSZXBvcnQnLFxuICAnT3BlbnMgdGhlIFByVW4gRmluYW5jaWFsIFJlcG9ydCB3ZWJzaXRlLicsXG4gIHBhcmFtZXRlcnMgPT4ge1xuICAgIGxldCB1cmwgPVxuICAgICAgJ2h0dHBzOi8vcG1tZy1wcm9kdWN0cy5naXRodWIuaW8vcmVwb3J0cy8/JyArXG4gICAgICBwYXJhbWV0ZXJzLm1hcChwYXJhbSA9PiBwYXJhbS5yZXBsYWNlKCctJywgJz0nKSkuam9pbignJicpO1xuICAgIGlmIChwYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHVybCArPSAnJic7XG4gICAgfVxuICAgIHVybCArPSAnY2I9JyArIERhdGUubm93KCk7XG4gICAgcmV0dXJuIHVybDtcbiAgfSxcbik7XG4iXSwibmFtZXMiOlsiV0VCIl0sIm1hcHBpbmdzIjoiOzs7O0FBSU8sTUFBQSxZQUFBLG9CQUFBLElBQUE7QUFFUCxTQUFBLFNBQUEsVUFBQSxNQUFBLGFBQUEsS0FBQSxxQkFBQSxvQkFBQTtBQVFFLE1BQUEsSUFBQTtBQUFBLElBQVEsU0FBQTtBQUFBLElBQ0c7QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQUEsTUFBQUE7QUFBQUEsRUFDaUIsQ0FBQTtBQUVuQixhQUFBLFdBQUEsVUFBQSxRQUFBLEdBQUE7QUFDRSxjQUFBLElBQUEsUUFBQSxZQUFBLEdBQUEsR0FBQTtBQUFBLEVBQXdDO0FBRTVDO0FBRUE7QUFBQSxFQUFBO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE1BQUE7QUFFRjtBQUVBLFNBQUEsY0FBQSxjQUFBLG1CQUFBLENBQUEsZUFBQTtBQUNFLE1BQUEsTUFBQTtBQUNBLE1BQUEsV0FBQSxVQUFBLEdBQUE7QUFDRSxXQUFBLFNBQUEsV0FBQSxDQUFBLENBQUEsT0FBQSxXQUFBLENBQUEsQ0FBQTtBQUFBLEVBQWlEO0FBRW5ELFNBQUE7QUFDRixDQUFBO0FBRUE7QUFBQSxFQUFBLENBQUEsU0FBQSxRQUFBO0FBQUEsRUFDb0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsQ0FBQSxlQUFBO0FBRUUsUUFBQSxRQUFBLFVBQUEsR0FBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBRVQsUUFBQSxhQUFBLFdBQUEsS0FBQSxHQUFBO0FBQ0EsUUFBQTtBQUNBLFFBQUEsV0FBQSxTQUFBLElBQUE7QUFDRSxZQUFBLHNCQUFBLFdBQUEsWUFBQSxHQUFBO0FBRUEsVUFBQSx3QkFBQSxJQUFBO0FBQ0UsY0FBQSxjQUFBLFdBQUEsVUFBQSxzQkFBQSxDQUFBO0FBQ0EsY0FBQSxvQkFBQSxXQUFBLFVBQUEsR0FBQSxtQkFBQTtBQUVBLFlBQUEsWUFBQSxLQUFBLFdBQUEsS0FBQSxrQkFBQSxTQUFBLElBQUE7QUFDRSx1QkFBQTtBQUNBLGdCQUFBO0FBQUEsUUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBRUYsUUFBQSxNQUFBLDBDQUFBLFVBQUE7QUFDQSxRQUFBLEtBQUE7QUFDRSxhQUFBLFFBQUEsR0FBQTtBQUFBLElBQWtCO0FBRXBCLFdBQUE7QUFBQSxFQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFFRjtBQUVBLFNBQUEsQ0FBQSxXQUFBLFFBQUEsY0FBQSxHQUFBLGdCQUFBLGlCQUFBLENBQUEsZUFBQTtBQUNFLFNBQUEsNkJBQUEsV0FBQSxLQUFBLEdBQUE7QUFDRixDQUFBO0FBRUEsU0FBQSxPQUFBLGVBQUEsZ0JBQUEsTUFBQSxrQ0FBQTtBQUVBO0FBQUEsRUFBQTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQSxNQUFBO0FBRUY7QUFFQTtBQUFBLEVBQUEsQ0FBQSxhQUFBLFVBQUE7QUFBQSxFQUMwQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxDQUFBLGVBQUE7QUFFRSxRQUFBLE1BQUEsOENBQUEsV0FBQSxJQUFBLENBQUEsVUFBQSxNQUFBLFFBQUEsS0FBQSxHQUFBLENBQUEsRUFBQSxLQUFBLEdBQUE7QUFHQSxRQUFBLFdBQUEsU0FBQSxHQUFBO0FBQ0UsYUFBQTtBQUFBLElBQU87QUFFVCxXQUFBLFFBQUEsS0FBQSxJQUFBO0FBQ0EsV0FBQTtBQUFBLEVBQU87QUFFWDsifQ==
