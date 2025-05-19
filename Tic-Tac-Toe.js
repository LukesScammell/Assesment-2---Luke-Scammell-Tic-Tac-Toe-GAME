const prompt = require('prompt-sync')(); // checks if prompt sync is installed


let boardgrid = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
// Creates the grid with a UI to show the game board
function boardGridGenerator() {
    console.clear();
    for (let i = 0; i < 9; i += 3) {
        console.log(" ---  ---  ---");
        console.log("( " + (boardgrid[i] || ' ') + " )( " + (boardgrid[i + 1] || ' ') + " )( " + (boardgrid[i + 2] || ' ') + " )");
    }
    console.log(" ---  ---  ---");
}

// Change Between players
function playerSwitcher() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


// Check if one of the players have chosen thier symbol to go in a specific pattern in these 3 numbers on the array
function playerWin() {
    const winPatterns = [
        [0, 1, 2], // Top Horizontal
        [3, 4, 5], // Middle Horizontal
        [6, 7, 8], // Bottom Horizontal
        [0, 3, 6], // Left Vertical
        [1, 4, 7], // Center Vertical
        [2, 5, 8], // Right Vertical
        [0, 4, 8], // Top to Bottom Diagonal
        [2, 4, 6]  // Bottom to Top Diagonal     
    ];
    return winPatterns.some(pattern => 
        boardgrid[pattern[0]] === currentPlayer &&
        boardgrid[pattern[1]] === currentPlayer &&
        boardgrid[pattern[2]] === currentPlayer
    );
}

// Check for a draw
function tieChecker() {
    return boardgrid.every(cell => cell !== "");
}

// Main game loop
function gameLoop() {
    let gameOver = false;
    while (!gameOver) {
        boardGridGenerator();
        const move = prompt("Player "+ currentPlayer + ", choose a place on the grid (1-9): "); 

        const index = parseInt(move) - 1; // The number the player has to put is has to be subtracted by one because javascript arrays start at 0 instead of 1

        if (index < 0 || index > 8 || isNaN(index)) {
            console.log("Incorrect input. Please Choose a number between 1 and 9.");
            continue;
        }

        if (boardgrid[index] !== "") {
            console.log("Someones allready chosen that spot Please choose another place on the grid");
            continue;
        }

        boardgrid[index] = currentPlayer;

        if (playerWin()) {
            boardGridGenerator();
            console.log("Player " + currentPlayer + " Out smarted the other player. You win!");
            gameOver = true;
        } else if (tieChecker()) {
            boardGridGenerator();
            console.log("You both tied congrats!");
            gameOver = true;
        } else {
            playerSwitcher(); // if none of the winning patterns have been found yet then it will switch to the other player and get thier move untill they find the pattern
        }
    }
}

// Start the game
gameLoop();


