import features from './feature-registry.js';
import { C } from './prun-css.js';
import { t } from './index5.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$4 from './Active.vue.js';
import _sfc_main$3 from './TextInput.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
import { saveUserData } from './user-data-serializer.js';
import _sfc_main$2 from './Commands.vue.js';
import { isEmpty } from './is-empty.js';
import { reactive, ref, unref } from './reactivity.esm-bundler.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  createCommentVNode,
  withCtx,
  createTextVNode,
  createBlock,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ['onClick'];
const changed = reactive({});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FEAT',
  setup(__props) {
    if (userData.settings.mode === void 0) {
      userData.settings.mode = 'BASIC';
    }
    const isFullMode = userData.settings.mode === 'FULL';
    const disabledFeatures = computed(() => new Set(userData.settings.disabled));
    const available = isFullMode ? features.registry : features.registry.filter(x => !x.advanced);
    const advanced = features.registry.filter(x => x.advanced);
    const sorted = available.sort((a, b) => {
      const aDisabled = disabledFeatures.value.has(a.id);
      const bDisabled = disabledFeatures.value.has(b.id);
      if (aDisabled && !bDisabled) {
        return -1;
      }
      if (!aDisabled && bDisabled) {
        return 1;
      }
      return a.id.localeCompare(b.id);
    });
    const searchIndex = /* @__PURE__ */ new Map();
    for (const feature of sorted) {
      searchIndex.set(feature.id, `${feature.id} ${feature.description}`.toLowerCase());
    }
    const searchQuery = ref('');
    const filtered = computed(() => {
      const keywords = searchQuery.value
        .toLowerCase()
        .replaceAll(/\W/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
      if (keywords.length === 0) {
        return sorted;
      }
      return sorted.filter(feature => keywords.some(x => searchIndex.get(feature.id).includes(x)));
    });
    function toggleFeature(id) {
      if (changed[id]) {
        delete changed[id];
      } else {
        changed[id] = true;
      }
      const disabled = userData.settings.disabled;
      if (disabledFeatures.value.has(id)) {
        removeArrayElement(disabled, id);
      } else {
        disabled.push(id);
      }
      void saveUserData();
    }
    function toggleClass(id) {
      return disabledFeatures.value.has(id)
        ? void 0
        : [C.RadioItem.active, C.effects.shadowPrimary];
    }
    async function onReloadClick() {
      await saveUserData();
      window.location.reload();
    }
    async function onChangeModeClick() {
      if (isFullMode) {
        userData.settings.mode = 'BASIC';
      } else {
        userData.settings.mode = 'FULL';
      }
      await saveUserData();
      window.location.reload();
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          createBaseVNode(
            'form',
            {
              class: normalizeClass(_ctx.$style.form),
            },
            [
              createVNode(
                _sfc_main$2,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('feat.changeSet'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: onChangeModeClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(
                              ('t' in _ctx ? _ctx.t : unref(t))(
                                'feat.switchTo',
                                isFullMode ? 'BASIC' : 'FULL',
                              ),
                            ),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
              createVNode(
                _sfc_main$4,
                {
                  class: normalizeClass(_ctx.$style.warningRoot),
                  label: ('t' in _ctx ? _ctx.t : unref(t))('feat.search'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$3,
                      {
                        modelValue: searchQuery.value,
                        'onUpdate:modelValue':
                          _cache[0] || (_cache[0] = $event => (searchQuery.value = $event)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                    !unref(isEmpty)(Object.keys(unref(changed)))
                      ? (openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: 0,
                            primary: '',
                            class: normalizeClass(_ctx.$style.warning),
                            onClick: onReloadClick,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(
                                  ('t' in _ctx ? _ctx.t : unref(t))('feat.restartWarning'),
                                ),
                                1,
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ))
                      : createCommentVNode('', true),
                  ]),
                  _: 1,
                },
                8,
                ['class', 'label'],
              ),
            ],
            2,
          ),
          createVNode(SectionHeader, null, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString(
                  ('t' in _ctx ? _ctx.t : unref(t))('feat.featuresCount', unref(sorted).length),
                ) + ' ',
                1,
              ),
              disabledFeatures.value.size > 0
                ? (openBlock(),
                  createElementBlock(
                    'span',
                    _hoisted_1,
                    toDisplayString(
                      ('t' in _ctx ? _ctx.t : unref(t))(
                        'feat.offCount',
                        disabledFeatures.value.size,
                      ),
                    ),
                    1,
                  ))
                : createCommentVNode('', true),
              !isFullMode
                ? (openBlock(),
                  createElementBlock(
                    'span',
                    _hoisted_2,
                    toDisplayString(
                      ('t' in _ctx ? _ctx.t : unref(t))(
                        'feat.moreAvailable',
                        unref(advanced).length,
                      ),
                    ),
                    1,
                  ))
                : createCommentVNode('', true),
            ]),
            _: 1,
          }),
          createBaseVNode('table', null, [
            createBaseVNode('tbody', null, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(filtered.value, feature => {
                  return (
                    openBlock(),
                    createElementBlock(
                      'tr',
                      {
                        key: feature.id,
                      },
                      [
                        createBaseVNode(
                          'td',
                          {
                            class: normalizeClass(_ctx.$style.row),
                            onClick: $event => toggleFeature(feature.id),
                          },
                          [
                            createBaseVNode(
                              'div',
                              {
                                class: normalizeClass([
                                  ('C' in _ctx ? _ctx.C : unref(C)).RadioItem.indicator,
                                  _ctx.$style.indicator,
                                  toggleClass(feature.id),
                                ]),
                              },
                              null,
                              2,
                            ),
                            createBaseVNode('div', null, [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(_ctx.$style.id),
                                },
                                toDisplayString(feature.id),
                                3,
                              ),
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(_ctx.$style.description),
                                },
                                toDisplayString(
                                  ('t' in _ctx ? _ctx.t : unref(t))('features.' + feature.id) ===
                                    'features.' + feature.id
                                    ? feature.description
                                    : ('t' in _ctx ? _ctx.t : unref(t))('features.' + feature.id),
                                ),
                                3,
                              ),
                            ]),
                          ],
                          10,
                          _hoisted_3,
                        ),
                      ],
                    )
                  );
                }),
                128,
              )),
            ]),
          ]),
          !isFullMode
            ? (openBlock(),
              createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createVNode(SectionHeader, null, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('feat.fullModeFeatures')),
                        1,
                      ),
                    ]),
                    _: 1,
                  }),
                  createBaseVNode('table', null, [
                    createBaseVNode('tbody', null, [
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(unref(advanced), feature => {
                          return (
                            openBlock(),
                            createElementBlock(
                              'tr',
                              {
                                key: feature.id,
                              },
                              [
                                createBaseVNode(
                                  'td',
                                  {
                                    class: normalizeClass([_ctx.$style.row, _ctx.$style.rowFull]),
                                  },
                                  [
                                    createBaseVNode(
                                      'div',
                                      {
                                        class: normalizeClass([
                                          ('C' in _ctx ? _ctx.C : unref(C)).RadioItem.indicator,
                                          ('C' in _ctx ? _ctx.C : unref(C)).RadioItem.disabled,
                                          _ctx.$style.indicator,
                                        ]),
                                      },
                                      null,
                                      2,
                                    ),
                                    createBaseVNode('div', null, [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass(_ctx.$style.id),
                                        },
                                        toDisplayString(feature.id),
                                        3,
                                      ),
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass(_ctx.$style.description),
                                        },
                                        toDisplayString(
                                          ('t' in _ctx ? _ctx.t : unref(t))(
                                            'features.' + feature.id,
                                          ) ===
                                            'features.' + feature.id
                                            ? feature.description
                                            : ('t' in _ctx ? _ctx.t : unref(t))(
                                                'features.' + feature.id,
                                              ),
                                        ),
                                        3,
                                      ),
                                    ]),
                                  ],
                                  2,
                                ),
                              ],
                            )
                          );
                        }),
                        128,
                      )),
                    ]),
                  ]),
                ],
                64,
              ))
            : createCommentVNode('', true),
        ])
      );
    };
  },
});
export { _sfc_main as default };
