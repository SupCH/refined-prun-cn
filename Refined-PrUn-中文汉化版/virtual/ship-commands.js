import { shipsStore } from './ships.js';
const correctableCommands = /* @__PURE__ */ new Set(['SFC', 'SHP', 'SHPF', 'SHPI', 'SI']);
function correctShipCommand(parts) {
  if (!correctableCommands.has(parts[0].toUpperCase())) {
    return;
  }
  const args = parts.slice(1);
  const shipName = args.join(' ');
  const ship = shipsStore.getByName(shipName);
  if (ship && shipName !== ship.registration) {
    parts.splice(1);
    parts.push(ship.registration);
  }
}
export { correctShipCommand };
