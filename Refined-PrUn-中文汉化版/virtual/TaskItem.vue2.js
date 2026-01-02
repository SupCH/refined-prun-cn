import { useCssModule, withModifiers } from './runtime-dom.esm-bundler.js';
import grip from './grip.module.css.js';
import Checkmark from './Checkmark.vue.js';
import dayjs from './dayjs.min.js';
import { showTileOverlay } from './tile-overlay.js';
import { ddmmyyyy } from './format.js';
import fa from './font-awesome.module.css.js';
import _sfc_main$2 from './EditTask.vue.js';
import removeArrayElement from './remove-array-element.js';
import _sfc_main$1 from './TaskText.vue.js';
import {
  defineComponent,
  computed,
  resolveComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
  createTextVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TaskItem',
  props: {
    dragging: { type: Boolean },
    list: {},
    subtask: { type: Boolean },
    task: {},
  },
  setup(__props) {
    const $style = useCssModule();
    const taskClass = computed(() => [
      $style.task,
      {
        [$style.taskCompleted]: __props.task.completed,
        [$style.subtask]: __props.subtask,
      },
    ]);
    function onContentClick(ev) {
      if (__props.subtask) {
        return;
      }
      showTileOverlay(ev, _sfc_main$2, {
        task: __props.task,
        onDelete: () => removeArrayElement(__props.list.tasks, __props.task),
      });
    }
    function onCheckmarkClick() {
      if (__props.task.recurring !== void 0 && __props.task.dueDate !== void 0) {
        __props.task.dueDate =
          __props.task.dueDate + dayjs.duration(__props.task.recurring, 'days').asMilliseconds();
        for (const subtask of __props.task.subtasks ?? []) {
          subtask.completed = false;
        }
      } else {
        __props.task.completed = !__props.task.completed;
        for (const subtask of __props.task.subtasks ?? []) {
          subtask.completed = __props.task.completed;
        }
      }
    }
    return (_ctx, _cache) => {
      const _component_TaskItem = resolveComponent('TaskItem', true);
      return (
        openBlock(),
        createElementBlock('div', null, [
          createBaseVNode(
            'div',
            {
              class: normalizeClass(unref(taskClass)),
            },
            [
              !_ctx.subtask && !_ctx.dragging
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: normalizeClass([
                        unref(fa).solid,
                        unref($style).grip,
                        unref(grip).grip,
                      ]),
                    },
                    toDisplayString(''),
                    2,
                  ))
                : createCommentVNode('', true),
              createVNode(
                Checkmark,
                {
                  task: _ctx.task,
                  class: normalizeClass(unref($style).checkmark),
                  onClick: withModifiers(onCheckmarkClick, ['stop']),
                },
                null,
                8,
                ['task', 'class'],
              ),
              createBaseVNode(
                'div',
                {
                  class: normalizeClass([
                    unref($style).content,
                    { [unref($style).contentCompleted]: _ctx.task.completed },
                  ]),
                  onClick: onContentClick,
                },
                [
                  createVNode(
                    _sfc_main$1,
                    {
                      text: _ctx.task.text,
                    },
                    null,
                    8,
                    ['text'],
                  ),
                  _ctx.task.dueDate
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: normalizeClass(unref($style).dueDate),
                        },
                        [
                          createTextVNode(
                            toDisplayString(unref(ddmmyyyy)(_ctx.task.dueDate)) + ' ',
                            1,
                          ),
                          _ctx.task.recurring
                            ? (openBlock(),
                              createElementBlock(
                                'span',
                                _hoisted_1,
                                '(every ' + toDisplayString(_ctx.task.recurring) + 'd)',
                                1,
                              ))
                            : createCommentVNode('', true),
                        ],
                        2,
                      ))
                    : createCommentVNode('', true),
                ],
                2,
              ),
            ],
            2,
          ),
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(_ctx.task.subtasks ?? [], x => {
              return (
                openBlock(),
                createBlock(
                  _component_TaskItem,
                  {
                    key: x.id,
                    list: _ctx.list,
                    task: x,
                    subtask: '',
                  },
                  null,
                  8,
                  ['list', 'task'],
                )
              );
            }),
            128,
          )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
