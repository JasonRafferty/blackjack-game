# Blackjack 

## Intro

This is a browser-based blackjack game built with HTML, CSS, and JavaScript. I made it to practise working across all three front-end layers: layout, styling, and game logic.

The biggest challenge was getting the cards, counters, and controls to sit neatly together while the game state changed. I built the project without a template so I could work through the structure, styling, and logic myself.

<div align="center">
  <img src="Screenshots/image1.JPG" alt="Blackjack initial game interface" style="max-width: 600px; width: 100%;">
      <p align="left">Figure 1: Blackjack Initial Game Interface</p>
</div>

## UI Development

The interface is split into player and dealer areas, with card totals shown below each hand. The money counters show the player balance, current bet, and dealer balance, so the state of each round is visible without needing extra menus.

I used a full set of card images and a simple table-style background to make the game feel more complete. The buttons have hover and active states so the controls feel responsive when playing.

## In-game Functionality

The game uses five main controls:

- Deal: Starts a round, deals the first cards, updates card totals, and takes the current bet from the player's balance.
- Hit: Gives the player another card and updates their total.
- Stick: Ends the player's turn and lets the dealer draw.
- Raise: Increases the current bet by £10.
- Lower: Decreases the current bet by £10.

I kept the rules focused on the core loop of blackjack rather than adding every casino option. That made the project easier to finish cleanly while still giving the player a complete round-by-round game.

<div align="center">
  <img src="Screenshots/image5.JPG" alt="Blackjack game in progress" style="max-width: 600px; width: 100%;">
      <p align="left">Figure 2: Blackjack Game</p>
</div>

## Game Logic

Each card is chosen by generating a number between 1 and 13, then matching that value to one of the card image groups. Jack, Queen, and King are counted as 10.

When the player hits, the game adds a new card to the player hand and checks whether the total has gone over 21. When the player sticks, the dealer reveals their hand and draws again if their total is low enough.

The result is handled by `checkBust`, `checkWinner`, and `checkLoser`-style logic. These checks update the banner, adjust player and dealer balances, and reset the display ready for the next hand.

<div align="center">
  <img src="Screenshots/image2.JPG" alt="Blackjack player loses" style="max-width: 600px; width: 100%;">
      <p align="left">Figure 3: Blackjack Player Loses</p>
</div>

## Error Handling

The game includes a few guard rails to keep each round playable:

- It checks that the player has enough money before dealing.
- It limits how many cards can be drawn so the layout does not break.
- It prevents extra dealer actions after the player has already stuck.
- It resets the game when either the player or dealer runs out of credit.

## Future Improvements

- Replace the repeated card-dealing code with a shared card data structure.
- Improve the dealer rule so it follows a more standard stand-on-17 approach.
- Add better ace handling so an ace can count as 1 or 11.
- Allow more cards on screen without breaking the layout.
- Add clearer disabled states for buttons when an action is not available.

## Conclusion

This project helped me get more comfortable combining JavaScript logic with a visual interface. It was especially useful for practising DOM updates, event listeners, game state, and layout work in one small project.
