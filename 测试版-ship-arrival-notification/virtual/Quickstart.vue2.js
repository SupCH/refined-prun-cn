import { C } from './prun-css.js';
import _sfc_main$4 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$5 from './Commands.vue.js';
import { userData } from './user-data.js';
import { showBuffer } from './buffers.js';
import _sfc_main$3 from './NumberInput.vue.js';
import { sitesStore } from './sites.js';
import {
  getEntityNameFromAddress,
  getLocationLineFromAddress,
  getEntityNaturalIdFromAddress,
} from './addresses.js';
import { comparePlanets } from './util.js';
import SelectInput from './SelectInput.vue.js';
import { warehousesStore } from './warehouses.js';
import { configurableValue } from './shared-types.js';
import { storagesStore } from './storage.js';
import { serializeStorage } from './utils3.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Quickstart',
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const days = ref(userData.settings.burn.resupply);
    const name = ref(`Base Resupply ${days.value}d`);
    const planets = computed(() =>
      (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets),
    );
    const planet = ref(planets.value[0]);
    const cxes = computed(
      () =>
        warehousesStore.all.value
          ?.filter(x => getLocationLineFromAddress(x.address)?.type === 'STATION')
          .map(x => ({
            label: getEntityNameFromAddress(x.address),
            value: getEntityNaturalIdFromAddress(x.address),
          }))
          .sort((a, b) => a.label.localeCompare(b.label)) ?? [],
    );
    const cx = ref(cxes.value[0].value);
    function onCreateClick() {
      if (name.value.length === 0) {
        return;
      }
      const warehouse = warehousesStore.getByEntityNaturalId(cx.value);
      const storage = storagesStore.getById(warehouse.storeId);
      const cxTicker = ExchangeTickers[cx.value];
      userData.actionPackages.push({
        global: { name: name.value },
        groups: [
          {
            name: 'Resupply',
            type: 'Resupply',
            planet: planet.value,
            days: days.value,
            useBaseInv: true,
          },
        ],
        actions: [
          {
            name: 'Buy Missing Materials',
            type: 'CX Buy',
            group: 'Resupply',
            exchange: cxTicker,
            useCXInv: true,
          },
          {
            name: 'Select your ship in the "To" field ↓',
            type: 'MTRA',
            group: 'Resupply',
            origin: serializeStorage(storage),
            dest: configurableValue,
          },
        ],
      });
      showBuffer('XIT ACT_' + name.value.split(' ').join('_'));
      emit('close');
    }
    const ExchangeTickers = {
      ANT: 'AI1',
      BEN: 'CI1',
      MOR: 'NC1',
      HRT: 'IC1',
      HUB: 'NC2',
      ARC: 'CI2',
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).DraftConditionEditor.form),
          },
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                ...(_cache[4] || (_cache[4] = [createTextVNode('Quickstart', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.description),
              },
              [
                ...(_cache[5] ||
                  (_cache[5] = [
                    createTextVNode(
                      ' This prefilled action package will resupply your base with materials for a given number of days. ',
                      -1,
                    ),
                    createBaseVNode('br', null, null, -1),
                    createTextVNode(
                      ' The created action package will have two actions: buy missing materials from the CX, then transfer them to the configured (next step) ship. ',
                      -1,
                    ),
                    createBaseVNode('br', null, null, -1),
                    createTextVNode(
                      ' After clicking "Create", you will be taken to the action package runner. Once there, first configure the target ship, then press "Execute" and press "Act" until the package is done. ',
                      -1,
                    ),
                    createBaseVNode('br', null, null, -1),
                    createBaseVNode(
                      'mark',
                      null,
                      'Note: You need a ship parked at the selected CX for this to work.',
                      -1,
                    ),
                  ])),
              ],
              2,
            ),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'Name' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(name),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(name) ? (name.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'CX to Resupply From' },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(cx),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event => (isRef(cx) ? (cx.value = $event) : null)),
                        options: unref(cxes),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'Planet to Resupply' },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(planet),
                        'onUpdate:modelValue':
                          _cache[2] ||
                          (_cache[2] = $event => (isRef(planet) ? (planet.value = $event) : null)),
                        options: unref(planets),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'Resupply Days' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$3,
                      {
                        modelValue: unref(days),
                        'onUpdate:modelValue':
                          _cache[3] ||
                          (_cache[3] = $event => (isRef(days) ? (days.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(_sfc_main$5, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      primary: '',
                      onClick: onCreateClick,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[6] || (_cache[6] = [createTextVNode('CREATE', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpY2tzdGFydC52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9RdWlja3N0YXJ0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuaW1wb3J0IENvbW1hbmRzIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9Db21tYW5kcy52dWUnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9OdW1iZXJJbnB1dC52dWUnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQge1xuICBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MsXG4gIGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzLFxuICBnZXRMb2NhdGlvbkxpbmVGcm9tQWRkcmVzcyxcbn0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2FkZHJlc3Nlcyc7XG5pbXBvcnQgeyBjb21wYXJlUGxhbmV0cyB9IGZyb20gJ0BzcmMvdXRpbCc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgeyB3YXJlaG91c2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvd2FyZWhvdXNlcyc7XG5pbXBvcnQgeyBjb25maWd1cmFibGVWYWx1ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9zaGFyZWQtdHlwZXMnO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IHNlcmlhbGl6ZVN0b3JhZ2UgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy91dGlscyc7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0czx7IChlOiAnY2xvc2UnKTogdm9pZCB9PigpO1xuXG5jb25zdCBkYXlzID0gcmVmKHVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ucmVzdXBwbHkpO1xuY29uc3QgbmFtZSA9IHJlZihgQmFzZSBSZXN1cHBseSAke2RheXMudmFsdWV9ZGApO1xuY29uc3QgcGxhbmV0cyA9IGNvbXB1dGVkKCgpID0+XG4gIChzaXRlc1N0b3JlLmFsbC52YWx1ZSA/PyBbXSlcbiAgICAubWFwKHggPT4gZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzKHguYWRkcmVzcykpXG4gICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZClcbiAgICAuc29ydChjb21wYXJlUGxhbmV0cyksXG4pO1xuY29uc3QgcGxhbmV0ID0gcmVmKHBsYW5ldHMudmFsdWVbMF0pO1xuXG5jb25zdCBjeGVzID0gY29tcHV0ZWQoXG4gICgpID0+XG4gICAgd2FyZWhvdXNlc1N0b3JlLmFsbC52YWx1ZVxuICAgICAgPy5maWx0ZXIoeCA9PiBnZXRMb2NhdGlvbkxpbmVGcm9tQWRkcmVzcyh4LmFkZHJlc3MpPy50eXBlID09PSAnU1RBVElPTicpXG4gICAgICAubWFwKHggPT4gKHtcbiAgICAgICAgbGFiZWw6IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyh4LmFkZHJlc3MpISxcbiAgICAgICAgdmFsdWU6IGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzKHguYWRkcmVzcykhLFxuICAgICAgfSkpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS5sYWJlbC5sb2NhbGVDb21wYXJlKGIubGFiZWwpKSA/PyBbXSxcbik7XG5jb25zdCBjeCA9IHJlZihjeGVzLnZhbHVlWzBdLnZhbHVlKTtcblxuZnVuY3Rpb24gb25DcmVhdGVDbGljaygpIHtcbiAgaWYgKG5hbWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHdhcmVob3VzZSA9IHdhcmVob3VzZXNTdG9yZS5nZXRCeUVudGl0eU5hdHVyYWxJZChjeC52YWx1ZSk7XG4gIGNvbnN0IHN0b3JhZ2UgPSBzdG9yYWdlc1N0b3JlLmdldEJ5SWQod2FyZWhvdXNlIS5zdG9yZUlkKSE7XG4gIGNvbnN0IGN4VGlja2VyID0gRXhjaGFuZ2VUaWNrZXJzW2N4LnZhbHVlXTtcbiAgdXNlckRhdGEuYWN0aW9uUGFja2FnZXMucHVzaCh7XG4gICAgZ2xvYmFsOiB7IG5hbWU6IG5hbWUudmFsdWUgfSxcbiAgICBncm91cHM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1Jlc3VwcGx5JyxcbiAgICAgICAgdHlwZTogJ1Jlc3VwcGx5JyxcbiAgICAgICAgcGxhbmV0OiBwbGFuZXQudmFsdWUsXG4gICAgICAgIGRheXM6IGRheXMudmFsdWUsXG4gICAgICAgIHVzZUJhc2VJbnY6IHRydWUsXG4gICAgICB9LFxuICAgIF0sXG4gICAgYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQnV5IE1pc3NpbmcgTWF0ZXJpYWxzJyxcbiAgICAgICAgdHlwZTogJ0NYIEJ1eScsXG4gICAgICAgIGdyb3VwOiAnUmVzdXBwbHknLFxuICAgICAgICBleGNoYW5nZTogY3hUaWNrZXIsXG4gICAgICAgIHVzZUNYSW52OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1NlbGVjdCB5b3VyIHNoaXAgaW4gdGhlIFwiVG9cIiBmaWVsZCDihpMnLFxuICAgICAgICB0eXBlOiAnTVRSQScsXG4gICAgICAgIGdyb3VwOiAnUmVzdXBwbHknLFxuICAgICAgICBvcmlnaW46IHNlcmlhbGl6ZVN0b3JhZ2Uoc3RvcmFnZSksXG4gICAgICAgIGRlc3Q6IGNvbmZpZ3VyYWJsZVZhbHVlLFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcbiAgc2hvd0J1ZmZlcignWElUIEFDVF8nICsgbmFtZS52YWx1ZS5zcGxpdCgnICcpLmpvaW4oJ18nKSk7XG4gIGVtaXQoJ2Nsb3NlJyk7XG59XG5cbmNvbnN0IEV4Y2hhbmdlVGlja2VycyA9IHtcbiAgQU5UOiAnQUkxJyxcbiAgQkVOOiAnQ0kxJyxcbiAgTU9SOiAnTkMxJyxcbiAgSFJUOiAnSUMxJyxcbiAgSFVCOiAnTkMyJyxcbiAgQVJDOiAnQ0kyJyxcbn07XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIkMuRHJhZnRDb25kaXRpb25FZGl0b3IuZm9ybVwiPlxuICAgIDxTZWN0aW9uSGVhZGVyPlF1aWNrc3RhcnQ8L1NlY3Rpb25IZWFkZXI+XG4gICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuZGVzY3JpcHRpb25cIj5cbiAgICAgIFRoaXMgcHJlZmlsbGVkIGFjdGlvbiBwYWNrYWdlIHdpbGwgcmVzdXBwbHkgeW91ciBiYXNlIHdpdGggbWF0ZXJpYWxzIGZvciBhIGdpdmVuIG51bWJlciBvZlxuICAgICAgZGF5cy5cbiAgICAgIDxiciAvPlxuICAgICAgVGhlIGNyZWF0ZWQgYWN0aW9uIHBhY2thZ2Ugd2lsbCBoYXZlIHR3byBhY3Rpb25zOiBidXkgbWlzc2luZyBtYXRlcmlhbHMgZnJvbSB0aGUgQ1gsIHRoZW5cbiAgICAgIHRyYW5zZmVyIHRoZW0gdG8gdGhlIGNvbmZpZ3VyZWQgKG5leHQgc3RlcCkgc2hpcC5cbiAgICAgIDxiciAvPlxuICAgICAgQWZ0ZXIgY2xpY2tpbmcgXCJDcmVhdGVcIiwgeW91IHdpbGwgYmUgdGFrZW4gdG8gdGhlIGFjdGlvbiBwYWNrYWdlIHJ1bm5lci4gT25jZSB0aGVyZSwgZmlyc3RcbiAgICAgIGNvbmZpZ3VyZSB0aGUgdGFyZ2V0IHNoaXAsIHRoZW4gcHJlc3MgXCJFeGVjdXRlXCIgYW5kIHByZXNzIFwiQWN0XCIgdW50aWwgdGhlIHBhY2thZ2UgaXMgZG9uZS5cbiAgICAgIDxiciAvPlxuICAgICAgPG1hcms+Tm90ZTogWW91IG5lZWQgYSBzaGlwIHBhcmtlZCBhdCB0aGUgc2VsZWN0ZWQgQ1ggZm9yIHRoaXMgdG8gd29yay48L21hcms+XG4gICAgPC9kaXY+XG4gICAgPGZvcm0+XG4gICAgICA8QWN0aXZlIGxhYmVsPVwiTmFtZVwiPlxuICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJuYW1lXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPEFjdGl2ZSBsYWJlbD1cIkNYIHRvIFJlc3VwcGx5IEZyb21cIj5cbiAgICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJjeFwiIDpvcHRpb25zPVwiY3hlc1wiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxBY3RpdmUgbGFiZWw9XCJQbGFuZXQgdG8gUmVzdXBwbHlcIj5cbiAgICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJwbGFuZXRcIiA6b3B0aW9ucz1cInBsYW5ldHNcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8QWN0aXZlIGxhYmVsPVwiUmVzdXBwbHkgRGF5c1wiPlxuICAgICAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cImRheXNcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgICA8Q29tbWFuZHM+XG4gICAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25DcmVhdGVDbGlja1wiPkNSRUFURTwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvQ29tbWFuZHM+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uZGVzY3JpcHRpb24ge1xuICBsaW5lLWhlaWdodDogMTNweDtcbiAgcGFkZGluZzogMCA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjM1M2U7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJBY3RpdmUiLCJUZXh0SW5wdXQiLCJfdW5yZWYiLCJfaXNSZWYiLCJOdW1iZXJJbnB1dCIsIlBydW5CdXR0b24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxVQUFBLE9BQUE7QUFFQSxVQUFBLE9BQUEsSUFBQSxTQUFBLFNBQUEsS0FBQSxRQUFBO0FBQ0EsVUFBQSxPQUFBLElBQUEsaUJBQUEsS0FBQSxLQUFBLEdBQUE7QUFDQSxVQUFBLFVBQUE7QUFBQSxNQUFnQixPQUFBLFdBQUEsSUFBQSxTQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSx5QkFBQSxFQUFBLE9BQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLE1BQUEsTUFBQSxFQUFBLEtBQUEsY0FBQTtBQUFBLElBSVE7QUFFeEIsVUFBQSxTQUFBLElBQUEsUUFBQSxNQUFBLENBQUEsQ0FBQTtBQUVBLFVBQUEsT0FBQTtBQUFBLE1BQWEsTUFBQSxnQkFBQSxJQUFBLE9BQUEsT0FBQSxDQUFBLE1BQUEsMkJBQUEsRUFBQSxPQUFBLEdBQUEsU0FBQSxTQUFBLEVBQUEsSUFBQSxDQUFBLE9BQUE7QUFBQSxRQUlJLE9BQUEseUJBQUEsRUFBQSxPQUFBO0FBQUEsUUFDZ0MsT0FBQSw4QkFBQSxFQUFBLE9BQUE7QUFBQSxNQUNLLEVBQUEsRUFBQSxLQUFBLENBQUEsR0FBQSxNQUFBLEVBQUEsTUFBQSxjQUFBLEVBQUEsS0FB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
