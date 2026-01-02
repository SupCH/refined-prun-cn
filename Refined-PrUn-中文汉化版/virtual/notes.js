import { userData } from './user-data.js';
import { createId } from './create-id.js';
function createNote(name) {
  const id = createId();
  userData.notes.push({
    id,
    name,
    text: '',
  });
  return id;
}
function deleteNote(note) {
  userData.notes = userData.notes.filter(x => x !== note);
}
export { createNote, deleteNote };
