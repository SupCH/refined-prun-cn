import v4 from './v4.js';
const createId = () => v4().replaceAll('-', '');
export { createId };
