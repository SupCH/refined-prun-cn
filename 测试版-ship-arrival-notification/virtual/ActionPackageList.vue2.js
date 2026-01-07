import { t } from './index5.js';
import _sfc_main$2 from './ActionBar.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { showBuffer } from './buffers.js';
import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import _sfc_main$3 from './CreateActionPackage.vue.js';
import _sfc_main$4 from './ImportActionPackage.vue.js';
import Quickstart from './Quickstart.vue.js';
import { userData } from './user-data.js';
import PrunLink from './PrunLink.vue.js';
import removeArrayElement from './remove-array-element.js';
import { objectId } from './object-id.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createCommentVNode,
  createBlock,
  createTextVNode,
  withDirectives,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { colspan: '5' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ActionPackageList',
  setup(__props) {
    const actionPackages = computed(() => userData.actionPackages);
    const showQuickstart = computed(() => userData.actionPackages.length === 0);
    const dragging = ref(false);
    const draggableOptions = {
      animation: 150,
      handle: `.${grip.grip}`,
      onStart: () => (dragging.value = true),
      onEnd: () => (dragging.value = false),
    };
    function onQuickstartClick(ev) {
      showTileOverlay(ev, Quickstart);
    }
    function onCreateClick(ev) {
      showTileOverlay(ev, _sfc_main$3, {
        onCreate: name => {
          userData.actionPackages.push({
            global: { name },
            groups: [],
            actions: [],
          });
          showBuffer('XIT ACT_EDIT_' + name.split(' ').join('_'));
        },
      });
    }
    function onImportClick(ev) {
      showTileOverlay(ev, _sfc_main$4, {
        onImport: json => {
          const existing = userData.actionPackages.find(x => x.global.name === json.global.name);
          if (existing) {
            const index = userData.actionPackages.indexOf(existing);
            userData.actionPackages[index] = json;
          } else {
            userData.actionPackages.push(json);
          }
        },
      });
    }
    function onDeleteClick(ev, pkg) {
      showConfirmationOverlay(ev, () => removeArrayElement(userData.actionPackages, pkg), {
        message: t('act.deleteConfirm', pkg.global.name),
        confirmLabel: t('act.delete'),
      });
    }
    function friendlyName(pkg) {
      return pkg.global.name.split('_').join(' ');
    }
    function paramName(pkg) {
      return pkg.global.name.split(' ').join('_');
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(_sfc_main$2, null, {
              default: withCtx(() => [
                unref(showQuickstart)
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: normalizeClass(_ctx.$style.quickstartLabel),
                      },
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.quickstartHelp')),
                      3,
                    ))
                  : createCommentVNode('', true),
                unref(showQuickstart)
                  ? (openBlock(), createElementBlock('div', _hoisted_1, '→'))
                  : createCommentVNode('', true),
                unref(showQuickstart)
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$1,
                      {
                        key: 2,
                        primary: '',
                        onClick: onQuickstartClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.quickstart')),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                    ))
                  : createCommentVNode('', true),
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    onClick: onCreateClick,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.createPackage')),
                        1,
                      ),
                    ]),
                    _: 1,
                  },
                ),
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    onClick: onImportClick,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.import')),
                        1,
                      ),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode(
                    'th',
                    {
                      class: normalizeClass(_ctx.$style.dragHeaderCell),
                    },
                    null,
                    2,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.name')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.execute')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.edit')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.delete')),
                    1,
                  ),
                ]),
              ]),
              unref(userData).actionPackages.length === 0
                ? (openBlock(),
                  createElementBlock('tbody', _hoisted_2, [
                    createBaseVNode('tr', null, [
                      createBaseVNode(
                        'td',
                        _hoisted_3,
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.noPackages')),
                        1,
                      ),
                    ]),
                  ]))
                : withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'tbody',
                      {
                        key: 1,
                        class: normalizeClass(unref(dragging) ? _ctx.$style.dragging : null),
                      },
                      [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(actionPackages), pkg => {
                            return (
                              openBlock(),
                              createElementBlock(
                                'tr',
                                {
                                  key: unref(objectId)(pkg),
                                },
                                [
                                  createBaseVNode(
                                    'td',
                                    {
                                      class: normalizeClass(_ctx.$style.dragCell),
                                    },
                                    [
                                      createBaseVNode(
                                        'span',
                                        {
                                          class: normalizeClass([
                                            unref(grip).grip,
                                            unref(fa).solid,
                                            _ctx.$style.grip,
                                          ]),
                                        },
                                        toDisplayString(''),
                                        2,
                                      ),
                                    ],
                                    2,
                                  ),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      PrunLink,
                                      {
                                        inline: '',
                                        command: `XIT ACT_${paramName(pkg)}`,
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(friendlyName(pkg)), 1),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['command'],
                                    ),
                                  ]),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$1,
                                      {
                                        primary: '',
                                        onClick: $event =>
                                          unref(showBuffer)(`XIT ACT_${paramName(pkg)}`),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('act.execute'),
                                            ),
                                            1,
                                          ),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['onClick'],
                                    ),
                                  ]),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$1,
                                      {
                                        primary: '',
                                        onClick: $event =>
                                          unref(showBuffer)(`XIT ACT_EDIT_${paramName(pkg)}`),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('act.edit'),
                                            ),
                                            1,
                                          ),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['onClick'],
                                    ),
                                  ]),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$1,
                                      {
                                        dark: '',
                                        inline: '',
                                        onClick: $event => onDeleteClick($event, pkg),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('act.delete'),
                                            ),
                                            1,
                                          ),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['onClick'],
                                    ),
                                  ]),
                                ],
                              )
                            );
                          }),
                          128,
                        )),
                      ],
                      2,
                    )),
                    [[unref(so), [unref(actionPackages), draggableOptions]]],
                  ),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uUGFja2FnZUxpc3QudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvQWN0aW9uUGFja2FnZUxpc3QudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9BY3Rpb25CYXIudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHsgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXksIHNob3dUaWxlT3ZlcmxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS90aWxlLW92ZXJsYXknO1xuaW1wb3J0IENyZWF0ZUFjdGlvblBhY2thZ2UgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL0NyZWF0ZUFjdGlvblBhY2thZ2UudnVlJztcbmltcG9ydCBJbXBvcnRBY3Rpb25QYWNrYWdlIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9JbXBvcnRBY3Rpb25QYWNrYWdlLnZ1ZSc7XG5pbXBvcnQgUXVpY2tzdGFydCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvUXVpY2tzdGFydC52dWUnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgUHJ1bkxpbmsgZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5MaW5rLnZ1ZSc7XG5pbXBvcnQgcmVtb3ZlQXJyYXlFbGVtZW50IGZyb20gJ0BzcmMvdXRpbHMvcmVtb3ZlLWFycmF5LWVsZW1lbnQnO1xuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5pbXBvcnQgeyB2RHJhZ2dhYmxlIH0gZnJvbSAndnVlLWRyYWdnYWJsZS1wbHVzJztcbmltcG9ydCBncmlwIGZyb20gJ0BzcmMvdXRpbHMvZ3JpcC5tb2R1bGUuY3NzJztcbmltcG9ydCBmYSBmcm9tICdAc3JjL3V0aWxzL2ZvbnQtYXdlc29tZS5tb2R1bGUuY3NzJztcblxuY29uc3QgYWN0aW9uUGFja2FnZXMgPSBjb21wdXRlZCgoKSA9PiB1c2VyRGF0YS5hY3Rpb25QYWNrYWdlcyk7XG5jb25zdCBzaG93UXVpY2tzdGFydCA9IGNvbXB1dGVkKCgpID0+IHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzLmxlbmd0aCA9PT0gMCk7XG5cbmNvbnN0IGRyYWdnaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGRyYWdnYWJsZU9wdGlvbnMgPSB7XG4gIGFuaW1hdGlvbjogMTUwLFxuICBoYW5kbGU6IGAuJHtncmlwLmdyaXB9YCxcbiAgb25TdGFydDogKCkgPT4gKGRyYWdnaW5nLnZhbHVlID0gdHJ1ZSksXG4gIG9uRW5kOiAoKSA9PiAoZHJhZ2dpbmcudmFsdWUgPSBmYWxzZSksXG59O1xuXG5mdW5jdGlvbiBvblF1aWNrc3RhcnRDbGljayhldjogRXZlbnQpIHtcbiAgc2hvd1RpbGVPdmVybGF5KGV2LCBRdWlja3N0YXJ0KTtcbn1cblxuZnVuY3Rpb24gb25DcmVhdGVDbGljayhldjogRXZlbnQpIHtcbiAgc2hvd1RpbGVPdmVybGF5KGV2LCBDcmVhdGVBY3Rpb25QYWNrYWdlLCB7XG4gICAgb25DcmVhdGU6IG5hbWUgPT4ge1xuICAgICAgdXNlckRhdGEuYWN0aW9uUGFja2FnZXMucHVzaCh7XG4gICAgICAgIGdsb2JhbDogeyBuYW1lIH0sXG4gICAgICAgIGdyb3VwczogW10sXG4gICAgICAgIGFjdGlvbnM6IFtdLFxuICAgICAgfSk7XG4gICAgICBzaG93QnVmZmVyKCdYSVQgQUNUX0VESVRfJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCdfJykpO1xuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbkltcG9ydENsaWNrKGV2OiBFdmVudCkge1xuICBzaG93VGlsZU92ZXJsYXkoZXYsIEltcG9ydEFjdGlvblBhY2thZ2UsIHtcbiAgICBvbkltcG9ydDoganNvbiA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzLmZpbmQoeCA9PiB4Lmdsb2JhbC5uYW1lID09PSBqc29uLmdsb2JhbC5uYW1lKTtcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHVzZXJEYXRhLmFjdGlvblBhY2thZ2VzLmluZGV4T2YoZXhpc3RpbmcpO1xuICAgICAgICB1c2VyRGF0YS5hY3Rpb25QYWNrYWdlc1tpbmRleF0gPSBqc29uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXNlckRhdGEuYWN0aW9uUGFja2FnZXMucHVzaChqc29uKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gb25EZWxldGVDbGljayhldjogRXZlbnQsIHBrZzogVXNlckRhdGEuQWN0aW9uUGFja2FnZURhdGEpIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoZXYsICgpID0+IHJlbW92ZUFycmF5RWxlbWVudCh1c2VyRGF0YS5hY3Rpb25QYWNrYWdlcywgcGtnKSwge1xuICAgIG1lc3NhZ2U6IHQoJ2FjdC5kZWxldGVDb25maXJtJywgcGtnLmdsb2JhbC5uYW1lKSxcbiAgICBjb25maXJtTGFiZWw6IHQoJ2FjdC5kZWxldGUnKSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZyaWVuZGx5TmFtZShwa2c6IFVzZXJEYXRhLkFjdGlvblBhY2thZ2VEYXRhKSB7XG4gIHJldHVybiBwa2cuZ2xvYmFsLm5hbWUuc3BsaXQoJ18nKS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHBhcmFtTmFtZShwa2c6IFVzZXJEYXRhLkFjdGlvblBhY2thZ2VEYXRhKSB7XG4gIHJldHVybiBwa2cuZ2xvYmFsLm5hbWUuc3BsaXQoJyAnKS5qb2luKCdfJyk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QWN0aW9uQmFyPlxuICAgIDxkaXYgdi1pZj1cInNob3dRdWlja3N0YXJ0XCIgOmNsYXNzPVwiJHN0eWxlLnF1aWNrc3RhcnRMYWJlbFwiPlxuICAgICAge3sgdCgnYWN0LnF1aWNrc3RhcnRIZWxwJykgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHYtaWY9XCJzaG93UXVpY2tzdGFydFwiPuKGkjwvZGl2PlxuICAgIDxQcnVuQnV0dG9uIHYtaWY9XCJzaG93UXVpY2tzdGFydFwiIHByaW1hcnkgQGNsaWNrPVwib25RdWlja3N0YXJ0Q2xpY2tcIj57e1xuICAgICAgdCgnYWN0LnF1aWNrc3RhcnQnKVxuICAgIH19PC9QcnVuQnV0dG9uPlxuICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25DcmVhdGVDbGlja1wiPnt7IHQoJ2FjdC5jcmVhdGVQYWNrYWdlJykgfX08L1BydW5CdXR0b24+XG4gICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvbkltcG9ydENsaWNrXCI+e3sgdCgnYWN0LmltcG9ydCcpIH19PC9QcnVuQnV0dG9uPlxuICA8L0FjdGlvbkJhcj5cbiAgPHRhYmxlPlxuICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoIDpjbGFzcz1cIiRzdHlsZS5kcmFnSGVhZGVyQ2VsbFwiPjwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdhY3QubmFtZScpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2FjdC5leGVjdXRlJykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgnYWN0LmVkaXQnKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdhY3QuZGVsZXRlJykgfX08L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keSB2LWlmPVwidXNlckRhdGEuYWN0aW9uUGFja2FnZXMubGVuZ3RoID09PSAwXCI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZCBjb2xzcGFuPVwiNVwiPnt7IHQoJ2FjdC5ub1BhY2thZ2VzJykgfX08L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICAgIDx0Ym9keVxuICAgICAgdi1lbHNlXG4gICAgICB2LWRyYWdnYWJsZT1cIlthY3Rpb25QYWNrYWdlcywgZHJhZ2dhYmxlT3B0aW9uc11cIlxuICAgICAgOmNsYXNzPVwiZHJhZ2dpbmcgPyAkc3R5bGUuZHJhZ2dpbmcgOiBudWxsXCI+XG4gICAgICA8dHIgdi1mb3I9XCJwa2cgaW4gYWN0aW9uUGFja2FnZXNcIiA6a2V5PVwib2JqZWN0SWQocGtnKVwiPlxuICAgICAgICA8dGQgOmNsYXNzPVwiJHN0eWxlLmRyYWdDZWxsXCI+XG4gICAgICAgICAgPHNwYW4gOmNsYXNzPVwiW2dyaXAuZ3JpcCwgZmEuc29saWQsICRzdHlsZS5ncmlwXVwiPlxuICAgICAgICAgICAge3sgJ1xcdWY1OGUnIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5MaW5rIGlubGluZSA6Y29tbWFuZD1cImBYSVQgQUNUXyR7cGFyYW1OYW1lKHBrZyl9YFwiPlxuICAgICAgICAgICAge3sgZnJpZW5kbHlOYW1lKHBrZykgfX1cbiAgICAgICAgICA8L1BydW5MaW5rPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJzaG93QnVmZmVyKGBYSVQgQUNUXyR7cGFyYW1OYW1lKHBrZyl9YClcIj5cbiAgICAgICAgICAgIHt7IHQoJ2FjdC5leGVjdXRlJykgfX1cbiAgICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cInNob3dCdWZmZXIoYFhJVCBBQ1RfRURJVF8ke3BhcmFtTmFtZShwa2cpfWApXCI+XG4gICAgICAgICAgICB7eyB0KCdhY3QuZWRpdCcpIH19XG4gICAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5CdXR0b24gZGFyayBpbmxpbmUgQGNsaWNrPVwib25EZWxldGVDbGljaygkZXZlbnQsIHBrZylcIj57e1xuICAgICAgICAgICAgdCgnYWN0LmRlbGV0ZScpXG4gICAgICAgICAgfX08L1BydW5CdXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLnF1aWNrc3RhcnRMYWJlbCB7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbi5kcmFnSGVhZGVyQ2VsbCB7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5kcmFnQ2VsbCB7XG4gIHdpZHRoOiAxNHB4O1xuICBwYWRkaW5nOiAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5ncmlwIHtcbiAgY3Vyc29yOiBtb3ZlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1pbi1vdXQ7XG4gIG9wYWNpdHk6IDA7XG59XG5cbnRyOmhvdmVyIC5ncmlwIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLmRyYWdnaW5nIHRkIC5ncmlwIHtcbiAgb3BhY2l0eTogMDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiQ3JlYXRlQWN0aW9uUGFja2FnZSIsIkltcG9ydEFjdGlvblBhY2thZ2UiLCJfd2l0aEN0eCIsIl91bnJlZiIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyIsInQiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVWTm9kZSIsIlBydW5CdXR0b24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxVQUFBLGlCQUFBLFNBQUEsTUFBQSxTQUFBLGNBQUE7QUFDQSxVQUFBLGlCQUFBLFNBQUEsTUFBQSxTQUFBLGVBQUEsV0FBQSxDQUFBO0FBRUEsVUFBQSxXQUFBLElBQUEsS0FBQTtBQUNBLFVBQUEsbUJBQUE7QUFBQSxNQUF5QixXQUFBO0FBQUEsTUFDWixRQUFBLElBQUEsS0FBQSxJQUFBO0FBQUEsTUFDVSxTQUFBLE1BQUEsU0FBQSxRQUFBO0FBQUEsTUFDWSxPQUFBLE1BQUEsU0FBQSxRQUFBO0FBQUEsSUFDRjtBQUdqQyxhQUFBLGtCQUFBLElBQUE7QUFDRSxzQkFBQSxJQUFBLFVBQUE7QUFBQSxJQUE4QjtBQUdoQyxhQUFBLGNBQUEsSUFBQTtBQUNFLHNCQUFBLElBQUFBLGFBQUE7QUFBQSxRQUF5QyxVQUFBLENBQUEsU0FBQTtBQUVyQyxtQkFBQSxlQUFBLEtBQUE7QUFBQSxZQUE2QixRQUFBLEVBQUEsS0FBQTtBQUFBLFlBQ1osUUFBQSxDQUFBO0FBQUEsWUFDTixTQUFBLENBQUE7QUFBQSxVQUNDLENBQUE7QUFFWixxQkFBQSxrQkFBQSxLQUFBLE1BQUEsR0FBQSxFQUFBLEtBQUEsR0FBQSxDQUFBO0FBQUEsUUFBc0Q7QUFBQSxNQUN4RCxDQUFBO0FBQUEsSUFDRDtBQUdILGFBQUEsY0FBQSxJQUFBO0FBQ0Usc0JBQUEsSUFBQUMsYUFBQTtBQUFBLFFBQXlDLFVBQUEsQ0FBQSxTQUFBO0FBRXJDLGdCQUFBLFdBQUEsU0FBQSxlQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxTQUFBLEtBQUEsT0FBQSxJQUFBO0FBQ0EsY0FBQSxVQUFBO0FBQ0Usa0JBQUEsUUFBQSxTQUFBLGVBQUEsUUFBQSxRQUFBO0FBQ0EscUJBQUEsZUFBQSxLQUFBLElBQUE7QUFBQSxVQUFpQyxPQUFBO0FBRWpDLHFCQUFBLGVBQUEsS0FBQSxJQUFBO0FBQUEsVUFBaUM7QUFBQSxRQUNuQztBQUFBLE1BQ0YsQ0FBQTtBQUFBLElBQ0Q7QUFHSCxhQUFBLGNBQUEsSUFBQSxLQUFBO0FBQ0UsOEJBQUEsSUFBQSxNQUFBLG1CQUFBLFNBQUEsZ0JBQUEsR0FBQSxHQUFBO0FBQUEsUUFBb0YsU0FBQSxFQUFBLHFCQUFBLElBQUEsT0FBQSxJQUFBO0FBQUEsUUFDbkMsY0FBQSxFQUFBLFlBQUE7QUFBQSxNQUNuQixDQUFBO0FBQUEsSUFDN0I7QUFHSCxhQUFBLGFBQUEsS0FBQTtBQUNFLGFBQUEsSUFBQSxPQUFBLEtBQUEsTUFBQSxHQUFBLEVBQUEsS0FBQSxHQUFBO0FBQUEsSUFBMEM7QUFHNUMsYUFBQSxVQUFBLEtBQUE7QUFDRSxhQUFBLElBQUEsT0FBQSxLQUFBLE1BQUEsR0FBQSxFQUFBLEtBQUEsR0FBQTtBQUFBLElBQTBDOzs7O1VBZTlCLFNBQUFDLFFBQUEsTUFBQTtBQUFBLFlBUEpDLE1BQUEsY0FBQSxLQUFBQyxVQUFBLEdBQUFDLG1CQUFBLE9BQUE7QUFBQSxjQUFBLEtBQUE7QUFBQTtZQUZtRCxHQUFBQyxpQkFDcERDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLG9CQUFBQSxDQUFBQSxHQUFBQSxDQUFBQSxLQUFBQSxtQkFBQUEsSUFBQUEsSUFBQUE7QUFBQUE7O2NBS1UsS0FBQTtBQUFBO2NBRm1CLFNBQUE7QUFBQSxZQUFnQixHQUFBO0FBQUE7Z0JBRWhEQyxnQkFBQUYsaUJBREFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2NBQUMsQ0FBQTtBQUFBOzs7Y0FFaUYsU0FBQTtBQUFBLGNBQXhFLFNBQUE7QUFBQSxZQUFnQixHQUFBO0FBQUE7Z0JBQTJDQyxnQkFBQUYsaUJBQXpCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtjQUFDLENBQUE7QUFBQTs7O2NBQzhCLFNBQUE7QUFBQSxjQUFqRSxTQUFBO0FBQUEsWUFBZ0IsR0FBQTtBQUFBO2dCQUFvQ0MsZ0JBQUFGLGlCQUFsQkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7Y0FBQyxDQUFBO0FBQUE7Ozs7OztVQWlEekNFLGdCQUFBLFNBQUEsTUFBQTtBQUFBLFlBdENFQSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxjQUREQSxnQkFBQSxNQUFBO0FBQUEsZ0JBTHFDLE9BQUFDLGVBQUEsS0FBQSxPQUFBLGNBQUE7QUFBQSxjQUFQLEdBQUEsTUFBQSxDQUFBO0FBQUEsMkRBQzFCSCxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxVQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxjQUFDRSxnQkFBQSxNQUFBLE1BQUFILGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxhQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxjQUFDRSxnQkFBQSxNQUFBLE1BQUFILGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxVQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxjQUFDRSxnQkFBQSxNQUFBLE1BQUFILGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxZQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDLENBQUE7QUFBQTs7WUFPSkUsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsY0FEREEsZ0JBQUEsTUFBQSxZQUFBSCxpQkFEZ0JDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGdCQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDLENBQUE7QUFBQTtZQWtDaEIsS0FBQTtBQUFBO1VBNUI0QixHQUFBO0FBQUE7O2dCQTJCN0IsS0FBQUosTUFBQSxRQUFBLEVBQUEsR0FBQTtBQUFBLGNBMUIrQyxHQUFBO0FBQUE7a0JBSzdDLE9BQUFPLGVBQUEsS0FBQSxPQUFBLFFBQUE7QUFBQSxnQkFKc0IsR0FBQTtBQUFBO29CQUdsQixPQUFBQSxlQUFBLENBQUFQLE1BQUEsSUFBQSxFQUFBLE1BQUFBLE1BQUEsRUFBQSxFQUFBLE9BQUEsS0FBQSxPQUFBLElBQUEsQ0FBQTtBQUFBLGtCQUZ3QyxHQUFBRyxnQkFBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLGdCQUNsQyxHQUFBLENBQUE7QUFBQTtrQkFPVkssWUFBQSxVQUFBO0FBQUEsb0JBRFEsUUFBQTtBQUFBLG9CQUZELFNBQUEsV0FBQSxVQUFBLEdBQUEsQ0FBQTtBQUFBLGtCQUF5QyxHQUFBO0FBQUE7c0JBQzFCSCxnQkFBQUYsZ0JBQUEsYUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsb0JBQUosQ0FBQTtBQUFBOzs7O2tCQU9sQkssWUFBQUMsYUFBQTtBQUFBLG9CQURVLFNBQUE7QUFBQSxvQkFGRCxTQUFBLENBQUEsV0FBQVQsTUFBQSxVQUFBLEVBQUEsV0FBQSxVQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQUEsa0JBQW1ELEdBQUE7QUFBQTtzQkFDdkNLLGdCQUFBRixpQkFBbkJDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO29CQUFDLENBQUE7QUFBQTs7OztrQkFPSEksWUFBQUMsYUFBQTtBQUFBLG9CQURVLFNBQUE7QUFBQSxvQkFGRCxTQUFBLENBQUEsV0FBQVQsTUFBQSxVQUFBLEVBQUEsZ0JBQUEsVUFBQSxHQUFBLENBQUEsRUFBQTtBQUFBLGtCQUF3RCxHQUFBO0FBQUE7c0JBQy9DSyxnQkFBQUYsaUJBQWhCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtvQkFBQyxDQUFBO0FBQUE7Ozs7a0JBT0hJLFlBQUFDLGFBQUE7QUFBQSxvQkFEWSxNQUFBO0FBQUEsb0JBRkgsUUFBQTtBQUFBLG9CQUFLLFNBQUEsQ0FBQSxXQUFBLGNBQUEsUUFBQSxHQUFBO0FBQUEsa0JBQXdDLEdBQUE7QUFBQTtzQkFFdkRKLGdCQUFBRixpQkFEQUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7b0JBQUMsQ0FBQTtBQUFBOzs7Ozs7O1VBekJ1QyxDQUFBO0FBQUE7Ozs7OyJ9
