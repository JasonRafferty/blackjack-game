const CARD_BACK = "/Images/logo.png";

const elements = {
  banner: document.getElementById("bannerHTML"),
  currentBet: document.getElementById("currentBetHTML"),
  dealButton: document.getElementById("deal"),
  dealerCardNumber: document.getElementById("dealerCardNumberHTML"),
  dealerCredit: document.getElementById("creditDealerHTML"),
  hitButton: document.getElementById("hit"),
  lowerButton: document.getElementById("lower"),
  playerCardNumber: document.getElementById("playerCardNumberHTML"),
  playerCredit: document.getElementById("creditHTML"),
  raiseButton: document.getElementById("raise"),
  stickButton: document.getElementById("stick"),
};

const cardSlots = {
  player: [
    document.getElementById("playerCardOne"),
    document.getElementById("playerCardTwo"),
    document.getElementById("playerCardThree"),
    document.getElementById("playerCardFour"),
  ],
  dealer: [
    document.getElementById("dealerCardOne"),
    document.getElementById("dealerCardTwo"),
    document.getElementById("dealerCardThree"),
  ],
};

export function bindControls(handlers) {
  elements.dealButton.addEventListener("click", handlers.deal);
  elements.hitButton.addEventListener("click", handlers.hit);
  elements.stickButton.addEventListener("click", handlers.stick);
  elements.raiseButton.addEventListener("click", handlers.raise);
  elements.lowerButton.addEventListener("click", handlers.lower);
}

export function setControlsDisabled({
  deal = false,
  hit = false,
  lower = false,
  raise = false,
  stick = false,
}) {
  elements.dealButton.disabled = deal;
  elements.hitButton.disabled = hit;
  elements.lowerButton.disabled = lower;
  elements.raiseButton.disabled = raise;
  elements.stickButton.disabled = stick;
}

export function updateCurrentBet(amount) {
  elements.currentBet.textContent = `Current Bet: £${amount}`;
}

export function updateCredits(playerCredit, dealerCredit) {
  elements.playerCredit.textContent = `Player: £${playerCredit}`;
  elements.dealerCredit.textContent = `Dealer: £${dealerCredit}`;
}

export function updatePlayerCredit(text) {
  elements.playerCredit.textContent = text;
}

export function updateDealerCredit(text) {
  elements.dealerCredit.textContent = text;
}

export function updateTotals(playerTotal, dealerTotal) {
  elements.playerCardNumber.textContent = playerTotal ?? "-";
  elements.dealerCardNumber.textContent = dealerTotal ?? "-";
}

export function updatePlayerTotal(total) {
  elements.playerCardNumber.textContent = total;
}

export function updateDealerTotal(total) {
  elements.dealerCardNumber.textContent = total;
}

export function showBanner(message, resetAfter = 0) {
  elements.banner.textContent = message;

  if (resetAfter > 0) {
    setTimeout(() => {
      elements.banner.textContent = "---";
    }, resetAfter);
  }
}

export function renderHand(owner, hand, options = {}) {
  const slots = cardSlots[owner];
  const hiddenIndexes = options.hiddenIndexes ?? [];

  slots.forEach((slot, index) => {
    const card = hand[index];

    if (hiddenIndexes.includes(index)) {
      slot.src = CARD_BACK;
      slot.alt = "Hidden card";
      return;
    }

    if (!card) {
      slot.removeAttribute("src");
      slot.alt = "";
      return;
    }

    slot.src = card.image;
    slot.alt = `${card.rank} of ${card.suit}`;
  });
}

export function resetCards() {
  cardSlots.player.forEach((slot, index) => {
    slot.src = index < 2 ? CARD_BACK : "";
    slot.alt = index < 2 ? "logoCard" : "";
  });

  cardSlots.dealer.forEach((slot, index) => {
    slot.src = index < 2 ? CARD_BACK : "";
    slot.alt = index < 2 ? "logoCard" : "";
  });
}

export function setDealButtonDefault() {
  elements.dealButton.textContent = "Deal";
  elements.dealButton.style.backgroundColor = "rgb(231, 15, 15)";
  elements.dealButton.style.boxShadow = "#a11907 0px 7px 2px, #000 0px 8px 5px";
  elements.dealButton.style.color = "white";
  elements.dealButton.style.fontWeight = "normal";
}

export function setDealButtonPlayAgain() {
  elements.dealButton.textContent = "Play Again!";
  elements.dealButton.style.backgroundColor = "#d79a1f";
  elements.dealButton.style.boxShadow = "#79560f 0px 7px 2px, #000 0px 8px 5px";
  elements.dealButton.style.color = "black";
  elements.dealButton.style.fontWeight = "bold";
}
