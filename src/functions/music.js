document.addEventListener("DOMContentLoaded", () => {
  const audios = Array.from(document.querySelectorAll(".audio"));
  const img = document.getElementById("fuuker");

  const imgIdle = "/src/assets/images/fuuk.png";
  const imgPlaying = "/src/assets/images/fuuka_dance.gif";

  // pausa todos, menos o que chamou
  function pauseOthers(current) {
    for (const a of audios) {
      if (a !== current && !a.paused) a.pause();
    }
  }

  audios.forEach(audio => {
    audio.addEventListener("play", () => {
      pauseOthers(audio);
      img.src = imgPlaying;
    });

    audio.addEventListener("pause", () => {
      // se nenhum está tocando, volta ao idle
      const someonePlaying = audios.some(a => !a.paused && !a.ended);
      if (!someonePlaying) img.src = imgIdle;
    });

    audio.addEventListener("ended", () => {
      const someonePlaying = audios.some(a => !a.paused && !a.ended);
      if (!someonePlaying) img.src = imgIdle;
    });
  });
});