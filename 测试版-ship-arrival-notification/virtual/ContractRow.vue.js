import _sfc_main$1 from './ContractLink.vue.js';
import _sfc_main$2 from './MaterialList.vue2.js';
import PartnerLink from './PartnerLink.vue.js';
import _sfc_main$3 from './ConditionList.vue.js';
import { isSelfCondition, isPartnerCondition } from './utils4.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { width: '32px', paddingLeft: '10px' } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractRow',
  props: {
    contract: {},
  },
  setup(__props) {
    const self = computed(() =>
      __props.contract.conditions.filter(x => isSelfCondition(__props.contract, x)),
    );
    const partner = computed(() =>
      __props.contract.conditions.filter(x => isPartnerCondition(__props.contract, x)),
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tr', null, [
          createBaseVNode('td', null, [
            createVNode(_sfc_main$1, { contract: _ctx.contract }, null, 8, ['contract']),
          ]),
          createBaseVNode('td', _hoisted_1, [
            createVNode(_sfc_main$2, { contract: _ctx.contract }, null, 8, ['contract']),
          ]),
          createBaseVNode('td', null, [
            createVNode(PartnerLink, { contract: _ctx.contract }, null, 8, ['contract']),
            createVNode(
              _sfc_main$3,
              {
                conditions: unref(partner),
                contract: _ctx.contract,
              },
              null,
              8,
              ['conditions', 'contract'],
            ),
          ]),
          createBaseVNode('td', null, [
            createVNode(
              _sfc_main$3,
              {
                conditions: unref(self),
                contract: _ctx.contract,
              },
              null,
              8,
              ['conditions', 'contract'],
            ),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RSb3cudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NPTlRTL0NvbnRyYWN0Um93LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IENvbnRyYWN0TGluayBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9DT05UUy9Db250cmFjdExpbmsudnVlJztcbmltcG9ydCBNYXRlcmlhbExpc3QgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvTWF0ZXJpYWxMaXN0LnZ1ZSc7XG5pbXBvcnQgUGFydG5lckxpbmsgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvUGFydG5lckxpbmsudnVlJztcbmltcG9ydCBDb25kaXRpb25MaXN0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0NPTlRTL0NvbmRpdGlvbkxpc3QudnVlJztcbmltcG9ydCB7IGlzUGFydG5lckNvbmRpdGlvbiwgaXNTZWxmQ29uZGl0aW9uIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvdXRpbHMnO1xuXG5jb25zdCB7IGNvbnRyYWN0IH0gPSBkZWZpbmVQcm9wczx7IGNvbnRyYWN0OiBQcnVuQXBpLkNvbnRyYWN0IH0+KCk7XG5cbmNvbnN0IHNlbGYgPSBjb21wdXRlZCgoKSA9PiBjb250cmFjdC5jb25kaXRpb25zLmZpbHRlcih4ID0+IGlzU2VsZkNvbmRpdGlvbihjb250cmFjdCwgeCkpKTtcbmNvbnN0IHBhcnRuZXIgPSBjb21wdXRlZCgoKSA9PiBjb250cmFjdC5jb25kaXRpb25zLmZpbHRlcih4ID0+IGlzUGFydG5lckNvbmRpdGlvbihjb250cmFjdCwgeCkpKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0cj5cbiAgICA8dGQ+XG4gICAgICA8Q29udHJhY3RMaW5rIDpjb250cmFjdD1cImNvbnRyYWN0XCIgLz5cbiAgICA8L3RkPlxuICAgIDx0ZCA6c3R5bGU9XCJ7IHdpZHRoOiAnMzJweCcsIHBhZGRpbmdMZWZ0OiAnMTBweCcgfVwiPlxuICAgICAgPE1hdGVyaWFsTGlzdCA6Y29udHJhY3Q9XCJjb250cmFjdFwiIC8+XG4gICAgPC90ZD5cbiAgICA8dGQ+XG4gICAgICA8UGFydG5lckxpbmsgOmNvbnRyYWN0PVwiY29udHJhY3RcIiAvPlxuICAgICAgPENvbmRpdGlvbkxpc3QgOmNvbmRpdGlvbnM9XCJwYXJ0bmVyXCIgOmNvbnRyYWN0PVwiY29udHJhY3RcIiAvPlxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPENvbmRpdGlvbkxpc3QgOmNvbmRpdGlvbnM9XCJzZWxmXCIgOmNvbnRyYWN0PVwiY29udHJhY3RcIiAvPlxuICAgIDwvdGQ+XG4gIDwvdHI+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJDb250cmFjdExpbmsiLCJNYXRlcmlhbExpc3QiLCJDb25kaXRpb25MaXN0IiwiX3VucmVmIiwiY29udHJhY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBU0EsVUFBQSxPQUFBLFNBQUEsTUFBQSxRQUFBLFNBQUEsV0FBQSxPQUFBLENBQUEsTUFBQSxnQkFBQSxRQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxVQUFBLFVBQUEsU0FBQSxNQUFBLFFBQUEsU0FBQSxXQUFBLE9BQUEsQ0FBQSxNQUFBLG1CQUFBLFFBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTs7O1FBa0JPQSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxVQVhFQyxZQUFBQyxhQUFBLEVBQUEsVUFBQSxLQUFBLFNBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUE7QUFBQSxRQUQ4QixDQUFBO0FBQUE7VUFJOUJELFlBQUFFLGFBQUEsRUFBQSxVQUFBLEtBQUEsU0FBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQTtBQUFBLFFBRDhCLENBQUE7QUFBQTtVQUs5QkYsWUFBQSxhQUFBLEVBQUEsVUFBQSxLQUFBLFNBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxVQUFBLENBQUE7QUFBQSxVQUY2QkEsWUFBQUcsYUFBQTtBQUFBLFlBQzRCLFlBQUFDLE1BQUEsT0FBQTtBQUFBLFlBQWhDLFVBQUEsS0FBQTtBQUFBLFVBQW9CQyxHQUFBQSxNQUFBQSxHQUFBQSxDQUFBQSxjQUFBQSxVQUFBQSxDQUFBQTtBQUFBQTs7VUFJN0NMLFlBQUFHLGFBQUE7QUFBQSxZQURzRCxZQUFBQyxNQUFBLElBQUE7QUFBQSxZQUE3QixVQUFBLEtBQUE7QUFBQSxVQUFpQkMsR0FBQUEsTUFBQUEsR0FBQUEsQ0FBQUEsY0FBQUEsVUFBQUEsQ0FBQUE7QUFBQUE7Ozs7OyJ9
