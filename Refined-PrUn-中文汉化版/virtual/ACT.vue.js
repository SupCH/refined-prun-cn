import { useXitParameters } from './use-xit-parameters.js';
import ActionPackageList from './ActionPackageList.vue.js';
import ActionPackageEditor from './EditActionPackage.vue.js';
import { userData } from './user-data.js';
import ExecuteActionPackage from './ExecuteActionPackage.vue.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ACT',
  setup(__props) {
    const parameters = useXitParameters();
    parameters.unshift('ACT');
    let pkgName = void 0;
    const edit = parameters[1]?.toLowerCase() === 'gen' || parameters[1]?.toLowerCase() === 'edit';
    if (edit) {
      pkgName = parameters.slice(2).join(' ');
    }
    const run = parameters[1] !== void 0 && !edit;
    if (run) {
      pkgName = parameters.slice(1).join(' ');
    }
    const pkg = computed(() => userData.actionPackages.find(x => x.global.name === pkgName));
    return (_ctx, _cache) => {
      return unref(parameters).length === 1
        ? (openBlock(), createBlock(ActionPackageList, { key: 0 }))
        : !unref(pkg)
          ? (openBlock(),
            createElementBlock(
              'div',
              _hoisted_1,
              'Action package "' + toDisplayString(unref(pkgName)) + '" not found.',
              1,
            ))
          : unref(edit)
            ? (openBlock(),
              createBlock(
                ActionPackageEditor,
                {
                  key: 2,
                  pkg: unref(pkg),
                },
                null,
                8,
                ['pkg'],
              ))
            : (openBlock(),
              createBlock(
                ExecuteActionPackage,
                {
                  key: 3,
                  pkg: unref(pkg),
                },
                null,
                8,
                ['pkg'],
              ));
    };
  },
});
export { _sfc_main as default };
