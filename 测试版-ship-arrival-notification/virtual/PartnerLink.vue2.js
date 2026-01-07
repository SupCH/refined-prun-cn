import PrunLink from './PrunLink.vue.js';
import { isFactionContract } from './utils4.js';
import fa from './font-awesome.module.css.js';
import coloredValue from './colored-value.module.css.js';
import {
  defineComponent,
  createBlock,
  createElementBlock,
  openBlock,
  withCtx,
  createElementVNode as createBaseVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 4 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PartnerLink',
  props: {
    contract: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return unref(isFactionContract)(_ctx.contract)
        ? (openBlock(),
          createBlock(
            PrunLink,
            {
              key: 0,
              command: `FA ${_ctx.contract.partner.countryCode}`,
            },
            {
              default: withCtx(() => [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass([unref(fa).regular, unref(coloredValue).warning]),
                  },
                  toDisplayString(''),
                  2,
                ),
                createTextVNode(' ' + toDisplayString(_ctx.contract.partner.name), 1),
              ]),
              _: 1,
            },
            8,
            ['command'],
          ))
        : _ctx.contract.partner.name
          ? (openBlock(),
            createBlock(
              PrunLink,
              {
                key: 1,
                command: `CO ${_ctx.contract.partner.code}`,
              },
              {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.contract.partner.name), 1),
                ]),
                _: 1,
              },
              8,
              ['command'],
            ))
          : _ctx.contract.partner.code
            ? (openBlock(),
              createBlock(
                PrunLink,
                {
                  key: 2,
                  command: `CO ${_ctx.contract.partner.code}`,
                },
                null,
                8,
                ['command'],
              ))
            : _ctx.contract.partner.currency
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 3,
                    'data-tooltip':
                      'Refined PrUn is unable to fetch government information. Check the contract info for more details.',
                    'data-tooltip-position': 'down',
                    class: normalizeClass(_ctx.$style.overrideTooltipStyle),
                  },
                  ' Planetary Government ',
                  2,
                ))
              : (openBlock(), createElementBlock('div', _hoisted_1, 'Unknown'));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydG5lckxpbmsudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9DT05UUy9QYXJ0bmVyTGluay52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbmltcG9ydCB7IGlzRmFjdGlvbkNvbnRyYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvdXRpbHMnO1xuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGNvbG9yZWRWYWx1ZSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvY3NzL2NvbG9yZWQtdmFsdWUubW9kdWxlLmNzcyc7XG5cbmRlZmluZVByb3BzPHsgY29udHJhY3Q6IFBydW5BcGkuQ29udHJhY3QgfT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxQcnVuTGluayB2LWlmPVwiaXNGYWN0aW9uQ29udHJhY3QoY29udHJhY3QpXCIgOmNvbW1hbmQ9XCJgRkEgJHtjb250cmFjdC5wYXJ0bmVyLmNvdW50cnlDb2RlfWBcIj5cbiAgICA8c3BhbiA6Y2xhc3M9XCJbZmEucmVndWxhciwgY29sb3JlZFZhbHVlLndhcm5pbmddXCI+e3sgJ1xcdWYwMDUnIH19PC9zcGFuPlxuICAgIHt7IGNvbnRyYWN0LnBhcnRuZXIubmFtZSB9fVxuICA8L1BydW5MaW5rPlxuICA8UHJ1bkxpbmsgdi1lbHNlLWlmPVwiY29udHJhY3QucGFydG5lci5uYW1lXCIgOmNvbW1hbmQ9XCJgQ08gJHtjb250cmFjdC5wYXJ0bmVyLmNvZGV9YFwiPlxuICAgIHt7IGNvbnRyYWN0LnBhcnRuZXIubmFtZSB9fVxuICA8L1BydW5MaW5rPlxuICA8UHJ1bkxpbmsgdi1lbHNlLWlmPVwiY29udHJhY3QucGFydG5lci5jb2RlXCIgOmNvbW1hbmQ9XCJgQ08gJHtjb250cmFjdC5wYXJ0bmVyLmNvZGV9YFwiIC8+XG4gIDxkaXZcbiAgICB2LWVsc2UtaWY9XCJjb250cmFjdC5wYXJ0bmVyLmN1cnJlbmN5XCJcbiAgICBkYXRhLXRvb2x0aXA9XCJSZWZpbmVkIFByVW4gaXMgdW5hYmxlIHRvIGZldGNoIGdvdmVybm1lbnQgaW5mb3JtYXRpb24uIENoZWNrIHRoZSBjb250cmFjdCBpbmZvIGZvciBtb3JlIGRldGFpbHMuXCJcbiAgICBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJkb3duXCJcbiAgICA6Y2xhc3M9XCIkc3R5bGUub3ZlcnJpZGVUb29sdGlwU3R5bGVcIj5cbiAgICBQbGFuZXRhcnkgR292ZXJubWVudFxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2U+VW5rbm93bjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5vdmVycmlkZVRvb2x0aXBTdHlsZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiLCJjb250cmFjdCIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCIkc3R5bGUiLCJfb3BlbkJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFVa0IsYUFBQUEsTUFBQSxpQkFBQSxFQUFrQkMsS0FBQUEsUUFBUSxrQkFBMUNDLFlBR1csVUFBQTtBQUFBO1FBSG1DLFNBQU8sTUFBUUQsS0FBQUEsU0FBUyxRQUFRLFdBQVc7QUFBQSxNQUFBO3lCQUN2RixNQUF1RTtBQUFBLFVBQXZFRSxnQkFBdUUsUUFBQTtBQUFBLFlBQWhFLHVCQUFRSCxNQUFBLEVBQUEsRUFBRyxTQUFTQSxNQUFBLFlBQUEsRUFBYSxPQUFPLENBQUE7QUFBQSxVQUFBLG1CQUFNLEdBQVEsR0FBQSxDQUFBO0FBQUEsVUFBVUksZ0JBQUEsTUFDdkVDLGdCQUFHSixLQUFBQSxTQUFTLFFBQVEsSUFBSSxHQUFBLENBQUE7QUFBQSxRQUFBOzs0QkFFTEEsS0FBQUEsU0FBUyxRQUFRLHFCQUF0Q0MsWUFFVyxVQUFBO0FBQUE7UUFGa0MsU0FBTyxNQUFRRCxLQUFBQSxTQUFTLFFBQVEsSUFBSTtBQUFBLE1BQUE7eUJBQy9FLE1BQTJCO0FBQUEsMENBQXhCQSxLQUFBQSxTQUFTLFFBQVEsSUFBSSxHQUFBLENBQUE7QUFBQSxRQUFBOzs0QkFFTEEsS0FBQUEsU0FBUyxRQUFRLHFCQUF0Q0MsWUFBdUYsVUFBQTtBQUFBO1FBQTFDLFNBQU8sTUFBUUQsS0FBQUEsU0FBUyxRQUFRLElBQUk7QUFBQSxNQUFBLDRCQUVwRUEsS0FBQUEsU0FBUyxRQUFRLHlCQUQ5QkssbUJBTU0sT0FBQTtBQUFBO1FBSkosZ0JBQWE7QUFBQSxRQUNiLHlCQUFzQjtBQUFBLFFBQ3JCLE9BQUtDLGVBQUVDLEtBQUFBLE9BQU8sb0JBQW9CO0FBQUEsTUFBQSxHQUFFLDBCQUV2QyxDQUFBLE1BQ0FDLGFBQUFILG1CQUF5QixtQkFBYixTQUFPO0FBQUE7OzsifQ==
