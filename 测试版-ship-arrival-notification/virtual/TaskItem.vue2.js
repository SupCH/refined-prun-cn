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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza0l0ZW0udnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL1Rhc2tJdGVtLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IGdyaXAgZnJvbSAnQHNyYy91dGlscy9ncmlwLm1vZHVsZS5jc3MnO1xuaW1wb3J0IENoZWNrbWFyayBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL0NoZWNrbWFyay52dWUnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCB7IHNob3dUaWxlT3ZlcmxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS90aWxlLW92ZXJsYXknO1xuaW1wb3J0IHsgZGRtbXl5eXkgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgZmEgZnJvbSAnQHNyYy91dGlscy9mb250LWF3ZXNvbWUubW9kdWxlLmNzcyc7XG5pbXBvcnQgVGFza0VkaXRvciBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL0VkaXRUYXNrLnZ1ZSc7XG5pbXBvcnQgcmVtb3ZlQXJyYXlFbGVtZW50IGZyb20gJ0BzcmMvdXRpbHMvcmVtb3ZlLWFycmF5LWVsZW1lbnQnO1xuaW1wb3J0IFRhc2tUZXh0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL1RPRE8vVGFza1RleHQudnVlJztcblxuY29uc3QgeyBsaXN0LCBzdWJ0YXNrLCB0YXNrIH0gPSBkZWZpbmVQcm9wczx7XG4gIGRyYWdnaW5nPzogYm9vbGVhbjtcbiAgbGlzdDogVXNlckRhdGEuVGFza0xpc3Q7XG4gIHN1YnRhc2s/OiBib29sZWFuO1xuICB0YXNrOiBVc2VyRGF0YS5UYXNrO1xufT4oKTtcblxuY29uc3QgJHN0eWxlID0gdXNlQ3NzTW9kdWxlKCk7XG5cbmNvbnN0IHRhc2tDbGFzcyA9IGNvbXB1dGVkKCgpID0+IFtcbiAgJHN0eWxlLnRhc2ssXG4gIHtcbiAgICBbJHN0eWxlLnRhc2tDb21wbGV0ZWRdOiB0YXNrLmNvbXBsZXRlZCxcbiAgICBbJHN0eWxlLnN1YnRhc2tdOiBzdWJ0YXNrLFxuICB9LFxuXSk7XG5cbmZ1bmN0aW9uIG9uQ29udGVudENsaWNrKGV2OiBFdmVudCkge1xuICBpZiAoc3VidGFzaykge1xuICAgIHJldHVybjtcbiAgfVxuICBzaG93VGlsZU92ZXJsYXkoZXYsIFRhc2tFZGl0b3IsIHtcbiAgICB0YXNrOiB0YXNrLFxuICAgIG9uRGVsZXRlOiAoKSA9PiByZW1vdmVBcnJheUVsZW1lbnQobGlzdC50YXNrcywgdGFzayksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbkNoZWNrbWFya0NsaWNrKCkge1xuICBpZiAodGFzay5yZWN1cnJpbmcgIT09IHVuZGVmaW5lZCAmJiB0YXNrLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHRhc2suZHVlRGF0ZSA9IHRhc2suZHVlRGF0ZSArIGRheWpzLmR1cmF0aW9uKHRhc2sucmVjdXJyaW5nLCAnZGF5cycpLmFzTWlsbGlzZWNvbmRzKCk7XG4gICAgZm9yIChjb25zdCBzdWJ0YXNrIG9mIHRhc2suc3VidGFza3MgPz8gW10pIHtcbiAgICAgIHN1YnRhc2suY29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xuICAgIGZvciAoY29uc3Qgc3VidGFzayBvZiB0YXNrLnN1YnRhc2tzID8/IFtdKSB7XG4gICAgICBzdWJ0YXNrLmNvbXBsZXRlZCA9IHRhc2suY29tcGxldGVkO1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8ZGl2IDpjbGFzcz1cInRhc2tDbGFzc1wiPlxuICAgICAgPGRpdiB2LWlmPVwiIXN1YnRhc2sgJiYgIWRyYWdnaW5nXCIgOmNsYXNzPVwiW2ZhLnNvbGlkLCAkc3R5bGUuZ3JpcCwgZ3JpcC5ncmlwXVwiPlxuICAgICAgICB7eyAnXFx1ZjU4ZScgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPENoZWNrbWFyayA6dGFzaz1cInRhc2tcIiA6Y2xhc3M9XCIkc3R5bGUuY2hlY2ttYXJrXCIgQGNsaWNrLnN0b3A9XCJvbkNoZWNrbWFya0NsaWNrXCIgLz5cbiAgICAgIDxkaXZcbiAgICAgICAgOmNsYXNzPVwiWyRzdHlsZS5jb250ZW50LCB7IFskc3R5bGUuY29udGVudENvbXBsZXRlZF06IHRhc2suY29tcGxldGVkIH1dXCJcbiAgICAgICAgQGNsaWNrPVwib25Db250ZW50Q2xpY2tcIj5cbiAgICAgICAgPFRhc2tUZXh0IDp0ZXh0PVwidGFzay50ZXh0XCIgLz5cbiAgICAgICAgPGRpdiB2LWlmPVwidGFzay5kdWVEYXRlXCIgOmNsYXNzPVwiJHN0eWxlLmR1ZURhdGVcIj5cbiAgICAgICAgICB7eyBkZG1teXl5eSh0YXNrLmR1ZURhdGUpIH19XG4gICAgICAgICAgPHNwYW4gdi1pZj1cInRhc2sucmVjdXJyaW5nXCI+KGV2ZXJ5IHt7IHRhc2sucmVjdXJyaW5nIH19ZCk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPFRhc2tJdGVtIHYtZm9yPVwieCBpbiB0YXNrLnN1YnRhc2tzID8/IFtdXCIgOmtleT1cInguaWRcIiA6bGlzdD1cImxpc3RcIiA6dGFzaz1cInhcIiBzdWJ0YXNrIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi50YXNrIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggIzMzMztcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xufVxuXG4uc3VidGFzayB7XG4gIHBhZGRpbmctbGVmdDogMjdweDtcbiAgY3Vyc29yOiBpbml0aWFsO1xuICB1c2VyLXNlbGVjdDogaW5pdGlhbDtcbn1cblxuLnRhc2tDb21wbGV0ZWQge1xuICBjb2xvcjogIzc4Nzg3ODtcbn1cblxuLmdyaXAge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogNXB4O1xuICBjdXJzb3I6IG1vdmU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLWluLW91dDtcbiAgb3BhY2l0eTogMDtcbn1cblxuLnRhc2s6aG92ZXIgLmdyaXAge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uY2hlY2ttYXJrIHtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4uY29udGVudCB7XG4gIGZsZXg6IDE7XG4gIG1pbi1oZWlnaHQ6IDI0cHg7XG4gIHBhZGRpbmctdG9wOiA2cHg7XG4gIHBhZGRpbmctYm90dG9tOiA2cHg7XG59XG5cbi5jb250ZW50Q29tcGxldGVkIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG59XG5cbi5kdWVEYXRlIHtcbiAgY29sb3I6ICM3ODc4Nzg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIlRhc2tFZGl0b3IiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwiX3VucmVmIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJ0YXNrIiwiX3dpdGhNb2RpZmllcnMiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsImxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFVBQUEsU0FBQSxhQUFBO0FBRUEsVUFBQSxZQUFBLFNBQUEsTUFBQTtBQUFBLE1BQWlDLE9BQUE7QUFBQSxNQUN4QjtBQUFBLFFBQ1AsQ0FBQSxPQUFBLGFBQUEsR0FBQSxRQUFBLEtBQUE7QUFBQSxRQUMrQixDQUFBLE9BQUEsT0FBQSxHQUFBLFFBQUE7QUFBQSxNQUNYO0FBQUEsSUFDcEIsQ0FBQTtBQUdGLGFBQUEsZUFBQSxJQUFBO0FBQ0UsVUFBQSxRQUFBLFNBQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixzQkFBQSxJQUFBQSxhQUFBO0FBQUEsUUFBZ0MsTUFBQSxRQUFBO0FBQUEsUUFDeEIsVUFBQSxNQUFBLG1CQUFBLFFBQUEsS0FBQSxPQUFBLFFBQUEsSUFBQTtBQUFBLE1BQzZDLENBQUE7QUFBQSxJQUNwRDtBQUdILGFBQUEsbUJBQUE7QUFDRSxVQUFBLFFBQUEsS0FBQSxjQUFBLFVBQUEsUUFBQSxLQUFBLFlBQUEsUUFBQTtBQUNFLGdCQUFBLEtBQUEsVUFBQSxRQUFBLEtBQUEsVUFBQSxNQUFBLFNBQUEsUUFBQSxLQUFBLFdBQUEsTUFBQSxFQUFBLGVBQUE7QUFDQSxtQkFBQSxXQUFBLFFBQUEsS0FBQSxZQUFBLENBQUEsR0FBQTtBQUNFLGtCQUFBLFlBQUE7QUFBQSxRQUFvQjtBQUFBLE1BQ3RCLE9BQUE7QUFFQSxnQkFBQSxLQUFBLFlBQUEsQ0FBQSxRQUFBLEtBQUE7QUFDQSxtQkFBQSxXQUFBLFFBQUEsS0FBQSxZQUFBLENBQUEsR0FBQTtBQUNFLGtCQUFBLFlBQUEsUUFBQSxLQUFBO0FBQUEsUUFBeUI7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7Ozs7UUFzQk1DLGdCQUFBLE9BQUE7QUFBQSxVQUZFLE9BQUFDLGVBQUFDLE1BQUEsU0FBQSxDQUFBO0FBQUEsUUFkZ0IsR0FBQTtBQUFBO1lBR2QsS0FBQTtBQUFBO1VBRnFFLEdBQUFDLGdCQUFBLEdBQUEsR0FBQSxDQUFBLEtBQUFDLG1CQUFBLElBQUEsSUFBQTtBQUFBO1lBR1EsTUFBQSxLQUFBO0FBQUEsWUFBakVDLE9BQUFBLGVBQUFBLE1BQUFBLE1BQUFBLEVBQUFBLFNBQUFBO0FBQUFBLFlBQThCLFNBQUFDLGNBQUEsa0JBQUEsQ0FBQSxNQUFBLENBQUE7QUFBQSxVQUErQixHQUFBLE1BQUEsR0FBQSxDQUFBLFFBQUEsT0FBQSxDQUFBO0FBQUE7WUFTekUsT0FBQUwsZUFBQSxDQUFBQyxNQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsQ0FBQUEsTUFBQSxNQUFBLEVBQUEsZ0JBQUEsR0FBQSxLQUFBLEtBQUEsVUFBQSxDQUFBLENBQUE7QUFBQSxZQVBnRSxTQUFBO0FBQUEsVUFDNUQsR0FBQTtBQUFBO2NBQ3NCLE1BQUEsS0FBQSxLQUFBO0FBQUEsWUFBUixHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQTtBQUFBO2NBSWhCLEtBQUE7QUFBQTtZQUh5QyxHQUFBO0FBQUE7Y0FFN0MsS0FBQSxLQUFBLGFBQUFLLFVBQUEsR0FBQUMsbUJBQUEsUUFBQSxZQUFBLFlBQUFMLGdCQUFBLEtBQUEsS0FBQSxTQUFBLElBQUEsTUFBQSxDQUFBLEtBQUFDLG1CQUFBLElBQUEsSUFBQTtBQUFBOzs7OztZQUlrRixLQUFBLEVBQUE7QUFBQSxZQUFyQyxNQUFBLEtBQUE7QUFBQSxZQUFXSyxNQUFBQTtBQUFBQSxZQUFhLFNBQUE7QUFBQSxVQUFHLEdBQUEsTUFBQSxHQUFBLENBQUEsUUFBQSxNQUFBLENBQUE7QUFBQTs7Ozs7In0=
