import { contractsStore } from './contracts.js';
import PrunLink from './PrunLink.vue.js';
import { isFactionContract } from './utils4.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractPartnerName',
  props: {
    contractLocalId: {},
  },
  setup(__props) {
    const contract = computed(() => contractsStore.getByLocalId(__props.contractLocalId));
    return (_ctx, _cache) => {
      return !unref(contract)
        ? (openBlock(),
          createElementBlock(
            'div',
            {
              key: 0,
              class: normalizeClass(_ctx.$style.label),
            },
            'Unknown',
            2,
          ))
        : unref(isFactionContract)(unref(contract))
          ? (openBlock(),
            createBlock(
              PrunLink,
              {
                key: 1,
                command: `FA ${unref(contract).partner.countryCode}`,
                class: normalizeClass(_ctx.$style.label),
              },
              {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(contract).partner.name), 1),
                ]),
                _: 1,
              },
              8,
              ['command', 'class'],
            ))
          : unref(contract).partner.name
            ? (openBlock(),
              createBlock(
                PrunLink,
                {
                  key: 2,
                  command: `CO ${unref(contract).partner.code}`,
                  class: normalizeClass(_ctx.$style.label),
                },
                {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(contract).partner.name), 1),
                  ]),
                  _: 1,
                },
                8,
                ['command', 'class'],
              ))
            : unref(contract).partner.code
              ? (openBlock(),
                createBlock(
                  PrunLink,
                  {
                    key: 3,
                    command: `CO ${unref(contract).partner.code}`,
                    class: normalizeClass(_ctx.$style.label),
                  },
                  null,
                  8,
                  ['command', 'class'],
                ))
              : unref(contract).partner.currency
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 4,
                      class: normalizeClass(_ctx.$style.label),
                    },
                    'Planetary Government',
                    2,
                  ))
                : (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 5,
                      class: normalizeClass(_ctx.$style.label),
                    },
                    'Unknown',
                    2,
                  ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RQYXJ0bmVyTmFtZS52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvc2lkZWJhci1jb250cmFjdHMtZGV0YWlscy9Db250cmFjdFBhcnRuZXJOYW1lLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29udHJhY3RzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29udHJhY3RzJztcbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbmltcG9ydCB7IGlzRmFjdGlvbkNvbnRyYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvdXRpbHMnO1xuXG5jb25zdCB7IGNvbnRyYWN0TG9jYWxJZCB9ID0gZGVmaW5lUHJvcHM8eyBjb250cmFjdExvY2FsSWQ6IHN0cmluZyB8IG51bGwgfT4oKTtcblxuY29uc3QgY29udHJhY3QgPSBjb21wdXRlZCgoKSA9PiBjb250cmFjdHNTdG9yZS5nZXRCeUxvY2FsSWQoY29udHJhY3RMb2NhbElkKSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IHYtaWY9XCIhY29udHJhY3RcIiA6Y2xhc3M9XCIkc3R5bGUubGFiZWxcIj5Vbmtub3duPC9kaXY+XG4gIDxQcnVuTGlua1xuICAgIHYtZWxzZS1pZj1cImlzRmFjdGlvbkNvbnRyYWN0KGNvbnRyYWN0KVwiXG4gICAgOmNvbW1hbmQ9XCJgRkEgJHtjb250cmFjdC5wYXJ0bmVyLmNvdW50cnlDb2RlfWBcIlxuICAgIDpjbGFzcz1cIiRzdHlsZS5sYWJlbFwiPlxuICAgIHt7IGNvbnRyYWN0LnBhcnRuZXIubmFtZSB9fVxuICA8L1BydW5MaW5rPlxuICA8UHJ1bkxpbmtcbiAgICB2LWVsc2UtaWY9XCJjb250cmFjdC5wYXJ0bmVyLm5hbWVcIlxuICAgIDpjb21tYW5kPVwiYENPICR7Y29udHJhY3QucGFydG5lci5jb2RlfWBcIlxuICAgIDpjbGFzcz1cIiRzdHlsZS5sYWJlbFwiPlxuICAgIHt7IGNvbnRyYWN0LnBhcnRuZXIubmFtZSB9fVxuICA8L1BydW5MaW5rPlxuICA8UHJ1bkxpbmtcbiAgICB2LWVsc2UtaWY9XCJjb250cmFjdC5wYXJ0bmVyLmNvZGVcIlxuICAgIDpjb21tYW5kPVwiYENPICR7Y29udHJhY3QucGFydG5lci5jb2RlfWBcIlxuICAgIDpjbGFzcz1cIiRzdHlsZS5sYWJlbFwiIC8+XG4gIDxkaXYgdi1lbHNlLWlmPVwiY29udHJhY3QucGFydG5lci5jdXJyZW5jeVwiIDpjbGFzcz1cIiRzdHlsZS5sYWJlbFwiPlBsYW5ldGFyeSBHb3Zlcm5tZW50PC9kaXY+XG4gIDxkaXYgdi1lbHNlIDpjbGFzcz1cIiRzdHlsZS5sYWJlbFwiPlVua25vd248L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4ubGFiZWwge1xuICBmbGV4LWdyb3c6IDE7XG4gIHRleHQtd3JhcDogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91bnJlZiIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVFbGVtZW50QmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BLFVBQUEsV0FBQSxTQUFBLE1BQUEsZUFBQSxhQUFBLFFBQUEsZUFBQSxDQUFBOzs7UUFJMkQsS0FBQTtBQUFBO01BQWYsR0FBQSxXQUFBLENBQUEsS0FBQUEsTUFBQSxpQkFBQSxFQUFBQSxNQUFBLFFBQUEsQ0FBQSxLQUFBQyxhQUFBQyxZQUFBLFVBQUE7QUFBQSxRQU0vQixLQUFBO0FBQUE7UUFIbUMsT0FBQUMsZUFBQSxLQUFBLE9BQUEsS0FBQTtBQUFBLE1BQ3hCLEdBQUE7QUFBQTtVQUNPQyxnQkFBQUMsZ0JBQUFMLE1BQUEsUUFBQSxFQUFBLFFBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxRQUFILENBQUE7QUFBQTs7UUFPZixLQUFBO0FBQUE7UUFINEIsT0FBQUcsZUFBQSxLQUFBLE9BQUEsS0FBQTtBQUFBLE1BQ2pCLEdBQUE7QUFBQTtVQUNPQyxnQkFBQUMsZ0JBQUFMLE1BQUEsUUFBQSxFQUFBLFFBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxRQUFILENBQUE7QUFBQTs7UUFLQSxLQUFBO0FBQUE7UUFEYSxPQUFBRyxlQUFBLEtBQUEsT0FBQSxLQUFBO0FBQUEsTUFDakIsR0FBQSxNQUFBLEdBQUEsQ0FBQSxXQUFBLE9BQUEsQ0FBQSxLQUFBSCxNQUFBLFFBQUEsRUFBQSxRQUFBLFlBQUFDLFVBQUEsR0FBQUssbUJBQUEsT0FBQTtBQUFBLFFBQ3FFLEtBQUE7QUFBQTtNQUE1QixHQUFBLHdCQUFBLENBQUEsTUFBQUwsVUFBQSxHQUFBSyxtQkFBQSxPQUFBO0FBQUEsUUFDaEIsS0FBQTtBQUFBO01BQWYsR0FBQSxXQUFBLENBQUE7QUFBQSxJQUFTO0FBQUE7OyJ9
