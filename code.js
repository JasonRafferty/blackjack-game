//Initialise HTML
let currentBet = document.getElementById("currentBetHTML");
let credit = document.getElementById("creditHTML");
let creditDealer = document.getElementById("creditDealerHTML");
let playerCardNumber = document.getElementById("playerCardNumberHTML");
let dealerCardNumber = document.getElementById("dealerCardNumberHTML");
let banner = document.getElementById("bannerHTML");
var dealButton = document.getElementById("deal");

//Initialise Counters
let currentBetCounter = 10;
let cardNumber = 0;
let playerCardOneCounter;
let playerCardTwoCounter;
let playerCardThreeCounter;
let playerCardFourCounter;
let dealerCardOneCounter;
let dealerCardTwoCounter;
let dealerCardThreeCounter;
let creditCounter = 200;
let creditDealerCounter = 200;
let playerTotal = 0;
let dealerTotal = 0;
let stickCounter = 0;

//Initialise Card Images
const playerCardOne = document.getElementById("playerCardOne");
const playerCardTwo = document.getElementById("playerCardTwo");
const playerCardThree = document.getElementById("playerCardThree");
const playerCardFour = document.getElementById("playerCardFour");
const dealerCardOne = document.getElementById("dealerCardOne");
const dealerCardTwo = document.getElementById("dealerCardTwo");
const dealerCardThree = document.getElementById("dealerCardThree");

//Initialise Sound
const click = new Audio("/Sound/click.mp3");
const win = new Audio("/Sound/win.mp3");
const lose = new Audio("/Sound/lose.mp3");
const no = new Audio("/Sound/no.mp3");
const blackjack = new Audio("/Sound/blackjack.mp3");

//Initialise
//Ace Array
const aceCard = [
  "/Images/ace_of_clubs.png",
  "/Images/ace_of_diamonds.png",
  "/Images/ace_of_hearts.png",
  "/Images/ace_of_spades.png",
];
//Two Array
const twoCard = [
  "/Images/2_of_clubs.png",
  "/Images/2_of_diamonds.png",
  "/Images/2_of_hearts.png",
  "/Images/2_of_spades.png",
];
//Three Array
const threeCard = [
  "/Images/3_of_clubs.png",
  "/Images/3_of_diamonds.png",
  "/Images/3_of_hearts.png",
  "/Images/3_of_spades.png",
];
//Four Array
const fourCard = [
  "/Images/4_of_clubs.png",
  "/Images/4_of_diamonds.png",
  "/Images/4_of_hearts.png",
  "/Images/4_of_spades.png",
];
//Five Array
const fiveCard = [
  "/Images/5_of_clubs.png",
  "/Images/5_of_diamonds.png",
  "/Images/5_of_hearts.png",
  "/Images/5_of_spades.png",
];
//Six Array
const sixCard = [
  "/Images/6_of_clubs.png",
  "/Images/6_of_diamonds.png",
  "/Images/6_of_hearts.png",
  "/Images/6_of_spades.png",
];
//Seven Array
const sevenCard = [
  "/Images/7_of_clubs.png",
  "/Images/7_of_diamonds.png",
  "/Images/7_of_hearts.png",
  "/Images/7_of_spades.png",
];
//Eight Array
const eightCard = [
  "/Images/8_of_clubs.png",
  "/Images/8_of_diamonds.png",
  "/Images/8_of_hearts.png",
  "/Images/8_of_spades.png",
];
//Nine Array
const nineCard = [
  "/Images/9_of_clubs.png",
  "/Images/9_of_diamonds.png",
  "/Images/9_of_hearts.png",
  "/Images/9_of_spades.png",
];
//Ten Array
const tenCard = [
  "/Images/10_of_clubs.png",
  "/Images/10_of_diamonds.png",
  "/Images/10_of_hearts.png",
  "/Images/10_of_spades.png",
];
//Jack Array
const jackCard = [
  "/Images/jack_of_clubs.png",
  "/Images/jack_of_diamonds.png",
  "/Images/jack_of_hearts.png",
  "/Images/jack_of_spades.png",
];
//Queen Array
const queenCard = [
  "/Images/queen_of_clubs.png",
  "/Images/queen_of_diamonds.png",
  "/Images/queen_of_hearts.png",
  "/Images/queen_of_spades.png",
];
//King Array
const kingCard = [
  "/Images/king_of_clubs.png",
  "/Images/king_of_diamonds.png",
  "/Images/king_of_hearts.png",
  "/Images/king_of_spades.png",
];

