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
