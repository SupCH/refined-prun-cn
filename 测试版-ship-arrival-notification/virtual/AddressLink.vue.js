import PrunLink from './PrunLink.vue.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AddressLink',
  props: {
    address: {},
  },
  setup(__props) {
    const body = computed(() => __props.address.lines[1]);
    const isPlanet = computed(() => body.value.type === 'PLANET');
    const naturalId = computed(() => body.value.entity.naturalId);
    const name = computed(() => body.value.entity.name);
    return (_ctx, _cache) => {
      return unref(isPlanet)
        ? (openBlock(),
          createBlock(
            PrunLink,
            {
              key: 0,
              inline: '',
              command: `PLI ${unref(naturalId)}`,
            },
            {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(name)), 1)]),
              _: 1,
            },
            8,
            ['command'],
          ))
        : (openBlock(),
          createBlock(
            PrunLink,
            {
              key: 1,
              inline: '',
              command: `STNS ${unref(naturalId)}`,
            },
            {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(name)), 1)]),
              _: 1,
            },
            8,
            ['command'],
          ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzc0xpbmsudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NPTlRDL0FkZHJlc3NMaW5rLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFBydW5MaW5rIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuTGluay52dWUnO1xuXG5jb25zdCB7IGFkZHJlc3MgfSA9IGRlZmluZVByb3BzPHsgYWRkcmVzczogUHJ1bkFwaS5BZGRyZXNzIH0+KCk7XG5cbmNvbnN0IGJvZHkgPSBjb21wdXRlZCgoKSA9PiBhZGRyZXNzLmxpbmVzWzFdKTtcbmNvbnN0IGlzUGxhbmV0ID0gY29tcHV0ZWQoKCkgPT4gYm9keS52YWx1ZS50eXBlID09PSAnUExBTkVUJyk7XG5jb25zdCBuYXR1cmFsSWQgPSBjb21wdXRlZCgoKSA9PiBib2R5LnZhbHVlLmVudGl0eS5uYXR1cmFsSWQpO1xuY29uc3QgbmFtZSA9IGNvbXB1dGVkKCgpID0+IGJvZHkudmFsdWUuZW50aXR5Lm5hbWUpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPFBydW5MaW5rIHYtaWY9XCJpc1BsYW5ldFwiIGlubGluZSA6Y29tbWFuZD1cImBQTEkgJHtuYXR1cmFsSWR9YFwiPnt7IG5hbWUgfX08L1BydW5MaW5rPlxuICA8UHJ1bkxpbmsgdi1lbHNlIGlubGluZSA6Y29tbWFuZD1cImBTVE5TICR7bmF0dXJhbElkfWBcIj57eyBuYW1lIH19PC9QcnVuTGluaz5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxVQUFBLE9BQUEsU0FBQSxNQUFBLFFBQUEsUUFBQSxNQUFBLENBQUEsQ0FBQTtBQUNBLFVBQUEsV0FBQSxTQUFBLE1BQUEsS0FBQSxNQUFBLFNBQUEsUUFBQTtBQUNBLFVBQUEsWUFBQSxTQUFBLE1BQUEsS0FBQSxNQUFBLE9BQUEsU0FBQTtBQUNBLFVBQUEsT0FBQSxTQUFBLE1BQUEsS0FBQSxNQUFBLE9BQUEsSUFBQTs7O1FBSXNGLEtBQUE7QUFBQTtRQUExRCxTQUFBLE9BQUFBLE1BQUEsU0FBQSxDQUFBO0FBQUEsTUFBaUMsR0FBQTtBQUFBO1VBQWNDLGdCQUFBQyxnQkFBQUYsTUFBQSxJQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsUUFBSCxDQUFBO0FBQUE7O1FBQ00sS0FBQTtBQUFBO1FBQTNELFNBQUEsUUFBQUEsTUFBQSxTQUFBLENBQUE7QUFBQSxNQUFrQyxHQUFBO0FBQUE7VUFBY0MsZ0JBQUFDLGdCQUFBRixNQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUFILENBQUE7QUFBQTs7Ozs7In0=
