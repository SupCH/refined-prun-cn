import { nonCurrentAssets } from './non-current-assets.js';
import { inventory } from './inventory.js';
import { workInProgressByLocation } from './orders2.js';
function calculateLocationAssets() {
  const locations = [];
  function getLocation(name) {
    let location = locations.find(x => x.name === name);
    if (!location) {
      location = {
        name,
        current: 0,
        nonCurrent: 0,
        total: 0,
      };
      locations.push(location);
    }
    return location;
  }
  if (!inventory.byLocation.value) {
    return void 0;
  }
  for (const [name, value] of inventory.byLocation.value) {
    const location = getLocation(name);
    location.current += value;
    location.total += value;
  }
  if (!workInProgressByLocation.value) {
    return void 0;
  }
  for (const [name, value] of workInProgressByLocation.value) {
    const location = getLocation(name);
    location.current += value;
    location.total += value;
  }
  if (!nonCurrentAssets.buildingsNetValueByLocation.value) {
    return void 0;
  }
  for (const [name, value] of nonCurrentAssets.buildingsNetValueByLocation.value) {
    const location = getLocation(name);
    location.nonCurrent += value;
    location.total += value;
  }
  locations.sort((a, b) => b.total - a.total);
  return locations;
}
export { calculateLocationAssets };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluYW5jaWFscy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvZmluYW5jaWFscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBub25DdXJyZW50QXNzZXRzIH0gZnJvbSAnQHNyYy9jb3JlL2JhbGFuY2Uvbm9uLWN1cnJlbnQtYXNzZXRzJztcbmltcG9ydCB7IGludmVudG9yeSB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL2ludmVudG9yeSc7XG5pbXBvcnQgeyB3b3JrSW5Qcm9ncmVzc0J5TG9jYXRpb24gfSBmcm9tICdAc3JjL2NvcmUvYmFsYW5jZS9vcmRlcnMnO1xuXG5pbnRlcmZhY2UgTG9jYXRpb25Bc3NldHMge1xuICBuYW1lOiBzdHJpbmc7XG4gIGN1cnJlbnQ6IG51bWJlcjtcbiAgbm9uQ3VycmVudDogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlTG9jYXRpb25Bc3NldHMoKSB7XG4gIGNvbnN0IGxvY2F0aW9uczogTG9jYXRpb25Bc3NldHNbXSA9IFtdO1xuXG4gIGZ1bmN0aW9uIGdldExvY2F0aW9uKG5hbWU6IHN0cmluZykge1xuICAgIGxldCBsb2NhdGlvbiA9IGxvY2F0aW9ucy5maW5kKHggPT4geC5uYW1lID09PSBuYW1lKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICBsb2NhdGlvbiA9IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgbm9uQ3VycmVudDogMCxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICB9O1xuICAgICAgbG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYXRpb247XG4gIH1cblxuICBpZiAoIWludmVudG9yeS5ieUxvY2F0aW9uLnZhbHVlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgaW52ZW50b3J5LmJ5TG9jYXRpb24udmFsdWUpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGdldExvY2F0aW9uKG5hbWUpO1xuICAgIGxvY2F0aW9uLmN1cnJlbnQgKz0gdmFsdWU7XG4gICAgbG9jYXRpb24udG90YWwgKz0gdmFsdWU7XG4gIH1cblxuICBpZiAoIXdvcmtJblByb2dyZXNzQnlMb2NhdGlvbi52YWx1ZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIHdvcmtJblByb2dyZXNzQnlMb2NhdGlvbi52YWx1ZSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZ2V0TG9jYXRpb24obmFtZSk7XG4gICAgbG9jYXRpb24uY3VycmVudCArPSB2YWx1ZTtcbiAgICBsb2NhdGlvbi50b3RhbCArPSB2YWx1ZTtcbiAgfVxuXG4gIGlmICghbm9uQ3VycmVudEFzc2V0cy5idWlsZGluZ3NOZXRWYWx1ZUJ5TG9jYXRpb24udmFsdWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBub25DdXJyZW50QXNzZXRzLmJ1aWxkaW5nc05ldFZhbHVlQnlMb2NhdGlvbi52YWx1ZSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZ2V0TG9jYXRpb24obmFtZSk7XG4gICAgbG9jYXRpb24ubm9uQ3VycmVudCArPSB2YWx1ZTtcbiAgICBsb2NhdGlvbi50b3RhbCArPSB2YWx1ZTtcbiAgfVxuXG4gIGxvY2F0aW9ucy5zb3J0KChhLCBiKSA9PiBiLnRvdGFsIC0gYS50b3RhbCk7XG4gIHJldHVybiBsb2NhdGlvbnM7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBV08sU0FBUywwQkFBMEI7QUFDeEMsUUFBTSxZQUE4QixDQUFBO0FBRXBDLFdBQVMsWUFBWSxNQUFjO0FBQ2pDLFFBQUksV0FBVyxVQUFVLEtBQUssQ0FBQSxNQUFLLEVBQUUsU0FBUyxJQUFJO0FBQ2xELFFBQUksQ0FBQyxVQUFVO0FBQ2IsaUJBQVc7QUFBQSxRQUNUO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixPQUFPO0FBQUEsTUFBQTtBQUVULGdCQUFVLEtBQUssUUFBUTtBQUFBLElBQ3pCO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLENBQUMsVUFBVSxXQUFXLE9BQU87QUFDL0IsV0FBTztBQUFBLEVBQ1Q7QUFDQSxhQUFXLENBQUMsTUFBTSxLQUFLLEtBQUssVUFBVSxXQUFXLE9BQU87QUFDdEQsVUFBTSxXQUFXLFlBQVksSUFBSTtBQUNqQyxhQUFTLFdBQVc7QUFDcEIsYUFBUyxTQUFTO0FBQUEsRUFDcEI7QUFFQSxNQUFJLENBQUMseUJBQXlCLE9BQU87QUFDbkMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxhQUFXLENBQUMsTUFBTSxLQUFLLEtBQUsseUJBQXlCLE9BQU87QUFDMUQsVUFBTSxXQUFXLFlBQVksSUFBSTtBQUNqQyxhQUFTLFdBQVc7QUFDcEIsYUFBUyxTQUFTO0FBQUEsRUFDcEI7QUFFQSxNQUFJLENBQUMsaUJBQWlCLDRCQUE0QixPQUFPO0FBQ3ZELFdBQU87QUFBQSxFQUNUO0FBQ0EsYUFBVyxDQUFDLE1BQU0sS0FBSyxLQUFLLGlCQUFpQiw0QkFBNEIsT0FBTztBQUM5RSxVQUFNLFdBQVcsWUFBWSxJQUFJO0FBQ2pDLGFBQVMsY0FBYztBQUN2QixhQUFTLFNBQVM7QUFBQSxFQUNwQjtBQUVBLFlBQVUsS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLO0FBQzFDLFNBQU87QUFDVDsifQ==
