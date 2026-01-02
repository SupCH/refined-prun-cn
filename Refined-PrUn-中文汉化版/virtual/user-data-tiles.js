import { userData } from './user-data.js';
import { deepFreeze } from './deep-freeze.js';
import { tilesStore } from './tiles2.js';
import { isEmpty } from './is-empty.js';
import { computed, watch, inject } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function initializeTileListener() {
  pruneTileStates();
  tilesStore.listener = {
    tilesInitialized() {
      pruneTileStates();
    },
    tileMoved(fromId, toId) {
      moveTileState(fromId, toId);
    },
    tileRemoved(id) {
      removeTileState(id);
    },
  };
}
function pruneTileStates() {
  const tiles = tilesStore.entities.value;
  if (!tiles) {
    return;
  }
  for (const key of Object.keys(userData.tileState)) {
    if (!(key in tiles)) {
      removeTileState(key);
    }
  }
}
function removeTileState(id) {
  delete userData.tileState[id];
}
function moveTileState(fromId, toId) {
  if (userData.tileState[fromId]) {
    userData.tileState[toId] = userData.tileState[fromId];
    removeTileState(fromId);
  }
}
function getTileState(tileOrId) {
  const id = typeof tileOrId === 'string' ? tileOrId : tileOrId.id;
  let state = userData.tileState[id];
  let isAdded = state !== void 0;
  if (!state) {
    state = reactive({});
  }
  const isPersistent = isNaN(Number(id));
  if (isPersistent) {
    watch(
      state,
      () => {
        const hasKeys = Object.keys(state).length > 0;
        if (hasKeys && !isAdded) {
          userData.tileState[id] = state;
          isAdded = true;
        }
        if (!hasKeys && isAdded) {
          delete userData.tileState[id];
          isAdded = false;
        }
      },
      { deep: true },
    );
  }
  return state;
}
const baseTileStateKey = Symbol();
function tileStateKey() {
  return baseTileStateKey;
}
const tileStatePlugin = {
  install: (app, options) => {
    app.provide(
      tileStateKey(),
      computed(() => getTileState(options.tile)),
    );
  },
};
function createTileStateHook(defaultState) {
  deepFreeze(defaultState);
  return function useTileState2(key) {
    const state = inject(tileStateKey());
    return computedTileState(state, key, defaultState[key]);
  };
}
function useTileState(key, defaultValue) {
  const state = inject(tileStateKey());
  return computedTileState(state, key, defaultValue);
}
function computedTileState(state, key, defaultValue) {
  return computed({
    get: () => {
      const value = state.value[key];
      return Object.hasOwn(state.value, key) ? value : defaultValue;
    },
    set: value => {
      if (Array.isArray(value) && isEmpty(value)) {
        delete state.value[key];
        return;
      } else if (typeof value === 'object' && Object.keys(value).length === 0) {
        delete state.value[key];
        return;
      }
      if (value === defaultValue) {
        delete state.value[key];
        return;
      }
      state.value[key] = value;
    },
  });
}
export {
  computedTileState,
  createTileStateHook,
  getTileState,
  initializeTileListener,
  tileStateKey,
  tileStatePlugin,
  useTileState,
};
