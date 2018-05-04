'use strict';
/* code plan
Tic Tac Toe

countAppearances (arr,value) - use for loop to count how many times a value appears in an array

horizontalWin -
For i, 0-2
If countAppearances(board[i], playerTurn) === 3 => return true
End for
Return false

verticalWin -
For j, 0-2
Const colArr = []
for i, 0-2, i++
colArr.push board[i][j]
End for i
If countAppearances(colArr, playerTurn) === 3 => return true
End for j
Return false

diagonalWin -
Const diaganolArr1
Const diagonalArr2
For j,0-2
diaganolArr1 push board[j][j]
diagonalArr2 push board[j][2-j]
End for
If countAppearances(diagonalArr1, player ) === 3 || ‘’ diagonalArr2 ‘’   => return true
Return false

checkForWin -
If (horwin or vertwin or diagwin) return true
Return false

ticTacToe -
board[row][col] = playerTurn
If checkwin() return playerTurn wins
switchPlayerTurn x <-> o
getprompt

*/
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

let moves = 0; //tracks the moves to know if there is a tie

function countAppearances (arr, val) { //counts the number of appearances of a value in an array
  let count = 0;
  for (let i=0; i< arr.length; i++) {
    if (arr[i] === val) count++
  }
  return count;
}

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  for (let i = 0; i<3; i++) {
    if(countAppearances(board[i], playerTurn) === 3)return true
  } //for each row if there are three appearances of the current players turn there is a win
  return false;
}

function verticalWin() {
  for (let j=0; j<3; j++) { // runs for each column
    const colArr = [];
    board.forEach(row =>  {
      colArr.push(row[j]); //pushes every element in column j into the column array
    });
    if(countAppearances(colArr, playerTurn) === 3) return true
  } //if any column has three of the current players letter there is a win
}

function diagonalWin() {
  const diagonalArr1 = [];
  const diagonalArr2 = [];
  board.forEach((row,i) =>  {
    diagonalArr1.push(row[i]); //creates an array of all the letters from the top left to bottom right corner
    diagonalArr2.push(row[2-i]); //creates an array of all the letters from the top right to bottom left corner
  });
  if (countAppearances(diagonalArr1, playerTurn) === 3 || countAppearances(diagonalArr2, playerTurn) === 3) return true;
  //there is a win if the current player has 3 letters in either diagonal
  return false
}

function checkForWin() { //this is self-explanatory
  if(horizontalWin() || verticalWin() || diagonalWin()) return true;
  return false;
}

function ticTacToe(row, column) {
  const isRow = Boolean(row == '0' || row == '1' || row == '2');
  const isColumn = Boolean(column == '0' || column == '1' || column == '2');
  if(!isRow || !isColumn || board[row][column] != ' ') {
    console.log('Please choose a valid row and column');
    return;
  } //filters out rows and columns that are already taken as well as invalid rows and columns
  board[row][column] = playerTurn; //marks an X or an O
  const winCheck = checkForWin();
  moves ++; //adds 1 to the move count
  console.log('moves:' + moves);
  if (winCheck || moves === 9) { //if it's a win or a tie
    printBoard();
    if (winCheck) {
      console.log (playerTurn + ' wins!')
    } else { //if it's not a win there must be nine moves with no winner, so it's a tie
      console.log("It's a tie!")
    }
    moves = 0; //reset move counter for next game
    playerTurn = 'O' // player turn will switch so that player X starts again
    board = [ //clear board for next game
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  }
  switch (playerTurn) { //switches the turn
    case 'X':
      playerTurn = 'O'
      break;
    case 'O':
      playerTurn = 'X'
      break;
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column)
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