//Raises currentBet by £10
function raise() {
  if (
    currentBetCounter < creditCounter &&
    currentBetCounter < creditDealerCounter
  ) {
    currentBetCounter += 10;
    currentBet.textContent = "Current Bet: £" + currentBetCounter;
  }
}

//Lower currentBet by £10
function lower() {
  if (currentBetCounter > 10) {
    currentBetCounter -= 10;
    currentBet.textContent = "Current Bet: £" + currentBetCounter;
  }
}

//Function for random numbers
function random() {
  return Math.floor(Math.random() * 13) + 1;
}

//Returns value for the players first card
function dealPlayerCardOne() {
  playerCardOneCounter = random();

  if (playerCardOneCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    playerCardOne.src = aceCard[randomCard];
  } else if (playerCardOneCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    playerCardOne.src = twoCard[randomCard];
  } else if (playerCardOneCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    playerCardOne.src = threeCard[randomCard];
  } else if (playerCardOneCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    playerCardOne.src = fourCard[randomCard];
  } else if (playerCardOneCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    playerCardOne.src = fiveCard[randomCard];
  } else if (playerCardOneCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    playerCardOne.src = sixCard[randomCard];
  } else if (playerCardOneCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    playerCardOne.src = sevenCard[randomCard];
  } else if (playerCardOneCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    playerCardOne.src = eightCard[randomCard];
  } else if (playerCardOneCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    playerCardOne.src = nineCard[randomCard];
  } else if (playerCardOneCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    playerCardOne.src = tenCard[randomCard];
  } else if (playerCardOneCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    playerCardOne.src = jackCard[randomCard];
    playerCardOneCounter = 10;
  } else if (playerCardOneCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    playerCardOne.src = queenCard[randomCard];
    playerCardOneCounter = 10;
  } else if (playerCardOneCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    playerCardOne.src = kingCard[randomCard];
    playerCardOneCounter = 10;
  }
  console.log("playerCardOne = " + playerCardOneCounter);
}

//Returns value for the players second card
function dealPlayerCardTwo() {
  playerCardTwoCounter = random();

  if (playerCardTwoCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    playerCardTwo.src = aceCard[randomCard];
  } else if (playerCardTwoCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    playerCardTwo.src = twoCard[randomCard];
  } else if (playerCardTwoCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    playerCardTwo.src = threeCard[randomCard];
  } else if (playerCardTwoCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    playerCardTwo.src = fourCard[randomCard];
  } else if (playerCardTwoCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    playerCardTwo.src = fiveCard[randomCard];
  } else if (playerCardTwoCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    playerCardTwo.src = sixCard[randomCard];
  } else if (playerCardTwoCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    playerCardTwo.src = sevenCard[randomCard];
  } else if (playerCardTwoCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    playerCardTwo.src = eightCard[randomCard];
  } else if (playerCardTwoCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    playerCardTwo.src = nineCard[randomCard];
  } else if (playerCardTwoCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    playerCardTwo.src = tenCard[randomCard];
  } else if (playerCardTwoCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    playerCardTwo.src = jackCard[randomCard];
    playerCardTwoCounter = 10;
  } else if (playerCardTwoCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    playerCardTwo.src = queenCard[randomCard];
    playerCardTwoCounter = 10;
  } else if (playerCardTwoCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    playerCardTwo.src = kingCard[randomCard];
    playerCardTwoCounter = 10;
  }
  console.log("playerCardTwo = " + playerCardTwoCounter);
}

