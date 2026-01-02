import _sfc_main$2 from './ActionBar.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import Header from './Header.vue.js';
import { ActionRunner } from './action-runner.js';
import { useTile } from './use-tile.js';
import { Logger } from './logger.js';
import LogWindow from './LogWindow.vue.js';
import ConfigWindow from './ConfigureWindow.vue.js';
import { act } from './act-registry.js';
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
    const status = ref(void 0);
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
        status.value = void 0;
      },
      onStatusChanged: (title, keepReady) => {
        status.value = title;
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
      status.value = void 0;
    }
    function onExecuteClick() {
      logScrolling.value = true;
      clearLog();
      actReady.value = false;
      runner.execute(__props.pkg, config.value);
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
                  _cache[0] || (_cache[0] = createBaseVNode('span', null, 'Status: ', -1)),
                  unref(status)
                    ? (openBlock(),
                      createElementBlock('span', _hoisted_2, toDisplayString(unref(status)), 1))
                    : unref(shouldShowConfigure)
                      ? (openBlock(),
                        createElementBlock('span', _hoisted_3, 'Configure group parameters ↑'))
                      : (openBlock(),
                        createElementBlock('span', _hoisted_4, 'Press Execute to start')),
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
                              ...(_cache[1] || (_cache[1] = [createTextVNode(' APPLY ', -1)])),
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
                                        ...(_cache[2] ||
                                          (_cache[2] = [createTextVNode('CONFIGURE', -1)])),
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
                                    ...(_cache[3] ||
                                      (_cache[3] = [createTextVNode('PREVIEW', -1)])),
                                  ]),
                                  _: 1,
                                },
                              ),
                              createVNode(
                                _sfc_main$1,
                                { disabled: '' },
                                {
                                  default: withCtx(() => [
                                    ...(_cache[4] ||
                                      (_cache[4] = [createTextVNode('EXECUTE', -1)])),
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
                                          ...(_cache[5] ||
                                            (_cache[5] = [createTextVNode('CONFIGURE', -1)])),
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
                                      ...(_cache[6] ||
                                        (_cache[6] = [createTextVNode('PREVIEW', -1)])),
                                    ]),
                                    _: 1,
                                  },
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    primary: '',
                                    class: normalizeClass(_ctx.$style.executeButton),
                                    onClick: onExecuteClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      ...(_cache[7] ||
                                        (_cache[7] = [createTextVNode(' EXECUTE ', -1)])),
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
                                          ...(_cache[8] ||
                                            (_cache[8] = [createTextVNode('CONFIGURE', -1)])),
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
                                      ...(_cache[9] ||
                                        (_cache[9] = [createTextVNode('PREVIEW', -1)])),
                                    ]),
                                    _: 1,
                                  },
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    danger: '',
                                    disabled: !unref(actReady),
                                    class: normalizeClass(_ctx.$style.executeButton),
                                    onClick: onCancelClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      ...(_cache[10] ||
                                        (_cache[10] = [createTextVNode(' CANCEL ', -1)])),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['disabled', 'class'],
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    primary: '',
                                    disabled: !unref(actReady),
                                    onClick: onActClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      ...(_cache[11] ||
                                        (_cache[11] = [createTextVNode('ACT', -1)])),
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
                                    disabled: !unref(actReady),
                                    onClick: onSkipClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      ...(_cache[12] ||
                                        (_cache[12] = [createTextVNode('SKIP', -1)])),
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
