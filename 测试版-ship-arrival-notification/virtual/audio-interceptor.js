const audios = [];
function initAudioInterceptor() {
  window.Audio = new Proxy(Audio, {
    construct(target, args) {
      const audio = new target(...args);
      audios.push(audio);
      return audio;
    },
  });
}
function setAudioVolume(volume) {
  for (const audio of getValidAudios()) {
    audio.volume = volume;
  }
}
function playAudio() {
  const audio = getValidAudios()[0];
  if (audio !== void 0) {
    if (audio.paused) {
      void audio.play();
    } else {
      audio.currentTime = 0;
    }
  }
}
function getValidAudios() {
  return audios.filter(x => x.src.startsWith(location.origin));
}
export { initAudioInterceptor, playAudio, setAudioVolume };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8taW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F1ZGlvLWludGVyY2VwdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF1ZGlvcyA9IFtdIGFzIEhUTUxBdWRpb0VsZW1lbnRbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRBdWRpb0ludGVyY2VwdG9yKCkge1xuICB3aW5kb3cuQXVkaW8gPSBuZXcgUHJveHkoQXVkaW8sIHtcbiAgICBjb25zdHJ1Y3QodGFyZ2V0OiB0eXBlb2YgQXVkaW8sIGFyZ3M6IFtzdHJpbmc/XSkge1xuICAgICAgY29uc3QgYXVkaW8gPSBuZXcgdGFyZ2V0KC4uLmFyZ3MpO1xuICAgICAgYXVkaW9zLnB1c2goYXVkaW8pO1xuICAgICAgcmV0dXJuIGF1ZGlvO1xuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXVkaW9Wb2x1bWUodm9sdW1lOiBudW1iZXIpIHtcbiAgZm9yIChjb25zdCBhdWRpbyBvZiBnZXRWYWxpZEF1ZGlvcygpKSB7XG4gICAgYXVkaW8udm9sdW1lID0gdm9sdW1lO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5QXVkaW8oKSB7XG4gIGNvbnN0IGF1ZGlvID0gZ2V0VmFsaWRBdWRpb3MoKVswXTtcbiAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYXVkaW8ucGF1c2VkKSB7XG4gICAgICB2b2lkIGF1ZGlvLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRWYWxpZEF1ZGlvcygpIHtcbiAgcmV0dXJuIGF1ZGlvcy5maWx0ZXIoeCA9PiB4LnNyYy5zdGFydHNXaXRoKGxvY2F0aW9uLm9yaWdpbikpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sU0FBUyxDQUFBO0FBRVIsU0FBUyx1QkFBdUI7QUFDckMsU0FBTyxRQUFRLElBQUksTUFBTSxPQUFPO0FBQUEsSUFDOUIsVUFBVSxRQUFzQixNQUFpQjtBQUMvQyxZQUFNLFFBQVEsSUFBSSxPQUFPLEdBQUcsSUFBSTtBQUNoQyxhQUFPLEtBQUssS0FBSztBQUNqQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQUEsQ0FDRDtBQUNIO0FBRU8sU0FBUyxlQUFlLFFBQWdCO0FBQzdDLGFBQVcsU0FBUyxrQkFBa0I7QUFDcEMsVUFBTSxTQUFTO0FBQUEsRUFDakI7QUFDRjtBQUVPLFNBQVMsWUFBWTtBQUMxQixRQUFNLFFBQVEsZUFBQSxFQUFpQixDQUFDO0FBQ2hDLE1BQUksVUFBVSxRQUFXO0FBQ3ZCLFFBQUksTUFBTSxRQUFRO0FBQ2hCLFdBQUssTUFBTSxLQUFBO0FBQUEsSUFDYixPQUFPO0FBQ0wsWUFBTSxjQUFjO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxTQUFTLGlCQUFpQjtBQUN4QixTQUFPLE9BQU8sT0FBTyxDQUFBLE1BQUssRUFBRSxJQUFJLFdBQVcsU0FBUyxNQUFNLENBQUM7QUFDN0Q7In0=
