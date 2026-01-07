import {
  isObject,
  toRawType,
  isFunction,
  hasChanged,
  extend,
  hasOwn,
  isArray,
  isIntegerKey,
  isSymbol,
  makeMap,
  isMap,
  EMPTY_OBJ,
  def,
  isSet,
  isPlainObject,
  remove,
  NOOP,
} from './shared.esm-bundler.js';
/**
 * @vue/reactivity v3.5.20
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (
      link.dep.version !== link.version ||
      (link.dep.computed &&
        (refreshComputed(link.dep.computed) || link.dep.version !== link.version))
    ) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (
    !computed2.isSSR &&
    computed2.flags & 128 &&
    ((!computed2.deps && !computed2._dirty) || !isDirty(computed2))
  ) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false);
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol('');
const MAP_KEY_ITERATE_KEY = Symbol('');
const ARRAY_ITERATE_KEY = Symbol('');
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = /* @__PURE__ */ new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Dep()));
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = dep => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === 'clear') {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === 'length') {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (
          key2 === 'length' ||
          key2 === ARRAY_ITERATE_KEY ||
          (!isSymbol(key2) && key2 >= newLength)
        ) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case 'add':
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get('length'));
          }
          break;
        case 'delete':
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case 'set':
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, 'iterate', ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track((arr = toRaw(arr)), 'iterate', ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map(x => (isArray(x) ? reactiveReadArray(x) : x)),
    );
  },
  entries() {
    return iterator(this, 'entries', value => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, 'every', fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, 'filter', fn, thisArg, v => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, 'find', fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, 'findIndex', fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, 'findLast', fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, 'findLastIndex', fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, 'forEach', fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, 'includes', args);
  },
  indexOf(...args) {
    return searchProxy(this, 'indexOf', args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, 'lastIndexOf', args);
  },
  map(fn, thisArg) {
    return apply(this, 'map', fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, 'pop');
  },
  push(...args) {
    return noTracking(this, 'push', args);
  },
  reduce(fn, ...args) {
    return reduce(this, 'reduce', fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, 'reduceRight', fn, args);
  },
  shift() {
    return noTracking(this, 'shift');
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, 'some', fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, 'splice', args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, 'unshift', args);
  },
  values() {
    return iterator(this, 'values', toReactive);
  },
};
function iterator(self, method, wrapValue) {
  const arr = shallowReadArray(self);
  const iter = arr[method]();
  if (arr !== self && !isShallow(self)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self);
  const needsWrap = arr !== self && !isShallow(self);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self) {
    if (needsWrap) {
      wrappedFn = function (item, index) {
        return fn.call(this, toReactive(item), index, self);
      };
    } else if (fn.length > 2) {
      wrappedFn = function (item, index) {
        return fn.call(this, item, index, self);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
  const arr = shallowReadArray(self);
  let wrappedFn = fn;
  if (arr !== self) {
    if (!isShallow(self)) {
      wrappedFn = function (acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self);
      };
    } else if (fn.length > 3) {
      wrappedFn = function (acc, item, index) {
        return fn.call(this, acc, item, index, self);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self, method, args) {
  const arr = toRaw(self);
  track(arr, 'iterate', ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self)[method].apply(self, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol)
    .filter(key => key !== 'arguments' && key !== 'caller')
    .map(key => Symbol[key])
    .filter(isSymbol),
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, 'has', key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === '__v_skip') return target['__v_skip'];
    const isReadonly2 = this._isReadonly,
      isShallow2 = this._isShallow;
    if (key === '__v_isReactive') {
      return !isReadonly2;
    } else if (key === '__v_isReadonly') {
      return isReadonly2;
    } else if (key === '__v_isShallow') {
      return isShallow2;
    } else if (key === '__v_raw') {
      if (
        receiver ===
          (isReadonly2
            ? isShallow2
              ? shallowReadonlyMap
              : readonlyMap
            : isShallow2
              ? shallowReactiveMap
              : reactiveMap
          ).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)
      ) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === 'hasOwnProperty') {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver,
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, 'get', key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey =
      isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, 'add', key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, 'set', key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, 'delete', key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, 'has', key);
    }
    return result;
  }
  ownKeys(target) {
    track(target, 'iterate', isArray(target) ? 'length' : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = value => value;
const getProto = v => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function (...args) {
    const target = this['__v_raw'];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
    const isKeyOnly = method === 'keys' && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, 'iterate', isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done
          ? { value, done }
          : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done,
            };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      },
    };
  };
}
function createReadonlyMethod(type) {
  return function (...args) {
    return type === 'delete' ? false : type === 'clear' ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this['__v_raw'];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, 'get', key);
        }
        track(rawTarget, 'get', rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this['__v_raw'];
      !readonly2 && track(toRaw(target), 'iterate', ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this['__v_raw'];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, 'has', key);
        }
        track(rawTarget, 'has', rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed['__v_raw'];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, 'iterate', ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    },
  };
  extend(
    instrumentations,
    readonly2
      ? {
          add: createReadonlyMethod('add'),
          set: createReadonlyMethod('set'),
          delete: createReadonlyMethod('delete'),
          clear: createReadonlyMethod('clear'),
        }
      : {
          add(value) {
            if (!shallow && !isShallow(value) && !isReadonly(value)) {
              value = toRaw(value);
            }
            const target = toRaw(this);
            const proto = getProto(target);
            const hadKey = proto.has.call(target, value);
            if (!hadKey) {
              target.add(value);
              trigger(target, 'add', value, value);
            }
            return this;
          },
          set(key, value) {
            if (!shallow && !isShallow(value) && !isReadonly(value)) {
              value = toRaw(value);
            }
            const target = toRaw(this);
            const { has, get } = getProto(target);
            let hadKey = has.call(target, key);
            if (!hadKey) {
              key = toRaw(key);
              hadKey = has.call(target, key);
            }
            const oldValue = get.call(target, key);
            target.set(key, value);
            if (!hadKey) {
              trigger(target, 'add', key, value);
            } else if (hasChanged(value, oldValue)) {
              trigger(target, 'set', key, value);
            }
            return this;
          },
          delete(key) {
            const target = toRaw(this);
            const { has, get } = getProto(target);
            let hadKey = has.call(target, key);
            if (!hadKey) {
              key = toRaw(key);
              hadKey = has.call(target, key);
            }
            get ? get.call(target, key) : void 0;
            const result = target.delete(key);
            if (hadKey) {
              trigger(target, 'delete', key, void 0);
            }
            return result;
          },
          clear() {
            const target = toRaw(this);
            const hadItems = target.size !== 0;
            const result = target.clear();
            if (hadItems) {
              trigger(target, 'clear', void 0, void 0);
            }
            return result;
          },
        },
  );
  const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
  iteratorMethods.forEach(method => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === '__v_isReactive') {
      return !isReadonly2;
    } else if (key === '__v_isReadonly') {
      return isReadonly2;
    } else if (key === '__v_raw') {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver,
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false),
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true),
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false),
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true),
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value['__v_skip'] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap,
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap,
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap,
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap,
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target['__v_raw'] && !(isReadonly2 && target['__v_isReactive'])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value['__v_raw']);
  }
  return !!(value && value['__v_isReactive']);
}
function isReadonly(value) {
  return !!(value && value['__v_isReadonly']);
}
function isShallow(value) {
  return !!(value && value['__v_isShallow']);
}
function isProxy(value) {
  return value ? !!value['__v_raw'] : false;
}
function toRaw(observed) {
  const raw = observed && observed['__v_raw'];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, '__v_skip') && Object.isExtensible(value)) {
    def(value, '__v_skip', true);
  }
  return value;
}
const toReactive = value => (isObject(value) ? reactive(value) : value);
const toReadonly = value => (isObject(value) ? readonly(value) : value);
function isRef(r) {
  return r ? r['__v_isRef'] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this['__v_isRef'] = true;
    this['__v_isShallow'] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this['__v_isShallow'] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this['__v_isShallow'] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function triggerRef(ref2) {
  if (ref2.dep) {
    {
      ref2.dep.trigger();
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) =>
    key === '__v_raw' ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  },
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs)
    ? objectWithRefs
    : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this['__v_isRef'] = true;
    this._value = void 0;
    const dep = (this.dep = new Dep());
    const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
    this._get = get;
    this._set = set;
  }
  get value() {
    return (this._value = this._get());
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this['__v_isRef'] = true;
    this._value = void 0;
  }
  get value() {
    const val = this._object[this._key];
    return (this._value = val === void 0 ? this._defaultValue : val);
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this['__v_isRef'] = true;
    this['__v_isReadonly'] = true;
    this._value = void 0;
  }
  get value() {
    return (this._value = this._getter());
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this['__v_isReadonly'] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (
      !(this.flags & 8) && // avoid infinite self recursion
      activeSub !== this
    ) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, (cleanups = []));
    cleanups.push(cleanupFn);
  }
}
function watch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = source2 => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(s => isReactive(s) || isShallow(s));
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else;
      });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource
    ? new Array(source.length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE;
  const job = immediateFirstRun => {
    if (!(effect2.flags & 1) || (!effect2.dirty && !immediateFirstRun)) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
          : hasChanged(newValue, oldValue))
      ) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE
              ? void 0
              : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
                ? []
                : oldValue,
            boundCleanup,
          ];
          oldValue = newValue;
          call
            ? call(cb, 3, args)
            : // @ts-expect-error
              cb(...args);
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = fn => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value['__v_skip']) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach(v => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
export {
  ARRAY_ITERATE_KEY,
  EffectScope,
  ITERATE_KEY,
  MAP_KEY_ITERATE_KEY,
  ReactiveEffect,
  computed,
  customRef,
  getCurrentScope,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  isShallow,
  markRaw,
  onWatcherCleanup,
  pauseTracking,
  proxyRefs,
  reactive,
  reactiveReadArray,
  readonly,
  ref,
  resetTracking,
  shallowReactive,
  shallowReadArray,
  shallowReadonly,
  shallowRef,
  toRaw,
  toReactive,
  toReadonly,
  toRef,
  track,
  traverse,
  trigger,
  triggerRef,
  unref,
  watch,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpdml0eS5lc20tYnVuZGxlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0B2dWUrcmVhY3Rpdml0eUAzLjUuMjAvbm9kZV9tb2R1bGVzL0B2dWUvcmVhY3Rpdml0eS9kaXN0L3JlYWN0aXZpdHkuZXNtLWJ1bmRsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIEB2dWUvcmVhY3Rpdml0eSB2My41LjIwXG4qIChjKSAyMDE4LXByZXNlbnQgWXV4aSAoRXZhbikgWW91IGFuZCBWdWUgY29udHJpYnV0b3JzXG4qIEBsaWNlbnNlIE1JVFxuKiovXG5pbXBvcnQgeyBleHRlbmQsIGhhc0NoYW5nZWQsIGlzQXJyYXksIGlzSW50ZWdlcktleSwgaXNTeW1ib2wsIGlzTWFwLCBoYXNPd24sIG1ha2VNYXAsIGlzT2JqZWN0LCBjYXBpdGFsaXplLCB0b1Jhd1R5cGUsIGRlZiwgaXNGdW5jdGlvbiwgRU1QVFlfT0JKLCBpc1NldCwgaXNQbGFpbk9iamVjdCwgcmVtb3ZlLCBOT09QIH0gZnJvbSAnQHZ1ZS9zaGFyZWQnO1xuXG5mdW5jdGlvbiB3YXJuKG1zZywgLi4uYXJncykge1xuICBjb25zb2xlLndhcm4oYFtWdWUgd2Fybl0gJHttc2d9YCwgLi4uYXJncyk7XG59XG5cbmxldCBhY3RpdmVFZmZlY3RTY29wZTtcbmNsYXNzIEVmZmVjdFNjb3BlIHtcbiAgY29uc3RydWN0b3IoZGV0YWNoZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuZGV0YWNoZWQgPSBkZXRhY2hlZDtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbCB0cmFjayBgb25gIGNhbGxzLCBhbGxvdyBgb25gIGNhbGwgbXVsdGlwbGUgdGltZXNcbiAgICAgKi9cbiAgICB0aGlzLl9vbiA9IDA7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5lZmZlY3RzID0gW107XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5jbGVhbnVwcyA9IFtdO1xuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnQgPSBhY3RpdmVFZmZlY3RTY29wZTtcbiAgICBpZiAoIWRldGFjaGVkICYmIGFjdGl2ZUVmZmVjdFNjb3BlKSB7XG4gICAgICB0aGlzLmluZGV4ID0gKGFjdGl2ZUVmZmVjdFNjb3BlLnNjb3BlcyB8fCAoYWN0aXZlRWZmZWN0U2NvcGUuc2NvcGVzID0gW10pKS5wdXNoKFxuICAgICAgICB0aGlzXG4gICAgICApIC0gMTtcbiAgICB9XG4gIH1cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcbiAgICAgIGxldCBpLCBsO1xuICAgICAgaWYgKHRoaXMuc2NvcGVzKSB7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLnNjb3Blcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnNjb3Blc1tpXS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5lZmZlY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmVmZmVjdHNbaV0ucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJlc3VtZXMgdGhlIGVmZmVjdCBzY29wZSwgaW5jbHVkaW5nIGFsbCBjaGlsZCBzY29wZXMgYW5kIGVmZmVjdHMuXG4gICAqL1xuICByZXN1bWUoKSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBpLCBsO1xuICAgICAgICBpZiAodGhpcy5zY29wZXMpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5zY29wZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3Blc1tpXS5yZXN1bWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuZWZmZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmVmZmVjdHNbaV0ucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcnVuKGZuKSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgY29uc3QgY3VycmVudEVmZmVjdFNjb3BlID0gYWN0aXZlRWZmZWN0U2NvcGU7XG4gICAgICB0cnkge1xuICAgICAgICBhY3RpdmVFZmZlY3RTY29wZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgYWN0aXZlRWZmZWN0U2NvcGUgPSBjdXJyZW50RWZmZWN0U2NvcGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuKGBjYW5ub3QgcnVuIGFuIGluYWN0aXZlIGVmZmVjdCBzY29wZS5gKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIG5vbi1kZXRhY2hlZCBzY29wZXNcbiAgICogQGludGVybmFsXG4gICAqL1xuICBvbigpIHtcbiAgICBpZiAoKyt0aGlzLl9vbiA9PT0gMSkge1xuICAgICAgdGhpcy5wcmV2U2NvcGUgPSBhY3RpdmVFZmZlY3RTY29wZTtcbiAgICAgIGFjdGl2ZUVmZmVjdFNjb3BlID0gdGhpcztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIG5vbi1kZXRhY2hlZCBzY29wZXNcbiAgICogQGludGVybmFsXG4gICAqL1xuICBvZmYoKSB7XG4gICAgaWYgKHRoaXMuX29uID4gMCAmJiAtLXRoaXMuX29uID09PSAwKSB7XG4gICAgICBhY3RpdmVFZmZlY3RTY29wZSA9IHRoaXMucHJldlNjb3BlO1xuICAgICAgdGhpcy5wcmV2U2NvcGUgPSB2b2lkIDA7XG4gICAgfVxuICB9XG4gIHN0b3AoZnJvbVBhcmVudCkge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgbGV0IGksIGw7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5lZmZlY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmVmZmVjdHNbaV0uc3RvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5lZmZlY3RzLmxlbmd0aCA9IDA7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5jbGVhbnVwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwc1tpXSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbGVhbnVwcy5sZW5ndGggPSAwO1xuICAgICAgaWYgKHRoaXMuc2NvcGVzKSB7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLnNjb3Blcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnNjb3Blc1tpXS5zdG9wKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NvcGVzLmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZGV0YWNoZWQgJiYgdGhpcy5wYXJlbnQgJiYgIWZyb21QYXJlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMucGFyZW50LnNjb3Blcy5wb3AoKTtcbiAgICAgICAgaWYgKGxhc3QgJiYgbGFzdCAhPT0gdGhpcykge1xuICAgICAgICAgIHRoaXMucGFyZW50LnNjb3Blc1t0aGlzLmluZGV4XSA9IGxhc3Q7XG4gICAgICAgICAgbGFzdC5pbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucGFyZW50ID0gdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZWZmZWN0U2NvcGUoZGV0YWNoZWQpIHtcbiAgcmV0dXJuIG5ldyBFZmZlY3RTY29wZShkZXRhY2hlZCk7XG59XG5mdW5jdGlvbiBnZXRDdXJyZW50U2NvcGUoKSB7XG4gIHJldHVybiBhY3RpdmVFZmZlY3RTY29wZTtcbn1cbmZ1bmN0aW9uIG9uU2NvcGVEaXNwb3NlKGZuLCBmYWlsU2lsZW50bHkgPSBmYWxzZSkge1xuICBpZiAoYWN0aXZlRWZmZWN0U2NvcGUpIHtcbiAgICBhY3RpdmVFZmZlY3RTY29wZS5jbGVhbnVwcy5wdXNoKGZuKTtcbiAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmICFmYWlsU2lsZW50bHkpIHtcbiAgICB3YXJuKFxuICAgICAgYG9uU2NvcGVEaXNwb3NlKCkgaXMgY2FsbGVkIHdoZW4gdGhlcmUgaXMgbm8gYWN0aXZlIGVmZmVjdCBzY29wZSB0byBiZSBhc3NvY2lhdGVkIHdpdGguYFxuICAgICk7XG4gIH1cbn1cblxubGV0IGFjdGl2ZVN1YjtcbmNvbnN0IEVmZmVjdEZsYWdzID0ge1xuICBcIkFDVElWRVwiOiAxLFxuICBcIjFcIjogXCJBQ1RJVkVcIixcbiAgXCJSVU5OSU5HXCI6IDIsXG4gIFwiMlwiOiBcIlJVTk5JTkdcIixcbiAgXCJUUkFDS0lOR1wiOiA0LFxuICBcIjRcIjogXCJUUkFDS0lOR1wiLFxuICBcIk5PVElGSUVEXCI6IDgsXG4gIFwiOFwiOiBcIk5PVElGSUVEXCIsXG4gIFwiRElSVFlcIjogMTYsXG4gIFwiMTZcIjogXCJESVJUWVwiLFxuICBcIkFMTE9XX1JFQ1VSU0VcIjogMzIsXG4gIFwiMzJcIjogXCJBTExPV19SRUNVUlNFXCIsXG4gIFwiUEFVU0VEXCI6IDY0LFxuICBcIjY0XCI6IFwiUEFVU0VEXCIsXG4gIFwiRVZBTFVBVEVEXCI6IDEyOCxcbiAgXCIxMjhcIjogXCJFVkFMVUFURURcIlxufTtcbmNvbnN0IHBhdXNlZFF1ZXVlRWZmZWN0cyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha1NldCgpO1xuY2xhc3MgUmVhY3RpdmVFZmZlY3Qge1xuICBjb25zdHJ1Y3Rvcihmbikge1xuICAgIHRoaXMuZm4gPSBmbjtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLmRlcHMgPSB2b2lkIDA7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5kZXBzVGFpbCA9IHZvaWQgMDtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLmZsYWdzID0gMSB8IDQ7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gdm9pZCAwO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHRoaXMuY2xlYW51cCA9IHZvaWQgMDtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHZvaWQgMDtcbiAgICBpZiAoYWN0aXZlRWZmZWN0U2NvcGUgJiYgYWN0aXZlRWZmZWN0U2NvcGUuYWN0aXZlKSB7XG4gICAgICBhY3RpdmVFZmZlY3RTY29wZS5lZmZlY3RzLnB1c2godGhpcyk7XG4gICAgfVxuICB9XG4gIHBhdXNlKCkge1xuICAgIHRoaXMuZmxhZ3MgfD0gNjQ7XG4gIH1cbiAgcmVzdW1lKCkge1xuICAgIGlmICh0aGlzLmZsYWdzICYgNjQpIHtcbiAgICAgIHRoaXMuZmxhZ3MgJj0gLTY1O1xuICAgICAgaWYgKHBhdXNlZFF1ZXVlRWZmZWN0cy5oYXModGhpcykpIHtcbiAgICAgICAgcGF1c2VkUXVldWVFZmZlY3RzLmRlbGV0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5vdGlmeSgpIHtcbiAgICBpZiAodGhpcy5mbGFncyAmIDIgJiYgISh0aGlzLmZsYWdzICYgMzIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKHRoaXMuZmxhZ3MgJiA4KSkge1xuICAgICAgYmF0Y2godGhpcyk7XG4gICAgfVxuICB9XG4gIHJ1bigpIHtcbiAgICBpZiAoISh0aGlzLmZsYWdzICYgMSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZuKCk7XG4gICAgfVxuICAgIHRoaXMuZmxhZ3MgfD0gMjtcbiAgICBjbGVhbnVwRWZmZWN0KHRoaXMpO1xuICAgIHByZXBhcmVEZXBzKHRoaXMpO1xuICAgIGNvbnN0IHByZXZFZmZlY3QgPSBhY3RpdmVTdWI7XG4gICAgY29uc3QgcHJldlNob3VsZFRyYWNrID0gc2hvdWxkVHJhY2s7XG4gICAgYWN0aXZlU3ViID0gdGhpcztcbiAgICBzaG91bGRUcmFjayA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmZuKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGFjdGl2ZVN1YiAhPT0gdGhpcykge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiQWN0aXZlIGVmZmVjdCB3YXMgbm90IHJlc3RvcmVkIGNvcnJlY3RseSAtIHRoaXMgaXMgbGlrZWx5IGEgVnVlIGludGVybmFsIGJ1Zy5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2xlYW51cERlcHModGhpcyk7XG4gICAgICBhY3RpdmVTdWIgPSBwcmV2RWZmZWN0O1xuICAgICAgc2hvdWxkVHJhY2sgPSBwcmV2U2hvdWxkVHJhY2s7XG4gICAgICB0aGlzLmZsYWdzICY9IC0zO1xuICAgIH1cbiAgfVxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmZsYWdzICYgMSkge1xuICAgICAgZm9yIChsZXQgbGluayA9IHRoaXMuZGVwczsgbGluazsgbGluayA9IGxpbmsubmV4dERlcCkge1xuICAgICAgICByZW1vdmVTdWIobGluayk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlcHMgPSB0aGlzLmRlcHNUYWlsID0gdm9pZCAwO1xuICAgICAgY2xlYW51cEVmZmVjdCh0aGlzKTtcbiAgICAgIHRoaXMub25TdG9wICYmIHRoaXMub25TdG9wKCk7XG4gICAgICB0aGlzLmZsYWdzICY9IC0yO1xuICAgIH1cbiAgfVxuICB0cmlnZ2VyKCkge1xuICAgIGlmICh0aGlzLmZsYWdzICYgNjQpIHtcbiAgICAgIHBhdXNlZFF1ZXVlRWZmZWN0cy5hZGQodGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjaGVkdWxlcikge1xuICAgICAgdGhpcy5zY2hlZHVsZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydW5JZkRpcnR5KCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJ1bklmRGlydHkoKSB7XG4gICAgaWYgKGlzRGlydHkodGhpcykpIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuICB9XG4gIGdldCBkaXJ0eSgpIHtcbiAgICByZXR1cm4gaXNEaXJ0eSh0aGlzKTtcbiAgfVxufVxubGV0IGJhdGNoRGVwdGggPSAwO1xubGV0IGJhdGNoZWRTdWI7XG5sZXQgYmF0Y2hlZENvbXB1dGVkO1xuZnVuY3Rpb24gYmF0Y2goc3ViLCBpc0NvbXB1dGVkID0gZmFsc2UpIHtcbiAgc3ViLmZsYWdzIHw9IDg7XG4gIGlmIChpc0NvbXB1dGVkKSB7XG4gICAgc3ViLm5leHQgPSBiYXRjaGVkQ29tcHV0ZWQ7XG4gICAgYmF0Y2hlZENvbXB1dGVkID0gc3ViO1xuICAgIHJldHVybjtcbiAgfVxuICBzdWIubmV4dCA9IGJhdGNoZWRTdWI7XG4gIGJhdGNoZWRTdWIgPSBzdWI7XG59XG5mdW5jdGlvbiBzdGFydEJhdGNoKCkge1xuICBiYXRjaERlcHRoKys7XG59XG5mdW5jdGlvbiBlbmRCYXRjaCgpIHtcbiAgaWYgKC0tYmF0Y2hEZXB0aCA+IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGJhdGNoZWRDb21wdXRlZCkge1xuICAgIGxldCBlID0gYmF0Y2hlZENvbXB1dGVkO1xuICAgIGJhdGNoZWRDb21wdXRlZCA9IHZvaWQgMDtcbiAgICB3aGlsZSAoZSkge1xuICAgICAgY29uc3QgbmV4dCA9IGUubmV4dDtcbiAgICAgIGUubmV4dCA9IHZvaWQgMDtcbiAgICAgIGUuZmxhZ3MgJj0gLTk7XG4gICAgICBlID0gbmV4dDtcbiAgICB9XG4gIH1cbiAgbGV0IGVycm9yO1xuICB3aGlsZSAoYmF0Y2hlZFN1Yikge1xuICAgIGxldCBlID0gYmF0Y2hlZFN1YjtcbiAgICBiYXRjaGVkU3ViID0gdm9pZCAwO1xuICAgIHdoaWxlIChlKSB7XG4gICAgICBjb25zdCBuZXh0ID0gZS5uZXh0O1xuICAgICAgZS5uZXh0ID0gdm9pZCAwO1xuICAgICAgZS5mbGFncyAmPSAtOTtcbiAgICAgIGlmIChlLmZsYWdzICYgMSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIDtcbiAgICAgICAgICBlLnRyaWdnZXIoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGUgPSBuZXh0O1xuICAgIH1cbiAgfVxuICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xufVxuZnVuY3Rpb24gcHJlcGFyZURlcHMoc3ViKSB7XG4gIGZvciAobGV0IGxpbmsgPSBzdWIuZGVwczsgbGluazsgbGluayA9IGxpbmsubmV4dERlcCkge1xuICAgIGxpbmsudmVyc2lvbiA9IC0xO1xuICAgIGxpbmsucHJldkFjdGl2ZUxpbmsgPSBsaW5rLmRlcC5hY3RpdmVMaW5rO1xuICAgIGxpbmsuZGVwLmFjdGl2ZUxpbmsgPSBsaW5rO1xuICB9XG59XG5mdW5jdGlvbiBjbGVhbnVwRGVwcyhzdWIpIHtcbiAgbGV0IGhlYWQ7XG4gIGxldCB0YWlsID0gc3ViLmRlcHNUYWlsO1xuICBsZXQgbGluayA9IHRhaWw7XG4gIHdoaWxlIChsaW5rKSB7XG4gICAgY29uc3QgcHJldiA9IGxpbmsucHJldkRlcDtcbiAgICBpZiAobGluay52ZXJzaW9uID09PSAtMSkge1xuICAgICAgaWYgKGxpbmsgPT09IHRhaWwpIHRhaWwgPSBwcmV2O1xuICAgICAgcmVtb3ZlU3ViKGxpbmspO1xuICAgICAgcmVtb3ZlRGVwKGxpbmspO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkID0gbGluaztcbiAgICB9XG4gICAgbGluay5kZXAuYWN0aXZlTGluayA9IGxpbmsucHJldkFjdGl2ZUxpbms7XG4gICAgbGluay5wcmV2QWN0aXZlTGluayA9IHZvaWQgMDtcbiAgICBsaW5rID0gcHJldjtcbiAgfVxuICBzdWIuZGVwcyA9IGhlYWQ7XG4gIHN1Yi5kZXBzVGFpbCA9IHRhaWw7XG59XG5mdW5jdGlvbiBpc0RpcnR5KHN1Yikge1xuICBmb3IgKGxldCBsaW5rID0gc3ViLmRlcHM7IGxpbms7IGxpbmsgPSBsaW5rLm5leHREZXApIHtcbiAgICBpZiAobGluay5kZXAudmVyc2lvbiAhPT0gbGluay52ZXJzaW9uIHx8IGxpbmsuZGVwLmNvbXB1dGVkICYmIChyZWZyZXNoQ29tcHV0ZWQobGluay5kZXAuY29tcHV0ZWQpIHx8IGxpbmsuZGVwLnZlcnNpb24gIT09IGxpbmsudmVyc2lvbikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoc3ViLl9kaXJ0eSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHJlZnJlc2hDb21wdXRlZChjb21wdXRlZCkge1xuICBpZiAoY29tcHV0ZWQuZmxhZ3MgJiA0ICYmICEoY29tcHV0ZWQuZmxhZ3MgJiAxNikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29tcHV0ZWQuZmxhZ3MgJj0gLTE3O1xuICBpZiAoY29tcHV0ZWQuZ2xvYmFsVmVyc2lvbiA9PT0gZ2xvYmFsVmVyc2lvbikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb21wdXRlZC5nbG9iYWxWZXJzaW9uID0gZ2xvYmFsVmVyc2lvbjtcbiAgaWYgKCFjb21wdXRlZC5pc1NTUiAmJiBjb21wdXRlZC5mbGFncyAmIDEyOCAmJiAoIWNvbXB1dGVkLmRlcHMgJiYgIWNvbXB1dGVkLl9kaXJ0eSB8fCAhaXNEaXJ0eShjb21wdXRlZCkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbXB1dGVkLmZsYWdzIHw9IDI7XG4gIGNvbnN0IGRlcCA9IGNvbXB1dGVkLmRlcDtcbiAgY29uc3QgcHJldlN1YiA9IGFjdGl2ZVN1YjtcbiAgY29uc3QgcHJldlNob3VsZFRyYWNrID0gc2hvdWxkVHJhY2s7XG4gIGFjdGl2ZVN1YiA9IGNvbXB1dGVkO1xuICBzaG91bGRUcmFjayA9IHRydWU7XG4gIHRyeSB7XG4gICAgcHJlcGFyZURlcHMoY29tcHV0ZWQpO1xuICAgIGNvbnN0IHZhbHVlID0gY29tcHV0ZWQuZm4oY29tcHV0ZWQuX3ZhbHVlKTtcbiAgICBpZiAoZGVwLnZlcnNpb24gPT09IDAgfHwgaGFzQ2hhbmdlZCh2YWx1ZSwgY29tcHV0ZWQuX3ZhbHVlKSkge1xuICAgICAgY29tcHV0ZWQuZmxhZ3MgfD0gMTI4O1xuICAgICAgY29tcHV0ZWQuX3ZhbHVlID0gdmFsdWU7XG4gICAgICBkZXAudmVyc2lvbisrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVwLnZlcnNpb24rKztcbiAgICB0aHJvdyBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgYWN0aXZlU3ViID0gcHJldlN1YjtcbiAgICBzaG91bGRUcmFjayA9IHByZXZTaG91bGRUcmFjaztcbiAgICBjbGVhbnVwRGVwcyhjb21wdXRlZCk7XG4gICAgY29tcHV0ZWQuZmxhZ3MgJj0gLTM7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZVN1YihsaW5rLCBzb2Z0ID0gZmFsc2UpIHtcbiAgY29uc3QgeyBkZXAsIHByZXZTdWIsIG5leHRTdWIgfSA9IGxpbms7XG4gIGlmIChwcmV2U3ViKSB7XG4gICAgcHJldlN1Yi5uZXh0U3ViID0gbmV4dFN1YjtcbiAgICBsaW5rLnByZXZTdWIgPSB2b2lkIDA7XG4gIH1cbiAgaWYgKG5leHRTdWIpIHtcbiAgICBuZXh0U3ViLnByZXZTdWIgPSBwcmV2U3ViO1xuICAgIGxpbmsubmV4dFN1YiA9IHZvaWQgMDtcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBkZXAuc3Vic0hlYWQgPT09IGxpbmspIHtcbiAgICBkZXAuc3Vic0hlYWQgPSBuZXh0U3ViO1xuICB9XG4gIGlmIChkZXAuc3VicyA9PT0gbGluaykge1xuICAgIGRlcC5zdWJzID0gcHJldlN1YjtcbiAgICBpZiAoIXByZXZTdWIgJiYgZGVwLmNvbXB1dGVkKSB7XG4gICAgICBkZXAuY29tcHV0ZWQuZmxhZ3MgJj0gLTU7XG4gICAgICBmb3IgKGxldCBsID0gZGVwLmNvbXB1dGVkLmRlcHM7IGw7IGwgPSBsLm5leHREZXApIHtcbiAgICAgICAgcmVtb3ZlU3ViKGwsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoIXNvZnQgJiYgIS0tZGVwLnNjICYmIGRlcC5tYXApIHtcbiAgICBkZXAubWFwLmRlbGV0ZShkZXAua2V5KTtcbiAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlRGVwKGxpbmspIHtcbiAgY29uc3QgeyBwcmV2RGVwLCBuZXh0RGVwIH0gPSBsaW5rO1xuICBpZiAocHJldkRlcCkge1xuICAgIHByZXZEZXAubmV4dERlcCA9IG5leHREZXA7XG4gICAgbGluay5wcmV2RGVwID0gdm9pZCAwO1xuICB9XG4gIGlmIChuZXh0RGVwKSB7XG4gICAgbmV4dERlcC5wcmV2RGVwID0gcHJldkRlcDtcbiAgICBsaW5rLm5leHREZXAgPSB2b2lkIDA7XG4gIH1cbn1cbmZ1bmN0aW9uIGVmZmVjdChmbiwgb3B0aW9ucykge1xuICBpZiAoZm4uZWZmZWN0IGluc3RhbmNlb2YgUmVhY3RpdmVFZmZlY3QpIHtcbiAgICBmbiA9IGZuLmVmZmVjdC5mbjtcbiAgfVxuICBjb25zdCBlID0gbmV3IFJlYWN0aXZlRWZmZWN0KGZuKTtcbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBleHRlbmQoZSwgb3B0aW9ucyk7XG4gIH1cbiAgdHJ5IHtcbiAgICBlLnJ1bigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlLnN0b3AoKTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgY29uc3QgcnVubmVyID0gZS5ydW4uYmluZChlKTtcbiAgcnVubmVyLmVmZmVjdCA9IGU7XG4gIHJldHVybiBydW5uZXI7XG59XG5mdW5jdGlvbiBzdG9wKHJ1bm5lcikge1xuICBydW5uZXIuZWZmZWN0LnN0b3AoKTtcbn1cbmxldCBzaG91bGRUcmFjayA9IHRydWU7XG5jb25zdCB0cmFja1N0YWNrID0gW107XG5mdW5jdGlvbiBwYXVzZVRyYWNraW5nKCkge1xuICB0cmFja1N0YWNrLnB1c2goc2hvdWxkVHJhY2spO1xuICBzaG91bGRUcmFjayA9IGZhbHNlO1xufVxuZnVuY3Rpb24gZW5hYmxlVHJhY2tpbmcoKSB7XG4gIHRyYWNrU3RhY2sucHVzaChzaG91bGRUcmFjayk7XG4gIHNob3VsZFRyYWNrID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHJlc2V0VHJhY2tpbmcoKSB7XG4gIGNvbnN0IGxhc3QgPSB0cmFja1N0YWNrLnBvcCgpO1xuICBzaG91bGRUcmFjayA9IGxhc3QgPT09IHZvaWQgMCA/IHRydWUgOiBsYXN0O1xufVxuZnVuY3Rpb24gb25FZmZlY3RDbGVhbnVwKGZuLCBmYWlsU2lsZW50bHkgPSBmYWxzZSkge1xuICBpZiAoYWN0aXZlU3ViIGluc3RhbmNlb2YgUmVhY3RpdmVFZmZlY3QpIHtcbiAgICBhY3RpdmVTdWIuY2xlYW51cCA9IGZuO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWZhaWxTaWxlbnRseSkge1xuICAgIHdhcm4oXG4gICAgICBgb25FZmZlY3RDbGVhbnVwKCkgd2FzIGNhbGxlZCB3aGVuIHRoZXJlIHdhcyBubyBhY3RpdmUgZWZmZWN0IHRvIGFzc29jaWF0ZSB3aXRoLmBcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiBjbGVhbnVwRWZmZWN0KGUpIHtcbiAgY29uc3QgeyBjbGVhbnVwIH0gPSBlO1xuICBlLmNsZWFudXAgPSB2b2lkIDA7XG4gIGlmIChjbGVhbnVwKSB7XG4gICAgY29uc3QgcHJldlN1YiA9IGFjdGl2ZVN1YjtcbiAgICBhY3RpdmVTdWIgPSB2b2lkIDA7XG4gICAgdHJ5IHtcbiAgICAgIGNsZWFudXAoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYWN0aXZlU3ViID0gcHJldlN1YjtcbiAgICB9XG4gIH1cbn1cblxubGV0IGdsb2JhbFZlcnNpb24gPSAwO1xuY2xhc3MgTGluayB7XG4gIGNvbnN0cnVjdG9yKHN1YiwgZGVwKSB7XG4gICAgdGhpcy5zdWIgPSBzdWI7XG4gICAgdGhpcy5kZXAgPSBkZXA7XG4gICAgdGhpcy52ZXJzaW9uID0gZGVwLnZlcnNpb247XG4gICAgdGhpcy5uZXh0RGVwID0gdGhpcy5wcmV2RGVwID0gdGhpcy5uZXh0U3ViID0gdGhpcy5wcmV2U3ViID0gdGhpcy5wcmV2QWN0aXZlTGluayA9IHZvaWQgMDtcbiAgfVxufVxuY2xhc3MgRGVwIHtcbiAgLy8gVE9ETyBpc29sYXRlZERlY2xhcmF0aW9ucyBcIl9fdl9za2lwXCJcbiAgY29uc3RydWN0b3IoY29tcHV0ZWQpIHtcbiAgICB0aGlzLmNvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICAvKipcbiAgICAgKiBMaW5rIGJldHdlZW4gdGhpcyBkZXAgYW5kIHRoZSBjdXJyZW50IGFjdGl2ZSBlZmZlY3RcbiAgICAgKi9cbiAgICB0aGlzLmFjdGl2ZUxpbmsgPSB2b2lkIDA7XG4gICAgLyoqXG4gICAgICogRG91Ymx5IGxpbmtlZCBsaXN0IHJlcHJlc2VudGluZyB0aGUgc3Vic2NyaWJpbmcgZWZmZWN0cyAodGFpbClcbiAgICAgKi9cbiAgICB0aGlzLnN1YnMgPSB2b2lkIDA7XG4gICAgLyoqXG4gICAgICogRm9yIG9iamVjdCBwcm9wZXJ0eSBkZXBzIGNsZWFudXBcbiAgICAgKi9cbiAgICB0aGlzLm1hcCA9IHZvaWQgMDtcbiAgICB0aGlzLmtleSA9IHZvaWQgMDtcbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVyIGNvdW50ZXJcbiAgICAgKi9cbiAgICB0aGlzLnNjID0gMDtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLl9fdl9za2lwID0gdHJ1ZTtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgdGhpcy5zdWJzSGVhZCA9IHZvaWQgMDtcbiAgICB9XG4gIH1cbiAgdHJhY2soZGVidWdJbmZvKSB7XG4gICAgaWYgKCFhY3RpdmVTdWIgfHwgIXNob3VsZFRyYWNrIHx8IGFjdGl2ZVN1YiA9PT0gdGhpcy5jb21wdXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbGluayA9IHRoaXMuYWN0aXZlTGluaztcbiAgICBpZiAobGluayA9PT0gdm9pZCAwIHx8IGxpbmsuc3ViICE9PSBhY3RpdmVTdWIpIHtcbiAgICAgIGxpbmsgPSB0aGlzLmFjdGl2ZUxpbmsgPSBuZXcgTGluayhhY3RpdmVTdWIsIHRoaXMpO1xuICAgICAgaWYgKCFhY3RpdmVTdWIuZGVwcykge1xuICAgICAgICBhY3RpdmVTdWIuZGVwcyA9IGFjdGl2ZVN1Yi5kZXBzVGFpbCA9IGxpbms7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLnByZXZEZXAgPSBhY3RpdmVTdWIuZGVwc1RhaWw7XG4gICAgICAgIGFjdGl2ZVN1Yi5kZXBzVGFpbC5uZXh0RGVwID0gbGluaztcbiAgICAgICAgYWN0aXZlU3ViLmRlcHNUYWlsID0gbGluaztcbiAgICAgIH1cbiAgICAgIGFkZFN1YihsaW5rKTtcbiAgICB9IGVsc2UgaWYgKGxpbmsudmVyc2lvbiA9PT0gLTEpIHtcbiAgICAgIGxpbmsudmVyc2lvbiA9IHRoaXMudmVyc2lvbjtcbiAgICAgIGlmIChsaW5rLm5leHREZXApIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IGxpbmsubmV4dERlcDtcbiAgICAgICAgbmV4dC5wcmV2RGVwID0gbGluay5wcmV2RGVwO1xuICAgICAgICBpZiAobGluay5wcmV2RGVwKSB7XG4gICAgICAgICAgbGluay5wcmV2RGVwLm5leHREZXAgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIGxpbmsucHJldkRlcCA9IGFjdGl2ZVN1Yi5kZXBzVGFpbDtcbiAgICAgICAgbGluay5uZXh0RGVwID0gdm9pZCAwO1xuICAgICAgICBhY3RpdmVTdWIuZGVwc1RhaWwubmV4dERlcCA9IGxpbms7XG4gICAgICAgIGFjdGl2ZVN1Yi5kZXBzVGFpbCA9IGxpbms7XG4gICAgICAgIGlmIChhY3RpdmVTdWIuZGVwcyA9PT0gbGluaykge1xuICAgICAgICAgIGFjdGl2ZVN1Yi5kZXBzID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBhY3RpdmVTdWIub25UcmFjaykge1xuICAgICAgYWN0aXZlU3ViLm9uVHJhY2soXG4gICAgICAgIGV4dGVuZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlZmZlY3Q6IGFjdGl2ZVN1YlxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVidWdJbmZvXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBsaW5rO1xuICB9XG4gIHRyaWdnZXIoZGVidWdJbmZvKSB7XG4gICAgdGhpcy52ZXJzaW9uKys7XG4gICAgZ2xvYmFsVmVyc2lvbisrO1xuICAgIHRoaXMubm90aWZ5KGRlYnVnSW5mbyk7XG4gIH1cbiAgbm90aWZ5KGRlYnVnSW5mbykge1xuICAgIHN0YXJ0QmF0Y2goKTtcbiAgICB0cnkge1xuICAgICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgZm9yIChsZXQgaGVhZCA9IHRoaXMuc3Vic0hlYWQ7IGhlYWQ7IGhlYWQgPSBoZWFkLm5leHRTdWIpIHtcbiAgICAgICAgICBpZiAoaGVhZC5zdWIub25UcmlnZ2VyICYmICEoaGVhZC5zdWIuZmxhZ3MgJiA4KSkge1xuICAgICAgICAgICAgaGVhZC5zdWIub25UcmlnZ2VyKFxuICAgICAgICAgICAgICBleHRlbmQoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZWZmZWN0OiBoZWFkLnN1YlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVidWdJbmZvXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBsaW5rID0gdGhpcy5zdWJzOyBsaW5rOyBsaW5rID0gbGluay5wcmV2U3ViKSB7XG4gICAgICAgIGlmIChsaW5rLnN1Yi5ub3RpZnkoKSkge1xuICAgICAgICAgIDtcbiAgICAgICAgICBsaW5rLnN1Yi5kZXAubm90aWZ5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGFkZFN1YihsaW5rKSB7XG4gIGxpbmsuZGVwLnNjKys7XG4gIGlmIChsaW5rLnN1Yi5mbGFncyAmIDQpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IGxpbmsuZGVwLmNvbXB1dGVkO1xuICAgIGlmIChjb21wdXRlZCAmJiAhbGluay5kZXAuc3Vicykge1xuICAgICAgY29tcHV0ZWQuZmxhZ3MgfD0gNCB8IDE2O1xuICAgICAgZm9yIChsZXQgbCA9IGNvbXB1dGVkLmRlcHM7IGw7IGwgPSBsLm5leHREZXApIHtcbiAgICAgICAgYWRkU3ViKGwpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjdXJyZW50VGFpbCA9IGxpbmsuZGVwLnN1YnM7XG4gICAgaWYgKGN1cnJlbnRUYWlsICE9PSBsaW5rKSB7XG4gICAgICBsaW5rLnByZXZTdWIgPSBjdXJyZW50VGFpbDtcbiAgICAgIGlmIChjdXJyZW50VGFpbCkgY3VycmVudFRhaWwubmV4dFN1YiA9IGxpbms7XG4gICAgfVxuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIGxpbmsuZGVwLnN1YnNIZWFkID09PSB2b2lkIDApIHtcbiAgICAgIGxpbmsuZGVwLnN1YnNIZWFkID0gbGluaztcbiAgICB9XG4gICAgbGluay5kZXAuc3VicyA9IGxpbms7XG4gIH1cbn1cbmNvbnN0IHRhcmdldE1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuY29uc3QgSVRFUkFURV9LRVkgPSBTeW1ib2woXG4gICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBcIk9iamVjdCBpdGVyYXRlXCIgOiBcIlwiXG4pO1xuY29uc3QgTUFQX0tFWV9JVEVSQVRFX0tFWSA9IFN5bWJvbChcbiAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IFwiTWFwIGtleXMgaXRlcmF0ZVwiIDogXCJcIlxuKTtcbmNvbnN0IEFSUkFZX0lURVJBVEVfS0VZID0gU3ltYm9sKFxuICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gXCJBcnJheSBpdGVyYXRlXCIgOiBcIlwiXG4pO1xuZnVuY3Rpb24gdHJhY2sodGFyZ2V0LCB0eXBlLCBrZXkpIHtcbiAgaWYgKHNob3VsZFRyYWNrICYmIGFjdGl2ZVN1Yikge1xuICAgIGxldCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICAgIGlmICghZGVwc01hcCkge1xuICAgICAgdGFyZ2V0TWFwLnNldCh0YXJnZXQsIGRlcHNNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpKTtcbiAgICB9XG4gICAgbGV0IGRlcCA9IGRlcHNNYXAuZ2V0KGtleSk7XG4gICAgaWYgKCFkZXApIHtcbiAgICAgIGRlcHNNYXAuc2V0KGtleSwgZGVwID0gbmV3IERlcCgpKTtcbiAgICAgIGRlcC5tYXAgPSBkZXBzTWFwO1xuICAgICAgZGVwLmtleSA9IGtleTtcbiAgICB9XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIGRlcC50cmFjayh7XG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVwLnRyYWNrKCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiB0cmlnZ2VyKHRhcmdldCwgdHlwZSwga2V5LCBuZXdWYWx1ZSwgb2xkVmFsdWUsIG9sZFRhcmdldCkge1xuICBjb25zdCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoIWRlcHNNYXApIHtcbiAgICBnbG9iYWxWZXJzaW9uKys7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJ1biA9IChkZXApID0+IHtcbiAgICBpZiAoZGVwKSB7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICBkZXAudHJpZ2dlcih7XG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIG5ld1ZhbHVlLFxuICAgICAgICAgIG9sZFZhbHVlLFxuICAgICAgICAgIG9sZFRhcmdldFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcC50cmlnZ2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBzdGFydEJhdGNoKCk7XG4gIGlmICh0eXBlID09PSBcImNsZWFyXCIpIHtcbiAgICBkZXBzTWFwLmZvckVhY2gocnVuKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0YXJnZXRJc0FycmF5ID0gaXNBcnJheSh0YXJnZXQpO1xuICAgIGNvbnN0IGlzQXJyYXlJbmRleCA9IHRhcmdldElzQXJyYXkgJiYgaXNJbnRlZ2VyS2V5KGtleSk7XG4gICAgaWYgKHRhcmdldElzQXJyYXkgJiYga2V5ID09PSBcImxlbmd0aFwiKSB7XG4gICAgICBjb25zdCBuZXdMZW5ndGggPSBOdW1iZXIobmV3VmFsdWUpO1xuICAgICAgZGVwc01hcC5mb3JFYWNoKChkZXAsIGtleTIpID0+IHtcbiAgICAgICAgaWYgKGtleTIgPT09IFwibGVuZ3RoXCIgfHwga2V5MiA9PT0gQVJSQVlfSVRFUkFURV9LRVkgfHwgIWlzU3ltYm9sKGtleTIpICYmIGtleTIgPj0gbmV3TGVuZ3RoKSB7XG4gICAgICAgICAgcnVuKGRlcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoa2V5ICE9PSB2b2lkIDAgfHwgZGVwc01hcC5oYXModm9pZCAwKSkge1xuICAgICAgICBydW4oZGVwc01hcC5nZXQoa2V5KSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNBcnJheUluZGV4KSB7XG4gICAgICAgIHJ1bihkZXBzTWFwLmdldChBUlJBWV9JVEVSQVRFX0tFWSkpO1xuICAgICAgfVxuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJhZGRcIjpcbiAgICAgICAgICBpZiAoIXRhcmdldElzQXJyYXkpIHtcbiAgICAgICAgICAgIHJ1bihkZXBzTWFwLmdldChJVEVSQVRFX0tFWSkpO1xuICAgICAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcnVuKGRlcHNNYXAuZ2V0KE1BUF9LRVlfSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXlJbmRleCkge1xuICAgICAgICAgICAgcnVuKGRlcHNNYXAuZ2V0KFwibGVuZ3RoXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkZWxldGVcIjpcbiAgICAgICAgICBpZiAoIXRhcmdldElzQXJyYXkpIHtcbiAgICAgICAgICAgIHJ1bihkZXBzTWFwLmdldChJVEVSQVRFX0tFWSkpO1xuICAgICAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgcnVuKGRlcHNNYXAuZ2V0KE1BUF9LRVlfSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzZXRcIjpcbiAgICAgICAgICBpZiAoaXNNYXAodGFyZ2V0KSkge1xuICAgICAgICAgICAgcnVuKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbmRCYXRjaCgpO1xufVxuZnVuY3Rpb24gZ2V0RGVwRnJvbVJlYWN0aXZlKG9iamVjdCwga2V5KSB7XG4gIGNvbnN0IGRlcE1hcCA9IHRhcmdldE1hcC5nZXQob2JqZWN0KTtcbiAgcmV0dXJuIGRlcE1hcCAmJiBkZXBNYXAuZ2V0KGtleSk7XG59XG5cbmZ1bmN0aW9uIHJlYWN0aXZlUmVhZEFycmF5KGFycmF5KSB7XG4gIGNvbnN0IHJhdyA9IHRvUmF3KGFycmF5KTtcbiAgaWYgKHJhdyA9PT0gYXJyYXkpIHJldHVybiByYXc7XG4gIHRyYWNrKHJhdywgXCJpdGVyYXRlXCIsIEFSUkFZX0lURVJBVEVfS0VZKTtcbiAgcmV0dXJuIGlzU2hhbGxvdyhhcnJheSkgPyByYXcgOiByYXcubWFwKHRvUmVhY3RpdmUpO1xufVxuZnVuY3Rpb24gc2hhbGxvd1JlYWRBcnJheShhcnIpIHtcbiAgdHJhY2soYXJyID0gdG9SYXcoYXJyKSwgXCJpdGVyYXRlXCIsIEFSUkFZX0lURVJBVEVfS0VZKTtcbiAgcmV0dXJuIGFycjtcbn1cbmNvbnN0IGFycmF5SW5zdHJ1bWVudGF0aW9ucyA9IHtcbiAgX19wcm90b19fOiBudWxsLFxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gaXRlcmF0b3IodGhpcywgU3ltYm9sLml0ZXJhdG9yLCB0b1JlYWN0aXZlKTtcbiAgfSxcbiAgY29uY2F0KC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gcmVhY3RpdmVSZWFkQXJyYXkodGhpcykuY29uY2F0KFxuICAgICAgLi4uYXJncy5tYXAoKHgpID0+IGlzQXJyYXkoeCkgPyByZWFjdGl2ZVJlYWRBcnJheSh4KSA6IHgpXG4gICAgKTtcbiAgfSxcbiAgZW50cmllcygpIHtcbiAgICByZXR1cm4gaXRlcmF0b3IodGhpcywgXCJlbnRyaWVzXCIsICh2YWx1ZSkgPT4ge1xuICAgICAgdmFsdWVbMV0gPSB0b1JlYWN0aXZlKHZhbHVlWzFdKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcbiAgfSxcbiAgZXZlcnkoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gYXBwbHkodGhpcywgXCJldmVyeVwiLCBmbiwgdGhpc0FyZywgdm9pZCAwLCBhcmd1bWVudHMpO1xuICB9LFxuICBmaWx0ZXIoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gYXBwbHkodGhpcywgXCJmaWx0ZXJcIiwgZm4sIHRoaXNBcmcsICh2KSA9PiB2Lm1hcCh0b1JlYWN0aXZlKSwgYXJndW1lbnRzKTtcbiAgfSxcbiAgZmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBhcHBseSh0aGlzLCBcImZpbmRcIiwgZm4sIHRoaXNBcmcsIHRvUmVhY3RpdmUsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGZpbmRJbmRleChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBhcHBseSh0aGlzLCBcImZpbmRJbmRleFwiLCBmbiwgdGhpc0FyZywgdm9pZCAwLCBhcmd1bWVudHMpO1xuICB9LFxuICBmaW5kTGFzdChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBhcHBseSh0aGlzLCBcImZpbmRMYXN0XCIsIGZuLCB0aGlzQXJnLCB0b1JlYWN0aXZlLCBhcmd1bWVudHMpO1xuICB9LFxuICBmaW5kTGFzdEluZGV4KGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGFwcGx5KHRoaXMsIFwiZmluZExhc3RJbmRleFwiLCBmbiwgdGhpc0FyZywgdm9pZCAwLCBhcmd1bWVudHMpO1xuICB9LFxuICAvLyBmbGF0LCBmbGF0TWFwIGNvdWxkIGJlbmVmaXQgZnJvbSBBUlJBWV9JVEVSQVRFIGJ1dCBhcmUgbm90IHN0cmFpZ2h0LWZvcndhcmQgdG8gaW1wbGVtZW50XG4gIGZvckVhY2goZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gYXBwbHkodGhpcywgXCJmb3JFYWNoXCIsIGZuLCB0aGlzQXJnLCB2b2lkIDAsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGluY2x1ZGVzKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gc2VhcmNoUHJveHkodGhpcywgXCJpbmNsdWRlc1wiLCBhcmdzKTtcbiAgfSxcbiAgaW5kZXhPZiguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHNlYXJjaFByb3h5KHRoaXMsIFwiaW5kZXhPZlwiLCBhcmdzKTtcbiAgfSxcbiAgam9pbihzZXBhcmF0b3IpIHtcbiAgICByZXR1cm4gcmVhY3RpdmVSZWFkQXJyYXkodGhpcykuam9pbihzZXBhcmF0b3IpO1xuICB9LFxuICAvLyBrZXlzKCkgaXRlcmF0b3Igb25seSByZWFkcyBgbGVuZ3RoYCwgbm8gb3B0aW1pemF0aW9uIHJlcXVpcmVkXG4gIGxhc3RJbmRleE9mKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gc2VhcmNoUHJveHkodGhpcywgXCJsYXN0SW5kZXhPZlwiLCBhcmdzKTtcbiAgfSxcbiAgbWFwKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGFwcGx5KHRoaXMsIFwibWFwXCIsIGZuLCB0aGlzQXJnLCB2b2lkIDAsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHBvcCgpIHtcbiAgICByZXR1cm4gbm9UcmFja2luZyh0aGlzLCBcInBvcFwiKTtcbiAgfSxcbiAgcHVzaCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIG5vVHJhY2tpbmcodGhpcywgXCJwdXNoXCIsIGFyZ3MpO1xuICB9LFxuICByZWR1Y2UoZm4sIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gcmVkdWNlKHRoaXMsIFwicmVkdWNlXCIsIGZuLCBhcmdzKTtcbiAgfSxcbiAgcmVkdWNlUmlnaHQoZm4sIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gcmVkdWNlKHRoaXMsIFwicmVkdWNlUmlnaHRcIiwgZm4sIGFyZ3MpO1xuICB9LFxuICBzaGlmdCgpIHtcbiAgICByZXR1cm4gbm9UcmFja2luZyh0aGlzLCBcInNoaWZ0XCIpO1xuICB9LFxuICAvLyBzbGljZSBjb3VsZCB1c2UgQVJSQVlfSVRFUkFURSBidXQgYWxzbyBzZWVtcyB0byBiZWcgZm9yIHJhbmdlIHRyYWNraW5nXG4gIHNvbWUoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gYXBwbHkodGhpcywgXCJzb21lXCIsIGZuLCB0aGlzQXJnLCB2b2lkIDAsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHNwbGljZSguLi5hcmdzKSB7XG4gICAgcmV0dXJuIG5vVHJhY2tpbmcodGhpcywgXCJzcGxpY2VcIiwgYXJncyk7XG4gIH0sXG4gIHRvUmV2ZXJzZWQoKSB7XG4gICAgcmV0dXJuIHJlYWN0aXZlUmVhZEFycmF5KHRoaXMpLnRvUmV2ZXJzZWQoKTtcbiAgfSxcbiAgdG9Tb3J0ZWQoY29tcGFyZXIpIHtcbiAgICByZXR1cm4gcmVhY3RpdmVSZWFkQXJyYXkodGhpcykudG9Tb3J0ZWQoY29tcGFyZXIpO1xuICB9LFxuICB0b1NwbGljZWQoLi4uYXJncykge1xuICAgIHJldHVybiByZWFjdGl2ZVJlYWRBcnJheSh0aGlzKS50b1NwbGljZWQoLi4uYXJncyk7XG4gIH0sXG4gIHVuc2hpZnQoLi4uYXJncykge1xuICAgIHJldHVybiBub1RyYWNraW5nKHRoaXMsIFwidW5zaGlmdFwiLCBhcmdzKTtcbiAgfSxcbiAgdmFsdWVzKCkge1xuICAgIHJldHVybiBpdGVyYXRvcih0aGlzLCBcInZhbHVlc1wiLCB0b1JlYWN0aXZlKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGl0ZXJhdG9yKHNlbGYsIG1ldGhvZCwgd3JhcFZhbHVlKSB7XG4gIGNvbnN0IGFyciA9IHNoYWxsb3dSZWFkQXJyYXkoc2VsZik7XG4gIGNvbnN0IGl0ZXIgPSBhcnJbbWV0aG9kXSgpO1xuICBpZiAoYXJyICE9PSBzZWxmICYmICFpc1NoYWxsb3coc2VsZikpIHtcbiAgICBpdGVyLl9uZXh0ID0gaXRlci5uZXh0O1xuICAgIGl0ZXIubmV4dCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGl0ZXIuX25leHQoKTtcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcbiAgICAgICAgcmVzdWx0LnZhbHVlID0gd3JhcFZhbHVlKHJlc3VsdC52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGl0ZXI7XG59XG5jb25zdCBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuZnVuY3Rpb24gYXBwbHkoc2VsZiwgbWV0aG9kLCBmbiwgdGhpc0FyZywgd3JhcHBlZFJldEZuLCBhcmdzKSB7XG4gIGNvbnN0IGFyciA9IHNoYWxsb3dSZWFkQXJyYXkoc2VsZik7XG4gIGNvbnN0IG5lZWRzV3JhcCA9IGFyciAhPT0gc2VsZiAmJiAhaXNTaGFsbG93KHNlbGYpO1xuICBjb25zdCBtZXRob2RGbiA9IGFyclttZXRob2RdO1xuICBpZiAobWV0aG9kRm4gIT09IGFycmF5UHJvdG9bbWV0aG9kXSkge1xuICAgIGNvbnN0IHJlc3VsdDIgPSBtZXRob2RGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICByZXR1cm4gbmVlZHNXcmFwID8gdG9SZWFjdGl2ZShyZXN1bHQyKSA6IHJlc3VsdDI7XG4gIH1cbiAgbGV0IHdyYXBwZWRGbiA9IGZuO1xuICBpZiAoYXJyICE9PSBzZWxmKSB7XG4gICAgaWYgKG5lZWRzV3JhcCkge1xuICAgICAgd3JhcHBlZEZuID0gZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgdG9SZWFjdGl2ZShpdGVtKSwgaW5kZXgsIHNlbGYpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGZuLmxlbmd0aCA+IDIpIHtcbiAgICAgIHdyYXBwZWRGbiA9IGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGl0ZW0sIGluZGV4LCBzZWxmKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IHJlc3VsdCA9IG1ldGhvZEZuLmNhbGwoYXJyLCB3cmFwcGVkRm4sIHRoaXNBcmcpO1xuICByZXR1cm4gbmVlZHNXcmFwICYmIHdyYXBwZWRSZXRGbiA/IHdyYXBwZWRSZXRGbihyZXN1bHQpIDogcmVzdWx0O1xufVxuZnVuY3Rpb24gcmVkdWNlKHNlbGYsIG1ldGhvZCwgZm4sIGFyZ3MpIHtcbiAgY29uc3QgYXJyID0gc2hhbGxvd1JlYWRBcnJheShzZWxmKTtcbiAgbGV0IHdyYXBwZWRGbiA9IGZuO1xuICBpZiAoYXJyICE9PSBzZWxmKSB7XG4gICAgaWYgKCFpc1NoYWxsb3coc2VsZikpIHtcbiAgICAgIHdyYXBwZWRGbiA9IGZ1bmN0aW9uKGFjYywgaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYWNjLCB0b1JlYWN0aXZlKGl0ZW0pLCBpbmRleCwgc2VsZik7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoZm4ubGVuZ3RoID4gMykge1xuICAgICAgd3JhcHBlZEZuID0gZnVuY3Rpb24oYWNjLCBpdGVtLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhY2MsIGl0ZW0sIGluZGV4LCBzZWxmKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJbbWV0aG9kXSh3cmFwcGVkRm4sIC4uLmFyZ3MpO1xufVxuZnVuY3Rpb24gc2VhcmNoUHJveHkoc2VsZiwgbWV0aG9kLCBhcmdzKSB7XG4gIGNvbnN0IGFyciA9IHRvUmF3KHNlbGYpO1xuICB0cmFjayhhcnIsIFwiaXRlcmF0ZVwiLCBBUlJBWV9JVEVSQVRFX0tFWSk7XG4gIGNvbnN0IHJlcyA9IGFyclttZXRob2RdKC4uLmFyZ3MpO1xuICBpZiAoKHJlcyA9PT0gLTEgfHwgcmVzID09PSBmYWxzZSkgJiYgaXNQcm94eShhcmdzWzBdKSkge1xuICAgIGFyZ3NbMF0gPSB0b1JhdyhhcmdzWzBdKTtcbiAgICByZXR1cm4gYXJyW21ldGhvZF0oLi4uYXJncyk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIG5vVHJhY2tpbmcoc2VsZiwgbWV0aG9kLCBhcmdzID0gW10pIHtcbiAgcGF1c2VUcmFja2luZygpO1xuICBzdGFydEJhdGNoKCk7XG4gIGNvbnN0IHJlcyA9IHRvUmF3KHNlbGYpW21ldGhvZF0uYXBwbHkoc2VsZiwgYXJncyk7XG4gIGVuZEJhdGNoKCk7XG4gIHJlc2V0VHJhY2tpbmcoKTtcbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgaXNOb25UcmFja2FibGVLZXlzID0gLyogQF9fUFVSRV9fICovIG1ha2VNYXAoYF9fcHJvdG9fXyxfX3ZfaXNSZWYsX19pc1Z1ZWApO1xuY29uc3QgYnVpbHRJblN5bWJvbHMgPSBuZXcgU2V0KFxuICAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoU3ltYm9sKS5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSBcImFyZ3VtZW50c1wiICYmIGtleSAhPT0gXCJjYWxsZXJcIikubWFwKChrZXkpID0+IFN5bWJvbFtrZXldKS5maWx0ZXIoaXNTeW1ib2wpXG4pO1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkoa2V5KSB7XG4gIGlmICghaXNTeW1ib2woa2V5KSkga2V5ID0gU3RyaW5nKGtleSk7XG4gIGNvbnN0IG9iaiA9IHRvUmF3KHRoaXMpO1xuICB0cmFjayhvYmosIFwiaGFzXCIsIGtleSk7XG4gIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbn1cbmNsYXNzIEJhc2VSZWFjdGl2ZUhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihfaXNSZWFkb25seSA9IGZhbHNlLCBfaXNTaGFsbG93ID0gZmFsc2UpIHtcbiAgICB0aGlzLl9pc1JlYWRvbmx5ID0gX2lzUmVhZG9ubHk7XG4gICAgdGhpcy5faXNTaGFsbG93ID0gX2lzU2hhbGxvdztcbiAgfVxuICBnZXQodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSB7XG4gICAgaWYgKGtleSA9PT0gXCJfX3Zfc2tpcFwiKSByZXR1cm4gdGFyZ2V0W1wiX192X3NraXBcIl07XG4gICAgY29uc3QgaXNSZWFkb25seTIgPSB0aGlzLl9pc1JlYWRvbmx5LCBpc1NoYWxsb3cyID0gdGhpcy5faXNTaGFsbG93O1xuICAgIGlmIChrZXkgPT09IFwiX192X2lzUmVhY3RpdmVcIikge1xuICAgICAgcmV0dXJuICFpc1JlYWRvbmx5MjtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX3ZfaXNSZWFkb25seVwiKSB7XG4gICAgICByZXR1cm4gaXNSZWFkb25seTI7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiX192X2lzU2hhbGxvd1wiKSB7XG4gICAgICByZXR1cm4gaXNTaGFsbG93MjtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX3ZfcmF3XCIpIHtcbiAgICAgIGlmIChyZWNlaXZlciA9PT0gKGlzUmVhZG9ubHkyID8gaXNTaGFsbG93MiA/IHNoYWxsb3dSZWFkb25seU1hcCA6IHJlYWRvbmx5TWFwIDogaXNTaGFsbG93MiA/IHNoYWxsb3dSZWFjdGl2ZU1hcCA6IHJlYWN0aXZlTWFwKS5nZXQodGFyZ2V0KSB8fCAvLyByZWNlaXZlciBpcyBub3QgdGhlIHJlYWN0aXZlIHByb3h5LCBidXQgaGFzIHRoZSBzYW1lIHByb3RvdHlwZVxuICAgICAgLy8gdGhpcyBtZWFucyB0aGUgcmVjZWl2ZXIgaXMgYSB1c2VyIHByb3h5IG9mIHRoZSByZWFjdGl2ZSBwcm94eVxuICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihyZWNlaXZlcikpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0SXNBcnJheSA9IGlzQXJyYXkodGFyZ2V0KTtcbiAgICBpZiAoIWlzUmVhZG9ubHkyKSB7XG4gICAgICBsZXQgZm47XG4gICAgICBpZiAodGFyZ2V0SXNBcnJheSAmJiAoZm4gPSBhcnJheUluc3RydW1lbnRhdGlvbnNba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gXCJoYXNPd25Qcm9wZXJ0eVwiKSB7XG4gICAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzID0gUmVmbGVjdC5nZXQoXG4gICAgICB0YXJnZXQsXG4gICAgICBrZXksXG4gICAgICAvLyBpZiB0aGlzIGlzIGEgcHJveHkgd3JhcHBpbmcgYSByZWYsIHJldHVybiBtZXRob2RzIHVzaW5nIHRoZSByYXcgcmVmXG4gICAgICAvLyBhcyByZWNlaXZlciBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gY2FsbCBgdG9SYXdgIG9uIHRoZSByZWYgaW4gYWxsXG4gICAgICAvLyBpdHMgY2xhc3MgbWV0aG9kc1xuICAgICAgaXNSZWYodGFyZ2V0KSA/IHRhcmdldCA6IHJlY2VpdmVyXG4gICAgKTtcbiAgICBpZiAoaXNTeW1ib2woa2V5KSA/IGJ1aWx0SW5TeW1ib2xzLmhhcyhrZXkpIDogaXNOb25UcmFja2FibGVLZXlzKGtleSkpIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmICghaXNSZWFkb25seTIpIHtcbiAgICAgIHRyYWNrKHRhcmdldCwgXCJnZXRcIiwga2V5KTtcbiAgICB9XG4gICAgaWYgKGlzU2hhbGxvdzIpIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmIChpc1JlZihyZXMpKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0SXNBcnJheSAmJiBpc0ludGVnZXJLZXkoa2V5KSA/IHJlcyA6IHJlcy52YWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHJlcykpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5MiA/IHJlYWRvbmx5KHJlcykgOiByZWFjdGl2ZShyZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5jbGFzcyBNdXRhYmxlUmVhY3RpdmVIYW5kbGVyIGV4dGVuZHMgQmFzZVJlYWN0aXZlSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKGlzU2hhbGxvdzIgPSBmYWxzZSkge1xuICAgIHN1cGVyKGZhbHNlLCBpc1NoYWxsb3cyKTtcbiAgfVxuICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlLCByZWNlaXZlcikge1xuICAgIGxldCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgIGlmICghdGhpcy5faXNTaGFsbG93KSB7XG4gICAgICBjb25zdCBpc09sZFZhbHVlUmVhZG9ubHkgPSBpc1JlYWRvbmx5KG9sZFZhbHVlKTtcbiAgICAgIGlmICghaXNTaGFsbG93KHZhbHVlKSAmJiAhaXNSZWFkb25seSh2YWx1ZSkpIHtcbiAgICAgICAgb2xkVmFsdWUgPSB0b1JhdyhvbGRWYWx1ZSk7XG4gICAgICAgIHZhbHVlID0gdG9SYXcodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0FycmF5KHRhcmdldCkgJiYgaXNSZWYob2xkVmFsdWUpICYmICFpc1JlZih2YWx1ZSkpIHtcbiAgICAgICAgaWYgKGlzT2xkVmFsdWVSZWFkb25seSkge1xuICAgICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICBgU2V0IG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsXG4gICAgICAgICAgICAgIHRhcmdldFtrZXldXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvbGRWYWx1ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGhhZEtleSA9IGlzQXJyYXkodGFyZ2V0KSAmJiBpc0ludGVnZXJLZXkoa2V5KSA/IE51bWJlcihrZXkpIDwgdGFyZ2V0Lmxlbmd0aCA6IGhhc093bih0YXJnZXQsIGtleSk7XG4gICAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5zZXQoXG4gICAgICB0YXJnZXQsXG4gICAgICBrZXksXG4gICAgICB2YWx1ZSxcbiAgICAgIGlzUmVmKHRhcmdldCkgPyB0YXJnZXQgOiByZWNlaXZlclxuICAgICk7XG4gICAgaWYgKHRhcmdldCA9PT0gdG9SYXcocmVjZWl2ZXIpKSB7XG4gICAgICBpZiAoIWhhZEtleSkge1xuICAgICAgICB0cmlnZ2VyKHRhcmdldCwgXCJhZGRcIiwga2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc0NoYW5nZWQodmFsdWUsIG9sZFZhbHVlKSkge1xuICAgICAgICB0cmlnZ2VyKHRhcmdldCwgXCJzZXRcIiwga2V5LCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgY29uc3QgaGFkS2V5ID0gaGFzT3duKHRhcmdldCwga2V5KTtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgIGlmIChyZXN1bHQgJiYgaGFkS2V5KSB7XG4gICAgICB0cmlnZ2VyKHRhcmdldCwgXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIG9sZFZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBoYXModGFyZ2V0LCBrZXkpIHtcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0Lmhhcyh0YXJnZXQsIGtleSk7XG4gICAgaWYgKCFpc1N5bWJvbChrZXkpIHx8ICFidWlsdEluU3ltYm9scy5oYXMoa2V5KSkge1xuICAgICAgdHJhY2sodGFyZ2V0LCBcImhhc1wiLCBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIG93bktleXModGFyZ2V0KSB7XG4gICAgdHJhY2soXG4gICAgICB0YXJnZXQsXG4gICAgICBcIml0ZXJhdGVcIixcbiAgICAgIGlzQXJyYXkodGFyZ2V0KSA/IFwibGVuZ3RoXCIgOiBJVEVSQVRFX0tFWVxuICAgICk7XG4gICAgcmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpO1xuICB9XG59XG5jbGFzcyBSZWFkb25seVJlYWN0aXZlSGFuZGxlciBleHRlbmRzIEJhc2VSZWFjdGl2ZUhhbmRsZXIge1xuICBjb25zdHJ1Y3Rvcihpc1NoYWxsb3cyID0gZmFsc2UpIHtcbiAgICBzdXBlcih0cnVlLCBpc1NoYWxsb3cyKTtcbiAgfVxuICBzZXQodGFyZ2V0LCBrZXkpIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybihcbiAgICAgICAgYFNldCBvcGVyYXRpb24gb24ga2V5IFwiJHtTdHJpbmcoa2V5KX1cIiBmYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLFxuICAgICAgICB0YXJnZXRcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGBEZWxldGUgb3BlcmF0aW9uIG9uIGtleSBcIiR7U3RyaW5nKGtleSl9XCIgZmFpbGVkOiB0YXJnZXQgaXMgcmVhZG9ubHkuYCxcbiAgICAgICAgdGFyZ2V0XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuY29uc3QgbXV0YWJsZUhhbmRsZXJzID0gLyogQF9fUFVSRV9fICovIG5ldyBNdXRhYmxlUmVhY3RpdmVIYW5kbGVyKCk7XG5jb25zdCByZWFkb25seUhhbmRsZXJzID0gLyogQF9fUFVSRV9fICovIG5ldyBSZWFkb25seVJlYWN0aXZlSGFuZGxlcigpO1xuY29uc3Qgc2hhbGxvd1JlYWN0aXZlSGFuZGxlcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE11dGFibGVSZWFjdGl2ZUhhbmRsZXIodHJ1ZSk7XG5jb25zdCBzaGFsbG93UmVhZG9ubHlIYW5kbGVycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgUmVhZG9ubHlSZWFjdGl2ZUhhbmRsZXIodHJ1ZSk7XG5cbmNvbnN0IHRvU2hhbGxvdyA9ICh2YWx1ZSkgPT4gdmFsdWU7XG5jb25zdCBnZXRQcm90byA9ICh2KSA9PiBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHYpO1xuZnVuY3Rpb24gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCBpc1JlYWRvbmx5MiwgaXNTaGFsbG93Mikge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbXCJfX3ZfcmF3XCJdO1xuICAgIGNvbnN0IHJhd1RhcmdldCA9IHRvUmF3KHRhcmdldCk7XG4gICAgY29uc3QgdGFyZ2V0SXNNYXAgPSBpc01hcChyYXdUYXJnZXQpO1xuICAgIGNvbnN0IGlzUGFpciA9IG1ldGhvZCA9PT0gXCJlbnRyaWVzXCIgfHwgbWV0aG9kID09PSBTeW1ib2wuaXRlcmF0b3IgJiYgdGFyZ2V0SXNNYXA7XG4gICAgY29uc3QgaXNLZXlPbmx5ID0gbWV0aG9kID09PSBcImtleXNcIiAmJiB0YXJnZXRJc01hcDtcbiAgICBjb25zdCBpbm5lckl0ZXJhdG9yID0gdGFyZ2V0W21ldGhvZF0oLi4uYXJncyk7XG4gICAgY29uc3Qgd3JhcCA9IGlzU2hhbGxvdzIgPyB0b1NoYWxsb3cgOiBpc1JlYWRvbmx5MiA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgICFpc1JlYWRvbmx5MiAmJiB0cmFjayhcbiAgICAgIHJhd1RhcmdldCxcbiAgICAgIFwiaXRlcmF0ZVwiLFxuICAgICAgaXNLZXlPbmx5ID8gTUFQX0tFWV9JVEVSQVRFX0tFWSA6IElURVJBVEVfS0VZXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gaXRlcmF0b3IgcHJvdG9jb2xcbiAgICAgIG5leHQoKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGlubmVySXRlcmF0b3IubmV4dCgpO1xuICAgICAgICByZXR1cm4gZG9uZSA/IHsgdmFsdWUsIGRvbmUgfSA6IHtcbiAgICAgICAgICB2YWx1ZTogaXNQYWlyID8gW3dyYXAodmFsdWVbMF0pLCB3cmFwKHZhbHVlWzFdKV0gOiB3cmFwKHZhbHVlKSxcbiAgICAgICAgICBkb25lXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgLy8gaXRlcmFibGUgcHJvdG9jb2xcbiAgICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlUmVhZG9ubHlNZXRob2QodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSBhcmdzWzBdID8gYG9uIGtleSBcIiR7YXJnc1swXX1cIiBgIDogYGA7XG4gICAgICB3YXJuKFxuICAgICAgICBgJHtjYXBpdGFsaXplKHR5cGUpfSBvcGVyYXRpb24gJHtrZXl9ZmFpbGVkOiB0YXJnZXQgaXMgcmVhZG9ubHkuYCxcbiAgICAgICAgdG9SYXcodGhpcylcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlID09PSBcImRlbGV0ZVwiID8gZmFsc2UgOiB0eXBlID09PSBcImNsZWFyXCIgPyB2b2lkIDAgOiB0aGlzO1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucyhyZWFkb25seSwgc2hhbGxvdykge1xuICBjb25zdCBpbnN0cnVtZW50YXRpb25zID0ge1xuICAgIGdldChrZXkpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbXCJfX3ZfcmF3XCJdO1xuICAgICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICAgIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gICAgICBpZiAoIXJlYWRvbmx5KSB7XG4gICAgICAgIGlmIChoYXNDaGFuZ2VkKGtleSwgcmF3S2V5KSkge1xuICAgICAgICAgIHRyYWNrKHJhd1RhcmdldCwgXCJnZXRcIiwga2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0cmFjayhyYXdUYXJnZXQsIFwiZ2V0XCIsIHJhd0tleSk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGhhcyB9ID0gZ2V0UHJvdG8ocmF3VGFyZ2V0KTtcbiAgICAgIGNvbnN0IHdyYXAgPSBzaGFsbG93ID8gdG9TaGFsbG93IDogcmVhZG9ubHkgPyB0b1JlYWRvbmx5IDogdG9SZWFjdGl2ZTtcbiAgICAgIGlmIChoYXMuY2FsbChyYXdUYXJnZXQsIGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0LmdldChrZXkpKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzLmNhbGwocmF3VGFyZ2V0LCByYXdLZXkpKSB7XG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldC5nZXQocmF3S2V5KSk7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldCAhPT0gcmF3VGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5nZXQoa2V5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldCBzaXplKCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tcIl9fdl9yYXdcIl07XG4gICAgICAhcmVhZG9ubHkgJiYgdHJhY2sodG9SYXcodGFyZ2V0KSwgXCJpdGVyYXRlXCIsIElURVJBVEVfS0VZKTtcbiAgICAgIHJldHVybiB0YXJnZXQuc2l6ZTtcbiAgICB9LFxuICAgIGhhcyhrZXkpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbXCJfX3ZfcmF3XCJdO1xuICAgICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICAgIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gICAgICBpZiAoIXJlYWRvbmx5KSB7XG4gICAgICAgIGlmIChoYXNDaGFuZ2VkKGtleSwgcmF3S2V5KSkge1xuICAgICAgICAgIHRyYWNrKHJhd1RhcmdldCwgXCJoYXNcIiwga2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0cmFjayhyYXdUYXJnZXQsIFwiaGFzXCIsIHJhd0tleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5ID09PSByYXdLZXkgPyB0YXJnZXQuaGFzKGtleSkgOiB0YXJnZXQuaGFzKGtleSkgfHwgdGFyZ2V0LmhhcyhyYXdLZXkpO1xuICAgIH0sXG4gICAgZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgY29uc3Qgb2JzZXJ2ZWQgPSB0aGlzO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gb2JzZXJ2ZWRbXCJfX3ZfcmF3XCJdO1xuICAgICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICAgIGNvbnN0IHdyYXAgPSBzaGFsbG93ID8gdG9TaGFsbG93IDogcmVhZG9ubHkgPyB0b1JlYWRvbmx5IDogdG9SZWFjdGl2ZTtcbiAgICAgICFyZWFkb25seSAmJiB0cmFjayhyYXdUYXJnZXQsIFwiaXRlcmF0ZVwiLCBJVEVSQVRFX0tFWSk7XG4gICAgICByZXR1cm4gdGFyZ2V0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgd3JhcCh2YWx1ZSksIHdyYXAoa2V5KSwgb2JzZXJ2ZWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBleHRlbmQoXG4gICAgaW5zdHJ1bWVudGF0aW9ucyxcbiAgICByZWFkb25seSA/IHtcbiAgICAgIGFkZDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJhZGRcIiksXG4gICAgICBzZXQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwic2V0XCIpLFxuICAgICAgZGVsZXRlOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImRlbGV0ZVwiKSxcbiAgICAgIGNsZWFyOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImNsZWFyXCIpXG4gICAgfSA6IHtcbiAgICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICBpZiAoIXNoYWxsb3cgJiYgIWlzU2hhbGxvdyh2YWx1ZSkgJiYgIWlzUmVhZG9ubHkodmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gICAgICAgIGNvbnN0IHByb3RvID0gZ2V0UHJvdG8odGFyZ2V0KTtcbiAgICAgICAgY29uc3QgaGFkS2V5ID0gcHJvdG8uaGFzLmNhbGwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaGFkS2V5KSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZCh2YWx1ZSk7XG4gICAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiYWRkXCIsIHZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFzaGFsbG93ICYmICFpc1NoYWxsb3codmFsdWUpICYmICFpc1JlYWRvbmx5KHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gdG9SYXcodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICAgICAgICBjb25zdCB7IGhhcywgZ2V0IH0gPSBnZXRQcm90byh0YXJnZXQpO1xuICAgICAgICBsZXQgaGFkS2V5ID0gaGFzLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgICAgICBpZiAoIWhhZEtleSkge1xuICAgICAgICAgIGtleSA9IHRvUmF3KGtleSk7XG4gICAgICAgICAgaGFkS2V5ID0gaGFzLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhcywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IGdldC5jYWxsKHRhcmdldCwga2V5KTtcbiAgICAgICAgdGFyZ2V0LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgaWYgKCFoYWRLZXkpIHtcbiAgICAgICAgICB0cmlnZ2VyKHRhcmdldCwgXCJhZGRcIiwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwic2V0XCIsIGtleSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICAgICAgICBjb25zdCB7IGhhcywgZ2V0IH0gPSBnZXRQcm90byh0YXJnZXQpO1xuICAgICAgICBsZXQgaGFkS2V5ID0gaGFzLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgICAgICBpZiAoIWhhZEtleSkge1xuICAgICAgICAgIGtleSA9IHRvUmF3KGtleSk7XG4gICAgICAgICAgaGFkS2V5ID0gaGFzLmNhbGwodGFyZ2V0LCBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgICAgICBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhcywga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IGdldCA/IGdldC5jYWxsKHRhcmdldCwga2V5KSA6IHZvaWQgMDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0LmRlbGV0ZShrZXkpO1xuICAgICAgICBpZiAoaGFkS2V5KSB7XG4gICAgICAgICAgdHJpZ2dlcih0YXJnZXQsIFwiZGVsZXRlXCIsIGtleSwgdm9pZCAwLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gICAgICAgIGNvbnN0IGhhZEl0ZW1zID0gdGFyZ2V0LnNpemUgIT09IDA7XG4gICAgICAgIGNvbnN0IG9sZFRhcmdldCA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBpc01hcCh0YXJnZXQpID8gbmV3IE1hcCh0YXJnZXQpIDogbmV3IFNldCh0YXJnZXQpIDogdm9pZCAwO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0YXJnZXQuY2xlYXIoKTtcbiAgICAgICAgaWYgKGhhZEl0ZW1zKSB7XG4gICAgICAgICAgdHJpZ2dlcihcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgIFwiY2xlYXJcIixcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIG9sZFRhcmdldFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gICk7XG4gIGNvbnN0IGl0ZXJhdG9yTWV0aG9kcyA9IFtcbiAgICBcImtleXNcIixcbiAgICBcInZhbHVlc1wiLFxuICAgIFwiZW50cmllc1wiLFxuICAgIFN5bWJvbC5pdGVyYXRvclxuICBdO1xuICBpdGVyYXRvck1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgaW5zdHJ1bWVudGF0aW9uc1ttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCByZWFkb25seSwgc2hhbGxvdyk7XG4gIH0pO1xuICByZXR1cm4gaW5zdHJ1bWVudGF0aW9ucztcbn1cbmZ1bmN0aW9uIGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcihpc1JlYWRvbmx5Miwgc2hhbGxvdykge1xuICBjb25zdCBpbnN0cnVtZW50YXRpb25zID0gY3JlYXRlSW5zdHJ1bWVudGF0aW9ucyhpc1JlYWRvbmx5Miwgc2hhbGxvdyk7XG4gIHJldHVybiAodGFyZ2V0LCBrZXksIHJlY2VpdmVyKSA9PiB7XG4gICAgaWYgKGtleSA9PT0gXCJfX3ZfaXNSZWFjdGl2ZVwiKSB7XG4gICAgICByZXR1cm4gIWlzUmVhZG9ubHkyO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5MjtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJfX3ZfcmF3XCIpIHtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIHJldHVybiBSZWZsZWN0LmdldChcbiAgICAgIGhhc093bihpbnN0cnVtZW50YXRpb25zLCBrZXkpICYmIGtleSBpbiB0YXJnZXQgPyBpbnN0cnVtZW50YXRpb25zIDogdGFyZ2V0LFxuICAgICAga2V5LFxuICAgICAgcmVjZWl2ZXJcbiAgICApO1xuICB9O1xufVxuY29uc3QgbXV0YWJsZUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgZ2V0OiAvKiBAX19QVVJFX18gKi8gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGZhbHNlLCBmYWxzZSlcbn07XG5jb25zdCBzaGFsbG93Q29sbGVjdGlvbkhhbmRsZXJzID0ge1xuICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIoZmFsc2UsIHRydWUpXG59O1xuY29uc3QgcmVhZG9ubHlDb2xsZWN0aW9uSGFuZGxlcnMgPSB7XG4gIGdldDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcih0cnVlLCBmYWxzZSlcbn07XG5jb25zdCBzaGFsbG93UmVhZG9ubHlDb2xsZWN0aW9uSGFuZGxlcnMgPSB7XG4gIGdldDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcih0cnVlLCB0cnVlKVxufTtcbmZ1bmN0aW9uIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzLCBrZXkpIHtcbiAgY29uc3QgcmF3S2V5ID0gdG9SYXcoa2V5KTtcbiAgaWYgKHJhd0tleSAhPT0ga2V5ICYmIGhhcy5jYWxsKHRhcmdldCwgcmF3S2V5KSkge1xuICAgIGNvbnN0IHR5cGUgPSB0b1Jhd1R5cGUodGFyZ2V0KTtcbiAgICB3YXJuKFxuICAgICAgYFJlYWN0aXZlICR7dHlwZX0gY29udGFpbnMgYm90aCB0aGUgcmF3IGFuZCByZWFjdGl2ZSB2ZXJzaW9ucyBvZiB0aGUgc2FtZSBvYmplY3Qke3R5cGUgPT09IGBNYXBgID8gYCBhcyBrZXlzYCA6IGBgfSwgd2hpY2ggY2FuIGxlYWQgdG8gaW5jb25zaXN0ZW5jaWVzLiBBdm9pZCBkaWZmZXJlbnRpYXRpbmcgYmV0d2VlbiB0aGUgcmF3IGFuZCByZWFjdGl2ZSB2ZXJzaW9ucyBvZiBhbiBvYmplY3QgYW5kIG9ubHkgdXNlIHRoZSByZWFjdGl2ZSB2ZXJzaW9uIGlmIHBvc3NpYmxlLmBcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IHJlYWN0aXZlTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzaGFsbG93UmVhY3RpdmVNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHJlYWRvbmx5TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzaGFsbG93UmVhZG9ubHlNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHRhcmdldFR5cGVNYXAocmF3VHlwZSkge1xuICBzd2l0Y2ggKHJhd1R5cGUpIHtcbiAgICBjYXNlIFwiT2JqZWN0XCI6XG4gICAgY2FzZSBcIkFycmF5XCI6XG4gICAgICByZXR1cm4gMSAvKiBDT01NT04gKi87XG4gICAgY2FzZSBcIk1hcFwiOlxuICAgIGNhc2UgXCJTZXRcIjpcbiAgICBjYXNlIFwiV2Vha01hcFwiOlxuICAgIGNhc2UgXCJXZWFrU2V0XCI6XG4gICAgICByZXR1cm4gMiAvKiBDT0xMRUNUSU9OICovO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gMCAvKiBJTlZBTElEICovO1xuICB9XG59XG5mdW5jdGlvbiBnZXRUYXJnZXRUeXBlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZVtcIl9fdl9za2lwXCJdIHx8ICFPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSA/IDAgLyogSU5WQUxJRCAqLyA6IHRhcmdldFR5cGVNYXAodG9SYXdUeXBlKHZhbHVlKSk7XG59XG5mdW5jdGlvbiByZWFjdGl2ZSh0YXJnZXQpIHtcbiAgaWYgKGlzUmVhZG9ubHkodGFyZ2V0KSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KFxuICAgIHRhcmdldCxcbiAgICBmYWxzZSxcbiAgICBtdXRhYmxlSGFuZGxlcnMsXG4gICAgbXV0YWJsZUNvbGxlY3Rpb25IYW5kbGVycyxcbiAgICByZWFjdGl2ZU1hcFxuICApO1xufVxuZnVuY3Rpb24gc2hhbGxvd1JlYWN0aXZlKHRhcmdldCkge1xuICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QoXG4gICAgdGFyZ2V0LFxuICAgIGZhbHNlLFxuICAgIHNoYWxsb3dSZWFjdGl2ZUhhbmRsZXJzLFxuICAgIHNoYWxsb3dDb2xsZWN0aW9uSGFuZGxlcnMsXG4gICAgc2hhbGxvd1JlYWN0aXZlTWFwXG4gICk7XG59XG5mdW5jdGlvbiByZWFkb25seSh0YXJnZXQpIHtcbiAgcmV0dXJuIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KFxuICAgIHRhcmdldCxcbiAgICB0cnVlLFxuICAgIHJlYWRvbmx5SGFuZGxlcnMsXG4gICAgcmVhZG9ubHlDb2xsZWN0aW9uSGFuZGxlcnMsXG4gICAgcmVhZG9ubHlNYXBcbiAgKTtcbn1cbmZ1bmN0aW9uIHNoYWxsb3dSZWFkb25seSh0YXJnZXQpIHtcbiAgcmV0dXJuIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KFxuICAgIHRhcmdldCxcbiAgICB0cnVlLFxuICAgIHNoYWxsb3dSZWFkb25seUhhbmRsZXJzLFxuICAgIHNoYWxsb3dSZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyxcbiAgICBzaGFsbG93UmVhZG9ubHlNYXBcbiAgKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0aXZlT2JqZWN0KHRhcmdldCwgaXNSZWFkb25seTIsIGJhc2VIYW5kbGVycywgY29sbGVjdGlvbkhhbmRsZXJzLCBwcm94eU1hcCkge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgd2FybihcbiAgICAgICAgYHZhbHVlIGNhbm5vdCBiZSBtYWRlICR7aXNSZWFkb25seTIgPyBcInJlYWRvbmx5XCIgOiBcInJlYWN0aXZlXCJ9OiAke1N0cmluZyhcbiAgICAgICAgICB0YXJnZXRcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIGlmICh0YXJnZXRbXCJfX3ZfcmF3XCJdICYmICEoaXNSZWFkb25seTIgJiYgdGFyZ2V0W1wiX192X2lzUmVhY3RpdmVcIl0pKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCB0YXJnZXRUeXBlID0gZ2V0VGFyZ2V0VHlwZSh0YXJnZXQpO1xuICBpZiAodGFyZ2V0VHlwZSA9PT0gMCAvKiBJTlZBTElEICovKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBleGlzdGluZ1Byb3h5ID0gcHJveHlNYXAuZ2V0KHRhcmdldCk7XG4gIGlmIChleGlzdGluZ1Byb3h5KSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nUHJveHk7XG4gIH1cbiAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoXG4gICAgdGFyZ2V0LFxuICAgIHRhcmdldFR5cGUgPT09IDIgLyogQ09MTEVDVElPTiAqLyA/IGNvbGxlY3Rpb25IYW5kbGVycyA6IGJhc2VIYW5kbGVyc1xuICApO1xuICBwcm94eU1hcC5zZXQodGFyZ2V0LCBwcm94eSk7XG4gIHJldHVybiBwcm94eTtcbn1cbmZ1bmN0aW9uIGlzUmVhY3RpdmUodmFsdWUpIHtcbiAgaWYgKGlzUmVhZG9ubHkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGlzUmVhY3RpdmUodmFsdWVbXCJfX3ZfcmF3XCJdKTtcbiAgfVxuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWVbXCJfX3ZfaXNSZWFjdGl2ZVwiXSk7XG59XG5mdW5jdGlvbiBpc1JlYWRvbmx5KHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZVtcIl9fdl9pc1JlYWRvbmx5XCJdKTtcbn1cbmZ1bmN0aW9uIGlzU2hhbGxvdyh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWVbXCJfX3ZfaXNTaGFsbG93XCJdKTtcbn1cbmZ1bmN0aW9uIGlzUHJveHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID8gISF2YWx1ZVtcIl9fdl9yYXdcIl0gOiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHRvUmF3KG9ic2VydmVkKSB7XG4gIGNvbnN0IHJhdyA9IG9ic2VydmVkICYmIG9ic2VydmVkW1wiX192X3Jhd1wiXTtcbiAgcmV0dXJuIHJhdyA/IHRvUmF3KHJhdykgOiBvYnNlcnZlZDtcbn1cbmZ1bmN0aW9uIG1hcmtSYXcodmFsdWUpIHtcbiAgaWYgKCFoYXNPd24odmFsdWUsIFwiX192X3NraXBcIikgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkpIHtcbiAgICBkZWYodmFsdWUsIFwiX192X3NraXBcIiwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuY29uc3QgdG9SZWFjdGl2ZSA9ICh2YWx1ZSkgPT4gaXNPYmplY3QodmFsdWUpID8gcmVhY3RpdmUodmFsdWUpIDogdmFsdWU7XG5jb25zdCB0b1JlYWRvbmx5ID0gKHZhbHVlKSA9PiBpc09iamVjdCh2YWx1ZSkgPyByZWFkb25seSh2YWx1ZSkgOiB2YWx1ZTtcblxuZnVuY3Rpb24gaXNSZWYocikge1xuICByZXR1cm4gciA/IHJbXCJfX3ZfaXNSZWZcIl0gPT09IHRydWUgOiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHJlZih2YWx1ZSkge1xuICByZXR1cm4gY3JlYXRlUmVmKHZhbHVlLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBzaGFsbG93UmVmKHZhbHVlKSB7XG4gIHJldHVybiBjcmVhdGVSZWYodmFsdWUsIHRydWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlUmVmKHJhd1ZhbHVlLCBzaGFsbG93KSB7XG4gIGlmIChpc1JlZihyYXdWYWx1ZSkpIHtcbiAgICByZXR1cm4gcmF3VmFsdWU7XG4gIH1cbiAgcmV0dXJuIG5ldyBSZWZJbXBsKHJhd1ZhbHVlLCBzaGFsbG93KTtcbn1cbmNsYXNzIFJlZkltcGwge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSwgaXNTaGFsbG93Mikge1xuICAgIHRoaXMuZGVwID0gbmV3IERlcCgpO1xuICAgIHRoaXNbXCJfX3ZfaXNSZWZcIl0gPSB0cnVlO1xuICAgIHRoaXNbXCJfX3ZfaXNTaGFsbG93XCJdID0gZmFsc2U7XG4gICAgdGhpcy5fcmF3VmFsdWUgPSBpc1NoYWxsb3cyID8gdmFsdWUgOiB0b1Jhdyh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSBpc1NoYWxsb3cyID8gdmFsdWUgOiB0b1JlYWN0aXZlKHZhbHVlKTtcbiAgICB0aGlzW1wiX192X2lzU2hhbGxvd1wiXSA9IGlzU2hhbGxvdzI7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB0aGlzLmRlcC50cmFjayh7XG4gICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAga2V5OiBcInZhbHVlXCJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcC50cmFjaygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9yYXdWYWx1ZTtcbiAgICBjb25zdCB1c2VEaXJlY3RWYWx1ZSA9IHRoaXNbXCJfX3ZfaXNTaGFsbG93XCJdIHx8IGlzU2hhbGxvdyhuZXdWYWx1ZSkgfHwgaXNSZWFkb25seShuZXdWYWx1ZSk7XG4gICAgbmV3VmFsdWUgPSB1c2VEaXJlY3RWYWx1ZSA/IG5ld1ZhbHVlIDogdG9SYXcobmV3VmFsdWUpO1xuICAgIGlmIChoYXNDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuX3Jhd1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZSA9IHVzZURpcmVjdFZhbHVlID8gbmV3VmFsdWUgOiB0b1JlYWN0aXZlKG5ld1ZhbHVlKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIHRoaXMuZGVwLnRyaWdnZXIoe1xuICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICB0eXBlOiBcInNldFwiLFxuICAgICAgICAgIGtleTogXCJ2YWx1ZVwiLFxuICAgICAgICAgIG5ld1ZhbHVlLFxuICAgICAgICAgIG9sZFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXAudHJpZ2dlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdHJpZ2dlclJlZihyZWYyKSB7XG4gIGlmIChyZWYyLmRlcCkge1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICByZWYyLmRlcC50cmlnZ2VyKHtcbiAgICAgICAgdGFyZ2V0OiByZWYyLFxuICAgICAgICB0eXBlOiBcInNldFwiLFxuICAgICAgICBrZXk6IFwidmFsdWVcIixcbiAgICAgICAgbmV3VmFsdWU6IHJlZjIuX3ZhbHVlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmMi5kZXAudHJpZ2dlcigpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdW5yZWYocmVmMikge1xuICByZXR1cm4gaXNSZWYocmVmMikgPyByZWYyLnZhbHVlIDogcmVmMjtcbn1cbmZ1bmN0aW9uIHRvVmFsdWUoc291cmNlKSB7XG4gIHJldHVybiBpc0Z1bmN0aW9uKHNvdXJjZSkgPyBzb3VyY2UoKSA6IHVucmVmKHNvdXJjZSk7XG59XG5jb25zdCBzaGFsbG93VW53cmFwSGFuZGxlcnMgPSB7XG4gIGdldDogKHRhcmdldCwga2V5LCByZWNlaXZlcikgPT4ga2V5ID09PSBcIl9fdl9yYXdcIiA/IHRhcmdldCA6IHVucmVmKFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlcikpLFxuICBzZXQ6ICh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKSA9PiB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICBpZiAoaXNSZWYob2xkVmFsdWUpICYmICFpc1JlZih2YWx1ZSkpIHtcbiAgICAgIG9sZFZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfVxufTtcbmZ1bmN0aW9uIHByb3h5UmVmcyhvYmplY3RXaXRoUmVmcykge1xuICByZXR1cm4gaXNSZWFjdGl2ZShvYmplY3RXaXRoUmVmcykgPyBvYmplY3RXaXRoUmVmcyA6IG5ldyBQcm94eShvYmplY3RXaXRoUmVmcywgc2hhbGxvd1Vud3JhcEhhbmRsZXJzKTtcbn1cbmNsYXNzIEN1c3RvbVJlZkltcGwge1xuICBjb25zdHJ1Y3RvcihmYWN0b3J5KSB7XG4gICAgdGhpc1tcIl9fdl9pc1JlZlwiXSA9IHRydWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2b2lkIDA7XG4gICAgY29uc3QgZGVwID0gdGhpcy5kZXAgPSBuZXcgRGVwKCk7XG4gICAgY29uc3QgeyBnZXQsIHNldCB9ID0gZmFjdG9yeShkZXAudHJhY2suYmluZChkZXApLCBkZXAudHJpZ2dlci5iaW5kKGRlcCkpO1xuICAgIHRoaXMuX2dldCA9IGdldDtcbiAgICB0aGlzLl9zZXQgPSBzZXQ7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSA9IHRoaXMuX2dldCgpO1xuICB9XG4gIHNldCB2YWx1ZShuZXdWYWwpIHtcbiAgICB0aGlzLl9zZXQobmV3VmFsKTtcbiAgfVxufVxuZnVuY3Rpb24gY3VzdG9tUmVmKGZhY3RvcnkpIHtcbiAgcmV0dXJuIG5ldyBDdXN0b21SZWZJbXBsKGZhY3RvcnkpO1xufVxuZnVuY3Rpb24gdG9SZWZzKG9iamVjdCkge1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiAhaXNQcm94eShvYmplY3QpKSB7XG4gICAgd2FybihgdG9SZWZzKCkgZXhwZWN0cyBhIHJlYWN0aXZlIG9iamVjdCBidXQgcmVjZWl2ZWQgYSBwbGFpbiBvbmUuYCk7XG4gIH1cbiAgY29uc3QgcmV0ID0gaXNBcnJheShvYmplY3QpID8gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpIDoge307XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIHJldFtrZXldID0gcHJvcGVydHlUb1JlZihvYmplY3QsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbmNsYXNzIE9iamVjdFJlZkltcGwge1xuICBjb25zdHJ1Y3Rvcihfb2JqZWN0LCBfa2V5LCBfZGVmYXVsdFZhbHVlKSB7XG4gICAgdGhpcy5fb2JqZWN0ID0gX29iamVjdDtcbiAgICB0aGlzLl9rZXkgPSBfa2V5O1xuICAgIHRoaXMuX2RlZmF1bHRWYWx1ZSA9IF9kZWZhdWx0VmFsdWU7XG4gICAgdGhpc1tcIl9fdl9pc1JlZlwiXSA9IHRydWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2b2lkIDA7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMuX29iamVjdFt0aGlzLl9rZXldO1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSA9IHZhbCA9PT0gdm9pZCAwID8gdGhpcy5fZGVmYXVsdFZhbHVlIDogdmFsO1xuICB9XG4gIHNldCB2YWx1ZShuZXdWYWwpIHtcbiAgICB0aGlzLl9vYmplY3RbdGhpcy5fa2V5XSA9IG5ld1ZhbDtcbiAgfVxuICBnZXQgZGVwKCkge1xuICAgIHJldHVybiBnZXREZXBGcm9tUmVhY3RpdmUodG9SYXcodGhpcy5fb2JqZWN0KSwgdGhpcy5fa2V5KTtcbiAgfVxufVxuY2xhc3MgR2V0dGVyUmVmSW1wbCB7XG4gIGNvbnN0cnVjdG9yKF9nZXR0ZXIpIHtcbiAgICB0aGlzLl9nZXR0ZXIgPSBfZ2V0dGVyO1xuICAgIHRoaXNbXCJfX3ZfaXNSZWZcIl0gPSB0cnVlO1xuICAgIHRoaXNbXCJfX3ZfaXNSZWFkb25seVwiXSA9IHRydWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2b2lkIDA7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSA9IHRoaXMuX2dldHRlcigpO1xuICB9XG59XG5mdW5jdGlvbiB0b1JlZihzb3VyY2UsIGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmIChpc1JlZihzb3VyY2UpKSB7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNvdXJjZSkpIHtcbiAgICByZXR1cm4gbmV3IEdldHRlclJlZkltcGwoc291cmNlKTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChzb3VyY2UpICYmIGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5VG9SZWYoc291cmNlLCBrZXksIGRlZmF1bHRWYWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlZihzb3VyY2UpO1xuICB9XG59XG5mdW5jdGlvbiBwcm9wZXJ0eVRvUmVmKHNvdXJjZSwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgY29uc3QgdmFsID0gc291cmNlW2tleV07XG4gIHJldHVybiBpc1JlZih2YWwpID8gdmFsIDogbmV3IE9iamVjdFJlZkltcGwoc291cmNlLCBrZXksIGRlZmF1bHRWYWx1ZSk7XG59XG5cbmNsYXNzIENvbXB1dGVkUmVmSW1wbCB7XG4gIGNvbnN0cnVjdG9yKGZuLCBzZXR0ZXIsIGlzU1NSKSB7XG4gICAgdGhpcy5mbiA9IGZuO1xuICAgIHRoaXMuc2V0dGVyID0gc2V0dGVyO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHRoaXMuX3ZhbHVlID0gdm9pZCAwO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHRoaXMuZGVwID0gbmV3IERlcCh0aGlzKTtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLl9fdl9pc1JlZiA9IHRydWU7XG4gICAgLy8gVE9ETyBpc29sYXRlZERlY2xhcmF0aW9ucyBcIl9fdl9pc1JlYWRvbmx5XCJcbiAgICAvLyBBIGNvbXB1dGVkIGlzIGFsc28gYSBzdWJzY3JpYmVyIHRoYXQgdHJhY2tzIG90aGVyIGRlcHNcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLmRlcHMgPSB2b2lkIDA7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5kZXBzVGFpbCA9IHZvaWQgMDtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLmZsYWdzID0gMTY7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5nbG9iYWxWZXJzaW9uID0gZ2xvYmFsVmVyc2lvbiAtIDE7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gdm9pZCAwO1xuICAgIC8vIGZvciBiYWNrd2FyZHMgY29tcGF0XG4gICAgdGhpcy5lZmZlY3QgPSB0aGlzO1xuICAgIHRoaXNbXCJfX3ZfaXNSZWFkb25seVwiXSA9ICFzZXR0ZXI7XG4gICAgdGhpcy5pc1NTUiA9IGlzU1NSO1xuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5vdGlmeSgpIHtcbiAgICB0aGlzLmZsYWdzIHw9IDE2O1xuICAgIGlmICghKHRoaXMuZmxhZ3MgJiA4KSAmJiAvLyBhdm9pZCBpbmZpbml0ZSBzZWxmIHJlY3Vyc2lvblxuICAgIGFjdGl2ZVN1YiAhPT0gdGhpcykge1xuICAgICAgYmF0Y2godGhpcywgdHJ1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIDtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgY29uc3QgbGluayA9ICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyB0aGlzLmRlcC50cmFjayh7XG4gICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICB0eXBlOiBcImdldFwiLFxuICAgICAga2V5OiBcInZhbHVlXCJcbiAgICB9KSA6IHRoaXMuZGVwLnRyYWNrKCk7XG4gICAgcmVmcmVzaENvbXB1dGVkKHRoaXMpO1xuICAgIGlmIChsaW5rKSB7XG4gICAgICBsaW5rLnZlcnNpb24gPSB0aGlzLmRlcC52ZXJzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgaWYgKHRoaXMuc2V0dGVyKSB7XG4gICAgICB0aGlzLnNldHRlcihuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICB3YXJuKFwiV3JpdGUgb3BlcmF0aW9uIGZhaWxlZDogY29tcHV0ZWQgdmFsdWUgaXMgcmVhZG9ubHlcIik7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBjb21wdXRlZChnZXR0ZXJPck9wdGlvbnMsIGRlYnVnT3B0aW9ucywgaXNTU1IgPSBmYWxzZSkge1xuICBsZXQgZ2V0dGVyO1xuICBsZXQgc2V0dGVyO1xuICBpZiAoaXNGdW5jdGlvbihnZXR0ZXJPck9wdGlvbnMpKSB7XG4gICAgZ2V0dGVyID0gZ2V0dGVyT3JPcHRpb25zO1xuICB9IGVsc2Uge1xuICAgIGdldHRlciA9IGdldHRlck9yT3B0aW9ucy5nZXQ7XG4gICAgc2V0dGVyID0gZ2V0dGVyT3JPcHRpb25zLnNldDtcbiAgfVxuICBjb25zdCBjUmVmID0gbmV3IENvbXB1dGVkUmVmSW1wbChnZXR0ZXIsIHNldHRlciwgaXNTU1IpO1xuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBkZWJ1Z09wdGlvbnMgJiYgIWlzU1NSKSB7XG4gICAgY1JlZi5vblRyYWNrID0gZGVidWdPcHRpb25zLm9uVHJhY2s7XG4gICAgY1JlZi5vblRyaWdnZXIgPSBkZWJ1Z09wdGlvbnMub25UcmlnZ2VyO1xuICB9XG4gIHJldHVybiBjUmVmO1xufVxuXG5jb25zdCBUcmFja09wVHlwZXMgPSB7XG4gIFwiR0VUXCI6IFwiZ2V0XCIsXG4gIFwiSEFTXCI6IFwiaGFzXCIsXG4gIFwiSVRFUkFURVwiOiBcIml0ZXJhdGVcIlxufTtcbmNvbnN0IFRyaWdnZXJPcFR5cGVzID0ge1xuICBcIlNFVFwiOiBcInNldFwiLFxuICBcIkFERFwiOiBcImFkZFwiLFxuICBcIkRFTEVURVwiOiBcImRlbGV0ZVwiLFxuICBcIkNMRUFSXCI6IFwiY2xlYXJcIlxufTtcbmNvbnN0IFJlYWN0aXZlRmxhZ3MgPSB7XG4gIFwiU0tJUFwiOiBcIl9fdl9za2lwXCIsXG4gIFwiSVNfUkVBQ1RJVkVcIjogXCJfX3ZfaXNSZWFjdGl2ZVwiLFxuICBcIklTX1JFQURPTkxZXCI6IFwiX192X2lzUmVhZG9ubHlcIixcbiAgXCJJU19TSEFMTE9XXCI6IFwiX192X2lzU2hhbGxvd1wiLFxuICBcIlJBV1wiOiBcIl9fdl9yYXdcIixcbiAgXCJJU19SRUZcIjogXCJfX3ZfaXNSZWZcIlxufTtcblxuY29uc3QgV2F0Y2hFcnJvckNvZGVzID0ge1xuICBcIldBVENIX0dFVFRFUlwiOiAyLFxuICBcIjJcIjogXCJXQVRDSF9HRVRURVJcIixcbiAgXCJXQVRDSF9DQUxMQkFDS1wiOiAzLFxuICBcIjNcIjogXCJXQVRDSF9DQUxMQkFDS1wiLFxuICBcIldBVENIX0NMRUFOVVBcIjogNCxcbiAgXCI0XCI6IFwiV0FUQ0hfQ0xFQU5VUFwiXG59O1xuY29uc3QgSU5JVElBTF9XQVRDSEVSX1ZBTFVFID0ge307XG5jb25zdCBjbGVhbnVwTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5sZXQgYWN0aXZlV2F0Y2hlciA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldEN1cnJlbnRXYXRjaGVyKCkge1xuICByZXR1cm4gYWN0aXZlV2F0Y2hlcjtcbn1cbmZ1bmN0aW9uIG9uV2F0Y2hlckNsZWFudXAoY2xlYW51cEZuLCBmYWlsU2lsZW50bHkgPSBmYWxzZSwgb3duZXIgPSBhY3RpdmVXYXRjaGVyKSB7XG4gIGlmIChvd25lcikge1xuICAgIGxldCBjbGVhbnVwcyA9IGNsZWFudXBNYXAuZ2V0KG93bmVyKTtcbiAgICBpZiAoIWNsZWFudXBzKSBjbGVhbnVwTWFwLnNldChvd25lciwgY2xlYW51cHMgPSBbXSk7XG4gICAgY2xlYW51cHMucHVzaChjbGVhbnVwRm4pO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIWZhaWxTaWxlbnRseSkge1xuICAgIHdhcm4oXG4gICAgICBgb25XYXRjaGVyQ2xlYW51cCgpIHdhcyBjYWxsZWQgd2hlbiB0aGVyZSB3YXMgbm8gYWN0aXZlIHdhdGNoZXIgdG8gYXNzb2NpYXRlIHdpdGguYFxuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIHdhdGNoKHNvdXJjZSwgY2IsIG9wdGlvbnMgPSBFTVBUWV9PQkopIHtcbiAgY29uc3QgeyBpbW1lZGlhdGUsIGRlZXAsIG9uY2UsIHNjaGVkdWxlciwgYXVnbWVudEpvYiwgY2FsbCB9ID0gb3B0aW9ucztcbiAgY29uc3Qgd2FybkludmFsaWRTb3VyY2UgPSAocykgPT4ge1xuICAgIChvcHRpb25zLm9uV2FybiB8fCB3YXJuKShcbiAgICAgIGBJbnZhbGlkIHdhdGNoIHNvdXJjZTogYCxcbiAgICAgIHMsXG4gICAgICBgQSB3YXRjaCBzb3VyY2UgY2FuIG9ubHkgYmUgYSBnZXR0ZXIvZWZmZWN0IGZ1bmN0aW9uLCBhIHJlZiwgYSByZWFjdGl2ZSBvYmplY3QsIG9yIGFuIGFycmF5IG9mIHRoZXNlIHR5cGVzLmBcbiAgICApO1xuICB9O1xuICBjb25zdCByZWFjdGl2ZUdldHRlciA9IChzb3VyY2UyKSA9PiB7XG4gICAgaWYgKGRlZXApIHJldHVybiBzb3VyY2UyO1xuICAgIGlmIChpc1NoYWxsb3coc291cmNlMikgfHwgZGVlcCA9PT0gZmFsc2UgfHwgZGVlcCA9PT0gMClcbiAgICAgIHJldHVybiB0cmF2ZXJzZShzb3VyY2UyLCAxKTtcbiAgICByZXR1cm4gdHJhdmVyc2Uoc291cmNlMik7XG4gIH07XG4gIGxldCBlZmZlY3Q7XG4gIGxldCBnZXR0ZXI7XG4gIGxldCBjbGVhbnVwO1xuICBsZXQgYm91bmRDbGVhbnVwO1xuICBsZXQgZm9yY2VUcmlnZ2VyID0gZmFsc2U7XG4gIGxldCBpc011bHRpU291cmNlID0gZmFsc2U7XG4gIGlmIChpc1JlZihzb3VyY2UpKSB7XG4gICAgZ2V0dGVyID0gKCkgPT4gc291cmNlLnZhbHVlO1xuICAgIGZvcmNlVHJpZ2dlciA9IGlzU2hhbGxvdyhzb3VyY2UpO1xuICB9IGVsc2UgaWYgKGlzUmVhY3RpdmUoc291cmNlKSkge1xuICAgIGdldHRlciA9ICgpID0+IHJlYWN0aXZlR2V0dGVyKHNvdXJjZSk7XG4gICAgZm9yY2VUcmlnZ2VyID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHNvdXJjZSkpIHtcbiAgICBpc011bHRpU291cmNlID0gdHJ1ZTtcbiAgICBmb3JjZVRyaWdnZXIgPSBzb3VyY2Uuc29tZSgocykgPT4gaXNSZWFjdGl2ZShzKSB8fCBpc1NoYWxsb3cocykpO1xuICAgIGdldHRlciA9ICgpID0+IHNvdXJjZS5tYXAoKHMpID0+IHtcbiAgICAgIGlmIChpc1JlZihzKSkge1xuICAgICAgICByZXR1cm4gcy52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNSZWFjdGl2ZShzKSkge1xuICAgICAgICByZXR1cm4gcmVhY3RpdmVHZXR0ZXIocyk7XG4gICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ocykpIHtcbiAgICAgICAgcmV0dXJuIGNhbGwgPyBjYWxsKHMsIDIpIDogcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB3YXJuSW52YWxpZFNvdXJjZShzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNvdXJjZSkpIHtcbiAgICBpZiAoY2IpIHtcbiAgICAgIGdldHRlciA9IGNhbGwgPyAoKSA9PiBjYWxsKHNvdXJjZSwgMikgOiBzb3VyY2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdldHRlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKGNsZWFudXApIHtcbiAgICAgICAgICBwYXVzZVRyYWNraW5nKCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgcmVzZXRUcmFja2luZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50RWZmZWN0ID0gYWN0aXZlV2F0Y2hlcjtcbiAgICAgICAgYWN0aXZlV2F0Y2hlciA9IGVmZmVjdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gY2FsbCA/IGNhbGwoc291cmNlLCAzLCBbYm91bmRDbGVhbnVwXSkgOiBzb3VyY2UoYm91bmRDbGVhbnVwKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBhY3RpdmVXYXRjaGVyID0gY3VycmVudEVmZmVjdDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZ2V0dGVyID0gTk9PUDtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm5JbnZhbGlkU291cmNlKHNvdXJjZSk7XG4gIH1cbiAgaWYgKGNiICYmIGRlZXApIHtcbiAgICBjb25zdCBiYXNlR2V0dGVyID0gZ2V0dGVyO1xuICAgIGNvbnN0IGRlcHRoID0gZGVlcCA9PT0gdHJ1ZSA/IEluZmluaXR5IDogZGVlcDtcbiAgICBnZXR0ZXIgPSAoKSA9PiB0cmF2ZXJzZShiYXNlR2V0dGVyKCksIGRlcHRoKTtcbiAgfVxuICBjb25zdCBzY29wZSA9IGdldEN1cnJlbnRTY29wZSgpO1xuICBjb25zdCB3YXRjaEhhbmRsZSA9ICgpID0+IHtcbiAgICBlZmZlY3Quc3RvcCgpO1xuICAgIGlmIChzY29wZSAmJiBzY29wZS5hY3RpdmUpIHtcbiAgICAgIHJlbW92ZShzY29wZS5lZmZlY3RzLCBlZmZlY3QpO1xuICAgIH1cbiAgfTtcbiAgaWYgKG9uY2UgJiYgY2IpIHtcbiAgICBjb25zdCBfY2IgPSBjYjtcbiAgICBjYiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBfY2IoLi4uYXJncyk7XG4gICAgICB3YXRjaEhhbmRsZSgpO1xuICAgIH07XG4gIH1cbiAgbGV0IG9sZFZhbHVlID0gaXNNdWx0aVNvdXJjZSA/IG5ldyBBcnJheShzb3VyY2UubGVuZ3RoKS5maWxsKElOSVRJQUxfV0FUQ0hFUl9WQUxVRSkgOiBJTklUSUFMX1dBVENIRVJfVkFMVUU7XG4gIGNvbnN0IGpvYiA9IChpbW1lZGlhdGVGaXJzdFJ1bikgPT4ge1xuICAgIGlmICghKGVmZmVjdC5mbGFncyAmIDEpIHx8ICFlZmZlY3QuZGlydHkgJiYgIWltbWVkaWF0ZUZpcnN0UnVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYikge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBlZmZlY3QucnVuKCk7XG4gICAgICBpZiAoZGVlcCB8fCBmb3JjZVRyaWdnZXIgfHwgKGlzTXVsdGlTb3VyY2UgPyBuZXdWYWx1ZS5zb21lKCh2LCBpKSA9PiBoYXNDaGFuZ2VkKHYsIG9sZFZhbHVlW2ldKSkgOiBoYXNDaGFuZ2VkKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpKSB7XG4gICAgICAgIGlmIChjbGVhbnVwKSB7XG4gICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRXYXRjaGVyID0gYWN0aXZlV2F0Y2hlcjtcbiAgICAgICAgYWN0aXZlV2F0Y2hlciA9IGVmZmVjdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgbmV3VmFsdWUsXG4gICAgICAgICAgICAvLyBwYXNzIHVuZGVmaW5lZCBhcyB0aGUgb2xkIHZhbHVlIHdoZW4gaXQncyBjaGFuZ2VkIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAgICAgb2xkVmFsdWUgPT09IElOSVRJQUxfV0FUQ0hFUl9WQUxVRSA/IHZvaWQgMCA6IGlzTXVsdGlTb3VyY2UgJiYgb2xkVmFsdWVbMF0gPT09IElOSVRJQUxfV0FUQ0hFUl9WQUxVRSA/IFtdIDogb2xkVmFsdWUsXG4gICAgICAgICAgICBib3VuZENsZWFudXBcbiAgICAgICAgICBdO1xuICAgICAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgY2FsbCA/IGNhbGwoY2IsIDMsIGFyZ3MpIDogKFxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgY2IoLi4uYXJncylcbiAgICAgICAgICApO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGFjdGl2ZVdhdGNoZXIgPSBjdXJyZW50V2F0Y2hlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlZmZlY3QucnVuKCk7XG4gICAgfVxuICB9O1xuICBpZiAoYXVnbWVudEpvYikge1xuICAgIGF1Z21lbnRKb2Ioam9iKTtcbiAgfVxuICBlZmZlY3QgPSBuZXcgUmVhY3RpdmVFZmZlY3QoZ2V0dGVyKTtcbiAgZWZmZWN0LnNjaGVkdWxlciA9IHNjaGVkdWxlciA/ICgpID0+IHNjaGVkdWxlcihqb2IsIGZhbHNlKSA6IGpvYjtcbiAgYm91bmRDbGVhbnVwID0gKGZuKSA9PiBvbldhdGNoZXJDbGVhbnVwKGZuLCBmYWxzZSwgZWZmZWN0KTtcbiAgY2xlYW51cCA9IGVmZmVjdC5vblN0b3AgPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYW51cHMgPSBjbGVhbnVwTWFwLmdldChlZmZlY3QpO1xuICAgIGlmIChjbGVhbnVwcykge1xuICAgICAgaWYgKGNhbGwpIHtcbiAgICAgICAgY2FsbChjbGVhbnVwcywgNCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IGNsZWFudXAyIG9mIGNsZWFudXBzKSBjbGVhbnVwMigpO1xuICAgICAgfVxuICAgICAgY2xlYW51cE1hcC5kZWxldGUoZWZmZWN0KTtcbiAgICB9XG4gIH07XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgZWZmZWN0Lm9uVHJhY2sgPSBvcHRpb25zLm9uVHJhY2s7XG4gICAgZWZmZWN0Lm9uVHJpZ2dlciA9IG9wdGlvbnMub25UcmlnZ2VyO1xuICB9XG4gIGlmIChjYikge1xuICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgIGpvYih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmFsdWUgPSBlZmZlY3QucnVuKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNjaGVkdWxlcikge1xuICAgIHNjaGVkdWxlcihqb2IuYmluZChudWxsLCB0cnVlKSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZWZmZWN0LnJ1bigpO1xuICB9XG4gIHdhdGNoSGFuZGxlLnBhdXNlID0gZWZmZWN0LnBhdXNlLmJpbmQoZWZmZWN0KTtcbiAgd2F0Y2hIYW5kbGUucmVzdW1lID0gZWZmZWN0LnJlc3VtZS5iaW5kKGVmZmVjdCk7XG4gIHdhdGNoSGFuZGxlLnN0b3AgPSB3YXRjaEhhbmRsZTtcbiAgcmV0dXJuIHdhdGNoSGFuZGxlO1xufVxuZnVuY3Rpb24gdHJhdmVyc2UodmFsdWUsIGRlcHRoID0gSW5maW5pdHksIHNlZW4pIHtcbiAgaWYgKGRlcHRoIDw9IDAgfHwgIWlzT2JqZWN0KHZhbHVlKSB8fCB2YWx1ZVtcIl9fdl9za2lwXCJdKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHNlZW4gPSBzZWVuIHx8IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gIGlmIChzZWVuLmhhcyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgc2Vlbi5hZGQodmFsdWUpO1xuICBkZXB0aC0tO1xuICBpZiAoaXNSZWYodmFsdWUpKSB7XG4gICAgdHJhdmVyc2UodmFsdWUudmFsdWUsIGRlcHRoLCBzZWVuKTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRyYXZlcnNlKHZhbHVlW2ldLCBkZXB0aCwgc2Vlbik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzU2V0KHZhbHVlKSB8fCBpc01hcCh2YWx1ZSkpIHtcbiAgICB2YWx1ZS5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICB0cmF2ZXJzZSh2LCBkZXB0aCwgc2Vlbik7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuICAgICAgdHJhdmVyc2UodmFsdWVba2V5XSwgZGVwdGgsIHNlZW4pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbHVlKSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgICB0cmF2ZXJzZSh2YWx1ZVtrZXldLCBkZXB0aCwgc2Vlbik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IHsgQVJSQVlfSVRFUkFURV9LRVksIEVmZmVjdEZsYWdzLCBFZmZlY3RTY29wZSwgSVRFUkFURV9LRVksIE1BUF9LRVlfSVRFUkFURV9LRVksIFJlYWN0aXZlRWZmZWN0LCBSZWFjdGl2ZUZsYWdzLCBUcmFja09wVHlwZXMsIFRyaWdnZXJPcFR5cGVzLCBXYXRjaEVycm9yQ29kZXMsIGNvbXB1dGVkLCBjdXN0b21SZWYsIGVmZmVjdCwgZWZmZWN0U2NvcGUsIGVuYWJsZVRyYWNraW5nLCBnZXRDdXJyZW50U2NvcGUsIGdldEN1cnJlbnRXYXRjaGVyLCBpc1Byb3h5LCBpc1JlYWN0aXZlLCBpc1JlYWRvbmx5LCBpc1JlZiwgaXNTaGFsbG93LCBtYXJrUmF3LCBvbkVmZmVjdENsZWFudXAsIG9uU2NvcGVEaXNwb3NlLCBvbldhdGNoZXJDbGVhbnVwLCBwYXVzZVRyYWNraW5nLCBwcm94eVJlZnMsIHJlYWN0aXZlLCByZWFjdGl2ZVJlYWRBcnJheSwgcmVhZG9ubHksIHJlZiwgcmVzZXRUcmFja2luZywgc2hhbGxvd1JlYWN0aXZlLCBzaGFsbG93UmVhZEFycmF5LCBzaGFsbG93UmVhZG9ubHksIHNoYWxsb3dSZWYsIHN0b3AsIHRvUmF3LCB0b1JlYWN0aXZlLCB0b1JlYWRvbmx5LCB0b1JlZiwgdG9SZWZzLCB0b1ZhbHVlLCB0cmFjaywgdHJhdmVyc2UsIHRyaWdnZXIsIHRyaWdnZXJSZWYsIHVucmVmLCB3YXRjaCB9O1xuIl0sIm5hbWVzIjpbImNvbXB1dGVkIiwicmVhZG9ubHkiLCJlZmZlY3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV0EsSUFBSTtBQUNKLE1BQU0sWUFBWTtBQUFBLEVBQ2hCLFlBQVksV0FBVyxPQUFPO0FBQzVCLFNBQUssV0FBVztBQUloQixTQUFLLFVBQVU7QUFJZixTQUFLLE1BQU07QUFJWCxTQUFLLFVBQVUsQ0FBQTtBQUlmLFNBQUssV0FBVyxDQUFBO0FBQ2hCLFNBQUssWUFBWTtBQUNqQixTQUFLLFNBQVM7QUFDZCxRQUFJLENBQUMsWUFBWSxtQkFBbUI7QUFDbEMsV0FBSyxTQUFTLGtCQUFrQixXQUFXLGtCQUFrQixTQUFTLENBQUEsSUFBSztBQUFBLFFBQ3pFO0FBQUEsTUFBQSxJQUNFO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQUksU0FBUztBQUNYLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUNBLFFBQVE7QUFDTixRQUFJLEtBQUssU0FBUztBQUNoQixXQUFLLFlBQVk7QUFDakIsVUFBSSxHQUFHO0FBQ1AsVUFBSSxLQUFLLFFBQVE7QUFDZixhQUFLLElBQUksR0FBRyxJQUFJLEtBQUssT0FBTyxRQUFRLElBQUksR0FBRyxLQUFLO0FBQzlDLGVBQUssT0FBTyxDQUFDLEVBQUUsTUFBQTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUNBLFdBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDL0MsYUFBSyxRQUFRLENBQUMsRUFBRSxNQUFBO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSUEsU0FBUztBQUNQLFFBQUksS0FBSyxTQUFTO0FBQ2hCLFVBQUksS0FBSyxXQUFXO0FBQ2xCLGFBQUssWUFBWTtBQUNqQixZQUFJLEdBQUc7QUFDUCxZQUFJLEtBQUssUUFBUTtBQUNmLGVBQUssSUFBSSxHQUFHLElBQUksS0FBSyxPQUFPLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDOUMsaUJBQUssT0FBTyxDQUFDLEVBQUUsT0FBQTtBQUFBLFVBQ2pCO0FBQUEsUUFDRjtBQUNBLGFBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDL0MsZUFBSyxRQUFRLENBQUMsRUFBRSxPQUFBO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQUksSUFBSTtBQUNOLFFBQUksS0FBSyxTQUFTO0FBQ2hCLFlBQU0scUJBQXFCO0FBQzNCLFVBQUk7QUFDRiw0QkFBb0I7QUFDcEIsZUFBTyxHQUFBO0FBQUEsTUFDVCxVQUFBO0FBQ0UsNEJBQW9CO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsRUFHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxLQUFLO0FBQ0gsUUFBSSxFQUFFLEtBQUssUUFBUSxHQUFHO0FBQ3BCLFdBQUssWUFBWTtBQUNqQiwwQkFBb0I7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0EsTUFBTTtBQUNKLFFBQUksS0FBSyxNQUFNLEtBQUssRUFBRSxLQUFLLFFBQVEsR0FBRztBQUNwQywwQkFBb0IsS0FBSztBQUN6QixXQUFLLFlBQVk7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUssWUFBWTtBQUNmLFFBQUksS0FBSyxTQUFTO0FBQ2hCLFdBQUssVUFBVTtBQUNmLFVBQUksR0FBRztBQUNQLFdBQUssSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDL0MsYUFBSyxRQUFRLENBQUMsRUFBRSxLQUFBO0FBQUEsTUFDbEI7QUFDQSxXQUFLLFFBQVEsU0FBUztBQUN0QixXQUFLLElBQUksR0FBRyxJQUFJLEtBQUssU0FBUyxRQUFRLElBQUksR0FBRyxLQUFLO0FBQ2hELGFBQUssU0FBUyxDQUFDLEVBQUE7QUFBQSxNQUNqQjtBQUNBLFdBQUssU0FBUyxTQUFTO0FBQ3ZCLFVBQUksS0FBSyxRQUFRO0FBQ2YsYUFBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLE9BQU8sUUFBUSxJQUFJLEdBQUcsS0FBSztBQUM5QyxlQUFLLE9BQU8sQ0FBQyxFQUFFLEtBQUssSUFBSTtBQUFBLFFBQzFCO0FBQ0EsYUFBSyxPQUFPLFNBQVM7QUFBQSxNQUN2QjtBQUNBLFVBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxVQUFVLENBQUMsWUFBWTtBQUNoRCxjQUFNLE9BQU8sS0FBSyxPQUFPLE9BQU8sSUFBQTtBQUNoQyxZQUFJLFFBQVEsU0FBUyxNQUFNO0FBQ3pCLGVBQUssT0FBTyxPQUFPLEtBQUssS0FBSyxJQUFJO0FBQ2pDLGVBQUssUUFBUSxLQUFLO0FBQUEsUUFDcEI7QUFBQSxNQUNGO0FBQ0EsV0FBSyxTQUFTO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQ0Y7QUFJQSxTQUFTLGtCQUFrQjtBQUN6QixTQUFPO0FBQ1Q7QUFXQSxJQUFJO0FBbUJKLE1BQU0seUNBQXlDLFFBQUE7QUFDL0MsTUFBTSxlQUFlO0FBQUEsRUFDbkIsWUFBWSxJQUFJO0FBQ2QsU0FBSyxLQUFLO0FBSVYsU0FBSyxPQUFPO0FBSVosU0FBSyxXQUFXO0FBSWhCLFNBQUssUUFBUSxJQUFJO0FBSWpCLFNBQUssT0FBTztBQUlaLFNBQUssVUFBVTtBQUNmLFNBQUssWUFBWTtBQUNqQixRQUFJLHFCQUFxQixrQkFBa0IsUUFBUTtBQUNqRCx3QkFBa0IsUUFBUSxLQUFLLElBQUk7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFDTixTQUFLLFNBQVM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsU0FBUztBQUNQLFFBQUksS0FBSyxRQUFRLElBQUk7QUFDbkIsV0FBSyxTQUFTO0FBQ2QsVUFBSSxtQkFBbUIsSUFBSSxJQUFJLEdBQUc7QUFDaEMsMkJBQW1CLE9BQU8sSUFBSTtBQUM5QixhQUFLLFFBQUE7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlBLFNBQVM7QUFDUCxRQUFJLEtBQUssUUFBUSxLQUFLLEVBQUUsS0FBSyxRQUFRLEtBQUs7QUFDeEM7QUFBQSxJQUNGO0FBQ0EsUUFBSSxFQUFFLEtBQUssUUFBUSxJQUFJO0FBQ3JCLFlBQU0sSUFBSTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQ0osUUFBSSxFQUFFLEtBQUssUUFBUSxJQUFJO0FBQ3JCLGFBQU8sS0FBSyxHQUFBO0FBQUEsSUFDZDtBQUNBLFNBQUssU0FBUztBQUNkLGtCQUFjLElBQUk7QUFDbEIsZ0JBQVksSUFBSTtBQUNoQixVQUFNLGFBQWE7QUFDbkIsVUFBTSxrQkFBa0I7QUFDeEIsZ0JBQVk7QUFDWixrQkFBYztBQUNkLFFBQUk7QUFDRixhQUFPLEtBQUssR0FBQTtBQUFBLElBQ2QsVUFBQTtBQU1FLGtCQUFZLElBQUk7QUFDaEIsa0JBQVk7QUFDWixvQkFBYztBQUNkLFdBQUssU0FBUztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUNMLFFBQUksS0FBSyxRQUFRLEdBQUc7QUFDbEIsZUFBUyxPQUFPLEtBQUssTUFBTSxNQUFNLE9BQU8sS0FBSyxTQUFTO0FBQ3BELGtCQUFVLElBQUk7QUFBQSxNQUNoQjtBQUNBLFdBQUssT0FBTyxLQUFLLFdBQVc7QUFDNUIsb0JBQWMsSUFBSTtBQUNsQixXQUFLLFVBQVUsS0FBSyxPQUFBO0FBQ3BCLFdBQUssU0FBUztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsVUFBVTtBQUNSLFFBQUksS0FBSyxRQUFRLElBQUk7QUFDbkIseUJBQW1CLElBQUksSUFBSTtBQUFBLElBQzdCLFdBQVcsS0FBSyxXQUFXO0FBQ3pCLFdBQUssVUFBQTtBQUFBLElBQ1AsT0FBTztBQUNMLFdBQUssV0FBQTtBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxhQUFhO0FBQ1gsUUFBSSxRQUFRLElBQUksR0FBRztBQUNqQixXQUFLLElBQUE7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsSUFBSSxRQUFRO0FBQ1YsV0FBTyxRQUFRLElBQUk7QUFBQSxFQUNyQjtBQUNGO0FBQ0EsSUFBSSxhQUFhO0FBQ2pCLElBQUk7QUFDSixJQUFJO0FBQ0osU0FBUyxNQUFNLEtBQUssYUFBYSxPQUFPO0FBQ3RDLE1BQUksU0FBUztBQUNiLE1BQUksWUFBWTtBQUNkLFFBQUksT0FBTztBQUNYLHNCQUFrQjtBQUNsQjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE9BQU87QUFDWCxlQUFhO0FBQ2Y7QUFDQSxTQUFTLGFBQWE7QUFDcEI7QUFDRjtBQUNBLFNBQVMsV0FBVztBQUNsQixNQUFJLEVBQUUsYUFBYSxHQUFHO0FBQ3BCO0FBQUEsRUFDRjtBQUNBLE1BQUksaUJBQWlCO0FBQ25CLFFBQUksSUFBSTtBQUNSLHNCQUFrQjtBQUNsQixXQUFPLEdBQUc7QUFDUixZQUFNLE9BQU8sRUFBRTtBQUNmLFFBQUUsT0FBTztBQUNULFFBQUUsU0FBUztBQUNYLFVBQUk7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUNBLE1BQUk7QUFDSixTQUFPLFlBQVk7QUFDakIsUUFBSSxJQUFJO0FBQ1IsaUJBQWE7QUFDYixXQUFPLEdBQUc7QUFDUixZQUFNLE9BQU8sRUFBRTtBQUNmLFFBQUUsT0FBTztBQUNULFFBQUUsU0FBUztBQUNYLFVBQUksRUFBRSxRQUFRLEdBQUc7QUFDZixZQUFJO0FBQ0Y7QUFDQSxZQUFFLFFBQUE7QUFBQSxRQUNKLFNBQVMsS0FBSztBQUNaLGNBQUksQ0FBQyxNQUFPLFNBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0Y7QUFDQSxVQUFJO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE1BQU8sT0FBTTtBQUNuQjtBQUNBLFNBQVMsWUFBWSxLQUFLO0FBQ3hCLFdBQVMsT0FBTyxJQUFJLE1BQU0sTUFBTSxPQUFPLEtBQUssU0FBUztBQUNuRCxTQUFLLFVBQVU7QUFDZixTQUFLLGlCQUFpQixLQUFLLElBQUk7QUFDL0IsU0FBSyxJQUFJLGFBQWE7QUFBQSxFQUN4QjtBQUNGO0FBQ0EsU0FBUyxZQUFZLEtBQUs7QUFDeEIsTUFBSTtBQUNKLE1BQUksT0FBTyxJQUFJO0FBQ2YsTUFBSSxPQUFPO0FBQ1gsU0FBTyxNQUFNO0FBQ1gsVUFBTSxPQUFPLEtBQUs7QUFDbEIsUUFBSSxLQUFLLFlBQVksSUFBSTtBQUN2QixVQUFJLFNBQVMsS0FBTSxRQUFPO0FBQzFCLGdCQUFVLElBQUk7QUFDZCxnQkFBVSxJQUFJO0FBQUEsSUFDaEIsT0FBTztBQUNMLGFBQU87QUFBQSxJQUNUO0FBQ0EsU0FBSyxJQUFJLGFBQWEsS0FBSztBQUMzQixTQUFLLGlCQUFpQjtBQUN0QixXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksT0FBTztBQUNYLE1BQUksV0FBVztBQUNqQjtBQUNBLFNBQVMsUUFBUSxLQUFLO0FBQ3BCLFdBQVMsT0FBTyxJQUFJLE1BQU0sTUFBTSxPQUFPLEtBQUssU0FBUztBQUNuRCxRQUFJLEtBQUssSUFBSSxZQUFZLEtBQUssV0FBVyxLQUFLLElBQUksYUFBYSxnQkFBZ0IsS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksWUFBWSxLQUFLLFVBQVU7QUFDdkksYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0EsTUFBSSxJQUFJLFFBQVE7QUFDZCxXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDtBQUNBLFNBQVMsZ0JBQWdCQSxXQUFVO0FBQ2pDLE1BQUlBLFVBQVMsUUFBUSxLQUFLLEVBQUVBLFVBQVMsUUFBUSxLQUFLO0FBQ2hEO0FBQUEsRUFDRjtBQUNBQSxZQUFTLFNBQVM7QUFDbEIsTUFBSUEsVUFBUyxrQkFBa0IsZUFBZTtBQUM1QztBQUFBLEVBQ0Y7QUFDQUEsWUFBUyxnQkFBZ0I7QUFDekIsTUFBSSxDQUFDQSxVQUFTLFNBQVNBLFVBQVMsUUFBUSxRQUFRLENBQUNBLFVBQVMsUUFBUSxDQUFDQSxVQUFTLFVBQVUsQ0FBQyxRQUFRQSxTQUFRLElBQUk7QUFDekc7QUFBQSxFQUNGO0FBQ0FBLFlBQVMsU0FBUztBQUNsQixRQUFNLE1BQU1BLFVBQVM7QUFDckIsUUFBTSxVQUFVO0FBQ2hCLFFBQU0sa0JBQWtCO0FBQ3hCLGNBQVlBO0FBQ1osZ0JBQWM7QUFDZCxNQUFJO0FBQ0YsZ0JBQVlBLFNBQVE7QUFDcEIsVUFBTSxRQUFRQSxVQUFTLEdBQUdBLFVBQVMsTUFBTTtBQUN6QyxRQUFJLElBQUksWUFBWSxLQUFLLFdBQVcsT0FBT0EsVUFBUyxNQUFNLEdBQUc7QUFDM0RBLGdCQUFTLFNBQVM7QUFDbEJBLGdCQUFTLFNBQVM7QUFDbEIsVUFBSTtBQUFBLElBQ047QUFBQSxFQUNGLFNBQVMsS0FBSztBQUNaLFFBQUk7QUFDSixVQUFNO0FBQUEsRUFDUixVQUFBO0FBQ0UsZ0JBQVk7QUFDWixrQkFBYztBQUNkLGdCQUFZQSxTQUFRO0FBQ3BCQSxjQUFTLFNBQVM7QUFBQSxFQUNwQjtBQUNGO0FBQ0EsU0FBUyxVQUFVLE1BQU0sT0FBTyxPQUFPO0FBQ3JDLFFBQU0sRUFBRSxLQUFLLFNBQVMsUUFBQSxJQUFZO0FBQ2xDLE1BQUksU0FBUztBQUNYLFlBQVEsVUFBVTtBQUNsQixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUNBLE1BQUksU0FBUztBQUNYLFlBQVEsVUFBVTtBQUNsQixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUlBLE1BQUksSUFBSSxTQUFTLE1BQU07QUFDckIsUUFBSSxPQUFPO0FBQ1gsUUFBSSxDQUFDLFdBQVcsSUFBSSxVQUFVO0FBQzVCLFVBQUksU0FBUyxTQUFTO0FBQ3RCLGVBQVMsSUFBSSxJQUFJLFNBQVMsTUFBTSxHQUFHLElBQUksRUFBRSxTQUFTO0FBQ2hELGtCQUFVLEdBQUcsSUFBSTtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxNQUFNLElBQUksS0FBSztBQUNqQyxRQUFJLElBQUksT0FBTyxJQUFJLEdBQUc7QUFBQSxFQUN4QjtBQUNGO0FBQ0EsU0FBUyxVQUFVLE1BQU07QUFDdkIsUUFBTSxFQUFFLFNBQVMsUUFBQSxJQUFZO0FBQzdCLE1BQUksU0FBUztBQUNYLFlBQVEsVUFBVTtBQUNsQixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUNBLE1BQUksU0FBUztBQUNYLFlBQVEsVUFBVTtBQUNsQixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUNGO0FBc0JBLElBQUksY0FBYztBQUNsQixNQUFNLGFBQWEsQ0FBQTtBQUNuQixTQUFTLGdCQUFnQjtBQUN2QixhQUFXLEtBQUssV0FBVztBQUMzQixnQkFBYztBQUNoQjtBQUtBLFNBQVMsZ0JBQWdCO0FBQ3ZCLFFBQU0sT0FBTyxXQUFXLElBQUE7QUFDeEIsZ0JBQWMsU0FBUyxTQUFTLE9BQU87QUFDekM7QUFVQSxTQUFTLGNBQWMsR0FBRztBQUN4QixRQUFNLEVBQUUsWUFBWTtBQUNwQixJQUFFLFVBQVU7QUFDWixNQUFJLFNBQVM7QUFDWCxVQUFNLFVBQVU7QUFDaEIsZ0JBQVk7QUFDWixRQUFJO0FBQ0YsY0FBQTtBQUFBLElBQ0YsVUFBQTtBQUNFLGtCQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQUksZ0JBQWdCO0FBQ3BCLE1BQU0sS0FBSztBQUFBLEVBQ1QsWUFBWSxLQUFLLEtBQUs7QUFDcEIsU0FBSyxNQUFNO0FBQ1gsU0FBSyxNQUFNO0FBQ1gsU0FBSyxVQUFVLElBQUk7QUFDbkIsU0FBSyxVQUFVLEtBQUssVUFBVSxLQUFLLFVBQVUsS0FBSyxVQUFVLEtBQUssaUJBQWlCO0FBQUEsRUFDcEY7QUFDRjtBQUNBLE1BQU0sSUFBSTtBQUFBO0FBQUEsRUFFUixZQUFZQSxXQUFVO0FBQ3BCLFNBQUssV0FBV0E7QUFDaEIsU0FBSyxVQUFVO0FBSWYsU0FBSyxhQUFhO0FBSWxCLFNBQUssT0FBTztBQUlaLFNBQUssTUFBTTtBQUNYLFNBQUssTUFBTTtBQUlYLFNBQUssS0FBSztBQUlWLFNBQUssV0FBVztBQUFBLEVBSWxCO0FBQUEsRUFDQSxNQUFNLFdBQVc7QUFDZixRQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsY0FBYyxLQUFLLFVBQVU7QUFDN0Q7QUFBQSxJQUNGO0FBQ0EsUUFBSSxPQUFPLEtBQUs7QUFDaEIsUUFBSSxTQUFTLFVBQVUsS0FBSyxRQUFRLFdBQVc7QUFDN0MsYUFBTyxLQUFLLGFBQWEsSUFBSSxLQUFLLFdBQVcsSUFBSTtBQUNqRCxVQUFJLENBQUMsVUFBVSxNQUFNO0FBQ25CLGtCQUFVLE9BQU8sVUFBVSxXQUFXO0FBQUEsTUFDeEMsT0FBTztBQUNMLGFBQUssVUFBVSxVQUFVO0FBQ3pCLGtCQUFVLFNBQVMsVUFBVTtBQUM3QixrQkFBVSxXQUFXO0FBQUEsTUFDdkI7QUFDQSxhQUFPLElBQUk7QUFBQSxJQUNiLFdBQVcsS0FBSyxZQUFZLElBQUk7QUFDOUIsV0FBSyxVQUFVLEtBQUs7QUFDcEIsVUFBSSxLQUFLLFNBQVM7QUFDaEIsY0FBTSxPQUFPLEtBQUs7QUFDbEIsYUFBSyxVQUFVLEtBQUs7QUFDcEIsWUFBSSxLQUFLLFNBQVM7QUFDaEIsZUFBSyxRQUFRLFVBQVU7QUFBQSxRQUN6QjtBQUNBLGFBQUssVUFBVSxVQUFVO0FBQ3pCLGFBQUssVUFBVTtBQUNmLGtCQUFVLFNBQVMsVUFBVTtBQUM3QixrQkFBVSxXQUFXO0FBQ3JCLFlBQUksVUFBVSxTQUFTLE1BQU07QUFDM0Isb0JBQVUsT0FBTztBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFXQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsUUFBUSxXQUFXO0FBQ2pCLFNBQUs7QUFDTDtBQUNBLFNBQUssT0FBTyxTQUFTO0FBQUEsRUFDdkI7QUFBQSxFQUNBLE9BQU8sV0FBVztBQUNoQixlQUFBO0FBQ0EsUUFBSTtBQUNGLFVBQUksTUFBMkM7QUFjL0MsZUFBUyxPQUFPLEtBQUssTUFBTSxNQUFNLE9BQU8sS0FBSyxTQUFTO0FBQ3BELFlBQUksS0FBSyxJQUFJLFVBQVU7QUFDckI7QUFDQSxlQUFLLElBQUksSUFBSSxPQUFBO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFVBQUE7QUFDRSxlQUFBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsT0FBTyxNQUFNO0FBQ3BCLE9BQUssSUFBSTtBQUNULE1BQUksS0FBSyxJQUFJLFFBQVEsR0FBRztBQUN0QixVQUFNQSxZQUFXLEtBQUssSUFBSTtBQUMxQixRQUFJQSxhQUFZLENBQUMsS0FBSyxJQUFJLE1BQU07QUFDOUJBLGdCQUFTLFNBQVMsSUFBSTtBQUN0QixlQUFTLElBQUlBLFVBQVMsTUFBTSxHQUFHLElBQUksRUFBRSxTQUFTO0FBQzVDLGVBQU8sQ0FBQztBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQ0EsVUFBTSxjQUFjLEtBQUssSUFBSTtBQUM3QixRQUFJLGdCQUFnQixNQUFNO0FBQ3hCLFdBQUssVUFBVTtBQUNmLFVBQUkseUJBQXlCLFVBQVU7QUFBQSxJQUN6QztBQUlBLFNBQUssSUFBSSxPQUFPO0FBQUEsRUFDbEI7QUFDRjtBQUNBLE1BQU0sZ0NBQWdDLFFBQUE7QUFDdEMsTUFBTSxjQUFjO0FBQUEsRUFDNkM7QUFDakU7QUFDQSxNQUFNLHNCQUFzQjtBQUFBLEVBQ3VDO0FBQ25FO0FBQ0EsTUFBTSxvQkFBb0I7QUFBQSxFQUNzQztBQUNoRTtBQUNBLFNBQVMsTUFBTSxRQUFRLE1BQU0sS0FBSztBQUNoQyxNQUFJLGVBQWUsV0FBVztBQUM1QixRQUFJLFVBQVUsVUFBVSxJQUFJLE1BQU07QUFDbEMsUUFBSSxDQUFDLFNBQVM7QUFDWixnQkFBVSxJQUFJLFFBQVEsVUFBMEIsb0JBQUksS0FBSztBQUFBLElBQzNEO0FBQ0EsUUFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3pCLFFBQUksQ0FBQyxLQUFLO0FBQ1IsY0FBUSxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUs7QUFDaEMsVUFBSSxNQUFNO0FBQ1YsVUFBSSxNQUFNO0FBQUEsSUFDWjtBQU9PO0FBQ0wsVUFBSSxNQUFBO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsUUFBUSxRQUFRLE1BQU0sS0FBSyxVQUFVLFVBQVUsV0FBVztBQUNqRSxRQUFNLFVBQVUsVUFBVSxJQUFJLE1BQU07QUFDcEMsTUFBSSxDQUFDLFNBQVM7QUFDWjtBQUNBO0FBQUEsRUFDRjtBQUNBLFFBQU0sTUFBTSxDQUFDLFFBQVE7QUFDbkIsUUFBSSxLQUFLO0FBVUE7QUFDTCxZQUFJLFFBQUE7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxhQUFBO0FBQ0EsTUFBSSxTQUFTLFNBQVM7QUFDcEIsWUFBUSxRQUFRLEdBQUc7QUFBQSxFQUNyQixPQUFPO0FBQ0wsVUFBTSxnQkFBZ0IsUUFBUSxNQUFNO0FBQ3BDLFVBQU0sZUFBZSxpQkFBaUIsYUFBYSxHQUFHO0FBQ3RELFFBQUksaUJBQWlCLFFBQVEsVUFBVTtBQUNyQyxZQUFNLFlBQVksT0FBTyxRQUFRO0FBQ2pDLGNBQVEsUUFBUSxDQUFDLEtBQUssU0FBUztBQUM3QixZQUFJLFNBQVMsWUFBWSxTQUFTLHFCQUFxQixDQUFDLFNBQVMsSUFBSSxLQUFLLFFBQVEsV0FBVztBQUMzRixjQUFJLEdBQUc7QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxPQUFPO0FBQ0wsVUFBSSxRQUFRLFVBQVUsUUFBUSxJQUFJLE1BQU0sR0FBRztBQUN6QyxZQUFJLFFBQVEsSUFBSSxHQUFHLENBQUM7QUFBQSxNQUN0QjtBQUNBLFVBQUksY0FBYztBQUNoQixZQUFJLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQztBQUFBLE1BQ3BDO0FBQ0EsY0FBUSxNQUFBO0FBQUEsUUFDTixLQUFLO0FBQ0gsY0FBSSxDQUFDLGVBQWU7QUFDbEIsZ0JBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUM1QixnQkFBSSxNQUFNLE1BQU0sR0FBRztBQUNqQixrQkFBSSxRQUFRLElBQUksbUJBQW1CLENBQUM7QUFBQSxZQUN0QztBQUFBLFVBQ0YsV0FBVyxjQUFjO0FBQ3ZCLGdCQUFJLFFBQVEsSUFBSSxRQUFRLENBQUM7QUFBQSxVQUMzQjtBQUNBO0FBQUEsUUFDRixLQUFLO0FBQ0gsY0FBSSxDQUFDLGVBQWU7QUFDbEIsZ0JBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUM1QixnQkFBSSxNQUFNLE1BQU0sR0FBRztBQUNqQixrQkFBSSxRQUFRLElBQUksbUJBQW1CLENBQUM7QUFBQSxZQUN0QztBQUFBLFVBQ0Y7QUFDQTtBQUFBLFFBQ0YsS0FBSztBQUNILGNBQUksTUFBTSxNQUFNLEdBQUc7QUFDakIsZ0JBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUFBLFVBQzlCO0FBQ0E7QUFBQSxNQUFBO0FBQUEsSUFFTjtBQUFBLEVBQ0Y7QUFDQSxXQUFBO0FBQ0Y7QUFDQSxTQUFTLG1CQUFtQixRQUFRLEtBQUs7QUFDdkMsUUFBTSxTQUFTLFVBQVUsSUFBSSxNQUFNO0FBQ25DLFNBQU8sVUFBVSxPQUFPLElBQUksR0FBRztBQUNqQztBQUVBLFNBQVMsa0JBQWtCLE9BQU87QUFDaEMsUUFBTSxNQUFNLE1BQU0sS0FBSztBQUN2QixNQUFJLFFBQVEsTUFBTyxRQUFPO0FBQzFCLFFBQU0sS0FBSyxXQUFXLGlCQUFpQjtBQUN2QyxTQUFPLFVBQVUsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLFVBQVU7QUFDcEQ7QUFDQSxTQUFTLGlCQUFpQixLQUFLO0FBQzdCLFFBQU0sTUFBTSxNQUFNLEdBQUcsR0FBRyxXQUFXLGlCQUFpQjtBQUNwRCxTQUFPO0FBQ1Q7QUFDQSxNQUFNLHdCQUF3QjtBQUFBLEVBQzVCLFdBQVc7QUFBQSxFQUNYLENBQUMsT0FBTyxRQUFRLElBQUk7QUFDbEIsV0FBTyxTQUFTLE1BQU0sT0FBTyxVQUFVLFVBQVU7QUFBQSxFQUNuRDtBQUFBLEVBQ0EsVUFBVSxNQUFNO0FBQ2QsV0FBTyxrQkFBa0IsSUFBSSxFQUFFO0FBQUEsTUFDN0IsR0FBRyxLQUFLLElBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQztBQUFBLElBQUE7QUFBQSxFQUU1RDtBQUFBLEVBQ0EsVUFBVTtBQUNSLFdBQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQyxVQUFVO0FBQzFDLFlBQU0sQ0FBQyxJQUFJLFdBQVcsTUFBTSxDQUFDLENBQUM7QUFDOUIsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE1BQU0sSUFBSSxTQUFTO0FBQ2pCLFdBQU8sTUFBTSxNQUFNLFNBQVMsSUFBSSxTQUFTLFFBQVEsU0FBUztBQUFBLEVBQzVEO0FBQUEsRUFDQSxPQUFPLElBQUksU0FBUztBQUNsQixXQUFPLE1BQU0sTUFBTSxVQUFVLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLFVBQVUsR0FBRyxTQUFTO0FBQUEsRUFDL0U7QUFBQSxFQUNBLEtBQUssSUFBSSxTQUFTO0FBQ2hCLFdBQU8sTUFBTSxNQUFNLFFBQVEsSUFBSSxTQUFTLFlBQVksU0FBUztBQUFBLEVBQy9EO0FBQUEsRUFDQSxVQUFVLElBQUksU0FBUztBQUNyQixXQUFPLE1BQU0sTUFBTSxhQUFhLElBQUksU0FBUyxRQUFRLFNBQVM7QUFBQSxFQUNoRTtBQUFBLEVBQ0EsU0FBUyxJQUFJLFNBQVM7QUFDcEIsV0FBTyxNQUFNLE1BQU0sWUFBWSxJQUFJLFNBQVMsWUFBWSxTQUFTO0FBQUEsRUFDbkU7QUFBQSxFQUNBLGNBQWMsSUFBSSxTQUFTO0FBQ3pCLFdBQU8sTUFBTSxNQUFNLGlCQUFpQixJQUFJLFNBQVMsUUFBUSxTQUFTO0FBQUEsRUFDcEU7QUFBQTtBQUFBLEVBRUEsUUFBUSxJQUFJLFNBQVM7QUFDbkIsV0FBTyxNQUFNLE1BQU0sV0FBVyxJQUFJLFNBQVMsUUFBUSxTQUFTO0FBQUEsRUFDOUQ7QUFBQSxFQUNBLFlBQVksTUFBTTtBQUNoQixXQUFPLFlBQVksTUFBTSxZQUFZLElBQUk7QUFBQSxFQUMzQztBQUFBLEVBQ0EsV0FBVyxNQUFNO0FBQ2YsV0FBTyxZQUFZLE1BQU0sV0FBVyxJQUFJO0FBQUEsRUFDMUM7QUFBQSxFQUNBLEtBQUssV0FBVztBQUNkLFdBQU8sa0JBQWtCLElBQUksRUFBRSxLQUFLLFNBQVM7QUFBQSxFQUMvQztBQUFBO0FBQUEsRUFFQSxlQUFlLE1BQU07QUFDbkIsV0FBTyxZQUFZLE1BQU0sZUFBZSxJQUFJO0FBQUEsRUFDOUM7QUFBQSxFQUNBLElBQUksSUFBSSxTQUFTO0FBQ2YsV0FBTyxNQUFNLE1BQU0sT0FBTyxJQUFJLFNBQVMsUUFBUSxTQUFTO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLE1BQU07QUFDSixXQUFPLFdBQVcsTUFBTSxLQUFLO0FBQUEsRUFDL0I7QUFBQSxFQUNBLFFBQVEsTUFBTTtBQUNaLFdBQU8sV0FBVyxNQUFNLFFBQVEsSUFBSTtBQUFBLEVBQ3RDO0FBQUEsRUFDQSxPQUFPLE9BQU8sTUFBTTtBQUNsQixXQUFPLE9BQU8sTUFBTSxVQUFVLElBQUksSUFBSTtBQUFBLEVBQ3hDO0FBQUEsRUFDQSxZQUFZLE9BQU8sTUFBTTtBQUN2QixXQUFPLE9BQU8sTUFBTSxlQUFlLElBQUksSUFBSTtBQUFBLEVBQzdDO0FBQUEsRUFDQSxRQUFRO0FBQ04sV0FBTyxXQUFXLE1BQU0sT0FBTztBQUFBLEVBQ2pDO0FBQUE7QUFBQSxFQUVBLEtBQUssSUFBSSxTQUFTO0FBQ2hCLFdBQU8sTUFBTSxNQUFNLFFBQVEsSUFBSSxTQUFTLFFBQVEsU0FBUztBQUFBLEVBQzNEO0FBQUEsRUFDQSxVQUFVLE1BQU07QUFDZCxXQUFPLFdBQVcsTUFBTSxVQUFVLElBQUk7QUFBQSxFQUN4QztBQUFBLEVBQ0EsYUFBYTtBQUNYLFdBQU8sa0JBQWtCLElBQUksRUFBRSxXQUFBO0FBQUEsRUFDakM7QUFBQSxFQUNBLFNBQVMsVUFBVTtBQUNqQixXQUFPLGtCQUFrQixJQUFJLEVBQUUsU0FBUyxRQUFRO0FBQUEsRUFDbEQ7QUFBQSxFQUNBLGFBQWEsTUFBTTtBQUNqQixXQUFPLGtCQUFrQixJQUFJLEVBQUUsVUFBVSxHQUFHLElBQUk7QUFBQSxFQUNsRDtBQUFBLEVBQ0EsV0FBVyxNQUFNO0FBQ2YsV0FBTyxXQUFXLE1BQU0sV0FBVyxJQUFJO0FBQUEsRUFDekM7QUFBQSxFQUNBLFNBQVM7QUFDUCxXQUFPLFNBQVMsTUFBTSxVQUFVLFVBQVU7QUFBQSxFQUM1QztBQUNGO0FBQ0EsU0FBUyxTQUFTLE1BQU0sUUFBUSxXQUFXO0FBQ3pDLFFBQU0sTUFBTSxpQkFBaUIsSUFBSTtBQUNqQyxRQUFNLE9BQU8sSUFBSSxNQUFNLEVBQUE7QUFDdkIsTUFBSSxRQUFRLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRztBQUNwQyxTQUFLLFFBQVEsS0FBSztBQUNsQixTQUFLLE9BQU8sTUFBTTtBQUNoQixZQUFNLFNBQVMsS0FBSyxNQUFBO0FBQ3BCLFVBQUksT0FBTyxPQUFPO0FBQ2hCLGVBQU8sUUFBUSxVQUFVLE9BQU8sS0FBSztBQUFBLE1BQ3ZDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUO0FBQ0EsTUFBTSxhQUFhLE1BQU07QUFDekIsU0FBUyxNQUFNLE1BQU0sUUFBUSxJQUFJLFNBQVMsY0FBYyxNQUFNO0FBQzVELFFBQU0sTUFBTSxpQkFBaUIsSUFBSTtBQUNqQyxRQUFNLFlBQVksUUFBUSxRQUFRLENBQUMsVUFBVSxJQUFJO0FBQ2pELFFBQU0sV0FBVyxJQUFJLE1BQU07QUFDM0IsTUFBSSxhQUFhLFdBQVcsTUFBTSxHQUFHO0FBQ25DLFVBQU0sVUFBVSxTQUFTLE1BQU0sTUFBTSxJQUFJO0FBQ3pDLFdBQU8sWUFBWSxXQUFXLE9BQU8sSUFBSTtBQUFBLEVBQzNDO0FBQ0EsTUFBSSxZQUFZO0FBQ2hCLE1BQUksUUFBUSxNQUFNO0FBQ2hCLFFBQUksV0FBVztBQUNiLGtCQUFZLFNBQVMsTUFBTSxPQUFPO0FBQ2hDLGVBQU8sR0FBRyxLQUFLLE1BQU0sV0FBVyxJQUFJLEdBQUcsT0FBTyxJQUFJO0FBQUEsTUFDcEQ7QUFBQSxJQUNGLFdBQVcsR0FBRyxTQUFTLEdBQUc7QUFDeEIsa0JBQVksU0FBUyxNQUFNLE9BQU87QUFDaEMsZUFBTyxHQUFHLEtBQUssTUFBTSxNQUFNLE9BQU8sSUFBSTtBQUFBLE1BQ3hDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLFNBQVMsU0FBUyxLQUFLLEtBQUssV0FBVyxPQUFPO0FBQ3BELFNBQU8sYUFBYSxlQUFlLGFBQWEsTUFBTSxJQUFJO0FBQzVEO0FBQ0EsU0FBUyxPQUFPLE1BQU0sUUFBUSxJQUFJLE1BQU07QUFDdEMsUUFBTSxNQUFNLGlCQUFpQixJQUFJO0FBQ2pDLE1BQUksWUFBWTtBQUNoQixNQUFJLFFBQVEsTUFBTTtBQUNoQixRQUFJLENBQUMsVUFBVSxJQUFJLEdBQUc7QUFDcEIsa0JBQVksU0FBUyxLQUFLLE1BQU0sT0FBTztBQUNyQyxlQUFPLEdBQUcsS0FBSyxNQUFNLEtBQUssV0FBVyxJQUFJLEdBQUcsT0FBTyxJQUFJO0FBQUEsTUFDekQ7QUFBQSxJQUNGLFdBQVcsR0FBRyxTQUFTLEdBQUc7QUFDeEIsa0JBQVksU0FBUyxLQUFLLE1BQU0sT0FBTztBQUNyQyxlQUFPLEdBQUcsS0FBSyxNQUFNLEtBQUssTUFBTSxPQUFPLElBQUk7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsU0FBTyxJQUFJLE1BQU0sRUFBRSxXQUFXLEdBQUcsSUFBSTtBQUN2QztBQUNBLFNBQVMsWUFBWSxNQUFNLFFBQVEsTUFBTTtBQUN2QyxRQUFNLE1BQU0sTUFBTSxJQUFJO0FBQ3RCLFFBQU0sS0FBSyxXQUFXLGlCQUFpQjtBQUN2QyxRQUFNLE1BQU0sSUFBSSxNQUFNLEVBQUUsR0FBRyxJQUFJO0FBQy9CLE9BQUssUUFBUSxNQUFNLFFBQVEsVUFBVSxRQUFRLEtBQUssQ0FBQyxDQUFDLEdBQUc7QUFDckQsU0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQztBQUN2QixXQUFPLElBQUksTUFBTSxFQUFFLEdBQUcsSUFBSTtBQUFBLEVBQzVCO0FBQ0EsU0FBTztBQUNUO0FBQ0EsU0FBUyxXQUFXLE1BQU0sUUFBUSxPQUFPLENBQUEsR0FBSTtBQUMzQyxnQkFBQTtBQUNBLGFBQUE7QUFDQSxRQUFNLE1BQU0sTUFBTSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxJQUFJO0FBQ2hELFdBQUE7QUFDQSxnQkFBQTtBQUNBLFNBQU87QUFDVDtBQUVBLE1BQU0sNkNBQTZDLDZCQUE2QjtBQUNoRixNQUFNLGlCQUFpQixJQUFJO0FBQUEsRUFDVCx1QkFBTyxvQkFBb0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLFFBQVEsZUFBZSxRQUFRLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sUUFBUTtBQUN2SjtBQUNBLFNBQVMsZUFBZSxLQUFLO0FBQzNCLE1BQUksQ0FBQyxTQUFTLEdBQUcsRUFBRyxPQUFNLE9BQU8sR0FBRztBQUNwQyxRQUFNLE1BQU0sTUFBTSxJQUFJO0FBQ3RCLFFBQU0sS0FBSyxPQUFPLEdBQUc7QUFDckIsU0FBTyxJQUFJLGVBQWUsR0FBRztBQUMvQjtBQUNBLE1BQU0sb0JBQW9CO0FBQUEsRUFDeEIsWUFBWSxjQUFjLE9BQU8sYUFBYSxPQUFPO0FBQ25ELFNBQUssY0FBYztBQUNuQixTQUFLLGFBQWE7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsSUFBSSxRQUFRLEtBQUssVUFBVTtBQUN6QixRQUFJLFFBQVEsV0FBWSxRQUFPLE9BQU8sVUFBVTtBQUNoRCxVQUFNLGNBQWMsS0FBSyxhQUFhLGFBQWEsS0FBSztBQUN4RCxRQUFJLFFBQVEsa0JBQWtCO0FBQzVCLGFBQU8sQ0FBQztBQUFBLElBQ1YsV0FBVyxRQUFRLGtCQUFrQjtBQUNuQyxhQUFPO0FBQUEsSUFDVCxXQUFXLFFBQVEsaUJBQWlCO0FBQ2xDLGFBQU87QUFBQSxJQUNULFdBQVcsUUFBUSxXQUFXO0FBQzVCLFVBQUksY0FBYyxjQUFjLGFBQWEscUJBQXFCLGNBQWMsYUFBYSxxQkFBcUIsYUFBYSxJQUFJLE1BQU07QUFBQTtBQUFBLE1BRXpJLE9BQU8sZUFBZSxNQUFNLE1BQU0sT0FBTyxlQUFlLFFBQVEsR0FBRztBQUNqRSxlQUFPO0FBQUEsTUFDVDtBQUNBO0FBQUEsSUFDRjtBQUNBLFVBQU0sZ0JBQWdCLFFBQVEsTUFBTTtBQUNwQyxRQUFJLENBQUMsYUFBYTtBQUNoQixVQUFJO0FBQ0osVUFBSSxrQkFBa0IsS0FBSyxzQkFBc0IsR0FBRyxJQUFJO0FBQ3RELGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxRQUFRLGtCQUFrQjtBQUM1QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFDQSxVQUFNLE1BQU0sUUFBUTtBQUFBLE1BQ2xCO0FBQUEsTUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSUEsTUFBTSxNQUFNLElBQUksU0FBUztBQUFBLElBQUE7QUFFM0IsUUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFlLElBQUksR0FBRyxJQUFJLG1CQUFtQixHQUFHLEdBQUc7QUFDckUsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLENBQUMsYUFBYTtBQUNoQixZQUFNLFFBQVEsT0FBTyxHQUFHO0FBQUEsSUFDMUI7QUFDQSxRQUFJLFlBQVk7QUFDZCxhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksTUFBTSxHQUFHLEdBQUc7QUFDZCxhQUFPLGlCQUFpQixhQUFhLEdBQUcsSUFBSSxNQUFNLElBQUk7QUFBQSxJQUN4RDtBQUNBLFFBQUksU0FBUyxHQUFHLEdBQUc7QUFDakIsYUFBTyxjQUFjLFNBQVMsR0FBRyxJQUFJLFNBQVMsR0FBRztBQUFBLElBQ25EO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUNBLE1BQU0sK0JBQStCLG9CQUFvQjtBQUFBLEVBQ3ZELFlBQVksYUFBYSxPQUFPO0FBQzlCLFVBQU0sT0FBTyxVQUFVO0FBQUEsRUFDekI7QUFBQSxFQUNBLElBQUksUUFBUSxLQUFLLE9BQU8sVUFBVTtBQUNoQyxRQUFJLFdBQVcsT0FBTyxHQUFHO0FBQ3pCLFFBQUksQ0FBQyxLQUFLLFlBQVk7QUFDcEIsWUFBTSxxQkFBcUIsV0FBVyxRQUFRO0FBQzlDLFVBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFdBQVcsS0FBSyxHQUFHO0FBQzNDLG1CQUFXLE1BQU0sUUFBUTtBQUN6QixnQkFBUSxNQUFNLEtBQUs7QUFBQSxNQUNyQjtBQUNBLFVBQUksQ0FBQyxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQVEsS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHO0FBQ3hELFlBQUksb0JBQW9CO0FBT3RCLGlCQUFPO0FBQUEsUUFDVCxPQUFPO0FBQ0wsbUJBQVMsUUFBUTtBQUNqQixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFVBQU0sU0FBUyxRQUFRLE1BQU0sS0FBSyxhQUFhLEdBQUcsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLFNBQVMsT0FBTyxRQUFRLEdBQUc7QUFDdEcsVUFBTSxTQUFTLFFBQVE7QUFBQSxNQUNyQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxNQUFNLE1BQU0sSUFBSSxTQUFTO0FBQUEsSUFBQTtBQUUzQixRQUFJLFdBQVcsTUFBTSxRQUFRLEdBQUc7QUFDOUIsVUFBSSxDQUFDLFFBQVE7QUFDWCxnQkFBUSxRQUFRLE9BQU8sS0FBSyxLQUFLO0FBQUEsTUFDbkMsV0FBVyxXQUFXLE9BQU8sUUFBUSxHQUFHO0FBQ3RDLGdCQUFRLFFBQVEsT0FBTyxLQUFLLEtBQWU7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsZUFBZSxRQUFRLEtBQUs7QUFDMUIsVUFBTSxTQUFTLE9BQU8sUUFBUSxHQUFHO0FBQ2hCLFdBQU8sR0FBRztBQUMzQixVQUFNLFNBQVMsUUFBUSxlQUFlLFFBQVEsR0FBRztBQUNqRCxRQUFJLFVBQVUsUUFBUTtBQUNwQixjQUFRLFFBQVEsVUFBVSxLQUFLLE1BQWdCO0FBQUEsSUFDakQ7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsSUFBSSxRQUFRLEtBQUs7QUFDZixVQUFNLFNBQVMsUUFBUSxJQUFJLFFBQVEsR0FBRztBQUN0QyxRQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxlQUFlLElBQUksR0FBRyxHQUFHO0FBQzlDLFlBQU0sUUFBUSxPQUFPLEdBQUc7QUFBQSxJQUMxQjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRLFFBQVE7QUFDZDtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFRLE1BQU0sSUFBSSxXQUFXO0FBQUEsSUFBQTtBQUUvQixXQUFPLFFBQVEsUUFBUSxNQUFNO0FBQUEsRUFDL0I7QUFDRjtBQUNBLE1BQU0sZ0NBQWdDLG9CQUFvQjtBQUFBLEVBQ3hELFlBQVksYUFBYSxPQUFPO0FBQzlCLFVBQU0sTUFBTSxVQUFVO0FBQUEsRUFDeEI7QUFBQSxFQUNBLElBQUksUUFBUSxLQUFLO0FBT2YsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGVBQWUsUUFBUSxLQUFLO0FBTzFCLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFDQSxNQUFNLHNDQUFzQyx1QkFBQTtBQUM1QyxNQUFNLHVDQUF1Qyx3QkFBQTtBQUM3QyxNQUFNLDBCQUEwQyxvQkFBSSx1QkFBdUIsSUFBSTtBQUMvRSxNQUFNLDBCQUEwQyxvQkFBSSx3QkFBd0IsSUFBSTtBQUVoRixNQUFNLFlBQVksQ0FBQyxVQUFVO0FBQzdCLE1BQU0sV0FBVyxDQUFDLE1BQU0sUUFBUSxlQUFlLENBQUM7QUFDaEQsU0FBUyxxQkFBcUIsUUFBUSxhQUFhLFlBQVk7QUFDN0QsU0FBTyxZQUFZLE1BQU07QUFDdkIsVUFBTSxTQUFTLEtBQUssU0FBUztBQUM3QixVQUFNLFlBQVksTUFBTSxNQUFNO0FBQzlCLFVBQU0sY0FBYyxNQUFNLFNBQVM7QUFDbkMsVUFBTSxTQUFTLFdBQVcsYUFBYSxXQUFXLE9BQU8sWUFBWTtBQUNyRSxVQUFNLFlBQVksV0FBVyxVQUFVO0FBQ3ZDLFVBQU0sZ0JBQWdCLE9BQU8sTUFBTSxFQUFFLEdBQUcsSUFBSTtBQUM1QyxVQUFNLE9BQU8sYUFBYSxZQUFZLGNBQWMsYUFBYTtBQUNqRSxLQUFDLGVBQWU7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0EsWUFBWSxzQkFBc0I7QUFBQSxJQUFBO0FBRXBDLFdBQU87QUFBQTtBQUFBLE1BRUwsT0FBTztBQUNMLGNBQU0sRUFBRSxPQUFPLFNBQVMsY0FBYyxLQUFBO0FBQ3RDLGVBQU8sT0FBTyxFQUFFLE9BQU8sU0FBUztBQUFBLFVBQzlCLE9BQU8sU0FBUyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUs7QUFBQSxVQUM3RDtBQUFBLFFBQUE7QUFBQSxNQUVKO0FBQUE7QUFBQSxNQUVBLENBQUMsT0FBTyxRQUFRLElBQUk7QUFDbEIsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUNGO0FBQ0EsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxTQUFPLFlBQVksTUFBTTtBQVF2QixXQUFPLFNBQVMsV0FBVyxRQUFRLFNBQVMsVUFBVSxTQUFTO0FBQUEsRUFDakU7QUFDRjtBQUNBLFNBQVMsdUJBQXVCQyxXQUFVLFNBQVM7QUFDakQsUUFBTSxtQkFBbUI7QUFBQSxJQUN2QixJQUFJLEtBQUs7QUFDUCxZQUFNLFNBQVMsS0FBSyxTQUFTO0FBQzdCLFlBQU0sWUFBWSxNQUFNLE1BQU07QUFDOUIsWUFBTSxTQUFTLE1BQU0sR0FBRztBQUN4QixVQUFJLENBQUNBLFdBQVU7QUFDYixZQUFJLFdBQVcsS0FBSyxNQUFNLEdBQUc7QUFDM0IsZ0JBQU0sV0FBVyxPQUFPLEdBQUc7QUFBQSxRQUM3QjtBQUNBLGNBQU0sV0FBVyxPQUFPLE1BQU07QUFBQSxNQUNoQztBQUNBLFlBQU0sRUFBRSxJQUFBLElBQVEsU0FBUyxTQUFTO0FBQ2xDLFlBQU0sT0FBTyxVQUFVLFlBQVlBLFlBQVcsYUFBYTtBQUMzRCxVQUFJLElBQUksS0FBSyxXQUFXLEdBQUcsR0FBRztBQUM1QixlQUFPLEtBQUssT0FBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLE1BQzdCLFdBQVcsSUFBSSxLQUFLLFdBQVcsTUFBTSxHQUFHO0FBQ3RDLGVBQU8sS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDO0FBQUEsTUFDaEMsV0FBVyxXQUFXLFdBQVc7QUFDL0IsZUFBTyxJQUFJLEdBQUc7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLElBQUksT0FBTztBQUNULFlBQU0sU0FBUyxLQUFLLFNBQVM7QUFDN0IsT0FBQ0EsYUFBWSxNQUFNLE1BQU0sTUFBTSxHQUFHLFdBQVcsV0FBVztBQUN4RCxhQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLElBQ0EsSUFBSSxLQUFLO0FBQ1AsWUFBTSxTQUFTLEtBQUssU0FBUztBQUM3QixZQUFNLFlBQVksTUFBTSxNQUFNO0FBQzlCLFlBQU0sU0FBUyxNQUFNLEdBQUc7QUFDeEIsVUFBSSxDQUFDQSxXQUFVO0FBQ2IsWUFBSSxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQzNCLGdCQUFNLFdBQVcsT0FBTyxHQUFHO0FBQUEsUUFDN0I7QUFDQSxjQUFNLFdBQVcsT0FBTyxNQUFNO0FBQUEsTUFDaEM7QUFDQSxhQUFPLFFBQVEsU0FBUyxPQUFPLElBQUksR0FBRyxJQUFJLE9BQU8sSUFBSSxHQUFHLEtBQUssT0FBTyxJQUFJLE1BQU07QUFBQSxJQUNoRjtBQUFBLElBQ0EsUUFBUSxVQUFVLFNBQVM7QUFDekIsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sU0FBUyxTQUFTLFNBQVM7QUFDakMsWUFBTSxZQUFZLE1BQU0sTUFBTTtBQUM5QixZQUFNLE9BQU8sVUFBVSxZQUFZQSxZQUFXLGFBQWE7QUFDM0QsT0FBQ0EsYUFBWSxNQUFNLFdBQVcsV0FBVyxXQUFXO0FBQ3BELGFBQU8sT0FBTyxRQUFRLENBQUMsT0FBTyxRQUFRO0FBQ3BDLGVBQU8sU0FBUyxLQUFLLFNBQVMsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsUUFBUTtBQUFBLE1BQ2hFLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFBQTtBQUVGO0FBQUEsSUFDRTtBQUFBLElBQ0FBLFlBQVc7QUFBQSxNQUNULEtBQUsscUJBQXFCLEtBQUs7QUFBQSxNQUMvQixLQUFLLHFCQUFxQixLQUFLO0FBQUEsTUFDL0IsUUFBUSxxQkFBcUIsUUFBUTtBQUFBLE1BQ3JDLE9BQU8scUJBQXFCLE9BQU87QUFBQSxJQUFBLElBQ2pDO0FBQUEsTUFDRixJQUFJLE9BQU87QUFDVCxZQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsV0FBVyxLQUFLLEdBQUc7QUFDdkQsa0JBQVEsTUFBTSxLQUFLO0FBQUEsUUFDckI7QUFDQSxjQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3pCLGNBQU0sUUFBUSxTQUFTLE1BQU07QUFDN0IsY0FBTSxTQUFTLE1BQU0sSUFBSSxLQUFLLFFBQVEsS0FBSztBQUMzQyxZQUFJLENBQUMsUUFBUTtBQUNYLGlCQUFPLElBQUksS0FBSztBQUNoQixrQkFBUSxRQUFRLE9BQU8sT0FBTyxLQUFLO0FBQUEsUUFDckM7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsSUFBSSxLQUFLLE9BQU87QUFDZCxZQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsV0FBVyxLQUFLLEdBQUc7QUFDdkQsa0JBQVEsTUFBTSxLQUFLO0FBQUEsUUFDckI7QUFDQSxjQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3pCLGNBQU0sRUFBRSxLQUFLLFFBQVEsU0FBUyxNQUFNO0FBQ3BDLFlBQUksU0FBUyxJQUFJLEtBQUssUUFBUSxHQUFHO0FBQ2pDLFlBQUksQ0FBQyxRQUFRO0FBQ1gsZ0JBQU0sTUFBTSxHQUFHO0FBQ2YsbUJBQVMsSUFBSSxLQUFLLFFBQVEsR0FBRztBQUFBLFFBQy9CO0FBR0EsY0FBTSxXQUFXLElBQUksS0FBSyxRQUFRLEdBQUc7QUFDckMsZUFBTyxJQUFJLEtBQUssS0FBSztBQUNyQixZQUFJLENBQUMsUUFBUTtBQUNYLGtCQUFRLFFBQVEsT0FBTyxLQUFLLEtBQUs7QUFBQSxRQUNuQyxXQUFXLFdBQVcsT0FBTyxRQUFRLEdBQUc7QUFDdEMsa0JBQVEsUUFBUSxPQUFPLEtBQUssS0FBZTtBQUFBLFFBQzdDO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE9BQU8sS0FBSztBQUNWLGNBQU0sU0FBUyxNQUFNLElBQUk7QUFDekIsY0FBTSxFQUFFLEtBQUssUUFBUSxTQUFTLE1BQU07QUFDcEMsWUFBSSxTQUFTLElBQUksS0FBSyxRQUFRLEdBQUc7QUFDakMsWUFBSSxDQUFDLFFBQVE7QUFDWCxnQkFBTSxNQUFNLEdBQUc7QUFDZixtQkFBUyxJQUFJLEtBQUssUUFBUSxHQUFHO0FBQUEsUUFDL0I7QUFHaUIsY0FBTSxJQUFJLEtBQUssUUFBUSxHQUFHLElBQUk7QUFDL0MsY0FBTSxTQUFTLE9BQU8sT0FBTyxHQUFHO0FBQ2hDLFlBQUksUUFBUTtBQUNWLGtCQUFRLFFBQVEsVUFBVSxLQUFLLE1BQWdCO0FBQUEsUUFDakQ7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsUUFBUTtBQUNOLGNBQU0sU0FBUyxNQUFNLElBQUk7QUFDekIsY0FBTSxXQUFXLE9BQU8sU0FBUztBQUVqQyxjQUFNLFNBQVMsT0FBTyxNQUFBO0FBQ3RCLFlBQUksVUFBVTtBQUNaO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBRUY7QUFBQSxRQUNGO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUFBO0FBQUEsRUFDRjtBQUVGLFFBQU0sa0JBQWtCO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLEVBQUE7QUFFVCxrQkFBZ0IsUUFBUSxDQUFDLFdBQVc7QUFDbEMscUJBQWlCLE1BQU0sSUFBSSxxQkFBcUIsUUFBUUEsV0FBVSxPQUFPO0FBQUEsRUFDM0UsQ0FBQztBQUNELFNBQU87QUFDVDtBQUNBLFNBQVMsNEJBQTRCLGFBQWEsU0FBUztBQUN6RCxRQUFNLG1CQUFtQix1QkFBdUIsYUFBYSxPQUFPO0FBQ3BFLFNBQU8sQ0FBQyxRQUFRLEtBQUssYUFBYTtBQUNoQyxRQUFJLFFBQVEsa0JBQWtCO0FBQzVCLGFBQU8sQ0FBQztBQUFBLElBQ1YsV0FBVyxRQUFRLGtCQUFrQjtBQUNuQyxhQUFPO0FBQUEsSUFDVCxXQUFXLFFBQVEsV0FBVztBQUM1QixhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU8sUUFBUTtBQUFBLE1BQ2IsT0FBTyxrQkFBa0IsR0FBRyxLQUFLLE9BQU8sU0FBUyxtQkFBbUI7QUFBQSxNQUNwRTtBQUFBLE1BQ0E7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUNGO0FBQ0EsTUFBTSw0QkFBNEI7QUFBQSxFQUNoQyxLQUFxQiw0Q0FBNEIsT0FBTyxLQUFLO0FBQy9EO0FBQ0EsTUFBTSw0QkFBNEI7QUFBQSxFQUNoQyxLQUFxQiw0Q0FBNEIsT0FBTyxJQUFJO0FBQzlEO0FBQ0EsTUFBTSw2QkFBNkI7QUFBQSxFQUNqQyxLQUFxQiw0Q0FBNEIsTUFBTSxLQUFLO0FBQzlEO0FBQ0EsTUFBTSxvQ0FBb0M7QUFBQSxFQUN4QyxLQUFxQiw0Q0FBNEIsTUFBTSxJQUFJO0FBQzdEO0FBV0EsTUFBTSxrQ0FBa0MsUUFBQTtBQUN4QyxNQUFNLHlDQUF5QyxRQUFBO0FBQy9DLE1BQU0sa0NBQWtDLFFBQUE7QUFDeEMsTUFBTSx5Q0FBeUMsUUFBQTtBQUMvQyxTQUFTLGNBQWMsU0FBUztBQUM5QixVQUFRLFNBQUE7QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFDSCxhQUFPO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQ0gsYUFBTztBQUFBLElBQ1Q7QUFDRSxhQUFPO0FBQUEsRUFBQTtBQUViO0FBQ0EsU0FBUyxjQUFjLE9BQU87QUFDNUIsU0FBTyxNQUFNLFVBQVUsS0FBSyxDQUFDLE9BQU8sYUFBYSxLQUFLLElBQUksSUFBa0IsY0FBYyxVQUFVLEtBQUssQ0FBQztBQUM1RztBQUNBLFNBQVMsU0FBUyxRQUFRO0FBQ3hCLE1BQUksV0FBVyxNQUFNLEdBQUc7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUFBO0FBRUo7QUFDQSxTQUFTLGdCQUFnQixRQUFRO0FBQy9CLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQUE7QUFFSjtBQUNBLFNBQVMsU0FBUyxRQUFRO0FBQ3hCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQUE7QUFFSjtBQUNBLFNBQVMsZ0JBQWdCLFFBQVE7QUFDL0IsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFBQTtBQUVKO0FBQ0EsU0FBUyxxQkFBcUIsUUFBUSxhQUFhLGNBQWMsb0JBQW9CLFVBQVU7QUFDN0YsTUFBSSxDQUFDLFNBQVMsTUFBTSxHQUFHO0FBUXJCLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxPQUFPLFNBQVMsS0FBSyxFQUFFLGVBQWUsT0FBTyxnQkFBZ0IsSUFBSTtBQUNuRSxXQUFPO0FBQUEsRUFDVDtBQUNBLFFBQU0sYUFBYSxjQUFjLE1BQU07QUFDdkMsTUFBSSxlQUFlLEdBQWlCO0FBQ2xDLFdBQU87QUFBQSxFQUNUO0FBQ0EsUUFBTSxnQkFBZ0IsU0FBUyxJQUFJLE1BQU07QUFDekMsTUFBSSxlQUFlO0FBQ2pCLFdBQU87QUFBQSxFQUNUO0FBQ0EsUUFBTSxRQUFRLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsZUFBZSxJQUFxQixxQkFBcUI7QUFBQSxFQUFBO0FBRTNELFdBQVMsSUFBSSxRQUFRLEtBQUs7QUFDMUIsU0FBTztBQUNUO0FBQ0EsU0FBUyxXQUFXLE9BQU87QUFDekIsTUFBSSxXQUFXLEtBQUssR0FBRztBQUNyQixXQUFPLFdBQVcsTUFBTSxTQUFTLENBQUM7QUFBQSxFQUNwQztBQUNBLFNBQU8sQ0FBQyxFQUFFLFNBQVMsTUFBTSxnQkFBZ0I7QUFDM0M7QUFDQSxTQUFTLFdBQVcsT0FBTztBQUN6QixTQUFPLENBQUMsRUFBRSxTQUFTLE1BQU0sZ0JBQWdCO0FBQzNDO0FBQ0EsU0FBUyxVQUFVLE9BQU87QUFDeEIsU0FBTyxDQUFDLEVBQUUsU0FBUyxNQUFNLGVBQWU7QUFDMUM7QUFDQSxTQUFTLFFBQVEsT0FBTztBQUN0QixTQUFPLFFBQVEsQ0FBQyxDQUFDLE1BQU0sU0FBUyxJQUFJO0FBQ3RDO0FBQ0EsU0FBUyxNQUFNLFVBQVU7QUFDdkIsUUFBTSxNQUFNLFlBQVksU0FBUyxTQUFTO0FBQzFDLFNBQU8sTUFBTSxNQUFNLEdBQUcsSUFBSTtBQUM1QjtBQUNBLFNBQVMsUUFBUSxPQUFPO0FBQ3RCLE1BQUksQ0FBQyxPQUFPLE9BQU8sVUFBVSxLQUFLLE9BQU8sYUFBYSxLQUFLLEdBQUc7QUFDNUQsUUFBSSxPQUFPLFlBQVksSUFBSTtBQUFBLEVBQzdCO0FBQ0EsU0FBTztBQUNUO0FBQ0EsTUFBTSxhQUFhLENBQUMsVUFBVSxTQUFTLEtBQUssSUFBSSxTQUFTLEtBQUssSUFBSTtBQUNsRSxNQUFNLGFBQWEsQ0FBQyxVQUFVLFNBQVMsS0FBSyxJQUFJLFNBQVMsS0FBSyxJQUFJO0FBRWxFLFNBQVMsTUFBTSxHQUFHO0FBQ2hCLFNBQU8sSUFBSSxFQUFFLFdBQVcsTUFBTSxPQUFPO0FBQ3ZDO0FBQ0EsU0FBUyxJQUFJLE9BQU87QUFDbEIsU0FBTyxVQUFVLE9BQU8sS0FBSztBQUMvQjtBQUNBLFNBQVMsV0FBVyxPQUFPO0FBQ3pCLFNBQU8sVUFBVSxPQUFPLElBQUk7QUFDOUI7QUFDQSxTQUFTLFVBQVUsVUFBVSxTQUFTO0FBQ3BDLE1BQUksTUFBTSxRQUFRLEdBQUc7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPLElBQUksUUFBUSxVQUFVLE9BQU87QUFDdEM7QUFDQSxNQUFNLFFBQVE7QUFBQSxFQUNaLFlBQVksT0FBTyxZQUFZO0FBQzdCLFNBQUssTUFBTSxJQUFJLElBQUE7QUFDZixTQUFLLFdBQVcsSUFBSTtBQUNwQixTQUFLLGVBQWUsSUFBSTtBQUN4QixTQUFLLFlBQVksYUFBYSxRQUFRLE1BQU0sS0FBSztBQUNqRCxTQUFLLFNBQVMsYUFBYSxRQUFRLFdBQVcsS0FBSztBQUNuRCxTQUFLLGVBQWUsSUFBSTtBQUFBLEVBQzFCO0FBQUEsRUFDQSxJQUFJLFFBQVE7QUFPSDtBQUNMLFdBQUssSUFBSSxNQUFBO0FBQUEsSUFDWDtBQUNBLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUNBLElBQUksTUFBTSxVQUFVO0FBQ2xCLFVBQU0sV0FBVyxLQUFLO0FBQ3RCLFVBQU0saUJBQWlCLEtBQUssZUFBZSxLQUFLLFVBQVUsUUFBUSxLQUFLLFdBQVcsUUFBUTtBQUMxRixlQUFXLGlCQUFpQixXQUFXLE1BQU0sUUFBUTtBQUNyRCxRQUFJLFdBQVcsVUFBVSxRQUFRLEdBQUc7QUFDbEMsV0FBSyxZQUFZO0FBQ2pCLFdBQUssU0FBUyxpQkFBaUIsV0FBVyxXQUFXLFFBQVE7QUFTdEQ7QUFDTCxhQUFLLElBQUksUUFBQTtBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBQ0EsU0FBUyxXQUFXLE1BQU07QUFDeEIsTUFBSSxLQUFLLEtBQUs7QUFRTDtBQUNMLFdBQUssSUFBSSxRQUFBO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsTUFBTSxNQUFNO0FBQ25CLFNBQU8sTUFBTSxJQUFJLElBQUksS0FBSyxRQUFRO0FBQ3BDO0FBSUEsTUFBTSx3QkFBd0I7QUFBQSxFQUM1QixLQUFLLENBQUMsUUFBUSxLQUFLLGFBQWEsUUFBUSxZQUFZLFNBQVMsTUFBTSxRQUFRLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQztBQUFBLEVBQ3JHLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxhQUFhO0FBQ3JDLFVBQU0sV0FBVyxPQUFPLEdBQUc7QUFDM0IsUUFBSSxNQUFNLFFBQVEsS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHO0FBQ3BDLGVBQVMsUUFBUTtBQUNqQixhQUFPO0FBQUEsSUFDVCxPQUFPO0FBQ0wsYUFBTyxRQUFRLElBQUksUUFBUSxLQUFLLE9BQU8sUUFBUTtBQUFBLElBQ2pEO0FBQUEsRUFDRjtBQUNGO0FBQ0EsU0FBUyxVQUFVLGdCQUFnQjtBQUNqQyxTQUFPLFdBQVcsY0FBYyxJQUFJLGlCQUFpQixJQUFJLE1BQU0sZ0JBQWdCLHFCQUFxQjtBQUN0RztBQUNBLE1BQU0sY0FBYztBQUFBLEVBQ2xCLFlBQVksU0FBUztBQUNuQixTQUFLLFdBQVcsSUFBSTtBQUNwQixTQUFLLFNBQVM7QUFDZCxVQUFNLE1BQU0sS0FBSyxNQUFNLElBQUksSUFBQTtBQUMzQixVQUFNLEVBQUUsS0FBSyxJQUFBLElBQVEsUUFBUSxJQUFJLE1BQU0sS0FBSyxHQUFHLEdBQUcsSUFBSSxRQUFRLEtBQUssR0FBRyxDQUFDO0FBQ3ZFLFNBQUssT0FBTztBQUNaLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUNBLElBQUksUUFBUTtBQUNWLFdBQU8sS0FBSyxTQUFTLEtBQUssS0FBQTtBQUFBLEVBQzVCO0FBQUEsRUFDQSxJQUFJLE1BQU0sUUFBUTtBQUNoQixTQUFLLEtBQUssTUFBTTtBQUFBLEVBQ2xCO0FBQ0Y7QUFDQSxTQUFTLFVBQVUsU0FBUztBQUMxQixTQUFPLElBQUksY0FBYyxPQUFPO0FBQ2xDO0FBV0EsTUFBTSxjQUFjO0FBQUEsRUFDbEIsWUFBWSxTQUFTLE1BQU0sZUFBZTtBQUN4QyxTQUFLLFVBQVU7QUFDZixTQUFLLE9BQU87QUFDWixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLFdBQVcsSUFBSTtBQUNwQixTQUFLLFNBQVM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsSUFBSSxRQUFRO0FBQ1YsVUFBTSxNQUFNLEtBQUssUUFBUSxLQUFLLElBQUk7QUFDbEMsV0FBTyxLQUFLLFNBQVMsUUFBUSxTQUFTLEtBQUssZ0JBQWdCO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLElBQUksTUFBTSxRQUFRO0FBQ2hCLFNBQUssUUFBUSxLQUFLLElBQUksSUFBSTtBQUFBLEVBQzVCO0FBQUEsRUFDQSxJQUFJLE1BQU07QUFDUixXQUFPLG1CQUFtQixNQUFNLEtBQUssT0FBTyxHQUFHLEtBQUssSUFBSTtBQUFBLEVBQzFEO0FBQ0Y7QUFDQSxNQUFNLGNBQWM7QUFBQSxFQUNsQixZQUFZLFNBQVM7QUFDbkIsU0FBSyxVQUFVO0FBQ2YsU0FBSyxXQUFXLElBQUk7QUFDcEIsU0FBSyxnQkFBZ0IsSUFBSTtBQUN6QixTQUFLLFNBQVM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsSUFBSSxRQUFRO0FBQ1YsV0FBTyxLQUFLLFNBQVMsS0FBSyxRQUFBO0FBQUEsRUFDNUI7QUFDRjtBQUNBLFNBQVMsTUFBTSxRQUFRLEtBQUssY0FBYztBQUN4QyxNQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLFdBQU87QUFBQSxFQUNULFdBQVcsV0FBVyxNQUFNLEdBQUc7QUFDN0IsV0FBTyxJQUFJLGNBQWMsTUFBTTtBQUFBLEVBQ2pDLFdBQVcsU0FBUyxNQUFNLEtBQUssVUFBVSxTQUFTLEdBQUc7QUFDbkQsV0FBTyxjQUFjLFFBQVEsS0FBSyxZQUFZO0FBQUEsRUFDaEQsT0FBTztBQUNMLFdBQU8sSUFBSSxNQUFNO0FBQUEsRUFDbkI7QUFDRjtBQUNBLFNBQVMsY0FBYyxRQUFRLEtBQUssY0FBYztBQUNoRCxRQUFNLE1BQU0sT0FBTyxHQUFHO0FBQ3RCLFNBQU8sTUFBTSxHQUFHLElBQUksTUFBTSxJQUFJLGNBQWMsUUFBUSxLQUFLLFlBQVk7QUFDdkU7QUFFQSxNQUFNLGdCQUFnQjtBQUFBLEVBQ3BCLFlBQVksSUFBSSxRQUFRLE9BQU87QUFDN0IsU0FBSyxLQUFLO0FBQ1YsU0FBSyxTQUFTO0FBSWQsU0FBSyxTQUFTO0FBSWQsU0FBSyxNQUFNLElBQUksSUFBSSxJQUFJO0FBSXZCLFNBQUssWUFBWTtBQU1qQixTQUFLLE9BQU87QUFJWixTQUFLLFdBQVc7QUFJaEIsU0FBSyxRQUFRO0FBSWIsU0FBSyxnQkFBZ0IsZ0JBQWdCO0FBSXJDLFNBQUssT0FBTztBQUVaLFNBQUssU0FBUztBQUNkLFNBQUssZ0JBQWdCLElBQUksQ0FBQztBQUMxQixTQUFLLFFBQVE7QUFBQSxFQUNmO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxTQUFTO0FBQ1AsU0FBSyxTQUFTO0FBQ2QsUUFBSSxFQUFFLEtBQUssUUFBUTtBQUFBLElBQ25CLGNBQWMsTUFBTTtBQUNsQixZQUFNLE1BQU0sSUFBSTtBQUNoQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQUksUUFBUTtBQUNWLFVBQU0sT0FJRCxLQUFLLElBQUksTUFBQTtBQUNkLG9CQUFnQixJQUFJO0FBQ3BCLFFBQUksTUFBTTtBQUNSLFdBQUssVUFBVSxLQUFLLElBQUk7QUFBQSxJQUMxQjtBQUNBLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUNBLElBQUksTUFBTSxVQUFVO0FBQ2xCLFFBQUksS0FBSyxRQUFRO0FBQ2YsV0FBSyxPQUFPLFFBQVE7QUFBQSxJQUN0QjtBQUFBLEVBR0Y7QUFDRjtBQUNBLFNBQVMsU0FBUyxpQkFBaUIsY0FBYyxRQUFRLE9BQU87QUFDOUQsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJLFdBQVcsZUFBZSxHQUFHO0FBQy9CLGFBQVM7QUFBQSxFQUNYLE9BQU87QUFDTCxhQUFTLGdCQUFnQjtBQUN6QixhQUFTLGdCQUFnQjtBQUFBLEVBQzNCO0FBQ0EsUUFBTSxPQUFPLElBQUksZ0JBQWdCLFFBQVEsUUFBUSxLQUFLO0FBS3RELFNBQU87QUFDVDtBQThCQSxNQUFNLHdCQUF3QixDQUFBO0FBQzlCLE1BQU0saUNBQWlDLFFBQUE7QUFDdkMsSUFBSSxnQkFBZ0I7QUFJcEIsU0FBUyxpQkFBaUIsV0FBVyxlQUFlLE9BQU8sUUFBUSxlQUFlO0FBQ2hGLE1BQUksT0FBTztBQUNULFFBQUksV0FBVyxXQUFXLElBQUksS0FBSztBQUNuQyxRQUFJLENBQUMsU0FBVSxZQUFXLElBQUksT0FBTyxXQUFXLEVBQUU7QUFDbEQsYUFBUyxLQUFLLFNBQVM7QUFBQSxFQUN6QjtBQUtGO0FBQ0EsU0FBUyxNQUFNLFFBQVEsSUFBSSxVQUFVLFdBQVc7QUFDOUMsUUFBTSxFQUFFLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxTQUFTO0FBUS9ELFFBQU0saUJBQWlCLENBQUMsWUFBWTtBQUNsQyxRQUFJLEtBQU0sUUFBTztBQUNqQixRQUFJLFVBQVUsT0FBTyxLQUFLLFNBQVMsU0FBUyxTQUFTO0FBQ25ELGFBQU8sU0FBUyxTQUFTLENBQUM7QUFDNUIsV0FBTyxTQUFTLE9BQU87QUFBQSxFQUN6QjtBQUNBLE1BQUlDO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxlQUFlO0FBQ25CLE1BQUksZ0JBQWdCO0FBQ3BCLE1BQUksTUFBTSxNQUFNLEdBQUc7QUFDakIsYUFBUyxNQUFNLE9BQU87QUFDdEIsbUJBQWUsVUFBVSxNQUFNO0FBQUEsRUFDakMsV0FBVyxXQUFXLE1BQU0sR0FBRztBQUM3QixhQUFTLE1BQU0sZUFBZSxNQUFNO0FBQ3BDLG1CQUFlO0FBQUEsRUFDakIsV0FBVyxRQUFRLE1BQU0sR0FBRztBQUMxQixvQkFBZ0I7QUFDaEIsbUJBQWUsT0FBTyxLQUFLLENBQUMsTUFBTSxXQUFXLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztBQUMvRCxhQUFTLE1BQU0sT0FBTyxJQUFJLENBQUMsTUFBTTtBQUMvQixVQUFJLE1BQU0sQ0FBQyxHQUFHO0FBQ1osZUFBTyxFQUFFO0FBQUEsTUFDWCxXQUFXLFdBQVcsQ0FBQyxHQUFHO0FBQ3hCLGVBQU8sZUFBZSxDQUFDO0FBQUEsTUFDekIsV0FBVyxXQUFXLENBQUMsR0FBRztBQUN4QixlQUFPLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFBO0FBQUEsTUFDN0IsTUFBTztBQUFBLElBR1QsQ0FBQztBQUFBLEVBQ0gsV0FBVyxXQUFXLE1BQU0sR0FBRztBQUM3QixRQUFJLElBQUk7QUFDTixlQUFTLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJO0FBQUEsSUFDMUMsT0FBTztBQUNMLGVBQVMsTUFBTTtBQUNiLFlBQUksU0FBUztBQUNYLHdCQUFBO0FBQ0EsY0FBSTtBQUNGLG9CQUFBO0FBQUEsVUFDRixVQUFBO0FBQ0UsMEJBQUE7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLGNBQU0sZ0JBQWdCO0FBQ3RCLHdCQUFnQkE7QUFDaEIsWUFBSTtBQUNGLGlCQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLFlBQVk7QUFBQSxRQUNyRSxVQUFBO0FBQ0UsMEJBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsT0FBTztBQUNMLGFBQVM7QUFBQSxFQUVYO0FBQ0EsTUFBSSxNQUFNLE1BQU07QUFDZCxVQUFNLGFBQWE7QUFDbkIsVUFBTSxRQUFRLFNBQVMsT0FBTyxXQUFXO0FBQ3pDLGFBQVMsTUFBTSxTQUFTLFdBQUEsR0FBYyxLQUFLO0FBQUEsRUFDN0M7QUFDQSxRQUFNLFFBQVEsZ0JBQUE7QUFDZCxRQUFNLGNBQWMsTUFBTTtBQUN4QkEsWUFBTyxLQUFBO0FBQ1AsUUFBSSxTQUFTLE1BQU0sUUFBUTtBQUN6QixhQUFPLE1BQU0sU0FBU0EsT0FBTTtBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUNBLE1BQUksUUFBUSxJQUFJO0FBQ2QsVUFBTSxNQUFNO0FBQ1osU0FBSyxJQUFJLFNBQVM7QUFDaEIsVUFBSSxHQUFHLElBQUk7QUFDWCxrQkFBQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxXQUFXLGdCQUFnQixJQUFJLE1BQU0sT0FBTyxNQUFNLEVBQUUsS0FBSyxxQkFBcUIsSUFBSTtBQUN0RixRQUFNLE1BQU0sQ0FBQyxzQkFBc0I7QUFDakMsUUFBSSxFQUFFQSxRQUFPLFFBQVEsTUFBTSxDQUFDQSxRQUFPLFNBQVMsQ0FBQyxtQkFBbUI7QUFDOUQ7QUFBQSxJQUNGO0FBQ0EsUUFBSSxJQUFJO0FBQ04sWUFBTSxXQUFXQSxRQUFPLElBQUE7QUFDeEIsVUFBSSxRQUFRLGlCQUFpQixnQkFBZ0IsU0FBUyxLQUFLLENBQUMsR0FBRyxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxVQUFVLFFBQVEsSUFBSTtBQUNsSSxZQUFJLFNBQVM7QUFDWCxrQkFBQTtBQUFBLFFBQ0Y7QUFDQSxjQUFNLGlCQUFpQjtBQUN2Qix3QkFBZ0JBO0FBQ2hCLFlBQUk7QUFDRixnQkFBTSxPQUFPO0FBQUEsWUFDWDtBQUFBO0FBQUEsWUFFQSxhQUFhLHdCQUF3QixTQUFTLGlCQUFpQixTQUFTLENBQUMsTUFBTSx3QkFBd0IsQ0FBQSxJQUFLO0FBQUEsWUFDNUc7QUFBQSxVQUFBO0FBRUYscUJBQVc7QUFDWCxpQkFBTyxLQUFLLElBQUksR0FBRyxJQUFJO0FBQUE7QUFBQSxZQUVyQixHQUFHLEdBQUcsSUFBSTtBQUFBO0FBQUEsUUFFZCxVQUFBO0FBQ0UsMEJBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRixPQUFPO0FBQ0xBLGNBQU8sSUFBQTtBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0EsTUFBSSxZQUFZO0FBQ2QsZUFBVyxHQUFHO0FBQUEsRUFDaEI7QUFDQUEsWUFBUyxJQUFJLGVBQWUsTUFBTTtBQUNsQ0EsVUFBTyxZQUFZLFlBQVksTUFBTSxVQUFVLEtBQUssS0FBSyxJQUFJO0FBQzdELGlCQUFlLENBQUMsT0FBTyxpQkFBaUIsSUFBSSxPQUFPQSxPQUFNO0FBQ3pELFlBQVVBLFFBQU8sU0FBUyxNQUFNO0FBQzlCLFVBQU0sV0FBVyxXQUFXLElBQUlBLE9BQU07QUFDdEMsUUFBSSxVQUFVO0FBQ1osVUFBSSxNQUFNO0FBQ1IsYUFBSyxVQUFVLENBQUM7QUFBQSxNQUNsQixPQUFPO0FBQ0wsbUJBQVcsWUFBWSxTQUFVLFVBQUE7QUFBQSxNQUNuQztBQUNBLGlCQUFXLE9BQU9BLE9BQU07QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFLQSxNQUFJLElBQUk7QUFDTixRQUFJLFdBQVc7QUFDYixVQUFJLElBQUk7QUFBQSxJQUNWLE9BQU87QUFDTCxpQkFBV0EsUUFBTyxJQUFBO0FBQUEsSUFDcEI7QUFBQSxFQUNGLFdBQVcsV0FBVztBQUNwQixjQUFVLElBQUksS0FBSyxNQUFNLElBQUksR0FBRyxJQUFJO0FBQUEsRUFDdEMsT0FBTztBQUNMQSxZQUFPLElBQUE7QUFBQSxFQUNUO0FBQ0EsY0FBWSxRQUFRQSxRQUFPLE1BQU0sS0FBS0EsT0FBTTtBQUM1QyxjQUFZLFNBQVNBLFFBQU8sT0FBTyxLQUFLQSxPQUFNO0FBQzlDLGNBQVksT0FBTztBQUNuQixTQUFPO0FBQ1Q7QUFDQSxTQUFTLFNBQVMsT0FBTyxRQUFRLFVBQVUsTUFBTTtBQUMvQyxNQUFJLFNBQVMsS0FBSyxDQUFDLFNBQVMsS0FBSyxLQUFLLE1BQU0sVUFBVSxHQUFHO0FBQ3ZELFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTyw0QkFBNEIsSUFBQTtBQUNuQyxNQUFJLEtBQUssSUFBSSxLQUFLLEdBQUc7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxPQUFLLElBQUksS0FBSztBQUNkO0FBQ0EsTUFBSSxNQUFNLEtBQUssR0FBRztBQUNoQixhQUFTLE1BQU0sT0FBTyxPQUFPLElBQUk7QUFBQSxFQUNuQyxXQUFXLFFBQVEsS0FBSyxHQUFHO0FBQ3pCLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsZUFBUyxNQUFNLENBQUMsR0FBRyxPQUFPLElBQUk7QUFBQSxJQUNoQztBQUFBLEVBQ0YsV0FBVyxNQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssR0FBRztBQUN2QyxVQUFNLFFBQVEsQ0FBQyxNQUFNO0FBQ25CLGVBQVMsR0FBRyxPQUFPLElBQUk7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDSCxXQUFXLGNBQWMsS0FBSyxHQUFHO0FBQy9CLGVBQVcsT0FBTyxPQUFPO0FBQ3ZCLGVBQVMsTUFBTSxHQUFHLEdBQUcsT0FBTyxJQUFJO0FBQUEsSUFDbEM7QUFDQSxlQUFXLE9BQU8sT0FBTyxzQkFBc0IsS0FBSyxHQUFHO0FBQ3JELFVBQUksT0FBTyxVQUFVLHFCQUFxQixLQUFLLE9BQU8sR0FBRyxHQUFHO0FBQzFELGlCQUFTLE1BQU0sR0FBRyxHQUFHLE9BQU8sSUFBSTtBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
