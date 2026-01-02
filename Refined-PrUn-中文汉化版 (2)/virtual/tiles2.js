import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  UI_DATA(data) {
    store.setAll(data.tiles);
    store.setFetched();
    tilesStore.listener.tilesInitialized();
  },
  UI_TILES_CHANGE_COMMAND(data) {
    const tile = state.getById(data.id);
    if (!tile) {
      return;
    }
    store.setOne({
      ...tile,
      content: data.newCommand,
    });
    tilesStore.listener.tileRemoved(data.id);
  },
  UI_TILES_MOVE(data) {
    const source = state.getById(data.sourceId);
    if (!source) {
      return;
    }
    const target = state.getById(data.targetId);
    if (!target) {
      return;
    }
    store.setOne({
      ...source,
      content: null,
    });
    store.setOne({
      ...target,
      content: data.content,
    });
    tilesStore.listener.tileMoved(data.sourceId, data.targetId);
  },
  UI_TILES_SPLIT(data) {
    const tile = state.getById(data.id);
    if (!tile) {
      return;
    }
    store.setOne({
      id: data.newId1,
      parentId: data.id,
      content: tile.content,
      container: null,
    });
    store.setOne({
      id: data.newId2,
      parentId: data.id,
      content: null,
      container: null,
    });
    store.setOne({
      ...tile,
      content: null,
      container: {
        child1Id: data.newId1,
        child2Id: data.newId2,
        vertical: data.vertically,
        dividerPosition: 0.5,
      },
    });
    tilesStore.listener.tileMoved(data.id, data.newId1);
  },
  UI_TILES_REMOVE(data) {
    const tile = state.getById(data.id);
    if (!tile) {
      return;
    }
    const parent = state.getById(tile.parentId);
    const container = parent?.container;
    if (!container) {
      return;
    }
    const otherId = container.child1Id !== data.id ? container.child1Id : container.child1Id;
    const other = state.getById(otherId);
    if (!other) {
      return;
    }
    store.setOne({
      ...parent,
      container: null,
      content: other.content,
    });
    store.removeOne(tile.id);
    store.removeOne(other.id);
    tilesStore.listener.tileRemoved(tile.id);
    tilesStore.listener.tileMoved(other.id, parent.id);
  },
  UI_TILES_CHANGE_SIZE(data) {
    const tile = state.getById(data.id);
    if (!tile || !tile.container) {
      return;
    }
    store.setOne({
      ...tile,
      container: {
        ...tile.container,
        dividerPosition: data.newDividerPosition,
      },
    });
  },
});
const tilesStore = {
  ...state,
  listener: {
    tilesInitialized() {},
    tileMoved() {},
    tileRemoved() {},
  },
};
export { tilesStore };
