function prunBtoa(input) {
  const base64 = btoa(input);
  return base64.replaceAll('+', '-').replaceAll('/', '.').replaceAll('=', '');
}
function prunAtob(input) {
  let base64 = input.replaceAll('-', '+').replaceAll('.', '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return atob(base64);
}
export { prunAtob, prunBtoa };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9iYXNlNjQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHBydW5CdG9hKGlucHV0OiBzdHJpbmcpIHtcbiAgY29uc3QgYmFzZTY0ID0gYnRvYShpbnB1dCk7XG4gIHJldHVybiBiYXNlNjQucmVwbGFjZUFsbCgnKycsICctJykucmVwbGFjZUFsbCgnLycsICcuJykucmVwbGFjZUFsbCgnPScsICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBydW5BdG9iKGlucHV0OiBzdHJpbmcpIHtcbiAgbGV0IGJhc2U2NCA9IGlucHV0LnJlcGxhY2VBbGwoJy0nLCAnKycpLnJlcGxhY2VBbGwoJy4nLCAnLycpO1xuICB3aGlsZSAoYmFzZTY0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBiYXNlNjQgKz0gJz0nO1xuICB9XG4gIHJldHVybiBhdG9iKGJhc2U2NCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQU8sU0FBUyxTQUFTLE9BQWU7QUFDdEMsUUFBTSxTQUFTLEtBQUssS0FBSztBQUN6QixTQUFPLE9BQU8sV0FBVyxLQUFLLEdBQUcsRUFBRSxXQUFXLEtBQUssR0FBRyxFQUFFLFdBQVcsS0FBSyxFQUFFO0FBQzVFO0FBRU8sU0FBUyxTQUFTLE9BQWU7QUFDdEMsTUFBSSxTQUFTLE1BQU0sV0FBVyxLQUFLLEdBQUcsRUFBRSxXQUFXLEtBQUssR0FBRztBQUMzRCxTQUFPLE9BQU8sU0FBUyxNQUFNLEdBQUc7QUFDOUIsY0FBVTtBQUFBLEVBQ1o7QUFDQSxTQUFPLEtBQUssTUFBTTtBQUNwQjsifQ==
