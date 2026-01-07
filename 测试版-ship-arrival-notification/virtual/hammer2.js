import { __module as hammer } from './hammer3.js';
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
var hasRequiredHammer;
function requireHammer() {
  if (hasRequiredHammer) return hammer.exports;
  hasRequiredHammer = 1;
  (function (module) {
    (function (window2, document2, exportName, undefined$1) {
      var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
      var TEST_ELEMENT = document2.createElement('div');
      var TYPE_FUNCTION = 'function';
      var round = Math.round;
      var abs = Math.abs;
      var now = Date.now;
      function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
      }
      function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
          each(arg, context[fn], context);
          return true;
        }
        return false;
      }
      function each(obj, iterator, context) {
        var i;
        if (!obj) {
          return;
        }
        if (obj.forEach) {
          obj.forEach(iterator, context);
        } else if (obj.length !== undefined$1) {
          i = 0;
          while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
          }
        } else {
          for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
          }
        }
      }
      function deprecate(method, name, message) {
        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
        return function () {
          var e = new Error('get-stack-trace');
          var stack =
            e && e.stack
              ? e.stack
                  .replace(/^[^\(]+?[\n$]/gm, '')
                  .replace(/^\s+at\s+/gm, '')
                  .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
              : 'Unknown Stack Trace';
          var log = window2.console && (window2.console.warn || window2.console.log);
          if (log) {
            log.call(window2.console, deprecationMessage, stack);
          }
          return method.apply(this, arguments);
        };
      }
      var assign;
      if (typeof Object.assign !== 'function') {
        assign = function assign2(target) {
          if (target === undefined$1 || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }
          var output = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined$1 && source !== null) {
              for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey];
                }
              }
            }
          }
          return output;
        };
      } else {
        assign = Object.assign;
      }
      var extend = deprecate(
        function extend2(dest, src, merge2) {
          var keys = Object.keys(src);
          var i = 0;
          while (i < keys.length) {
            if (!merge2 || (merge2 && dest[keys[i]] === undefined$1)) {
              dest[keys[i]] = src[keys[i]];
            }
            i++;
          }
          return dest;
        },
        'extend',
        'Use `assign`.',
      );
      var merge = deprecate(
        function merge2(dest, src) {
          return extend(dest, src, true);
        },
        'merge',
        'Use `assign`.',
      );
      function inherit(child, base, properties) {
        var baseP = base.prototype,
          childP;
        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;
        if (properties) {
          assign(childP, properties);
        }
      }
      function bindFn(fn, context) {
        return function boundFn() {
          return fn.apply(context, arguments);
        };
      }
      function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION) {
          return val.apply(args ? args[0] || undefined$1 : undefined$1, args);
        }
        return val;
      }
      function ifUndefined(val1, val2) {
        return val1 === undefined$1 ? val2 : val1;
      }
      function addEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
          target.addEventListener(type, handler, false);
        });
      }
      function removeEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
          target.removeEventListener(type, handler, false);
        });
      }
      function hasParent(node, parent) {
        while (node) {
          if (node == parent) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      }
      function inStr(str, find) {
        return str.indexOf(find) > -1;
      }
      function splitStr(str) {
        return str.trim().split(/\s+/g);
      }
      function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
          return src.indexOf(find);
        } else {
          var i = 0;
          while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
              return i;
            }
            i++;
          }
          return -1;
        }
      }
      function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
      }
      function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;
        while (i < src.length) {
          var val = src[i][key];
          if (inArray(values, val) < 0) {
            results.push(src[i]);
          }
          values[i] = val;
          i++;
        }
        {
          {
            results = results.sort(function sortUniqueArray(a, b) {
              return a[key] > b[key];
            });
          }
        }
        return results;
      }
      function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);
        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
          prefix = VENDOR_PREFIXES[i];
          prop = prefix ? prefix + camelProp : property;
          if (prop in obj) {
            return prop;
          }
          i++;
        }
        return undefined$1;
      }
      var _uniqueId = 1;
      function uniqueId() {
        return _uniqueId++;
      }
      function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window2;
      }
      var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
      var SUPPORT_TOUCH = 'ontouchstart' in window2;
      var SUPPORT_POINTER_EVENTS = prefixed(window2, 'PointerEvent') !== undefined$1;
      var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
      var INPUT_TYPE_TOUCH = 'touch';
      var INPUT_TYPE_PEN = 'pen';
      var INPUT_TYPE_MOUSE = 'mouse';
      var INPUT_TYPE_KINECT = 'kinect';
      var COMPUTE_INTERVAL = 25;
      var INPUT_START = 1;
      var INPUT_MOVE = 2;
      var INPUT_END = 4;
      var INPUT_CANCEL = 8;
      var DIRECTION_NONE = 1;
      var DIRECTION_LEFT = 2;
      var DIRECTION_RIGHT = 4;
      var DIRECTION_UP = 8;
      var DIRECTION_DOWN = 16;
      var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
      var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
      var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
      var PROPS_XY = ['x', 'y'];
      var PROPS_CLIENT_XY = ['clientX', 'clientY'];
      function Input(manager, callback) {
        var self2 = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;
        this.domHandler = function (ev) {
          if (boolOrFn(manager.options.enable, [manager])) {
            self2.handler(ev);
          }
        };
        this.init();
      }
      Input.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function () {},
        /**
         * bind the events
         */
        init: function () {
          this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
          this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
          this.evWin &&
            addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },
        /**
         * unbind the events
         */
        destroy: function () {
          this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
          this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
          this.evWin &&
            removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },
      };
      function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;
        if (inputClass) {
          Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
          Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
          Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
          Type = MouseInput;
        } else {
          Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
      }
      function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal =
          eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;
        if (isFirst) {
          manager.session = {};
        }
        input.eventType = eventType;
        computeInputData(manager, input);
        manager.emit('hammer.input', input);
        manager.recognize(input);
        manager.session.prevInput = input;
      }
      function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;
        if (!session.firstInput) {
          session.firstInput = simpleCloneInputData(input);
        }
        if (pointersLength > 1 && !session.firstMultiple) {
          session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
          session.firstMultiple = false;
        }
        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
        var center = (input.center = getCenter(pointers));
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;
        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);
        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);
        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity =
          abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
        input.maxPointers = !session.prevInput
          ? input.pointers.length
          : input.pointers.length > session.prevInput.maxPointers
            ? input.pointers.length
            : session.prevInput.maxPointers;
        computeIntervalInputData(session, input);
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
          target = input.srcEvent.target;
        }
        input.target = target;
      }
      function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};
        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
          prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0,
          };
          offset = session.offsetDelta = {
            x: center.x,
            y: center.y,
          };
        }
        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
      }
      function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
          deltaTime = input.timeStamp - last.timeStamp,
          velocity,
          velocityX,
          velocityY,
          direction;
        if (
          input.eventType != INPUT_CANCEL &&
          (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined$1)
        ) {
          var deltaX = input.deltaX - last.deltaX;
          var deltaY = input.deltaY - last.deltaY;
          var v = getVelocity(deltaTime, deltaX, deltaY);
          velocityX = v.x;
          velocityY = v.y;
          velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
          direction = getDirection(deltaX, deltaY);
          session.lastInterval = input;
        } else {
          velocity = last.velocity;
          velocityX = last.velocityX;
          velocityY = last.velocityY;
          direction = last.direction;
        }
        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
      }
      function simpleCloneInputData(input) {
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
          pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY),
          };
          i++;
        }
        return {
          timeStamp: now(),
          pointers,
          center: getCenter(pointers),
          deltaX: input.deltaX,
          deltaY: input.deltaY,
        };
      }
      function getCenter(pointers) {
        var pointersLength = pointers.length;
        if (pointersLength === 1) {
          return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY),
          };
        }
        var x = 0,
          y = 0,
          i = 0;
        while (i < pointersLength) {
          x += pointers[i].clientX;
          y += pointers[i].clientY;
          i++;
        }
        return {
          x: round(x / pointersLength),
          y: round(y / pointersLength),
        };
      }
      function getVelocity(deltaTime, x, y) {
        return {
          x: x / deltaTime || 0,
          y: y / deltaTime || 0,
        };
      }
      function getDirection(x, y) {
        if (x === y) {
          return DIRECTION_NONE;
        }
        if (abs(x) >= abs(y)) {
          return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
      }
      function getDistance(p1, p2, props) {
        if (!props) {
          props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
          y = p2[props[1]] - p1[props[1]];
        return Math.sqrt(x * x + y * y);
      }
      function getAngle(p1, p2, props) {
        if (!props) {
          props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
          y = p2[props[1]] - p1[props[1]];
        return (Math.atan2(y, x) * 180) / Math.PI;
      }
      function getRotation(start, end) {
        return (
          getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY)
        );
      }
      function getScale(start, end) {
        return (
          getDistance(end[0], end[1], PROPS_CLIENT_XY) /
          getDistance(start[0], start[1], PROPS_CLIENT_XY)
        );
      }
      var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END,
      };
      var MOUSE_ELEMENT_EVENTS = 'mousedown';
      var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
      function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;
        this.pressed = false;
        Input.apply(this, arguments);
      }
      inherit(MouseInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
          var eventType = MOUSE_INPUT_MAP[ev.type];
          if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
          }
          if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
          }
          if (!this.pressed) {
            return;
          }
          if (eventType & INPUT_END) {
            this.pressed = false;
          }
          this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev,
          });
        },
      });
      var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL,
      };
      var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT,
        // see https://twitter.com/jacobrossi/status/480596438489890816
      };
      var POINTER_ELEMENT_EVENTS = 'pointerdown';
      var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
      if (window2.MSPointerEvent && !window2.PointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
      }
      function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;
        Input.apply(this, arguments);
        this.store = this.manager.session.pointerEvents = [];
      }
      inherit(PointerEventInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
          var store = this.store;
          var removePointer = false;
          var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
          var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
          var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
          var isTouch = pointerType == INPUT_TYPE_TOUCH;
          var storeIndex = inArray(store, ev.pointerId, 'pointerId');
          if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
              store.push(ev);
              storeIndex = store.length - 1;
            }
          } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
          }
          if (storeIndex < 0) {
            return;
          }
          store[storeIndex] = ev;
          this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType,
            srcEvent: ev,
          });
          if (removePointer) {
            store.splice(storeIndex, 1);
          }
        },
      });
      var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL,
      };
      var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
      var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
      function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;
        Input.apply(this, arguments);
      }
      inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
          var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
          if (type === INPUT_START) {
            this.started = true;
          }
          if (!this.started) {
            return;
          }
          var touches = normalizeSingleTouches.call(this, ev, type);
          if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
          }
          this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev,
          });
        },
      });
      function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);
        if (type & (INPUT_END | INPUT_CANCEL)) {
          all = uniqueArray(all.concat(changed), 'identifier');
        }
        return [all, changed];
      }
      var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL,
      };
      var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
      function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};
        Input.apply(this, arguments);
      }
      inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
          var type = TOUCH_INPUT_MAP[ev.type];
          var touches = getTouches.call(this, ev, type);
          if (!touches) {
            return;
          }
          this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev,
          });
        },
      });
      function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
          targetIds[allTouches[0].identifier] = true;
          return [allTouches, allTouches];
        }
        var i,
          targetTouches,
          changedTouches = toArray(ev.changedTouches),
          changedTargetTouches = [],
          target = this.target;
        targetTouches = allTouches.filter(function (touch) {
          return hasParent(touch.target, target);
        });
        if (type === INPUT_START) {
          i = 0;
          while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
          }
        }
        i = 0;
        while (i < changedTouches.length) {
          if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
          }
          if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
          }
          i++;
        }
        if (!changedTargetTouches.length) {
          return;
        }
        return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier'),
          changedTargetTouches,
        ];
      }
      var DEDUP_TIMEOUT = 2500;
      var DEDUP_DISTANCE = 25;
      function TouchMouseInput() {
        Input.apply(this, arguments);
        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);
        this.primaryTouch = null;
        this.lastTouches = [];
      }
      inherit(TouchMouseInput, Input, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
          var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
            isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;
          if (
            isMouse &&
            inputData.sourceCapabilities &&
            inputData.sourceCapabilities.firesTouchEvents
          ) {
            return;
          }
          if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
          } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
          }
          this.callback(manager, inputEvent, inputData);
        },
        /**
         * remove the event listeners
         */
        destroy: function destroy() {
          this.touch.destroy();
          this.mouse.destroy();
        },
      });
      function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
          this.primaryTouch = eventData.changedPointers[0].identifier;
          setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
          setLastTouch.call(this, eventData);
        }
      }
      function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];
        if (touch.identifier === this.primaryTouch) {
          var lastTouch = { x: touch.clientX, y: touch.clientY };
          this.lastTouches.push(lastTouch);
          var lts = this.lastTouches;
          var removeLastTouch = function () {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
              lts.splice(i, 1);
            }
          };
          setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
      }
      function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
          y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
          var t = this.lastTouches[i];
          var dx = Math.abs(x - t.x),
            dy = Math.abs(y - t.y);
          if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
          }
        }
        return false;
      }
      var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
      var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined$1;
      var TOUCH_ACTION_COMPUTE = 'compute';
      var TOUCH_ACTION_AUTO = 'auto';
      var TOUCH_ACTION_MANIPULATION = 'manipulation';
      var TOUCH_ACTION_NONE = 'none';
      var TOUCH_ACTION_PAN_X = 'pan-x';
      var TOUCH_ACTION_PAN_Y = 'pan-y';
      var TOUCH_ACTION_MAP = getTouchActionProps();
      function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
      }
      TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function (value) {
          if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
          }
          if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
          }
          this.actions = value.toLowerCase().trim();
        },
        /**
         * just re-set the touchAction value
         */
        update: function () {
          this.set(this.manager.options.touchAction);
        },
        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function () {
          var actions = [];
          each(this.manager.recognizers, function (recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
              actions = actions.concat(recognizer.getTouchAction());
            }
          });
          return cleanTouchActions(actions.join(' '));
        },
        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function (input) {
          var srcEvent = input.srcEvent;
          var direction = input.offsetDirection;
          if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
          }
          var actions = this.actions;
          var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
          var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
          var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
          if (hasNone) {
            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;
            if (isTapPointer && isTapMovement && isTapTouchTime) {
              return;
            }
          }
          if (hasPanX && hasPanY) {
            return;
          }
          if (
            hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)
          ) {
            return this.preventSrc(srcEvent);
          }
        },
        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function (srcEvent) {
          this.manager.session.prevented = true;
          srcEvent.preventDefault();
        },
      };
      function cleanTouchActions(actions) {
        if (inStr(actions, TOUCH_ACTION_NONE)) {
          return TOUCH_ACTION_NONE;
        }
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        if (hasPanX && hasPanY) {
          return TOUCH_ACTION_NONE;
        }
        if (hasPanX || hasPanY) {
          return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
          return TOUCH_ACTION_MANIPULATION;
        }
        return TOUCH_ACTION_AUTO;
      }
      function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
          return false;
        }
        var touchMap = {};
        var cssSupports = window2.CSS && window2.CSS.supports;
        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
          touchMap[val] = cssSupports ? window2.CSS.supports('touch-action', val) : true;
        });
        return touchMap;
      }
      var STATE_POSSIBLE = 1;
      var STATE_BEGAN = 2;
      var STATE_CHANGED = 4;
      var STATE_ENDED = 8;
      var STATE_RECOGNIZED = STATE_ENDED;
      var STATE_CANCELLED = 16;
      var STATE_FAILED = 32;
      function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});
        this.id = uniqueId();
        this.manager = null;
        this.options.enable = ifUndefined(this.options.enable, true);
        this.state = STATE_POSSIBLE;
        this.simultaneous = {};
        this.requireFail = [];
      }
      Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},
        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function (options) {
          assign(this.options, options);
          this.manager && this.manager.touchAction.update();
          return this;
        },
        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function (otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
          }
          var simultaneous = this.simultaneous;
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
          }
          return this;
        },
        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function (otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
          }
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          delete this.simultaneous[otherRecognizer.id];
          return this;
        },
        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function (otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
          }
          var requireFail = this.requireFail;
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
          }
          return this;
        },
        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function (otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
          }
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          var index = inArray(this.requireFail, otherRecognizer);
          if (index > -1) {
            this.requireFail.splice(index, 1);
          }
          return this;
        },
        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function () {
          return this.requireFail.length > 0;
        },
        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function (otherRecognizer) {
          return !!this.simultaneous[otherRecognizer.id];
        },
        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function (input) {
          var self2 = this;
          var state = this.state;
          function emit(event) {
            self2.manager.emit(event, input);
          }
          if (state < STATE_ENDED) {
            emit(self2.options.event + stateStr(state));
          }
          emit(self2.options.event);
          if (input.additionalEvent) {
            emit(input.additionalEvent);
          }
          if (state >= STATE_ENDED) {
            emit(self2.options.event + stateStr(state));
          }
        },
        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function (input) {
          if (this.canEmit()) {
            return this.emit(input);
          }
          this.state = STATE_FAILED;
        },
        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function () {
          var i = 0;
          while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
              return false;
            }
            i++;
          }
          return true;
        },
        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function (inputData) {
          var inputDataClone = assign({}, inputData);
          if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
          }
          if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
          }
          this.state = this.process(inputDataClone);
          if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
          }
        },
        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function (inputData) {},
        // jshint ignore:line
        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function () {},
        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function () {},
      };
      function stateStr(state) {
        if (state & STATE_CANCELLED) {
          return 'cancel';
        } else if (state & STATE_ENDED) {
          return 'end';
        } else if (state & STATE_CHANGED) {
          return 'move';
        } else if (state & STATE_BEGAN) {
          return 'start';
        }
        return '';
      }
      function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
          return 'down';
        } else if (direction == DIRECTION_UP) {
          return 'up';
        } else if (direction == DIRECTION_LEFT) {
          return 'left';
        } else if (direction == DIRECTION_RIGHT) {
          return 'right';
        }
        return '';
      }
      function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
          return manager.get(otherRecognizer);
        }
        return otherRecognizer;
      }
      function AttrRecognizer() {
        Recognizer.apply(this, arguments);
      }
      inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
          /**
           * @type {Number}
           * @default 1
           */
          pointers: 1,
        },
        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function (input) {
          var optionPointers = this.options.pointers;
          return optionPointers === 0 || input.pointers.length === optionPointers;
        },
        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function (input) {
          var state = this.state;
          var eventType = input.eventType;
          var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
          var isValid = this.attrTest(input);
          if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
          } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
              return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
              return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
          }
          return STATE_FAILED;
        },
      });
      function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);
        this.pX = null;
        this.pY = null;
      }
      inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
          event: 'pan',
          threshold: 10,
          pointers: 1,
          direction: DIRECTION_ALL,
        },
        getTouchAction: function () {
          var direction = this.options.direction;
          var actions = [];
          if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
          }
          if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
          }
          return actions;
        },
        directionTest: function (input) {
          var options = this.options;
          var hasMoved = true;
          var distance = input.distance;
          var direction = input.direction;
          var x = input.deltaX;
          var y = input.deltaY;
          if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
              direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
              hasMoved = x != this.pX;
              distance = Math.abs(input.deltaX);
            } else {
              direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
              hasMoved = y != this.pY;
              distance = Math.abs(input.deltaY);
            }
          }
          input.direction = direction;
          return hasMoved && distance > options.threshold && direction & options.direction;
        },
        attrTest: function (input) {
          return (
            AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)))
          );
        },
        emit: function (input) {
          this.pX = input.deltaX;
          this.pY = input.deltaY;
          var direction = directionStr(input.direction);
          if (direction) {
            input.additionalEvent = this.options.event + direction;
          }
          this._super.emit.call(this, input);
        },
      });
      function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
      }
      inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
          event: 'pinch',
          threshold: 0,
          pointers: 2,
        },
        getTouchAction: function () {
          return [TOUCH_ACTION_NONE];
        },
        attrTest: function (input) {
          return (
            this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN)
          );
        },
        emit: function (input) {
          if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
          }
          this._super.emit.call(this, input);
        },
      });
      function PressRecognizer() {
        Recognizer.apply(this, arguments);
        this._timer = null;
        this._input = null;
      }
      inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
          event: 'press',
          pointers: 1,
          time: 251,
          // minimal time of the pointer to be pressed
          threshold: 9,
          // a minimal movement is ok, but keep it low
        },
        getTouchAction: function () {
          return [TOUCH_ACTION_AUTO];
        },
        process: function (input) {
          var options = this.options;
          var validPointers = input.pointers.length === options.pointers;
          var validMovement = input.distance < options.threshold;
          var validTime = input.deltaTime > options.time;
          this._input = input;
          if (
            !validMovement ||
            !validPointers ||
            (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)
          ) {
            this.reset();
          } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(
              function () {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
              },
              options.time,
              this,
            );
          } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
          }
          return STATE_FAILED;
        },
        reset: function () {
          clearTimeout(this._timer);
        },
        emit: function (input) {
          if (this.state !== STATE_RECOGNIZED) {
            return;
          }
          if (input && input.eventType & INPUT_END) {
            this.manager.emit(this.options.event + 'up', input);
          } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
          }
        },
      });
      function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
      }
      inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
          event: 'rotate',
          threshold: 0,
          pointers: 2,
        },
        getTouchAction: function () {
          return [TOUCH_ACTION_NONE];
        },
        attrTest: function (input) {
          return (
            this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN)
          );
        },
      });
      function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
      }
      inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
          event: 'swipe',
          threshold: 10,
          velocity: 0.3,
          direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
          pointers: 1,
        },
        getTouchAction: function () {
          return PanRecognizer.prototype.getTouchAction.call(this);
        },
        attrTest: function (input) {
          var direction = this.options.direction;
          var velocity;
          if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
          } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
          } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
          }
          return (
            this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity &&
            input.eventType & INPUT_END
          );
        },
        emit: function (input) {
          var direction = directionStr(input.offsetDirection);
          if (direction) {
            this.manager.emit(this.options.event + direction, input);
          }
          this.manager.emit(this.options.event, input);
        },
      });
      function TapRecognizer() {
        Recognizer.apply(this, arguments);
        this.pTime = false;
        this.pCenter = false;
        this._timer = null;
        this._input = null;
        this.count = 0;
      }
      inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
          event: 'tap',
          pointers: 1,
          taps: 1,
          interval: 300,
          // max time between the multi-tap taps
          time: 250,
          // max time of the pointer to be down (like finger on the screen)
          threshold: 9,
          // a minimal movement is ok, but keep it low
          posThreshold: 10,
          // a multi-tap can be a bit off the initial position
        },
        getTouchAction: function () {
          return [TOUCH_ACTION_MANIPULATION];
        },
        process: function (input) {
          var options = this.options;
          var validPointers = input.pointers.length === options.pointers;
          var validMovement = input.distance < options.threshold;
          var validTouchTime = input.deltaTime < options.time;
          this.reset();
          if (input.eventType & INPUT_START && this.count === 0) {
            return this.failTimeout();
          }
          if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
              return this.failTimeout();
            }
            var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
            var validMultiTap =
              !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
            this.pTime = input.timeStamp;
            this.pCenter = input.center;
            if (!validMultiTap || !validInterval) {
              this.count = 1;
            } else {
              this.count += 1;
            }
            this._input = input;
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
              if (!this.hasRequireFailures()) {
                return STATE_RECOGNIZED;
              } else {
                this._timer = setTimeoutContext(
                  function () {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                  },
                  options.interval,
                  this,
                );
                return STATE_BEGAN;
              }
            }
          }
          return STATE_FAILED;
        },
        failTimeout: function () {
          this._timer = setTimeoutContext(
            function () {
              this.state = STATE_FAILED;
            },
            this.options.interval,
            this,
          );
          return STATE_FAILED;
        },
        reset: function () {
          clearTimeout(this._timer);
        },
        emit: function () {
          if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
          }
        },
      });
      function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
      }
      Hammer.VERSION = '2.0.7';
      Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,
        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,
        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,
        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,
        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,
        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
          // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
          [RotateRecognizer, { enable: false }],
          [PinchRecognizer, { enable: false }, ['rotate']],
          [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }],
          [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
          [TapRecognizer],
          [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
          [PressRecognizer],
        ],
        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
          /**
           * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
           * @type {String}
           * @default 'none'
           */
          userSelect: 'none',
          /**
           * Disable the Windows Phone grippers when pressing an element.
           * @type {String}
           * @default 'none'
           */
          touchSelect: 'none',
          /**
           * Disables the default callout shown when you touch and hold a touch target.
           * On iOS, when you touch and hold a touch target such as a link, Safari displays
           * a callout containing information about the link. This property allows you to disable that callout.
           * @type {String}
           * @default 'none'
           */
          touchCallout: 'none',
          /**
           * Specifies whether zooming is enabled. Used by IE10>
           * @type {String}
           * @default 'none'
           */
          contentZooming: 'none',
          /**
           * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
           * @type {String}
           * @default 'none'
           */
          userDrag: 'none',
          /**
           * Overrides the highlight color shown when the user taps a link or a JavaScript
           * clickable element in iOS. This property obeys the alpha value, if specified.
           * @type {String}
           * @default 'rgba(0,0,0,0)'
           */
          tapHighlightColor: 'rgba(0,0,0,0)',
        },
      };
      var STOP = 1;
      var FORCED_STOP = 2;
      function Manager(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});
        this.options.inputTarget = this.options.inputTarget || element;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);
        toggleCssProps(this, true);
        each(
          this.options.recognizers,
          function (item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
          },
          this,
        );
      }
      Manager.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function (options) {
          assign(this.options, options);
          if (options.touchAction) {
            this.touchAction.update();
          }
          if (options.inputTarget) {
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
          }
          return this;
        },
        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function (force) {
          this.session.stopped = force ? FORCED_STOP : STOP;
        },
        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function (inputData) {
          var session = this.session;
          if (session.stopped) {
            return;
          }
          this.touchAction.preventDefaults(inputData);
          var recognizer;
          var recognizers = this.recognizers;
          var curRecognizer = session.curRecognizer;
          if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
          }
          var i = 0;
          while (i < recognizers.length) {
            recognizer = recognizers[i];
            if (
              session.stopped !== FORCED_STOP && // 1
              (!curRecognizer ||
                recognizer == curRecognizer || // 2
                recognizer.canRecognizeWith(curRecognizer))
            ) {
              recognizer.recognize(inputData);
            } else {
              recognizer.reset();
            }
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
              curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
          }
        },
        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function (recognizer) {
          if (recognizer instanceof Recognizer) {
            return recognizer;
          }
          var recognizers = this.recognizers;
          for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
              return recognizers[i];
            }
          }
          return null;
        },
        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function (recognizer) {
          if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
          }
          var existing = this.get(recognizer.options.event);
          if (existing) {
            this.remove(existing);
          }
          this.recognizers.push(recognizer);
          recognizer.manager = this;
          this.touchAction.update();
          return recognizer;
        },
        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function (recognizer) {
          if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
          }
          recognizer = this.get(recognizer);
          if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);
            if (index !== -1) {
              recognizers.splice(index, 1);
              this.touchAction.update();
            }
          }
          return this;
        },
        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function (events, handler) {
          if (events === undefined$1) {
            return;
          }
          if (handler === undefined$1) {
            return;
          }
          var handlers = this.handlers;
          each(splitStr(events), function (event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
          });
          return this;
        },
        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function (events, handler) {
          if (events === undefined$1) {
            return;
          }
          var handlers = this.handlers;
          each(splitStr(events), function (event) {
            if (!handler) {
              delete handlers[event];
            } else {
              handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
          });
          return this;
        },
        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function (event, data) {
          if (this.options.domEvents) {
            triggerDomEvent(event, data);
          }
          var handlers = this.handlers[event] && this.handlers[event].slice();
          if (!handlers || !handlers.length) {
            return;
          }
          data.type = event;
          data.preventDefault = function () {
            data.srcEvent.preventDefault();
          };
          var i = 0;
          while (i < handlers.length) {
            handlers[i](data);
            i++;
          }
        },
        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function () {
          this.element && toggleCssProps(this, false);
          this.handlers = {};
          this.session = {};
          this.input.destroy();
          this.element = null;
        },
      };
      function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
          return;
        }
        var prop;
        each(manager.options.cssProps, function (value, name) {
          prop = prefixed(element.style, name);
          if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
          } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
          }
        });
        if (!add) {
          manager.oldCssProps = {};
        }
      }
      function triggerDomEvent(event, data) {
        var gestureEvent = document2.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
      }
      assign(Hammer, {
        INPUT_START,
        INPUT_MOVE,
        INPUT_END,
        INPUT_CANCEL,
        STATE_POSSIBLE,
        STATE_BEGAN,
        STATE_CHANGED,
        STATE_ENDED,
        STATE_RECOGNIZED,
        STATE_CANCELLED,
        STATE_FAILED,
        DIRECTION_NONE,
        DIRECTION_LEFT,
        DIRECTION_RIGHT,
        DIRECTION_UP,
        DIRECTION_DOWN,
        DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL,
        DIRECTION_ALL,
        Manager,
        Input,
        TouchAction,
        TouchInput,
        MouseInput,
        PointerEventInput,
        TouchMouseInput,
        SingleTouchInput,
        Recognizer,
        AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,
        on: addEventListeners,
        off: removeEventListeners,
        each,
        merge,
        extend,
        assign,
        inherit,
        bindFn,
        prefixed,
      });
      var freeGlobal =
        typeof window2 !== 'undefined' ? window2 : typeof self !== 'undefined' ? self : {};
      freeGlobal.Hammer = Hammer;
      if (module.exports) {
        module.exports = Hammer;
      } else {
        window2[exportName] = Hammer;
      }
    })(window, document, 'Hammer');
  })(hammer);
  return hammer.exports;
}
export { requireHammer as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2hhbW1lcmpzQDIuMC44L25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEhhbW1lci5KUyAtIHYyLjAuNyAtIDIwMTYtMDQtMjJcbiAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IEpvcmlrIFRhbmdlbGRlcjtcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGV4cG9ydE5hbWUsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbnZhciBWRU5ET1JfUFJFRklYRVMgPSBbJycsICd3ZWJraXQnLCAnTW96JywgJ01TJywgJ21zJywgJ28nXTtcbnZhciBURVNUX0VMRU1FTlQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxudmFyIFRZUEVfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIG5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIHNldCBhIHRpbWVvdXQgd2l0aCBhIGdpdmVuIHNjb3BlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBzZXRUaW1lb3V0Q29udGV4dChmbiwgdGltZW91dCwgY29udGV4dCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGJpbmRGbihmbiwgY29udGV4dCksIHRpbWVvdXQpO1xufVxuXG4vKipcbiAqIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSwgd2Ugd2FudCB0byBleGVjdXRlIHRoZSBmbiBvbiBlYWNoIGVudHJ5XG4gKiBpZiBpdCBhaW50IGFuIGFycmF5IHdlIGRvbid0IHdhbnQgdG8gZG8gYSB0aGluZy5cbiAqIHRoaXMgaXMgdXNlZCBieSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBhY2NlcHQgYSBzaW5nbGUgYW5kIGFycmF5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfEFycmF5fSBhcmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBmblxuICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0XVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGludm9rZUFycmF5QXJnKGFyZywgZm4sIGNvbnRleHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIGVhY2goYXJnLCBjb250ZXh0W2ZuXSwgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogd2FsayBvYmplY3RzIGFuZCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICovXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob2JqLmZvckVhY2gpIHtcbiAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgb2JqLmhhc093blByb3BlcnR5KGkpICYmIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIHdyYXAgYSBtZXRob2Qgd2l0aCBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgYW5kIHN0YWNrIHRyYWNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyB0aGUgc3VwcGxpZWQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBkZXByZWNhdGUobWV0aG9kLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgdmFyIGRlcHJlY2F0aW9uTWVzc2FnZSA9ICdERVBSRUNBVEVEIE1FVEhPRDogJyArIG5hbWUgKyAnXFxuJyArIG1lc3NhZ2UgKyAnIEFUIFxcbic7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignZ2V0LXN0YWNrLXRyYWNlJyk7XG4gICAgICAgIHZhciBzdGFjayA9IGUgJiYgZS5zdGFjayA/IGUuc3RhY2sucmVwbGFjZSgvXlteXFwoXSs/W1xcbiRdL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzK2F0XFxzKy9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sICd7YW5vbnltb3VzfSgpQCcpIDogJ1Vua25vd24gU3RhY2sgVHJhY2UnO1xuXG4gICAgICAgIHZhciBsb2cgPSB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUud2FybiB8fCB3aW5kb3cuY29uc29sZS5sb2cpO1xuICAgICAgICBpZiAobG9nKSB7XG4gICAgICAgICAgICBsb2cuY2FsbCh3aW5kb3cuY29uc29sZSwgZGVwcmVjYXRpb25NZXNzYWdlLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHsuLi5PYmplY3R9IG9iamVjdHNfdG9fYXNzaWduXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0YXJnZXRcbiAqL1xudmFyIGFzc2lnbjtcbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFttZXJnZT1mYWxzZV1cbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIGV4dGVuZCA9IGRlcHJlY2F0ZShmdW5jdGlvbiBleHRlbmQoZGVzdCwgc3JjLCBtZXJnZSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIW1lcmdlIHx8IChtZXJnZSAmJiBkZXN0W2tleXNbaV1dID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBkZXN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG59LCAnZXh0ZW5kJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBtZXJnZSB0aGUgdmFsdWVzIGZyb20gc3JjIGluIHRoZSBkZXN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIHRoYXQgZXhpc3QgaW4gZGVzdCB3aWxsIG5vdCBiZSBvdmVyd3JpdHRlbiBieSBzcmNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBtZXJnZSA9IGRlcHJlY2F0ZShmdW5jdGlvbiBtZXJnZShkZXN0LCBzcmMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKGRlc3QsIHNyYywgdHJ1ZSk7XG59LCAnbWVyZ2UnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIHNpbXBsZSBjbGFzcyBpbmhlcml0YW5jZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGJhc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllc11cbiAqL1xuZnVuY3Rpb24gaW5oZXJpdChjaGlsZCwgYmFzZSwgcHJvcGVydGllcykge1xuICAgIHZhciBiYXNlUCA9IGJhc2UucHJvdG90eXBlLFxuICAgICAgICBjaGlsZFA7XG5cbiAgICBjaGlsZFAgPSBjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2VQKTtcbiAgICBjaGlsZFAuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgICBjaGlsZFAuX3N1cGVyID0gYmFzZVA7XG5cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICBhc3NpZ24oY2hpbGRQLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG59XG5cbi8qKlxuICogc2ltcGxlIGZ1bmN0aW9uIGJpbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBiaW5kRm4oZm4sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYm91bmRGbigpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBsZXQgYSBib29sZWFuIHZhbHVlIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IG11c3QgcmV0dXJuIGEgYm9vbGVhblxuICogdGhpcyBmaXJzdCBpdGVtIGluIGFyZ3Mgd2lsbCBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHZhbFxuICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gYm9vbE9yRm4odmFsLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT0gVFlQRV9GVU5DVElPTikge1xuICAgICAgICByZXR1cm4gdmFsLmFwcGx5KGFyZ3MgPyBhcmdzWzBdIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogdXNlIHRoZSB2YWwyIHdoZW4gdmFsMSBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSB7Kn0gdmFsMVxuICogQHBhcmFtIHsqfSB2YWwyXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gaWZVbmRlZmluZWQodmFsMSwgdmFsMikge1xuICAgIHJldHVybiAodmFsMSA9PT0gdW5kZWZpbmVkKSA/IHZhbDIgOiB2YWwxO1xufVxuXG4vKipcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIG5vZGUgaXMgaW4gdGhlIGdpdmVuIHBhcmVudFxuICogQG1ldGhvZCBoYXNQYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHJldHVybiB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaGFzUGFyZW50KG5vZGUsIHBhcmVudCkge1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHNtYWxsIGluZGV4T2Ygd3JhcHBlclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBpblN0cihzdHIsIGZpbmQpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2YoZmluZCkgPiAtMTtcbn1cblxuLyoqXG4gKiBzcGxpdCBzdHJpbmcgb24gd2hpdGVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge0FycmF5fSB3b3Jkc1xuICovXG5mdW5jdGlvbiBzcGxpdFN0cihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5zcGxpdCgvXFxzKy9nKTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgYXJyYXkgY29udGFpbnMgdGhlIG9iamVjdCB1c2luZyBpbmRleE9mIG9yIGEgc2ltcGxlIHBvbHlGaWxsXG4gKiBAcGFyYW0ge0FycmF5fSBzcmNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcGFyYW0ge1N0cmluZ30gW2ZpbmRCeUtleV1cbiAqIEByZXR1cm4ge0Jvb2xlYW58TnVtYmVyfSBmYWxzZSB3aGVuIG5vdCBmb3VuZCwgb3IgdGhlIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGluQXJyYXkoc3JjLCBmaW5kLCBmaW5kQnlLZXkpIHtcbiAgICBpZiAoc3JjLmluZGV4T2YgJiYgIWZpbmRCeUtleSkge1xuICAgICAgICByZXR1cm4gc3JjLmluZGV4T2YoZmluZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICgoZmluZEJ5S2V5ICYmIHNyY1tpXVtmaW5kQnlLZXldID09IGZpbmQpIHx8ICghZmluZEJ5S2V5ICYmIHNyY1tpXSA9PT0gZmluZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufVxuXG4vKipcbiAqIGNvbnZlcnQgYXJyYXktbGlrZSBvYmplY3RzIHRvIHJlYWwgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaiwgMCk7XG59XG5cbi8qKlxuICogdW5pcXVlIGFycmF5IHdpdGggb2JqZWN0cyBiYXNlZCBvbiBhIGtleSAobGlrZSAnaWQnKSBvciBqdXN0IGJ5IHRoZSBhcnJheSdzIHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBzcmMgW3tpZDoxfSx7aWQ6Mn0se2lkOjF9XVxuICogQHBhcmFtIHtTdHJpbmd9IFtrZXldXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzb3J0PUZhbHNlXVxuICogQHJldHVybnMge0FycmF5fSBbe2lkOjF9LHtpZDoyfV1cbiAqL1xuZnVuY3Rpb24gdW5pcXVlQXJyYXkoc3JjLCBrZXksIHNvcnQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGtleSA/IHNyY1tpXVtrZXldIDogc3JjW2ldO1xuICAgICAgICBpZiAoaW5BcnJheSh2YWx1ZXMsIHZhbCkgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goc3JjW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaV0gPSB2YWw7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydChmdW5jdGlvbiBzb3J0VW5pcXVlQXJyYXkoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhW2tleV0gPiBiW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG4vKipcbiAqIGdldCB0aGUgcHJlZml4ZWQgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHJldHVybnMge1N0cmluZ3xVbmRlZmluZWR9IHByZWZpeGVkXG4gKi9cbmZ1bmN0aW9uIHByZWZpeGVkKG9iaiwgcHJvcGVydHkpIHtcbiAgICB2YXIgcHJlZml4LCBwcm9wO1xuICAgIHZhciBjYW1lbFByb3AgPSBwcm9wZXJ0eVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSk7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBWRU5ET1JfUFJFRklYRVMubGVuZ3RoKSB7XG4gICAgICAgIHByZWZpeCA9IFZFTkRPUl9QUkVGSVhFU1tpXTtcbiAgICAgICAgcHJvcCA9IChwcmVmaXgpID8gcHJlZml4ICsgY2FtZWxQcm9wIDogcHJvcGVydHk7XG5cbiAgICAgICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogZ2V0IGEgdW5pcXVlIGlkXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB1bmlxdWVJZFxuICovXG52YXIgX3VuaXF1ZUlkID0gMTtcbmZ1bmN0aW9uIHVuaXF1ZUlkKCkge1xuICAgIHJldHVybiBfdW5pcXVlSWQrKztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHdpbmRvdyBvYmplY3Qgb2YgYW4gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0RvY3VtZW50Vmlld3xXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIHZhciBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZWxlbWVudDtcbiAgICByZXR1cm4gKGRvYy5kZWZhdWx0VmlldyB8fCBkb2MucGFyZW50V2luZG93IHx8IHdpbmRvdyk7XG59XG5cbnZhciBNT0JJTEVfUkVHRVggPSAvbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkL2k7XG5cbnZhciBTVVBQT1JUX1RPVUNIID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyk7XG52YXIgU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyA9IHByZWZpeGVkKHdpbmRvdywgJ1BvaW50ZXJFdmVudCcpICE9PSB1bmRlZmluZWQ7XG52YXIgU1VQUE9SVF9PTkxZX1RPVUNIID0gU1VQUE9SVF9UT1VDSCAmJiBNT0JJTEVfUkVHRVgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxudmFyIElOUFVUX1RZUEVfVE9VQ0ggPSAndG91Y2gnO1xudmFyIElOUFVUX1RZUEVfUEVOID0gJ3Blbic7XG52YXIgSU5QVVRfVFlQRV9NT1VTRSA9ICdtb3VzZSc7XG52YXIgSU5QVVRfVFlQRV9LSU5FQ1QgPSAna2luZWN0JztcblxudmFyIENPTVBVVEVfSU5URVJWQUwgPSAyNTtcblxudmFyIElOUFVUX1NUQVJUID0gMTtcbnZhciBJTlBVVF9NT1ZFID0gMjtcbnZhciBJTlBVVF9FTkQgPSA0O1xudmFyIElOUFVUX0NBTkNFTCA9IDg7XG5cbnZhciBESVJFQ1RJT05fTk9ORSA9IDE7XG52YXIgRElSRUNUSU9OX0xFRlQgPSAyO1xudmFyIERJUkVDVElPTl9SSUdIVCA9IDQ7XG52YXIgRElSRUNUSU9OX1VQID0gODtcbnZhciBESVJFQ1RJT05fRE9XTiA9IDE2O1xuXG52YXIgRElSRUNUSU9OX0hPUklaT05UQUwgPSBESVJFQ1RJT05fTEVGVCB8IERJUkVDVElPTl9SSUdIVDtcbnZhciBESVJFQ1RJT05fVkVSVElDQUwgPSBESVJFQ1RJT05fVVAgfCBESVJFQ1RJT05fRE9XTjtcbnZhciBESVJFQ1RJT05fQUxMID0gRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUw7XG5cbnZhciBQUk9QU19YWSA9IFsneCcsICd5J107XG52YXIgUFJPUFNfQ0xJRU5UX1hZID0gWydjbGllbnRYJywgJ2NsaWVudFknXTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0lucHV0fVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIElucHV0KG1hbmFnZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICB0aGlzLnRhcmdldCA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dFRhcmdldDtcblxuICAgIC8vIHNtYWxsZXIgd3JhcHBlciBhcm91bmQgdGhlIGhhbmRsZXIsIGZvciB0aGUgc2NvcGUgYW5kIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBtYW5hZ2VyLFxuICAgIC8vIHNvIHdoZW4gZGlzYWJsZWQgdGhlIGlucHV0IGV2ZW50cyBhcmUgY29tcGxldGVseSBieXBhc3NlZC5cbiAgICB0aGlzLmRvbUhhbmRsZXIgPSBmdW5jdGlvbihldikge1xuICAgICAgICBpZiAoYm9vbE9yRm4obWFuYWdlci5vcHRpb25zLmVuYWJsZSwgW21hbmFnZXJdKSkge1xuICAgICAgICAgICAgc2VsZi5oYW5kbGVyKGV2KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcblxufVxuXG5JbnB1dC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2hvdWxkIGhhbmRsZSB0aGUgaW5wdXRFdmVudCBkYXRhIGFuZCB0cmlnZ2VyIHRoZSBjYWxsYmFja1xuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIGFkZEV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBjYWxsZWQgYnkgdGhlIE1hbmFnZXIgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0SW5zdGFuY2UobWFuYWdlcikge1xuICAgIHZhciBUeXBlO1xuICAgIHZhciBpbnB1dENsYXNzID0gbWFuYWdlci5vcHRpb25zLmlucHV0Q2xhc3M7XG5cbiAgICBpZiAoaW5wdXRDbGFzcykge1xuICAgICAgICBUeXBlID0gaW5wdXRDbGFzcztcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgICAgVHlwZSA9IFBvaW50ZXJFdmVudElucHV0O1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9PTkxZX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaElucHV0O1xuICAgIH0gZWxzZSBpZiAoIVNVUFBPUlRfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IE1vdXNlSW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoTW91c2VJbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyAoVHlwZSkobWFuYWdlciwgaW5wdXRIYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBoYW5kbGUgaW5wdXQgZXZlbnRzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIobWFuYWdlciwgZXZlbnRUeXBlLCBpbnB1dCkge1xuICAgIHZhciBwb2ludGVyc0xlbiA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgY2hhbmdlZFBvaW50ZXJzTGVuID0gaW5wdXQuY2hhbmdlZFBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgaXNGaXJzdCA9IChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcbiAgICB2YXIgaXNGaW5hbCA9IChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcblxuICAgIGlucHV0LmlzRmlyc3QgPSAhIWlzRmlyc3Q7XG4gICAgaW5wdXQuaXNGaW5hbCA9ICEhaXNGaW5hbDtcblxuICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIG1hbmFnZXIuc2Vzc2lvbiA9IHt9O1xuICAgIH1cblxuICAgIC8vIHNvdXJjZSBldmVudCBpcyB0aGUgbm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZG9tRXZlbnRzXG4gICAgLy8gbGlrZSAndG91Y2hzdGFydCwgbW91c2V1cCwgcG9pbnRlcmRvd24nXG4gICAgaW5wdXQuZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuXG4gICAgLy8gY29tcHV0ZSBzY2FsZSwgcm90YXRpb24gZXRjXG4gICAgY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCk7XG5cbiAgICAvLyBlbWl0IHNlY3JldCBldmVudFxuICAgIG1hbmFnZXIuZW1pdCgnaGFtbWVyLmlucHV0JywgaW5wdXQpO1xuXG4gICAgbWFuYWdlci5yZWNvZ25pemUoaW5wdXQpO1xuICAgIG1hbmFnZXIuc2Vzc2lvbi5wcmV2SW5wdXQgPSBpbnB1dDtcbn1cblxuLyoqXG4gKiBleHRlbmQgdGhlIGRhdGEgd2l0aCBzb21lIHVzYWJsZSBwcm9wZXJ0aWVzIGxpa2Ugc2NhbGUsIHJvdGF0ZSwgdmVsb2NpdHkgZXRjXG4gKiBAcGFyYW0ge09iamVjdH0gbWFuYWdlclxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpIHtcbiAgICB2YXIgc2Vzc2lvbiA9IG1hbmFnZXIuc2Vzc2lvbjtcbiAgICB2YXIgcG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycztcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBzdG9yZSB0aGUgZmlyc3QgaW5wdXQgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBhbmQgZGlyZWN0aW9uXG4gICAgaWYgKCFzZXNzaW9uLmZpcnN0SW5wdXQpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdElucHV0ID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH1cblxuICAgIC8vIHRvIGNvbXB1dGUgc2NhbGUgYW5kIHJvdGF0aW9uIHdlIG5lZWQgdG8gc3RvcmUgdGhlIG11bHRpcGxlIHRvdWNoZXNcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPiAxICYmICFzZXNzaW9uLmZpcnN0TXVsdGlwbGUpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0SW5wdXQgPSBzZXNzaW9uLmZpcnN0SW5wdXQ7XG4gICAgdmFyIGZpcnN0TXVsdGlwbGUgPSBzZXNzaW9uLmZpcnN0TXVsdGlwbGU7XG4gICAgdmFyIG9mZnNldENlbnRlciA9IGZpcnN0TXVsdGlwbGUgPyBmaXJzdE11bHRpcGxlLmNlbnRlciA6IGZpcnN0SW5wdXQuY2VudGVyO1xuXG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlciA9IGdldENlbnRlcihwb2ludGVycyk7XG4gICAgaW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgaW5wdXQuZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gZmlyc3RJbnB1dC50aW1lU3RhbXA7XG5cbiAgICBpbnB1dC5hbmdsZSA9IGdldEFuZ2xlKG9mZnNldENlbnRlciwgY2VudGVyKTtcbiAgICBpbnB1dC5kaXN0YW5jZSA9IGdldERpc3RhbmNlKG9mZnNldENlbnRlciwgY2VudGVyKTtcblxuICAgIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KTtcbiAgICBpbnB1dC5vZmZzZXREaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuXG4gICAgdmFyIG92ZXJhbGxWZWxvY2l0eSA9IGdldFZlbG9jaXR5KGlucHV0LmRlbHRhVGltZSwgaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVggPSBvdmVyYWxsVmVsb2NpdHkueDtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZID0gb3ZlcmFsbFZlbG9jaXR5Lnk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5ID0gKGFicyhvdmVyYWxsVmVsb2NpdHkueCkgPiBhYnMob3ZlcmFsbFZlbG9jaXR5LnkpKSA/IG92ZXJhbGxWZWxvY2l0eS54IDogb3ZlcmFsbFZlbG9jaXR5Lnk7XG5cbiAgICBpbnB1dC5zY2FsZSA9IGZpcnN0TXVsdGlwbGUgPyBnZXRTY2FsZShmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAxO1xuICAgIGlucHV0LnJvdGF0aW9uID0gZmlyc3RNdWx0aXBsZSA/IGdldFJvdGF0aW9uKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDA7XG5cbiAgICBpbnB1dC5tYXhQb2ludGVycyA9ICFzZXNzaW9uLnByZXZJbnB1dCA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6ICgoaW5wdXQucG9pbnRlcnMubGVuZ3RoID5cbiAgICAgICAgc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpO1xuXG4gICAgY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KTtcblxuICAgIC8vIGZpbmQgdGhlIGNvcnJlY3QgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoaGFzUGFyZW50KGlucHV0LnNyY0V2ZW50LnRhcmdldCwgdGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSBpbnB1dC5zcmNFdmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlucHV0LnRhcmdldCA9IHRhcmdldDtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyO1xuICAgIHZhciBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldklucHV0ID0gc2Vzc2lvbi5wcmV2SW5wdXQgfHwge307XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9TVEFSVCB8fCBwcmV2SW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9FTkQpIHtcbiAgICAgICAgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBwcmV2SW5wdXQuZGVsdGFYIHx8IDAsXG4gICAgICAgICAgICB5OiBwcmV2SW5wdXQuZGVsdGFZIHx8IDBcbiAgICAgICAgfTtcblxuICAgICAgICBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhID0ge1xuICAgICAgICAgICAgeDogY2VudGVyLngsXG4gICAgICAgICAgICB5OiBjZW50ZXIueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlucHV0LmRlbHRhWCA9IHByZXZEZWx0YS54ICsgKGNlbnRlci54IC0gb2Zmc2V0LngpO1xuICAgIGlucHV0LmRlbHRhWSA9IHByZXZEZWx0YS55ICsgKGNlbnRlci55IC0gb2Zmc2V0LnkpO1xufVxuXG4vKipcbiAqIHZlbG9jaXR5IGlzIGNhbGN1bGF0ZWQgZXZlcnkgeCBtc1xuICogQHBhcmFtIHtPYmplY3R9IHNlc3Npb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgbGFzdCA9IHNlc3Npb24ubGFzdEludGVydmFsIHx8IGlucHV0LFxuICAgICAgICBkZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBsYXN0LnRpbWVTdGFtcCxcbiAgICAgICAgdmVsb2NpdHksIHZlbG9jaXR5WCwgdmVsb2NpdHlZLCBkaXJlY3Rpb247XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0NBTkNFTCAmJiAoZGVsdGFUaW1lID4gQ09NUFVURV9JTlRFUlZBTCB8fCBsYXN0LnZlbG9jaXR5ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBpbnB1dC5kZWx0YVggLSBsYXN0LmRlbHRhWDtcbiAgICAgICAgdmFyIGRlbHRhWSA9IGlucHV0LmRlbHRhWSAtIGxhc3QuZGVsdGFZO1xuXG4gICAgICAgIHZhciB2ID0gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICAgIHZlbG9jaXR5WCA9IHYueDtcbiAgICAgICAgdmVsb2NpdHlZID0gdi55O1xuICAgICAgICB2ZWxvY2l0eSA9IChhYnModi54KSA+IGFicyh2LnkpKSA/IHYueCA6IHYueTtcbiAgICAgICAgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICBzZXNzaW9uLmxhc3RJbnRlcnZhbCA9IGlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZSBsYXRlc3QgdmVsb2NpdHkgaW5mbyBpZiBpdCBkb2Vzbid0IG92ZXJ0YWtlIGEgbWluaW11bSBwZXJpb2RcbiAgICAgICAgdmVsb2NpdHkgPSBsYXN0LnZlbG9jaXR5O1xuICAgICAgICB2ZWxvY2l0eVggPSBsYXN0LnZlbG9jaXR5WDtcbiAgICAgICAgdmVsb2NpdHlZID0gbGFzdC52ZWxvY2l0eVk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGxhc3QuZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGlucHV0LnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgaW5wdXQudmVsb2NpdHlYID0gdmVsb2NpdHlYO1xuICAgIGlucHV0LnZlbG9jaXR5WSA9IHZlbG9jaXR5WTtcbiAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG59XG5cbi8qKlxuICogY3JlYXRlIGEgc2ltcGxlIGNsb25lIGZyb20gdGhlIGlucHV0IHVzZWQgZm9yIHN0b3JhZ2Ugb2YgZmlyc3RJbnB1dCBhbmQgZmlyc3RNdWx0aXBsZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjbG9uZWRJbnB1dERhdGFcbiAqL1xuZnVuY3Rpb24gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpIHtcbiAgICAvLyBtYWtlIGEgc2ltcGxlIGNvcHkgb2YgdGhlIHBvaW50ZXJzIGJlY2F1c2Ugd2Ugd2lsbCBnZXQgYSByZWZlcmVuY2UgaWYgd2UgZG9uJ3RcbiAgICAvLyB3ZSBvbmx5IG5lZWQgY2xpZW50WFkgZm9yIHRoZSBjYWxjdWxhdGlvbnNcbiAgICB2YXIgcG9pbnRlcnMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBpbnB1dC5wb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9pbnRlcnNbaV0gPSB7XG4gICAgICAgICAgICBjbGllbnRYOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRYKSxcbiAgICAgICAgICAgIGNsaWVudFk6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aW1lU3RhbXA6IG5vdygpLFxuICAgICAgICBwb2ludGVyczogcG9pbnRlcnMsXG4gICAgICAgIGNlbnRlcjogZ2V0Q2VudGVyKHBvaW50ZXJzKSxcbiAgICAgICAgZGVsdGFYOiBpbnB1dC5kZWx0YVgsXG4gICAgICAgIGRlbHRhWTogaW5wdXQuZGVsdGFZXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGNlbnRlciBvZiBhbGwgdGhlIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludGVyc1xuICogQHJldHVybiB7T2JqZWN0fSBjZW50ZXIgY29udGFpbnMgYHhgIGFuZCBgeWAgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIocG9pbnRlcnMpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBubyBuZWVkIHRvIGxvb3Agd2hlbiBvbmx5IG9uZSB0b3VjaFxuICAgIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WCksXG4gICAgICAgICAgICB5OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgcG9pbnRlcnNMZW5ndGgpIHtcbiAgICAgICAgeCArPSBwb2ludGVyc1tpXS5jbGllbnRYO1xuICAgICAgICB5ICs9IHBvaW50ZXJzW2ldLmNsaWVudFk7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiByb3VuZCh4IC8gcG9pbnRlcnNMZW5ndGgpLFxuICAgICAgICB5OiByb3VuZCh5IC8gcG9pbnRlcnNMZW5ndGgpXG4gICAgfTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5IGJldHdlZW4gdHdvIHBvaW50cy4gdW5pdCBpcyBpbiBweCBwZXIgbXMuXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFUaW1lXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge09iamVjdH0gdmVsb2NpdHkgYHhgIGFuZCBgeWBcbiAqL1xuZnVuY3Rpb24gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCB4LCB5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCAvIGRlbHRhVGltZSB8fCAwLFxuICAgICAgICB5OiB5IC8gZGVsdGFUaW1lIHx8IDBcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgZGlyZWN0aW9uIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpcmVjdGlvblxuICovXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgIHJldHVybiBESVJFQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICBpZiAoYWJzKHgpID49IGFicyh5KSkge1xuICAgICAgICByZXR1cm4geCA8IDAgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICB9XG4gICAgcmV0dXJuIHkgPCAwID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMSB7eCwgeX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiB7eCwgeX1cbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gZGlzdGFuY2VcbiAqL1xuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4ICogeCkgKyAoeSAqIHkpKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcDFcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMlxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBhbmdsZVxuICovXG5mdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqIDE4MCAvIE1hdGguUEk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSByb3RhdGlvbiBkZWdyZWVzIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHJvdGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldFJvdGF0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0QW5nbGUoZW5kWzFdLCBlbmRbMF0sIFBST1BTX0NMSUVOVF9YWSkgKyBnZXRBbmdsZShzdGFydFsxXSwgc3RhcnRbMF0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBzY2FsZSBmYWN0b3IgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIG5vIHNjYWxlIGlzIDEsIGFuZCBnb2VzIGRvd24gdG8gMCB3aGVuIHBpbmNoZWQgdG9nZXRoZXIsIGFuZCBiaWdnZXIgd2hlbiBwaW5jaGVkIG91dFxuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSBzY2FsZVxuICovXG5mdW5jdGlvbiBnZXRTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdLCBQUk9QU19DTElFTlRfWFkpIC8gZ2V0RGlzdGFuY2Uoc3RhcnRbMF0sIHN0YXJ0WzFdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG52YXIgTU9VU0VfSU5QVVRfTUFQID0ge1xuICAgIG1vdXNlZG93bjogSU5QVVRfU1RBUlQsXG4gICAgbW91c2Vtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIG1vdXNldXA6IElOUFVUX0VORFxufTtcblxudmFyIE1PVVNFX0VMRU1FTlRfRVZFTlRTID0gJ21vdXNlZG93bic7XG52YXIgTU9VU0VfV0lORE9XX0VWRU5UUyA9ICdtb3VzZW1vdmUgbW91c2V1cCc7XG5cbi8qKlxuICogTW91c2UgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIE1vdXNlSW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gTU9VU0VfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IE1PVVNFX1dJTkRPV19FVkVOVFM7XG5cbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTsgLy8gbW91c2Vkb3duIHN0YXRlXG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1FaGFuZGxlcihldikge1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gTU9VU0VfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIG9uIHN0YXJ0IHdlIHdhbnQgdG8gaGF2ZSB0aGUgbGVmdCBtb3VzZSBidXR0b24gZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgZXYuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX01PVkUgJiYgZXYud2hpY2ggIT09IDEpIHtcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9IElOUFVUX0VORDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX01PVVNFLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgUE9JTlRFUl9JTlBVVF9NQVAgPSB7XG4gICAgcG9pbnRlcmRvd246IElOUFVUX1NUQVJULFxuICAgIHBvaW50ZXJtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHBvaW50ZXJ1cDogSU5QVVRfRU5ELFxuICAgIHBvaW50ZXJjYW5jZWw6IElOUFVUX0NBTkNFTCxcbiAgICBwb2ludGVyb3V0OiBJTlBVVF9DQU5DRUxcbn07XG5cbi8vIGluIElFMTAgdGhlIHBvaW50ZXIgdHlwZXMgaXMgZGVmaW5lZCBhcyBhbiBlbnVtXG52YXIgSUUxMF9QT0lOVEVSX1RZUEVfRU5VTSA9IHtcbiAgICAyOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgIDM6IElOUFVUX1RZUEVfUEVOLFxuICAgIDQ6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgNTogSU5QVVRfVFlQRV9LSU5FQ1QgLy8gc2VlIGh0dHBzOi8vdHdpdHRlci5jb20vamFjb2Jyb3NzaS9zdGF0dXMvNDgwNTk2NDM4NDg5ODkwODE2XG59O1xuXG52YXIgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdwb2ludGVyZG93bic7XG52YXIgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ3BvaW50ZXJtb3ZlIHBvaW50ZXJ1cCBwb2ludGVyY2FuY2VsJztcblxuLy8gSUUxMCBoYXMgcHJlZml4ZWQgc3VwcG9ydCwgYW5kIGNhc2Utc2Vuc2l0aXZlXG5pZiAod2luZG93Lk1TUG9pbnRlckV2ZW50ICYmICF3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdNU1BvaW50ZXJEb3duJztcbiAgICBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAnTVNQb2ludGVyTW92ZSBNU1BvaW50ZXJVcCBNU1BvaW50ZXJDYW5jZWwnO1xufVxuXG4vKipcbiAqIFBvaW50ZXIgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFBvaW50ZXJFdmVudElucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IFBPSU5URVJfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFBPSU5URVJfV0lORE9XX0VWRU5UUztcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnN0b3JlID0gKHRoaXMubWFuYWdlci5zZXNzaW9uLnBvaW50ZXJFdmVudHMgPSBbXSk7XG59XG5cbmluaGVyaXQoUG9pbnRlckV2ZW50SW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFBFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLnN0b3JlO1xuICAgICAgICB2YXIgcmVtb3ZlUG9pbnRlciA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBldmVudFR5cGVOb3JtYWxpemVkID0gZXYudHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ21zJywgJycpO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gUE9JTlRFUl9JTlBVVF9NQVBbZXZlbnRUeXBlTm9ybWFsaXplZF07XG4gICAgICAgIHZhciBwb2ludGVyVHlwZSA9IElFMTBfUE9JTlRFUl9UWVBFX0VOVU1bZXYucG9pbnRlclR5cGVdIHx8IGV2LnBvaW50ZXJUeXBlO1xuXG4gICAgICAgIHZhciBpc1RvdWNoID0gKHBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpO1xuXG4gICAgICAgIC8vIGdldCBpbmRleCBvZiB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHZhciBzdG9yZUluZGV4ID0gaW5BcnJheShzdG9yZSwgZXYucG9pbnRlcklkLCAncG9pbnRlcklkJyk7XG5cbiAgICAgICAgLy8gc3RhcnQgYW5kIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKGV2LmJ1dHRvbiA9PT0gMCB8fCBpc1RvdWNoKSkge1xuICAgICAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHVzaChldik7XG4gICAgICAgICAgICAgICAgc3RvcmVJbmRleCA9IHN0b3JlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIHJlbW92ZVBvaW50ZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXQgbm90IGZvdW5kLCBzbyB0aGUgcG9pbnRlciBoYXNuJ3QgYmVlbiBkb3duIChzbyBpdCdzIHByb2JhYmx5IGEgaG92ZXIpXG4gICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgc3RvcmVbc3RvcmVJbmRleF0gPSBldjtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogc3RvcmUsXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZVBvaW50ZXIpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBzdG9yZVxuICAgICAgICAgICAgc3RvcmUuc3BsaWNlKHN0b3JlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZhciBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0JztcbnZhciBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogVG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFNpbmdsZVRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUztcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU2luZ2xlVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBURWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIHNob3VsZCB3ZSBoYW5kbGUgdGhlIHRvdWNoIGV2ZW50cz9cbiAgICAgICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaGVzID0gbm9ybWFsaXplU2luZ2xlVG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcblxuICAgICAgICAvLyB3aGVuIGRvbmUsIHJlc2V0IHRoZSBzdGFydGVkIHN0YXRlXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgdG91Y2hlc1swXS5sZW5ndGggLSB0b3VjaGVzWzFdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlVG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGwgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciBjaGFuZ2VkID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyk7XG5cbiAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIGFsbCA9IHVuaXF1ZUFycmF5KGFsbC5jb25jYXQoY2hhbmdlZCksICdpZGVudGlmaWVyJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFthbGwsIGNoYW5nZWRdO1xufVxuXG52YXIgVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBUT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBNdWx0aS11c2VyIHRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBUT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMudGFyZ2V0SWRzID0ge307XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTVRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFRPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBnZXRUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuICAgICAgICBpZiAoIXRvdWNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBnZXRUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbFRvdWNoZXMgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciB0YXJnZXRJZHMgPSB0aGlzLnRhcmdldElkcztcblxuICAgIC8vIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgdG91Y2gsIHRoZSBwcm9jZXNzIGNhbiBiZSBzaW1wbGlmaWVkXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfU1RBUlQgfCBJTlBVVF9NT1ZFKSAmJiBhbGxUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0YXJnZXRJZHNbYWxsVG91Y2hlc1swXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBbYWxsVG91Y2hlcywgYWxsVG91Y2hlc107XG4gICAgfVxuXG4gICAgdmFyIGksXG4gICAgICAgIHRhcmdldFRvdWNoZXMsXG4gICAgICAgIGNoYW5nZWRUb3VjaGVzID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzID0gW10sXG4gICAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuXG4gICAgLy8gZ2V0IHRhcmdldCB0b3VjaGVzIGZyb20gdG91Y2hlc1xuICAgIHRhcmdldFRvdWNoZXMgPSBhbGxUb3VjaGVzLmZpbHRlcihmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICByZXR1cm4gaGFzUGFyZW50KHRvdWNoLnRhcmdldCwgdGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIC8vIGNvbGxlY3QgdG91Y2hlc1xuICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0YXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0SWRzW3RhcmdldFRvdWNoZXNbaV0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGNoYW5nZWQgdG91Y2hlcyB0byBvbmx5IGNvbnRhaW4gdG91Y2hlcyB0aGF0IGV4aXN0IGluIHRoZSBjb2xsZWN0ZWQgdGFyZ2V0IGlkc1xuICAgIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl0pIHtcbiAgICAgICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzLnB1c2goY2hhbmdlZFRvdWNoZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYW51cCByZW1vdmVkIHRvdWNoZXNcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICAgIC8vIG1lcmdlIHRhcmdldFRvdWNoZXMgd2l0aCBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyBzbyBpdCBjb250YWlucyBBTEwgdG91Y2hlcywgaW5jbHVkaW5nICdlbmQnIGFuZCAnY2FuY2VsJ1xuICAgICAgICB1bmlxdWVBcnJheSh0YXJnZXRUb3VjaGVzLmNvbmNhdChjaGFuZ2VkVGFyZ2V0VG91Y2hlcyksICdpZGVudGlmaWVyJywgdHJ1ZSksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzXG4gICAgXTtcbn1cblxuLyoqXG4gKiBDb21iaW5lZCB0b3VjaCBhbmQgbW91c2UgaW5wdXRcbiAqXG4gKiBUb3VjaCBoYXMgYSBoaWdoZXIgcHJpb3JpdHkgdGhlbiBtb3VzZSwgYW5kIHdoaWxlIHRvdWNoaW5nIG5vIG1vdXNlIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAqIFRoaXMgYmVjYXVzZSB0b3VjaCBkZXZpY2VzIGFsc28gZW1pdCBtb3VzZSBldmVudHMgd2hpbGUgZG9pbmcgYSB0b3VjaC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cblxudmFyIERFRFVQX1RJTUVPVVQgPSAyNTAwO1xudmFyIERFRFVQX0RJU1RBTkNFID0gMjU7XG5cbmZ1bmN0aW9uIFRvdWNoTW91c2VJbnB1dCgpIHtcbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGhhbmRsZXIgPSBiaW5kRm4odGhpcy5oYW5kbGVyLCB0aGlzKTtcbiAgICB0aGlzLnRvdWNoID0gbmV3IFRvdWNoSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcbiAgICB0aGlzLm1vdXNlID0gbmV3IE1vdXNlSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcblxuICAgIHRoaXMucHJpbWFyeVRvdWNoID0gbnVsbDtcbiAgICB0aGlzLmxhc3RUb3VjaGVzID0gW107XG59XG5cbmluaGVyaXQoVG91Y2hNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBhbmQgdG91Y2ggZXZlbnRzXG4gICAgICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRFdmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBUTUVoYW5kbGVyKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgaXNUb3VjaCA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCksXG4gICAgICAgICAgICBpc01vdXNlID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX01PVVNFKTtcblxuICAgICAgICBpZiAoaXNNb3VzZSAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMuZmlyZXNUb3VjaEV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2hlbiB3ZSdyZSBpbiBhIHRvdWNoIGV2ZW50LCByZWNvcmQgdG91Y2hlcyB0byAgZGUtZHVwZSBzeW50aGV0aWMgbW91c2UgZXZlbnRcbiAgICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgICAgIHJlY29yZFRvdWNoZXMuY2FsbCh0aGlzLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTW91c2UgJiYgaXNTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGlucHV0RGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRvdWNoLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5tb3VzZS5kZXN0cm95KCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHJlY29yZFRvdWNoZXMoZXZlbnRUeXBlLCBldmVudERhdGEpIHtcbiAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdLmlkZW50aWZpZXI7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0TGFzdFRvdWNoKGV2ZW50RGF0YSkge1xuICAgIHZhciB0b3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF07XG5cbiAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5wcmltYXJ5VG91Y2gpIHtcbiAgICAgICAgdmFyIGxhc3RUb3VjaCA9IHt4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZfTtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2hlcy5wdXNoKGxhc3RUb3VjaCk7XG4gICAgICAgIHZhciBsdHMgPSB0aGlzLmxhc3RUb3VjaGVzO1xuICAgICAgICB2YXIgcmVtb3ZlTGFzdFRvdWNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGx0cy5pbmRleE9mKGxhc3RUb3VjaCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChyZW1vdmVMYXN0VG91Y2gsIERFRFVQX1RJTUVPVVQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTeW50aGV0aWNFdmVudChldmVudERhdGEpIHtcbiAgICB2YXIgeCA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRYLCB5ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhc3RUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5sYXN0VG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoeCAtIHQueCksIGR5ID0gTWF0aC5hYnMoeSAtIHQueSk7XG4gICAgICAgIGlmIChkeCA8PSBERURVUF9ESVNUQU5DRSAmJiBkeSA8PSBERURVUF9ESVNUQU5DRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgUFJFRklYRURfVE9VQ0hfQUNUSU9OID0gcHJlZml4ZWQoVEVTVF9FTEVNRU5ULnN0eWxlLCAndG91Y2hBY3Rpb24nKTtcbnZhciBOQVRJVkVfVE9VQ0hfQUNUSU9OID0gUFJFRklYRURfVE9VQ0hfQUNUSU9OICE9PSB1bmRlZmluZWQ7XG5cbi8vIG1hZ2ljYWwgdG91Y2hBY3Rpb24gdmFsdWVcbnZhciBUT1VDSF9BQ1RJT05fQ09NUFVURSA9ICdjb21wdXRlJztcbnZhciBUT1VDSF9BQ1RJT05fQVVUTyA9ICdhdXRvJztcbnZhciBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OID0gJ21hbmlwdWxhdGlvbic7IC8vIG5vdCBpbXBsZW1lbnRlZFxudmFyIFRPVUNIX0FDVElPTl9OT05FID0gJ25vbmUnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWCA9ICdwYW4teCc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9ZID0gJ3Bhbi15JztcbnZhciBUT1VDSF9BQ1RJT05fTUFQID0gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpO1xuXG4vKipcbiAqIFRvdWNoIEFjdGlvblxuICogc2V0cyB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgb3IgdXNlcyB0aGUganMgYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVG91Y2hBY3Rpb24obWFuYWdlciwgdmFsdWUpIHtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuc2V0KHZhbHVlKTtcbn1cblxuVG91Y2hBY3Rpb24ucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWUgb24gdGhlIGVsZW1lbnQgb3IgZW5hYmxlIHRoZSBwb2x5ZmlsbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gZmluZCBvdXQgdGhlIHRvdWNoLWFjdGlvbiBieSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgaWYgKHZhbHVlID09IFRPVUNIX0FDVElPTl9DT01QVVRFKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29tcHV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5BVElWRV9UT1VDSF9BQ1RJT04gJiYgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGUgJiYgVE9VQ0hfQUNUSU9OX01BUFt2YWx1ZV0pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlW1BSRUZJWEVEX1RPVUNIX0FDVElPTl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICoganVzdCByZS1zZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5tYW5hZ2VyLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb21wdXRlIHRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IGJhc2VkIG9uIHRoZSByZWNvZ25pemVyJ3Mgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGNvbXB1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBlYWNoKHRoaXMubWFuYWdlci5yZWNvZ25pemVycywgZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICAgICAgaWYgKGJvb2xPckZuKHJlY29nbml6ZXIub3B0aW9ucy5lbmFibGUsIFtyZWNvZ25pemVyXSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQocmVjb2duaXplci5nZXRUb3VjaEFjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zLmpvaW4oJyAnKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBvbiBlYWNoIGlucHV0IGN5Y2xlIGFuZCBwcm92aWRlcyB0aGUgcHJldmVudGluZyBvZiB0aGUgYnJvd3NlciBiZWhhdmlvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHByZXZlbnREZWZhdWx0czogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNyY0V2ZW50ID0gaW5wdXQuc3JjRXZlbnQ7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5vZmZzZXREaXJlY3Rpb247XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvdWNoIGFjdGlvbiBkaWQgcHJldmVudGVkIG9uY2UgdGhpcyBzZXNzaW9uXG4gICAgICAgIGlmICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGhhc05vbmUgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgICAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9ZXTtcbiAgICAgICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWF07XG5cbiAgICAgICAgaWYgKGhhc05vbmUpIHtcbiAgICAgICAgICAgIC8vZG8gbm90IHByZXZlbnQgZGVmYXVsdHMgaWYgdGhpcyBpcyBhIHRhcCBnZXN0dXJlXG5cbiAgICAgICAgICAgIHZhciBpc1RhcFBvaW50ZXIgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICB2YXIgaXNUYXBNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgMjtcbiAgICAgICAgICAgIHZhciBpc1RhcFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IDI1MDtcblxuICAgICAgICAgICAgaWYgKGlzVGFwUG9pbnRlciAmJiBpc1RhcE1vdmVtZW50ICYmIGlzVGFwVG91Y2hUaW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICAgICAgLy8gYHBhbi14IHBhbi15YCBtZWFucyBicm93c2VyIGhhbmRsZXMgYWxsIHNjcm9sbGluZy9wYW5uaW5nLCBkbyBub3QgcHJldmVudFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc05vbmUgfHxcbiAgICAgICAgICAgIChoYXNQYW5ZICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB8fFxuICAgICAgICAgICAgKGhhc1BhblggJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudFNyYyhzcmNFdmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbCBwcmV2ZW50RGVmYXVsdCB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvciAoc2Nyb2xsaW5nIGluIG1vc3QgY2FzZXMpXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNyY0V2ZW50XG4gICAgICovXG4gICAgcHJldmVudFNyYzogZnVuY3Rpb24oc3JjRXZlbnQpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIHdoZW4gdGhlIHRvdWNoQWN0aW9ucyBhcmUgY29sbGVjdGVkIHRoZXkgYXJlIG5vdCBhIHZhbGlkIHZhbHVlLCBzbyB3ZSBuZWVkIHRvIGNsZWFuIHRoaW5ncyB1cC4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgLy8gbm9uZVxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSk7XG5cbiAgICAvLyBpZiBib3RoIHBhbi14IGFuZCBwYW4teSBhcmUgc2V0IChkaWZmZXJlbnQgcmVjb2duaXplcnNcbiAgICAvLyBmb3IgZGlmZmVyZW50IGRpcmVjdGlvbnMsIGUuZy4gaG9yaXpvbnRhbCBwYW4gYnV0IHZlcnRpY2FsIHN3aXBlPylcbiAgICAvLyB3ZSBuZWVkIG5vbmUgKGFzIG90aGVyd2lzZSB3aXRoIHBhbi14IHBhbi15IGNvbWJpbmVkIG5vbmUgb2YgdGhlc2VcbiAgICAvLyByZWNvZ25pemVycyB3aWxsIHdvcmssIHNpbmNlIHRoZSBicm93c2VyIHdvdWxkIGhhbmRsZSBhbGwgcGFubmluZ1xuICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIC8vIHBhbi14IE9SIHBhbi15XG4gICAgaWYgKGhhc1BhblggfHwgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gaGFzUGFuWCA/IFRPVUNIX0FDVElPTl9QQU5fWCA6IFRPVUNIX0FDVElPTl9QQU5fWTtcbiAgICB9XG5cbiAgICAvLyBtYW5pcHVsYXRpb25cbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTikpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT047XG4gICAgfVxuXG4gICAgcmV0dXJuIFRPVUNIX0FDVElPTl9BVVRPO1xufVxuXG5mdW5jdGlvbiBnZXRUb3VjaEFjdGlvblByb3BzKCkge1xuICAgIGlmICghTkFUSVZFX1RPVUNIX0FDVElPTikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0b3VjaE1hcCA9IHt9O1xuICAgIHZhciBjc3NTdXBwb3J0cyA9IHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5zdXBwb3J0cztcbiAgICBbJ2F1dG8nLCAnbWFuaXB1bGF0aW9uJywgJ3Bhbi15JywgJ3Bhbi14JywgJ3Bhbi14IHBhbi15JywgJ25vbmUnXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xuXG4gICAgICAgIC8vIElmIGNzcy5zdXBwb3J0cyBpcyBub3Qgc3VwcG9ydGVkIGJ1dCB0aGVyZSBpcyBuYXRpdmUgdG91Y2gtYWN0aW9uIGFzc3VtZSBpdCBzdXBwb3J0c1xuICAgICAgICAvLyBhbGwgdmFsdWVzLiBUaGlzIGlzIHRoZSBjYXNlIGZvciBJRSAxMCBhbmQgMTEuXG4gICAgICAgIHRvdWNoTWFwW3ZhbF0gPSBjc3NTdXBwb3J0cyA/IHdpbmRvdy5DU1Muc3VwcG9ydHMoJ3RvdWNoLWFjdGlvbicsIHZhbCkgOiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiB0b3VjaE1hcDtcbn1cblxuLyoqXG4gKiBSZWNvZ25pemVyIGZsb3cgZXhwbGFpbmVkOyAqXG4gKiBBbGwgcmVjb2duaXplcnMgaGF2ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvZiBQT1NTSUJMRSB3aGVuIGEgaW5wdXQgc2Vzc2lvbiBzdGFydHMuXG4gKiBUaGUgZGVmaW5pdGlvbiBvZiBhIGlucHV0IHNlc3Npb24gaXMgZnJvbSB0aGUgZmlyc3QgaW5wdXQgdW50aWwgdGhlIGxhc3QgaW5wdXQsIHdpdGggYWxsIGl0J3MgbW92ZW1lbnQgaW4gaXQuICpcbiAqIEV4YW1wbGUgc2Vzc2lvbiBmb3IgbW91c2UtaW5wdXQ6IG1vdXNlZG93biAtPiBtb3VzZW1vdmUgLT4gbW91c2V1cFxuICpcbiAqIE9uIGVhY2ggcmVjb2duaXppbmcgY3ljbGUgKHNlZSBNYW5hZ2VyLnJlY29nbml6ZSkgdGhlIC5yZWNvZ25pemUoKSBtZXRob2QgaXMgZXhlY3V0ZWRcbiAqIHdoaWNoIGRldGVybWluZXMgd2l0aCBzdGF0ZSBpdCBzaG91bGQgYmUuXG4gKlxuICogSWYgdGhlIHJlY29nbml6ZXIgaGFzIHRoZSBzdGF0ZSBGQUlMRUQsIENBTkNFTExFRCBvciBSRUNPR05JWkVEIChlcXVhbHMgRU5ERUQpLCBpdCBpcyByZXNldCB0b1xuICogUE9TU0lCTEUgdG8gZ2l2ZSBpdCBhbm90aGVyIGNoYW5nZSBvbiB0aGUgbmV4dCBjeWNsZS5cbiAqXG4gKiAgICAgICAgICAgICAgIFBvc3NpYmxlXG4gKiAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgKy0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgKy0tLS0tKy0tLS0tKyAgICAgICAgICAgICAgIHxcbiAqICAgICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgIHxcbiAqICAgRmFpbGVkICAgICAgQ2FuY2VsbGVkICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgUmVjb2duaXplZCAgICAgICBCZWdhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kZWQvUmVjb2duaXplZFxuICovXG52YXIgU1RBVEVfUE9TU0lCTEUgPSAxO1xudmFyIFNUQVRFX0JFR0FOID0gMjtcbnZhciBTVEFURV9DSEFOR0VEID0gNDtcbnZhciBTVEFURV9FTkRFRCA9IDg7XG52YXIgU1RBVEVfUkVDT0dOSVpFRCA9IFNUQVRFX0VOREVEO1xudmFyIFNUQVRFX0NBTkNFTExFRCA9IDE2O1xudmFyIFNUQVRFX0ZBSUxFRCA9IDMyO1xuXG4vKipcbiAqIFJlY29nbml6ZXJcbiAqIEV2ZXJ5IHJlY29nbml6ZXIgbmVlZHMgdG8gZXh0ZW5kIGZyb20gdGhpcyBjbGFzcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gUmVjb2duaXplcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMuaWQgPSB1bmlxdWVJZCgpO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbnVsbDtcblxuICAgIC8vIGRlZmF1bHQgaXMgZW5hYmxlIHRydWVcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlID0gaWZVbmRlZmluZWQodGhpcy5vcHRpb25zLmVuYWJsZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG5cbiAgICB0aGlzLnNpbXVsdGFuZW91cyA9IHt9O1xuICAgIHRoaXMucmVxdWlyZUZhaWwgPSBbXTtcbn1cblxuUmVjb2duaXplci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7fSxcblxuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtSZWNvZ25pemVyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBhbHNvIHVwZGF0ZSB0aGUgdG91Y2hBY3Rpb24sIGluIGNhc2Ugc29tZXRoaW5nIGNoYW5nZWQgYWJvdXQgdGhlIGRpcmVjdGlvbnMvZW5hYmxlZCBzdGF0ZVxuICAgICAgICB0aGlzLm1hbmFnZXIgJiYgdGhpcy5tYW5hZ2VyLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaW11bHRhbmVvdXMgPSB0aGlzLnNpbXVsdGFuZW91cztcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoIXNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdKSB7XG4gICAgICAgICAgICBzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSA9IG90aGVyUmVjb2duaXplcjtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZWNvZ25pemVXaXRoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSBzaW11bHRhbmVvdXMgbGluay4gaXQgZG9lc250IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplciBjYW4gb25seSBydW4gd2hlbiBhbiBvdGhlciBpcyBmYWlsaW5nXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlcXVpcmVGYWlsID0gdGhpcy5yZXF1aXJlRmFpbDtcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoaW5BcnJheShyZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJlcXVpcmVGYWlsLnB1c2gob3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZXF1aXJlRmFpbHVyZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgcmVxdWlyZUZhaWx1cmUgbGluay4gaXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHRoaXMucmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcik7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVGYWlsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGhhcyByZXF1aXJlIGZhaWx1cmVzIGJvb2xlYW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNSZXF1aXJlRmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGggPiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgcmVjb2duaXplciBjYW4gcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNhblJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICByZXR1cm4gISF0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBZb3Ugc2hvdWxkIHVzZSBgdHJ5RW1pdGAgaW5zdGVhZCBvZiBgZW1pdGAgZGlyZWN0bHkgdG8gY2hlY2tcbiAgICAgKiB0aGF0IGFsbCB0aGUgbmVlZGVkIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQgYmVmb3JlIGVtaXR0aW5nLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIuZW1pdChldmVudCwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ3BhbnN0YXJ0JyBhbmQgJ3Bhbm1vdmUnXG4gICAgICAgIGlmIChzdGF0ZSA8IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCk7IC8vIHNpbXBsZSAnZXZlbnROYW1lJyBldmVudHNcblxuICAgICAgICBpZiAoaW5wdXQuYWRkaXRpb25hbEV2ZW50KSB7IC8vIGFkZGl0aW9uYWwgZXZlbnQocGFubGVmdCwgcGFucmlnaHQsIHBpbmNoaW4sIHBpbmNob3V0Li4uKVxuICAgICAgICAgICAgZW1pdChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGFuZW5kIGFuZCBwYW5jYW5jZWxcbiAgICAgICAgaWYgKHN0YXRlID49IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhhdCBhbGwgdGhlIHJlcXVpcmUgZmFpbHVyZSByZWNvZ25pemVycyBoYXMgZmFpbGVkLFxuICAgICAqIGlmIHRydWUsIGl0IGVtaXRzIGEgZ2VzdHVyZSBldmVudCxcbiAgICAgKiBvdGhlcndpc2UsIHNldHVwIHRoZSBzdGF0ZSB0byBGQUlMRUQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgdHJ5RW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuRW1pdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpdCdzIGZhaWxpbmcgYW55d2F5XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbiB3ZSBlbWl0P1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNhbkVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMucmVxdWlyZUZhaWxbaV0uc3RhdGUgJiAoU1RBVEVfRkFJTEVEIHwgU1RBVEVfUE9TU0lCTEUpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIC8vIG1ha2UgYSBuZXcgY29weSBvZiB0aGUgaW5wdXREYXRhXG4gICAgICAgIC8vIHNvIHdlIGNhbiBjaGFuZ2UgdGhlIGlucHV0RGF0YSB3aXRob3V0IG1lc3NpbmcgdXAgdGhlIG90aGVyIHJlY29nbml6ZXJzXG4gICAgICAgIHZhciBpbnB1dERhdGFDbG9uZSA9IGFzc2lnbih7fSwgaW5wdXREYXRhKTtcblxuICAgICAgICAvLyBpcyBpcyBlbmFibGVkIGFuZCBhbGxvdyByZWNvZ25pemluZz9cbiAgICAgICAgaWYgKCFib29sT3JGbih0aGlzLm9wdGlvbnMuZW5hYmxlLCBbdGhpcywgaW5wdXREYXRhQ2xvbmVdKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gd2UndmUgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX1JFQ09HTklaRUQgfCBTVEFURV9DQU5DRUxMRUQgfCBTVEFURV9GQUlMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5wcm9jZXNzKGlucHV0RGF0YUNsb25lKTtcblxuICAgICAgICAvLyB0aGUgcmVjb2duaXplciBoYXMgcmVjb2duaXplZCBhIGdlc3R1cmVcbiAgICAgICAgLy8gc28gdHJpZ2dlciBhbiBldmVudFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCB8IFNUQVRFX0NBTkNFTExFRCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJ5RW1pdChpbnB1dERhdGFDbG9uZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBzdGF0ZSBvZiB0aGUgcmVjb2duaXplclxuICAgICAqIHRoZSBhY3R1YWwgcmVjb2duaXppbmcgaGFwcGVucyBpbiB0aGlzIG1ldGhvZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqIEByZXR1cm5zIHtDb25zdH0gU1RBVEVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dERhdGEpIHsgfSwgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHByZWZlcnJlZCB0b3VjaC1hY3Rpb25cbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgZ2VzdHVyZSBpc24ndCBhbGxvd2VkIHRvIHJlY29nbml6ZVxuICAgICAqIGxpa2Ugd2hlbiBhbm90aGVyIGlzIGJlaW5nIHJlY29nbml6ZWQgb3IgaXQgaXMgZGlzYWJsZWRcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbigpIHsgfVxufTtcblxuLyoqXG4gKiBnZXQgYSB1c2FibGUgc3RyaW5nLCB1c2VkIGFzIGV2ZW50IHBvc3RmaXhcbiAqIEBwYXJhbSB7Q29uc3R9IHN0YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdGF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZVN0cihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSAmIFNUQVRFX0NBTkNFTExFRCkge1xuICAgICAgICByZXR1cm4gJ2NhbmNlbCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0VOREVEKSB7XG4gICAgICAgIHJldHVybiAnZW5kJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQ0hBTkdFRCkge1xuICAgICAgICByZXR1cm4gJ21vdmUnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9CRUdBTikge1xuICAgICAgICByZXR1cm4gJ3N0YXJ0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGRpcmVjdGlvbiBjb25zIHRvIHN0cmluZ1xuICogQHBhcmFtIHtDb25zdH0gZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBkaXJlY3Rpb25TdHIoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fRE9XTikge1xuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9VUCkge1xuICAgICAgICByZXR1cm4gJ3VwJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fTEVGVCkge1xuICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9SSUdIVCkge1xuICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGdldCBhIHJlY29nbml6ZXIgYnkgbmFtZSBpZiBpdCBpcyBib3VuZCB0byBhIG1hbmFnZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IG90aGVyUmVjb2duaXplclxuICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gKiBAcmV0dXJucyB7UmVjb2duaXplcn1cbiAqL1xuZnVuY3Rpb24gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHJlY29nbml6ZXIpIHtcbiAgICB2YXIgbWFuYWdlciA9IHJlY29nbml6ZXIubWFuYWdlcjtcbiAgICBpZiAobWFuYWdlcikge1xuICAgICAgICByZXR1cm4gbWFuYWdlci5nZXQob3RoZXJSZWNvZ25pemVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG90aGVyUmVjb2duaXplcjtcbn1cblxuLyoqXG4gKiBUaGlzIHJlY29nbml6ZXIgaXMganVzdCB1c2VkIGFzIGEgYmFzZSBmb3IgdGhlIHNpbXBsZSBhdHRyaWJ1dGUgcmVjb2duaXplcnMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gQXR0clJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KEF0dHJSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNoZWNrIGlmIGl0IHRoZSByZWNvZ25pemVyIHJlY2VpdmVzIHZhbGlkIGlucHV0LCBsaWtlIGlucHV0LmRpc3RhbmNlID4gMTAuXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHJlY29nbml6ZWRcbiAgICAgKi9cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvblBvaW50ZXJzID0gdGhpcy5vcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICByZXR1cm4gb3B0aW9uUG9pbnRlcnMgPT09IDAgfHwgaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25Qb2ludGVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgaW5wdXQgYW5kIHJldHVybiB0aGUgc3RhdGUgZm9yIHRoZSByZWNvZ25pemVyXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMgeyp9IFN0YXRlXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IGlucHV0LmV2ZW50VHlwZTtcblxuICAgICAgICB2YXIgaXNSZWNvZ25pemVkID0gc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmF0dHJUZXN0KGlucHV0KTtcblxuICAgICAgICAvLyBvbiBjYW5jZWwgaW5wdXQgYW5kIHdlJ3ZlIHJlY29nbml6ZWQgYmVmb3JlLCByZXR1cm4gU1RBVEVfQ0FOQ0VMTEVEXG4gICAgICAgIGlmIChpc1JlY29nbml6ZWQgJiYgKGV2ZW50VHlwZSAmIElOUFVUX0NBTkNFTCB8fCAhaXNWYWxpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NBTkNFTExFRDtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlY29nbml6ZWQgfHwgaXNWYWxpZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0VOREVEO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKHN0YXRlICYgU1RBVEVfQkVHQU4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0hBTkdFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBhblxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gYW5kIG1vdmVkIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGFuUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wWCA9IG51bGw7XG4gICAgdGhpcy5wWSA9IG51bGw7XG59XG5cbmluaGVyaXQoUGFuUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBhblJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BhbicsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9BTExcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9LFxuXG4gICAgZGlyZWN0aW9uVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciBoYXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGlucHV0LmRpc3RhbmNlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgeCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdmFyIHkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgLy8gbG9jayB0byBheGlzP1xuICAgICAgICBpZiAoIShkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHggPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeCA8IDApID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB4ICE9IHRoaXMucFg7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeSA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh5IDwgMCkgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHkgIT0gdGhpcy5wWTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gaGFzTW92ZWQgJiYgZGlzdGFuY2UgPiBvcHRpb25zLnRocmVzaG9sZCAmJiBkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBBdHRyUmVjb2duaXplci5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgICh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4gfHwgKCEodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKSAmJiB0aGlzLmRpcmVjdGlvblRlc3QoaW5wdXQpKSk7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG5cbiAgICAgICAgdGhpcy5wWCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdGhpcy5wWSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0LmRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGluY2hcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVycyBhcmUgbW92aW5nIHRvd2FyZCAoem9vbS1pbikgb3IgYXdheSBmcm9tIGVhY2ggb3RoZXIgKHpvb20tb3V0KS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGluY2hSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUGluY2hSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwaW5jaCcsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnNjYWxlIC0gMSkgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgdmFyIGluT3V0ID0gaW5wdXQuc2NhbGUgPCAxID8gJ2luJyA6ICdvdXQnO1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgaW5PdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQcmVzc1xuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gZm9yIHggbXMgd2l0aG91dCBhbnkgbW92ZW1lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUHJlc3NSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG59XG5cbmluaGVyaXQoUHJlc3NSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQcmVzc1JlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3ByZXNzJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRpbWU6IDI1MSwgLy8gbWluaW1hbCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIHByZXNzZWRcbiAgICAgICAgdGhyZXNob2xkOiA5IC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fQVVUT107XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUaW1lID0gaW5wdXQuZGVsdGFUaW1lID4gb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAoIXZhbGlkTW92ZW1lbnQgfHwgIXZhbGlkUG9pbnRlcnMgfHwgKGlucHV0LmV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmICF2YWxpZFRpbWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICB9LCBvcHRpb25zLnRpbWUsIHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyAndXAnLCBpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogUm90YXRlXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlciBhcmUgbW92aW5nIGluIGEgY2lyY3VsYXIgbW90aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBSb3RhdGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUm90YXRlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFJvdGF0ZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3JvdGF0ZScsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnJvdGF0aW9uKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBTd2lwZVxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmluZyBmYXN0ICh2ZWxvY2l0eSksIHdpdGggZW5vdWdoIGRpc3RhbmNlIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gU3dpcGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU3dpcGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgU3dpcGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdzd2lwZScsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHZlbG9jaXR5OiAwLjMsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBhblJlY29nbml6ZXIucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHZlbG9jaXR5O1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiAoRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICBkaXJlY3Rpb24gJiBpbnB1dC5vZmZzZXREaXJlY3Rpb24gJiZcbiAgICAgICAgICAgIGlucHV0LmRpc3RhbmNlID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCAmJlxuICAgICAgICAgICAgaW5wdXQubWF4UG9pbnRlcnMgPT0gdGhpcy5vcHRpb25zLnBvaW50ZXJzICYmXG4gICAgICAgICAgICBhYnModmVsb2NpdHkpID4gdGhpcy5vcHRpb25zLnZlbG9jaXR5ICYmIGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORDtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5vZmZzZXREaXJlY3Rpb24pO1xuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb24sIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEEgdGFwIGlzIGVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvaW5nIGEgc21hbGwgdGFwL2NsaWNrLiBNdWx0aXBsZSB0YXBzIGFyZSByZWNvZ25pemVkIGlmIHRoZXkgb2NjdXJcbiAqIGJldHdlZW4gdGhlIGdpdmVuIGludGVydmFsIGFuZCBwb3NpdGlvbi4gVGhlIGRlbGF5IG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZWNvZ25pemUgbXVsdGktdGFwcyB3aXRob3V0IGZpcmluZ1xuICogYSBzaW5nbGUgdGFwLlxuICpcbiAqIFRoZSBldmVudERhdGEgZnJvbSB0aGUgZW1pdHRlZCBldmVudCBjb250YWlucyB0aGUgcHJvcGVydHkgYHRhcENvdW50YCwgd2hpY2ggY29udGFpbnMgdGhlIGFtb3VudCBvZlxuICogbXVsdGktdGFwcyBiZWluZyByZWNvZ25pemVkLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFRhcFJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gcHJldmlvdXMgdGltZSBhbmQgY2VudGVyLFxuICAgIC8vIHVzZWQgZm9yIHRhcCBjb3VudGluZ1xuICAgIHRoaXMucFRpbWUgPSBmYWxzZTtcbiAgICB0aGlzLnBDZW50ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG4gICAgdGhpcy5jb3VudCA9IDA7XG59XG5cbmluaGVyaXQoVGFwUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICd0YXAnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGFwczogMSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMCwgLy8gbWF4IHRpbWUgYmV0d2VlbiB0aGUgbXVsdGktdGFwIHRhcHNcbiAgICAgICAgdGltZTogMjUwLCAvLyBtYXggdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBkb3duIChsaWtlIGZpbmdlciBvbiB0aGUgc2NyZWVuKVxuICAgICAgICB0aHJlc2hvbGQ6IDksIC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgICAgIHBvc1RocmVzaG9sZDogMTAgLy8gYSBtdWx0aS10YXAgY2FuIGJlIGEgYml0IG9mZiB0aGUgaW5pdGlhbCBwb3NpdGlvblxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTl07XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkgJiYgKHRoaXMuY291bnQgPT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAodmFsaWRNb3ZlbWVudCAmJiB2YWxpZFRvdWNoVGltZSAmJiB2YWxpZFBvaW50ZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWxpZEludGVydmFsID0gdGhpcy5wVGltZSA/IChpbnB1dC50aW1lU3RhbXAgLSB0aGlzLnBUaW1lIDwgb3B0aW9ucy5pbnRlcnZhbCkgOiB0cnVlO1xuICAgICAgICAgICAgdmFyIHZhbGlkTXVsdGlUYXAgPSAhdGhpcy5wQ2VudGVyIHx8IGdldERpc3RhbmNlKHRoaXMucENlbnRlciwgaW5wdXQuY2VudGVyKSA8IG9wdGlvbnMucG9zVGhyZXNob2xkO1xuXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gaW5wdXQudGltZVN0YW1wO1xuICAgICAgICAgICAgdGhpcy5wQ2VudGVyID0gaW5wdXQuY2VudGVyO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkTXVsdGlUYXAgfHwgIXZhbGlkSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgICAgICAvLyBpZiB0YXAgY291bnQgbWF0Y2hlcyB3ZSBoYXZlIHJlY29nbml6ZWQgaXQsXG4gICAgICAgICAgICAvLyBlbHNlIGl0IGhhcyBiZWdhbiByZWNvZ25pemluZy4uLlxuICAgICAgICAgICAgdmFyIHRhcENvdW50ID0gdGhpcy5jb3VudCAlIG9wdGlvbnMudGFwcztcbiAgICAgICAgICAgIGlmICh0YXBDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGZhaWxpbmcgcmVxdWlyZW1lbnRzLCBpbW1lZGlhdGVseSB0cmlnZ2VyIHRoZSB0YXAgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyBvciB3YWl0IGFzIGxvbmcgYXMgdGhlIG11bHRpdGFwIGludGVydmFsIHRvIHRyaWdnZXJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZUZhaWx1cmVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIGZhaWxUaW1lb3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRhcENvdW50ID0gdGhpcy5jb3VudDtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogU2ltcGxlIHdheSB0byBjcmVhdGUgYSBtYW5hZ2VyIHdpdGggYSBkZWZhdWx0IHNldCBvZiByZWNvZ25pemVycy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIYW1tZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMucmVjb2duaXplcnMgPSBpZlVuZGVmaW5lZChvcHRpb25zLnJlY29nbml6ZXJzLCBIYW1tZXIuZGVmYXVsdHMucHJlc2V0KTtcbiAgICByZXR1cm4gbmV3IE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQGNvbnN0IHtzdHJpbmd9XG4gKi9cbkhhbW1lci5WRVJTSU9OID0gJzIuMC43JztcblxuLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKiBAbmFtZXNwYWNlXG4gKi9cbkhhbW1lci5kZWZhdWx0cyA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgaWYgRE9NIGV2ZW50cyBhcmUgYmVpbmcgdHJpZ2dlcmVkLlxuICAgICAqIEJ1dCB0aGlzIGlzIHNsb3dlciBhbmQgdW51c2VkIGJ5IHNpbXBsZSBpbXBsZW1lbnRhdGlvbnMsIHNvIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBkb21FdmVudHM6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkvZmFsbGJhY2suXG4gICAgICogV2hlbiBzZXQgdG8gYGNvbXB1dGVgIGl0IHdpbGwgbWFnaWNhbGx5IHNldCB0aGUgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgYWRkZWQgcmVjb2duaXplcnMuXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBjb21wdXRlXG4gICAgICovXG4gICAgdG91Y2hBY3Rpb246IFRPVUNIX0FDVElPTl9DT01QVVRFLFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGVuYWJsZTogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIEVYUEVSSU1FTlRBTCBGRUFUVVJFIC0tIGNhbiBiZSByZW1vdmVkL2NoYW5nZWRcbiAgICAgKiBDaGFuZ2UgdGhlIHBhcmVudCBpbnB1dCB0YXJnZXQgZWxlbWVudC5cbiAgICAgKiBJZiBOdWxsLCB0aGVuIGl0IGlzIGJlaW5nIHNldCB0aGUgdG8gbWFpbiBlbGVtZW50LlxuICAgICAqIEB0eXBlIHtOdWxsfEV2ZW50VGFyZ2V0fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dFRhcmdldDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIGZvcmNlIGFuIGlucHV0IGNsYXNzXG4gICAgICogQHR5cGUge051bGx8RnVuY3Rpb259XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0Q2xhc3M6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHJlY29nbml6ZXIgc2V0dXAgd2hlbiBjYWxsaW5nIGBIYW1tZXIoKWBcbiAgICAgKiBXaGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIgdGhlc2Ugd2lsbCBiZSBza2lwcGVkLlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwcmVzZXQ6IFtcbiAgICAgICAgLy8gUmVjb2duaXplckNsYXNzLCBvcHRpb25zLCBbcmVjb2duaXplV2l0aCwgLi4uXSwgW3JlcXVpcmVGYWlsdXJlLCAuLi5dXG4gICAgICAgIFtSb3RhdGVSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX1dLFxuICAgICAgICBbUGluY2hSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX0sIFsncm90YXRlJ11dLFxuICAgICAgICBbU3dpcGVSZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH1dLFxuICAgICAgICBbUGFuUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9LCBbJ3N3aXBlJ11dLFxuICAgICAgICBbVGFwUmVjb2duaXplcl0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyLCB7ZXZlbnQ6ICdkb3VibGV0YXAnLCB0YXBzOiAyfSwgWyd0YXAnXV0sXG4gICAgICAgIFtQcmVzc1JlY29nbml6ZXJdXG4gICAgXSxcblxuICAgIC8qKlxuICAgICAqIFNvbWUgQ1NTIHByb3BlcnRpZXMgY2FuIGJlIHVzZWQgdG8gaW1wcm92ZSB0aGUgd29ya2luZyBvZiBIYW1tZXIuXG4gICAgICogQWRkIHRoZW0gdG8gdGhpcyBtZXRob2QgYW5kIHRoZXkgd2lsbCBiZSBzZXQgd2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyLlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBjc3NQcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGV4dCBzZWxlY3Rpb24gdG8gaW1wcm92ZSB0aGUgZHJhZ2dpbmcgZ2VzdHVyZS4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSB0aGUgV2luZG93cyBQaG9uZSBncmlwcGVycyB3aGVuIHByZXNzaW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGRlZmF1bHQgY2FsbG91dCBzaG93biB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldC5cbiAgICAgICAgICogT24gaU9TLCB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldCBzdWNoIGFzIGEgbGluaywgU2FmYXJpIGRpc3BsYXlzXG4gICAgICAgICAqIGEgY2FsbG91dCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBsaW5rLiBUaGlzIHByb3BlcnR5IGFsbG93cyB5b3UgdG8gZGlzYWJsZSB0aGF0IGNhbGxvdXQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHpvb21pbmcgaXMgZW5hYmxlZC4gVXNlZCBieSBJRTEwPlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRab29taW5nOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB0aGF0IGFuIGVudGlyZSBlbGVtZW50IHNob3VsZCBiZSBkcmFnZ2FibGUgaW5zdGVhZCBvZiBpdHMgY29udGVudHMuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyRHJhZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZXMgdGhlIGhpZ2hsaWdodCBjb2xvciBzaG93biB3aGVuIHRoZSB1c2VyIHRhcHMgYSBsaW5rIG9yIGEgSmF2YVNjcmlwdFxuICAgICAgICAgKiBjbGlja2FibGUgZWxlbWVudCBpbiBpT1MuIFRoaXMgcHJvcGVydHkgb2JleXMgdGhlIGFscGhhIHZhbHVlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdyZ2JhKDAsMCwwLDApJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGFwSGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDAsMCwwLDApJ1xuICAgIH1cbn07XG5cbnZhciBTVE9QID0gMTtcbnZhciBGT1JDRURfU1RPUCA9IDI7XG5cbi8qKlxuICogTWFuYWdlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgSGFtbWVyLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCA9IHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCB8fCBlbGVtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgIHRoaXMucmVjb2duaXplcnMgPSBbXTtcbiAgICB0aGlzLm9sZENzc1Byb3BzID0ge307XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5wdXQgPSBjcmVhdGVJbnB1dEluc3RhbmNlKHRoaXMpO1xuICAgIHRoaXMudG91Y2hBY3Rpb24gPSBuZXcgVG91Y2hBY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLnRvdWNoQWN0aW9uKTtcblxuICAgIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIHRydWUpO1xuXG4gICAgZWFjaCh0aGlzLm9wdGlvbnMucmVjb2duaXplcnMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIHJlY29nbml6ZXIgPSB0aGlzLmFkZChuZXcgKGl0ZW1bMF0pKGl0ZW1bMV0pKTtcbiAgICAgICAgaXRlbVsyXSAmJiByZWNvZ25pemVyLnJlY29nbml6ZVdpdGgoaXRlbVsyXSk7XG4gICAgICAgIGl0ZW1bM10gJiYgcmVjb2duaXplci5yZXF1aXJlRmFpbHVyZShpdGVtWzNdKTtcbiAgICB9LCB0aGlzKTtcbn1cblxuTWFuYWdlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBPcHRpb25zIHRoYXQgbmVlZCBhIGxpdHRsZSBtb3JlIHNldHVwXG4gICAgICAgIGlmIChvcHRpb25zLnRvdWNoQWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmlucHV0VGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBleGlzdGluZyBldmVudCBsaXN0ZW5lcnMgYW5kIHJlaW5pdGlhbGl6ZVxuICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnRhcmdldCA9IG9wdGlvbnMuaW5wdXRUYXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogc3RvcCByZWNvZ25pemluZyBmb3IgdGhpcyBzZXNzaW9uLlxuICAgICAqIFRoaXMgc2Vzc2lvbiB3aWxsIGJlIGRpc2NhcmRlZCwgd2hlbiBhIG5ldyBbaW5wdXRdc3RhcnQgZXZlbnQgaXMgZmlyZWQuXG4gICAgICogV2hlbiBmb3JjZWQsIHRoZSByZWNvZ25pemVyIGN5Y2xlIGlzIHN0b3BwZWQgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oZm9yY2UpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnN0b3BwZWQgPSBmb3JjZSA/IEZPUkNFRF9TVE9QIDogU1RPUDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcnVuIHRoZSByZWNvZ25pemVycyFcbiAgICAgKiBjYWxsZWQgYnkgdGhlIGlucHV0SGFuZGxlciBmdW5jdGlvbiBvbiBldmVyeSBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlcnMgKHRvdWNoZXMpXG4gICAgICogaXQgd2Fsa3MgdGhyb3VnaCBhbGwgdGhlIHJlY29nbml6ZXJzIGFuZCB0cmllcyB0byBkZXRlY3QgdGhlIGdlc3R1cmUgdGhhdCBpcyBiZWluZyBtYWRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5zZXNzaW9uO1xuICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBydW4gdGhlIHRvdWNoLWFjdGlvbiBwb2x5ZmlsbFxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnByZXZlbnREZWZhdWx0cyhpbnB1dERhdGEpO1xuXG4gICAgICAgIHZhciByZWNvZ25pemVyO1xuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuXG4gICAgICAgIC8vIHRoaXMgaG9sZHMgdGhlIHJlY29nbml6ZXIgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAvLyBzbyB0aGUgcmVjb2duaXplcidzIHN0YXRlIG5lZWRzIHRvIGJlIEJFR0FOLCBDSEFOR0VELCBFTkRFRCBvciBSRUNPR05JWkVEXG4gICAgICAgIC8vIGlmIG5vIHJlY29nbml6ZXIgaXMgZGV0ZWN0aW5nIGEgdGhpbmcsIGl0IGlzIHNldCB0byBgbnVsbGBcbiAgICAgICAgdmFyIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXI7XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB0aGUgbGFzdCByZWNvZ25pemVyIGlzIHJlY29nbml6ZWRcbiAgICAgICAgLy8gb3Igd2hlbiB3ZSdyZSBpbiBhIG5ldyBzZXNzaW9uXG4gICAgICAgIGlmICghY3VyUmVjb2duaXplciB8fCAoY3VyUmVjb2duaXplciAmJiBjdXJSZWNvZ25pemVyLnN0YXRlICYgU1RBVEVfUkVDT0dOSVpFRCkpIHtcbiAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHJlY29nbml6ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVjb2duaXplciA9IHJlY29nbml6ZXJzW2ldO1xuXG4gICAgICAgICAgICAvLyBmaW5kIG91dCBpZiB3ZSBhcmUgYWxsb3dlZCB0cnkgdG8gcmVjb2duaXplIHRoZSBpbnB1dCBmb3IgdGhpcyBvbmUuXG4gICAgICAgICAgICAvLyAxLiAgIGFsbG93IGlmIHRoZSBzZXNzaW9uIGlzIE5PVCBmb3JjZWQgc3RvcHBlZCAoc2VlIHRoZSAuc3RvcCgpIG1ldGhvZClcbiAgICAgICAgICAgIC8vIDIuICAgYWxsb3cgaWYgd2Ugc3RpbGwgaGF2ZW4ndCByZWNvZ25pemVkIGEgZ2VzdHVyZSBpbiB0aGlzIHNlc3Npb24sIG9yIHRoZSB0aGlzIHJlY29nbml6ZXIgaXMgdGhlIG9uZVxuICAgICAgICAgICAgLy8gICAgICB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgICAgICAvLyAzLiAgIGFsbG93IGlmIHRoZSByZWNvZ25pemVyIGlzIGFsbG93ZWQgdG8gcnVuIHNpbXVsdGFuZW91cyB3aXRoIHRoZSBjdXJyZW50IHJlY29nbml6ZWQgcmVjb2duaXplci5cbiAgICAgICAgICAgIC8vICAgICAgdGhpcyBjYW4gYmUgc2V0dXAgd2l0aCB0aGUgYHJlY29nbml6ZVdpdGgoKWAgbWV0aG9kIG9uIHRoZSByZWNvZ25pemVyLlxuICAgICAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCAhPT0gRk9SQ0VEX1NUT1AgJiYgKCAvLyAxXG4gICAgICAgICAgICAgICAgICAgICFjdXJSZWNvZ25pemVyIHx8IHJlY29nbml6ZXIgPT0gY3VyUmVjb2duaXplciB8fCAvLyAyXG4gICAgICAgICAgICAgICAgICAgIHJlY29nbml6ZXIuY2FuUmVjb2duaXplV2l0aChjdXJSZWNvZ25pemVyKSkpIHsgLy8gM1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVjb2duaXplKGlucHV0RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIHJlY29nbml6ZXIgaGFzIGJlZW4gcmVjb2duaXppbmcgdGhlIGlucHV0IGFzIGEgdmFsaWQgZ2VzdHVyZSwgd2Ugd2FudCB0byBzdG9yZSB0aGlzIG9uZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgYWN0aXZlIHJlY29nbml6ZXIuIGJ1dCBvbmx5IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhbiBhY3RpdmUgcmVjb2duaXplclxuICAgICAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyICYmIHJlY29nbml6ZXIuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQpKSB7XG4gICAgICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IHJlY29nbml6ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGEgcmVjb2duaXplciBieSBpdHMgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TnVsbH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKHJlY29nbml6ZXIgaW5zdGFuY2VvZiBSZWNvZ25pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjb2duaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyZWNvZ25pemVyc1tpXS5vcHRpb25zLmV2ZW50ID09IHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGFkZCBhIHJlY29nbml6ZXIgdG8gdGhlIG1hbmFnZXJcbiAgICAgKiBleGlzdGluZyByZWNvZ25pemVycyB3aXRoIHRoZSBzYW1lIGV2ZW50IG5hbWUgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TWFuYWdlcn1cbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdhZGQnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgZXhpc3RpbmdcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5nZXQocmVjb2duaXplci5vcHRpb25zLmV2ZW50KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShleGlzdGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlY29nbml6ZXJzLnB1c2gocmVjb2duaXplcik7XG4gICAgICAgIHJlY29nbml6ZXIubWFuYWdlciA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBhIHJlY29nbml6ZXIgYnkgbmFtZSBvciBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdyZW1vdmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWNvZ25pemVyID0gdGhpcy5nZXQocmVjb2duaXplcik7XG5cbiAgICAgICAgLy8gbGV0J3MgbWFrZSBzdXJlIHRoaXMgcmVjb2duaXplciBleGlzdHNcbiAgICAgICAgaWYgKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHJlY29nbml6ZXJzLCByZWNvZ25pemVyKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyc1tldmVudF0gfHwgW107XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgZXZlbnQsIGxlYXZlIGVtaXQgYmxhbmsgdG8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl1cbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaGFuZGxlcnNbZXZlbnRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gJiYgaGFuZGxlcnNbZXZlbnRdLnNwbGljZShpbkFycmF5KGhhbmRsZXJzW2V2ZW50XSwgaGFuZGxlciksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGVtaXQgZXZlbnQgdG8gdGhlIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgLy8gd2UgYWxzbyB3YW50IHRvIHRyaWdnZXIgZG9tIGV2ZW50c1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRvbUV2ZW50cykge1xuICAgICAgICAgICAgdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIGhhbmRsZXJzLCBzbyBza2lwIGl0IGFsbFxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzW2V2ZW50XSAmJiB0aGlzLmhhbmRsZXJzW2V2ZW50XS5zbGljZSgpO1xuICAgICAgICBpZiAoIWhhbmRsZXJzIHx8ICFoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEudHlwZSA9IGV2ZW50O1xuICAgICAgICBkYXRhLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXRhLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IGhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0oZGF0YSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzdHJveSB0aGUgbWFuYWdlciBhbmQgdW5iaW5kcyBhbGwgZXZlbnRzXG4gICAgICogaXQgZG9lc24ndCB1bmJpbmQgZG9tIGV2ZW50cywgdGhhdCBpcyB0aGUgdXNlciBvd24gcmVzcG9uc2liaWxpdHlcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ICYmIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIGFkZC9yZW1vdmUgdGhlIGNzcyBwcm9wZXJ0aWVzIGFzIGRlZmluZWQgaW4gbWFuYWdlci5vcHRpb25zLmNzc1Byb3BzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUNzc1Byb3BzKG1hbmFnZXIsIGFkZCkge1xuICAgIHZhciBlbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudC5zdHlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwcm9wO1xuICAgIGVhY2gobWFuYWdlci5vcHRpb25zLmNzc1Byb3BzLCBmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICBwcm9wID0gcHJlZml4ZWQoZWxlbWVudC5zdHlsZSwgbmFtZSk7XG4gICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gPSBlbGVtZW50LnN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzID0ge307XG4gICAgfVxufVxuXG4vKipcbiAqIHRyaWdnZXIgZG9tIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSkge1xuICAgIHZhciBnZXN0dXJlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBnZXN0dXJlRXZlbnQuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgICBnZXN0dXJlRXZlbnQuZ2VzdHVyZSA9IGRhdGE7XG4gICAgZGF0YS50YXJnZXQuZGlzcGF0Y2hFdmVudChnZXN0dXJlRXZlbnQpO1xufVxuXG5hc3NpZ24oSGFtbWVyLCB7XG4gICAgSU5QVVRfU1RBUlQ6IElOUFVUX1NUQVJULFxuICAgIElOUFVUX01PVkU6IElOUFVUX01PVkUsXG4gICAgSU5QVVRfRU5EOiBJTlBVVF9FTkQsXG4gICAgSU5QVVRfQ0FOQ0VMOiBJTlBVVF9DQU5DRUwsXG5cbiAgICBTVEFURV9QT1NTSUJMRTogU1RBVEVfUE9TU0lCTEUsXG4gICAgU1RBVEVfQkVHQU46IFNUQVRFX0JFR0FOLFxuICAgIFNUQVRFX0NIQU5HRUQ6IFNUQVRFX0NIQU5HRUQsXG4gICAgU1RBVEVfRU5ERUQ6IFNUQVRFX0VOREVELFxuICAgIFNUQVRFX1JFQ09HTklaRUQ6IFNUQVRFX1JFQ09HTklaRUQsXG4gICAgU1RBVEVfQ0FOQ0VMTEVEOiBTVEFURV9DQU5DRUxMRUQsXG4gICAgU1RBVEVfRkFJTEVEOiBTVEFURV9GQUlMRUQsXG5cbiAgICBESVJFQ1RJT05fTk9ORTogRElSRUNUSU9OX05PTkUsXG4gICAgRElSRUNUSU9OX0xFRlQ6IERJUkVDVElPTl9MRUZULFxuICAgIERJUkVDVElPTl9SSUdIVDogRElSRUNUSU9OX1JJR0hULFxuICAgIERJUkVDVElPTl9VUDogRElSRUNUSU9OX1VQLFxuICAgIERJUkVDVElPTl9ET1dOOiBESVJFQ1RJT05fRE9XTixcbiAgICBESVJFQ1RJT05fSE9SSVpPTlRBTDogRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgRElSRUNUSU9OX1ZFUlRJQ0FMOiBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgRElSRUNUSU9OX0FMTDogRElSRUNUSU9OX0FMTCxcblxuICAgIE1hbmFnZXI6IE1hbmFnZXIsXG4gICAgSW5wdXQ6IElucHV0LFxuICAgIFRvdWNoQWN0aW9uOiBUb3VjaEFjdGlvbixcblxuICAgIFRvdWNoSW5wdXQ6IFRvdWNoSW5wdXQsXG4gICAgTW91c2VJbnB1dDogTW91c2VJbnB1dCxcbiAgICBQb2ludGVyRXZlbnRJbnB1dDogUG9pbnRlckV2ZW50SW5wdXQsXG4gICAgVG91Y2hNb3VzZUlucHV0OiBUb3VjaE1vdXNlSW5wdXQsXG4gICAgU2luZ2xlVG91Y2hJbnB1dDogU2luZ2xlVG91Y2hJbnB1dCxcblxuICAgIFJlY29nbml6ZXI6IFJlY29nbml6ZXIsXG4gICAgQXR0clJlY29nbml6ZXI6IEF0dHJSZWNvZ25pemVyLFxuICAgIFRhcDogVGFwUmVjb2duaXplcixcbiAgICBQYW46IFBhblJlY29nbml6ZXIsXG4gICAgU3dpcGU6IFN3aXBlUmVjb2duaXplcixcbiAgICBQaW5jaDogUGluY2hSZWNvZ25pemVyLFxuICAgIFJvdGF0ZTogUm90YXRlUmVjb2duaXplcixcbiAgICBQcmVzczogUHJlc3NSZWNvZ25pemVyLFxuXG4gICAgb246IGFkZEV2ZW50TGlzdGVuZXJzLFxuICAgIG9mZjogcmVtb3ZlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZWFjaDogZWFjaCxcbiAgICBtZXJnZTogbWVyZ2UsXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgaW5oZXJpdDogaW5oZXJpdCxcbiAgICBiaW5kRm46IGJpbmRGbixcbiAgICBwcmVmaXhlZDogcHJlZml4ZWRcbn0pO1xuXG4vLyB0aGlzIHByZXZlbnRzIGVycm9ycyB3aGVuIEhhbW1lciBpcyBsb2FkZWQgaW4gdGhlIHByZXNlbmNlIG9mIGFuIEFNRFxuLy8gIHN0eWxlIGxvYWRlciBidXQgYnkgc2NyaXB0IHRhZywgbm90IGJ5IHRoZSBsb2FkZXIuXG52YXIgZnJlZUdsb2JhbCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge30pKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5mcmVlR2xvYmFsLkhhbW1lciA9IEhhbW1lcjtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEhhbW1lcjtcbiAgICB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSGFtbWVyO1xufSBlbHNlIHtcbiAgICB3aW5kb3dbZXhwb3J0TmFtZV0gPSBIYW1tZXI7XG59XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQsICdIYW1tZXInKTtcbiJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsImFzc2lnbiIsImV4dGVuZCIsIm1lcmdlIiwic2VsZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxLQUFDLFNBQVNBLFNBQVFDLFdBQVUsWUFBWUMsYUFBVztBQUduRCxVQUFJLGtCQUFrQixDQUFDLElBQUksVUFBVSxPQUFPLE1BQU0sTUFBTSxHQUFHO0FBQzNELFVBQUksZUFBZUQsVUFBUyxjQUFjLEtBQUs7QUFFL0MsVUFBSSxnQkFBZ0I7QUFFcEIsVUFBSSxRQUFRLEtBQUs7QUFDakIsVUFBSSxNQUFNLEtBQUs7QUFDZixVQUFJLE1BQU0sS0FBSztBQVNmLGVBQVMsa0JBQWtCLElBQUksU0FBUyxTQUFTO0FBQzdDLGVBQU8sV0FBVyxPQUFPLElBQUksT0FBTyxHQUFHLE9BQU87QUFBQSxNQUNsRDtBQVdBLGVBQVMsZUFBZSxLQUFLLElBQUksU0FBUztBQUN0QyxZQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDcEIsZUFBSyxLQUFLLFFBQVEsRUFBRSxHQUFHLE9BQU87QUFDOUIsaUJBQU87QUFBQSxRQUNmO0FBQ0ksZUFBTztBQUFBLE1BQ1g7QUFRQSxlQUFTLEtBQUssS0FBSyxVQUFVLFNBQVM7QUFDbEMsWUFBSTtBQUVKLFlBQUksQ0FBQyxLQUFLO0FBQ047QUFBQSxRQUNSO0FBRUksWUFBSSxJQUFJLFNBQVM7QUFDYixjQUFJLFFBQVEsVUFBVSxPQUFPO0FBQUEsUUFDckMsV0FBZSxJQUFJLFdBQVdDLGFBQVc7QUFDakMsY0FBSTtBQUNKLGlCQUFPLElBQUksSUFBSSxRQUFRO0FBQ25CLHFCQUFTLEtBQUssU0FBUyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDckM7QUFBQSxVQUNaO0FBQUEsUUFDQSxPQUFXO0FBQ0gsZUFBSyxLQUFLLEtBQUs7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
