import { playSound } from "./audio.js";
import { createDeck, drawCard, getHandTotal, shuffleDeck } from "./deck.js";
import {
  renderHand,
  resetCards,
  setControlsDisabled,
  setDealButtonDefault,
  setDealButtonPlayAgain,
  showBanner,
  updateCredits,
  updateCurrentBet,
  updateDealerCredit,
  updateDealerTotal,
  updatePlayerCredit,
  updatePlayerTotal,
  updateTotals,
} from "./ui.js";

const STARTING_CREDIT = 200;
const MINIMUM_BET = 10;
const DEALER_STAND_TOTAL = 17;
const MAX_DEALER_CARDS = 3;
const MAX_PLAYER_CARDS = 4;

const state = {
  currentBet: MINIMUM_BET,
  deck: [],
  dealerCredit: STARTING_CREDIT,
  dealerHand: [],
  dealerTotal: 0,
  hasStuck: false,
  isNaturalBlackjack: false,
  playerCredit: STARTING_CREDIT,
  playerHand: [],
  playerTotal: 0,
  roundActive: false,
};

function isGameOver() {
  return state.playerCredit === 0 || state.dealerCredit === 0;
}

function canRaiseBet() {
  return (
    !state.roundActive &&
    state.currentBet < state.playerCredit &&
    state.currentBet < state.dealerCredit &&
    !isGameOver()
  );
}

function canLowerBet() {
  return !state.roundActive && state.currentBet > MINIMUM_BET && !isGameOver();
}

function canDouble() {
  return (
    state.roundActive &&
    !state.hasStuck &&
    state.playerHand.length === 2 &&
    state.playerTotal < 21 &&
    state.playerCredit >= state.currentBet &&
    !isGameOver()
  );
}

function updateControls() {
  const playerCanAct =
    state.roundActive &&
    !state.hasStuck &&
    state.playerTotal < 21 &&
    state.playerHand.length < MAX_PLAYER_CARDS;
  const canStick = state.roundActive && !state.hasStuck;

  setControlsDisabled({
    deal: state.roundActive,
    double: !canDouble(),
    hit: !playerCanAct,
    lower: !canLowerBet(),
    raise: !canRaiseBet(),
    stick: !canStick,
  });
}

function refreshMoney() {
  updateCredits(state.playerCredit, state.dealerCredit);
  updateCurrentBet(state.currentBet);
  updateControls();
}

function resetRound() {
  state.deck = [];
  state.dealerHand = [];
  state.dealerTotal = 0;
  state.hasStuck = false;
  state.isNaturalBlackjack = false;
  state.playerHand = [];
  state.playerTotal = 0;
  state.roundActive = false;
  resetCards();
  updateTotals(null, null);
  updateControls();
}

function resetGame() {
  state.playerCredit = STARTING_CREDIT;
  state.dealerCredit = STARTING_CREDIT;
  state.currentBet = MINIMUM_BET;
  resetRound();
  refreshMoney();
  updatePlayerCredit("Reset");
  updateDealerCredit("Reset");

  setTimeout(() => {
    refreshMoney();
  }, 1000);

  setDealButtonDefault();
  updateControls();
}

function endRound() {
  state.roundActive = false;
  state.hasStuck = false;
  updateControls();
}

function checkZeroCredits() {
  if (state.playerCredit === 0) {
    setDealButtonPlayAgain();
    playSound("lose");
    showBanner("You Lose!");

    setTimeout(() => showBanner("Try again!"), 1000);
    setTimeout(() => showBanner("---"), 2000);

    resetRound();
    updateControls();
    return;
  }

  if (state.dealerCredit === 0) {
    setDealButtonPlayAgain();
    playSound("blackjack");
    showBanner("You Win!");

    setTimeout(() => showBanner("Try again!"), 1000);
    setTimeout(() => showBanner("---"), 2000);

    resetRound();
    updateControls();
  }
}

function playerWins() {
  const winAmount = state.isNaturalBlackjack
    ? Math.floor(state.currentBet * 1.5)
    : state.currentBet;

  state.playerCredit += state.currentBet + winAmount;
  state.dealerCredit -= winAmount;

  updatePlayerCredit(`+ £${winAmount}`);
  updateDealerCredit(`- £${winAmount}`);

  setTimeout(refreshMoney, 1500);
  playSound("win");
  showBanner(state.isNaturalBlackjack ? "Blackjack! 3:2!" : "You Win!", 1600);
  endRound();
  checkZeroCredits();
}

