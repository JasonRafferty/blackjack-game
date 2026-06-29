const suits = ["clubs", "diamonds", "hearts", "spades"];

const ranks = [
  { name: "ace", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "jack", value: 10 },
  { name: "queen", value: 10 },
  { name: "king", value: 10 },
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function drawCard() {
  const rank = randomItem(ranks);
  const suit = randomItem(suits);

  return {
    rank: rank.name,
    suit,
    value: rank.value,
    image: `/Images/${rank.name}_of_${suit}.png`,
  };
}

export function getHandTotal(hand) {
  return hand.reduce((total, card) => total + card.value, 0);
}
