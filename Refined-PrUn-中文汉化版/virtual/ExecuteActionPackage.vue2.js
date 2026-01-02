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
