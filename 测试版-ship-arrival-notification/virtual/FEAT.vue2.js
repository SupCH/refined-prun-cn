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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkVBVC52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1NFVC9GRUFULnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuY29uc3QgY2hhbmdlZCA9IHJlYWN0aXZlKHt9KTtcbjwvc2NyaXB0PlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFNlY3Rpb25IZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlJztcbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEnO1xuaW1wb3J0IHJlbW92ZUFycmF5RWxlbWVudCBmcm9tICdAc3JjL3V0aWxzL3JlbW92ZS1hcnJheS1lbGVtZW50JztcbmltcG9ydCB7IHNhdmVVc2VyRGF0YSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvc3RvcmFnZS91c2VyLWRhdGEtc2VyaWFsaXplcic7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5cbmlmICh1c2VyRGF0YS5zZXR0aW5ncy5tb2RlID09PSB1bmRlZmluZWQpIHtcbiAgdXNlckRhdGEuc2V0dGluZ3MubW9kZSA9ICdCQVNJQyc7XG59XG5cbmNvbnN0IGlzRnVsbE1vZGUgPSB1c2VyRGF0YS5zZXR0aW5ncy5tb2RlID09PSAnRlVMTCc7XG5cbmNvbnN0IGRpc2FibGVkRmVhdHVyZXMgPSBjb21wdXRlZCgoKSA9PiBuZXcgU2V0KHVzZXJEYXRhLnNldHRpbmdzLmRpc2FibGVkKSk7XG5cbmNvbnN0IGF2YWlsYWJsZSA9IGlzRnVsbE1vZGUgPyBmZWF0dXJlcy5yZWdpc3RyeSA6IGZlYXR1cmVzLnJlZ2lzdHJ5LmZpbHRlcih4ID0+ICF4LmFkdmFuY2VkKTtcblxuY29uc3QgYWR2YW5jZWQgPSBmZWF0dXJlcy5yZWdpc3RyeS5maWx0ZXIoeCA9PiB4LmFkdmFuY2VkKTtcblxuY29uc3Qgc29ydGVkID0gYXZhaWxhYmxlLnNvcnQoKGEsIGIpID0+IHtcbiAgY29uc3QgYURpc2FibGVkID0gZGlzYWJsZWRGZWF0dXJlcy52YWx1ZS5oYXMoYS5pZCk7XG4gIGNvbnN0IGJEaXNhYmxlZCA9IGRpc2FibGVkRmVhdHVyZXMudmFsdWUuaGFzKGIuaWQpO1xuICBpZiAoYURpc2FibGVkICYmICFiRGlzYWJsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgaWYgKCFhRGlzYWJsZWQgJiYgYkRpc2FibGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIGEuaWQubG9jYWxlQ29tcGFyZShiLmlkKTtcbn0pO1xuXG5jb25zdCBzZWFyY2hJbmRleCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5mb3IgKGNvbnN0IGZlYXR1cmUgb2Ygc29ydGVkKSB7XG4gIHNlYXJjaEluZGV4LnNldChmZWF0dXJlLmlkLCBgJHtmZWF0dXJlLmlkfSAke2ZlYXR1cmUuZGVzY3JpcHRpb259YC50b0xvd2VyQ2FzZSgpKTtcbn1cblxuY29uc3Qgc2VhcmNoUXVlcnkgPSByZWYoJycpO1xuXG5jb25zdCBmaWx0ZXJlZCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3Qga2V5d29yZHMgPSBzZWFyY2hRdWVyeS52YWx1ZVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2VBbGwoL1xcVy9nLCAnICcpXG4gICAgLnNwbGl0KC9cXHMrLylcbiAgICAuZmlsdGVyKEJvb2xlYW4pOyAvLyBJZ25vcmUgZW1wdHkgc3RyaW5nc1xuICBpZiAoa2V5d29yZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHNvcnRlZDtcbiAgfVxuICByZXR1cm4gc29ydGVkLmZpbHRlcihmZWF0dXJlID0+IGtleXdvcmRzLnNvbWUoeCA9PiBzZWFyY2hJbmRleC5nZXQoZmVhdHVyZS5pZCkhLmluY2x1ZGVzKHgpKSk7XG59KTtcblxuZnVuY3Rpb24gdG9nZ2xlRmVhdHVyZShpZDogc3RyaW5nKSB7XG4gIGlmIChjaGFuZ2VkW2lkXSkge1xuICAgIGRlbGV0ZSBjaGFuZ2VkW2lkXTtcbiAgfSBlbHNlIHtcbiAgICBjaGFuZ2VkW2lkXSA9IHRydWU7XG4gIH1cbiAgY29uc3QgZGlzYWJsZWQgPSB1c2VyRGF0YS5zZXR0aW5ncy5kaXNhYmxlZDtcbiAgaWYgKGRpc2FibGVkRmVhdHVyZXMudmFsdWUuaGFzKGlkKSkge1xuICAgIHJlbW92ZUFycmF5RWxlbWVudChkaXNhYmxlZCwgaWQpO1xuICB9IGVsc2Uge1xuICAgIGRpc2FibGVkLnB1c2goaWQpO1xuICB9XG4gIHZvaWQgc2F2ZVVzZXJEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGlkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGRpc2FibGVkRmVhdHVyZXMudmFsdWUuaGFzKGlkKSA/IHVuZGVmaW5lZCA6IFtDLlJhZGlvSXRlbS5hY3RpdmUsIEMuZWZmZWN0cy5zaGFkb3dQcmltYXJ5XTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb25SZWxvYWRDbGljaygpIHtcbiAgYXdhaXQgc2F2ZVVzZXJEYXRhKCk7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb25DaGFuZ2VNb2RlQ2xpY2soKSB7XG4gIGlmIChpc0Z1bGxNb2RlKSB7XG4gICAgdXNlckRhdGEuc2V0dGluZ3MubW9kZSA9ICdCQVNJQyc7XG4gIH0gZWxzZSB7XG4gICAgdXNlckRhdGEuc2V0dGluZ3MubW9kZSA9ICdGVUxMJztcbiAgfVxuICBhd2FpdCBzYXZlVXNlckRhdGEoKTtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8Zm9ybSA6Y2xhc3M9XCIkc3R5bGUuZm9ybVwiPlxuICAgICAgPENvbW1hbmRzIDpsYWJlbD1cInQoJ2ZlYXQuY2hhbmdlU2V0JylcIj5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvbkNoYW5nZU1vZGVDbGlja1wiPlxuICAgICAgICAgIHt7IHQoJ2ZlYXQuc3dpdGNoVG8nLCBpc0Z1bGxNb2RlID8gJ0JBU0lDJyA6ICdGVUxMJykgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgPC9Db21tYW5kcz5cbiAgICAgIDxBY3RpdmUgOmNsYXNzPVwiJHN0eWxlLndhcm5pbmdSb290XCIgOmxhYmVsPVwidCgnZmVhdC5zZWFyY2gnKVwiPlxuICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJzZWFyY2hRdWVyeVwiIC8+XG4gICAgICAgIDxQcnVuQnV0dG9uXG4gICAgICAgICAgdi1pZj1cIiFpc0VtcHR5KE9iamVjdC5rZXlzKGNoYW5nZWQpKVwiXG4gICAgICAgICAgcHJpbWFyeVxuICAgICAgICAgIDpjbGFzcz1cIiRzdHlsZS53YXJuaW5nXCJcbiAgICAgICAgICBAY2xpY2s9XCJvblJlbG9hZENsaWNrXCI+XG4gICAgICAgICAge3sgdCgnZmVhdC5yZXN0YXJ0V2FybmluZycpIH19XG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvQWN0aXZlPlxuICAgIDwvZm9ybT5cbiAgICA8U2VjdGlvbkhlYWRlcj5cbiAgICAgIHt7IHQoJ2ZlYXQuZmVhdHVyZXNDb3VudCcsIHNvcnRlZC5sZW5ndGgpIH19XG4gICAgICA8c3BhbiB2LWlmPVwiZGlzYWJsZWRGZWF0dXJlcy5zaXplID4gMFwiPnt7IHQoJ2ZlYXQub2ZmQ291bnQnLCBkaXNhYmxlZEZlYXR1cmVzLnNpemUpIH19IDwvc3Bhbj5cbiAgICAgIDxzcGFuIHYtaWY9XCIhaXNGdWxsTW9kZVwiPnt7IHQoJ2ZlYXQubW9yZUF2YWlsYWJsZScsIGFkdmFuY2VkLmxlbmd0aCkgfX08L3NwYW4+XG4gICAgPC9TZWN0aW9uSGVhZGVyPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyIHYtZm9yPVwiZmVhdHVyZSBpbiBmaWx0ZXJlZFwiIDprZXk9XCJmZWF0dXJlLmlkXCI+XG4gICAgICAgICAgPHRkIDpjbGFzcz1cIiRzdHlsZS5yb3dcIiBAY2xpY2s9XCJ0b2dnbGVGZWF0dXJlKGZlYXR1cmUuaWQpXCI+XG4gICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIltDLlJhZGlvSXRlbS5pbmRpY2F0b3IsICRzdHlsZS5pbmRpY2F0b3IsIHRvZ2dsZUNsYXNzKGZlYXR1cmUuaWQpXVwiIC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5pZFwiPnt7IGZlYXR1cmUuaWQgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuZGVzY3JpcHRpb25cIj57e1xuICAgICAgICAgICAgICAgIHQoJ2ZlYXR1cmVzLicgKyBmZWF0dXJlLmlkKSA9PT0gJ2ZlYXR1cmVzLicgKyBmZWF0dXJlLmlkXG4gICAgICAgICAgICAgICAgICA/IGZlYXR1cmUuZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgIDogdCgnZmVhdHVyZXMuJyArIGZlYXR1cmUuaWQpXG4gICAgICAgICAgICAgIH19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWlzRnVsbE1vZGVcIj5cbiAgICAgIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ2ZlYXQuZnVsbE1vZGVGZWF0dXJlcycpIH19PC9TZWN0aW9uSGVhZGVyPlxuICAgICAgPHRhYmxlPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgPHRyIHYtZm9yPVwiZmVhdHVyZSBpbiBhZHZhbmNlZFwiIDprZXk9XCJmZWF0dXJlLmlkXCI+XG4gICAgICAgICAgICA8dGQgOmNsYXNzPVwiWyRzdHlsZS5yb3csICRzdHlsZS5yb3dGdWxsXVwiPlxuICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIltDLlJhZGlvSXRlbS5pbmRpY2F0b3IsIEMuUmFkaW9JdGVtLmRpc2FibGVkLCAkc3R5bGUuaW5kaWNhdG9yXVwiIC8+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuaWRcIj57eyBmZWF0dXJlLmlkIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuZGVzY3JpcHRpb25cIj57e1xuICAgICAgICAgICAgICAgICAgdCgnZmVhdHVyZXMuJyArIGZlYXR1cmUuaWQpID09PSAnZmVhdHVyZXMuJyArIGZlYXR1cmUuaWRcbiAgICAgICAgICAgICAgICAgICAgPyBmZWF0dXJlLmRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICAgIDogdCgnZmVhdHVyZXMuJyArIGZlYXR1cmUuaWQpXG4gICAgICAgICAgICAgICAgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5mb3JtIHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyMjIyO1xuICB6LWluZGV4OiAxO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xufVxuXG4ud2FybmluZ1Jvb3Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5yb3dGdWxsIHtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmluZGljYXRvciB7XG4gIGhlaWdodDogMTJweDtcbn1cblxuLmlkIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbn1cblxuLmRlc2NyaXB0aW9uIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogIzg4ODtcbn1cblxuLndhcm5pbmcge1xuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0xMDAlO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwidCIsIl9jcmVhdGVWTm9kZSIsIlBydW5CdXR0b24iLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIlRleHRJbnB1dCIsIl93aXRoQ3R4IiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIkMiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE1BQUEsVUFBQSxTQUFBLEVBQUE7Ozs7QUFlQSxRQUFBLFNBQUEsU0FBQSxTQUFBLFFBQUE7QUFDRSxlQUFBLFNBQUEsT0FBQTtBQUFBLElBQXlCO0FBRzNCLFVBQUEsYUFBQSxTQUFBLFNBQUEsU0FBQTtBQUVBLFVBQUEsbUJBQUEsU0FBQSxNQUFBLElBQUEsSUFBQSxTQUFBLFNBQUEsUUFBQSxDQUFBO0FBRUEsVUFBQSxZQUFBLGFBQUEsU0FBQSxXQUFBLFNBQUEsU0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsUUFBQTtBQUVBLFVBQUEsV0FBQSxTQUFBLFNBQUEs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
