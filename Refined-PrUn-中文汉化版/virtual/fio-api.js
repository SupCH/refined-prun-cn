import config from './config.js';
import { planetsStore } from './planets.js';
import { dispatch } from './api-messages.js';
function preloadFioResponses() {
  void loadAllPlanets();
}
async function loadAllPlanets() {
  const response = await fetch('https://rest.fnar.net/planet/allplanets');
  const json = await response.json();
  dispatchFioResponse(json);
}
async function loadFallbackPlanetData() {
  if (planetsStore.fetched.value) {
    return;
  }
  const fallbackFile = await fetch(config.url.allplanets);
  const fallbackResponse = await fallbackFile.json();
  if (planetsStore.fetched.value) {
    return;
  }
  dispatchFioResponse(fallbackResponse);
}
function dispatchFioResponse(response) {
  dispatch({
    type: 'FIO_PLANET_DATA',
    data: {
      planets: response.map(x => ({
        naturalId: x.PlanetNaturalId,
        name: x.PlanetName,
      })),
    },
  });
}
export { loadFallbackPlanetData, preloadFioResponses };
