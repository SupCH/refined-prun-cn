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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90ZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZS9ub3Rlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGNyZWF0ZUlkIH0gZnJvbSAnQHNyYy9zdG9yZS9jcmVhdGUtaWQnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm90ZShuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICB1c2VyRGF0YS5ub3Rlcy5wdXNoKHtcbiAgICBpZCxcbiAgICBuYW1lLFxuICAgIHRleHQ6ICcnLFxuICB9KTtcbiAgcmV0dXJuIGlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTm90ZShub3RlOiBVc2VyRGF0YS5Ob3RlKSB7XG4gIHVzZXJEYXRhLm5vdGVzID0gdXNlckRhdGEubm90ZXMuZmlsdGVyKHggPT4geCAhPT0gbm90ZSk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHTyxTQUFTLFdBQVcsTUFBYztBQUN2QyxRQUFNLEtBQUssU0FBQTtBQUNYLFdBQVMsTUFBTSxLQUFLO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsRUFBQSxDQUNQO0FBQ0QsU0FBTztBQUNUO0FBRU8sU0FBUyxXQUFXLE1BQXFCO0FBQzlDLFdBQVMsUUFBUSxTQUFTLE1BQU0sT0FBTyxDQUFBLE1BQUssTUFBTSxJQUFJO0FBQ3hEOyJ9
