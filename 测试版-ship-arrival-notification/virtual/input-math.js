import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import fa from './font-awesome.module.css.js';
import $style from './input-math.module.css.js';
import { changeInputValue } from './util.js';
import Mexp from './index6.js';
import { materialsStore } from './materials.js';
const mexp = new Mexp();
function onKeyDown(input, e) {
  if (e.key !== 'Enter' && e.key !== 'Tab') {
    return;
  }
  if (!input.value) {
    return;
  }
  let expression = input.value.charAt(0) === '=' ? input.value.substring(1) : input.value;
  expression = replaceMaterialProperties(expression);
  expression = replaceKilo(expression);
  const result = parseFloat(mexp.eval(expression).toFixed(6));
  changeInputValue(input, result.toString());
}
function replaceMaterialProperties(expression) {
  const matches = expression.match(/\b([a-zA-Z0-9]{1,3})\.(?:w|t|v|m|m3|max)\b/gi) ?? [];
  for (const match of matches) {
    const parts = match.split('.');
    const material = materialsStore.getByTicker(parts[0]);
    if (material === void 0) {
      continue;
    }
    let property;
    switch (parts[1]) {
      case 'w':
      case 't':
        property = material.weight;
        break;
      case 'v':
      case 'm':
      case 'm3':
        property = material.volume;
        break;
      case 'max':
        property = Math.max(material.weight, material.volume);
        break;
    }
    if (property !== void 0) {
      expression = expression.replace(match, property.toFixed(3));
    }
  }
  return expression;
}
function replaceKilo(expression) {
  return expression.replace(/(\d+)k\b/gi, (_, num) => (parseFloat(num) * 1e3).toString());
}
function init() {
  applyCssRules();
  subscribe($$(document, 'input'), input => {
    if (input.inputMode !== 'numeric' && input.inputMode !== 'decimal') {
      return;
    }
    input.addEventListener('keydown', e => onKeyDown(input, e));
  });
}
function applyCssRules() {
  const inputSelector = `div:has(> input:is([inputmode='numeric'], [inputmode='decimal']):focus)`;
  const selector = `.FormComponent__input___f43wqaQ > ${inputSelector}`;
  applyCssRule(selector, $style.inputContainer);
  applyCssRule(`${selector}:before`, fa.solid);
  applyCssRule(`${selector}:before`, $style.functionIcon);
  const selectorDynamic = `.${C.DynamicInput.dynamic} > ${inputSelector}`;
  applyCssRule(selectorDynamic, $style.inputContainer);
  applyCssRule(`${selectorDynamic}:before`, fa.solid);
  applyCssRule(`${selectorDynamic}:before`, $style.functionIconDynamic);
}
features.add(
  import.meta.url,
  init,
  'Evaluates math expressions in numeric text fields on Enter or Tab.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbWF0aC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2lucHV0LW1hdGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuaW1wb3J0ICRzdHlsZSBmcm9tICcuL2lucHV0LW1hdGgubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBjaGFuZ2VJbnB1dFZhbHVlIH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCBNZXhwIGZyb20gJ21hdGgtZXhwcmVzc2lvbi1ldmFsdWF0b3InO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcblxuY29uc3QgbWV4cCA9IG5ldyBNZXhwKCk7XG5cbmZ1bmN0aW9uIG9uS2V5RG93bihpbnB1dDogSFRNTElucHV0RWxlbWVudCwgZTogS2V5Ym9hcmRFdmVudCkge1xuICBpZiAoZS5rZXkgIT09ICdFbnRlcicgJiYgZS5rZXkgIT09ICdUYWInKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFpbnB1dC52YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBleHByZXNzaW9uID0gaW5wdXQudmFsdWUuY2hhckF0KDApID09PSAnPScgPyBpbnB1dC52YWx1ZS5zdWJzdHJpbmcoMSkgOiBpbnB1dC52YWx1ZTtcbiAgZXhwcmVzc2lvbiA9IHJlcGxhY2VNYXRlcmlhbFByb3BlcnRpZXMoZXhwcmVzc2lvbik7XG4gIGV4cHJlc3Npb24gPSByZXBsYWNlS2lsbyhleHByZXNzaW9uKTtcbiAgY29uc3QgcmVzdWx0ID0gcGFyc2VGbG9hdChtZXhwLmV2YWwoZXhwcmVzc2lvbikudG9GaXhlZCg2KSk7XG4gIGNoYW5nZUlucHV0VmFsdWUoaW5wdXQsIHJlc3VsdC50b1N0cmluZygpKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZU1hdGVyaWFsUHJvcGVydGllcyhleHByZXNzaW9uOiBzdHJpbmcpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IGV4cHJlc3Npb24ubWF0Y2goL1xcYihbYS16QS1aMC05XXsxLDN9KVxcLig/Ond8dHx2fG18bTN8bWF4KVxcYi9naSkgPz8gW107XG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgIGNvbnN0IHBhcnRzID0gbWF0Y2guc3BsaXQoJy4nKTtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHBhcnRzWzBdKTtcbiAgICBpZiAobWF0ZXJpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGxldCBwcm9wZXJ0eTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIHN3aXRjaCAocGFydHNbMV0pIHtcbiAgICAgIGNhc2UgJ3cnOlxuICAgICAgY2FzZSAndCc6XG4gICAgICAgIHByb3BlcnR5ID0gbWF0ZXJpYWwud2VpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3YnOlxuICAgICAgY2FzZSAnbSc6XG4gICAgICBjYXNlICdtMyc6XG4gICAgICAgIHByb3BlcnR5ID0gbWF0ZXJpYWwudm9sdW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgIHByb3BlcnR5ID0gTWF0aC5tYXgobWF0ZXJpYWwud2VpZ2h0LCBtYXRlcmlhbC52b2x1bWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UobWF0Y2gsIHByb3BlcnR5LnRvRml4ZWQoMykpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbjtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUtpbG8oZXhwcmVzc2lvbjogc3RyaW5nKSB7XG4gIHJldHVybiBleHByZXNzaW9uLnJlcGxhY2UoLyhcXGQrKWtcXGIvZ2ksIChfLCBudW0pID0+IChwYXJzZUZsb2F0KG51bSkgKiAxMDAwKS50b1N0cmluZygpKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlcygpO1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsICdpbnB1dCcpLCBpbnB1dCA9PiB7XG4gICAgaWYgKGlucHV0LmlucHV0TW9kZSAhPT0gJ251bWVyaWMnICYmIGlucHV0LmlucHV0TW9kZSAhPT0gJ2RlY2ltYWwnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IG9uS2V5RG93bihpbnB1dCwgZSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlDc3NSdWxlcygpIHtcbiAgY29uc3QgaW5wdXRTZWxlY3RvciA9IGBkaXY6aGFzKD4gaW5wdXQ6aXMoW2lucHV0bW9kZT0nbnVtZXJpYyddLCBbaW5wdXRtb2RlPSdkZWNpbWFsJ10pOmZvY3VzKWA7XG4gIC8vIFJlbW92ZSBoYXJkLWNvZGVkIGNsYXNzIHdoZW4gbW9scCBmaXhlcyBjbGFzcyBkdXBsaWNhdGlvblxuICBjb25zdCBzZWxlY3RvciA9IGAuRm9ybUNvbXBvbmVudF9faW5wdXRfX19mNDN3cWFRID4gJHtpbnB1dFNlbGVjdG9yfWA7XG4gIGFwcGx5Q3NzUnVsZShzZWxlY3RvciwgJHN0eWxlLmlucHV0Q29udGFpbmVyKTtcbiAgYXBwbHlDc3NSdWxlKGAke3NlbGVjdG9yfTpiZWZvcmVgLCBmYS5zb2xpZCk7XG4gIGFwcGx5Q3NzUnVsZShgJHtzZWxlY3Rvcn06YmVmb3JlYCwgJHN0eWxlLmZ1bmN0aW9uSWNvbik7XG4gIGNvbnN0IHNlbGVjdG9yRHluYW1pYyA9IGAuJHtDLkR5bmFtaWNJbnB1dC5keW5hbWljfSA+ICR7aW5wdXRTZWxlY3Rvcn1gO1xuICBhcHBseUNzc1J1bGUoc2VsZWN0b3JEeW5hbWljLCAkc3R5bGUuaW5wdXRDb250YWluZXIpO1xuICBhcHBseUNzc1J1bGUoYCR7c2VsZWN0b3JEeW5hbWljfTpiZWZvcmVgLCBmYS5zb2xpZCk7XG4gIGFwcGx5Q3NzUnVsZShgJHtzZWxlY3RvckR5bmFtaWN9OmJlZm9yZWAsICRzdHlsZS5mdW5jdGlvbkljb25EeW5hbWljKTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdFdmFsdWF0ZXMgbWF0aCBleHByZXNzaW9ucyBpbiBudW1lcmljIHRleHQgZmllbGRzIG9uIEVudGVyIG9yIFRhYi4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsTUFBQSxPQUFBLElBQUEsS0FBQTtBQUVBLFNBQUEsVUFBQSxPQUFBLEdBQUE7QUFDRSxNQUFBLEVBQUEsUUFBQSxXQUFBLEVBQUEsUUFBQSxPQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsTUFBQSxDQUFBLE1BQUEsT0FBQTtBQUNFO0FBQUEsRUFBQTtBQUdGLE1BQUEsYUFBQSxNQUFBLE1BQUEsT0FBQSxDQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsVUFBQSxDQUFBLElBQUEsTUFBQTtBQUNBLGVBQUEsMEJBQUEsVUFBQTtBQUNBLGVBQUEsWUFBQSxVQUFBO0FBQ0EsUUFBQSxTQUFBLFdBQUEsS0FBQSxLQUFBLFVBQUEsRUFBQSxRQUFBLENBQUEsQ0FBQTtBQUNBLG1CQUFBLE9BQUEsT0FBQSxVQUFBO0FBQ0Y7QUFFQSxTQUFBLDBCQUFBLFlBQUE7QUFDRSxRQUFBLFVBQUEsV0FBQSxNQUFBLDhDQUFBLEtBQUEsQ0FBQTtBQUNBLGFBQUEsU0FBQSxTQUFBO0FBQ0UsVUFBQSxRQUFBLE1BQUEsTUFBQSxHQUFBO0FBQ0EsVUFBQSxXQUFBLGVBQUEsWUFBQSxNQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsYUFBQSxRQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsUUFBQTtBQUNBLFlBQUEsTUFBQSxDQUFBLEdBQUE7QUFBQSxNQUFrQixLQUFBO0FBQUEsTUFDWCxLQUFBO0FBRUgsbUJBQUEsU0FBQTtBQUNBO0FBQUEsTUFBQSxLQUFBO0FBQUEsTUFDRyxLQUFBO0FBQUEsTUFDQSxLQUFBO0FBRUgsbUJBQUEsU0FBQTtBQUNBO0FBQUEsTUFBQSxLQUFBO0FBRUEsbUJBQUEsS0FBQSxJQUFBLFNBQUEsUUFBQSxTQUFBLE1BQUE7QUFDQTtBQUFBLElBQUE7QUFFSixRQUFBLGFBQUEsUUFBQTtBQUNFLG1CQUFBLFdBQUEsUUFBQSxPQUFBLFNBQUEsUUFBQSxDQUFBLENBQUE7QUFBQSxJQUEwRDtBQUFBLEVBQzVEO0FBRUYsU0FBQTtBQUNGO0FBRUEsU0FBQSxZQUFBLFlBQUE7QUFDRSxTQUFBLFdBQUEsUUFBQSxjQUFBLENBQUEsR0FBQSxTQUFBLFdBQUEsR0FBQSxJQUFBLEtBQUEsU0FBQSxDQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRSxnQkFBQTtBQUNBLFlBQUEsR0FBQSxVQUFBLE9BQUEsR0FBQSxDQUFBLFVBQUE7QUFDRSxRQUFBLE1BQUEsY0FBQSxhQUFBLE1BQUEsY0FBQSxXQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsVUFBQSxpQkFBQSxXQUFBLENBQUEsTUFBQSxVQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQUEsRUFBMEQsQ0FBQTtBQUU5RDtBQUVBLFNBQUEsZ0JBQUE7QUFDRSxRQUFBLGdCQUFBO0FBRUEsUUFBQSxXQUFBLHFDQUFBLGFBQUE7QUFDQSxlQUFBLFVBQUEsT0FBQSxjQUFBO0FBQ0EsZUFBQSxHQUFBLFFBQUEsV0FBQSxHQUFBLEtBQUE7QUFDQSxlQUFBLEdBQUEsUUFBQSxXQUFBLE9BQUEsWUFBQTtBQUNBLFFBQUEsa0JBQUEsSUFBQSxFQUFBLGFBQUEsT0FBQSxNQUFBLGFBQUE7QUFDQSxlQUFBLGlCQUFBLE9BQUEsY0FBQTtBQUNBLGVBQUEsR0FBQSxlQUFBLFdBQUEsR0FBQSxLQUFBO0FBQ0EsZUFBQSxHQUFBLGVBQUEsV0FBQSxPQUFBLG1CQUFBO0FBQ0Y7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
