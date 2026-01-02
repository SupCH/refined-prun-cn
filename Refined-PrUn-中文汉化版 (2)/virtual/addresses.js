import { onApiMessage } from './api-messages.js';
import { shallowReactive } from './reactivity.esm-bundler.js';
const state = shallowReactive({});
onApiMessage({
  SHIP_SHIPS(data) {
    for (const ship of data.ships) {
      state[ship.id] = ship.address;
    }
  },
  SHIP_DATA(data) {
    state[data.id] = data.address;
  },
  SITE_SITES(data) {
    for (const storage of data.sites) {
      state[storage.siteId] = storage.address;
    }
  },
  SITE_SITE(data) {
    state[data.siteId] = data.address;
  },
  WAREHOUSE_STORAGES(data) {
    for (const storage of data.storages) {
      state[storage.storeId] = storage.address;
    }
  },
  WAREHOUSE_STORAGE(data) {
    state[data.storeId] = data.address;
  },
});
({
  ...state,
});
const getEntityNaturalIdFromAddress = address => {
  return getLocationLineFromAddress(address)?.entity.naturalId;
};
const getEntityNameFromAddress = address => {
  const location = getLocationLineFromAddress(address);
  if (!location) {
    return void 0;
  }
  if (location.type !== 'PLANET' || location.entity.name !== location.entity.naturalId) {
    return location.entity.name;
  }
  const system = getSystemLineFromAddress(address);
  if (!system || system.entity.name === system.entity.naturalId) {
    return location.entity.name;
  }
  return location.entity.name.replace(system.entity.naturalId, `${system.entity.name} `);
};
const getSystemLineFromAddress = address => {
  if (!address) {
    return void 0;
  }
  return isSystemLine(address.lines[0]) ? address.lines[0] : address.lines.find(isSystemLine);
};
const getLocationLineFromAddress = address => {
  if (!address) {
    return void 0;
  }
  return isLocationLine(address.lines[1]) ? address.lines[1] : address.lines.find(isLocationLine);
};
function getDestinationName(destination) {
  if (!destination) {
    return void 0;
  }
  const location = getLocationLineFromAddress(destination);
  if (location?.type === 'STATION') {
    return location.entity.naturalId;
  }
  return getEntityNameFromAddress(destination);
}
function getDestinationFullName(destination) {
  if (!destination) {
    return void 0;
  }
  const location = getLocationLineFromAddress(destination);
  if (location?.type === 'STATION') {
    return location.entity.name;
  }
  const system = destination.lines[0];
  const planet = destination.lines[1];
  if (system === void 0) {
    return void 0;
  }
  if (planet === void 0) {
    return system.entity.name;
  }
  const isPlanetNamed = planet.entity.name !== planet.entity.naturalId;
  if (isPlanetNamed) {
    return `${system.entity.name} - ${planet.entity.name}`;
  }
  const planetLetter = planet.entity.naturalId.replace(system.entity.naturalId, '');
  return `${system.entity.name} ${planetLetter}`;
}
function isSystemLine(line) {
  return line?.type === 'SYSTEM';
}
function isLocationLine(line) {
  return line?.type === 'PLANET' || line?.type === 'STATION';
}
function isSameAddress(addressA, addressB) {
  if (!addressA || !addressB) {
    return false;
  }
  if (addressA === addressB) {
    return true;
  }
  for (let i = 0; i < addressA.lines.length; i++) {
    const lineA = addressA.lines[i];
    const lineB = addressB.lines[i];
    if (lineA === void 0 || lineB === void 0 || lineA.entity.id !== lineB.entity.id) {
      return false;
    }
  }
  return true;
}
export {
  getDestinationFullName,
  getDestinationName,
  getEntityNameFromAddress,
  getEntityNaturalIdFromAddress,
  getLocationLineFromAddress,
  getSystemLineFromAddress,
  isSameAddress,
};