//Returns value for the players third card
function dealPlayerCardThree() {
  playerCardThreeCounter = random();
  if (playerCardThreeCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    playerCardThree.src = aceCard[randomCard];
  } else if (playerCardThreeCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    playerCardThree.src = twoCard[randomCard];
  } else if (playerCardThreeCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    playerCardThree.src = threeCard[randomCard];
  } else if (playerCardThreeCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    playerCardThree.src = fourCard[randomCard];
  } else if (playerCardThreeCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    playerCardThree.src = fiveCard[randomCard];
  } else if (playerCardThreeCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    playerCardThree.src = sixCard[randomCard];
  } else if (playerCardThreeCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    playerCardThree.src = sevenCard[randomCard];
  } else if (playerCardThreeCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    playerCardThree.src = eightCard[randomCard];
  } else if (playerCardThreeCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    playerCardThree.src = nineCard[randomCard];
  } else if (playerCardThreeCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    playerCardThree.src = tenCard[randomCard];
  } else if (playerCardThreeCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    playerCardThree.src = jackCard[randomCard];
    playerCardThreeCounter = 10;
  } else if (playerCardThreeCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    playerCardThree.src = queenCard[randomCard];
    playerCardThreeCounter = 10;
  } else if (playerCardThreeCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    playerCardThree.src = kingCard[randomCard];
    playerCardThreeCounter = 10;
  }
  console.log("playerCardThree = " + playerCardThreeCounter);
}

//Returns value for the players fourth card
function dealPlayerCardFour() {
  playerCardFourCounter = random();
  if (playerCardFourCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    playerCardFour.src = aceCard[randomCard];
  } else if (playerCardFourCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    playerCardFour.src = twoCard[randomCard];
  } else if (playerCardFourCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    playerCardFour.src = threeCard[randomCard];
  } else if (playerCardFourCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    playerCardFour.src = fourCard[randomCard];
  } else if (playerCardFourCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    playerCardFour.src = fiveCard[randomCard];
  } else if (playerCardFourCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    playerCardFour.src = sixCard[randomCard];
  } else if (playerCardFourCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    playerCardFour.src = sevenCard[randomCard];
  } else if (playerCardFourCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    playerCardFour.src = eightCard[randomCard];
  } else if (playerCardFourCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    playerCardFour.src = nineCard[randomCard];
  } else if (playerCardFourCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    playerCardFour.src = tenCard[randomCard];
  } else if (playerCardFourCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    playerCardFour.src = jackCard[randomCard];
    playerCardFourCounter = 10;
  } else if (playerCardFourCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    playerCardFour.src = queenCard[randomCard];
    playerCardFourCounter = 10;
  } else if (playerCardFourCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    playerCardFour.src = kingCard[randomCard];
    playerCardFourCounter = 10;
  }
  console.log("playerCardFour = " + playerCardFourCounter);
}

//Returns value for dealers first card
function dealDealerCardOne() {
  dealerCardOneCounter = random();
  if (dealerCardOneCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    dealerCardOne.src = aceCard[randomCard];
  } else if (dealerCardOneCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    dealerCardOne.src = twoCard[randomCard];
  } else if (dealerCardOneCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    dealerCardOne.src = threeCard[randomCard];
  } else if (dealerCardOneCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    dealerCardOne.src = fourCard[randomCard];
  } else if (dealerCardOneCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    dealerCardOne.src = fiveCard[randomCard];
  } else if (dealerCardOneCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    dealerCardOne.src = sixCard[randomCard];
  } else if (dealerCardOneCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    dealerCardOne.src = sevenCard[randomCard];
  } else if (dealerCardOneCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    dealerCardOne.src = eightCard[randomCard];
  } else if (dealerCardOneCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    dealerCardOne.src = nineCard[randomCard];
  } else if (dealerCardOneCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    dealerCardOne.src = tenCard[randomCard];
  } else if (dealerCardOneCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    dealerCardOne.src = jackCard[randomCard];
    dealerCardOneCounter = 10;
  } else if (dealerCardOneCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    dealerCardOne.src = queenCard[randomCard];
    dealerCardOneCounter = 10;
  } else if (dealerCardOneCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    dealerCardOne.src = kingCard[randomCard];
    dealerCardOneCounter = 10;
  }
  console.log("dealerCardOne = " + dealerCardOneCounter);
}

