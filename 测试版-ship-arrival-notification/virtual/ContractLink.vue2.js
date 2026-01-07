import PrunLink from './PrunLink.vue.js';
import { isFactionContract } from './utils4.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractLink',
  props: {
    contract: {},
  },
  setup(__props) {
    const linkStyle = computed(() => ({
      display: isFactionContract(__props.contract) ? 'inline' : 'block',
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          PrunLink,
          {
            command: `CONT ${_ctx.contract.localId}`,
            style: normalizeStyle(unref(linkStyle)),
          },
          {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.contract.name || _ctx.contract.localId), 1),
            ]),
            _: 1,
          },
          8,
          ['command', 'style'],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RMaW5rLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ09OVEMvQ29udHJhY3RMaW5rLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFBydW5MaW5rIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuTGluay52dWUnO1xuaW1wb3J0IHsgaXNGYWN0aW9uQ29udHJhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9DT05UUy91dGlscyc7XG5cbmNvbnN0IHsgY29udHJhY3QgfSA9IGRlZmluZVByb3BzPHsgY29udHJhY3Q6IFBydW5BcGkuQ29udHJhY3QgfT4oKTtcblxuY29uc3QgbGlua1N0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgZGlzcGxheTogaXNGYWN0aW9uQ29udHJhY3QoY29udHJhY3QpID8gJ2lubGluZScgOiAnYmxvY2snLFxufSkpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPFBydW5MaW5rIDpjb21tYW5kPVwiYENPTlQgJHtjb250cmFjdC5sb2NhbElkfWBcIiA6c3R5bGU9XCJsaW5rU3R5bGVcIj5cbiAgICB7eyBjb250cmFjdC5uYW1lIHx8IGNvbnRyYWN0LmxvY2FsSWQgfX1cbiAgPC9QcnVuTGluaz5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZVN0eWxlIiwiX3VucmVmIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBTUEsVUFBQSxZQUFBLFNBQUEsT0FBQTtBQUFBLE1BQWtDLFNBQUEsa0JBQUEsUUFBQSxRQUFBLElBQUEsV0FBQTtBQUFBLElBQ2tCLEVBQUE7OztRQU92QyxTQUFBLFFBQUEsS0FBQSxTQUFBLE9BQUE7QUFBQSxRQUZpQyxPQUFBQSxlQUFBQyxNQUFBLFNBQUEsQ0FBQTtBQUFBLE1BQXFCLEdBQUE7QUFBQTtVQUN4QkMsZ0JBQUFDLGdCQUFBLEtBQUEsU0FBQSxRQUFBLEtBQUEsU0FBQSxPQUFBLEdBQUEsQ0FBQTtBQUFBLFFBQUgsQ0FBQTtBQUFBOzs7OzsifQ==
