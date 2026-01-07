import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import _sfc_main$2 from './Commands.vue.js';
import {
  importPmmgSettings,
  importPmmgFinancialHistory,
  importPmmgNotes,
  importPmmgActions,
  importPmmgCommandLists,
} from './pmmg-import.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PMMG',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                ...(_cache[0] || (_cache[0] = [createTextVNode('Import PMMG files', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-settings.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgSettings),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[1] || (_cache[1] = [createTextVNode('Import Settings', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-finance.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgFinancialHistory),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[2] || (_cache[2] = [createTextVNode('Import Finances', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-notes.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgNotes),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[3] || (_cache[3] = [createTextVNode('Import Notes', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-action.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgActions),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[4] || (_cache[4] = [createTextVNode('Import Actions', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-lists.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgCommandLists),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[5] ||
                            (_cache[5] = [createTextVNode('Import Command Lists', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUE1NRy52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvU0VUL1BNTUcudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCB7XG4gIGltcG9ydFBtbWdBY3Rpb25zLFxuICBpbXBvcnRQbW1nRmluYW5jaWFsSGlzdG9yeSxcbiAgaW1wb3J0UG1tZ05vdGVzLFxuICBpbXBvcnRQbW1nU2V0dGluZ3MsXG4gIGltcG9ydFBtbWdDb21tYW5kTGlzdHMsXG59IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvc3RvcmFnZS9wbW1nLWltcG9ydCc7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8U2VjdGlvbkhlYWRlcj5JbXBvcnQgUE1NRyBmaWxlczwvU2VjdGlvbkhlYWRlcj5cbiAgPGZvcm0+XG4gICAgPENvbW1hbmRzIGxhYmVsPVwicG1tZy1zZXR0aW5ncy5qc29uXCI+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImltcG9ydFBtbWdTZXR0aW5nc1wiPkltcG9ydCBTZXR0aW5nczwvUHJ1bkJ1dHRvbj5cbiAgICA8L0NvbW1hbmRzPlxuICAgIDxDb21tYW5kcyBsYWJlbD1cInBtbWctZmluYW5jZS5qc29uXCI+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImltcG9ydFBtbWdGaW5hbmNpYWxIaXN0b3J5XCI+SW1wb3J0IEZpbmFuY2VzPC9QcnVuQnV0dG9uPlxuICAgIDwvQ29tbWFuZHM+XG4gICAgPENvbW1hbmRzIGxhYmVsPVwicG1tZy1ub3Rlcy5qc29uXCI+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImltcG9ydFBtbWdOb3Rlc1wiPkltcG9ydCBOb3RlczwvUHJ1bkJ1dHRvbj5cbiAgICA8L0NvbW1hbmRzPlxuICAgIDxDb21tYW5kcyBsYWJlbD1cInBtbWctYWN0aW9uLmpzb25cIj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwiaW1wb3J0UG1tZ0FjdGlvbnNcIj5JbXBvcnQgQWN0aW9uczwvUHJ1bkJ1dHRvbj5cbiAgICA8L0NvbW1hbmRzPlxuICAgIDxDb21tYW5kcyBsYWJlbD1cInBtbWctbGlzdHMuanNvblwiPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJpbXBvcnRQbW1nQ29tbWFuZExpc3RzXCI+SW1wb3J0IENvbW1hbmQgTGlzdHM8L1BydW5CdXR0b24+XG4gICAgPC9Db21tYW5kcz5cbiAgPC9mb3JtPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJDb21tYW5kcyIsIlBydW5CdXR0b24iLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1FBY0VBLFlBQWdELGVBQUEsTUFBQTtBQUFBLDJCQUFqQyxNQUFpQixDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSw0QkFBakIscUJBQWlCLEVBQUE7QUFBQSxVQUFBOzs7UUFDaENDLGdCQWdCTyxRQUFBLE1BQUE7QUFBQSxVQWZMRCxZQUVXRSxhQUFBLEVBRkQsT0FBTSx3QkFBb0I7QUFBQSw2QkFDbEMsTUFBNEU7QUFBQSxjQUE1RUYsWUFBNEVHLGFBQUE7QUFBQSxnQkFBaEUsU0FBQTtBQUFBLGdCQUFTLFNBQU9DLE1BQUEsa0JBQUE7QUFBQSxjQUFBO2lDQUFvQixNQUFlLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLGtDQUFmLG1CQUFlLEVBQUE7QUFBQSxnQkFBQTs7Ozs7O1VBRWpFSixZQUVXRSxhQUFBLEVBRkQsT0FBTSx1QkFBbUI7QUFBQSw2QkFDakMsTUFBb0Y7QUFBQSxjQUFwRkYsWUFBb0ZHLGFBQUE7QUFBQSxnQkFBeEUsU0FBQTtBQUFBLGdCQUFTLFNBQU9DLE1BQUEsMEJBQUE7QUFBQSxjQUFBO2lDQUE0QixNQUFlLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLGtDQUFmLG1CQUFlLEVBQUE7QUFBQSxnQkFBQTs7Ozs7O1VBRXpFSixZQUVXRSxhQUFBLEVBRkQsT0FBTSxxQkFBaUI7QUFBQSw2QkFDL0IsTUFBc0U7QUFBQSxjQUF0RUYsWUFBc0VHLGFBQUE7QUFBQSxnQkFBMUQsU0FBQTtBQUFBLGdCQUFTLFNBQU9DLE1BQUEsZUFBQTtBQUFBLGNBQUE7aUNBQWlCLE1BQVksQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsa0NBQVosZ0JBQVksRUFBQTtBQUFBLGdCQUFBOzs7Ozs7VUFFM0RKLFlBRVdFLGFBQUEsRUFGRCxPQUFNLHNCQUFrQjtBQUFBLDZCQUNoQyxNQUEwRTtBQUFBLGNBQTFFRixZQUEwRUcsYUFBQTtBQUFBLGdCQUE5RCxTQUFBO0FBQUEsZ0JBQVMsU0FBT0MsTUFBQSxpQkFBQTtBQUFBLGNBQUE7aUNBQW1CLE1BQWMsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsa0NBQWQsa0JBQWMsRUFBQTtBQUFBLGdCQUFBOzs7Ozs7VUFFL0RKLFlBRVdFLGFBQUEsRUFGRCxPQUFNLHFCQUFpQjtBQUFBLDZCQUMvQixNQUFxRjtBQUFBLGNBQXJGRixZQUFxRkcsYUFBQTtBQUFBLGdCQUF6RSxTQUFBO0FBQUEsZ0JBQVMsU0FBT0MsTUFBQSxzQkFBQTtBQUFBLGNBQUE7aUNBQXdCLE1BQW9CLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLGtDQUFwQix3QkFBb0IsRUFBQTtBQUFBLGdCQUFBOzs7Ozs7Ozs7OzsifQ==
