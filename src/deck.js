const suits = ["clubs", "diamonds", "hearts", "spades"];

const ranks = [
  { name: "ace", value: 11 },
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

export function createDeck() {
  return suits.flatMap((suit) =>
    ranks.map((rank) => ({
      rank: rank.name,
      suit,
      value: rank.value,
      image: `${import.meta.env.BASE_URL}Images/${rank.name}_of_${suit}.png`,
    }))
  );
}

export function shuffleDeck(deck) {
  const shuffled = [...deck];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function drawCard(deck) {
  return deck.pop();
}

export function getHandTotal(hand) {
  let total = hand.reduce((score, card) => score + card.value, 0);
  let aces = hand.filter((card) => card.rank === "ace").length;

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}
