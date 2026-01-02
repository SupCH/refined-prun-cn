function UI_WINDOWS_UPDATE_SIZE(id, width, height) {
  return {
    messageType: 'UI_WINDOWS_UPDATE_SIZE',
    payload: {
      id,
      size: {
        width,
        height,
      },
    },
  };
}
function UI_TILES_CHANGE_COMMAND(id, command) {
  return {
    messageType: 'UI_TILES_CHANGE_COMMAND',
    payload: {
      id,
      newCommand: command,
    },
  };
}
function UI_WINDOWS_REQUEST_FOCUS(id) {
  return {
    messageType: 'UI_WINDOWS_REQUEST_FOCUS',
    payload: {
      id,
    },
  };
}
function WORLD_SECTORS(sectors) {
  return {
    messageType: 'WORLD_SECTORS',
    payload: {
      sectors,
    },
  };
}
function COMEX_BROKER_PRICES(prices) {
  return {
    messageType: 'COMEX_BROKER_PRICES',
    payload: prices,
  };
}
export {
  COMEX_BROKER_PRICES,
  UI_TILES_CHANGE_COMMAND,
  UI_WINDOWS_REQUEST_FOCUS,
  UI_WINDOWS_UPDATE_SIZE,
  WORLD_SECTORS,
};
