const sounds = {
  blackjack: new Audio("/Sound/blackjack.mp3"),
  lose: new Audio("/Sound/lose.mp3"),
  no: new Audio("/Sound/no.mp3"),
  win: new Audio("/Sound/win.mp3"),
};

export function playSound(name) {
  const sound = sounds[name];

  if (!sound) {
    return;
  }

  sound.currentTime = 0;
  sound.play();
}