function playerLoses() {
  state.dealerCredit += state.currentBet;

  updatePlayerCredit(`- £${state.currentBet}`);
  updateDealerCredit(`+ £${state.currentBet}`);

  setTimeout(refreshMoney, 1500);
  playSound("lose");
  showBanner("You Lose", 1600);
  endRound();
  checkZeroCredits();
}

function playerDraws() {
  state.playerCredit += state.currentBet;

  updatePlayerCredit("+ £0");
  updateDealerCredit("+ £0");

  setTimeout(refreshMoney, 1500);
  playSound("win");
  showBanner("You Draw", 1600);
  endRound();
}

function checkBust() {
  if (state.playerTotal > 21) {
    playerLoses();
    return;
  }

  if (state.playerTotal === 21) {
    playSound("blackjack");
    showBanner("You got blackjack!", 1400);
  }
}

function checkWinner() {
  if (state.dealerTotal === state.playerTotal) {
    playerDraws();
  } else if (state.dealerTotal > 21 && state.playerTotal <= 21) {
    playerWins();
  } else if (state.playerTotal > state.dealerTotal) {
    playerWins();
  } else if (state.playerTotal < state.dealerTotal) {
    playerLoses();
  }
}

function drawPlayerCard() {
  state.playerHand.push(drawCard(state.deck));
  state.playerTotal = getHandTotal(state.playerHand);
  renderHand("player", state.playerHand);
  updatePlayerTotal(state.playerTotal);
  updateControls();
}

function drawDealerCard() {
  state.dealerHand.push(drawCard(state.deck));
  state.dealerTotal = getHandTotal(state.dealerHand);
  renderHand("dealer", state.dealerHand);
  updateDealerTotal(state.dealerTotal);
  updateControls();
}

function playDealerTurn() {
  setTimeout(() => {
    if (
      state.dealerTotal < DEALER_STAND_TOTAL &&
      state.dealerHand.length < MAX_DEALER_CARDS
    ) {
      drawDealerCard();
      playDealerTurn();
      return;
    }

    checkWinner();
  }, 1200);
}

export function raise() {
  if (!canRaiseBet()) {
    playSound("no");
    return;
  }

  state.currentBet += 10;
  updateCurrentBet(state.currentBet);
  updateControls();
}

export function lower() {
  if (!canLowerBet()) {
    playSound("no");
    return;
  }

  state.currentBet -= 10;
  updateCurrentBet(state.currentBet);
  updateControls();
}

export function deal() {
  if (state.playerCredit < state.currentBet) {
    showBanner("Insufficient Funds!", 1000);
    return;
  }

  state.roundActive = true;
  state.hasStuck = false;
  state.playerHand = [];
  state.dealerHand = [];
  state.playerTotal = 0;
  state.dealerTotal = 0;
  state.deck = shuffleDeck(createDeck());

  showBanner("---");
  resetCards();

  drawPlayerCard();
  drawPlayerCard();
  state.isNaturalBlackjack = state.playerTotal === 21;
  checkBust();

  drawDealerCard();
  state.dealerHand.push(drawCard(state.deck));
  state.dealerTotal = getHandTotal(state.dealerHand);
  renderHand("dealer", state.dealerHand, { hiddenIndexes: [1] });

  state.playerCredit -= state.currentBet;
  updateCredits(state.playerCredit, state.dealerCredit);

  updateControls();
}

export function hit() {
  if (
    !state.roundActive ||
    state.hasStuck ||
    state.playerTotal >= 21 ||
    state.playerHand.length >= MAX_PLAYER_CARDS
  ) {
    playSound("no");
    return;
  }

  drawPlayerCard();
  checkBust();
}

function executeStick() {
  state.hasStuck = true;
  renderHand("dealer", state.dealerHand);
  updateDealerTotal(state.dealerTotal);
  updateControls();

  if (
    state.dealerTotal < DEALER_STAND_TOTAL &&
    state.dealerHand.length < MAX_DEALER_CARDS
  ) {
    playDealerTurn();
    return;
  }

  setTimeout(checkWinner, 1500);
}

export function stick() {
  if (!state.roundActive || state.hasStuck) {
    playSound("no");
    return;
  }
  executeStick();
}

export function doubleDown() {
  if (!canDouble()) {
    playSound("no");
    return;
  }

  state.playerCredit -= state.currentBet;
  state.currentBet *= 2;
  updateCredits(state.playerCredit, state.dealerCredit);
  updateCurrentBet(state.currentBet);

  drawPlayerCard();
  checkBust();

  if (state.playerTotal <= 21) {
    executeStick();
  }
}

export function dealButtonHandler() {
  if (state.playerCredit === 0 || state.dealerCredit === 0) {
    resetGame();
    return;
  }

  deal();
}

refreshMoney();
resetRound();
