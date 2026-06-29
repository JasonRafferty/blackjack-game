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

function setChipState(element, total) {
  element.classList.remove("score-chip--safe", "score-chip--warn", "score-chip--blackjack", "score-chip--bust");
  if (total == null) return;
  if (total <= 14) element.classList.add("score-chip--safe");
  else if (total <= 20) element.classList.add("score-chip--warn");
  else if (total === 21) element.classList.add("score-chip--blackjack");
  else element.classList.add("score-chip--bust");
}

export function updateTotals(playerTotal, dealerTotal) {
  elements.playerCardNumber.textContent = playerTotal ?? "-";
  elements.dealerCardNumber.textContent = dealerTotal ?? "-";
  setChipState(elements.playerCardNumber, playerTotal);
  setChipState(elements.dealerCardNumber, dealerTotal);
}

export function updatePlayerTotal(total) {
  elements.playerCardNumber.textContent = total;
  setChipState(elements.playerCardNumber, total);
}

export function updateDealerTotal(total) {
  elements.dealerCardNumber.textContent = total;
  setChipState(elements.dealerCardNumber, total);
}

export function showBanner(message, resetAfter = 0) {
  if (message === "---") {
    elements.banner.classList.remove("visible", "banner--win", "banner--lose", "banner--draw", "banner--warn");
    return;
  }

  elements.banner.classList.remove("banner--win", "banner--lose", "banner--draw", "banner--warn");

  const msg = message.toLowerCase();
  if (msg.includes("win") || msg.includes("blackjack")) {
    elements.banner.classList.add("banner--win");
  } else if (msg.includes("lose")) {
    elements.banner.classList.add("banner--lose");
  } else if (msg.includes("draw")) {
    elements.banner.classList.add("banner--draw");
  } else if (msg.includes("insufficient") || msg.includes("funds")) {
    elements.banner.classList.add("banner--warn");
  }

  elements.banner.textContent = message;
  elements.banner.classList.add("visible");

  if (resetAfter > 0) {
    setTimeout(() => {
      elements.banner.classList.remove("visible");
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

    if (slot.dataset.renderedSrc !== card.image) {
      slot.dataset.renderedSrc = card.image;
      slot.src = card.image;
      slot.alt = `${card.rank} of ${card.suit}`;
      slot.classList.remove("dealing");
      void slot.offsetWidth;
      slot.classList.add("dealing");
    }
  });
}

export function resetCards() {
  cardSlots.player.forEach((slot, index) => {
    slot.src = index < 2 ? CARD_BACK : "";
    slot.alt = index < 2 ? "logoCard" : "";
    delete slot.dataset.renderedSrc;
    slot.classList.remove("dealing");
  });

  cardSlots.dealer.forEach((slot, index) => {
    slot.src = index < 2 ? CARD_BACK : "";
    slot.alt = index < 2 ? "logoCard" : "";
    delete slot.dataset.renderedSrc;
    slot.classList.remove("dealing");
  });
}

export function setDealButtonDefault() {
  elements.dealButton.textContent = "Deal";
  elements.dealButton.style.backgroundColor = "#b02318";
  elements.dealButton.style.boxShadow = "#6e1510 0px 6px 0px, rgba(0,0,0,0.5) 0px 7px 6px";
  elements.dealButton.style.color = "#fff";
}

export function setDealButtonPlayAgain() {
  elements.dealButton.textContent = "Play Again!";
  elements.dealButton.style.backgroundColor = "#c8a227";
  elements.dealButton.style.boxShadow = "#7a6010 0px 6px 0px, rgba(0,0,0,0.5) 0px 7px 6px";
  elements.dealButton.style.color = "#1a0a00";
}
