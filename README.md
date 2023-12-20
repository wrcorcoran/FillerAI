# FillerAI
Hi there! Welcome to Filler.

Filler (or my version of it) is based off of a GamePigeon app of the same name.
I've played Filler enough to consider myself pretty good at it, however, I'd consistently get beat even though I felt like I always had the strategic upperhand on my opponent. However, while this game is very random (as the colored pieces are randomly generated), I felt like there was a way to win every time. So, I decided to make an AI to help do that.

**Please note:** my intentions here are not to build a beautiful website / game. Instead, I'd rather focus on the minimax algorithm. For the same reason, sizing might not work on all devices. Again, for the same reason, the front-end documentation isn't perfect, rather the back-end is. If you'd like to see good design, check out some of my other projects like *Verde*.  

## How to Play
1. The human player begins in the bottom left corner.
2. The AI begins in the top right corner.
3. The first player is randomly chosen.
4. The goal of the game is to captured as many cells as possible.
5. A cell can be captured if it is adjacent to a current captured cell and the player changes color to that cell. For example, if the player is blue and the cell is red, the player will change to red and the cell will be captured.
6. The player's previous color and the opponent's current color cannot be used.
7. The game ends when one player has a majority (29 or more of the 56 cells).

## How to Run
1. Simple! Go to [https://wrcorcoran.github.io/FillerAI/](https://wrcorcoran.github.io/FillerAI/) and play!

## Technologies Used
1. Next.js
2. Python + libraries

## Technical Details
1. The AI is based off of a minimax algorithm with alpha-beta pruning.
> EXPAND HERE

## Known Errors
1. There is no AI, yet!

## Features To Add
4. Send JSON to Python script (board + player states)
5. Implement minimax algorithm
6. Implement alpha-beta pruning

## Acknowledgements
1. GamePigeon for the original game
2. Next.js for this beautiful framework
3. Guido van Rossum for designing a wonderful language
