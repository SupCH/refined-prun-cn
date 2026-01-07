import features from './feature-registry.js';
import { castArray } from './cast-array.js';
let rules = {};
function loadRefinedPrunCss() {
  const css = document.getElementById('refined-prun-css');
  rules = JSON.parse(css.textContent);
  css.textContent = null;
}
function applyCssRule(arg1, arg2, arg3) {
  if (!features.current) {
    throw new Error('Cannot apply css rules outside of feature init');
  }
  let commands;
  let selectors;
  let sourceClass;
  if (arguments.length === 2) {
    commands = [];
    selectors = castArray(arg1);
    sourceClass = arg2;
  } else {
    commands = castArray(arg1);
    selectors = castArray(arg2);
    sourceClass = arg3;
  }
  if (!sourceClass) {
    throw new Error('Source class is undefined');
  }
  const sourceSelector = '.' + sourceClass;
  const match = rules[sourceSelector];
  if (!match) {
    throw new Error(`Failed to find css selector ${sourceSelector}`);
  }
  if (commands.length > 0) {
    for (const selector of selectors) {
      for (const command of commands) {
        applyRawCssRule(match.replace(sourceSelector, `${selectCommand(command)} ${selector}`));
      }
    }
  } else {
    for (const selector of selectors) {
      applyRawCssRule(match.replace(sourceSelector, selector));
    }
  }
}
let currentSheet = {
  id: '',
  textContent: '',
};
const sheets = [];
function applyRawCssRule(rule) {
  if (currentSheet.id !== features.current) {
    queueSheetAppend();
    currentSheet = {
      id: features.current,
      textContent: '',
    };
    sheets.push(currentSheet);
  } else {
    currentSheet.textContent += '\n\n';
  }
  currentSheet.textContent += rule;
}
function queueSheetAppend() {
  if (sheets.length > 0) {
    return;
  }
  queueMicrotask(() => {
    for (const sheet of sheets) {
      const style = document.createElement('style');
      style.id = `rp-css-${sheet.id}`;
      style.textContent = `.refined-prun ${wrapInBrackets(sheet.textContent)}`;
      document.head.appendChild(style);
    }
  });
}
function wrapInBrackets(text) {
  return `{
  ${indent(text)}
}`;
}
function indent(text) {
  return text.replaceAll('\n', '\n  ');
}
function selectCommand(command) {
  return `.rp-command-${command}`;
}
export { applyCssRule, applyRawCssRule, loadRefinedPrunCss };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmaW5lZC1wcnVuLWNzcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvcmVmaW5lZC1wcnVuLWNzcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYXN0QXJyYXkgfSBmcm9tICdAc3JjL3V0aWxzL2Nhc3QtYXJyYXknO1xuXG5sZXQgcnVsZXM6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFJlZmluZWRQcnVuQ3NzKCkge1xuICBjb25zdCBjc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmaW5lZC1wcnVuLWNzcycpITtcbiAgcnVsZXMgPSBKU09OLnBhcnNlKGNzcy50ZXh0Q29udGVudCEpO1xuICBjc3MudGV4dENvbnRlbnQgPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlDc3NSdWxlKHNlbGVjdG9yczogQXJyYXlhYmxlPHN0cmluZz4sIHNvdXJjZUNsYXNzOiBzdHJpbmcpOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q3NzUnVsZShcbiAgY29tbWFuZHM6IEFycmF5YWJsZTxzdHJpbmc+LFxuICBzZWxlY3RvcnM6IEFycmF5YWJsZTxzdHJpbmc+LFxuICBzb3VyY2VDbGFzczogc3RyaW5nLFxuKTogdm9pZDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q3NzUnVsZShhcmcxOiBBcnJheWFibGU8c3RyaW5nPiwgYXJnMjogQXJyYXlhYmxlPHN0cmluZz4sIGFyZzM/OiBzdHJpbmcpIHtcbiAgaWYgKCFmZWF0dXJlcy5jdXJyZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYXBwbHkgY3NzIHJ1bGVzIG91dHNpZGUgb2YgZmVhdHVyZSBpbml0Jyk7XG4gIH1cbiAgbGV0IGNvbW1hbmRzOiBzdHJpbmdbXTtcbiAgbGV0IHNlbGVjdG9yczogc3RyaW5nW107XG4gIGxldCBzb3VyY2VDbGFzczogc3RyaW5nO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbW1hbmRzID0gW107XG4gICAgc2VsZWN0b3JzID0gY2FzdEFycmF5KGFyZzEpO1xuICAgIHNvdXJjZUNsYXNzID0gYXJnMiBhcyBzdHJpbmc7XG4gIH0gZWxzZSB7XG4gICAgY29tbWFuZHMgPSBjYXN0QXJyYXkoYXJnMSk7XG4gICAgc2VsZWN0b3JzID0gY2FzdEFycmF5KGFyZzIpO1xuICAgIHNvdXJjZUNsYXNzID0gYXJnMyBhcyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXNvdXJjZUNsYXNzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb3VyY2UgY2xhc3MgaXMgdW5kZWZpbmVkJyk7XG4gIH1cbiAgY29uc3Qgc291cmNlU2VsZWN0b3IgPSAnLicgKyBzb3VyY2VDbGFzcztcbiAgY29uc3QgbWF0Y2ggPSBydWxlc1tzb3VyY2VTZWxlY3Rvcl07XG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmaW5kIGNzcyBzZWxlY3RvciAke3NvdXJjZVNlbGVjdG9yfWApO1xuICB9XG4gIGlmIChjb21tYW5kcy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBzZWxlY3RvcnMpIHtcbiAgICAgIGZvciAoY29uc3QgY29tbWFuZCBvZiBjb21tYW5kcykge1xuICAgICAgICBhcHBseVJhd0Nzc1J1bGUobWF0Y2gucmVwbGFjZShzb3VyY2VTZWxlY3RvciwgYCR7c2VsZWN0Q29tbWFuZChjb21tYW5kKX0gJHtzZWxlY3Rvcn1gKSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2Ygc2VsZWN0b3JzKSB7XG4gICAgICBhcHBseVJhd0Nzc1J1bGUobWF0Y2gucmVwbGFjZShzb3VyY2VTZWxlY3Rvciwgc2VsZWN0b3IpKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IGN1cnJlbnRTaGVldCA9IHtcbiAgaWQ6ICcnLFxuICB0ZXh0Q29udGVudDogJycsXG59O1xuY29uc3Qgc2hlZXRzOiAodHlwZW9mIGN1cnJlbnRTaGVldClbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlSYXdDc3NSdWxlKHJ1bGU6IHN0cmluZykge1xuICBpZiAoY3VycmVudFNoZWV0LmlkICE9PSBmZWF0dXJlcy5jdXJyZW50KSB7XG4gICAgcXVldWVTaGVldEFwcGVuZCgpO1xuICAgIGN1cnJlbnRTaGVldCA9IHtcbiAgICAgIGlkOiBmZWF0dXJlcy5jdXJyZW50ISxcbiAgICAgIHRleHRDb250ZW50OiAnJyxcbiAgICB9O1xuICAgIHNoZWV0cy5wdXNoKGN1cnJlbnRTaGVldCk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudFNoZWV0LnRleHRDb250ZW50ICs9ICdcXG5cXG4nO1xuICB9XG4gIGN1cnJlbnRTaGVldC50ZXh0Q29udGVudCArPSBydWxlO1xufVxuXG5mdW5jdGlvbiBxdWV1ZVNoZWV0QXBwZW5kKCkge1xuICBpZiAoc2hlZXRzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgIGZvciAoY29uc3Qgc2hlZXQgb2Ygc2hlZXRzKSB7XG4gICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZS5pZCA9IGBycC1jc3MtJHtzaGVldC5pZH1gO1xuICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBgLnJlZmluZWQtcHJ1biAke3dyYXBJbkJyYWNrZXRzKHNoZWV0LnRleHRDb250ZW50KX1gO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gd3JhcEluQnJhY2tldHModGV4dDogc3RyaW5nKSB7XG4gIHJldHVybiBge1xcbiAgJHtpbmRlbnQodGV4dCl9XFxufWA7XG59XG5cbmZ1bmN0aW9uIGluZGVudCh0ZXh0OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZUFsbCgnXFxuJywgJ1xcbiAgJyk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdENvbW1hbmQoY29tbWFuZDogc3RyaW5nKSB7XG4gIHJldHVybiBgLnJwLWNvbW1hbmQtJHtjb21tYW5kfWA7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFBLFFBQUEsQ0FBQTtBQUVPLFNBQUEscUJBQUE7QUFDTCxRQUFBLE1BQUEsU0FBQSxlQUFBLGtCQUFBO0FBQ0EsVUFBQSxLQUFBLE1BQUEsSUFBQSxXQUFBO0FBQ0EsTUFBQSxjQUFBO0FBQ0Y7QUFTTyxTQUFBLGFBQUEsTUFBQSxNQUFBLE1BQUE7QUFDTCxNQUFBLENBQUEsU0FBQSxTQUFBO0FBQ0UsVUFBQSxJQUFBLE1BQUEsZ0RBQUE7QUFBQSxFQUFnRTtBQUVsRSxNQUFBO0FBQ0EsTUFBQTtBQUNBLE1BQUE7QUFDQSxNQUFBLFVBQUEsV0FBQSxHQUFBO0FBQ0UsZUFBQSxDQUFBO0FBQ0EsZ0JBQUEsVUFBQSxJQUFBO0FBQ0Esa0JBQUE7QUFBQSxFQUFjLE9BQUE7QUFFZCxlQUFBLFVBQUEsSUFBQTtBQUNBLGdCQUFBLFVBQUEsSUFBQTtBQUNBLGtCQUFBO0FBQUEsRUFBYztBQUdoQixNQUFBLENBQUEsYUFBQTtBQUNFLFVBQUEsSUFBQSxNQUFBLDJCQUFBO0FBQUEsRUFBMkM7QUFFN0MsUUFBQSxpQkFBQSxNQUFBO0FBQ0EsUUFBQSxRQUFBLE1BQUEsY0FBQTtBQUNBLE1BQUEsQ0FBQSxPQUFBO0FBQ0UsVUFBQSxJQUFBLE1BQUEsK0JBQUEsY0FBQSxFQUFBO0FBQUEsRUFBK0Q7QUFFakUsTUFBQSxTQUFBLFNBQUEsR0FBQTtBQUNFLGVBQUEsWUFBQSxXQUFBO0FBQ0UsaUJBQUEsV0FBQSxVQUFBO0FBQ0Usd0JBQUEsTUFBQSxRQUFBLGdCQUFBLEdBQUEsY0FBQSxPQUFBLENBQUEsSUFBQSxRQUFBLEVBQUEsQ0FBQTtBQUFBLE1BQXNGO0FBQUEsSUFDeEY7QUFBQSxFQUNGLE9BQUE7QUFFQSxlQUFBLFlBQUEsV0FBQTtBQUNFLHNCQUFBLE1BQUEsUUFBQSxnQkFBQSxRQUFBLENBQUE7QUFBQSxJQUF1RDtBQUFBLEVBQ3pEO0FBRUo7QUFFQSxJQUFBLGVBQUE7QUFBQSxFQUFtQixJQUFBO0FBQUEsRUFDYixhQUFBO0FBRU47QUFDQSxNQUFBLFNBQUEsQ0FBQTtBQUVPLFNBQUEsZ0JBQUEsTUFBQTtBQUNMLE1BQUEsYUFBQSxPQUFBLFNBQUEsU0FBQTtBQUNFLHFCQUFBO0FBQ0EsbUJBQUE7QUFBQSxNQUFlLElBQUEsU0FBQTtBQUFBLE1BQ0EsYUFBQTtBQUFBLElBQ0E7QUFFZixXQUFBLEtBQUEsWUFBQTtBQUFBLEVBQXdCLE9BQUE7QUFFeEIsaUJBQUEsZUFBQTtBQUFBLEVBQTRCO0FBRTlCLGVBQUEsZUFBQTtBQUNGO0FBRUEsU0FBQSxtQkFBQTtBQUNFLE1BQUEsT0FBQSxTQUFBLEdBQUE7QUFDRTtBQUFBLEVBQUE7QUFFRixpQkFBQSxNQUFBO0FBQ0UsZUFBQSxTQUFBLFFBQUE7QUFDRSxZQUFBLFFBQUEsU0FBQSxjQUFBLE9BQUE7QUFDQSxZQUFBLEtBQUEsVUFBQSxNQUFBLEVBQUE7QUFDQSxZQUFBLGNBQUEsaUJBQUEsZUFBQSxNQUFBLFdBQUEsQ0FBQTtBQUNBLGVBQUEsS0FBQSxZQUFBLEtBQUE7QUFBQSxJQUErQjtBQUFBLEVBQ2pDLENBQUE7QUFFSjtBQUVBLFNBQUEsZUFBQSxNQUFBO0FBQ0UsU0FBQTtBQUFBLElBQU8sT0FBQSxJQUFBLENBQUE7QUFBQTtBQUNUO0FBRUEsU0FBQSxPQUFBLE1BQUE7QUFDRSxTQUFBLEtBQUEsV0FBQSxNQUFBLE1BQUE7QUFDRjtBQUVBLFNBQUEsY0FBQSxTQUFBO0FBQ0UsU0FBQSxlQUFBLE9BQUE7QUFDRjsifQ==
