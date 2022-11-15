/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    return board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    for (let i = 1; i < 8; i += 3) {
        console.log(board[i] + " | " + board[i + 1] + " | " + board[i + 2]);

        if (i < 7) {
            console.log("----------");
        }
    }
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    if(position < 1 || position > 9 || board[position] =="O"||board[position]=="X" || isNaN(position)){
        console.log("Please Enter a Valid Input")
        return false;
      } else {
        return true;
      }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let arr=[];
    
    for (position in board){
        if (board[position] == player){
            arr.push(Number(position));
        }
    }
    
    for (let i =0; i<winCombinations.length; i++){
        let win_Counter = 0;

        for (let j =0; j<3; j++){
            if (arr.indexOf(winCombinations[i][j])>=0){
                win_Counter++;
            }
        }

        if (win_Counter ==3){
            return true;
        }
    }

    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    let full_Counter = 0;
    for (let position in board){
        if (board[position] == "O" || board[position] =="X"){
            full_Counter++
        }
    }

    if (full_Counter == 9){
        return true;
    } else {
        return false;
    }
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position;
    do{
        position = prompt(player + " Player Please Insert Position: ")
    } while (!validateMove(position))
    markBoard(position, player);
    printBoard();

}

let restartInput = "N";

do {
    // entry point of the whole program
    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

    board = {
        1: '1', 2: '2', 3: '3',
        4: '4', 5: '5', 6: '6',
        7: '7', 8: '8', 9: '9'
    };

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while (!winnerIdentified){
        playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie
        if (checkWin(currentTurnPlayer)){
            winnerIdentified = true
            console.log("Congrats, Player " + currentTurnPlayer + " ! You Win!" )
            restartInput = prompt ("Do you want to have another game? (Y/N)")
        } else if(currentTurnPlayer =="X"){
            currentTurnPlayer ="O"
        } else {
            currentTurnPlayer ="X"
        }

        if (checkFull()){
            winnerIdentified = true
            console.log("It's a tie")
            restartInput = prompt ("Do you want to have another game? (Y/N)")
        }
    }
} while (restartInput == "y" || restartInput == "Y")

console.log("Thank you! Have a Nice Day!")




// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
