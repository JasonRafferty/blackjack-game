const base = import.meta.env.BASE_URL;

const sounds = {
  blackjack: new Audio(`${base}Sound/blackjack.mp3`),
  lose: new Audio(`${base}Sound/lose.mp3`),
  no: new Audio(`${base}Sound/no.mp3`),
  win: new Audio(`${base}Sound/win.mp3`),
};

export function playSound(name) {
  const sound = sounds[name];

  if (!sound) {
    return;
  }

  sound.currentTime = 0;
  sound.play();
}