//Returns value for dealers second card
function dealDealerCardTwo() {
  dealerCardTwoCounter = random();
  if (dealerCardTwoCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    dealerCardTwo.src = aceCard[randomCard];
  } else if (dealerCardTwoCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    dealerCardTwo.src = twoCard[randomCard];
  } else if (dealerCardTwoCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    dealerCardTwo.src = threeCard[randomCard];
  } else if (dealerCardTwoCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    dealerCardTwo.src = fourCard[randomCard];
  } else if (dealerCardTwoCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    dealerCardTwo.src = fiveCard[randomCard];
  } else if (dealerCardTwoCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    dealerCardTwo.src = sixCard[randomCard];
  } else if (dealerCardTwoCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    dealerCardTwo.src = sevenCard[randomCard];
  } else if (dealerCardTwoCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    dealerCardTwo.src = eightCard[randomCard];
  } else if (dealerCardTwoCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    dealerCardTwo.src = nineCard[randomCard];
  } else if (dealerCardTwoCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    dealerCardTwo.src = tenCard[randomCard];
  } else if (dealerCardTwoCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    dealerCardTwo.src = jackCard[randomCard];
    dealerCardTwoCounter = 10;
  } else if (dealerCardTwoCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    dealerCardTwo.src = queenCard[randomCard];
    dealerCardTwoCounter = 10;
  } else if (dealerCardTwoCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    dealerCardTwo.src = kingCard[randomCard];
    dealerCardTwoCounter = 10;
  }
  console.log("dealerCardTwo = " + dealerCardTwoCounter);
}

//Returns value for dealers third card
function dealDealerCardThree() {
  dealerCardThreeCounter = random();
  if (dealerCardThreeCounter === 1) {
    const randomCard = Math.floor(Math.random() * aceCard.length);
    dealerCardThree.src = aceCard[randomCard];
  } else if (dealerCardThreeCounter === 2) {
    const randomCard = Math.floor(Math.random() * twoCard.length);
    dealerCardThree.src = twoCard[randomCard];
  } else if (dealerCardThreeCounter === 3) {
    const randomCard = Math.floor(Math.random() * threeCard.length);
    dealerCardThree.src = threeCard[randomCard];
  } else if (dealerCardThreeCounter === 4) {
    const randomCard = Math.floor(Math.random() * fourCard.length);
    dealerCardThree.src = fourCard[randomCard];
  } else if (dealerCardThreeCounter === 5) {
    const randomCard = Math.floor(Math.random() * fiveCard.length);
    dealerCardThree.src = fiveCard[randomCard];
  } else if (dealerCardThreeCounter === 6) {
    const randomCard = Math.floor(Math.random() * sixCard.length);
    dealerCardThree.src = sixCard[randomCard];
  } else if (dealerCardThreeCounter === 7) {
    const randomCard = Math.floor(Math.random() * sevenCard.length);
    dealerCardThree.src = sevenCard[randomCard];
  } else if (dealerCardThreeCounter === 8) {
    const randomCard = Math.floor(Math.random() * eightCard.length);
    dealerCardThree.src = eightCard[randomCard];
  } else if (dealerCardThreeCounter === 9) {
    const randomCard = Math.floor(Math.random() * nineCard.length);
    dealerCardThree.src = nineCard[randomCard];
  } else if (dealerCardThreeCounter === 10) {
    const randomCard = Math.floor(Math.random() * tenCard.length);
    dealerCardThree.src = tenCard[randomCard];
  } else if (dealerCardThreeCounter === 11) {
    const randomCard = Math.floor(Math.random() * jackCard.length);
    dealerCardThree.src = jackCard[randomCard];
    dealerCardThreeCounter = 10;
  } else if (dealerCardThreeCounter === 12) {
    const randomCard = Math.floor(Math.random() * queenCard.length);
    dealerCardThree.src = queenCard[randomCard];
    dealerCardThreeCounter = 10;
  } else if (dealerCardThreeCounter === 13) {
    const randomCard = Math.floor(Math.random() * kingCard.length);
    dealerCardThree.src = kingCard[randomCard];
    dealerCardThreeCounter = 10;
  }
  console.log("dealerCardThree = " + dealerCardThreeCounter);
}

function deal() {
  //Resets players amount of hits
  cardsDealt = 0;
  banner.textContent = "---";

  if (creditCounter >= currentBetCounter) {
    //Updates counter for both cards for player
    dealPlayerCardOne();
    dealPlayerCardTwo();
    playerTotal = playerCardOneCounter + playerCardTwoCounter;
    playerCardNumber.textContent = playerTotal;
    checkBust();

    //Updates counter for single card for dealer
    dealDealerCardOne();
    dealerCardNumber.textContent = dealerCardOneCounter;

    //Take away money
    creditCounter -= currentBetCounter;
    credit.textContent = "Player: £" + creditCounter;
  } else {
    //Text stating insuifficient funds
    banner.textContent = "Insufficient Funds!";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1000);
  }

  //Reset cards
  playerCardThree.src = "";
  playerCardFour.src = "";
  dealerCardTwo.src = "/Images/logo.png";
  dealerCardThree.src = "";

  //Checks if zero credits
  playerZeroCredits();
  dealerZeroCredits();

  //Reset stick counter
  stickCounter = 0;
  stickCounter++;
}

