import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { getPrunId } from './attributes.js';
import { downloadJson } from './json-file.js';
import { userData } from './user-data.js';
import { uiDataStore } from './ui-data.js';
import { deepToRaw } from './deep-to-raw.js';
import { shipsStore } from './ships.js';
import { flightsStore } from './flights.js';
import { contractsStore } from './contracts.js';
import { contractDraftsStore } from './contract-drafts.js';
import { sitesStore } from './sites.js';
import { blueprintsStore } from './blueprints.js';
import { workforcesStore } from './workforces.js';
import { productionStore } from './production.js';
import { cxobStore } from './cxob.js';
import { cxosStore } from './cxos.js';
import { getInvStore } from './store-id.js';
import { storagesStore } from './storage.js';
import { alertsStore } from './alerts.js';
import { shipyardProjectsStore } from './shipyard-projects.js';
function initTileDataExport() {
  subscribe($$(document, C.TileFrame.cmd), cmd => {
    cmd.addEventListener('click', e => {
      if (e.altKey) {
        const tile = cmd.closest(`.${C.Tile.tile}`);
        exportTileData(tile, cmd.textContent.trim());
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      return true;
    });
  });
}
function exportTileData(el, command) {
  const id = getPrunId(el);
  if (!id) {
    return;
  }
  const data = {
    id,
    command,
    state: {
      game: uiDataStore.tileStates.find(x => x.containerId === id) ?? {},
      rprun: userData.tileState[id] ?? {},
    },
    data: deepToRaw(getTileData(command)),
  };
  downloadJson(data, `${data.command} ${id}.json`);
}
function getTileData(command) {
  command = command.toUpperCase();
  if (command.startsWith('BBL')) {
    const id = command.replace('BBL', '').trim();
    return {
      buildings: sitesStore.getById(id)?.platforms,
    };
  }
  if (command.startsWith('BLU')) {
    const id = command.replace('BLU', '').trim();
    if (id) {
      return {
        blueprint: blueprintsStore.getByNaturalId(id),
      };
    }
    return {
      blueprints: blueprintsStore.all.value,
    };
  }
  if (command.startsWith('BS')) {
    const naturalId = command.replace('BS', '').trim();
    if (naturalId) {
      const site = sitesStore.getByPlanetNaturalId(naturalId);
      return {
        site,
        workforce: workforcesStore.getById(site?.siteId),
        production: productionStore.getBySiteId(site?.siteId),
      };
    }
    return {
      sites: sitesStore.all.value,
    };
  }
  if (command.startsWith('CONTD')) {
    const id = command.replace('CONTD', '').trim();
    if (id) {
      return {
        draft: contractDraftsStore.getByNaturalId(id),
      };
    }
    return {
      drafts: contractDraftsStore.all.value,
    };
  }
  if (command.startsWith('CONTS')) {
    return {
      contracts: contractsStore.all.value,
    };
  }
  if (command.startsWith('XIT CONTS')) {
    let contracts = contractsStore.all.value;
    if (contracts) {
      contracts = contracts.filter(
        x =>
          x.status === 'OPEN' ||
          x.status === 'CLOSED' ||
          x.status === 'PARTIALLY_FULFILLED' ||
          x.status === 'DEADLINE_EXCEEDED',
      );
    }
    return {
      contracts,
    };
  }
  if (command.startsWith('CONT')) {
    const id = command.replace('CONT', '').trim();
    return {
      contract: contractsStore.getByLocalId(id),
    };
  }
  if (command.startsWith('CXOB')) {
    const ticker = command.replace('CXOB', '').trim();
    return {
      orderBook: cxobStore.getByTicker(ticker),
    };
  }
  if (command.startsWith('CXOS')) {
    return {
      orders: cxosStore.all.value,
    };
  }
  if (command.startsWith('CXPO')) {
    const ticker = command.replace('CXPO', '').trim();
    return {
      orderBook: cxobStore.getByTicker(ticker),
    };
  }
  if (command.startsWith('FLT')) {
    return {
      ships: shipsStore.all.value,
      flights: flightsStore.all.value,
    };
  }
  if (command.startsWith('INV')) {
    const parameter = command.replace('INV', '').trim();
    if (parameter) {
      return {
        store: getInvStore(parameter),
      };
    }
    return {
      stores: storagesStore.all.value,
    };
  }
  if (command.startsWith('NOTS')) {
    return {
      alerts: alertsStore.all.value,
    };
  }
  if (command.startsWith('PROD')) {
    const id = command.replace('PROD', '').trim();
    if (id) {
      return {
        production: productionStore.getBySiteId(id),
      };
    }
    return {
      production: productionStore.all.value,
    };
  }
  if (command.startsWith('SHP')) {
    const id = command.replace('SHP', '').trim();
    return {
      ship: shipsStore.getByRegistration(id),
    };
  }
  if (command.startsWith('SHYP')) {
    const id = command.replace('SHYP', '').trim();
    if (id) {
      return {
        project: shipyardProjectsStore.getById(id),
      };
    }
    return {
      projects: shipyardProjectsStore.all.value,
    };
  }
  return {};
}
export { initTileDataExport };
