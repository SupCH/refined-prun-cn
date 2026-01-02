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
