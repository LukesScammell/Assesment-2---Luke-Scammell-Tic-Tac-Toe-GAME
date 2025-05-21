const prompt = require('prompt-sync')(); // checks if prompt sync is installed


let boardgrid = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
// Creates the grid with a UI to show the game board
function boardGridGenerator() {
    console.clear(); // resets the board
    for (let i = 0; i < 9; i += 3) {
        console.log(" ---  ---  ---"); // Prints the dashes on the top of the grid making the top of the box shape
        console.log("( " + (boardgrid[i] || ' ') + " )( " + (boardgrid[i + 1] || ' ') + " )( " + (boardgrid[i + 2] || ' ') + " )"); // Creates the edges of the 
        // boxes where the players put thier symbols and will repeat 2 more times to make 3 rows of 3.
    }
    console.log(" ---  ---  ---"); // Prints the dashes under the grid making the bottom of the box shape
}

// Change Between players
function playerSwitcher() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // checks if the games started with the player 1 having X and then changing to the other player 
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
    ); // This is an example of a ground of indexes which would award the player who made this pattern first win
}

// Check If the players tied
function tieChecker() {
    return boardgrid.every(cell => cell !== ""); //checks if all of the cells are filled
}

// Main game loop
function gameLoop() {
    let gameOver = false; // starts the gameplay loop and will only stop unless it is turned true
    while (!gameOver) {
        boardGridGenerator();
        const move = prompt("Player "+ currentPlayer + ", choose a place on the grid (1-9): "); // allows the player to put in a int value of a number 1 to 9 and it will place
        // it on the grid on the corrisponding index which starts at 0

        const index = parseInt(move) - 1; // The number the player has to put is has to be subtracted by one because javascript arrays start at 0 instead of 1
        // If a player puts nothing in it will be classed as a null and still ask again
        if (index < 0 || index > 8 || isNaN(index)) {
            console.log("Incorrect number. Please Choose a number between 1 and 9.");
            prompt("Press Enter to try again..."); // prints this if the player gives a number above or below 9 or 1 or nothing. 
            // Like if I put 10 it would ask to choose another number
            continue;
        }

        if (boardgrid[index] !== "") {
            console.log("Someones allready chosen that spot Please choose another place on the grid");
            prompt("Press Enter to carry on the game...");
            continue; // This will not trigger becuase of the console.clear being after the if statements if that wasnt there the continue would cancel it out
            // meaning that the message wouldnt be printed.
        }
        console.clear(); // clear only after valid input after checking the if statements before

        boardgrid[index] = currentPlayer; // changes the value inside the index part of the grid which is the blank space and fills it with the current players symbol

        if (playerWin()) {
            boardGridGenerator(); // Prints the grid with the last move the player made
            console.log("Player " + currentPlayer + " Out smarted the other player. You win!"); // prints to show that the player who just placed thier X or O won the game
            gameOver = true; // a function turning the gameOver function true ending the loop
        } else if (tieChecker()) {
            boardGridGenerator(); // Prints the grid with the last move the player made
            console.log("You both tied congrats!"); // prints to show that both players managed to put thier symbols in none of the winning patterns
            gameOver = true; // a function turning the gameOver function true ending the loop
        } else {
            playerSwitcher(); // if none of the winning patterns have been found yet then it will switch to the other player and get thier move untill they find the pattern
        }
    }
}

 
gameLoop(); // runs the function above


