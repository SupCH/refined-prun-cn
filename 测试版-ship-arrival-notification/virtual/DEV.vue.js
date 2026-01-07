import { prunStyleUpdated, C, mergedPrunStyles } from './prun-css.js';
import { downloadFile } from './util.js';
import DebugButton from './DevButton.vue.js';
import { userData } from './user-data.js';
import api from './js.cookie.js';
import { isRecordingPrunLog, prunLog } from './prun-api-listener.js';
import SectionHeader from './SectionHeader.vue.js';
import { relayUrl } from './relay.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  createBlock,
  withCtx,
  createTextVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { style: { paddingTop: '4px' } };
const _hoisted_2 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DEV',
  setup(__props) {
    function logUserData() {
      console.log(userData);
    }
    const prunDebug = ref(api.get('pu-debug') === 'true');
    function switchPrunDebug() {
      api.set('pu-debug', (!prunDebug.value).toString());
      prunDebug.value = !prunDebug.value;
    }
    function recordPrunLog() {
      isRecordingPrunLog.value = true;
    }
    function stopRecordingPrunLog() {
      isRecordingPrunLog.value = false;
      downloadFile(prunLog.value, 'prun-log.json', true);
      prunLog.value = [];
    }
    function downloadCssDefinition() {
      let definition = `export {};
`;
      definition += `declare global {
`;
      definition += `  interface PrunCssClasses {
`;
      for (const key of Object.keys(C).sort()) {
        definition += `    ${key}: {
`;
        for (const childKey of Object.keys(C[key]).sort()) {
          definition += `      ${childKey}: string;
`;
        }
        definition += `    };
`;
      }
      definition += '  }\n';
      definition += '}\n';
      downloadFile(definition, 'prun-css.types.d.ts', false);
    }
    function downloadPrunStyles() {
      downloadFile(mergedPrunStyles, 'prun.css', false);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createVNode(SectionHeader, null, {
            default: withCtx(() => [
              ...(_cache[1] ||
                (_cache[1] = [
                  createTextVNode(
                    'Warning: Messing with these can lead to unexpected behavior',
                    -1,
                  ),
                ])),
            ]),
            _: 1,
          }),
          createBaseVNode('form', null, [
            createVNode(
              _sfc_main$2,
              { label: 'Relay' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(relayUrl),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event =>
                          isRef(relayUrl) ? (relayUrl.value = $event) : null),
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
          ]),
          !unref(isRecordingPrunLog)
            ? (openBlock(),
              createBlock(
                DebugButton,
                {
                  key: 0,
                  onClick: recordPrunLog,
                },
                {
                  default: withCtx(() => [
                    ...(_cache[2] || (_cache[2] = [createTextVNode('Record PrUn Log', -1)])),
                  ]),
                  _: 1,
                },
              ))
            : (openBlock(),
              createBlock(
                DebugButton,
                {
                  key: 1,
                  onClick: stopRecordingPrunLog,
                },
                {
                  default: withCtx(() => [
                    ...(_cache[3] || (_cache[3] = [createTextVNode('Stop Recording', -1)])),
                  ]),
                  _: 1,
                },
              )),
          createVNode(
            DebugButton,
            { onClick: switchPrunDebug },
            {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(unref(prunDebug) ? 'Disable' : 'Enable') + ' pu-debug ',
                  1,
                ),
              ]),
              _: 1,
            },
          ),
          createVNode(
            DebugButton,
            { onClick: logUserData },
            {
              default: withCtx(() => [
                ...(_cache[4] || (_cache[4] = [createTextVNode('Log User Data', -1)])),
              ]),
              _: 1,
            },
          ),
          createVNode(
            DebugButton,
            { onClick: downloadCssDefinition },
            {
              default: withCtx(() => [
                ...(_cache[5] || (_cache[5] = [createTextVNode('Export prun-css.types.d.ts', -1)])),
              ]),
              _: 1,
            },
          ),
          createVNode(
            DebugButton,
            { onClick: downloadPrunStyles },
            {
              default: withCtx(() => [
                _cache[6] || (_cache[6] = createTextVNode(' Export prun.css ', -1)),
                unref(prunStyleUpdated)
                  ? (openBlock(), createElementBlock('span', _hoisted_2, '(new!)'))
                  : createCommentVNode('', true),
              ]),
              _: 1,
            },
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREVWLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9ERVYvREVWLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCBEZWJ1Z0J1dHRvbiBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9ERVYvRGV2QnV0dG9uLnZ1ZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XG5pbXBvcnQgeyBtZXJnZWRQcnVuU3R5bGVzLCBwcnVuU3R5bGVVcGRhdGVkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3BydW4tY3NzJztcbmltcG9ydCB7IGlzUmVjb3JkaW5nUHJ1bkxvZywgcHJ1bkxvZyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvcHJ1bi1hcGktbGlzdGVuZXInO1xuaW1wb3J0IFNlY3Rpb25IZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlJztcbmltcG9ydCB7IHJlbGF5VXJsIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9yZWxheSc7XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuXG5mdW5jdGlvbiBsb2dVc2VyRGF0YSgpIHtcbiAgY29uc29sZS5sb2codXNlckRhdGEpO1xufVxuXG5jb25zdCBwcnVuRGVidWcgPSByZWYoQ29va2llcy5nZXQoJ3B1LWRlYnVnJykgPT09ICd0cnVlJyk7XG5cbmZ1bmN0aW9uIHN3aXRjaFBydW5EZWJ1ZygpIHtcbiAgQ29va2llcy5zZXQoJ3B1LWRlYnVnJywgKCFwcnVuRGVidWcudmFsdWUpLnRvU3RyaW5nKCkpO1xuICBwcnVuRGVidWcudmFsdWUgPSAhcHJ1bkRlYnVnLnZhbHVlO1xufVxuXG5mdW5jdGlvbiByZWNvcmRQcnVuTG9nKCkge1xuICBpc1JlY29yZGluZ1BydW5Mb2cudmFsdWUgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBzdG9wUmVjb3JkaW5nUHJ1bkxvZygpIHtcbiAgaXNSZWNvcmRpbmdQcnVuTG9nLnZhbHVlID0gZmFsc2U7XG4gIGRvd25sb2FkRmlsZShwcnVuTG9nLnZhbHVlLCAncHJ1bi1sb2cuanNvbicsIHRydWUpO1xuICBwcnVuTG9nLnZhbHVlID0gW107XG59XG5cbmZ1bmN0aW9uIGRvd25sb2FkQ3NzRGVmaW5pdGlvbigpIHtcbiAgbGV0IGRlZmluaXRpb24gPSBgZXhwb3J0IHt9O1xcbmA7XG4gIGRlZmluaXRpb24gKz0gYGRlY2xhcmUgZ2xvYmFsIHtcXG5gO1xuICBkZWZpbml0aW9uICs9IGAgIGludGVyZmFjZSBQcnVuQ3NzQ2xhc3NlcyB7XFxuYDtcbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoQykuc29ydCgpKSB7XG4gICAgZGVmaW5pdGlvbiArPSBgICAgICR7a2V5fToge1xcbmA7XG4gICAgZm9yIChjb25zdCBjaGlsZEtleSBvZiBPYmplY3Qua2V5cyhDW2tleV0pLnNvcnQoKSkge1xuICAgICAgZGVmaW5pdGlvbiArPSBgICAgICAgJHtjaGlsZEtleX06IHN0cmluZztcXG5gO1xuICAgIH1cbiAgICBkZWZpbml0aW9uICs9IGAgICAgfTtcXG5gO1xuICB9XG4gIGRlZmluaXRpb24gKz0gJyAgfVxcbic7XG4gIGRlZmluaXRpb24gKz0gJ31cXG4nO1xuICBkb3dubG9hZEZpbGUoZGVmaW5pdGlvbiwgJ3BydW4tY3NzLnR5cGVzLmQudHMnLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGRvd25sb2FkUHJ1blN0eWxlcygpIHtcbiAgZG93bmxvYWRGaWxlKG1lcmdlZFBydW5TdHlsZXMsICdwcnVuLmNzcycsIGZhbHNlKTtcbiAgaWYgKGltcG9ydC5tZXRhLmVudi5ERVYpIHtcbiAgICB3aW5kb3cub3BlbignaHR0cHM6Ly9naXRodWIuY29tL3JlZmluZWQtcHJ1bi9wcnVuLWNzcy91cGxvYWQvbWFpbicpO1xuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpzdHlsZT1cInsgcGFkZGluZ1RvcDogJzRweCcgfVwiPlxuICAgIDxTZWN0aW9uSGVhZGVyPldhcm5pbmc6IE1lc3Npbmcgd2l0aCB0aGVzZSBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIGJlaGF2aW9yPC9TZWN0aW9uSGVhZGVyPlxuICAgIDxmb3JtPlxuICAgICAgPEFjdGl2ZSBsYWJlbD1cIlJlbGF5XCI+XG4gICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cInJlbGF5VXJsXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgIDwvZm9ybT5cbiAgICA8RGVidWdCdXR0b24gdi1pZj1cIiFpc1JlY29yZGluZ1BydW5Mb2dcIiBAY2xpY2s9XCJyZWNvcmRQcnVuTG9nXCI+UmVjb3JkIFByVW4gTG9nPC9EZWJ1Z0J1dHRvbj5cbiAgICA8RGVidWdCdXR0b24gdi1lbHNlIEBjbGljaz1cInN0b3BSZWNvcmRpbmdQcnVuTG9nXCI+U3RvcCBSZWNvcmRpbmc8L0RlYnVnQnV0dG9uPlxuICAgIDxEZWJ1Z0J1dHRvbiBAY2xpY2s9XCJzd2l0Y2hQcnVuRGVidWdcIj5cbiAgICAgIHt7IHBydW5EZWJ1ZyA/ICdEaXNhYmxlJyA6ICdFbmFibGUnIH19IHB1LWRlYnVnXG4gICAgPC9EZWJ1Z0J1dHRvbj5cbiAgICA8RGVidWdCdXR0b24gQGNsaWNrPVwibG9nVXNlckRhdGFcIj5Mb2cgVXNlciBEYXRhPC9EZWJ1Z0J1dHRvbj5cbiAgICA8RGVidWdCdXR0b24gQGNsaWNrPVwiZG93bmxvYWRDc3NEZWZpbml0aW9uXCI+RXhwb3J0IHBydW4tY3NzLnR5cGVzLmQudHM8L0RlYnVnQnV0dG9uPlxuICAgIDxEZWJ1Z0J1dHRvbiBAY2xpY2s9XCJkb3dubG9hZFBydW5TdHlsZXNcIj5cbiAgICAgIEV4cG9ydCBwcnVuLmNzcyA8c3BhbiB2LWlmPVwicHJ1blN0eWxlVXBkYXRlZFwiPihuZXchKTwvc3Bhbj5cbiAgICA8L0RlYnVnQnV0dG9uPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiQ29va2llcyIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiQWN0aXZlIiwiVGV4dElucHV0IiwiX3VucmVmIiwiX2lzUmVmIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLGFBQUEsY0FBQTtBQUNFLGNBQUEsSUFBQSxRQUFBO0FBQUEsSUFBb0I7QUFHdEIsVUFBQSxZQUFBLElBQUFBLElBQUEsSUFBQSxVQUFBLE1BQUEsTUFBQTtBQUVBLGFBQUEsa0JBQUE7QUFDRUEsVUFBQSxJQUFBLGFBQUEsQ0FBQSxVQUFBLE9BQUEsVUFBQTtBQUNBLGdCQUFBLFFBQUEsQ0FBQSxVQUFBO0FBQUEsSUFBNkI7QUFHL0IsYUFBQSxnQkFBQTtBQUNFLHlCQUFBLFFBQUE7QUFBQSxJQUEyQjtBQUc3QixhQUFBLHVCQUFBO0FBQ0UseUJBQUEsUUFBQTtBQUNBLG1CQUFBLFFBQUEsT0FBQSxpQkFBQSxJQUFBO0FBQ0EsY0FBQSxRQUFBLENBQUE7QUFBQSxJQUFpQjtBQUduQixhQUFBLHdCQUFBO0FBQ0UsVUFBQSxhQUFBO0FBQUE7QUFDQSxvQkFBQTtBQUFBO0FBQ0Esb0JBQUE7QUFBQTtBQUNBLGlCQUFBLE9BQUEsT0FBQSxLQUFBLENBQUEsRUFBQSxRQUFBO0FBQ0Usc0JBQUEsT0FBQSxHQUFBO0FBQUE7QUFDQSxtQkFBQSxZQUFBLE9BQUEsS0FBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBLFFBQUE7QUFDRSx3QkFBQSxTQUFBLFFBQUE7QUFBQTtBQUFBLFFBQStCO0FBRWpDLHNCQUFBO0FBQUE7QUFBQSxNQUFjO0FBRWhCLG9CQUFBO0FBQ0Esb0JBQUE7QUFDQSxtQkFBQSxZQUFBLHVCQUFBLEtBQUE7QUFBQSxJQUFxRDtBQUd2RCxhQUFBLHFCQUFBO0FBQ0UsbUJBQUEsa0JBQUEsWUFBQSxLQUFBO0FBQUEsSUFHQTs7QUFLQSxhQUFBQyxVQUFBLEdBQUFDLG1CQUFBLE9BQUEsWUFBQTtBQUFBLFFBaUJNQyxZQUFBLGVBQUEsTUFBQTtBQUFBLFVBaEJzRixTQUFBQyxRQUFBLE1BQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsWUFBaEJDLGdCQUFBLCtEQUFBLEVBQUE7QUFBQSxVQUFBLEVBQUEsQ0FBQTtBQUFBOzs7VUFLbkVGLFlBQUFHLGFBQUEsRUFBQSxPQUFBLFFBQUEsR0FBQTtBQUFBLFlBSGdCLFNBQUFGLFFBQUEsTUFBQTtBQUFBLGNBQ2FELFlBQUFJLGFBQUE7QUFBQSxnQkFBQSxZQUFBQyxNQUFBLFFBQUE7QUFBQSxnQkFBWix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFDLE1BQUEsUUFBQSxJQUFBLFNBQUEsUUFBQSxTQUFBO0FBQUEsY0FBUSxHQUFBLE1BQUEsR0FBQSxDQUFBLFlBQUEsQ0FBQTtBQUFBOzs7OztVQUc0RCxLQUFBO0FBQUE7UUFBNUMsR0FBQTtBQUFBO1lBQThCSixnQkFBQSxtQkFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7VUFDQSxLQUFBO0FBQUE7UUFBbEQsR0FBQTtBQUFBO1lBQW9DQSxnQkFBQSxrQkFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7O1VBQzVCLFNBQUFELFFBQUEsTUFBQTtBQUFBLFlBQ0lDLGdCQUFBSyxnQkFBQUYsTUFBQSxTQUFBLElBQUEsWUFBQSxRQUFBLElBQUEsY0FBQSxDQUFBO0FBQUEsVUFDeEMsQ0FBQTtBQUFBOzs7VUFDZ0MsU0FBQUosUUFBQSxNQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLFlBQWVDLGdCQUFBLGlCQUFBLEVBQUE7QUFBQSxVQUFBLEVBQUEsQ0FBQTtBQUFBOzs7VUFDTCxTQUFBRCxRQUFBLE1BQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsWUFBNEJDLGdCQUFBLDhCQUFBLEVBQUE7QUFBQSxVQUFBLEVBQUEsQ0FBQTtBQUFBOzs7VUFDL0IsU0FBQUQsUUFBQSxNQUFBO0FBQUEsWUFDckIsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFDLGdCQUFBLHFCQUFBLEVBQUE7QUFBQSxZQUFBRyxNQUFBLGdCQUFBLEtBQUFQLFVBQUEsR0FBQUMsbUJBQUEsUUFBQSxZQUFBLFFBQUEsS0FBQVMsbUJBQUEsSUFBQSxJQUFBO0FBQUE7Ozs7Ozs7In0=