//Allows mutiple cards to be added
let cardsDealt = 0;

//Player can add cards
function hit() {
  console.log(cardsDealt);
  cardsDealt++;
  if (cardsDealt === 1) {
    if (playerTotal < 21) {
      dealPlayerCardThree();
      playerTotal += playerCardThreeCounter;
      playerCardNumber.textContent = playerTotal;
      checkBust();
    } else {
      no.play();
    }
  } else if (cardsDealt === 2) {
    if (playerTotal < 21) {
      dealPlayerCardFour();
      playerTotal += playerCardFourCounter;
      playerCardNumber.textContent = playerTotal;
      checkBust();
    } else {
      no.play();
    }
  } else {
    no.play();
  }
}

//Dealer adds third card
function dealerHit() {
  setTimeout(function () {
    dealDealerCardThree();
    dealerTotal += dealerCardThreeCounter;
    dealerCardNumber.textContent = dealerTotal;
    console.log("dealerTotal = " + dealerTotal);
    checkWinner();
  }, 1200);
}

function stick() {
  //Update card counter for dealer
  if (stickCounter === 1) {
    dealDealerCardTwo();
    dealerTotal = dealerCardOneCounter + dealerCardTwoCounter;
    dealerCardNumber.textContent = dealerTotal;
    if (dealerTotal <= 15) {
      dealerHit();
    } else {
      setTimeout(function () {
        checkWinner();
      }, 1500);
    }
    stickCounter++;
  }
}

//Checks if player goes bust
function checkBust() {
  //Lose if above 21
  if (playerTotal > 21) {
    //Update dealer credit
    creditDealerCounter += currentBetCounter;
    creditDealer.textContent = "+ £" + currentBetCounter;
    setTimeout(function () {
      creditDealer.textContent = "Dealer: £" + creditDealerCounter;
    }, 1500);
    //Update banner
    lose.play();
    banner.textContent = "You Lose";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1600);

    //Blackjack
  } else if (playerTotal === 21) {
    blackjack.play();
    banner.textContent = "You got blackjack!";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1400);
  }
}

function checkWinner() {
  // Both get same card
  if (dealerTotal === playerTotal) {
    creditCounter += currentBetCounter;
    //Update player credit
    credit.textContent = "+ £0";
    setTimeout(function () {
      credit.textContent = "Player: £" + creditCounter;
    }, 1500);
    //Update dealer credit
    creditDealer.textContent = "+ £0";
    setTimeout(function () {
      creditDealer.textContent = "Dealer: £" + creditDealerCounter;
    }, 1500);
    //Update banner
    win.play();
    banner.textContent = "You Draw";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1600);
  }

  //Dealer goes bust
  else if (dealerTotal > 21 && playerTotal <= 21) {
    creditCounter += currentBetCounter * 2;
    creditDealerCounter -= currentBetCounter;
    //Update player credit
    credit.textContent = "+ £" + currentBetCounter;
    setTimeout(function () {
      credit.textContent = "Player: £" + creditCounter;
    }, 1500);
    //Update dealer credit
    creditDealer.textContent = "- £" + currentBetCounter;
    setTimeout(function () {
      creditDealer.textContent = "Dealer: £" + creditDealerCounter;
    }, 1500);
    //Change Banner
    win.play();
    banner.textContent = "You Win!";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1600);
  }

  //Player has higher
  else if (playerTotal > dealerTotal) {
    creditCounter += currentBetCounter * 2;
    creditDealerCounter -= currentBetCounter;
    //Update player credit
    credit.textContent = "+ £" + currentBetCounter;
    setTimeout(function () {
      credit.textContent = "Player: £" + creditCounter;
    }, 1500);
    //Update dealer credit
    creditDealer.textContent = "- £" + currentBetCounter;
    setTimeout(function () {
      creditDealer.textContent = "Dealer: £" + creditDealerCounter;
    }, 1500);
    //Change Banner
    win.play();
    banner.textContent = "You Win!";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1600);
  }

  //Dealer has higher
  else if (playerTotal < dealerTotal) {
    //Update player credit
    credit.textContent = "- £" + currentBetCounter;
    setTimeout(function () {
      credit.textContent = "Player: £" + creditCounter;
    }, 1500);
    //Update dealer credit
    creditDealerCounter += currentBetCounter;
    creditDealer.textContent = "+ £" + currentBetCounter;
    setTimeout(function () {
      creditDealer.textContent = "Dealer: £" + creditDealerCounter;
    }, 1500);
    //Update banner
    lose.play();
    banner.textContent = "You Lose";
    setTimeout(function () {
      banner.textContent = "---";
    }, 1600);
  }
}

