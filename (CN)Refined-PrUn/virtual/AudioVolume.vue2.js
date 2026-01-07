import { C } from './prun-css.js';
import RangeInput from './RangeInput.vue.js';
import { percent0 } from './format.js';
import { userData } from './user-data.js';
import { playAudio } from './audio-interceptor.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import {
  defineComponent,
  watch,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AudioVolume',
  setup(__props) {
    const inputText = ref(userData.settings.audioVolume);
    watch(inputText, x => {
      const parsed = typeof x === 'number' ? x : parseFloat(x);
      if (isFinite(parsed)) {
        userData.settings.audioVolume = parsed;
      }
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).RadioItem.value,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeSmall,
                  _ctx.$style.label,
                ]),
              },
              ' Audio Volume: ' +
                toDisplayString(unref(percent0)(unref(userData).settings.audioVolume)),
              3,
            ),
            createVNode(
              RangeInput,
              {
                modelValue: unref(inputText),
                'onUpdate:modelValue':
                  _cache[0] ||
                  (_cache[0] = $event => (isRef(inputText) ? (inputText.value = $event) : null)),
                class: normalizeClass(_ctx.$style.slider),
                min: 0,
                max: 1,
                step: 0.01,
                'on-change': unref(playAudio),
                onClick: unref(playAudio),
              },
              null,
              8,
              ['modelValue', 'class', 'on-change', 'onClick'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
