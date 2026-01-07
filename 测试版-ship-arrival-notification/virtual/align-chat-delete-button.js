import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './align-chat-delete-button.module.css.js';
function init() {
  applyCssRule(`.${C.Message.controlsAndText}`, $style.container);
  applyCssRule(`.${C.Message.controls}`, $style.delete);
  applyCssRule(
    `.${C.Message.message}:has(.${C.Message.controlsAndText} .${C.Message.controls}) .${C.Sender.name}`,
    $style.username,
  );
}
features.add(
  import.meta.url,
  init,
  'Moves the "delete" button to prevent chat message layout shift.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ24tY2hhdC1kZWxldGUtYnV0dG9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvYWxpZ24tY2hhdC1kZWxldGUtYnV0dG9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9hbGlnbi1jaGF0LWRlbGV0ZS1idXR0b24ubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5NZXNzYWdlLmNvbnRyb2xzQW5kVGV4dH1gLCAkc3R5bGUuY29udGFpbmVyKTtcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLk1lc3NhZ2UuY29udHJvbHN9YCwgJHN0eWxlLmRlbGV0ZSk7XG4gIGFwcGx5Q3NzUnVsZShcbiAgICBgLiR7Qy5NZXNzYWdlLm1lc3NhZ2V9OmhhcyguJHtDLk1lc3NhZ2UuY29udHJvbHNBbmRUZXh0fSAuJHtDLk1lc3NhZ2UuY29udHJvbHN9KSAuJHtDLlNlbmRlci5uYW1lfWAsXG4gICAgJHN0eWxlLnVzZXJuYW1lLFxuICApO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ01vdmVzIHRoZSBcImRlbGV0ZVwiIGJ1dHRvbiB0byBwcmV2ZW50IGNoYXQgbWVzc2FnZSBsYXlvdXQgc2hpZnQuJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLFNBQUEsT0FBQTtBQUNFLGVBQUEsSUFBQSxFQUFBLFFBQUEsZUFBQSxJQUFBLE9BQUEsU0FBQTtBQUNBLGVBQUEsSUFBQSxFQUFBLFFBQUEsUUFBQSxJQUFBLE9BQUEsTUFBQTtBQUNBO0FBQUEsSUFBQSxJQUFBLEVBQUEsUUFBQSxPQUFBLFNBQUEsRUFBQSxRQUFBLGVBQUEsS0FBQSxFQUFBLFFBQUEsUUFBQSxNQUFBLEVBQUEsT0FBQSxJQUFBO0FBQUEsSUFDbUcsT0FBQTtBQUFBLEVBQzFGO0FBRVg7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
