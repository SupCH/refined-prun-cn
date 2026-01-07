import {
  createRenderer,
  getCurrentInstance,
  nextTick,
  callWithAsyncErrorHandling,
} from './runtime-core.esm-bundler.js';
import {
  Comment,
  Fragment,
  Static,
  Teleport,
  Text,
  callWithErrorHandling,
  cloneVNode,
  computed,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createElementVNode,
  createTextVNode,
  createVNode,
  defineComponent,
  guardReactiveProps,
  h,
  handleError,
  inject,
  isVNode,
  mergeModels,
  mergeProps,
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
  openBlock,
  provide,
  queuePostFlushCb,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  setBlockTracking,
  setTransitionHooks,
  ssrContextKey,
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
} from './runtime-core.esm-bundler.js';
import {
  isFunction,
  isString,
  looseToNumber,
  invokeArrayFns,
  isArray,
  EMPTY_OBJ,
  hyphenate,
  isSet,
  looseIndexOf,
  looseEqual,
  extend,
  isOn,
  isModelListener,
  isSpecialBooleanAttr,
  camelize,
  includeBooleanAttr,
  isSymbol,
  capitalize,
} from './shared.esm-bundler.js';
import {
  normalizeClass,
  normalizeStyle,
  toDisplayString,
  toHandlerKey,
} from './shared.esm-bundler.js';
/**
 * @vue/runtime-dom v3.5.20
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let policy = void 0;
const tt = typeof window !== 'undefined' && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy('vue', {
      createHTML: val => val,
    });
  } catch (e) {}
}
const unsafeToTrustedHTML = policy ? val => policy.createHTML(val) : val => val;
const svgNS = 'http://www.w3.org/2000/svg';
const mathmlNS = 'http://www.w3.org/1998/Math/MathML';
const doc = typeof document !== 'undefined' ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement('template');
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: child => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el =
      namespace === 'svg'
        ? doc.createElementNS(svgNS, tag)
        : namespace === 'mathml'
          ? doc.createElementNS(mathmlNS, tag)
          : is
            ? doc.createElement(tag, { is })
            : doc.createElement(tag);
    if (tag === 'select' && props && props.multiple != null) {
      el.setAttribute('multiple', props.multiple);
    }
    return el;
  },
  createText: text => doc.createTextNode(text),
  createComment: text => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: node => node.parentNode,
  nextSibling: node => node.nextSibling,
  querySelector: selector => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, '');
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === 'svg'
          ? `<svg>${content}</svg>`
          : namespace === 'mathml'
            ? `<math>${content}</math>`
            : content,
      );
      const template = templateContainer.content;
      if (namespace === 'svg' || namespace === 'mathml') {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild,
    ];
  },
};
const vtcKey = Symbol('_vtc');
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(' ');
  }
  if (value == null) {
    el.removeAttribute('class');
  } else if (isSVG) {
    el.setAttribute('class', value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = Symbol('_vod');
const vShowHidden = Symbol('_vsh');
const vShow = {
  // used for prop mismatch check during hydration
  name: 'show',
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === 'none' ? '' : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  },
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : 'none';
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = Symbol('');
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, '');
          }
        }
      } else {
        for (const prevStyle of prev.split(';')) {
          const key = prevStyle.slice(0, prevStyle.indexOf(':')).trim();
          if (next[key] == null) {
            setStyle(style, key, '');
          }
        }
      }
    }
    for (const key in next) {
      if (key === 'display') {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ';' + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute('style');
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : '';
    if (el[vShowHidden]) {
      style.display = 'none';
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach(v => setStyle(style, name, v));
  } else {
    if (val == null) val = '';
    if (name.startsWith('--')) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ['Webkit', 'Moz', 'ms'];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== 'filter' && name in style) {
    return (prefixCache[rawName] = name);
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed);
    }
  }
  return rawName;
}
const xlinkNS = 'http://www.w3.org/1999/xlink';
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith('xlink:')) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || (isBoolean && !includeBooleanAttr(value))) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? '' : isSymbol(value) ? String(value) : value);
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === 'innerHTML' || key === 'textContent') {
    if (value != null) {
      el[key] = key === 'innerHTML' ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (
    key === 'value' &&
    tag !== 'PROGRESS' && // custom elements may use _value internally
    !tag.includes('-')
  ) {
    const oldValue = tag === 'OPTION' ? el.getAttribute('value') || '' : el.value;
    const newValue =
      value == null
        ? // #11647: value should be set as empty string for null and undefined,
          // but <input type="checkbox"> should be set as 'on'.
          el.type === 'checkbox'
          ? 'on'
          : ''
        : String(value);
    if (oldValue !== newValue || !('_value' in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === '' || value == null) {
    const type = typeof el[key];
    if (type === 'boolean') {
      value = includeBooleanAttr(value);
    } else if (value == null && type === 'string') {
      value = '';
      needRemove = true;
    } else if (type === 'number') {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {}
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol('_vei');
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while ((m = name.match(optionsModifierRE))) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ':' ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => (cachedNow = 0)), (cachedNow = Date.now()));
function createInvoker(initialValue, instance) {
  const invoker = e => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(fn => e2 => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const isNativeOn = key =>
  key.charCodeAt(0) === 111 &&
  key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 &&
  key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === 'svg';
  if (key === 'class') {
    patchClass(el, nextValue, isSVG);
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (
    key[0] === '.'
      ? ((key = key.slice(1)), true)
      : key[0] === '^'
        ? ((key = key.slice(1)), false)
        : shouldSetAsProp(el, key, nextValue, isSVG)
  ) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes('-') && (key === 'value' || key === 'checked' || key === 'selected')) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== 'value');
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE &&
    (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === 'true-value') {
      el._trueValue = nextValue;
    } else if (key === 'false-value') {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === 'innerHTML' || key === 'textContent') {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === 'spellcheck' || key === 'draggable' || key === 'translate' || key === 'autocorrect') {
    return false;
  }
  if (key === 'form') {
    return false;
  }
  if (key === 'list' && el.tagName === 'INPUT') {
    return false;
  }
  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false;
  }
  if (key === 'width' || key === 'height') {
    const tag = el.tagName;
    if (tag === 'IMG' || tag === 'VIDEO' || tag === 'CANVAS' || tag === 'SOURCE') {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
function useCssModule(name = '$style') {
  {
    const instance = getCurrentInstance();
    if (!instance) {
      return EMPTY_OBJ;
    }
    const modules = instance.type.__cssModules;
    if (!modules) {
      return EMPTY_OBJ;
    }
    const mod = modules[name];
    if (!mod) {
      return EMPTY_OBJ;
    }
    return mod;
  }
}
const getModelAssigner = vnode => {
  const fn = vnode.props['onUpdate:modelValue'] || false;
  return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event('input'));
  }
}
const assignKey = Symbol('_assign');
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || (vnode.props && vnode.props.type === 'number');
    addEventListener(el, lazy ? 'change' : 'input', e => {
      if (e.target.composing) return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim) {
      addEventListener(el, 'change', () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, 'compositionstart', onCompositionStart);
      addEventListener(el, 'compositionend', onCompositionEnd);
      addEventListener(el, 'change', onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? '' : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue =
      (number || el.type === 'number') && !/^0\d/.test(el.value)
        ? looseToNumber(el.value)
        : el.value;
    const newValue = value == null ? '' : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== 'range') {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  },
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, 'change', () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el[assignKey];
      if (isArray(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  },
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  let checked;
  if (isArray(value)) {
    checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    checked = value.has(vnode.props.value);
  } else {
    if (value === oldValue) return;
    checked = looseEqual(value, getCheckboxValue(el, true));
  }
  if (el.checked !== checked) {
    el.checked = checked;
  }
}
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, 'change', () => {
      const selectedVal = Array.prototype.filter
        .call(el.options, o => o.selected)
        .map(o => (number ? looseToNumber(getValue(o)) : getValue(o)));
      el[assignKey](
        el.multiple ? (isSetModel ? new Set(selectedVal) : selectedVal) : selectedVal[0],
      );
      el._assigning = true;
      nextTick(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    if (!el._assigning) {
      setSelected(el, value);
    }
  },
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  const isArrayValue = isArray(value);
  if (isMultiple && !isArrayValue && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === 'string' || optionType === 'number') {
          option.selected = value.some(v => String(v) === String(optionValue));
        } else {
          option.selected = looseIndexOf(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else if (looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i) el.selectedIndex = i;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return '_value' in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? '_trueValue' : '_falseValue';
  return key in el ? el[key] : checked;
}
const systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
const modifierGuards = {
  stop: e => e.stopPropagation(),
  prevent: e => e.preventDefault(),
  self: e => e.target !== e.currentTarget,
  ctrl: e => !e.ctrlKey,
  shift: e => !e.shiftKey,
  alt: e => !e.altKey,
  meta: e => !e.metaKey,
  left: e => 'button' in e && e.button !== 0,
  middle: e => 'button' in e && e.button !== 1,
  right: e => 'button' in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some(m => e[`${m}Key`] && !modifiers.includes(m)),
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join('.');
  return (
    cache[cacheKey] ||
    (cache[cacheKey] = (event, ...args) => {
      for (let i = 0; i < modifiers.length; i++) {
        const guard = modifierGuards[modifiers[i]];
        if (guard && guard(event, modifiers)) return;
      }
      return fn(event, ...args);
    })
  );
};
const keyNames = {
  esc: 'escape',
  space: ' ',
  up: 'arrow-up',
  left: 'arrow-left',
  right: 'arrow-right',
  down: 'arrow-down',
  delete: 'backspace',
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join('.');
  return (
    cache[cacheKey] ||
    (cache[cacheKey] = event => {
      if (!('key' in event)) {
        return;
      }
      const eventKey = hyphenate(event.key);
      if (modifiers.some(k => k === eventKey || keyNames[k] === eventKey)) {
        return fn(event);
      }
    })
  );
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = containerOrSelector => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = '';
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute('v-cloak');
      container.setAttribute('data-v-app', '');
    }
    return proxy;
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return 'svg';
  }
  if (typeof MathMLElement === 'function' && container instanceof MathMLElement) {
    return 'mathml';
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
export {
  Comment,
  Fragment,
  Static,
  Teleport,
  Text,
  callWithAsyncErrorHandling,
  callWithErrorHandling,
  camelize,
  capitalize,
  cloneVNode,
  computed,
  createApp,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createElementVNode,
  createRenderer,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  guardReactiveProps,
  h,
  handleError,
  inject,
  isVNode,
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
  openBlock,
  provide,
  queuePostFlushCb,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  setBlockTracking,
  setTransitionHooks,
  ssrContextKey,
  toDisplayString,
  toHandlerKey,
  useCssModule,
  useModel,
  useSSRContext,
  useSlots,
  useTemplateRef,
  vModelCheckbox,
  vModelSelect,
  vModelText,
  vShow,
  version,
  watch,
  watchEffect,
  watchSyncEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS1kb20uZXNtLWJ1bmRsZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AdnVlK3J1bnRpbWUtZG9tQDMuNS4yMC9ub2RlX21vZHVsZXMvQHZ1ZS9ydW50aW1lLWRvbS9kaXN0L3J1bnRpbWUtZG9tLmVzbS1idW5kbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAdnVlL3J1bnRpbWUtZG9tIHYzLjUuMjBcbiogKGMpIDIwMTgtcHJlc2VudCBZdXhpIChFdmFuKSBZb3UgYW5kIFZ1ZSBjb250cmlidXRvcnNcbiogQGxpY2Vuc2UgTUlUXG4qKi9cbmltcG9ydCB7IHdhcm4sIEJhc2VUcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzLCBoLCBCYXNlVHJhbnNpdGlvbiwgYXNzZXJ0TnVtYmVyLCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uQmVmb3JlVXBkYXRlLCBxdWV1ZVBvc3RGbHVzaENiLCBvbk1vdW50ZWQsIHdhdGNoLCBvblVubW91bnRlZCwgRnJhZ21lbnQsIFN0YXRpYywgY2FtZWxpemUsIGNhbGxXaXRoQXN5bmNFcnJvckhhbmRsaW5nLCBkZWZpbmVDb21wb25lbnQsIG5leHRUaWNrLCB1bnJlZiwgY3JlYXRlVk5vZGUsIHVzZVRyYW5zaXRpb25TdGF0ZSwgb25VcGRhdGVkLCB0b1JhdywgZ2V0VHJhbnNpdGlvblJhd0NoaWxkcmVuLCBzZXRUcmFuc2l0aW9uSG9va3MsIHJlc29sdmVUcmFuc2l0aW9uSG9va3MsIFRleHQsIGNyZWF0ZVJlbmRlcmVyLCBjcmVhdGVIeWRyYXRpb25SZW5kZXJlciwgaXNSdW50aW1lT25seSB9IGZyb20gJ0B2dWUvcnVudGltZS1jb3JlJztcbmV4cG9ydCAqIGZyb20gJ0B2dWUvcnVudGltZS1jb3JlJztcbmltcG9ydCB7IGV4dGVuZCwgaXNPYmplY3QsIHRvTnVtYmVyLCBpc0FycmF5LCBOT09QLCBub3JtYWxpemVDc3NWYXJWYWx1ZSwgaXNTdHJpbmcsIGh5cGhlbmF0ZSwgY2FwaXRhbGl6ZSwgaXNTcGVjaWFsQm9vbGVhbkF0dHIsIGluY2x1ZGVCb29sZWFuQXR0ciwgaXNTeW1ib2wsIGlzRnVuY3Rpb24sIGlzT24sIGlzTW9kZWxMaXN0ZW5lciwgY2FtZWxpemUgYXMgY2FtZWxpemUkMSwgaXNQbGFpbk9iamVjdCwgaGFzT3duLCBFTVBUWV9PQkosIGxvb3NlVG9OdW1iZXIsIGxvb3NlSW5kZXhPZiwgaXNTZXQsIGxvb3NlRXF1YWwsIGludm9rZUFycmF5Rm5zLCBpc0hUTUxUYWcsIGlzU1ZHVGFnLCBpc01hdGhNTFRhZyB9IGZyb20gJ0B2dWUvc2hhcmVkJztcblxubGV0IHBvbGljeSA9IHZvaWQgMDtcbmNvbnN0IHR0ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cudHJ1c3RlZFR5cGVzO1xuaWYgKHR0KSB7XG4gIHRyeSB7XG4gICAgcG9saWN5ID0gLyogQF9fUFVSRV9fICovIHR0LmNyZWF0ZVBvbGljeShcInZ1ZVwiLCB7XG4gICAgICBjcmVhdGVIVE1MOiAodmFsKSA9PiB2YWxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybihgRXJyb3IgY3JlYXRpbmcgdHJ1c3RlZCB0eXBlcyBwb2xpY3k6ICR7ZX1gKTtcbiAgfVxufVxuY29uc3QgdW5zYWZlVG9UcnVzdGVkSFRNTCA9IHBvbGljeSA/ICh2YWwpID0+IHBvbGljeS5jcmVhdGVIVE1MKHZhbCkgOiAodmFsKSA9PiB2YWw7XG5jb25zdCBzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbmNvbnN0IG1hdGhtbE5TID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI7XG5jb25zdCBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudCA6IG51bGw7XG5jb25zdCB0ZW1wbGF0ZUNvbnRhaW5lciA9IGRvYyAmJiAvKiBAX19QVVJFX18gKi8gZG9jLmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbmNvbnN0IG5vZGVPcHMgPSB7XG4gIGluc2VydDogKGNoaWxkLCBwYXJlbnQsIGFuY2hvcikgPT4ge1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIGFuY2hvciB8fCBudWxsKTtcbiAgfSxcbiAgcmVtb3ZlOiAoY2hpbGQpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgfVxuICB9LFxuICBjcmVhdGVFbGVtZW50OiAodGFnLCBuYW1lc3BhY2UsIGlzLCBwcm9wcykgPT4ge1xuICAgIGNvbnN0IGVsID0gbmFtZXNwYWNlID09PSBcInN2Z1wiID8gZG9jLmNyZWF0ZUVsZW1lbnROUyhzdmdOUywgdGFnKSA6IG5hbWVzcGFjZSA9PT0gXCJtYXRobWxcIiA/IGRvYy5jcmVhdGVFbGVtZW50TlMobWF0aG1sTlMsIHRhZykgOiBpcyA/IGRvYy5jcmVhdGVFbGVtZW50KHRhZywgeyBpcyB9KSA6IGRvYy5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgaWYgKHRhZyA9PT0gXCJzZWxlY3RcIiAmJiBwcm9wcyAmJiBwcm9wcy5tdWx0aXBsZSAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiLCBwcm9wcy5tdWx0aXBsZSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgY3JlYXRlVGV4dDogKHRleHQpID0+IGRvYy5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSxcbiAgY3JlYXRlQ29tbWVudDogKHRleHQpID0+IGRvYy5jcmVhdGVDb21tZW50KHRleHQpLFxuICBzZXRUZXh0OiAobm9kZSwgdGV4dCkgPT4ge1xuICAgIG5vZGUubm9kZVZhbHVlID0gdGV4dDtcbiAgfSxcbiAgc2V0RWxlbWVudFRleHQ6IChlbCwgdGV4dCkgPT4ge1xuICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfSxcbiAgcGFyZW50Tm9kZTogKG5vZGUpID0+IG5vZGUucGFyZW50Tm9kZSxcbiAgbmV4dFNpYmxpbmc6IChub2RlKSA9PiBub2RlLm5leHRTaWJsaW5nLFxuICBxdWVyeVNlbGVjdG9yOiAoc2VsZWN0b3IpID0+IGRvYy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSxcbiAgc2V0U2NvcGVJZChlbCwgaWQpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoaWQsIFwiXCIpO1xuICB9LFxuICAvLyBfX1VOU0FGRV9fXG4gIC8vIFJlYXNvbjogaW5uZXJIVE1MLlxuICAvLyBTdGF0aWMgY29udGVudCBoZXJlIGNhbiBvbmx5IGNvbWUgZnJvbSBjb21waWxlZCB0ZW1wbGF0ZXMuXG4gIC8vIEFzIGxvbmcgYXMgdGhlIHVzZXIgb25seSB1c2VzIHRydXN0ZWQgdGVtcGxhdGVzLCB0aGlzIGlzIHNhZmUuXG4gIGluc2VydFN0YXRpY0NvbnRlbnQoY29udGVudCwgcGFyZW50LCBhbmNob3IsIG5hbWVzcGFjZSwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IGJlZm9yZSA9IGFuY2hvciA/IGFuY2hvci5wcmV2aW91c1NpYmxpbmcgOiBwYXJlbnQubGFzdENoaWxkO1xuICAgIGlmIChzdGFydCAmJiAoc3RhcnQgPT09IGVuZCB8fCBzdGFydC5uZXh0U2libGluZykpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoc3RhcnQuY2xvbmVOb2RlKHRydWUpLCBhbmNob3IpO1xuICAgICAgICBpZiAoc3RhcnQgPT09IGVuZCB8fCAhKHN0YXJ0ID0gc3RhcnQubmV4dFNpYmxpbmcpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGVDb250YWluZXIuaW5uZXJIVE1MID0gdW5zYWZlVG9UcnVzdGVkSFRNTChcbiAgICAgICAgbmFtZXNwYWNlID09PSBcInN2Z1wiID8gYDxzdmc+JHtjb250ZW50fTwvc3ZnPmAgOiBuYW1lc3BhY2UgPT09IFwibWF0aG1sXCIgPyBgPG1hdGg+JHtjb250ZW50fTwvbWF0aD5gIDogY29udGVudFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGVtcGxhdGVDb250YWluZXIuY29udGVudDtcbiAgICAgIGlmIChuYW1lc3BhY2UgPT09IFwic3ZnXCIgfHwgbmFtZXNwYWNlID09PSBcIm1hdGhtbFwiKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSB0ZW1wbGF0ZS5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZSAod3JhcHBlci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQod3JhcHBlci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wbGF0ZS5yZW1vdmVDaGlsZCh3cmFwcGVyKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUodGVtcGxhdGUsIGFuY2hvcik7XG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICAvLyBmaXJzdFxuICAgICAgYmVmb3JlID8gYmVmb3JlLm5leHRTaWJsaW5nIDogcGFyZW50LmZpcnN0Q2hpbGQsXG4gICAgICAvLyBsYXN0XG4gICAgICBhbmNob3IgPyBhbmNob3IucHJldmlvdXNTaWJsaW5nIDogcGFyZW50Lmxhc3RDaGlsZFxuICAgIF07XG4gIH1cbn07XG5cbmNvbnN0IFRSQU5TSVRJT04gPSBcInRyYW5zaXRpb25cIjtcbmNvbnN0IEFOSU1BVElPTiA9IFwiYW5pbWF0aW9uXCI7XG5jb25zdCB2dGNLZXkgPSBTeW1ib2woXCJfdnRjXCIpO1xuY29uc3QgRE9NVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycyA9IHtcbiAgbmFtZTogU3RyaW5nLFxuICB0eXBlOiBTdHJpbmcsXG4gIGNzczoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBkdXJhdGlvbjogW1N0cmluZywgTnVtYmVyLCBPYmplY3RdLFxuICBlbnRlckZyb21DbGFzczogU3RyaW5nLFxuICBlbnRlckFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGVudGVyVG9DbGFzczogU3RyaW5nLFxuICBhcHBlYXJGcm9tQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyVG9DbGFzczogU3RyaW5nLFxuICBsZWF2ZUZyb21DbGFzczogU3RyaW5nLFxuICBsZWF2ZUFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlVG9DbGFzczogU3RyaW5nXG59O1xuY29uc3QgVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycyA9IC8qIEBfX1BVUkVfXyAqLyBleHRlbmQoXG4gIHt9LFxuICBCYXNlVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycyxcbiAgRE9NVHJhbnNpdGlvblByb3BzVmFsaWRhdG9yc1xuKTtcbmNvbnN0IGRlY29yYXRlJDEgPSAodCkgPT4ge1xuICB0LmRpc3BsYXlOYW1lID0gXCJUcmFuc2l0aW9uXCI7XG4gIHQucHJvcHMgPSBUcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzO1xuICByZXR1cm4gdDtcbn07XG5jb25zdCBUcmFuc2l0aW9uID0gLyogQF9fUFVSRV9fICovIGRlY29yYXRlJDEoXG4gIChwcm9wcywgeyBzbG90cyB9KSA9PiBoKEJhc2VUcmFuc2l0aW9uLCByZXNvbHZlVHJhbnNpdGlvblByb3BzKHByb3BzKSwgc2xvdHMpXG4pO1xuY29uc3QgY2FsbEhvb2sgPSAoaG9vaywgYXJncyA9IFtdKSA9PiB7XG4gIGlmIChpc0FycmF5KGhvb2spKSB7XG4gICAgaG9vay5mb3JFYWNoKChoMikgPT4gaDIoLi4uYXJncykpO1xuICB9IGVsc2UgaWYgKGhvb2spIHtcbiAgICBob29rKC4uLmFyZ3MpO1xuICB9XG59O1xuY29uc3QgaGFzRXhwbGljaXRDYWxsYmFjayA9IChob29rKSA9PiB7XG4gIHJldHVybiBob29rID8gaXNBcnJheShob29rKSA/IGhvb2suc29tZSgoaDIpID0+IGgyLmxlbmd0aCA+IDEpIDogaG9vay5sZW5ndGggPiAxIDogZmFsc2U7XG59O1xuZnVuY3Rpb24gcmVzb2x2ZVRyYW5zaXRpb25Qcm9wcyhyYXdQcm9wcykge1xuICBjb25zdCBiYXNlUHJvcHMgPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gcmF3UHJvcHMpIHtcbiAgICBpZiAoIShrZXkgaW4gRE9NVHJhbnNpdGlvblByb3BzVmFsaWRhdG9ycykpIHtcbiAgICAgIGJhc2VQcm9wc1trZXldID0gcmF3UHJvcHNba2V5XTtcbiAgICB9XG4gIH1cbiAgaWYgKHJhd1Byb3BzLmNzcyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gYmFzZVByb3BzO1xuICB9XG4gIGNvbnN0IHtcbiAgICBuYW1lID0gXCJ2XCIsXG4gICAgdHlwZSxcbiAgICBkdXJhdGlvbixcbiAgICBlbnRlckZyb21DbGFzcyA9IGAke25hbWV9LWVudGVyLWZyb21gLFxuICAgIGVudGVyQWN0aXZlQ2xhc3MgPSBgJHtuYW1lfS1lbnRlci1hY3RpdmVgLFxuICAgIGVudGVyVG9DbGFzcyA9IGAke25hbWV9LWVudGVyLXRvYCxcbiAgICBhcHBlYXJGcm9tQ2xhc3MgPSBlbnRlckZyb21DbGFzcyxcbiAgICBhcHBlYXJBY3RpdmVDbGFzcyA9IGVudGVyQWN0aXZlQ2xhc3MsXG4gICAgYXBwZWFyVG9DbGFzcyA9IGVudGVyVG9DbGFzcyxcbiAgICBsZWF2ZUZyb21DbGFzcyA9IGAke25hbWV9LWxlYXZlLWZyb21gLFxuICAgIGxlYXZlQWN0aXZlQ2xhc3MgPSBgJHtuYW1lfS1sZWF2ZS1hY3RpdmVgLFxuICAgIGxlYXZlVG9DbGFzcyA9IGAke25hbWV9LWxlYXZlLXRvYFxuICB9ID0gcmF3UHJvcHM7XG4gIGNvbnN0IGR1cmF0aW9ucyA9IG5vcm1hbGl6ZUR1cmF0aW9uKGR1cmF0aW9uKTtcbiAgY29uc3QgZW50ZXJEdXJhdGlvbiA9IGR1cmF0aW9ucyAmJiBkdXJhdGlvbnNbMF07XG4gIGNvbnN0IGxlYXZlRHVyYXRpb24gPSBkdXJhdGlvbnMgJiYgZHVyYXRpb25zWzFdO1xuICBjb25zdCB7XG4gICAgb25CZWZvcmVFbnRlcixcbiAgICBvbkVudGVyLFxuICAgIG9uRW50ZXJDYW5jZWxsZWQsXG4gICAgb25MZWF2ZSxcbiAgICBvbkxlYXZlQ2FuY2VsbGVkLFxuICAgIG9uQmVmb3JlQXBwZWFyID0gb25CZWZvcmVFbnRlcixcbiAgICBvbkFwcGVhciA9IG9uRW50ZXIsXG4gICAgb25BcHBlYXJDYW5jZWxsZWQgPSBvbkVudGVyQ2FuY2VsbGVkXG4gIH0gPSBiYXNlUHJvcHM7XG4gIGNvbnN0IGZpbmlzaEVudGVyID0gKGVsLCBpc0FwcGVhciwgZG9uZSwgaXNDYW5jZWxsZWQpID0+IHtcbiAgICBlbC5fZW50ZXJDYW5jZWxsZWQgPSBpc0NhbmNlbGxlZDtcbiAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGlzQXBwZWFyID8gYXBwZWFyVG9DbGFzcyA6IGVudGVyVG9DbGFzcyk7XG4gICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBpc0FwcGVhciA/IGFwcGVhckFjdGl2ZUNsYXNzIDogZW50ZXJBY3RpdmVDbGFzcyk7XG4gICAgZG9uZSAmJiBkb25lKCk7XG4gIH07XG4gIGNvbnN0IGZpbmlzaExlYXZlID0gKGVsLCBkb25lKSA9PiB7XG4gICAgZWwuX2lzTGVhdmluZyA9IGZhbHNlO1xuICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVGcm9tQ2xhc3MpO1xuICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVUb0NsYXNzKTtcbiAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQWN0aXZlQ2xhc3MpO1xuICAgIGRvbmUgJiYgZG9uZSgpO1xuICB9O1xuICBjb25zdCBtYWtlRW50ZXJIb29rID0gKGlzQXBwZWFyKSA9PiB7XG4gICAgcmV0dXJuIChlbCwgZG9uZSkgPT4ge1xuICAgICAgY29uc3QgaG9vayA9IGlzQXBwZWFyID8gb25BcHBlYXIgOiBvbkVudGVyO1xuICAgICAgY29uc3QgcmVzb2x2ZSA9ICgpID0+IGZpbmlzaEVudGVyKGVsLCBpc0FwcGVhciwgZG9uZSk7XG4gICAgICBjYWxsSG9vayhob29rLCBbZWwsIHJlc29sdmVdKTtcbiAgICAgIG5leHRGcmFtZSgoKSA9PiB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgaXNBcHBlYXIgPyBhcHBlYXJGcm9tQ2xhc3MgOiBlbnRlckZyb21DbGFzcyk7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgaXNBcHBlYXIgPyBhcHBlYXJUb0NsYXNzIDogZW50ZXJUb0NsYXNzKTtcbiAgICAgICAgaWYgKCFoYXNFeHBsaWNpdENhbGxiYWNrKGhvb2spKSB7XG4gICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBlbnRlckR1cmF0aW9uLCByZXNvbHZlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGV4dGVuZChiYXNlUHJvcHMsIHtcbiAgICBvbkJlZm9yZUVudGVyKGVsKSB7XG4gICAgICBjYWxsSG9vayhvbkJlZm9yZUVudGVyLCBbZWxdKTtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgZW50ZXJGcm9tQ2xhc3MpO1xuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBlbnRlckFjdGl2ZUNsYXNzKTtcbiAgICB9LFxuICAgIG9uQmVmb3JlQXBwZWFyKGVsKSB7XG4gICAgICBjYWxsSG9vayhvbkJlZm9yZUFwcGVhciwgW2VsXSk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFwcGVhckZyb21DbGFzcyk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFwcGVhckFjdGl2ZUNsYXNzKTtcbiAgICB9LFxuICAgIG9uRW50ZXI6IG1ha2VFbnRlckhvb2soZmFsc2UpLFxuICAgIG9uQXBwZWFyOiBtYWtlRW50ZXJIb29rKHRydWUpLFxuICAgIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgICAgIGVsLl9pc0xlYXZpbmcgPSB0cnVlO1xuICAgICAgY29uc3QgcmVzb2x2ZSA9ICgpID0+IGZpbmlzaExlYXZlKGVsLCBkb25lKTtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVGcm9tQ2xhc3MpO1xuICAgICAgaWYgKCFlbC5fZW50ZXJDYW5jZWxsZWQpIHtcbiAgICAgICAgZm9yY2VSZWZsb3coKTtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVBY3RpdmVDbGFzcyk7XG4gICAgICAgIGZvcmNlUmVmbG93KCk7XG4gICAgICB9XG4gICAgICBuZXh0RnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAoIWVsLl9pc0xlYXZpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUZyb21DbGFzcyk7XG4gICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVUb0NsYXNzKTtcbiAgICAgICAgaWYgKCFoYXNFeHBsaWNpdENhbGxiYWNrKG9uTGVhdmUpKSB7XG4gICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBsZWF2ZUR1cmF0aW9uLCByZXNvbHZlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjYWxsSG9vayhvbkxlYXZlLCBbZWwsIHJlc29sdmVdKTtcbiAgICB9LFxuICAgIG9uRW50ZXJDYW5jZWxsZWQoZWwpIHtcbiAgICAgIGZpbmlzaEVudGVyKGVsLCBmYWxzZSwgdm9pZCAwLCB0cnVlKTtcbiAgICAgIGNhbGxIb29rKG9uRW50ZXJDYW5jZWxsZWQsIFtlbF0pO1xuICAgIH0sXG4gICAgb25BcHBlYXJDYW5jZWxsZWQoZWwpIHtcbiAgICAgIGZpbmlzaEVudGVyKGVsLCB0cnVlLCB2b2lkIDAsIHRydWUpO1xuICAgICAgY2FsbEhvb2sob25BcHBlYXJDYW5jZWxsZWQsIFtlbF0pO1xuICAgIH0sXG4gICAgb25MZWF2ZUNhbmNlbGxlZChlbCkge1xuICAgICAgZmluaXNoTGVhdmUoZWwpO1xuICAgICAgY2FsbEhvb2sob25MZWF2ZUNhbmNlbGxlZCwgW2VsXSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUR1cmF0aW9uKGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoZHVyYXRpb24pKSB7XG4gICAgcmV0dXJuIFtOdW1iZXJPZihkdXJhdGlvbi5lbnRlciksIE51bWJlck9mKGR1cmF0aW9uLmxlYXZlKV07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbiA9IE51bWJlck9mKGR1cmF0aW9uKTtcbiAgICByZXR1cm4gW24sIG5dO1xuICB9XG59XG5mdW5jdGlvbiBOdW1iZXJPZih2YWwpIHtcbiAgY29uc3QgcmVzID0gdG9OdW1iZXIodmFsKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBhc3NlcnROdW1iZXIocmVzLCBcIjx0cmFuc2l0aW9uPiBleHBsaWNpdCBkdXJhdGlvblwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBjbHMpIHtcbiAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaCgoYykgPT4gYyAmJiBlbC5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgKGVsW3Z0Y0tleV0gfHwgKGVsW3Z0Y0tleV0gPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpKSkuYWRkKGNscyk7XG59XG5mdW5jdGlvbiByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGNscykge1xuICBjbHMuc3BsaXQoL1xccysvKS5mb3JFYWNoKChjKSA9PiBjICYmIGVsLmNsYXNzTGlzdC5yZW1vdmUoYykpO1xuICBjb25zdCBfdnRjID0gZWxbdnRjS2V5XTtcbiAgaWYgKF92dGMpIHtcbiAgICBfdnRjLmRlbGV0ZShjbHMpO1xuICAgIGlmICghX3Z0Yy5zaXplKSB7XG4gICAgICBlbFt2dGNLZXldID0gdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gbmV4dEZyYW1lKGNiKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKTtcbiAgfSk7XG59XG5sZXQgZW5kSWQgPSAwO1xuZnVuY3Rpb24gd2hlblRyYW5zaXRpb25FbmRzKGVsLCBleHBlY3RlZFR5cGUsIGV4cGxpY2l0VGltZW91dCwgcmVzb2x2ZSkge1xuICBjb25zdCBpZCA9IGVsLl9lbmRJZCA9ICsrZW5kSWQ7XG4gIGNvbnN0IHJlc29sdmVJZk5vdFN0YWxlID0gKCkgPT4ge1xuICAgIGlmIChpZCA9PT0gZWwuX2VuZElkKSB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuICB9O1xuICBpZiAoZXhwbGljaXRUaW1lb3V0ICE9IG51bGwpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlSWZOb3RTdGFsZSwgZXhwbGljaXRUaW1lb3V0KTtcbiAgfVxuICBjb25zdCB7IHR5cGUsIHRpbWVvdXQsIHByb3BDb3VudCB9ID0gZ2V0VHJhbnNpdGlvbkluZm8oZWwsIGV4cGVjdGVkVHlwZSk7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybiByZXNvbHZlKCk7XG4gIH1cbiAgY29uc3QgZW5kRXZlbnQgPSB0eXBlICsgXCJlbmRcIjtcbiAgbGV0IGVuZGVkID0gMDtcbiAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZW5kRXZlbnQsIG9uRW5kKTtcbiAgICByZXNvbHZlSWZOb3RTdGFsZSgpO1xuICB9O1xuICBjb25zdCBvbkVuZCA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBlbCAmJiArK2VuZGVkID49IHByb3BDb3VudCkge1xuICAgICAgZW5kKCk7XG4gICAgfVxuICB9O1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZW5kZWQgPCBwcm9wQ291bnQpIHtcbiAgICAgIGVuZCgpO1xuICAgIH1cbiAgfSwgdGltZW91dCArIDEpO1xuICBlbC5hZGRFdmVudExpc3RlbmVyKGVuZEV2ZW50LCBvbkVuZCk7XG59XG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uSW5mbyhlbCwgZXhwZWN0ZWRUeXBlKSB7XG4gIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgY29uc3QgZ2V0U3R5bGVQcm9wZXJ0aWVzID0gKGtleSkgPT4gKHN0eWxlc1trZXldIHx8IFwiXCIpLnNwbGl0KFwiLCBcIik7XG4gIGNvbnN0IHRyYW5zaXRpb25EZWxheXMgPSBnZXRTdHlsZVByb3BlcnRpZXMoYCR7VFJBTlNJVElPTn1EZWxheWApO1xuICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb25zID0gZ2V0U3R5bGVQcm9wZXJ0aWVzKGAke1RSQU5TSVRJT059RHVyYXRpb25gKTtcbiAgY29uc3QgdHJhbnNpdGlvblRpbWVvdXQgPSBnZXRUaW1lb3V0KHRyYW5zaXRpb25EZWxheXMsIHRyYW5zaXRpb25EdXJhdGlvbnMpO1xuICBjb25zdCBhbmltYXRpb25EZWxheXMgPSBnZXRTdHlsZVByb3BlcnRpZXMoYCR7QU5JTUFUSU9OfURlbGF5YCk7XG4gIGNvbnN0IGFuaW1hdGlvbkR1cmF0aW9ucyA9IGdldFN0eWxlUHJvcGVydGllcyhgJHtBTklNQVRJT059RHVyYXRpb25gKTtcbiAgY29uc3QgYW5pbWF0aW9uVGltZW91dCA9IGdldFRpbWVvdXQoYW5pbWF0aW9uRGVsYXlzLCBhbmltYXRpb25EdXJhdGlvbnMpO1xuICBsZXQgdHlwZSA9IG51bGw7XG4gIGxldCB0aW1lb3V0ID0gMDtcbiAgbGV0IHByb3BDb3VudCA9IDA7XG4gIGlmIChleHBlY3RlZFR5cGUgPT09IFRSQU5TSVRJT04pIHtcbiAgICBpZiAodHJhbnNpdGlvblRpbWVvdXQgPiAwKSB7XG4gICAgICB0eXBlID0gVFJBTlNJVElPTjtcbiAgICAgIHRpbWVvdXQgPSB0cmFuc2l0aW9uVGltZW91dDtcbiAgICAgIHByb3BDb3VudCA9IHRyYW5zaXRpb25EdXJhdGlvbnMubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09IEFOSU1BVElPTikge1xuICAgIGlmIChhbmltYXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgdHlwZSA9IEFOSU1BVElPTjtcbiAgICAgIHRpbWVvdXQgPSBhbmltYXRpb25UaW1lb3V0O1xuICAgICAgcHJvcENvdW50ID0gYW5pbWF0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGltZW91dCA9IE1hdGgubWF4KHRyYW5zaXRpb25UaW1lb3V0LCBhbmltYXRpb25UaW1lb3V0KTtcbiAgICB0eXBlID0gdGltZW91dCA+IDAgPyB0cmFuc2l0aW9uVGltZW91dCA+IGFuaW1hdGlvblRpbWVvdXQgPyBUUkFOU0lUSU9OIDogQU5JTUFUSU9OIDogbnVsbDtcbiAgICBwcm9wQ291bnQgPSB0eXBlID8gdHlwZSA9PT0gVFJBTlNJVElPTiA/IHRyYW5zaXRpb25EdXJhdGlvbnMubGVuZ3RoIDogYW5pbWF0aW9uRHVyYXRpb25zLmxlbmd0aCA6IDA7XG4gIH1cbiAgY29uc3QgaGFzVHJhbnNmb3JtID0gdHlwZSA9PT0gVFJBTlNJVElPTiAmJiAvXFxiKHRyYW5zZm9ybXxhbGwpKCx8JCkvLnRlc3QoXG4gICAgZ2V0U3R5bGVQcm9wZXJ0aWVzKGAke1RSQU5TSVRJT059UHJvcGVydHlgKS50b1N0cmluZygpXG4gICk7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICB0aW1lb3V0LFxuICAgIHByb3BDb3VudCxcbiAgICBoYXNUcmFuc2Zvcm1cbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFRpbWVvdXQoZGVsYXlzLCBkdXJhdGlvbnMpIHtcbiAgd2hpbGUgKGRlbGF5cy5sZW5ndGggPCBkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgZGVsYXlzID0gZGVsYXlzLmNvbmNhdChkZWxheXMpO1xuICB9XG4gIHJldHVybiBNYXRoLm1heCguLi5kdXJhdGlvbnMubWFwKChkLCBpKSA9PiB0b01zKGQpICsgdG9NcyhkZWxheXNbaV0pKSk7XG59XG5mdW5jdGlvbiB0b01zKHMpIHtcbiAgaWYgKHMgPT09IFwiYXV0b1wiKSByZXR1cm4gMDtcbiAgcmV0dXJuIE51bWJlcihzLnNsaWNlKDAsIC0xKS5yZXBsYWNlKFwiLFwiLCBcIi5cIikpICogMWUzO1xufVxuZnVuY3Rpb24gZm9yY2VSZWZsb3coKSB7XG4gIHJldHVybiBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcbn1cblxuZnVuY3Rpb24gcGF0Y2hDbGFzcyhlbCwgdmFsdWUsIGlzU1ZHKSB7XG4gIGNvbnN0IHRyYW5zaXRpb25DbGFzc2VzID0gZWxbdnRjS2V5XTtcbiAgaWYgKHRyYW5zaXRpb25DbGFzc2VzKSB7XG4gICAgdmFsdWUgPSAodmFsdWUgPyBbdmFsdWUsIC4uLnRyYW5zaXRpb25DbGFzc2VzXSA6IFsuLi50cmFuc2l0aW9uQ2xhc3Nlc10pLmpvaW4oXCIgXCIpO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gIH0gZWxzZSBpZiAoaXNTVkcpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NOYW1lID0gdmFsdWU7XG4gIH1cbn1cblxuY29uc3QgdlNob3dPcmlnaW5hbERpc3BsYXkgPSBTeW1ib2woXCJfdm9kXCIpO1xuY29uc3QgdlNob3dIaWRkZW4gPSBTeW1ib2woXCJfdnNoXCIpO1xuY29uc3QgdlNob3cgPSB7XG4gIC8vIHVzZWQgZm9yIHByb3AgbWlzbWF0Y2ggY2hlY2sgZHVyaW5nIGh5ZHJhdGlvblxuICBuYW1lOiBcInNob3dcIixcbiAgYmVmb3JlTW91bnQoZWwsIHsgdmFsdWUgfSwgeyB0cmFuc2l0aW9uIH0pIHtcbiAgICBlbFt2U2hvd09yaWdpbmFsRGlzcGxheV0gPSBlbC5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiA/IFwiXCIgOiBlbC5zdHlsZS5kaXNwbGF5O1xuICAgIGlmICh0cmFuc2l0aW9uICYmIHZhbHVlKSB7XG4gICAgICB0cmFuc2l0aW9uLmJlZm9yZUVudGVyKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RGlzcGxheShlbCwgdmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZChlbCwgeyB2YWx1ZSB9LCB7IHRyYW5zaXRpb24gfSkge1xuICAgIGlmICh0cmFuc2l0aW9uICYmIHZhbHVlKSB7XG4gICAgICB0cmFuc2l0aW9uLmVudGVyKGVsKTtcbiAgICB9XG4gIH0sXG4gIHVwZGF0ZWQoZWwsIHsgdmFsdWUsIG9sZFZhbHVlIH0sIHsgdHJhbnNpdGlvbiB9KSB7XG4gICAgaWYgKCF2YWx1ZSA9PT0gIW9sZFZhbHVlKSByZXR1cm47XG4gICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0cmFuc2l0aW9uLmJlZm9yZUVudGVyKGVsKTtcbiAgICAgICAgc2V0RGlzcGxheShlbCwgdHJ1ZSk7XG4gICAgICAgIHRyYW5zaXRpb24uZW50ZXIoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbi5sZWF2ZShlbCwgKCkgPT4ge1xuICAgICAgICAgIHNldERpc3BsYXkoZWwsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldERpc3BsYXkoZWwsIHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIGJlZm9yZVVubW91bnQoZWwsIHsgdmFsdWUgfSkge1xuICAgIHNldERpc3BsYXkoZWwsIHZhbHVlKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHNldERpc3BsYXkoZWwsIHZhbHVlKSB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/IGVsW3ZTaG93T3JpZ2luYWxEaXNwbGF5XSA6IFwibm9uZVwiO1xuICBlbFt2U2hvd0hpZGRlbl0gPSAhdmFsdWU7XG59XG5mdW5jdGlvbiBpbml0VlNob3dGb3JTU1IoKSB7XG4gIHZTaG93LmdldFNTUlByb3BzID0gKHsgdmFsdWUgfSkgPT4ge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiB7IHN0eWxlOiB7IGRpc3BsYXk6IFwibm9uZVwiIH0gfTtcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IENTU19WQVJfVEVYVCA9IFN5bWJvbCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gXCJDU1NfVkFSX1RFWFRcIiA6IFwiXCIpO1xuZnVuY3Rpb24gdXNlQ3NzVmFycyhnZXR0ZXIpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybihgdXNlQ3NzVmFycyBpcyBjYWxsZWQgd2l0aG91dCBjdXJyZW50IGFjdGl2ZSBjb21wb25lbnQgaW5zdGFuY2UuYCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHVwZGF0ZVRlbGVwb3J0cyA9IGluc3RhbmNlLnV0ID0gKHZhcnMgPSBnZXR0ZXIoaW5zdGFuY2UucHJveHkpKSA9PiB7XG4gICAgQXJyYXkuZnJvbShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXYtb3duZXI9XCIke2luc3RhbmNlLnVpZH1cIl1gKVxuICAgICkuZm9yRWFjaCgobm9kZSkgPT4gc2V0VmFyc09uTm9kZShub2RlLCB2YXJzKSk7XG4gIH07XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgaW5zdGFuY2UuZ2V0Q3NzVmFycyA9ICgpID0+IGdldHRlcihpbnN0YW5jZS5wcm94eSk7XG4gIH1cbiAgY29uc3Qgc2V0VmFycyA9ICgpID0+IHtcbiAgICBjb25zdCB2YXJzID0gZ2V0dGVyKGluc3RhbmNlLnByb3h5KTtcbiAgICBpZiAoaW5zdGFuY2UuY2UpIHtcbiAgICAgIHNldFZhcnNPbk5vZGUoaW5zdGFuY2UuY2UsIHZhcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRWYXJzT25WTm9kZShpbnN0YW5jZS5zdWJUcmVlLCB2YXJzKTtcbiAgICB9XG4gICAgdXBkYXRlVGVsZXBvcnRzKHZhcnMpO1xuICB9O1xuICBvbkJlZm9yZVVwZGF0ZSgoKSA9PiB7XG4gICAgcXVldWVQb3N0Rmx1c2hDYihzZXRWYXJzKTtcbiAgfSk7XG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgd2F0Y2goc2V0VmFycywgTk9PUCwgeyBmbHVzaDogXCJwb3N0XCIgfSk7XG4gICAgY29uc3Qgb2IgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihzZXRWYXJzKTtcbiAgICBvYi5vYnNlcnZlKGluc3RhbmNlLnN1YlRyZWUuZWwucGFyZW50Tm9kZSwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG4gICAgb25Vbm1vdW50ZWQoKCkgPT4gb2IuZGlzY29ubmVjdCgpKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBzZXRWYXJzT25WTm9kZSh2bm9kZSwgdmFycykge1xuICBpZiAodm5vZGUuc2hhcGVGbGFnICYgMTI4KSB7XG4gICAgY29uc3Qgc3VzcGVuc2UgPSB2bm9kZS5zdXNwZW5zZTtcbiAgICB2bm9kZSA9IHN1c3BlbnNlLmFjdGl2ZUJyYW5jaDtcbiAgICBpZiAoc3VzcGVuc2UucGVuZGluZ0JyYW5jaCAmJiAhc3VzcGVuc2UuaXNIeWRyYXRpbmcpIHtcbiAgICAgIHN1c3BlbnNlLmVmZmVjdHMucHVzaCgoKSA9PiB7XG4gICAgICAgIHNldFZhcnNPblZOb2RlKHN1c3BlbnNlLmFjdGl2ZUJyYW5jaCwgdmFycyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKHZub2RlLmNvbXBvbmVudCkge1xuICAgIHZub2RlID0gdm5vZGUuY29tcG9uZW50LnN1YlRyZWU7XG4gIH1cbiAgaWYgKHZub2RlLnNoYXBlRmxhZyAmIDEgJiYgdm5vZGUuZWwpIHtcbiAgICBzZXRWYXJzT25Ob2RlKHZub2RlLmVsLCB2YXJzKTtcbiAgfSBlbHNlIGlmICh2bm9kZS50eXBlID09PSBGcmFnbWVudCkge1xuICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHNldFZhcnNPblZOb2RlKGMsIHZhcnMpKTtcbiAgfSBlbHNlIGlmICh2bm9kZS50eXBlID09PSBTdGF0aWMpIHtcbiAgICBsZXQgeyBlbCwgYW5jaG9yIH0gPSB2bm9kZTtcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgIHNldFZhcnNPbk5vZGUoZWwsIHZhcnMpO1xuICAgICAgaWYgKGVsID09PSBhbmNob3IpIGJyZWFrO1xuICAgICAgZWwgPSBlbC5uZXh0U2libGluZztcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHNldFZhcnNPbk5vZGUoZWwsIHZhcnMpIHtcbiAgaWYgKGVsLm5vZGVUeXBlID09PSAxKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBlbC5zdHlsZTtcbiAgICBsZXQgY3NzVGV4dCA9IFwiXCI7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdmFycykge1xuICAgICAgY29uc3QgdmFsdWUgPSBub3JtYWxpemVDc3NWYXJWYWx1ZSh2YXJzW2tleV0pO1xuICAgICAgc3R5bGUuc2V0UHJvcGVydHkoYC0tJHtrZXl9YCwgdmFsdWUpO1xuICAgICAgY3NzVGV4dCArPSBgLS0ke2tleX06ICR7dmFsdWV9O2A7XG4gICAgfVxuICAgIHN0eWxlW0NTU19WQVJfVEVYVF0gPSBjc3NUZXh0O1xuICB9XG59XG5cbmNvbnN0IGRpc3BsYXlSRSA9IC8oXnw7KVxccypkaXNwbGF5XFxzKjovO1xuZnVuY3Rpb24gcGF0Y2hTdHlsZShlbCwgcHJldiwgbmV4dCkge1xuICBjb25zdCBzdHlsZSA9IGVsLnN0eWxlO1xuICBjb25zdCBpc0Nzc1N0cmluZyA9IGlzU3RyaW5nKG5leHQpO1xuICBsZXQgaGFzQ29udHJvbGxlZERpc3BsYXkgPSBmYWxzZTtcbiAgaWYgKG5leHQgJiYgIWlzQ3NzU3RyaW5nKSB7XG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGlmICghaXNTdHJpbmcocHJldikpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJldikge1xuICAgICAgICAgIGlmIChuZXh0W2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgc2V0U3R5bGUoc3R5bGUsIGtleSwgXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHByZXZTdHlsZSBvZiBwcmV2LnNwbGl0KFwiO1wiKSkge1xuICAgICAgICAgIGNvbnN0IGtleSA9IHByZXZTdHlsZS5zbGljZSgwLCBwcmV2U3R5bGUuaW5kZXhPZihcIjpcIikpLnRyaW0oKTtcbiAgICAgICAgICBpZiAobmV4dFtrZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIHNldFN0eWxlKHN0eWxlLCBrZXksIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuZXh0KSB7XG4gICAgICBpZiAoa2V5ID09PSBcImRpc3BsYXlcIikge1xuICAgICAgICBoYXNDb250cm9sbGVkRGlzcGxheSA9IHRydWU7XG4gICAgICB9XG4gICAgICBzZXRTdHlsZShzdHlsZSwga2V5LCBuZXh0W2tleV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNDc3NTdHJpbmcpIHtcbiAgICAgIGlmIChwcmV2ICE9PSBuZXh0KSB7XG4gICAgICAgIGNvbnN0IGNzc1ZhclRleHQgPSBzdHlsZVtDU1NfVkFSX1RFWFRdO1xuICAgICAgICBpZiAoY3NzVmFyVGV4dCkge1xuICAgICAgICAgIG5leHQgKz0gXCI7XCIgKyBjc3NWYXJUZXh0O1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlLmNzc1RleHQgPSBuZXh0O1xuICAgICAgICBoYXNDb250cm9sbGVkRGlzcGxheSA9IGRpc3BsYXlSRS50ZXN0KG5leHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJldikge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgfVxuICB9XG4gIGlmICh2U2hvd09yaWdpbmFsRGlzcGxheSBpbiBlbCkge1xuICAgIGVsW3ZTaG93T3JpZ2luYWxEaXNwbGF5XSA9IGhhc0NvbnRyb2xsZWREaXNwbGF5ID8gc3R5bGUuZGlzcGxheSA6IFwiXCI7XG4gICAgaWYgKGVsW3ZTaG93SGlkZGVuXSkge1xuICAgICAgc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfVxufVxuY29uc3Qgc2VtaWNvbG9uUkUgPSAvW15cXFxcXTtcXHMqJC87XG5jb25zdCBpbXBvcnRhbnRSRSA9IC9cXHMqIWltcG9ydGFudCQvO1xuZnVuY3Rpb24gc2V0U3R5bGUoc3R5bGUsIG5hbWUsIHZhbCkge1xuICBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgdmFsLmZvckVhY2goKHYpID0+IHNldFN0eWxlKHN0eWxlLCBuYW1lLCB2KSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB2YWwgPSBcIlwiO1xuICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICBpZiAoc2VtaWNvbG9uUkUudGVzdCh2YWwpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgYFVuZXhwZWN0ZWQgc2VtaWNvbG9uIGF0IHRoZSBlbmQgb2YgJyR7bmFtZX0nIHN0eWxlIHZhbHVlOiAnJHt2YWx9J2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5hbWUuc3RhcnRzV2l0aChcIi0tXCIpKSB7XG4gICAgICBzdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmVmaXhlZCA9IGF1dG9QcmVmaXgoc3R5bGUsIG5hbWUpO1xuICAgICAgaWYgKGltcG9ydGFudFJFLnRlc3QodmFsKSkge1xuICAgICAgICBzdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBoeXBoZW5hdGUocHJlZml4ZWQpLFxuICAgICAgICAgIHZhbC5yZXBsYWNlKGltcG9ydGFudFJFLCBcIlwiKSxcbiAgICAgICAgICBcImltcG9ydGFudFwiXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVtwcmVmaXhlZF0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5jb25zdCBwcmVmaXhlcyA9IFtcIldlYmtpdFwiLCBcIk1velwiLCBcIm1zXCJdO1xuY29uc3QgcHJlZml4Q2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGF1dG9QcmVmaXgoc3R5bGUsIHJhd05hbWUpIHtcbiAgY29uc3QgY2FjaGVkID0gcHJlZml4Q2FjaGVbcmF3TmFtZV07XG4gIGlmIChjYWNoZWQpIHtcbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG4gIGxldCBuYW1lID0gY2FtZWxpemUocmF3TmFtZSk7XG4gIGlmIChuYW1lICE9PSBcImZpbHRlclwiICYmIG5hbWUgaW4gc3R5bGUpIHtcbiAgICByZXR1cm4gcHJlZml4Q2FjaGVbcmF3TmFtZV0gPSBuYW1lO1xuICB9XG4gIG5hbWUgPSBjYXBpdGFsaXplKG5hbWUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJlZml4ZWQgPSBwcmVmaXhlc1tpXSArIG5hbWU7XG4gICAgaWYgKHByZWZpeGVkIGluIHN0eWxlKSB7XG4gICAgICByZXR1cm4gcHJlZml4Q2FjaGVbcmF3TmFtZV0gPSBwcmVmaXhlZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhd05hbWU7XG59XG5cbmNvbnN0IHhsaW5rTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIjtcbmZ1bmN0aW9uIHBhdGNoQXR0cihlbCwga2V5LCB2YWx1ZSwgaXNTVkcsIGluc3RhbmNlLCBpc0Jvb2xlYW4gPSBpc1NwZWNpYWxCb29sZWFuQXR0cihrZXkpKSB7XG4gIGlmIChpc1NWRyAmJiBrZXkuc3RhcnRzV2l0aChcInhsaW5rOlwiKSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXkuc2xpY2UoNiwga2V5Lmxlbmd0aCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgaXNCb29sZWFuICYmICFpbmNsdWRlQm9vbGVhbkF0dHIodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFxuICAgICAgICBrZXksXG4gICAgICAgIGlzQm9vbGVhbiA/IFwiXCIgOiBpc1N5bWJvbCh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogdmFsdWVcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoRE9NUHJvcChlbCwga2V5LCB2YWx1ZSwgcGFyZW50Q29tcG9uZW50LCBhdHRyTmFtZSkge1xuICBpZiAoa2V5ID09PSBcImlubmVySFRNTFwiIHx8IGtleSA9PT0gXCJ0ZXh0Q29udGVudFwiKSB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGVsW2tleV0gPSBrZXkgPT09IFwiaW5uZXJIVE1MXCIgPyB1bnNhZmVUb1RydXN0ZWRIVE1MKHZhbHVlKSA6IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdGFnID0gZWwudGFnTmFtZTtcbiAgaWYgKGtleSA9PT0gXCJ2YWx1ZVwiICYmIHRhZyAhPT0gXCJQUk9HUkVTU1wiICYmIC8vIGN1c3RvbSBlbGVtZW50cyBtYXkgdXNlIF92YWx1ZSBpbnRlcm5hbGx5XG4gICF0YWcuaW5jbHVkZXMoXCItXCIpKSB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0YWcgPT09IFwiT1BUSU9OXCIgPyBlbC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSB8fCBcIlwiIDogZWwudmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gKFxuICAgICAgLy8gIzExNjQ3OiB2YWx1ZSBzaG91bGQgYmUgc2V0IGFzIGVtcHR5IHN0cmluZyBmb3IgbnVsbCBhbmQgdW5kZWZpbmVkLFxuICAgICAgLy8gYnV0IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4gc2hvdWxkIGJlIHNldCBhcyAnb24nLlxuICAgICAgZWwudHlwZSA9PT0gXCJjaGVja2JveFwiID8gXCJvblwiIDogXCJcIlxuICAgICkgOiBTdHJpbmcodmFsdWUpO1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUgfHwgIShcIl92YWx1ZVwiIGluIGVsKSkge1xuICAgICAgZWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH1cbiAgICBlbC5fdmFsdWUgPSB2YWx1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IG5lZWRSZW1vdmUgPSBmYWxzZTtcbiAgaWYgKHZhbHVlID09PSBcIlwiIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIGVsW2tleV07XG4gICAgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICB2YWx1ZSA9IGluY2x1ZGVCb29sZWFuQXR0cih2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsICYmIHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgIG5lZWRSZW1vdmUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgdmFsdWUgPSAwO1xuICAgICAgbmVlZFJlbW92ZSA9IHRydWU7XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAgZWxba2V5XSA9IHZhbHVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIW5lZWRSZW1vdmUpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGBGYWlsZWQgc2V0dGluZyBwcm9wIFwiJHtrZXl9XCIgb24gPCR7dGFnLnRvTG93ZXJDYXNlKCl9PjogdmFsdWUgJHt2YWx1ZX0gaXMgaW52YWxpZC5gLFxuICAgICAgICBlXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBuZWVkUmVtb3ZlICYmIGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSB8fCBrZXkpO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKGVsLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZWwsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuY29uc3QgdmVpS2V5ID0gU3ltYm9sKFwiX3ZlaVwiKTtcbmZ1bmN0aW9uIHBhdGNoRXZlbnQoZWwsIHJhd05hbWUsIHByZXZWYWx1ZSwgbmV4dFZhbHVlLCBpbnN0YW5jZSA9IG51bGwpIHtcbiAgY29uc3QgaW52b2tlcnMgPSBlbFt2ZWlLZXldIHx8IChlbFt2ZWlLZXldID0ge30pO1xuICBjb25zdCBleGlzdGluZ0ludm9rZXIgPSBpbnZva2Vyc1tyYXdOYW1lXTtcbiAgaWYgKG5leHRWYWx1ZSAmJiBleGlzdGluZ0ludm9rZXIpIHtcbiAgICBleGlzdGluZ0ludm9rZXIudmFsdWUgPSAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpID8gc2FuaXRpemVFdmVudFZhbHVlKG5leHRWYWx1ZSwgcmF3TmFtZSkgOiBuZXh0VmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgW25hbWUsIG9wdGlvbnNdID0gcGFyc2VOYW1lKHJhd05hbWUpO1xuICAgIGlmIChuZXh0VmFsdWUpIHtcbiAgICAgIGNvbnN0IGludm9rZXIgPSBpbnZva2Vyc1tyYXdOYW1lXSA9IGNyZWF0ZUludm9rZXIoXG4gICAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgPyBzYW5pdGl6ZUV2ZW50VmFsdWUobmV4dFZhbHVlLCByYXdOYW1lKSA6IG5leHRWYWx1ZSxcbiAgICAgICAgaW5zdGFuY2VcbiAgICAgICk7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBuYW1lLCBpbnZva2VyLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKGV4aXN0aW5nSW52b2tlcikge1xuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihlbCwgbmFtZSwgZXhpc3RpbmdJbnZva2VyLCBvcHRpb25zKTtcbiAgICAgIGludm9rZXJzW3Jhd05hbWVdID0gdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuY29uc3Qgb3B0aW9uc01vZGlmaWVyUkUgPSAvKD86T25jZXxQYXNzaXZlfENhcHR1cmUpJC87XG5mdW5jdGlvbiBwYXJzZU5hbWUobmFtZSkge1xuICBsZXQgb3B0aW9ucztcbiAgaWYgKG9wdGlvbnNNb2RpZmllclJFLnRlc3QobmFtZSkpIHtcbiAgICBvcHRpb25zID0ge307XG4gICAgbGV0IG07XG4gICAgd2hpbGUgKG0gPSBuYW1lLm1hdGNoKG9wdGlvbnNNb2RpZmllclJFKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgbmFtZS5sZW5ndGggLSBtWzBdLmxlbmd0aCk7XG4gICAgICBvcHRpb25zW21bMF0udG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuICBjb25zdCBldmVudCA9IG5hbWVbMl0gPT09IFwiOlwiID8gbmFtZS5zbGljZSgzKSA6IGh5cGhlbmF0ZShuYW1lLnNsaWNlKDIpKTtcbiAgcmV0dXJuIFtldmVudCwgb3B0aW9uc107XG59XG5sZXQgY2FjaGVkTm93ID0gMDtcbmNvbnN0IHAgPSAvKiBAX19QVVJFX18gKi8gUHJvbWlzZS5yZXNvbHZlKCk7XG5jb25zdCBnZXROb3cgPSAoKSA9PiBjYWNoZWROb3cgfHwgKHAudGhlbigoKSA9PiBjYWNoZWROb3cgPSAwKSwgY2FjaGVkTm93ID0gRGF0ZS5ub3coKSk7XG5mdW5jdGlvbiBjcmVhdGVJbnZva2VyKGluaXRpYWxWYWx1ZSwgaW5zdGFuY2UpIHtcbiAgY29uc3QgaW52b2tlciA9IChlKSA9PiB7XG4gICAgaWYgKCFlLl92dHMpIHtcbiAgICAgIGUuX3Z0cyA9IERhdGUubm93KCk7XG4gICAgfSBlbHNlIGlmIChlLl92dHMgPD0gaW52b2tlci5hdHRhY2hlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsV2l0aEFzeW5jRXJyb3JIYW5kbGluZyhcbiAgICAgIHBhdGNoU3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKGUsIGludm9rZXIudmFsdWUpLFxuICAgICAgaW5zdGFuY2UsXG4gICAgICA1LFxuICAgICAgW2VdXG4gICAgKTtcbiAgfTtcbiAgaW52b2tlci52YWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgaW52b2tlci5hdHRhY2hlZCA9IGdldE5vdygpO1xuICByZXR1cm4gaW52b2tlcjtcbn1cbmZ1bmN0aW9uIHNhbml0aXplRXZlbnRWYWx1ZSh2YWx1ZSwgcHJvcE5hbWUpIHtcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHdhcm4oXG4gICAgYFdyb25nIHR5cGUgcGFzc2VkIGFzIGV2ZW50IGhhbmRsZXIgdG8gJHtwcm9wTmFtZX0gLSBkaWQgeW91IGZvcmdldCBAIG9yIDogaW4gZnJvbnQgb2YgeW91ciBwcm9wP1xuRXhwZWN0ZWQgZnVuY3Rpb24gb3IgYXJyYXkgb2YgZnVuY3Rpb25zLCByZWNlaXZlZCB0eXBlICR7dHlwZW9mIHZhbHVlfS5gXG4gICk7XG4gIHJldHVybiBOT09QO1xufVxuZnVuY3Rpb24gcGF0Y2hTdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oZSwgdmFsdWUpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxTdG9wID0gZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb247XG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSAoKSA9PiB7XG4gICAgICBvcmlnaW5hbFN0b3AuY2FsbChlKTtcbiAgICAgIGUuX3N0b3BwZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIHZhbHVlLm1hcChcbiAgICAgIChmbikgPT4gKGUyKSA9PiAhZTIuX3N0b3BwZWQgJiYgZm4gJiYgZm4oZTIpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuY29uc3QgaXNOYXRpdmVPbiA9IChrZXkpID0+IGtleS5jaGFyQ29kZUF0KDApID09PSAxMTEgJiYga2V5LmNoYXJDb2RlQXQoMSkgPT09IDExMCAmJiAvLyBsb3dlcmNhc2UgbGV0dGVyXG5rZXkuY2hhckNvZGVBdCgyKSA+IDk2ICYmIGtleS5jaGFyQ29kZUF0KDIpIDwgMTIzO1xuY29uc3QgcGF0Y2hQcm9wID0gKGVsLCBrZXksIHByZXZWYWx1ZSwgbmV4dFZhbHVlLCBuYW1lc3BhY2UsIHBhcmVudENvbXBvbmVudCkgPT4ge1xuICBjb25zdCBpc1NWRyA9IG5hbWVzcGFjZSA9PT0gXCJzdmdcIjtcbiAgaWYgKGtleSA9PT0gXCJjbGFzc1wiKSB7XG4gICAgcGF0Y2hDbGFzcyhlbCwgbmV4dFZhbHVlLCBpc1NWRyk7XG4gIH0gZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHtcbiAgICBwYXRjaFN0eWxlKGVsLCBwcmV2VmFsdWUsIG5leHRWYWx1ZSk7XG4gIH0gZWxzZSBpZiAoaXNPbihrZXkpKSB7XG4gICAgaWYgKCFpc01vZGVsTGlzdGVuZXIoa2V5KSkge1xuICAgICAgcGF0Y2hFdmVudChlbCwga2V5LCBwcmV2VmFsdWUsIG5leHRWYWx1ZSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoa2V5WzBdID09PSBcIi5cIiA/IChrZXkgPSBrZXkuc2xpY2UoMSksIHRydWUpIDoga2V5WzBdID09PSBcIl5cIiA/IChrZXkgPSBrZXkuc2xpY2UoMSksIGZhbHNlKSA6IHNob3VsZFNldEFzUHJvcChlbCwga2V5LCBuZXh0VmFsdWUsIGlzU1ZHKSkge1xuICAgIHBhdGNoRE9NUHJvcChlbCwga2V5LCBuZXh0VmFsdWUpO1xuICAgIGlmICghZWwudGFnTmFtZS5pbmNsdWRlcyhcIi1cIikgJiYgKGtleSA9PT0gXCJ2YWx1ZVwiIHx8IGtleSA9PT0gXCJjaGVja2VkXCIgfHwga2V5ID09PSBcInNlbGVjdGVkXCIpKSB7XG4gICAgICBwYXRjaEF0dHIoZWwsIGtleSwgbmV4dFZhbHVlLCBpc1NWRywgcGFyZW50Q29tcG9uZW50LCBrZXkgIT09IFwidmFsdWVcIik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFxuICAgIC8vICMxMTA4MSBmb3JjZSBzZXQgcHJvcHMgZm9yIHBvc3NpYmxlIGFzeW5jIGN1c3RvbSBlbGVtZW50XG4gICAgZWwuX2lzVnVlQ0UgJiYgKC9bQS1aXS8udGVzdChrZXkpIHx8ICFpc1N0cmluZyhuZXh0VmFsdWUpKVxuICApIHtcbiAgICBwYXRjaERPTVByb3AoZWwsIGNhbWVsaXplJDEoa2V5KSwgbmV4dFZhbHVlLCBwYXJlbnRDb21wb25lbnQsIGtleSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleSA9PT0gXCJ0cnVlLXZhbHVlXCIpIHtcbiAgICAgIGVsLl90cnVlVmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiZmFsc2UtdmFsdWVcIikge1xuICAgICAgZWwuX2ZhbHNlVmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgfVxuICAgIHBhdGNoQXR0cihlbCwga2V5LCBuZXh0VmFsdWUsIGlzU1ZHKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHNob3VsZFNldEFzUHJvcChlbCwga2V5LCB2YWx1ZSwgaXNTVkcpIHtcbiAgaWYgKGlzU1ZHKSB7XG4gICAgaWYgKGtleSA9PT0gXCJpbm5lckhUTUxcIiB8fCBrZXkgPT09IFwidGV4dENvbnRlbnRcIikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChrZXkgaW4gZWwgJiYgaXNOYXRpdmVPbihrZXkpICYmIGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChrZXkgPT09IFwic3BlbGxjaGVja1wiIHx8IGtleSA9PT0gXCJkcmFnZ2FibGVcIiB8fCBrZXkgPT09IFwidHJhbnNsYXRlXCIgfHwga2V5ID09PSBcImF1dG9jb3JyZWN0XCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGtleSA9PT0gXCJmb3JtXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGtleSA9PT0gXCJsaXN0XCIgJiYgZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChrZXkgPT09IFwidHlwZVwiICYmIGVsLnRhZ05hbWUgPT09IFwiVEVYVEFSRUFcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoa2V5ID09PSBcIndpZHRoXCIgfHwga2V5ID09PSBcImhlaWdodFwiKSB7XG4gICAgY29uc3QgdGFnID0gZWwudGFnTmFtZTtcbiAgICBpZiAodGFnID09PSBcIklNR1wiIHx8IHRhZyA9PT0gXCJWSURFT1wiIHx8IHRhZyA9PT0gXCJDQU5WQVNcIiB8fCB0YWcgPT09IFwiU09VUkNFXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzTmF0aXZlT24oa2V5KSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGtleSBpbiBlbDtcbn1cblxuY29uc3QgUkVNT1ZBTCA9IHt9O1xuLyohICNfX05PX1NJREVfRUZGRUNUU19fICovXG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gZGVmaW5lQ3VzdG9tRWxlbWVudChvcHRpb25zLCBleHRyYU9wdGlvbnMsIF9jcmVhdGVBcHApIHtcbiAgY29uc3QgQ29tcCA9IGRlZmluZUNvbXBvbmVudChvcHRpb25zLCBleHRyYU9wdGlvbnMpO1xuICBpZiAoaXNQbGFpbk9iamVjdChDb21wKSkgZXh0ZW5kKENvbXAsIGV4dHJhT3B0aW9ucyk7XG4gIGNsYXNzIFZ1ZUN1c3RvbUVsZW1lbnQgZXh0ZW5kcyBWdWVFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsUHJvcHMpIHtcbiAgICAgIHN1cGVyKENvbXAsIGluaXRpYWxQcm9wcywgX2NyZWF0ZUFwcCk7XG4gICAgfVxuICB9XG4gIFZ1ZUN1c3RvbUVsZW1lbnQuZGVmID0gQ29tcDtcbiAgcmV0dXJuIFZ1ZUN1c3RvbUVsZW1lbnQ7XG59XG5cbmNvbnN0IGRlZmluZVNTUkN1c3RvbUVsZW1lbnQgPSAoLyogQF9fTk9fU0lERV9FRkZFQ1RTX18gKi8gKG9wdGlvbnMsIGV4dHJhT3B0aW9ucykgPT4ge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGRlZmluZUN1c3RvbUVsZW1lbnQob3B0aW9ucywgZXh0cmFPcHRpb25zLCBjcmVhdGVTU1JBcHApO1xufSk7XG5jb25zdCBCYXNlQ2xhc3MgPSB0eXBlb2YgSFRNTEVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBIVE1MRWxlbWVudCA6IGNsYXNzIHtcbn07XG5jbGFzcyBWdWVFbGVtZW50IGV4dGVuZHMgQmFzZUNsYXNzIHtcbiAgY29uc3RydWN0b3IoX2RlZiwgX3Byb3BzID0ge30sIF9jcmVhdGVBcHAgPSBjcmVhdGVBcHApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RlZiA9IF9kZWY7XG4gICAgdGhpcy5fcHJvcHMgPSBfcHJvcHM7XG4gICAgdGhpcy5fY3JlYXRlQXBwID0gX2NyZWF0ZUFwcDtcbiAgICB0aGlzLl9pc1Z1ZUNFID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdGhpcy5fYXBwID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB0aGlzLl9ub25jZSA9IHRoaXMuX2RlZi5ub25jZTtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9yZXNvbHZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX251bWJlclByb3BzID0gbnVsbDtcbiAgICB0aGlzLl9zdHlsZUNoaWxkcmVuID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrU2V0KCk7XG4gICAgdGhpcy5fb2IgPSBudWxsO1xuICAgIGlmICh0aGlzLnNoYWRvd1Jvb3QgJiYgX2NyZWF0ZUFwcCAhPT0gY3JlYXRlQXBwKSB7XG4gICAgICB0aGlzLl9yb290ID0gdGhpcy5zaGFkb3dSb290O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBgQ3VzdG9tIGVsZW1lbnQgaGFzIHByZS1yZW5kZXJlZCBkZWNsYXJhdGl2ZSBzaGFkb3cgcm9vdCBidXQgaXMgbm90IGRlZmluZWQgYXMgaHlkcmF0YWJsZS4gVXNlIFxcYGRlZmluZVNTUkN1c3RvbUVsZW1lbnRcXGAuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKF9kZWYuc2hhZG93Um9vdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICAgICAgdGhpcy5fcm9vdCA9IHRoaXMuc2hhZG93Um9vdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAoIXRoaXMuaXNDb25uZWN0ZWQpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuc2hhZG93Um9vdCAmJiAhdGhpcy5fcmVzb2x2ZWQpIHtcbiAgICAgIHRoaXMuX3BhcnNlU2xvdHMoKTtcbiAgICB9XG4gICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZTtcbiAgICBsZXQgcGFyZW50ID0gdGhpcztcbiAgICB3aGlsZSAocGFyZW50ID0gcGFyZW50ICYmIChwYXJlbnQucGFyZW50Tm9kZSB8fCBwYXJlbnQuaG9zdCkpIHtcbiAgICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBWdWVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIGlmICh0aGlzLl9yZXNvbHZlZCkge1xuICAgICAgICB0aGlzLl9tb3VudCh0aGlzLl9kZWYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuX3BlbmRpbmdSZXNvbHZlKSB7XG4gICAgICAgICAgdGhpcy5fcGVuZGluZ1Jlc29sdmUgPSBwYXJlbnQuX3BlbmRpbmdSZXNvbHZlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1Jlc29sdmUgPSB2b2lkIDA7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlRGVmKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVzb2x2ZURlZigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9zZXRQYXJlbnQocGFyZW50ID0gdGhpcy5fcGFyZW50KSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5faW5zdGFuY2UucGFyZW50ID0gcGFyZW50Ll9pbnN0YW5jZTtcbiAgICAgIHRoaXMuX2luaGVyaXRQYXJlbnRDb250ZXh0KHBhcmVudCk7XG4gICAgfVxuICB9XG4gIF9pbmhlcml0UGFyZW50Q29udGV4dChwYXJlbnQgPSB0aGlzLl9wYXJlbnQpIHtcbiAgICBpZiAocGFyZW50ICYmIHRoaXMuX2FwcCkge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKFxuICAgICAgICB0aGlzLl9hcHAuX2NvbnRleHQucHJvdmlkZXMsXG4gICAgICAgIHBhcmVudC5faW5zdGFuY2UucHJvdmlkZXNcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fY29ubmVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLl9vYikge1xuICAgICAgICAgIHRoaXMuX29iLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICB0aGlzLl9vYiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXBwICYmIHRoaXMuX2FwcC51bm1vdW50KCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkgdGhpcy5faW5zdGFuY2UuY2UgPSB2b2lkIDA7XG4gICAgICAgIHRoaXMuX2FwcCA9IHRoaXMuX2luc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogcmVzb2x2ZSBpbm5lciBjb21wb25lbnQgZGVmaW5pdGlvbiAoaGFuZGxlIHBvc3NpYmxlIGFzeW5jIGNvbXBvbmVudClcbiAgICovXG4gIF9yZXNvbHZlRGVmKCkge1xuICAgIGlmICh0aGlzLl9wZW5kaW5nUmVzb2x2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fc2V0QXR0cih0aGlzLmF0dHJpYnV0ZXNbaV0ubmFtZSk7XG4gICAgfVxuICAgIHRoaXMuX29iID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgZm9yIChjb25zdCBtIG9mIG11dGF0aW9ucykge1xuICAgICAgICB0aGlzLl9zZXRBdHRyKG0uYXR0cmlidXRlTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fb2Iub2JzZXJ2ZSh0aGlzLCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gICAgY29uc3QgcmVzb2x2ZSA9IChkZWYsIGlzQXN5bmMgPSBmYWxzZSkgPT4ge1xuICAgICAgdGhpcy5fcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcGVuZGluZ1Jlc29sdmUgPSB2b2lkIDA7XG4gICAgICBjb25zdCB7IHByb3BzLCBzdHlsZXMgfSA9IGRlZjtcbiAgICAgIGxldCBudW1iZXJQcm9wcztcbiAgICAgIGlmIChwcm9wcyAmJiAhaXNBcnJheShwcm9wcykpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICBjb25zdCBvcHQgPSBwcm9wc1trZXldO1xuICAgICAgICAgIGlmIChvcHQgPT09IE51bWJlciB8fCBvcHQgJiYgb3B0LnR5cGUgPT09IE51bWJlcikge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9wcm9wcykge1xuICAgICAgICAgICAgICB0aGlzLl9wcm9wc1trZXldID0gdG9OdW1iZXIodGhpcy5fcHJvcHNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAobnVtYmVyUHJvcHMgfHwgKG51bWJlclByb3BzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCkpKVtjYW1lbGl6ZSQxKGtleSldID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX251bWJlclByb3BzID0gbnVtYmVyUHJvcHM7XG4gICAgICB0aGlzLl9yZXNvbHZlUHJvcHMoZGVmKTtcbiAgICAgIGlmICh0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlTdHlsZXMoc3R5bGVzKTtcbiAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBzdHlsZXMpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBcIkN1c3RvbSBlbGVtZW50IHN0eWxlIGluamVjdGlvbiBpcyBub3Qgc3VwcG9ydGVkIHdoZW4gdXNpbmcgc2hhZG93Um9vdDogZmFsc2VcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5fbW91bnQoZGVmKTtcbiAgICB9O1xuICAgIGNvbnN0IGFzeW5jRGVmID0gdGhpcy5fZGVmLl9fYXN5bmNMb2FkZXI7XG4gICAgaWYgKGFzeW5jRGVmKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nUmVzb2x2ZSA9IGFzeW5jRGVmKCkudGhlbigoZGVmKSA9PiB7XG4gICAgICAgIGRlZi5jb25maWd1cmVBcHAgPSB0aGlzLl9kZWYuY29uZmlndXJlQXBwO1xuICAgICAgICByZXNvbHZlKHRoaXMuX2RlZiA9IGRlZiwgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZSh0aGlzLl9kZWYpO1xuICAgIH1cbiAgfVxuICBfbW91bnQoZGVmKSB7XG4gICAgaWYgKCghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiYgIWRlZi5uYW1lKSB7XG4gICAgICBkZWYubmFtZSA9IFwiVnVlRWxlbWVudFwiO1xuICAgIH1cbiAgICB0aGlzLl9hcHAgPSB0aGlzLl9jcmVhdGVBcHAoZGVmKTtcbiAgICB0aGlzLl9pbmhlcml0UGFyZW50Q29udGV4dCgpO1xuICAgIGlmIChkZWYuY29uZmlndXJlQXBwKSB7XG4gICAgICBkZWYuY29uZmlndXJlQXBwKHRoaXMuX2FwcCk7XG4gICAgfVxuICAgIHRoaXMuX2FwcC5fY2VWTm9kZSA9IHRoaXMuX2NyZWF0ZVZOb2RlKCk7XG4gICAgdGhpcy5fYXBwLm1vdW50KHRoaXMuX3Jvb3QpO1xuICAgIGNvbnN0IGV4cG9zZWQgPSB0aGlzLl9pbnN0YW5jZSAmJiB0aGlzLl9pbnN0YW5jZS5leHBvc2VkO1xuICAgIGlmICghZXhwb3NlZCkgcmV0dXJuO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGV4cG9zZWQpIHtcbiAgICAgIGlmICghaGFzT3duKHRoaXMsIGtleSkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICAgIC8vIHVud3JhcCByZWYgdG8gYmUgY29uc2lzdGVudCB3aXRoIHB1YmxpYyBpbnN0YW5jZSBiZWhhdmlvclxuICAgICAgICAgIGdldDogKCkgPT4gdW5yZWYoZXhwb3NlZFtrZXldKVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgICB3YXJuKGBFeHBvc2VkIHByb3BlcnR5IFwiJHtrZXl9XCIgYWxyZWFkeSBleGlzdHMgb24gY3VzdG9tIGVsZW1lbnQuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9yZXNvbHZlUHJvcHMoZGVmKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmO1xuICAgIGNvbnN0IGRlY2xhcmVkUHJvcEtleXMgPSBpc0FycmF5KHByb3BzKSA/IHByb3BzIDogT2JqZWN0LmtleXMocHJvcHMgfHwge30pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMpKSB7XG4gICAgICBpZiAoa2V5WzBdICE9PSBcIl9cIiAmJiBkZWNsYXJlZFByb3BLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgdGhpcy5fc2V0UHJvcChrZXksIHRoaXNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IG9mIGRlY2xhcmVkUHJvcEtleXMubWFwKGNhbWVsaXplJDEpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcChrZXkpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsKSB7XG4gICAgICAgICAgdGhpcy5fc2V0UHJvcChrZXksIHZhbCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBfc2V0QXR0cihrZXkpIHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJkYXRhLXYtXCIpKSByZXR1cm47XG4gICAgY29uc3QgaGFzID0gdGhpcy5oYXNBdHRyaWJ1dGUoa2V5KTtcbiAgICBsZXQgdmFsdWUgPSBoYXMgPyB0aGlzLmdldEF0dHJpYnV0ZShrZXkpIDogUkVNT1ZBTDtcbiAgICBjb25zdCBjYW1lbEtleSA9IGNhbWVsaXplJDEoa2V5KTtcbiAgICBpZiAoaGFzICYmIHRoaXMuX251bWJlclByb3BzICYmIHRoaXMuX251bWJlclByb3BzW2NhbWVsS2V5XSkge1xuICAgICAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX3NldFByb3AoY2FtZWxLZXksIHZhbHVlLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2dldFByb3Aoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzW2tleV07XG4gIH1cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3NldFByb3Aoa2V5LCB2YWwsIHNob3VsZFJlZmxlY3QgPSB0cnVlLCBzaG91bGRVcGRhdGUgPSBmYWxzZSkge1xuICAgIGlmICh2YWwgIT09IHRoaXMuX3Byb3BzW2tleV0pIHtcbiAgICAgIGlmICh2YWwgPT09IFJFTU9WQUwpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3Byb3BzW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9wcm9wc1trZXldID0gdmFsO1xuICAgICAgICBpZiAoa2V5ID09PSBcImtleVwiICYmIHRoaXMuX2FwcCkge1xuICAgICAgICAgIHRoaXMuX2FwcC5fY2VWTm9kZS5rZXkgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzaG91bGRVcGRhdGUgJiYgdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvdWxkUmVmbGVjdCkge1xuICAgICAgICBjb25zdCBvYiA9IHRoaXMuX29iO1xuICAgICAgICBvYiAmJiBvYi5kaXNjb25uZWN0KCk7XG4gICAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShoeXBoZW5hdGUoa2V5KSwgXCJcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoaHlwaGVuYXRlKGtleSksIHZhbCArIFwiXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWwpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShoeXBoZW5hdGUoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgb2IgJiYgb2Iub2JzZXJ2ZSh0aGlzLCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF91cGRhdGUoKSB7XG4gICAgY29uc3Qgdm5vZGUgPSB0aGlzLl9jcmVhdGVWTm9kZSgpO1xuICAgIGlmICh0aGlzLl9hcHApIHZub2RlLmFwcENvbnRleHQgPSB0aGlzLl9hcHAuX2NvbnRleHQ7XG4gICAgcmVuZGVyKHZub2RlLCB0aGlzLl9yb290KTtcbiAgfVxuICBfY3JlYXRlVk5vZGUoKSB7XG4gICAgY29uc3QgYmFzZVByb3BzID0ge307XG4gICAgaWYgKCF0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgIGJhc2VQcm9wcy5vblZub2RlTW91bnRlZCA9IGJhc2VQcm9wcy5vblZub2RlVXBkYXRlZCA9IHRoaXMuX3JlbmRlclNsb3RzLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIGNvbnN0IHZub2RlID0gY3JlYXRlVk5vZGUodGhpcy5fZGVmLCBleHRlbmQoYmFzZVByb3BzLCB0aGlzLl9wcm9wcykpO1xuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIHZub2RlLmNlID0gKGluc3RhbmNlKSA9PiB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgIGluc3RhbmNlLmNlID0gdGhpcztcbiAgICAgICAgaW5zdGFuY2UuaXNDRSA9IHRydWU7XG4gICAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgICAgaW5zdGFuY2UuY2VSZWxvYWQgPSAobmV3U3R5bGVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3R5bGVzKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3N0eWxlcy5mb3JFYWNoKChzKSA9PiB0aGlzLl9yb290LnJlbW92ZUNoaWxkKHMpKTtcbiAgICAgICAgICAgICAgdGhpcy5fc3R5bGVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVN0eWxlcyhuZXdTdHlsZXMpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IChldmVudCwgYXJncykgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIGlzUGxhaW5PYmplY3QoYXJnc1swXSkgPyBleHRlbmQoeyBkZXRhaWw6IGFyZ3MgfSwgYXJnc1swXSkgOiB7IGRldGFpbDogYXJncyB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW5zdGFuY2UuZW1pdCA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgICAgIGRpc3BhdGNoKGV2ZW50LCBhcmdzKTtcbiAgICAgICAgICBpZiAoaHlwaGVuYXRlKGV2ZW50KSAhPT0gZXZlbnQpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKGh5cGhlbmF0ZShldmVudCksIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2V0UGFyZW50KCk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGU7XG4gIH1cbiAgX2FwcGx5U3R5bGVzKHN0eWxlcywgb3duZXIpIHtcbiAgICBpZiAoIXN0eWxlcykgcmV0dXJuO1xuICAgIGlmIChvd25lcikge1xuICAgICAgaWYgKG93bmVyID09PSB0aGlzLl9kZWYgfHwgdGhpcy5fc3R5bGVDaGlsZHJlbi5oYXMob3duZXIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3N0eWxlQ2hpbGRyZW4uYWRkKG93bmVyKTtcbiAgICB9XG4gICAgY29uc3Qgbm9uY2UgPSB0aGlzLl9ub25jZTtcbiAgICBmb3IgKGxldCBpID0gc3R5bGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgaWYgKG5vbmNlKSBzLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgICAgIHMudGV4dENvbnRlbnQgPSBzdHlsZXNbaV07XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucHJlcGVuZChzKTtcbiAgICAgIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICAgIGlmIChvd25lcikge1xuICAgICAgICAgIGlmIChvd25lci5fX2htcklkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NoaWxkU3R5bGVzKSB0aGlzLl9jaGlsZFN0eWxlcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgICAgICAgICBsZXQgZW50cnkgPSB0aGlzLl9jaGlsZFN0eWxlcy5nZXQob3duZXIuX19obXJJZCk7XG4gICAgICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NoaWxkU3R5bGVzLnNldChvd25lci5fX2htcklkLCBlbnRyeSA9IFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudHJ5LnB1c2gocyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICh0aGlzLl9zdHlsZXMgfHwgKHRoaXMuX3N0eWxlcyA9IFtdKSkucHVzaChzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogT25seSBjYWxsZWQgd2hlbiBzaGFkb3dSb290IGlzIGZhbHNlXG4gICAqL1xuICBfcGFyc2VTbG90cygpIHtcbiAgICBjb25zdCBzbG90cyA9IHRoaXMuX3Nsb3RzID0ge307XG4gICAgbGV0IG47XG4gICAgd2hpbGUgKG4gPSB0aGlzLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGNvbnN0IHNsb3ROYW1lID0gbi5ub2RlVHlwZSA9PT0gMSAmJiBuLmdldEF0dHJpYnV0ZShcInNsb3RcIikgfHwgXCJkZWZhdWx0XCI7XG4gICAgICAoc2xvdHNbc2xvdE5hbWVdIHx8IChzbG90c1tzbG90TmFtZV0gPSBbXSkpLnB1c2gobik7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKG4pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogT25seSBjYWxsZWQgd2hlbiBzaGFkb3dSb290IGlzIGZhbHNlXG4gICAqL1xuICBfcmVuZGVyU2xvdHMoKSB7XG4gICAgY29uc3Qgb3V0bGV0cyA9ICh0aGlzLl90ZWxlcG9ydFRhcmdldCB8fCB0aGlzKS5xdWVyeVNlbGVjdG9yQWxsKFwic2xvdFwiKTtcbiAgICBjb25zdCBzY29wZUlkID0gdGhpcy5faW5zdGFuY2UudHlwZS5fX3Njb3BlSWQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvID0gb3V0bGV0c1tpXTtcbiAgICAgIGNvbnN0IHNsb3ROYW1lID0gby5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpIHx8IFwiZGVmYXVsdFwiO1xuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX3Nsb3RzW3Nsb3ROYW1lXTtcbiAgICAgIGNvbnN0IHBhcmVudCA9IG8ucGFyZW50Tm9kZTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIGZvciAoY29uc3QgbiBvZiBjb250ZW50KSB7XG4gICAgICAgICAgaWYgKHNjb3BlSWQgJiYgbi5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBzY29wZUlkICsgXCItc1wiO1xuICAgICAgICAgICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihuLCAxKTtcbiAgICAgICAgICAgIG4uc2V0QXR0cmlidXRlKGlkLCBcIlwiKTtcbiAgICAgICAgICAgIGxldCBjaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChjaGlsZCA9IHdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShpZCwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobiwgbyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChvLmZpcnN0Q2hpbGQpIHBhcmVudC5pbnNlcnRCZWZvcmUoby5maXJzdENoaWxkLCBvKTtcbiAgICAgIH1cbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2luamVjdENoaWxkU3R5bGUoY29tcCkge1xuICAgIHRoaXMuX2FwcGx5U3R5bGVzKGNvbXAuc3R5bGVzLCBjb21wKTtcbiAgfVxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfcmVtb3ZlQ2hpbGRTdHlsZShjb21wKSB7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHRoaXMuX3N0eWxlQ2hpbGRyZW4uZGVsZXRlKGNvbXApO1xuICAgICAgaWYgKHRoaXMuX2NoaWxkU3R5bGVzICYmIGNvbXAuX19obXJJZCkge1xuICAgICAgICBjb25zdCBvbGRTdHlsZXMgPSB0aGlzLl9jaGlsZFN0eWxlcy5nZXQoY29tcC5fX2htcklkKTtcbiAgICAgICAgaWYgKG9sZFN0eWxlcykge1xuICAgICAgICAgIG9sZFN0eWxlcy5mb3JFYWNoKChzKSA9PiB0aGlzLl9yb290LnJlbW92ZUNoaWxkKHMpKTtcbiAgICAgICAgICBvbGRTdHlsZXMubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdXNlSG9zdChjYWxsZXIpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgY29uc3QgZWwgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5jZTtcbiAgaWYgKGVsKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9IGVsc2UgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBgJHtjYWxsZXIgfHwgXCJ1c2VIb3N0XCJ9IGNhbGxlZCB3aXRob3V0IGFuIGFjdGl2ZSBjb21wb25lbnQgaW5zdGFuY2UuYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2FybihcbiAgICAgICAgYCR7Y2FsbGVyIHx8IFwidXNlSG9zdFwifSBjYW4gb25seSBiZSB1c2VkIGluIGNvbXBvbmVudHMgZGVmaW5lZCB2aWEgZGVmaW5lQ3VzdG9tRWxlbWVudC5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIHVzZVNoYWRvd1Jvb3QoKSB7XG4gIGNvbnN0IGVsID0gISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSA/IHVzZUhvc3QoXCJ1c2VTaGFkb3dSb290XCIpIDogdXNlSG9zdCgpO1xuICByZXR1cm4gZWwgJiYgZWwuc2hhZG93Um9vdDtcbn1cblxuZnVuY3Rpb24gdXNlQ3NzTW9kdWxlKG5hbWUgPSBcIiRzdHlsZVwiKSB7XG4gIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybihgdXNlQ3NzTW9kdWxlIG11c3QgYmUgY2FsbGVkIGluc2lkZSBzZXR1cCgpYCk7XG4gICAgICByZXR1cm4gRU1QVFlfT0JKO1xuICAgIH1cbiAgICBjb25zdCBtb2R1bGVzID0gaW5zdGFuY2UudHlwZS5fX2Nzc01vZHVsZXM7XG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4oYEN1cnJlbnQgaW5zdGFuY2UgZG9lcyBub3QgaGF2ZSBDU1MgbW9kdWxlcyBpbmplY3RlZC5gKTtcbiAgICAgIHJldHVybiBFTVBUWV9PQko7XG4gICAgfVxuICAgIGNvbnN0IG1vZCA9IG1vZHVsZXNbbmFtZV07XG4gICAgaWYgKCFtb2QpIHtcbiAgICAgICEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgd2FybihgQ3VycmVudCBpbnN0YW5jZSBkb2VzIG5vdCBoYXZlIENTUyBtb2R1bGUgbmFtZWQgXCIke25hbWV9XCIuYCk7XG4gICAgICByZXR1cm4gRU1QVFlfT0JKO1xuICAgIH1cbiAgICByZXR1cm4gbW9kO1xuICB9XG59XG5cbmNvbnN0IHBvc2l0aW9uTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG5jb25zdCBuZXdQb3NpdGlvbk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xuY29uc3QgbW92ZUNiS2V5ID0gU3ltYm9sKFwiX21vdmVDYlwiKTtcbmNvbnN0IGVudGVyQ2JLZXkgPSBTeW1ib2woXCJfZW50ZXJDYlwiKTtcbmNvbnN0IGRlY29yYXRlID0gKHQpID0+IHtcbiAgZGVsZXRlIHQucHJvcHMubW9kZTtcbiAgcmV0dXJuIHQ7XG59O1xuY29uc3QgVHJhbnNpdGlvbkdyb3VwSW1wbCA9IC8qIEBfX1BVUkVfXyAqLyBkZWNvcmF0ZSh7XG4gIG5hbWU6IFwiVHJhbnNpdGlvbkdyb3VwXCIsXG4gIHByb3BzOiAvKiBAX19QVVJFX18gKi8gZXh0ZW5kKHt9LCBUcmFuc2l0aW9uUHJvcHNWYWxpZGF0b3JzLCB7XG4gICAgdGFnOiBTdHJpbmcsXG4gICAgbW92ZUNsYXNzOiBTdHJpbmdcbiAgfSksXG4gIHNldHVwKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlVHJhbnNpdGlvblN0YXRlKCk7XG4gICAgbGV0IHByZXZDaGlsZHJlbjtcbiAgICBsZXQgY2hpbGRyZW47XG4gICAgb25VcGRhdGVkKCgpID0+IHtcbiAgICAgIGlmICghcHJldkNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtb3ZlQ2xhc3MgPSBwcm9wcy5tb3ZlQ2xhc3MgfHwgYCR7cHJvcHMubmFtZSB8fCBcInZcIn0tbW92ZWA7XG4gICAgICBpZiAoIWhhc0NTU1RyYW5zZm9ybShcbiAgICAgICAgcHJldkNoaWxkcmVuWzBdLmVsLFxuICAgICAgICBpbnN0YW5jZS52bm9kZS5lbCxcbiAgICAgICAgbW92ZUNsYXNzXG4gICAgICApKSB7XG4gICAgICAgIHByZXZDaGlsZHJlbiA9IFtdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwcmV2Q2hpbGRyZW4uZm9yRWFjaChjYWxsUGVuZGluZ0Nicyk7XG4gICAgICBwcmV2Q2hpbGRyZW4uZm9yRWFjaChyZWNvcmRQb3NpdGlvbik7XG4gICAgICBjb25zdCBtb3ZlZENoaWxkcmVuID0gcHJldkNoaWxkcmVuLmZpbHRlcihhcHBseVRyYW5zbGF0aW9uKTtcbiAgICAgIGZvcmNlUmVmbG93KCk7XG4gICAgICBtb3ZlZENoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBjLmVsO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsLnN0eWxlO1xuICAgICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XG4gICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiXCI7XG4gICAgICAgIGNvbnN0IGNiID0gZWxbbW92ZUNiS2V5XSA9IChlKSA9PiB7XG4gICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQgIT09IGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZSB8fCAvdHJhbnNmb3JtJC8udGVzdChlLnByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGNiKTtcbiAgICAgICAgICAgIGVsW21vdmVDYktleV0gPSBudWxsO1xuICAgICAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBtb3ZlQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgY2IpO1xuICAgICAgfSk7XG4gICAgICBwcmV2Q2hpbGRyZW4gPSBbXTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgcmF3UHJvcHMgPSB0b1Jhdyhwcm9wcyk7XG4gICAgICBjb25zdCBjc3NUcmFuc2l0aW9uUHJvcHMgPSByZXNvbHZlVHJhbnNpdGlvblByb3BzKHJhd1Byb3BzKTtcbiAgICAgIGxldCB0YWcgPSByYXdQcm9wcy50YWcgfHwgRnJhZ21lbnQ7XG4gICAgICBwcmV2Q2hpbGRyZW4gPSBbXTtcbiAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICBpZiAoY2hpbGQuZWwgJiYgY2hpbGQuZWwgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2Q2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBzZXRUcmFuc2l0aW9uSG9va3MoXG4gICAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgICByZXNvbHZlVHJhbnNpdGlvbkhvb2tzKFxuICAgICAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgICAgIGNzc1RyYW5zaXRpb25Qcm9wcyxcbiAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcG9zaXRpb25NYXAuc2V0KFxuICAgICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgICAgY2hpbGQuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGlsZHJlbiA9IHNsb3RzLmRlZmF1bHQgPyBnZXRUcmFuc2l0aW9uUmF3Q2hpbGRyZW4oc2xvdHMuZGVmYXVsdCgpKSA6IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2hpbGQua2V5ICE9IG51bGwpIHtcbiAgICAgICAgICBzZXRUcmFuc2l0aW9uSG9va3MoXG4gICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgIHJlc29sdmVUcmFuc2l0aW9uSG9va3MoY2hpbGQsIGNzc1RyYW5zaXRpb25Qcm9wcywgc3RhdGUsIGluc3RhbmNlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiBjaGlsZC50eXBlICE9PSBUZXh0KSB7XG4gICAgICAgICAgd2FybihgPFRyYW5zaXRpb25Hcm91cD4gY2hpbGRyZW4gbXVzdCBiZSBrZXllZC5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNyZWF0ZVZOb2RlKHRhZywgbnVsbCwgY2hpbGRyZW4pO1xuICAgIH07XG4gIH1cbn0pO1xuY29uc3QgVHJhbnNpdGlvbkdyb3VwID0gVHJhbnNpdGlvbkdyb3VwSW1wbDtcbmZ1bmN0aW9uIGNhbGxQZW5kaW5nQ2JzKGMpIHtcbiAgY29uc3QgZWwgPSBjLmVsO1xuICBpZiAoZWxbbW92ZUNiS2V5XSkge1xuICAgIGVsW21vdmVDYktleV0oKTtcbiAgfVxuICBpZiAoZWxbZW50ZXJDYktleV0pIHtcbiAgICBlbFtlbnRlckNiS2V5XSgpO1xuICB9XG59XG5mdW5jdGlvbiByZWNvcmRQb3NpdGlvbihjKSB7XG4gIG5ld1Bvc2l0aW9uTWFwLnNldChjLCBjLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbn1cbmZ1bmN0aW9uIGFwcGx5VHJhbnNsYXRpb24oYykge1xuICBjb25zdCBvbGRQb3MgPSBwb3NpdGlvbk1hcC5nZXQoYyk7XG4gIGNvbnN0IG5ld1BvcyA9IG5ld1Bvc2l0aW9uTWFwLmdldChjKTtcbiAgY29uc3QgZHggPSBvbGRQb3MubGVmdCAtIG5ld1Bvcy5sZWZ0O1xuICBjb25zdCBkeSA9IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wO1xuICBpZiAoZHggfHwgZHkpIHtcbiAgICBjb25zdCBzID0gYy5lbC5zdHlsZTtcbiAgICBzLnRyYW5zZm9ybSA9IHMud2Via2l0VHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke2R4fXB4LCR7ZHl9cHgpYDtcbiAgICBzLnRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMHNcIjtcbiAgICByZXR1cm4gYztcbiAgfVxufVxuZnVuY3Rpb24gaGFzQ1NTVHJhbnNmb3JtKGVsLCByb290LCBtb3ZlQ2xhc3MpIHtcbiAgY29uc3QgY2xvbmUgPSBlbC5jbG9uZU5vZGUoKTtcbiAgY29uc3QgX3Z0YyA9IGVsW3Z0Y0tleV07XG4gIGlmIChfdnRjKSB7XG4gICAgX3Z0Yy5mb3JFYWNoKChjbHMpID0+IHtcbiAgICAgIGNscy5zcGxpdCgvXFxzKy8pLmZvckVhY2goKGMpID0+IGMgJiYgY2xvbmUuY2xhc3NMaXN0LnJlbW92ZShjKSk7XG4gICAgfSk7XG4gIH1cbiAgbW92ZUNsYXNzLnNwbGl0KC9cXHMrLykuZm9yRWFjaCgoYykgPT4gYyAmJiBjbG9uZS5jbGFzc0xpc3QuYWRkKGMpKTtcbiAgY2xvbmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBjb25zdCBjb250YWluZXIgPSByb290Lm5vZGVUeXBlID09PSAxID8gcm9vdCA6IHJvb3QucGFyZW50Tm9kZTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lKTtcbiAgY29uc3QgeyBoYXNUcmFuc2Zvcm0gfSA9IGdldFRyYW5zaXRpb25JbmZvKGNsb25lKTtcbiAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgcmV0dXJuIGhhc1RyYW5zZm9ybTtcbn1cblxuY29uc3QgZ2V0TW9kZWxBc3NpZ25lciA9ICh2bm9kZSkgPT4ge1xuICBjb25zdCBmbiA9IHZub2RlLnByb3BzW1wib25VcGRhdGU6bW9kZWxWYWx1ZVwiXSB8fCBmYWxzZTtcbiAgcmV0dXJuIGlzQXJyYXkoZm4pID8gKHZhbHVlKSA9PiBpbnZva2VBcnJheUZucyhmbiwgdmFsdWUpIDogZm47XG59O1xuZnVuY3Rpb24gb25Db21wb3NpdGlvblN0YXJ0KGUpIHtcbiAgZS50YXJnZXQuY29tcG9zaW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25FbmQoZSkge1xuICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgaWYgKHRhcmdldC5jb21wb3NpbmcpIHtcbiAgICB0YXJnZXQuY29tcG9zaW5nID0gZmFsc2U7XG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIikpO1xuICB9XG59XG5jb25zdCBhc3NpZ25LZXkgPSBTeW1ib2woXCJfYXNzaWduXCIpO1xuY29uc3Qgdk1vZGVsVGV4dCA9IHtcbiAgY3JlYXRlZChlbCwgeyBtb2RpZmllcnM6IHsgbGF6eSwgdHJpbSwgbnVtYmVyIH0gfSwgdm5vZGUpIHtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gICAgY29uc3QgY2FzdFRvTnVtYmVyID0gbnVtYmVyIHx8IHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzLnR5cGUgPT09IFwibnVtYmVyXCI7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihlbCwgbGF6eSA/IFwiY2hhbmdlXCIgOiBcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuY29tcG9zaW5nKSByZXR1cm47XG4gICAgICBsZXQgZG9tVmFsdWUgPSBlbC52YWx1ZTtcbiAgICAgIGlmICh0cmltKSB7XG4gICAgICAgIGRvbVZhbHVlID0gZG9tVmFsdWUudHJpbSgpO1xuICAgICAgfVxuICAgICAgaWYgKGNhc3RUb051bWJlcikge1xuICAgICAgICBkb21WYWx1ZSA9IGxvb3NlVG9OdW1iZXIoZG9tVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxbYXNzaWduS2V5XShkb21WYWx1ZSk7XG4gICAgfSk7XG4gICAgaWYgKHRyaW0pIHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZWwsIFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgZWwudmFsdWUgPSBlbC52YWx1ZS50cmltKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFsYXp5KSB7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNvbXBvc2l0aW9uc3RhcnRcIiwgb25Db21wb3NpdGlvblN0YXJ0KTtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoZWwsIFwiY29tcG9zaXRpb25lbmRcIiwgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNoYW5nZVwiLCBvbkNvbXBvc2l0aW9uRW5kKTtcbiAgICB9XG4gIH0sXG4gIC8vIHNldCB2YWx1ZSBvbiBtb3VudGVkIHNvIGl0J3MgYWZ0ZXIgbWluL21heCBmb3IgdHlwZT1cInJhbmdlXCJcbiAgbW91bnRlZChlbCwgeyB2YWx1ZSB9KSB7XG4gICAgZWwudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlO1xuICB9LFxuICBiZWZvcmVVcGRhdGUoZWwsIHsgdmFsdWUsIG9sZFZhbHVlLCBtb2RpZmllcnM6IHsgbGF6eSwgdHJpbSwgbnVtYmVyIH0gfSwgdm5vZGUpIHtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gICAgaWYgKGVsLmNvbXBvc2luZykgcmV0dXJuO1xuICAgIGNvbnN0IGVsVmFsdWUgPSAobnVtYmVyIHx8IGVsLnR5cGUgPT09IFwibnVtYmVyXCIpICYmICEvXjBcXGQvLnRlc3QoZWwudmFsdWUpID8gbG9vc2VUb051bWJlcihlbC52YWx1ZSkgOiBlbC52YWx1ZTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWU7XG4gICAgaWYgKGVsVmFsdWUgPT09IG5ld1ZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbCAmJiBlbC50eXBlICE9PSBcInJhbmdlXCIpIHtcbiAgICAgIGlmIChsYXp5ICYmIHZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJpbSAmJiBlbC52YWx1ZS50cmltKCkgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgfVxufTtcbmNvbnN0IHZNb2RlbENoZWNrYm94ID0ge1xuICAvLyAjNDA5NiBhcnJheSBjaGVja2JveGVzIG5lZWQgdG8gYmUgZGVlcCB0cmF2ZXJzZWRcbiAgZGVlcDogdHJ1ZSxcbiAgY3JlYXRlZChlbCwgXywgdm5vZGUpIHtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihlbCwgXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgbW9kZWxWYWx1ZSA9IGVsLl9tb2RlbFZhbHVlO1xuICAgICAgY29uc3QgZWxlbWVudFZhbHVlID0gZ2V0VmFsdWUoZWwpO1xuICAgICAgY29uc3QgY2hlY2tlZCA9IGVsLmNoZWNrZWQ7XG4gICAgICBjb25zdCBhc3NpZ24gPSBlbFthc3NpZ25LZXldO1xuICAgICAgaWYgKGlzQXJyYXkobW9kZWxWYWx1ZSkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb29zZUluZGV4T2YobW9kZWxWYWx1ZSwgZWxlbWVudFZhbHVlKTtcbiAgICAgICAgY29uc3QgZm91bmQgPSBpbmRleCAhPT0gLTE7XG4gICAgICAgIGlmIChjaGVja2VkICYmICFmb3VuZCkge1xuICAgICAgICAgIGFzc2lnbihtb2RlbFZhbHVlLmNvbmNhdChlbGVtZW50VmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIGlmICghY2hlY2tlZCAmJiBmb3VuZCkge1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gWy4uLm1vZGVsVmFsdWVdO1xuICAgICAgICAgIGZpbHRlcmVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgYXNzaWduKGZpbHRlcmVkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1NldChtb2RlbFZhbHVlKSkge1xuICAgICAgICBjb25zdCBjbG9uZWQgPSBuZXcgU2V0KG1vZGVsVmFsdWUpO1xuICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgIGNsb25lZC5hZGQoZWxlbWVudFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbG9uZWQuZGVsZXRlKGVsZW1lbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzaWduKGNsb25lZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhc3NpZ24oZ2V0Q2hlY2tib3hWYWx1ZShlbCwgY2hlY2tlZCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICAvLyBzZXQgaW5pdGlhbCBjaGVja2VkIG9uIG1vdW50IHRvIHdhaXQgZm9yIHRydWUtdmFsdWUvZmFsc2UtdmFsdWVcbiAgbW91bnRlZDogc2V0Q2hlY2tlZCxcbiAgYmVmb3JlVXBkYXRlKGVsLCBiaW5kaW5nLCB2bm9kZSkge1xuICAgIGVsW2Fzc2lnbktleV0gPSBnZXRNb2RlbEFzc2lnbmVyKHZub2RlKTtcbiAgICBzZXRDaGVja2VkKGVsLCBiaW5kaW5nLCB2bm9kZSk7XG4gIH1cbn07XG5mdW5jdGlvbiBzZXRDaGVja2VkKGVsLCB7IHZhbHVlLCBvbGRWYWx1ZSB9LCB2bm9kZSkge1xuICBlbC5fbW9kZWxWYWx1ZSA9IHZhbHVlO1xuICBsZXQgY2hlY2tlZDtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgY2hlY2tlZCA9IGxvb3NlSW5kZXhPZih2YWx1ZSwgdm5vZGUucHJvcHMudmFsdWUpID4gLTE7XG4gIH0gZWxzZSBpZiAoaXNTZXQodmFsdWUpKSB7XG4gICAgY2hlY2tlZCA9IHZhbHVlLmhhcyh2bm9kZS5wcm9wcy52YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbHVlID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgIGNoZWNrZWQgPSBsb29zZUVxdWFsKHZhbHVlLCBnZXRDaGVja2JveFZhbHVlKGVsLCB0cnVlKSk7XG4gIH1cbiAgaWYgKGVsLmNoZWNrZWQgIT09IGNoZWNrZWQpIHtcbiAgICBlbC5jaGVja2VkID0gY2hlY2tlZDtcbiAgfVxufVxuY29uc3Qgdk1vZGVsUmFkaW8gPSB7XG4gIGNyZWF0ZWQoZWwsIHsgdmFsdWUgfSwgdm5vZGUpIHtcbiAgICBlbC5jaGVja2VkID0gbG9vc2VFcXVhbCh2YWx1ZSwgdm5vZGUucHJvcHMudmFsdWUpO1xuICAgIGVsW2Fzc2lnbktleV0gPSBnZXRNb2RlbEFzc2lnbmVyKHZub2RlKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBlbFthc3NpZ25LZXldKGdldFZhbHVlKGVsKSk7XG4gICAgfSk7XG4gIH0sXG4gIGJlZm9yZVVwZGF0ZShlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSwgdm5vZGUpIHtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gICAgaWYgKHZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgZWwuY2hlY2tlZCA9IGxvb3NlRXF1YWwodmFsdWUsIHZub2RlLnByb3BzLnZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCB2TW9kZWxTZWxlY3QgPSB7XG4gIC8vIDxzZWxlY3QgbXVsdGlwbGU+IHZhbHVlIG5lZWQgdG8gYmUgZGVlcCB0cmF2ZXJzZWRcbiAgZGVlcDogdHJ1ZSxcbiAgY3JlYXRlZChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzOiB7IG51bWJlciB9IH0sIHZub2RlKSB7XG4gICAgY29uc3QgaXNTZXRNb2RlbCA9IGlzU2V0KHZhbHVlKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKGVsLCBcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3RlZFZhbCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbC5vcHRpb25zLCAobykgPT4gby5zZWxlY3RlZCkubWFwKFxuICAgICAgICAobykgPT4gbnVtYmVyID8gbG9vc2VUb051bWJlcihnZXRWYWx1ZShvKSkgOiBnZXRWYWx1ZShvKVxuICAgICAgKTtcbiAgICAgIGVsW2Fzc2lnbktleV0oXG4gICAgICAgIGVsLm11bHRpcGxlID8gaXNTZXRNb2RlbCA/IG5ldyBTZXQoc2VsZWN0ZWRWYWwpIDogc2VsZWN0ZWRWYWwgOiBzZWxlY3RlZFZhbFswXVxuICAgICAgKTtcbiAgICAgIGVsLl9hc3NpZ25pbmcgPSB0cnVlO1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBlbC5fYXNzaWduaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBlbFthc3NpZ25LZXldID0gZ2V0TW9kZWxBc3NpZ25lcih2bm9kZSk7XG4gIH0sXG4gIC8vIHNldCB2YWx1ZSBpbiBtb3VudGVkICYgdXBkYXRlZCBiZWNhdXNlIDxzZWxlY3Q+IHJlbGllcyBvbiBpdHMgY2hpbGRyZW5cbiAgLy8gPG9wdGlvbj5zLlxuICBtb3VudGVkKGVsLCB7IHZhbHVlIH0pIHtcbiAgICBzZXRTZWxlY3RlZChlbCwgdmFsdWUpO1xuICB9LFxuICBiZWZvcmVVcGRhdGUoZWwsIF9iaW5kaW5nLCB2bm9kZSkge1xuICAgIGVsW2Fzc2lnbktleV0gPSBnZXRNb2RlbEFzc2lnbmVyKHZub2RlKTtcbiAgfSxcbiAgdXBkYXRlZChlbCwgeyB2YWx1ZSB9KSB7XG4gICAgaWYgKCFlbC5fYXNzaWduaW5nKSB7XG4gICAgICBzZXRTZWxlY3RlZChlbCwgdmFsdWUpO1xuICAgIH1cbiAgfVxufTtcbmZ1bmN0aW9uIHNldFNlbGVjdGVkKGVsLCB2YWx1ZSkge1xuICBjb25zdCBpc011bHRpcGxlID0gZWwubXVsdGlwbGU7XG4gIGNvbnN0IGlzQXJyYXlWYWx1ZSA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNNdWx0aXBsZSAmJiAhaXNBcnJheVZhbHVlICYmICFpc1NldCh2YWx1ZSkpIHtcbiAgICAhIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpICYmIHdhcm4oXG4gICAgICBgPHNlbGVjdCBtdWx0aXBsZSB2LW1vZGVsPiBleHBlY3RzIGFuIEFycmF5IG9yIFNldCB2YWx1ZSBmb3IgaXRzIGJpbmRpbmcsIGJ1dCBnb3QgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKX0uYFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAobGV0IGkgPSAwLCBsID0gZWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBvcHRpb24gPSBlbC5vcHRpb25zW2ldO1xuICAgIGNvbnN0IG9wdGlvblZhbHVlID0gZ2V0VmFsdWUob3B0aW9uKTtcbiAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgaWYgKGlzQXJyYXlWYWx1ZSkge1xuICAgICAgICBjb25zdCBvcHRpb25UeXBlID0gdHlwZW9mIG9wdGlvblZhbHVlO1xuICAgICAgICBpZiAob3B0aW9uVHlwZSA9PT0gXCJzdHJpbmdcIiB8fCBvcHRpb25UeXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuc29tZSgodikgPT4gU3RyaW5nKHYpID09PSBTdHJpbmcob3B0aW9uVmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBsb29zZUluZGV4T2YodmFsdWUsIG9wdGlvblZhbHVlKSA+IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZS5oYXMob3B0aW9uVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobG9vc2VFcXVhbChnZXRWYWx1ZShvcHRpb24pLCB2YWx1ZSkpIHtcbiAgICAgIGlmIChlbC5zZWxlY3RlZEluZGV4ICE9PSBpKSBlbC5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc011bHRpcGxlICYmIGVsLnNlbGVjdGVkSW5kZXggIT09IC0xKSB7XG4gICAgZWwuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICB9XG59XG5mdW5jdGlvbiBnZXRWYWx1ZShlbCkge1xuICByZXR1cm4gXCJfdmFsdWVcIiBpbiBlbCA/IGVsLl92YWx1ZSA6IGVsLnZhbHVlO1xufVxuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShlbCwgY2hlY2tlZCkge1xuICBjb25zdCBrZXkgPSBjaGVja2VkID8gXCJfdHJ1ZVZhbHVlXCIgOiBcIl9mYWxzZVZhbHVlXCI7XG4gIHJldHVybiBrZXkgaW4gZWwgPyBlbFtrZXldIDogY2hlY2tlZDtcbn1cbmNvbnN0IHZNb2RlbER5bmFtaWMgPSB7XG4gIGNyZWF0ZWQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgY2FsbE1vZGVsSG9vayhlbCwgYmluZGluZywgdm5vZGUsIG51bGwsIFwiY3JlYXRlZFwiKTtcbiAgfSxcbiAgbW91bnRlZChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBjYWxsTW9kZWxIb29rKGVsLCBiaW5kaW5nLCB2bm9kZSwgbnVsbCwgXCJtb3VudGVkXCIpO1xuICB9LFxuICBiZWZvcmVVcGRhdGUoZWwsIGJpbmRpbmcsIHZub2RlLCBwcmV2Vk5vZGUpIHtcbiAgICBjYWxsTW9kZWxIb29rKGVsLCBiaW5kaW5nLCB2bm9kZSwgcHJldlZOb2RlLCBcImJlZm9yZVVwZGF0ZVwiKTtcbiAgfSxcbiAgdXBkYXRlZChlbCwgYmluZGluZywgdm5vZGUsIHByZXZWTm9kZSkge1xuICAgIGNhbGxNb2RlbEhvb2soZWwsIGJpbmRpbmcsIHZub2RlLCBwcmV2Vk5vZGUsIFwidXBkYXRlZFwiKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHJlc29sdmVEeW5hbWljTW9kZWwodGFnTmFtZSwgdHlwZSkge1xuICBzd2l0Y2ggKHRhZ05hbWUpIHtcbiAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICByZXR1cm4gdk1vZGVsU2VsZWN0O1xuICAgIGNhc2UgXCJURVhUQVJFQVwiOlxuICAgICAgcmV0dXJuIHZNb2RlbFRleHQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiY2hlY2tib3hcIjpcbiAgICAgICAgICByZXR1cm4gdk1vZGVsQ2hlY2tib3g7XG4gICAgICAgIGNhc2UgXCJyYWRpb1wiOlxuICAgICAgICAgIHJldHVybiB2TW9kZWxSYWRpbztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdk1vZGVsVGV4dDtcbiAgICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY2FsbE1vZGVsSG9vayhlbCwgYmluZGluZywgdm5vZGUsIHByZXZWTm9kZSwgaG9vaykge1xuICBjb25zdCBtb2RlbFRvVXNlID0gcmVzb2x2ZUR5bmFtaWNNb2RlbChcbiAgICBlbC50YWdOYW1lLFxuICAgIHZub2RlLnByb3BzICYmIHZub2RlLnByb3BzLnR5cGVcbiAgKTtcbiAgY29uc3QgZm4gPSBtb2RlbFRvVXNlW2hvb2tdO1xuICBmbiAmJiBmbihlbCwgYmluZGluZywgdm5vZGUsIHByZXZWTm9kZSk7XG59XG5mdW5jdGlvbiBpbml0Vk1vZGVsRm9yU1NSKCkge1xuICB2TW9kZWxUZXh0LmdldFNTUlByb3BzID0gKHsgdmFsdWUgfSkgPT4gKHsgdmFsdWUgfSk7XG4gIHZNb2RlbFJhZGlvLmdldFNTUlByb3BzID0gKHsgdmFsdWUgfSwgdm5vZGUpID0+IHtcbiAgICBpZiAodm5vZGUucHJvcHMgJiYgbG9vc2VFcXVhbCh2bm9kZS5wcm9wcy52YWx1ZSwgdmFsdWUpKSB7XG4gICAgICByZXR1cm4geyBjaGVja2VkOiB0cnVlIH07XG4gICAgfVxuICB9O1xuICB2TW9kZWxDaGVja2JveC5nZXRTU1JQcm9wcyA9ICh7IHZhbHVlIH0sIHZub2RlKSA9PiB7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodm5vZGUucHJvcHMgJiYgbG9vc2VJbmRleE9mKHZhbHVlLCB2bm9kZS5wcm9wcy52YWx1ZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4geyBjaGVja2VkOiB0cnVlIH07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1NldCh2YWx1ZSkpIHtcbiAgICAgIGlmICh2bm9kZS5wcm9wcyAmJiB2YWx1ZS5oYXModm5vZGUucHJvcHMudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB7IGNoZWNrZWQ6IHRydWUgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4geyBjaGVja2VkOiB0cnVlIH07XG4gICAgfVxuICB9O1xuICB2TW9kZWxEeW5hbWljLmdldFNTUlByb3BzID0gKGJpbmRpbmcsIHZub2RlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2bm9kZS50eXBlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1vZGVsVG9Vc2UgPSByZXNvbHZlRHluYW1pY01vZGVsKFxuICAgICAgLy8gcmVzb2x2ZUR5bmFtaWNNb2RlbCBleHBlY3RzIGFuIHVwcGVyY2FzZSB0YWcgbmFtZSwgYnV0IHZub2RlLnR5cGUgaXMgbG93ZXJjYXNlXG4gICAgICB2bm9kZS50eXBlLnRvVXBwZXJDYXNlKCksXG4gICAgICB2bm9kZS5wcm9wcyAmJiB2bm9kZS5wcm9wcy50eXBlXG4gICAgKTtcbiAgICBpZiAobW9kZWxUb1VzZS5nZXRTU1JQcm9wcykge1xuICAgICAgcmV0dXJuIG1vZGVsVG9Vc2UuZ2V0U1NSUHJvcHMoYmluZGluZywgdm5vZGUpO1xuICAgIH1cbiAgfTtcbn1cblxuY29uc3Qgc3lzdGVtTW9kaWZpZXJzID0gW1wiY3RybFwiLCBcInNoaWZ0XCIsIFwiYWx0XCIsIFwibWV0YVwiXTtcbmNvbnN0IG1vZGlmaWVyR3VhcmRzID0ge1xuICBzdG9wOiAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSxcbiAgcHJldmVudDogKGUpID0+IGUucHJldmVudERlZmF1bHQoKSxcbiAgc2VsZjogKGUpID0+IGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQsXG4gIGN0cmw6IChlKSA9PiAhZS5jdHJsS2V5LFxuICBzaGlmdDogKGUpID0+ICFlLnNoaWZ0S2V5LFxuICBhbHQ6IChlKSA9PiAhZS5hbHRLZXksXG4gIG1ldGE6IChlKSA9PiAhZS5tZXRhS2V5LFxuICBsZWZ0OiAoZSkgPT4gXCJidXR0b25cIiBpbiBlICYmIGUuYnV0dG9uICE9PSAwLFxuICBtaWRkbGU6IChlKSA9PiBcImJ1dHRvblwiIGluIGUgJiYgZS5idXR0b24gIT09IDEsXG4gIHJpZ2h0OiAoZSkgPT4gXCJidXR0b25cIiBpbiBlICYmIGUuYnV0dG9uICE9PSAyLFxuICBleGFjdDogKGUsIG1vZGlmaWVycykgPT4gc3lzdGVtTW9kaWZpZXJzLnNvbWUoKG0pID0+IGVbYCR7bX1LZXlgXSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKG0pKVxufTtcbmNvbnN0IHdpdGhNb2RpZmllcnMgPSAoZm4sIG1vZGlmaWVycykgPT4ge1xuICBjb25zdCBjYWNoZSA9IGZuLl93aXRoTW9kcyB8fCAoZm4uX3dpdGhNb2RzID0ge30pO1xuICBjb25zdCBjYWNoZUtleSA9IG1vZGlmaWVycy5qb2luKFwiLlwiKTtcbiAgcmV0dXJuIGNhY2hlW2NhY2hlS2V5XSB8fCAoY2FjaGVbY2FjaGVLZXldID0gKChldmVudCwgLi4uYXJncykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kaWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBndWFyZCA9IG1vZGlmaWVyR3VhcmRzW21vZGlmaWVyc1tpXV07XG4gICAgICBpZiAoZ3VhcmQgJiYgZ3VhcmQoZXZlbnQsIG1vZGlmaWVycykpIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGZuKGV2ZW50LCAuLi5hcmdzKTtcbiAgfSkpO1xufTtcbmNvbnN0IGtleU5hbWVzID0ge1xuICBlc2M6IFwiZXNjYXBlXCIsXG4gIHNwYWNlOiBcIiBcIixcbiAgdXA6IFwiYXJyb3ctdXBcIixcbiAgbGVmdDogXCJhcnJvdy1sZWZ0XCIsXG4gIHJpZ2h0OiBcImFycm93LXJpZ2h0XCIsXG4gIGRvd246IFwiYXJyb3ctZG93blwiLFxuICBkZWxldGU6IFwiYmFja3NwYWNlXCJcbn07XG5jb25zdCB3aXRoS2V5cyA9IChmbiwgbW9kaWZpZXJzKSA9PiB7XG4gIGNvbnN0IGNhY2hlID0gZm4uX3dpdGhLZXlzIHx8IChmbi5fd2l0aEtleXMgPSB7fSk7XG4gIGNvbnN0IGNhY2hlS2V5ID0gbW9kaWZpZXJzLmpvaW4oXCIuXCIpO1xuICByZXR1cm4gY2FjaGVbY2FjaGVLZXldIHx8IChjYWNoZVtjYWNoZUtleV0gPSAoKGV2ZW50KSA9PiB7XG4gICAgaWYgKCEoXCJrZXlcIiBpbiBldmVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZXZlbnRLZXkgPSBoeXBoZW5hdGUoZXZlbnQua2V5KTtcbiAgICBpZiAobW9kaWZpZXJzLnNvbWUoXG4gICAgICAoaykgPT4gayA9PT0gZXZlbnRLZXkgfHwga2V5TmFtZXNba10gPT09IGV2ZW50S2V5XG4gICAgKSkge1xuICAgICAgcmV0dXJuIGZuKGV2ZW50KTtcbiAgICB9XG4gIH0pKTtcbn07XG5cbmNvbnN0IHJlbmRlcmVyT3B0aW9ucyA9IC8qIEBfX1BVUkVfXyAqLyBleHRlbmQoeyBwYXRjaFByb3AgfSwgbm9kZU9wcyk7XG5sZXQgcmVuZGVyZXI7XG5sZXQgZW5hYmxlZEh5ZHJhdGlvbiA9IGZhbHNlO1xuZnVuY3Rpb24gZW5zdXJlUmVuZGVyZXIoKSB7XG4gIHJldHVybiByZW5kZXJlciB8fCAocmVuZGVyZXIgPSBjcmVhdGVSZW5kZXJlcihyZW5kZXJlck9wdGlvbnMpKTtcbn1cbmZ1bmN0aW9uIGVuc3VyZUh5ZHJhdGlvblJlbmRlcmVyKCkge1xuICByZW5kZXJlciA9IGVuYWJsZWRIeWRyYXRpb24gPyByZW5kZXJlciA6IGNyZWF0ZUh5ZHJhdGlvblJlbmRlcmVyKHJlbmRlcmVyT3B0aW9ucyk7XG4gIGVuYWJsZWRIeWRyYXRpb24gPSB0cnVlO1xuICByZXR1cm4gcmVuZGVyZXI7XG59XG5jb25zdCByZW5kZXIgPSAoKC4uLmFyZ3MpID0+IHtcbiAgZW5zdXJlUmVuZGVyZXIoKS5yZW5kZXIoLi4uYXJncyk7XG59KTtcbmNvbnN0IGh5ZHJhdGUgPSAoKC4uLmFyZ3MpID0+IHtcbiAgZW5zdXJlSHlkcmF0aW9uUmVuZGVyZXIoKS5oeWRyYXRlKC4uLmFyZ3MpO1xufSk7XG5jb25zdCBjcmVhdGVBcHAgPSAoKC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgYXBwID0gZW5zdXJlUmVuZGVyZXIoKS5jcmVhdGVBcHAoLi4uYXJncyk7XG4gIGlmICghIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgaW5qZWN0TmF0aXZlVGFnQ2hlY2soYXBwKTtcbiAgICBpbmplY3RDb21waWxlck9wdGlvbnNDaGVjayhhcHApO1xuICB9XG4gIGNvbnN0IHsgbW91bnQgfSA9IGFwcDtcbiAgYXBwLm1vdW50ID0gKGNvbnRhaW5lck9yU2VsZWN0b3IpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBub3JtYWxpemVDb250YWluZXIoY29udGFpbmVyT3JTZWxlY3Rvcik7XG4gICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgICBjb25zdCBjb21wb25lbnQgPSBhcHAuX2NvbXBvbmVudDtcbiAgICBpZiAoIWlzRnVuY3Rpb24oY29tcG9uZW50KSAmJiAhY29tcG9uZW50LnJlbmRlciAmJiAhY29tcG9uZW50LnRlbXBsYXRlKSB7XG4gICAgICBjb21wb25lbnQudGVtcGxhdGUgPSBjb250YWluZXIuaW5uZXJIVE1MO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBjb25zdCBwcm94eSA9IG1vdW50KGNvbnRhaW5lciwgZmFsc2UsIHJlc29sdmVSb290TmFtZXNwYWNlKGNvbnRhaW5lcikpO1xuICAgIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwidi1jbG9ha1wiKTtcbiAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXYtYXBwXCIsIFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG4gIHJldHVybiBhcHA7XG59KTtcbmNvbnN0IGNyZWF0ZVNTUkFwcCA9ICgoLi4uYXJncykgPT4ge1xuICBjb25zdCBhcHAgPSBlbnN1cmVIeWRyYXRpb25SZW5kZXJlcigpLmNyZWF0ZUFwcCguLi5hcmdzKTtcbiAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBpbmplY3ROYXRpdmVUYWdDaGVjayhhcHApO1xuICAgIGluamVjdENvbXBpbGVyT3B0aW9uc0NoZWNrKGFwcCk7XG4gIH1cbiAgY29uc3QgeyBtb3VudCB9ID0gYXBwO1xuICBhcHAubW91bnQgPSAoY29udGFpbmVyT3JTZWxlY3RvcikgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IG5vcm1hbGl6ZUNvbnRhaW5lcihjb250YWluZXJPclNlbGVjdG9yKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gbW91bnQoY29udGFpbmVyLCB0cnVlLCByZXNvbHZlUm9vdE5hbWVzcGFjZShjb250YWluZXIpKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhcHA7XG59KTtcbmZ1bmN0aW9uIHJlc29sdmVSb290TmFtZXNwYWNlKGNvbnRhaW5lcikge1xuICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgIHJldHVybiBcInN2Z1wiO1xuICB9XG4gIGlmICh0eXBlb2YgTWF0aE1MRWxlbWVudCA9PT0gXCJmdW5jdGlvblwiICYmIGNvbnRhaW5lciBpbnN0YW5jZW9mIE1hdGhNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gXCJtYXRobWxcIjtcbiAgfVxufVxuZnVuY3Rpb24gaW5qZWN0TmF0aXZlVGFnQ2hlY2soYXBwKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcHAuY29uZmlnLCBcImlzTmF0aXZlVGFnXCIsIHtcbiAgICB2YWx1ZTogKHRhZykgPT4gaXNIVE1MVGFnKHRhZykgfHwgaXNTVkdUYWcodGFnKSB8fCBpc01hdGhNTFRhZyh0YWcpLFxuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbn1cbmZ1bmN0aW9uIGluamVjdENvbXBpbGVyT3B0aW9uc0NoZWNrKGFwcCkge1xuICBpZiAoaXNSdW50aW1lT25seSgpKSB7XG4gICAgY29uc3QgaXNDdXN0b21FbGVtZW50ID0gYXBwLmNvbmZpZy5pc0N1c3RvbUVsZW1lbnQ7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcC5jb25maWcsIFwiaXNDdXN0b21FbGVtZW50XCIsIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIGlzQ3VzdG9tRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICBzZXQoKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgYFRoZSBcXGBpc0N1c3RvbUVsZW1lbnRcXGAgY29uZmlnIG9wdGlvbiBpcyBkZXByZWNhdGVkLiBVc2UgXFxgY29tcGlsZXJPcHRpb25zLmlzQ3VzdG9tRWxlbWVudFxcYCBpbnN0ZWFkLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjb21waWxlck9wdGlvbnMgPSBhcHAuY29uZmlnLmNvbXBpbGVyT3B0aW9ucztcbiAgICBjb25zdCBtc2cgPSBgVGhlIFxcYGNvbXBpbGVyT3B0aW9uc1xcYCBjb25maWcgb3B0aW9uIGlzIG9ubHkgcmVzcGVjdGVkIHdoZW4gdXNpbmcgYSBidWlsZCBvZiBWdWUuanMgdGhhdCBpbmNsdWRlcyB0aGUgcnVudGltZSBjb21waWxlciAoYWthIFwiZnVsbCBidWlsZFwiKS4gU2luY2UgeW91IGFyZSB1c2luZyB0aGUgcnVudGltZS1vbmx5IGJ1aWxkLCBcXGBjb21waWxlck9wdGlvbnNcXGAgbXVzdCBiZSBwYXNzZWQgdG8gXFxgQHZ1ZS9jb21waWxlci1kb21cXGAgaW4gdGhlIGJ1aWxkIHNldHVwIGluc3RlYWQuXG4tIEZvciB2dWUtbG9hZGVyOiBwYXNzIGl0IHZpYSB2dWUtbG9hZGVyJ3MgXFxgY29tcGlsZXJPcHRpb25zXFxgIGxvYWRlciBvcHRpb24uXG4tIEZvciB2dWUtY2xpOiBzZWUgaHR0cHM6Ly9jbGkudnVlanMub3JnL2d1aWRlL3dlYnBhY2suaHRtbCNtb2RpZnlpbmctb3B0aW9ucy1vZi1hLWxvYWRlclxuLSBGb3Igdml0ZTogcGFzcyBpdCB2aWEgQHZpdGVqcy9wbHVnaW4tdnVlIG9wdGlvbnMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUtcGx1Z2luLXZ1ZS90cmVlL21haW4vcGFja2FnZXMvcGx1Z2luLXZ1ZSNleGFtcGxlLWZvci1wYXNzaW5nLW9wdGlvbnMtdG8tdnVlY29tcGlsZXItc2ZjYDtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBwLmNvbmZpZywgXCJjb21waWxlck9wdGlvbnNcIiwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgIHJldHVybiBjb21waWxlck9wdGlvbnM7XG4gICAgICB9LFxuICAgICAgc2V0KCkge1xuICAgICAgICB3YXJuKG1zZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbnRhaW5lcihjb250YWluZXIpIHtcbiAgaWYgKGlzU3RyaW5nKGNvbnRhaW5lcikpIHtcbiAgICBjb25zdCByZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcik7XG4gICAgaWYgKCEhKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgJiYgIXJlcykge1xuICAgICAgd2FybihcbiAgICAgICAgYEZhaWxlZCB0byBtb3VudCBhcHA6IG1vdW50IHRhcmdldCBzZWxlY3RvciBcIiR7Y29udGFpbmVyfVwiIHJldHVybmVkIG51bGwuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBpZiAoISEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSAmJiB3aW5kb3cuU2hhZG93Um9vdCAmJiBjb250YWluZXIgaW5zdGFuY2VvZiB3aW5kb3cuU2hhZG93Um9vdCAmJiBjb250YWluZXIubW9kZSA9PT0gXCJjbG9zZWRcIikge1xuICAgIHdhcm4oXG4gICAgICBgbW91bnRpbmcgb24gYSBTaGFkb3dSb290IHdpdGggXFxge21vZGU6IFwiY2xvc2VkXCJ9XFxgIG1heSBsZWFkIHRvIHVucHJlZGljdGFibGUgYnVnc2BcbiAgICApO1xuICB9XG4gIHJldHVybiBjb250YWluZXI7XG59XG5sZXQgc3NyRGlyZWN0aXZlSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmNvbnN0IGluaXREaXJlY3RpdmVzRm9yU1NSID0gKCkgPT4ge1xuICBpZiAoIXNzckRpcmVjdGl2ZUluaXRpYWxpemVkKSB7XG4gICAgc3NyRGlyZWN0aXZlSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIGluaXRWTW9kZWxGb3JTU1IoKTtcbiAgICBpbml0VlNob3dGb3JTU1IoKTtcbiAgfVxufSA7XG5cbmV4cG9ydCB7IFRyYW5zaXRpb24sIFRyYW5zaXRpb25Hcm91cCwgVnVlRWxlbWVudCwgY3JlYXRlQXBwLCBjcmVhdGVTU1JBcHAsIGRlZmluZUN1c3RvbUVsZW1lbnQsIGRlZmluZVNTUkN1c3RvbUVsZW1lbnQsIGh5ZHJhdGUsIGluaXREaXJlY3RpdmVzRm9yU1NSLCByZW5kZXIsIHVzZUNzc01vZHVsZSwgdXNlQ3NzVmFycywgdXNlSG9zdCwgdXNlU2hhZG93Um9vdCwgdk1vZGVsQ2hlY2tib3gsIHZNb2RlbER5bmFtaWMsIHZNb2RlbFJhZGlvLCB2TW9kZWxTZWxlY3QsIHZNb2RlbFRleHQsIHZTaG93LCB3aXRoS2V5cywgd2l0aE1vZGlmaWVycyB9O1xuIl0sIm5hbWVzIjpbImNhbWVsaXplJDEiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0EsSUFBSSxTQUFTO0FBQ2IsTUFBTSxLQUFLLE9BQU8sV0FBVyxlQUFlLE9BQU87QUFDbkQsSUFBSSxJQUFJO0FBQ04sTUFBSTtBQUNGLGFBQXlCLG1CQUFHLGFBQWEsT0FBTztBQUFBLE1BQzlDLFlBQVksQ0FBQyxRQUFRO0FBQUEsSUFBQSxDQUN0QjtBQUFBLEVBQ0gsU0FBUyxHQUFHO0FBQUEsRUFFWjtBQUNGO0FBQ0EsTUFBTSxzQkFBc0IsU0FBUyxDQUFDLFFBQVEsT0FBTyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVE7QUFDaEYsTUFBTSxRQUFRO0FBQ2QsTUFBTSxXQUFXO0FBQ2pCLE1BQU0sTUFBTSxPQUFPLGFBQWEsY0FBYyxXQUFXO0FBQ3pELE1BQU0sb0JBQW9CLE9BQXVCLG9CQUFJLGNBQWMsVUFBVTtBQUM3RSxNQUFNLFVBQVU7QUFBQSxFQUNkLFFBQVEsQ0FBQyxPQUFPLFFBQVEsV0FBVztBQUNqQyxXQUFPLGFBQWEsT0FBTyxVQUFVLElBQUk7QUFBQSxFQUMzQztBQUFBLEVBQ0EsUUFBUSxDQUFDLFVBQVU7QUFDakIsVUFBTSxTQUFTLE1BQU07QUFDckIsUUFBSSxRQUFRO0FBQ1YsYUFBTyxZQUFZLEtBQUs7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWUsQ0FBQyxLQUFLLFdBQVcsSUFBSSxVQUFVO0FBQzVDLFVBQU0sS0FBSyxjQUFjLFFBQVEsSUFBSSxnQkFBZ0IsT0FBTyxHQUFHLElBQUksY0FBYyxXQUFXLElBQUksZ0JBQWdCLFVBQVUs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
