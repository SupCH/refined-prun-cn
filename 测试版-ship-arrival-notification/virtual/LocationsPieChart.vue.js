import _sfc_main$1 from './PieChart.vue.js';
import { calculateLocationAssets } from './financials.js';
import { defineComponent, computed, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LocationsPieChart',
  setup(__props) {
    const locations = computed(() => calculateLocationAssets() ?? []);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            'label-data': unref(locations).map(x => x.name),
            'numerical-data': unref(locations).map(x => x.total),
          },
          null,
          8,
          ['label-data', 'numerical-data'],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb25zUGllQ2hhcnQudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0ZJTkNIL0xvY2F0aW9uc1BpZUNoYXJ0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFBpZUNoYXJ0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkNIL1BpZUNoYXJ0LnZ1ZSc7XG5pbXBvcnQgeyBjYWxjdWxhdGVMb2NhdGlvbkFzc2V0cyB9IGZyb20gJ0BzcmMvY29yZS9maW5hbmNpYWxzJztcblxuY29uc3QgbG9jYXRpb25zID0gY29tcHV0ZWQoKCkgPT4gY2FsY3VsYXRlTG9jYXRpb25Bc3NldHMoKSA/PyBbXSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8UGllQ2hhcnRcbiAgICA6bGFiZWwtZGF0YT1cImxvY2F0aW9ucy5tYXAoeCA9PiB4Lm5hbWUpXCJcbiAgICA6bnVtZXJpY2FsLWRhdGE9XCJsb2NhdGlvbnMubWFwKHggPT4geC50b3RhbClcIiAvPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxVQUFBLFlBQUEsU0FBQSxNQUFBLHdCQUFBLEtBQUEsQ0FBQSxDQUFBOzs7UUFNb0QsY0FBQUEsTUFBQSxTQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBO0FBQUEsUUFEVixrQkFBQUEsTUFBQSxTQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBO0FBQUEsTUFDSyxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEsZ0JBQUEsQ0FBQTtBQUFBOzs7In0=
