import './config.js';
import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue5.js';
import _sfc_main from './Configure.vue3.js';
import { sitesStore, getBuildingLastRepair } from './sites.js';
import { isRepairableBuilding } from './buildings.js';
import { configurableValue } from './shared-types.js';
act.addMaterialGroup({
  type: 'Repair',
  description: data => {
    if (!data.planet) {
      return '--';
    }
    const days = data.days;
    const daysPart = days !== void 0 ? `older than ${days} day${days == 1 ? '' : 's'}` : '';
    const advanceDays = data.advanceDays ?? 0;
    return `Repair buildings on ${data.planet} ${daysPart} in ${advanceDays} day${advanceDays == 1 ? '' : 's'}`;
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => data.planet === configurableValue,
  isValidConfig: (data, config) => data.planet !== configurableValue || config.planet !== void 0,
  generateMaterialBill: async ({ data, config, log }) => {
    if (!data.planet) {
      log.error('Resupply planet is not configured');
      return void 0;
    }
    const planet = data.planet === configurableValue ? config.planet : data.planet;
    const site = sitesStore.getByPlanetNaturalIdOrName(planet);
    if (!site?.platforms) {
      log.error('Missing data on repair planet');
      return void 0;
    }
    const days = typeof data.days === 'number' ? data.days : parseFloat(data.days);
    let advanceDays =
      typeof data.advanceDays === 'number' ? data.advanceDays : parseFloat(data.advanceDays);
    const threshold = isNaN(days) ? 0 : days;
    advanceDays = isNaN(advanceDays) ? 0 : advanceDays;
    const parsedGroup = {};
    for (const building of site.platforms) {
      if (!isRepairableBuilding(building)) {
        continue;
      }
      const lastRepair = getBuildingLastRepair(building);
      const date = (/* @__PURE__ */ new Date().getTime() - lastRepair) / 864e5;
      if (date + advanceDays < threshold) {
        continue;
      }
      const buildingMaterials = {};
      for (const mat of building.reclaimableMaterials) {
        const amount = mat.amount;
        const ticker = mat.material.ticker;
        if (buildingMaterials[ticker]) {
          buildingMaterials[ticker] += amount;
        } else {
          buildingMaterials[ticker] = amount;
        }
      }
      for (const mat of building.repairMaterials) {
        const amount = mat.amount;
        const ticker = mat.material.ticker;
        if (buildingMaterials[ticker]) {
          buildingMaterials[ticker] += amount;
        } else {
          buildingMaterials[ticker] = amount;
        }
      }
      const adjustedDate = date + advanceDays;
      for (const ticker of Object.keys(buildingMaterials)) {
        const amount =
          adjustedDate > 180
            ? buildingMaterials[ticker]
            : // This isn't quite right, but will be off by only 1 MCG at most
              Math.ceil((buildingMaterials[ticker] * adjustedDate) / 180);
        if (parsedGroup[ticker]) {
          parsedGroup[ticker] += amount;
        } else {
          parsedGroup[ticker] = amount;
        }
      }
    }
    return parsedGroup;
  },
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwYWlyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVwYWlyL3JlcGFpci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcbmltcG9ydCBFZGl0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVwYWlyL0VkaXQudnVlJztcbmltcG9ydCBDb25maWd1cmUgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL21hdGVyaWFsLWdyb3Vwcy9yZXBhaXIvQ29uZmlndXJlLnZ1ZSc7XG5pbXBvcnQgeyBnZXRCdWlsZGluZ0xhc3RSZXBhaXIsIHNpdGVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2l0ZXMnO1xuaW1wb3J0IHsgaXNSZXBhaXJhYmxlQnVpbGRpbmcgfSBmcm9tICdAc3JjL2NvcmUvYnVpbGRpbmdzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVwYWlyL2NvbmZpZyc7XG5pbXBvcnQgeyBjb25maWd1cmFibGVWYWx1ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuXG5hY3QuYWRkTWF0ZXJpYWxHcm91cDxDb25maWc+KHtcbiAgdHlwZTogJ1JlcGFpcicsXG4gIGRlc2NyaXB0aW9uOiBkYXRhID0+IHtcbiAgICBpZiAoIWRhdGEucGxhbmV0KSB7XG4gICAgICByZXR1cm4gJy0tJztcbiAgICB9XG5cbiAgICBjb25zdCBkYXlzID0gZGF0YS5kYXlzO1xuICAgIGNvbnN0IGRheXNQYXJ0ID0gZGF5cyAhPT0gdW5kZWZpbmVkID8gYG9sZGVyIHRoYW4gJHtkYXlzfSBkYXkke2RheXMgPT0gMSA/ICcnIDogJ3MnfWAgOiAnJztcbiAgICBjb25zdCBhZHZhbmNlRGF5cyA9IGRhdGEuYWR2YW5jZURheXMgPz8gMDtcbiAgICByZXR1cm4gYFJlcGFpciBidWlsZGluZ3Mgb24gJHtkYXRhLnBsYW5ldH0gJHtkYXlzUGFydH0gaW4gJHthZHZhbmNlRGF5c30gZGF5JHthZHZhbmNlRGF5cyA9PSAxID8gJycgOiAncyd9YDtcbiAgfSxcbiAgZWRpdENvbXBvbmVudDogRWRpdCxcbiAgY29uZmlndXJlQ29tcG9uZW50OiBDb25maWd1cmUsXG4gIG5lZWRzQ29uZmlndXJlOiBkYXRhID0+IGRhdGEucGxhbmV0ID09PSBjb25maWd1cmFibGVWYWx1ZSxcbiAgaXNWYWxpZENvbmZpZzogKGRhdGEsIGNvbmZpZykgPT4gZGF0YS5wbGFuZXQgIT09IGNvbmZpZ3VyYWJsZVZhbHVlIHx8IGNvbmZpZy5wbGFuZXQgIT09IHVuZGVmaW5lZCxcbiAgZ2VuZXJhdGVNYXRlcmlhbEJpbGw6IGFzeW5jICh7IGRhdGEsIGNvbmZpZywgbG9nIH0pID0+IHtcbiAgICBpZiAoIWRhdGEucGxhbmV0KSB7XG4gICAgICBsb2cuZXJyb3IoJ1Jlc3VwcGx5IHBsYW5ldCBpcyBub3QgY29uZmlndXJlZCcpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBwbGFuZXQgPSBkYXRhLnBsYW5ldCA9PT0gY29uZmlndXJhYmxlVmFsdWUgPyBjb25maWcucGxhbmV0IDogZGF0YS5wbGFuZXQ7XG4gICAgY29uc3Qgc2l0ZSA9IHNpdGVzU3RvcmUuZ2V0QnlQbGFuZXROYXR1cmFsSWRPck5hbWUocGxhbmV0KTtcbiAgICBpZiAoIXNpdGU/LnBsYXRmb3Jtcykge1xuICAgICAgbG9nLmVycm9yKCdNaXNzaW5nIGRhdGEgb24gcmVwYWlyIHBsYW5ldCcpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXlzID0gdHlwZW9mIGRhdGEuZGF5cyA9PT0gJ251bWJlcicgPyBkYXRhLmRheXMgOiBwYXJzZUZsb2F0KGRhdGEuZGF5cyEpO1xuICAgIGxldCBhZHZhbmNlRGF5cyA9XG4gICAgICB0eXBlb2YgZGF0YS5hZHZhbmNlRGF5cyA9PT0gJ251bWJlcicgPyBkYXRhLmFkdmFuY2VEYXlzIDogcGFyc2VGbG9hdChkYXRhLmFkdmFuY2VEYXlzISk7XG4gICAgY29uc3QgdGhyZXNob2xkID0gaXNOYU4oZGF5cykgPyAwIDogZGF5cztcbiAgICBhZHZhbmNlRGF5cyA9IGlzTmFOKGFkdmFuY2VEYXlzKSA/IDAgOiBhZHZhbmNlRGF5cztcblxuICAgIGNvbnN0IHBhcnNlZEdyb3VwID0ge307XG4gICAgZm9yIChjb25zdCBidWlsZGluZyBvZiBzaXRlLnBsYXRmb3Jtcykge1xuICAgICAgaWYgKCFpc1JlcGFpcmFibGVCdWlsZGluZyhidWlsZGluZykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3RSZXBhaXIgPSBnZXRCdWlsZGluZ0xhc3RSZXBhaXIoYnVpbGRpbmcpO1xuICAgICAgY29uc3QgZGF0ZSA9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxhc3RSZXBhaXIpIC8gODY0MDAwMDA7XG5cbiAgICAgIGlmIChkYXRlICsgYWR2YW5jZURheXMgPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1aWxkaW5nTWF0ZXJpYWxzID0ge307XG4gICAgICBmb3IgKGNvbnN0IG1hdCBvZiBidWlsZGluZy5yZWNsYWltYWJsZU1hdGVyaWFscykge1xuICAgICAgICBjb25zdCBhbW91bnQgPSBtYXQuYW1vdW50O1xuICAgICAgICBjb25zdCB0aWNrZXIgPSBtYXQubWF0ZXJpYWwudGlja2VyO1xuICAgICAgICBpZiAoYnVpbGRpbmdNYXRlcmlhbHNbdGlja2VyXSkge1xuICAgICAgICAgIGJ1aWxkaW5nTWF0ZXJpYWxzW3RpY2tlcl0gKz0gYW1vdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1aWxkaW5nTWF0ZXJpYWxzW3RpY2tlcl0gPSBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgbWF0IG9mIGJ1aWxkaW5nLnJlcGFpck1hdGVyaWFscykge1xuICAgICAgICBjb25zdCBhbW91bnQgPSBtYXQuYW1vdW50O1xuICAgICAgICBjb25zdCB0aWNrZXIgPSBtYXQubWF0ZXJpYWwudGlja2VyO1xuICAgICAgICBpZiAoYnVpbGRpbmdNYXRlcmlhbHNbdGlja2VyXSkge1xuICAgICAgICAgIGJ1aWxkaW5nTWF0ZXJpYWxzW3RpY2tlcl0gKz0gYW1vdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1aWxkaW5nTWF0ZXJpYWxzW3RpY2tlcl0gPSBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRqdXN0ZWREYXRlID0gZGF0ZSArIGFkdmFuY2VEYXlzO1xuICAgICAgZm9yIChjb25zdCB0aWNrZXIgb2YgT2JqZWN0LmtleXMoYnVpbGRpbmdNYXRlcmlhbHMpKSB7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9XG4gICAgICAgICAgYWRqdXN0ZWREYXRlID4gMTgwXG4gICAgICAgICAgICA/IGJ1aWxkaW5nTWF0ZXJpYWxzW3RpY2tlcl1cbiAgICAgICAgICAgIDogLy8gVGhpcyBpc24ndCBxdWl0ZSByaWdodCwgYnV0IHdpbGwgYmUgb2ZmIGJ5IG9ubHkgMSBNQ0cgYXQgbW9zdFxuICAgICAgICAgICAgICBNYXRoLmNlaWwoKGJ1aWxkaW5nTWF0ZXJpYWxzW3RpY2tlcl0gKiBhZGp1c3RlZERhdGUpIC8gMTgwKTtcblxuICAgICAgICBpZiAocGFyc2VkR3JvdXBbdGlja2VyXSkge1xuICAgICAgICAgIHBhcnNlZEdyb3VwW3RpY2tlcl0gKz0gYW1vdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcnNlZEdyb3VwW3RpY2tlcl0gPSBhbW91bnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAg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
