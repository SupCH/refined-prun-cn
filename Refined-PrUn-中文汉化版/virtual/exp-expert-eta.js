import { subscribe } from './subscribe-async-generator.js';
import { _$, $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { expertsStore } from './experts.js';
import { productionStore } from './production.js';
import { sitesStore } from './sites.js';
import { timestampEachMinute } from './dayjs.js';
import { formatEta } from './format.js';
import { createReactiveDiv } from './reactive-element.js';
import { computed } from './runtime-core.esm-bundler.js';
const orderedExpertiseRows = [
  'AGRICULTURE',
  'CHEMISTRY',
  'CONSTRUCTION',
  'ELECTRONICS',
  'FOOD_INDUSTRIES',
  'FUEL_REFINING',
  'MANUFACTURING',
  'METALLURGY',
  'RESOURCE_EXTRACTION',
];
const expertDays = [10, 12.5, 57.57, 276.5, 915.1];
const MS_IN_DAY = 24 * 60 * 60 * 1e3;
function onTileReady(tile) {
  const site = sitesStore.getById(tile.parameter);
  subscribe($$(tile.anchor, 'tr'), tr => {
    if (_$(tr, 'th')) {
      const header = document.createElement('th');
      header.textContent = 'ETA';
      tr.append(header);
      return;
    }
    const parent = tr.parentElement;
    const index = Array.from(parent.children).indexOf(tr);
    if (index >= orderedExpertiseRows.length) {
      return;
    }
    const expertise = orderedExpertiseRows[index];
    onExpertRowReady(tr, expertise, site.siteId);
  });
}
function onExpertRowReady(row, expertise, siteId) {
  const expertEntry = computed(() => {
    const experts = expertsStore.getBySiteId(siteId);
    return experts?.experts.find(x => x.category === expertise)?.entry;
  });
  const expertLines = computed(() => {
    const production = productionStore.getBySiteId(siteId);
    return production?.filter(line =>
      line.efficiencyFactors.some(x => x.type === 'EXPERTS' && x.expertiseCategory === expertise),
    );
  });
  const eta = computed(() => {
    const entry = expertEntry.value;
    const lines = expertLines.value;
    return entry && lines ? calculateEta(entry, lines) : void 0;
  });
  const text = computed(() => {
    const entry = expertEntry.value;
    const lines = expertLines.value;
    if (!entry || !lines) {
      return '--';
    }
    if (getTotalExperts(entry) >= entry.limit) {
      return 'Maxed';
    }
    if (!eta.value) {
      return '--';
    }
    if (eta.value.type === 'precise') {
      return `${formatEta(timestampEachMinute.value, eta.value.ms)}`;
    }
    if (eta.value.type === 'estimate') {
      return isFinite(eta.value.ms) ? `~${(eta.value.ms / MS_IN_DAY).toFixed(1)}d` : '∞';
    }
    return '--';
  });
  const div = createReactiveDiv(row, text);
  div.style.whiteSpace = 'pre-wrap';
  const td = document.createElement('td');
  td.append(div);
  row.append(td);
}
function calculateEta(entry, lines) {
  if (lines.length === 0) {
    return void 0;
  }
  const remainingExperience = (1 - entry.progress) * expertDays[getTotalExperts(entry)] * MS_IN_DAY;
  const inProgressOrders = lines
    .flatMap(line =>
      line.orders
        .filter(x => x.completion)
        .map(x => ({
          order: x,
          completion: x.completion.timestamp,
          experience: getExperience(x, line),
        })),
    )
    .sort((a, b) => a.completion - b.completion);
  if (inProgressOrders.length === 0) {
    return void 0;
  }
  let accumulatedExperience = 0;
  for (const order of inProgressOrders) {
    accumulatedExperience += order.experience;
    if (accumulatedExperience >= remainingExperience) {
      return {
        type: 'precise',
        ms: order.completion,
      };
    }
  }
  let experiencePerMs = 0;
  for (const line of lines) {
    experiencePerMs += line.capacity * line.efficiency;
  }
  return {
    type: 'estimate',
    ms: remainingExperience / experiencePerMs,
  };
}
function getExperience(order, line) {
  const recipeId = order.recipeId;
  const template = line.productionTemplates.find(x => x.id === recipeId);
  if (!template) {
    return 0;
  }
  const orderSize = order.outputs[0].amount / template.outputFactors[0].factor;
  return template.experience * orderSize;
}
function getTotalExperts(entry) {
  return entry.current + entry.available;
}
function init() {
  tiles.observe('EXP', onTileReady);
}
features.add(import.meta.url, init, 'EXP: Displays ETA for the next expert to appear.');
