import { castArray } from './cast-array.js';
import { initializeXitCommands } from './xit-commands.js';
const registry = [];
const lookup = /* @__PURE__ */ new Map();
function add(descriptor) {
  registry.push(descriptor);
  for (let command of castArray(descriptor.command)) {
    command = command.toUpperCase();
    lookup.set(command, descriptor);
  }
}
function get(command) {
  return lookup.get(command.toUpperCase());
}
const xit = {
  add,
  get,
  registry,
  init: initializeXitCommands,
};
export { xit as default };
