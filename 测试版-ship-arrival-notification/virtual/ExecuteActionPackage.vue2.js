import { C } from './prun-css.js';
import _sfc_main$2 from './ActionBar.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import Header from './Header.vue.js';
import { ActionRunner } from './action-runner.js';
import { useTile } from './use-tile.js';
import { Logger } from './logger.js';
import LogWindow from './LogWindow.vue.js';
import ConfigWindow from './ConfigureWindow.vue.js';
import { act } from './act-registry.js';
import { t } from './index5.js';
import {
  defineComponent,
  watch,
  watchEffect,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createBlock,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 2 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ExecuteActionPackage',
  props: {
    pkg: {},
  },
  setup(__props) {
    const tile = useTile();
    let goingToSplit = ref(false);
    const config = ref({
      materialGroups: {},
      actions: {},
    });
    const log = ref([]);
    const logScrolling = ref(true);
    const isPreviewing = ref(false);
    const isRunning = ref(false);
    const statusText = ref(void 0);
    const actReady = ref(false);
    watch(config, clearLog, { deep: true });
    watchEffect(() => {
      for (const name of __props.pkg.groups.map(x => x.name)) {
        if (config.value.materialGroups[name] === void 0) {
          config.value.materialGroups[name] = {};
        }
      }
      for (const name of __props.pkg.actions.map(x => x.name)) {
        if (config.value.actions[name] === void 0) {
          config.value.actions[name] = {};
        }
      }
    });
    const needsConfigure = computed(() => {
      for (const action of __props.pkg.actions) {
        const info = act.getActionInfo(action.type);
        if (info && info.needsConfigure?.(action)) {
          return true;
        }
      }
      for (const group of __props.pkg.groups) {
        const info = act.getMaterialGroupInfo(group.type);
        if (info && info.needsConfigure?.(group)) {
          return true;
        }
      }
      return false;
    });
    const hasPriceFetchAction = computed(() =>
      __props.pkg.actions.some(a => a.type === 'CX Fetch'),
    );
    const isValidConfig = computed(() => {
      for (const action of __props.pkg.actions) {
        const info = act.getActionInfo(action.type);
        let actionConfig = config.value.actions[action.name] ?? {};
        const isValid = info?.isValidConfig?.(action, actionConfig) ?? true;
        if (!isValid) {
          return false;
        }
      }
      for (const group of __props.pkg.groups) {
        const info = act.getMaterialGroupInfo(group.type);
        let groupConfig = config.value.materialGroups[group.name] ?? {};
        const isValid = info?.isValidConfig?.(group, groupConfig) ?? true;
        if (!isValid) {
          return false;
        }
      }
      return true;
    });
    const showConfigure = ref(true);
    const shouldShowConfigure = computed(() => {
      return needsConfigure.value && (!isValidConfig.value || showConfigure.value);
    });
    const runner = new ActionRunner({
      tile,
      log: new Logger(logMessage),
      onBufferSplit: () => (goingToSplit.value = true),
      onStart: () => (isRunning.value = true),
      onEnd: () => {
        isRunning.value = false;
        statusText.value = void 0;
      },
      onStatusChanged: (title, keepReady) => {
        statusText.value = title;
        if (!keepReady) {
          actReady.value = false;
        }
      },
      onActReady: () => {
        actReady.value = true;
      },
    });
    function onConfigureApplyClick() {
      showConfigure.value = false;
    }
    function onConfigureClick() {
      showConfigure.value = true;
    }
    async function onPreviewClick() {
      logScrolling.value = false;
      clearLog();
      isPreviewing.value = true;
      await runner.preview(__props.pkg, config.value);
      isPreviewing.value = false;
      statusText.value = void 0;
    }
    function onExecuteClick() {
      logScrolling.value = true;
      clearLog();
      actReady.value = false;
      runner.execute(__props.pkg, config.value, false);
    }
    function onAutoExecuteClick() {
      logScrolling.value = true;
      clearLog();
      actReady.value = false;
      runner.execute(__props.pkg, config.value, true);
    }
    function onStopAutoClick() {
      runner.stopAuto();
    }
    function onCancelClick() {
      actReady.value = false;
      runner.cancel();
    }
    function onActClick() {
      actReady.value = false;
      runner.act();
    }
    function onSkipClick() {
      actReady.value = false;
      runner.skip();
    }
    function logMessage(tag, message) {
      return log.value.push({ tag, message });
    }
    function clearLog() {
      log.value.length = 0;
    }
    function closeAllPriceWindows() {
      const windows = Array.from(document.getElementsByClassName(C.Window.window));
      for (const window of windows) {
        let shouldClose = false;
        const sessionId = window.getAttribute('data-cx-fetch-session');
        if (sessionId) {
          shouldClose = true;
        } else {
          const cmdElement = window.querySelector(`.${C.TileFrame.cmd}`);
          const cmdText = (cmdElement?.textContent || '').toUpperCase();
          if (cmdText.startsWith('XIT ') || cmdText.startsWith('XIT_')) {
            shouldClose = true;
          }
        }
        if (shouldClose) {
          const buttons = window.querySelectorAll(`.${C.Window.button}`);
          const closeButton = Array.from(buttons).find(x => x.textContent === 'x');
          if (closeButton) {
            closeButton.click();
          }
        }
      }
    }
    return (_ctx, _cache) => {
      return unref(goingToSplit)
        ? (openBlock(), createElementBlock('div', _hoisted_1))
        : (openBlock(),
          createElementBlock(
            'div',
            {
              key: 1,
              class: normalizeClass(_ctx.$style.root),
            },
            [
              createVNode(
                Header,
                {
                  class: normalizeClass(_ctx.$style.header),
                },
                {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.pkg.global.name), 1),
                  ]),
                  _: 1,
                },
                8,
                ['class'],
              ),
              unref(shouldShowConfigure)
                ? (openBlock(),
                  createBlock(
                    ConfigWindow,
                    {
                      key: 0,
                      pkg: _ctx.pkg,
                      config: unref(config),
                      class: normalizeClass(_ctx.$style.mainWindow),
                    },
                    null,
                    8,
                    ['pkg', 'config', 'class'],
                  ))
                : (openBlock(),
                  createBlock(
                    LogWindow,
                    {
                      key: 1,
                      messages: unref(log),
                      scrolling: unref(logScrolling),
                      class: normalizeClass(_ctx.$style.mainWindow),
                    },
                    null,
                    8,
                    ['messages', 'scrolling', 'class'],
                  )),
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_ctx.$style.status),
                },
                [
                  createBaseVNode('span', null, toDisplayString(unref(t)('act.status')) + ': ', 1),
                  unref(statusText)
                    ? (openBlock(),
                      createElementBlock('span', _hoisted_2, toDisplayString(unref(statusText)), 1))
                    : unref(shouldShowConfigure)
                      ? (openBlock(),
                        createElementBlock(
                          'span',
                          _hoisted_3,
                          toDisplayString(unref(t)('act.configureParams')),
                          1,
                        ))
                      : (openBlock(),
                        createElementBlock(
                          'span',
                          _hoisted_4,
                          toDisplayString(unref(t)('act.pressExecute')),
                          1,
                        )),
                ],
                2,
              ),
              createVNode(
                _sfc_main$2,
                {
                  class: normalizeClass(_ctx.$style.actionBar),
                },
                {
                  default: withCtx(() => [
                    unref(shouldShowConfigure)
                      ? (openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: 0,
                            primary: '',
                            disabled: !unref(isValidConfig),
                            onClick: onConfigureApplyClick,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(unref(t)('act.apply').toUpperCase()),
                                1,
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['disabled'],
                        ))
                      : unref(isPreviewing)
                        ? (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              unref(needsConfigure)
                                ? (openBlock(),
                                  createBlock(
                                    _sfc_main$1,
                                    {
                                      key: 0,
                                      primary: '',
                                      onClick: onConfigureClick,
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          toDisplayString(unref(t)('act.configure').toUpperCase()),
                                          1,
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                  ))
                                : createCommentVNode('', true),
                              createVNode(
                                _sfc_main$1,
                                { disabled: '' },
                                {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString(unref(t)('act.preview').toUpperCase()),
                                      1,
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              createVNode(
                                _sfc_main$1,
                                { disabled: '' },
                                {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString(unref(t)('act.execute').toUpperCase()),
                                      1,
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ],
                            64,
                          ))
                        : !unref(isRunning)
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 2 },
                              [
                                unref(needsConfigure)
                                  ? (openBlock(),
                                    createBlock(
                                      _sfc_main$1,
                                      {
                                        key: 0,
                                        primary: '',
                                        onClick: onConfigureClick,
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              unref(t)('act.configure').toUpperCase(),
                                            ),
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
                                    onClick: onPreviewClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.preview').toUpperCase()),
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
                                    onClick: onExecuteClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.execute').toUpperCase()),
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
                                    class: normalizeClass(_ctx.$style.executeButton),
                                    onClick: onAutoExecuteClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.autoExecute').toUpperCase()),
                                        1,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['class'],
                                ),
                                unref(hasPriceFetchAction)
                                  ? (openBlock(),
                                    createBlock(
                                      _sfc_main$1,
                                      {
                                        key: 1,
                                        class: normalizeClass(_ctx.$style.executeButton),
                                        onClick: closeAllPriceWindows,
                                        dark: '',
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              unref(t)(
                                                'quickPurchase.closeAllWindows',
                                              ).toUpperCase(),
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
                              ],
                              64,
                            ))
                          : (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 3 },
                              [
                                unref(needsConfigure)
                                  ? (openBlock(),
                                    createBlock(
                                      _sfc_main$1,
                                      {
                                        key: 0,
                                        primary: '',
                                        disabled: '',
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              unref(t)('act.configure').toUpperCase(),
                                            ),
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
                                    disabled: '',
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.preview').toUpperCase()),
                                        1,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    danger: '',
                                    class: normalizeClass(_ctx.$style.executeButton),
                                    onClick: onCancelClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.cancel').toUpperCase()),
                                        1,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['class'],
                                ),
                                unref(runner).isAutoMode
                                  ? (openBlock(),
                                    createBlock(
                                      _sfc_main$1,
                                      {
                                        key: 1,
                                        primary: '',
                                        onClick: onStopAutoClick,
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(unref(t)('act.stopAuto').toUpperCase()),
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
                                    disabled: !unref(actReady) || unref(runner).isAutoMode,
                                    onClick: onActClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.act').toUpperCase()),
                                        1,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['disabled'],
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    neutral: '',
                                    disabled: !unref(actReady) || unref(runner).isAutoMode,
                                    onClick: onSkipClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(unref(t)('act.skip').toUpperCase()),
                                        1,
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['disabled'],
                                ),
                              ],
                              64,
                            )),
                  ]),
                  _: 1,
                },
                8,
                ['class'],
              ),
            ],
            2,
          ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhlY3V0ZUFjdGlvblBhY2thZ2UudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvRXhlY3V0ZUFjdGlvblBhY2thZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9BY3Rpb25CYXIudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9IZWFkZXIudnVlJztcbmltcG9ydCB7IEFjdGlvblJ1bm5lciB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9ydW5uZXIvYWN0aW9uLXJ1bm5lcic7XG5pbXBvcnQgeyB1c2VUaWxlIH0gZnJvbSAnQHNyYy9ob29rcy91c2UtdGlsZSc7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ1RhZyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9ydW5uZXIvbG9nZ2VyJztcbmltcG9ydCBMb2dXaW5kb3cgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL0xvZ1dpbmRvdy52dWUnO1xuaW1wb3J0IENvbmZpZ1dpbmRvdyBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvQ29uZmlndXJlV2luZG93LnZ1ZSc7XG5pbXBvcnQgeyBBY3Rpb25QYWNrYWdlQ29uZmlnIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcblxuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmNvbnN0IHsgcGtnIH0gPSBkZWZpbmVQcm9wczx7IHBrZzogVXNlckRhdGEuQWN0aW9uUGFja2FnZURhdGEgfT4oKTtcblxuY29uc3QgdGlsZSA9IHVzZVRpbGUoKTtcbmxldCBnb2luZ1RvU3BsaXQgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBjb25maWcgPSByZWYoe1xuICBtYXRlcmlhbEdyb3Vwczoge30sXG4gIGFjdGlvbnM6IHt9LFxufSBhcyBBY3Rpb25QYWNrYWdlQ29uZmlnKTtcblxuY29uc3QgbG9nID0gcmVmKFtdIGFzIHsgdGFnOiBMb2dUYWc7IG1lc3NhZ2U6IHN0cmluZyB9W10pO1xuY29uc3QgbG9nU2Nyb2xsaW5nID0gcmVmKHRydWUpO1xuY29uc3QgaXNQcmV2aWV3aW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGlzUnVubmluZyA9IHJlZihmYWxzZSk7XG5jb25zdCBzdGF0dXNUZXh0ID0gcmVmKHVuZGVmaW5lZCBhcyBzdHJpbmcgfCB1bmRlZmluZWQpO1xuY29uc3QgYWN0UmVhZHkgPSByZWYoZmFsc2UpO1xuXG53YXRjaChjb25maWcsIGNsZWFyTG9nLCB7IGRlZXA6IHRydWUgfSk7XG5cbndhdGNoRWZmZWN0KCgpID0+IHtcbiAgZm9yIChjb25zdCBuYW1lIG9mIHBrZy5ncm91cHMubWFwKHggPT4geC5uYW1lISkpIHtcbiAgICBpZiAoY29uZmlnLnZhbHVlLm1hdGVyaWFsR3JvdXBzW25hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy52YWx1ZS5tYXRlcmlhbEdyb3Vwc1tuYW1lXSA9IHt9O1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IG5hbWUgb2YgcGtnLmFjdGlvbnMubWFwKHggPT4geC5uYW1lISkpIHtcbiAgICBpZiAoY29uZmlnLnZhbHVlLmFjdGlvbnNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uZmlnLnZhbHVlLmFjdGlvbnNbbmFtZV0gPSB7fTtcbiAgICB9XG4gIH1cbn0pO1xuXG5jb25zdCBuZWVkc0NvbmZpZ3VyZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgcGtnLmFjdGlvbnMpIHtcbiAgICBjb25zdCBpbmZvID0gYWN0LmdldEFjdGlvbkluZm8oYWN0aW9uLnR5cGUpO1xuICAgIGlmIChpbmZvICYmIGluZm8ubmVlZHNDb25maWd1cmU/LihhY3Rpb24pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBncm91cCBvZiBwa2cuZ3JvdXBzKSB7XG4gICAgY29uc3QgaW5mbyA9IGFjdC5nZXRNYXRlcmlhbEdyb3VwSW5mbyhncm91cC50eXBlKTtcbiAgICBpZiAoaW5mbyAmJiBpbmZvLm5lZWRzQ29uZmlndXJlPy4oZ3JvdXApKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbmNvbnN0IGhhc1ByaWNlRmV0Y2hBY3Rpb24gPSBjb21wdXRlZCgoKSA9PiBwa2cuYWN0aW9ucy5zb21lKGEgPT4gYS50eXBlID09PSAnQ1ggRmV0Y2gnKSk7XG5cbmNvbnN0IGlzVmFsaWRDb25maWcgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGZvciAoY29uc3QgYWN0aW9uIG9mIHBrZy5hY3Rpb25zKSB7XG4gICAgY29uc3QgaW5mbyA9IGFjdC5nZXRBY3Rpb25JbmZvKGFjdGlvbi50eXBlKTtcbiAgICBsZXQgYWN0aW9uQ29uZmlnID0gY29uZmlnLnZhbHVlLmFjdGlvbnNbYWN0aW9uLm5hbWUhXSA/PyB7fTtcbiAgICBjb25zdCBpc1ZhbGlkID0gaW5mbz8uaXNWYWxpZENvbmZpZz8uKGFjdGlvbiwgYWN0aW9uQ29uZmlnKSA/PyB0cnVlO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IGdyb3VwIG9mIHBrZy5ncm91cHMpIHtcbiAgICBjb25zdCBpbmZvID0gYWN0LmdldE1hdGVyaWFsR3JvdXBJbmZvKGdyb3VwLnR5cGUpO1xuICAgIGxldCBncm91cENvbmZpZyA9IGNvbmZpZy52YWx1ZS5tYXRlcmlhbEdyb3Vwc1tncm91cC5uYW1lIV0gPz8ge307XG4gICAgY29uc3QgaXNWYWxpZCA9IGluZm8/LmlzVmFsaWRDb25maWc/Lihncm91cCwgZ3JvdXBDb25maWcpID8/IHRydWU7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufSk7XG5cbmNvbnN0IHNob3dDb25maWd1cmUgPSByZWYodHJ1ZSk7XG5cbmNvbnN0IHNob3VsZFNob3dDb25maWd1cmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBuZWVkc0NvbmZpZ3VyZS52YWx1ZSAmJiAoIWlzVmFsaWRDb25maWcudmFsdWUgfHwgc2hvd0NvbmZpZ3VyZS52YWx1ZSk7XG59KTtcblxuY29uc3QgcnVubmVyID0gbmV3IEFjdGlvblJ1bm5lcih7XG4gIHRpbGUsXG4gIGxvZzogbmV3IExvZ2dlcihsb2dNZXNzYWdlKSxcbiAgb25CdWZmZXJTcGxpdDogKCkgPT4gKGdvaW5nVG9TcGxpdC52YWx1ZSA9IHRydWUpLFxuICBvblN0YXJ0OiAoKSA9PiAoaXNSdW5uaW5nLnZhbHVlID0gdHJ1ZSksXG4gIG9uRW5kOiAoKSA9PiB7XG4gICAgaXNSdW5uaW5nLnZhbHVlID0gZmFsc2U7XG4gICAgc3RhdHVzVGV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgb25TdGF0dXNDaGFuZ2VkOiAodGl0bGUsIGtlZXBSZWFkeSkgPT4ge1xuICAgIHN0YXR1c1RleHQudmFsdWUgPSB0aXRsZTtcbiAgICBpZiAoIWtlZXBSZWFkeSkge1xuICAgICAgYWN0UmVhZHkudmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIG9uQWN0UmVhZHk6ICgpID0+IHtcbiAgICBhY3RSZWFkeS52YWx1ZSA9IHRydWU7XG4gIH0sXG59KTtcblxuZnVuY3Rpb24gb25Db25maWd1cmVBcHBseUNsaWNrKCkge1xuICBzaG93Q29uZmlndXJlLnZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9uQ29uZmlndXJlQ2xpY2soKSB7XG4gIHNob3dDb25maWd1cmUudmFsdWUgPSB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvblByZXZpZXdDbGljaygpIHtcbiAgbG9nU2Nyb2xsaW5nLnZhbHVlID0gZmFsc2U7XG4gIGNsZWFyTG9nKCk7XG4gIGlzUHJldmlld2luZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IHJ1bm5lci5wcmV2aWV3KHBrZywgY29uZmlnLnZhbHVlKTtcbiAgaXNQcmV2aWV3aW5nLnZhbHVlID0gZmFsc2U7XG4gIHN0YXR1c1RleHQudmFsdWUgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIG9uRXhlY3V0ZUNsaWNrKCkge1xuICBsb2dTY3JvbGxpbmcudmFsdWUgPSB0cnVlO1xuICBjbGVhckxvZygpO1xuICBhY3RSZWFkeS52YWx1ZSA9IGZhbHNlO1xuICBydW5uZXIuZXhlY3V0ZShwa2csIGNvbmZpZy52YWx1ZSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBvbkF1dG9FeGVjdXRlQ2xpY2soKSB7XG4gIGxvZ1Njcm9sbGluZy52YWx1ZSA9IHRydWU7XG4gIGNsZWFyTG9nKCk7XG4gIGFjdFJlYWR5LnZhbHVlID0gZmFsc2U7XG4gIHJ1bm5lci5leGVjdXRlKHBrZywgY29uZmlnLnZhbHVlLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gb25TdG9wQXV0b0NsaWNrKCkge1xuICBydW5uZXIuc3RvcEF1dG8oKTtcbn1cblxuZnVuY3Rpb24gb25DYW5jZWxDbGljaygpIHtcbiAgYWN0UmVhZHkudmFsdWUgPSBmYWxzZTtcbiAgcnVubmVyLmNhbmNlbCgpO1xufVxuXG5mdW5jdGlvbiBvbkFjdENsaWNrKCkge1xuICBhY3RSZWFkeS52YWx1ZSA9IGZhbHNlO1xuICBydW5uZXIuYWN0KCk7XG59XG5cbmZ1bmN0aW9uIG9uU2tpcENsaWNrKCkge1xuICBhY3RSZWFkeS52YWx1ZSA9IGZhbHNlO1xuICBydW5uZXIuc2tpcCgpO1xufVxuXG5mdW5jdGlvbiBsb2dNZXNzYWdlKHRhZzogTG9nVGFnLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGxvZy52YWx1ZS5wdXNoKHsgdGFnLCBtZXNzYWdlIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhckxvZygpIHtcbiAgbG9nLnZhbHVlLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIGNsb3NlQWxsUHJpY2VXaW5kb3dzKCkge1xuICBjb25zdCB3aW5kb3dzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKEMuV2luZG93LndpbmRvdykpIGFzIEhUTUxEaXZFbGVtZW50W107XG5cbiAgZm9yIChjb25zdCB3aW5kb3cgb2Ygd2luZG93cykge1xuICAgIGxldCBzaG91bGRDbG9zZSA9IGZhbHNlO1xuXG4gICAgLy8gMS4g5qOA5p+l5piv5ZCm5piv5bim5pyJIHNlc3Npb24g5qCH6K6w55qE5Lu35qC856qX5Y+jIChDWFBPKVxuICAgIGNvbnN0IHNlc3Npb25JZCA9IHdpbmRvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3gtZmV0Y2gtc2Vzc2lvbicpO1xuICAgIGlmIChzZXNzaW9uSWQpIHtcbiAgICAgIHNob3VsZENsb3NlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gMi4g5qOA5p+l5piv5ZCm5pivIFhJVCDnqpflj6PvvIjljIXmi6wgXCJYSVQgXCIg5ZKMIFwiWElUX1wiIOagvOW8j++8jOS4jeWMuuWIhuWkp+Wwj+WGme+8iVxuICAgICAgY29uc3QgY21kRWxlbWVudCA9IHdpbmRvdy5xdWVyeVNlbGVjdG9yKGAuJHtDLlRpbGVGcmFtZS5jbWR9YCk7XG4gICAgICBjb25zdCBjbWRUZXh0ID0gKGNtZEVsZW1lbnQ/LnRleHRDb250ZW50IHx8ICcnKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgaWYgKGNtZFRleHQuc3RhcnRzV2l0aCgnWElUICcpIHx8IGNtZFRleHQuc3RhcnRzV2l0aCgnWElUXycpKSB7XG4gICAgICAgIHNob3VsZENsb3NlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkQ2xvc2UpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB3aW5kb3cucXVlcnlTZWxlY3RvckFsbChgLiR7Qy5XaW5kb3cuYnV0dG9ufWApO1xuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBBcnJheS5mcm9tKGJ1dHRvbnMpLmZpbmQoeCA9PiB4LnRleHRDb250ZW50ID09PSAneCcpO1xuICAgICAgaWYgKGNsb3NlQnV0dG9uKSB7XG4gICAgICAgIChjbG9zZUJ1dHRvbiBhcyBIVE1MRWxlbWVudCkuY2xpY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgdi1pZj1cImdvaW5nVG9TcGxpdFwiIC8+XG4gIDxkaXYgdi1lbHNlIDpjbGFzcz1cIiRzdHlsZS5yb290XCI+XG4gICAgPEhlYWRlciA6Y2xhc3M9XCIkc3R5bGUuaGVhZGVyXCI+e3sgcGtnLmdsb2JhbC5uYW1lIH19PC9IZWFkZXI+XG4gICAgPENvbmZpZ1dpbmRvd1xuICAgICAgdi1pZj1cInNob3VsZFNob3dDb25maWd1cmVcIlxuICAgICAgOnBrZz1cInBrZ1wiXG4gICAgICA6Y29uZmlnPVwiY29uZmlnXCJcbiAgICAgIDpjbGFzcz1cIiRzdHlsZS5tYWluV2luZG93XCIgLz5cbiAgICA8TG9nV2luZG93IHYtZWxzZSA6bWVzc2FnZXM9XCJsb2dcIiA6c2Nyb2xsaW5nPVwibG9nU2Nyb2xsaW5nXCIgOmNsYXNzPVwiJHN0eWxlLm1haW5XaW5kb3dcIiAvPlxuICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLnN0YXR1c1wiPlxuICAgICAgPHNwYW4+e3sgdCgnYWN0LnN0YXR1cycpIH19OiA8L3NwYW4+XG4gICAgICA8c3BhbiB2LWlmPVwic3RhdHVzVGV4dFwiPnt7IHN0YXR1c1RleHQgfX08L3NwYW4+XG4gICAgICA8c3BhbiB2LWVsc2UtaWY9XCJzaG91bGRTaG93Q29uZmlndXJlXCI+e3sgdCgnYWN0LmNvbmZpZ3VyZVBhcmFtcycpIH19PC9zcGFuPlxuICAgICAgPHNwYW4gdi1lbHNlPnt7IHQoJ2FjdC5wcmVzc0V4ZWN1dGUnKSB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8QWN0aW9uQmFyIDpjbGFzcz1cIiRzdHlsZS5hY3Rpb25CYXJcIj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwic2hvdWxkU2hvd0NvbmZpZ3VyZVwiPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IDpkaXNhYmxlZD1cIiFpc1ZhbGlkQ29uZmlnXCIgQGNsaWNrPVwib25Db25maWd1cmVBcHBseUNsaWNrXCI+XG4gICAgICAgICAge3sgdCgnYWN0LmFwcGx5JykudG9VcHBlckNhc2UoKSB9fVxuICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImlzUHJldmlld2luZ1wiPlxuICAgICAgICA8UHJ1bkJ1dHRvbiB2LWlmPVwibmVlZHNDb25maWd1cmVcIiBwcmltYXJ5IEBjbGljaz1cIm9uQ29uZmlndXJlQ2xpY2tcIj5cbiAgICAgICAgICB7eyB0KCdhY3QuY29uZmlndXJlJykudG9VcHBlckNhc2UoKSB9fVxuICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICAgIDxQcnVuQnV0dG9uIGRpc2FibGVkPnt7IHQoJ2FjdC5wcmV2aWV3JykudG9VcHBlckNhc2UoKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gZGlzYWJsZWQ+e3sgdCgnYWN0LmV4ZWN1dGUnKS50b1VwcGVyQ2FzZSgpIH19PC9QcnVuQnV0dG9uPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCIhaXNSdW5uaW5nXCI+XG4gICAgICAgIDxQcnVuQnV0dG9uIHYtaWY9XCJuZWVkc0NvbmZpZ3VyZVwiIHByaW1hcnkgQGNsaWNrPVwib25Db25maWd1cmVDbGlja1wiPlxuICAgICAgICAgIHt7IHQoJ2FjdC5jb25maWd1cmUnKS50b1VwcGVyQ2FzZSgpIH19XG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvblByZXZpZXdDbGlja1wiPlxuICAgICAgICAgIHt7IHQoJ2FjdC5wcmV2aWV3JykudG9VcHBlckNhc2UoKSB9fVxuICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25FeGVjdXRlQ2xpY2tcIj5cbiAgICAgICAgICB7eyB0KCdhY3QuZXhlY3V0ZScpLnRvVXBwZXJDYXNlKCkgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IDpjbGFzcz1cIiRzdHlsZS5leGVjdXRlQnV0dG9uXCIgQGNsaWNrPVwib25BdXRvRXhlY3V0ZUNsaWNrXCI+XG4gICAgICAgICAge3sgdCgnYWN0LmF1dG9FeGVjdXRlJykudG9VcHBlckNhc2UoKSB9fVxuICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICAgIDxQcnVuQnV0dG9uXG4gICAgICAgICAgdi1pZj1cImhhc1ByaWNlRmV0Y2hBY3Rpb25cIlxuICAgICAgICAgIDpjbGFzcz1cIiRzdHlsZS5leGVjdXRlQnV0dG9uXCJcbiAgICAgICAgICBAY2xpY2s9XCJjbG9zZUFsbFByaWNlV2luZG93c1wiXG4gICAgICAgICAgZGFyaz5cbiAgICAgICAgICB7eyB0KCdxdWlja1B1cmNoYXNlLmNsb3NlQWxsV2luZG93cycpLnRvVXBwZXJDYXNlKCkgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgIDxQcnVuQnV0dG9uIHYtaWY9XCJuZWVkc0NvbmZpZ3VyZVwiIHByaW1hcnkgZGlzYWJsZWQ+XG4gICAgICAgICAge3sgdCgnYWN0LmNvbmZpZ3VyZScpLnRvVXBwZXJDYXNlKCkgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IGRpc2FibGVkPnt7IHQoJ2FjdC5wcmV2aWV3JykudG9VcHBlckNhc2UoKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gZGFuZ2VyIDpjbGFzcz1cIiRzdHlsZS5leGVjdXRlQnV0dG9uXCIgQGNsaWNrPVwib25DYW5jZWxDbGlja1wiPlxuICAgICAgICAgIHt7IHQoJ2FjdC5jYW5jZWwnKS50b1VwcGVyQ2FzZSgpIH19XG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gdi1pZj1cInJ1bm5lci5pc0F1dG9Nb2RlXCIgcHJpbWFyeSBAY2xpY2s9XCJvblN0b3BBdXRvQ2xpY2tcIj5cbiAgICAgICAgICB7eyB0KCdhY3Quc3RvcEF1dG8nKS50b1VwcGVyQ2FzZSgpIH19XG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSA6ZGlzYWJsZWQ9XCIhYWN0UmVhZHkgfHwgcnVubmVyLmlzQXV0b01vZGVcIiBAY2xpY2s9XCJvbkFjdENsaWNrXCI+XG4gICAgICAgICAge3sgdCgnYWN0LmFjdCcpLnRvVXBwZXJDYXNlKCkgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBuZXV0cmFsIDpkaXNhYmxlZD1cIiFhY3RSZWFkeSB8fCBydW5uZXIuaXNBdXRvTW9kZVwiIEBjbGljaz1cIm9uU2tpcENsaWNrXCI+XG4gICAgICAgICAge3sgdCgnYWN0LnNraXAnKS50b1VwcGVyQ2FzZSgpIH19XG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9BY3Rpb25CYXI+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5yb290IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ubWFpbldpbmRvdyB7XG4gIGZsZXgtZ3JvdzogMTtcbn1cblxuLmhlYWRlciB7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG59XG5cbi5zdGF0dXMge1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi5hY3Rpb25CYXIge1xuICBtYXJnaW4tbGVmdDogMnB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4vKiBVc2UgdGhlIHNhbWUgd2lkdGggZm9yIGNhbmNlbCBhbmQgZXhlY3V0ZSBidXR0b25zIHRvIGtlZXAgbGF5b3V0IHN0YWJsZS4gKi9cbi5leGVjdXRlQnV0dG9uIHtcbiAgd2lkdGg6IDgwcHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwicGtnIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl91bnJlZiIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJQcnVuQnV0dG9uIiwiX3dpdGhDdHgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxVQUFBLE9BQUEsUUFBQTtBQUNBLFFBQUEsZUFBQSxJQUFBLEtBQUE7QUFFQSxVQUFBLFNBQUEsSUFBQTtBQUFBLE1BQW1CLGdCQUFBLENBQUE7QUFBQSxNQUNBLFNBQUEsQ0FBQTtBQUFBLElBQ1AsQ0FBQTtBQUdaLFVBQUEsTUFBQSxJQUFBLEVBQUE7QUFDQSxVQUFBLGVBQUEsSUFBQSxJQUFBO0FBQ0EsVUFBQSxlQUFBLElBQUEsS0FBQTtBQUNBLFVBQUEsWUFBQSxJQUFBLEtBQUE7QUFDQSxVQUFBLGFBQUEsSUFBQSxNQUFBO0FBQ0EsVUFBQSxXQUFBLElBQUEsS0FBQTtBQUVBLFVBQUEsUUFBQSxVQUFBLEVBQUEsTUFBQSxLQUFBLENBQUE7QUFFQSxnQkFBQSxNQUFBO0FBQ0UsaUJBQUEsUUFBQSxRQUFBLElBQUEsT0FBQSxJQUFBLENBQUEsTUFBQSxFQUFBLElBQUEsR0FBQTtBQUNFLFlBQUEsT0FBQSxNQUFBLGVBQUEsSUFBQSxNQUFB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
