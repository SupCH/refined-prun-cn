import xit from './xit-registry.js';
import { _$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { subscribe } from './subscribe-async-generator.js';
import tiles from './tiles.js';
import _sfc_main from './ContextControls.vue.js';
import { tileStatePlugin } from './user-data-tiles.js';
import { startMeasure } from './performance-measure.js';
import { xitParametersKey } from './use-xit-parameters.js';
import { xitCommandKey } from './use-xit-command.js';
import { userData } from './user-data.js';
import { showBuffer } from './buffers.js';
import { tileKey } from './use-tile.js';
import { isEmpty } from './is-empty.js';
function onTileReady(tile) {
  let rawParameter = tile.parameter;
  if (!rawParameter) {
    rawParameter = 'CMDS';
  }
  let parameters = [];
  if (rawParameter[0] === '1') {
    const keyValues = rawParameter.split(' ');
    parameters.push(...keyValues.map(x => x.slice(2)));
  } else {
    parameters = rawParameter.split(/[_ ]+/g);
  }
  if (isEmpty(parameters)) {
    return;
  }
  const command = parameters[0];
  if (command.toUpperCase() == 'FIO' || command.toUpperCase() == 'COL') {
    return;
  }
  const xitCommand = xit.get(command);
  parameters = parameters.slice(1);
  if (xitCommand) {
    _$(tile.frame, C.TileFrame.title).textContent =
      typeof xitCommand.name === 'string' ? xitCommand.name : xitCommand.name(parameters);
    if (xitCommand.contextItems) {
      const items = xitCommand.contextItems(parameters);
      if (!isEmpty(items)) {
        const header = _$(tile.frame, C.TileFrame.header);
        createFragmentApp(_sfc_main, { items }).after(header);
      }
    }
  }
  subscribe($$(tile.anchor, C.ScrollView.view), scrollView => {
    const container = scrollView.children[0];
    if (container === void 0) {
      return;
    }
    container.removeAttribute('style');
    container.style.width = '100%';
    container.style.height = '100%';
    if (!xitCommand) {
      container.textContent = 'Error! No Matching Function!';
      return;
    }
    startMeasure(tile.fullCommand);
    createFragmentApp(xitCommand.component(parameters))
      .use(tileStatePlugin, { tile })
      .provide(tileKey, tile)
      .provide(xitCommandKey, command)
      .provide(xitParametersKey, parameters)
      .appendTo(container);
  });
}
function initializeXitCommands() {
  tiles.observe('XIT', onTileReady);
  if (userData.settings.mode === void 0) {
    setTimeout(() => showBuffer('XIT START'), 1e3);
  }
}
export { initializeXitCommands };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGl0LWNvbW1hbmRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL3hpdC1jb21tYW5kcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGV4dENvbnRyb2xzIGZyb20gJ0BzcmMvY29tcG9uZW50cy9Db250ZXh0Q29udHJvbHMudnVlJztcbmltcG9ydCB7IHRpbGVTdGF0ZVBsdWdpbiB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhLXRpbGVzJztcbmltcG9ydCB7IHN0YXJ0TWVhc3VyZSwgc3RvcE1lYXN1cmUgfSBmcm9tICdAc3JjL3V0aWxzL3BlcmZvcm1hbmNlLW1lYXN1cmUnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyB4aXRQYXJhbWV0ZXJzS2V5IH0gZnJvbSAnQHNyYy9ob29rcy91c2UteGl0LXBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgeGl0Q29tbWFuZEtleSB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1jb21tYW5kJztcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEnO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCB7IHRpbGVLZXkgfSBmcm9tICdAc3JjL2hvb2tzL3VzZS10aWxlJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgbGV0IHJhd1BhcmFtZXRlciA9IHRpbGUucGFyYW1ldGVyO1xuICBpZiAoIXJhd1BhcmFtZXRlcikge1xuICAgIHJhd1BhcmFtZXRlciA9ICdDTURTJztcbiAgfVxuXG4gIGxldCBwYXJhbWV0ZXJzID0gW10gYXMgc3RyaW5nW107XG4gIGlmIChyYXdQYXJhbWV0ZXJbMF0gPT09ICcxJykge1xuICAgIGNvbnN0IGtleVZhbHVlcyA9IHJhd1BhcmFtZXRlci5zcGxpdCgnICcpO1xuICAgIHBhcmFtZXRlcnMucHVzaCguLi5rZXlWYWx1ZXMubWFwKHggPT4geC5zbGljZSgyKSkpO1xuICB9IGVsc2Uge1xuICAgIHBhcmFtZXRlcnMgPSByYXdQYXJhbWV0ZXIuc3BsaXQoL1tfIF0rL2cpO1xuICB9XG4gIGlmIChpc0VtcHR5KHBhcmFtZXRlcnMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29tbWFuZCA9IHBhcmFtZXRlcnNbMF07XG4gIGlmIChjb21tYW5kLnRvVXBwZXJDYXNlKCkgPT0gJ0ZJTycgfHwgY29tbWFuZC50b1VwcGVyQ2FzZSgpID09ICdDT0wnKSB7XG4gICAgLy8gRXhjZXB0aW9uIGZvciBGSU8gYW5kIFByVW4tQ29sbGVjdG9yIHRvIHVzZSBYSVRcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgeGl0Q29tbWFuZCA9IHhpdC5nZXQoY29tbWFuZCk7XG4gIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLnNsaWNlKDEpO1xuXG4gIGlmICh4aXRDb21tYW5kKSB7XG4gICAgXyQodGlsZS5mcmFtZSwgQy5UaWxlRnJhbWUudGl0bGUpIS50ZXh0Q29udGVudCA9XG4gICAgICB0eXBlb2YgeGl0Q29tbWFuZC5uYW1lID09PSAnc3RyaW5nJyA/IHhpdENvbW1hbmQubmFtZSA6IHhpdENvbW1hbmQubmFtZShwYXJhbWV0ZXJzKTtcblxuICAgIGlmICh4aXRDb21tYW5kLmNvbnRleHRJdGVtcykge1xuICAgICAgY29uc3QgaXRlbXMgPSB4aXRDb21tYW5kLmNvbnRleHRJdGVtcyhwYXJhbWV0ZXJzKTtcbiAgICAgIGlmICghaXNFbXB0eShpdGVtcykpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXyQodGlsZS5mcmFtZSwgQy5UaWxlRnJhbWUuaGVhZGVyKSE7XG4gICAgICAgIGNyZWF0ZUZyYWdtZW50QXBwKENvbnRleHRDb250cm9scywgeyBpdGVtcyB9KS5hZnRlcihoZWFkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5TY3JvbGxWaWV3LnZpZXcpLCBzY3JvbGxWaWV3ID0+IHtcbiAgICAvLyBYSVQgY29tbWFuZCBwcm9kdWNlcyBhIHRpbGUgd2l0aCBmdWxsLXNpemUgZ3JlZW4gc2NyZWVuIGFzIGl0cyBjb250ZW50LlxuICAgIC8vIEN1c3RvbSBYSVQgdGlsZXMgYXJlIGp1c3QgbW91bnRlZCBpbnNpZGUgdGhpcyBncmVlbiBzY3JlZW4uXG4gICAgY29uc3QgY29udGFpbmVyID0gc2Nyb2xsVmlldy5jaGlsZHJlblswXSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBpZiAoY29udGFpbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuXG4gICAgaWYgKCF4aXRDb21tYW5kKSB7XG4gICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSAnRXJyb3IhIE5vIE1hdGNoaW5nIEZ1bmN0aW9uISc7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhcnRNZWFzdXJlKHRpbGUuZnVsbENvbW1hbmQpO1xuICAgIGNyZWF0ZUZyYWdtZW50QXBwKHhpdENvbW1hbmQuY29tcG9uZW50KHBhcmFtZXRlcnMpKVxuICAgICAgLnVzZSh0aWxlU3RhdGVQbHVnaW4sIHsgdGlsZSB9KVxuICAgICAgLnByb3ZpZGUodGlsZUtleSwgdGlsZSlcbiAgICAgIC5wcm92aWRlKHhpdENvbW1hbmRLZXksIGNvbW1hbmQpXG4gICAgICAucHJvdmlkZSh4aXRQYXJhbWV0ZXJzS2V5LCBwYXJhbWV0ZXJzKVxuICAgICAgLmFwcGVuZFRvKGNvbnRhaW5lcik7XG4gICAgc3RvcE1lYXN1cmUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplWGl0Q29tbWFuZHMoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ1hJVCcsIG9uVGlsZVJlYWR5KTtcbiAgaWYgKHVzZXJEYXRhLnNldHRpbmdzLm1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2hvd0J1ZmZlcignWElUIFNUQVJUJyksIDEwMDApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiQ29udGV4dENvbnRyb2xzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFVQSxTQUFBLFlBQUEsTUFBQTtBQUNFLE1BQUEsZUFBQSxLQUFBO0FBQ0EsTUFBQSxDQUFBLGNBQUE7QUFDRSxtQkFBQTtBQUFBLEVBQWU7QUFHakIsTUFBQSxhQUFBLENBQUE7QUFDQSxNQUFBLGFBQUEsQ0FBQSxNQUFBLEtBQUE7QUFDRSxVQUFBLFlBQUEsYUFBQSxNQUFBLEdBQUE7QUFDQSxlQUFBLEtBQUEsR0FBQSxVQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLEVBQWlELE9BQUE7QUFFakQsaUJBQUEsYUFBQSxNQUFBLFFBQUE7QUFBQSxFQUF3QztBQUUxQyxNQUFBLFFBQUEsVUFBQSxHQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxVQUFBLFdBQUEsQ0FBQTtBQUNBLE1BQUEsUUFBQSxpQkFBQSxTQUFBLFFBQUEsWUFBQSxLQUFBLE9BQUE7QUFFRTtBQUFBLEVBQUE7QUFFRixRQUFBLGFBQUEsSUFBQSxJQUFBLE9BQUE7QUFDQSxlQUFBLFdBQUEsTUFBQSxDQUFBO0FBRUEsTUFBQSxZQUFBO0FBQ0UsT0FBQSxLQUFBLE9BQUEsRUFBQSxVQUFBLEtBQUEsRUFBQSxjQUFBLE9BQUEsV0FBQSxTQUFBLFdBQUEsV0FBQSxPQUFBLFdBQUEsS0FBQSxVQUFBO0FBR0EsUUFBQSxXQUFBLGNBQUE7QUFDRSxZQUFBLFFBQUEsV0FBQSxhQUFBLFVBQUE7QUFDQSxVQUFBLENBQUEsUUFBQSxLQUFBLEdBQUE7QUFDRSxjQUFBLFNBQUEsR0FBQSxLQUFBLE9BQUEsRUFBQSxVQUFBLE1BQUE7QUFDQSwwQkFBQUEsV0FBQSxFQUFBLE1BQUEsQ0FBQSxFQUFBLE1BQUEsTUFBQTtBQUFBLE1BQTBEO0FBQUEsSUFDNUQ7QUFBQSxFQUNGO0FBR0YsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFdBQUEsSUFBQSxHQUFBLENBQUEsZUFBQTtBQUdFLFVBQUEsWUFBQSxXQUFBLFNBQUEsQ0FBQTtBQUNBLFFBQUEsY0FBQSxRQUFBO0FBQ0U7QUFBQSxJQUFBO0FBR0YsY0FBQSxnQkFBQSxPQUFBO0FBQ0EsY0FBQSxNQUFBLFFBQUE7QUFDQSxjQUFBLE1BQUEsU0FBQTtBQUVBLFFBQUEsQ0FBQSxZQUFBO0FBQ0UsZ0JBQUEsY0FBQTtBQUNBO0FBQUEsSUFBQTtBQUdGLGlCQUFBLEtBQUEsV0FBQTtBQUNBLHNCQUFBLFdBQUEsVUFBQSxVQUFBLENBQUEsRUFBQSxJQUFBLGlCQUFBLEVBQUEsS0FBQSxDQUFBLEVBQUEsUUFBQSxTQUFBLElBQUEsRUFBQSxRQUFBLGVBQUEsT0FBQSxFQUFBLFFBQUEsa0JBQUEsVUFBQSxFQUFBLFNBQUEsU0FBQTtBQUFBLEVBTVksQ0FBQTtBQUVoQjtBQUVPLFNBQUEsd0JBQUE7QUFDTCxRQUFBLFFBQUEsT0FBQSxXQUFBO0FBQ0EsTUFBQSxTQUFBLFNBQUEsU0FBQSxRQUFBO0FBQ0UsZUFBQSxNQUFBLFdBQUEsV0FBQSxHQUFBLEdBQUE7QUFBQSxFQUE4QztBQUVsRDsifQ==
