import { uploadJson } from './json-file.js';
import { userData } from './user-data.js';
import { createId } from './create-id.js';
import { getInvStore } from './store-id.js';
import { shallowReactive } from './reactivity.esm-bundler.js';
function parsePmmgUserData(pmmg) {
  if (!pmmg.loaded_before) {
    return void 0;
  }
  const currency = getCurrency(pmmg.backup_pricing_scheme ?? 'AI1 ASK');
  const red = Number(pmmg.burn_thresholds?.[0] ?? 3);
  const yellow = Number(pmmg.burn_thresholds?.[1] ?? 7);
  const resupply = yellow + Number(pmmg.burn_green_buffer ?? 0);
  const threshold = Number(pmmg.repair_threshold ?? 70);
  const offset = Number(pmmg.repair_offset ?? 0);
  return {
    currency,
    burn: {
      red,
      yellow,
      resupply,
    },
    repair: {
      threshold,
      offset,
    },
    sidebar: pmmg.sidebar,
    sorting: parseSortingModes(pmmg.sorting),
    disabled: (pmmg.disabled ?? []).flatMap(mapPmmgFeature).filter(x => x !== void 0),
  };
}
function getCurrency(pricingMethod) {
  if (pricingMethod.startsWith('IC')) {
    return 'ICA';
  }
  if (pricingMethod.startsWith('NC')) {
    return 'NCC';
  }
  if (pricingMethod.startsWith('CI')) {
    return 'CIS';
  }
  return 'AIC';
}
function parseSortingModes(pmmg) {
  if (!pmmg) {
    return void 0;
  }
  const sorting = {};
  for (const mode of pmmg) {
    const store = getInvStore(mode[1]);
    if (!store) {
      continue;
    }
    const storeSorting = (sorting[store.id] ??= { modes: [] });
    storeSorting.modes.push({
      label: mode[0],
      categories: mode[2].map(x => ({ name: x[0], materials: x[1] })),
      burn: mode[3],
      zero: mode[4],
    });
  }
  return sorting;
}
function importPmmgSettings() {
  uploadJson(json => {
    if (!json) {
      return;
    }
    const pmmg = parsePmmgUserData(json);
    if (pmmg) {
      userData.settings.currency.preset = pmmg.currency;
      userData.settings.burn.red = pmmg.burn.red;
      userData.settings.burn.yellow = pmmg.burn.yellow;
      userData.settings.burn.resupply = pmmg.burn.resupply;
      userData.settings.repair.threshold = pmmg.repair.threshold;
      userData.settings.repair.offset = pmmg.repair.offset;
      if (pmmg.sidebar) {
        userData.settings.sidebar = pmmg.sidebar;
      }
      if (pmmg.sorting) {
        userData.sorting = pmmg.sorting;
      }
      userData.settings.disabled = pmmg.disabled;
    }
  });
}
function importPmmgFinancialHistory() {
  uploadJson(json => {
    if (!json?.History) {
      return void 0;
    }
    userData.balanceHistory = {
      v1: shallowReactive(json.History.map(item => mapBalanceEntry(item).map(Math.round))),
      v2: shallowReactive([]),
    };
  });
}
function importPmmgNotes() {
  uploadJson(json => {
    if (!json) {
      return;
    }
    const pmmg = json['PMMG-Notes'];
    if (pmmg) {
      userData.notes = Object.keys(pmmg).map(x => ({
        id: createId(),
        name: x,
        text: pmmg[x],
      }));
    }
  });
}
function mapBalanceEntry(entry) {
  return [entry[0], entry[2] + entry[3], entry[1], entry[4]];
}
function importPmmgActions() {
  uploadJson(json => {
    if (!json) {
      return;
    }
    const pmmg = json['PMMG-Action'];
    if (pmmg) {
      userData.actionPackages = Object.values(pmmg);
    }
  });
}
function mapPmmgFeature(feature) {
  switch (feature) {
    case 'CXOBHighlighter':
      return ['highlight-own-exchange-orders'];
    case 'CXPOOrderBook':
      return ['cxpo-order-book'];
    case 'ChatDeleteButton':
      return void 0;
    case 'CommandCorrecter':
      return ['correct-commands'];
    case 'CompactUI':
      return [
        'bbl-collapsible-categories',
        'bbl-hide-book-value',
        'bs-hide-zero-workforce',
        'bs-merge-area-stats',
        'cxos-hide-exchange',
      ];
    case 'FleetETAs':
      return ['flt-arrival-eta'];
    case 'FlightETAs':
      return ['sfc-flight-eta'];
    case 'FormulaReplacer':
      return ['input-math'];
    case 'HeaderMinimizer':
      return ['minimize-headers'];
    case 'IconMarkers':
      return ['inv-item-markers'];
    case 'ImageCreator':
      return ['chat-images'];
    case 'InventoryOrganizer':
      return ['inv-custom-item-sorting'];
    case 'InventorySearch':
      return ['inv-search'];
    case 'Notifications':
      return [
        'nots-material-ticker',
        'nots-notification-type-label',
        'nots-ship-name',
        'nots-clean-notifications',
      ];
    case 'OrderETAs':
      return ['prod-order-eta'];
    case 'PendingContracts':
      return ['sidebar-contracts-details'];
    case 'PostLM':
      return ['shipping-per-unit-price'];
    case 'ProdBurnLink':
      return ['prod-burn-link'];
    case 'QueueLoad':
      return ['prodq-queue-load'];
    case 'ScreenUnpack':
      return ['screen-tab-bar'];
    case 'Sidebar':
      return ['custom-left-sidebar'];
    case 'TopRightButtons':
      return ['header-calculator-button', 'header-duplicate-button'];
    default:
      return void 0;
  }
}
function importPmmgCommandLists() {
  uploadJson(json => {
    if (!json) {
      return;
    }
    const pmmg = json['PMMG-Lists'];
    if (pmmg) {
      for (const key of Object.keys(pmmg)) {
        const list = {
          id: createId(),
          name: key,
          commands: pmmg[key].map(x => ({
            id: createId(),
            label: x[0],
            command: x[1],
          })),
        };
        userData.commandLists.push(list);
      }
    }
  });
}
export {
  importPmmgActions,
  importPmmgCommandLists,
  importPmmgFinancialHistory,
  importPmmgNotes,
  importPmmgSettings,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG1tZy1pbXBvcnQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9zdG9yYWdlL3BtbWctaW1wb3J0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVwbG9hZEpzb24gfSBmcm9tICdAc3JjL3V0aWxzL2pzb24tZmlsZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGNyZWF0ZUlkIH0gZnJvbSAnQHNyYy9zdG9yZS9jcmVhdGUtaWQnO1xuaW1wb3J0IHsgZ2V0SW52U3RvcmUgfSBmcm9tICdAc3JjL2NvcmUvc3RvcmUtaWQnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gcGFyc2VQbW1nVXNlckRhdGEocG1tZzogYW55KSB7XG4gIGlmICghcG1tZy5sb2FkZWRfYmVmb3JlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGN1cnJlbmN5ID0gZ2V0Q3VycmVuY3kocG1tZy5iYWNrdXBfcHJpY2luZ19zY2hlbWUgPz8gJ0FJMSBBU0snKTtcblxuICBjb25zdCByZWQgPSBOdW1iZXIocG1tZy5idXJuX3RocmVzaG9sZHM/LlswXSA/PyAzKTtcbiAgY29uc3QgeWVsbG93ID0gTnVtYmVyKHBtbWcuYnVybl90aHJlc2hvbGRzPy5bMV0gPz8gNyk7XG4gIGNvbnN0IHJlc3VwcGx5ID0geWVsbG93ICsgTnVtYmVyKHBtbWcuYnVybl9ncmVlbl9idWZmZXIgPz8gMCk7XG5cbiAgY29uc3QgdGhyZXNob2xkID0gTnVtYmVyKHBtbWcucmVwYWlyX3RocmVzaG9sZCA/PyA3MCk7XG4gIGNvbnN0IG9mZnNldCA9IE51bWJlcihwbW1nLnJlcGFpcl9vZmZzZXQgPz8gMCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjdXJyZW5jeSxcbiAgICBidXJuOiB7XG4gICAgICByZWQsXG4gICAgICB5ZWxsb3csXG4gICAgICByZXN1cHBseSxcbiAgICB9LFxuICAgIHJlcGFpcjoge1xuICAgICAgdGhyZXNob2xkLFxuICAgICAgb2Zmc2V0LFxuICAgIH0sXG4gICAgc2lkZWJhcjogcG1tZy5zaWRlYmFyLFxuICAgIHNvcnRpbmc6IHBhcnNlU29ydGluZ01vZGVzKHBtbWcuc29ydGluZyksXG4gICAgZGlzYWJsZWQ6IChwbW1nLmRpc2FibGVkID8/IFtdKS5mbGF0TWFwKG1hcFBtbWdGZWF0dXJlKS5maWx0ZXIoeCA9PiB4ICE9PSB1bmRlZmluZWQpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW5jeShwcmljaW5nTWV0aG9kOiBzdHJpbmcpOiBVc2VyRGF0YS5DdXJyZW5jeVByZXNldCB7XG4gIGlmIChwcmljaW5nTWV0aG9kLnN0YXJ0c1dpdGgoJ0lDJykpIHtcbiAgICByZXR1cm4gJ0lDQSc7XG4gIH1cbiAgaWYgKHByaWNpbmdNZXRob2Quc3RhcnRzV2l0aCgnTkMnKSkge1xuICAgIHJldHVybiAnTkNDJztcbiAgfVxuICBpZiAocHJpY2luZ01ldGhvZC5zdGFydHNXaXRoKCdDSScpKSB7XG4gICAgcmV0dXJuICdDSVMnO1xuICB9XG4gIHJldHVybiAnQUlDJztcbn1cblxuZnVuY3Rpb24gcGFyc2VTb3J0aW5nTW9kZXMocG1tZz86IFBtbWdTb3J0aW5nTW9kZVtdKSB7XG4gIGlmICghcG1tZykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBjb25zdCBzb3J0aW5nID0ge30gYXMgUmVjb3JkPHN0cmluZywgYW55PjtcbiAgZm9yIChjb25zdCBtb2RlIG9mIHBtbWcpIHtcbiAgICBjb25zdCBzdG9yZSA9IGdldEludlN0b3JlKG1vZGVbMV0pO1xuICAgIGlmICghc3RvcmUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBzdG9yZVNvcnRpbmcgPSAoc29ydGluZ1tzdG9yZS5pZF0gPz89IHsgbW9kZXM6IFtdIH0pO1xuICAgIHN0b3JlU29ydGluZy5tb2Rlcy5wdXNoKHtcbiAgICAgIGxhYmVsOiBtb2RlWzBdLFxuICAgICAgY2F0ZWdvcmllczogbW9kZVsyXS5tYXAoeCA9PiAoeyBuYW1lOiB4WzBdLCBtYXRlcmlhbHM6IHhbMV0gfSkpLFxuICAgICAgYnVybjogbW9kZVszXSxcbiAgICAgIHplcm86IG1vZGVbNF0sXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHNvcnRpbmc7XG59XG5cbnR5cGUgUG1tZ1NvcnRpbmdNb2RlID0gW1xuICBsYWJlbDogc3RyaW5nLFxuICBzdG9yZUlkOiBzdHJpbmcsXG4gIGNhdGVnb3JpZXM6IFtuYW1lOiBzdHJpbmcsIG1hdGVyaWFsczogc3RyaW5nW11dW10sXG4gIGJ1cm46IGJvb2xlYW4sXG4gIHplcm86IGJvb2xlYW4sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0UG1tZ1NldHRpbmdzKCkge1xuICB1cGxvYWRKc29uKGpzb24gPT4ge1xuICAgIGlmICghanNvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwbW1nID0gcGFyc2VQbW1nVXNlckRhdGEoanNvbik7XG4gICAgaWYgKHBtbWcpIHtcbiAgICAgIHVzZXJEYXRhLnNldHRpbmdzLmN1cnJlbmN5LnByZXNldCA9IHBtbWcuY3VycmVuY3k7XG4gICAgICB1c2VyRGF0YS5zZXR0aW5ncy5idXJuLnJlZCA9IHBtbWcuYnVybi5yZWQ7XG4gICAgICB1c2VyRGF0YS5zZXR0aW5ncy5idXJuLnllbGxvdyA9IHBtbWcuYnVybi55ZWxsb3c7XG4gICAgICB1c2VyRGF0YS5zZXR0aW5ncy5idXJuLnJlc3VwcGx5ID0gcG1tZy5idXJuLnJlc3VwcGx5O1xuICAgICAgdXNlckRhdGEuc2V0dGluZ3MucmVwYWlyLnRocmVzaG9sZCA9IHBtbWcucmVwYWlyLnRocmVzaG9sZDtcbiAgICAgIHVzZXJEYXRhLnNldHRpbmdzLnJlcGFpci5vZmZzZXQgPSBwbW1nLnJlcGFpci5vZmZzZXQ7XG4gICAgICBpZiAocG1tZy5zaWRlYmFyKSB7XG4gICAgICAgIHVzZXJEYXRhLnNldHRpbmdzLnNpZGViYXIgPSBwbW1nLnNpZGViYXI7XG4gICAgICB9XG4gICAgICBpZiAocG1tZy5zb3J0aW5nKSB7XG4gICAgICAgIHVzZXJEYXRhLnNvcnRpbmcgPSBwbW1nLnNvcnRpbmc7XG4gICAgICB9XG4gICAgICB1c2VyRGF0YS5zZXR0aW5ncy5kaXNhYmxlZCA9IHBtbWcuZGlzYWJsZWQ7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFBtbWdGaW5hbmNpYWxIaXN0b3J5KCkge1xuICB1cGxvYWRKc29uKGpzb24gPT4ge1xuICAgIGlmICghanNvbj8uSGlzdG9yeSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1c2VyRGF0YS5iYWxhbmNlSGlzdG9yeSA9IHtcbiAgICAgIHYxOiBzaGFsbG93UmVhY3RpdmUoanNvbi5IaXN0b3J5Lm1hcChpdGVtID0+IG1hcEJhbGFuY2VFbnRyeShpdGVtKS5tYXAoTWF0aC5yb3VuZCkpKSxcbiAgICAgIHYyOiBzaGFsbG93UmVhY3RpdmUoW10pLFxuICAgIH07XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0UG1tZ05vdGVzKCkge1xuICB1cGxvYWRKc29uKGpzb24gPT4ge1xuICAgIGlmICghanNvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwbW1nID0ganNvblsnUE1NRy1Ob3RlcyddO1xuICAgIGlmIChwbW1nKSB7XG4gICAgICB1c2VyRGF0YS5ub3RlcyA9IE9iamVjdC5rZXlzKHBtbWcpLm1hcCh4ID0+ICh7XG4gICAgICAgIGlkOiBjcmVhdGVJZCgpLFxuICAgICAgICBuYW1lOiB4LFxuICAgICAgICB0ZXh0OiBwbW1nW3hdLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hcEJhbGFuY2VFbnRyeShcbiAgZW50cnk6IFtcbiAgICB0aW1lc3RhbXA6IG51bWJlcixcbiAgICBub25DdXJyZW50OiBudW1iZXIsXG4gICAgY3VycmVudDogbnVtYmVyLFxuICAgIGxpcXVpZDogbnVtYmVyLFxuICAgIGxpYWJpbGl0aWVzOiBudW1iZXIsXG4gIF0sXG4pIHtcbiAgcmV0dXJuIFtlbnRyeVswXSwgZW50cnlbMl0gKyBlbnRyeVszXSwgZW50cnlbMV0sIGVudHJ5WzRdXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFBtbWdBY3Rpb25zKCkge1xuICB1cGxvYWRKc29uKGpzb24gPT4ge1xuICAgIGlmICghanNvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwbW1nID0ganNvblsnUE1NRy1BY3Rpb24nXSBhcyBSZWNvcmQ8c3RyaW5nLCBVc2VyRGF0YS5BY3Rpb25QYWNrYWdlRGF0YT4gfCB1bmRlZmluZWQ7XG4gICAgaWYgKHBtbWcpIHtcbiAgICAgIHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzID0gT2JqZWN0LnZhbHVlcyhwbW1nKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYXBQbW1nRmVhdHVyZShmZWF0dXJlOiBzdHJpbmcpIHtcbiAgc3dpdGNoIChmZWF0dXJlKSB7XG4gICAgY2FzZSAnQ1hPQkhpZ2hsaWdodGVyJzpcbiAgICAgIHJldHVybiBbJ2hpZ2hsaWdodC1vd24tZXhjaGFuZ2Utb3JkZXJzJ107XG4gICAgY2FzZSAnQ1hQT09yZGVyQm9vayc6XG4gICAgICByZXR1cm4gWydjeHBvLW9yZGVyLWJvb2snXTtcbiAgICBjYXNlICdDaGF0RGVsZXRlQnV0dG9uJzpcbiAgICAgIC8vIFJQclVuIGVxdWl2YWxlbnQgaXMgYWxpZ24tY2hhdC1kZWxldGUtYnV0dG9uIHdoaWNoIHdvcmtzIGJldHRlci5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY2FzZSAnQ29tbWFuZENvcnJlY3Rlcic6XG4gICAgICByZXR1cm4gWydjb3JyZWN0LWNvbW1hbmRzJ107XG4gICAgY2FzZSAnQ29tcGFjdFVJJzpcbiAgICAgIC8vIE1hcCBvbmx5IGZlYXR1cmVzIHRoYXQgY29uZm9ybSB0byAnQ29tcGFjdFVJJyBkZWZpbml0aW9uLlxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgJ2JibC1jb2xsYXBzaWJsZS1jYXRlZ29yaWVzJyxcbiAgICAgICAgJ2JibC1oaWRlLWJvb2stdmFsdWUnLFxuICAgICAgICAnYnMtaGlkZS16ZXJvLXdvcmtmb3JjZScsXG4gICAgICAgICdicy1tZXJnZS1hcmVhLXN0YXRzJyxcbiAgICAgICAgJ2N4b3MtaGlkZS1leGNoYW5nZScsXG4gICAgICBdO1xuICAgIGNhc2UgJ0ZsZWV0RVRBcyc6XG4gICAgICByZXR1cm4gWydmbHQtYXJyaXZhbC1ldGEnXTtcbiAgICBjYXNlICdGbGlnaHRFVEFzJzpcbiAgICAgIHJldHVybiBbJ3NmYy1mbGlnaHQtZXRhJ107XG4gICAgY2FzZSAnRm9ybXVsYVJlcGxhY2VyJzpcbiAgICAgIHJldHVybiBbJ2lucHV0LW1hdGgnXTtcbiAgICBjYXNlICdIZWFkZXJNaW5pbWl6ZXInOlxuICAgICAgcmV0dXJuIFsnbWluaW1pemUtaGVhZGVycyddO1xuICAgIGNhc2UgJ0ljb25NYXJrZXJzJzpcbiAgICAgIHJldHVybiBbJ2ludi1pdGVtLW1hcmtlcnMnXTtcbiAgICBjYXNlICdJbWFnZUNyZWF0b3InOlxuICAgICAgcmV0dXJuIFsnY2hhdC1pbWFnZXMnXTtcbiAgICBjYXNlICdJbnZlbnRvcnlPcmdhbml6ZXInOlxuICAgICAgcmV0dXJuIFsnaW52LWN1c3RvbS1pdGVtLXNvcnRpbmcnXTtcbiAgICBjYXNlICdJbnZlbnRvcnlTZWFyY2gnOlxuICAgICAgcmV0dXJuIFsnaW52LXNlYXJjaCddO1xuICAgIGNhc2UgJ05vdGlmaWNhdGlvbnMnOlxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgJ25vdHMtbWF0ZXJpYWwtdGlja2VyJyxcbiAgICAgICAgJ25vdHMtbm90aWZpY2F0aW9uLXR5cGUtbGFiZWwnLFxuICAgICAgICAnbm90cy1zaGlwLW5hbWUnLFxuICAgICAgICAnbm90cy1jbGVhbi1ub3RpZmljYXRpb25zJyxcbiAgICAgIF07XG4gICAgY2FzZSAnT3JkZXJFVEFzJzpcbiAgICAgIHJldHVybiBbJ3Byb2Qtb3JkZXItZXRhJ107XG4gICAgY2FzZSAnUGVuZGluZ0NvbnRyYWN0cyc6XG4gICAgICByZXR1cm4gWydzaWRlYmFyLWNvbnRyYWN0cy1kZXRhaWxzJ107XG4gICAgY2FzZSAnUG9zdExNJzpcbiAgICAgIHJldHVybiBbJ3NoaXBwaW5nLXBlci11bml0LXByaWNlJ107XG4gICAgY2FzZSAnUHJvZEJ1cm5MaW5rJzpcbiAgICAgIHJldHVybiBbJ3Byb2QtYnVybi1saW5rJ107XG4gICAgY2FzZSAnUXVldWVMb2FkJzpcbiAgICAgIHJldHVybiBbJ3Byb2RxLXF1ZXVlLWxvYWQnXTtcbiAgICBjYXNlICdTY3JlZW5VbnBhY2snOlxuICAgICAgcmV0dXJuIFsnc2NyZWVuLXRhYi1iYXInXTtcbiAgICBjYXNlICdTaWRlYmFyJzpcbiAgICAgIHJldHVybiBbJ2N1c3RvbS1sZWZ0LXNpZGViYXInXTtcbiAgICBjYXNlICdUb3BSaWdodEJ1dHRvbnMnOlxuICAgICAgcmV0dXJuIFsnaGVhZGVyLWNhbGN1bGF0b3ItYnV0dG9uJywgJ2hlYWRlci1kdXBsaWNhdGUtYnV0dG9uJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydFBtbWdDb21tYW5kTGlzdHMoKSB7XG4gIHVwbG9hZEpzb24oanNvbiA9PiB7XG4gICAgaWYgKCFqc29uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBtbWcgPSBqc29uWydQTU1HLUxpc3RzJ10gYXMgUmVjb3JkPHN0cmluZywgW3N0cmluZywgc3RyaW5nXVtdPiB8IHVuZGVmaW5lZDtcbiAgICBpZiAocG1tZykge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocG1tZykpIHtcbiAgICAgICAgY29uc3QgbGlzdDogVXNlckRhdGEuQ29tbWFuZExpc3QgPSB7XG4gICAgICAgICAgaWQ6IGNyZWF0ZUlkKCksXG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIGNvbW1hbmRzOiBwbW1nW2tleV0ubWFwKHggPT4gKHtcbiAgICAgICAgICAgIGlkOiBjcmVhdGVJZCgpLFxuICAgICAgICAgICAgbGFiZWw6IHhbMF0sXG4gICAgICAgICAgICBjb21tYW5kOiB4WzFdLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfTtcbiAgICAgICAgdXNlckRhdGEuY29tbWFuZExpc3RzLnB1c2gobGlzdCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU1BLFNBQUEsa0JBQUEsTUFBQTtBQUNFLE1BQUEsQ0FBQSxLQUFBLGVBQUE7QUFDRSxXQUFBO0FBQUEsRUFBTztBQUdULFFBQUEsV0FBQSxZQUFBLEtBQUEseUJBQUEsU0FBQTtBQUVBLFFBQUEsTUFBQSxPQUFBLEtBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUE7QUFDQSxRQUFBLFNBQUEsT0FBQSxLQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBO0FBQ0EsUUFBQSxXQUFBLFNBQUEsT0FBQSxLQUFBLHFCQUFBLENBQUE7QUFFQSxRQUFBLFlBQUEsT0FBQSxLQUFBLG9CQUFBLEVBQUE7QUFDQSxRQUFBLFNBQUEsT0FBQSxLQUFBLGlCQUFBLENBQUE7QUFFQSxTQUFBO0FBQUEsSUFBTztBQUFBLElBQ0wsTUFBQTtBQUFBLE1BQ007QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNGLFFBQUE7QUFBQSxNQUNRO0FBQUEsTUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNGLFNBQUEsS0FBQTtBQUFBLElBQ2MsU0FBQSxrQkFBQSxLQUFBLE9BQUE7QUFBQSxJQUN5QixXQUFBLEtBQUEsWUFBQSxJQUFBLFFBQUEsY0FBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLE1BQUEsTUFBQTtBQUFBLEVBQzRDO0FBRXZGO0FBRUEsU0FBQSxZQUFBLGVBQUE7QUFDRSxNQUFBLGNBQUEsV0FBQSxJQUFBLEdBQUE7QUFDRSxXQUFBO0FBQUEsRUFBTztBQUVULE1BQUEsY0FBQSxXQUFBLElBQUEsR0FBQTtBQUNFLFdBQUE7QUFBQSxFQUFPO0FBRVQsTUFBQSxjQUFBLFdBQUEsSUFBQSxHQUFBO0FBQ0UsV0FBQTtBQUFBLEVBQU87QUFFVCxTQUFBO0FBQ0Y7QUFFQSxTQUFBLGtCQUFBLE1BQUE7QUFDRSxNQUFBLENBQUEsTUFBQTtBQUNFLFdBQUE7QUFBQSxFQUFPO0FBSVQsUUFBQSxVQUFBLENBQUE7QUFDQSxhQUFBLFFBQUEsTUFBQTtBQUNFLFVBQUEsUUFBQSxZQUFBLEtBQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLE9BQUE7QUFDRTtBQUFBLElBQUE7QUFFRixVQUFBLGVBQUEsUUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsR0FBQTtBQUNBLGlCQUFBLE1BQUEsS0FBQTtBQUFBLE1BQXdCLE9BQUEsS0FBQSxDQUFBO0FBQUEsTUFDVCxZQUFBLEtBQUEsQ0FBQSxFQUFBLElBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxXQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7QUFBQSxNQUNpRCxNQUFBLEtBQUEsQ0FBQTtBQUFBLE1BQ2xELE1BQUEsS0FBQSxDQUFBO0FBQUEsSUFDQSxDQUFBO0FBQUEsRUFDYjtBQUVILFNBQUE7QUFDRjtBQVVPLFNBQUEscUJBQUE7QUFDTCxhQUFBLENBQUEsU0FBQTtBQUNFLFFBQUEsQ0FBQSxNQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsVUFBQSxPQUFBLGtCQUFBLElBQUE7QUFDQSxRQUFBLE1BQUE7QUFDRSxlQUFBLFNBQUEsU0FBQSxTQUFBLEtBQUE7QUFDQSxlQUFBLFNBQUEsS0FBQSxNQUFBLEtBQUEsS0FBQTtBQUNBLGVBQUEsU0FBQSxLQUFBLFNB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
