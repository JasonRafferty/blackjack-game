import { playSound } from "./audio.js";
import { drawCard, getHandTotal } from "./deck.js";
import {
  renderHand,
  resetCards,
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

const state = {
  currentBet: MINIMUM_BET,
  dealerCredit: STARTING_CREDIT,
  dealerHand: [],
  dealerTotal: 0,
  hasStuck: false,
  playerCredit: STARTING_CREDIT,
  playerHand: [],
  playerTotal: 0,
  roundActive: false,
};

function refreshMoney() {
  updateCredits(state.playerCredit, state.dealerCredit);
  updateCurrentBet(state.currentBet);
}

function resetRound() {
  state.dealerHand = [];
  state.dealerTotal = 0;
  state.hasStuck = false;
  state.playerHand = [];
  state.playerTotal = 0;
  state.roundActive = false;
  resetCards();
  updateTotals(null, null);
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
}

function endRound() {
  state.roundActive = false;
}

function checkZeroCredits() {
  if (state.playerCredit === 0) {
    setDealButtonPlayAgain();
    playSound("lose");
    showBanner("You Lose!");

    setTimeout(() => showBanner("Try again!"), 1000);
    setTimeout(() => showBanner("---"), 2000);

    resetRound();
    return;
  }

  if (state.dealerCredit === 0) {
    setDealButtonPlayAgain();
    playSound("blackjack");
    showBanner("You Win!");

    setTimeout(() => showBanner("Try again!"), 1000);
    setTimeout(() => showBanner("---"), 2000);

    resetRound();
  }
}

function playerWins() {
  state.playerCredit += state.currentBet * 2;
  state.dealerCredit -= state.currentBet;

  updatePlayerCredit(`+ £${state.currentBet}`);
  updateDealerCredit(`- £${state.currentBet}`);

  setTimeout(refreshMoney, 1500);
  playSound("win");
  showBanner("You Win!", 1600);
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
  state.playerHand.push(drawCard());
  state.playerTotal = getHandTotal(state.playerHand);
  renderHand("player", state.playerHand);
  updatePlayerTotal(state.playerTotal);
}

function drawDealerCard() {
  state.dealerHand.push(drawCard());
  state.dealerTotal = getHandTotal(state.dealerHand);
  renderHand("dealer", state.dealerHand);
  updateDealerTotal(state.dealerTotal);
}

function dealerHit() {
  setTimeout(() => {
    drawDealerCard();
    checkWinner();
  }, 1200);
}

export function raise() {
  if (
    state.currentBet < state.playerCredit &&
    state.currentBet < state.dealerCredit
  ) {
    state.currentBet += 10;
    updateCurrentBet(state.currentBet);
  }
}

export function lower() {
  if (state.currentBet > MINIMUM_BET) {
    state.currentBet -= 10;
    updateCurrentBet(state.currentBet);
  }
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

  showBanner("---");
  resetCards();

  drawPlayerCard();
  drawPlayerCard();
  checkBust();

  drawDealerCard();
  renderHand("dealer", state.dealerHand, { hiddenIndexes: [1] });

  state.playerCredit -= state.currentBet;
  updateCredits(state.playerCredit, state.dealerCredit);

  checkZeroCredits();
}

export function hit() {
  if (!state.roundActive || state.playerTotal >= 21 || state.playerHand.length >= 4) {
    playSound("no");
    return;
  }

  drawPlayerCard();
  checkBust();
}

export function stick() {
  if (!state.roundActive || state.hasStuck) {
    playSound("no");
    return;
  }

  state.hasStuck = true;
  drawDealerCard();

  if (state.dealerTotal <= 15) {
    dealerHit();
    return;
  }

  setTimeout(checkWinner, 1500);
}

export function dealButtonHandler() {
  if (state.playerCredit === 0 || state.dealerCredit === 0) {
    resetGame();
    return;
  }

  deal();
}

refreshMoney();