//Gives the deal button two functions
function dealButtonHandler() {
  if (creditCounter === 0 || creditDealerCounter === 0) {
    //Reset player money
    credit.textContent = "Reset";
    creditCounter = 200;
    setTimeout(function () {
      credit.textContent = "Player: £" + creditCounter;
    }, 1000);
    //reset dealer money
    creditDealer.textContent = "Reset";
    creditDealerCounter = 200;
    setTimeout(function () {
      creditDealer.textContent = "Dealer: £" + creditCounter;
    }, 1000);
    //Change button back
    dealButton.innerHTML = "Deal";
    dealButton.style.backgroundColor = "rgb(231, 15, 15)";
    dealButton.style.boxShadow = "#a11907 0px 7px 2px, #000 0px 8px 5px";
    dealButton.style.color = "white";
    dealButton.style.fontWeight = "normal";
  } else {
    deal();
  }
}

function playerZeroCredits() {
  if (creditCounter === 0) {
    dealButton.innerHTML = "Play Again!";
    lose.play();
    //Update Banner
    banner.textContent = "You Lose!";
    setTimeout(function () {
      banner.textContent = "Try again!";
    }, 1000);
    setTimeout(function () {
      banner.textContent = "---";
    }, 2000);
    //Change Colour
    dealButton.style.backgroundColor = "#d79a1f";
    dealButton.style.boxShadow = "#79560f 0px 7px 2px, #000 0px 8px 5px";
    dealButton.style.color = "black";
    dealButton.style.fontWeight = "bold";
    //Reset Cards
    playerCardOne.src = "/Images/logo.png";
    playerCardTwo.src = "/Images/logo.png";
    playerCardThree.src = "";
    playerCardFour.src = "";
    dealerCardOne.src = "/Images/logo.png";
    dealerCardTwo.src = "/Images/logo.png";
    dealerCardThree.src = "";
    //Reset card number
    playerCardNumber.textContent = "-";
    dealerCardNumber.textContent = "-";
  }
}

function dealerZeroCredits() {
  if (creditDealerCounter === 0) {
    dealButton.innerHTML = "Play Again!";
    blackjack.play();
    //Update Banner
    banner.textContent = "You Win!";
    setTimeout(function () {
      banner.textContent = "Try again!";
    }, 1000);
    setTimeout(function () {
      banner.textContent = "---";
    }, 2000);
    //Change Colour
    dealButton.style.backgroundColor = "#d79a1f";
    dealButton.style.boxShadow = "#79560f 0px 7px 2px, #000 0px 8px 5px";
    dealButton.style.color = "black";
    dealButton.style.fontWeight = "bold";
    //Reset Cards
    playerCardOne.src = "/Images/logo.png";
    playerCardTwo.src = "/Images/logo.png";
    playerCardThree.src = "";
    playerCardFour.src = "";
    dealerCardOne.src = "/Images/logo.png";
    dealerCardTwo.src = "/Images/logo.png";
    dealerCardThree.src = "";
    //Reset card number
    playerCardNumber.textContent = "-";
    dealerCardNumber.textContent = "-";
  }
}

dealButton.addEventListener("click", dealButtonHandler);
document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stick").addEventListener("click", stick);
document.getElementById("raise").addEventListener("click", raise);
document.getElementById("lower").addEventListener("click", lower);

//Future
//1. Let dealer deal four cards
//2. Be able to deal five cards
//3. better ai for dealer
//4. Use arrays
//5. Ace can either equal 1 or 11
