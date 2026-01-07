import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tinycolor from './tinycolor.js';
import { refTextContent } from './reactive-dom.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { materialsStore } from './materials.js';
import { materialCategoriesStore } from './material-categories.js';
import { objectKeys } from './object-keys.js';
function trackItemTickers() {
  appendStylesheet();
  subscribe($$(document, C.ColoredIcon.label), label => {
    const container = label.closest(`.${C.ColoredIcon.container}`);
    if (!container) {
      return;
    }
    const currentClasses = [];
    const ticker = refTextContent(label);
    watchEffectWhileNodeAlive(label, () => {
      for (const className of currentClasses) {
        container.classList.remove(className);
      }
      currentClasses.length = 0;
      if (!ticker.value) {
        return;
      }
      currentClasses.push('rp-ticker-' + ticker.value);
      const material = materialsStore.getByTicker(ticker.value);
      const category = materialCategoriesStore.getById(material?.category);
      if (category) {
        currentClasses.push('rp-category-' + sanitizeCategoryName(category.name));
      }
      for (const className of currentClasses) {
        container.classList.add(className);
      }
    });
  });
}
function appendStylesheet() {
  const style = document.createElement('style');
  style.id = 'rp-css-icon-colors';
  const defaultColor = tinycolor('black');
  const gradientStart = defaultColor.darken(20).toHexString();
  const gradientEnd = defaultColor.brighten(10).toHexString();
  const fontColor = defaultColor.brighten(40).toHexString();
  const defaultStyle = `.${C.ColoredIcon.container} {
  background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd});
  color: ${fontColor};
}

`;
  style.textContent = defaultStyle + objectKeys(categoryColors).map(createCssRule).join('\n\n');
  document.head.appendChild(style);
}
function createCssRule(category) {
  const color = tinycolor(categoryColors[category].color);
  const gradientStart = color.darken(20).toHexString();
  const gradientEnd = color.brighten(10).toHexString();
  const fontColor = color.brighten(40).toHexString();
  return `.rp-category-${sanitizeCategoryName(category)} {
  background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd});
  color: ${fontColor};
}`;
}
function sanitizeCategoryName(name) {
  return name.replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '');
}
const categoryColors = {
  'agricultural products': {
    color: 'b22222',
  },
  alloys: {
    color: 'cd7f32',
  },
  chemicals: {
    color: 'db7093',
  },
  'construction materials': {
    color: '6495ed',
  },
  'construction parts': {
    color: '4682b4',
  },
  'construction prefabs': {
    color: '1c39bb',
  },
  'consumable bundles': {
    color: '971728',
  },
  'consumables (basic)': {
    color: 'cd5c5c',
  },
  'consumables (luxury)': {
    color: 'da2c43',
  },
  drones: {
    color: 'e25822',
  },
  'electronic devices': {
    color: '8a2be2',
  },
  'electronic parts': {
    color: '9370db',
  },
  'electronic pieces': {
    color: 'b19cd9',
  },
  'electronic systems': {
    color: '663399',
  },
  elements: {
    color: '806043',
  },
  'energy systems': {
    color: '2e8b57',
  },
  fuels: {
    color: '32cd32',
  },
  gases: {
    color: '00ced1',
  },
  infrastructure: {
    color: '1e1e8c',
  },
  liquids: {
    color: 'bcd4e6',
  },
  'medical equipment': {
    color: '99cc99',
  },
  metals: {
    color: '696969',
  },
  minerals: {
    color: 'C4A484',
  },
  ores: {
    color: '838996',
  },
  plastics: {
    color: 'cb3365',
  },
  'ship engines': {
    color: 'ff4500',
  },
  'ship kits': {
    color: 'ff8c00',
  },
  'ship parts': {
    color: 'ffa500',
  },
  'ship shields': {
    color: 'ffb347',
  },
  'software components': {
    color: 'c5b358',
  },
  'software systems': {
    color: '9b870c',
  },
  'software tools': {
    color: 'daa520',
  },
  textiles: {
    color: '96a53c',
  },
  'unit prefabs': {
    color: '534b4f',
  },
  utility: {
    color: 'CEC7C1',
  },
};
export { sanitizeCategoryName, trackItemTickers };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS10cmFja2VyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9pdGVtLXRyYWNrZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcbmltcG9ydCB7IHJlZlRleHRDb250ZW50IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1kb20nO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgb2JqZWN0S2V5cyB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuaW1wb3J0IHsgbWF0ZXJpYWxDYXRlZ29yaWVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWwtY2F0ZWdvcmllcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFja0l0ZW1UaWNrZXJzKCkge1xuICBhcHBlbmRTdHlsZXNoZWV0KCk7XG4gIHN1YnNjcmliZSgkJChkb2N1bWVudCwgQy5Db2xvcmVkSWNvbi5sYWJlbCksIGxhYmVsID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBsYWJlbC5jbG9zZXN0KGAuJHtDLkNvbG9yZWRJY29uLmNvbnRhaW5lcn1gKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50Q2xhc3Nlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0aWNrZXIgPSByZWZUZXh0Q29udGVudChsYWJlbCk7XG4gICAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShsYWJlbCwgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBjbGFzc05hbWUgb2YgY3VycmVudENsYXNzZXMpIHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRDbGFzc2VzLmxlbmd0aCA9IDA7XG4gICAgICBpZiAoIXRpY2tlci52YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjdXJyZW50Q2xhc3Nlcy5wdXNoKCdycC10aWNrZXItJyArIHRpY2tlci52YWx1ZSk7XG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHRpY2tlci52YWx1ZSk7XG4gICAgICBjb25zdCBjYXRlZ29yeSA9IG1hdGVyaWFsQ2F0ZWdvcmllc1N0b3JlLmdldEJ5SWQobWF0ZXJpYWw/LmNhdGVnb3J5KTtcbiAgICAgIGlmIChjYXRlZ29yeSkge1xuICAgICAgICBjdXJyZW50Q2xhc3Nlcy5wdXNoKCdycC1jYXRlZ29yeS0nICsgc2FuaXRpemVDYXRlZ29yeU5hbWUoY2F0ZWdvcnkubmFtZSkpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBjbGFzc05hbWUgb2YgY3VycmVudENsYXNzZXMpIHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZFN0eWxlc2hlZXQoKSB7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUuaWQgPSAncnAtY3NzLWljb24tY29sb3JzJztcbiAgY29uc3QgZGVmYXVsdENvbG9yID0gdGlueWNvbG9yKCdibGFjaycpO1xuICBjb25zdCBncmFkaWVudFN0YXJ0ID0gZGVmYXVsdENvbG9yLmRhcmtlbigyMCkudG9IZXhTdHJpbmcoKTtcbiAgY29uc3QgZ3JhZGllbnRFbmQgPSBkZWZhdWx0Q29sb3IuYnJpZ2h0ZW4oMTApLnRvSGV4U3RyaW5nKCk7XG4gIGNvbnN0IGZvbnRDb2xvciA9IGRlZmF1bHRDb2xvci5icmlnaHRlbig0MCkudG9IZXhTdHJpbmcoKTtcbiAgY29uc3QgZGVmYXVsdFN0eWxlID1cbiAgICBgLiR7Qy5Db2xvcmVkSWNvbi5jb250YWluZXJ9IHtcXG5gICtcbiAgICBgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAke2dyYWRpZW50U3RhcnR9LCAke2dyYWRpZW50RW5kfSk7XFxuYCArXG4gICAgYCAgY29sb3I6ICR7Zm9udENvbG9yfTtcXG5gICtcbiAgICAnfVxcblxcbic7XG4gIHN0eWxlLnRleHRDb250ZW50ID0gZGVmYXVsdFN0eWxlICsgb2JqZWN0S2V5cyhjYXRlZ29yeUNvbG9ycykubWFwKGNyZWF0ZUNzc1J1bGUpLmpvaW4oJ1xcblxcbicpO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ3NzUnVsZTxUIGV4dGVuZHMga2V5b2YgdHlwZW9mIGNhdGVnb3J5Q29sb3JzPihjYXRlZ29yeTogVCkge1xuICBjb25zdCBjb2xvciA9IHRpbnljb2xvcihjYXRlZ29yeUNvbG9yc1tjYXRlZ29yeV0uY29sb3IpO1xuICBjb25zdCBncmFkaWVudFN0YXJ0ID0gY29sb3IuZGFya2VuKDIwKS50b0hleFN0cmluZygpO1xuICBjb25zdCBncmFkaWVudEVuZCA9IGNvbG9yLmJyaWdodGVuKDEwKS50b0hleFN0cmluZygpO1xuICBjb25zdCBmb250Q29sb3IgPSBjb2xvci5icmlnaHRlbig0MCkudG9IZXhTdHJpbmcoKTtcbiAgcmV0dXJuIChcbiAgICBgLnJwLWNhdGVnb3J5LSR7c2FuaXRpemVDYXRlZ29yeU5hbWUoY2F0ZWdvcnkpfSB7XFxuYCArXG4gICAgYCAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgJHtncmFkaWVudFN0YXJ0fSwgJHtncmFkaWVudEVuZH0pO1xcbmAgK1xuICAgIGAgIGNvbG9yOiAke2ZvbnRDb2xvcn07XFxuYCArXG4gICAgJ30nXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUNhdGVnb3J5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5hbWUucmVwbGFjZUFsbCgnICcsICctJykucmVwbGFjZUFsbCgnKCcsICcnKS5yZXBsYWNlQWxsKCcpJywgJycpO1xufVxuXG4vLyBDb3BpZWQgZnJvbSBQclVuIGpzIGJ1bmRsZS5cbmNvbnN0IGNhdGVnb3J5Q29sb3JzID0ge1xuICAnYWdyaWN1bHR1cmFsIHByb2R1Y3RzJzoge1xuICAgIGNvbG9yOiAnYjIyMjIyJyxcbiAgfSxcbiAgYWxsb3lzOiB7XG4gICAgY29sb3I6ICdjZDdmMzInLFxuICB9LFxuICBjaGVtaWNhbHM6IHtcbiAgICBjb2xvcjogJ2RiNzA5MycsXG4gIH0sXG4gICdjb25zdHJ1Y3Rpb24gbWF0ZXJpYWxzJzoge1xuICAgIGNvbG9yOiAnNjQ5NWVkJyxcbiAgfSxcbiAgJ2NvbnN0cnVjdGlvbiBwYXJ0cyc6IHtcbiAgICBjb2xvcjogJzQ2ODJiNCcsXG4gIH0sXG4gICdjb25zdHJ1Y3Rpb24gcHJlZmFicyc6IHtcbiAgICBjb2xvcjogJzFjMzliYicsXG4gIH0sXG4gICdjb25zdW1hYmxlIGJ1bmRsZXMnOiB7XG4gICAgY29sb3I6ICc5NzE3MjgnLFxuICB9LFxuICAnY29uc3VtYWJsZXMgKGJhc2ljKSc6IHtcbiAgICBjb2xvcjogJ2NkNWM1YycsXG4gIH0sXG4gICdjb25zdW1hYmxlcyAobHV4dXJ5KSc6IHtcbiAgICBjb2xvcjogJ2RhMmM0MycsXG4gIH0sXG4gIGRyb25lczoge1xuICAgIGNvbG9yOiAnZTI1ODIyJyxcbiAgfSxcbiAgJ2VsZWN0cm9uaWMgZGV2aWNlcyc6IHtcbiAgICBjb2xvcjogJzhhMmJlMicsXG4gIH0sXG4gICdlbGVjdHJvbmljIHBhcnRzJzoge1xuICAgIGNvbG9yOiAnOTM3MGRiJyxcbiAgfSxcbiAgJ2VsZWN0cm9uaWMgcGllY2VzJzoge1xuICAgIGNvbG9yOiAnYjE5Y2Q5JyxcbiAgfSxcbiAgJ2VsZWN0cm9uaWMgc3lzdGVtcyc6IHtcbiAgICBjb2xvcjogJzY2MzM5OScsXG4gIH0sXG4gIGVsZW1lbnRzOiB7XG4gICAgY29sb3I6ICc4MDYwNDMnLFxuICB9LFxuICAnZW5lcmd5IHN5c3RlbXMnOiB7XG4gICAgY29sb3I6ICcyZThiNTcnLFxuICB9LFxuICBmdWVsczoge1xuICAgIGNvbG9yOiAnMzJjZDMyJyxcbiAgfSxcbiAgZ2FzZXM6IHtcbiAgICBjb2xvcjogJzAwY2VkMScsXG4gIH0sXG4gIGluZnJhc3RydWN0dXJlOiB7XG4gICAgY29sb3I6ICcxZTFlOGMnLFxuICB9LFxuICBsaXF1aWRzOiB7XG4gICAgY29sb3I6ICdiY2Q0ZTYnLFxuICB9LFxuICAnbWVkaWNhbCBlcXVpcG1lbnQnOiB7XG4gICAgY29sb3I6ICc5OWNjOTknLFxuICB9LFxuICBtZXRhbHM6IHtcbiAgICBjb2xvcjogJzY5Njk2OScsXG4gIH0sXG4gIG1pbmVyYWxzOiB7XG4gICAgY29sb3I6ICdDNEE0ODQnLFxuICB9LFxuICBvcmVzOiB7XG4gICAgY29sb3I6ICc4Mzg5OTYnLFxuICB9LFxuICBwbGFzdGljczoge1xuICAgIGNvbG9yOiAnY2IzMzY1JyxcbiAgfSxcbiAgJ3NoaXAgZW5naW5lcyc6IHtcbiAgICBjb2xvcjogJ2ZmNDUwMCcsXG4gIH0sXG4gICdzaGlwIGtpdHMnOiB7XG4gICAgY29sb3I6ICdmZjhjMDAnLFxuICB9LFxuICAnc2hpcCBwYXJ0cyc6IHtcbiAgICBjb2xvcjogJ2ZmYTUwMCcsXG4gIH0sXG4gICdzaGlwIHNoaWVsZHMnOiB7XG4gICAgY29sb3I6ICdmZmIzNDcnLFxuICB9LFxuICAnc29mdHdhcmUgY29tcG9uZW50cyc6IHtcbiAgICBjb2xvcjogJ2M1YjM1OCcsXG4gIH0sXG4gICdzb2Z0d2FyZSBzeXN0ZW1zJzoge1xuICAgIGNvbG9yOiAnOWI4NzBjJyxcbiAgfSxcbiAgJ3NvZnR3YXJlIHRvb2xzJzoge1xuICAgIGNvbG9yOiAnZGFhNTIwJyxcbiAgfSxcbiAgdGV4dGlsZXM6IHtcbiAgICBjb2xvcjogJzk2YTUzYycsXG4gIH0sXG4gICd1bml0IHByZWZhYnMnOiB7XG4gICAgY29sb3I6ICc1MzRiNGYnLFxuICB9LFxuICB1dGlsaXR5OiB7XG4gICAgY29sb3I6ICdDRUM3QzEnLFxuICB9LFxufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPTyxTQUFBLG1CQUFBO0FBQ0wsbUJBQUE7QUFDQSxZQUFBLEdBQUEsVUFBQSxFQUFBLFlBQUEsS0FBQSxHQUFBLENBQUEsVUFBQTtBQUNFLFVBQUEsWUFBQSxNQUFBLFFBQUEsSUFBQSxFQUFBLFlBQUEsU0FBQSxFQUFBO0FBQ0EsUUFBQSxDQUFBLFdBQUE7QUFDRTtBQUFBLElBQUE7QUFFRixVQUFBLGlCQUFBLENBQUE7QUFDQSxVQUFBLFNBQUEsZUFBQSxLQUFBO0FBQ0EsOEJBQUEsT0FBQSxNQUFBO0FBQ0UsaUJBQUEsYUFBQSxnQkFBQTtBQUNFLGtCQUFBLFVBQUEsT0FBQSxTQUFBO0FBQUEsTUFBb0M7QUFFdEMscUJBQUEsU0FBQTtBQUNBLFVBQUEsQ0FBQSxPQUFBLE9BQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixxQkFBQSxLQUFBLGVBQUEsT0FBQSxLQUFBO0FBQ0EsWUFBQSxXQUFBLGVBQUEsWUFBQSxPQUFBLEtBQUE7QUFDQSxZQUFBLFdBQUEsd0JBQUEsUUFBQSxVQUFBLFFBQUE7QUFDQSxVQUFBLFVBQUE7QUFDRSx1QkFBQSxLQUFBLGlCQUFBLHFCQUFBLFNBQUEsSUFBQSxDQUFBO0FBQUEsTUFBd0U7QUFFMUUsaUJBQUEsYUFBQSxnQkFBQTtBQUNFLGtCQUFBLFVBQUEsSUFBQSxTQUFBO0FBQUEsTUFBaUM7QUFBQSxJQUNuQyxDQUFBO0FBQUEsRUFDRCxDQUFBO0FBRUw7QUFFQSxTQUFBLG1CQUFBO0FBQ0UsUUFBQSxRQUFBLFNBQUEsY0FBQSxPQUFBO0FBQ0EsUUFBQSxLQUFBO0FBQ0EsUUFBQSxlQUFBLFVBQUEsT0FBQTtBQUNBLFFBQUEsZ0JBQUEsYUFBQSxPQUFBLEVBQUEsRUFBQSxZQUFBO0FB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
