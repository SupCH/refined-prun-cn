import { t } from './index5.js';
import PrunLink from './PrunLink.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'HELP',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('table', null, [
          createBaseVNode('thead', null, [
            createBaseVNode('tr', null, [
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.wantTo')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.command')),
                1,
              ),
            ]),
          ]),
          createBaseVNode('tbody', null, [
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.changeSettings')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.changeFeatureSet')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET FEAT' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.disableFeature')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET FEAT' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.findCommands')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT CMDS' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.importPmmg')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET PMMG' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.corgiGif')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT GIF CORGI' })]),
            ]),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSEVMUC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvSEVMUC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD57eyB0KCdoZWxwLndhbnRUbycpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2hlbHAuY29tbWFuZCcpIH19PC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD57eyB0KCdoZWxwLmNoYW5nZVNldHRpbmdzJykgfX08L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5MaW5rIGNvbW1hbmQ9XCJYSVQgU0VUXCIgLz5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD57eyB0KCdoZWxwLmNoYW5nZUZlYXR1cmVTZXQnKSB9fTwvdGQ+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8UHJ1bkxpbmsgY29tbWFuZD1cIlhJVCBTRVQgRkVBVFwiIC8+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+e3sgdCgnaGVscC5kaXNhYmxlRmVhdHVyZScpIH19PC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuTGluayBjb21tYW5kPVwiWElUIFNFVCBGRUFUXCIgLz5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD57eyB0KCdoZWxwLmZpbmRDb21tYW5kcycpIH19PC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuTGluayBjb21tYW5kPVwiWElUIENNRFNcIiAvPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPnt7IHQoJ2hlbHAuaW1wb3J0UG1tZycpIH19PC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuTGluayBjb21tYW5kPVwiWElUIFNFVCBQTU1HXCIgLz5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD57eyB0KCdoZWxwLmNvcmdpR2lmJykgfX08L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5MaW5rIGNvbW1hbmQ9XCJYSVQgR0lGIENPUkdJXCIgLz5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJ0IiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1FBa0RVQSxnQkFBQSxTQUFBLE1BQUE7QUFBQSxVQXZDRUEsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsWUFEREEsZ0JBQUEsTUFBQSxNQUFBQyxpQkFGSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsYUFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsWUFBQ0YsZ0JBQUEsTUFBQSxNQUFBQyxpQkFDREMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsY0FBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsVUFBQyxDQUFBO0FBQUE7O1VBd0NKRixnQkFBQSxNQUFBLE1BQUE7QUFBQSxZQS9CREEsZ0JBQUEsTUFBQSxNQUFBQyxpQkFKSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEscUJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLGNBR0hHLFlBQUEsVUFBQSxFQUFBLFNBQUEsVUFBQSxDQUFBO0FBQUEsWUFEd0IsQ0FBQTtBQUFBOztZQVExQkgsZ0JBQUEsTUFBQSxNQUFBQyxpQkFKSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsdUJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLGNBR0hHLFlBQUEsVUFBQSxFQUFBLFNBQUEsZUFBQSxDQUFBO0FBQUEsWUFENkIsQ0FBQTtBQUFBOztZQVEvQkgsZ0JBQUEsTUFBQSxNQUFBQyxpQkFKSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEscUJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLGNBR0hHLFlBQUEsVUFBQSxFQUFBLFNBQUEsZUFBQSxDQUFBO0FBQUEsWUFENkIsQ0FBQTtBQUFBOztZQVEvQkgsZ0JBQUEsTUFBQSxNQUFBQyxpQkFKSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsbUJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLGNBR0hHLFlBQUEsVUFBQSxFQUFBLFNBQUEsV0FBQSxDQUFBO0FBQUEsWUFEeUIsQ0FBQTtBQUFBOztZQVEzQkgsZ0JBQUEsTUFBQSxNQUFBQyxpQkFKSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsaUJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLGNBR0hHLFlBQUEsVUFBQSxFQUFBLFNBQUEsZUFBQSxDQUFBO0FBQUEsWUFENkIsQ0FBQTtBQUFBOztZQVEvQkgsZ0JBQUEsTUFBQSxNQUFBQyxpQkFKSUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsZUFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsWUFBQ0YsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsY0FHSEcsWUFBQSxVQUFBLEVBQUEsU0FBQSxnQkFBQSxDQUFBO0FBQUEsWUFEOEIsQ0FBQTtBQUFBOzs7Ozs7In0=
