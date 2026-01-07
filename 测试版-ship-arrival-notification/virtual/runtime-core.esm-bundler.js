import {
  computed as computed$1,
  watch as watch$1,
  isProxy,
  proxyRefs,
  markRaw,
  pauseTracking,
  resetTracking,
  toRaw,
  isRef,
  EffectScope,
  ReactiveEffect,
  shallowReactive,
  track,
  shallowReadonly,
  trigger,
  reactive,
  isReactive,
  isShallow,
  isReadonly,
  shallowReadArray,
  toReadonly,
  toReactive,
  traverse,
  customRef,
  shallowRef,
} from './reactivity.esm-bundler.js';
import {
  getCurrentScope,
  onWatcherCleanup,
  readonly,
  ref,
  toRef,
  triggerRef,
  unref,
} from './reactivity.esm-bundler.js';
import {
  EMPTY_OBJ,
  extend,
  isFunction,
  isPromise,
  isArray,
  getGlobalThis,
  NOOP,
  NO,
  isString,
  normalizeClass,
  isObject,
  normalizeStyle,
  invokeArrayFns,
  isOn,
  hasOwn,
  remove,
  EMPTY_ARR,
  isReservedProp,
  camelize,
  looseToNumber,
  toHandlerKey,
  hyphenate,
  def,
  isModelListener,
  hasChanged,
  capitalize,
  isSymbol,
} from './shared.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
/**
 * @vue/runtime-core v3.5.20
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      // eslint-disable-next-line no-restricted-syntax
      msg +
        args
          .map(a => {
            var _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null
              ? _b
              : JSON.stringify(a);
          })
          .join(''),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join('\n'),
      trace,
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (
      trace.length && // avoid spamming console during tests
      true
    ) {
      warnArgs.push(
        `
`,
        ...formatTrace(trace),
      );
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0,
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(
      ...(i === 0
        ? []
        : [
            `
`,
          ]),
      ...formatTraceEntry(entry),
    );
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach(key => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch(err => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } =
    (instance && instance.appContext.config) || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [err, exposedInstance, errorInfo]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = (start + end) >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || (middleJobId === id && middleJob.flags & 2)) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (
      !lastJob || // fast path when the job id is larger than the tail
      (!(job.flags & 2) && jobId >= getId(lastJob))
    ) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = job => (job.id == null ? (job.flags & 2 ? -1 : Infinity) : job.id);
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false);
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(job, job.i, job.i ? 15 : 14);
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = (instance && instance.type.__scopeId) || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir,
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers,
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [vnode.el, binding, vnode, prevVNode]);
      resetTracking();
    }
  }
}
const TeleportEndKey = Symbol('_vte');
const isTeleport = type => type.__isTeleport;
const isTeleportDisabled = props => props && (props.disabled || props.disabled === '');
const isTeleportDeferred = props => props && (props.defer || props.defer === '');
const isTargetSVG = target => typeof SVGElement !== 'undefined' && target instanceof SVGElement;
const isTargetMathML = target =>
  typeof MathMLElement === 'function' && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  name: 'Teleport',
  __isTeleport: true,
  process(
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
    internals,
  ) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment },
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = (n2.el = createText(''));
      const mainAnchor = (n2.anchor = createText(''));
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          if (parentComponent && parentComponent.isCE) {
            parentComponent.ce._teleportTarget = container2;
          }
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
        }
      };
      const mountToTarget = () => {
        const target = (n2.target = resolveTarget(n2.props, querySelector));
        const targetAnchor = prepareAnchor(target, n2, createText, insert);
        if (target) {
          if (namespace !== 'svg' && isTargetSVG(target)) {
            namespace = 'svg';
          } else if (namespace !== 'mathml' && isTargetMathML(target)) {
            namespace = 'mathml';
          }
          if (!disabled) {
            mount(target, targetAnchor);
            updateCssVars(n2, false);
          }
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
        updateCssVars(n2, true);
      }
      if (isTeleportDeferred(n2.props)) {
        n2.el.__isMounted = false;
        queuePostRenderEffect(() => {
          mountToTarget();
          delete n2.el.__isMounted;
        }, parentSuspense);
      } else {
        mountToTarget();
      }
    } else {
      if (isTeleportDeferred(n2.props) && n1.el.__isMounted === false) {
        queuePostRenderEffect(() => {
          TeleportImpl.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals,
          );
        }, parentSuspense);
        return;
      }
      n2.el = n1.el;
      n2.targetStart = n1.targetStart;
      const mainAnchor = (n2.anchor = n1.anchor);
      const target = (n2.target = n1.target);
      const targetAnchor = (n2.targetAnchor = n1.targetAnchor);
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === 'svg' || isTargetSVG(target)) {
        namespace = 'svg';
      } else if (namespace === 'mathml' || isTargetMathML(target)) {
        namespace = 'mathml';
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false,
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, mainAnchor, internals, 1);
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = (n2.target = resolveTarget(n2.props, querySelector));
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target, targetAnchor, internals, 1);
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(
    vnode,
    parentComponent,
    parentSuspense,
    { um: unmount, o: { remove: hostRemove } },
    doRemove,
  ) {
    const { shapeFlag, children, anchor, targetStart, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      const shouldRemove = doRemove || !isTeleportDisabled(props);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport,
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(
  node,
  vnode,
  parentComponent,
  parentSuspense,
  slotScopeIds,
  optimized,
  { o: { nextSibling, parentNode, querySelector, insert, createText } },
  hydrateChildren,
) {
  const target = (vnode.target = resolveTarget(vnode.props, querySelector));
  if (target) {
    const disabled = isTeleportDisabled(vnode.props);
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized,
        );
        vnode.targetStart = targetNode;
        vnode.targetAnchor = targetNode && nextSibling(targetNode);
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          if (targetAnchor && targetAnchor.nodeType === 8) {
            if (targetAnchor.data === 'teleport start anchor') {
              vnode.targetStart = targetAnchor;
            } else if (targetAnchor.data === 'teleport anchor') {
              vnode.targetAnchor = targetAnchor;
              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          targetAnchor = nextSibling(targetAnchor);
        }
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized,
        );
      }
    }
    updateCssVars(vnode, disabled);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute('data-v-owner', ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert) {
  const targetStart = (vnode.targetStart = createText(''));
  const targetAnchor = (vnode.targetAnchor = createText(''));
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target);
    insert(targetAnchor, target);
  }
  return targetAnchor;
}
const leaveCbKey = Symbol('_leaveCb');
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options)
    ? // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
    : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + '-', 0, 0];
}
function useTemplateRef(key) {
  const i = getCurrentInstance();
  const r = shallowRef(null);
  if (i) {
    const refs = i.refs === EMPTY_OBJ ? (i.refs = {}) : i.refs;
    {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: val => (r.value = val),
      });
    }
  }
  const ret = r;
  return ret;
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) =>
      setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount,
      ),
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef =
    setupState === EMPTY_OBJ
      ? NO
      : key => {
          return hasOwn(rawSetupState, key);
        };
  if (oldRef != null && oldRef !== ref3) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      {
        oldRef.value = null;
      }
      const oldRawRefAtom = oldRawRef;
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString
            ? canSetSetupRef(ref3)
              ? setupState[ref3]
              : refs[ref3]
            : ref3.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                const newVal = [refValue];
                {
                  ref3.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          {
            ref3.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
getGlobalThis().requestIdleCallback || (cb => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || (id => clearTimeout(id));
const isAsyncWrapper = i => !!i.type.__asyncLoader;
const isKeepAlive = vnode => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, 'a', target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, 'da', target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook =
    hook.__wdc ||
    (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true,
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook =
      hook.__weh ||
      (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook =
  lifecycle =>
  (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === 'sp') {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
const onBeforeMount = createHook('bm');
const onMounted = createHook('m');
const onBeforeUpdate = createHook('bu');
const onUpdated = createHook('u');
const onBeforeUnmount = createHook('bum');
const onUnmounted = createHook('um');
const onServerPrefetch = createHook('sp');
const onRenderTriggered = createHook('rtg');
const onRenderTracked = createHook('rtc');
function onErrorCaptured(hook, target = currentInstance) {
  injectHook('ec', hook, target);
}
const COMPONENTS = 'components';
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for('v-ndc');
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(Component, false);
      if (
        selfName &&
        (selfName === name ||
          selfName === camelize(name) ||
          selfName === capitalize(camelize(name)))
      ) {
        return Component;
      }
    }
    const res =
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return (
    registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))])
  );
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      isReadonlySource = isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap
          ? isReadonlySource
            ? toReadonly(toReactive(source[i]))
            : toReactive(source[i])
          : source[i],
        i,
        void 0,
        cached,
      );
    }
  } else if (typeof source === 'number') {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (
    currentRenderingInstance.ce ||
    (currentRenderingInstance.parent &&
      isAsyncWrapper(currentRenderingInstance.parent) &&
      currentRenderingInstance.parent.ce)
  ) {
    return (openBlock(), createBlock(Fragment, null, [createVNode('slot', props, fallback)], 64));
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const slotKey =
    props.key || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    (validSlotContent && validSlotContent.key);
  const rendered = createBlock(
    Fragment,
    {
      key:
        (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
        (!validSlotContent && fallback ? '_fb' : ''),
    },
    validSlotContent || [],
    validSlotContent && slots._ === 1 ? 64 : -2,
  );
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + '-s'];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
    return true;
  })
    ? vnodes
    : null;
}
const getPublicInstance = i => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap =
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: i => i,
    $el: i => i.vnode.el,
    $data: i => i.data,
    $props: i => i.props,
    $attrs: i => i.attrs,
    $slots: i => i.slots,
    $refs: i => i.refs,
    $parent: i => getPublicInstance(i.parent),
    $root: i => getPublicInstance(i.root),
    $host: i => i.ce,
    $emit: i => i.emit,
    $options: i => resolveMergedOptions(i),
    $forceUpdate: i =>
      i.f ||
      (i.f = () => {
        queueJob(i.update);
      }),
    $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: i => instanceWatch.bind(i),
  });
const hasSetupBinding = (state, key) =>
  state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === '__v_skip') {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== '$') {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) &&
        hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === '$attrs') {
        track(instance.attrs, 'get', '');
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) &&
      (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      ((globalProperties = appContext.config.globalProperties), hasOwn(globalProperties, key))
    ) {
      {
        return globalProperties[key];
      }
    } else;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === '$' && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions, type } }, key) {
    let normalizedProps, cssModules;
    return !!(
      accessCache[key] ||
      (data !== EMPTY_OBJ && key[0] !== '$' && hasOwn(data, key)) ||
      hasSetupBinding(setupState, key) ||
      ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
      hasOwn(ctx, key) ||
      hasOwn(publicPropertiesMap, key) ||
      hasOwn(appContext.config.globalProperties, key) ||
      ((cssModules = type.__cssModules) && cssModules[key])
    );
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, 'value')) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  },
};
function useSlots() {
  return getContext().slots;
}
function getContext(calledFunctionName) {
  const i = getCurrentInstance();
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return isArray(props)
    ? props.reduce((normalized, p) => ((normalized[p] = null), normalized), {})
    : props;
}
function mergeModels(a, b) {
  if (!a || !b) return a || b;
  if (isArray(a) && isArray(b)) return a.concat(b);
  return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, 'bc');
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters,
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data));
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt)
        ? opt.bind(publicThis, publicThis)
        : isFunction(opt.get)
          ? opt.get.bind(publicThis, publicThis)
          : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set,
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: v => (c.value = v),
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach(key => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, 'c');
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach(_hook => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach(key => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: val => (publicThis[key] = val),
          enumerable: true,
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ('default' in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: v => (injected.value = v),
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map(h2 => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type,
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes('.') ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach(r => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies },
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(m => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === 'expose');
    else {
      const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject,
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from,
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {}),
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap(),
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = (context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {},
      use(plugin, ...options) {
        if (installedPlugins.has(plugin));
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = 'svg';
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      },
    });
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance);
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp
      ? currentApp._context.provides
      : instance
        ? instance.parent == null || instance.ce
          ? instance.vnode.appContext && instance.vnode.appContext.provides
          : instance.parent.provides
        : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance && instance.proxy)
        : defaultValue;
    } else;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = obj => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag },
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) &&
    !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false,
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (
        !rawProps || // for camelCase
        (!hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
          // and converted to camelCase (#955)
          ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey)))
      ) {
        if (options) {
          if (
            rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
              rawPrevProps[kebabKey] !== void 0)
          ) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || (!hasOwn(rawProps, key) && true)) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, 'set', '');
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, (camelKey = camelize(key)))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key),
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, 'default');
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (
      opt[0]
      /* shouldCast */
    ) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (
        opt[1] &&
        /* shouldCastTrue */
        (value === '' || value === hyphenate(key))
      ) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = raw2 => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = (normalized[normalizedKey] =
          isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt));
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === 'Boolean') {
              shouldCast = true;
              break;
            } else if (typeName === 'String') {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === 'Boolean';
        }
        prop[0] =
        /* shouldCast */
          shouldCast;
        prop[1] =
        /* shouldCastTrue */
          shouldCastTrue;
        if (shouldCast || hasOwn(prop, 'default')) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== '$' && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = key => key === '_' || key === '_ctx' || key === '$stable';
const normalizeSlotValue = value =>
  isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false);
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = (instance.slots = createInternalObject());
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, '_', type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent,
  } = options;
  const patch = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    namespace = void 0,
    slotScopeIds = null,
    optimized = !!n2.dynamicChildren,
  ) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals,
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals,
          );
        } else;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref3 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateText(n2.children)), container, anchor);
    } else {
      const el = (n2.el = n1.el);
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateComment(n2.children || '')), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor,
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    if (n2.type === 'svg') {
      namespace = 'svg';
    } else if (n2.type === 'math') {
      namespace = 'mathml';
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      );
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
  };
  const mountElement = (
    vnode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized,
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, 'created');
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== 'value' && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ('value' in props) {
        hostPatchProp(el, 'value', null, props.value, namespace);
      }
      if ((vnodeHook = props.onVnodeBeforeMount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (
        vnode === subTree ||
        (isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode))
      ) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent,
        );
      }
    }
  };
  const mountChildren = (
    children,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
    start = 0,
  ) => {
    for (let i = start; i < children.length; i++) {
      const child = (children[i] = optimized
        ? cloneIfMounted(children[i])
        : normalizeVNode(children[i]));
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      );
    }
  };
  const patchElement = (
    n1,
    n2,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    const el = (n2.el = n1.el);
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (
      (oldProps.innerHTML && newProps.innerHTML == null) ||
      (oldProps.textContent && newProps.textContent == null)
    ) {
      hostSetElementText(el, '');
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false,
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, 'class', null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, 'style', oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === 'value') {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (
    oldChildren,
    newChildren,
    fallbackContainer,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
  ) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container =
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64 | 128))
          ? hostParentNode(oldVNode.el)
          : // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer;
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true,
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== 'value') {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ('value' in newProps) {
        hostPatchProp(el, 'value', oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''));
    const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''));
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds
        ? slotScopeIds.concat(fragmentSlotScopeIds)
        : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      );
    } else {
      if (
        patchFlag > 0 &&
        patchFlag & 64 &&
        dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren
      ) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null ||
          (parentComponent && n2 === parentComponent.subTree)
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true,
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        );
      }
    }
  };
  const processComponent = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized,
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (
    initialVNode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    optimized,
  ) => {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense,
    ));
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = (instance.subTree = createVNode(Comment));
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized,
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = (n2.component = n1.component);
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    namespace,
    optimized,
  ) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (
            root.ce && // @ts-expect-error _def is private
            root.ce._def.shadowRoot !== false
          ) {
            root.ce._injectChildStyle(type);
          }
          const subTree = (instance.subTree = renderComponentRoot(instance));
          patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense,
          );
        }
        if (
          initialVNode.shapeFlag & 256 ||
          (parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256)
        ) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace,
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense,
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = (instance.effect = new ReactiveEffect(componentUpdateFn));
    instance.scope.off();
    const update = (instance.update = effect2.run.bind(effect2));
    const job = (instance.job = effect2.runIfDirty.bind(effect2));
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized = false,
  ) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, '');
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (
    c1,
    c2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]));
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      );
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength,
      );
    }
  };
  const patchKeyedChildren = (
    c1,
    c2,
    container,
    parentAnchor,
    parentComponent,
    parentSuspense,
    namespace,
    slotScopeIds,
    optimized,
  ) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = (c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]));
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = (c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]));
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            (c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i])),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]));
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor =
          nextIndex + 1 < l2
            ? // #13559, fallback to el placeholder for unresolved async component
              anchorVNode.el || anchorVNode.placeholder
            : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true,
              /* cancelled */
            );
          }
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex,
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
      } else if (
        dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || (patchFlag > 0 && patchFlag & 64))
      ) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if ((type === Fragment && patchFlag & (128 | 256)) || (!optimized && shapeFlag & 16)) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (
      (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted)) ||
      shouldInvokeDirs
    ) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
      }, parentSuspense);
    }
  };
  const remove2 = vnode => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  };
  const unmountChildren = (
    children,
    parentComponent,
    parentSuspense,
    doRemove = false,
    optimized = false,
    start = 0,
  ) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = vnode => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, namespace);
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options,
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render),
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return (currentNamespace === 'svg' && type === 'foreignObject') ||
    (currentNamespace === 'mathml' &&
      type === 'annotation-xml' &&
      props &&
      props.encoding &&
      props.encoding.includes('html'))
    ? void 0
    : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (
    (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
    transition &&
    !transition.persisted
  );
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
      }
      if (
        c2.type === Text && // avoid cached text nodes retaining detached dom nodes
        c2.patchFlag !== -1
      ) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
  }
}
const ssrContextKey = Symbol.for('v-scx');
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
function watchSyncEffect(effect2, options) {
  return doWatch(effect2, null, { flush: 'sync' });
}
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = (cb && immediate) || (!cb && flush !== 'post');
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === 'sync') {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {};
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === 'post') {
    baseWatchOptions.scheduler = job => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== 'sync') {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = job => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source)
    ? source.includes('.')
      ? createPathGetter(publicThis, source)
      : () => publicThis[source]
    : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split('.');
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function useModel(props, name, options = EMPTY_OBJ) {
  const i = getCurrentInstance();
  const camelizedName = camelize(name);
  const hyphenatedName = hyphenate(name);
  const modifiers = getModelModifiers(props, camelizedName);
  const res = customRef((track2, trigger2) => {
    let localValue;
    let prevSetValue = EMPTY_OBJ;
    let prevEmittedValue;
    watchSyncEffect(() => {
      const propValue = props[camelizedName];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger2();
      }
    });
    return {
      get() {
        track2();
        return options.get ? options.get(localValue) : localValue;
      },
      set(value) {
        const emittedValue = options.set ? options.set(value) : value;
        if (
          !hasChanged(emittedValue, localValue) &&
          !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))
        ) {
          return;
        }
        const rawProps = i.vnode.props;
        if (
          !(
            rawProps && // check if parent has passed v-model
            (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) &&
            (`onUpdate:${name}` in rawProps ||
              `onUpdate:${camelizedName}` in rawProps ||
              `onUpdate:${hyphenatedName}` in rawProps)
          )
        ) {
          localValue = value;
          trigger2();
        }
        i.emit(`update:${name}`, emittedValue);
        if (
          hasChanged(value, emittedValue) &&
          hasChanged(value, prevSetValue) &&
          !hasChanged(emittedValue, prevEmittedValue)
        ) {
          trigger2();
        }
        prevSetValue = value;
        prevEmittedValue = emittedValue;
      },
    };
  });
  res[Symbol.iterator] = () => {
    let i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return { value: i2++ ? modifiers || EMPTY_OBJ : res, done: false };
        } else {
          return { done: true };
        }
      },
    };
  };
  return res;
}
const getModelModifiers = (props, modelName) => {
  return modelName === 'modelValue' || modelName === 'model-value'
    ? props.modelModifiers
    : props[`${modelName}Modifiers`] ||
        props[`${camelize(modelName)}Modifiers`] ||
        props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith('update:');
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map(a => (isString(a) ? a.trim() : a));
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler =
    props[(handlerName = toHandlerKey(event))] || // also try camelCase event handler (#2249)
    props[(handlerName = toHandlerKey(camelize(event)))];
  if (!handler && isModelListener2) {
    handler = props[(handlerName = toHandlerKey(hyphenate(event)))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = raw2 => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach(key => (normalized[key] = null));
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, '');
  return (
    hasOwn(options, key[0].toLowerCase() + key.slice(1)) ||
    hasOwn(options, hyphenate(key)) ||
    hasOwn(options, key)
  );
}
function markAttrsAccessed() {}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs,
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false
        ? new Proxy(proxyToUse, {
            get(target, key, receiver) {
              warn$1(
                `Property '${String(
                  key,
                )}' was accessed via 'this'. Avoid using 'this' in templates.`,
              );
              return Reflect.get(target, key, receiver);
            },
          })
        : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx,
        ),
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false);
      result = normalizeVNode(
        render2.length > 1
          ? render2(
              false ? shallowReadonly(props) : props,
              false
                ? {
                    get attrs() {
                      markAttrsAccessed();
                      return shallowReadonly(attrs);
                    },
                    slots,
                    emit: emit2,
                  }
                : { attrs, slots, emit: emit2 },
            )
          : render2(false ? shallowReadonly(props) : props, null),
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = attrs => {
  let res;
  for (const key in attrs) {
    if (key === 'class' || key === 'style' || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const isSuspense = type => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = Symbol.for('v-fgt');
const Text = Symbol.for('v-txt');
const Comment = Symbol.for('v-cmt');
const Static = Symbol.for('v-stc');
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push((currentBlock = disableTracking ? null : []));
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true),
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => (key != null ? key : null);
const normalizeRef = ({ ref: ref3, ref_key, ref_for }) => {
  if (typeof ref3 === 'number') {
    ref3 = '' + ref3;
  }
  return ref3 != null
    ? isString(ref3) || isRef(ref3) || isFunction(ref3)
      ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for }
      : ref3
    : null;
};
function createBaseVNode(
  type,
  props = null,
  children = null,
  patchFlag = 0,
  dynamicProps = null,
  shapeFlag = type === Fragment ? 0 : 1,
  isBlockNode = false,
  needFullChildrenNormalization = false,
) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance,
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (
    isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32
  ) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(
  type,
  props = null,
  children = null,
  patchFlag = 0,
  dynamicProps = null,
  isBlockNode = false,
) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true,
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type)
    ? 1
    : isSuspense(type)
      ? 128
      : isTeleport(type)
        ? 64
        : isObject(type)
          ? 4
          : isFunction(type)
            ? 2
            : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true,
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref:
      extraProps && extraProps.ref
        ? // #2078 in the case of <component :is="vnode" ref="extra"/>
          // if the vnode itself already has a ref, cloneVNode will need to merge
          // the refs so the single vnode can be set on multiple refs
          mergeRef && ref3
          ? isArray(ref3)
            ? ref3.concat(normalizeRef(extraProps))
            : [ref3, normalizeRef(extraProps)]
          : normalizeRef(extraProps)
        : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag:
      extraProps && vnode.type !== Fragment ? (patchFlag === -1 ? 16 : patchFlag | 16) : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce,
  };
  if (transition && cloneTransition) {
    setTransitionHooks(cloned, transition.clone(cloned));
  }
  return cloned;
}
function createTextVNode(text = ' ', flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = '', asBlock = false) {
  return asBlock
    ? (openBlock(), createBlock(Comment, null, text))
    : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === 'boolean') {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice(),
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return (child.el === null && child.patchFlag !== -1) || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === 'object') {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (
          incoming &&
          existing !== incoming &&
          !(isArray(existing) && existing.includes(incoming))
        ) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== '') {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true,
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ['', 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return v => {
      if (setters.length > 1) setters.forEach(set => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    v => (currentInstance = v),
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    v => (isInSSRComponentSetup = v),
  );
}
const setCurrentInstance = instance => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null);
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult
          .then(resolvedResult => {
            handleSetupResult(instance, resolvedResult);
          })
          .catch(e => {
            handleError(e, instance, 0);
          });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, 'get', '');
    return target[key];
  },
};
function createSetupContext(instance) {
  const expose = exposed => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose,
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return (
      instance.exposeProxy ||
      (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        },
      }))
    );
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component)
    ? Component.displayName || Component.name
    : Component.name || (includeInferred && Component.__name);
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = registry => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name =
      inferFromRegistry(instance.components || instance.parent.type.components) ||
      inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && '__vccOpts' in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = '3.5.20';
export {
  Comment,
  EffectScope,
  Fragment,
  ReactiveEffect,
  Static,
  Teleport,
  Text,
  callWithAsyncErrorHandling,
  callWithErrorHandling,
  camelize,
  capitalize,
  cloneVNode,
  computed,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createBaseVNode as createElementVNode,
  createRenderer,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  guardReactiveProps,
  h,
  handleError,
  inject,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  isShallow,
  isVNode,
  markRaw,
  mergeModels,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  onWatcherCleanup,
  openBlock,
  provide,
  proxyRefs,
  queuePostFlushCb,
  reactive,
  readonly,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  setBlockTracking,
  setTransitionHooks,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  ssrContextKey,
  toDisplayString,
  toHandlerKey,
  toRaw,
  toRef,
  triggerRef,
  unref,
  useModel,
  useSSRContext,
  useSlots,
  useTemplateRef,
  version,
  watch,
  watchEffect,
  watchSyncEffect,
  withCtx,
  withDirectives,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS1jb3JlLmVzbS1idW5kbGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHZ1ZStydW50aW1lLWNvcmVAMy41LjIwL25vZGVfbW9kdWxlcy9AdnVlL3J1bnRpbWUtY29yZS9kaXN0L3J1bnRpbWUtY29yZS5lc20tYnVuZGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQHZ1ZS9ydW50aW1lLWNvcmUgdjMuNS4yMFxuKiAoYykgMjAxOC1wcmVzZW50IFl1eGkgKEV2YW4pIFlvdSBhbmQgVnVlIGNvbnRyaWJ1dG9yc1xuKiBAbGljZW5zZSBNSVRcbioqL1xuaW1wb3J0IHsgcGF1c2VUcmFja2luZywgcmVzZXRUcmFja2luZywgaXNSZWYsIHRvUmF3LCB0cmF2ZXJzZSwgc2hhbGxvd1JlZiwgcmVhZG9ubHksIGlzUmVhY3RpdmUsIHJlZiwgaXNTaGFsbG93LCBpc1JlYWRvbmx5LCBzaGFsbG93UmVhZEFycmF5LCB0b1JlYWRvbmx5LCB0b1JlYWN0aXZlLCBzaGFsbG93UmVhZG9ubHksIHRyYWNrLCByZWFjdGl2ZSwgc2hhbGxvd1JlYWN0aXZlLCB0cmlnZ2VyLCBSZWFjdGl2ZUVmZmVjdCwgd2F0Y2ggYXMgd2F0Y2gkMSwgY3VzdG9tUmVmLCBpc1Byb3h5LCBwcm94eVJlZnMsIG1hcmtSYXcsIEVmZmVjdFNjb3BlLCBjb21wdXRlZCBhcyBjb21wdXRlZCQxIH0gZnJvbSAnQHZ1ZS9yZWFjdGl2aXR5JztcbmV4cG9ydCB7IEVmZmVjdFNjb3BlLCBSZWFjdGl2ZUVmZmVjdCwgVHJhY2tPcFR5cGVzLCBUcmlnZ2VyT3BUeXBlcywgY3VzdG9tUmVmLCBlZmZlY3QsIGVmZmVjdFNjb3BlLCBnZXRDdXJyZW50U2NvcGUsIGdldEN1cnJlbnRXYXRjaGVyLCBpc1Byb3h5LCBpc1JlYWN0aXZlLCBpc1JlYWRvbmx5LCBpc1JlZiwgaXNTaGFsbG93LCBtYXJrUmF3LCBvblNjb3BlRGlzcG9zZSwgb25XYXRjaGVyQ2xlYW51cCwgcHJveHlSZWZzLCByZWFjdGl2ZSwgcmVhZG9ubHksIHJlZiwgc2hhbGxvd1JlYWN0aXZlLCBzaGFsbG93UmVhZG9ubHksIHNoYWxsb3dSZWYsIHN0b3AsIHRvUmF3LCB0b1JlZiwgdG9SZWZzLCB0b1ZhbHVlLCB0cmlnZ2VyUmVmLCB1bnJlZiB9IGZyb20gJ0B2dWUvcmVhY3Rpdml0eSc7XG5pbXBvcnQgeyBpc1N0cmluZywgaXNGdW5jdGlvbiwgRU1QVFlfT0JKLCBpc1Byb21pc2UsIGlzQXJyYXksIE5PT1AsIGdldEdsb2JhbFRoaXMsIGV4dGVuZCwgaXNCdWlsdEluRGlyZWN0aXZlLCBOTywgaGFzT3duLCByZW1vdmUsIGRlZiwgaXNPbiwgaXNSZXNlcnZlZFByb3AsIG5vcm1hbGl6ZUNsYXNzLCBzdHJpbmdpZnlTdHlsZSwgbm9ybWFsaXplU3R5bGUsIGlzS25vd25TdmdBdHRyLCBpc0Jvb2xlYW5BdHRyLCBpc0tub3duSHRtbEF0dHIsIGluY2x1ZGVCb29sZWFuQXR0ciwgaXNSZW5kZXJhYmxlQXR0clZhbHVlLCBub3JtYWxpemVDc3NWYXJWYWx1ZSwgZ2V0RXNjYXBlZENzc1Zhck5hbWUsIGlzT2JqZWN0LCBpc1JlZ0V4cCwgaW52b2tlQXJyYXlGbnMsIHRvSGFuZGxlcktleSwgY2FtZWxpemUsIGNhcGl0YWxpemUsIGlzU3ltYm9sLCBpc0dsb2JhbGx5QWxsb3dlZCwgRU1QVFlfQVJSLCBoeXBoZW5hdGUsIG1ha2VNYXAsIHRvUmF3VHlwZSwgaGFzQ2hhbmdlZCwgbG9vc2VUb051bWJlciwgaXNNb2RlbExpc3RlbmVyLCB0b051bWJlciB9IGZyb20gJ0B2dWUvc2hhcmVkJztcbmV4cG9ydCB7IGNhbWVsaXplLCBjYXBpdGFsaXplLCBub3JtYWxpemVDbGFzcywgbm9ybWFsaXplUHJvcHMsIG5vcm1hbGl6ZVN0eWxlLCB0b0Rpc3BsYXlTdHJpbmcsIHRvSGFuZGxlcktleSB9IGZyb20gJ0B2dWUvc2hhcmVkJztcblxuY29uc3Qgc3RhY2sgPSBbXTtcbmZ1bmN0aW9uIHB1c2hXYXJuaW5nQ29udGV4dCh2bm9kZSkge1xuICBzdGFjay5wdXNoKHZub2RlKTtcbn1cbmZ1bmN0aW9uIHBvcFdhcm5pbmdDb250ZXh0KCkge1xuICBzdGFjay5wb3AoKTtcbn1cbmxldCBpc1dhcm5pbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHdhcm4kMShtc2csIC4uLmFyZ3MpIHtcbiAgaWYgKGlzV2FybmluZykgcmV0dXJuO1xuICBpc1dhcm5pbmcgPSB0cnVlO1xuICBwYXVzZVRyYWNraW5nKCk7XG4gIGNvbnN0IGluc3RhbmNlID0gc3RhY2subGVuZ3RoID8gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uY29tcG9uZW50IDogbnVsbDtcbiAgY29uc3QgYXBwV2FybkhhbmRsZXIgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZy53YXJuSGFuZGxlcjtcbiAgY29uc3QgdHJhY2UgPSBnZXRDb21wb25lbnRUcmFjZSgpO1xuICBpZiAoYXBwV2FybkhhbmRsZXIpIHtcbiAgICBjYWxsV2l0aEVycm9ySGFuZGxpbmcoXG4gICAgICBhcHBXYXJuSGFuZGxlcixcbiAgICAgIGluc3RhbmNlLFxuICAgICAgMTEsXG4gICAgICBbXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgICBtc2cgKyBhcmdzLm1hcCgoYSkgPT4ge1xuICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IGEudG9TdHJpbmcpID09IG51bGwgPyB2b2lkIDAgOiBfYS5jYWxsKGEpKSAhPSBudWxsID8gX2IgOiBKU09OLnN0cmluZ2lmeShhKTtcbiAgICAgICAgfSkuam9pbihcIlwiKSxcbiAgICAgICAgaW5zdGFuY2UgJiYgaW5zdGFuY2UucHJveHksXG4gICAgICAgIHRyYWNlLm1hcChcbiAgICAgICAgICAoeyB2bm9kZSB9KSA9PiBgYXQgPCR7Zm9ybWF0Q29tcG9uZW50TmFtZShpbnN0YW5jZSwgdm5vZGUudHlwZSl9PmBcbiAgICAgICAgKS5qb2luKFwiXFxuXCIpLFxuICAgICAgICB0cmFjZVxuICAgICAgXVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgd2FybkFyZ3MgPSBbYFtWdWUgd2Fybl06ICR7bXNnfWAsIC4uLmFyZ3NdO1xuICAgIGlmICh0cmFjZS5sZW5ndGggJiYgLy8gYXZvaWQgc3BhbW1pbmcgY29uc29sZSBkdXJpbmcgdGVzdHNcbiAgICB0cnVlKSB7XG4gICAgICB3YXJuQXJncy5wdXNoKGBcbmAsIC4uLmZvcm1hdFRyYWNlKHRyYWNlKSk7XG4gICAgfVxuICAgIGNvbnNvbGUud2FybiguLi53YXJuQXJncyk7XG4gIH1cbiAgcmVzZXRUcmFja2luZygpO1xuICBpc1dhcm5pbmcgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldENvbXBvbmVudFRyYWNlKCkge1xuICBsZXQgY3VycmVudFZOb2RlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gIGlmICghY3VycmVudFZOb2RlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IG5vcm1hbGl6ZWRTdGFjayA9IFtdO1xuICB3aGlsZSAoY3VycmVudFZOb2RlKSB7XG4gICAgY29uc3QgbGFzdCA9IG5vcm1hbGl6ZWRTdGFja1swXTtcbiAgICBpZiAobGFzdCAmJiBsYXN0LnZub2RlID09PSBjdXJyZW50Vk5vZGUpIHtcbiAgICAgIGxhc3QucmVjdXJzZUNvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vcm1hbGl6ZWRTdGFjay5wdXNoKHtcbiAgICAgICAgdm5vZGU6IGN1cnJlbnRWTm9kZSxcbiAgICAgICAgcmVjdXJzZUNvdW50OiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSBjdXJyZW50Vk5vZGUuY29tcG9uZW50ICYmIGN1cnJlbnRWTm9kZS5jb21wb25lbnQucGFyZW50O1xuICAgIGN1cnJlbnRWTm9kZSA9IHBhcmVudEluc3RhbmNlICYmIHBhcmVudEluc3RhbmNlLnZub2RlO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVkU3RhY2s7XG59XG5mdW5jdGlvbiBmb3JtYXRUcmFjZSh0cmFjZSkge1xuICBjb25zdCBsb2dzID0gW107XG4gIHRyYWNlLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4gICAgbG9ncy5wdXNoKC4uLmkgPT09IDAgPyBbXSA6IFtgXG5gXSwgLi4uZm9ybWF0VHJhY2VFbnRyeShlbnRyeSkpO1xuICB9KTtcbiAgcmV0dXJuIGxvZ3M7XG59XG5mdW5jdGlvbiBmb3JtYXRUcmFjZUVudHJ5KHsgdm5vZGUsIHJlY3Vyc2VDb3VudCB9KSB7XG4gIGNvbnN0IHBvc3RmaXggPSByZWN1cnNlQ291bnQgPiAwID8gYC4uLiAoJHtyZWN1cnNlQ291bnR9IHJlY3Vyc2l2ZSBjYWxscylgIDogYGA7XG4gIGNvbnN0IGlzUm9vdCA9IHZub2RlLmNvbXBvbmVudCA/IHZub2RlLmNvbXBvbmVudC5wYXJlbnQgPT0gbnVsbCA6IGZhbHNlO1xuICBjb25zdCBvcGVuID0gYCBhdCA8JHtmb3JtYXRDb21wb25lbnROYW1lKFxuICAgIHZub2RlLmNvbXBvbmVudCxcbiAgICB2bm9kZS50eXBlLFxuICAgIGlzUm9vdFxuICApfWA7XG4gIGNvbnN0IGNsb3NlID0gYD5gICsgcG9zdGZpeDtcbiAgcmV0dXJuIHZub2RlLnByb3BzID8gW29wZW4sIC4uLmZvcm1hdFByb3BzKHZub2RlLnByb3BzKSwgY2xvc2VdIDogW29wZW4gKyBjbG9zZV07XG59XG5mdW5jdGlvbiBmb3JtYXRQcm9wcyhwcm9wcykge1xuICBjb25zdCByZXMgPSBbXTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKTtcbiAga2V5cy5zbGljZSgwLCAzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICByZXMucHVzaCguLi5mb3JtYXRQcm9wKGtleSwgcHJvcHNba2V5XSkpO1xuICB9KTtcbiAgaWYgKGtleXMubGVuZ3RoID4gMykge1xuICAgIHJlcy5wdXNoKGAgLi4uYCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGZvcm1hdFByb3Aoa2V5LCB2YWx1ZSwgcmF3KSB7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICByZXR1cm4gcmF3ID8gdmFsdWUgOiBbYCR7a2V5fT0ke3ZhbHVlfWBdO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gcmF3ID8gdmFsdWUgOiBbYCR7a2V5fT0ke3ZhbHVlfWBdO1xuICB9IGVsc2UgaWYgKGlzUmVmKHZhbHVlKSkge1xuICAgIHZhbHVlID0gZm9ybWF0UHJvcChrZXksIHRvUmF3KHZhbHVlLnZhbHVlKSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHJhdyA/IHZhbHVlIDogW2Ake2tleX09UmVmPGAsIHZhbHVlLCBgPmBdO1xuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgcmV0dXJuIFtgJHtrZXl9PWZuJHt2YWx1ZS5uYW1lID8gYDwke3ZhbHVlLm5hbWV9PmAgOiBgYH1gXTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IHRvUmF3KHZhbHVlKTtcbiAgICByZXR1cm4gcmF3ID8gdmFsdWUgOiBbYCR7a2V5fT1gLCB2YWx1ZV07XG4gIH1cbn1cbmZ1bmN0aW9uIGFzc2VydE51bWJlcih2YWwsIHR5cGUpIHtcbiAgaWYgKCEhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSByZXR1cm47XG4gIGlmICh2YWwgPT09IHZvaWQgMCkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsICE9PSBcIm51bWJlclwiKSB7XG4gICAgd2FybiQxKGAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIG51bWJlciAtIGdvdCAke0pTT04uc3RyaW5naWZ5KHZhbCl9LmApO1xuICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICB3YXJuJDEoYCR7dHlwZX0gaXMgTmFOIC0gdGhlIGR1cmF0aW9uIGV4cHJlc3Npb24gbWlnaHQgYmUgaW5jb3JyZWN0LmApO1xuICB9XG59XG5cbmNvbnN0IEVycm9yQ29kZXMgPSB7XG4gIFwiU0VUVVBfRlVOQ1RJT05cIjogMCxcbiAgXCIwXCI6IFwiU0VUVVBfRlVOQ1RJT05cIixcbiAgXCJSRU5ERVJfRlVOQ1RJT05cIjogMSxcbiAgXCIxXCI6IFwiUkVOREVSX0ZVTkNUSU9OXCIsXG4gIFwiTkFUSVZFX0VWRU5UX0hBTkRMRVJcIjogNSxcbiAgXCI1XCI6IFwiTkFUSVZFX0VWRU5UX0hBTkRMRVJcIixcbiAgXCJDT01QT05FTlRfRVZFTlRfSEFORExFUlwiOiA2LFxuICBcIjZcIjogXCJDT01QT05FTlRfRVZFTlRfSEFORExFUlwiLFxuICBcIlZOT0RFX0hPT0tcIjogNyxcbiAgXCI3XCI6IFwiVk5PREVfSE9PS1wiLFxuICBcIkRJUkVDVElWRV9IT09LXCI6IDgsXG4gIFwiOFwiOiBcIkRJUkVDVElWRV9IT09LXCIsXG4gIFwiVFJBTlNJVElPTl9IT09LXCI6IDksXG4gIFwiOVwiOiBcIlRSQU5TSVRJT05fSE9PS1wiLFxuICBcIkFQUF9FUlJPUl9IQU5ETEVSXCI6IDEwLFxuICBcIjEwXCI6IFwiQVBQX0VSUk9SX0hBTkRMRVJcIixcbiAgXCJBUFBfV0FSTl9IQU5ETEVSXCI6IDExLFxuICBcIjExXCI6IFwiQVBQX1dBUk5fSEFORExFUlwiLFxuICBcIkZVTkNUSU9OX1JFRlwiOiAxMixcbiAgXCIxMlwiOiBcIkZVTkNUSU9OX1JFRlwiLFxuICBcIkFTWU5DX0NPTVBPTkVOVF9MT0FERVJcIjogMTMsXG4gIFwiMTNcIjogXCJBU1lOQ19DT01QT05FTlRfTE9BREVSXCIsXG4gIFwiU0NIRURVTEVSXCI6IDE0LFxuICBcIjE0XCI6IFwiU0NIRURVTEVSXCIsXG4gIFwiQ09NUE9ORU5UX1VQREFURVwiOiAxNSxcbiAgXCIxNVwiOiBcIkNPTVBPTkVOVF9VUERBVEVcIixcbiAgXCJBUFBfVU5NT1VOVF9DTEVBTlVQXCI6IDE2LFxuICBcIjE2XCI6IFwiQVBQX1VOTU9VTlRfQ0xFQU5VUFwiXG59O1xuY29uc3QgRXJyb3JUeXBlU3RyaW5ncyQxID0ge1xuICBbXCJzcFwiXTogXCJzZXJ2ZXJQcmVmZXRjaCBob29rXCIsXG4gIFtcImJjXCJdOiBcImJlZm9yZUNyZWF0ZSBob29rXCIsXG4gIFtcImNcIl06IFwiY3JlYXRlZCBob29rXCIsXG4gIFtcImJtXCJdOiBcImJlZm9yZU1vdW50IGhvb2tcIixcbiAgW1wibVwiXTogXCJtb3VudGVkIGhvb2tcIixcbiAgW1wiYnVcIl06IFwiYmVmb3JlVXBkYXRlIGhvb2tcIixcbiAgW1widVwiXTogXCJ1cGRhdGVkXCIsXG4gIFtcImJ1bVwiXTogXCJiZWZvcmVVbm1vdW50IGhvb2tcIixcbiAgW1widW1cIl06IFwidW5tb3VudGVkIGhvb2tcIixcbiAgW1wiYVwiXTogXCJhY3RpdmF0ZWQgaG9va1wiLFxuICBbXCJkYVwiXTogXCJkZWFjdGl2YXRlZCBob29rXCIsXG4gIFtcImVjXCJdOiBcImVycm9yQ2FwdHVyZWQgaG9va1wiLFxuICBbXCJydGNcIl06IFwicmVuZGVyVHJhY2tlZCBob29rXCIsXG4gIFtcInJ0Z1wiXTogXCJyZW5kZXJUcmlnZ2VyZWQgaG9va1wiLFxuICBbMF06IFwic2V0dXAgZnVuY3Rpb25cIixcbiAgWzFdOiBcInJlbmRlciBmdW5jdGlvblwiLFxuICBbMl06IFwid2F0Y2hlciBnZXR0ZXJcIixcbiAgWzNdOiBcIndhdGNoZXIgY2FsbGJhY2tcIixcbiAgWzRdOiBcIndhdGNoZXIgY2xlYW51cCBmdW5jdGlvblwiLFxuICBbNV06IFwibmF0aXZlIGV2ZW50IGhhbmRsZXJcIixcbiAgWzZdOiBcImNvbXBvbmVudCBldmVudCBoYW5kbGVyXCIsXG4gIFs3XTogXCJ2bm9kZSBob29rXCIsXG4gIFs4XTogXCJkaXJlY3RpdmUgaG9va1wiLFxuICBbOV06IFwidHJhbnNpdGlvbiBob29rXCIsXG4gIFsxMF06IFwiYXBwIGVycm9ySGFuZGxlclwiLFxuICBbMTFdOiBcImFwcCB3YXJuSGFuZGxlclwiLFxuICBbMTJdOiBcInJlZiBmdW5jdGlvblwiLFxuICBbMTNdOiBcImFzeW5jIGNvbXBvbmVudCBsb2FkZXJcIixcbiAgWzE0XTogXCJzY2hlZHVsZXIgZmx1c2hcIixcbiAgWzE1XTogXCJjb21wb25lbnQgdXBkYXRlXCIsXG4gIFsxNl06IFwiYXBwIHVubW91bnQgY2xlYW51cCBmdW5jdGlvblwiXG59O1xuZnVuY3Rpb24gY2FsbFdpdGhFcnJvckhhbmRsaW5nKGZuLCBpbnN0YW5jZSwgdHlwZSwgYXJncykge1xuICB0cnkge1xuICAgIHJldHVybiBhcmdzID8gZm4oLi4uYXJncykgOiBmbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBoYW5kbGVFcnJvcihlcnIsIGluc3RhbmNlLCB0eXBlKTtcbiAgfVxufVxuZnVuY3Rpb24gY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoZm4sIGluc3RhbmNlLCB0eXBlLCBhcmdzKSB7XG4gIGlmIChpc0Z1bmN0aW9uKGZuKSkge1xuICAgIGNvbnN0IHJlcyA9IGNhbGxXaXRoRXJyb3JIYW5kbGluZyhmbiwgaW5zdGFuY2UsIHR5cGUsIGFyZ3MpO1xuICAgIGlmIChyZXMgJiYgaXNQcm9taXNlKHJlcykpIHtcbiAgICAgIHJlcy5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVyciwgaW5zdGFuY2UsIHR5cGUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgaWYgKGlzQXJyYXkoZm4pKSB7XG4gICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzLnB1c2goY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoZm5baV0sIGluc3RhbmNlLCB0eXBlLCBhcmdzKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm4kMShcbiAgICAgIGBJbnZhbGlkIHZhbHVlIHR5cGUgcGFzc2VkIHRvIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKCk6ICR7dHlwZW9mIGZufWBcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIsIGluc3RhbmNlLCB0eXBlLCB0aHJvd0luRGV2ID0gdHJ1ZSkge1xuICBjb25zdCBjb250ZXh0Vk5vZGUgPSBpbnN0YW5jZSA/IGluc3RhbmNlLnZub2RlIDogbnVsbDtcbiAgY29uc3QgeyBlcnJvckhhbmRsZXIsIHRocm93VW5oYW5kbGVkRXJyb3JJblByb2R1Y3Rpb24gfSA9IGluc3RhbmNlICYmIGluc3RhbmNlLmFwcENvbnRleHQuY29uZmlnIHx8IEVNUFRZX09CSjtcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgbGV0IGN1ciA9IGluc3RhbmNlLnBhcmVudDtcbiAgICBjb25zdCBleHBvc2VkSW5zdGFuY2UgPSBpbnN0YW5jZS5wcm94eTtcbiAgICBjb25zdCBlcnJvckluZm8gPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gRXJyb3JUeXBlU3RyaW5ncyQxW3R5cGVdIDogYGh0dHBzOi8vdnVlanMub3JnL2Vycm9yLXJlZmVyZW5jZS8jcnVudGltZS0ke3R5cGV9YDtcbiAgICB3aGlsZSAoY3VyKSB7XG4gICAgICBjb25zdCBlcnJvckNhcHR1cmVkSG9va3MgPSBjdXIuZWM7XG4gICAgICBpZiAoZXJyb3JDYXB0dXJlZEhvb2tzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JDYXB0dXJlZEhvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FwdHVyZWRIb29rc1tpXShlcnIsIGV4cG9zZWRJbnN0YW5jZSwgZXJyb3JJbmZvKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN1ciA9IGN1ci5wYXJlbnQ7XG4gICAgfVxuICAgIGlmIChlcnJvckhhbmRsZXIpIHtcbiAgICAgIHBhdXNlVHJhY2tpbmcoKTtcbiAgICAgIGNhbGxXaXRoRXJyb3JIYW5kbGluZyhlcnJvckhhbmRsZXIsIG51bGwsIDEwLCBbXG4gICAgICAgIGVycixcbiAgICAgICAgZXhwb3NlZEluc3RhbmNlLFxuICAgICAgICBlcnJvckluZm9cbiAgICAgIF0pO1xuICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBsb2dFcnJvcihlcnIsIHR5cGUsIGNvbnRleHRWTm9kZSwgdGhyb3dJbkRldiwgdGhyb3dVbmhhbmRsZWRFcnJvckluUHJvZHVjdGlvbik7XG59XG5mdW5jdGlvbiBsb2dFcnJvcihlcnIsIHR5cGUsIGNvbnRleHRWTm9kZSwgdGhyb3dJbkRldiA9IHRydWUsIHRocm93SW5Qcm9kID0gZmFsc2UpIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBjb25zdCBpbmZvID0gRXJyb3JUeXBlU3RyaW5ncyQxW3R5cGVdO1xuICAgIGlmIChjb250ZXh0Vk5vZGUpIHtcbiAgICAgIHB1c2hXYXJuaW5nQ29udGV4dChjb250ZXh0Vk5vZGUpO1xuICAgIH1cbiAgICB3YXJuJDEoYFVuaGFuZGxlZCBlcnJvciR7aW5mbyA/IGAgZHVyaW5nIGV4ZWN1dGlvbiBvZiAke2luZm99YCA6IGBgfWApO1xuICAgIGlmIChjb250ZXh0Vk5vZGUpIHtcbiAgICAgIHBvcFdhcm5pbmdDb250ZXh0KCk7XG4gICAgfVxuICAgIGlmICh0aHJvd0luRGV2KSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhyb3dJblByb2QpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG59XG5cbmNvbnN0IHF1ZXVlID0gW107XG5sZXQgZmx1c2hJbmRleCA9IC0xO1xuY29uc3QgcGVuZGluZ1Bvc3RGbHVzaENicyA9IFtdO1xubGV0IGFjdGl2ZVBvc3RGbHVzaENicyA9IG51bGw7XG5sZXQgcG9zdEZsdXNoSW5kZXggPSAwO1xuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gLyogQF9fUFVSRV9fICovIFByb21pc2UucmVzb2x2ZSgpO1xubGV0IGN1cnJlbnRGbHVzaFByb21pc2UgPSBudWxsO1xuY29uc3QgUkVDVVJTSU9OX0xJTUlUID0gMTAwO1xuZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgY29uc3QgcCA9IGN1cnJlbnRGbHVzaFByb21pc2UgfHwgcmVzb2x2ZWRQcm9taXNlO1xuICByZXR1cm4gZm4gPyBwLnRoZW4odGhpcyA/IGZuLmJpbmQodGhpcykgOiBmbikgOiBwO1xufVxuZnVuY3Rpb24gZmluZEluc2VydGlvbkluZGV4KGlkKSB7XG4gIGxldCBzdGFydCA9IGZsdXNoSW5kZXggKyAxO1xuICBsZXQgZW5kID0gcXVldWUubGVuZ3RoO1xuICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcbiAgICBjb25zdCBtaWRkbGUgPSBzdGFydCArIGVuZCA+Pj4gMTtcbiAgICBjb25zdCBtaWRkbGVKb2IgPSBxdWV1ZVttaWRkbGVdO1xuICAgIGNvbnN0IG1pZGRsZUpvYklkID0gZ2V0SWQobWlkZGxlSm9iKTtcbiAgICBpZiAobWlkZGxlSm9iSWQgPCBpZCB8fCBtaWRkbGVKb2JJZCA9PT0gaWQgJiYgbWlkZGxlSm9iLmZsYWdzICYgMikge1xuICAgICAgc3RhcnQgPSBtaWRkbGUgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmQgPSBtaWRkbGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdGFydDtcbn1cbmZ1bmN0aW9uIHF1ZXVlSm9iKGpvYikge1xuICBpZiAoIShqb2IuZmxhZ3MgJiAxKSkge1xuICAgIGNvbnN0IGpvYklkID0gZ2V0SWQoam9iKTtcbiAgICBjb25zdCBsYXN0Sm9iID0gcXVldWVbcXVldWUubGVuZ3RoIC0gMV07XG4gICAgaWYgKCFsYXN0Sm9iIHx8IC8vIGZhc3QgcGF0aCB3aGVuIHRoZSBqb2IgaWQgaXMgbGFyZ2VyIHRoYW4gdGhlIHRhaWxcbiAgICAhKGpvYi5mbGFncyAmIDIpICYmIGpvYklkID49IGdldElkKGxhc3RKb2IpKSB7XG4gICAgICBxdWV1ZS5wdXNoKGpvYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXVlLnNwbGljZShmaW5kSW5zZXJ0aW9uSW5kZXgoam9iSWQpLCAwLCBqb2IpO1xuICAgIH1cbiAgICBqb2IuZmxhZ3MgfD0gMTtcbiAgICBxdWV1ZUZsdXNoKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHF1ZXVlRmx1c2goKSB7XG4gIGlmICghY3VycmVudEZsdXNoUHJvbWlzZSkge1xuICAgIGN1cnJlbnRGbHVzaFByb21pc2UgPSByZXNvbHZlZFByb21pc2UudGhlbihmbHVzaEpvYnMpO1xuICB9XG59XG5mdW5jdGlvbiBxdWV1ZVBvc3RGbHVzaENiKGNiKSB7XG4gIGlmICghaXNBcnJheShjYikpIHtcbiAgICBpZiAoYWN0aXZlUG9zdEZsdXNoQ2JzICYmIGNiLmlkID09PSAtMSkge1xuICAgICAgYWN0aXZlUG9zdEZsdXNoQ2JzLnNwbGljZShwb3N0Rmx1c2hJbmRleCArIDEsIDAsIGNiKTtcbiAgICB9IGVsc2UgaWYgKCEoY2IuZmxhZ3MgJiAxKSkge1xuICAgICAgcGVuZGluZ1Bvc3RGbHVzaENicy5wdXNoKGNiKTtcbiAgICAgIGNiLmZsYWdzIHw9IDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBlbmRpbmdQb3N0Rmx1c2hDYnMucHVzaCguLi5jYik7XG4gIH1cbiAgcXVldWVGbHVzaCgpO1xufVxuZnVuY3Rpb24gZmx1c2hQcmVGbHVzaENicyhpbnN0YW5jZSwgc2VlbiwgaSA9IGZsdXNoSW5kZXggKyAxKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgc2VlbiA9IHNlZW4gfHwgLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgfVxuICBmb3IgKDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2IgPSBxdWV1ZVtpXTtcbiAgICBpZiAoY2IgJiYgY2IuZmxhZ3MgJiAyKSB7XG4gICAgICBpZiAoaW5zdGFuY2UgJiYgY2IuaWQgIT09IGluc3RhbmNlLnVpZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGNoZWNrUmVjdXJzaXZlVXBkYXRlcyhzZWVuLCBjYikpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBxdWV1ZS5zcGxpY2UoaSwgMSk7XG4gICAgICBpLS07XG4gICAgICBpZiAoY2IuZmxhZ3MgJiA0KSB7XG4gICAgICAgIGNiLmZsYWdzICY9IC0yO1xuICAgICAgfVxuICAgICAgY2IoKTtcbiAgICAgIGlmICghKGNiLmZsYWdzICYgNCkpIHtcbiAgICAgICAgY2IuZmxhZ3MgJj0gLTI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBmbHVzaFBvc3RGbHVzaENicyhzZWVuKSB7XG4gIGlmIChwZW5kaW5nUG9zdEZsdXNoQ2JzLmxlbmd0aCkge1xuICAgIGNvbnN0IGRlZHVwZWQgPSBbLi4ubmV3IFNldChwZW5kaW5nUG9zdEZsdXNoQ2JzKV0uc29ydChcbiAgICAgIChhLCBiKSA9PiBnZXRJZChhKSAtIGdldElkKGIpXG4gICAgKTtcbiAgICBwZW5kaW5nUG9zdEZsdXNoQ2JzLmxlbmd0aCA9IDA7XG4gICAgaWYgKGFjdGl2ZVBvc3RGbHVzaENicykge1xuICAgICAgYWN0aXZlUG9zdEZsdXNoQ2JzLnB1c2goLi4uZGVkdXBlZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFjdGl2ZVBvc3RGbHVzaENicyA9IGRlZHVwZWQ7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHNlZW4gPSBzZWVuIHx8IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGZvciAocG9zdEZsdXNoSW5kZXggPSAwOyBwb3N0Rmx1c2hJbmRleCA8IGFjdGl2ZVBvc3RGbHVzaENicy5sZW5ndGg7IHBvc3RGbHVzaEluZGV4KyspIHtcbiAgICAgIGNvbnN0IGNiID0gYWN0aXZlUG9zdEZsdXNoQ2JzW3Bvc3RGbHVzaEluZGV4XTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGNoZWNrUmVjdXJzaXZlVXBkYXRlcyhzZWVuLCBjYikpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY2IuZmxhZ3MgJiA0KSB7XG4gICAgICAgIGNiLmZsYWdzICY9IC0yO1xuICAgICAgfVxuICAgICAgaWYgKCEoY2IuZmxhZ3MgJiA4KSkgY2IoKTtcbiAgICAgIGNiLmZsYWdzICY9IC0yO1xuICAgIH1cbiAgICBhY3RpdmVQb3N0Rmx1c2hDYnMgPSBudWxsO1xuICAgIHBvc3RGbHVzaEluZGV4ID0gMDtcbiAgfVxufVxuY29uc3QgZ2V0SWQgPSAoam9iKSA9PiBqb2IuaWQgPT0gbnVsbCA/IGpvYi5mbGFncyAmIDIgPyAtMSA6IEluZmluaXR5IDogam9iLmlkO1xuZnVuY3Rpb24gZmx1c2hKb2JzKHNlZW4pIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBzZWVuID0gc2VlbiB8fCAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICB9XG4gIGNvbnN0IGNoZWNrID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IChqb2IpID0+IGNoZWNrUmVjdXJzaXZlVXBkYXRlcyhzZWVuLCBqb2IpIDogTk9PUDtcbiAgdHJ5IHtcbiAgICBmb3IgKGZsdXNoSW5kZXggPSAwOyBmbHVzaEluZGV4IDwgcXVldWUubGVuZ3RoOyBmbHVzaEluZGV4KyspIHtcbiAgICAgIGNvbnN0IGpvYiA9IHF1ZXVlW2ZsdXNoSW5kZXhdO1xuICAgICAgaWYgKGpvYiAmJiAhKGpvYi5mbGFncyAmIDgpKSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGNoZWNrKGpvYikpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoam9iLmZsYWdzICYgNCkge1xuICAgICAgICAgIGpvYi5mbGFncyAmPSB+MTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsV2l0aEVycm9ySGFuZGxpbmcoXG4gICAgICAgICAgam9iLFxuICAgICAgICAgIGpvYi5pLFxuICAgICAgICAgIGpvYi5pID8gMTUgOiAxNFxuICAgICAgICApO1xuICAgICAgICBpZiAoIShqb2IuZmxhZ3MgJiA0KSkge1xuICAgICAgICAgIGpvYi5mbGFncyAmPSB+MTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBmb3IgKDsgZmx1c2hJbmRleCA8IHF1ZXVlLmxlbmd0aDsgZmx1c2hJbmRleCsrKSB7XG4gICAgICBjb25zdCBqb2IgPSBxdWV1ZVtmbHVzaEluZGV4XTtcbiAgICAgIGlmIChqb2IpIHtcbiAgICAgICAgam9iLmZsYWdzICY9IC0yO1xuICAgICAgfVxuICAgIH1cbiAgICBmbHVzaEluZGV4ID0gLTE7XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICBmbHVzaFBvc3RGbHVzaENicyhzZWVuKTtcbiAgICBjdXJyZW50Rmx1c2hQcm9taXNlID0gbnVsbDtcbiAgICBpZiAocXVldWUubGVuZ3RoIHx8IHBlbmRpbmdQb3N0Rmx1c2hDYnMubGVuZ3RoKSB7XG4gICAgICBmbHVzaEpvYnMoc2Vlbik7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBjaGVja1JlY3Vyc2l2ZVVwZGF0ZXMoc2VlbiwgZm4pIHtcbiAgY29uc3QgY291bnQgPSBzZWVuLmdldChmbikgfHwgMDtcbiAgaWYgKGNvdW50ID4gUkVDVVJTSU9OX0xJTUlUKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBmbi5pO1xuICAgIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBpbnN0YW5jZSAmJiBnZXRDb21wb25lbnROYW1lKGluc3RhbmNlLnR5cGUpO1xuICAgIGhhbmRsZUVycm9yKFxuICAgICAgYE1heGltdW0gcmVjdXJzaXZlIHVwZGF0ZXMgZXhjZWVkZWQke2NvbXBvbmVudE5hbWUgPyBgIGluIGNvbXBvbmVudCA8JHtjb21wb25lbnROYW1lfT5gIDogYGB9LiBUaGlzIG1lYW5zIHlvdSBoYXZlIGEgcmVhY3RpdmUgZWZmZWN0IHRoYXQgaXMgbXV0YXRpbmcgaXRzIG93biBkZXBlbmRlbmNpZXMgYW5kIHRodXMgcmVjdXJzaXZlbHkgdHJpZ2dlcmluZyBpdHNlbGYuIFBvc3NpYmxlIHNvdXJjZXMgaW5jbHVkZSBjb21wb25lbnQgdGVtcGxhdGUsIHJlbmRlciBmdW5jdGlvbiwgdXBkYXRlZCBob29rIG9yIHdhdGNoZXIgc291cmNlIGZ1bmN0aW9uLmAsXG4gICAgICBudWxsLFxuICAgICAgMTBcbiAgICApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHNlZW4uc2V0KGZuLCBjb3VudCArIDEpO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmxldCBpc0htclVwZGF0aW5nID0gZmFsc2U7XG5jb25zdCBobXJEaXJ0eUNvbXBvbmVudHMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0hNUl9SVU5USU1FX18gPSB7XG4gICAgY3JlYXRlUmVjb3JkOiB0cnlXcmFwKGNyZWF0ZVJlY29yZCksXG4gICAgcmVyZW5kZXI6IHRyeVdyYXAocmVyZW5kZXIpLFxuICAgIHJlbG9hZDogdHJ5V3JhcChyZWxvYWQpXG4gIH07XG59XG5jb25zdCBtYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuZnVuY3Rpb24gcmVnaXN0ZXJITVIoaW5zdGFuY2UpIHtcbiAgY29uc3QgaWQgPSBpbnN0YW5jZS50eXBlLl9faG1ySWQ7XG4gIGxldCByZWNvcmQgPSBtYXAuZ2V0KGlkKTtcbiAgaWYgKCFyZWNvcmQpIHtcbiAgICBjcmVhdGVSZWNvcmQoaWQsIGluc3RhbmNlLnR5cGUpO1xuICAgIHJlY29yZCA9IG1hcC5nZXQoaWQpO1xuICB9XG4gIHJlY29yZC5pbnN0YW5jZXMuYWRkKGluc3RhbmNlKTtcbn1cbmZ1bmN0aW9uIHVucmVnaXN0ZXJITVIoaW5zdGFuY2UpIHtcbiAgbWFwLmdldChpbnN0YW5jZS50eXBlLl9faG1ySWQpLmluc3RhbmNlcy5kZWxldGUoaW5zdGFuY2UpO1xufVxuZnVuY3Rpb24gY3JlYXRlUmVjb3JkKGlkLCBpbml0aWFsRGVmKSB7XG4gIGlmIChtYXAuaGFzKGlkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBtYXAuc2V0KGlkLCB7XG4gICAgaW5pdGlhbERlZjogbm9ybWFsaXplQ2xhc3NDb21wb25lbnQoaW5pdGlhbERlZiksXG4gICAgaW5zdGFuY2VzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpXG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNsYXNzQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICByZXR1cm4gaXNDbGFzc0NvbXBvbmVudChjb21wb25lbnQpID8gY29tcG9uZW50Ll9fdmNjT3B0cyA6IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIHJlcmVuZGVyKGlkLCBuZXdSZW5kZXIpIHtcbiAgY29uc3QgcmVjb3JkID0gbWFwLmdldChpZCk7XG4gIGlmICghcmVjb3JkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlY29yZC5pbml0aWFsRGVmLnJlbmRlciA9IG5ld1JlbmRlcjtcbiAgWy4uLnJlY29yZC5pbnN0YW5jZXNdLmZvckVhY2goKGluc3RhbmNlKSA9PiB7XG4gICAgaWYgKG5ld1JlbmRlcikge1xuICAgICAgaW5zdGFuY2UucmVuZGVyID0gbmV3UmVuZGVyO1xuICAgICAgbm9ybWFsaXplQ2xhc3NDb21wb25lbnQoaW5zdGFuY2UudHlwZSkucmVuZGVyID0gbmV3UmVuZGVyO1xuICAgIH1cbiAgICBpbnN0YW5jZS5yZW5kZXJDYWNoZSA9IFtdO1xuICAgIGlzSG1yVXBkYXRpbmcgPSB0cnVlO1xuICAgIGlmICghKGluc3RhbmNlLmpvYi5mbGFncyAmIDgpKSB7XG4gICAgICBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICB9XG4gICAgaXNIbXJVcGRhdGluZyA9IGZhbHNlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlbG9hZChpZCwgbmV3Q29tcCkge1xuICBjb25zdCByZWNvcmQgPSBtYXAuZ2V0KGlkKTtcbiAgaWYgKCFyZWNvcmQpIHJldHVybjtcbiAgbmV3Q29tcCA9IG5vcm1hbGl6ZUNsYXNzQ29tcG9uZW50KG5ld0NvbXApO1xuICB1cGRhdGVDb21wb25lbnREZWYocmVjb3JkLmluaXRpYWxEZWYsIG5ld0NvbXApO1xuICBjb25zdCBpbnN0YW5jZXMgPSBbLi4ucmVjb3JkLmluc3RhbmNlc107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXNbaV07XG4gICAgY29uc3Qgb2xkQ29tcCA9IG5vcm1hbGl6ZUNsYXNzQ29tcG9uZW50KGluc3RhbmNlLnR5cGUpO1xuICAgIGxldCBkaXJ0eUluc3RhbmNlcyA9IGhtckRpcnR5Q29tcG9uZW50cy5nZXQob2xkQ29tcCk7XG4gICAgaWYgKCFkaXJ0eUluc3RhbmNlcykge1xuICAgICAgaWYgKG9sZENvbXAgIT09IHJlY29yZC5pbml0aWFsRGVmKSB7XG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudERlZihvbGRDb21wLCBuZXdDb21wKTtcbiAgICAgIH1cbiAgICAgIGhtckRpcnR5Q29tcG9uZW50cy5zZXQob2xkQ29tcCwgZGlydHlJbnN0YW5jZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpKTtcbiAgICB9XG4gICAgZGlydHlJbnN0YW5jZXMuYWRkKGluc3RhbmNlKTtcbiAgICBpbnN0YW5jZS5hcHBDb250ZXh0LnByb3BzQ2FjaGUuZGVsZXRlKGluc3RhbmNlLnR5cGUpO1xuICAgIGluc3RhbmNlLmFwcENvbnRleHQuZW1pdHNDYWNoZS5kZWxldGUoaW5zdGFuY2UudHlwZSk7XG4gICAgaW5zdGFuY2UuYXBwQ29udGV4dC5vcHRpb25zQ2FjaGUuZGVsZXRlKGluc3RhbmNlLnR5cGUpO1xuICAgIGlmIChpbnN0YW5jZS5jZVJlbG9hZCkge1xuICAgICAgZGlydHlJbnN0YW5jZXMuYWRkKGluc3RhbmNlKTtcbiAgICAgIGluc3RhbmNlLmNlUmVsb2FkKG5ld0NvbXAuc3R5bGVzKTtcbiAgICAgIGRpcnR5SW5zdGFuY2VzLmRlbGV0ZShpbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZS5wYXJlbnQpIHtcbiAgICAgIHF1ZXVlSm9iKCgpID0+IHtcbiAgICAgICAgaXNIbXJVcGRhdGluZyA9IHRydWU7XG4gICAgICAgIGluc3RhbmNlLnBhcmVudC51cGRhdGUoKTtcbiAgICAgICAgaXNIbXJVcGRhdGluZyA9IGZhbHNlO1xuICAgICAgICBkaXJ0eUluc3RhbmNlcy5kZWxldGUoaW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpbnN0YW5jZS5hcHBDb250ZXh0LnJlbG9hZCkge1xuICAgICAgaW5zdGFuY2UuYXBwQ29udGV4dC5yZWxvYWQoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIltITVJdIFJvb3Qgb3IgbWFudWFsbHkgbW91bnRlZCBpbnN0YW5jZSBtb2RpZmllZC4gRnVsbCByZWxvYWQgcmVxdWlyZWQuXCJcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5yb290LmNlICYmIGluc3RhbmNlICE9PSBpbnN0YW5jZS5yb290KSB7XG4gICAgICBpbnN0YW5jZS5yb290LmNlLl9yZW1vdmVDaGlsZFN0eWxlKG9sZENvbXApO1xuICAgIH1cbiAgfVxuICBxdWV1ZVBvc3RGbHVzaENiKCgpID0+IHtcbiAgICBobXJEaXJ0eUNvbXBvbmVudHMuY2xlYXIoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVDb21wb25lbnREZWYob2xkQ29tcCwgbmV3Q29tcCkge1xuICBleHRlbmQob2xkQ29tcCwgbmV3Q29tcCk7XG4gIGZvciAoY29uc3Qga2V5IGluIG9sZENvbXApIHtcbiAgICBpZiAoa2V5ICE9PSBcIl9fZmlsZVwiICYmICEoa2V5IGluIG5ld0NvbXApKSB7XG4gICAgICBkZWxldGUgb2xkQ29tcFtrZXldO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdHJ5V3JhcChmbikge1xuICByZXR1cm4gKGlkLCBhcmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZuKGlkLCBhcmcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBbSE1SXSBTb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgVnVlIGNvbXBvbmVudCBob3QtcmVsb2FkLiBGdWxsIHJlbG9hZCByZXF1aXJlZC5gXG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxubGV0IGRldnRvb2xzJDE7XG5sZXQgYnVmZmVyID0gW107XG5sZXQgZGV2dG9vbHNOb3RJbnN0YWxsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIGVtaXQkMShldmVudCwgLi4uYXJncykge1xuICBpZiAoZGV2dG9vbHMkMSkge1xuICAgIGRldnRvb2xzJDEuZW1pdChldmVudCwgLi4uYXJncyk7XG4gIH0gZWxzZSBpZiAoIWRldnRvb2xzTm90SW5zdGFsbGVkKSB7XG4gICAgYnVmZmVyLnB1c2goeyBldmVudCwgYXJncyB9KTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0RGV2dG9vbHNIb29rJDEoaG9vaywgdGFyZ2V0KSB7XG4gIHZhciBfYSwgX2I7XG4gIGRldnRvb2xzJDEgPSBob29rO1xuICBpZiAoZGV2dG9vbHMkMSkge1xuICAgIGRldnRvb2xzJDEuZW5hYmxlZCA9IHRydWU7XG4gICAgYnVmZmVyLmZvckVhY2goKHsgZXZlbnQsIGFyZ3MgfSkgPT4gZGV2dG9vbHMkMS5lbWl0KGV2ZW50LCAuLi5hcmdzKSk7XG4gICAgYnVmZmVyID0gW107XG4gIH0gZWxzZSBpZiAoXG4gICAgLy8gaGFuZGxlIGxhdGUgZGV2dG9vbHMgaW5qZWN0aW9uIC0gb25seSBkbyB0aGlzIGlmIHdlIGFyZSBpbiBhbiBhY3R1YWxcbiAgICAvLyBicm93c2VyIGVudmlyb25tZW50IHRvIGF2b2lkIHRoZSB0aW1lciBoYW5kbGUgc3RhbGxpbmcgdGVzdCBydW5uZXIgZXhpdFxuICAgIC8vICgjNDgxNSlcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIC8vIHNvbWUgZW52cyBtb2NrIHdpbmRvdyBidXQgbm90IGZ1bGx5XG4gICAgd2luZG93LkhUTUxFbGVtZW50ICYmIC8vIGFsc28gZXhjbHVkZSBqc2RvbVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICEoKF9iID0gKF9hID0gd2luZG93Lm5hdmlnYXRvcikgPT0gbnVsbCA/IHZvaWQgMCA6IF9hLnVzZXJBZ2VudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9iLmluY2x1ZGVzKFwianNkb21cIikpXG4gICkge1xuICAgIGNvbnN0IHJlcGxheSA9IHRhcmdldC5fX1ZVRV9ERVZUT09MU19IT09LX1JFUExBWV9fID0gdGFyZ2V0Ll9fVlVFX0RFVlRPT0xTX0hPT0tfUkVQTEFZX18gfHwgW107XG4gICAgcmVwbGF5LnB1c2goKG5ld0hvb2spID0+IHtcbiAgICAgIHNldERldnRvb2xzSG9vayQxKG5ld0hvb2ssIHRhcmdldCk7XG4gICAgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWRldnRvb2xzJDEpIHtcbiAgICAgICAgdGFyZ2V0Ll9fVlVFX0RFVlRPT0xTX0hPT0tfUkVQTEFZX18gPSBudWxsO1xuICAgICAgICBkZXZ0b29sc05vdEluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgfVxuICAgIH0sIDNlMyk7XG4gIH0gZWxzZSB7XG4gICAgZGV2dG9vbHNOb3RJbnN0YWxsZWQgPSB0cnVlO1xuICAgIGJ1ZmZlciA9IFtdO1xuICB9XG59XG5mdW5jdGlvbiBkZXZ0b29sc0luaXRBcHAoYXBwLCB2ZXJzaW9uKSB7XG4gIGVtaXQkMShcImFwcDppbml0XCIgLyogQVBQX0lOSVQgKi8sIGFwcCwgdmVyc2lvbiwge1xuICAgIEZyYWdtZW50LFxuICAgIFRleHQsXG4gICAgQ29tbWVudCxcbiAgICBTdGF0aWNcbiAgfSk7XG59XG5mdW5jdGlvbiBkZXZ0b29sc1VubW91bnRBcHAoYXBwKSB7XG4gIGVtaXQkMShcImFwcDp1bm1vdW50XCIgLyogQVBQX1VOTU9VTlQgKi8sIGFwcCk7XG59XG5jb25zdCBkZXZ0b29sc0NvbXBvbmVudEFkZGVkID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZURldnRvb2xzQ29tcG9uZW50SG9vayhcImNvbXBvbmVudDphZGRlZFwiIC8qIENPTVBPTkVOVF9BRERFRCAqLyk7XG5jb25zdCBkZXZ0b29sc0NvbXBvbmVudFVwZGF0ZWQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlRGV2dG9vbHNDb21wb25lbnRIb29rKFwiY29tcG9uZW50OnVwZGF0ZWRcIiAvKiBDT01QT05FTlRfVVBEQVRFRCAqLyk7XG5jb25zdCBfZGV2dG9vbHNDb21wb25lbnRSZW1vdmVkID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZURldnRvb2xzQ29tcG9uZW50SG9vayhcbiAgXCJjb21wb25lbnQ6cmVtb3ZlZFwiIC8qIENPTVBPTkVOVF9SRU1PVkVEICovXG4pO1xuY29uc3QgZGV2dG9vbHNDb21wb25lbnRSZW1vdmVkID0gKGNvbXBvbmVudCkgPT4ge1xuICBpZiAoZGV2dG9vbHMkMSAmJiB0eXBlb2YgZGV2dG9vbHMkMS5jbGVhbnVwQnVmZmVyID09PSBcImZ1bmN0aW9uXCIgJiYgLy8gcmVtb3ZlIHRoZSBjb21wb25lbnQgaWYgaXQgd2Fzbid0IGJ1ZmZlcmVkXG4gICFkZXZ0b29scyQxLmNsZWFudXBCdWZmZXIoY29tcG9uZW50KSkge1xuICAgIF9kZXZ0b29sc0NvbXBvbmVudFJlbW92ZWQoY29tcG9uZW50KTtcbiAgfVxufTtcbi8qISAjX19OT19TSURFX0VGRkVDVFNfXyAqL1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZURldnRvb2xzQ29tcG9uZW50SG9vayhob29rKSB7XG4gIHJldHVybiAoY29tcG9uZW50KSA9PiB7XG4gICAgZW1pdCQxKFxuICAgICAgaG9vayxcbiAgICAgIGNvbXBvbmVudC5hcHBDb250ZXh0LmFwcCxcbiAgICAgIGNvbXBvbmVudC51aWQsXG4gICAgICBjb21wb25lbnQucGFyZW50ID8gY29tcG9uZW50LnBhcmVudC51aWQgOiB2b2lkIDAsXG4gICAgICBjb21wb25lbnRcbiAgICApO1xuICB9O1xufVxuY29uc3QgZGV2dG9vbHNQZXJmU3RhcnQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlRGV2dG9vbHNQZXJmb3JtYW5jZUhvb2soXCJwZXJmOnN0YXJ0XCIgLyogUEVSRk9STUFOQ0VfU1RBUlQgKi8pO1xuY29uc3QgZGV2dG9vbHNQZXJmRW5kID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZURldnRvb2xzUGVyZm9ybWFuY2VIb29rKFwicGVyZjplbmRcIiAvKiBQRVJGT1JNQU5DRV9FTkQgKi8pO1xuZnVuY3Rpb24gY3JlYXRlRGV2dG9vbHNQZXJmb3JtYW5jZUhvb2soaG9vaykge1xuICByZXR1cm4gKGNvbXBvbmVudCwgdHlwZSwgdGltZSkgPT4ge1xuICAgIGVtaXQkMShob29rLCBjb21wb25lbnQuYXBwQ29udGV4dC5hcHAsIGNvbXBvbmVudC51aWQsIGNvbXBvbmVudCwgdHlwZSwgdGltZSk7XG4gIH07XG59XG5mdW5jdGlvbiBkZXZ0b29sc0NvbXBvbmVudEVtaXQoY29tcG9uZW50LCBldmVudCwgcGFyYW1zKSB7XG4gIGVtaXQkMShcbiAgICBcImNvbXBvbmVudDplbWl0XCIgLyogQ09NUE9ORU5UX0VNSVQgKi8sXG4gICAgY29tcG9uZW50LmFwcENvbnRleHQuYXBwLFxuICAgIGNvbXBvbmVudCxcbiAgICBldmVudCxcbiAgICBwYXJhbXNcbiAgKTtcbn1cblxubGV0IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IG51bGw7XG5sZXQgY3VycmVudFNjb3BlSWQgPSBudWxsO1xuZnVuY3Rpb24gc2V0Q3VycmVudFJlbmRlcmluZ0luc3RhbmNlKGluc3RhbmNlKSB7XG4gIGNvbnN0IHByZXYgPSBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2U7XG4gIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IGluc3RhbmNlO1xuICBjdXJyZW50U2NvcGVJZCA9IGluc3RhbmNlICYmIGluc3RhbmNlLnR5cGUuX19zY29wZUlkIHx8IG51bGw7XG4gIHJldHVybiBwcmV2O1xufVxuZnVuY3Rpb24gcHVzaFNjb3BlSWQoaWQpIHtcbiAgY3VycmVudFNjb3BlSWQgPSBpZDtcbn1cbmZ1bmN0aW9uIHBvcFNjb3BlSWQoKSB7XG4gIGN1cnJlbnRTY29wZUlkID0gbnVsbDtcbn1cbmNvbnN0IHdpdGhTY29wZUlkID0gKF9pZCkgPT4gd2l0aEN0eDtcbmZ1bmN0aW9uIHdpdGhDdHgoZm4sIGN0eCA9IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSwgaXNOb25TY29wZWRTbG90KSB7XG4gIGlmICghY3R4KSByZXR1cm4gZm47XG4gIGlmIChmbi5fbikge1xuICAgIHJldHVybiBmbjtcbiAgfVxuICBjb25zdCByZW5kZXJGbldpdGhDb250ZXh0ID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAocmVuZGVyRm5XaXRoQ29udGV4dC5fZCkge1xuICAgICAgc2V0QmxvY2tUcmFja2luZygtMSk7XG4gICAgfVxuICAgIGNvbnN0IHByZXZJbnN0YW5jZSA9IHNldEN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZShjdHgpO1xuICAgIGxldCByZXM7XG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IGZuKC4uLmFyZ3MpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRDdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UocHJldkluc3RhbmNlKTtcbiAgICAgIGlmIChyZW5kZXJGbldpdGhDb250ZXh0Ll9kKSB7XG4gICAgICAgIHNldEJsb2NrVHJhY2tpbmcoMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgZGV2dG9vbHNDb21wb25lbnRVcGRhdGVkKGN0eCk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIHJlbmRlckZuV2l0aENvbnRleHQuX24gPSB0cnVlO1xuICByZW5kZXJGbldpdGhDb250ZXh0Ll9jID0gdHJ1ZTtcbiAgcmVuZGVyRm5XaXRoQ29udGV4dC5fZCA9IHRydWU7XG4gIHJldHVybiByZW5kZXJGbldpdGhDb250ZXh0O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURpcmVjdGl2ZU5hbWUobmFtZSkge1xuICBpZiAoaXNCdWlsdEluRGlyZWN0aXZlKG5hbWUpKSB7XG4gICAgd2FybiQxKFwiRG8gbm90IHVzZSBidWlsdC1pbiBkaXJlY3RpdmUgaWRzIGFzIGN1c3RvbSBkaXJlY3RpdmUgaWQ6IFwiICsgbmFtZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHdpdGhEaXJlY3RpdmVzKHZub2RlLCBkaXJlY3RpdmVzKSB7XG4gIGlmIChjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShgd2l0aERpcmVjdGl2ZXMgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgcmVuZGVyIGZ1bmN0aW9ucy5gKTtcbiAgICByZXR1cm4gdm5vZGU7XG4gIH1cbiAgY29uc3QgaW5zdGFuY2UgPSBnZXRDb21wb25lbnRQdWJsaWNJbnN0YW5jZShjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UpO1xuICBjb25zdCBiaW5kaW5ncyA9IHZub2RlLmRpcnMgfHwgKHZub2RlLmRpcnMgPSBbXSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlyZWN0aXZlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBbZGlyLCB2YWx1ZSwgYXJnLCBtb2RpZmllcnMgPSBFTVBUWV9PQkpdID0gZGlyZWN0aXZlc1tpXTtcbiAgICBpZiAoZGlyKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihkaXIpKSB7XG4gICAgICAgIGRpciA9IHtcbiAgICAgICAgICBtb3VudGVkOiBkaXIsXG4gICAgICAgICAgdXBkYXRlZDogZGlyXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoZGlyLmRlZXApIHtcbiAgICAgICAgdHJhdmVyc2UodmFsdWUpO1xuICAgICAgfVxuICAgICAgYmluZGluZ3MucHVzaCh7XG4gICAgICAgIGRpcixcbiAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvbGRWYWx1ZTogdm9pZCAwLFxuICAgICAgICBhcmcsXG4gICAgICAgIG1vZGlmaWVyc1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2bm9kZTtcbn1cbmZ1bmN0aW9uIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIHByZXZWTm9kZSwgaW5zdGFuY2UsIG5hbWUpIHtcbiAgY29uc3QgYmluZGluZ3MgPSB2bm9kZS5kaXJzO1xuICBjb25zdCBvbGRCaW5kaW5ncyA9IHByZXZWTm9kZSAmJiBwcmV2Vk5vZGUuZGlycztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJpbmRpbmcgPSBiaW5kaW5nc1tpXTtcbiAgICBpZiAob2xkQmluZGluZ3MpIHtcbiAgICAgIGJpbmRpbmcub2xkVmFsdWUgPSBvbGRCaW5kaW5nc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgbGV0IGhvb2sgPSBiaW5kaW5nLmRpcltuYW1lXTtcbiAgICBpZiAoaG9vaykge1xuICAgICAgcGF1c2VUcmFja2luZygpO1xuICAgICAgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoaG9vaywgaW5zdGFuY2UsIDgsIFtcbiAgICAgICAgdm5vZGUuZWwsXG4gICAgICAgIGJpbmRpbmcsXG4gICAgICAgIHZub2RlLFxuICAgICAgICBwcmV2Vk5vZGVcbiAgICAgIF0pO1xuICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBUZWxlcG9ydEVuZEtleSA9IFN5bWJvbChcIl92dGVcIik7XG5jb25zdCBpc1RlbGVwb3J0ID0gKHR5cGUpID0+IHR5cGUuX19pc1RlbGVwb3J0O1xuY29uc3QgaXNUZWxlcG9ydERpc2FibGVkID0gKHByb3BzKSA9PiBwcm9wcyAmJiAocHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMuZGlzYWJsZWQgPT09IFwiXCIpO1xuY29uc3QgaXNUZWxlcG9ydERlZmVycmVkID0gKHByb3BzKSA9PiBwcm9wcyAmJiAocHJvcHMuZGVmZXIgfHwgcHJvcHMuZGVmZXIgPT09IFwiXCIpO1xuY29uc3QgaXNUYXJnZXRTVkcgPSAodGFyZ2V0KSA9PiB0eXBlb2YgU1ZHRWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0YXJnZXQgaW5zdGFuY2VvZiBTVkdFbGVtZW50O1xuY29uc3QgaXNUYXJnZXRNYXRoTUwgPSAodGFyZ2V0KSA9PiB0eXBlb2YgTWF0aE1MRWxlbWVudCA9PT0gXCJmdW5jdGlvblwiICYmIHRhcmdldCBpbnN0YW5jZW9mIE1hdGhNTEVsZW1lbnQ7XG5jb25zdCByZXNvbHZlVGFyZ2V0ID0gKHByb3BzLCBzZWxlY3QpID0+IHtcbiAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBwcm9wcyAmJiBwcm9wcy50bztcbiAgaWYgKGlzU3RyaW5nKHRhcmdldFNlbGVjdG9yKSkge1xuICAgIGlmICghc2VsZWN0KSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShcbiAgICAgICAgYEN1cnJlbnQgcmVuZGVyZXIgZG9lcyBub3Qgc3VwcG9ydCBzdHJpbmcgdGFyZ2V0IGZvciBUZWxlcG9ydHMuIChtaXNzaW5nIHF1ZXJ5U2VsZWN0b3IgcmVuZGVyZXIgb3B0aW9uKWBcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gc2VsZWN0KHRhcmdldFNlbGVjdG9yKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICF0YXJnZXQgJiYgIWlzVGVsZXBvcnREaXNhYmxlZChwcm9wcykpIHtcbiAgICAgICAgd2FybiQxKFxuICAgICAgICAgIGBGYWlsZWQgdG8gbG9jYXRlIFRlbGVwb3J0IHRhcmdldCB3aXRoIHNlbGVjdG9yIFwiJHt0YXJnZXRTZWxlY3Rvcn1cIi4gTm90ZSB0aGUgdGFyZ2V0IGVsZW1lbnQgbXVzdCBleGlzdCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkIC0gaS5lLiB0aGUgdGFyZ2V0IGNhbm5vdCBiZSByZW5kZXJlZCBieSB0aGUgY29tcG9uZW50IGl0c2VsZiwgYW5kIGlkZWFsbHkgc2hvdWxkIGJlIG91dHNpZGUgb2YgdGhlIGVudGlyZSBWdWUgY29tcG9uZW50IHRyZWUuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIXRhcmdldFNlbGVjdG9yICYmICFpc1RlbGVwb3J0RGlzYWJsZWQocHJvcHMpKSB7XG4gICAgICB3YXJuJDEoYEludmFsaWQgVGVsZXBvcnQgdGFyZ2V0OiAke3RhcmdldFNlbGVjdG9yfWApO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0U2VsZWN0b3I7XG4gIH1cbn07XG5jb25zdCBUZWxlcG9ydEltcGwgPSB7XG4gIG5hbWU6IFwiVGVsZXBvcnRcIixcbiAgX19pc1RlbGVwb3J0OiB0cnVlLFxuICBwcm9jZXNzKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQsIGludGVybmFscykge1xuICAgIGNvbnN0IHtcbiAgICAgIG1jOiBtb3VudENoaWxkcmVuLFxuICAgICAgcGM6IHBhdGNoQ2hpbGRyZW4sXG4gICAgICBwYmM6IHBhdGNoQmxvY2tDaGlsZHJlbixcbiAgICAgIG86IHsgaW5zZXJ0LCBxdWVyeVNlbGVjdG9yLCBjcmVhdGVUZXh0LCBjcmVhdGVDb21tZW50IH1cbiAgICB9ID0gaW50ZXJuYWxzO1xuICAgIGNvbnN0IGRpc2FibGVkID0gaXNUZWxlcG9ydERpc2FibGVkKG4yLnByb3BzKTtcbiAgICBsZXQgeyBzaGFwZUZsYWcsIGNoaWxkcmVuLCBkeW5hbWljQ2hpbGRyZW4gfSA9IG4yO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGlzSG1yVXBkYXRpbmcpIHtcbiAgICAgIG9wdGltaXplZCA9IGZhbHNlO1xuICAgICAgZHluYW1pY0NoaWxkcmVuID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbjIuZWwgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gY3JlYXRlQ29tbWVudChcInRlbGVwb3J0IHN0YXJ0XCIpIDogY3JlYXRlVGV4dChcIlwiKTtcbiAgICAgIGNvbnN0IG1haW5BbmNob3IgPSBuMi5hbmNob3IgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gY3JlYXRlQ29tbWVudChcInRlbGVwb3J0IGVuZFwiKSA6IGNyZWF0ZVRleHQoXCJcIik7XG4gICAgICBpbnNlcnQocGxhY2Vob2xkZXIsIGNvbnRhaW5lciwgYW5jaG9yKTtcbiAgICAgIGluc2VydChtYWluQW5jaG9yLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICBjb25zdCBtb3VudCA9IChjb250YWluZXIyLCBhbmNob3IyKSA9PiB7XG4gICAgICAgIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgICAgIGlmIChwYXJlbnRDb21wb25lbnQgJiYgcGFyZW50Q29tcG9uZW50LmlzQ0UpIHtcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudC5jZS5fdGVsZXBvcnRUYXJnZXQgPSBjb250YWluZXIyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb3VudENoaWxkcmVuKFxuICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICBjb250YWluZXIyLFxuICAgICAgICAgICAgYW5jaG9yMixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1vdW50VG9UYXJnZXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IG4yLnRhcmdldCA9IHJlc29sdmVUYXJnZXQobjIucHJvcHMsIHF1ZXJ5U2VsZWN0b3IpO1xuICAgICAgICBjb25zdCB0YXJnZXRBbmNob3IgPSBwcmVwYXJlQW5jaG9yKHRhcmdldCwgbjIsIGNyZWF0ZVRleHQsIGluc2VydCk7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlICE9PSBcInN2Z1wiICYmIGlzVGFyZ2V0U1ZHKHRhcmdldCkpIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSA9IFwic3ZnXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChuYW1lc3BhY2UgIT09IFwibWF0aG1sXCIgJiYgaXNUYXJnZXRNYXRoTUwodGFyZ2V0KSkge1xuICAgICAgICAgICAgbmFtZXNwYWNlID0gXCJtYXRobWxcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICAgICAgbW91bnQodGFyZ2V0LCB0YXJnZXRBbmNob3IpO1xuICAgICAgICAgICAgdXBkYXRlQ3NzVmFycyhuMiwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFkaXNhYmxlZCkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIFwiSW52YWxpZCBUZWxlcG9ydCB0YXJnZXQgb24gbW91bnQ6XCIsXG4gICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICBgKCR7dHlwZW9mIHRhcmdldH0pYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgbW91bnQoY29udGFpbmVyLCBtYWluQW5jaG9yKTtcbiAgICAgICAgdXBkYXRlQ3NzVmFycyhuMiwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNUZWxlcG9ydERlZmVycmVkKG4yLnByb3BzKSkge1xuICAgICAgICBuMi5lbC5fX2lzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgIG1vdW50VG9UYXJnZXQoKTtcbiAgICAgICAgICBkZWxldGUgbjIuZWwuX19pc01vdW50ZWQ7XG4gICAgICAgIH0sIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdW50VG9UYXJnZXQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzVGVsZXBvcnREZWZlcnJlZChuMi5wcm9wcykgJiYgbjEuZWwuX19pc01vdW50ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgVGVsZXBvcnRJbXBsLnByb2Nlc3MoXG4gICAgICAgICAgICBuMSxcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgICAgICBpbnRlcm5hbHNcbiAgICAgICAgICApO1xuICAgICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgICBuMi50YXJnZXRTdGFydCA9IG4xLnRhcmdldFN0YXJ0O1xuICAgICAgY29uc3QgbWFpbkFuY2hvciA9IG4yLmFuY2hvciA9IG4xLmFuY2hvcjtcbiAgICAgIGNvbnN0IHRhcmdldCA9IG4yLnRhcmdldCA9IG4xLnRhcmdldDtcbiAgICAgIGNvbnN0IHRhcmdldEFuY2hvciA9IG4yLnRhcmdldEFuY2hvciA9IG4xLnRhcmdldEFuY2hvcjtcbiAgICAgIGNvbnN0IHdhc0Rpc2FibGVkID0gaXNUZWxlcG9ydERpc2FibGVkKG4xLnByb3BzKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSB3YXNEaXNhYmxlZCA/IGNvbnRhaW5lciA6IHRhcmdldDtcbiAgICAgIGNvbnN0IGN1cnJlbnRBbmNob3IgPSB3YXNEaXNhYmxlZCA/IG1haW5BbmNob3IgOiB0YXJnZXRBbmNob3I7XG4gICAgICBpZiAobmFtZXNwYWNlID09PSBcInN2Z1wiIHx8IGlzVGFyZ2V0U1ZHKHRhcmdldCkpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJzdmdcIjtcbiAgICAgIH0gZWxzZSBpZiAobmFtZXNwYWNlID09PSBcIm1hdGhtbFwiIHx8IGlzVGFyZ2V0TWF0aE1MKHRhcmdldCkpIHtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJtYXRobWxcIjtcbiAgICAgIH1cbiAgICAgIGlmIChkeW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgICAgcGF0Y2hCbG9ja0NoaWxkcmVuKFxuICAgICAgICAgIG4xLmR5bmFtaWNDaGlsZHJlbixcbiAgICAgICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICAgICAgY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkc1xuICAgICAgICApO1xuICAgICAgICB0cmF2ZXJzZVN0YXRpY0NoaWxkcmVuKG4xLCBuMiwgISEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpO1xuICAgICAgfSBlbHNlIGlmICghb3B0aW1pemVkKSB7XG4gICAgICAgIHBhdGNoQ2hpbGRyZW4oXG4gICAgICAgICAgbjEsXG4gICAgICAgICAgbjIsXG4gICAgICAgICAgY3VycmVudENvbnRhaW5lcixcbiAgICAgICAgICBjdXJyZW50QW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgaWYgKCF3YXNEaXNhYmxlZCkge1xuICAgICAgICAgIG1vdmVUZWxlcG9ydChcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgbWFpbkFuY2hvcixcbiAgICAgICAgICAgIGludGVybmFscyxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChuMi5wcm9wcyAmJiBuMS5wcm9wcyAmJiBuMi5wcm9wcy50byAhPT0gbjEucHJvcHMudG8pIHtcbiAgICAgICAgICAgIG4yLnByb3BzLnRvID0gbjEucHJvcHMudG87XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKG4yLnByb3BzICYmIG4yLnByb3BzLnRvKSAhPT0gKG4xLnByb3BzICYmIG4xLnByb3BzLnRvKSkge1xuICAgICAgICAgIGNvbnN0IG5leHRUYXJnZXQgPSBuMi50YXJnZXQgPSByZXNvbHZlVGFyZ2V0KFxuICAgICAgICAgICAgbjIucHJvcHMsXG4gICAgICAgICAgICBxdWVyeVNlbGVjdG9yXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV4dFRhcmdldCkge1xuICAgICAgICAgICAgbW92ZVRlbGVwb3J0KFxuICAgICAgICAgICAgICBuMixcbiAgICAgICAgICAgICAgbmV4dFRhcmdldCxcbiAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgaW50ZXJuYWxzLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBcIkludmFsaWQgVGVsZXBvcnQgdGFyZ2V0IG9uIHVwZGF0ZTpcIixcbiAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICBgKCR7dHlwZW9mIHRhcmdldH0pYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod2FzRGlzYWJsZWQpIHtcbiAgICAgICAgICBtb3ZlVGVsZXBvcnQoXG4gICAgICAgICAgICBuMixcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgIHRhcmdldEFuY2hvcixcbiAgICAgICAgICAgIGludGVybmFscyxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1cGRhdGVDc3NWYXJzKG4yLCBkaXNhYmxlZCk7XG4gICAgfVxuICB9LFxuICByZW1vdmUodm5vZGUsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHsgdW06IHVubW91bnQsIG86IHsgcmVtb3ZlOiBob3N0UmVtb3ZlIH0gfSwgZG9SZW1vdmUpIHtcbiAgICBjb25zdCB7XG4gICAgICBzaGFwZUZsYWcsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGFuY2hvcixcbiAgICAgIHRhcmdldFN0YXJ0LFxuICAgICAgdGFyZ2V0QW5jaG9yLFxuICAgICAgdGFyZ2V0LFxuICAgICAgcHJvcHNcbiAgICB9ID0gdm5vZGU7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgaG9zdFJlbW92ZSh0YXJnZXRTdGFydCk7XG4gICAgICBob3N0UmVtb3ZlKHRhcmdldEFuY2hvcik7XG4gICAgfVxuICAgIGRvUmVtb3ZlICYmIGhvc3RSZW1vdmUoYW5jaG9yKTtcbiAgICBpZiAoc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgIGNvbnN0IHNob3VsZFJlbW92ZSA9IGRvUmVtb3ZlIHx8ICFpc1RlbGVwb3J0RGlzYWJsZWQocHJvcHMpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICB1bm1vdW50KFxuICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBzaG91bGRSZW1vdmUsXG4gICAgICAgICAgISFjaGlsZC5keW5hbWljQ2hpbGRyZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1vdmU6IG1vdmVUZWxlcG9ydCxcbiAgaHlkcmF0ZTogaHlkcmF0ZVRlbGVwb3J0XG59O1xuZnVuY3Rpb24gbW92ZVRlbGVwb3J0KHZub2RlLCBjb250YWluZXIsIHBhcmVudEFuY2hvciwgeyBvOiB7IGluc2VydCB9LCBtOiBtb3ZlIH0sIG1vdmVUeXBlID0gMikge1xuICBpZiAobW92ZVR5cGUgPT09IDApIHtcbiAgICBpbnNlcnQodm5vZGUudGFyZ2V0QW5jaG9yLCBjb250YWluZXIsIHBhcmVudEFuY2hvcik7XG4gIH1cbiAgY29uc3QgeyBlbCwgYW5jaG9yLCBzaGFwZUZsYWcsIGNoaWxkcmVuLCBwcm9wcyB9ID0gdm5vZGU7XG4gIGNvbnN0IGlzUmVvcmRlciA9IG1vdmVUeXBlID09PSAyO1xuICBpZiAoaXNSZW9yZGVyKSB7XG4gICAgaW5zZXJ0KGVsLCBjb250YWluZXIsIHBhcmVudEFuY2hvcik7XG4gIH1cbiAgaWYgKCFpc1Jlb3JkZXIgfHwgaXNUZWxlcG9ydERpc2FibGVkKHByb3BzKSkge1xuICAgIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBtb3ZlKFxuICAgICAgICAgIGNoaWxkcmVuW2ldLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBwYXJlbnRBbmNob3IsXG4gICAgICAgICAgMlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoaXNSZW9yZGVyKSB7XG4gICAgaW5zZXJ0KGFuY2hvciwgY29udGFpbmVyLCBwYXJlbnRBbmNob3IpO1xuICB9XG59XG5mdW5jdGlvbiBoeWRyYXRlVGVsZXBvcnQobm9kZSwgdm5vZGUsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkLCB7XG4gIG86IHsgbmV4dFNpYmxpbmcsIHBhcmVudE5vZGUsIHF1ZXJ5U2VsZWN0b3IsIGluc2VydCwgY3JlYXRlVGV4dCB9XG59LCBoeWRyYXRlQ2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0ID0gdm5vZGUudGFyZ2V0ID0gcmVzb2x2ZVRhcmdldChcbiAgICB2bm9kZS5wcm9wcyxcbiAgICBxdWVyeVNlbGVjdG9yXG4gICk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IGlzVGVsZXBvcnREaXNhYmxlZCh2bm9kZS5wcm9wcyk7XG4gICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHRhcmdldC5fbHBhIHx8IHRhcmdldC5maXJzdENoaWxkO1xuICAgIGlmICh2bm9kZS5zaGFwZUZsYWcgJiAxNikge1xuICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgIHZub2RlLmFuY2hvciA9IGh5ZHJhdGVDaGlsZHJlbihcbiAgICAgICAgICBuZXh0U2libGluZyhub2RlKSxcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBwYXJlbnROb2RlKG5vZGUpLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICAgIHZub2RlLnRhcmdldFN0YXJ0ID0gdGFyZ2V0Tm9kZTtcbiAgICAgICAgdm5vZGUudGFyZ2V0QW5jaG9yID0gdGFyZ2V0Tm9kZSAmJiBuZXh0U2libGluZyh0YXJnZXROb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZub2RlLmFuY2hvciA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgICBsZXQgdGFyZ2V0QW5jaG9yID0gdGFyZ2V0Tm9kZTtcbiAgICAgICAgd2hpbGUgKHRhcmdldEFuY2hvcikge1xuICAgICAgICAgIGlmICh0YXJnZXRBbmNob3IgJiYgdGFyZ2V0QW5jaG9yLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0QW5jaG9yLmRhdGEgPT09IFwidGVsZXBvcnQgc3RhcnQgYW5jaG9yXCIpIHtcbiAgICAgICAgICAgICAgdm5vZGUudGFyZ2V0U3RhcnQgPSB0YXJnZXRBbmNob3I7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldEFuY2hvci5kYXRhID09PSBcInRlbGVwb3J0IGFuY2hvclwiKSB7XG4gICAgICAgICAgICAgIHZub2RlLnRhcmdldEFuY2hvciA9IHRhcmdldEFuY2hvcjtcbiAgICAgICAgICAgICAgdGFyZ2V0Ll9scGEgPSB2bm9kZS50YXJnZXRBbmNob3IgJiYgbmV4dFNpYmxpbmcodm5vZGUudGFyZ2V0QW5jaG9yKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhcmdldEFuY2hvciA9IG5leHRTaWJsaW5nKHRhcmdldEFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2bm9kZS50YXJnZXRBbmNob3IpIHtcbiAgICAgICAgICBwcmVwYXJlQW5jaG9yKHRhcmdldCwgdm5vZGUsIGNyZWF0ZVRleHQsIGluc2VydCk7XG4gICAgICAgIH1cbiAgICAgICAgaHlkcmF0ZUNoaWxkcmVuKFxuICAgICAgICAgIHRhcmdldE5vZGUgJiYgbmV4dFNpYmxpbmcodGFyZ2V0Tm9kZSksXG4gICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZUNzc1ZhcnModm5vZGUsIGRpc2FibGVkKTtcbiAgfVxuICByZXR1cm4gdm5vZGUuYW5jaG9yICYmIG5leHRTaWJsaW5nKHZub2RlLmFuY2hvcik7XG59XG5jb25zdCBUZWxlcG9ydCA9IFRlbGVwb3J0SW1wbDtcbmZ1bmN0aW9uIHVwZGF0ZUNzc1ZhcnModm5vZGUsIGlzRGlzYWJsZWQpIHtcbiAgY29uc3QgY3R4ID0gdm5vZGUuY3R4O1xuICBpZiAoY3R4ICYmIGN0eC51dCkge1xuICAgIGxldCBub2RlLCBhbmNob3I7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIG5vZGUgPSB2bm9kZS5lbDtcbiAgICAgIGFuY2hvciA9IHZub2RlLmFuY2hvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHZub2RlLnRhcmdldFN0YXJ0O1xuICAgICAgYW5jaG9yID0gdm5vZGUudGFyZ2V0QW5jaG9yO1xuICAgIH1cbiAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSBhbmNob3IpIHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtdi1vd25lclwiLCBjdHgudWlkKTtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBjdHgudXQoKTtcbiAgfVxufVxuZnVuY3Rpb24gcHJlcGFyZUFuY2hvcih0YXJnZXQsIHZub2RlLCBjcmVhdGVUZXh0LCBpbnNlcnQpIHtcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2bm9kZS50YXJnZXRTdGFydCA9IGNyZWF0ZVRleHQoXCJcIik7XG4gIGNvbnN0IHRhcmdldEFuY2hvciA9IHZub2RlLnRhcmdldEFuY2hvciA9IGNyZWF0ZVRleHQoXCJcIik7XG4gIHRhcmdldFN0YXJ0W1RlbGVwb3J0RW5kS2V5XSA9IHRhcmdldEFuY2hvcjtcbiAgaWYgKHRhcmdldCkge1xuICAgIGluc2VydCh0YXJnZXRTdGFydCwgdGFyZ2V0KTtcbiAgICBpbnNlcnQodGFyZ2V0QW5jaG9yLCB0YXJnZXQpO1xuICB9XG4gIHJldHVybiB0YXJnZXRBbmNob3I7XG59XG5cbmNvbnN0IGxlYXZlQ2JLZXkgPSBTeW1ib2woXCJfbGVhdmVDYlwiKTtcbmNvbnN0IGVudGVyQ2JLZXkgPSBTeW1ib2woXCJfZW50ZXJDYlwiKTtcbmZ1bmN0aW9uIHVzZVRyYW5zaXRpb25TdGF0ZSgpIHtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgaXNNb3VudGVkOiBmYWxzZSxcbiAgICBpc0xlYXZpbmc6IGZhbHNlLFxuICAgIGlzVW5tb3VudGluZzogZmFsc2UsXG4gICAgbGVhdmluZ1ZOb2RlczogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKVxuICB9O1xuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIHN0YXRlLmlzTW91bnRlZCA9IHRydWU7XG4gIH0pO1xuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHN0YXRlLmlzVW5tb3VudGluZyA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gc3RhdGU7XG59XG5jb25zdCBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvciA9IFtGdW5jdGlvbiwgQXJyYXldO1xuY29uc3QgQmFzZVRyYW5zaXRpb25Qcm9wc1ZhbGlkYXRvcnMgPSB7XG4gIG1vZGU6IFN0cmluZyxcbiAgYXBwZWFyOiBCb29sZWFuLFxuICBwZXJzaXN0ZWQ6IEJvb2xlYW4sXG4gIC8vIGVudGVyXG4gIG9uQmVmb3JlRW50ZXI6IFRyYW5zaXRpb25Ib29rVmFsaWRhdG9yLFxuICBvbkVudGVyOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25BZnRlckVudGVyOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25FbnRlckNhbmNlbGxlZDogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIC8vIGxlYXZlXG4gIG9uQmVmb3JlTGVhdmU6IFRyYW5zaXRpb25Ib29rVmFsaWRhdG9yLFxuICBvbkxlYXZlOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25BZnRlckxlYXZlOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25MZWF2ZUNhbmNlbGxlZDogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIC8vIGFwcGVhclxuICBvbkJlZm9yZUFwcGVhcjogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIG9uQXBwZWFyOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvcixcbiAgb25BZnRlckFwcGVhcjogVHJhbnNpdGlvbkhvb2tWYWxpZGF0b3IsXG4gIG9uQXBwZWFyQ2FuY2VsbGVkOiBUcmFuc2l0aW9uSG9va1ZhbGlkYXRvclxufTtcbmNvbnN0IHJlY3Vyc2l2ZUdldFN1YnRyZWUgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3Qgc3ViVHJlZSA9IGluc3RhbmNlLnN1YlRyZWU7XG4gIHJldHVybiBzdWJUcmVlLmNvbXBvbmVudCA/IHJlY3Vyc2l2ZUdldFN1YnRyZWUoc3ViVHJlZS5jb21wb25lbnQpIDogc3ViVHJlZTtcbn07XG5jb25zdCBCYXNlVHJhbnNpdGlvbkltcGwgPSB7XG4gIG5hbWU6IGBCYXNlVHJhbnNpdGlvbmAsXG4gIHByb3BzOiBCYXNlVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycyxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgY29uc3Qgc3RhdGUgPSB1c2VUcmFuc2l0aW9uU3RhdGUoKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBzbG90cy5kZWZhdWx0ICYmIGdldFRyYW5zaXRpb25SYXdDaGlsZHJlbihzbG90cy5kZWZhdWx0KCksIHRydWUpO1xuICAgICAgaWYgKCFjaGlsZHJlbiB8fCAhY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNoaWxkID0gZmluZE5vbkNvbW1lbnRDaGlsZChjaGlsZHJlbik7XG4gICAgICBjb25zdCByYXdQcm9wcyA9IHRvUmF3KHByb3BzKTtcbiAgICAgIGNvbnN0IHsgbW9kZSB9ID0gcmF3UHJvcHM7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBtb2RlICYmIG1vZGUgIT09IFwiaW4tb3V0XCIgJiYgbW9kZSAhPT0gXCJvdXQtaW5cIiAmJiBtb2RlICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICB3YXJuJDEoYGludmFsaWQgPHRyYW5zaXRpb24+IG1vZGU6ICR7bW9kZX1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5pc0xlYXZpbmcpIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5UGxhY2Vob2xkZXIoY2hpbGQpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5uZXJDaGlsZCA9IGdldElubmVyQ2hpbGQkMShjaGlsZCk7XG4gICAgICBpZiAoIWlubmVyQ2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5UGxhY2Vob2xkZXIoY2hpbGQpO1xuICAgICAgfVxuICAgICAgbGV0IGVudGVySG9va3MgPSByZXNvbHZlVHJhbnNpdGlvbkhvb2tzKFxuICAgICAgICBpbm5lckNoaWxkLFxuICAgICAgICByYXdQcm9wcyxcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIGluc3RhbmNlLFxuICAgICAgICAvLyAjMTEwNjEsIGVuc3VyZSBlbnRlckhvb2tzIGlzIGZyZXNoIGFmdGVyIGNsb25lXG4gICAgICAgIChob29rcykgPT4gZW50ZXJIb29rcyA9IGhvb2tzXG4gICAgICApO1xuICAgICAgaWYgKGlubmVyQ2hpbGQudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgICBzZXRUcmFuc2l0aW9uSG9va3MoaW5uZXJDaGlsZCwgZW50ZXJIb29rcyk7XG4gICAgICB9XG4gICAgICBsZXQgb2xkSW5uZXJDaGlsZCA9IGluc3RhbmNlLnN1YlRyZWUgJiYgZ2V0SW5uZXJDaGlsZCQxKGluc3RhbmNlLnN1YlRyZWUpO1xuICAgICAgaWYgKG9sZElubmVyQ2hpbGQgJiYgb2xkSW5uZXJDaGlsZC50eXBlICE9PSBDb21tZW50ICYmICFpc1NhbWVWTm9kZVR5cGUoaW5uZXJDaGlsZCwgb2xkSW5uZXJDaGlsZCkgJiYgcmVjdXJzaXZlR2V0U3VidHJlZShpbnN0YW5jZSkudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgICBsZXQgbGVhdmluZ0hvb2tzID0gcmVzb2x2ZVRyYW5zaXRpb25Ib29rcyhcbiAgICAgICAgICBvbGRJbm5lckNoaWxkLFxuICAgICAgICAgIHJhd1Byb3BzLFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIGluc3RhbmNlXG4gICAgICAgICk7XG4gICAgICAgIHNldFRyYW5zaXRpb25Ib29rcyhvbGRJbm5lckNoaWxkLCBsZWF2aW5nSG9va3MpO1xuICAgICAgICBpZiAobW9kZSA9PT0gXCJvdXQtaW5cIiAmJiBpbm5lckNoaWxkLnR5cGUgIT09IENvbW1lbnQpIHtcbiAgICAgICAgICBzdGF0ZS5pc0xlYXZpbmcgPSB0cnVlO1xuICAgICAgICAgIGxlYXZpbmdIb29rcy5hZnRlckxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUuaXNMZWF2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIShpbnN0YW5jZS5qb2IuZmxhZ3MgJiA4KSkge1xuICAgICAgICAgICAgICBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBsZWF2aW5nSG9va3MuYWZ0ZXJMZWF2ZTtcbiAgICAgICAgICAgIG9sZElubmVyQ2hpbGQgPSB2b2lkIDA7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gZW1wdHlQbGFjZWhvbGRlcihjaGlsZCk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gXCJpbi1vdXRcIiAmJiBpbm5lckNoaWxkLnR5cGUgIT09IENvbW1lbnQpIHtcbiAgICAgICAgICBsZWF2aW5nSG9va3MuZGVsYXlMZWF2ZSA9IChlbCwgZWFybHlSZW1vdmUsIGRlbGF5ZWRMZWF2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGVhdmluZ1ZOb2Rlc0NhY2hlID0gZ2V0TGVhdmluZ05vZGVzRm9yVHlwZShcbiAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgIG9sZElubmVyQ2hpbGRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZWF2aW5nVk5vZGVzQ2FjaGVbU3RyaW5nKG9sZElubmVyQ2hpbGQua2V5KV0gPSBvbGRJbm5lckNoaWxkO1xuICAgICAgICAgICAgZWxbbGVhdmVDYktleV0gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGVhcmx5UmVtb3ZlKCk7XG4gICAgICAgICAgICAgIGVsW2xlYXZlQ2JLZXldID0gdm9pZCAwO1xuICAgICAgICAgICAgICBkZWxldGUgZW50ZXJIb29rcy5kZWxheWVkTGVhdmU7XG4gICAgICAgICAgICAgIG9sZElubmVyQ2hpbGQgPSB2b2lkIDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZW50ZXJIb29rcy5kZWxheWVkTGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGRlbGF5ZWRMZWF2ZSgpO1xuICAgICAgICAgICAgICBkZWxldGUgZW50ZXJIb29rcy5kZWxheWVkTGVhdmU7XG4gICAgICAgICAgICAgIG9sZElubmVyQ2hpbGQgPSB2b2lkIDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2xkSW5uZXJDaGlsZCA9IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvbGRJbm5lckNoaWxkKSB7XG4gICAgICAgIG9sZElubmVyQ2hpbGQgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcbiAgfVxufTtcbmZ1bmN0aW9uIGZpbmROb25Db21tZW50Q2hpbGQoY2hpbGRyZW4pIHtcbiAgbGV0IGNoaWxkID0gY2hpbGRyZW5bMF07XG4gIGlmIChjaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgbGV0IGhhc0ZvdW5kID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjIG9mIGNoaWxkcmVuKSB7XG4gICAgICBpZiAoYy50eXBlICE9PSBDb21tZW50KSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGhhc0ZvdW5kKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgXCI8dHJhbnNpdGlvbj4gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIHNpbmdsZSBlbGVtZW50IG9yIGNvbXBvbmVudC4gVXNlIDx0cmFuc2l0aW9uLWdyb3VwPiBmb3IgbGlzdHMuXCJcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkID0gYztcbiAgICAgICAgaGFzRm91bmQgPSB0cnVlO1xuICAgICAgICBpZiAoISEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2hpbGQ7XG59XG5jb25zdCBCYXNlVHJhbnNpdGlvbiA9IEJhc2VUcmFuc2l0aW9uSW1wbDtcbmZ1bmN0aW9uIGdldExlYXZpbmdOb2Rlc0ZvclR5cGUoc3RhdGUsIHZub2RlKSB7XG4gIGNvbnN0IHsgbGVhdmluZ1ZOb2RlcyB9ID0gc3RhdGU7XG4gIGxldCBsZWF2aW5nVk5vZGVzQ2FjaGUgPSBsZWF2aW5nVk5vZGVzLmdldCh2bm9kZS50eXBlKTtcbiAgaWYgKCFsZWF2aW5nVk5vZGVzQ2FjaGUpIHtcbiAgICBsZWF2aW5nVk5vZGVzQ2FjaGUgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBsZWF2aW5nVk5vZGVzLnNldCh2bm9kZS50eXBlLCBsZWF2aW5nVk5vZGVzQ2FjaGUpO1xuICB9XG4gIHJldHVybiBsZWF2aW5nVk5vZGVzQ2FjaGU7XG59XG5mdW5jdGlvbiByZXNvbHZlVHJhbnNpdGlvbkhvb2tzKHZub2RlLCBwcm9wcywgc3RhdGUsIGluc3RhbmNlLCBwb3N0Q2xvbmUpIHtcbiAgY29uc3Qge1xuICAgIGFwcGVhcixcbiAgICBtb2RlLFxuICAgIHBlcnNpc3RlZCA9IGZhbHNlLFxuICAgIG9uQmVmb3JlRW50ZXIsXG4gICAgb25FbnRlcixcbiAgICBvbkFmdGVyRW50ZXIsXG4gICAgb25FbnRlckNhbmNlbGxlZCxcbiAgICBvbkJlZm9yZUxlYXZlLFxuICAgIG9uTGVhdmUsXG4gICAgb25BZnRlckxlYXZlLFxuICAgIG9uTGVhdmVDYW5jZWxsZWQsXG4gICAgb25CZWZvcmVBcHBlYXIsXG4gICAgb25BcHBlYXIsXG4gICAgb25BZnRlckFwcGVhcixcbiAgICBvbkFwcGVhckNhbmNlbGxlZFxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IGtleSA9IFN0cmluZyh2bm9kZS5rZXkpO1xuICBjb25zdCBsZWF2aW5nVk5vZGVzQ2FjaGUgPSBnZXRMZWF2aW5nTm9kZXNGb3JUeXBlKHN0YXRlLCB2bm9kZSk7XG4gIGNvbnN0IGNhbGxIb29rID0gKGhvb2ssIGFyZ3MpID0+IHtcbiAgICBob29rICYmIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKFxuICAgICAgaG9vayxcbiAgICAgIGluc3RhbmNlLFxuICAgICAgOSxcbiAgICAgIGFyZ3NcbiAgICApO1xuICB9O1xuICBjb25zdCBjYWxsQXN5bmNIb29rID0gKGhvb2ssIGFyZ3MpID0+IHtcbiAgICBjb25zdCBkb25lID0gYXJnc1sxXTtcbiAgICBjYWxsSG9vayhob29rLCBhcmdzKTtcbiAgICBpZiAoaXNBcnJheShob29rKSkge1xuICAgICAgaWYgKGhvb2suZXZlcnkoKGhvb2syKSA9PiBob29rMi5sZW5ndGggPD0gMSkpIGRvbmUoKTtcbiAgICB9IGVsc2UgaWYgKGhvb2subGVuZ3RoIDw9IDEpIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGhvb2tzID0ge1xuICAgIG1vZGUsXG4gICAgcGVyc2lzdGVkLFxuICAgIGJlZm9yZUVudGVyKGVsKSB7XG4gICAgICBsZXQgaG9vayA9IG9uQmVmb3JlRW50ZXI7XG4gICAgICBpZiAoIXN0YXRlLmlzTW91bnRlZCkge1xuICAgICAgICBpZiAoYXBwZWFyKSB7XG4gICAgICAgICAgaG9vayA9IG9uQmVmb3JlQXBwZWFyIHx8IG9uQmVmb3JlRW50ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZWxbbGVhdmVDYktleV0pIHtcbiAgICAgICAgZWxbbGVhdmVDYktleV0oXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICAgIC8qIGNhbmNlbGxlZCAqL1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgbGVhdmluZ1ZOb2RlID0gbGVhdmluZ1ZOb2Rlc0NhY2hlW2tleV07XG4gICAgICBpZiAobGVhdmluZ1ZOb2RlICYmIGlzU2FtZVZOb2RlVHlwZSh2bm9kZSwgbGVhdmluZ1ZOb2RlKSAmJiBsZWF2aW5nVk5vZGUuZWxbbGVhdmVDYktleV0pIHtcbiAgICAgICAgbGVhdmluZ1ZOb2RlLmVsW2xlYXZlQ2JLZXldKCk7XG4gICAgICB9XG4gICAgICBjYWxsSG9vayhob29rLCBbZWxdKTtcbiAgICB9LFxuICAgIGVudGVyKGVsKSB7XG4gICAgICBsZXQgaG9vayA9IG9uRW50ZXI7XG4gICAgICBsZXQgYWZ0ZXJIb29rID0gb25BZnRlckVudGVyO1xuICAgICAgbGV0IGNhbmNlbEhvb2sgPSBvbkVudGVyQ2FuY2VsbGVkO1xuICAgICAgaWYgKCFzdGF0ZS5pc01vdW50ZWQpIHtcbiAgICAgICAgaWYgKGFwcGVhcikge1xuICAgICAgICAgIGhvb2sgPSBvbkFwcGVhciB8fCBvbkVudGVyO1xuICAgICAgICAgIGFmdGVySG9vayA9IG9uQWZ0ZXJBcHBlYXIgfHwgb25BZnRlckVudGVyO1xuICAgICAgICAgIGNhbmNlbEhvb2sgPSBvbkFwcGVhckNhbmNlbGxlZCB8fCBvbkVudGVyQ2FuY2VsbGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgICAgY29uc3QgZG9uZSA9IGVsW2VudGVyQ2JLZXldID0gKGNhbmNlbGxlZCkgPT4ge1xuICAgICAgICBpZiAoY2FsbGVkKSByZXR1cm47XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICBjYWxsSG9vayhjYW5jZWxIb29rLCBbZWxdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsSG9vayhhZnRlckhvb2ssIFtlbF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob29rcy5kZWxheWVkTGVhdmUpIHtcbiAgICAgICAgICBob29rcy5kZWxheWVkTGVhdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbFtlbnRlckNiS2V5XSA9IHZvaWQgMDtcbiAgICAgIH07XG4gICAgICBpZiAoaG9vaykge1xuICAgICAgICBjYWxsQXN5bmNIb29rKGhvb2ssIFtlbCwgZG9uZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGVhdmUoZWwsIHJlbW92ZSkge1xuICAgICAgY29uc3Qga2V5MiA9IFN0cmluZyh2bm9kZS5rZXkpO1xuICAgICAgaWYgKGVsW2VudGVyQ2JLZXldKSB7XG4gICAgICAgIGVsW2VudGVyQ2JLZXldKFxuICAgICAgICAgIHRydWVcbiAgICAgICAgICAvKiBjYW5jZWxsZWQgKi9cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5pc1VubW91bnRpbmcpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgY2FsbEhvb2sob25CZWZvcmVMZWF2ZSwgW2VsXSk7XG4gICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICBjb25zdCBkb25lID0gZWxbbGVhdmVDYktleV0gPSAoY2FuY2VsbGVkKSA9PiB7XG4gICAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICBjYWxsSG9vayhvbkxlYXZlQ2FuY2VsbGVkLCBbZWxdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsSG9vayhvbkFmdGVyTGVhdmUsIFtlbF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsW2xlYXZlQ2JLZXldID0gdm9pZCAwO1xuICAgICAgICBpZiAobGVhdmluZ1ZOb2Rlc0NhY2hlW2tleTJdID09PSB2bm9kZSkge1xuICAgICAgICAgIGRlbGV0ZSBsZWF2aW5nVk5vZGVzQ2FjaGVba2V5Ml07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBsZWF2aW5nVk5vZGVzQ2FjaGVba2V5Ml0gPSB2bm9kZTtcbiAgICAgIGlmIChvbkxlYXZlKSB7XG4gICAgICAgIGNhbGxBc3luY0hvb2sob25MZWF2ZSwgW2VsLCBkb25lXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9uZSh2bm9kZTIpIHtcbiAgICAgIGNvbnN0IGhvb2tzMiA9IHJlc29sdmVUcmFuc2l0aW9uSG9va3MoXG4gICAgICAgIHZub2RlMixcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgcG9zdENsb25lXG4gICAgICApO1xuICAgICAgaWYgKHBvc3RDbG9uZSkgcG9zdENsb25lKGhvb2tzMik7XG4gICAgICByZXR1cm4gaG9va3MyO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGhvb2tzO1xufVxuZnVuY3Rpb24gZW1wdHlQbGFjZWhvbGRlcih2bm9kZSkge1xuICBpZiAoaXNLZWVwQWxpdmUodm5vZGUpKSB7XG4gICAgdm5vZGUgPSBjbG9uZVZOb2RlKHZub2RlKTtcbiAgICB2bm9kZS5jaGlsZHJlbiA9IG51bGw7XG4gICAgcmV0dXJuIHZub2RlO1xuICB9XG59XG5mdW5jdGlvbiBnZXRJbm5lckNoaWxkJDEodm5vZGUpIHtcbiAgaWYgKCFpc0tlZXBBbGl2ZSh2bm9kZSkpIHtcbiAgICBpZiAoaXNUZWxlcG9ydCh2bm9kZS50eXBlKSAmJiB2bm9kZS5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIGZpbmROb25Db21tZW50Q2hpbGQodm5vZGUuY2hpbGRyZW4pO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGU7XG4gIH1cbiAgaWYgKHZub2RlLmNvbXBvbmVudCkge1xuICAgIHJldHVybiB2bm9kZS5jb21wb25lbnQuc3ViVHJlZTtcbiAgfVxuICBjb25zdCB7IHNoYXBlRmxhZywgY2hpbGRyZW4gfSA9IHZub2RlO1xuICBpZiAoY2hpbGRyZW4pIHtcbiAgICBpZiAoc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlblswXTtcbiAgICB9XG4gICAgaWYgKHNoYXBlRmxhZyAmIDMyICYmIGlzRnVuY3Rpb24oY2hpbGRyZW4uZGVmYXVsdCkpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbi5kZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzZXRUcmFuc2l0aW9uSG9va3Modm5vZGUsIGhvb2tzKSB7XG4gIGlmICh2bm9kZS5zaGFwZUZsYWcgJiA2ICYmIHZub2RlLmNvbXBvbmVudCkge1xuICAgIHZub2RlLnRyYW5zaXRpb24gPSBob29rcztcbiAgICBzZXRUcmFuc2l0aW9uSG9va3Modm5vZGUuY29tcG9uZW50LnN1YlRyZWUsIGhvb2tzKTtcbiAgfSBlbHNlIGlmICh2bm9kZS5zaGFwZUZsYWcgJiAxMjgpIHtcbiAgICB2bm9kZS5zc0NvbnRlbnQudHJhbnNpdGlvbiA9IGhvb2tzLmNsb25lKHZub2RlLnNzQ29udGVudCk7XG4gICAgdm5vZGUuc3NGYWxsYmFjay50cmFuc2l0aW9uID0gaG9va3MuY2xvbmUodm5vZGUuc3NGYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgdm5vZGUudHJhbnNpdGlvbiA9IGhvb2tzO1xuICB9XG59XG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uUmF3Q2hpbGRyZW4oY2hpbGRyZW4sIGtlZXBDb21tZW50ID0gZmFsc2UsIHBhcmVudEtleSkge1xuICBsZXQgcmV0ID0gW107XG4gIGxldCBrZXllZEZyYWdtZW50Q291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgY29uc3Qga2V5ID0gcGFyZW50S2V5ID09IG51bGwgPyBjaGlsZC5rZXkgOiBTdHJpbmcocGFyZW50S2V5KSArIFN0cmluZyhjaGlsZC5rZXkgIT0gbnVsbCA/IGNoaWxkLmtleSA6IGkpO1xuICAgIGlmIChjaGlsZC50eXBlID09PSBGcmFnbWVudCkge1xuICAgICAgaWYgKGNoaWxkLnBhdGNoRmxhZyAmIDEyOCkga2V5ZWRGcmFnbWVudENvdW50Kys7XG4gICAgICByZXQgPSByZXQuY29uY2F0KFxuICAgICAgICBnZXRUcmFuc2l0aW9uUmF3Q2hpbGRyZW4oY2hpbGQuY2hpbGRyZW4sIGtlZXBDb21tZW50LCBrZXkpXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoa2VlcENvbW1lbnQgfHwgY2hpbGQudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgcmV0LnB1c2goa2V5ICE9IG51bGwgPyBjbG9uZVZOb2RlKGNoaWxkLCB7IGtleSB9KSA6IGNoaWxkKTtcbiAgICB9XG4gIH1cbiAgaWYgKGtleWVkRnJhZ21lbnRDb3VudCA+IDEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJldC5sZW5ndGg7IGkrKykge1xuICAgICAgcmV0W2ldLnBhdGNoRmxhZyA9IC0yO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vKiEgI19fTk9fU0lERV9FRkZFQ1RTX18gKi9cbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBkZWZpbmVDb21wb25lbnQob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gIHJldHVybiBpc0Z1bmN0aW9uKG9wdGlvbnMpID8gKFxuICAgIC8vICM4MjM2OiBleHRlbmQgY2FsbCBhbmQgb3B0aW9ucy5uYW1lIGFjY2VzcyBhcmUgY29uc2lkZXJlZCBzaWRlLWVmZmVjdHNcbiAgICAvLyBieSBSb2xsdXAsIHNvIHdlIGhhdmUgdG8gd3JhcCBpdCBpbiBhIHB1cmUtYW5ub3RhdGVkIElJRkUuXG4gICAgLyogQF9fUFVSRV9fICovICgoKSA9PiBleHRlbmQoeyBuYW1lOiBvcHRpb25zLm5hbWUgfSwgZXh0cmFPcHRpb25zLCB7IHNldHVwOiBvcHRpb25zIH0pKSgpXG4gICkgOiBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiB1c2VJZCgpIHtcbiAgY29uc3QgaSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICBpZiAoaSkge1xuICAgIHJldHVybiAoaS5hcHBDb250ZXh0LmNvbmZpZy5pZFByZWZpeCB8fCBcInZcIikgKyBcIi1cIiArIGkuaWRzWzBdICsgaS5pZHNbMV0rKztcbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FybiQxKFxuICAgICAgYHVzZUlkKCkgaXMgY2FsbGVkIHdoZW4gdGhlcmUgaXMgbm8gYWN0aXZlIGNvbXBvbmVudCBpbnN0YW5jZSB0byBiZSBhc3NvY2lhdGVkIHdpdGguYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59XG5mdW5jdGlvbiBtYXJrQXN5bmNCb3VuZGFyeShpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5pZHMgPSBbaW5zdGFuY2UuaWRzWzBdICsgaW5zdGFuY2UuaWRzWzJdKysgKyBcIi1cIiwgMCwgMF07XG59XG5cbmNvbnN0IGtub3duVGVtcGxhdGVSZWZzID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrU2V0KCk7XG5mdW5jdGlvbiB1c2VUZW1wbGF0ZVJlZihrZXkpIHtcbiAgY29uc3QgaSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICBjb25zdCByID0gc2hhbGxvd1JlZihudWxsKTtcbiAgaWYgKGkpIHtcbiAgICBjb25zdCByZWZzID0gaS5yZWZzID09PSBFTVBUWV9PQkogPyBpLnJlZnMgPSB7fSA6IGkucmVmcztcbiAgICBsZXQgZGVzYztcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAoZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocmVmcywga2V5KSkgJiYgIWRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICB3YXJuJDEoYHVzZVRlbXBsYXRlUmVmKCcke2tleX0nKSBhbHJlYWR5IGV4aXN0cy5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlZnMsIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHIudmFsdWUsXG4gICAgICAgIHNldDogKHZhbCkgPT4gci52YWx1ZSA9IHZhbFxuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgdXNlVGVtcGxhdGVSZWYoKSBpcyBjYWxsZWQgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY29tcG9uZW50IGluc3RhbmNlIHRvIGJlIGFzc29jaWF0ZWQgd2l0aC5gXG4gICAgKTtcbiAgfVxuICBjb25zdCByZXQgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gcmVhZG9ubHkocikgOiByO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGtub3duVGVtcGxhdGVSZWZzLmFkZChyZXQpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHNldFJlZihyYXdSZWYsIG9sZFJhd1JlZiwgcGFyZW50U3VzcGVuc2UsIHZub2RlLCBpc1VubW91bnQgPSBmYWxzZSkge1xuICBpZiAoaXNBcnJheShyYXdSZWYpKSB7XG4gICAgcmF3UmVmLmZvckVhY2goXG4gICAgICAociwgaSkgPT4gc2V0UmVmKFxuICAgICAgICByLFxuICAgICAgICBvbGRSYXdSZWYgJiYgKGlzQXJyYXkob2xkUmF3UmVmKSA/IG9sZFJhd1JlZltpXSA6IG9sZFJhd1JlZiksXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICB2bm9kZSxcbiAgICAgICAgaXNVbm1vdW50XG4gICAgICApXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGlzQXN5bmNXcmFwcGVyKHZub2RlKSAmJiAhaXNVbm1vdW50KSB7XG4gICAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDUxMiAmJiB2bm9kZS50eXBlLl9fYXN5bmNSZXNvbHZlZCAmJiB2bm9kZS5jb21wb25lbnQuc3ViVHJlZS5jb21wb25lbnQpIHtcbiAgICAgIHNldFJlZihyYXdSZWYsIG9sZFJhd1JlZiwgcGFyZW50U3VzcGVuc2UsIHZub2RlLmNvbXBvbmVudC5zdWJUcmVlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJlZlZhbHVlID0gdm5vZGUuc2hhcGVGbGFnICYgNCA/IGdldENvbXBvbmVudFB1YmxpY0luc3RhbmNlKHZub2RlLmNvbXBvbmVudCkgOiB2bm9kZS5lbDtcbiAgY29uc3QgdmFsdWUgPSBpc1VubW91bnQgPyBudWxsIDogcmVmVmFsdWU7XG4gIGNvbnN0IHsgaTogb3duZXIsIHI6IHJlZiB9ID0gcmF3UmVmO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhb3duZXIpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgTWlzc2luZyByZWYgb3duZXIgY29udGV4dC4gcmVmIGNhbm5vdCBiZSB1c2VkIG9uIGhvaXN0ZWQgdm5vZGVzLiBBIHZub2RlIHdpdGggcmVmIG11c3QgYmUgY3JlYXRlZCBpbnNpZGUgdGhlIHJlbmRlciBmdW5jdGlvbi5gXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgb2xkUmVmID0gb2xkUmF3UmVmICYmIG9sZFJhd1JlZi5yO1xuICBjb25zdCByZWZzID0gb3duZXIucmVmcyA9PT0gRU1QVFlfT0JKID8gb3duZXIucmVmcyA9IHt9IDogb3duZXIucmVmcztcbiAgY29uc3Qgc2V0dXBTdGF0ZSA9IG93bmVyLnNldHVwU3RhdGU7XG4gIGNvbnN0IHJhd1NldHVwU3RhdGUgPSB0b1JhdyhzZXR1cFN0YXRlKTtcbiAgY29uc3QgY2FuU2V0U2V0dXBSZWYgPSBzZXR1cFN0YXRlID09PSBFTVBUWV9PQkogPyBOTyA6IChrZXkpID0+IHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgaWYgKGhhc093bihyYXdTZXR1cFN0YXRlLCBrZXkpICYmICFpc1JlZihyYXdTZXR1cFN0YXRlW2tleV0pKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgVGVtcGxhdGUgcmVmIFwiJHtrZXl9XCIgdXNlZCBvbiBhIG5vbi1yZWYgdmFsdWUuIEl0IHdpbGwgbm90IHdvcmsgaW4gdGhlIHByb2R1Y3Rpb24gYnVpbGQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGtub3duVGVtcGxhdGVSZWZzLmhhcyhyYXdTZXR1cFN0YXRlW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhhc093bihyYXdTZXR1cFN0YXRlLCBrZXkpO1xuICB9O1xuICBjb25zdCBjYW5TZXRSZWYgPSAocmVmMikgPT4ge1xuICAgIHJldHVybiAhISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCAha25vd25UZW1wbGF0ZVJlZnMuaGFzKHJlZjIpO1xuICB9O1xuICBpZiAob2xkUmVmICE9IG51bGwgJiYgb2xkUmVmICE9PSByZWYpIHtcbiAgICBpZiAoaXNTdHJpbmcob2xkUmVmKSkge1xuICAgICAgcmVmc1tvbGRSZWZdID0gbnVsbDtcbiAgICAgIGlmIChjYW5TZXRTZXR1cFJlZihvbGRSZWYpKSB7XG4gICAgICAgIHNldHVwU3RhdGVbb2xkUmVmXSA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1JlZihvbGRSZWYpKSB7XG4gICAgICBpZiAoY2FuU2V0UmVmKG9sZFJlZikpIHtcbiAgICAgICAgb2xkUmVmLnZhbHVlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJhd1JlZkF0b20gPSBvbGRSYXdSZWY7XG4gICAgICBpZiAob2xkUmF3UmVmQXRvbS5rKSByZWZzW29sZFJhd1JlZkF0b20ua10gPSBudWxsO1xuICAgIH1cbiAgfVxuICBpZiAoaXNGdW5jdGlvbihyZWYpKSB7XG4gICAgY2FsbFdpdGhFcnJvckhhbmRsaW5nKHJlZiwgb3duZXIsIDEyLCBbdmFsdWUsIHJlZnNdKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBfaXNTdHJpbmcgPSBpc1N0cmluZyhyZWYpO1xuICAgIGNvbnN0IF9pc1JlZiA9IGlzUmVmKHJlZik7XG4gICAgaWYgKF9pc1N0cmluZyB8fCBfaXNSZWYpIHtcbiAgICAgIGNvbnN0IGRvU2V0ID0gKCkgPT4ge1xuICAgICAgICBpZiAocmF3UmVmLmYpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IF9pc1N0cmluZyA/IGNhblNldFNldHVwUmVmKHJlZikgPyBzZXR1cFN0YXRlW3JlZl0gOiByZWZzW3JlZl0gOiBjYW5TZXRSZWYocmVmKSB8fCAhcmF3UmVmLmsgPyByZWYudmFsdWUgOiByZWZzW3Jhd1JlZi5rXTtcbiAgICAgICAgICBpZiAoaXNVbm1vdW50KSB7XG4gICAgICAgICAgICBpc0FycmF5KGV4aXN0aW5nKSAmJiByZW1vdmUoZXhpc3RpbmcsIHJlZlZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KGV4aXN0aW5nKSkge1xuICAgICAgICAgICAgICBpZiAoX2lzU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVmc1tyZWZdID0gW3JlZlZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FuU2V0U2V0dXBSZWYocmVmKSkge1xuICAgICAgICAgICAgICAgICAgc2V0dXBTdGF0ZVtyZWZdID0gcmVmc1tyZWZdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWwgPSBbcmVmVmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChjYW5TZXRSZWYocmVmKSkge1xuICAgICAgICAgICAgICAgICAgcmVmLnZhbHVlID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmF3UmVmLmspIHJlZnNbcmF3UmVmLmtdID0gbmV3VmFsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFleGlzdGluZy5pbmNsdWRlcyhyZWZWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmcucHVzaChyZWZWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF9pc1N0cmluZykge1xuICAgICAgICAgIHJlZnNbcmVmXSA9IHZhbHVlO1xuICAgICAgICAgIGlmIChjYW5TZXRTZXR1cFJlZihyZWYpKSB7XG4gICAgICAgICAgICBzZXR1cFN0YXRlW3JlZl0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoX2lzUmVmKSB7XG4gICAgICAgICAgaWYgKGNhblNldFJlZihyZWYpKSB7XG4gICAgICAgICAgICByZWYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJhd1JlZi5rKSByZWZzW3Jhd1JlZi5rXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICB3YXJuJDEoXCJJbnZhbGlkIHRlbXBsYXRlIHJlZiB0eXBlOlwiLCByZWYsIGAoJHt0eXBlb2YgcmVmfSlgKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBkb1NldC5pZCA9IC0xO1xuICAgICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoZG9TZXQsIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvU2V0KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuJDEoXCJJbnZhbGlkIHRlbXBsYXRlIHJlZiB0eXBlOlwiLCByZWYsIGAoJHt0eXBlb2YgcmVmfSlgKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IGhhc0xvZ2dlZE1pc21hdGNoRXJyb3IgPSBmYWxzZTtcbmNvbnN0IGxvZ01pc21hdGNoRXJyb3IgPSAoKSA9PiB7XG4gIGlmIChoYXNMb2dnZWRNaXNtYXRjaEVycm9yKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnNvbGUuZXJyb3IoXCJIeWRyYXRpb24gY29tcGxldGVkIGJ1dCBjb250YWlucyBtaXNtYXRjaGVzLlwiKTtcbiAgaGFzTG9nZ2VkTWlzbWF0Y2hFcnJvciA9IHRydWU7XG59O1xuY29uc3QgaXNTVkdDb250YWluZXIgPSAoY29udGFpbmVyKSA9PiBjb250YWluZXIubmFtZXNwYWNlVVJJLmluY2x1ZGVzKFwic3ZnXCIpICYmIGNvbnRhaW5lci50YWdOYW1lICE9PSBcImZvcmVpZ25PYmplY3RcIjtcbmNvbnN0IGlzTWF0aE1MQ29udGFpbmVyID0gKGNvbnRhaW5lcikgPT4gY29udGFpbmVyLm5hbWVzcGFjZVVSSS5pbmNsdWRlcyhcIk1hdGhNTFwiKTtcbmNvbnN0IGdldENvbnRhaW5lclR5cGUgPSAoY29udGFpbmVyKSA9PiB7XG4gIGlmIChjb250YWluZXIubm9kZVR5cGUgIT09IDEpIHJldHVybiB2b2lkIDA7XG4gIGlmIChpc1NWR0NvbnRhaW5lcihjb250YWluZXIpKSByZXR1cm4gXCJzdmdcIjtcbiAgaWYgKGlzTWF0aE1MQ29udGFpbmVyKGNvbnRhaW5lcikpIHJldHVybiBcIm1hdGhtbFwiO1xuICByZXR1cm4gdm9pZCAwO1xufTtcbmNvbnN0IGlzQ29tbWVudCA9IChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSA4O1xuZnVuY3Rpb24gY3JlYXRlSHlkcmF0aW9uRnVuY3Rpb25zKHJlbmRlcmVySW50ZXJuYWxzKSB7XG4gIGNvbnN0IHtcbiAgICBtdDogbW91bnRDb21wb25lbnQsXG4gICAgcDogcGF0Y2gsXG4gICAgbzoge1xuICAgICAgcGF0Y2hQcm9wLFxuICAgICAgY3JlYXRlVGV4dCxcbiAgICAgIG5leHRTaWJsaW5nLFxuICAgICAgcGFyZW50Tm9kZSxcbiAgICAgIHJlbW92ZSxcbiAgICAgIGluc2VydCxcbiAgICAgIGNyZWF0ZUNvbW1lbnRcbiAgICB9XG4gIH0gPSByZW5kZXJlckludGVybmFscztcbiAgY29uc3QgaHlkcmF0ZSA9ICh2bm9kZSwgY29udGFpbmVyKSA9PiB7XG4gICAgaWYgKCFjb250YWluZXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX18pICYmIHdhcm4kMShcbiAgICAgICAgYEF0dGVtcHRpbmcgdG8gaHlkcmF0ZSBleGlzdGluZyBtYXJrdXAgYnV0IGNvbnRhaW5lciBpcyBlbXB0eS4gUGVyZm9ybWluZyBmdWxsIG1vdW50IGluc3RlYWQuYFxuICAgICAgKTtcbiAgICAgIHBhdGNoKG51bGwsIHZub2RlLCBjb250YWluZXIpO1xuICAgICAgZmx1c2hQb3N0Rmx1c2hDYnMoKTtcbiAgICAgIGNvbnRhaW5lci5fdm5vZGUgPSB2bm9kZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaHlkcmF0ZU5vZGUoY29udGFpbmVyLmZpcnN0Q2hpbGQsIHZub2RlLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICBmbHVzaFBvc3RGbHVzaENicygpO1xuICAgIGNvbnRhaW5lci5fdm5vZGUgPSB2bm9kZTtcbiAgfTtcbiAgY29uc3QgaHlkcmF0ZU5vZGUgPSAobm9kZSwgdm5vZGUsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkID0gZmFsc2UpID0+IHtcbiAgICBvcHRpbWl6ZWQgPSBvcHRpbWl6ZWQgfHwgISF2bm9kZS5keW5hbWljQ2hpbGRyZW47XG4gICAgY29uc3QgaXNGcmFnbWVudFN0YXJ0ID0gaXNDb21tZW50KG5vZGUpICYmIG5vZGUuZGF0YSA9PT0gXCJbXCI7XG4gICAgY29uc3Qgb25NaXNtYXRjaCA9ICgpID0+IGhhbmRsZU1pc21hdGNoKFxuICAgICAgbm9kZSxcbiAgICAgIHZub2RlLFxuICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICBzbG90U2NvcGVJZHMsXG4gICAgICBpc0ZyYWdtZW50U3RhcnRcbiAgICApO1xuICAgIGNvbnN0IHsgdHlwZSwgcmVmLCBzaGFwZUZsYWcsIHBhdGNoRmxhZyB9ID0gdm5vZGU7XG4gICAgbGV0IGRvbVR5cGUgPSBub2RlLm5vZGVUeXBlO1xuICAgIHZub2RlLmVsID0gbm9kZTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgIGRlZihub2RlLCBcIl9fdm5vZGVcIiwgdm5vZGUsIHRydWUpO1xuICAgICAgZGVmKG5vZGUsIFwiX192dWVQYXJlbnRDb21wb25lbnRcIiwgcGFyZW50Q29tcG9uZW50LCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKHBhdGNoRmxhZyA9PT0gLTIpIHtcbiAgICAgIG9wdGltaXplZCA9IGZhbHNlO1xuICAgICAgdm5vZGUuZHluYW1pY0NoaWxkcmVuID0gbnVsbDtcbiAgICB9XG4gICAgbGV0IG5leHROb2RlID0gbnVsbDtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgVGV4dDpcbiAgICAgICAgaWYgKGRvbVR5cGUgIT09IDMpIHtcbiAgICAgICAgICBpZiAodm5vZGUuY2hpbGRyZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGluc2VydCh2bm9kZS5lbCA9IGNyZWF0ZVRleHQoXCJcIiksIHBhcmVudE5vZGUobm9kZSksIG5vZGUpO1xuICAgICAgICAgICAgbmV4dE5vZGUgPSBub2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0Tm9kZSA9IG9uTWlzbWF0Y2goKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG5vZGUuZGF0YSAhPT0gdm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykgJiYgd2FybiQxKFxuICAgICAgICAgICAgICBgSHlkcmF0aW9uIHRleHQgbWlzbWF0Y2ggaW5gLFxuICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgIGBcbiAgLSByZW5kZXJlZCBvbiBzZXJ2ZXI6ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgbm9kZS5kYXRhXG4gICAgICAgICAgICAgICl9XG4gIC0gZXhwZWN0ZWQgb24gY2xpZW50OiAke0pTT04uc3RyaW5naWZ5KHZub2RlLmNoaWxkcmVuKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbG9nTWlzbWF0Y2hFcnJvcigpO1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHROb2RlID0gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENvbW1lbnQ6XG4gICAgICAgIGlmIChpc1RlbXBsYXRlTm9kZShub2RlKSkge1xuICAgICAgICAgIG5leHROb2RlID0gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICAgICAgcmVwbGFjZU5vZGUoXG4gICAgICAgICAgICB2bm9kZS5lbCA9IG5vZGUuY29udGVudC5maXJzdENoaWxkLFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9tVHlwZSAhPT0gOCB8fCBpc0ZyYWdtZW50U3RhcnQpIHtcbiAgICAgICAgICBuZXh0Tm9kZSA9IG9uTWlzbWF0Y2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0Tm9kZSA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTdGF0aWM6XG4gICAgICAgIGlmIChpc0ZyYWdtZW50U3RhcnQpIHtcbiAgICAgICAgICBub2RlID0gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICAgICAgZG9tVHlwZSA9IG5vZGUubm9kZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvbVR5cGUgPT09IDEgfHwgZG9tVHlwZSA9PT0gMykge1xuICAgICAgICAgIG5leHROb2RlID0gbm9kZTtcbiAgICAgICAgICBjb25zdCBuZWVkVG9BZG9wdENvbnRlbnQgPSAhdm5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdm5vZGUuc3RhdGljQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5lZWRUb0Fkb3B0Q29udGVudClcbiAgICAgICAgICAgICAgdm5vZGUuY2hpbGRyZW4gKz0gbmV4dE5vZGUubm9kZVR5cGUgPT09IDEgPyBuZXh0Tm9kZS5vdXRlckhUTUwgOiBuZXh0Tm9kZS5kYXRhO1xuICAgICAgICAgICAgaWYgKGkgPT09IHZub2RlLnN0YXRpY0NvdW50IC0gMSkge1xuICAgICAgICAgICAgICB2bm9kZS5hbmNob3IgPSBuZXh0Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHROb2RlID0gbmV4dFNpYmxpbmcobmV4dE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXNGcmFnbWVudFN0YXJ0ID8gbmV4dFNpYmxpbmcobmV4dE5vZGUpIDogbmV4dE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25NaXNtYXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGcmFnbWVudDpcbiAgICAgICAgaWYgKCFpc0ZyYWdtZW50U3RhcnQpIHtcbiAgICAgICAgICBuZXh0Tm9kZSA9IG9uTWlzbWF0Y2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0Tm9kZSA9IGh5ZHJhdGVGcmFnbWVudChcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChzaGFwZUZsYWcgJiAxKSB7XG4gICAgICAgICAgaWYgKChkb21UeXBlICE9PSAxIHx8IHZub2RlLnR5cGUudG9Mb3dlckNhc2UoKSAhPT0gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpICYmICFpc1RlbXBsYXRlTm9kZShub2RlKSkge1xuICAgICAgICAgICAgbmV4dE5vZGUgPSBvbk1pc21hdGNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gaHlkcmF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgIHZub2RlLFxuICAgICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgNikge1xuICAgICAgICAgIHZub2RlLnNsb3RTY29wZUlkcyA9IHNsb3RTY29wZUlkcztcbiAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBwYXJlbnROb2RlKG5vZGUpO1xuICAgICAgICAgIGlmIChpc0ZyYWdtZW50U3RhcnQpIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gbG9jYXRlQ2xvc2luZ0FuY2hvcihub2RlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29tbWVudChub2RlKSAmJiBub2RlLmRhdGEgPT09IFwidGVsZXBvcnQgc3RhcnRcIikge1xuICAgICAgICAgICAgbmV4dE5vZGUgPSBsb2NhdGVDbG9zaW5nQW5jaG9yKG5vZGUsIG5vZGUuZGF0YSwgXCJ0ZWxlcG9ydCBlbmRcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vdW50Q29tcG9uZW50KFxuICAgICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBnZXRDb250YWluZXJUeXBlKGNvbnRhaW5lciksXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpc0FzeW5jV3JhcHBlcih2bm9kZSkgJiYgIXZub2RlLnR5cGUuX19hc3luY1Jlc29sdmVkKSB7XG4gICAgICAgICAgICBsZXQgc3ViVHJlZTtcbiAgICAgICAgICAgIGlmIChpc0ZyYWdtZW50U3RhcnQpIHtcbiAgICAgICAgICAgICAgc3ViVHJlZSA9IGNyZWF0ZVZOb2RlKEZyYWdtZW50KTtcbiAgICAgICAgICAgICAgc3ViVHJlZS5hbmNob3IgPSBuZXh0Tm9kZSA/IG5leHROb2RlLnByZXZpb3VzU2libGluZyA6IGNvbnRhaW5lci5sYXN0Q2hpbGQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdWJUcmVlID0gbm9kZS5ub2RlVHlwZSA9PT0gMyA/IGNyZWF0ZVRleHRWTm9kZShcIlwiKSA6IGNyZWF0ZVZOb2RlKFwiZGl2XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViVHJlZS5lbCA9IG5vZGU7XG4gICAgICAgICAgICB2bm9kZS5jb21wb25lbnQuc3ViVHJlZSA9IHN1YlRyZWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNoYXBlRmxhZyAmIDY0KSB7XG4gICAgICAgICAgaWYgKGRvbVR5cGUgIT09IDgpIHtcbiAgICAgICAgICAgIG5leHROb2RlID0gb25NaXNtYXRjaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0Tm9kZSA9IHZub2RlLnR5cGUuaHlkcmF0ZShcbiAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICAgICAgb3B0aW1pemVkLFxuICAgICAgICAgICAgICByZW5kZXJlckludGVybmFscyxcbiAgICAgICAgICAgICAgaHlkcmF0ZUNoaWxkcmVuXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZUZsYWcgJiAxMjgpIHtcbiAgICAgICAgICBuZXh0Tm9kZSA9IHZub2RlLnR5cGUuaHlkcmF0ZShcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgZ2V0Q29udGFpbmVyVHlwZShwYXJlbnROb2RlKG5vZGUpKSxcbiAgICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICAgIG9wdGltaXplZCxcbiAgICAgICAgICAgIHJlbmRlcmVySW50ZXJuYWxzLFxuICAgICAgICAgICAgaHlkcmF0ZU5vZGVcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fKSB7XG4gICAgICAgICAgd2FybiQxKFwiSW52YWxpZCBIb3N0Vk5vZGUgdHlwZTpcIiwgdHlwZSwgYCgke3R5cGVvZiB0eXBlfSlgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVmICE9IG51bGwpIHtcbiAgICAgIHNldFJlZihyZWYsIG51bGwsIHBhcmVudFN1c3BlbnNlLCB2bm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgfTtcbiAgY29uc3QgaHlkcmF0ZUVsZW1lbnQgPSAoZWwsIHZub2RlLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIG9wdGltaXplZCA9IG9wdGltaXplZCB8fCAhIXZub2RlLmR5bmFtaWNDaGlsZHJlbjtcbiAgICBjb25zdCB7IHR5cGUsIHByb3BzLCBwYXRjaEZsYWcsIHNoYXBlRmxhZywgZGlycywgdHJhbnNpdGlvbiB9ID0gdm5vZGU7XG4gICAgY29uc3QgZm9yY2VQYXRjaCA9IHR5cGUgPT09IFwiaW5wdXRcIiB8fCB0eXBlID09PSBcIm9wdGlvblwiO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IGZvcmNlUGF0Y2ggfHwgcGF0Y2hGbGFnICE9PSAtMSkge1xuICAgICAgaWYgKGRpcnMpIHtcbiAgICAgICAgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcImNyZWF0ZWRcIik7XG4gICAgICB9XG4gICAgICBsZXQgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgPSBmYWxzZTtcbiAgICAgIGlmIChpc1RlbXBsYXRlTm9kZShlbCkpIHtcbiAgICAgICAgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgPSBuZWVkVHJhbnNpdGlvbihcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIC8vIG5vIG5lZWQgY2hlY2sgcGFyZW50U3VzcGVuc2UgaW4gaHlkcmF0aW9uXG4gICAgICAgICAgdHJhbnNpdGlvblxuICAgICAgICApICYmIHBhcmVudENvbXBvbmVudCAmJiBwYXJlbnRDb21wb25lbnQudm5vZGUucHJvcHMgJiYgcGFyZW50Q29tcG9uZW50LnZub2RlLnByb3BzLmFwcGVhcjtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGVsLmNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzKSB7XG4gICAgICAgICAgY29uc3QgY2xzID0gY29udGVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICBpZiAoY2xzKSBjb250ZW50LiRjbHMgPSBjbHM7XG4gICAgICAgICAgdHJhbnNpdGlvbi5iZWZvcmVFbnRlcihjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXBsYWNlTm9kZShjb250ZW50LCBlbCwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgdm5vZGUuZWwgPSBlbCA9IGNvbnRlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoc2hhcGVGbGFnICYgMTYgJiYgLy8gc2tpcCBpZiBlbGVtZW50IGhhcyBpbm5lckhUTUwgLyB0ZXh0Q29udGVudFxuICAgICAgIShwcm9wcyAmJiAocHJvcHMuaW5uZXJIVE1MIHx8IHByb3BzLnRleHRDb250ZW50KSkpIHtcbiAgICAgICAgbGV0IG5leHQgPSBoeWRyYXRlQ2hpbGRyZW4oXG4gICAgICAgICAgZWwuZmlyc3RDaGlsZCxcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICBsZXQgaGFzV2FybmVkID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgaWYgKCFpc01pc21hdGNoQWxsb3dlZChlbCwgMSAvKiBDSElMRFJFTiAqLykpIHtcbiAgICAgICAgICAgIGlmICgoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX18pICYmICFoYXNXYXJuZWQpIHtcbiAgICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICAgIGBIeWRyYXRpb24gY2hpbGRyZW4gbWlzbWF0Y2ggb25gLFxuICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgIGBcblNlcnZlciByZW5kZXJlZCBlbGVtZW50IGNvbnRhaW5zIG1vcmUgY2hpbGQgbm9kZXMgdGhhbiBjbGllbnQgdmRvbS5gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGhhc1dhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dNaXNtYXRjaEVycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGN1ciA9IG5leHQ7XG4gICAgICAgICAgbmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgcmVtb3ZlKGN1cik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgOCkge1xuICAgICAgICBsZXQgY2xpZW50VGV4dCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAoY2xpZW50VGV4dFswXSA9PT0gXCJcXG5cIiAmJiAoZWwudGFnTmFtZSA9PT0gXCJQUkVcIiB8fCBlbC50YWdOYW1lID09PSBcIlRFWFRBUkVBXCIpKSB7XG4gICAgICAgICAgY2xpZW50VGV4dCA9IGNsaWVudFRleHQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLnRleHRDb250ZW50ICE9PSBjbGllbnRUZXh0KSB7XG4gICAgICAgICAgaWYgKCFpc01pc21hdGNoQWxsb3dlZChlbCwgMCAvKiBURVhUICovKSkge1xuICAgICAgICAgICAgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fKSAmJiB3YXJuJDEoXG4gICAgICAgICAgICAgIGBIeWRyYXRpb24gdGV4dCBjb250ZW50IG1pc21hdGNoIG9uYCxcbiAgICAgICAgICAgICAgZWwsXG4gICAgICAgICAgICAgIGBcbiAgLSByZW5kZXJlZCBvbiBzZXJ2ZXI6ICR7ZWwudGV4dENvbnRlbnR9XG4gIC0gZXhwZWN0ZWQgb24gY2xpZW50OiAke3Zub2RlLmNoaWxkcmVufWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsb2dNaXNtYXRjaEVycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcykge1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX18gfHwgZm9yY2VQYXRjaCB8fCAhb3B0aW1pemVkIHx8IHBhdGNoRmxhZyAmICgxNiB8IDMyKSkge1xuICAgICAgICAgIGNvbnN0IGlzQ3VzdG9tRWxlbWVudCA9IGVsLnRhZ05hbWUuaW5jbHVkZXMoXCItXCIpO1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAoKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fKSAmJiAvLyAjMTExODkgc2tpcCBpZiB0aGlzIG5vZGUgaGFzIGRpcmVjdGl2ZXMgdGhhdCBoYXZlIGNyZWF0ZWQgaG9va3NcbiAgICAgICAgICAgIC8vIGFzIGl0IGNvdWxkIGhhdmUgbXV0YXRlZCB0aGUgRE9NIGluIGFueSBwb3NzaWJsZSB3YXlcbiAgICAgICAgICAgICEoZGlycyAmJiBkaXJzLnNvbWUoKGQpID0+IGQuZGlyLmNyZWF0ZWQpKSAmJiBwcm9wSGFzTWlzbWF0Y2goZWwsIGtleSwgcHJvcHNba2V5XSwgdm5vZGUsIHBhcmVudENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgbG9nTWlzbWF0Y2hFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvcmNlUGF0Y2ggJiYgKGtleS5lbmRzV2l0aChcInZhbHVlXCIpIHx8IGtleSA9PT0gXCJpbmRldGVybWluYXRlXCIpIHx8IGlzT24oa2V5KSAmJiAhaXNSZXNlcnZlZFByb3Aoa2V5KSB8fCAvLyBmb3JjZSBoeWRyYXRlIHYtYmluZCB3aXRoIC5wcm9wIG1vZGlmaWVyc1xuICAgICAgICAgICAga2V5WzBdID09PSBcIi5cIiB8fCBpc0N1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcGF0Y2hQcm9wKGVsLCBrZXksIG51bGwsIHByb3BzW2tleV0sIHZvaWQgMCwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMub25DbGljaykge1xuICAgICAgICAgIHBhdGNoUHJvcChcbiAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgXCJvbkNsaWNrXCIsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgcHJvcHMub25DbGljayxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocGF0Y2hGbGFnICYgNCAmJiBpc1JlYWN0aXZlKHByb3BzLnN0eWxlKSkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BzLnN0eWxlKSBwcm9wcy5zdHlsZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgdm5vZGVIb29rcztcbiAgICAgIGlmICh2bm9kZUhvb2tzID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZUJlZm9yZU1vdW50KSB7XG4gICAgICAgIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2tzLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJzKSB7XG4gICAgICAgIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIG51bGwsIHBhcmVudENvbXBvbmVudCwgXCJiZWZvcmVNb3VudFwiKTtcbiAgICAgIH1cbiAgICAgIGlmICgodm5vZGVIb29rcyA9IHByb3BzICYmIHByb3BzLm9uVm5vZGVNb3VudGVkKSB8fCBkaXJzIHx8IG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzKSB7XG4gICAgICAgIHF1ZXVlRWZmZWN0V2l0aFN1c3BlbnNlKCgpID0+IHtcbiAgICAgICAgICB2bm9kZUhvb2tzICYmIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2tzLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICAgICAgICBuZWVkQ2FsbFRyYW5zaXRpb25Ib29rcyAmJiB0cmFuc2l0aW9uLmVudGVyKGVsKTtcbiAgICAgICAgICBkaXJzICYmIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIG51bGwsIHBhcmVudENvbXBvbmVudCwgXCJtb3VudGVkXCIpO1xuICAgICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbC5uZXh0U2libGluZztcbiAgfTtcbiAgY29uc3QgaHlkcmF0ZUNoaWxkcmVuID0gKG5vZGUsIHBhcmVudFZOb2RlLCBjb250YWluZXIsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgb3B0aW1pemVkID0gb3B0aW1pemVkIHx8ICEhcGFyZW50Vk5vZGUuZHluYW1pY0NoaWxkcmVuO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50Vk5vZGUuY2hpbGRyZW47XG4gICAgY29uc3QgbCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICBsZXQgaGFzV2FybmVkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHZub2RlID0gb3B0aW1pemVkID8gY2hpbGRyZW5baV0gOiBjaGlsZHJlbltpXSA9IG5vcm1hbGl6ZVZOb2RlKGNoaWxkcmVuW2ldKTtcbiAgICAgIGNvbnN0IGlzVGV4dCA9IHZub2RlLnR5cGUgPT09IFRleHQ7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICBpZiAoaXNUZXh0ICYmICFvcHRpbWl6ZWQpIHtcbiAgICAgICAgICBpZiAoaSArIDEgPCBsICYmIG5vcm1hbGl6ZVZOb2RlKGNoaWxkcmVuW2kgKyAxXSkudHlwZSA9PT0gVGV4dCkge1xuICAgICAgICAgICAgaW5zZXJ0KFxuICAgICAgICAgICAgICBjcmVhdGVUZXh0KFxuICAgICAgICAgICAgICAgIG5vZGUuZGF0YS5zbGljZSh2bm9kZS5jaGlsZHJlbi5sZW5ndGgpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgbmV4dFNpYmxpbmcobm9kZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IGh5ZHJhdGVOb2RlKFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNUZXh0ICYmICF2bm9kZS5jaGlsZHJlbikge1xuICAgICAgICBpbnNlcnQodm5vZGUuZWwgPSBjcmVhdGVUZXh0KFwiXCIpLCBjb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFpc01pc21hdGNoQWxsb3dlZChjb250YWluZXIsIDEgLyogQ0hJTERSRU4gKi8pKSB7XG4gICAgICAgICAgaWYgKCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykgJiYgIWhhc1dhcm5lZCkge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBgSHlkcmF0aW9uIGNoaWxkcmVuIG1pc21hdGNoIG9uYCxcbiAgICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgICBgXG5TZXJ2ZXIgcmVuZGVyZWQgZWxlbWVudCBjb250YWlucyBmZXdlciBjaGlsZCBub2RlcyB0aGFuIGNsaWVudCB2ZG9tLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBoYXNXYXJuZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dNaXNtYXRjaEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcGF0Y2goXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgZ2V0Q29udGFpbmVyVHlwZShjb250YWluZXIpLFxuICAgICAgICAgIHNsb3RTY29wZUlkc1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcbiAgY29uc3QgaHlkcmF0ZUZyYWdtZW50ID0gKG5vZGUsIHZub2RlLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IHsgc2xvdFNjb3BlSWRzOiBmcmFnbWVudFNsb3RTY29wZUlkcyB9ID0gdm5vZGU7XG4gICAgaWYgKGZyYWdtZW50U2xvdFNjb3BlSWRzKSB7XG4gICAgICBzbG90U2NvcGVJZHMgPSBzbG90U2NvcGVJZHMgPyBzbG90U2NvcGVJZHMuY29uY2F0KGZyYWdtZW50U2xvdFNjb3BlSWRzKSA6IGZyYWdtZW50U2xvdFNjb3BlSWRzO1xuICAgIH1cbiAgICBjb25zdCBjb250YWluZXIgPSBwYXJlbnROb2RlKG5vZGUpO1xuICAgIGNvbnN0IG5leHQgPSBoeWRyYXRlQ2hpbGRyZW4oXG4gICAgICBuZXh0U2libGluZyhub2RlKSxcbiAgICAgIHZub2RlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICBzbG90U2NvcGVJZHMsXG4gICAgICBvcHRpbWl6ZWRcbiAgICApO1xuICAgIGlmIChuZXh0ICYmIGlzQ29tbWVudChuZXh0KSAmJiBuZXh0LmRhdGEgPT09IFwiXVwiKSB7XG4gICAgICByZXR1cm4gbmV4dFNpYmxpbmcodm5vZGUuYW5jaG9yID0gbmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ01pc21hdGNoRXJyb3IoKTtcbiAgICAgIGluc2VydCh2bm9kZS5hbmNob3IgPSBjcmVhdGVDb21tZW50KGBdYCksIGNvbnRhaW5lciwgbmV4dCk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGhhbmRsZU1pc21hdGNoID0gKG5vZGUsIHZub2RlLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBzbG90U2NvcGVJZHMsIGlzRnJhZ21lbnQpID0+IHtcbiAgICBpZiAoIWlzTWlzbWF0Y2hBbGxvd2VkKG5vZGUucGFyZW50RWxlbWVudCwgMSAvKiBDSElMRFJFTiAqLykpIHtcbiAgICAgICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXykgJiYgd2FybiQxKFxuICAgICAgICBgSHlkcmF0aW9uIG5vZGUgbWlzbWF0Y2g6XG4tIHJlbmRlcmVkIG9uIHNlcnZlcjpgLFxuICAgICAgICBub2RlLFxuICAgICAgICBub2RlLm5vZGVUeXBlID09PSAzID8gYCh0ZXh0KWAgOiBpc0NvbW1lbnQobm9kZSkgJiYgbm9kZS5kYXRhID09PSBcIltcIiA/IGAoc3RhcnQgb2YgZnJhZ21lbnQpYCA6IGBgLFxuICAgICAgICBgXG4tIGV4cGVjdGVkIG9uIGNsaWVudDpgLFxuICAgICAgICB2bm9kZS50eXBlXG4gICAgICApO1xuICAgICAgbG9nTWlzbWF0Y2hFcnJvcigpO1xuICAgIH1cbiAgICB2bm9kZS5lbCA9IG51bGw7XG4gICAgaWYgKGlzRnJhZ21lbnQpIHtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0ZUNsb3NpbmdBbmNob3Iobm9kZSk7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCBuZXh0MiA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgICBpZiAobmV4dDIgJiYgbmV4dDIgIT09IGVuZCkge1xuICAgICAgICAgIHJlbW92ZShuZXh0Mik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV4dCA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHBhcmVudE5vZGUobm9kZSk7XG4gICAgcmVtb3ZlKG5vZGUpO1xuICAgIHBhdGNoKFxuICAgICAgbnVsbCxcbiAgICAgIHZub2RlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgbmV4dCxcbiAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgZ2V0Q29udGFpbmVyVHlwZShjb250YWluZXIpLFxuICAgICAgc2xvdFNjb3BlSWRzXG4gICAgKTtcbiAgICBpZiAocGFyZW50Q29tcG9uZW50KSB7XG4gICAgICBwYXJlbnRDb21wb25lbnQudm5vZGUuZWwgPSB2bm9kZS5lbDtcbiAgICAgIHVwZGF0ZUhPQ0hvc3RFbChwYXJlbnRDb21wb25lbnQsIHZub2RlLmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH07XG4gIGNvbnN0IGxvY2F0ZUNsb3NpbmdBbmNob3IgPSAobm9kZSwgb3BlbiA9IFwiW1wiLCBjbG9zZSA9IFwiXVwiKSA9PiB7XG4gICAgbGV0IG1hdGNoID0gMDtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgbm9kZSA9IG5leHRTaWJsaW5nKG5vZGUpO1xuICAgICAgaWYgKG5vZGUgJiYgaXNDb21tZW50KG5vZGUpKSB7XG4gICAgICAgIGlmIChub2RlLmRhdGEgPT09IG9wZW4pIG1hdGNoKys7XG4gICAgICAgIGlmIChub2RlLmRhdGEgPT09IGNsb3NlKSB7XG4gICAgICAgICAgaWYgKG1hdGNoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFNpYmxpbmcobm9kZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoLS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9O1xuICBjb25zdCByZXBsYWNlTm9kZSA9IChuZXdOb2RlLCBvbGROb2RlLCBwYXJlbnRDb21wb25lbnQpID0+IHtcbiAgICBjb25zdCBwYXJlbnROb2RlMiA9IG9sZE5vZGUucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50Tm9kZTIpIHtcbiAgICAgIHBhcmVudE5vZGUyLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBvbGROb2RlKTtcbiAgICB9XG4gICAgbGV0IHBhcmVudCA9IHBhcmVudENvbXBvbmVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICBpZiAocGFyZW50LnZub2RlLmVsID09PSBvbGROb2RlKSB7XG4gICAgICAgIHBhcmVudC52bm9kZS5lbCA9IHBhcmVudC5zdWJUcmVlLmVsID0gbmV3Tm9kZTtcbiAgICAgIH1cbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuICB9O1xuICBjb25zdCBpc1RlbXBsYXRlTm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgbm9kZS50YWdOYW1lID09PSBcIlRFTVBMQVRFXCI7XG4gIH07XG4gIHJldHVybiBbaHlkcmF0ZSwgaHlkcmF0ZU5vZGVdO1xufVxuZnVuY3Rpb24gcHJvcEhhc01pc21hdGNoKGVsLCBrZXksIGNsaWVudFZhbHVlLCB2bm9kZSwgaW5zdGFuY2UpIHtcbiAgbGV0IG1pc21hdGNoVHlwZTtcbiAgbGV0IG1pc21hdGNoS2V5O1xuICBsZXQgYWN0dWFsO1xuICBsZXQgZXhwZWN0ZWQ7XG4gIGlmIChrZXkgPT09IFwiY2xhc3NcIikge1xuICAgIGlmIChlbC4kY2xzKSB7XG4gICAgICBhY3R1YWwgPSBlbC4kY2xzO1xuICAgICAgZGVsZXRlIGVsLiRjbHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdHVhbCA9IGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgIH1cbiAgICBleHBlY3RlZCA9IG5vcm1hbGl6ZUNsYXNzKGNsaWVudFZhbHVlKTtcbiAgICBpZiAoIWlzU2V0RXF1YWwodG9DbGFzc1NldChhY3R1YWwgfHwgXCJcIiksIHRvQ2xhc3NTZXQoZXhwZWN0ZWQpKSkge1xuICAgICAgbWlzbWF0Y2hUeXBlID0gMiAvKiBDTEFTUyAqLztcbiAgICAgIG1pc21hdGNoS2V5ID0gYGNsYXNzYDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHtcbiAgICBhY3R1YWwgPSBlbC5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSB8fCBcIlwiO1xuICAgIGV4cGVjdGVkID0gaXNTdHJpbmcoY2xpZW50VmFsdWUpID8gY2xpZW50VmFsdWUgOiBzdHJpbmdpZnlTdHlsZShub3JtYWxpemVTdHlsZShjbGllbnRWYWx1ZSkpO1xuICAgIGNvbnN0IGFjdHVhbE1hcCA9IHRvU3R5bGVNYXAoYWN0dWFsKTtcbiAgICBjb25zdCBleHBlY3RlZE1hcCA9IHRvU3R5bGVNYXAoZXhwZWN0ZWQpO1xuICAgIGlmICh2bm9kZS5kaXJzKSB7XG4gICAgICBmb3IgKGNvbnN0IHsgZGlyLCB2YWx1ZSB9IG9mIHZub2RlLmRpcnMpIHtcbiAgICAgICAgaWYgKGRpci5uYW1lID09PSBcInNob3dcIiAmJiAhdmFsdWUpIHtcbiAgICAgICAgICBleHBlY3RlZE1hcC5zZXQoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgIHJlc29sdmVDc3NWYXJzKGluc3RhbmNlLCB2bm9kZSwgZXhwZWN0ZWRNYXApO1xuICAgIH1cbiAgICBpZiAoIWlzTWFwRXF1YWwoYWN0dWFsTWFwLCBleHBlY3RlZE1hcCkpIHtcbiAgICAgIG1pc21hdGNoVHlwZSA9IDMgLyogU1RZTEUgKi87XG4gICAgICBtaXNtYXRjaEtleSA9IFwic3R5bGVcIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50ICYmIGlzS25vd25TdmdBdHRyKGtleSkgfHwgZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiAoaXNCb29sZWFuQXR0cihrZXkpIHx8IGlzS25vd25IdG1sQXR0cihrZXkpKSkge1xuICAgIGlmIChpc0Jvb2xlYW5BdHRyKGtleSkpIHtcbiAgICAgIGFjdHVhbCA9IGVsLmhhc0F0dHJpYnV0ZShrZXkpO1xuICAgICAgZXhwZWN0ZWQgPSBpbmNsdWRlQm9vbGVhbkF0dHIoY2xpZW50VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoY2xpZW50VmFsdWUgPT0gbnVsbCkge1xuICAgICAgYWN0dWFsID0gZWwuaGFzQXR0cmlidXRlKGtleSk7XG4gICAgICBleHBlY3RlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKGtleSkpIHtcbiAgICAgICAgYWN0dWFsID0gZWwuZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ2YWx1ZVwiICYmIGVsLnRhZ05hbWUgPT09IFwiVEVYVEFSRUFcIikge1xuICAgICAgICBhY3R1YWwgPSBlbC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdHVhbCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZXhwZWN0ZWQgPSBpc1JlbmRlcmFibGVBdHRyVmFsdWUoY2xpZW50VmFsdWUpID8gU3RyaW5nKGNsaWVudFZhbHVlKSA6IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgICAgbWlzbWF0Y2hUeXBlID0gNCAvKiBBVFRSSUJVVEUgKi87XG4gICAgICBtaXNtYXRjaEtleSA9IGtleTtcbiAgICB9XG4gIH1cbiAgaWYgKG1pc21hdGNoVHlwZSAhPSBudWxsICYmICFpc01pc21hdGNoQWxsb3dlZChlbCwgbWlzbWF0Y2hUeXBlKSkge1xuICAgIGNvbnN0IGZvcm1hdCA9ICh2KSA9PiB2ID09PSBmYWxzZSA/IGAobm90IHJlbmRlcmVkKWAgOiBgJHttaXNtYXRjaEtleX09XCIke3Z9XCJgO1xuICAgIGNvbnN0IHByZVNlZ21lbnQgPSBgSHlkcmF0aW9uICR7TWlzbWF0Y2hUeXBlU3RyaW5nW21pc21hdGNoVHlwZV19IG1pc21hdGNoIG9uYDtcbiAgICBjb25zdCBwb3N0U2VnbWVudCA9IGBcbiAgLSByZW5kZXJlZCBvbiBzZXJ2ZXI6ICR7Zm9ybWF0KGFjdHVhbCl9XG4gIC0gZXhwZWN0ZWQgb24gY2xpZW50OiAke2Zvcm1hdChleHBlY3RlZCl9XG4gIE5vdGU6IHRoaXMgbWlzbWF0Y2ggaXMgY2hlY2stb25seS4gVGhlIERPTSB3aWxsIG5vdCBiZSByZWN0aWZpZWQgaW4gcHJvZHVjdGlvbiBkdWUgdG8gcGVyZm9ybWFuY2Ugb3ZlcmhlYWQuXG4gIFlvdSBzaG91bGQgZml4IHRoZSBzb3VyY2Ugb2YgdGhlIG1pc21hdGNoLmA7XG4gICAge1xuICAgICAgd2FybiQxKHByZVNlZ21lbnQsIGVsLCBwb3N0U2VnbWVudCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHRvQ2xhc3NTZXQoc3RyKSB7XG4gIHJldHVybiBuZXcgU2V0KHN0ci50cmltKCkuc3BsaXQoL1xccysvKSk7XG59XG5mdW5jdGlvbiBpc1NldEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEuc2l6ZSAhPT0gYi5zaXplKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZvciAoY29uc3QgcyBvZiBhKSB7XG4gICAgaWYgKCFiLmhhcyhzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHRvU3R5bGVNYXAoc3RyKSB7XG4gIGNvbnN0IHN0eWxlTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIHN0ci5zcGxpdChcIjtcIikpIHtcbiAgICBsZXQgW2tleSwgdmFsdWVdID0gaXRlbS5zcGxpdChcIjpcIik7XG4gICAga2V5ID0ga2V5LnRyaW0oKTtcbiAgICB2YWx1ZSA9IHZhbHVlICYmIHZhbHVlLnRyaW0oKTtcbiAgICBpZiAoa2V5ICYmIHZhbHVlKSB7XG4gICAgICBzdHlsZU1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZU1hcDtcbn1cbmZ1bmN0aW9uIGlzTWFwRXF1YWwoYSwgYikge1xuICBpZiAoYS5zaXplICE9PSBiLnNpemUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgYSkge1xuICAgIGlmICh2YWx1ZSAhPT0gYi5nZXQoa2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVDc3NWYXJzKGluc3RhbmNlLCB2bm9kZSwgZXhwZWN0ZWRNYXApIHtcbiAgY29uc3Qgcm9vdCA9IGluc3RhbmNlLnN1YlRyZWU7XG4gIGlmIChpbnN0YW5jZS5nZXRDc3NWYXJzICYmICh2bm9kZSA9PT0gcm9vdCB8fCByb290ICYmIHJvb3QudHlwZSA9PT0gRnJhZ21lbnQgJiYgcm9vdC5jaGlsZHJlbi5pbmNsdWRlcyh2bm9kZSkpKSB7XG4gICAgY29uc3QgY3NzVmFycyA9IGluc3RhbmNlLmdldENzc1ZhcnMoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjc3NWYXJzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG5vcm1hbGl6ZUNzc1ZhclZhbHVlKGNzc1ZhcnNba2V5XSk7XG4gICAgICBleHBlY3RlZE1hcC5zZXQoYC0tJHtnZXRFc2NhcGVkQ3NzVmFyTmFtZShrZXksIGZhbHNlKX1gLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGlmICh2bm9kZSA9PT0gcm9vdCAmJiBpbnN0YW5jZS5wYXJlbnQpIHtcbiAgICByZXNvbHZlQ3NzVmFycyhpbnN0YW5jZS5wYXJlbnQsIGluc3RhbmNlLnZub2RlLCBleHBlY3RlZE1hcCk7XG4gIH1cbn1cbmNvbnN0IGFsbG93TWlzbWF0Y2hBdHRyID0gXCJkYXRhLWFsbG93LW1pc21hdGNoXCI7XG5jb25zdCBNaXNtYXRjaFR5cGVTdHJpbmcgPSB7XG4gIFswIC8qIFRFWFQgKi9dOiBcInRleHRcIixcbiAgWzEgLyogQ0hJTERSRU4gKi9dOiBcImNoaWxkcmVuXCIsXG4gIFsyIC8qIENMQVNTICovXTogXCJjbGFzc1wiLFxuICBbMyAvKiBTVFlMRSAqL106IFwic3R5bGVcIixcbiAgWzQgLyogQVRUUklCVVRFICovXTogXCJhdHRyaWJ1dGVcIlxufTtcbmZ1bmN0aW9uIGlzTWlzbWF0Y2hBbGxvd2VkKGVsLCBhbGxvd2VkVHlwZSkge1xuICBpZiAoYWxsb3dlZFR5cGUgPT09IDAgLyogVEVYVCAqLyB8fCBhbGxvd2VkVHlwZSA9PT0gMSAvKiBDSElMRFJFTiAqLykge1xuICAgIHdoaWxlIChlbCAmJiAhZWwuaGFzQXR0cmlidXRlKGFsbG93TWlzbWF0Y2hBdHRyKSkge1xuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgfVxuICBjb25zdCBhbGxvd2VkQXR0ciA9IGVsICYmIGVsLmdldEF0dHJpYnV0ZShhbGxvd01pc21hdGNoQXR0cik7XG4gIGlmIChhbGxvd2VkQXR0ciA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKGFsbG93ZWRBdHRyID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbGlzdCA9IGFsbG93ZWRBdHRyLnNwbGl0KFwiLFwiKTtcbiAgICBpZiAoYWxsb3dlZFR5cGUgPT09IDAgLyogVEVYVCAqLyAmJiBsaXN0LmluY2x1ZGVzKFwiY2hpbGRyZW5cIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdC5pbmNsdWRlcyhNaXNtYXRjaFR5cGVTdHJpbmdbYWxsb3dlZFR5cGVdKTtcbiAgfVxufVxuXG5jb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID0gZ2V0R2xvYmFsVGhpcygpLnJlcXVlc3RJZGxlQ2FsbGJhY2sgfHwgKChjYikgPT4gc2V0VGltZW91dChjYiwgMSkpO1xuY29uc3QgY2FuY2VsSWRsZUNhbGxiYWNrID0gZ2V0R2xvYmFsVGhpcygpLmNhbmNlbElkbGVDYWxsYmFjayB8fCAoKGlkKSA9PiBjbGVhclRpbWVvdXQoaWQpKTtcbmNvbnN0IGh5ZHJhdGVPbklkbGUgPSAodGltZW91dCA9IDFlNCkgPT4gKGh5ZHJhdGUpID0+IHtcbiAgY29uc3QgaWQgPSByZXF1ZXN0SWRsZUNhbGxiYWNrKGh5ZHJhdGUsIHsgdGltZW91dCB9KTtcbiAgcmV0dXJuICgpID0+IGNhbmNlbElkbGVDYWxsYmFjayhpZCk7XG59O1xuZnVuY3Rpb24gZWxlbWVudElzVmlzaWJsZUluVmlld3BvcnQoZWwpIHtcbiAgY29uc3QgeyB0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCB7IGlubmVySGVpZ2h0LCBpbm5lcldpZHRoIH0gPSB3aW5kb3c7XG4gIHJldHVybiAodG9wID4gMCAmJiB0b3AgPCBpbm5lckhlaWdodCB8fCBib3R0b20gPiAwICYmIGJvdHRvbSA8IGlubmVySGVpZ2h0KSAmJiAobGVmdCA+IDAgJiYgbGVmdCA8IGlubmVyV2lkdGggfHwgcmlnaHQgPiAwICYmIHJpZ2h0IDwgaW5uZXJXaWR0aCk7XG59XG5jb25zdCBoeWRyYXRlT25WaXNpYmxlID0gKG9wdHMpID0+IChoeWRyYXRlLCBmb3JFYWNoKSA9PiB7XG4gIGNvbnN0IG9iID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgZm9yIChjb25zdCBlIG9mIGVudHJpZXMpIHtcbiAgICAgIGlmICghZS5pc0ludGVyc2VjdGluZykgY29udGludWU7XG4gICAgICBvYi5kaXNjb25uZWN0KCk7XG4gICAgICBoeWRyYXRlKCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH0sIG9wdHMpO1xuICBmb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmICghKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcbiAgICBpZiAoZWxlbWVudElzVmlzaWJsZUluVmlld3BvcnQoZWwpKSB7XG4gICAgICBoeWRyYXRlKCk7XG4gICAgICBvYi5kaXNjb25uZWN0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG9iLm9ic2VydmUoZWwpO1xuICB9KTtcbiAgcmV0dXJuICgpID0+IG9iLmRpc2Nvbm5lY3QoKTtcbn07XG5jb25zdCBoeWRyYXRlT25NZWRpYVF1ZXJ5ID0gKHF1ZXJ5KSA9PiAoaHlkcmF0ZSkgPT4ge1xuICBpZiAocXVlcnkpIHtcbiAgICBjb25zdCBtcWwgPSBtYXRjaE1lZGlhKHF1ZXJ5KTtcbiAgICBpZiAobXFsLm1hdGNoZXMpIHtcbiAgICAgIGh5ZHJhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbXFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgaHlkcmF0ZSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgcmV0dXJuICgpID0+IG1xbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGh5ZHJhdGUpO1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IGh5ZHJhdGVPbkludGVyYWN0aW9uID0gKGludGVyYWN0aW9ucyA9IFtdKSA9PiAoaHlkcmF0ZSwgZm9yRWFjaCkgPT4ge1xuICBpZiAoaXNTdHJpbmcoaW50ZXJhY3Rpb25zKSkgaW50ZXJhY3Rpb25zID0gW2ludGVyYWN0aW9uc107XG4gIGxldCBoYXNIeWRyYXRlZCA9IGZhbHNlO1xuICBjb25zdCBkb0h5ZHJhdGUgPSAoZSkgPT4ge1xuICAgIGlmICghaGFzSHlkcmF0ZWQpIHtcbiAgICAgIGhhc0h5ZHJhdGVkID0gdHJ1ZTtcbiAgICAgIHRlYXJkb3duKCk7XG4gICAgICBoeWRyYXRlKCk7XG4gICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBlLmNvbnN0cnVjdG9yKGUudHlwZSwgZSkpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgdGVhcmRvd24gPSAoKSA9PiB7XG4gICAgZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGZvciAoY29uc3QgaSBvZiBpbnRlcmFjdGlvbnMpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihpLCBkb0h5ZHJhdGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBmb3JFYWNoKChlbCkgPT4ge1xuICAgIGZvciAoY29uc3QgaSBvZiBpbnRlcmFjdGlvbnMpIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoaSwgZG9IeWRyYXRlLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRlYXJkb3duO1xufTtcbmZ1bmN0aW9uIGZvckVhY2hFbGVtZW50KG5vZGUsIGNiKSB7XG4gIGlmIChpc0NvbW1lbnQobm9kZSkgJiYgbm9kZS5kYXRhID09PSBcIltcIikge1xuICAgIGxldCBkZXB0aCA9IDE7XG4gICAgbGV0IG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICBpZiAobmV4dC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYihuZXh0KTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0NvbW1lbnQobmV4dCkpIHtcbiAgICAgICAgaWYgKG5leHQuZGF0YSA9PT0gXCJdXCIpIHtcbiAgICAgICAgICBpZiAoLS1kZXB0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dC5kYXRhID09PSBcIltcIikge1xuICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjYihub2RlKTtcbiAgfVxufVxuXG5jb25zdCBpc0FzeW5jV3JhcHBlciA9IChpKSA9PiAhIWkudHlwZS5fX2FzeW5jTG9hZGVyO1xuLyohICNfX05PX1NJREVfRUZGRUNUU19fICovXG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gZGVmaW5lQXN5bmNDb21wb25lbnQoc291cmNlKSB7XG4gIGlmIChpc0Z1bmN0aW9uKHNvdXJjZSkpIHtcbiAgICBzb3VyY2UgPSB7IGxvYWRlcjogc291cmNlIH07XG4gIH1cbiAgY29uc3Qge1xuICAgIGxvYWRlcixcbiAgICBsb2FkaW5nQ29tcG9uZW50LFxuICAgIGVycm9yQ29tcG9uZW50LFxuICAgIGRlbGF5ID0gMjAwLFxuICAgIGh5ZHJhdGU6IGh5ZHJhdGVTdHJhdGVneSxcbiAgICB0aW1lb3V0LFxuICAgIC8vIHVuZGVmaW5lZCA9IG5ldmVyIHRpbWVzIG91dFxuICAgIHN1c3BlbnNpYmxlID0gdHJ1ZSxcbiAgICBvbkVycm9yOiB1c2VyT25FcnJvclxuICB9ID0gc291cmNlO1xuICBsZXQgcGVuZGluZ1JlcXVlc3QgPSBudWxsO1xuICBsZXQgcmVzb2x2ZWRDb21wO1xuICBsZXQgcmV0cmllcyA9IDA7XG4gIGNvbnN0IHJldHJ5ID0gKCkgPT4ge1xuICAgIHJldHJpZXMrKztcbiAgICBwZW5kaW5nUmVxdWVzdCA9IG51bGw7XG4gICAgcmV0dXJuIGxvYWQoKTtcbiAgfTtcbiAgY29uc3QgbG9hZCA9ICgpID0+IHtcbiAgICBsZXQgdGhpc1JlcXVlc3Q7XG4gICAgcmV0dXJuIHBlbmRpbmdSZXF1ZXN0IHx8ICh0aGlzUmVxdWVzdCA9IHBlbmRpbmdSZXF1ZXN0ID0gbG9hZGVyKCkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZXJyID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIgOiBuZXcgRXJyb3IoU3RyaW5nKGVycikpO1xuICAgICAgaWYgKHVzZXJPbkVycm9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXNlclJldHJ5ID0gKCkgPT4gcmVzb2x2ZShyZXRyeSgpKTtcbiAgICAgICAgICBjb25zdCB1c2VyRmFpbCA9ICgpID0+IHJlamVjdChlcnIpO1xuICAgICAgICAgIHVzZXJPbkVycm9yKGVyciwgdXNlclJldHJ5LCB1c2VyRmFpbCwgcmV0cmllcyArIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9KS50aGVuKChjb21wKSA9PiB7XG4gICAgICBpZiAodGhpc1JlcXVlc3QgIT09IHBlbmRpbmdSZXF1ZXN0ICYmIHBlbmRpbmdSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBwZW5kaW5nUmVxdWVzdDtcbiAgICAgIH1cbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFjb21wKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgQXN5bmMgY29tcG9uZW50IGxvYWRlciByZXNvbHZlZCB0byB1bmRlZmluZWQuIElmIHlvdSBhcmUgdXNpbmcgcmV0cnkoKSwgbWFrZSBzdXJlIHRvIHJldHVybiBpdHMgcmV0dXJuIHZhbHVlLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wICYmIChjb21wLl9fZXNNb2R1bGUgfHwgY29tcFtTeW1ib2wudG9TdHJpbmdUYWddID09PSBcIk1vZHVsZVwiKSkge1xuICAgICAgICBjb21wID0gY29tcC5kZWZhdWx0O1xuICAgICAgfVxuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY29tcCAmJiAhaXNPYmplY3QoY29tcCkgJiYgIWlzRnVuY3Rpb24oY29tcCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFzeW5jIGNvbXBvbmVudCBsb2FkIHJlc3VsdDogJHtjb21wfWApO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZWRDb21wID0gY29tcDtcbiAgICAgIHJldHVybiBjb21wO1xuICAgIH0pKTtcbiAgfTtcbiAgcmV0dXJuIGRlZmluZUNvbXBvbmVudCh7XG4gICAgbmFtZTogXCJBc3luY0NvbXBvbmVudFdyYXBwZXJcIixcbiAgICBfX2FzeW5jTG9hZGVyOiBsb2FkLFxuICAgIF9fYXN5bmNIeWRyYXRlKGVsLCBpbnN0YW5jZSwgaHlkcmF0ZSkge1xuICAgICAgbGV0IHBhdGNoZWQgPSBmYWxzZTtcbiAgICAgIChpbnN0YW5jZS5idSB8fCAoaW5zdGFuY2UuYnUgPSBbXSkpLnB1c2goKCkgPT4gcGF0Y2hlZCA9IHRydWUpO1xuICAgICAgY29uc3QgcGVyZm9ybUh5ZHJhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChwYXRjaGVkKSB7XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgICAgYFNraXBwaW5nIGxhenkgaHlkcmF0aW9uIGZvciBjb21wb25lbnQgJyR7Z2V0Q29tcG9uZW50TmFtZShyZXNvbHZlZENvbXApIHx8IHJlc29sdmVkQ29tcC5fX2ZpbGV9JzogaXQgd2FzIHVwZGF0ZWQgYmVmb3JlIGxhenkgaHlkcmF0aW9uIHBlcmZvcm1lZC5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaHlkcmF0ZSgpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IGRvSHlkcmF0ZSA9IGh5ZHJhdGVTdHJhdGVneSA/ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVhcmRvd24gPSBoeWRyYXRlU3RyYXRlZ3koXG4gICAgICAgICAgcGVyZm9ybUh5ZHJhdGUsXG4gICAgICAgICAgKGNiKSA9PiBmb3JFYWNoRWxlbWVudChlbCwgY2IpXG4gICAgICAgICk7XG4gICAgICAgIGlmICh0ZWFyZG93bikge1xuICAgICAgICAgIChpbnN0YW5jZS5idW0gfHwgKGluc3RhbmNlLmJ1bSA9IFtdKSkucHVzaCh0ZWFyZG93bik7XG4gICAgICAgIH1cbiAgICAgIH0gOiBwZXJmb3JtSHlkcmF0ZTtcbiAgICAgIGlmIChyZXNvbHZlZENvbXApIHtcbiAgICAgICAgZG9IeWRyYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2FkKCkudGhlbigoKSA9PiAhaW5zdGFuY2UuaXNVbm1vdW50ZWQgJiYgZG9IeWRyYXRlKCkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0IF9fYXN5bmNSZXNvbHZlZCgpIHtcbiAgICAgIHJldHVybiByZXNvbHZlZENvbXA7XG4gICAgfSxcbiAgICBzZXR1cCgpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gY3VycmVudEluc3RhbmNlO1xuICAgICAgbWFya0FzeW5jQm91bmRhcnkoaW5zdGFuY2UpO1xuICAgICAgaWYgKHJlc29sdmVkQ29tcCkge1xuICAgICAgICByZXR1cm4gKCkgPT4gY3JlYXRlSW5uZXJDb21wKHJlc29sdmVkQ29tcCwgaW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgcGVuZGluZ1JlcXVlc3QgPSBudWxsO1xuICAgICAgICBoYW5kbGVFcnJvcihcbiAgICAgICAgICBlcnIsXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgMTMsXG4gICAgICAgICAgIWVycm9yQ29tcG9uZW50XG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgaWYgKHN1c3BlbnNpYmxlICYmIGluc3RhbmNlLnN1c3BlbnNlIHx8IGlzSW5TU1JDb21wb25lbnRTZXR1cCkge1xuICAgICAgICByZXR1cm4gbG9hZCgpLnRoZW4oKGNvbXApID0+IHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4gY3JlYXRlSW5uZXJDb21wKGNvbXAsIGluc3RhbmNlKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICByZXR1cm4gKCkgPT4gZXJyb3JDb21wb25lbnQgPyBjcmVhdGVWTm9kZShlcnJvckNvbXBvbmVudCwge1xuICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsb2FkZWQgPSByZWYoZmFsc2UpO1xuICAgICAgY29uc3QgZXJyb3IgPSByZWYoKTtcbiAgICAgIGNvbnN0IGRlbGF5ZWQgPSByZWYoISFkZWxheSk7XG4gICAgICBpZiAoZGVsYXkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZGVsYXllZC52YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9XG4gICAgICBpZiAodGltZW91dCAhPSBudWxsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICghbG9hZGVkLnZhbHVlICYmICFlcnJvci52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgQXN5bmMgY29tcG9uZW50IHRpbWVkIG91dCBhZnRlciAke3RpbWVvdXR9bXMuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIGVycm9yLnZhbHVlID0gZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICB9XG4gICAgICBsb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGxvYWRlZC52YWx1ZSA9IHRydWU7XG4gICAgICAgIGlmIChpbnN0YW5jZS5wYXJlbnQgJiYgaXNLZWVwQWxpdmUoaW5zdGFuY2UucGFyZW50LnZub2RlKSkge1xuICAgICAgICAgIGluc3RhbmNlLnBhcmVudC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBvbkVycm9yKGVycik7XG4gICAgICAgIGVycm9yLnZhbHVlID0gZXJyO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAobG9hZGVkLnZhbHVlICYmIHJlc29sdmVkQ29tcCkge1xuICAgICAgICAgIHJldHVybiBjcmVhdGVJbm5lckNvbXAocmVzb2x2ZWRDb21wLCBpbnN0YW5jZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IudmFsdWUgJiYgZXJyb3JDb21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlVk5vZGUoZXJyb3JDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci52YWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxvYWRpbmdDb21wb25lbnQgJiYgIWRlbGF5ZWQudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlVk5vZGUobG9hZGluZ0NvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUlubmVyQ29tcChjb21wLCBwYXJlbnQpIHtcbiAgY29uc3QgeyByZWY6IHJlZjIsIHByb3BzLCBjaGlsZHJlbiwgY2UgfSA9IHBhcmVudC52bm9kZTtcbiAgY29uc3Qgdm5vZGUgPSBjcmVhdGVWTm9kZShjb21wLCBwcm9wcywgY2hpbGRyZW4pO1xuICB2bm9kZS5yZWYgPSByZWYyO1xuICB2bm9kZS5jZSA9IGNlO1xuICBkZWxldGUgcGFyZW50LnZub2RlLmNlO1xuICByZXR1cm4gdm5vZGU7XG59XG5cbmNvbnN0IGlzS2VlcEFsaXZlID0gKHZub2RlKSA9PiB2bm9kZS50eXBlLl9faXNLZWVwQWxpdmU7XG5jb25zdCBLZWVwQWxpdmVJbXBsID0ge1xuICBuYW1lOiBgS2VlcEFsaXZlYCxcbiAgLy8gTWFya2VyIGZvciBzcGVjaWFsIGhhbmRsaW5nIGluc2lkZSB0aGUgcmVuZGVyZXIuIFdlIGFyZSBub3QgdXNpbmcgYSA9PT1cbiAgLy8gY2hlY2sgZGlyZWN0bHkgb24gS2VlcEFsaXZlIGluIHRoZSByZW5kZXJlciwgYmVjYXVzZSBpbXBvcnRpbmcgaXQgZGlyZWN0bHlcbiAgLy8gd291bGQgcHJldmVudCBpdCBmcm9tIGJlaW5nIHRyZWUtc2hha2VuLlxuICBfX2lzS2VlcEFsaXZlOiB0cnVlLFxuICBwcm9wczoge1xuICAgIGluY2x1ZGU6IFtTdHJpbmcsIFJlZ0V4cCwgQXJyYXldLFxuICAgIGV4Y2x1ZGU6IFtTdHJpbmcsIFJlZ0V4cCwgQXJyYXldLFxuICAgIG1heDogW1N0cmluZywgTnVtYmVyXVxuICB9LFxuICBzZXR1cChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgICBjb25zdCBzaGFyZWRDb250ZXh0ID0gaW5zdGFuY2UuY3R4O1xuICAgIGlmICghc2hhcmVkQ29udGV4dC5yZW5kZXJlcikge1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBzbG90cy5kZWZhdWx0ICYmIHNsb3RzLmRlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSA/IGNoaWxkcmVuWzBdIDogY2hpbGRyZW47XG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBjYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgY29uc3Qga2V5cyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gICAgbGV0IGN1cnJlbnQgPSBudWxsO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgaW5zdGFuY2UuX192X2NhY2hlID0gY2FjaGU7XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudFN1c3BlbnNlID0gaW5zdGFuY2Uuc3VzcGVuc2U7XG4gICAgY29uc3Qge1xuICAgICAgcmVuZGVyZXI6IHtcbiAgICAgICAgcDogcGF0Y2gsXG4gICAgICAgIG06IG1vdmUsXG4gICAgICAgIHVtOiBfdW5tb3VudCxcbiAgICAgICAgbzogeyBjcmVhdGVFbGVtZW50IH1cbiAgICAgIH1cbiAgICB9ID0gc2hhcmVkQ29udGV4dDtcbiAgICBjb25zdCBzdG9yYWdlQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGFyZWRDb250ZXh0LmFjdGl2YXRlID0gKHZub2RlLCBjb250YWluZXIsIGFuY2hvciwgbmFtZXNwYWNlLCBvcHRpbWl6ZWQpID0+IHtcbiAgICAgIGNvbnN0IGluc3RhbmNlMiA9IHZub2RlLmNvbXBvbmVudDtcbiAgICAgIG1vdmUodm5vZGUsIGNvbnRhaW5lciwgYW5jaG9yLCAwLCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICBwYXRjaChcbiAgICAgICAgaW5zdGFuY2UyLnZub2RlLFxuICAgICAgICB2bm9kZSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIGluc3RhbmNlMixcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgdm5vZGUuc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICk7XG4gICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpbnN0YW5jZTIuaXNEZWFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5zdGFuY2UyLmEpIHtcbiAgICAgICAgICBpbnZva2VBcnJheUZucyhpbnN0YW5jZTIuYSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgdm5vZGVIb29rID0gdm5vZGUucHJvcHMgJiYgdm5vZGUucHJvcHMub25Wbm9kZU1vdW50ZWQ7XG4gICAgICAgIGlmICh2bm9kZUhvb2spIHtcbiAgICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBpbnN0YW5jZTIucGFyZW50LCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICBkZXZ0b29sc0NvbXBvbmVudEFkZGVkKGluc3RhbmNlMik7XG4gICAgICB9XG4gICAgfTtcbiAgICBzaGFyZWRDb250ZXh0LmRlYWN0aXZhdGUgPSAodm5vZGUpID0+IHtcbiAgICAgIGNvbnN0IGluc3RhbmNlMiA9IHZub2RlLmNvbXBvbmVudDtcbiAgICAgIGludmFsaWRhdGVNb3VudChpbnN0YW5jZTIubSk7XG4gICAgICBpbnZhbGlkYXRlTW91bnQoaW5zdGFuY2UyLmEpO1xuICAgICAgbW92ZSh2bm9kZSwgc3RvcmFnZUNvbnRhaW5lciwgbnVsbCwgMSwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGluc3RhbmNlMi5kYSkge1xuICAgICAgICAgIGludm9rZUFycmF5Rm5zKGluc3RhbmNlMi5kYSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgdm5vZGVIb29rID0gdm5vZGUucHJvcHMgJiYgdm5vZGUucHJvcHMub25Wbm9kZVVubW91bnRlZDtcbiAgICAgICAgaWYgKHZub2RlSG9vaykge1xuICAgICAgICAgIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIGluc3RhbmNlMi5wYXJlbnQsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZTIuaXNEZWFjdGl2YXRlZCA9IHRydWU7XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgZGV2dG9vbHNDb21wb25lbnRBZGRlZChpbnN0YW5jZTIpO1xuICAgICAgfVxuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgdHJ1ZSkge1xuICAgICAgICBpbnN0YW5jZTIuX19rZWVwQWxpdmVTdG9yYWdlQ29udGFpbmVyID0gc3RvcmFnZUNvbnRhaW5lcjtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIHVubW91bnQodm5vZGUpIHtcbiAgICAgIHJlc2V0U2hhcGVGbGFnKHZub2RlKTtcbiAgICAgIF91bm1vdW50KHZub2RlLCBpbnN0YW5jZSwgcGFyZW50U3VzcGVuc2UsIHRydWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcnVuZUNhY2hlKGZpbHRlcikge1xuICAgICAgY2FjaGUuZm9yRWFjaCgodm5vZGUsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZSh2bm9kZS50eXBlKTtcbiAgICAgICAgaWYgKG5hbWUgJiYgIWZpbHRlcihuYW1lKSkge1xuICAgICAgICAgIHBydW5lQ2FjaGVFbnRyeShrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJ1bmVDYWNoZUVudHJ5KGtleSkge1xuICAgICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KGtleSk7XG4gICAgICBpZiAoY2FjaGVkICYmICghY3VycmVudCB8fCAhaXNTYW1lVk5vZGVUeXBlKGNhY2hlZCwgY3VycmVudCkpKSB7XG4gICAgICAgIHVubW91bnQoY2FjaGVkKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudCkge1xuICAgICAgICByZXNldFNoYXBlRmxhZyhjdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGNhY2hlLmRlbGV0ZShrZXkpO1xuICAgICAga2V5cy5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBbcHJvcHMuaW5jbHVkZSwgcHJvcHMuZXhjbHVkZV0sXG4gICAgICAoW2luY2x1ZGUsIGV4Y2x1ZGVdKSA9PiB7XG4gICAgICAgIGluY2x1ZGUgJiYgcHJ1bmVDYWNoZSgobmFtZSkgPT4gbWF0Y2hlcyhpbmNsdWRlLCBuYW1lKSk7XG4gICAgICAgIGV4Y2x1ZGUgJiYgcHJ1bmVDYWNoZSgobmFtZSkgPT4gIW1hdGNoZXMoZXhjbHVkZSwgbmFtZSkpO1xuICAgICAgfSxcbiAgICAgIC8vIHBydW5lIHBvc3QtcmVuZGVyIGFmdGVyIGBjdXJyZW50YCBoYXMgYmVlbiB1cGRhdGVkXG4gICAgICB7IGZsdXNoOiBcInBvc3RcIiwgZGVlcDogdHJ1ZSB9XG4gICAgKTtcbiAgICBsZXQgcGVuZGluZ0NhY2hlS2V5ID0gbnVsbDtcbiAgICBjb25zdCBjYWNoZVN1YnRyZWUgPSAoKSA9PiB7XG4gICAgICBpZiAocGVuZGluZ0NhY2hlS2V5ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzU3VzcGVuc2UoaW5zdGFuY2Uuc3ViVHJlZS50eXBlKSkge1xuICAgICAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBjYWNoZS5zZXQocGVuZGluZ0NhY2hlS2V5LCBnZXRJbm5lckNoaWxkKGluc3RhbmNlLnN1YlRyZWUpKTtcbiAgICAgICAgICB9LCBpbnN0YW5jZS5zdWJUcmVlLnN1c3BlbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWNoZS5zZXQocGVuZGluZ0NhY2hlS2V5LCBnZXRJbm5lckNoaWxkKGluc3RhbmNlLnN1YlRyZWUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgb25Nb3VudGVkKGNhY2hlU3VidHJlZSk7XG4gICAgb25VcGRhdGVkKGNhY2hlU3VidHJlZSk7XG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGNhY2hlLmZvckVhY2goKGNhY2hlZCkgPT4ge1xuICAgICAgICBjb25zdCB7IHN1YlRyZWUsIHN1c3BlbnNlIH0gPSBpbnN0YW5jZTtcbiAgICAgICAgY29uc3Qgdm5vZGUgPSBnZXRJbm5lckNoaWxkKHN1YlRyZWUpO1xuICAgICAgICBpZiAoY2FjaGVkLnR5cGUgPT09IHZub2RlLnR5cGUgJiYgY2FjaGVkLmtleSA9PT0gdm5vZGUua2V5KSB7XG4gICAgICAgICAgcmVzZXRTaGFwZUZsYWcodm5vZGUpO1xuICAgICAgICAgIGNvbnN0IGRhID0gdm5vZGUuY29tcG9uZW50LmRhO1xuICAgICAgICAgIGRhICYmIHF1ZXVlUG9zdFJlbmRlckVmZmVjdChkYSwgc3VzcGVuc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB1bm1vdW50KGNhY2hlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcGVuZGluZ0NhY2hlS2V5ID0gbnVsbDtcbiAgICAgIGlmICghc2xvdHMuZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHNsb3RzLmRlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHJhd1ZOb2RlID0gY2hpbGRyZW5bMF07XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShgS2VlcEFsaXZlIHNob3VsZCBjb250YWluIGV4YWN0bHkgb25lIGNvbXBvbmVudCBjaGlsZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgICAgfSBlbHNlIGlmICghaXNWTm9kZShyYXdWTm9kZSkgfHwgIShyYXdWTm9kZS5zaGFwZUZsYWcgJiA0KSAmJiAhKHJhd1ZOb2RlLnNoYXBlRmxhZyAmIDEyOCkpIHtcbiAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiByYXdWTm9kZTtcbiAgICAgIH1cbiAgICAgIGxldCB2bm9kZSA9IGdldElubmVyQ2hpbGQocmF3Vk5vZGUpO1xuICAgICAgaWYgKHZub2RlLnR5cGUgPT09IENvbW1lbnQpIHtcbiAgICAgICAgY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXAgPSB2bm9kZS50eXBlO1xuICAgICAgY29uc3QgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoXG4gICAgICAgIGlzQXN5bmNXcmFwcGVyKHZub2RlKSA/IHZub2RlLnR5cGUuX19hc3luY1Jlc29sdmVkIHx8IHt9IDogY29tcFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHsgaW5jbHVkZSwgZXhjbHVkZSwgbWF4IH0gPSBwcm9wcztcbiAgICAgIGlmIChpbmNsdWRlICYmICghbmFtZSB8fCAhbWF0Y2hlcyhpbmNsdWRlLCBuYW1lKSkgfHwgZXhjbHVkZSAmJiBuYW1lICYmIG1hdGNoZXMoZXhjbHVkZSwgbmFtZSkpIHtcbiAgICAgICAgdm5vZGUuc2hhcGVGbGFnICY9IC0yNTc7XG4gICAgICAgIGN1cnJlbnQgPSB2bm9kZTtcbiAgICAgICAgcmV0dXJuIHJhd1ZOb2RlO1xuICAgICAgfVxuICAgICAgY29uc3Qga2V5ID0gdm5vZGUua2V5ID09IG51bGwgPyBjb21wIDogdm5vZGUua2V5O1xuICAgICAgY29uc3QgY2FjaGVkVk5vZGUgPSBjYWNoZS5nZXQoa2V5KTtcbiAgICAgIGlmICh2bm9kZS5lbCkge1xuICAgICAgICB2bm9kZSA9IGNsb25lVk5vZGUodm5vZGUpO1xuICAgICAgICBpZiAocmF3Vk5vZGUuc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICAgICAgcmF3Vk5vZGUuc3NDb250ZW50ID0gdm5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBlbmRpbmdDYWNoZUtleSA9IGtleTtcbiAgICAgIGlmIChjYWNoZWRWTm9kZSkge1xuICAgICAgICB2bm9kZS5lbCA9IGNhY2hlZFZOb2RlLmVsO1xuICAgICAgICB2bm9kZS5jb21wb25lbnQgPSBjYWNoZWRWTm9kZS5jb21wb25lbnQ7XG4gICAgICAgIGlmICh2bm9kZS50cmFuc2l0aW9uKSB7XG4gICAgICAgICAgc2V0VHJhbnNpdGlvbkhvb2tzKHZub2RlLCB2bm9kZS50cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB2bm9kZS5zaGFwZUZsYWcgfD0gNTEyO1xuICAgICAgICBrZXlzLmRlbGV0ZShrZXkpO1xuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAga2V5cy5hZGQoa2V5KTtcbiAgICAgICAgaWYgKG1heCAmJiBrZXlzLnNpemUgPiBwYXJzZUludChtYXgsIDEwKSkge1xuICAgICAgICAgIHBydW5lQ2FjaGVFbnRyeShrZXlzLnZhbHVlcygpLm5leHQoKS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZub2RlLnNoYXBlRmxhZyB8PSAyNTY7XG4gICAgICBjdXJyZW50ID0gdm5vZGU7XG4gICAgICByZXR1cm4gaXNTdXNwZW5zZShyYXdWTm9kZS50eXBlKSA/IHJhd1ZOb2RlIDogdm5vZGU7XG4gICAgfTtcbiAgfVxufTtcbmNvbnN0IEtlZXBBbGl2ZSA9IEtlZXBBbGl2ZUltcGw7XG5mdW5jdGlvbiBtYXRjaGVzKHBhdHRlcm4sIG5hbWUpIHtcbiAgaWYgKGlzQXJyYXkocGF0dGVybikpIHtcbiAgICByZXR1cm4gcGF0dGVybi5zb21lKChwKSA9PiBtYXRjaGVzKHAsIG5hbWUpKTtcbiAgfSBlbHNlIGlmIChpc1N0cmluZyhwYXR0ZXJuKSkge1xuICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KFwiLFwiKS5pbmNsdWRlcyhuYW1lKTtcbiAgfSBlbHNlIGlmIChpc1JlZ0V4cChwYXR0ZXJuKSkge1xuICAgIHBhdHRlcm4ubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KG5hbWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIG9uQWN0aXZhdGVkKGhvb2ssIHRhcmdldCkge1xuICByZWdpc3RlcktlZXBBbGl2ZUhvb2soaG9vaywgXCJhXCIsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBvbkRlYWN0aXZhdGVkKGhvb2ssIHRhcmdldCkge1xuICByZWdpc3RlcktlZXBBbGl2ZUhvb2soaG9vaywgXCJkYVwiLCB0YXJnZXQpO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJLZWVwQWxpdmVIb29rKGhvb2ssIHR5cGUsIHRhcmdldCA9IGN1cnJlbnRJbnN0YW5jZSkge1xuICBjb25zdCB3cmFwcGVkSG9vayA9IGhvb2suX193ZGMgfHwgKGhvb2suX193ZGMgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJlbnQgPSB0YXJnZXQ7XG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgIGlmIChjdXJyZW50LmlzRGVhY3RpdmF0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gaG9vaygpO1xuICB9KTtcbiAgaW5qZWN0SG9vayh0eXBlLCB3cmFwcGVkSG9vaywgdGFyZ2V0KTtcbiAgaWYgKHRhcmdldCkge1xuICAgIGxldCBjdXJyZW50ID0gdGFyZ2V0LnBhcmVudDtcbiAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50LnBhcmVudCkge1xuICAgICAgaWYgKGlzS2VlcEFsaXZlKGN1cnJlbnQucGFyZW50LnZub2RlKSkge1xuICAgICAgICBpbmplY3RUb0tlZXBBbGl2ZVJvb3Qod3JhcHBlZEhvb2ssIHR5cGUsIHRhcmdldCwgY3VycmVudCk7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBpbmplY3RUb0tlZXBBbGl2ZVJvb3QoaG9vaywgdHlwZSwgdGFyZ2V0LCBrZWVwQWxpdmVSb290KSB7XG4gIGNvbnN0IGluamVjdGVkID0gaW5qZWN0SG9vayhcbiAgICB0eXBlLFxuICAgIGhvb2ssXG4gICAga2VlcEFsaXZlUm9vdCxcbiAgICB0cnVlXG4gICAgLyogcHJlcGVuZCAqL1xuICApO1xuICBvblVubW91bnRlZCgoKSA9PiB7XG4gICAgcmVtb3ZlKGtlZXBBbGl2ZVJvb3RbdHlwZV0sIGluamVjdGVkKTtcbiAgfSwgdGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIHJlc2V0U2hhcGVGbGFnKHZub2RlKSB7XG4gIHZub2RlLnNoYXBlRmxhZyAmPSAtMjU3O1xuICB2bm9kZS5zaGFwZUZsYWcgJj0gLTUxMztcbn1cbmZ1bmN0aW9uIGdldElubmVyQ2hpbGQodm5vZGUpIHtcbiAgcmV0dXJuIHZub2RlLnNoYXBlRmxhZyAmIDEyOCA/IHZub2RlLnNzQ29udGVudCA6IHZub2RlO1xufVxuXG5mdW5jdGlvbiBpbmplY3RIb29rKHR5cGUsIGhvb2ssIHRhcmdldCA9IGN1cnJlbnRJbnN0YW5jZSwgcHJlcGVuZCA9IGZhbHNlKSB7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBjb25zdCBob29rcyA9IHRhcmdldFt0eXBlXSB8fCAodGFyZ2V0W3R5cGVdID0gW10pO1xuICAgIGNvbnN0IHdyYXBwZWRIb29rID0gaG9vay5fX3dlaCB8fCAoaG9vay5fX3dlaCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgICBjb25zdCByZXNldCA9IHNldEN1cnJlbnRJbnN0YW5jZSh0YXJnZXQpO1xuICAgICAgY29uc3QgcmVzID0gY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoaG9vaywgdGFyZ2V0LCB0eXBlLCBhcmdzKTtcbiAgICAgIHJlc2V0KCk7XG4gICAgICByZXNldFRyYWNraW5nKCk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICBob29rcy51bnNoaWZ0KHdyYXBwZWRIb29rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaG9va3MucHVzaCh3cmFwcGVkSG9vayk7XG4gICAgfVxuICAgIHJldHVybiB3cmFwcGVkSG9vaztcbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc3QgYXBpTmFtZSA9IHRvSGFuZGxlcktleShFcnJvclR5cGVTdHJpbmdzJDFbdHlwZV0ucmVwbGFjZSgvIGhvb2skLywgXCJcIikpO1xuICAgIHdhcm4kMShcbiAgICAgIGAke2FwaU5hbWV9IGlzIGNhbGxlZCB3aGVuIHRoZXJlIGlzIG5vIGFjdGl2ZSBjb21wb25lbnQgaW5zdGFuY2UgdG8gYmUgYXNzb2NpYXRlZCB3aXRoLiBMaWZlY3ljbGUgaW5qZWN0aW9uIEFQSXMgY2FuIG9ubHkgYmUgdXNlZCBkdXJpbmcgZXhlY3V0aW9uIG9mIHNldHVwKCkuYCArIChgIElmIHlvdSBhcmUgdXNpbmcgYXN5bmMgc2V0dXAoKSwgbWFrZSBzdXJlIHRvIHJlZ2lzdGVyIGxpZmVjeWNsZSBob29rcyBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0IHN0YXRlbWVudC5gIClcbiAgICApO1xuICB9XG59XG5jb25zdCBjcmVhdGVIb29rID0gKGxpZmVjeWNsZSkgPT4gKGhvb2ssIHRhcmdldCA9IGN1cnJlbnRJbnN0YW5jZSkgPT4ge1xuICBpZiAoIWlzSW5TU1JDb21wb25lbnRTZXR1cCB8fCBsaWZlY3ljbGUgPT09IFwic3BcIikge1xuICAgIGluamVjdEhvb2sobGlmZWN5Y2xlLCAoLi4uYXJncykgPT4gaG9vayguLi5hcmdzKSwgdGFyZ2V0KTtcbiAgfVxufTtcbmNvbnN0IG9uQmVmb3JlTW91bnQgPSBjcmVhdGVIb29rKFwiYm1cIik7XG5jb25zdCBvbk1vdW50ZWQgPSBjcmVhdGVIb29rKFwibVwiKTtcbmNvbnN0IG9uQmVmb3JlVXBkYXRlID0gY3JlYXRlSG9vayhcbiAgXCJidVwiXG4pO1xuY29uc3Qgb25VcGRhdGVkID0gY3JlYXRlSG9vayhcInVcIik7XG5jb25zdCBvbkJlZm9yZVVubW91bnQgPSBjcmVhdGVIb29rKFxuICBcImJ1bVwiXG4pO1xuY29uc3Qgb25Vbm1vdW50ZWQgPSBjcmVhdGVIb29rKFwidW1cIik7XG5jb25zdCBvblNlcnZlclByZWZldGNoID0gY3JlYXRlSG9vayhcbiAgXCJzcFwiXG4pO1xuY29uc3Qgb25SZW5kZXJUcmlnZ2VyZWQgPSBjcmVhdGVIb29rKFwicnRnXCIpO1xuY29uc3Qgb25SZW5kZXJUcmFja2VkID0gY3JlYXRlSG9vayhcInJ0Y1wiKTtcbmZ1bmN0aW9uIG9uRXJyb3JDYXB0dXJlZChob29rLCB0YXJnZXQgPSBjdXJyZW50SW5zdGFuY2UpIHtcbiAgaW5qZWN0SG9vayhcImVjXCIsIGhvb2ssIHRhcmdldCk7XG59XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBcImNvbXBvbmVudHNcIjtcbmNvbnN0IERJUkVDVElWRVMgPSBcImRpcmVjdGl2ZXNcIjtcbmZ1bmN0aW9uIHJlc29sdmVDb21wb25lbnQobmFtZSwgbWF5YmVTZWxmUmVmZXJlbmNlKSB7XG4gIHJldHVybiByZXNvbHZlQXNzZXQoQ09NUE9ORU5UUywgbmFtZSwgdHJ1ZSwgbWF5YmVTZWxmUmVmZXJlbmNlKSB8fCBuYW1lO1xufVxuY29uc3QgTlVMTF9EWU5BTUlDX0NPTVBPTkVOVCA9IFN5bWJvbC5mb3IoXCJ2LW5kY1wiKTtcbmZ1bmN0aW9uIHJlc29sdmVEeW5hbWljQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICBpZiAoaXNTdHJpbmcoY29tcG9uZW50KSkge1xuICAgIHJldHVybiByZXNvbHZlQXNzZXQoQ09NUE9ORU5UUywgY29tcG9uZW50LCBmYWxzZSkgfHwgY29tcG9uZW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21wb25lbnQgfHwgTlVMTF9EWU5BTUlDX0NPTVBPTkVOVDtcbiAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZURpcmVjdGl2ZShuYW1lKSB7XG4gIHJldHVybiByZXNvbHZlQXNzZXQoRElSRUNUSVZFUywgbmFtZSk7XG59XG5mdW5jdGlvbiByZXNvbHZlQXNzZXQodHlwZSwgbmFtZSwgd2Fybk1pc3NpbmcgPSB0cnVlLCBtYXliZVNlbGZSZWZlcmVuY2UgPSBmYWxzZSkge1xuICBjb25zdCBpbnN0YW5jZSA9IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSB8fCBjdXJyZW50SW5zdGFuY2U7XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIGNvbnN0IENvbXBvbmVudCA9IGluc3RhbmNlLnR5cGU7XG4gICAgaWYgKHR5cGUgPT09IENPTVBPTkVOVFMpIHtcbiAgICAgIGNvbnN0IHNlbGZOYW1lID0gZ2V0Q29tcG9uZW50TmFtZShcbiAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICAgIGlmIChzZWxmTmFtZSAmJiAoc2VsZk5hbWUgPT09IG5hbWUgfHwgc2VsZk5hbWUgPT09IGNhbWVsaXplKG5hbWUpIHx8IHNlbGZOYW1lID09PSBjYXBpdGFsaXplKGNhbWVsaXplKG5hbWUpKSkpIHtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzID0gKFxuICAgICAgLy8gbG9jYWwgcmVnaXN0cmF0aW9uXG4gICAgICAvLyBjaGVjayBpbnN0YW5jZVt0eXBlXSBmaXJzdCB3aGljaCBpcyByZXNvbHZlZCBmb3Igb3B0aW9ucyBBUElcbiAgICAgIHJlc29sdmUoaW5zdGFuY2VbdHlwZV0gfHwgQ29tcG9uZW50W3R5cGVdLCBuYW1lKSB8fCAvLyBnbG9iYWwgcmVnaXN0cmF0aW9uXG4gICAgICByZXNvbHZlKGluc3RhbmNlLmFwcENvbnRleHRbdHlwZV0sIG5hbWUpXG4gICAgKTtcbiAgICBpZiAoIXJlcyAmJiBtYXliZVNlbGZSZWZlcmVuY2UpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnQ7XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm5NaXNzaW5nICYmICFyZXMpIHtcbiAgICAgIGNvbnN0IGV4dHJhID0gdHlwZSA9PT0gQ09NUE9ORU5UUyA/IGBcbklmIHRoaXMgaXMgYSBuYXRpdmUgY3VzdG9tIGVsZW1lbnQsIG1ha2Ugc3VyZSB0byBleGNsdWRlIGl0IGZyb20gY29tcG9uZW50IHJlc29sdXRpb24gdmlhIGNvbXBpbGVyT3B0aW9ucy5pc0N1c3RvbUVsZW1lbnQuYCA6IGBgO1xuICAgICAgd2FybiQxKGBGYWlsZWQgdG8gcmVzb2x2ZSAke3R5cGUuc2xpY2UoMCwgLTEpfTogJHtuYW1lfSR7ZXh0cmF9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm4kMShcbiAgICAgIGByZXNvbHZlJHtjYXBpdGFsaXplKHR5cGUuc2xpY2UoMCwgLTEpKX0gY2FuIG9ubHkgYmUgdXNlZCBpbiByZW5kZXIoKSBvciBzZXR1cCgpLmBcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiByZXNvbHZlKHJlZ2lzdHJ5LCBuYW1lKSB7XG4gIHJldHVybiByZWdpc3RyeSAmJiAocmVnaXN0cnlbbmFtZV0gfHwgcmVnaXN0cnlbY2FtZWxpemUobmFtZSldIHx8IHJlZ2lzdHJ5W2NhcGl0YWxpemUoY2FtZWxpemUobmFtZSkpXSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3Qoc291cmNlLCByZW5kZXJJdGVtLCBjYWNoZSwgaW5kZXgpIHtcbiAgbGV0IHJldDtcbiAgY29uc3QgY2FjaGVkID0gY2FjaGUgJiYgY2FjaGVbaW5kZXhdO1xuICBjb25zdCBzb3VyY2VJc0FycmF5ID0gaXNBcnJheShzb3VyY2UpO1xuICBpZiAoc291cmNlSXNBcnJheSB8fCBpc1N0cmluZyhzb3VyY2UpKSB7XG4gICAgY29uc3Qgc291cmNlSXNSZWFjdGl2ZUFycmF5ID0gc291cmNlSXNBcnJheSAmJiBpc1JlYWN0aXZlKHNvdXJjZSk7XG4gICAgbGV0IG5lZWRzV3JhcCA9IGZhbHNlO1xuICAgIGxldCBpc1JlYWRvbmx5U291cmNlID0gZmFsc2U7XG4gICAgaWYgKHNvdXJjZUlzUmVhY3RpdmVBcnJheSkge1xuICAgICAgbmVlZHNXcmFwID0gIWlzU2hhbGxvdyhzb3VyY2UpO1xuICAgICAgaXNSZWFkb25seVNvdXJjZSA9IGlzUmVhZG9ubHkoc291cmNlKTtcbiAgICAgIHNvdXJjZSA9IHNoYWxsb3dSZWFkQXJyYXkoc291cmNlKTtcbiAgICB9XG4gICAgcmV0ID0gbmV3IEFycmF5KHNvdXJjZS5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gc291cmNlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVySXRlbShcbiAgICAgICAgbmVlZHNXcmFwID8gaXNSZWFkb25seVNvdXJjZSA/IHRvUmVhZG9ubHkodG9SZWFjdGl2ZShzb3VyY2VbaV0pKSA6IHRvUmVhY3RpdmUoc291cmNlW2ldKSA6IHNvdXJjZVtpXSxcbiAgICAgICAgaSxcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBjYWNoZWQgJiYgY2FjaGVkW2ldXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIU51bWJlci5pc0ludGVnZXIoc291cmNlKSkge1xuICAgICAgd2FybiQxKGBUaGUgdi1mb3IgcmFuZ2UgZXhwZWN0IGFuIGludGVnZXIgdmFsdWUgYnV0IGdvdCAke3NvdXJjZX0uYCk7XG4gICAgfVxuICAgIHJldCA9IG5ldyBBcnJheShzb3VyY2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlckl0ZW0oaSArIDEsIGksIHZvaWQgMCwgY2FjaGVkICYmIGNhY2hlZFtpXSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICBpZiAoc291cmNlW1N5bWJvbC5pdGVyYXRvcl0pIHtcbiAgICAgIHJldCA9IEFycmF5LmZyb20oXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgKGl0ZW0sIGkpID0+IHJlbmRlckl0ZW0oaXRlbSwgaSwgdm9pZCAwLCBjYWNoZWQgJiYgY2FjaGVkW2ldKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgICByZXQgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICByZXRbaV0gPSByZW5kZXJJdGVtKHNvdXJjZVtrZXldLCBrZXksIGksIGNhY2hlZCAmJiBjYWNoZWRbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXQgPSBbXTtcbiAgfVxuICBpZiAoY2FjaGUpIHtcbiAgICBjYWNoZVtpbmRleF0gPSByZXQ7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2xvdHMoc2xvdHMsIGR5bmFtaWNTbG90cykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGR5bmFtaWNTbG90cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNsb3QgPSBkeW5hbWljU2xvdHNbaV07XG4gICAgaWYgKGlzQXJyYXkoc2xvdCkpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2xvdC5sZW5ndGg7IGorKykge1xuICAgICAgICBzbG90c1tzbG90W2pdLm5hbWVdID0gc2xvdFtqXS5mbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNsb3QpIHtcbiAgICAgIHNsb3RzW3Nsb3QubmFtZV0gPSBzbG90LmtleSA/ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHNsb3QuZm4oLi4uYXJncyk7XG4gICAgICAgIGlmIChyZXMpIHJlcy5rZXkgPSBzbG90LmtleTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gOiBzbG90LmZuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2xvdHM7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNsb3Qoc2xvdHMsIG5hbWUsIHByb3BzID0ge30sIGZhbGxiYWNrLCBub1Nsb3R0ZWQpIHtcbiAgaWYgKGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZS5jZSB8fCBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UucGFyZW50ICYmIGlzQXN5bmNXcmFwcGVyKGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZS5wYXJlbnQpICYmIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZS5wYXJlbnQuY2UpIHtcbiAgICBpZiAobmFtZSAhPT0gXCJkZWZhdWx0XCIpIHByb3BzLm5hbWUgPSBuYW1lO1xuICAgIHJldHVybiBvcGVuQmxvY2soKSwgY3JlYXRlQmxvY2soXG4gICAgICBGcmFnbWVudCxcbiAgICAgIG51bGwsXG4gICAgICBbY3JlYXRlVk5vZGUoXCJzbG90XCIsIHByb3BzLCBmYWxsYmFjayAmJiBmYWxsYmFjaygpKV0sXG4gICAgICA2NFxuICAgICk7XG4gIH1cbiAgbGV0IHNsb3QgPSBzbG90c1tuYW1lXTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgc2xvdCAmJiBzbG90Lmxlbmd0aCA+IDEpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgU1NSLW9wdGltaXplZCBzbG90IGZ1bmN0aW9uIGRldGVjdGVkIGluIGEgbm9uLVNTUi1vcHRpbWl6ZWQgcmVuZGVyIGZ1bmN0aW9uLiBZb3UgbmVlZCB0byBtYXJrIHRoaXMgY29tcG9uZW50IHdpdGggJGR5bmFtaWMtc2xvdHMgaW4gdGhlIHBhcmVudCB0ZW1wbGF0ZS5gXG4gICAgKTtcbiAgICBzbG90ID0gKCkgPT4gW107XG4gIH1cbiAgaWYgKHNsb3QgJiYgc2xvdC5fYykge1xuICAgIHNsb3QuX2QgPSBmYWxzZTtcbiAgfVxuICBvcGVuQmxvY2soKTtcbiAgY29uc3QgdmFsaWRTbG90Q29udGVudCA9IHNsb3QgJiYgZW5zdXJlVmFsaWRWTm9kZShzbG90KHByb3BzKSk7XG4gIGNvbnN0IHNsb3RLZXkgPSBwcm9wcy5rZXkgfHwgLy8gc2xvdCBjb250ZW50IGFycmF5IG9mIGEgZHluYW1pYyBjb25kaXRpb25hbCBzbG90IG1heSBoYXZlIGEgYnJhbmNoXG4gIC8vIGtleSBhdHRhY2hlZCBpbiB0aGUgYGNyZWF0ZVNsb3RzYCBoZWxwZXIsIHJlc3BlY3QgdGhhdFxuICB2YWxpZFNsb3RDb250ZW50ICYmIHZhbGlkU2xvdENvbnRlbnQua2V5O1xuICBjb25zdCByZW5kZXJlZCA9IGNyZWF0ZUJsb2NrKFxuICAgIEZyYWdtZW50LFxuICAgIHtcbiAgICAgIGtleTogKHNsb3RLZXkgJiYgIWlzU3ltYm9sKHNsb3RLZXkpID8gc2xvdEtleSA6IGBfJHtuYW1lfWApICsgLy8gIzcyNTYgZm9yY2UgZGlmZmVyZW50aWF0ZSBmYWxsYmFjayBjb250ZW50IGZyb20gYWN0dWFsIGNvbnRlbnRcbiAgICAgICghdmFsaWRTbG90Q29udGVudCAmJiBmYWxsYmFjayA/IFwiX2ZiXCIgOiBcIlwiKVxuICAgIH0sXG4gICAgdmFsaWRTbG90Q29udGVudCB8fCAoZmFsbGJhY2sgPyBmYWxsYmFjaygpIDogW10pLFxuICAgIHZhbGlkU2xvdENvbnRlbnQgJiYgc2xvdHMuXyA9PT0gMSA/IDY0IDogLTJcbiAgKTtcbiAgaWYgKCFub1Nsb3R0ZWQgJiYgcmVuZGVyZWQuc2NvcGVJZCkge1xuICAgIHJlbmRlcmVkLnNsb3RTY29wZUlkcyA9IFtyZW5kZXJlZC5zY29wZUlkICsgXCItc1wiXTtcbiAgfVxuICBpZiAoc2xvdCAmJiBzbG90Ll9jKSB7XG4gICAgc2xvdC5fZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlbmRlcmVkO1xufVxuZnVuY3Rpb24gZW5zdXJlVmFsaWRWTm9kZSh2bm9kZXMpIHtcbiAgcmV0dXJuIHZub2Rlcy5zb21lKChjaGlsZCkgPT4ge1xuICAgIGlmICghaXNWTm9kZShjaGlsZCkpIHJldHVybiB0cnVlO1xuICAgIGlmIChjaGlsZC50eXBlID09PSBDb21tZW50KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGNoaWxkLnR5cGUgPT09IEZyYWdtZW50ICYmICFlbnN1cmVWYWxpZFZOb2RlKGNoaWxkLmNoaWxkcmVuKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSkgPyB2bm9kZXMgOiBudWxsO1xufVxuXG5mdW5jdGlvbiB0b0hhbmRsZXJzKG9iaiwgcHJlc2VydmVDYXNlSWZOZWNlc3NhcnkpIHtcbiAgY29uc3QgcmV0ID0ge307XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFpc09iamVjdChvYmopKSB7XG4gICAgd2FybiQxKGB2LW9uIHdpdGggbm8gYXJndW1lbnQgZXhwZWN0cyBhbiBvYmplY3QgdmFsdWUuYCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICByZXRbcHJlc2VydmVDYXNlSWZOZWNlc3NhcnkgJiYgL1tBLVpdLy50ZXN0KGtleSkgPyBgb246JHtrZXl9YCA6IHRvSGFuZGxlcktleShrZXkpXSA9IG9ialtrZXldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmNvbnN0IGdldFB1YmxpY0luc3RhbmNlID0gKGkpID0+IHtcbiAgaWYgKCFpKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzU3RhdGVmdWxDb21wb25lbnQoaSkpIHJldHVybiBnZXRDb21wb25lbnRQdWJsaWNJbnN0YW5jZShpKTtcbiAgcmV0dXJuIGdldFB1YmxpY0luc3RhbmNlKGkucGFyZW50KTtcbn07XG5jb25zdCBwdWJsaWNQcm9wZXJ0aWVzTWFwID0gKFxuICAvLyBNb3ZlIFBVUkUgbWFya2VyIHRvIG5ldyBsaW5lIHRvIHdvcmthcm91bmQgY29tcGlsZXIgZGlzY2FyZGluZyBpdFxuICAvLyBkdWUgdG8gdHlwZSBhbm5vdGF0aW9uXG4gIC8qIEBfX1BVUkVfXyAqLyBleHRlbmQoLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCksIHtcbiAgICAkOiAoaSkgPT4gaSxcbiAgICAkZWw6IChpKSA9PiBpLnZub2RlLmVsLFxuICAgICRkYXRhOiAoaSkgPT4gaS5kYXRhLFxuICAgICRwcm9wczogKGkpID0+ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzaGFsbG93UmVhZG9ubHkoaS5wcm9wcykgOiBpLnByb3BzLFxuICAgICRhdHRyczogKGkpID0+ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzaGFsbG93UmVhZG9ubHkoaS5hdHRycykgOiBpLmF0dHJzLFxuICAgICRzbG90czogKGkpID0+ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzaGFsbG93UmVhZG9ubHkoaS5zbG90cykgOiBpLnNsb3RzLFxuICAgICRyZWZzOiAoaSkgPT4gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNoYWxsb3dSZWFkb25seShpLnJlZnMpIDogaS5yZWZzLFxuICAgICRwYXJlbnQ6IChpKSA9PiBnZXRQdWJsaWNJbnN0YW5jZShpLnBhcmVudCksXG4gICAgJHJvb3Q6IChpKSA9PiBnZXRQdWJsaWNJbnN0YW5jZShpLnJvb3QpLFxuICAgICRob3N0OiAoaSkgPT4gaS5jZSxcbiAgICAkZW1pdDogKGkpID0+IGkuZW1pdCxcbiAgICAkb3B0aW9uczogKGkpID0+IF9fVlVFX09QVElPTlNfQVBJX18gPyByZXNvbHZlTWVyZ2VkT3B0aW9ucyhpKSA6IGkudHlwZSxcbiAgICAkZm9yY2VVcGRhdGU6IChpKSA9PiBpLmYgfHwgKGkuZiA9ICgpID0+IHtcbiAgICAgIHF1ZXVlSm9iKGkudXBkYXRlKTtcbiAgICB9KSxcbiAgICAkbmV4dFRpY2s6IChpKSA9PiBpLm4gfHwgKGkubiA9IG5leHRUaWNrLmJpbmQoaS5wcm94eSkpLFxuICAgICR3YXRjaDogKGkpID0+IF9fVlVFX09QVElPTlNfQVBJX18gPyBpbnN0YW5jZVdhdGNoLmJpbmQoaSkgOiBOT09QXG4gIH0pXG4pO1xuY29uc3QgaXNSZXNlcnZlZFByZWZpeCA9IChrZXkpID0+IGtleSA9PT0gXCJfXCIgfHwga2V5ID09PSBcIiRcIjtcbmNvbnN0IGhhc1NldHVwQmluZGluZyA9IChzdGF0ZSwga2V5KSA9PiBzdGF0ZSAhPT0gRU1QVFlfT0JKICYmICFzdGF0ZS5fX2lzU2NyaXB0U2V0dXAgJiYgaGFzT3duKHN0YXRlLCBrZXkpO1xuY29uc3QgUHVibGljSW5zdGFuY2VQcm94eUhhbmRsZXJzID0ge1xuICBnZXQoeyBfOiBpbnN0YW5jZSB9LCBrZXkpIHtcbiAgICBpZiAoa2V5ID09PSBcIl9fdl9za2lwXCIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCB7IGN0eCwgc2V0dXBTdGF0ZSwgZGF0YSwgcHJvcHMsIGFjY2Vzc0NhY2hlLCB0eXBlLCBhcHBDb250ZXh0IH0gPSBpbnN0YW5jZTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBrZXkgPT09IFwiX19pc1Z1ZVwiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG5vcm1hbGl6ZWRQcm9wcztcbiAgICBpZiAoa2V5WzBdICE9PSBcIiRcIikge1xuICAgICAgY29uc3QgbiA9IGFjY2Vzc0NhY2hlW2tleV07XG4gICAgICBpZiAobiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHN3aXRjaCAobikge1xuICAgICAgICAgIGNhc2UgMSAvKiBTRVRVUCAqLzpcbiAgICAgICAgICAgIHJldHVybiBzZXR1cFN0YXRlW2tleV07XG4gICAgICAgICAgY2FzZSAyIC8qIERBVEEgKi86XG4gICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgIGNhc2UgNCAvKiBDT05URVhUICovOlxuICAgICAgICAgICAgcmV0dXJuIGN0eFtrZXldO1xuICAgICAgICAgIGNhc2UgMyAvKiBQUk9QUyAqLzpcbiAgICAgICAgICAgIHJldHVybiBwcm9wc1trZXldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGhhc1NldHVwQmluZGluZyhzZXR1cFN0YXRlLCBrZXkpKSB7XG4gICAgICAgIGFjY2Vzc0NhY2hlW2tleV0gPSAxIC8qIFNFVFVQICovO1xuICAgICAgICByZXR1cm4gc2V0dXBTdGF0ZVtrZXldO1xuICAgICAgfSBlbHNlIGlmIChkYXRhICE9PSBFTVBUWV9PQkogJiYgaGFzT3duKGRhdGEsIGtleSkpIHtcbiAgICAgICAgYWNjZXNzQ2FjaGVba2V5XSA9IDIgLyogREFUQSAqLztcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIC8vIG9ubHkgY2FjaGUgb3RoZXIgcHJvcGVydGllcyB3aGVuIGluc3RhbmNlIGhhcyBkZWNsYXJlZCAodGh1cyBzdGFibGUpXG4gICAgICAgIC8vIHByb3BzXG4gICAgICAgIChub3JtYWxpemVkUHJvcHMgPSBpbnN0YW5jZS5wcm9wc09wdGlvbnNbMF0pICYmIGhhc093bihub3JtYWxpemVkUHJvcHMsIGtleSlcbiAgICAgICkge1xuICAgICAgICBhY2Nlc3NDYWNoZVtrZXldID0gMyAvKiBQUk9QUyAqLztcbiAgICAgICAgcmV0dXJuIHByb3BzW2tleV07XG4gICAgICB9IGVsc2UgaWYgKGN0eCAhPT0gRU1QVFlfT0JKICYmIGhhc093bihjdHgsIGtleSkpIHtcbiAgICAgICAgYWNjZXNzQ2FjaGVba2V5XSA9IDQgLyogQ09OVEVYVCAqLztcbiAgICAgICAgcmV0dXJuIGN0eFtrZXldO1xuICAgICAgfSBlbHNlIGlmICghX19WVUVfT1BUSU9OU19BUElfXyB8fCBzaG91bGRDYWNoZUFjY2Vzcykge1xuICAgICAgICBhY2Nlc3NDYWNoZVtrZXldID0gMCAvKiBPVEhFUiAqLztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHVibGljR2V0dGVyID0gcHVibGljUHJvcGVydGllc01hcFtrZXldO1xuICAgIGxldCBjc3NNb2R1bGUsIGdsb2JhbFByb3BlcnRpZXM7XG4gICAgaWYgKHB1YmxpY0dldHRlcikge1xuICAgICAgaWYgKGtleSA9PT0gXCIkYXR0cnNcIikge1xuICAgICAgICB0cmFjayhpbnN0YW5jZS5hdHRycywgXCJnZXRcIiwgXCJcIik7XG4gICAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgbWFya0F0dHJzQWNjZXNzZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBrZXkgPT09IFwiJHNsb3RzXCIpIHtcbiAgICAgICAgdHJhY2soaW5zdGFuY2UsIFwiZ2V0XCIsIGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHVibGljR2V0dGVyKGluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgLy8gY3NzIG1vZHVsZSAoaW5qZWN0ZWQgYnkgdnVlLWxvYWRlcilcbiAgICAgIChjc3NNb2R1bGUgPSB0eXBlLl9fY3NzTW9kdWxlcykgJiYgKGNzc01vZHVsZSA9IGNzc01vZHVsZVtrZXldKVxuICAgICkge1xuICAgICAgcmV0dXJuIGNzc01vZHVsZTtcbiAgICB9IGVsc2UgaWYgKGN0eCAhPT0gRU1QVFlfT0JKICYmIGhhc093bihjdHgsIGtleSkpIHtcbiAgICAgIGFjY2Vzc0NhY2hlW2tleV0gPSA0IC8qIENPTlRFWFQgKi87XG4gICAgICByZXR1cm4gY3R4W2tleV07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIC8vIGdsb2JhbCBwcm9wZXJ0aWVzXG4gICAgICBnbG9iYWxQcm9wZXJ0aWVzID0gYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcywgaGFzT3duKGdsb2JhbFByb3BlcnRpZXMsIGtleSlcbiAgICApIHtcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbFByb3BlcnRpZXNba2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlICYmICghaXNTdHJpbmcoa2V5KSB8fCAvLyAjMTA5MSBhdm9pZCBpbnRlcm5hbCBpc1JlZi9pc1ZOb2RlIGNoZWNrcyBvbiBjb21wb25lbnQgaW5zdGFuY2UgbGVhZGluZ1xuICAgIC8vIHRvIGluZmluaXRlIHdhcm5pbmcgbG9vcFxuICAgIGtleS5pbmRleE9mKFwiX192XCIpICE9PSAwKSkge1xuICAgICAgaWYgKGRhdGEgIT09IEVNUFRZX09CSiAmJiBpc1Jlc2VydmVkUHJlZml4KGtleVswXSkgJiYgaGFzT3duKGRhdGEsIGtleSkpIHtcbiAgICAgICAgd2FybiQxKFxuICAgICAgICAgIGBQcm9wZXJ0eSAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAga2V5XG4gICAgICAgICAgKX0gbXVzdCBiZSBhY2Nlc3NlZCB2aWEgJGRhdGEgYmVjYXVzZSBpdCBzdGFydHMgd2l0aCBhIHJlc2VydmVkIGNoYXJhY3RlciAoXCIkXCIgb3IgXCJfXCIpIGFuZCBpcyBub3QgcHJveGllZCBvbiB0aGUgcmVuZGVyIGNvbnRleHQuYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZSA9PT0gY3VycmVudFJlbmRlcmluZ0luc3RhbmNlKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgUHJvcGVydHkgJHtKU09OLnN0cmluZ2lmeShrZXkpfSB3YXMgYWNjZXNzZWQgZHVyaW5nIHJlbmRlciBidXQgaXMgbm90IGRlZmluZWQgb24gaW5zdGFuY2UuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2V0KHsgXzogaW5zdGFuY2UgfSwga2V5LCB2YWx1ZSkge1xuICAgIGNvbnN0IHsgZGF0YSwgc2V0dXBTdGF0ZSwgY3R4IH0gPSBpbnN0YW5jZTtcbiAgICBpZiAoaGFzU2V0dXBCaW5kaW5nKHNldHVwU3RhdGUsIGtleSkpIHtcbiAgICAgIHNldHVwU3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNldHVwU3RhdGUuX19pc1NjcmlwdFNldHVwICYmIGhhc093bihzZXR1cFN0YXRlLCBrZXkpKSB7XG4gICAgICB3YXJuJDEoYENhbm5vdCBtdXRhdGUgPHNjcmlwdCBzZXR1cD4gYmluZGluZyBcIiR7a2V5fVwiIGZyb20gT3B0aW9ucyBBUEkuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChkYXRhICE9PSBFTVBUWV9PQkogJiYgaGFzT3duKGRhdGEsIGtleSkpIHtcbiAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChoYXNPd24oaW5zdGFuY2UucHJvcHMsIGtleSkpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGBBdHRlbXB0aW5nIHRvIG11dGF0ZSBwcm9wIFwiJHtrZXl9XCIuIFByb3BzIGFyZSByZWFkb25seS5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGtleVswXSA9PT0gXCIkXCIgJiYga2V5LnNsaWNlKDEpIGluIGluc3RhbmNlKSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShcbiAgICAgICAgYEF0dGVtcHRpbmcgdG8gbXV0YXRlIHB1YmxpYyBwcm9wZXJ0eSBcIiR7a2V5fVwiLiBQcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggJCBhcmUgcmVzZXJ2ZWQgYW5kIHJlYWRvbmx5LmBcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGtleSBpbiBpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIGtleSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGhhcyh7XG4gICAgXzogeyBkYXRhLCBzZXR1cFN0YXRlLCBhY2Nlc3NDYWNoZSwgY3R4LCBhcHBDb250ZXh0LCBwcm9wc09wdGlvbnMsIHR5cGUgfVxuICB9LCBrZXkpIHtcbiAgICBsZXQgbm9ybWFsaXplZFByb3BzLCBjc3NNb2R1bGVzO1xuICAgIHJldHVybiAhIShhY2Nlc3NDYWNoZVtrZXldIHx8IGRhdGEgIT09IEVNUFRZX09CSiAmJiBrZXlbMF0gIT09IFwiJFwiICYmIGhhc093bihkYXRhLCBrZXkpIHx8IGhhc1NldHVwQmluZGluZyhzZXR1cFN0YXRlLCBrZXkpIHx8IChub3JtYWxpemVkUHJvcHMgPSBwcm9wc09wdGlvbnNbMF0pICYmIGhhc093bihub3JtYWxpemVkUHJvcHMsIGtleSkgfHwgaGFzT3duKGN0eCwga2V5KSB8fCBoYXNPd24ocHVibGljUHJvcGVydGllc01hcCwga2V5KSB8fCBoYXNPd24oYXBwQ29udGV4dC5jb25maWcuZ2xvYmFsUHJvcGVydGllcywga2V5KSB8fCAoY3NzTW9kdWxlcyA9IHR5cGUuX19jc3NNb2R1bGVzKSAmJiBjc3NNb2R1bGVzW2tleV0pO1xuICB9LFxuICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgIGlmIChkZXNjcmlwdG9yLmdldCAhPSBudWxsKSB7XG4gICAgICB0YXJnZXQuXy5hY2Nlc3NDYWNoZVtrZXldID0gMDtcbiAgICB9IGVsc2UgaWYgKGhhc093bihkZXNjcmlwdG9yLCBcInZhbHVlXCIpKSB7XG4gICAgICB0aGlzLnNldCh0YXJnZXQsIGtleSwgZGVzY3JpcHRvci52YWx1ZSwgbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufTtcbmlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHRydWUpIHtcbiAgUHVibGljSW5zdGFuY2VQcm94eUhhbmRsZXJzLm93bktleXMgPSAodGFyZ2V0KSA9PiB7XG4gICAgd2FybiQxKFxuICAgICAgYEF2b2lkIGFwcCBsb2dpYyB0aGF0IHJlbGllcyBvbiBlbnVtZXJhdGluZyBrZXlzIG9uIGEgY29tcG9uZW50IGluc3RhbmNlLiBUaGUga2V5cyB3aWxsIGJlIGVtcHR5IGluIHByb2R1Y3Rpb24gbW9kZSB0byBhdm9pZCBwZXJmb3JtYW5jZSBvdmVyaGVhZC5gXG4gICAgKTtcbiAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG4gIH07XG59XG5jb25zdCBSdW50aW1lQ29tcGlsZWRQdWJsaWNJbnN0YW5jZVByb3h5SGFuZGxlcnMgPSAvKiBAX19QVVJFX18gKi8gZXh0ZW5kKHt9LCBQdWJsaWNJbnN0YW5jZVByb3h5SGFuZGxlcnMsIHtcbiAgZ2V0KHRhcmdldCwga2V5KSB7XG4gICAgaWYgKGtleSA9PT0gU3ltYm9sLnVuc2NvcGFibGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBQdWJsaWNJbnN0YW5jZVByb3h5SGFuZGxlcnMuZ2V0KHRhcmdldCwga2V5LCB0YXJnZXQpO1xuICB9LFxuICBoYXMoXywga2V5KSB7XG4gICAgY29uc3QgaGFzID0ga2V5WzBdICE9PSBcIl9cIiAmJiAhaXNHbG9iYWxseUFsbG93ZWQoa2V5KTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaGFzICYmIFB1YmxpY0luc3RhbmNlUHJveHlIYW5kbGVycy5oYXMoXywga2V5KSkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgUHJvcGVydHkgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICBrZXlcbiAgICAgICAgKX0gc2hvdWxkIG5vdCBzdGFydCB3aXRoIF8gd2hpY2ggaXMgYSByZXNlcnZlZCBwcmVmaXggZm9yIFZ1ZSBpbnRlcm5hbHMuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhcztcbiAgfVxufSk7XG5mdW5jdGlvbiBjcmVhdGVEZXZSZW5kZXJDb250ZXh0KGluc3RhbmNlKSB7XG4gIGNvbnN0IHRhcmdldCA9IHt9O1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBgX2AsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgZ2V0OiAoKSA9PiBpbnN0YW5jZVxuICB9KTtcbiAgT2JqZWN0LmtleXMocHVibGljUHJvcGVydGllc01hcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGdldDogKCkgPT4gcHVibGljUHJvcGVydGllc01hcFtrZXldKGluc3RhbmNlKSxcbiAgICAgIC8vIGludGVyY2VwdGVkIGJ5IHRoZSBwcm94eSBzbyBubyBuZWVkIGZvciBpbXBsZW1lbnRhdGlvbixcbiAgICAgIC8vIGJ1dCBuZWVkZWQgdG8gcHJldmVudCBzZXQgZXJyb3JzXG4gICAgICBzZXQ6IE5PT1BcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBleHBvc2VQcm9wc09uUmVuZGVyQ29udGV4dChpbnN0YW5jZSkge1xuICBjb25zdCB7XG4gICAgY3R4LFxuICAgIHByb3BzT3B0aW9uczogW3Byb3BzT3B0aW9uc11cbiAgfSA9IGluc3RhbmNlO1xuICBpZiAocHJvcHNPcHRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMocHJvcHNPcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4gaW5zdGFuY2UucHJvcHNba2V5XSxcbiAgICAgICAgc2V0OiBOT09QXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gZXhwb3NlU2V0dXBTdGF0ZU9uUmVuZGVyQ29udGV4dChpbnN0YW5jZSkge1xuICBjb25zdCB7IGN0eCwgc2V0dXBTdGF0ZSB9ID0gaW5zdGFuY2U7XG4gIE9iamVjdC5rZXlzKHRvUmF3KHNldHVwU3RhdGUpKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoIXNldHVwU3RhdGUuX19pc1NjcmlwdFNldHVwKSB7XG4gICAgICBpZiAoaXNSZXNlcnZlZFByZWZpeChrZXlbMF0pKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgc2V0dXAoKSByZXR1cm4gcHJvcGVydHkgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIGtleVxuICAgICAgICAgICl9IHNob3VsZCBub3Qgc3RhcnQgd2l0aCBcIiRcIiBvciBcIl9cIiB3aGljaCBhcmUgcmVzZXJ2ZWQgcHJlZml4ZXMgZm9yIFZ1ZSBpbnRlcm5hbHMuYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHNldHVwU3RhdGVba2V5XSxcbiAgICAgICAgc2V0OiBOT09QXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCB3YXJuUnVudGltZVVzYWdlID0gKG1ldGhvZCkgPT4gd2FybiQxKFxuICBgJHttZXRob2R9KCkgaXMgYSBjb21waWxlci1oaW50IGhlbHBlciB0aGF0IGlzIG9ubHkgdXNhYmxlIGluc2lkZSA8c2NyaXB0IHNldHVwPiBvZiBhIHNpbmdsZSBmaWxlIGNvbXBvbmVudC4gSXRzIGFyZ3VtZW50cyBzaG91bGQgYmUgY29tcGlsZWQgYXdheSBhbmQgcGFzc2luZyBpdCBhdCBydW50aW1lIGhhcyBubyBlZmZlY3QuYFxuKTtcbmZ1bmN0aW9uIGRlZmluZVByb3BzKCkge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm5SdW50aW1lVXNhZ2UoYGRlZmluZVByb3BzYCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBkZWZpbmVFbWl0cygpIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuUnVudGltZVVzYWdlKGBkZWZpbmVFbWl0c2ApO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZGVmaW5lRXhwb3NlKGV4cG9zZWQpIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuUnVudGltZVVzYWdlKGBkZWZpbmVFeHBvc2VgKTtcbiAgfVxufVxuZnVuY3Rpb24gZGVmaW5lT3B0aW9ucyhvcHRpb25zKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FyblJ1bnRpbWVVc2FnZShgZGVmaW5lT3B0aW9uc2ApO1xuICB9XG59XG5mdW5jdGlvbiBkZWZpbmVTbG90cygpIHtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB3YXJuUnVudGltZVVzYWdlKGBkZWZpbmVTbG90c2ApO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZGVmaW5lTW9kZWwoKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FyblJ1bnRpbWVVc2FnZShcImRlZmluZU1vZGVsXCIpO1xuICB9XG59XG5mdW5jdGlvbiB3aXRoRGVmYXVsdHMocHJvcHMsIGRlZmF1bHRzKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FyblJ1bnRpbWVVc2FnZShgd2l0aERlZmF1bHRzYCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiB1c2VTbG90cygpIHtcbiAgcmV0dXJuIGdldENvbnRleHQoXCJ1c2VTbG90c1wiKS5zbG90cztcbn1cbmZ1bmN0aW9uIHVzZUF0dHJzKCkge1xuICByZXR1cm4gZ2V0Q29udGV4dChcInVzZUF0dHJzXCIpLmF0dHJzO1xufVxuZnVuY3Rpb24gZ2V0Q29udGV4dChjYWxsZWRGdW5jdGlvbk5hbWUpIHtcbiAgY29uc3QgaSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaSkge1xuICAgIHdhcm4kMShgJHtjYWxsZWRGdW5jdGlvbk5hbWV9KCkgY2FsbGVkIHdpdGhvdXQgYWN0aXZlIGluc3RhbmNlLmApO1xuICB9XG4gIHJldHVybiBpLnNldHVwQ29udGV4dCB8fCAoaS5zZXR1cENvbnRleHQgPSBjcmVhdGVTZXR1cENvbnRleHQoaSkpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHNPckVtaXRzKHByb3BzKSB7XG4gIHJldHVybiBpc0FycmF5KHByb3BzKSA/IHByb3BzLnJlZHVjZShcbiAgICAobm9ybWFsaXplZCwgcCkgPT4gKG5vcm1hbGl6ZWRbcF0gPSBudWxsLCBub3JtYWxpemVkKSxcbiAgICB7fVxuICApIDogcHJvcHM7XG59XG5mdW5jdGlvbiBtZXJnZURlZmF1bHRzKHJhdywgZGVmYXVsdHMpIHtcbiAgY29uc3QgcHJvcHMgPSBub3JtYWxpemVQcm9wc09yRW1pdHMocmF3KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJfX3NraXBcIikpIGNvbnRpbnVlO1xuICAgIGxldCBvcHQgPSBwcm9wc1trZXldO1xuICAgIGlmIChvcHQpIHtcbiAgICAgIGlmIChpc0FycmF5KG9wdCkgfHwgaXNGdW5jdGlvbihvcHQpKSB7XG4gICAgICAgIG9wdCA9IHByb3BzW2tleV0gPSB7IHR5cGU6IG9wdCwgZGVmYXVsdDogZGVmYXVsdHNba2V5XSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0LmRlZmF1bHQgPSBkZWZhdWx0c1trZXldO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0ID09PSBudWxsKSB7XG4gICAgICBvcHQgPSBwcm9wc1trZXldID0geyBkZWZhdWx0OiBkZWZhdWx0c1trZXldIH07XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuJDEoYHByb3BzIGRlZmF1bHQga2V5IFwiJHtrZXl9XCIgaGFzIG5vIGNvcnJlc3BvbmRpbmcgZGVjbGFyYXRpb24uYCk7XG4gICAgfVxuICAgIGlmIChvcHQgJiYgZGVmYXVsdHNbYF9fc2tpcF8ke2tleX1gXSkge1xuICAgICAgb3B0LnNraXBGYWN0b3J5ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByb3BzO1xufVxuZnVuY3Rpb24gbWVyZ2VNb2RlbHMoYSwgYikge1xuICBpZiAoIWEgfHwgIWIpIHJldHVybiBhIHx8IGI7XG4gIGlmIChpc0FycmF5KGEpICYmIGlzQXJyYXkoYikpIHJldHVybiBhLmNvbmNhdChiKTtcbiAgcmV0dXJuIGV4dGVuZCh7fSwgbm9ybWFsaXplUHJvcHNPckVtaXRzKGEpLCBub3JtYWxpemVQcm9wc09yRW1pdHMoYikpO1xufVxuZnVuY3Rpb24gY3JlYXRlUHJvcHNSZXN0UHJveHkocHJvcHMsIGV4Y2x1ZGVkS2V5cykge1xuICBjb25zdCByZXQgPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gcHJvcHMpIHtcbiAgICBpZiAoIWV4Y2x1ZGVkS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmV0LCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAoKSA9PiBwcm9wc1trZXldXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbmZ1bmN0aW9uIHdpdGhBc3luY0NvbnRleHQoZ2V0QXdhaXRhYmxlKSB7XG4gIGNvbnN0IGN0eCA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhY3R4KSB7XG4gICAgd2FybiQxKFxuICAgICAgYHdpdGhBc3luY0NvbnRleHQgY2FsbGVkIHdpdGhvdXQgYWN0aXZlIGN1cnJlbnQgaW5zdGFuY2UuIFRoaXMgaXMgbGlrZWx5IGEgYnVnLmBcbiAgICApO1xuICB9XG4gIGxldCBhd2FpdGFibGUgPSBnZXRBd2FpdGFibGUoKTtcbiAgdW5zZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgaWYgKGlzUHJvbWlzZShhd2FpdGFibGUpKSB7XG4gICAgYXdhaXRhYmxlID0gYXdhaXRhYmxlLmNhdGNoKChlKSA9PiB7XG4gICAgICBzZXRDdXJyZW50SW5zdGFuY2UoY3R4KTtcbiAgICAgIHRocm93IGU7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFthd2FpdGFibGUsICgpID0+IHNldEN1cnJlbnRJbnN0YW5jZShjdHgpXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRHVwbGljYXRlQ2hlY2tlcigpIHtcbiAgY29uc3QgY2FjaGUgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgcmV0dXJuICh0eXBlLCBrZXkpID0+IHtcbiAgICBpZiAoY2FjaGVba2V5XSkge1xuICAgICAgd2FybiQxKGAke3R5cGV9IHByb3BlcnR5IFwiJHtrZXl9XCIgaXMgYWxyZWFkeSBkZWZpbmVkIGluICR7Y2FjaGVba2V5XX0uYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlW2tleV0gPSB0eXBlO1xuICAgIH1cbiAgfTtcbn1cbmxldCBzaG91bGRDYWNoZUFjY2VzcyA9IHRydWU7XG5mdW5jdGlvbiBhcHBseU9wdGlvbnMoaW5zdGFuY2UpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHJlc29sdmVNZXJnZWRPcHRpb25zKGluc3RhbmNlKTtcbiAgY29uc3QgcHVibGljVGhpcyA9IGluc3RhbmNlLnByb3h5O1xuICBjb25zdCBjdHggPSBpbnN0YW5jZS5jdHg7XG4gIHNob3VsZENhY2hlQWNjZXNzID0gZmFsc2U7XG4gIGlmIChvcHRpb25zLmJlZm9yZUNyZWF0ZSkge1xuICAgIGNhbGxIb29rKG9wdGlvbnMuYmVmb3JlQ3JlYXRlLCBpbnN0YW5jZSwgXCJiY1wiKTtcbiAgfVxuICBjb25zdCB7XG4gICAgLy8gc3RhdGVcbiAgICBkYXRhOiBkYXRhT3B0aW9ucyxcbiAgICBjb21wdXRlZDogY29tcHV0ZWRPcHRpb25zLFxuICAgIG1ldGhvZHMsXG4gICAgd2F0Y2g6IHdhdGNoT3B0aW9ucyxcbiAgICBwcm92aWRlOiBwcm92aWRlT3B0aW9ucyxcbiAgICBpbmplY3Q6IGluamVjdE9wdGlvbnMsXG4gICAgLy8gbGlmZWN5Y2xlXG4gICAgY3JlYXRlZCxcbiAgICBiZWZvcmVNb3VudCxcbiAgICBtb3VudGVkLFxuICAgIGJlZm9yZVVwZGF0ZSxcbiAgICB1cGRhdGVkLFxuICAgIGFjdGl2YXRlZCxcbiAgICBkZWFjdGl2YXRlZCxcbiAgICBiZWZvcmVEZXN0cm95LFxuICAgIGJlZm9yZVVubW91bnQsXG4gICAgZGVzdHJveWVkLFxuICAgIHVubW91bnRlZCxcbiAgICByZW5kZXIsXG4gICAgcmVuZGVyVHJhY2tlZCxcbiAgICByZW5kZXJUcmlnZ2VyZWQsXG4gICAgZXJyb3JDYXB0dXJlZCxcbiAgICBzZXJ2ZXJQcmVmZXRjaCxcbiAgICAvLyBwdWJsaWMgQVBJXG4gICAgZXhwb3NlLFxuICAgIGluaGVyaXRBdHRycyxcbiAgICAvLyBhc3NldHNcbiAgICBjb21wb25lbnRzLFxuICAgIGRpcmVjdGl2ZXMsXG4gICAgZmlsdGVyc1xuICB9ID0gb3B0aW9ucztcbiAgY29uc3QgY2hlY2tEdXBsaWNhdGVQcm9wZXJ0aWVzID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IGNyZWF0ZUR1cGxpY2F0ZUNoZWNrZXIoKSA6IG51bGw7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc3QgW3Byb3BzT3B0aW9uc10gPSBpbnN0YW5jZS5wcm9wc09wdGlvbnM7XG4gICAgaWYgKHByb3BzT3B0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcHNPcHRpb25zKSB7XG4gICAgICAgIGNoZWNrRHVwbGljYXRlUHJvcGVydGllcyhcIlByb3BzXCIgLyogUFJPUFMgKi8sIGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChpbmplY3RPcHRpb25zKSB7XG4gICAgcmVzb2x2ZUluamVjdGlvbnMoaW5qZWN0T3B0aW9ucywgY3R4LCBjaGVja0R1cGxpY2F0ZVByb3BlcnRpZXMpO1xuICB9XG4gIGlmIChtZXRob2RzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbWV0aG9kcykge1xuICAgICAgY29uc3QgbWV0aG9kSGFuZGxlciA9IG1ldGhvZHNba2V5XTtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKG1ldGhvZEhhbmRsZXIpKSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogbWV0aG9kSGFuZGxlci5iaW5kKHB1YmxpY1RoaXMpLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3R4W2tleV0gPSBtZXRob2RIYW5kbGVyLmJpbmQocHVibGljVGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBjaGVja0R1cGxpY2F0ZVByb3BlcnRpZXMoXCJNZXRob2RzXCIgLyogTUVUSE9EUyAqLywga2V5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgTWV0aG9kIFwiJHtrZXl9XCIgaGFzIHR5cGUgXCIke3R5cGVvZiBtZXRob2RIYW5kbGVyfVwiIGluIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbi4gRGlkIHlvdSByZWZlcmVuY2UgdGhlIGZ1bmN0aW9uIGNvcnJlY3RseT9gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChkYXRhT3B0aW9ucykge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFpc0Z1bmN0aW9uKGRhdGFPcHRpb25zKSkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgVGhlIGRhdGEgb3B0aW9uIG11c3QgYmUgYSBmdW5jdGlvbi4gUGxhaW4gb2JqZWN0IHVzYWdlIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGRhdGFPcHRpb25zLmNhbGwocHVibGljVGhpcywgcHVibGljVGhpcyk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNQcm9taXNlKGRhdGEpKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBkYXRhKCkgcmV0dXJuZWQgYSBQcm9taXNlIC0gbm90ZSBkYXRhKCkgY2Fubm90IGJlIGFzeW5jOyBJZiB5b3UgaW50ZW5kIHRvIHBlcmZvcm0gZGF0YSBmZXRjaGluZyBiZWZvcmUgY29tcG9uZW50IHJlbmRlcnMsIHVzZSBhc3luYyBzZXR1cCgpICsgPFN1c3BlbnNlPi5gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShgZGF0YSgpIHNob3VsZCByZXR1cm4gYW4gb2JqZWN0LmApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS5kYXRhID0gcmVhY3RpdmUoZGF0YSk7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgY2hlY2tEdXBsaWNhdGVQcm9wZXJ0aWVzKFwiRGF0YVwiIC8qIERBVEEgKi8sIGtleSk7XG4gICAgICAgICAgaWYgKCFpc1Jlc2VydmVkUHJlZml4KGtleVswXSkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIGtleSwge1xuICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIGdldDogKCkgPT4gZGF0YVtrZXldLFxuICAgICAgICAgICAgICBzZXQ6IE5PT1BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBzaG91bGRDYWNoZUFjY2VzcyA9IHRydWU7XG4gIGlmIChjb21wdXRlZE9wdGlvbnMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBjb21wdXRlZE9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IG9wdCA9IGNvbXB1dGVkT3B0aW9uc1trZXldO1xuICAgICAgY29uc3QgZ2V0ID0gaXNGdW5jdGlvbihvcHQpID8gb3B0LmJpbmQocHVibGljVGhpcywgcHVibGljVGhpcykgOiBpc0Z1bmN0aW9uKG9wdC5nZXQpID8gb3B0LmdldC5iaW5kKHB1YmxpY1RoaXMsIHB1YmxpY1RoaXMpIDogTk9PUDtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGdldCA9PT0gTk9PUCkge1xuICAgICAgICB3YXJuJDEoYENvbXB1dGVkIHByb3BlcnR5IFwiJHtrZXl9XCIgaGFzIG5vIGdldHRlci5gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNldCA9ICFpc0Z1bmN0aW9uKG9wdCkgJiYgaXNGdW5jdGlvbihvcHQuc2V0KSA/IG9wdC5zZXQuYmluZChwdWJsaWNUaGlzKSA6ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyAoKSA9PiB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBgV3JpdGUgb3BlcmF0aW9uIGZhaWxlZDogY29tcHV0ZWQgcHJvcGVydHkgXCIke2tleX1cIiBpcyByZWFkb25seS5gXG4gICAgICAgICk7XG4gICAgICB9IDogTk9PUDtcbiAgICAgIGNvbnN0IGMgPSBjb21wdXRlZCh7XG4gICAgICAgIGdldCxcbiAgICAgICAgc2V0XG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIGtleSwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4gYy52YWx1ZSxcbiAgICAgICAgc2V0OiAodikgPT4gYy52YWx1ZSA9IHZcbiAgICAgIH0pO1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgY2hlY2tEdXBsaWNhdGVQcm9wZXJ0aWVzKFwiQ29tcHV0ZWRcIiAvKiBDT01QVVRFRCAqLywga2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHdhdGNoT3B0aW9ucykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHdhdGNoT3B0aW9ucykge1xuICAgICAgY3JlYXRlV2F0Y2hlcih3YXRjaE9wdGlvbnNba2V5XSwgY3R4LCBwdWJsaWNUaGlzLCBrZXkpO1xuICAgIH1cbiAgfVxuICBpZiAocHJvdmlkZU9wdGlvbnMpIHtcbiAgICBjb25zdCBwcm92aWRlcyA9IGlzRnVuY3Rpb24ocHJvdmlkZU9wdGlvbnMpID8gcHJvdmlkZU9wdGlvbnMuY2FsbChwdWJsaWNUaGlzKSA6IHByb3ZpZGVPcHRpb25zO1xuICAgIFJlZmxlY3Qub3duS2V5cyhwcm92aWRlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBwcm92aWRlKGtleSwgcHJvdmlkZXNba2V5XSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGNyZWF0ZWQpIHtcbiAgICBjYWxsSG9vayhjcmVhdGVkLCBpbnN0YW5jZSwgXCJjXCIpO1xuICB9XG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhyZWdpc3RlciwgaG9vaykge1xuICAgIGlmIChpc0FycmF5KGhvb2spKSB7XG4gICAgICBob29rLmZvckVhY2goKF9ob29rKSA9PiByZWdpc3RlcihfaG9vay5iaW5kKHB1YmxpY1RoaXMpKSk7XG4gICAgfSBlbHNlIGlmIChob29rKSB7XG4gICAgICByZWdpc3Rlcihob29rLmJpbmQocHVibGljVGhpcykpO1xuICAgIH1cbiAgfVxuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25CZWZvcmVNb3VudCwgYmVmb3JlTW91bnQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25Nb3VudGVkLCBtb3VudGVkKTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uQmVmb3JlVXBkYXRlLCBiZWZvcmVVcGRhdGUpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25VcGRhdGVkLCB1cGRhdGVkKTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uQWN0aXZhdGVkLCBhY3RpdmF0ZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25EZWFjdGl2YXRlZCwgZGVhY3RpdmF0ZWQpO1xuICByZWdpc3RlckxpZmVjeWNsZUhvb2sob25FcnJvckNhcHR1cmVkLCBlcnJvckNhcHR1cmVkKTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uUmVuZGVyVHJhY2tlZCwgcmVuZGVyVHJhY2tlZCk7XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvblJlbmRlclRyaWdnZXJlZCwgcmVuZGVyVHJpZ2dlcmVkKTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uQmVmb3JlVW5tb3VudCwgYmVmb3JlVW5tb3VudCk7XG4gIHJlZ2lzdGVyTGlmZWN5Y2xlSG9vayhvblVubW91bnRlZCwgdW5tb3VudGVkKTtcbiAgcmVnaXN0ZXJMaWZlY3ljbGVIb29rKG9uU2VydmVyUHJlZmV0Y2gsIHNlcnZlclByZWZldGNoKTtcbiAgaWYgKGlzQXJyYXkoZXhwb3NlKSkge1xuICAgIGlmIChleHBvc2UubGVuZ3RoKSB7XG4gICAgICBjb25zdCBleHBvc2VkID0gaW5zdGFuY2UuZXhwb3NlZCB8fCAoaW5zdGFuY2UuZXhwb3NlZCA9IHt9KTtcbiAgICAgIGV4cG9zZS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9zZWQsIGtleSwge1xuICAgICAgICAgIGdldDogKCkgPT4gcHVibGljVGhpc1trZXldLFxuICAgICAgICAgIHNldDogKHZhbCkgPT4gcHVibGljVGhpc1trZXldID0gdmFsLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFpbnN0YW5jZS5leHBvc2VkKSB7XG4gICAgICBpbnN0YW5jZS5leHBvc2VkID0ge307XG4gICAgfVxuICB9XG4gIGlmIChyZW5kZXIgJiYgaW5zdGFuY2UucmVuZGVyID09PSBOT09QKSB7XG4gICAgaW5zdGFuY2UucmVuZGVyID0gcmVuZGVyO1xuICB9XG4gIGlmIChpbmhlcml0QXR0cnMgIT0gbnVsbCkge1xuICAgIGluc3RhbmNlLmluaGVyaXRBdHRycyA9IGluaGVyaXRBdHRycztcbiAgfVxuICBpZiAoY29tcG9uZW50cykgaW5zdGFuY2UuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gIGlmIChkaXJlY3RpdmVzKSBpbnN0YW5jZS5kaXJlY3RpdmVzID0gZGlyZWN0aXZlcztcbiAgaWYgKHNlcnZlclByZWZldGNoKSB7XG4gICAgbWFya0FzeW5jQm91bmRhcnkoaW5zdGFuY2UpO1xuICB9XG59XG5mdW5jdGlvbiByZXNvbHZlSW5qZWN0aW9ucyhpbmplY3RPcHRpb25zLCBjdHgsIGNoZWNrRHVwbGljYXRlUHJvcGVydGllcyA9IE5PT1ApIHtcbiAgaWYgKGlzQXJyYXkoaW5qZWN0T3B0aW9ucykpIHtcbiAgICBpbmplY3RPcHRpb25zID0gbm9ybWFsaXplSW5qZWN0KGluamVjdE9wdGlvbnMpO1xuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIGluamVjdE9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHQgPSBpbmplY3RPcHRpb25zW2tleV07XG4gICAgbGV0IGluamVjdGVkO1xuICAgIGlmIChpc09iamVjdChvcHQpKSB7XG4gICAgICBpZiAoXCJkZWZhdWx0XCIgaW4gb3B0KSB7XG4gICAgICAgIGluamVjdGVkID0gaW5qZWN0KFxuICAgICAgICAgIG9wdC5mcm9tIHx8IGtleSxcbiAgICAgICAgICBvcHQuZGVmYXVsdCxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmplY3RlZCA9IGluamVjdChvcHQuZnJvbSB8fCBrZXkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbmplY3RlZCA9IGluamVjdChvcHQpO1xuICAgIH1cbiAgICBpZiAoaXNSZWYoaW5qZWN0ZWQpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBrZXksIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IGluamVjdGVkLnZhbHVlLFxuICAgICAgICBzZXQ6ICh2KSA9PiBpbmplY3RlZC52YWx1ZSA9IHZcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHhba2V5XSA9IGluamVjdGVkO1xuICAgIH1cbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgY2hlY2tEdXBsaWNhdGVQcm9wZXJ0aWVzKFwiSW5qZWN0XCIgLyogSU5KRUNUICovLCBrZXkpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY2FsbEhvb2soaG9vaywgaW5zdGFuY2UsIHR5cGUpIHtcbiAgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoXG4gICAgaXNBcnJheShob29rKSA/IGhvb2subWFwKChoKSA9PiBoLmJpbmQoaW5zdGFuY2UucHJveHkpKSA6IGhvb2suYmluZChpbnN0YW5jZS5wcm94eSksXG4gICAgaW5zdGFuY2UsXG4gICAgdHlwZVxuICApO1xufVxuZnVuY3Rpb24gY3JlYXRlV2F0Y2hlcihyYXcsIGN0eCwgcHVibGljVGhpcywga2V5KSB7XG4gIGxldCBnZXR0ZXIgPSBrZXkuaW5jbHVkZXMoXCIuXCIpID8gY3JlYXRlUGF0aEdldHRlcihwdWJsaWNUaGlzLCBrZXkpIDogKCkgPT4gcHVibGljVGhpc1trZXldO1xuICBpZiAoaXNTdHJpbmcocmF3KSkge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBjdHhbcmF3XTtcbiAgICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAge1xuICAgICAgICB3YXRjaChnZXR0ZXIsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybiQxKGBJbnZhbGlkIHdhdGNoIGhhbmRsZXIgc3BlY2lmaWVkIGJ5IGtleSBcIiR7cmF3fVwiYCwgaGFuZGxlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ocmF3KSkge1xuICAgIHtcbiAgICAgIHdhdGNoKGdldHRlciwgcmF3LmJpbmQocHVibGljVGhpcykpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChyYXcpKSB7XG4gICAgaWYgKGlzQXJyYXkocmF3KSkge1xuICAgICAgcmF3LmZvckVhY2goKHIpID0+IGNyZWF0ZVdhdGNoZXIociwgY3R4LCBwdWJsaWNUaGlzLCBrZXkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaGFuZGxlciA9IGlzRnVuY3Rpb24ocmF3LmhhbmRsZXIpID8gcmF3LmhhbmRsZXIuYmluZChwdWJsaWNUaGlzKSA6IGN0eFtyYXcuaGFuZGxlcl07XG4gICAgICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAgICB3YXRjaChnZXR0ZXIsIGhhbmRsZXIsIHJhdyk7XG4gICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgd2FybiQxKGBJbnZhbGlkIHdhdGNoIGhhbmRsZXIgc3BlY2lmaWVkIGJ5IGtleSBcIiR7cmF3LmhhbmRsZXJ9XCJgLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm4kMShgSW52YWxpZCB3YXRjaCBvcHRpb246IFwiJHtrZXl9XCJgLCByYXcpO1xuICB9XG59XG5mdW5jdGlvbiByZXNvbHZlTWVyZ2VkT3B0aW9ucyhpbnN0YW5jZSkge1xuICBjb25zdCBiYXNlID0gaW5zdGFuY2UudHlwZTtcbiAgY29uc3QgeyBtaXhpbnMsIGV4dGVuZHM6IGV4dGVuZHNPcHRpb25zIH0gPSBiYXNlO1xuICBjb25zdCB7XG4gICAgbWl4aW5zOiBnbG9iYWxNaXhpbnMsXG4gICAgb3B0aW9uc0NhY2hlOiBjYWNoZSxcbiAgICBjb25maWc6IHsgb3B0aW9uTWVyZ2VTdHJhdGVnaWVzIH1cbiAgfSA9IGluc3RhbmNlLmFwcENvbnRleHQ7XG4gIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChiYXNlKTtcbiAgbGV0IHJlc29sdmVkO1xuICBpZiAoY2FjaGVkKSB7XG4gICAgcmVzb2x2ZWQgPSBjYWNoZWQ7XG4gIH0gZWxzZSBpZiAoIWdsb2JhbE1peGlucy5sZW5ndGggJiYgIW1peGlucyAmJiAhZXh0ZW5kc09wdGlvbnMpIHtcbiAgICB7XG4gICAgICByZXNvbHZlZCA9IGJhc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlc29sdmVkID0ge307XG4gICAgaWYgKGdsb2JhbE1peGlucy5sZW5ndGgpIHtcbiAgICAgIGdsb2JhbE1peGlucy5mb3JFYWNoKFxuICAgICAgICAobSkgPT4gbWVyZ2VPcHRpb25zKHJlc29sdmVkLCBtLCBvcHRpb25NZXJnZVN0cmF0ZWdpZXMsIHRydWUpXG4gICAgICApO1xuICAgIH1cbiAgICBtZXJnZU9wdGlvbnMocmVzb2x2ZWQsIGJhc2UsIG9wdGlvbk1lcmdlU3RyYXRlZ2llcyk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KGJhc2UpKSB7XG4gICAgY2FjaGUuc2V0KGJhc2UsIHJlc29sdmVkKTtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZWQ7XG59XG5mdW5jdGlvbiBtZXJnZU9wdGlvbnModG8sIGZyb20sIHN0cmF0cywgYXNNaXhpbiA9IGZhbHNlKSB7XG4gIGNvbnN0IHsgbWl4aW5zLCBleHRlbmRzOiBleHRlbmRzT3B0aW9ucyB9ID0gZnJvbTtcbiAgaWYgKGV4dGVuZHNPcHRpb25zKSB7XG4gICAgbWVyZ2VPcHRpb25zKHRvLCBleHRlbmRzT3B0aW9ucywgc3RyYXRzLCB0cnVlKTtcbiAgfVxuICBpZiAobWl4aW5zKSB7XG4gICAgbWl4aW5zLmZvckVhY2goXG4gICAgICAobSkgPT4gbWVyZ2VPcHRpb25zKHRvLCBtLCBzdHJhdHMsIHRydWUpXG4gICAgKTtcbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiBmcm9tKSB7XG4gICAgaWYgKGFzTWl4aW4gJiYga2V5ID09PSBcImV4cG9zZVwiKSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShcbiAgICAgICAgYFwiZXhwb3NlXCIgb3B0aW9uIGlzIGlnbm9yZWQgd2hlbiBkZWNsYXJlZCBpbiBtaXhpbnMgb3IgZXh0ZW5kcy4gSXQgc2hvdWxkIG9ubHkgYmUgZGVjbGFyZWQgaW4gdGhlIGJhc2UgY29tcG9uZW50IGl0c2VsZi5gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHJhdCA9IGludGVybmFsT3B0aW9uTWVyZ2VTdHJhdHNba2V5XSB8fCBzdHJhdHMgJiYgc3RyYXRzW2tleV07XG4gICAgICB0b1trZXldID0gc3RyYXQgPyBzdHJhdCh0b1trZXldLCBmcm9tW2tleV0pIDogZnJvbVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5jb25zdCBpbnRlcm5hbE9wdGlvbk1lcmdlU3RyYXRzID0ge1xuICBkYXRhOiBtZXJnZURhdGFGbixcbiAgcHJvcHM6IG1lcmdlRW1pdHNPclByb3BzT3B0aW9ucyxcbiAgZW1pdHM6IG1lcmdlRW1pdHNPclByb3BzT3B0aW9ucyxcbiAgLy8gb2JqZWN0c1xuICBtZXRob2RzOiBtZXJnZU9iamVjdE9wdGlvbnMsXG4gIGNvbXB1dGVkOiBtZXJnZU9iamVjdE9wdGlvbnMsXG4gIC8vIGxpZmVjeWNsZVxuICBiZWZvcmVDcmVhdGU6IG1lcmdlQXNBcnJheSxcbiAgY3JlYXRlZDogbWVyZ2VBc0FycmF5LFxuICBiZWZvcmVNb3VudDogbWVyZ2VBc0FycmF5LFxuICBtb3VudGVkOiBtZXJnZUFzQXJyYXksXG4gIGJlZm9yZVVwZGF0ZTogbWVyZ2VBc0FycmF5LFxuICB1cGRhdGVkOiBtZXJnZUFzQXJyYXksXG4gIGJlZm9yZURlc3Ryb3k6IG1lcmdlQXNBcnJheSxcbiAgYmVmb3JlVW5tb3VudDogbWVyZ2VBc0FycmF5LFxuICBkZXN0cm95ZWQ6IG1lcmdlQXNBcnJheSxcbiAgdW5tb3VudGVkOiBtZXJnZUFzQXJyYXksXG4gIGFjdGl2YXRlZDogbWVyZ2VBc0FycmF5LFxuICBkZWFjdGl2YXRlZDogbWVyZ2VBc0FycmF5LFxuICBlcnJvckNhcHR1cmVkOiBtZXJnZUFzQXJyYXksXG4gIHNlcnZlclByZWZldGNoOiBtZXJnZUFzQXJyYXksXG4gIC8vIGFzc2V0c1xuICBjb21wb25lbnRzOiBtZXJnZU9iamVjdE9wdGlvbnMsXG4gIGRpcmVjdGl2ZXM6IG1lcmdlT2JqZWN0T3B0aW9ucyxcbiAgLy8gd2F0Y2hcbiAgd2F0Y2g6IG1lcmdlV2F0Y2hPcHRpb25zLFxuICAvLyBwcm92aWRlIC8gaW5qZWN0XG4gIHByb3ZpZGU6IG1lcmdlRGF0YUZuLFxuICBpbmplY3Q6IG1lcmdlSW5qZWN0XG59O1xuZnVuY3Rpb24gbWVyZ2VEYXRhRm4odG8sIGZyb20pIHtcbiAgaWYgKCFmcm9tKSB7XG4gICAgcmV0dXJuIHRvO1xuICB9XG4gIGlmICghdG8pIHtcbiAgICByZXR1cm4gZnJvbTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkRGF0YUZuKCkge1xuICAgIHJldHVybiAoZXh0ZW5kKShcbiAgICAgIGlzRnVuY3Rpb24odG8pID8gdG8uY2FsbCh0aGlzLCB0aGlzKSA6IHRvLFxuICAgICAgaXNGdW5jdGlvbihmcm9tKSA/IGZyb20uY2FsbCh0aGlzLCB0aGlzKSA6IGZyb21cbiAgICApO1xuICB9O1xufVxuZnVuY3Rpb24gbWVyZ2VJbmplY3QodG8sIGZyb20pIHtcbiAgcmV0dXJuIG1lcmdlT2JqZWN0T3B0aW9ucyhub3JtYWxpemVJbmplY3QodG8pLCBub3JtYWxpemVJbmplY3QoZnJvbSkpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplSW5qZWN0KHJhdykge1xuICBpZiAoaXNBcnJheShyYXcpKSB7XG4gICAgY29uc3QgcmVzID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc1tyYXdbaV1dID0gcmF3W2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHJldHVybiByYXc7XG59XG5mdW5jdGlvbiBtZXJnZUFzQXJyYXkodG8sIGZyb20pIHtcbiAgcmV0dXJuIHRvID8gWy4uLm5ldyBTZXQoW10uY29uY2F0KHRvLCBmcm9tKSldIDogZnJvbTtcbn1cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0T3B0aW9ucyh0bywgZnJvbSkge1xuICByZXR1cm4gdG8gPyBleHRlbmQoLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCksIHRvLCBmcm9tKSA6IGZyb207XG59XG5mdW5jdGlvbiBtZXJnZUVtaXRzT3JQcm9wc09wdGlvbnModG8sIGZyb20pIHtcbiAgaWYgKHRvKSB7XG4gICAgaWYgKGlzQXJyYXkodG8pICYmIGlzQXJyYXkoZnJvbSkpIHtcbiAgICAgIHJldHVybiBbLi4uLyogQF9fUFVSRV9fICovIG5ldyBTZXQoWy4uLnRvLCAuLi5mcm9tXSldO1xuICAgIH1cbiAgICByZXR1cm4gZXh0ZW5kKFxuICAgICAgLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBub3JtYWxpemVQcm9wc09yRW1pdHModG8pLFxuICAgICAgbm9ybWFsaXplUHJvcHNPckVtaXRzKGZyb20gIT0gbnVsbCA/IGZyb20gOiB7fSlcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmcm9tO1xuICB9XG59XG5mdW5jdGlvbiBtZXJnZVdhdGNoT3B0aW9ucyh0bywgZnJvbSkge1xuICBpZiAoIXRvKSByZXR1cm4gZnJvbTtcbiAgaWYgKCFmcm9tKSByZXR1cm4gdG87XG4gIGNvbnN0IG1lcmdlZCA9IGV4dGVuZCgvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSwgdG8pO1xuICBmb3IgKGNvbnN0IGtleSBpbiBmcm9tKSB7XG4gICAgbWVyZ2VkW2tleV0gPSBtZXJnZUFzQXJyYXkodG9ba2V5XSwgZnJvbVtrZXldKTtcbiAgfVxuICByZXR1cm4gbWVyZ2VkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcHBDb250ZXh0KCkge1xuICByZXR1cm4ge1xuICAgIGFwcDogbnVsbCxcbiAgICBjb25maWc6IHtcbiAgICAgIGlzTmF0aXZlVGFnOiBOTyxcbiAgICAgIHBlcmZvcm1hbmNlOiBmYWxzZSxcbiAgICAgIGdsb2JhbFByb3BlcnRpZXM6IHt9LFxuICAgICAgb3B0aW9uTWVyZ2VTdHJhdGVnaWVzOiB7fSxcbiAgICAgIGVycm9ySGFuZGxlcjogdm9pZCAwLFxuICAgICAgd2FybkhhbmRsZXI6IHZvaWQgMCxcbiAgICAgIGNvbXBpbGVyT3B0aW9uczoge31cbiAgICB9LFxuICAgIG1peGluczogW10sXG4gICAgY29tcG9uZW50czoge30sXG4gICAgZGlyZWN0aXZlczoge30sXG4gICAgcHJvdmlkZXM6IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIG9wdGlvbnNDYWNoZTogLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCksXG4gICAgcHJvcHNDYWNoZTogLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCksXG4gICAgZW1pdHNDYWNoZTogLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKClcbiAgfTtcbn1cbmxldCB1aWQkMSA9IDA7XG5mdW5jdGlvbiBjcmVhdGVBcHBBUEkocmVuZGVyLCBoeWRyYXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVBcHAocm9vdENvbXBvbmVudCwgcm9vdFByb3BzID0gbnVsbCkge1xuICAgIGlmICghaXNGdW5jdGlvbihyb290Q29tcG9uZW50KSkge1xuICAgICAgcm9vdENvbXBvbmVudCA9IGV4dGVuZCh7fSwgcm9vdENvbXBvbmVudCk7XG4gICAgfVxuICAgIGlmIChyb290UHJvcHMgIT0gbnVsbCAmJiAhaXNPYmplY3Qocm9vdFByb3BzKSkge1xuICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB3YXJuJDEoYHJvb3QgcHJvcHMgcGFzc2VkIHRvIGFwcC5tb3VudCgpIG11c3QgYmUgYW4gb2JqZWN0LmApO1xuICAgICAgcm9vdFByb3BzID0gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUFwcENvbnRleHQoKTtcbiAgICBjb25zdCBpbnN0YWxsZWRQbHVnaW5zID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrU2V0KCk7XG4gICAgY29uc3QgcGx1Z2luQ2xlYW51cEZucyA9IFtdO1xuICAgIGxldCBpc01vdW50ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBhcHAgPSBjb250ZXh0LmFwcCA9IHtcbiAgICAgIF91aWQ6IHVpZCQxKyssXG4gICAgICBfY29tcG9uZW50OiByb290Q29tcG9uZW50LFxuICAgICAgX3Byb3BzOiByb290UHJvcHMsXG4gICAgICBfY29udGFpbmVyOiBudWxsLFxuICAgICAgX2NvbnRleHQ6IGNvbnRleHQsXG4gICAgICBfaW5zdGFuY2U6IG51bGwsXG4gICAgICB2ZXJzaW9uLFxuICAgICAgZ2V0IGNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuY29uZmlnO1xuICAgICAgfSxcbiAgICAgIHNldCBjb25maWcodikge1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBhcHAuY29uZmlnIGNhbm5vdCBiZSByZXBsYWNlZC4gTW9kaWZ5IGluZGl2aWR1YWwgb3B0aW9ucyBpbnN0ZWFkLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXNlKHBsdWdpbiwgLi4ub3B0aW9ucykge1xuICAgICAgICBpZiAoaW5zdGFsbGVkUGx1Z2lucy5oYXMocGx1Z2luKSkge1xuICAgICAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybiQxKGBQbHVnaW4gaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkIHRvIHRhcmdldCBhcHAuYCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGx1Z2luICYmIGlzRnVuY3Rpb24ocGx1Z2luLmluc3RhbGwpKSB7XG4gICAgICAgICAgaW5zdGFsbGVkUGx1Z2lucy5hZGQocGx1Z2luKTtcbiAgICAgICAgICBwbHVnaW4uaW5zdGFsbChhcHAsIC4uLm9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ocGx1Z2luKSkge1xuICAgICAgICAgIGluc3RhbGxlZFBsdWdpbnMuYWRkKHBsdWdpbik7XG4gICAgICAgICAgcGx1Z2luKGFwcCwgLi4ub3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBBIHBsdWdpbiBtdXN0IGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGFuIG9iamVjdCB3aXRoIGFuIFwiaW5zdGFsbFwiIGZ1bmN0aW9uLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcHA7XG4gICAgICB9LFxuICAgICAgbWl4aW4obWl4aW4pIHtcbiAgICAgICAgaWYgKF9fVlVFX09QVElPTlNfQVBJX18pIHtcbiAgICAgICAgICBpZiAoIWNvbnRleHQubWl4aW5zLmluY2x1ZGVzKG1peGluKSkge1xuICAgICAgICAgICAgY29udGV4dC5taXhpbnMucHVzaChtaXhpbik7XG4gICAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgICAgIFwiTWl4aW4gaGFzIGFscmVhZHkgYmVlbiBhcHBsaWVkIHRvIHRhcmdldCBhcHBcIiArIChtaXhpbi5uYW1lID8gYDogJHttaXhpbi5uYW1lfWAgOiBcIlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcIk1peGlucyBhcmUgb25seSBhdmFpbGFibGUgaW4gYnVpbGRzIHN1cHBvcnRpbmcgT3B0aW9ucyBBUElcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcDtcbiAgICAgIH0sXG4gICAgICBjb21wb25lbnQobmFtZSwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgdmFsaWRhdGVDb21wb25lbnROYW1lKG5hbWUsIGNvbnRleHQuY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0LmNvbXBvbmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY29udGV4dC5jb21wb25lbnRzW25hbWVdKSB7XG4gICAgICAgICAgd2FybiQxKGBDb21wb25lbnQgXCIke25hbWV9XCIgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGluIHRhcmdldCBhcHAuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5jb21wb25lbnRzW25hbWVdID0gY29tcG9uZW50O1xuICAgICAgICByZXR1cm4gYXBwO1xuICAgICAgfSxcbiAgICAgIGRpcmVjdGl2ZShuYW1lLCBkaXJlY3RpdmUpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICB2YWxpZGF0ZURpcmVjdGl2ZU5hbWUobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkaXJlY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm4gY29udGV4dC5kaXJlY3RpdmVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGNvbnRleHQuZGlyZWN0aXZlc1tuYW1lXSkge1xuICAgICAgICAgIHdhcm4kMShgRGlyZWN0aXZlIFwiJHtuYW1lfVwiIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCBpbiB0YXJnZXQgYXBwLmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZGlyZWN0aXZlc1tuYW1lXSA9IGRpcmVjdGl2ZTtcbiAgICAgICAgcmV0dXJuIGFwcDtcbiAgICAgIH0sXG4gICAgICBtb3VudChyb290Q29udGFpbmVyLCBpc0h5ZHJhdGUsIG5hbWVzcGFjZSkge1xuICAgICAgICBpZiAoIWlzTW91bnRlZCkge1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHJvb3RDb250YWluZXIuX192dWVfYXBwX18pIHtcbiAgICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgICAgYFRoZXJlIGlzIGFscmVhZHkgYW4gYXBwIGluc3RhbmNlIG1vdW50ZWQgb24gdGhlIGhvc3QgY29udGFpbmVyLlxuIElmIHlvdSB3YW50IHRvIG1vdW50IGFub3RoZXIgYXBwIG9uIHRoZSBzYW1lIGhvc3QgY29udGFpbmVyLCB5b3UgbmVlZCB0byB1bm1vdW50IHRoZSBwcmV2aW91cyBhcHAgYnkgY2FsbGluZyBcXGBhcHAudW5tb3VudCgpXFxgIGZpcnN0LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZub2RlID0gYXBwLl9jZVZOb2RlIHx8IGNyZWF0ZVZOb2RlKHJvb3RDb21wb25lbnQsIHJvb3RQcm9wcyk7XG4gICAgICAgICAgdm5vZGUuYXBwQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbmFtZXNwYWNlID0gXCJzdmdcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5hbWVzcGFjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSA9IHZvaWQgMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVsb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjbG9uZWQgPSBjbG9uZVZOb2RlKHZub2RlKTtcbiAgICAgICAgICAgICAgY2xvbmVkLmVsID0gbnVsbDtcbiAgICAgICAgICAgICAgcmVuZGVyKGNsb25lZCwgcm9vdENvbnRhaW5lciwgbmFtZXNwYWNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc0h5ZHJhdGUgJiYgaHlkcmF0ZSkge1xuICAgICAgICAgICAgaHlkcmF0ZSh2bm9kZSwgcm9vdENvbnRhaW5lcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlcih2bm9kZSwgcm9vdENvbnRhaW5lciwgbmFtZXNwYWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgICBhcHAuX2NvbnRhaW5lciA9IHJvb3RDb250YWluZXI7XG4gICAgICAgICAgcm9vdENvbnRhaW5lci5fX3Z1ZV9hcHBfXyA9IGFwcDtcbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgICAgIGFwcC5faW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnQ7XG4gICAgICAgICAgICBkZXZ0b29sc0luaXRBcHAoYXBwLCB2ZXJzaW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudFB1YmxpY0luc3RhbmNlKHZub2RlLmNvbXBvbmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBBcHAgaGFzIGFscmVhZHkgYmVlbiBtb3VudGVkLlxuSWYgeW91IHdhbnQgdG8gcmVtb3VudCB0aGUgc2FtZSBhcHAsIG1vdmUgeW91ciBhcHAgY3JlYXRpb24gbG9naWMgaW50byBhIGZhY3RvcnkgZnVuY3Rpb24gYW5kIGNyZWF0ZSBmcmVzaCBhcHAgaW5zdGFuY2VzIGZvciBlYWNoIG1vdW50IC0gZS5nLiBcXGBjb25zdCBjcmVhdGVNeUFwcCA9ICgpID0+IGNyZWF0ZUFwcChBcHApXFxgYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvblVubW91bnQoY2xlYW51cEZuKSB7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHR5cGVvZiBjbGVhbnVwRm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgIGBFeHBlY3RlZCBmdW5jdGlvbiBhcyBmaXJzdCBhcmd1bWVudCB0byBhcHAub25Vbm1vdW50KCksIGJ1dCBnb3QgJHt0eXBlb2YgY2xlYW51cEZufWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHBsdWdpbkNsZWFudXBGbnMucHVzaChjbGVhbnVwRm4pO1xuICAgICAgfSxcbiAgICAgIHVubW91bnQoKSB7XG4gICAgICAgIGlmIChpc01vdW50ZWQpIHtcbiAgICAgICAgICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhcbiAgICAgICAgICAgIHBsdWdpbkNsZWFudXBGbnMsXG4gICAgICAgICAgICBhcHAuX2luc3RhbmNlLFxuICAgICAgICAgICAgMTZcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlbmRlcihudWxsLCBhcHAuX2NvbnRhaW5lcik7XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgICAgICBhcHAuX2luc3RhbmNlID0gbnVsbDtcbiAgICAgICAgICAgIGRldnRvb2xzVW5tb3VudEFwcChhcHApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgYXBwLl9jb250YWluZXIuX192dWVfYXBwX187XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHdhcm4kMShgQ2Fubm90IHVubW91bnQgYW4gYXBwIHRoYXQgaXMgbm90IG1vdW50ZWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm92aWRlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYga2V5IGluIGNvbnRleHQucHJvdmlkZXMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKGNvbnRleHQucHJvdmlkZXMsIGtleSkpIHtcbiAgICAgICAgICAgIHdhcm4kMShcbiAgICAgICAgICAgICAgYEFwcCBhbHJlYWR5IHByb3ZpZGVzIHByb3BlcnR5IHdpdGgga2V5IFwiJHtTdHJpbmcoa2V5KX1cIi4gSXQgd2lsbCBiZSBvdmVyd3JpdHRlbiB3aXRoIHRoZSBuZXcgdmFsdWUuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBgQXBwIGFscmVhZHkgcHJvdmlkZXMgcHJvcGVydHkgd2l0aCBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGluaGVyaXRlZCBmcm9tIGl0cyBwYXJlbnQgZWxlbWVudC4gSXQgd2lsbCBiZSBvdmVyd3JpdHRlbiB3aXRoIHRoZSBuZXcgdmFsdWUuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5wcm92aWRlc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBhcHA7XG4gICAgICB9LFxuICAgICAgcnVuV2l0aENvbnRleHQoZm4pIHtcbiAgICAgICAgY29uc3QgbGFzdEFwcCA9IGN1cnJlbnRBcHA7XG4gICAgICAgIGN1cnJlbnRBcHAgPSBhcHA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgY3VycmVudEFwcCA9IGxhc3RBcHA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhcHA7XG4gIH07XG59XG5sZXQgY3VycmVudEFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIHByb3ZpZGUoa2V5LCB2YWx1ZSkge1xuICBpZiAoIWN1cnJlbnRJbnN0YW5jZSkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuJDEoYHByb3ZpZGUoKSBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBzZXR1cCgpLmApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgcHJvdmlkZXMgPSBjdXJyZW50SW5zdGFuY2UucHJvdmlkZXM7XG4gICAgY29uc3QgcGFyZW50UHJvdmlkZXMgPSBjdXJyZW50SW5zdGFuY2UucGFyZW50ICYmIGN1cnJlbnRJbnN0YW5jZS5wYXJlbnQucHJvdmlkZXM7XG4gICAgaWYgKHBhcmVudFByb3ZpZGVzID09PSBwcm92aWRlcykge1xuICAgICAgcHJvdmlkZXMgPSBjdXJyZW50SW5zdGFuY2UucHJvdmlkZXMgPSBPYmplY3QuY3JlYXRlKHBhcmVudFByb3ZpZGVzKTtcbiAgICB9XG4gICAgcHJvdmlkZXNba2V5XSA9IHZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBpbmplY3Qoa2V5LCBkZWZhdWx0VmFsdWUsIHRyZWF0RGVmYXVsdEFzRmFjdG9yeSA9IGZhbHNlKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gIGlmIChpbnN0YW5jZSB8fCBjdXJyZW50QXBwKSB7XG4gICAgbGV0IHByb3ZpZGVzID0gY3VycmVudEFwcCA/IGN1cnJlbnRBcHAuX2NvbnRleHQucHJvdmlkZXMgOiBpbnN0YW5jZSA/IGluc3RhbmNlLnBhcmVudCA9PSBudWxsIHx8IGluc3RhbmNlLmNlID8gaW5zdGFuY2Uudm5vZGUuYXBwQ29udGV4dCAmJiBpbnN0YW5jZS52bm9kZS5hcHBDb250ZXh0LnByb3ZpZGVzIDogaW5zdGFuY2UucGFyZW50LnByb3ZpZGVzIDogdm9pZCAwO1xuICAgIGlmIChwcm92aWRlcyAmJiBrZXkgaW4gcHJvdmlkZXMpIHtcbiAgICAgIHJldHVybiBwcm92aWRlc1trZXldO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB0cmVhdERlZmF1bHRBc0ZhY3RvcnkgJiYgaXNGdW5jdGlvbihkZWZhdWx0VmFsdWUpID8gZGVmYXVsdFZhbHVlLmNhbGwoaW5zdGFuY2UgJiYgaW5zdGFuY2UucHJveHkpIDogZGVmYXVsdFZhbHVlO1xuICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybiQxKGBpbmplY3Rpb24gXCIke1N0cmluZyhrZXkpfVwiIG5vdCBmb3VuZC5gKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHdhcm4kMShgaW5qZWN0KCkgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgc2V0dXAoKSBvciBmdW5jdGlvbmFsIGNvbXBvbmVudHMuYCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhc0luamVjdGlvbkNvbnRleHQoKSB7XG4gIHJldHVybiAhIShnZXRDdXJyZW50SW5zdGFuY2UoKSB8fCBjdXJyZW50QXBwKTtcbn1cblxuY29uc3QgaW50ZXJuYWxPYmplY3RQcm90byA9IHt9O1xuY29uc3QgY3JlYXRlSW50ZXJuYWxPYmplY3QgPSAoKSA9PiBPYmplY3QuY3JlYXRlKGludGVybmFsT2JqZWN0UHJvdG8pO1xuY29uc3QgaXNJbnRlcm5hbE9iamVjdCA9IChvYmopID0+IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBpbnRlcm5hbE9iamVjdFByb3RvO1xuXG5mdW5jdGlvbiBpbml0UHJvcHMoaW5zdGFuY2UsIHJhd1Byb3BzLCBpc1N0YXRlZnVsLCBpc1NTUiA9IGZhbHNlKSB7XG4gIGNvbnN0IHByb3BzID0ge307XG4gIGNvbnN0IGF0dHJzID0gY3JlYXRlSW50ZXJuYWxPYmplY3QoKTtcbiAgaW5zdGFuY2UucHJvcHNEZWZhdWx0cyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBzZXRGdWxsUHJvcHMoaW5zdGFuY2UsIHJhd1Byb3BzLCBwcm9wcywgYXR0cnMpO1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0YW5jZS5wcm9wc09wdGlvbnNbMF0pIHtcbiAgICBpZiAoIShrZXkgaW4gcHJvcHMpKSB7XG4gICAgICBwcm9wc1trZXldID0gdm9pZCAwO1xuICAgIH1cbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHZhbGlkYXRlUHJvcHMocmF3UHJvcHMgfHwge30sIHByb3BzLCBpbnN0YW5jZSk7XG4gIH1cbiAgaWYgKGlzU3RhdGVmdWwpIHtcbiAgICBpbnN0YW5jZS5wcm9wcyA9IGlzU1NSID8gcHJvcHMgOiBzaGFsbG93UmVhY3RpdmUocHJvcHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaW5zdGFuY2UudHlwZS5wcm9wcykge1xuICAgICAgaW5zdGFuY2UucHJvcHMgPSBhdHRycztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UucHJvcHMgPSBwcm9wcztcbiAgICB9XG4gIH1cbiAgaW5zdGFuY2UuYXR0cnMgPSBhdHRycztcbn1cbmZ1bmN0aW9uIGlzSW5IbXJDb250ZXh0KGluc3RhbmNlKSB7XG4gIHdoaWxlIChpbnN0YW5jZSkge1xuICAgIGlmIChpbnN0YW5jZS50eXBlLl9faG1ySWQpIHJldHVybiB0cnVlO1xuICAgIGluc3RhbmNlID0gaW5zdGFuY2UucGFyZW50O1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhpbnN0YW5jZSwgcmF3UHJvcHMsIHJhd1ByZXZQcm9wcywgb3B0aW1pemVkKSB7XG4gIGNvbnN0IHtcbiAgICBwcm9wcyxcbiAgICBhdHRycyxcbiAgICB2bm9kZTogeyBwYXRjaEZsYWcgfVxuICB9ID0gaW5zdGFuY2U7XG4gIGNvbnN0IHJhd0N1cnJlbnRQcm9wcyA9IHRvUmF3KHByb3BzKTtcbiAgY29uc3QgW29wdGlvbnNdID0gaW5zdGFuY2UucHJvcHNPcHRpb25zO1xuICBsZXQgaGFzQXR0cnNDaGFuZ2VkID0gZmFsc2U7XG4gIGlmIChcbiAgICAvLyBhbHdheXMgZm9yY2UgZnVsbCBkaWZmIGluIGRldlxuICAgIC8vIC0gIzE5NDIgaWYgaG1yIGlzIGVuYWJsZWQgd2l0aCBzZmMgY29tcG9uZW50XG4gICAgLy8gLSB2aXRlIzg3MiBub24tc2ZjIGNvbXBvbmVudCB1c2VkIGJ5IHNmYyBjb21wb25lbnRcbiAgICAhKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNJbkhtckNvbnRleHQoaW5zdGFuY2UpKSAmJiAob3B0aW1pemVkIHx8IHBhdGNoRmxhZyA+IDApICYmICEocGF0Y2hGbGFnICYgMTYpXG4gICkge1xuICAgIGlmIChwYXRjaEZsYWcgJiA4KSB7XG4gICAgICBjb25zdCBwcm9wc1RvVXBkYXRlID0gaW5zdGFuY2Uudm5vZGUuZHluYW1pY1Byb3BzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBrZXkgPSBwcm9wc1RvVXBkYXRlW2ldO1xuICAgICAgICBpZiAoaXNFbWl0TGlzdGVuZXIoaW5zdGFuY2UuZW1pdHNPcHRpb25zLCBrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSByYXdQcm9wc1trZXldO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgIGlmIChoYXNPd24oYXR0cnMsIGtleSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gYXR0cnNba2V5XSkge1xuICAgICAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgIGhhc0F0dHJzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbWVsaXplZEtleSA9IGNhbWVsaXplKGtleSk7XG4gICAgICAgICAgICBwcm9wc1tjYW1lbGl6ZWRLZXldID0gcmVzb2x2ZVByb3BWYWx1ZShcbiAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgcmF3Q3VycmVudFByb3BzLFxuICAgICAgICAgICAgICBjYW1lbGl6ZWRLZXksXG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gYXR0cnNba2V5XSkge1xuICAgICAgICAgICAgYXR0cnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgaGFzQXR0cnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHNldEZ1bGxQcm9wcyhpbnN0YW5jZSwgcmF3UHJvcHMsIHByb3BzLCBhdHRycykpIHtcbiAgICAgIGhhc0F0dHJzQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBrZWJhYktleTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByYXdDdXJyZW50UHJvcHMpIHtcbiAgICAgIGlmICghcmF3UHJvcHMgfHwgLy8gZm9yIGNhbWVsQ2FzZVxuICAgICAgIWhhc093bihyYXdQcm9wcywga2V5KSAmJiAvLyBpdCdzIHBvc3NpYmxlIHRoZSBvcmlnaW5hbCBwcm9wcyB3YXMgcGFzc2VkIGluIGFzIGtlYmFiLWNhc2VcbiAgICAgIC8vIGFuZCBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlICgjOTU1KVxuICAgICAgKChrZWJhYktleSA9IGh5cGhlbmF0ZShrZXkpKSA9PT0ga2V5IHx8ICFoYXNPd24ocmF3UHJvcHMsIGtlYmFiS2V5KSkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAocmF3UHJldlByb3BzICYmIC8vIGZvciBjYW1lbENhc2VcbiAgICAgICAgICAocmF3UHJldlByb3BzW2tleV0gIT09IHZvaWQgMCB8fCAvLyBmb3Iga2ViYWItY2FzZVxuICAgICAgICAgIHJhd1ByZXZQcm9wc1trZWJhYktleV0gIT09IHZvaWQgMCkpIHtcbiAgICAgICAgICAgIHByb3BzW2tleV0gPSByZXNvbHZlUHJvcFZhbHVlKFxuICAgICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgICByYXdDdXJyZW50UHJvcHMsXG4gICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHByb3BzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF0dHJzICE9PSByYXdDdXJyZW50UHJvcHMpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgICAgIGlmICghcmF3UHJvcHMgfHwgIWhhc093bihyYXdQcm9wcywga2V5KSAmJiB0cnVlKSB7XG4gICAgICAgICAgZGVsZXRlIGF0dHJzW2tleV07XG4gICAgICAgICAgaGFzQXR0cnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoaGFzQXR0cnNDaGFuZ2VkKSB7XG4gICAgdHJpZ2dlcihpbnN0YW5jZS5hdHRycywgXCJzZXRcIiwgXCJcIik7XG4gIH1cbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICB2YWxpZGF0ZVByb3BzKHJhd1Byb3BzIHx8IHt9LCBwcm9wcywgaW5zdGFuY2UpO1xuICB9XG59XG5mdW5jdGlvbiBzZXRGdWxsUHJvcHMoaW5zdGFuY2UsIHJhd1Byb3BzLCBwcm9wcywgYXR0cnMpIHtcbiAgY29uc3QgW29wdGlvbnMsIG5lZWRDYXN0S2V5c10gPSBpbnN0YW5jZS5wcm9wc09wdGlvbnM7XG4gIGxldCBoYXNBdHRyc0NoYW5nZWQgPSBmYWxzZTtcbiAgbGV0IHJhd0Nhc3RWYWx1ZXM7XG4gIGlmIChyYXdQcm9wcykge1xuICAgIGZvciAobGV0IGtleSBpbiByYXdQcm9wcykge1xuICAgICAgaWYgKGlzUmVzZXJ2ZWRQcm9wKGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWx1ZSA9IHJhd1Byb3BzW2tleV07XG4gICAgICBsZXQgY2FtZWxLZXk7XG4gICAgICBpZiAob3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgY2FtZWxLZXkgPSBjYW1lbGl6ZShrZXkpKSkge1xuICAgICAgICBpZiAoIW5lZWRDYXN0S2V5cyB8fCAhbmVlZENhc3RLZXlzLmluY2x1ZGVzKGNhbWVsS2V5KSkge1xuICAgICAgICAgIHByb3BzW2NhbWVsS2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIChyYXdDYXN0VmFsdWVzIHx8IChyYXdDYXN0VmFsdWVzID0ge30pKVtjYW1lbEtleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaXNFbWl0TGlzdGVuZXIoaW5zdGFuY2UuZW1pdHNPcHRpb25zLCBrZXkpKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBhdHRycykgfHwgdmFsdWUgIT09IGF0dHJzW2tleV0pIHtcbiAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgaGFzQXR0cnNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAobmVlZENhc3RLZXlzKSB7XG4gICAgY29uc3QgcmF3Q3VycmVudFByb3BzID0gdG9SYXcocHJvcHMpO1xuICAgIGNvbnN0IGNhc3RWYWx1ZXMgPSByYXdDYXN0VmFsdWVzIHx8IEVNUFRZX09CSjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRDYXN0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qga2V5ID0gbmVlZENhc3RLZXlzW2ldO1xuICAgICAgcHJvcHNba2V5XSA9IHJlc29sdmVQcm9wVmFsdWUoXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHJhd0N1cnJlbnRQcm9wcyxcbiAgICAgICAga2V5LFxuICAgICAgICBjYXN0VmFsdWVzW2tleV0sXG4gICAgICAgIGluc3RhbmNlLFxuICAgICAgICAhaGFzT3duKGNhc3RWYWx1ZXMsIGtleSlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBoYXNBdHRyc0NoYW5nZWQ7XG59XG5mdW5jdGlvbiByZXNvbHZlUHJvcFZhbHVlKG9wdGlvbnMsIHByb3BzLCBrZXksIHZhbHVlLCBpbnN0YW5jZSwgaXNBYnNlbnQpIHtcbiAgY29uc3Qgb3B0ID0gb3B0aW9uc1trZXldO1xuICBpZiAob3B0ICE9IG51bGwpIHtcbiAgICBjb25zdCBoYXNEZWZhdWx0ID0gaGFzT3duKG9wdCwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChoYXNEZWZhdWx0ICYmIHZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG9wdC5kZWZhdWx0O1xuICAgICAgaWYgKG9wdC50eXBlICE9PSBGdW5jdGlvbiAmJiAhb3B0LnNraXBGYWN0b3J5ICYmIGlzRnVuY3Rpb24oZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICBjb25zdCB7IHByb3BzRGVmYXVsdHMgfSA9IGluc3RhbmNlO1xuICAgICAgICBpZiAoa2V5IGluIHByb3BzRGVmYXVsdHMpIHtcbiAgICAgICAgICB2YWx1ZSA9IHByb3BzRGVmYXVsdHNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXNldCA9IHNldEN1cnJlbnRJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgICAgICAgdmFsdWUgPSBwcm9wc0RlZmF1bHRzW2tleV0gPSBkZWZhdWx0VmFsdWUuY2FsbChcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBwcm9wc1xuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAoaW5zdGFuY2UuY2UpIHtcbiAgICAgICAgaW5zdGFuY2UuY2UuX3NldFByb3Aoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRbMCAvKiBzaG91bGRDYXN0ICovXSkge1xuICAgICAgaWYgKGlzQWJzZW50ICYmICFoYXNEZWZhdWx0KSB7XG4gICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKG9wdFsxIC8qIHNob3VsZENhc3RUcnVlICovXSAmJiAodmFsdWUgPT09IFwiXCIgfHwgdmFsdWUgPT09IGh5cGhlbmF0ZShrZXkpKSkge1xuICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cbmNvbnN0IG1peGluUHJvcHNDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHNPcHRpb25zKGNvbXAsIGFwcENvbnRleHQsIGFzTWl4aW4gPSBmYWxzZSkge1xuICBjb25zdCBjYWNoZSA9IF9fVlVFX09QVElPTlNfQVBJX18gJiYgYXNNaXhpbiA/IG1peGluUHJvcHNDYWNoZSA6IGFwcENvbnRleHQucHJvcHNDYWNoZTtcbiAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KGNvbXApO1xuICBpZiAoY2FjaGVkKSB7XG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuICBjb25zdCByYXcgPSBjb21wLnByb3BzO1xuICBjb25zdCBub3JtYWxpemVkID0ge307XG4gIGNvbnN0IG5lZWRDYXN0S2V5cyA9IFtdO1xuICBsZXQgaGFzRXh0ZW5kcyA9IGZhbHNlO1xuICBpZiAoX19WVUVfT1BUSU9OU19BUElfXyAmJiAhaXNGdW5jdGlvbihjb21wKSkge1xuICAgIGNvbnN0IGV4dGVuZFByb3BzID0gKHJhdzIpID0+IHtcbiAgICAgIGhhc0V4dGVuZHMgPSB0cnVlO1xuICAgICAgY29uc3QgW3Byb3BzLCBrZXlzXSA9IG5vcm1hbGl6ZVByb3BzT3B0aW9ucyhyYXcyLCBhcHBDb250ZXh0LCB0cnVlKTtcbiAgICAgIGV4dGVuZChub3JtYWxpemVkLCBwcm9wcyk7XG4gICAgICBpZiAoa2V5cykgbmVlZENhc3RLZXlzLnB1c2goLi4ua2V5cyk7XG4gICAgfTtcbiAgICBpZiAoIWFzTWl4aW4gJiYgYXBwQ29udGV4dC5taXhpbnMubGVuZ3RoKSB7XG4gICAgICBhcHBDb250ZXh0Lm1peGlucy5mb3JFYWNoKGV4dGVuZFByb3BzKTtcbiAgICB9XG4gICAgaWYgKGNvbXAuZXh0ZW5kcykge1xuICAgICAgZXh0ZW5kUHJvcHMoY29tcC5leHRlbmRzKTtcbiAgICB9XG4gICAgaWYgKGNvbXAubWl4aW5zKSB7XG4gICAgICBjb21wLm1peGlucy5mb3JFYWNoKGV4dGVuZFByb3BzKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFyYXcgJiYgIWhhc0V4dGVuZHMpIHtcbiAgICBpZiAoaXNPYmplY3QoY29tcCkpIHtcbiAgICAgIGNhY2hlLnNldChjb21wLCBFTVBUWV9BUlIpO1xuICAgIH1cbiAgICByZXR1cm4gRU1QVFlfQVJSO1xuICB9XG4gIGlmIChpc0FycmF5KHJhdykpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhdy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzU3RyaW5nKHJhd1tpXSkpIHtcbiAgICAgICAgd2FybiQxKGBwcm9wcyBtdXN0IGJlIHN0cmluZ3Mgd2hlbiB1c2luZyBhcnJheSBzeW50YXguYCwgcmF3W2ldKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBjYW1lbGl6ZShyYXdbaV0pO1xuICAgICAgaWYgKHZhbGlkYXRlUHJvcE5hbWUobm9ybWFsaXplZEtleSkpIHtcbiAgICAgICAgbm9ybWFsaXplZFtub3JtYWxpemVkS2V5XSA9IEVNUFRZX09CSjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAocmF3KSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzT2JqZWN0KHJhdykpIHtcbiAgICAgIHdhcm4kMShgaW52YWxpZCBwcm9wcyBvcHRpb25zYCwgcmF3KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmF3KSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkS2V5ID0gY2FtZWxpemUoa2V5KTtcbiAgICAgIGlmICh2YWxpZGF0ZVByb3BOYW1lKG5vcm1hbGl6ZWRLZXkpKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9IHJhd1trZXldO1xuICAgICAgICBjb25zdCBwcm9wID0gbm9ybWFsaXplZFtub3JtYWxpemVkS2V5XSA9IGlzQXJyYXkob3B0KSB8fCBpc0Z1bmN0aW9uKG9wdCkgPyB7IHR5cGU6IG9wdCB9IDogZXh0ZW5kKHt9LCBvcHQpO1xuICAgICAgICBjb25zdCBwcm9wVHlwZSA9IHByb3AudHlwZTtcbiAgICAgICAgbGV0IHNob3VsZENhc3QgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNob3VsZENhc3RUcnVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlzQXJyYXkocHJvcFR5cGUpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByb3BUeXBlLmxlbmd0aDsgKytpbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHByb3BUeXBlW2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVOYW1lID0gaXNGdW5jdGlvbih0eXBlKSAmJiB0eXBlLm5hbWU7XG4gICAgICAgICAgICBpZiAodHlwZU5hbWUgPT09IFwiQm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgIHNob3VsZENhc3QgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZU5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgc2hvdWxkQ2FzdFRydWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2hvdWxkQ2FzdCA9IGlzRnVuY3Rpb24ocHJvcFR5cGUpICYmIHByb3BUeXBlLm5hbWUgPT09IFwiQm9vbGVhblwiO1xuICAgICAgICB9XG4gICAgICAgIHByb3BbMCAvKiBzaG91bGRDYXN0ICovXSA9IHNob3VsZENhc3Q7XG4gICAgICAgIHByb3BbMSAvKiBzaG91bGRDYXN0VHJ1ZSAqL10gPSBzaG91bGRDYXN0VHJ1ZTtcbiAgICAgICAgaWYgKHNob3VsZENhc3QgfHwgaGFzT3duKHByb3AsIFwiZGVmYXVsdFwiKSkge1xuICAgICAgICAgIG5lZWRDYXN0S2V5cy5wdXNoKG5vcm1hbGl6ZWRLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IHJlcyA9IFtub3JtYWxpemVkLCBuZWVkQ2FzdEtleXNdO1xuICBpZiAoaXNPYmplY3QoY29tcCkpIHtcbiAgICBjYWNoZS5zZXQoY29tcCwgcmVzKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wTmFtZShrZXkpIHtcbiAgaWYgKGtleVswXSAhPT0gXCIkXCIgJiYgIWlzUmVzZXJ2ZWRQcm9wKGtleSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgd2FybiQxKGBJbnZhbGlkIHByb3AgbmFtZTogXCIke2tleX1cIiBpcyBhIHJlc2VydmVkIHByb3BlcnR5LmApO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGdldFR5cGUoY3Rvcikge1xuICBpZiAoY3RvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIm51bGxcIjtcbiAgfVxuICBpZiAodHlwZW9mIGN0b3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjdG9yLm5hbWUgfHwgXCJcIjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY3RvciA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IG5hbWUgPSBjdG9yLmNvbnN0cnVjdG9yICYmIGN0b3IuY29uc3RydWN0b3IubmFtZTtcbiAgICByZXR1cm4gbmFtZSB8fCBcIlwiO1xuICB9XG4gIHJldHVybiBcIlwiO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wcyhyYXdQcm9wcywgcHJvcHMsIGluc3RhbmNlKSB7XG4gIGNvbnN0IHJlc29sdmVkVmFsdWVzID0gdG9SYXcocHJvcHMpO1xuICBjb25zdCBvcHRpb25zID0gaW5zdGFuY2UucHJvcHNPcHRpb25zWzBdO1xuICBjb25zdCBjYW1lbGl6ZVByb3BzS2V5ID0gT2JqZWN0LmtleXMocmF3UHJvcHMpLm1hcCgoa2V5KSA9PiBjYW1lbGl6ZShrZXkpKTtcbiAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgIGxldCBvcHQgPSBvcHRpb25zW2tleV07XG4gICAgaWYgKG9wdCA9PSBudWxsKSBjb250aW51ZTtcbiAgICB2YWxpZGF0ZVByb3AoXG4gICAgICBrZXksXG4gICAgICByZXNvbHZlZFZhbHVlc1trZXldLFxuICAgICAgb3B0LFxuICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNoYWxsb3dSZWFkb25seShyZXNvbHZlZFZhbHVlcykgOiByZXNvbHZlZFZhbHVlcyxcbiAgICAgICFjYW1lbGl6ZVByb3BzS2V5LmluY2x1ZGVzKGtleSlcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVByb3AobmFtZSwgdmFsdWUsIHByb3AsIHByb3BzLCBpc0Fic2VudCkge1xuICBjb25zdCB7IHR5cGUsIHJlcXVpcmVkLCB2YWxpZGF0b3IsIHNraXBDaGVjayB9ID0gcHJvcDtcbiAgaWYgKHJlcXVpcmVkICYmIGlzQWJzZW50KSB7XG4gICAgd2FybiQxKCdNaXNzaW5nIHJlcXVpcmVkIHByb3A6IFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgJiYgIXJlcXVpcmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlICE9IG51bGwgJiYgdHlwZSAhPT0gdHJ1ZSAmJiAhc2tpcENoZWNrKSB7XG4gICAgbGV0IGlzVmFsaWQgPSBmYWxzZTtcbiAgICBjb25zdCB0eXBlcyA9IGlzQXJyYXkodHlwZSkgPyB0eXBlIDogW3R5cGVdO1xuICAgIGNvbnN0IGV4cGVjdGVkVHlwZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aCAmJiAhaXNWYWxpZDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHZhbGlkLCBleHBlY3RlZFR5cGUgfSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVzW2ldKTtcbiAgICAgIGV4cGVjdGVkVHlwZXMucHVzaChleHBlY3RlZFR5cGUgfHwgXCJcIik7XG4gICAgICBpc1ZhbGlkID0gdmFsaWQ7XG4gICAgfVxuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgd2FybiQxKGdldEludmFsaWRUeXBlTWVzc2FnZShuYW1lLCB2YWx1ZSwgZXhwZWN0ZWRUeXBlcykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAodmFsaWRhdG9yICYmICF2YWxpZGF0b3IodmFsdWUsIHByb3BzKSkge1xuICAgIHdhcm4kMSgnSW52YWxpZCBwcm9wOiBjdXN0b20gdmFsaWRhdG9yIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBuYW1lICsgJ1wiLicpO1xuICB9XG59XG5jb25zdCBpc1NpbXBsZVR5cGUgPSAvKiBAX19QVVJFX18gKi8gbWFrZU1hcChcbiAgXCJTdHJpbmcsTnVtYmVyLEJvb2xlYW4sRnVuY3Rpb24sU3ltYm9sLEJpZ0ludFwiXG4pO1xuZnVuY3Rpb24gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZSkge1xuICBsZXQgdmFsaWQ7XG4gIGNvbnN0IGV4cGVjdGVkVHlwZSA9IGdldFR5cGUodHlwZSk7XG4gIGlmIChleHBlY3RlZFR5cGUgPT09IFwibnVsbFwiKSB7XG4gICAgdmFsaWQgPSB2YWx1ZSA9PT0gbnVsbDtcbiAgfSBlbHNlIGlmIChpc1NpbXBsZVR5cGUoZXhwZWN0ZWRUeXBlKSkge1xuICAgIGNvbnN0IHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgdmFsaWQgPSB0ID09PSBleHBlY3RlZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIXZhbGlkICYmIHQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IFwiT2JqZWN0XCIpIHtcbiAgICB2YWxpZCA9IGlzT2JqZWN0KHZhbHVlKTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IFwiQXJyYXlcIikge1xuICAgIHZhbGlkID0gaXNBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWxpZCxcbiAgICBleHBlY3RlZFR5cGVcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEludmFsaWRUeXBlTWVzc2FnZShuYW1lLCB2YWx1ZSwgZXhwZWN0ZWRUeXBlcykge1xuICBpZiAoZXhwZWN0ZWRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gYFByb3AgdHlwZSBbXSBmb3IgcHJvcCBcIiR7bmFtZX1cIiB3b24ndCBtYXRjaCBhbnl0aGluZy4gRGlkIHlvdSBtZWFuIHRvIHVzZSB0eXBlIEFycmF5IGluc3RlYWQ/YDtcbiAgfVxuICBsZXQgbWVzc2FnZSA9IGBJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJHtuYW1lfVwiLiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZXMubWFwKGNhcGl0YWxpemUpLmpvaW4oXCIgfCBcIil9YDtcbiAgY29uc3QgZXhwZWN0ZWRUeXBlID0gZXhwZWN0ZWRUeXBlc1swXTtcbiAgY29uc3QgcmVjZWl2ZWRUeXBlID0gdG9SYXdUeXBlKHZhbHVlKTtcbiAgY29uc3QgZXhwZWN0ZWRWYWx1ZSA9IHN0eWxlVmFsdWUodmFsdWUsIGV4cGVjdGVkVHlwZSk7XG4gIGNvbnN0IHJlY2VpdmVkVmFsdWUgPSBzdHlsZVZhbHVlKHZhbHVlLCByZWNlaXZlZFR5cGUpO1xuICBpZiAoZXhwZWN0ZWRUeXBlcy5sZW5ndGggPT09IDEgJiYgaXNFeHBsaWNhYmxlKGV4cGVjdGVkVHlwZSkgJiYgIWlzQm9vbGVhbihleHBlY3RlZFR5cGUsIHJlY2VpdmVkVHlwZSkpIHtcbiAgICBtZXNzYWdlICs9IGAgd2l0aCB2YWx1ZSAke2V4cGVjdGVkVmFsdWV9YDtcbiAgfVxuICBtZXNzYWdlICs9IGAsIGdvdCAke3JlY2VpdmVkVHlwZX0gYDtcbiAgaWYgKGlzRXhwbGljYWJsZShyZWNlaXZlZFR5cGUpKSB7XG4gICAgbWVzc2FnZSArPSBgd2l0aCB2YWx1ZSAke3JlY2VpdmVkVmFsdWV9LmA7XG4gIH1cbiAgcmV0dXJuIG1lc3NhZ2U7XG59XG5mdW5jdGlvbiBzdHlsZVZhbHVlKHZhbHVlLCB0eXBlKSB7XG4gIGlmICh0eXBlID09PSBcIlN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGBcIiR7dmFsdWV9XCJgO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiTnVtYmVyXCIpIHtcbiAgICByZXR1cm4gYCR7TnVtYmVyKHZhbHVlKX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBgJHt2YWx1ZX1gO1xuICB9XG59XG5mdW5jdGlvbiBpc0V4cGxpY2FibGUodHlwZSkge1xuICBjb25zdCBleHBsaWNpdFR5cGVzID0gW1wic3RyaW5nXCIsIFwibnVtYmVyXCIsIFwiYm9vbGVhblwiXTtcbiAgcmV0dXJuIGV4cGxpY2l0VHlwZXMuc29tZSgoZWxlbSkgPT4gdHlwZS50b0xvd2VyQ2FzZSgpID09PSBlbGVtKTtcbn1cbmZ1bmN0aW9uIGlzQm9vbGVhbiguLi5hcmdzKSB7XG4gIHJldHVybiBhcmdzLnNvbWUoKGVsZW0pID0+IGVsZW0udG9Mb3dlckNhc2UoKSA9PT0gXCJib29sZWFuXCIpO1xufVxuXG5jb25zdCBpc0ludGVybmFsS2V5ID0gKGtleSkgPT4ga2V5ID09PSBcIl9cIiB8fCBrZXkgPT09IFwiX2N0eFwiIHx8IGtleSA9PT0gXCIkc3RhYmxlXCI7XG5jb25zdCBub3JtYWxpemVTbG90VmFsdWUgPSAodmFsdWUpID0+IGlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZOb2RlKSA6IFtub3JtYWxpemVWTm9kZSh2YWx1ZSldO1xuY29uc3Qgbm9ybWFsaXplU2xvdCA9IChrZXksIHJhd1Nsb3QsIGN0eCkgPT4ge1xuICBpZiAocmF3U2xvdC5fbikge1xuICAgIHJldHVybiByYXdTbG90O1xuICB9XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB3aXRoQ3R4KCguLi5hcmdzKSA9PiB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY3VycmVudEluc3RhbmNlICYmICEoY3R4ID09PSBudWxsICYmIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSkgJiYgIShjdHggJiYgY3R4LnJvb3QgIT09IGN1cnJlbnRJbnN0YW5jZS5yb290KSkge1xuICAgICAgd2FybiQxKFxuICAgICAgICBgU2xvdCBcIiR7a2V5fVwiIGludm9rZWQgb3V0c2lkZSBvZiB0aGUgcmVuZGVyIGZ1bmN0aW9uOiB0aGlzIHdpbGwgbm90IHRyYWNrIGRlcGVuZGVuY2llcyB1c2VkIGluIHRoZSBzbG90LiBJbnZva2UgdGhlIHNsb3QgZnVuY3Rpb24gaW5zaWRlIHRoZSByZW5kZXIgZnVuY3Rpb24gaW5zdGVhZC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplU2xvdFZhbHVlKHJhd1Nsb3QoLi4uYXJncykpO1xuICB9LCBjdHgpO1xuICBub3JtYWxpemVkLl9jID0gZmFsc2U7XG4gIHJldHVybiBub3JtYWxpemVkO1xufTtcbmNvbnN0IG5vcm1hbGl6ZU9iamVjdFNsb3RzID0gKHJhd1Nsb3RzLCBzbG90cywgaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgY3R4ID0gcmF3U2xvdHMuX2N0eDtcbiAgZm9yIChjb25zdCBrZXkgaW4gcmF3U2xvdHMpIHtcbiAgICBpZiAoaXNJbnRlcm5hbEtleShrZXkpKSBjb250aW51ZTtcbiAgICBjb25zdCB2YWx1ZSA9IHJhd1Nsb3RzW2tleV07XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBzbG90c1trZXldID0gbm9ybWFsaXplU2xvdChrZXksIHZhbHVlLCBjdHgpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgdHJ1ZSkge1xuICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgYE5vbi1mdW5jdGlvbiB2YWx1ZSBlbmNvdW50ZXJlZCBmb3Igc2xvdCBcIiR7a2V5fVwiLiBQcmVmZXIgZnVuY3Rpb24gc2xvdHMgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplU2xvdFZhbHVlKHZhbHVlKTtcbiAgICAgIHNsb3RzW2tleV0gPSAoKSA9PiBub3JtYWxpemVkO1xuICAgIH1cbiAgfVxufTtcbmNvbnN0IG5vcm1hbGl6ZVZOb2RlU2xvdHMgPSAoaW5zdGFuY2UsIGNoaWxkcmVuKSA9PiB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFpc0tlZXBBbGl2ZShpbnN0YW5jZS52bm9kZSkgJiYgdHJ1ZSkge1xuICAgIHdhcm4kMShcbiAgICAgIGBOb24tZnVuY3Rpb24gdmFsdWUgZW5jb3VudGVyZWQgZm9yIGRlZmF1bHQgc2xvdC4gUHJlZmVyIGZ1bmN0aW9uIHNsb3RzIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuYFxuICAgICk7XG4gIH1cbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVNsb3RWYWx1ZShjaGlsZHJlbik7XG4gIGluc3RhbmNlLnNsb3RzLmRlZmF1bHQgPSAoKSA9PiBub3JtYWxpemVkO1xufTtcbmNvbnN0IGFzc2lnblNsb3RzID0gKHNsb3RzLCBjaGlsZHJlbiwgb3B0aW1pemVkKSA9PiB7XG4gIGZvciAoY29uc3Qga2V5IGluIGNoaWxkcmVuKSB7XG4gICAgaWYgKG9wdGltaXplZCB8fCAhaXNJbnRlcm5hbEtleShrZXkpKSB7XG4gICAgICBzbG90c1trZXldID0gY2hpbGRyZW5ba2V5XTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCBpbml0U2xvdHMgPSAoaW5zdGFuY2UsIGNoaWxkcmVuLCBvcHRpbWl6ZWQpID0+IHtcbiAgY29uc3Qgc2xvdHMgPSBpbnN0YW5jZS5zbG90cyA9IGNyZWF0ZUludGVybmFsT2JqZWN0KCk7XG4gIGlmIChpbnN0YW5jZS52bm9kZS5zaGFwZUZsYWcgJiAzMikge1xuICAgIGNvbnN0IHR5cGUgPSBjaGlsZHJlbi5fO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICBhc3NpZ25TbG90cyhzbG90cywgY2hpbGRyZW4sIG9wdGltaXplZCk7XG4gICAgICBpZiAob3B0aW1pemVkKSB7XG4gICAgICAgIGRlZihzbG90cywgXCJfXCIsIHR5cGUsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub3JtYWxpemVPYmplY3RTbG90cyhjaGlsZHJlbiwgc2xvdHMpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjaGlsZHJlbikge1xuICAgIG5vcm1hbGl6ZVZOb2RlU2xvdHMoaW5zdGFuY2UsIGNoaWxkcmVuKTtcbiAgfVxufTtcbmNvbnN0IHVwZGF0ZVNsb3RzID0gKGluc3RhbmNlLCBjaGlsZHJlbiwgb3B0aW1pemVkKSA9PiB7XG4gIGNvbnN0IHsgdm5vZGUsIHNsb3RzIH0gPSBpbnN0YW5jZTtcbiAgbGV0IG5lZWREZWxldGlvbkNoZWNrID0gdHJ1ZTtcbiAgbGV0IGRlbGV0aW9uQ29tcGFyaXNvblRhcmdldCA9IEVNUFRZX09CSjtcbiAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDMyKSB7XG4gICAgY29uc3QgdHlwZSA9IGNoaWxkcmVuLl87XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGlzSG1yVXBkYXRpbmcpIHtcbiAgICAgICAgYXNzaWduU2xvdHMoc2xvdHMsIGNoaWxkcmVuLCBvcHRpbWl6ZWQpO1xuICAgICAgICB0cmlnZ2VyKGluc3RhbmNlLCBcInNldFwiLCBcIiRzbG90c1wiKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW1pemVkICYmIHR5cGUgPT09IDEpIHtcbiAgICAgICAgbmVlZERlbGV0aW9uQ2hlY2sgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2lnblNsb3RzKHNsb3RzLCBjaGlsZHJlbiwgb3B0aW1pemVkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmVlZERlbGV0aW9uQ2hlY2sgPSAhY2hpbGRyZW4uJHN0YWJsZTtcbiAgICAgIG5vcm1hbGl6ZU9iamVjdFNsb3RzKGNoaWxkcmVuLCBzbG90cyk7XG4gICAgfVxuICAgIGRlbGV0aW9uQ29tcGFyaXNvblRhcmdldCA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XG4gICAgbm9ybWFsaXplVk5vZGVTbG90cyhpbnN0YW5jZSwgY2hpbGRyZW4pO1xuICAgIGRlbGV0aW9uQ29tcGFyaXNvblRhcmdldCA9IHsgZGVmYXVsdDogMSB9O1xuICB9XG4gIGlmIChuZWVkRGVsZXRpb25DaGVjaykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNsb3RzKSB7XG4gICAgICBpZiAoIWlzSW50ZXJuYWxLZXkoa2V5KSAmJiBkZWxldGlvbkNvbXBhcmlzb25UYXJnZXRba2V5XSA9PSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSBzbG90c1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxubGV0IHN1cHBvcnRlZDtcbmxldCBwZXJmO1xuZnVuY3Rpb24gc3RhcnRNZWFzdXJlKGluc3RhbmNlLCB0eXBlKSB7XG4gIGlmIChpbnN0YW5jZS5hcHBDb250ZXh0LmNvbmZpZy5wZXJmb3JtYW5jZSAmJiBpc1N1cHBvcnRlZCgpKSB7XG4gICAgcGVyZi5tYXJrKGB2dWUtJHt0eXBlfS0ke2luc3RhbmNlLnVpZH1gKTtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICBkZXZ0b29sc1BlcmZTdGFydChpbnN0YW5jZSwgdHlwZSwgaXNTdXBwb3J0ZWQoKSA/IHBlcmYubm93KCkgOiBEYXRlLm5vdygpKTtcbiAgfVxufVxuZnVuY3Rpb24gZW5kTWVhc3VyZShpbnN0YW5jZSwgdHlwZSkge1xuICBpZiAoaW5zdGFuY2UuYXBwQ29udGV4dC5jb25maWcucGVyZm9ybWFuY2UgJiYgaXNTdXBwb3J0ZWQoKSkge1xuICAgIGNvbnN0IHN0YXJ0VGFnID0gYHZ1ZS0ke3R5cGV9LSR7aW5zdGFuY2UudWlkfWA7XG4gICAgY29uc3QgZW5kVGFnID0gc3RhcnRUYWcgKyBgOmVuZGA7XG4gICAgY29uc3QgbWVhc3VyZU5hbWUgPSBgPCR7Zm9ybWF0Q29tcG9uZW50TmFtZShpbnN0YW5jZSwgaW5zdGFuY2UudHlwZSl9PiAke3R5cGV9YDtcbiAgICBwZXJmLm1hcmsoZW5kVGFnKTtcbiAgICBwZXJmLm1lYXN1cmUobWVhc3VyZU5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgIHBlcmYuY2xlYXJNZWFzdXJlcyhtZWFzdXJlTmFtZSk7XG4gICAgcGVyZi5jbGVhck1hcmtzKHN0YXJ0VGFnKTtcbiAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICBkZXZ0b29sc1BlcmZFbmQoaW5zdGFuY2UsIHR5cGUsIGlzU3VwcG9ydGVkKCkgPyBwZXJmLm5vdygpIDogRGF0ZS5ub3coKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICBpZiAoc3VwcG9ydGVkICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gc3VwcG9ydGVkO1xuICB9XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5wZXJmb3JtYW5jZSkge1xuICAgIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgcGVyZiA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydGVkO1xufVxuXG5mdW5jdGlvbiBpbml0RmVhdHVyZUZsYWdzKCkge1xuICBjb25zdCBuZWVkV2FybiA9IFtdO1xuICBpZiAodHlwZW9mIF9fVlVFX09QVElPTlNfQVBJX18gIT09IFwiYm9vbGVhblwiKSB7XG4gICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBuZWVkV2Fybi5wdXNoKGBfX1ZVRV9PUFRJT05TX0FQSV9fYCk7XG4gICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX09QVElPTlNfQVBJX18gPSB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgX19WVUVfUFJPRF9ERVZUT09MU19fICE9PSBcImJvb2xlYW5cIikge1xuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgbmVlZFdhcm4ucHVzaChgX19WVUVfUFJPRF9ERVZUT09MU19fYCk7XG4gICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX1BST0RfREVWVE9PTFNfXyA9IGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fICE9PSBcImJvb2xlYW5cIikge1xuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgbmVlZFdhcm4ucHVzaChgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fYCk7XG4gICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXyA9IGZhbHNlO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIG5lZWRXYXJuLmxlbmd0aCkge1xuICAgIGNvbnN0IG11bHRpID0gbmVlZFdhcm4ubGVuZ3RoID4gMTtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgRmVhdHVyZSBmbGFnJHttdWx0aSA/IGBzYCA6IGBgfSAke25lZWRXYXJuLmpvaW4oXCIsIFwiKX0gJHttdWx0aSA/IGBhcmVgIDogYGlzYH0gbm90IGV4cGxpY2l0bHkgZGVmaW5lZC4gWW91IGFyZSBydW5uaW5nIHRoZSBlc20tYnVuZGxlciBidWlsZCBvZiBWdWUsIHdoaWNoIGV4cGVjdHMgdGhlc2UgY29tcGlsZS10aW1lIGZlYXR1cmUgZmxhZ3MgdG8gYmUgZ2xvYmFsbHkgaW5qZWN0ZWQgdmlhIHRoZSBidW5kbGVyIGNvbmZpZyBpbiBvcmRlciB0byBnZXQgYmV0dGVyIHRyZWUtc2hha2luZyBpbiB0aGUgcHJvZHVjdGlvbiBidW5kbGUuXG5cbkZvciBtb3JlIGRldGFpbHMsIHNlZSBodHRwczovL2xpbmsudnVlanMub3JnL2ZlYXR1cmUtZmxhZ3MuYFxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgcXVldWVQb3N0UmVuZGVyRWZmZWN0ID0gcXVldWVFZmZlY3RXaXRoU3VzcGVuc2UgO1xuZnVuY3Rpb24gY3JlYXRlUmVuZGVyZXIob3B0aW9ucykge1xuICByZXR1cm4gYmFzZUNyZWF0ZVJlbmRlcmVyKG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gY3JlYXRlSHlkcmF0aW9uUmVuZGVyZXIob3B0aW9ucykge1xuICByZXR1cm4gYmFzZUNyZWF0ZVJlbmRlcmVyKG9wdGlvbnMsIGNyZWF0ZUh5ZHJhdGlvbkZ1bmN0aW9ucyk7XG59XG5mdW5jdGlvbiBiYXNlQ3JlYXRlUmVuZGVyZXIob3B0aW9ucywgY3JlYXRlSHlkcmF0aW9uRm5zKSB7XG4gIHtcbiAgICBpbml0RmVhdHVyZUZsYWdzKCk7XG4gIH1cbiAgY29uc3QgdGFyZ2V0ID0gZ2V0R2xvYmFsVGhpcygpO1xuICB0YXJnZXQuX19WVUVfXyA9IHRydWU7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgIHNldERldnRvb2xzSG9vayQxKHRhcmdldC5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fLCB0YXJnZXQpO1xuICB9XG4gIGNvbnN0IHtcbiAgICBpbnNlcnQ6IGhvc3RJbnNlcnQsXG4gICAgcmVtb3ZlOiBob3N0UmVtb3ZlLFxuICAgIHBhdGNoUHJvcDogaG9zdFBhdGNoUHJvcCxcbiAgICBjcmVhdGVFbGVtZW50OiBob3N0Q3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVUZXh0OiBob3N0Q3JlYXRlVGV4dCxcbiAgICBjcmVhdGVDb21tZW50OiBob3N0Q3JlYXRlQ29tbWVudCxcbiAgICBzZXRUZXh0OiBob3N0U2V0VGV4dCxcbiAgICBzZXRFbGVtZW50VGV4dDogaG9zdFNldEVsZW1lbnRUZXh0LFxuICAgIHBhcmVudE5vZGU6IGhvc3RQYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBob3N0TmV4dFNpYmxpbmcsXG4gICAgc2V0U2NvcGVJZDogaG9zdFNldFNjb3BlSWQgPSBOT09QLFxuICAgIGluc2VydFN0YXRpY0NvbnRlbnQ6IGhvc3RJbnNlcnRTdGF0aWNDb250ZW50XG4gIH0gPSBvcHRpb25zO1xuICBjb25zdCBwYXRjaCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yID0gbnVsbCwgcGFyZW50Q29tcG9uZW50ID0gbnVsbCwgcGFyZW50U3VzcGVuc2UgPSBudWxsLCBuYW1lc3BhY2UgPSB2b2lkIDAsIHNsb3RTY29wZUlkcyA9IG51bGwsIG9wdGltaXplZCA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNIbXJVcGRhdGluZyA/IGZhbHNlIDogISFuMi5keW5hbWljQ2hpbGRyZW4pID0+IHtcbiAgICBpZiAobjEgPT09IG4yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChuMSAmJiAhaXNTYW1lVk5vZGVUeXBlKG4xLCBuMikpIHtcbiAgICAgIGFuY2hvciA9IGdldE5leHRIb3N0Tm9kZShuMSk7XG4gICAgICB1bm1vdW50KG4xLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCB0cnVlKTtcbiAgICAgIG4xID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKG4yLnBhdGNoRmxhZyA9PT0gLTIpIHtcbiAgICAgIG9wdGltaXplZCA9IGZhbHNlO1xuICAgICAgbjIuZHluYW1pY0NoaWxkcmVuID0gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyB0eXBlLCByZWYsIHNoYXBlRmxhZyB9ID0gbjI7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFRleHQ6XG4gICAgICAgIHByb2Nlc3NUZXh0KG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29tbWVudDpcbiAgICAgICAgcHJvY2Vzc0NvbW1lbnROb2RlKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RhdGljOlxuICAgICAgICBpZiAobjEgPT0gbnVsbCkge1xuICAgICAgICAgIG1vdW50U3RhdGljTm9kZShuMiwgY29udGFpbmVyLCBhbmNob3IsIG5hbWVzcGFjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHBhdGNoU3RhdGljTm9kZShuMSwgbjIsIGNvbnRhaW5lciwgbmFtZXNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRnJhZ21lbnQ6XG4gICAgICAgIHByb2Nlc3NGcmFnbWVudChcbiAgICAgICAgICBuMSxcbiAgICAgICAgICBuMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChzaGFwZUZsYWcgJiAxKSB7XG4gICAgICAgICAgcHJvY2Vzc0VsZW1lbnQoXG4gICAgICAgICAgICBuMSxcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHNoYXBlRmxhZyAmIDYpIHtcbiAgICAgICAgICBwcm9jZXNzQ29tcG9uZW50KFxuICAgICAgICAgICAgbjEsXG4gICAgICAgICAgICBuMixcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGFwZUZsYWcgJiA2NCkge1xuICAgICAgICAgIHR5cGUucHJvY2VzcyhcbiAgICAgICAgICAgIG4xLFxuICAgICAgICAgICAgbjIsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBhbmNob3IsXG4gICAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICAgIG9wdGltaXplZCxcbiAgICAgICAgICAgIGludGVybmFsc1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICAgICAgdHlwZS5wcm9jZXNzKFxuICAgICAgICAgICAgbjEsXG4gICAgICAgICAgICBuMixcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkLFxuICAgICAgICAgICAgaW50ZXJuYWxzXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgd2FybiQxKFwiSW52YWxpZCBWTm9kZSB0eXBlOlwiLCB0eXBlLCBgKCR7dHlwZW9mIHR5cGV9KWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChyZWYgIT0gbnVsbCAmJiBwYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIHNldFJlZihyZWYsIG4xICYmIG4xLnJlZiwgcGFyZW50U3VzcGVuc2UsIG4yIHx8IG4xLCAhbjIpO1xuICAgIH0gZWxzZSBpZiAocmVmID09IG51bGwgJiYgbjEgJiYgbjEucmVmICE9IG51bGwpIHtcbiAgICAgIHNldFJlZihuMS5yZWYsIG51bGwsIHBhcmVudFN1c3BlbnNlLCBuMSwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBwcm9jZXNzVGV4dCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yKSA9PiB7XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIGhvc3RJbnNlcnQoXG4gICAgICAgIG4yLmVsID0gaG9zdENyZWF0ZVRleHQobjIuY2hpbGRyZW4pLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIGFuY2hvclxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZWwgPSBuMi5lbCA9IG4xLmVsO1xuICAgICAgaWYgKG4yLmNoaWxkcmVuICE9PSBuMS5jaGlsZHJlbikge1xuICAgICAgICBob3N0U2V0VGV4dChlbCwgbjIuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0NvbW1lbnROb2RlID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IpID0+IHtcbiAgICBpZiAobjEgPT0gbnVsbCkge1xuICAgICAgaG9zdEluc2VydChcbiAgICAgICAgbjIuZWwgPSBob3N0Q3JlYXRlQ29tbWVudChuMi5jaGlsZHJlbiB8fCBcIlwiKSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3JcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3VudFN0YXRpY05vZGUgPSAobjIsIGNvbnRhaW5lciwgYW5jaG9yLCBuYW1lc3BhY2UpID0+IHtcbiAgICBbbjIuZWwsIG4yLmFuY2hvcl0gPSBob3N0SW5zZXJ0U3RhdGljQ29udGVudChcbiAgICAgIG4yLmNoaWxkcmVuLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgYW5jaG9yLFxuICAgICAgbmFtZXNwYWNlLFxuICAgICAgbjIuZWwsXG4gICAgICBuMi5hbmNob3JcbiAgICApO1xuICB9O1xuICBjb25zdCBwYXRjaFN0YXRpY05vZGUgPSAobjEsIG4yLCBjb250YWluZXIsIG5hbWVzcGFjZSkgPT4ge1xuICAgIGlmIChuMi5jaGlsZHJlbiAhPT0gbjEuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGFuY2hvciA9IGhvc3ROZXh0U2libGluZyhuMS5hbmNob3IpO1xuICAgICAgcmVtb3ZlU3RhdGljTm9kZShuMSk7XG4gICAgICBbbjIuZWwsIG4yLmFuY2hvcl0gPSBob3N0SW5zZXJ0U3RhdGljQ29udGVudChcbiAgICAgICAgbjIuY2hpbGRyZW4sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBuYW1lc3BhY2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG4yLmVsID0gbjEuZWw7XG4gICAgICBuMi5hbmNob3IgPSBuMS5hbmNob3I7XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3ZlU3RhdGljTm9kZSA9ICh7IGVsLCBhbmNob3IgfSwgY29udGFpbmVyLCBuZXh0U2libGluZykgPT4ge1xuICAgIGxldCBuZXh0O1xuICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gYW5jaG9yKSB7XG4gICAgICBuZXh0ID0gaG9zdE5leHRTaWJsaW5nKGVsKTtcbiAgICAgIGhvc3RJbnNlcnQoZWwsIGNvbnRhaW5lciwgbmV4dFNpYmxpbmcpO1xuICAgICAgZWwgPSBuZXh0O1xuICAgIH1cbiAgICBob3N0SW5zZXJ0KGFuY2hvciwgY29udGFpbmVyLCBuZXh0U2libGluZyk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZVN0YXRpY05vZGUgPSAoeyBlbCwgYW5jaG9yIH0pID0+IHtcbiAgICBsZXQgbmV4dDtcbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGFuY2hvcikge1xuICAgICAgbmV4dCA9IGhvc3ROZXh0U2libGluZyhlbCk7XG4gICAgICBob3N0UmVtb3ZlKGVsKTtcbiAgICAgIGVsID0gbmV4dDtcbiAgICB9XG4gICAgaG9zdFJlbW92ZShhbmNob3IpO1xuICB9O1xuICBjb25zdCBwcm9jZXNzRWxlbWVudCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgaWYgKG4yLnR5cGUgPT09IFwic3ZnXCIpIHtcbiAgICAgIG5hbWVzcGFjZSA9IFwic3ZnXCI7XG4gICAgfSBlbHNlIGlmIChuMi50eXBlID09PSBcIm1hdGhcIikge1xuICAgICAgbmFtZXNwYWNlID0gXCJtYXRobWxcIjtcbiAgICB9XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIG1vdW50RWxlbWVudChcbiAgICAgICAgbjIsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRjaEVsZW1lbnQoXG4gICAgICAgIG4xLFxuICAgICAgICBuMixcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgIG9wdGltaXplZFxuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IG1vdW50RWxlbWVudCA9ICh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQpID0+IHtcbiAgICBsZXQgZWw7XG4gICAgbGV0IHZub2RlSG9vaztcbiAgICBjb25zdCB7IHByb3BzLCBzaGFwZUZsYWcsIHRyYW5zaXRpb24sIGRpcnMgfSA9IHZub2RlO1xuICAgIGVsID0gdm5vZGUuZWwgPSBob3N0Q3JlYXRlRWxlbWVudChcbiAgICAgIHZub2RlLnR5cGUsXG4gICAgICBuYW1lc3BhY2UsXG4gICAgICBwcm9wcyAmJiBwcm9wcy5pcyxcbiAgICAgIHByb3BzXG4gICAgKTtcbiAgICBpZiAoc2hhcGVGbGFnICYgOCkge1xuICAgICAgaG9zdFNldEVsZW1lbnRUZXh0KGVsLCB2bm9kZS5jaGlsZHJlbik7XG4gICAgfSBlbHNlIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgbW91bnRDaGlsZHJlbihcbiAgICAgICAgdm5vZGUuY2hpbGRyZW4sXG4gICAgICAgIGVsLFxuICAgICAgICBudWxsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICByZXNvbHZlQ2hpbGRyZW5OYW1lc3BhY2Uodm5vZGUsIG5hbWVzcGFjZSksXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZGlycykge1xuICAgICAgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcImNyZWF0ZWRcIik7XG4gICAgfVxuICAgIHNldFNjb3BlSWQoZWwsIHZub2RlLCB2bm9kZS5zY29wZUlkLCBzbG90U2NvcGVJZHMsIHBhcmVudENvbXBvbmVudCk7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICBpZiAoa2V5ICE9PSBcInZhbHVlXCIgJiYgIWlzUmVzZXJ2ZWRQcm9wKGtleSkpIHtcbiAgICAgICAgICBob3N0UGF0Y2hQcm9wKGVsLCBrZXksIG51bGwsIHByb3BzW2tleV0sIG5hbWVzcGFjZSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFwidmFsdWVcIiBpbiBwcm9wcykge1xuICAgICAgICBob3N0UGF0Y2hQcm9wKGVsLCBcInZhbHVlXCIsIG51bGwsIHByb3BzLnZhbHVlLCBuYW1lc3BhY2UpO1xuICAgICAgfVxuICAgICAgaWYgKHZub2RlSG9vayA9IHByb3BzLm9uVm5vZGVCZWZvcmVNb3VudCkge1xuICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICBkZWYoZWwsIFwiX192bm9kZVwiLCB2bm9kZSwgdHJ1ZSk7XG4gICAgICBkZWYoZWwsIFwiX192dWVQYXJlbnRDb21wb25lbnRcIiwgcGFyZW50Q29tcG9uZW50LCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKGRpcnMpIHtcbiAgICAgIGludm9rZURpcmVjdGl2ZUhvb2sodm5vZGUsIG51bGwsIHBhcmVudENvbXBvbmVudCwgXCJiZWZvcmVNb3VudFwiKTtcbiAgICB9XG4gICAgY29uc3QgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgPSBuZWVkVHJhbnNpdGlvbihwYXJlbnRTdXNwZW5zZSwgdHJhbnNpdGlvbik7XG4gICAgaWYgKG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzKSB7XG4gICAgICB0cmFuc2l0aW9uLmJlZm9yZUVudGVyKGVsKTtcbiAgICB9XG4gICAgaG9zdEluc2VydChlbCwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgIGlmICgodm5vZGVIb29rID0gcHJvcHMgJiYgcHJvcHMub25Wbm9kZU1vdW50ZWQpIHx8IG5lZWRDYWxsVHJhbnNpdGlvbkhvb2tzIHx8IGRpcnMpIHtcbiAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHZub2RlSG9vayAmJiBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIHZub2RlKTtcbiAgICAgICAgbmVlZENhbGxUcmFuc2l0aW9uSG9va3MgJiYgdHJhbnNpdGlvbi5lbnRlcihlbCk7XG4gICAgICAgIGRpcnMgJiYgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcIm1vdW50ZWRcIik7XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBzZXRTY29wZUlkID0gKGVsLCB2bm9kZSwgc2NvcGVJZCwgc2xvdFNjb3BlSWRzLCBwYXJlbnRDb21wb25lbnQpID0+IHtcbiAgICBpZiAoc2NvcGVJZCkge1xuICAgICAgaG9zdFNldFNjb3BlSWQoZWwsIHNjb3BlSWQpO1xuICAgIH1cbiAgICBpZiAoc2xvdFNjb3BlSWRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsb3RTY29wZUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBob3N0U2V0U2NvcGVJZChlbCwgc2xvdFNjb3BlSWRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmVudENvbXBvbmVudCkge1xuICAgICAgbGV0IHN1YlRyZWUgPSBwYXJlbnRDb21wb25lbnQuc3ViVHJlZTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHN1YlRyZWUucGF0Y2hGbGFnID4gMCAmJiBzdWJUcmVlLnBhdGNoRmxhZyAmIDIwNDgpIHtcbiAgICAgICAgc3ViVHJlZSA9IGZpbHRlclNpbmdsZVJvb3Qoc3ViVHJlZS5jaGlsZHJlbikgfHwgc3ViVHJlZTtcbiAgICAgIH1cbiAgICAgIGlmICh2bm9kZSA9PT0gc3ViVHJlZSB8fCBpc1N1c3BlbnNlKHN1YlRyZWUudHlwZSkgJiYgKHN1YlRyZWUuc3NDb250ZW50ID09PSB2bm9kZSB8fCBzdWJUcmVlLnNzRmFsbGJhY2sgPT09IHZub2RlKSkge1xuICAgICAgICBjb25zdCBwYXJlbnRWTm9kZSA9IHBhcmVudENvbXBvbmVudC52bm9kZTtcbiAgICAgICAgc2V0U2NvcGVJZChcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBwYXJlbnRWTm9kZSxcbiAgICAgICAgICBwYXJlbnRWTm9kZS5zY29wZUlkLFxuICAgICAgICAgIHBhcmVudFZOb2RlLnNsb3RTY29wZUlkcyxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQucGFyZW50XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3VudENoaWxkcmVuID0gKGNoaWxkcmVuLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCwgc3RhcnQgPSAwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjaGlsZHJlbltpXSkgOiBub3JtYWxpemVWTm9kZShjaGlsZHJlbltpXSk7XG4gICAgICBwYXRjaChcbiAgICAgICAgbnVsbCxcbiAgICAgICAgY2hpbGQsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgcGF0Y2hFbGVtZW50ID0gKG4xLCBuMiwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGVsID0gbjIuZWwgPSBuMS5lbDtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgIGVsLl9fdm5vZGUgPSBuMjtcbiAgICB9XG4gICAgbGV0IHsgcGF0Y2hGbGFnLCBkeW5hbWljQ2hpbGRyZW4sIGRpcnMgfSA9IG4yO1xuICAgIHBhdGNoRmxhZyB8PSBuMS5wYXRjaEZsYWcgJiAxNjtcbiAgICBjb25zdCBvbGRQcm9wcyA9IG4xLnByb3BzIHx8IEVNUFRZX09CSjtcbiAgICBjb25zdCBuZXdQcm9wcyA9IG4yLnByb3BzIHx8IEVNUFRZX09CSjtcbiAgICBsZXQgdm5vZGVIb29rO1xuICAgIHBhcmVudENvbXBvbmVudCAmJiB0b2dnbGVSZWN1cnNlKHBhcmVudENvbXBvbmVudCwgZmFsc2UpO1xuICAgIGlmICh2bm9kZUhvb2sgPSBuZXdQcm9wcy5vblZub2RlQmVmb3JlVXBkYXRlKSB7XG4gICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnRDb21wb25lbnQsIG4yLCBuMSk7XG4gICAgfVxuICAgIGlmIChkaXJzKSB7XG4gICAgICBpbnZva2VEaXJlY3RpdmVIb29rKG4yLCBuMSwgcGFyZW50Q29tcG9uZW50LCBcImJlZm9yZVVwZGF0ZVwiKTtcbiAgICB9XG4gICAgcGFyZW50Q29tcG9uZW50ICYmIHRvZ2dsZVJlY3Vyc2UocGFyZW50Q29tcG9uZW50LCB0cnVlKTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBpc0htclVwZGF0aW5nKSB7XG4gICAgICBwYXRjaEZsYWcgPSAwO1xuICAgICAgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgICBkeW5hbWljQ2hpbGRyZW4gPSBudWxsO1xuICAgIH1cbiAgICBpZiAob2xkUHJvcHMuaW5uZXJIVE1MICYmIG5ld1Byb3BzLmlubmVySFRNTCA9PSBudWxsIHx8IG9sZFByb3BzLnRleHRDb250ZW50ICYmIG5ld1Byb3BzLnRleHRDb250ZW50ID09IG51bGwpIHtcbiAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChlbCwgXCJcIik7XG4gICAgfVxuICAgIGlmIChkeW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgIHBhdGNoQmxvY2tDaGlsZHJlbihcbiAgICAgICAgbjEuZHluYW1pY0NoaWxkcmVuLFxuICAgICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICAgIGVsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICByZXNvbHZlQ2hpbGRyZW5OYW1lc3BhY2UobjIsIG5hbWVzcGFjZSksXG4gICAgICAgIHNsb3RTY29wZUlkc1xuICAgICAgKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHRyYXZlcnNlU3RhdGljQ2hpbGRyZW4objEsIG4yKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFvcHRpbWl6ZWQpIHtcbiAgICAgIHBhdGNoQ2hpbGRyZW4oXG4gICAgICAgIG4xLFxuICAgICAgICBuMixcbiAgICAgICAgZWwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIHJlc29sdmVDaGlsZHJlbk5hbWVzcGFjZShuMiwgbmFtZXNwYWNlKSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHBhdGNoRmxhZyA+IDApIHtcbiAgICAgIGlmIChwYXRjaEZsYWcgJiAxNikge1xuICAgICAgICBwYXRjaFByb3BzKGVsLCBvbGRQcm9wcywgbmV3UHJvcHMsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXRjaEZsYWcgJiAyKSB7XG4gICAgICAgICAgaWYgKG9sZFByb3BzLmNsYXNzICE9PSBuZXdQcm9wcy5jbGFzcykge1xuICAgICAgICAgICAgaG9zdFBhdGNoUHJvcChlbCwgXCJjbGFzc1wiLCBudWxsLCBuZXdQcm9wcy5jbGFzcywgbmFtZXNwYWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGNoRmxhZyAmIDQpIHtcbiAgICAgICAgICBob3N0UGF0Y2hQcm9wKGVsLCBcInN0eWxlXCIsIG9sZFByb3BzLnN0eWxlLCBuZXdQcm9wcy5zdHlsZSwgbmFtZXNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0Y2hGbGFnICYgOCkge1xuICAgICAgICAgIGNvbnN0IHByb3BzVG9VcGRhdGUgPSBuMi5keW5hbWljUHJvcHM7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBwcm9wc1RvVXBkYXRlW2ldO1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IG9sZFByb3BzW2tleV07XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gbmV3UHJvcHNba2V5XTtcbiAgICAgICAgICAgIGlmIChuZXh0ICE9PSBwcmV2IHx8IGtleSA9PT0gXCJ2YWx1ZVwiKSB7XG4gICAgICAgICAgICAgIGhvc3RQYXRjaFByb3AoZWwsIGtleSwgcHJldiwgbmV4dCwgbmFtZXNwYWNlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhdGNoRmxhZyAmIDEpIHtcbiAgICAgICAgaWYgKG4xLmNoaWxkcmVuICE9PSBuMi5jaGlsZHJlbikge1xuICAgICAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChlbCwgbjIuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghb3B0aW1pemVkICYmIGR5bmFtaWNDaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICBwYXRjaFByb3BzKGVsLCBvbGRQcm9wcywgbmV3UHJvcHMsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlKTtcbiAgICB9XG4gICAgaWYgKCh2bm9kZUhvb2sgPSBuZXdQcm9wcy5vblZub2RlVXBkYXRlZCkgfHwgZGlycykge1xuICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KCgpID0+IHtcbiAgICAgICAgdm5vZGVIb29rICYmIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudENvbXBvbmVudCwgbjIsIG4xKTtcbiAgICAgICAgZGlycyAmJiBpbnZva2VEaXJlY3RpdmVIb29rKG4yLCBuMSwgcGFyZW50Q29tcG9uZW50LCBcInVwZGF0ZWRcIik7XG4gICAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBwYXRjaEJsb2NrQ2hpbGRyZW4gPSAob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuLCBmYWxsYmFja0NvbnRhaW5lciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvbGRWTm9kZSA9IG9sZENoaWxkcmVuW2ldO1xuICAgICAgY29uc3QgbmV3Vk5vZGUgPSBuZXdDaGlsZHJlbltpXTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IChcbiAgICAgICAgLy8gb2xkVk5vZGUgbWF5IGJlIGFuIGVycm9yZWQgYXN5bmMgc2V0dXAoKSBjb21wb25lbnQgaW5zaWRlIFN1c3BlbnNlXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgbm90IGhhdmUgYSBtb3VudGVkIGVsZW1lbnRcbiAgICAgICAgb2xkVk5vZGUuZWwgJiYgLy8gLSBJbiB0aGUgY2FzZSBvZiBhIEZyYWdtZW50LCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGFjdHVhbCBwYXJlbnRcbiAgICAgICAgLy8gb2YgdGhlIEZyYWdtZW50IGl0c2VsZiBzbyBpdCBjYW4gbW92ZSBpdHMgY2hpbGRyZW4uXG4gICAgICAgIChvbGRWTm9kZS50eXBlID09PSBGcmFnbWVudCB8fCAvLyAtIEluIHRoZSBjYXNlIG9mIGRpZmZlcmVudCBub2RlcywgdGhlcmUgaXMgZ29pbmcgdG8gYmUgYSByZXBsYWNlbWVudFxuICAgICAgICAvLyB3aGljaCBhbHNvIHJlcXVpcmVzIHRoZSBjb3JyZWN0IHBhcmVudCBjb250YWluZXJcbiAgICAgICAgIWlzU2FtZVZOb2RlVHlwZShvbGRWTm9kZSwgbmV3Vk5vZGUpIHx8IC8vIC0gSW4gdGhlIGNhc2Ugb2YgYSBjb21wb25lbnQsIGl0IGNvdWxkIGNvbnRhaW4gYW55dGhpbmcuXG4gICAgICAgIG9sZFZOb2RlLnNoYXBlRmxhZyAmICg2IHwgNjQgfCAxMjgpKSA/IGhvc3RQYXJlbnROb2RlKG9sZFZOb2RlLmVsKSA6IChcbiAgICAgICAgICAvLyBJbiBvdGhlciBjYXNlcywgdGhlIHBhcmVudCBjb250YWluZXIgaXMgbm90IGFjdHVhbGx5IHVzZWQgc28gd2VcbiAgICAgICAgICAvLyBqdXN0IHBhc3MgdGhlIGJsb2NrIGVsZW1lbnQgaGVyZSB0byBhdm9pZCBhIERPTSBwYXJlbnROb2RlIGNhbGwuXG4gICAgICAgICAgZmFsbGJhY2tDb250YWluZXJcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHBhdGNoKFxuICAgICAgICBvbGRWTm9kZSxcbiAgICAgICAgbmV3Vk5vZGUsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9O1xuICBjb25zdCBwYXRjaFByb3BzID0gKGVsLCBvbGRQcm9wcywgbmV3UHJvcHMsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlKSA9PiB7XG4gICAgaWYgKG9sZFByb3BzICE9PSBuZXdQcm9wcykge1xuICAgICAgaWYgKG9sZFByb3BzICE9PSBFTVBUWV9PQkopIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgICBpZiAoIWlzUmVzZXJ2ZWRQcm9wKGtleSkgJiYgIShrZXkgaW4gbmV3UHJvcHMpKSB7XG4gICAgICAgICAgICBob3N0UGF0Y2hQcm9wKFxuICAgICAgICAgICAgICBlbCxcbiAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICBvbGRQcm9wc1trZXldLFxuICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICAgIHBhcmVudENvbXBvbmVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5ld1Byb3BzKSB7XG4gICAgICAgIGlmIChpc1Jlc2VydmVkUHJvcChrZXkpKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgbmV4dCA9IG5ld1Byb3BzW2tleV07XG4gICAgICAgIGNvbnN0IHByZXYgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAobmV4dCAhPT0gcHJldiAmJiBrZXkgIT09IFwidmFsdWVcIikge1xuICAgICAgICAgIGhvc3RQYXRjaFByb3AoZWwsIGtleSwgcHJldiwgbmV4dCwgbmFtZXNwYWNlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIG5ld1Byb3BzKSB7XG4gICAgICAgIGhvc3RQYXRjaFByb3AoZWwsIFwidmFsdWVcIiwgb2xkUHJvcHMudmFsdWUsIG5ld1Byb3BzLnZhbHVlLCBuYW1lc3BhY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0ZyYWdtZW50ID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQpID0+IHtcbiAgICBjb25zdCBmcmFnbWVudFN0YXJ0QW5jaG9yID0gbjIuZWwgPSBuMSA/IG4xLmVsIDogaG9zdENyZWF0ZVRleHQoXCJcIik7XG4gICAgY29uc3QgZnJhZ21lbnRFbmRBbmNob3IgPSBuMi5hbmNob3IgPSBuMSA/IG4xLmFuY2hvciA6IGhvc3RDcmVhdGVUZXh0KFwiXCIpO1xuICAgIGxldCB7IHBhdGNoRmxhZywgZHluYW1pY0NoaWxkcmVuLCBzbG90U2NvcGVJZHM6IGZyYWdtZW50U2xvdFNjb3BlSWRzIH0gPSBuMjtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAvLyAjNTUyMyBkZXYgcm9vdCBmcmFnbWVudCBtYXkgaW5oZXJpdCBkaXJlY3RpdmVzXG4gICAgKGlzSG1yVXBkYXRpbmcgfHwgcGF0Y2hGbGFnICYgMjA0OCkpIHtcbiAgICAgIHBhdGNoRmxhZyA9IDA7XG4gICAgICBvcHRpbWl6ZWQgPSBmYWxzZTtcbiAgICAgIGR5bmFtaWNDaGlsZHJlbiA9IG51bGw7XG4gICAgfVxuICAgIGlmIChmcmFnbWVudFNsb3RTY29wZUlkcykge1xuICAgICAgc2xvdFNjb3BlSWRzID0gc2xvdFNjb3BlSWRzID8gc2xvdFNjb3BlSWRzLmNvbmNhdChmcmFnbWVudFNsb3RTY29wZUlkcykgOiBmcmFnbWVudFNsb3RTY29wZUlkcztcbiAgICB9XG4gICAgaWYgKG4xID09IG51bGwpIHtcbiAgICAgIGhvc3RJbnNlcnQoZnJhZ21lbnRTdGFydEFuY2hvciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgaG9zdEluc2VydChmcmFnbWVudEVuZEFuY2hvciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgbW91bnRDaGlsZHJlbihcbiAgICAgICAgLy8gIzEwMDA3XG4gICAgICAgIC8vIHN1Y2ggZnJhZ21lbnQgbGlrZSBgPD48Lz5gIHdpbGwgYmUgY29tcGlsZWQgaW50b1xuICAgICAgICAvLyBhIGZyYWdtZW50IHdoaWNoIGRvZXNuJ3QgaGF2ZSBhIGNoaWxkcmVuLlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2UgZmFsbGJhY2sgdG8gYW4gZW1wdHkgYXJyYXlcbiAgICAgICAgbjIuY2hpbGRyZW4gfHwgW10sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgZnJhZ21lbnRFbmRBbmNob3IsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXRjaEZsYWcgPiAwICYmIHBhdGNoRmxhZyAmIDY0ICYmIGR5bmFtaWNDaGlsZHJlbiAmJiAvLyAjMjcxNSB0aGUgcHJldmlvdXMgZnJhZ21lbnQgY291bGQndmUgYmVlbiBhIEJBSUxlZCBvbmUgYXMgYSByZXN1bHRcbiAgICAgIC8vIG9mIHJlbmRlclNsb3QoKSB3aXRoIG5vIHZhbGlkIGNoaWxkcmVuXG4gICAgICBuMS5keW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgICAgcGF0Y2hCbG9ja0NoaWxkcmVuKFxuICAgICAgICAgIG4xLmR5bmFtaWNDaGlsZHJlbixcbiAgICAgICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzXG4gICAgICAgICk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgdHJhdmVyc2VTdGF0aWNDaGlsZHJlbihuMSwgbjIpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIC8vICMyMDgwIGlmIHRoZSBzdGFibGUgZnJhZ21lbnQgaGFzIGEga2V5LCBpdCdzIGEgPHRlbXBsYXRlIHYtZm9yPiB0aGF0IG1heVxuICAgICAgICAgIC8vICBnZXQgbW92ZWQgYXJvdW5kLiBNYWtlIHN1cmUgYWxsIHJvb3QgbGV2ZWwgdm5vZGVzIGluaGVyaXQgZWwuXG4gICAgICAgICAgLy8gIzIxMzQgb3IgaWYgaXQncyBhIGNvbXBvbmVudCByb290LCBpdCBtYXkgYWxzbyBnZXQgbW92ZWQgYXJvdW5kXG4gICAgICAgICAgLy8gYXMgdGhlIGNvbXBvbmVudCBpcyBiZWluZyBtb3ZlZC5cbiAgICAgICAgICBuMi5rZXkgIT0gbnVsbCB8fCBwYXJlbnRDb21wb25lbnQgJiYgbjIgPT09IHBhcmVudENvbXBvbmVudC5zdWJUcmVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRyYXZlcnNlU3RhdGljQ2hpbGRyZW4oXG4gICAgICAgICAgICBuMSxcbiAgICAgICAgICAgIG4yLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgLyogc2hhbGxvdyAqL1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGNoQ2hpbGRyZW4oXG4gICAgICAgICAgbjEsXG4gICAgICAgICAgbjIsXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIGZyYWdtZW50RW5kQW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0NvbXBvbmVudCA9IChuMSwgbjIsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgbjIuc2xvdFNjb3BlSWRzID0gc2xvdFNjb3BlSWRzO1xuICAgIGlmIChuMSA9PSBudWxsKSB7XG4gICAgICBpZiAobjIuc2hhcGVGbGFnICYgNTEyKSB7XG4gICAgICAgIHBhcmVudENvbXBvbmVudC5jdHguYWN0aXZhdGUoXG4gICAgICAgICAgbjIsXG4gICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3VudENvbXBvbmVudChcbiAgICAgICAgICBuMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUNvbXBvbmVudChuMSwgbjIsIG9wdGltaXplZCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3VudENvbXBvbmVudCA9IChpbml0aWFsVk5vZGUsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gKGluaXRpYWxWTm9kZS5jb21wb25lbnQgPSBjcmVhdGVDb21wb25lbnRJbnN0YW5jZShcbiAgICAgIGluaXRpYWxWTm9kZSxcbiAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgIHBhcmVudFN1c3BlbnNlXG4gICAgKSk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaW5zdGFuY2UudHlwZS5fX2htcklkKSB7XG4gICAgICByZWdpc3RlckhNUihpbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBwdXNoV2FybmluZ0NvbnRleHQoaW5pdGlhbFZOb2RlKTtcbiAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYG1vdW50YCk7XG4gICAgfVxuICAgIGlmIChpc0tlZXBBbGl2ZShpbml0aWFsVk5vZGUpKSB7XG4gICAgICBpbnN0YW5jZS5jdHgucmVuZGVyZXIgPSBpbnRlcm5hbHM7XG4gICAgfVxuICAgIHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYGluaXRgKTtcbiAgICAgIH1cbiAgICAgIHNldHVwQ29tcG9uZW50KGluc3RhbmNlLCBmYWxzZSwgb3B0aW1pemVkKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGBpbml0YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGlzSG1yVXBkYXRpbmcpIGluaXRpYWxWTm9kZS5lbCA9IG51bGw7XG4gICAgaWYgKGluc3RhbmNlLmFzeW5jRGVwKSB7XG4gICAgICBwYXJlbnRTdXNwZW5zZSAmJiBwYXJlbnRTdXNwZW5zZS5yZWdpc3RlckRlcChpbnN0YW5jZSwgc2V0dXBSZW5kZXJFZmZlY3QsIG9wdGltaXplZCk7XG4gICAgICBpZiAoIWluaXRpYWxWTm9kZS5lbCkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGluc3RhbmNlLnN1YlRyZWUgPSBjcmVhdGVWTm9kZShDb21tZW50KTtcbiAgICAgICAgcHJvY2Vzc0NvbW1lbnROb2RlKG51bGwsIHBsYWNlaG9sZGVyLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICAgIGluaXRpYWxWTm9kZS5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyLmVsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXR1cFJlbmRlckVmZmVjdChcbiAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgIGluaXRpYWxWTm9kZSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIG9wdGltaXplZFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHBvcFdhcm5pbmdDb250ZXh0KCk7XG4gICAgICBlbmRNZWFzdXJlKGluc3RhbmNlLCBgbW91bnRgKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZUNvbXBvbmVudCA9IChuMSwgbjIsIG9wdGltaXplZCkgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbjIuY29tcG9uZW50ID0gbjEuY29tcG9uZW50O1xuICAgIGlmIChzaG91bGRVcGRhdGVDb21wb25lbnQobjEsIG4yLCBvcHRpbWl6ZWQpKSB7XG4gICAgICBpZiAoaW5zdGFuY2UuYXN5bmNEZXAgJiYgIWluc3RhbmNlLmFzeW5jUmVzb2x2ZWQpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBwdXNoV2FybmluZ0NvbnRleHQobjIpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudFByZVJlbmRlcihpbnN0YW5jZSwgbjIsIG9wdGltaXplZCk7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgcG9wV2FybmluZ0NvbnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0YW5jZS5uZXh0ID0gbjI7XG4gICAgICAgIGluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuMi5lbCA9IG4xLmVsO1xuICAgICAgaW5zdGFuY2Uudm5vZGUgPSBuMjtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHNldHVwUmVuZGVyRWZmZWN0ID0gKGluc3RhbmNlLCBpbml0aWFsVk5vZGUsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBvcHRpbWl6ZWQpID0+IHtcbiAgICBjb25zdCBjb21wb25lbnRVcGRhdGVGbiA9ICgpID0+IHtcbiAgICAgIGlmICghaW5zdGFuY2UuaXNNb3VudGVkKSB7XG4gICAgICAgIGxldCB2bm9kZUhvb2s7XG4gICAgICAgIGNvbnN0IHsgZWwsIHByb3BzIH0gPSBpbml0aWFsVk5vZGU7XG4gICAgICAgIGNvbnN0IHsgYm0sIG0sIHBhcmVudCwgcm9vdCwgdHlwZSB9ID0gaW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IGlzQXN5bmNXcmFwcGVyVk5vZGUgPSBpc0FzeW5jV3JhcHBlcihpbml0aWFsVk5vZGUpO1xuICAgICAgICB0b2dnbGVSZWN1cnNlKGluc3RhbmNlLCBmYWxzZSk7XG4gICAgICAgIGlmIChibSkge1xuICAgICAgICAgIGludm9rZUFycmF5Rm5zKGJtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQXN5bmNXcmFwcGVyVk5vZGUgJiYgKHZub2RlSG9vayA9IHByb3BzICYmIHByb3BzLm9uVm5vZGVCZWZvcmVNb3VudCkpIHtcbiAgICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnQsIGluaXRpYWxWTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlUmVjdXJzZShpbnN0YW5jZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbCAmJiBoeWRyYXRlTm9kZSkge1xuICAgICAgICAgIGNvbnN0IGh5ZHJhdGVTdWJUcmVlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgICAgc3RhcnRNZWFzdXJlKGluc3RhbmNlLCBgcmVuZGVyYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZS5zdWJUcmVlID0gcmVuZGVyQ29tcG9uZW50Um9vdChpbnN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgICBlbmRNZWFzdXJlKGluc3RhbmNlLCBgcmVuZGVyYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgICAgICBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIGBoeWRyYXRlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoeWRyYXRlTm9kZShcbiAgICAgICAgICAgICAgZWwsXG4gICAgICAgICAgICAgIGluc3RhbmNlLnN1YlRyZWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGBoeWRyYXRlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoaXNBc3luY1dyYXBwZXJWTm9kZSAmJiB0eXBlLl9fYXN5bmNIeWRyYXRlKSB7XG4gICAgICAgICAgICB0eXBlLl9fYXN5bmNIeWRyYXRlKFxuICAgICAgICAgICAgICBlbCxcbiAgICAgICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgICAgIGh5ZHJhdGVTdWJUcmVlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoeWRyYXRlU3ViVHJlZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocm9vdC5jZSAmJiAvLyBAdHMtZXhwZWN0LWVycm9yIF9kZWYgaXMgcHJpdmF0ZVxuICAgICAgICAgIHJvb3QuY2UuX2RlZi5zaGFkb3dSb290ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgcm9vdC5jZS5faW5qZWN0Q2hpbGRTdHlsZSh0eXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgIHN0YXJ0TWVhc3VyZShpbnN0YW5jZSwgYHJlbmRlcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzdWJUcmVlID0gaW5zdGFuY2Uuc3ViVHJlZSA9IHJlbmRlckNvbXBvbmVudFJvb3QoaW5zdGFuY2UpO1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICBlbmRNZWFzdXJlKGluc3RhbmNlLCBgcmVuZGVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIGBwYXRjaGApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXRjaChcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBzdWJUcmVlLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGBwYXRjaGApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbml0aWFsVk5vZGUuZWwgPSBzdWJUcmVlLmVsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KG0sIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQXN5bmNXcmFwcGVyVk5vZGUgJiYgKHZub2RlSG9vayA9IHByb3BzICYmIHByb3BzLm9uVm5vZGVNb3VudGVkKSkge1xuICAgICAgICAgIGNvbnN0IHNjb3BlZEluaXRpYWxWTm9kZSA9IGluaXRpYWxWTm9kZTtcbiAgICAgICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoXG4gICAgICAgICAgICAoKSA9PiBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnQsIHNjb3BlZEluaXRpYWxWTm9kZSksXG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluaXRpYWxWTm9kZS5zaGFwZUZsYWcgJiAyNTYgfHwgcGFyZW50ICYmIGlzQXN5bmNXcmFwcGVyKHBhcmVudC52bm9kZSkgJiYgcGFyZW50LnZub2RlLnNoYXBlRmxhZyAmIDI1Nikge1xuICAgICAgICAgIGluc3RhbmNlLmEgJiYgcXVldWVQb3N0UmVuZGVyRWZmZWN0KGluc3RhbmNlLmEsIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS5pc01vdW50ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgICBkZXZ0b29sc0NvbXBvbmVudEFkZGVkKGluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpbml0aWFsVk5vZGUgPSBjb250YWluZXIgPSBhbmNob3IgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHsgbmV4dCwgYnUsIHUsIHBhcmVudCwgdm5vZGUgfSA9IGluc3RhbmNlO1xuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgbm9uSHlkcmF0ZWRBc3luY1Jvb3QgPSBsb2NhdGVOb25IeWRyYXRlZEFzeW5jUm9vdChpbnN0YW5jZSk7XG4gICAgICAgICAgaWYgKG5vbkh5ZHJhdGVkQXN5bmNSb290KSB7XG4gICAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgICBuZXh0LmVsID0gdm5vZGUuZWw7XG4gICAgICAgICAgICAgIHVwZGF0ZUNvbXBvbmVudFByZVJlbmRlcihpbnN0YW5jZSwgbmV4dCwgb3B0aW1pemVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vbkh5ZHJhdGVkQXN5bmNSb290LmFzeW5jRGVwLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlLmlzVW5tb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50VXBkYXRlRm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBvcmlnaW5OZXh0ID0gbmV4dDtcbiAgICAgICAgbGV0IHZub2RlSG9vaztcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBwdXNoV2FybmluZ0NvbnRleHQobmV4dCB8fCBpbnN0YW5jZS52bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlUmVjdXJzZShpbnN0YW5jZSwgZmFsc2UpO1xuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIG5leHQuZWwgPSB2bm9kZS5lbDtcbiAgICAgICAgICB1cGRhdGVDb21wb25lbnRQcmVSZW5kZXIoaW5zdGFuY2UsIG5leHQsIG9wdGltaXplZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCA9IHZub2RlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidSkge1xuICAgICAgICAgIGludm9rZUFycmF5Rm5zKGJ1KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodm5vZGVIb29rID0gbmV4dC5wcm9wcyAmJiBuZXh0LnByb3BzLm9uVm5vZGVCZWZvcmVVcGRhdGUpIHtcbiAgICAgICAgICBpbnZva2VWTm9kZUhvb2sodm5vZGVIb29rLCBwYXJlbnQsIG5leHQsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0b2dnbGVSZWN1cnNlKGluc3RhbmNlLCB0cnVlKTtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIGByZW5kZXJgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0VHJlZSA9IHJlbmRlckNvbXBvbmVudFJvb3QoaW5zdGFuY2UpO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGByZW5kZXJgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2VHJlZSA9IGluc3RhbmNlLnN1YlRyZWU7XG4gICAgICAgIGluc3RhbmNlLnN1YlRyZWUgPSBuZXh0VHJlZTtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIGBwYXRjaGApO1xuICAgICAgICB9XG4gICAgICAgIHBhdGNoKFxuICAgICAgICAgIHByZXZUcmVlLFxuICAgICAgICAgIG5leHRUcmVlLFxuICAgICAgICAgIC8vIHBhcmVudCBtYXkgaGF2ZSBjaGFuZ2VkIGlmIGl0J3MgaW4gYSB0ZWxlcG9ydFxuICAgICAgICAgIGhvc3RQYXJlbnROb2RlKHByZXZUcmVlLmVsKSxcbiAgICAgICAgICAvLyBhbmNob3IgbWF5IGhhdmUgY2hhbmdlZCBpZiBpdCdzIGluIGEgZnJhZ21lbnRcbiAgICAgICAgICBnZXROZXh0SG9zdE5vZGUocHJldlRyZWUpLFxuICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgIG5hbWVzcGFjZVxuICAgICAgICApO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGBwYXRjaGApO1xuICAgICAgICB9XG4gICAgICAgIG5leHQuZWwgPSBuZXh0VHJlZS5lbDtcbiAgICAgICAgaWYgKG9yaWdpbk5leHQgPT09IG51bGwpIHtcbiAgICAgICAgICB1cGRhdGVIT0NIb3N0RWwoaW5zdGFuY2UsIG5leHRUcmVlLmVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodSkge1xuICAgICAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCh1LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZub2RlSG9vayA9IG5leHQucHJvcHMgJiYgbmV4dC5wcm9wcy5vblZub2RlVXBkYXRlZCkge1xuICAgICAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdChcbiAgICAgICAgICAgICgpID0+IGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudCwgbmV4dCwgdm5vZGUpLFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2VcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgIGRldnRvb2xzQ29tcG9uZW50VXBkYXRlZChpbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBwb3BXYXJuaW5nQ29udGV4dCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBpbnN0YW5jZS5zY29wZS5vbigpO1xuICAgIGNvbnN0IGVmZmVjdCA9IGluc3RhbmNlLmVmZmVjdCA9IG5ldyBSZWFjdGl2ZUVmZmVjdChjb21wb25lbnRVcGRhdGVGbik7XG4gICAgaW5zdGFuY2Uuc2NvcGUub2ZmKCk7XG4gICAgY29uc3QgdXBkYXRlID0gaW5zdGFuY2UudXBkYXRlID0gZWZmZWN0LnJ1bi5iaW5kKGVmZmVjdCk7XG4gICAgY29uc3Qgam9iID0gaW5zdGFuY2Uuam9iID0gZWZmZWN0LnJ1bklmRGlydHkuYmluZChlZmZlY3QpO1xuICAgIGpvYi5pID0gaW5zdGFuY2U7XG4gICAgam9iLmlkID0gaW5zdGFuY2UudWlkO1xuICAgIGVmZmVjdC5zY2hlZHVsZXIgPSAoKSA9PiBxdWV1ZUpvYihqb2IpO1xuICAgIHRvZ2dsZVJlY3Vyc2UoaW5zdGFuY2UsIHRydWUpO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBlZmZlY3Qub25UcmFjayA9IGluc3RhbmNlLnJ0YyA/IChlKSA9PiBpbnZva2VBcnJheUZucyhpbnN0YW5jZS5ydGMsIGUpIDogdm9pZCAwO1xuICAgICAgZWZmZWN0Lm9uVHJpZ2dlciA9IGluc3RhbmNlLnJ0ZyA/IChlKSA9PiBpbnZva2VBcnJheUZucyhpbnN0YW5jZS5ydGcsIGUpIDogdm9pZCAwO1xuICAgIH1cbiAgICB1cGRhdGUoKTtcbiAgfTtcbiAgY29uc3QgdXBkYXRlQ29tcG9uZW50UHJlUmVuZGVyID0gKGluc3RhbmNlLCBuZXh0Vk5vZGUsIG9wdGltaXplZCkgPT4ge1xuICAgIG5leHRWTm9kZS5jb21wb25lbnQgPSBpbnN0YW5jZTtcbiAgICBjb25zdCBwcmV2UHJvcHMgPSBpbnN0YW5jZS52bm9kZS5wcm9wcztcbiAgICBpbnN0YW5jZS52bm9kZSA9IG5leHRWTm9kZTtcbiAgICBpbnN0YW5jZS5uZXh0ID0gbnVsbDtcbiAgICB1cGRhdGVQcm9wcyhpbnN0YW5jZSwgbmV4dFZOb2RlLnByb3BzLCBwcmV2UHJvcHMsIG9wdGltaXplZCk7XG4gICAgdXBkYXRlU2xvdHMoaW5zdGFuY2UsIG5leHRWTm9kZS5jaGlsZHJlbiwgb3B0aW1pemVkKTtcbiAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgZmx1c2hQcmVGbHVzaENicyhpbnN0YW5jZSk7XG4gICAgcmVzZXRUcmFja2luZygpO1xuICB9O1xuICBjb25zdCBwYXRjaENoaWxkcmVuID0gKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIG5hbWVzcGFjZSwgc2xvdFNjb3BlSWRzLCBvcHRpbWl6ZWQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IGMxID0gbjEgJiYgbjEuY2hpbGRyZW47XG4gICAgY29uc3QgcHJldlNoYXBlRmxhZyA9IG4xID8gbjEuc2hhcGVGbGFnIDogMDtcbiAgICBjb25zdCBjMiA9IG4yLmNoaWxkcmVuO1xuICAgIGNvbnN0IHsgcGF0Y2hGbGFnLCBzaGFwZUZsYWcgfSA9IG4yO1xuICAgIGlmIChwYXRjaEZsYWcgPiAwKSB7XG4gICAgICBpZiAocGF0Y2hGbGFnICYgMTI4KSB7XG4gICAgICAgIHBhdGNoS2V5ZWRDaGlsZHJlbihcbiAgICAgICAgICBjMSxcbiAgICAgICAgICBjMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHBhdGNoRmxhZyAmIDI1Nikge1xuICAgICAgICBwYXRjaFVua2V5ZWRDaGlsZHJlbihcbiAgICAgICAgICBjMSxcbiAgICAgICAgICBjMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaGFwZUZsYWcgJiA4KSB7XG4gICAgICBpZiAocHJldlNoYXBlRmxhZyAmIDE2KSB7XG4gICAgICAgIHVubW91bnRDaGlsZHJlbihjMSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgICB9XG4gICAgICBpZiAoYzIgIT09IGMxKSB7XG4gICAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChjb250YWluZXIsIGMyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByZXZTaGFwZUZsYWcgJiAxNikge1xuICAgICAgICBpZiAoc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgICAgICBwYXRjaEtleWVkQ2hpbGRyZW4oXG4gICAgICAgICAgICBjMSxcbiAgICAgICAgICAgIGMyLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVubW91bnRDaGlsZHJlbihjMSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2U2hhcGVGbGFnICYgOCkge1xuICAgICAgICAgIGhvc3RTZXRFbGVtZW50VGV4dChjb250YWluZXIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFwZUZsYWcgJiAxNikge1xuICAgICAgICAgIG1vdW50Q2hpbGRyZW4oXG4gICAgICAgICAgICBjMixcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcGF0Y2hVbmtleWVkQ2hpbGRyZW4gPSAoYzEsIGMyLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCkgPT4ge1xuICAgIGMxID0gYzEgfHwgRU1QVFlfQVJSO1xuICAgIGMyID0gYzIgfHwgRU1QVFlfQVJSO1xuICAgIGNvbnN0IG9sZExlbmd0aCA9IGMxLmxlbmd0aDtcbiAgICBjb25zdCBuZXdMZW5ndGggPSBjMi5sZW5ndGg7XG4gICAgY29uc3QgY29tbW9uTGVuZ3RoID0gTWF0aC5taW4ob2xkTGVuZ3RoLCBuZXdMZW5ndGgpO1xuICAgIGxldCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb21tb25MZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbmV4dENoaWxkID0gYzJbaV0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjMltpXSkgOiBub3JtYWxpemVWTm9kZShjMltpXSk7XG4gICAgICBwYXRjaChcbiAgICAgICAgYzFbaV0sXG4gICAgICAgIG5leHRDaGlsZCxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBudWxsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAob2xkTGVuZ3RoID4gbmV3TGVuZ3RoKSB7XG4gICAgICB1bm1vdW50Q2hpbGRyZW4oXG4gICAgICAgIGMxLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICB0cnVlLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgY29tbW9uTGVuZ3RoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3VudENoaWxkcmVuKFxuICAgICAgICBjMixcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWQsXG4gICAgICAgIGNvbW1vbkxlbmd0aFxuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHBhdGNoS2V5ZWRDaGlsZHJlbiA9IChjMSwgYzIsIGNvbnRhaW5lciwgcGFyZW50QW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IGwyID0gYzIubGVuZ3RoO1xuICAgIGxldCBlMSA9IGMxLmxlbmd0aCAtIDE7XG4gICAgbGV0IGUyID0gbDIgLSAxO1xuICAgIHdoaWxlIChpIDw9IGUxICYmIGkgPD0gZTIpIHtcbiAgICAgIGNvbnN0IG4xID0gYzFbaV07XG4gICAgICBjb25zdCBuMiA9IGMyW2ldID0gb3B0aW1pemVkID8gY2xvbmVJZk1vdW50ZWQoYzJbaV0pIDogbm9ybWFsaXplVk5vZGUoYzJbaV0pO1xuICAgICAgaWYgKGlzU2FtZVZOb2RlVHlwZShuMSwgbjIpKSB7XG4gICAgICAgIHBhdGNoKFxuICAgICAgICAgIG4xLFxuICAgICAgICAgIG4yLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgIG9wdGltaXplZFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHdoaWxlIChpIDw9IGUxICYmIGkgPD0gZTIpIHtcbiAgICAgIGNvbnN0IG4xID0gYzFbZTFdO1xuICAgICAgY29uc3QgbjIgPSBjMltlMl0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjMltlMl0pIDogbm9ybWFsaXplVk5vZGUoYzJbZTJdKTtcbiAgICAgIGlmIChpc1NhbWVWTm9kZVR5cGUobjEsIG4yKSkge1xuICAgICAgICBwYXRjaChcbiAgICAgICAgICBuMSxcbiAgICAgICAgICBuMixcbiAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZTEtLTtcbiAgICAgIGUyLS07XG4gICAgfVxuICAgIGlmIChpID4gZTEpIHtcbiAgICAgIGlmIChpIDw9IGUyKSB7XG4gICAgICAgIGNvbnN0IG5leHRQb3MgPSBlMiArIDE7XG4gICAgICAgIGNvbnN0IGFuY2hvciA9IG5leHRQb3MgPCBsMiA/IGMyW25leHRQb3NdLmVsIDogcGFyZW50QW5jaG9yO1xuICAgICAgICB3aGlsZSAoaSA8PSBlMikge1xuICAgICAgICAgIHBhdGNoKFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGMyW2ldID0gb3B0aW1pemVkID8gY2xvbmVJZk1vdW50ZWQoYzJbaV0pIDogbm9ybWFsaXplVk5vZGUoYzJbaV0pLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaSA+IGUyKSB7XG4gICAgICB3aGlsZSAoaSA8PSBlMSkge1xuICAgICAgICB1bm1vdW50KGMxW2ldLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCB0cnVlKTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzMSA9IGk7XG4gICAgICBjb25zdCBzMiA9IGk7XG4gICAgICBjb25zdCBrZXlUb05ld0luZGV4TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICAgIGZvciAoaSA9IHMyOyBpIDw9IGUyOyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV4dENoaWxkID0gYzJbaV0gPSBvcHRpbWl6ZWQgPyBjbG9uZUlmTW91bnRlZChjMltpXSkgOiBub3JtYWxpemVWTm9kZShjMltpXSk7XG4gICAgICAgIGlmIChuZXh0Q2hpbGQua2V5ICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBrZXlUb05ld0luZGV4TWFwLmhhcyhuZXh0Q2hpbGQua2V5KSkge1xuICAgICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgICBgRHVwbGljYXRlIGtleXMgZm91bmQgZHVyaW5nIHVwZGF0ZTpgLFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShuZXh0Q2hpbGQua2V5KSxcbiAgICAgICAgICAgICAgYE1ha2Ugc3VyZSBrZXlzIGFyZSB1bmlxdWUuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5VG9OZXdJbmRleE1hcC5zZXQobmV4dENoaWxkLmtleSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBqO1xuICAgICAgbGV0IHBhdGNoZWQgPSAwO1xuICAgICAgY29uc3QgdG9CZVBhdGNoZWQgPSBlMiAtIHMyICsgMTtcbiAgICAgIGxldCBtb3ZlZCA9IGZhbHNlO1xuICAgICAgbGV0IG1heE5ld0luZGV4U29GYXIgPSAwO1xuICAgICAgY29uc3QgbmV3SW5kZXhUb09sZEluZGV4TWFwID0gbmV3IEFycmF5KHRvQmVQYXRjaGVkKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0b0JlUGF0Y2hlZDsgaSsrKSBuZXdJbmRleFRvT2xkSW5kZXhNYXBbaV0gPSAwO1xuICAgICAgZm9yIChpID0gczE7IGkgPD0gZTE7IGkrKykge1xuICAgICAgICBjb25zdCBwcmV2Q2hpbGQgPSBjMVtpXTtcbiAgICAgICAgaWYgKHBhdGNoZWQgPj0gdG9CZVBhdGNoZWQpIHtcbiAgICAgICAgICB1bm1vdW50KHByZXZDaGlsZCwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgdHJ1ZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0luZGV4O1xuICAgICAgICBpZiAocHJldkNoaWxkLmtleSAhPSBudWxsKSB7XG4gICAgICAgICAgbmV3SW5kZXggPSBrZXlUb05ld0luZGV4TWFwLmdldChwcmV2Q2hpbGQua2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGogPSBzMjsgaiA8PSBlMjsgaisrKSB7XG4gICAgICAgICAgICBpZiAobmV3SW5kZXhUb09sZEluZGV4TWFwW2ogLSBzMl0gPT09IDAgJiYgaXNTYW1lVk5vZGVUeXBlKHByZXZDaGlsZCwgYzJbal0pKSB7XG4gICAgICAgICAgICAgIG5ld0luZGV4ID0gajtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdJbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgdW5tb3VudChwcmV2Q2hpbGQsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0luZGV4VG9PbGRJbmRleE1hcFtuZXdJbmRleCAtIHMyXSA9IGkgKyAxO1xuICAgICAgICAgIGlmIChuZXdJbmRleCA+PSBtYXhOZXdJbmRleFNvRmFyKSB7XG4gICAgICAgICAgICBtYXhOZXdJbmRleFNvRmFyID0gbmV3SW5kZXg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICBwcmV2Q2hpbGQsXG4gICAgICAgICAgICBjMltuZXdJbmRleF0sXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHBhdGNoZWQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaW5jcmVhc2luZ05ld0luZGV4U2VxdWVuY2UgPSBtb3ZlZCA/IGdldFNlcXVlbmNlKG5ld0luZGV4VG9PbGRJbmRleE1hcCkgOiBFTVBUWV9BUlI7XG4gICAgICBqID0gaW5jcmVhc2luZ05ld0luZGV4U2VxdWVuY2UubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IHRvQmVQYXRjaGVkIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gczIgKyBpO1xuICAgICAgICBjb25zdCBuZXh0Q2hpbGQgPSBjMltuZXh0SW5kZXhdO1xuICAgICAgICBjb25zdCBhbmNob3JWTm9kZSA9IGMyW25leHRJbmRleCArIDFdO1xuICAgICAgICBjb25zdCBhbmNob3IgPSBuZXh0SW5kZXggKyAxIDwgbDIgPyAoXG4gICAgICAgICAgLy8gIzEzNTU5LCBmYWxsYmFjayB0byBlbCBwbGFjZWhvbGRlciBmb3IgdW5yZXNvbHZlZCBhc3luYyBjb21wb25lbnRcbiAgICAgICAgICBhbmNob3JWTm9kZS5lbCB8fCBhbmNob3JWTm9kZS5wbGFjZWhvbGRlclxuICAgICAgICApIDogcGFyZW50QW5jaG9yO1xuICAgICAgICBpZiAobmV3SW5kZXhUb09sZEluZGV4TWFwW2ldID09PSAwKSB7XG4gICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgbmV4dENoaWxkLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKG1vdmVkKSB7XG4gICAgICAgICAgaWYgKGogPCAwIHx8IGkgIT09IGluY3JlYXNpbmdOZXdJbmRleFNlcXVlbmNlW2pdKSB7XG4gICAgICAgICAgICBtb3ZlKG5leHRDaGlsZCwgY29udGFpbmVyLCBhbmNob3IsIDIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqLS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb25zdCBtb3ZlID0gKHZub2RlLCBjb250YWluZXIsIGFuY2hvciwgbW92ZVR5cGUsIHBhcmVudFN1c3BlbnNlID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IHsgZWwsIHR5cGUsIHRyYW5zaXRpb24sIGNoaWxkcmVuLCBzaGFwZUZsYWcgfSA9IHZub2RlO1xuICAgIGlmIChzaGFwZUZsYWcgJiA2KSB7XG4gICAgICBtb3ZlKHZub2RlLmNvbXBvbmVudC5zdWJUcmVlLCBjb250YWluZXIsIGFuY2hvciwgbW92ZVR5cGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICB2bm9kZS5zdXNwZW5zZS5tb3ZlKGNvbnRhaW5lciwgYW5jaG9yLCBtb3ZlVHlwZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzaGFwZUZsYWcgJiA2NCkge1xuICAgICAgdHlwZS5tb3ZlKHZub2RlLCBjb250YWluZXIsIGFuY2hvciwgaW50ZXJuYWxzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IEZyYWdtZW50KSB7XG4gICAgICBob3N0SW5zZXJ0KGVsLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1vdmUoY2hpbGRyZW5baV0sIGNvbnRhaW5lciwgYW5jaG9yLCBtb3ZlVHlwZSk7XG4gICAgICB9XG4gICAgICBob3N0SW5zZXJ0KHZub2RlLmFuY2hvciwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU3RhdGljKSB7XG4gICAgICBtb3ZlU3RhdGljTm9kZSh2bm9kZSwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZWVkVHJhbnNpdGlvbjIgPSBtb3ZlVHlwZSAhPT0gMiAmJiBzaGFwZUZsYWcgJiAxICYmIHRyYW5zaXRpb247XG4gICAgaWYgKG5lZWRUcmFuc2l0aW9uMikge1xuICAgICAgaWYgKG1vdmVUeXBlID09PSAwKSB7XG4gICAgICAgIHRyYW5zaXRpb24uYmVmb3JlRW50ZXIoZWwpO1xuICAgICAgICBob3N0SW5zZXJ0KGVsLCBjb250YWluZXIsIGFuY2hvcik7XG4gICAgICAgIHF1ZXVlUG9zdFJlbmRlckVmZmVjdCgoKSA9PiB0cmFuc2l0aW9uLmVudGVyKGVsKSwgcGFyZW50U3VzcGVuc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgeyBsZWF2ZSwgZGVsYXlMZWF2ZSwgYWZ0ZXJMZWF2ZSB9ID0gdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcmVtb3ZlMiA9ICgpID0+IHtcbiAgICAgICAgICBpZiAodm5vZGUuY3R4LmlzVW5tb3VudGVkKSB7XG4gICAgICAgICAgICBob3N0UmVtb3ZlKGVsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9zdEluc2VydChlbCwgY29udGFpbmVyLCBhbmNob3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcGVyZm9ybUxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChlbC5faXNMZWF2aW5nKSB7XG4gICAgICAgICAgICBlbFtsZWF2ZUNiS2V5XShcbiAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAvKiBjYW5jZWxsZWQgKi9cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxlYXZlKGVsLCAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmUyKCk7XG4gICAgICAgICAgICBhZnRlckxlYXZlICYmIGFmdGVyTGVhdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRlbGF5TGVhdmUpIHtcbiAgICAgICAgICBkZWxheUxlYXZlKGVsLCByZW1vdmUyLCBwZXJmb3JtTGVhdmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlcmZvcm1MZWF2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvc3RJbnNlcnQoZWwsIGNvbnRhaW5lciwgYW5jaG9yKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVubW91bnQgPSAodm5vZGUsIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIGRvUmVtb3ZlID0gZmFsc2UsIG9wdGltaXplZCA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgdHlwZSxcbiAgICAgIHByb3BzLFxuICAgICAgcmVmLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBkeW5hbWljQ2hpbGRyZW4sXG4gICAgICBzaGFwZUZsYWcsXG4gICAgICBwYXRjaEZsYWcsXG4gICAgICBkaXJzLFxuICAgICAgY2FjaGVJbmRleFxuICAgIH0gPSB2bm9kZTtcbiAgICBpZiAocGF0Y2hGbGFnID09PSAtMikge1xuICAgICAgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChyZWYgIT0gbnVsbCkge1xuICAgICAgcGF1c2VUcmFja2luZygpO1xuICAgICAgc2V0UmVmKHJlZiwgbnVsbCwgcGFyZW50U3VzcGVuc2UsIHZub2RlLCB0cnVlKTtcbiAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICB9XG4gICAgaWYgKGNhY2hlSW5kZXggIT0gbnVsbCkge1xuICAgICAgcGFyZW50Q29tcG9uZW50LnJlbmRlckNhY2hlW2NhY2hlSW5kZXhdID0gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAoc2hhcGVGbGFnICYgMjU2KSB7XG4gICAgICBwYXJlbnRDb21wb25lbnQuY3R4LmRlYWN0aXZhdGUodm5vZGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzaG91bGRJbnZva2VEaXJzID0gc2hhcGVGbGFnICYgMSAmJiBkaXJzO1xuICAgIGNvbnN0IHNob3VsZEludm9rZVZub2RlSG9vayA9ICFpc0FzeW5jV3JhcHBlcih2bm9kZSk7XG4gICAgbGV0IHZub2RlSG9vaztcbiAgICBpZiAoc2hvdWxkSW52b2tlVm5vZGVIb29rICYmICh2bm9kZUhvb2sgPSBwcm9wcyAmJiBwcm9wcy5vblZub2RlQmVmb3JlVW5tb3VudCkpIHtcbiAgICAgIGludm9rZVZOb2RlSG9vayh2bm9kZUhvb2ssIHBhcmVudENvbXBvbmVudCwgdm5vZGUpO1xuICAgIH1cbiAgICBpZiAoc2hhcGVGbGFnICYgNikge1xuICAgICAgdW5tb3VudENvbXBvbmVudCh2bm9kZS5jb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBkb1JlbW92ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaGFwZUZsYWcgJiAxMjgpIHtcbiAgICAgICAgdm5vZGUuc3VzcGVuc2UudW5tb3VudChwYXJlbnRTdXNwZW5zZSwgZG9SZW1vdmUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoc2hvdWxkSW52b2tlRGlycykge1xuICAgICAgICBpbnZva2VEaXJlY3RpdmVIb29rKHZub2RlLCBudWxsLCBwYXJlbnRDb21wb25lbnQsIFwiYmVmb3JlVW5tb3VudFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaGFwZUZsYWcgJiA2NCkge1xuICAgICAgICB2bm9kZS50eXBlLnJlbW92ZShcbiAgICAgICAgICB2bm9kZSxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UsXG4gICAgICAgICAgaW50ZXJuYWxzLFxuICAgICAgICAgIGRvUmVtb3ZlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGR5bmFtaWNDaGlsZHJlbiAmJiAvLyAjNTE1NFxuICAgICAgLy8gd2hlbiB2LW9uY2UgaXMgdXNlZCBpbnNpZGUgYSBibG9jaywgc2V0QmxvY2tUcmFja2luZygtMSkgbWFya3MgdGhlXG4gICAgICAvLyBwYXJlbnQgYmxvY2sgd2l0aCBoYXNPbmNlOiB0cnVlXG4gICAgICAvLyBzbyB0aGF0IGl0IGRvZXNuJ3QgdGFrZSB0aGUgZmFzdCBwYXRoIGR1cmluZyB1bm1vdW50IC0gb3RoZXJ3aXNlXG4gICAgICAvLyBjb21wb25lbnRzIG5lc3RlZCBpbiB2LW9uY2UgYXJlIG5ldmVyIHVubW91bnRlZC5cbiAgICAgICFkeW5hbWljQ2hpbGRyZW4uaGFzT25jZSAmJiAvLyAjMTE1MzogZmFzdCBwYXRoIHNob3VsZCBub3QgYmUgdGFrZW4gZm9yIG5vbi1zdGFibGUgKHYtZm9yKSBmcmFnbWVudHNcbiAgICAgICh0eXBlICE9PSBGcmFnbWVudCB8fCBwYXRjaEZsYWcgPiAwICYmIHBhdGNoRmxhZyAmIDY0KSkge1xuICAgICAgICB1bm1vdW50Q2hpbGRyZW4oXG4gICAgICAgICAgZHluYW1pY0NoaWxkcmVuLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEZyYWdtZW50ICYmIHBhdGNoRmxhZyAmICgxMjggfCAyNTYpIHx8ICFvcHRpbWl6ZWQgJiYgc2hhcGVGbGFnICYgMTYpIHtcbiAgICAgICAgdW5tb3VudENoaWxkcmVuKGNoaWxkcmVuLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlKTtcbiAgICAgIH1cbiAgICAgIGlmIChkb1JlbW92ZSkge1xuICAgICAgICByZW1vdmUodm5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2hvdWxkSW52b2tlVm5vZGVIb29rICYmICh2bm9kZUhvb2sgPSBwcm9wcyAmJiBwcm9wcy5vblZub2RlVW5tb3VudGVkKSB8fCBzaG91bGRJbnZva2VEaXJzKSB7XG4gICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QoKCkgPT4ge1xuICAgICAgICB2bm9kZUhvb2sgJiYgaW52b2tlVk5vZGVIb29rKHZub2RlSG9vaywgcGFyZW50Q29tcG9uZW50LCB2bm9kZSk7XG4gICAgICAgIHNob3VsZEludm9rZURpcnMgJiYgaW52b2tlRGlyZWN0aXZlSG9vayh2bm9kZSwgbnVsbCwgcGFyZW50Q29tcG9uZW50LCBcInVubW91bnRlZFwiKTtcbiAgICAgIH0sIHBhcmVudFN1c3BlbnNlKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlbW92ZSA9ICh2bm9kZSkgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSwgZWwsIGFuY2hvciwgdHJhbnNpdGlvbiB9ID0gdm5vZGU7XG4gICAgaWYgKHR5cGUgPT09IEZyYWdtZW50KSB7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB2bm9kZS5wYXRjaEZsYWcgPiAwICYmIHZub2RlLnBhdGNoRmxhZyAmIDIwNDggJiYgdHJhbnNpdGlvbiAmJiAhdHJhbnNpdGlvbi5wZXJzaXN0ZWQpIHtcbiAgICAgICAgdm5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gQ29tbWVudCkge1xuICAgICAgICAgICAgaG9zdFJlbW92ZShjaGlsZC5lbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZShjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZUZyYWdtZW50KGVsLCBhbmNob3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU3RhdGljKSB7XG4gICAgICByZW1vdmVTdGF0aWNOb2RlKHZub2RlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGVyZm9ybVJlbW92ZSA9ICgpID0+IHtcbiAgICAgIGhvc3RSZW1vdmUoZWwpO1xuICAgICAgaWYgKHRyYW5zaXRpb24gJiYgIXRyYW5zaXRpb24ucGVyc2lzdGVkICYmIHRyYW5zaXRpb24uYWZ0ZXJMZWF2ZSkge1xuICAgICAgICB0cmFuc2l0aW9uLmFmdGVyTGVhdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICh2bm9kZS5zaGFwZUZsYWcgJiAxICYmIHRyYW5zaXRpb24gJiYgIXRyYW5zaXRpb24ucGVyc2lzdGVkKSB7XG4gICAgICBjb25zdCB7IGxlYXZlLCBkZWxheUxlYXZlIH0gPSB0cmFuc2l0aW9uO1xuICAgICAgY29uc3QgcGVyZm9ybUxlYXZlID0gKCkgPT4gbGVhdmUoZWwsIHBlcmZvcm1SZW1vdmUpO1xuICAgICAgaWYgKGRlbGF5TGVhdmUpIHtcbiAgICAgICAgZGVsYXlMZWF2ZSh2bm9kZS5lbCwgcGVyZm9ybVJlbW92ZSwgcGVyZm9ybUxlYXZlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBlcmZvcm1MZWF2ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwZXJmb3JtUmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICBjb25zdCByZW1vdmVGcmFnbWVudCA9IChjdXIsIGVuZCkgPT4ge1xuICAgIGxldCBuZXh0O1xuICAgIHdoaWxlIChjdXIgIT09IGVuZCkge1xuICAgICAgbmV4dCA9IGhvc3ROZXh0U2libGluZyhjdXIpO1xuICAgICAgaG9zdFJlbW92ZShjdXIpO1xuICAgICAgY3VyID0gbmV4dDtcbiAgICB9XG4gICAgaG9zdFJlbW92ZShlbmQpO1xuICB9O1xuICBjb25zdCB1bm1vdW50Q29tcG9uZW50ID0gKGluc3RhbmNlLCBwYXJlbnRTdXNwZW5zZSwgZG9SZW1vdmUpID0+IHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBpbnN0YW5jZS50eXBlLl9faG1ySWQpIHtcbiAgICAgIHVucmVnaXN0ZXJITVIoaW5zdGFuY2UpO1xuICAgIH1cbiAgICBjb25zdCB7IGJ1bSwgc2NvcGUsIGpvYiwgc3ViVHJlZSwgdW0sIG0sIGEgfSA9IGluc3RhbmNlO1xuICAgIGludmFsaWRhdGVNb3VudChtKTtcbiAgICBpbnZhbGlkYXRlTW91bnQoYSk7XG4gICAgaWYgKGJ1bSkge1xuICAgICAgaW52b2tlQXJyYXlGbnMoYnVtKTtcbiAgICB9XG4gICAgc2NvcGUuc3RvcCgpO1xuICAgIGlmIChqb2IpIHtcbiAgICAgIGpvYi5mbGFncyB8PSA4O1xuICAgICAgdW5tb3VudChzdWJUcmVlLCBpbnN0YW5jZSwgcGFyZW50U3VzcGVuc2UsIGRvUmVtb3ZlKTtcbiAgICB9XG4gICAgaWYgKHVtKSB7XG4gICAgICBxdWV1ZVBvc3RSZW5kZXJFZmZlY3QodW0sIHBhcmVudFN1c3BlbnNlKTtcbiAgICB9XG4gICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KCgpID0+IHtcbiAgICAgIGluc3RhbmNlLmlzVW5tb3VudGVkID0gdHJ1ZTtcbiAgICB9LCBwYXJlbnRTdXNwZW5zZSk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICBkZXZ0b29sc0NvbXBvbmVudFJlbW92ZWQoaW5zdGFuY2UpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgdW5tb3VudENoaWxkcmVuID0gKGNoaWxkcmVuLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBkb1JlbW92ZSA9IGZhbHNlLCBvcHRpbWl6ZWQgPSBmYWxzZSwgc3RhcnQgPSAwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHVubW91bnQoY2hpbGRyZW5baV0sIHBhcmVudENvbXBvbmVudCwgcGFyZW50U3VzcGVuc2UsIGRvUmVtb3ZlLCBvcHRpbWl6ZWQpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZ2V0TmV4dEhvc3ROb2RlID0gKHZub2RlKSA9PiB7XG4gICAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDYpIHtcbiAgICAgIHJldHVybiBnZXROZXh0SG9zdE5vZGUodm5vZGUuY29tcG9uZW50LnN1YlRyZWUpO1xuICAgIH1cbiAgICBpZiAodm5vZGUuc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICByZXR1cm4gdm5vZGUuc3VzcGVuc2UubmV4dCgpO1xuICAgIH1cbiAgICBjb25zdCBlbCA9IGhvc3ROZXh0U2libGluZyh2bm9kZS5hbmNob3IgfHwgdm5vZGUuZWwpO1xuICAgIGNvbnN0IHRlbGVwb3J0RW5kID0gZWwgJiYgZWxbVGVsZXBvcnRFbmRLZXldO1xuICAgIHJldHVybiB0ZWxlcG9ydEVuZCA/IGhvc3ROZXh0U2libGluZyh0ZWxlcG9ydEVuZCkgOiBlbDtcbiAgfTtcbiAgbGV0IGlzRmx1c2hpbmcgPSBmYWxzZTtcbiAgY29uc3QgcmVuZGVyID0gKHZub2RlLCBjb250YWluZXIsIG5hbWVzcGFjZSkgPT4ge1xuICAgIGlmICh2bm9kZSA9PSBudWxsKSB7XG4gICAgICBpZiAoY29udGFpbmVyLl92bm9kZSkge1xuICAgICAgICB1bm1vdW50KGNvbnRhaW5lci5fdm5vZGUsIG51bGwsIG51bGwsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXRjaChcbiAgICAgICAgY29udGFpbmVyLl92bm9kZSB8fCBudWxsLFxuICAgICAgICB2bm9kZSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICBuYW1lc3BhY2VcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnRhaW5lci5fdm5vZGUgPSB2bm9kZTtcbiAgICBpZiAoIWlzRmx1c2hpbmcpIHtcbiAgICAgIGlzRmx1c2hpbmcgPSB0cnVlO1xuICAgICAgZmx1c2hQcmVGbHVzaENicygpO1xuICAgICAgZmx1c2hQb3N0Rmx1c2hDYnMoKTtcbiAgICAgIGlzRmx1c2hpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGludGVybmFscyA9IHtcbiAgICBwOiBwYXRjaCxcbiAgICB1bTogdW5tb3VudCxcbiAgICBtOiBtb3ZlLFxuICAgIHI6IHJlbW92ZSxcbiAgICBtdDogbW91bnRDb21wb25lbnQsXG4gICAgbWM6IG1vdW50Q2hpbGRyZW4sXG4gICAgcGM6IHBhdGNoQ2hpbGRyZW4sXG4gICAgcGJjOiBwYXRjaEJsb2NrQ2hpbGRyZW4sXG4gICAgbjogZ2V0TmV4dEhvc3ROb2RlLFxuICAgIG86IG9wdGlvbnNcbiAgfTtcbiAgbGV0IGh5ZHJhdGU7XG4gIGxldCBoeWRyYXRlTm9kZTtcbiAgaWYgKGNyZWF0ZUh5ZHJhdGlvbkZucykge1xuICAgIFtoeWRyYXRlLCBoeWRyYXRlTm9kZV0gPSBjcmVhdGVIeWRyYXRpb25GbnMoXG4gICAgICBpbnRlcm5hbHNcbiAgICApO1xuICB9XG4gIHJldHVybiB7XG4gICAgcmVuZGVyLFxuICAgIGh5ZHJhdGUsXG4gICAgY3JlYXRlQXBwOiBjcmVhdGVBcHBBUEkocmVuZGVyLCBoeWRyYXRlKVxuICB9O1xufVxuZnVuY3Rpb24gcmVzb2x2ZUNoaWxkcmVuTmFtZXNwYWNlKHsgdHlwZSwgcHJvcHMgfSwgY3VycmVudE5hbWVzcGFjZSkge1xuICByZXR1cm4gY3VycmVudE5hbWVzcGFjZSA9PT0gXCJzdmdcIiAmJiB0eXBlID09PSBcImZvcmVpZ25PYmplY3RcIiB8fCBjdXJyZW50TmFtZXNwYWNlID09PSBcIm1hdGhtbFwiICYmIHR5cGUgPT09IFwiYW5ub3RhdGlvbi14bWxcIiAmJiBwcm9wcyAmJiBwcm9wcy5lbmNvZGluZyAmJiBwcm9wcy5lbmNvZGluZy5pbmNsdWRlcyhcImh0bWxcIikgPyB2b2lkIDAgOiBjdXJyZW50TmFtZXNwYWNlO1xufVxuZnVuY3Rpb24gdG9nZ2xlUmVjdXJzZSh7IGVmZmVjdCwgam9iIH0sIGFsbG93ZWQpIHtcbiAgaWYgKGFsbG93ZWQpIHtcbiAgICBlZmZlY3QuZmxhZ3MgfD0gMzI7XG4gICAgam9iLmZsYWdzIHw9IDQ7XG4gIH0gZWxzZSB7XG4gICAgZWZmZWN0LmZsYWdzICY9IC0zMztcbiAgICBqb2IuZmxhZ3MgJj0gLTU7XG4gIH1cbn1cbmZ1bmN0aW9uIG5lZWRUcmFuc2l0aW9uKHBhcmVudFN1c3BlbnNlLCB0cmFuc2l0aW9uKSB7XG4gIHJldHVybiAoIXBhcmVudFN1c3BlbnNlIHx8IHBhcmVudFN1c3BlbnNlICYmICFwYXJlbnRTdXNwZW5zZS5wZW5kaW5nQnJhbmNoKSAmJiB0cmFuc2l0aW9uICYmICF0cmFuc2l0aW9uLnBlcnNpc3RlZDtcbn1cbmZ1bmN0aW9uIHRyYXZlcnNlU3RhdGljQ2hpbGRyZW4objEsIG4yLCBzaGFsbG93ID0gZmFsc2UpIHtcbiAgY29uc3QgY2gxID0gbjEuY2hpbGRyZW47XG4gIGNvbnN0IGNoMiA9IG4yLmNoaWxkcmVuO1xuICBpZiAoaXNBcnJheShjaDEpICYmIGlzQXJyYXkoY2gyKSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2gxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjMSA9IGNoMVtpXTtcbiAgICAgIGxldCBjMiA9IGNoMltpXTtcbiAgICAgIGlmIChjMi5zaGFwZUZsYWcgJiAxICYmICFjMi5keW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGMyLnBhdGNoRmxhZyA8PSAwIHx8IGMyLnBhdGNoRmxhZyA9PT0gMzIpIHtcbiAgICAgICAgICBjMiA9IGNoMltpXSA9IGNsb25lSWZNb3VudGVkKGNoMltpXSk7XG4gICAgICAgICAgYzIuZWwgPSBjMS5lbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNoYWxsb3cgJiYgYzIucGF0Y2hGbGFnICE9PSAtMilcbiAgICAgICAgICB0cmF2ZXJzZVN0YXRpY0NoaWxkcmVuKGMxLCBjMik7XG4gICAgICB9XG4gICAgICBpZiAoYzIudHlwZSA9PT0gVGV4dCAmJiAvLyBhdm9pZCBjYWNoZWQgdGV4dCBub2RlcyByZXRhaW5pbmcgZGV0YWNoZWQgZG9tIG5vZGVzXG4gICAgICBjMi5wYXRjaEZsYWcgIT09IC0xKSB7XG4gICAgICAgIGMyLmVsID0gYzEuZWw7XG4gICAgICB9XG4gICAgICBpZiAoYzIudHlwZSA9PT0gQ29tbWVudCAmJiAhYzIuZWwpIHtcbiAgICAgICAgYzIuZWwgPSBjMS5lbDtcbiAgICAgIH1cbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIGMyLmVsICYmIChjMi5lbC5fX3Zub2RlID0gYzIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZ2V0U2VxdWVuY2UoYXJyKSB7XG4gIGNvbnN0IHAgPSBhcnIuc2xpY2UoKTtcbiAgY29uc3QgcmVzdWx0ID0gWzBdO1xuICBsZXQgaSwgaiwgdSwgdiwgYztcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgYXJySSA9IGFycltpXTtcbiAgICBpZiAoYXJySSAhPT0gMCkge1xuICAgICAgaiA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICBpZiAoYXJyW2pdIDwgYXJySSkge1xuICAgICAgICBwW2ldID0gajtcbiAgICAgICAgcmVzdWx0LnB1c2goaSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdSA9IDA7XG4gICAgICB2ID0gcmVzdWx0Lmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAodSA8IHYpIHtcbiAgICAgICAgYyA9IHUgKyB2ID4+IDE7XG4gICAgICAgIGlmIChhcnJbcmVzdWx0W2NdXSA8IGFyckkpIHtcbiAgICAgICAgICB1ID0gYyArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdiA9IGM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChhcnJJIDwgYXJyW3Jlc3VsdFt1XV0pIHtcbiAgICAgICAgaWYgKHUgPiAwKSB7XG4gICAgICAgICAgcFtpXSA9IHJlc3VsdFt1IC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W3VdID0gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdSA9IHJlc3VsdC5sZW5ndGg7XG4gIHYgPSByZXN1bHRbdSAtIDFdO1xuICB3aGlsZSAodS0tID4gMCkge1xuICAgIHJlc3VsdFt1XSA9IHY7XG4gICAgdiA9IHBbdl07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGxvY2F0ZU5vbkh5ZHJhdGVkQXN5bmNSb290KGluc3RhbmNlKSB7XG4gIGNvbnN0IHN1YkNvbXBvbmVudCA9IGluc3RhbmNlLnN1YlRyZWUuY29tcG9uZW50O1xuICBpZiAoc3ViQ29tcG9uZW50KSB7XG4gICAgaWYgKHN1YkNvbXBvbmVudC5hc3luY0RlcCAmJiAhc3ViQ29tcG9uZW50LmFzeW5jUmVzb2x2ZWQpIHtcbiAgICAgIHJldHVybiBzdWJDb21wb25lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb2NhdGVOb25IeWRyYXRlZEFzeW5jUm9vdChzdWJDb21wb25lbnQpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaW52YWxpZGF0ZU1vdW50KGhvb2tzKSB7XG4gIGlmIChob29rcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspXG4gICAgICBob29rc1tpXS5mbGFncyB8PSA4O1xuICB9XG59XG5cbmNvbnN0IHNzckNvbnRleHRLZXkgPSBTeW1ib2wuZm9yKFwidi1zY3hcIik7XG5jb25zdCB1c2VTU1JDb250ZXh0ID0gKCkgPT4ge1xuICB7XG4gICAgY29uc3QgY3R4ID0gaW5qZWN0KHNzckNvbnRleHRLZXkpO1xuICAgIGlmICghY3R4KSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4kMShcbiAgICAgICAgYFNlcnZlciByZW5kZXJpbmcgY29udGV4dCBub3QgcHJvdmlkZWQuIE1ha2Ugc3VyZSB0byBvbmx5IGNhbGwgdXNlU1NSQ29udGV4dCgpIGNvbmRpdGlvbmFsbHkgaW4gdGhlIHNlcnZlciBidWlsZC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY3R4O1xuICB9XG59O1xuXG5mdW5jdGlvbiB3YXRjaEVmZmVjdChlZmZlY3QsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRvV2F0Y2goZWZmZWN0LCBudWxsLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHdhdGNoUG9zdEVmZmVjdChlZmZlY3QsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRvV2F0Y2goXG4gICAgZWZmZWN0LFxuICAgIG51bGwsXG4gICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IGV4dGVuZCh7fSwgb3B0aW9ucywgeyBmbHVzaDogXCJwb3N0XCIgfSkgOiB7IGZsdXNoOiBcInBvc3RcIiB9XG4gICk7XG59XG5mdW5jdGlvbiB3YXRjaFN5bmNFZmZlY3QoZWZmZWN0LCBvcHRpb25zKSB7XG4gIHJldHVybiBkb1dhdGNoKFxuICAgIGVmZmVjdCxcbiAgICBudWxsLFxuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBleHRlbmQoe30sIG9wdGlvbnMsIHsgZmx1c2g6IFwic3luY1wiIH0pIDogeyBmbHVzaDogXCJzeW5jXCIgfVxuICApO1xufVxuZnVuY3Rpb24gd2F0Y2goc291cmNlLCBjYiwgb3B0aW9ucykge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaXNGdW5jdGlvbihjYikpIHtcbiAgICB3YXJuJDEoXG4gICAgICBgXFxgd2F0Y2goZm4sIG9wdGlvbnM/KVxcYCBzaWduYXR1cmUgaGFzIGJlZW4gbW92ZWQgdG8gYSBzZXBhcmF0ZSBBUEkuIFVzZSBcXGB3YXRjaEVmZmVjdChmbiwgb3B0aW9ucz8pXFxgIGluc3RlYWQuIFxcYHdhdGNoXFxgIG5vdyBvbmx5IHN1cHBvcnRzIFxcYHdhdGNoKHNvdXJjZSwgY2IsIG9wdGlvbnM/KSBzaWduYXR1cmUuYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGRvV2F0Y2goc291cmNlLCBjYiwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBkb1dhdGNoKHNvdXJjZSwgY2IsIG9wdGlvbnMgPSBFTVBUWV9PQkopIHtcbiAgY29uc3QgeyBpbW1lZGlhdGUsIGRlZXAsIGZsdXNoLCBvbmNlIH0gPSBvcHRpb25zO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhY2IpIHtcbiAgICBpZiAoaW1tZWRpYXRlICE9PSB2b2lkIDApIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYHdhdGNoKCkgXCJpbW1lZGlhdGVcIiBvcHRpb24gaXMgb25seSByZXNwZWN0ZWQgd2hlbiB1c2luZyB0aGUgd2F0Y2goc291cmNlLCBjYWxsYmFjaywgb3B0aW9ucz8pIHNpZ25hdHVyZS5gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZGVlcCAhPT0gdm9pZCAwKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGB3YXRjaCgpIFwiZGVlcFwiIG9wdGlvbiBpcyBvbmx5IHJlc3BlY3RlZCB3aGVuIHVzaW5nIHRoZSB3YXRjaChzb3VyY2UsIGNhbGxiYWNrLCBvcHRpb25zPykgc2lnbmF0dXJlLmBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChvbmNlICE9PSB2b2lkIDApIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYHdhdGNoKCkgXCJvbmNlXCIgb3B0aW9uIGlzIG9ubHkgcmVzcGVjdGVkIHdoZW4gdXNpbmcgdGhlIHdhdGNoKHNvdXJjZSwgY2FsbGJhY2ssIG9wdGlvbnM/KSBzaWduYXR1cmUuYFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgYmFzZVdhdGNoT3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSBiYXNlV2F0Y2hPcHRpb25zLm9uV2FybiA9IHdhcm4kMTtcbiAgY29uc3QgcnVuc0ltbWVkaWF0ZWx5ID0gY2IgJiYgaW1tZWRpYXRlIHx8ICFjYiAmJiBmbHVzaCAhPT0gXCJwb3N0XCI7XG4gIGxldCBzc3JDbGVhbnVwO1xuICBpZiAoaXNJblNTUkNvbXBvbmVudFNldHVwKSB7XG4gICAgaWYgKGZsdXNoID09PSBcInN5bmNcIikge1xuICAgICAgY29uc3QgY3R4ID0gdXNlU1NSQ29udGV4dCgpO1xuICAgICAgc3NyQ2xlYW51cCA9IGN0eC5fX3dhdGNoZXJIYW5kbGVzIHx8IChjdHguX193YXRjaGVySGFuZGxlcyA9IFtdKTtcbiAgICB9IGVsc2UgaWYgKCFydW5zSW1tZWRpYXRlbHkpIHtcbiAgICAgIGNvbnN0IHdhdGNoU3RvcEhhbmRsZSA9ICgpID0+IHtcbiAgICAgIH07XG4gICAgICB3YXRjaFN0b3BIYW5kbGUuc3RvcCA9IE5PT1A7XG4gICAgICB3YXRjaFN0b3BIYW5kbGUucmVzdW1lID0gTk9PUDtcbiAgICAgIHdhdGNoU3RvcEhhbmRsZS5wYXVzZSA9IE5PT1A7XG4gICAgICByZXR1cm4gd2F0Y2hTdG9wSGFuZGxlO1xuICAgIH1cbiAgfVxuICBjb25zdCBpbnN0YW5jZSA9IGN1cnJlbnRJbnN0YW5jZTtcbiAgYmFzZVdhdGNoT3B0aW9ucy5jYWxsID0gKGZuLCB0eXBlLCBhcmdzKSA9PiBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhmbiwgaW5zdGFuY2UsIHR5cGUsIGFyZ3MpO1xuICBsZXQgaXNQcmUgPSBmYWxzZTtcbiAgaWYgKGZsdXNoID09PSBcInBvc3RcIikge1xuICAgIGJhc2VXYXRjaE9wdGlvbnMuc2NoZWR1bGVyID0gKGpvYikgPT4ge1xuICAgICAgcXVldWVQb3N0UmVuZGVyRWZmZWN0KGpvYiwgaW5zdGFuY2UgJiYgaW5zdGFuY2Uuc3VzcGVuc2UpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoZmx1c2ggIT09IFwic3luY1wiKSB7XG4gICAgaXNQcmUgPSB0cnVlO1xuICAgIGJhc2VXYXRjaE9wdGlvbnMuc2NoZWR1bGVyID0gKGpvYiwgaXNGaXJzdFJ1bikgPT4ge1xuICAgICAgaWYgKGlzRmlyc3RSdW4pIHtcbiAgICAgICAgam9iKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUpvYihqb2IpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgYmFzZVdhdGNoT3B0aW9ucy5hdWdtZW50Sm9iID0gKGpvYikgPT4ge1xuICAgIGlmIChjYikge1xuICAgICAgam9iLmZsYWdzIHw9IDQ7XG4gICAgfVxuICAgIGlmIChpc1ByZSkge1xuICAgICAgam9iLmZsYWdzIHw9IDI7XG4gICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgam9iLmlkID0gaW5zdGFuY2UudWlkO1xuICAgICAgICBqb2IuaSA9IGluc3RhbmNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3Qgd2F0Y2hIYW5kbGUgPSB3YXRjaCQxKHNvdXJjZSwgY2IsIGJhc2VXYXRjaE9wdGlvbnMpO1xuICBpZiAoaXNJblNTUkNvbXBvbmVudFNldHVwKSB7XG4gICAgaWYgKHNzckNsZWFudXApIHtcbiAgICAgIHNzckNsZWFudXAucHVzaCh3YXRjaEhhbmRsZSk7XG4gICAgfSBlbHNlIGlmIChydW5zSW1tZWRpYXRlbHkpIHtcbiAgICAgIHdhdGNoSGFuZGxlKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3YXRjaEhhbmRsZTtcbn1cbmZ1bmN0aW9uIGluc3RhbmNlV2F0Y2goc291cmNlLCB2YWx1ZSwgb3B0aW9ucykge1xuICBjb25zdCBwdWJsaWNUaGlzID0gdGhpcy5wcm94eTtcbiAgY29uc3QgZ2V0dGVyID0gaXNTdHJpbmcoc291cmNlKSA/IHNvdXJjZS5pbmNsdWRlcyhcIi5cIikgPyBjcmVhdGVQYXRoR2V0dGVyKHB1YmxpY1RoaXMsIHNvdXJjZSkgOiAoKSA9PiBwdWJsaWNUaGlzW3NvdXJjZV0gOiBzb3VyY2UuYmluZChwdWJsaWNUaGlzLCBwdWJsaWNUaGlzKTtcbiAgbGV0IGNiO1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBjYiA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGNiID0gdmFsdWUuaGFuZGxlcjtcbiAgICBvcHRpb25zID0gdmFsdWU7XG4gIH1cbiAgY29uc3QgcmVzZXQgPSBzZXRDdXJyZW50SW5zdGFuY2UodGhpcyk7XG4gIGNvbnN0IHJlcyA9IGRvV2F0Y2goZ2V0dGVyLCBjYi5iaW5kKHB1YmxpY1RoaXMpLCBvcHRpb25zKTtcbiAgcmVzZXQoKTtcbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhdGhHZXR0ZXIoY3R4LCBwYXRoKSB7XG4gIGNvbnN0IHNlZ21lbnRzID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgbGV0IGN1ciA9IGN0eDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aCAmJiBjdXI7IGkrKykge1xuICAgICAgY3VyID0gY3VyW3NlZ21lbnRzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlTW9kZWwocHJvcHMsIG5hbWUsIG9wdGlvbnMgPSBFTVBUWV9PQkopIHtcbiAgY29uc3QgaSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaSkge1xuICAgIHdhcm4kMShgdXNlTW9kZWwoKSBjYWxsZWQgd2l0aG91dCBhY3RpdmUgaW5zdGFuY2UuYCk7XG4gICAgcmV0dXJuIHJlZigpO1xuICB9XG4gIGNvbnN0IGNhbWVsaXplZE5hbWUgPSBjYW1lbGl6ZShuYW1lKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWkucHJvcHNPcHRpb25zWzBdW2NhbWVsaXplZE5hbWVdKSB7XG4gICAgd2FybiQxKGB1c2VNb2RlbCgpIGNhbGxlZCB3aXRoIHByb3AgXCIke25hbWV9XCIgd2hpY2ggaXMgbm90IGRlY2xhcmVkLmApO1xuICAgIHJldHVybiByZWYoKTtcbiAgfVxuICBjb25zdCBoeXBoZW5hdGVkTmFtZSA9IGh5cGhlbmF0ZShuYW1lKTtcbiAgY29uc3QgbW9kaWZpZXJzID0gZ2V0TW9kZWxNb2RpZmllcnMocHJvcHMsIGNhbWVsaXplZE5hbWUpO1xuICBjb25zdCByZXMgPSBjdXN0b21SZWYoKHRyYWNrLCB0cmlnZ2VyKSA9PiB7XG4gICAgbGV0IGxvY2FsVmFsdWU7XG4gICAgbGV0IHByZXZTZXRWYWx1ZSA9IEVNUFRZX09CSjtcbiAgICBsZXQgcHJldkVtaXR0ZWRWYWx1ZTtcbiAgICB3YXRjaFN5bmNFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgcHJvcFZhbHVlID0gcHJvcHNbY2FtZWxpemVkTmFtZV07XG4gICAgICBpZiAoaGFzQ2hhbmdlZChsb2NhbFZhbHVlLCBwcm9wVmFsdWUpKSB7XG4gICAgICAgIGxvY2FsVmFsdWUgPSBwcm9wVmFsdWU7XG4gICAgICAgIHRyaWdnZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KCkge1xuICAgICAgICB0cmFjaygpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5nZXQgPyBvcHRpb25zLmdldChsb2NhbFZhbHVlKSA6IGxvY2FsVmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGVtaXR0ZWRWYWx1ZSA9IG9wdGlvbnMuc2V0ID8gb3B0aW9ucy5zZXQodmFsdWUpIDogdmFsdWU7XG4gICAgICAgIGlmICghaGFzQ2hhbmdlZChlbWl0dGVkVmFsdWUsIGxvY2FsVmFsdWUpICYmICEocHJldlNldFZhbHVlICE9PSBFTVBUWV9PQkogJiYgaGFzQ2hhbmdlZCh2YWx1ZSwgcHJldlNldFZhbHVlKSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmF3UHJvcHMgPSBpLnZub2RlLnByb3BzO1xuICAgICAgICBpZiAoIShyYXdQcm9wcyAmJiAvLyBjaGVjayBpZiBwYXJlbnQgaGFzIHBhc3NlZCB2LW1vZGVsXG4gICAgICAgIChuYW1lIGluIHJhd1Byb3BzIHx8IGNhbWVsaXplZE5hbWUgaW4gcmF3UHJvcHMgfHwgaHlwaGVuYXRlZE5hbWUgaW4gcmF3UHJvcHMpICYmIChgb25VcGRhdGU6JHtuYW1lfWAgaW4gcmF3UHJvcHMgfHwgYG9uVXBkYXRlOiR7Y2FtZWxpemVkTmFtZX1gIGluIHJhd1Byb3BzIHx8IGBvblVwZGF0ZToke2h5cGhlbmF0ZWROYW1lfWAgaW4gcmF3UHJvcHMpKSkge1xuICAgICAgICAgIGxvY2FsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB0cmlnZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaS5lbWl0KGB1cGRhdGU6JHtuYW1lfWAsIGVtaXR0ZWRWYWx1ZSk7XG4gICAgICAgIGlmIChoYXNDaGFuZ2VkKHZhbHVlLCBlbWl0dGVkVmFsdWUpICYmIGhhc0NoYW5nZWQodmFsdWUsIHByZXZTZXRWYWx1ZSkgJiYgIWhhc0NoYW5nZWQoZW1pdHRlZFZhbHVlLCBwcmV2RW1pdHRlZFZhbHVlKSkge1xuICAgICAgICAgIHRyaWdnZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2U2V0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcHJldkVtaXR0ZWRWYWx1ZSA9IGVtaXR0ZWRWYWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbiAgcmVzW1N5bWJvbC5pdGVyYXRvcl0gPSAoKSA9PiB7XG4gICAgbGV0IGkyID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKGkyIDwgMikge1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBpMisrID8gbW9kaWZpZXJzIHx8IEVNUFRZX09CSiA6IHJlcywgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICByZXR1cm4gcmVzO1xufVxuY29uc3QgZ2V0TW9kZWxNb2RpZmllcnMgPSAocHJvcHMsIG1vZGVsTmFtZSkgPT4ge1xuICByZXR1cm4gbW9kZWxOYW1lID09PSBcIm1vZGVsVmFsdWVcIiB8fCBtb2RlbE5hbWUgPT09IFwibW9kZWwtdmFsdWVcIiA/IHByb3BzLm1vZGVsTW9kaWZpZXJzIDogcHJvcHNbYCR7bW9kZWxOYW1lfU1vZGlmaWVyc2BdIHx8IHByb3BzW2Ake2NhbWVsaXplKG1vZGVsTmFtZSl9TW9kaWZpZXJzYF0gfHwgcHJvcHNbYCR7aHlwaGVuYXRlKG1vZGVsTmFtZSl9TW9kaWZpZXJzYF07XG59O1xuXG5mdW5jdGlvbiBlbWl0KGluc3RhbmNlLCBldmVudCwgLi4ucmF3QXJncykge1xuICBpZiAoaW5zdGFuY2UuaXNVbm1vdW50ZWQpIHJldHVybjtcbiAgY29uc3QgcHJvcHMgPSBpbnN0YW5jZS52bm9kZS5wcm9wcyB8fCBFTVBUWV9PQko7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc3Qge1xuICAgICAgZW1pdHNPcHRpb25zLFxuICAgICAgcHJvcHNPcHRpb25zOiBbcHJvcHNPcHRpb25zXVxuICAgIH0gPSBpbnN0YW5jZTtcbiAgICBpZiAoZW1pdHNPcHRpb25zKSB7XG4gICAgICBpZiAoIShldmVudCBpbiBlbWl0c09wdGlvbnMpICYmIHRydWUpIHtcbiAgICAgICAgaWYgKCFwcm9wc09wdGlvbnMgfHwgISh0b0hhbmRsZXJLZXkoY2FtZWxpemUoZXZlbnQpKSBpbiBwcm9wc09wdGlvbnMpKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYENvbXBvbmVudCBlbWl0dGVkIGV2ZW50IFwiJHtldmVudH1cIiBidXQgaXQgaXMgbmVpdGhlciBkZWNsYXJlZCBpbiB0aGUgZW1pdHMgb3B0aW9uIG5vciBhcyBhbiBcIiR7dG9IYW5kbGVyS2V5KGNhbWVsaXplKGV2ZW50KSl9XCIgcHJvcC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gZW1pdHNPcHRpb25zW2V2ZW50XTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsaWRhdG9yKSkge1xuICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0b3IoLi4ucmF3QXJncyk7XG4gICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgICAgIGBJbnZhbGlkIGV2ZW50IGFyZ3VtZW50czogZXZlbnQgdmFsaWRhdGlvbiBmYWlsZWQgZm9yIGV2ZW50IFwiJHtldmVudH1cIi5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBsZXQgYXJncyA9IHJhd0FyZ3M7XG4gIGNvbnN0IGlzTW9kZWxMaXN0ZW5lciA9IGV2ZW50LnN0YXJ0c1dpdGgoXCJ1cGRhdGU6XCIpO1xuICBjb25zdCBtb2RpZmllcnMgPSBpc01vZGVsTGlzdGVuZXIgJiYgZ2V0TW9kZWxNb2RpZmllcnMocHJvcHMsIGV2ZW50LnNsaWNlKDcpKTtcbiAgaWYgKG1vZGlmaWVycykge1xuICAgIGlmIChtb2RpZmllcnMudHJpbSkge1xuICAgICAgYXJncyA9IHJhd0FyZ3MubWFwKChhKSA9PiBpc1N0cmluZyhhKSA/IGEudHJpbSgpIDogYSk7XG4gICAgfVxuICAgIGlmIChtb2RpZmllcnMubnVtYmVyKSB7XG4gICAgICBhcmdzID0gcmF3QXJncy5tYXAobG9vc2VUb051bWJlcik7XG4gICAgfVxuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykge1xuICAgIGRldnRvb2xzQ29tcG9uZW50RW1pdChpbnN0YW5jZSwgZXZlbnQsIGFyZ3MpO1xuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc3QgbG93ZXJDYXNlRXZlbnQgPSBldmVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsb3dlckNhc2VFdmVudCAhPT0gZXZlbnQgJiYgcHJvcHNbdG9IYW5kbGVyS2V5KGxvd2VyQ2FzZUV2ZW50KV0pIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYEV2ZW50IFwiJHtsb3dlckNhc2VFdmVudH1cIiBpcyBlbWl0dGVkIGluIGNvbXBvbmVudCAke2Zvcm1hdENvbXBvbmVudE5hbWUoXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgaW5zdGFuY2UudHlwZVxuICAgICAgICApfSBidXQgdGhlIGhhbmRsZXIgaXMgcmVnaXN0ZXJlZCBmb3IgXCIke2V2ZW50fVwiLiBOb3RlIHRoYXQgSFRNTCBhdHRyaWJ1dGVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlIGFuZCB5b3UgY2Fubm90IHVzZSB2LW9uIHRvIGxpc3RlbiB0byBjYW1lbENhc2UgZXZlbnRzIHdoZW4gdXNpbmcgaW4tRE9NIHRlbXBsYXRlcy4gWW91IHNob3VsZCBwcm9iYWJseSB1c2UgXCIke2h5cGhlbmF0ZShcbiAgICAgICAgICBldmVudFxuICAgICAgICApfVwiIGluc3RlYWQgb2YgXCIke2V2ZW50fVwiLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGxldCBoYW5kbGVyTmFtZTtcbiAgbGV0IGhhbmRsZXIgPSBwcm9wc1toYW5kbGVyTmFtZSA9IHRvSGFuZGxlcktleShldmVudCldIHx8IC8vIGFsc28gdHJ5IGNhbWVsQ2FzZSBldmVudCBoYW5kbGVyICgjMjI0OSlcbiAgcHJvcHNbaGFuZGxlck5hbWUgPSB0b0hhbmRsZXJLZXkoY2FtZWxpemUoZXZlbnQpKV07XG4gIGlmICghaGFuZGxlciAmJiBpc01vZGVsTGlzdGVuZXIpIHtcbiAgICBoYW5kbGVyID0gcHJvcHNbaGFuZGxlck5hbWUgPSB0b0hhbmRsZXJLZXkoaHlwaGVuYXRlKGV2ZW50KSldO1xuICB9XG4gIGlmIChoYW5kbGVyKSB7XG4gICAgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcoXG4gICAgICBoYW5kbGVyLFxuICAgICAgaW5zdGFuY2UsXG4gICAgICA2LFxuICAgICAgYXJnc1xuICAgICk7XG4gIH1cbiAgY29uc3Qgb25jZUhhbmRsZXIgPSBwcm9wc1toYW5kbGVyTmFtZSArIGBPbmNlYF07XG4gIGlmIChvbmNlSGFuZGxlcikge1xuICAgIGlmICghaW5zdGFuY2UuZW1pdHRlZCkge1xuICAgICAgaW5zdGFuY2UuZW1pdHRlZCA9IHt9O1xuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UuZW1pdHRlZFtoYW5kbGVyTmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5zdGFuY2UuZW1pdHRlZFtoYW5kbGVyTmFtZV0gPSB0cnVlO1xuICAgIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nKFxuICAgICAgb25jZUhhbmRsZXIsXG4gICAgICBpbnN0YW5jZSxcbiAgICAgIDYsXG4gICAgICBhcmdzXG4gICAgKTtcbiAgfVxufVxuZnVuY3Rpb24gbm9ybWFsaXplRW1pdHNPcHRpb25zKGNvbXAsIGFwcENvbnRleHQsIGFzTWl4aW4gPSBmYWxzZSkge1xuICBjb25zdCBjYWNoZSA9IGFwcENvbnRleHQuZW1pdHNDYWNoZTtcbiAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KGNvbXApO1xuICBpZiAoY2FjaGVkICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG4gIGNvbnN0IHJhdyA9IGNvbXAuZW1pdHM7XG4gIGxldCBub3JtYWxpemVkID0ge307XG4gIGxldCBoYXNFeHRlbmRzID0gZmFsc2U7XG4gIGlmIChfX1ZVRV9PUFRJT05TX0FQSV9fICYmICFpc0Z1bmN0aW9uKGNvbXApKSB7XG4gICAgY29uc3QgZXh0ZW5kRW1pdHMgPSAocmF3MikgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb21FeHRlbmQgPSBub3JtYWxpemVFbWl0c09wdGlvbnMocmF3MiwgYXBwQ29udGV4dCwgdHJ1ZSk7XG4gICAgICBpZiAobm9ybWFsaXplZEZyb21FeHRlbmQpIHtcbiAgICAgICAgaGFzRXh0ZW5kcyA9IHRydWU7XG4gICAgICAgIGV4dGVuZChub3JtYWxpemVkLCBub3JtYWxpemVkRnJvbUV4dGVuZCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWFzTWl4aW4gJiYgYXBwQ29udGV4dC5taXhpbnMubGVuZ3RoKSB7XG4gICAgICBhcHBDb250ZXh0Lm1peGlucy5mb3JFYWNoKGV4dGVuZEVtaXRzKTtcbiAgICB9XG4gICAgaWYgKGNvbXAuZXh0ZW5kcykge1xuICAgICAgZXh0ZW5kRW1pdHMoY29tcC5leHRlbmRzKTtcbiAgICB9XG4gICAgaWYgKGNvbXAubWl4aW5zKSB7XG4gICAgICBjb21wLm1peGlucy5mb3JFYWNoKGV4dGVuZEVtaXRzKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFyYXcgJiYgIWhhc0V4dGVuZHMpIHtcbiAgICBpZiAoaXNPYmplY3QoY29tcCkpIHtcbiAgICAgIGNhY2hlLnNldChjb21wLCBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGlzQXJyYXkocmF3KSkge1xuICAgIHJhdy5mb3JFYWNoKChrZXkpID0+IG5vcm1hbGl6ZWRba2V5XSA9IG51bGwpO1xuICB9IGVsc2Uge1xuICAgIGV4dGVuZChub3JtYWxpemVkLCByYXcpO1xuICB9XG4gIGlmIChpc09iamVjdChjb21wKSkge1xuICAgIGNhY2hlLnNldChjb21wLCBub3JtYWxpemVkKTtcbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZDtcbn1cbmZ1bmN0aW9uIGlzRW1pdExpc3RlbmVyKG9wdGlvbnMsIGtleSkge1xuICBpZiAoIW9wdGlvbnMgfHwgIWlzT24oa2V5KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBrZXkgPSBrZXkuc2xpY2UoMikucmVwbGFjZSgvT25jZSQvLCBcIlwiKTtcbiAgcmV0dXJuIGhhc093bihvcHRpb25zLCBrZXlbMF0udG9Mb3dlckNhc2UoKSArIGtleS5zbGljZSgxKSkgfHwgaGFzT3duKG9wdGlvbnMsIGh5cGhlbmF0ZShrZXkpKSB8fCBoYXNPd24ob3B0aW9ucywga2V5KTtcbn1cblxubGV0IGFjY2Vzc2VkQXR0cnMgPSBmYWxzZTtcbmZ1bmN0aW9uIG1hcmtBdHRyc0FjY2Vzc2VkKCkge1xuICBhY2Nlc3NlZEF0dHJzID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudFJvb3QoaW5zdGFuY2UpIHtcbiAgY29uc3Qge1xuICAgIHR5cGU6IENvbXBvbmVudCxcbiAgICB2bm9kZSxcbiAgICBwcm94eSxcbiAgICB3aXRoUHJveHksXG4gICAgcHJvcHNPcHRpb25zOiBbcHJvcHNPcHRpb25zXSxcbiAgICBzbG90cyxcbiAgICBhdHRycyxcbiAgICBlbWl0LFxuICAgIHJlbmRlcixcbiAgICByZW5kZXJDYWNoZSxcbiAgICBwcm9wcyxcbiAgICBkYXRhLFxuICAgIHNldHVwU3RhdGUsXG4gICAgY3R4LFxuICAgIGluaGVyaXRBdHRyc1xuICB9ID0gaW5zdGFuY2U7XG4gIGNvbnN0IHByZXYgPSBzZXRDdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UoaW5zdGFuY2UpO1xuICBsZXQgcmVzdWx0O1xuICBsZXQgZmFsbHRocm91Z2hBdHRycztcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBhY2Nlc3NlZEF0dHJzID0gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAodm5vZGUuc2hhcGVGbGFnICYgNCkge1xuICAgICAgY29uc3QgcHJveHlUb1VzZSA9IHdpdGhQcm94eSB8fCBwcm94eTtcbiAgICAgIGNvbnN0IHRoaXNQcm94eSA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgc2V0dXBTdGF0ZS5fX2lzU2NyaXB0U2V0dXAgPyBuZXcgUHJveHkocHJveHlUb1VzZSwge1xuICAgICAgICBnZXQodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYFByb3BlcnR5ICcke1N0cmluZyhcbiAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICApfScgd2FzIGFjY2Vzc2VkIHZpYSAndGhpcycuIEF2b2lkIHVzaW5nICd0aGlzJyBpbiB0ZW1wbGF0ZXMuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pIDogcHJveHlUb1VzZTtcbiAgICAgIHJlc3VsdCA9IG5vcm1hbGl6ZVZOb2RlKFxuICAgICAgICByZW5kZXIuY2FsbChcbiAgICAgICAgICB0aGlzUHJveHksXG4gICAgICAgICAgcHJveHlUb1VzZSxcbiAgICAgICAgICByZW5kZXJDYWNoZSxcbiAgICAgICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KHByb3BzKSA6IHByb3BzLFxuICAgICAgICAgIHNldHVwU3RhdGUsXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICBjdHhcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGZhbGx0aHJvdWdoQXR0cnMgPSBhdHRycztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVuZGVyMiA9IENvbXBvbmVudDtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGF0dHJzID09PSBwcm9wcykge1xuICAgICAgICBtYXJrQXR0cnNBY2Nlc3NlZCgpO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gbm9ybWFsaXplVk5vZGUoXG4gICAgICAgIHJlbmRlcjIubGVuZ3RoID4gMSA/IHJlbmRlcjIoXG4gICAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHNoYWxsb3dSZWFkb25seShwcm9wcykgOiBwcm9wcyxcbiAgICAgICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8ge1xuICAgICAgICAgICAgZ2V0IGF0dHJzKCkge1xuICAgICAgICAgICAgICBtYXJrQXR0cnNBY2Nlc3NlZCgpO1xuICAgICAgICAgICAgICByZXR1cm4gc2hhbGxvd1JlYWRvbmx5KGF0dHJzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbG90cyxcbiAgICAgICAgICAgIGVtaXRcbiAgICAgICAgICB9IDogeyBhdHRycywgc2xvdHMsIGVtaXQgfVxuICAgICAgICApIDogcmVuZGVyMihcbiAgICAgICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KHByb3BzKSA6IHByb3BzLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGZhbGx0aHJvdWdoQXR0cnMgPSBDb21wb25lbnQucHJvcHMgPyBhdHRycyA6IGdldEZ1bmN0aW9uYWxGYWxsdGhyb3VnaChhdHRycyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBibG9ja1N0YWNrLmxlbmd0aCA9IDA7XG4gICAgaGFuZGxlRXJyb3IoZXJyLCBpbnN0YW5jZSwgMSk7XG4gICAgcmVzdWx0ID0gY3JlYXRlVk5vZGUoQ29tbWVudCk7XG4gIH1cbiAgbGV0IHJvb3QgPSByZXN1bHQ7XG4gIGxldCBzZXRSb290ID0gdm9pZCAwO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiByZXN1bHQucGF0Y2hGbGFnID4gMCAmJiByZXN1bHQucGF0Y2hGbGFnICYgMjA0OCkge1xuICAgIFtyb290LCBzZXRSb290XSA9IGdldENoaWxkUm9vdChyZXN1bHQpO1xuICB9XG4gIGlmIChmYWxsdGhyb3VnaEF0dHJzICYmIGluaGVyaXRBdHRycyAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZmFsbHRocm91Z2hBdHRycyk7XG4gICAgY29uc3QgeyBzaGFwZUZsYWcgfSA9IHJvb3Q7XG4gICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICBpZiAoc2hhcGVGbGFnICYgKDEgfCA2KSkge1xuICAgICAgICBpZiAocHJvcHNPcHRpb25zICYmIGtleXMuc29tZShpc01vZGVsTGlzdGVuZXIpKSB7XG4gICAgICAgICAgZmFsbHRocm91Z2hBdHRycyA9IGZpbHRlck1vZGVsTGlzdGVuZXJzKFxuICAgICAgICAgICAgZmFsbHRocm91Z2hBdHRycyxcbiAgICAgICAgICAgIHByb3BzT3B0aW9uc1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcm9vdCA9IGNsb25lVk5vZGUocm9vdCwgZmFsbHRocm91Z2hBdHRycywgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFhY2Nlc3NlZEF0dHJzICYmIHJvb3QudHlwZSAhPT0gQ29tbWVudCkge1xuICAgICAgICBjb25zdCBhbGxBdHRycyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcbiAgICAgICAgY29uc3QgZXZlbnRBdHRycyA9IFtdO1xuICAgICAgICBjb25zdCBleHRyYUF0dHJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYWxsQXR0cnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gYWxsQXR0cnNbaV07XG4gICAgICAgICAgaWYgKGlzT24oa2V5KSkge1xuICAgICAgICAgICAgaWYgKCFpc01vZGVsTGlzdGVuZXIoa2V5KSkge1xuICAgICAgICAgICAgICBldmVudEF0dHJzLnB1c2goa2V5WzJdLnRvTG93ZXJDYXNlKCkgKyBrZXkuc2xpY2UoMykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRyYUF0dHJzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dHJhQXR0cnMubGVuZ3RoKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYEV4dHJhbmVvdXMgbm9uLXByb3BzIGF0dHJpYnV0ZXMgKCR7ZXh0cmFBdHRycy5qb2luKFwiLCBcIil9KSB3ZXJlIHBhc3NlZCB0byBjb21wb25lbnQgYnV0IGNvdWxkIG5vdCBiZSBhdXRvbWF0aWNhbGx5IGluaGVyaXRlZCBiZWNhdXNlIGNvbXBvbmVudCByZW5kZXJzIGZyYWdtZW50IG9yIHRleHQgb3IgdGVsZXBvcnQgcm9vdCBub2Rlcy5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnRBdHRycy5sZW5ndGgpIHtcbiAgICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgICBgRXh0cmFuZW91cyBub24tZW1pdHMgZXZlbnQgbGlzdGVuZXJzICgke2V2ZW50QXR0cnMuam9pbihcIiwgXCIpfSkgd2VyZSBwYXNzZWQgdG8gY29tcG9uZW50IGJ1dCBjb3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBpbmhlcml0ZWQgYmVjYXVzZSBjb21wb25lbnQgcmVuZGVycyBmcmFnbWVudCBvciB0ZXh0IHJvb3Qgbm9kZXMuIElmIHRoZSBsaXN0ZW5lciBpcyBpbnRlbmRlZCB0byBiZSBhIGNvbXBvbmVudCBjdXN0b20gZXZlbnQgbGlzdGVuZXIgb25seSwgZGVjbGFyZSBpdCB1c2luZyB0aGUgXCJlbWl0c1wiIG9wdGlvbi5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodm5vZGUuZGlycykge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFpc0VsZW1lbnRSb290KHJvb3QpKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBSdW50aW1lIGRpcmVjdGl2ZSB1c2VkIG9uIGNvbXBvbmVudCB3aXRoIG5vbi1lbGVtZW50IHJvb3Qgbm9kZS4gVGhlIGRpcmVjdGl2ZXMgd2lsbCBub3QgZnVuY3Rpb24gYXMgaW50ZW5kZWQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcm9vdCA9IGNsb25lVk5vZGUocm9vdCwgbnVsbCwgZmFsc2UsIHRydWUpO1xuICAgIHJvb3QuZGlycyA9IHJvb3QuZGlycyA/IHJvb3QuZGlycy5jb25jYXQodm5vZGUuZGlycykgOiB2bm9kZS5kaXJzO1xuICB9XG4gIGlmICh2bm9kZS50cmFuc2l0aW9uKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWlzRWxlbWVudFJvb3Qocm9vdCkpIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYENvbXBvbmVudCBpbnNpZGUgPFRyYW5zaXRpb24+IHJlbmRlcnMgbm9uLWVsZW1lbnQgcm9vdCBub2RlIHRoYXQgY2Fubm90IGJlIGFuaW1hdGVkLmBcbiAgICAgICk7XG4gICAgfVxuICAgIHNldFRyYW5zaXRpb25Ib29rcyhyb290LCB2bm9kZS50cmFuc2l0aW9uKTtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBzZXRSb290KSB7XG4gICAgc2V0Um9vdChyb290KTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSByb290O1xuICB9XG4gIHNldEN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZShwcmV2KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmNvbnN0IGdldENoaWxkUm9vdCA9ICh2bm9kZSkgPT4ge1xuICBjb25zdCByYXdDaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICBjb25zdCBkeW5hbWljQ2hpbGRyZW4gPSB2bm9kZS5keW5hbWljQ2hpbGRyZW47XG4gIGNvbnN0IGNoaWxkUm9vdCA9IGZpbHRlclNpbmdsZVJvb3QocmF3Q2hpbGRyZW4sIGZhbHNlKTtcbiAgaWYgKCFjaGlsZFJvb3QpIHtcbiAgICByZXR1cm4gW3Zub2RlLCB2b2lkIDBdO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgY2hpbGRSb290LnBhdGNoRmxhZyA+IDAgJiYgY2hpbGRSb290LnBhdGNoRmxhZyAmIDIwNDgpIHtcbiAgICByZXR1cm4gZ2V0Q2hpbGRSb290KGNoaWxkUm9vdCk7XG4gIH1cbiAgY29uc3QgaW5kZXggPSByYXdDaGlsZHJlbi5pbmRleE9mKGNoaWxkUm9vdCk7XG4gIGNvbnN0IGR5bmFtaWNJbmRleCA9IGR5bmFtaWNDaGlsZHJlbiA/IGR5bmFtaWNDaGlsZHJlbi5pbmRleE9mKGNoaWxkUm9vdCkgOiAtMTtcbiAgY29uc3Qgc2V0Um9vdCA9ICh1cGRhdGVkUm9vdCkgPT4ge1xuICAgIHJhd0NoaWxkcmVuW2luZGV4XSA9IHVwZGF0ZWRSb290O1xuICAgIGlmIChkeW5hbWljQ2hpbGRyZW4pIHtcbiAgICAgIGlmIChkeW5hbWljSW5kZXggPiAtMSkge1xuICAgICAgICBkeW5hbWljQ2hpbGRyZW5bZHluYW1pY0luZGV4XSA9IHVwZGF0ZWRSb290O1xuICAgICAgfSBlbHNlIGlmICh1cGRhdGVkUm9vdC5wYXRjaEZsYWcgPiAwKSB7XG4gICAgICAgIHZub2RlLmR5bmFtaWNDaGlsZHJlbiA9IFsuLi5keW5hbWljQ2hpbGRyZW4sIHVwZGF0ZWRSb290XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBbbm9ybWFsaXplVk5vZGUoY2hpbGRSb290KSwgc2V0Um9vdF07XG59O1xuZnVuY3Rpb24gZmlsdGVyU2luZ2xlUm9vdChjaGlsZHJlbiwgcmVjdXJzZSA9IHRydWUpIHtcbiAgbGV0IHNpbmdsZVJvb3Q7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgIGlmIChpc1ZOb2RlKGNoaWxkKSkge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgIT09IENvbW1lbnQgfHwgY2hpbGQuY2hpbGRyZW4gPT09IFwidi1pZlwiKSB7XG4gICAgICAgIGlmIChzaW5nbGVSb290KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNpbmdsZVJvb3QgPSBjaGlsZDtcbiAgICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiByZWN1cnNlICYmIHNpbmdsZVJvb3QucGF0Y2hGbGFnID4gMCAmJiBzaW5nbGVSb290LnBhdGNoRmxhZyAmIDIwNDgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJTaW5nbGVSb290KHNpbmdsZVJvb3QuY2hpbGRyZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHJldHVybiBzaW5nbGVSb290O1xufVxuY29uc3QgZ2V0RnVuY3Rpb25hbEZhbGx0aHJvdWdoID0gKGF0dHJzKSA9PiB7XG4gIGxldCByZXM7XG4gIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiIHx8IGtleSA9PT0gXCJzdHlsZVwiIHx8IGlzT24oa2V5KSkge1xuICAgICAgKHJlcyB8fCAocmVzID0ge30pKVtrZXldID0gYXR0cnNba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5jb25zdCBmaWx0ZXJNb2RlbExpc3RlbmVycyA9IChhdHRycywgcHJvcHMpID0+IHtcbiAgY29uc3QgcmVzID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIGF0dHJzKSB7XG4gICAgaWYgKCFpc01vZGVsTGlzdGVuZXIoa2V5KSB8fCAhKGtleS5zbGljZSg5KSBpbiBwcm9wcykpIHtcbiAgICAgIHJlc1trZXldID0gYXR0cnNba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5jb25zdCBpc0VsZW1lbnRSb290ID0gKHZub2RlKSA9PiB7XG4gIHJldHVybiB2bm9kZS5zaGFwZUZsYWcgJiAoNiB8IDEpIHx8IHZub2RlLnR5cGUgPT09IENvbW1lbnQ7XG59O1xuZnVuY3Rpb24gc2hvdWxkVXBkYXRlQ29tcG9uZW50KHByZXZWTm9kZSwgbmV4dFZOb2RlLCBvcHRpbWl6ZWQpIHtcbiAgY29uc3QgeyBwcm9wczogcHJldlByb3BzLCBjaGlsZHJlbjogcHJldkNoaWxkcmVuLCBjb21wb25lbnQgfSA9IHByZXZWTm9kZTtcbiAgY29uc3QgeyBwcm9wczogbmV4dFByb3BzLCBjaGlsZHJlbjogbmV4dENoaWxkcmVuLCBwYXRjaEZsYWcgfSA9IG5leHRWTm9kZTtcbiAgY29uc3QgZW1pdHMgPSBjb21wb25lbnQuZW1pdHNPcHRpb25zO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAocHJldkNoaWxkcmVuIHx8IG5leHRDaGlsZHJlbikgJiYgaXNIbXJVcGRhdGluZykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChuZXh0Vk5vZGUuZGlycyB8fCBuZXh0Vk5vZGUudHJhbnNpdGlvbikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChvcHRpbWl6ZWQgJiYgcGF0Y2hGbGFnID49IDApIHtcbiAgICBpZiAocGF0Y2hGbGFnICYgMTAyNCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChwYXRjaEZsYWcgJiAxNikge1xuICAgICAgaWYgKCFwcmV2UHJvcHMpIHtcbiAgICAgICAgcmV0dXJuICEhbmV4dFByb3BzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc1Byb3BzQ2hhbmdlZChwcmV2UHJvcHMsIG5leHRQcm9wcywgZW1pdHMpO1xuICAgIH0gZWxzZSBpZiAocGF0Y2hGbGFnICYgOCkge1xuICAgICAgY29uc3QgZHluYW1pY1Byb3BzID0gbmV4dFZOb2RlLmR5bmFtaWNQcm9wcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHluYW1pY1Byb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGR5bmFtaWNQcm9wc1tpXTtcbiAgICAgICAgaWYgKG5leHRQcm9wc1trZXldICE9PSBwcmV2UHJvcHNba2V5XSAmJiAhaXNFbWl0TGlzdGVuZXIoZW1pdHMsIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAocHJldkNoaWxkcmVuIHx8IG5leHRDaGlsZHJlbikge1xuICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4gfHwgIW5leHRDaGlsZHJlbi4kc3RhYmxlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJldlByb3BzID09PSBuZXh0UHJvcHMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFwcmV2UHJvcHMpIHtcbiAgICAgIHJldHVybiAhIW5leHRQcm9wcztcbiAgICB9XG4gICAgaWYgKCFuZXh0UHJvcHMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGFzUHJvcHNDaGFuZ2VkKHByZXZQcm9wcywgbmV4dFByb3BzLCBlbWl0cyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaGFzUHJvcHNDaGFuZ2VkKHByZXZQcm9wcywgbmV4dFByb3BzLCBlbWl0c09wdGlvbnMpIHtcbiAgY29uc3QgbmV4dEtleXMgPSBPYmplY3Qua2V5cyhuZXh0UHJvcHMpO1xuICBpZiAobmV4dEtleXMubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhwcmV2UHJvcHMpLmxlbmd0aCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV4dEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBuZXh0S2V5c1tpXTtcbiAgICBpZiAobmV4dFByb3BzW2tleV0gIT09IHByZXZQcm9wc1trZXldICYmICFpc0VtaXRMaXN0ZW5lcihlbWl0c09wdGlvbnMsIGtleSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiB1cGRhdGVIT0NIb3N0RWwoeyB2bm9kZSwgcGFyZW50IH0sIGVsKSB7XG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBjb25zdCByb290ID0gcGFyZW50LnN1YlRyZWU7XG4gICAgaWYgKHJvb3Quc3VzcGVuc2UgJiYgcm9vdC5zdXNwZW5zZS5hY3RpdmVCcmFuY2ggPT09IHZub2RlKSB7XG4gICAgICByb290LmVsID0gdm5vZGUuZWw7XG4gICAgfVxuICAgIGlmIChyb290ID09PSB2bm9kZSkge1xuICAgICAgKHZub2RlID0gcGFyZW50LnZub2RlKS5lbCA9IGVsO1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGlzU3VzcGVuc2UgPSAodHlwZSkgPT4gdHlwZS5fX2lzU3VzcGVuc2U7XG5sZXQgc3VzcGVuc2VJZCA9IDA7XG5jb25zdCBTdXNwZW5zZUltcGwgPSB7XG4gIG5hbWU6IFwiU3VzcGVuc2VcIixcbiAgLy8gSW4gb3JkZXIgdG8gbWFrZSBTdXNwZW5zZSB0cmVlLXNoYWthYmxlLCB3ZSBuZWVkIHRvIGF2b2lkIGltcG9ydGluZyBpdFxuICAvLyBkaXJlY3RseSBpbiB0aGUgcmVuZGVyZXIuIFRoZSByZW5kZXJlciBjaGVja3MgZm9yIHRoZSBfX2lzU3VzcGVuc2UgZmxhZ1xuICAvLyBvbiBhIHZub2RlJ3MgdHlwZSBhbmQgY2FsbHMgdGhlIGBwcm9jZXNzYCBtZXRob2QsIHBhc3NpbmcgaW4gcmVuZGVyZXJcbiAgLy8gaW50ZXJuYWxzLlxuICBfX2lzU3VzcGVuc2U6IHRydWUsXG4gIHByb2Nlc3MobjEsIG4yLCBjb250YWluZXIsIGFuY2hvciwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCwgcmVuZGVyZXJJbnRlcm5hbHMpIHtcbiAgICBpZiAobjEgPT0gbnVsbCkge1xuICAgICAgbW91bnRTdXNwZW5zZShcbiAgICAgICAgbjIsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHBhcmVudFN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkLFxuICAgICAgICByZW5kZXJlckludGVybmFsc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcmVudFN1c3BlbnNlICYmIHBhcmVudFN1c3BlbnNlLmRlcHMgPiAwICYmICFuMS5zdXNwZW5zZS5pc0luRmFsbGJhY2spIHtcbiAgICAgICAgbjIuc3VzcGVuc2UgPSBuMS5zdXNwZW5zZTtcbiAgICAgICAgbjIuc3VzcGVuc2Uudm5vZGUgPSBuMjtcbiAgICAgICAgbjIuZWwgPSBuMS5lbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGF0Y2hTdXNwZW5zZShcbiAgICAgICAgbjEsXG4gICAgICAgIG4yLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIGFuY2hvcixcbiAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkLFxuICAgICAgICByZW5kZXJlckludGVybmFsc1xuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIGh5ZHJhdGU6IGh5ZHJhdGVTdXNwZW5zZSxcbiAgbm9ybWFsaXplOiBub3JtYWxpemVTdXNwZW5zZUNoaWxkcmVuXG59O1xuY29uc3QgU3VzcGVuc2UgPSBTdXNwZW5zZUltcGwgO1xuZnVuY3Rpb24gdHJpZ2dlckV2ZW50KHZub2RlLCBuYW1lKSB7XG4gIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB2bm9kZS5wcm9wcyAmJiB2bm9kZS5wcm9wc1tuYW1lXTtcbiAgaWYgKGlzRnVuY3Rpb24oZXZlbnRMaXN0ZW5lcikpIHtcbiAgICBldmVudExpc3RlbmVyKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIG1vdW50U3VzcGVuc2Uodm5vZGUsIGNvbnRhaW5lciwgYW5jaG9yLCBwYXJlbnRDb21wb25lbnQsIHBhcmVudFN1c3BlbnNlLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkLCByZW5kZXJlckludGVybmFscykge1xuICBjb25zdCB7XG4gICAgcDogcGF0Y2gsXG4gICAgbzogeyBjcmVhdGVFbGVtZW50IH1cbiAgfSA9IHJlbmRlcmVySW50ZXJuYWxzO1xuICBjb25zdCBoaWRkZW5Db250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzdXNwZW5zZSA9IHZub2RlLnN1c3BlbnNlID0gY3JlYXRlU3VzcGVuc2VCb3VuZGFyeShcbiAgICB2bm9kZSxcbiAgICBwYXJlbnRTdXNwZW5zZSxcbiAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgY29udGFpbmVyLFxuICAgIGhpZGRlbkNvbnRhaW5lcixcbiAgICBhbmNob3IsXG4gICAgbmFtZXNwYWNlLFxuICAgIHNsb3RTY29wZUlkcyxcbiAgICBvcHRpbWl6ZWQsXG4gICAgcmVuZGVyZXJJbnRlcm5hbHNcbiAgKTtcbiAgcGF0Y2goXG4gICAgbnVsbCxcbiAgICBzdXNwZW5zZS5wZW5kaW5nQnJhbmNoID0gdm5vZGUuc3NDb250ZW50LFxuICAgIGhpZGRlbkNvbnRhaW5lcixcbiAgICBudWxsLFxuICAgIHBhcmVudENvbXBvbmVudCxcbiAgICBzdXNwZW5zZSxcbiAgICBuYW1lc3BhY2UsXG4gICAgc2xvdFNjb3BlSWRzXG4gICk7XG4gIGlmIChzdXNwZW5zZS5kZXBzID4gMCkge1xuICAgIHRyaWdnZXJFdmVudCh2bm9kZSwgXCJvblBlbmRpbmdcIik7XG4gICAgdHJpZ2dlckV2ZW50KHZub2RlLCBcIm9uRmFsbGJhY2tcIik7XG4gICAgcGF0Y2goXG4gICAgICBudWxsLFxuICAgICAgdm5vZGUuc3NGYWxsYmFjayxcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIGFuY2hvcixcbiAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgIG51bGwsXG4gICAgICAvLyBmYWxsYmFjayB0cmVlIHdpbGwgbm90IGhhdmUgc3VzcGVuc2UgY29udGV4dFxuICAgICAgbmFtZXNwYWNlLFxuICAgICAgc2xvdFNjb3BlSWRzXG4gICAgKTtcbiAgICBzZXRBY3RpdmVCcmFuY2goc3VzcGVuc2UsIHZub2RlLnNzRmFsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIHN1c3BlbnNlLnJlc29sdmUoZmFsc2UsIHRydWUpO1xuICB9XG59XG5mdW5jdGlvbiBwYXRjaFN1c3BlbnNlKG4xLCBuMiwgY29udGFpbmVyLCBhbmNob3IsIHBhcmVudENvbXBvbmVudCwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCwgeyBwOiBwYXRjaCwgdW06IHVubW91bnQsIG86IHsgY3JlYXRlRWxlbWVudCB9IH0pIHtcbiAgY29uc3Qgc3VzcGVuc2UgPSBuMi5zdXNwZW5zZSA9IG4xLnN1c3BlbnNlO1xuICBzdXNwZW5zZS52bm9kZSA9IG4yO1xuICBuMi5lbCA9IG4xLmVsO1xuICBjb25zdCBuZXdCcmFuY2ggPSBuMi5zc0NvbnRlbnQ7XG4gIGNvbnN0IG5ld0ZhbGxiYWNrID0gbjIuc3NGYWxsYmFjaztcbiAgY29uc3QgeyBhY3RpdmVCcmFuY2gsIHBlbmRpbmdCcmFuY2gsIGlzSW5GYWxsYmFjaywgaXNIeWRyYXRpbmcgfSA9IHN1c3BlbnNlO1xuICBpZiAocGVuZGluZ0JyYW5jaCkge1xuICAgIHN1c3BlbnNlLnBlbmRpbmdCcmFuY2ggPSBuZXdCcmFuY2g7XG4gICAgaWYgKGlzU2FtZVZOb2RlVHlwZShuZXdCcmFuY2gsIHBlbmRpbmdCcmFuY2gpKSB7XG4gICAgICBwYXRjaChcbiAgICAgICAgcGVuZGluZ0JyYW5jaCxcbiAgICAgICAgbmV3QnJhbmNoLFxuICAgICAgICBzdXNwZW5zZS5oaWRkZW5Db250YWluZXIsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICk7XG4gICAgICBpZiAoc3VzcGVuc2UuZGVwcyA8PSAwKSB7XG4gICAgICAgIHN1c3BlbnNlLnJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJbkZhbGxiYWNrKSB7XG4gICAgICAgIGlmICghaXNIeWRyYXRpbmcpIHtcbiAgICAgICAgICBwYXRjaChcbiAgICAgICAgICAgIGFjdGl2ZUJyYW5jaCxcbiAgICAgICAgICAgIG5ld0ZhbGxiYWNrLFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRyZWUgd2lsbCBub3QgaGF2ZSBzdXNwZW5zZSBjb250ZXh0XG4gICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgbmV3RmFsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1c3BlbnNlLnBlbmRpbmdJZCA9IHN1c3BlbnNlSWQrKztcbiAgICAgIGlmIChpc0h5ZHJhdGluZykge1xuICAgICAgICBzdXNwZW5zZS5pc0h5ZHJhdGluZyA9IGZhbHNlO1xuICAgICAgICBzdXNwZW5zZS5hY3RpdmVCcmFuY2ggPSBwZW5kaW5nQnJhbmNoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5tb3VudChwZW5kaW5nQnJhbmNoLCBwYXJlbnRDb21wb25lbnQsIHN1c3BlbnNlKTtcbiAgICAgIH1cbiAgICAgIHN1c3BlbnNlLmRlcHMgPSAwO1xuICAgICAgc3VzcGVuc2UuZWZmZWN0cy5sZW5ndGggPSAwO1xuICAgICAgc3VzcGVuc2UuaGlkZGVuQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGlmIChpc0luRmFsbGJhY2spIHtcbiAgICAgICAgcGF0Y2goXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBuZXdCcmFuY2gsXG4gICAgICAgICAgc3VzcGVuc2UuaGlkZGVuQ29udGFpbmVyLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHN1c3BlbnNlLFxuICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChzdXNwZW5zZS5kZXBzIDw9IDApIHtcbiAgICAgICAgICBzdXNwZW5zZS5yZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0Y2goXG4gICAgICAgICAgICBhY3RpdmVCcmFuY2gsXG4gICAgICAgICAgICBuZXdGYWxsYmFjayxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAvLyBmYWxsYmFjayB0cmVlIHdpbGwgbm90IGhhdmUgc3VzcGVuc2UgY29udGV4dFxuICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRBY3RpdmVCcmFuY2goc3VzcGVuc2UsIG5ld0ZhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhY3RpdmVCcmFuY2ggJiYgaXNTYW1lVk5vZGVUeXBlKG5ld0JyYW5jaCwgYWN0aXZlQnJhbmNoKSkge1xuICAgICAgICBwYXRjaChcbiAgICAgICAgICBhY3RpdmVCcmFuY2gsXG4gICAgICAgICAgbmV3QnJhbmNoLFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBhbmNob3IsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHN1c3BlbnNlLFxuICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICBzbG90U2NvcGVJZHMsXG4gICAgICAgICAgb3B0aW1pemVkXG4gICAgICAgICk7XG4gICAgICAgIHN1c3BlbnNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXRjaChcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIG5ld0JyYW5jaCxcbiAgICAgICAgICBzdXNwZW5zZS5oaWRkZW5Db250YWluZXIsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHN1c3BlbnNlLmRlcHMgPD0gMCkge1xuICAgICAgICAgIHN1c3BlbnNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYWN0aXZlQnJhbmNoICYmIGlzU2FtZVZOb2RlVHlwZShuZXdCcmFuY2gsIGFjdGl2ZUJyYW5jaCkpIHtcbiAgICAgIHBhdGNoKFxuICAgICAgICBhY3RpdmVCcmFuY2gsXG4gICAgICAgIG5ld0JyYW5jaCxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBhbmNob3IsXG4gICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgc3VzcGVuc2UsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgc2xvdFNjb3BlSWRzLFxuICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICk7XG4gICAgICBzZXRBY3RpdmVCcmFuY2goc3VzcGVuc2UsIG5ld0JyYW5jaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyaWdnZXJFdmVudChuMiwgXCJvblBlbmRpbmdcIik7XG4gICAgICBzdXNwZW5zZS5wZW5kaW5nQnJhbmNoID0gbmV3QnJhbmNoO1xuICAgICAgaWYgKG5ld0JyYW5jaC5zaGFwZUZsYWcgJiA1MTIpIHtcbiAgICAgICAgc3VzcGVuc2UucGVuZGluZ0lkID0gbmV3QnJhbmNoLmNvbXBvbmVudC5zdXNwZW5zZUlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VzcGVuc2UucGVuZGluZ0lkID0gc3VzcGVuc2VJZCsrO1xuICAgICAgfVxuICAgICAgcGF0Y2goXG4gICAgICAgIG51bGwsXG4gICAgICAgIG5ld0JyYW5jaCxcbiAgICAgICAgc3VzcGVuc2UuaGlkZGVuQ29udGFpbmVyLFxuICAgICAgICBudWxsLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgICAgIHN1c3BlbnNlLFxuICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgb3B0aW1pemVkXG4gICAgICApO1xuICAgICAgaWYgKHN1c3BlbnNlLmRlcHMgPD0gMCkge1xuICAgICAgICBzdXNwZW5zZS5yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB7IHRpbWVvdXQsIHBlbmRpbmdJZCB9ID0gc3VzcGVuc2U7XG4gICAgICAgIGlmICh0aW1lb3V0ID4gMCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN1c3BlbnNlLnBlbmRpbmdJZCA9PT0gcGVuZGluZ0lkKSB7XG4gICAgICAgICAgICAgIHN1c3BlbnNlLmZhbGxiYWNrKG5ld0ZhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgc3VzcGVuc2UuZmFsbGJhY2sobmV3RmFsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5sZXQgaGFzV2FybmVkID0gZmFsc2U7XG5mdW5jdGlvbiBjcmVhdGVTdXNwZW5zZUJvdW5kYXJ5KHZub2RlLCBwYXJlbnRTdXNwZW5zZSwgcGFyZW50Q29tcG9uZW50LCBjb250YWluZXIsIGhpZGRlbkNvbnRhaW5lciwgYW5jaG9yLCBuYW1lc3BhY2UsIHNsb3RTY29wZUlkcywgb3B0aW1pemVkLCByZW5kZXJlckludGVybmFscywgaXNIeWRyYXRpbmcgPSBmYWxzZSkge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB0cnVlICYmICFoYXNXYXJuZWQpIHtcbiAgICBoYXNXYXJuZWQgPSB0cnVlO1xuICAgIGNvbnNvbGVbY29uc29sZS5pbmZvID8gXCJpbmZvXCIgOiBcImxvZ1wiXShcbiAgICAgIGA8U3VzcGVuc2U+IGlzIGFuIGV4cGVyaW1lbnRhbCBmZWF0dXJlIGFuZCBpdHMgQVBJIHdpbGwgbGlrZWx5IGNoYW5nZS5gXG4gICAgKTtcbiAgfVxuICBjb25zdCB7XG4gICAgcDogcGF0Y2gsXG4gICAgbTogbW92ZSxcbiAgICB1bTogdW5tb3VudCxcbiAgICBuOiBuZXh0LFxuICAgIG86IHsgcGFyZW50Tm9kZSwgcmVtb3ZlIH1cbiAgfSA9IHJlbmRlcmVySW50ZXJuYWxzO1xuICBsZXQgcGFyZW50U3VzcGVuc2VJZDtcbiAgY29uc3QgaXNTdXNwZW5zaWJsZSA9IGlzVk5vZGVTdXNwZW5zaWJsZSh2bm9kZSk7XG4gIGlmIChpc1N1c3BlbnNpYmxlKSB7XG4gICAgaWYgKHBhcmVudFN1c3BlbnNlICYmIHBhcmVudFN1c3BlbnNlLnBlbmRpbmdCcmFuY2gpIHtcbiAgICAgIHBhcmVudFN1c3BlbnNlSWQgPSBwYXJlbnRTdXNwZW5zZS5wZW5kaW5nSWQ7XG4gICAgICBwYXJlbnRTdXNwZW5zZS5kZXBzKys7XG4gICAgfVxuICB9XG4gIGNvbnN0IHRpbWVvdXQgPSB2bm9kZS5wcm9wcyA/IHRvTnVtYmVyKHZub2RlLnByb3BzLnRpbWVvdXQpIDogdm9pZCAwO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGFzc2VydE51bWJlcih0aW1lb3V0LCBgU3VzcGVuc2UgdGltZW91dGApO1xuICB9XG4gIGNvbnN0IGluaXRpYWxBbmNob3IgPSBhbmNob3I7XG4gIGNvbnN0IHN1c3BlbnNlID0ge1xuICAgIHZub2RlLFxuICAgIHBhcmVudDogcGFyZW50U3VzcGVuc2UsXG4gICAgcGFyZW50Q29tcG9uZW50LFxuICAgIG5hbWVzcGFjZSxcbiAgICBjb250YWluZXIsXG4gICAgaGlkZGVuQ29udGFpbmVyLFxuICAgIGRlcHM6IDAsXG4gICAgcGVuZGluZ0lkOiBzdXNwZW5zZUlkKyssXG4gICAgdGltZW91dDogdHlwZW9mIHRpbWVvdXQgPT09IFwibnVtYmVyXCIgPyB0aW1lb3V0IDogLTEsXG4gICAgYWN0aXZlQnJhbmNoOiBudWxsLFxuICAgIHBlbmRpbmdCcmFuY2g6IG51bGwsXG4gICAgaXNJbkZhbGxiYWNrOiAhaXNIeWRyYXRpbmcsXG4gICAgaXNIeWRyYXRpbmcsXG4gICAgaXNVbm1vdW50ZWQ6IGZhbHNlLFxuICAgIGVmZmVjdHM6IFtdLFxuICAgIHJlc29sdmUocmVzdW1lID0gZmFsc2UsIHN5bmMgPSBmYWxzZSkge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgaWYgKCFyZXN1bWUgJiYgIXN1c3BlbnNlLnBlbmRpbmdCcmFuY2gpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgc3VzcGVuc2UucmVzb2x2ZSgpIGlzIGNhbGxlZCB3aXRob3V0IGEgcGVuZGluZyBicmFuY2guYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1c3BlbnNlLmlzVW5tb3VudGVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYHN1c3BlbnNlLnJlc29sdmUoKSBpcyBjYWxsZWQgb24gYW4gYWxyZWFkeSB1bm1vdW50ZWQgc3VzcGVuc2UgYm91bmRhcnkuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgdm5vZGU6IHZub2RlMixcbiAgICAgICAgYWN0aXZlQnJhbmNoLFxuICAgICAgICBwZW5kaW5nQnJhbmNoLFxuICAgICAgICBwZW5kaW5nSWQsXG4gICAgICAgIGVmZmVjdHMsXG4gICAgICAgIHBhcmVudENvbXBvbmVudDogcGFyZW50Q29tcG9uZW50MixcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIyXG4gICAgICB9ID0gc3VzcGVuc2U7XG4gICAgICBsZXQgZGVsYXlFbnRlciA9IGZhbHNlO1xuICAgICAgaWYgKHN1c3BlbnNlLmlzSHlkcmF0aW5nKSB7XG4gICAgICAgIHN1c3BlbnNlLmlzSHlkcmF0aW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFyZXN1bWUpIHtcbiAgICAgICAgZGVsYXlFbnRlciA9IGFjdGl2ZUJyYW5jaCAmJiBwZW5kaW5nQnJhbmNoLnRyYW5zaXRpb24gJiYgcGVuZGluZ0JyYW5jaC50cmFuc2l0aW9uLm1vZGUgPT09IFwib3V0LWluXCI7XG4gICAgICAgIGlmIChkZWxheUVudGVyKSB7XG4gICAgICAgICAgYWN0aXZlQnJhbmNoLnRyYW5zaXRpb24uYWZ0ZXJMZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nSWQgPT09IHN1c3BlbnNlLnBlbmRpbmdJZCkge1xuICAgICAgICAgICAgICBtb3ZlKFxuICAgICAgICAgICAgICAgIHBlbmRpbmdCcmFuY2gsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyMixcbiAgICAgICAgICAgICAgICBhbmNob3IgPT09IGluaXRpYWxBbmNob3IgPyBuZXh0KGFjdGl2ZUJyYW5jaCkgOiBhbmNob3IsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBxdWV1ZVBvc3RGbHVzaENiKGVmZmVjdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGl2ZUJyYW5jaCkge1xuICAgICAgICAgIGlmIChwYXJlbnROb2RlKGFjdGl2ZUJyYW5jaC5lbCkgPT09IGNvbnRhaW5lcjIpIHtcbiAgICAgICAgICAgIGFuY2hvciA9IG5leHQoYWN0aXZlQnJhbmNoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdW5tb3VudChhY3RpdmVCcmFuY2gsIHBhcmVudENvbXBvbmVudDIsIHN1c3BlbnNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlbGF5RW50ZXIpIHtcbiAgICAgICAgICBtb3ZlKHBlbmRpbmdCcmFuY2gsIGNvbnRhaW5lcjIsIGFuY2hvciwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldEFjdGl2ZUJyYW5jaChzdXNwZW5zZSwgcGVuZGluZ0JyYW5jaCk7XG4gICAgICBzdXNwZW5zZS5wZW5kaW5nQnJhbmNoID0gbnVsbDtcbiAgICAgIHN1c3BlbnNlLmlzSW5GYWxsYmFjayA9IGZhbHNlO1xuICAgICAgbGV0IHBhcmVudCA9IHN1c3BlbnNlLnBhcmVudDtcbiAgICAgIGxldCBoYXNVbnJlc29sdmVkQW5jZXN0b3IgPSBmYWxzZTtcbiAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudC5wZW5kaW5nQnJhbmNoKSB7XG4gICAgICAgICAgcGFyZW50LmVmZmVjdHMucHVzaCguLi5lZmZlY3RzKTtcbiAgICAgICAgICBoYXNVbnJlc29sdmVkQW5jZXN0b3IgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoIWhhc1VucmVzb2x2ZWRBbmNlc3RvciAmJiAhZGVsYXlFbnRlcikge1xuICAgICAgICBxdWV1ZVBvc3RGbHVzaENiKGVmZmVjdHMpO1xuICAgICAgfVxuICAgICAgc3VzcGVuc2UuZWZmZWN0cyA9IFtdO1xuICAgICAgaWYgKGlzU3VzcGVuc2libGUpIHtcbiAgICAgICAgaWYgKHBhcmVudFN1c3BlbnNlICYmIHBhcmVudFN1c3BlbnNlLnBlbmRpbmdCcmFuY2ggJiYgcGFyZW50U3VzcGVuc2VJZCA9PT0gcGFyZW50U3VzcGVuc2UucGVuZGluZ0lkKSB7XG4gICAgICAgICAgcGFyZW50U3VzcGVuc2UuZGVwcy0tO1xuICAgICAgICAgIGlmIChwYXJlbnRTdXNwZW5zZS5kZXBzID09PSAwICYmICFzeW5jKSB7XG4gICAgICAgICAgICBwYXJlbnRTdXNwZW5zZS5yZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0cmlnZ2VyRXZlbnQodm5vZGUyLCBcIm9uUmVzb2x2ZVwiKTtcbiAgICB9LFxuICAgIGZhbGxiYWNrKGZhbGxiYWNrVk5vZGUpIHtcbiAgICAgIGlmICghc3VzcGVuc2UucGVuZGluZ0JyYW5jaCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB7IHZub2RlOiB2bm9kZTIsIGFjdGl2ZUJyYW5jaCwgcGFyZW50Q29tcG9uZW50OiBwYXJlbnRDb21wb25lbnQyLCBjb250YWluZXI6IGNvbnRhaW5lcjIsIG5hbWVzcGFjZTogbmFtZXNwYWNlMiB9ID0gc3VzcGVuc2U7XG4gICAgICB0cmlnZ2VyRXZlbnQodm5vZGUyLCBcIm9uRmFsbGJhY2tcIik7XG4gICAgICBjb25zdCBhbmNob3IyID0gbmV4dChhY3RpdmVCcmFuY2gpO1xuICAgICAgY29uc3QgbW91bnRGYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFzdXNwZW5zZS5pc0luRmFsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcGF0Y2goXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBmYWxsYmFja1ZOb2RlLFxuICAgICAgICAgIGNvbnRhaW5lcjIsXG4gICAgICAgICAgYW5jaG9yMixcbiAgICAgICAgICBwYXJlbnRDb21wb25lbnQyLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgLy8gZmFsbGJhY2sgdHJlZSB3aWxsIG5vdCBoYXZlIHN1c3BlbnNlIGNvbnRleHRcbiAgICAgICAgICBuYW1lc3BhY2UyLFxuICAgICAgICAgIHNsb3RTY29wZUlkcyxcbiAgICAgICAgICBvcHRpbWl6ZWRcbiAgICAgICAgKTtcbiAgICAgICAgc2V0QWN0aXZlQnJhbmNoKHN1c3BlbnNlLCBmYWxsYmFja1ZOb2RlKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBkZWxheUVudGVyID0gZmFsbGJhY2tWTm9kZS50cmFuc2l0aW9uICYmIGZhbGxiYWNrVk5vZGUudHJhbnNpdGlvbi5tb2RlID09PSBcIm91dC1pblwiO1xuICAgICAgaWYgKGRlbGF5RW50ZXIpIHtcbiAgICAgICAgYWN0aXZlQnJhbmNoLnRyYW5zaXRpb24uYWZ0ZXJMZWF2ZSA9IG1vdW50RmFsbGJhY2s7XG4gICAgICB9XG4gICAgICBzdXNwZW5zZS5pc0luRmFsbGJhY2sgPSB0cnVlO1xuICAgICAgdW5tb3VudChcbiAgICAgICAgYWN0aXZlQnJhbmNoLFxuICAgICAgICBwYXJlbnRDb21wb25lbnQyLFxuICAgICAgICBudWxsLFxuICAgICAgICAvLyBubyBzdXNwZW5zZSBzbyB1bm1vdW50IGhvb2tzIGZpcmUgbm93XG4gICAgICAgIHRydWVcbiAgICAgICAgLy8gc2hvdWxkUmVtb3ZlXG4gICAgICApO1xuICAgICAgaWYgKCFkZWxheUVudGVyKSB7XG4gICAgICAgIG1vdW50RmFsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdmUoY29udGFpbmVyMiwgYW5jaG9yMiwgdHlwZSkge1xuICAgICAgc3VzcGVuc2UuYWN0aXZlQnJhbmNoICYmIG1vdmUoc3VzcGVuc2UuYWN0aXZlQnJhbmNoLCBjb250YWluZXIyLCBhbmNob3IyLCB0eXBlKTtcbiAgICAgIHN1c3BlbnNlLmNvbnRhaW5lciA9IGNvbnRhaW5lcjI7XG4gICAgfSxcbiAgICBuZXh0KCkge1xuICAgICAgcmV0dXJuIHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCAmJiBuZXh0KHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCk7XG4gICAgfSxcbiAgICByZWdpc3RlckRlcChpbnN0YW5jZSwgc2V0dXBSZW5kZXJFZmZlY3QsIG9wdGltaXplZDIpIHtcbiAgICAgIGNvbnN0IGlzSW5QZW5kaW5nU3VzcGVuc2UgPSAhIXN1c3BlbnNlLnBlbmRpbmdCcmFuY2g7XG4gICAgICBpZiAoaXNJblBlbmRpbmdTdXNwZW5zZSkge1xuICAgICAgICBzdXNwZW5zZS5kZXBzKys7XG4gICAgICB9XG4gICAgICBjb25zdCBoeWRyYXRlZEVsID0gaW5zdGFuY2Uudm5vZGUuZWw7XG4gICAgICBpbnN0YW5jZS5hc3luY0RlcC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVyciwgaW5zdGFuY2UsIDApO1xuICAgICAgfSkudGhlbigoYXN5bmNTZXR1cFJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoaW5zdGFuY2UuaXNVbm1vdW50ZWQgfHwgc3VzcGVuc2UuaXNVbm1vdW50ZWQgfHwgc3VzcGVuc2UucGVuZGluZ0lkICE9PSBpbnN0YW5jZS5zdXNwZW5zZUlkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlLmFzeW5jUmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCB7IHZub2RlOiB2bm9kZTIgfSA9IGluc3RhbmNlO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIHB1c2hXYXJuaW5nQ29udGV4dCh2bm9kZTIpO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZVNldHVwUmVzdWx0KGluc3RhbmNlLCBhc3luY1NldHVwUmVzdWx0LCBmYWxzZSk7XG4gICAgICAgIGlmIChoeWRyYXRlZEVsKSB7XG4gICAgICAgICAgdm5vZGUyLmVsID0gaHlkcmF0ZWRFbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9ICFoeWRyYXRlZEVsICYmIGluc3RhbmNlLnN1YlRyZWUuZWw7XG4gICAgICAgIHNldHVwUmVuZGVyRWZmZWN0KFxuICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgIHZub2RlMixcbiAgICAgICAgICAvLyBjb21wb25lbnQgbWF5IGhhdmUgYmVlbiBtb3ZlZCBiZWZvcmUgcmVzb2x2ZS5cbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIG5vdCBhIGh5ZHJhdGlvbiwgaW5zdGFuY2Uuc3ViVHJlZSB3aWxsIGJlIHRoZSBjb21tZW50XG4gICAgICAgICAgLy8gcGxhY2Vob2xkZXIuXG4gICAgICAgICAgcGFyZW50Tm9kZShoeWRyYXRlZEVsIHx8IGluc3RhbmNlLnN1YlRyZWUuZWwpLFxuICAgICAgICAgIC8vIGFuY2hvciB3aWxsIG5vdCBiZSB1c2VkIGlmIHRoaXMgaXMgaHlkcmF0aW9uLCBzbyBvbmx5IG5lZWQgdG9cbiAgICAgICAgICAvLyBjb25zaWRlciB0aGUgY29tbWVudCBwbGFjZWhvbGRlciBjYXNlLlxuICAgICAgICAgIGh5ZHJhdGVkRWwgPyBudWxsIDogbmV4dChpbnN0YW5jZS5zdWJUcmVlKSxcbiAgICAgICAgICBzdXNwZW5zZSxcbiAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgb3B0aW1pemVkMlxuICAgICAgICApO1xuICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICByZW1vdmUocGxhY2Vob2xkZXIpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUhPQ0hvc3RFbChpbnN0YW5jZSwgdm5vZGUyLmVsKTtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBwb3BXYXJuaW5nQ29udGV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0luUGVuZGluZ1N1c3BlbnNlICYmIC0tc3VzcGVuc2UuZGVwcyA9PT0gMCkge1xuICAgICAgICAgIHN1c3BlbnNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICB1bm1vdW50KHBhcmVudFN1c3BlbnNlMiwgZG9SZW1vdmUpIHtcbiAgICAgIHN1c3BlbnNlLmlzVW5tb3VudGVkID0gdHJ1ZTtcbiAgICAgIGlmIChzdXNwZW5zZS5hY3RpdmVCcmFuY2gpIHtcbiAgICAgICAgdW5tb3VudChcbiAgICAgICAgICBzdXNwZW5zZS5hY3RpdmVCcmFuY2gsXG4gICAgICAgICAgcGFyZW50Q29tcG9uZW50LFxuICAgICAgICAgIHBhcmVudFN1c3BlbnNlMixcbiAgICAgICAgICBkb1JlbW92ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHN1c3BlbnNlLnBlbmRpbmdCcmFuY2gpIHtcbiAgICAgICAgdW5tb3VudChcbiAgICAgICAgICBzdXNwZW5zZS5wZW5kaW5nQnJhbmNoLFxuICAgICAgICAgIHBhcmVudENvbXBvbmVudCxcbiAgICAgICAgICBwYXJlbnRTdXNwZW5zZTIsXG4gICAgICAgICAgZG9SZW1vdmVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBzdXNwZW5zZTtcbn1cbmZ1bmN0aW9uIGh5ZHJhdGVTdXNwZW5zZShub2RlLCB2bm9kZSwgcGFyZW50Q29tcG9uZW50LCBwYXJlbnRTdXNwZW5zZSwgbmFtZXNwYWNlLCBzbG90U2NvcGVJZHMsIG9wdGltaXplZCwgcmVuZGVyZXJJbnRlcm5hbHMsIGh5ZHJhdGVOb2RlKSB7XG4gIGNvbnN0IHN1c3BlbnNlID0gdm5vZGUuc3VzcGVuc2UgPSBjcmVhdGVTdXNwZW5zZUJvdW5kYXJ5KFxuICAgIHZub2RlLFxuICAgIHBhcmVudFN1c3BlbnNlLFxuICAgIHBhcmVudENvbXBvbmVudCxcbiAgICBub2RlLnBhcmVudE5vZGUsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFsc1xuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgbnVsbCxcbiAgICBuYW1lc3BhY2UsXG4gICAgc2xvdFNjb3BlSWRzLFxuICAgIG9wdGltaXplZCxcbiAgICByZW5kZXJlckludGVybmFscyxcbiAgICB0cnVlXG4gICk7XG4gIGNvbnN0IHJlc3VsdCA9IGh5ZHJhdGVOb2RlKFxuICAgIG5vZGUsXG4gICAgc3VzcGVuc2UucGVuZGluZ0JyYW5jaCA9IHZub2RlLnNzQ29udGVudCxcbiAgICBwYXJlbnRDb21wb25lbnQsXG4gICAgc3VzcGVuc2UsXG4gICAgc2xvdFNjb3BlSWRzLFxuICAgIG9wdGltaXplZFxuICApO1xuICBpZiAoc3VzcGVuc2UuZGVwcyA9PT0gMCkge1xuICAgIHN1c3BlbnNlLnJlc29sdmUoZmFsc2UsIHRydWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBub3JtYWxpemVTdXNwZW5zZUNoaWxkcmVuKHZub2RlKSB7XG4gIGNvbnN0IHsgc2hhcGVGbGFnLCBjaGlsZHJlbiB9ID0gdm5vZGU7XG4gIGNvbnN0IGlzU2xvdENoaWxkcmVuID0gc2hhcGVGbGFnICYgMzI7XG4gIHZub2RlLnNzQ29udGVudCA9IG5vcm1hbGl6ZVN1c3BlbnNlU2xvdChcbiAgICBpc1Nsb3RDaGlsZHJlbiA/IGNoaWxkcmVuLmRlZmF1bHQgOiBjaGlsZHJlblxuICApO1xuICB2bm9kZS5zc0ZhbGxiYWNrID0gaXNTbG90Q2hpbGRyZW4gPyBub3JtYWxpemVTdXNwZW5zZVNsb3QoY2hpbGRyZW4uZmFsbGJhY2spIDogY3JlYXRlVk5vZGUoQ29tbWVudCk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVTdXNwZW5zZVNsb3Qocykge1xuICBsZXQgYmxvY2s7XG4gIGlmIChpc0Z1bmN0aW9uKHMpKSB7XG4gICAgY29uc3QgdHJhY2tCbG9jayA9IGlzQmxvY2tUcmVlRW5hYmxlZCAmJiBzLl9jO1xuICAgIGlmICh0cmFja0Jsb2NrKSB7XG4gICAgICBzLl9kID0gZmFsc2U7XG4gICAgICBvcGVuQmxvY2soKTtcbiAgICB9XG4gICAgcyA9IHMoKTtcbiAgICBpZiAodHJhY2tCbG9jaykge1xuICAgICAgcy5fZCA9IHRydWU7XG4gICAgICBibG9jayA9IGN1cnJlbnRCbG9jaztcbiAgICAgIGNsb3NlQmxvY2soKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQXJyYXkocykpIHtcbiAgICBjb25zdCBzaW5nbGVDaGlsZCA9IGZpbHRlclNpbmdsZVJvb3Qocyk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIXNpbmdsZUNoaWxkICYmIHMuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgIT09IE5VTExfRFlOQU1JQ19DT01QT05FTlQpLmxlbmd0aCA+IDApIHtcbiAgICAgIHdhcm4kMShgPFN1c3BlbnNlPiBzbG90cyBleHBlY3QgYSBzaW5nbGUgcm9vdCBub2RlLmApO1xuICAgIH1cbiAgICBzID0gc2luZ2xlQ2hpbGQ7XG4gIH1cbiAgcyA9IG5vcm1hbGl6ZVZOb2RlKHMpO1xuICBpZiAoYmxvY2sgJiYgIXMuZHluYW1pY0NoaWxkcmVuKSB7XG4gICAgcy5keW5hbWljQ2hpbGRyZW4gPSBibG9jay5maWx0ZXIoKGMpID0+IGMgIT09IHMpO1xuICB9XG4gIHJldHVybiBzO1xufVxuZnVuY3Rpb24gcXVldWVFZmZlY3RXaXRoU3VzcGVuc2UoZm4sIHN1c3BlbnNlKSB7XG4gIGlmIChzdXNwZW5zZSAmJiBzdXNwZW5zZS5wZW5kaW5nQnJhbmNoKSB7XG4gICAgaWYgKGlzQXJyYXkoZm4pKSB7XG4gICAgICBzdXNwZW5zZS5lZmZlY3RzLnB1c2goLi4uZm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXNwZW5zZS5lZmZlY3RzLnB1c2goZm4pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBxdWV1ZVBvc3RGbHVzaENiKGZuKTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0QWN0aXZlQnJhbmNoKHN1c3BlbnNlLCBicmFuY2gpIHtcbiAgc3VzcGVuc2UuYWN0aXZlQnJhbmNoID0gYnJhbmNoO1xuICBjb25zdCB7IHZub2RlLCBwYXJlbnRDb21wb25lbnQgfSA9IHN1c3BlbnNlO1xuICBsZXQgZWwgPSBicmFuY2guZWw7XG4gIHdoaWxlICghZWwgJiYgYnJhbmNoLmNvbXBvbmVudCkge1xuICAgIGJyYW5jaCA9IGJyYW5jaC5jb21wb25lbnQuc3ViVHJlZTtcbiAgICBlbCA9IGJyYW5jaC5lbDtcbiAgfVxuICB2bm9kZS5lbCA9IGVsO1xuICBpZiAocGFyZW50Q29tcG9uZW50ICYmIHBhcmVudENvbXBvbmVudC5zdWJUcmVlID09PSB2bm9kZSkge1xuICAgIHBhcmVudENvbXBvbmVudC52bm9kZS5lbCA9IGVsO1xuICAgIHVwZGF0ZUhPQ0hvc3RFbChwYXJlbnRDb21wb25lbnQsIGVsKTtcbiAgfVxufVxuZnVuY3Rpb24gaXNWTm9kZVN1c3BlbnNpYmxlKHZub2RlKSB7XG4gIGNvbnN0IHN1c3BlbnNpYmxlID0gdm5vZGUucHJvcHMgJiYgdm5vZGUucHJvcHMuc3VzcGVuc2libGU7XG4gIHJldHVybiBzdXNwZW5zaWJsZSAhPSBudWxsICYmIHN1c3BlbnNpYmxlICE9PSBmYWxzZTtcbn1cblxuY29uc3QgRnJhZ21lbnQgPSBTeW1ib2wuZm9yKFwidi1mZ3RcIik7XG5jb25zdCBUZXh0ID0gU3ltYm9sLmZvcihcInYtdHh0XCIpO1xuY29uc3QgQ29tbWVudCA9IFN5bWJvbC5mb3IoXCJ2LWNtdFwiKTtcbmNvbnN0IFN0YXRpYyA9IFN5bWJvbC5mb3IoXCJ2LXN0Y1wiKTtcbmNvbnN0IGJsb2NrU3RhY2sgPSBbXTtcbmxldCBjdXJyZW50QmxvY2sgPSBudWxsO1xuZnVuY3Rpb24gb3BlbkJsb2NrKGRpc2FibGVUcmFja2luZyA9IGZhbHNlKSB7XG4gIGJsb2NrU3RhY2sucHVzaChjdXJyZW50QmxvY2sgPSBkaXNhYmxlVHJhY2tpbmcgPyBudWxsIDogW10pO1xufVxuZnVuY3Rpb24gY2xvc2VCbG9jaygpIHtcbiAgYmxvY2tTdGFjay5wb3AoKTtcbiAgY3VycmVudEJsb2NrID0gYmxvY2tTdGFja1tibG9ja1N0YWNrLmxlbmd0aCAtIDFdIHx8IG51bGw7XG59XG5sZXQgaXNCbG9ja1RyZWVFbmFibGVkID0gMTtcbmZ1bmN0aW9uIHNldEJsb2NrVHJhY2tpbmcodmFsdWUsIGluVk9uY2UgPSBmYWxzZSkge1xuICBpc0Jsb2NrVHJlZUVuYWJsZWQgKz0gdmFsdWU7XG4gIGlmICh2YWx1ZSA8IDAgJiYgY3VycmVudEJsb2NrICYmIGluVk9uY2UpIHtcbiAgICBjdXJyZW50QmxvY2suaGFzT25jZSA9IHRydWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHNldHVwQmxvY2sodm5vZGUpIHtcbiAgdm5vZGUuZHluYW1pY0NoaWxkcmVuID0gaXNCbG9ja1RyZWVFbmFibGVkID4gMCA/IGN1cnJlbnRCbG9jayB8fCBFTVBUWV9BUlIgOiBudWxsO1xuICBjbG9zZUJsb2NrKCk7XG4gIGlmIChpc0Jsb2NrVHJlZUVuYWJsZWQgPiAwICYmIGN1cnJlbnRCbG9jaykge1xuICAgIGN1cnJlbnRCbG9jay5wdXNoKHZub2RlKTtcbiAgfVxuICByZXR1cm4gdm5vZGU7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50QmxvY2sodHlwZSwgcHJvcHMsIGNoaWxkcmVuLCBwYXRjaEZsYWcsIGR5bmFtaWNQcm9wcywgc2hhcGVGbGFnKSB7XG4gIHJldHVybiBzZXR1cEJsb2NrKFxuICAgIGNyZWF0ZUJhc2VWTm9kZShcbiAgICAgIHR5cGUsXG4gICAgICBwcm9wcyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcGF0Y2hGbGFnLFxuICAgICAgZHluYW1pY1Byb3BzLFxuICAgICAgc2hhcGVGbGFnLFxuICAgICAgdHJ1ZVxuICAgIClcbiAgKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUJsb2NrKHR5cGUsIHByb3BzLCBjaGlsZHJlbiwgcGF0Y2hGbGFnLCBkeW5hbWljUHJvcHMpIHtcbiAgcmV0dXJuIHNldHVwQmxvY2soXG4gICAgY3JlYXRlVk5vZGUoXG4gICAgICB0eXBlLFxuICAgICAgcHJvcHMsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIHBhdGNoRmxhZyxcbiAgICAgIGR5bmFtaWNQcm9wcyxcbiAgICAgIHRydWVcbiAgICApXG4gICk7XG59XG5mdW5jdGlvbiBpc1ZOb2RlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA/IHZhbHVlLl9fdl9pc1ZOb2RlID09PSB0cnVlIDogZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NhbWVWTm9kZVR5cGUobjEsIG4yKSB7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIG4yLnNoYXBlRmxhZyAmIDYgJiYgbjEuY29tcG9uZW50KSB7XG4gICAgY29uc3QgZGlydHlJbnN0YW5jZXMgPSBobXJEaXJ0eUNvbXBvbmVudHMuZ2V0KG4yLnR5cGUpO1xuICAgIGlmIChkaXJ0eUluc3RhbmNlcyAmJiBkaXJ0eUluc3RhbmNlcy5oYXMobjEuY29tcG9uZW50KSkge1xuICAgICAgbjEuc2hhcGVGbGFnICY9IC0yNTc7XG4gICAgICBuMi5zaGFwZUZsYWcgJj0gLTUxMztcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG4xLnR5cGUgPT09IG4yLnR5cGUgJiYgbjEua2V5ID09PSBuMi5rZXk7XG59XG5sZXQgdm5vZGVBcmdzVHJhbnNmb3JtZXI7XG5mdW5jdGlvbiB0cmFuc2Zvcm1WTm9kZUFyZ3ModHJhbnNmb3JtZXIpIHtcbiAgdm5vZGVBcmdzVHJhbnNmb3JtZXIgPSB0cmFuc2Zvcm1lcjtcbn1cbmNvbnN0IGNyZWF0ZVZOb2RlV2l0aEFyZ3NUcmFuc2Zvcm0gPSAoLi4uYXJncykgPT4ge1xuICByZXR1cm4gX2NyZWF0ZVZOb2RlKFxuICAgIC4uLnZub2RlQXJnc1RyYW5zZm9ybWVyID8gdm5vZGVBcmdzVHJhbnNmb3JtZXIoYXJncywgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlKSA6IGFyZ3NcbiAgKTtcbn07XG5jb25zdCBub3JtYWxpemVLZXkgPSAoeyBrZXkgfSkgPT4ga2V5ICE9IG51bGwgPyBrZXkgOiBudWxsO1xuY29uc3Qgbm9ybWFsaXplUmVmID0gKHtcbiAgcmVmLFxuICByZWZfa2V5LFxuICByZWZfZm9yXG59KSA9PiB7XG4gIGlmICh0eXBlb2YgcmVmID09PSBcIm51bWJlclwiKSB7XG4gICAgcmVmID0gXCJcIiArIHJlZjtcbiAgfVxuICByZXR1cm4gcmVmICE9IG51bGwgPyBpc1N0cmluZyhyZWYpIHx8IGlzUmVmKHJlZikgfHwgaXNGdW5jdGlvbihyZWYpID8geyBpOiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UsIHI6IHJlZiwgazogcmVmX2tleSwgZjogISFyZWZfZm9yIH0gOiByZWYgOiBudWxsO1xufTtcbmZ1bmN0aW9uIGNyZWF0ZUJhc2VWTm9kZSh0eXBlLCBwcm9wcyA9IG51bGwsIGNoaWxkcmVuID0gbnVsbCwgcGF0Y2hGbGFnID0gMCwgZHluYW1pY1Byb3BzID0gbnVsbCwgc2hhcGVGbGFnID0gdHlwZSA9PT0gRnJhZ21lbnQgPyAwIDogMSwgaXNCbG9ja05vZGUgPSBmYWxzZSwgbmVlZEZ1bGxDaGlsZHJlbk5vcm1hbGl6YXRpb24gPSBmYWxzZSkge1xuICBjb25zdCB2bm9kZSA9IHtcbiAgICBfX3ZfaXNWTm9kZTogdHJ1ZSxcbiAgICBfX3Zfc2tpcDogdHJ1ZSxcbiAgICB0eXBlLFxuICAgIHByb3BzLFxuICAgIGtleTogcHJvcHMgJiYgbm9ybWFsaXplS2V5KHByb3BzKSxcbiAgICByZWY6IHByb3BzICYmIG5vcm1hbGl6ZVJlZihwcm9wcyksXG4gICAgc2NvcGVJZDogY3VycmVudFNjb3BlSWQsXG4gICAgc2xvdFNjb3BlSWRzOiBudWxsLFxuICAgIGNoaWxkcmVuLFxuICAgIGNvbXBvbmVudDogbnVsbCxcbiAgICBzdXNwZW5zZTogbnVsbCxcbiAgICBzc0NvbnRlbnQ6IG51bGwsXG4gICAgc3NGYWxsYmFjazogbnVsbCxcbiAgICBkaXJzOiBudWxsLFxuICAgIHRyYW5zaXRpb246IG51bGwsXG4gICAgZWw6IG51bGwsXG4gICAgYW5jaG9yOiBudWxsLFxuICAgIHRhcmdldDogbnVsbCxcbiAgICB0YXJnZXRTdGFydDogbnVsbCxcbiAgICB0YXJnZXRBbmNob3I6IG51bGwsXG4gICAgc3RhdGljQ291bnQ6IDAsXG4gICAgc2hhcGVGbGFnLFxuICAgIHBhdGNoRmxhZyxcbiAgICBkeW5hbWljUHJvcHMsXG4gICAgZHluYW1pY0NoaWxkcmVuOiBudWxsLFxuICAgIGFwcENvbnRleHQ6IG51bGwsXG4gICAgY3R4OiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2VcbiAgfTtcbiAgaWYgKG5lZWRGdWxsQ2hpbGRyZW5Ob3JtYWxpemF0aW9uKSB7XG4gICAgbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUsIGNoaWxkcmVuKTtcbiAgICBpZiAoc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgICB0eXBlLm5vcm1hbGl6ZSh2bm9kZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XG4gICAgdm5vZGUuc2hhcGVGbGFnIHw9IGlzU3RyaW5nKGNoaWxkcmVuKSA/IDggOiAxNjtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB2bm9kZS5rZXkgIT09IHZub2RlLmtleSkge1xuICAgIHdhcm4kMShgVk5vZGUgY3JlYXRlZCB3aXRoIGludmFsaWQga2V5IChOYU4pLiBWTm9kZSB0eXBlOmAsIHZub2RlLnR5cGUpO1xuICB9XG4gIGlmIChpc0Jsb2NrVHJlZUVuYWJsZWQgPiAwICYmIC8vIGF2b2lkIGEgYmxvY2sgbm9kZSBmcm9tIHRyYWNraW5nIGl0c2VsZlxuICAhaXNCbG9ja05vZGUgJiYgLy8gaGFzIGN1cnJlbnQgcGFyZW50IGJsb2NrXG4gIGN1cnJlbnRCbG9jayAmJiAvLyBwcmVzZW5jZSBvZiBhIHBhdGNoIGZsYWcgaW5kaWNhdGVzIHRoaXMgbm9kZSBuZWVkcyBwYXRjaGluZyBvbiB1cGRhdGVzLlxuICAvLyBjb21wb25lbnQgbm9kZXMgYWxzbyBzaG91bGQgYWx3YXlzIGJlIHBhdGNoZWQsIGJlY2F1c2UgZXZlbiBpZiB0aGVcbiAgLy8gY29tcG9uZW50IGRvZXNuJ3QgbmVlZCB0byB1cGRhdGUsIGl0IG5lZWRzIHRvIHBlcnNpc3QgdGhlIGluc3RhbmNlIG9uIHRvXG4gIC8vIHRoZSBuZXh0IHZub2RlIHNvIHRoYXQgaXQgY2FuIGJlIHByb3Blcmx5IHVubW91bnRlZCBsYXRlci5cbiAgKHZub2RlLnBhdGNoRmxhZyA+IDAgfHwgc2hhcGVGbGFnICYgNikgJiYgLy8gdGhlIEVWRU5UUyBmbGFnIGlzIG9ubHkgZm9yIGh5ZHJhdGlvbiBhbmQgaWYgaXQgaXMgdGhlIG9ubHkgZmxhZywgdGhlXG4gIC8vIHZub2RlIHNob3VsZCBub3QgYmUgY29uc2lkZXJlZCBkeW5hbWljIGR1ZSB0byBoYW5kbGVyIGNhY2hpbmcuXG4gIHZub2RlLnBhdGNoRmxhZyAhPT0gMzIpIHtcbiAgICBjdXJyZW50QmxvY2sucHVzaCh2bm9kZSk7XG4gIH1cbiAgcmV0dXJuIHZub2RlO1xufVxuY29uc3QgY3JlYXRlVk5vZGUgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gY3JlYXRlVk5vZGVXaXRoQXJnc1RyYW5zZm9ybSA6IF9jcmVhdGVWTm9kZTtcbmZ1bmN0aW9uIF9jcmVhdGVWTm9kZSh0eXBlLCBwcm9wcyA9IG51bGwsIGNoaWxkcmVuID0gbnVsbCwgcGF0Y2hGbGFnID0gMCwgZHluYW1pY1Byb3BzID0gbnVsbCwgaXNCbG9ja05vZGUgPSBmYWxzZSkge1xuICBpZiAoIXR5cGUgfHwgdHlwZSA9PT0gTlVMTF9EWU5BTUlDX0NPTVBPTkVOVCkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICF0eXBlKSB7XG4gICAgICB3YXJuJDEoYEludmFsaWQgdm5vZGUgdHlwZSB3aGVuIGNyZWF0aW5nIHZub2RlOiAke3R5cGV9LmApO1xuICAgIH1cbiAgICB0eXBlID0gQ29tbWVudDtcbiAgfVxuICBpZiAoaXNWTm9kZSh0eXBlKSkge1xuICAgIGNvbnN0IGNsb25lZCA9IGNsb25lVk5vZGUoXG4gICAgICB0eXBlLFxuICAgICAgcHJvcHMsXG4gICAgICB0cnVlXG4gICAgICAvKiBtZXJnZVJlZjogdHJ1ZSAqL1xuICAgICk7XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICBub3JtYWxpemVDaGlsZHJlbihjbG9uZWQsIGNoaWxkcmVuKTtcbiAgICB9XG4gICAgaWYgKGlzQmxvY2tUcmVlRW5hYmxlZCA+IDAgJiYgIWlzQmxvY2tOb2RlICYmIGN1cnJlbnRCbG9jaykge1xuICAgICAgaWYgKGNsb25lZC5zaGFwZUZsYWcgJiA2KSB7XG4gICAgICAgIGN1cnJlbnRCbG9ja1tjdXJyZW50QmxvY2suaW5kZXhPZih0eXBlKV0gPSBjbG9uZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50QmxvY2sucHVzaChjbG9uZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBjbG9uZWQucGF0Y2hGbGFnID0gLTI7XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxuICBpZiAoaXNDbGFzc0NvbXBvbmVudCh0eXBlKSkge1xuICAgIHR5cGUgPSB0eXBlLl9fdmNjT3B0cztcbiAgfVxuICBpZiAocHJvcHMpIHtcbiAgICBwcm9wcyA9IGd1YXJkUmVhY3RpdmVQcm9wcyhwcm9wcyk7XG4gICAgbGV0IHsgY2xhc3M6IGtsYXNzLCBzdHlsZSB9ID0gcHJvcHM7XG4gICAgaWYgKGtsYXNzICYmICFpc1N0cmluZyhrbGFzcykpIHtcbiAgICAgIHByb3BzLmNsYXNzID0gbm9ybWFsaXplQ2xhc3Moa2xhc3MpO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3R5bGUpKSB7XG4gICAgICBpZiAoaXNQcm94eShzdHlsZSkgJiYgIWlzQXJyYXkoc3R5bGUpKSB7XG4gICAgICAgIHN0eWxlID0gZXh0ZW5kKHt9LCBzdHlsZSk7XG4gICAgICB9XG4gICAgICBwcm9wcy5zdHlsZSA9IG5vcm1hbGl6ZVN0eWxlKHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2hhcGVGbGFnID0gaXNTdHJpbmcodHlwZSkgPyAxIDogaXNTdXNwZW5zZSh0eXBlKSA/IDEyOCA6IGlzVGVsZXBvcnQodHlwZSkgPyA2NCA6IGlzT2JqZWN0KHR5cGUpID8gNCA6IGlzRnVuY3Rpb24odHlwZSkgPyAyIDogMDtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgc2hhcGVGbGFnICYgNCAmJiBpc1Byb3h5KHR5cGUpKSB7XG4gICAgdHlwZSA9IHRvUmF3KHR5cGUpO1xuICAgIHdhcm4kMShcbiAgICAgIGBWdWUgcmVjZWl2ZWQgYSBDb21wb25lbnQgdGhhdCB3YXMgbWFkZSBhIHJlYWN0aXZlIG9iamVjdC4gVGhpcyBjYW4gbGVhZCB0byB1bm5lY2Vzc2FyeSBwZXJmb3JtYW5jZSBvdmVyaGVhZCBhbmQgc2hvdWxkIGJlIGF2b2lkZWQgYnkgbWFya2luZyB0aGUgY29tcG9uZW50IHdpdGggXFxgbWFya1Jhd1xcYCBvciB1c2luZyBcXGBzaGFsbG93UmVmXFxgIGluc3RlYWQgb2YgXFxgcmVmXFxgLmAsXG4gICAgICBgXG5Db21wb25lbnQgdGhhdCB3YXMgbWFkZSByZWFjdGl2ZTogYCxcbiAgICAgIHR5cGVcbiAgICApO1xuICB9XG4gIHJldHVybiBjcmVhdGVCYXNlVk5vZGUoXG4gICAgdHlwZSxcbiAgICBwcm9wcyxcbiAgICBjaGlsZHJlbixcbiAgICBwYXRjaEZsYWcsXG4gICAgZHluYW1pY1Byb3BzLFxuICAgIHNoYXBlRmxhZyxcbiAgICBpc0Jsb2NrTm9kZSxcbiAgICB0cnVlXG4gICk7XG59XG5mdW5jdGlvbiBndWFyZFJlYWN0aXZlUHJvcHMocHJvcHMpIHtcbiAgaWYgKCFwcm9wcykgcmV0dXJuIG51bGw7XG4gIHJldHVybiBpc1Byb3h5KHByb3BzKSB8fCBpc0ludGVybmFsT2JqZWN0KHByb3BzKSA/IGV4dGVuZCh7fSwgcHJvcHMpIDogcHJvcHM7XG59XG5mdW5jdGlvbiBjbG9uZVZOb2RlKHZub2RlLCBleHRyYVByb3BzLCBtZXJnZVJlZiA9IGZhbHNlLCBjbG9uZVRyYW5zaXRpb24gPSBmYWxzZSkge1xuICBjb25zdCB7IHByb3BzLCByZWYsIHBhdGNoRmxhZywgY2hpbGRyZW4sIHRyYW5zaXRpb24gfSA9IHZub2RlO1xuICBjb25zdCBtZXJnZWRQcm9wcyA9IGV4dHJhUHJvcHMgPyBtZXJnZVByb3BzKHByb3BzIHx8IHt9LCBleHRyYVByb3BzKSA6IHByb3BzO1xuICBjb25zdCBjbG9uZWQgPSB7XG4gICAgX192X2lzVk5vZGU6IHRydWUsXG4gICAgX192X3NraXA6IHRydWUsXG4gICAgdHlwZTogdm5vZGUudHlwZSxcbiAgICBwcm9wczogbWVyZ2VkUHJvcHMsXG4gICAga2V5OiBtZXJnZWRQcm9wcyAmJiBub3JtYWxpemVLZXkobWVyZ2VkUHJvcHMpLFxuICAgIHJlZjogZXh0cmFQcm9wcyAmJiBleHRyYVByb3BzLnJlZiA/IChcbiAgICAgIC8vICMyMDc4IGluIHRoZSBjYXNlIG9mIDxjb21wb25lbnQgOmlzPVwidm5vZGVcIiByZWY9XCJleHRyYVwiLz5cbiAgICAgIC8vIGlmIHRoZSB2bm9kZSBpdHNlbGYgYWxyZWFkeSBoYXMgYSByZWYsIGNsb25lVk5vZGUgd2lsbCBuZWVkIHRvIG1lcmdlXG4gICAgICAvLyB0aGUgcmVmcyBzbyB0aGUgc2luZ2xlIHZub2RlIGNhbiBiZSBzZXQgb24gbXVsdGlwbGUgcmVmc1xuICAgICAgbWVyZ2VSZWYgJiYgcmVmID8gaXNBcnJheShyZWYpID8gcmVmLmNvbmNhdChub3JtYWxpemVSZWYoZXh0cmFQcm9wcykpIDogW3JlZiwgbm9ybWFsaXplUmVmKGV4dHJhUHJvcHMpXSA6IG5vcm1hbGl6ZVJlZihleHRyYVByb3BzKVxuICAgICkgOiByZWYsXG4gICAgc2NvcGVJZDogdm5vZGUuc2NvcGVJZCxcbiAgICBzbG90U2NvcGVJZHM6IHZub2RlLnNsb3RTY29wZUlkcyxcbiAgICBjaGlsZHJlbjogISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBwYXRjaEZsYWcgPT09IC0xICYmIGlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW4ubWFwKGRlZXBDbG9uZVZOb2RlKSA6IGNoaWxkcmVuLFxuICAgIHRhcmdldDogdm5vZGUudGFyZ2V0LFxuICAgIHRhcmdldFN0YXJ0OiB2bm9kZS50YXJnZXRTdGFydCxcbiAgICB0YXJnZXRBbmNob3I6IHZub2RlLnRhcmdldEFuY2hvcixcbiAgICBzdGF0aWNDb3VudDogdm5vZGUuc3RhdGljQ291bnQsXG4gICAgc2hhcGVGbGFnOiB2bm9kZS5zaGFwZUZsYWcsXG4gICAgLy8gaWYgdGhlIHZub2RlIGlzIGNsb25lZCB3aXRoIGV4dHJhIHByb3BzLCB3ZSBjYW4gbm8gbG9uZ2VyIGFzc3VtZSBpdHNcbiAgICAvLyBleGlzdGluZyBwYXRjaCBmbGFnIHRvIGJlIHJlbGlhYmxlIGFuZCBuZWVkIHRvIGFkZCB0aGUgRlVMTF9QUk9QUyBmbGFnLlxuICAgIC8vIG5vdGU6IHByZXNlcnZlIGZsYWcgZm9yIGZyYWdtZW50cyBzaW5jZSB0aGV5IHVzZSB0aGUgZmxhZyBmb3IgY2hpbGRyZW5cbiAgICAvLyBmYXN0IHBhdGhzIG9ubHkuXG4gICAgcGF0Y2hGbGFnOiBleHRyYVByb3BzICYmIHZub2RlLnR5cGUgIT09IEZyYWdtZW50ID8gcGF0Y2hGbGFnID09PSAtMSA/IDE2IDogcGF0Y2hGbGFnIHwgMTYgOiBwYXRjaEZsYWcsXG4gICAgZHluYW1pY1Byb3BzOiB2bm9kZS5keW5hbWljUHJvcHMsXG4gICAgZHluYW1pY0NoaWxkcmVuOiB2bm9kZS5keW5hbWljQ2hpbGRyZW4sXG4gICAgYXBwQ29udGV4dDogdm5vZGUuYXBwQ29udGV4dCxcbiAgICBkaXJzOiB2bm9kZS5kaXJzLFxuICAgIHRyYW5zaXRpb24sXG4gICAgLy8gVGhlc2Ugc2hvdWxkIHRlY2huaWNhbGx5IG9ubHkgYmUgbm9uLW51bGwgb24gbW91bnRlZCBWTm9kZXMuIEhvd2V2ZXIsXG4gICAgLy8gdGhleSAqc2hvdWxkKiBiZSBjb3BpZWQgZm9yIGtlcHQtYWxpdmUgdm5vZGVzLiBTbyB3ZSBqdXN0IGFsd2F5cyBjb3B5XG4gICAgLy8gdGhlbSBzaW5jZSB0aGVtIGJlaW5nIG5vbi1udWxsIGR1cmluZyBhIG1vdW50IGRvZXNuJ3QgYWZmZWN0IHRoZSBsb2dpYyBhc1xuICAgIC8vIHRoZXkgd2lsbCBzaW1wbHkgYmUgb3ZlcndyaXR0ZW4uXG4gICAgY29tcG9uZW50OiB2bm9kZS5jb21wb25lbnQsXG4gICAgc3VzcGVuc2U6IHZub2RlLnN1c3BlbnNlLFxuICAgIHNzQ29udGVudDogdm5vZGUuc3NDb250ZW50ICYmIGNsb25lVk5vZGUodm5vZGUuc3NDb250ZW50KSxcbiAgICBzc0ZhbGxiYWNrOiB2bm9kZS5zc0ZhbGxiYWNrICYmIGNsb25lVk5vZGUodm5vZGUuc3NGYWxsYmFjayksXG4gICAgcGxhY2Vob2xkZXI6IHZub2RlLnBsYWNlaG9sZGVyLFxuICAgIGVsOiB2bm9kZS5lbCxcbiAgICBhbmNob3I6IHZub2RlLmFuY2hvcixcbiAgICBjdHg6IHZub2RlLmN0eCxcbiAgICBjZTogdm5vZGUuY2VcbiAgfTtcbiAgaWYgKHRyYW5zaXRpb24gJiYgY2xvbmVUcmFuc2l0aW9uKSB7XG4gICAgc2V0VHJhbnNpdGlvbkhvb2tzKFxuICAgICAgY2xvbmVkLFxuICAgICAgdHJhbnNpdGlvbi5jbG9uZShjbG9uZWQpXG4gICAgKTtcbiAgfVxuICByZXR1cm4gY2xvbmVkO1xufVxuZnVuY3Rpb24gZGVlcENsb25lVk5vZGUodm5vZGUpIHtcbiAgY29uc3QgY2xvbmVkID0gY2xvbmVWTm9kZSh2bm9kZSk7XG4gIGlmIChpc0FycmF5KHZub2RlLmNoaWxkcmVuKSkge1xuICAgIGNsb25lZC5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuLm1hcChkZWVwQ2xvbmVWTm9kZSk7XG4gIH1cbiAgcmV0dXJuIGNsb25lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHRWTm9kZSh0ZXh0ID0gXCIgXCIsIGZsYWcgPSAwKSB7XG4gIHJldHVybiBjcmVhdGVWTm9kZShUZXh0LCBudWxsLCB0ZXh0LCBmbGFnKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0YXRpY1ZOb2RlKGNvbnRlbnQsIG51bWJlck9mTm9kZXMpIHtcbiAgY29uc3Qgdm5vZGUgPSBjcmVhdGVWTm9kZShTdGF0aWMsIG51bGwsIGNvbnRlbnQpO1xuICB2bm9kZS5zdGF0aWNDb3VudCA9IG51bWJlck9mTm9kZXM7XG4gIHJldHVybiB2bm9kZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnRWTm9kZSh0ZXh0ID0gXCJcIiwgYXNCbG9jayA9IGZhbHNlKSB7XG4gIHJldHVybiBhc0Jsb2NrID8gKG9wZW5CbG9jaygpLCBjcmVhdGVCbG9jayhDb21tZW50LCBudWxsLCB0ZXh0KSkgOiBjcmVhdGVWTm9kZShDb21tZW50LCBudWxsLCB0ZXh0KTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZOb2RlKGNoaWxkKSB7XG4gIGlmIChjaGlsZCA9PSBudWxsIHx8IHR5cGVvZiBjaGlsZCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoQ29tbWVudCk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShjaGlsZCkpIHtcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoXG4gICAgICBGcmFnbWVudCxcbiAgICAgIG51bGwsXG4gICAgICAvLyAjMzY2NiwgYXZvaWQgcmVmZXJlbmNlIHBvbGx1dGlvbiB3aGVuIHJldXNpbmcgdm5vZGVcbiAgICAgIGNoaWxkLnNsaWNlKClcbiAgICApO1xuICB9IGVsc2UgaWYgKGlzVk5vZGUoY2hpbGQpKSB7XG4gICAgcmV0dXJuIGNsb25lSWZNb3VudGVkKGNoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoVGV4dCwgbnVsbCwgU3RyaW5nKGNoaWxkKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNsb25lSWZNb3VudGVkKGNoaWxkKSB7XG4gIHJldHVybiBjaGlsZC5lbCA9PT0gbnVsbCAmJiBjaGlsZC5wYXRjaEZsYWcgIT09IC0xIHx8IGNoaWxkLm1lbW8gPyBjaGlsZCA6IGNsb25lVk5vZGUoY2hpbGQpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUsIGNoaWxkcmVuKSB7XG4gIGxldCB0eXBlID0gMDtcbiAgY29uc3QgeyBzaGFwZUZsYWcgfSA9IHZub2RlO1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfSBlbHNlIGlmIChpc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIHR5cGUgPSAxNjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoc2hhcGVGbGFnICYgKDEgfCA2NCkpIHtcbiAgICAgIGNvbnN0IHNsb3QgPSBjaGlsZHJlbi5kZWZhdWx0O1xuICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgc2xvdC5fYyAmJiAoc2xvdC5fZCA9IGZhbHNlKTtcbiAgICAgICAgbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUsIHNsb3QoKSk7XG4gICAgICAgIHNsb3QuX2MgJiYgKHNsb3QuX2QgPSB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IDMyO1xuICAgICAgY29uc3Qgc2xvdEZsYWcgPSBjaGlsZHJlbi5fO1xuICAgICAgaWYgKCFzbG90RmxhZyAmJiAhaXNJbnRlcm5hbE9iamVjdChjaGlsZHJlbikpIHtcbiAgICAgICAgY2hpbGRyZW4uX2N0eCA9IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdEZsYWcgPT09IDMgJiYgY3VycmVudFJlbmRlcmluZ0luc3RhbmNlKSB7XG4gICAgICAgIGlmIChjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2Uuc2xvdHMuXyA9PT0gMSkge1xuICAgICAgICAgIGNoaWxkcmVuLl8gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkcmVuLl8gPSAyO1xuICAgICAgICAgIHZub2RlLnBhdGNoRmxhZyB8PSAxMDI0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oY2hpbGRyZW4pKSB7XG4gICAgY2hpbGRyZW4gPSB7IGRlZmF1bHQ6IGNoaWxkcmVuLCBfY3R4OiBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgfTtcbiAgICB0eXBlID0gMzI7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGRyZW4gPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgIGlmIChzaGFwZUZsYWcgJiA2NCkge1xuICAgICAgdHlwZSA9IDE2O1xuICAgICAgY2hpbGRyZW4gPSBbY3JlYXRlVGV4dFZOb2RlKGNoaWxkcmVuKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSA4O1xuICAgIH1cbiAgfVxuICB2bm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB2bm9kZS5zaGFwZUZsYWcgfD0gdHlwZTtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoLi4uYXJncykge1xuICBjb25zdCByZXQgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9NZXJnZSA9IGFyZ3NbaV07XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9NZXJnZSkge1xuICAgICAgaWYgKGtleSA9PT0gXCJjbGFzc1wiKSB7XG4gICAgICAgIGlmIChyZXQuY2xhc3MgIT09IHRvTWVyZ2UuY2xhc3MpIHtcbiAgICAgICAgICByZXQuY2xhc3MgPSBub3JtYWxpemVDbGFzcyhbcmV0LmNsYXNzLCB0b01lcmdlLmNsYXNzXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgcmV0LnN0eWxlID0gbm9ybWFsaXplU3R5bGUoW3JldC5zdHlsZSwgdG9NZXJnZS5zdHlsZV0pO1xuICAgICAgfSBlbHNlIGlmIChpc09uKGtleSkpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSByZXRba2V5XTtcbiAgICAgICAgY29uc3QgaW5jb21pbmcgPSB0b01lcmdlW2tleV07XG4gICAgICAgIGlmIChpbmNvbWluZyAmJiBleGlzdGluZyAhPT0gaW5jb21pbmcgJiYgIShpc0FycmF5KGV4aXN0aW5nKSAmJiBleGlzdGluZy5pbmNsdWRlcyhpbmNvbWluZykpKSB7XG4gICAgICAgICAgcmV0W2tleV0gPSBleGlzdGluZyA/IFtdLmNvbmNhdChleGlzdGluZywgaW5jb21pbmcpIDogaW5jb21pbmc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSBcIlwiKSB7XG4gICAgICAgIHJldFtrZXldID0gdG9NZXJnZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuZnVuY3Rpb24gaW52b2tlVk5vZGVIb29rKGhvb2ssIGluc3RhbmNlLCB2bm9kZSwgcHJldlZOb2RlID0gbnVsbCkge1xuICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhob29rLCBpbnN0YW5jZSwgNywgW1xuICAgIHZub2RlLFxuICAgIHByZXZWTm9kZVxuICBdKTtcbn1cblxuY29uc3QgZW1wdHlBcHBDb250ZXh0ID0gY3JlYXRlQXBwQ29udGV4dCgpO1xubGV0IHVpZCA9IDA7XG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRJbnN0YW5jZSh2bm9kZSwgcGFyZW50LCBzdXNwZW5zZSkge1xuICBjb25zdCB0eXBlID0gdm5vZGUudHlwZTtcbiAgY29uc3QgYXBwQ29udGV4dCA9IChwYXJlbnQgPyBwYXJlbnQuYXBwQ29udGV4dCA6IHZub2RlLmFwcENvbnRleHQpIHx8IGVtcHR5QXBwQ29udGV4dDtcbiAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgdWlkOiB1aWQrKyxcbiAgICB2bm9kZSxcbiAgICB0eXBlLFxuICAgIHBhcmVudCxcbiAgICBhcHBDb250ZXh0LFxuICAgIHJvb3Q6IG51bGwsXG4gICAgLy8gdG8gYmUgaW1tZWRpYXRlbHkgc2V0XG4gICAgbmV4dDogbnVsbCxcbiAgICBzdWJUcmVlOiBudWxsLFxuICAgIC8vIHdpbGwgYmUgc2V0IHN5bmNocm9ub3VzbHkgcmlnaHQgYWZ0ZXIgY3JlYXRpb25cbiAgICBlZmZlY3Q6IG51bGwsXG4gICAgdXBkYXRlOiBudWxsLFxuICAgIC8vIHdpbGwgYmUgc2V0IHN5bmNocm9ub3VzbHkgcmlnaHQgYWZ0ZXIgY3JlYXRpb25cbiAgICBqb2I6IG51bGwsXG4gICAgc2NvcGU6IG5ldyBFZmZlY3RTY29wZShcbiAgICAgIHRydWVcbiAgICAgIC8qIGRldGFjaGVkICovXG4gICAgKSxcbiAgICByZW5kZXI6IG51bGwsXG4gICAgcHJveHk6IG51bGwsXG4gICAgZXhwb3NlZDogbnVsbCxcbiAgICBleHBvc2VQcm94eTogbnVsbCxcbiAgICB3aXRoUHJveHk6IG51bGwsXG4gICAgcHJvdmlkZXM6IHBhcmVudCA/IHBhcmVudC5wcm92aWRlcyA6IE9iamVjdC5jcmVhdGUoYXBwQ29udGV4dC5wcm92aWRlcyksXG4gICAgaWRzOiBwYXJlbnQgPyBwYXJlbnQuaWRzIDogW1wiXCIsIDAsIDBdLFxuICAgIGFjY2Vzc0NhY2hlOiBudWxsLFxuICAgIHJlbmRlckNhY2hlOiBbXSxcbiAgICAvLyBsb2NhbCByZXNvbHZlZCBhc3NldHNcbiAgICBjb21wb25lbnRzOiBudWxsLFxuICAgIGRpcmVjdGl2ZXM6IG51bGwsXG4gICAgLy8gcmVzb2x2ZWQgcHJvcHMgYW5kIGVtaXRzIG9wdGlvbnNcbiAgICBwcm9wc09wdGlvbnM6IG5vcm1hbGl6ZVByb3BzT3B0aW9ucyh0eXBlLCBhcHBDb250ZXh0KSxcbiAgICBlbWl0c09wdGlvbnM6IG5vcm1hbGl6ZUVtaXRzT3B0aW9ucyh0eXBlLCBhcHBDb250ZXh0KSxcbiAgICAvLyBlbWl0XG4gICAgZW1pdDogbnVsbCxcbiAgICAvLyB0byBiZSBzZXQgaW1tZWRpYXRlbHlcbiAgICBlbWl0dGVkOiBudWxsLFxuICAgIC8vIHByb3BzIGRlZmF1bHQgdmFsdWVcbiAgICBwcm9wc0RlZmF1bHRzOiBFTVBUWV9PQkosXG4gICAgLy8gaW5oZXJpdEF0dHJzXG4gICAgaW5oZXJpdEF0dHJzOiB0eXBlLmluaGVyaXRBdHRycyxcbiAgICAvLyBzdGF0ZVxuICAgIGN0eDogRU1QVFlfT0JKLFxuICAgIGRhdGE6IEVNUFRZX09CSixcbiAgICBwcm9wczogRU1QVFlfT0JKLFxuICAgIGF0dHJzOiBFTVBUWV9PQkosXG4gICAgc2xvdHM6IEVNUFRZX09CSixcbiAgICByZWZzOiBFTVBUWV9PQkosXG4gICAgc2V0dXBTdGF0ZTogRU1QVFlfT0JKLFxuICAgIHNldHVwQ29udGV4dDogbnVsbCxcbiAgICAvLyBzdXNwZW5zZSByZWxhdGVkXG4gICAgc3VzcGVuc2UsXG4gICAgc3VzcGVuc2VJZDogc3VzcGVuc2UgPyBzdXNwZW5zZS5wZW5kaW5nSWQgOiAwLFxuICAgIGFzeW5jRGVwOiBudWxsLFxuICAgIGFzeW5jUmVzb2x2ZWQ6IGZhbHNlLFxuICAgIC8vIGxpZmVjeWNsZSBob29rc1xuICAgIC8vIG5vdCB1c2luZyBlbnVtcyBoZXJlIGJlY2F1c2UgaXQgcmVzdWx0cyBpbiBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gICAgaXNNb3VudGVkOiBmYWxzZSxcbiAgICBpc1VubW91bnRlZDogZmFsc2UsXG4gICAgaXNEZWFjdGl2YXRlZDogZmFsc2UsXG4gICAgYmM6IG51bGwsXG4gICAgYzogbnVsbCxcbiAgICBibTogbnVsbCxcbiAgICBtOiBudWxsLFxuICAgIGJ1OiBudWxsLFxuICAgIHU6IG51bGwsXG4gICAgdW06IG51bGwsXG4gICAgYnVtOiBudWxsLFxuICAgIGRhOiBudWxsLFxuICAgIGE6IG51bGwsXG4gICAgcnRnOiBudWxsLFxuICAgIHJ0YzogbnVsbCxcbiAgICBlYzogbnVsbCxcbiAgICBzcDogbnVsbFxuICB9O1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGluc3RhbmNlLmN0eCA9IGNyZWF0ZURldlJlbmRlckNvbnRleHQoaW5zdGFuY2UpO1xuICB9IGVsc2Uge1xuICAgIGluc3RhbmNlLmN0eCA9IHsgXzogaW5zdGFuY2UgfTtcbiAgfVxuICBpbnN0YW5jZS5yb290ID0gcGFyZW50ID8gcGFyZW50LnJvb3QgOiBpbnN0YW5jZTtcbiAgaW5zdGFuY2UuZW1pdCA9IGVtaXQuYmluZChudWxsLCBpbnN0YW5jZSk7XG4gIGlmICh2bm9kZS5jZSkge1xuICAgIHZub2RlLmNlKGluc3RhbmNlKTtcbiAgfVxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5sZXQgY3VycmVudEluc3RhbmNlID0gbnVsbDtcbmNvbnN0IGdldEN1cnJlbnRJbnN0YW5jZSA9ICgpID0+IGN1cnJlbnRJbnN0YW5jZSB8fCBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2U7XG5sZXQgaW50ZXJuYWxTZXRDdXJyZW50SW5zdGFuY2U7XG5sZXQgc2V0SW5TU1JTZXR1cFN0YXRlO1xue1xuICBjb25zdCBnID0gZ2V0R2xvYmFsVGhpcygpO1xuICBjb25zdCByZWdpc3Rlckdsb2JhbFNldHRlciA9IChrZXksIHNldHRlcikgPT4ge1xuICAgIGxldCBzZXR0ZXJzO1xuICAgIGlmICghKHNldHRlcnMgPSBnW2tleV0pKSBzZXR0ZXJzID0gZ1trZXldID0gW107XG4gICAgc2V0dGVycy5wdXNoKHNldHRlcik7XG4gICAgcmV0dXJuICh2KSA9PiB7XG4gICAgICBpZiAoc2V0dGVycy5sZW5ndGggPiAxKSBzZXR0ZXJzLmZvckVhY2goKHNldCkgPT4gc2V0KHYpKTtcbiAgICAgIGVsc2Ugc2V0dGVyc1swXSh2KTtcbiAgICB9O1xuICB9O1xuICBpbnRlcm5hbFNldEN1cnJlbnRJbnN0YW5jZSA9IHJlZ2lzdGVyR2xvYmFsU2V0dGVyKFxuICAgIGBfX1ZVRV9JTlNUQU5DRV9TRVRURVJTX19gLFxuICAgICh2KSA9PiBjdXJyZW50SW5zdGFuY2UgPSB2XG4gICk7XG4gIHNldEluU1NSU2V0dXBTdGF0ZSA9IHJlZ2lzdGVyR2xvYmFsU2V0dGVyKFxuICAgIGBfX1ZVRV9TU1JfU0VUVEVSU19fYCxcbiAgICAodikgPT4gaXNJblNTUkNvbXBvbmVudFNldHVwID0gdlxuICApO1xufVxuY29uc3Qgc2V0Q3VycmVudEluc3RhbmNlID0gKGluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IHByZXYgPSBjdXJyZW50SW5zdGFuY2U7XG4gIGludGVybmFsU2V0Q3VycmVudEluc3RhbmNlKGluc3RhbmNlKTtcbiAgaW5zdGFuY2Uuc2NvcGUub24oKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBpbnN0YW5jZS5zY29wZS5vZmYoKTtcbiAgICBpbnRlcm5hbFNldEN1cnJlbnRJbnN0YW5jZShwcmV2KTtcbiAgfTtcbn07XG5jb25zdCB1bnNldEN1cnJlbnRJbnN0YW5jZSA9ICgpID0+IHtcbiAgY3VycmVudEluc3RhbmNlICYmIGN1cnJlbnRJbnN0YW5jZS5zY29wZS5vZmYoKTtcbiAgaW50ZXJuYWxTZXRDdXJyZW50SW5zdGFuY2UobnVsbCk7XG59O1xuY29uc3QgaXNCdWlsdEluVGFnID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoXCJzbG90LGNvbXBvbmVudFwiKTtcbmZ1bmN0aW9uIHZhbGlkYXRlQ29tcG9uZW50TmFtZShuYW1lLCB7IGlzTmF0aXZlVGFnIH0pIHtcbiAgaWYgKGlzQnVpbHRJblRhZyhuYW1lKSB8fCBpc05hdGl2ZVRhZyhuYW1lKSkge1xuICAgIHdhcm4kMShcbiAgICAgIFwiRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCBpZDogXCIgKyBuYW1lXG4gICAgKTtcbiAgfVxufVxuZnVuY3Rpb24gaXNTdGF0ZWZ1bENvbXBvbmVudChpbnN0YW5jZSkge1xuICByZXR1cm4gaW5zdGFuY2Uudm5vZGUuc2hhcGVGbGFnICYgNDtcbn1cbmxldCBpc0luU1NSQ29tcG9uZW50U2V0dXAgPSBmYWxzZTtcbmZ1bmN0aW9uIHNldHVwQ29tcG9uZW50KGluc3RhbmNlLCBpc1NTUiA9IGZhbHNlLCBvcHRpbWl6ZWQgPSBmYWxzZSkge1xuICBpc1NTUiAmJiBzZXRJblNTUlNldHVwU3RhdGUoaXNTU1IpO1xuICBjb25zdCB7IHByb3BzLCBjaGlsZHJlbiB9ID0gaW5zdGFuY2Uudm5vZGU7XG4gIGNvbnN0IGlzU3RhdGVmdWwgPSBpc1N0YXRlZnVsQ29tcG9uZW50KGluc3RhbmNlKTtcbiAgaW5pdFByb3BzKGluc3RhbmNlLCBwcm9wcywgaXNTdGF0ZWZ1bCwgaXNTU1IpO1xuICBpbml0U2xvdHMoaW5zdGFuY2UsIGNoaWxkcmVuLCBvcHRpbWl6ZWQgfHwgaXNTU1IpO1xuICBjb25zdCBzZXR1cFJlc3VsdCA9IGlzU3RhdGVmdWwgPyBzZXR1cFN0YXRlZnVsQ29tcG9uZW50KGluc3RhbmNlLCBpc1NTUikgOiB2b2lkIDA7XG4gIGlzU1NSICYmIHNldEluU1NSU2V0dXBTdGF0ZShmYWxzZSk7XG4gIHJldHVybiBzZXR1cFJlc3VsdDtcbn1cbmZ1bmN0aW9uIHNldHVwU3RhdGVmdWxDb21wb25lbnQoaW5zdGFuY2UsIGlzU1NSKSB7XG4gIHZhciBfYTtcbiAgY29uc3QgQ29tcG9uZW50ID0gaW5zdGFuY2UudHlwZTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBpZiAoQ29tcG9uZW50Lm5hbWUpIHtcbiAgICAgIHZhbGlkYXRlQ29tcG9uZW50TmFtZShDb21wb25lbnQubmFtZSwgaW5zdGFuY2UuYXBwQ29udGV4dC5jb25maWcpO1xuICAgIH1cbiAgICBpZiAoQ29tcG9uZW50LmNvbXBvbmVudHMpIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoQ29tcG9uZW50LmNvbXBvbmVudHMpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUobmFtZXNbaV0sIGluc3RhbmNlLmFwcENvbnRleHQuY29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKENvbXBvbmVudC5kaXJlY3RpdmVzKSB7XG4gICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKENvbXBvbmVudC5kaXJlY3RpdmVzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVEaXJlY3RpdmVOYW1lKG5hbWVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKENvbXBvbmVudC5jb21waWxlck9wdGlvbnMgJiYgaXNSdW50aW1lT25seSgpKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBcImNvbXBpbGVyT3B0aW9uc1wiIGlzIG9ubHkgc3VwcG9ydGVkIHdoZW4gdXNpbmcgYSBidWlsZCBvZiBWdWUgdGhhdCBpbmNsdWRlcyB0aGUgcnVudGltZSBjb21waWxlci4gU2luY2UgeW91IGFyZSB1c2luZyBhIHJ1bnRpbWUtb25seSBidWlsZCwgdGhlIG9wdGlvbnMgc2hvdWxkIGJlIHBhc3NlZCB2aWEgeW91ciBidWlsZCB0b29sIGNvbmZpZyBpbnN0ZWFkLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGluc3RhbmNlLmFjY2Vzc0NhY2hlID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGluc3RhbmNlLnByb3h5ID0gbmV3IFByb3h5KGluc3RhbmNlLmN0eCwgUHVibGljSW5zdGFuY2VQcm94eUhhbmRsZXJzKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBleHBvc2VQcm9wc09uUmVuZGVyQ29udGV4dChpbnN0YW5jZSk7XG4gIH1cbiAgY29uc3QgeyBzZXR1cCB9ID0gQ29tcG9uZW50O1xuICBpZiAoc2V0dXApIHtcbiAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgY29uc3Qgc2V0dXBDb250ZXh0ID0gaW5zdGFuY2Uuc2V0dXBDb250ZXh0ID0gc2V0dXAubGVuZ3RoID4gMSA/IGNyZWF0ZVNldHVwQ29udGV4dChpbnN0YW5jZSkgOiBudWxsO1xuICAgIGNvbnN0IHJlc2V0ID0gc2V0Q3VycmVudEluc3RhbmNlKGluc3RhbmNlKTtcbiAgICBjb25zdCBzZXR1cFJlc3VsdCA9IGNhbGxXaXRoRXJyb3JIYW5kbGluZyhcbiAgICAgIHNldHVwLFxuICAgICAgaW5zdGFuY2UsXG4gICAgICAwLFxuICAgICAgW1xuICAgICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2hhbGxvd1JlYWRvbmx5KGluc3RhbmNlLnByb3BzKSA6IGluc3RhbmNlLnByb3BzLFxuICAgICAgICBzZXR1cENvbnRleHRcbiAgICAgIF1cbiAgICApO1xuICAgIGNvbnN0IGlzQXN5bmNTZXR1cCA9IGlzUHJvbWlzZShzZXR1cFJlc3VsdCk7XG4gICAgcmVzZXRUcmFja2luZygpO1xuICAgIHJlc2V0KCk7XG4gICAgaWYgKChpc0FzeW5jU2V0dXAgfHwgaW5zdGFuY2Uuc3ApICYmICFpc0FzeW5jV3JhcHBlcihpbnN0YW5jZSkpIHtcbiAgICAgIG1hcmtBc3luY0JvdW5kYXJ5KGluc3RhbmNlKTtcbiAgICB9XG4gICAgaWYgKGlzQXN5bmNTZXR1cCkge1xuICAgICAgc2V0dXBSZXN1bHQudGhlbih1bnNldEN1cnJlbnRJbnN0YW5jZSwgdW5zZXRDdXJyZW50SW5zdGFuY2UpO1xuICAgICAgaWYgKGlzU1NSKSB7XG4gICAgICAgIHJldHVybiBzZXR1cFJlc3VsdC50aGVuKChyZXNvbHZlZFJlc3VsdCkgPT4ge1xuICAgICAgICAgIGhhbmRsZVNldHVwUmVzdWx0KGluc3RhbmNlLCByZXNvbHZlZFJlc3VsdCwgaXNTU1IpO1xuICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIGluc3RhbmNlLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0YW5jZS5hc3luY0RlcCA9IHNldHVwUmVzdWx0O1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaW5zdGFuY2Uuc3VzcGVuc2UpIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0gKF9hID0gQ29tcG9uZW50Lm5hbWUpICE9IG51bGwgPyBfYSA6IFwiQW5vbnltb3VzXCI7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYENvbXBvbmVudCA8JHtuYW1lfT46IHNldHVwIGZ1bmN0aW9uIHJldHVybmVkIGEgcHJvbWlzZSwgYnV0IG5vIDxTdXNwZW5zZT4gYm91bmRhcnkgd2FzIGZvdW5kIGluIHRoZSBwYXJlbnQgY29tcG9uZW50IHRyZWUuIEEgY29tcG9uZW50IHdpdGggYXN5bmMgc2V0dXAoKSBtdXN0IGJlIG5lc3RlZCBpbiBhIDxTdXNwZW5zZT4gaW4gb3JkZXIgdG8gYmUgcmVuZGVyZWQuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlU2V0dXBSZXN1bHQoaW5zdGFuY2UsIHNldHVwUmVzdWx0LCBpc1NTUik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZpbmlzaENvbXBvbmVudFNldHVwKGluc3RhbmNlLCBpc1NTUik7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZVNldHVwUmVzdWx0KGluc3RhbmNlLCBzZXR1cFJlc3VsdCwgaXNTU1IpIHtcbiAgaWYgKGlzRnVuY3Rpb24oc2V0dXBSZXN1bHQpKSB7XG4gICAgaWYgKGluc3RhbmNlLnR5cGUuX19zc3JJbmxpbmVSZW5kZXIpIHtcbiAgICAgIGluc3RhbmNlLnNzclJlbmRlciA9IHNldHVwUmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS5yZW5kZXIgPSBzZXR1cFJlc3VsdDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3Qoc2V0dXBSZXN1bHQpKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgaXNWTm9kZShzZXR1cFJlc3VsdCkpIHtcbiAgICAgIHdhcm4kMShcbiAgICAgICAgYHNldHVwKCkgc2hvdWxkIG5vdCByZXR1cm4gVk5vZGVzIGRpcmVjdGx5IC0gcmV0dXJuIGEgcmVuZGVyIGZ1bmN0aW9uIGluc3RlYWQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICBpbnN0YW5jZS5kZXZ0b29sc1Jhd1NldHVwU3RhdGUgPSBzZXR1cFJlc3VsdDtcbiAgICB9XG4gICAgaW5zdGFuY2Uuc2V0dXBTdGF0ZSA9IHByb3h5UmVmcyhzZXR1cFJlc3VsdCk7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIGV4cG9zZVNldHVwU3RhdGVPblJlbmRlckNvbnRleHQoaW5zdGFuY2UpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHNldHVwUmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICB3YXJuJDEoXG4gICAgICBgc2V0dXAoKSBzaG91bGQgcmV0dXJuIGFuIG9iamVjdC4gUmVjZWl2ZWQ6ICR7c2V0dXBSZXN1bHQgPT09IG51bGwgPyBcIm51bGxcIiA6IHR5cGVvZiBzZXR1cFJlc3VsdH1gXG4gICAgKTtcbiAgfVxuICBmaW5pc2hDb21wb25lbnRTZXR1cChpbnN0YW5jZSwgaXNTU1IpO1xufVxubGV0IGNvbXBpbGU7XG5sZXQgaW5zdGFsbFdpdGhQcm94eTtcbmZ1bmN0aW9uIHJlZ2lzdGVyUnVudGltZUNvbXBpbGVyKF9jb21waWxlKSB7XG4gIGNvbXBpbGUgPSBfY29tcGlsZTtcbiAgaW5zdGFsbFdpdGhQcm94eSA9IChpKSA9PiB7XG4gICAgaWYgKGkucmVuZGVyLl9yYykge1xuICAgICAgaS53aXRoUHJveHkgPSBuZXcgUHJveHkoaS5jdHgsIFJ1bnRpbWVDb21waWxlZFB1YmxpY0luc3RhbmNlUHJveHlIYW5kbGVycyk7XG4gICAgfVxuICB9O1xufVxuY29uc3QgaXNSdW50aW1lT25seSA9ICgpID0+ICFjb21waWxlO1xuZnVuY3Rpb24gZmluaXNoQ29tcG9uZW50U2V0dXAoaW5zdGFuY2UsIGlzU1NSLCBza2lwT3B0aW9ucykge1xuICBjb25zdCBDb21wb25lbnQgPSBpbnN0YW5jZS50eXBlO1xuICBpZiAoIWluc3RhbmNlLnJlbmRlcikge1xuICAgIGlmICghaXNTU1IgJiYgY29tcGlsZSAmJiAhQ29tcG9uZW50LnJlbmRlcikge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBDb21wb25lbnQudGVtcGxhdGUgfHwgX19WVUVfT1BUSU9OU19BUElfXyAmJiByZXNvbHZlTWVyZ2VkT3B0aW9ucyhpbnN0YW5jZSkudGVtcGxhdGU7XG4gICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBzdGFydE1lYXN1cmUoaW5zdGFuY2UsIGBjb21waWxlYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBpc0N1c3RvbUVsZW1lbnQsIGNvbXBpbGVyT3B0aW9ucyB9ID0gaW5zdGFuY2UuYXBwQ29udGV4dC5jb25maWc7XG4gICAgICAgIGNvbnN0IHsgZGVsaW1pdGVycywgY29tcGlsZXJPcHRpb25zOiBjb21wb25lbnRDb21waWxlck9wdGlvbnMgfSA9IENvbXBvbmVudDtcbiAgICAgICAgY29uc3QgZmluYWxDb21waWxlck9wdGlvbnMgPSBleHRlbmQoXG4gICAgICAgICAgZXh0ZW5kKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQsXG4gICAgICAgICAgICAgIGRlbGltaXRlcnNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21waWxlck9wdGlvbnNcbiAgICAgICAgICApLFxuICAgICAgICAgIGNvbXBvbmVudENvbXBpbGVyT3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICBDb21wb25lbnQucmVuZGVyID0gY29tcGlsZSh0ZW1wbGF0ZSwgZmluYWxDb21waWxlck9wdGlvbnMpO1xuICAgICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICAgIGVuZE1lYXN1cmUoaW5zdGFuY2UsIGBjb21waWxlYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5zdGFuY2UucmVuZGVyID0gQ29tcG9uZW50LnJlbmRlciB8fCBOT09QO1xuICAgIGlmIChpbnN0YWxsV2l0aFByb3h5KSB7XG4gICAgICBpbnN0YWxsV2l0aFByb3h5KGluc3RhbmNlKTtcbiAgICB9XG4gIH1cbiAgaWYgKF9fVlVFX09QVElPTlNfQVBJX18gJiYgdHJ1ZSkge1xuICAgIGNvbnN0IHJlc2V0ID0gc2V0Q3VycmVudEluc3RhbmNlKGluc3RhbmNlKTtcbiAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgdHJ5IHtcbiAgICAgIGFwcGx5T3B0aW9ucyhpbnN0YW5jZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICAgIHJlc2V0KCk7XG4gICAgfVxuICB9XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFDb21wb25lbnQucmVuZGVyICYmIGluc3RhbmNlLnJlbmRlciA9PT0gTk9PUCAmJiAhaXNTU1IpIHtcbiAgICBpZiAoIWNvbXBpbGUgJiYgQ29tcG9uZW50LnRlbXBsYXRlKSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIGBDb21wb25lbnQgcHJvdmlkZWQgdGVtcGxhdGUgb3B0aW9uIGJ1dCBydW50aW1lIGNvbXBpbGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBidWlsZCBvZiBWdWUuYCArIChgIENvbmZpZ3VyZSB5b3VyIGJ1bmRsZXIgdG8gYWxpYXMgXCJ2dWVcIiB0byBcInZ1ZS9kaXN0L3Z1ZS5lc20tYnVuZGxlci5qc1wiLmAgKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2FybiQxKGBDb21wb25lbnQgaXMgbWlzc2luZyB0ZW1wbGF0ZSBvciByZW5kZXIgZnVuY3Rpb246IGAsIENvbXBvbmVudCk7XG4gICAgfVxuICB9XG59XG5jb25zdCBhdHRyc1Byb3h5SGFuZGxlcnMgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8ge1xuICBnZXQodGFyZ2V0LCBrZXkpIHtcbiAgICBtYXJrQXR0cnNBY2Nlc3NlZCgpO1xuICAgIHRyYWNrKHRhcmdldCwgXCJnZXRcIiwgXCJcIik7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldO1xuICB9LFxuICBzZXQoKSB7XG4gICAgd2FybiQxKGBzZXR1cENvbnRleHQuYXR0cnMgaXMgcmVhZG9ubHkuYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBkZWxldGVQcm9wZXJ0eSgpIHtcbiAgICB3YXJuJDEoYHNldHVwQ29udGV4dC5hdHRycyBpcyByZWFkb25seS5gKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0gOiB7XG4gIGdldCh0YXJnZXQsIGtleSkge1xuICAgIHRyYWNrKHRhcmdldCwgXCJnZXRcIiwgXCJcIik7XG4gICAgcmV0dXJuIHRhcmdldFtrZXldO1xuICB9XG59O1xuZnVuY3Rpb24gZ2V0U2xvdHNQcm94eShpbnN0YW5jZSkge1xuICByZXR1cm4gbmV3IFByb3h5KGluc3RhbmNlLnNsb3RzLCB7XG4gICAgZ2V0KHRhcmdldCwga2V5KSB7XG4gICAgICB0cmFjayhpbnN0YW5jZSwgXCJnZXRcIiwgXCIkc2xvdHNcIik7XG4gICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVNldHVwQ29udGV4dChpbnN0YW5jZSkge1xuICBjb25zdCBleHBvc2UgPSAoZXhwb3NlZCkgPT4ge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBpZiAoaW5zdGFuY2UuZXhwb3NlZCkge1xuICAgICAgICB3YXJuJDEoYGV4cG9zZSgpIHNob3VsZCBiZSBjYWxsZWQgb25seSBvbmNlIHBlciBzZXR1cCgpLmApO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9zZWQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZXhwb3NlZFR5cGUgPSB0eXBlb2YgZXhwb3NlZDtcbiAgICAgICAgaWYgKGV4cG9zZWRUeXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkoZXhwb3NlZCkpIHtcbiAgICAgICAgICAgIGV4cG9zZWRUeXBlID0gXCJhcnJheVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNSZWYoZXhwb3NlZCkpIHtcbiAgICAgICAgICAgIGV4cG9zZWRUeXBlID0gXCJyZWZcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4cG9zZWRUeXBlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgd2FybiQxKFxuICAgICAgICAgICAgYGV4cG9zZSgpIHNob3VsZCBiZSBwYXNzZWQgYSBwbGFpbiBvYmplY3QsIHJlY2VpdmVkICR7ZXhwb3NlZFR5cGV9LmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmV4cG9zZWQgPSBleHBvc2VkIHx8IHt9O1xuICB9O1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGxldCBhdHRyc1Byb3h5O1xuICAgIGxldCBzbG90c1Byb3h5O1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgIGdldCBhdHRycygpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJzUHJveHkgfHwgKGF0dHJzUHJveHkgPSBuZXcgUHJveHkoaW5zdGFuY2UuYXR0cnMsIGF0dHJzUHJveHlIYW5kbGVycykpO1xuICAgICAgfSxcbiAgICAgIGdldCBzbG90cygpIHtcbiAgICAgICAgcmV0dXJuIHNsb3RzUHJveHkgfHwgKHNsb3RzUHJveHkgPSBnZXRTbG90c1Byb3h5KGluc3RhbmNlKSk7XG4gICAgICB9LFxuICAgICAgZ2V0IGVtaXQoKSB7XG4gICAgICAgIHJldHVybiAoZXZlbnQsIC4uLmFyZ3MpID0+IGluc3RhbmNlLmVtaXQoZXZlbnQsIC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICAgIGV4cG9zZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBhdHRyczogbmV3IFByb3h5KGluc3RhbmNlLmF0dHJzLCBhdHRyc1Byb3h5SGFuZGxlcnMpLFxuICAgICAgc2xvdHM6IGluc3RhbmNlLnNsb3RzLFxuICAgICAgZW1pdDogaW5zdGFuY2UuZW1pdCxcbiAgICAgIGV4cG9zZVxuICAgIH07XG4gIH1cbn1cbmZ1bmN0aW9uIGdldENvbXBvbmVudFB1YmxpY0luc3RhbmNlKGluc3RhbmNlKSB7XG4gIGlmIChpbnN0YW5jZS5leHBvc2VkKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmV4cG9zZVByb3h5IHx8IChpbnN0YW5jZS5leHBvc2VQcm94eSA9IG5ldyBQcm94eShwcm94eVJlZnMobWFya1JhdyhpbnN0YW5jZS5leHBvc2VkKSksIHtcbiAgICAgIGdldCh0YXJnZXQsIGtleSkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldCkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXRba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgaW4gcHVibGljUHJvcGVydGllc01hcCkge1xuICAgICAgICAgIHJldHVybiBwdWJsaWNQcm9wZXJ0aWVzTWFwW2tleV0oaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzKHRhcmdldCwga2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgaW4gdGFyZ2V0IHx8IGtleSBpbiBwdWJsaWNQcm9wZXJ0aWVzTWFwO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW5zdGFuY2UucHJveHk7XG4gIH1cbn1cbmNvbnN0IGNsYXNzaWZ5UkUgPSAvKD86XnxbLV9dKShcXHcpL2c7XG5jb25zdCBjbGFzc2lmeSA9IChzdHIpID0+IHN0ci5yZXBsYWNlKGNsYXNzaWZ5UkUsIChjKSA9PiBjLnRvVXBwZXJDYXNlKCkpLnJlcGxhY2UoL1stX10vZywgXCJcIik7XG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCwgaW5jbHVkZUluZmVycmVkID0gdHJ1ZSkge1xuICByZXR1cm4gaXNGdW5jdGlvbihDb21wb25lbnQpID8gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIDogQ29tcG9uZW50Lm5hbWUgfHwgaW5jbHVkZUluZmVycmVkICYmIENvbXBvbmVudC5fX25hbWU7XG59XG5mdW5jdGlvbiBmb3JtYXRDb21wb25lbnROYW1lKGluc3RhbmNlLCBDb21wb25lbnQsIGlzUm9vdCA9IGZhbHNlKSB7XG4gIGxldCBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpO1xuICBpZiAoIW5hbWUgJiYgQ29tcG9uZW50Ll9fZmlsZSkge1xuICAgIGNvbnN0IG1hdGNoID0gQ29tcG9uZW50Ll9fZmlsZS5tYXRjaCgvKFteL1xcXFxdKylcXC5cXHcrJC8pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgbmFtZSA9IG1hdGNoWzFdO1xuICAgIH1cbiAgfVxuICBpZiAoIW5hbWUgJiYgaW5zdGFuY2UgJiYgaW5zdGFuY2UucGFyZW50KSB7XG4gICAgY29uc3QgaW5mZXJGcm9tUmVnaXN0cnkgPSAocmVnaXN0cnkpID0+IHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlZ2lzdHJ5KSB7XG4gICAgICAgIGlmIChyZWdpc3RyeVtrZXldID09PSBDb21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBuYW1lID0gaW5mZXJGcm9tUmVnaXN0cnkoXG4gICAgICBpbnN0YW5jZS5jb21wb25lbnRzIHx8IGluc3RhbmNlLnBhcmVudC50eXBlLmNvbXBvbmVudHNcbiAgICApIHx8IGluZmVyRnJvbVJlZ2lzdHJ5KGluc3RhbmNlLmFwcENvbnRleHQuY29tcG9uZW50cyk7XG4gIH1cbiAgcmV0dXJuIG5hbWUgPyBjbGFzc2lmeShuYW1lKSA6IGlzUm9vdCA/IGBBcHBgIDogYEFub255bW91c2A7XG59XG5mdW5jdGlvbiBpc0NsYXNzQ29tcG9uZW50KHZhbHVlKSB7XG4gIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlKSAmJiBcIl9fdmNjT3B0c1wiIGluIHZhbHVlO1xufVxuXG5jb25zdCBjb21wdXRlZCA9IChnZXR0ZXJPck9wdGlvbnMsIGRlYnVnT3B0aW9ucykgPT4ge1xuICBjb25zdCBjID0gY29tcHV0ZWQkMShnZXR0ZXJPck9wdGlvbnMsIGRlYnVnT3B0aW9ucywgaXNJblNTUkNvbXBvbmVudFNldHVwKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBjb25zdCBpID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgaWYgKGkgJiYgaS5hcHBDb250ZXh0LmNvbmZpZy53YXJuUmVjdXJzaXZlQ29tcHV0ZWQpIHtcbiAgICAgIGMuX3dhcm5SZWN1cnNpdmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYztcbn07XG5cbmZ1bmN0aW9uIGgodHlwZSwgcHJvcHNPckNoaWxkcmVuLCBjaGlsZHJlbikge1xuICBjb25zdCBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgaWYgKGwgPT09IDIpIHtcbiAgICBpZiAoaXNPYmplY3QocHJvcHNPckNoaWxkcmVuKSAmJiAhaXNBcnJheShwcm9wc09yQ2hpbGRyZW4pKSB7XG4gICAgICBpZiAoaXNWTm9kZShwcm9wc09yQ2hpbGRyZW4pKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVWTm9kZSh0eXBlLCBudWxsLCBbcHJvcHNPckNoaWxkcmVuXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3JlYXRlVk5vZGUodHlwZSwgcHJvcHNPckNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNyZWF0ZVZOb2RlKHR5cGUsIG51bGwsIHByb3BzT3JDaGlsZHJlbik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChsID4gMykge1xuICAgICAgY2hpbGRyZW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIH0gZWxzZSBpZiAobCA9PT0gMyAmJiBpc1ZOb2RlKGNoaWxkcmVuKSkge1xuICAgICAgY2hpbGRyZW4gPSBbY2hpbGRyZW5dO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlVk5vZGUodHlwZSwgcHJvcHNPckNoaWxkcmVuLCBjaGlsZHJlbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEN1c3RvbUZvcm1hdHRlcigpIHtcbiAgaWYgKCEhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdnVlU3R5bGUgPSB7IHN0eWxlOiBcImNvbG9yOiMzYmE3NzZcIiB9O1xuICBjb25zdCBudW1iZXJTdHlsZSA9IHsgc3R5bGU6IFwiY29sb3I6IzE2NzdmZlwiIH07XG4gIGNvbnN0IHN0cmluZ1N0eWxlID0geyBzdHlsZTogXCJjb2xvcjojZjUyMjJkXCIgfTtcbiAgY29uc3Qga2V5d29yZFN0eWxlID0geyBzdHlsZTogXCJjb2xvcjojZWIyZjk2XCIgfTtcbiAgY29uc3QgZm9ybWF0dGVyID0ge1xuICAgIF9fdnVlX2N1c3RvbV9mb3JtYXR0ZXI6IHRydWUsXG4gICAgaGVhZGVyKG9iaikge1xuICAgICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKG9iai5fX2lzVnVlKSB7XG4gICAgICAgIHJldHVybiBbXCJkaXZcIiwgdnVlU3R5bGUsIGBWdWVJbnN0YW5jZWBdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlZihvYmopKSB7XG4gICAgICAgIHBhdXNlVHJhY2tpbmcoKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvYmoudmFsdWU7XG4gICAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIFtcInNwYW5cIiwgdnVlU3R5bGUsIGdlblJlZkZsYWcob2JqKV0sXG4gICAgICAgICAgXCI8XCIsXG4gICAgICAgICAgZm9ybWF0VmFsdWUodmFsdWUpLFxuICAgICAgICAgIGA+YFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIGlmIChpc1JlYWN0aXZlKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIFtcInNwYW5cIiwgdnVlU3R5bGUsIGlzU2hhbGxvdyhvYmopID8gXCJTaGFsbG93UmVhY3RpdmVcIiA6IFwiUmVhY3RpdmVcIl0sXG4gICAgICAgICAgXCI8XCIsXG4gICAgICAgICAgZm9ybWF0VmFsdWUob2JqKSxcbiAgICAgICAgICBgPiR7aXNSZWFkb25seShvYmopID8gYCAocmVhZG9ubHkpYCA6IGBgfWBcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSBpZiAoaXNSZWFkb25seShvYmopKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7fSxcbiAgICAgICAgICBbXCJzcGFuXCIsIHZ1ZVN0eWxlLCBpc1NoYWxsb3cob2JqKSA/IFwiU2hhbGxvd1JlYWRvbmx5XCIgOiBcIlJlYWRvbmx5XCJdLFxuICAgICAgICAgIFwiPFwiLFxuICAgICAgICAgIGZvcm1hdFZhbHVlKG9iaiksXG4gICAgICAgICAgXCI+XCJcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgaGFzQm9keShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqLl9faXNWdWU7XG4gICAgfSxcbiAgICBib2R5KG9iaikge1xuICAgICAgaWYgKG9iaiAmJiBvYmouX19pc1Z1ZSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge30sXG4gICAgICAgICAgLi4uZm9ybWF0SW5zdGFuY2Uob2JqLiQpXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBmb3JtYXRJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuICAgIGlmIChpbnN0YW5jZS50eXBlLnByb3BzICYmIGluc3RhbmNlLnByb3BzKSB7XG4gICAgICBibG9ja3MucHVzaChjcmVhdGVJbnN0YW5jZUJsb2NrKFwicHJvcHNcIiwgdG9SYXcoaW5zdGFuY2UucHJvcHMpKSk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5zZXR1cFN0YXRlICE9PSBFTVBUWV9PQkopIHtcbiAgICAgIGJsb2Nrcy5wdXNoKGNyZWF0ZUluc3RhbmNlQmxvY2soXCJzZXR1cFwiLCBpbnN0YW5jZS5zZXR1cFN0YXRlKSk7XG4gICAgfVxuICAgIGlmIChpbnN0YW5jZS5kYXRhICE9PSBFTVBUWV9PQkopIHtcbiAgICAgIGJsb2Nrcy5wdXNoKGNyZWF0ZUluc3RhbmNlQmxvY2soXCJkYXRhXCIsIHRvUmF3KGluc3RhbmNlLmRhdGEpKSk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXB1dGVkID0gZXh0cmFjdEtleXMoaW5zdGFuY2UsIFwiY29tcHV0ZWRcIik7XG4gICAgaWYgKGNvbXB1dGVkKSB7XG4gICAgICBibG9ja3MucHVzaChjcmVhdGVJbnN0YW5jZUJsb2NrKFwiY29tcHV0ZWRcIiwgY29tcHV0ZWQpKTtcbiAgICB9XG4gICAgY29uc3QgaW5qZWN0ZWQgPSBleHRyYWN0S2V5cyhpbnN0YW5jZSwgXCJpbmplY3RcIik7XG4gICAgaWYgKGluamVjdGVkKSB7XG4gICAgICBibG9ja3MucHVzaChjcmVhdGVJbnN0YW5jZUJsb2NrKFwiaW5qZWN0ZWRcIiwgaW5qZWN0ZWQpKTtcbiAgICB9XG4gICAgYmxvY2tzLnB1c2goW1xuICAgICAgXCJkaXZcIixcbiAgICAgIHt9LFxuICAgICAgW1xuICAgICAgICBcInNwYW5cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiBrZXl3b3JkU3R5bGUuc3R5bGUgKyBcIjtvcGFjaXR5OjAuNjZcIlxuICAgICAgICB9LFxuICAgICAgICBcIiQgKGludGVybmFsKTogXCJcbiAgICAgIF0sXG4gICAgICBbXCJvYmplY3RcIiwgeyBvYmplY3Q6IGluc3RhbmNlIH1dXG4gICAgXSk7XG4gICAgcmV0dXJuIGJsb2NrcztcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZUJsb2NrKHR5cGUsIHRhcmdldCkge1xuICAgIHRhcmdldCA9IGV4dGVuZCh7fSwgdGFyZ2V0KTtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHRhcmdldCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCB7fV07XG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdHlsZTogXCJsaW5lLWhlaWdodDoxLjI1ZW07bWFyZ2luLWJvdHRvbTowLjZlbVwiIH0sXG4gICAgICBbXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdHlsZTogXCJjb2xvcjojNDc2NTgyXCJcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZVxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiBcInBhZGRpbmctbGVmdDoxLjI1ZW1cIlxuICAgICAgICB9LFxuICAgICAgICAuLi5PYmplY3Qua2V5cyh0YXJnZXQpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIFtcInNwYW5cIiwga2V5d29yZFN0eWxlLCBrZXkgKyBcIjogXCJdLFxuICAgICAgICAgICAgZm9ybWF0VmFsdWUodGFyZ2V0W2tleV0sIGZhbHNlKVxuICAgICAgICAgIF07XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgXTtcbiAgfVxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2LCBhc1JhdyA9IHRydWUpIHtcbiAgICBpZiAodHlwZW9mIHYgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBbXCJzcGFuXCIsIG51bWJlclN0eWxlLCB2XTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCBzdHJpbmdTdHlsZSwgSlNPTi5zdHJpbmdpZnkodildO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCBrZXl3b3JkU3R5bGUsIHZdO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodikpIHtcbiAgICAgIHJldHVybiBbXCJvYmplY3RcIiwgeyBvYmplY3Q6IGFzUmF3ID8gdG9SYXcodikgOiB2IH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW1wic3BhblwiLCBzdHJpbmdTdHlsZSwgU3RyaW5nKHYpXTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZXh0cmFjdEtleXMoaW5zdGFuY2UsIHR5cGUpIHtcbiAgICBjb25zdCBDb21wID0gaW5zdGFuY2UudHlwZTtcbiAgICBpZiAoaXNGdW5jdGlvbihDb21wKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBleHRyYWN0ZWQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBpbnN0YW5jZS5jdHgpIHtcbiAgICAgIGlmIChpc0tleU9mVHlwZShDb21wLCBrZXksIHR5cGUpKSB7XG4gICAgICAgIGV4dHJhY3RlZFtrZXldID0gaW5zdGFuY2UuY3R4W2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleHRyYWN0ZWQ7XG4gIH1cbiAgZnVuY3Rpb24gaXNLZXlPZlR5cGUoQ29tcCwga2V5LCB0eXBlKSB7XG4gICAgY29uc3Qgb3B0cyA9IENvbXBbdHlwZV07XG4gICAgaWYgKGlzQXJyYXkob3B0cykgJiYgb3B0cy5pbmNsdWRlcyhrZXkpIHx8IGlzT2JqZWN0KG9wdHMpICYmIGtleSBpbiBvcHRzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKENvbXAuZXh0ZW5kcyAmJiBpc0tleU9mVHlwZShDb21wLmV4dGVuZHMsIGtleSwgdHlwZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoQ29tcC5taXhpbnMgJiYgQ29tcC5taXhpbnMuc29tZSgobSkgPT4gaXNLZXlPZlR5cGUobSwga2V5LCB0eXBlKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBnZW5SZWZGbGFnKHYpIHtcbiAgICBpZiAoaXNTaGFsbG93KHYpKSB7XG4gICAgICByZXR1cm4gYFNoYWxsb3dSZWZgO1xuICAgIH1cbiAgICBpZiAodi5lZmZlY3QpIHtcbiAgICAgIHJldHVybiBgQ29tcHV0ZWRSZWZgO1xuICAgIH1cbiAgICByZXR1cm4gYFJlZmA7XG4gIH1cbiAgaWYgKHdpbmRvdy5kZXZ0b29sc0Zvcm1hdHRlcnMpIHtcbiAgICB3aW5kb3cuZGV2dG9vbHNGb3JtYXR0ZXJzLnB1c2goZm9ybWF0dGVyKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuZGV2dG9vbHNGb3JtYXR0ZXJzID0gW2Zvcm1hdHRlcl07XG4gIH1cbn1cblxuZnVuY3Rpb24gd2l0aE1lbW8obWVtbywgcmVuZGVyLCBjYWNoZSwgaW5kZXgpIHtcbiAgY29uc3QgY2FjaGVkID0gY2FjaGVbaW5kZXhdO1xuICBpZiAoY2FjaGVkICYmIGlzTWVtb1NhbWUoY2FjaGVkLCBtZW1vKSkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cbiAgY29uc3QgcmV0ID0gcmVuZGVyKCk7XG4gIHJldC5tZW1vID0gbWVtby5zbGljZSgpO1xuICByZXQuY2FjaGVJbmRleCA9IGluZGV4O1xuICByZXR1cm4gY2FjaGVbaW5kZXhdID0gcmV0O1xufVxuZnVuY3Rpb24gaXNNZW1vU2FtZShjYWNoZWQsIG1lbW8pIHtcbiAgY29uc3QgcHJldiA9IGNhY2hlZC5tZW1vO1xuICBpZiAocHJldi5sZW5ndGggIT0gbWVtby5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGhhc0NoYW5nZWQocHJldltpXSwgbWVtb1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQmxvY2tUcmVlRW5hYmxlZCA+IDAgJiYgY3VycmVudEJsb2NrKSB7XG4gICAgY3VycmVudEJsb2NrLnB1c2goY2FjaGVkKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgdmVyc2lvbiA9IFwiMy41LjIwXCI7XG5jb25zdCB3YXJuID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHdhcm4kMSA6IE5PT1A7XG5jb25zdCBFcnJvclR5cGVTdHJpbmdzID0gRXJyb3JUeXBlU3RyaW5ncyQxIDtcbmNvbnN0IGRldnRvb2xzID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB8fCB0cnVlID8gZGV2dG9vbHMkMSA6IHZvaWQgMDtcbmNvbnN0IHNldERldnRvb2xzSG9vayA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgfHwgdHJ1ZSA/IHNldERldnRvb2xzSG9vayQxIDogTk9PUDtcbmNvbnN0IF9zc3JVdGlscyA9IHtcbiAgY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UsXG4gIHNldHVwQ29tcG9uZW50LFxuICByZW5kZXJDb21wb25lbnRSb290LFxuICBzZXRDdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UsXG4gIGlzVk5vZGU6IGlzVk5vZGUsXG4gIG5vcm1hbGl6ZVZOb2RlLFxuICBnZXRDb21wb25lbnRQdWJsaWNJbnN0YW5jZSxcbiAgZW5zdXJlVmFsaWRWTm9kZSxcbiAgcHVzaFdhcm5pbmdDb250ZXh0LFxuICBwb3BXYXJuaW5nQ29udGV4dFxufTtcbmNvbnN0IHNzclV0aWxzID0gX3NzclV0aWxzIDtcbmNvbnN0IHJlc29sdmVGaWx0ZXIgPSBudWxsO1xuY29uc3QgY29tcGF0VXRpbHMgPSBudWxsO1xuY29uc3QgRGVwcmVjYXRpb25UeXBlcyA9IG51bGw7XG5cbmV4cG9ydCB7IEJhc2VUcmFuc2l0aW9uLCBCYXNlVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycywgQ29tbWVudCwgRGVwcmVjYXRpb25UeXBlcywgRXJyb3JDb2RlcywgRXJyb3JUeXBlU3RyaW5ncywgRnJhZ21lbnQsIEtlZXBBbGl2ZSwgU3RhdGljLCBTdXNwZW5zZSwgVGVsZXBvcnQsIFRleHQsIGFzc2VydE51bWJlciwgY2FsbFdpdGhBc3luY0Vycm9ySGFuZGxpbmcsIGNhbGxXaXRoRXJyb3JIYW5kbGluZywgY2xvbmVWTm9kZSwgY29tcGF0VXRpbHMsIGNvbXB1dGVkLCBjcmVhdGVCbG9jaywgY3JlYXRlQ29tbWVudFZOb2RlLCBjcmVhdGVFbGVtZW50QmxvY2ssIGNyZWF0ZUJhc2VWTm9kZSBhcyBjcmVhdGVFbGVtZW50Vk5vZGUsIGNyZWF0ZUh5ZHJhdGlvblJlbmRlcmVyLCBjcmVhdGVQcm9wc1Jlc3RQcm94eSwgY3JlYXRlUmVuZGVyZXIsIGNyZWF0ZVNsb3RzLCBjcmVhdGVTdGF0aWNWTm9kZSwgY3JlYXRlVGV4dFZOb2RlLCBjcmVhdGVWTm9kZSwgZGVmaW5lQXN5bmNDb21wb25lbnQsIGRlZmluZUNvbXBvbmVudCwgZGVmaW5lRW1pdHMsIGRlZmluZUV4cG9zZSwgZGVmaW5lTW9kZWwsIGRlZmluZU9wdGlvbnMsIGRlZmluZVByb3BzLCBkZWZpbmVTbG90cywgZGV2dG9vbHMsIGdldEN1cnJlbnRJbnN0YW5jZSwgZ2V0VHJhbnNpdGlvblJhd0NoaWxkcmVuLCBndWFyZFJlYWN0aXZlUHJvcHMsIGgsIGhhbmRsZUVycm9yLCBoYXNJbmplY3Rpb25Db250ZXh0LCBoeWRyYXRlT25JZGxlLCBoeWRyYXRlT25JbnRlcmFjdGlvbiwgaHlkcmF0ZU9uTWVkaWFRdWVyeSwgaHlkcmF0ZU9uVmlzaWJsZSwgaW5pdEN1c3RvbUZvcm1hdHRlciwgaW5qZWN0LCBpc01lbW9TYW1lLCBpc1J1bnRpbWVPbmx5LCBpc1ZOb2RlLCBtZXJnZURlZmF1bHRzLCBtZXJnZU1vZGVscywgbWVyZ2VQcm9wcywgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkJlZm9yZU1vdW50LCBvbkJlZm9yZVVubW91bnQsIG9uQmVmb3JlVXBkYXRlLCBvbkRlYWN0aXZhdGVkLCBvbkVycm9yQ2FwdHVyZWQsIG9uTW91bnRlZCwgb25SZW5kZXJUcmFja2VkLCBvblJlbmRlclRyaWdnZXJlZCwgb25TZXJ2ZXJQcmVmZXRjaCwgb25Vbm1vdW50ZWQsIG9uVXBkYXRlZCwgb3BlbkJsb2NrLCBwb3BTY29wZUlkLCBwcm92aWRlLCBwdXNoU2NvcGVJZCwgcXVldWVQb3N0Rmx1c2hDYiwgcmVnaXN0ZXJSdW50aW1lQ29tcGlsZXIsIHJlbmRlckxpc3QsIHJlbmRlclNsb3QsIHJlc29sdmVDb21wb25lbnQsIHJlc29sdmVEaXJlY3RpdmUsIHJlc29sdmVEeW5hbWljQ29tcG9uZW50LCByZXNvbHZlRmlsdGVyLCByZXNvbHZlVHJhbnNpdGlvbkhvb2tzLCBzZXRCbG9ja1RyYWNraW5nLCBzZXREZXZ0b29sc0hvb2ssIHNldFRyYW5zaXRpb25Ib29rcywgc3NyQ29udGV4dEtleSwgc3NyVXRpbHMsIHRvSGFuZGxlcnMsIHRyYW5zZm9ybVZOb2RlQXJncywgdXNlQXR0cnMsIHVzZUlkLCB1c2VNb2RlbCwgdXNlU1NSQ29udGV4dCwgdXNlU2xvdHMsIHVzZVRlbXBsYXRlUmVmLCB1c2VUcmFuc2l0aW9uU3RhdGUsIHZlcnNpb24sIHdhcm4sIHdhdGNoLCB3YXRjaEVmZmVjdCwgd2F0Y2hQb3N0RWZmZWN0LCB3YXRjaFN5bmNFZmZlY3QsIHdpdGhBc3luY0NvbnRleHQsIHdpdGhDdHgsIHdpdGhEZWZhdWx0cywgd2l0aERpcmVjdGl2ZXMsIHdpdGhNZW1vLCB3aXRoU2NvcGVJZCB9O1xuIl0sIm5hbWVzIjpbInJlZiIsImgiLCJlZmZlY3QiLCJyZW1vdmUyIiwicmVtb3ZlIiwidHJhY2siLCJ0cmlnZ2VyIiwiaXNNb2RlbExpc3RlbmVyIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQSxNQUFNLFFBQVEsQ0FBQTtBQU9kLElBQUksWUFBWTtBQUNoQixTQUFTLE9BQU8sUUFBUSxNQUFN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
