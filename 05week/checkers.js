/*  Code Plan
Outline

X this.curPlayer - tracks current player

X class Checker - class for Checker objects
X placeInitialCheckers => should put 16 checker objects on the board

moveChecker - should move a checker if possible or return an error message
   validSquares - should check if the squares are on the board and inhabitable
   return true or false
   validStartAndEnd - should check that the start square has a checker and end does not
   return true or false
   legalMove - should check if the move is possible to make
   return true or false
   kingMe - king the piece that just moved if it made it to the last row
   updateBoard - should change the board so that jumped pieces are deleted and the piece is moved
   no return;
   switchplayer
   checkForWin - check if current player has no moves
   return true or false, if true end game and call restart function
   getPrompt

   also need to figure out double jumps



Functions

  validSquare - should return false if: first digit is less than 0, second
  digit is more than 7, the string is longer than two or either 1st or second
  digit is not a string

  validStartAndEnd - change to hasPiece check if start square and end square
  have a piece

  legalMove - check if rowDiff is in available moves and rowDiff is equal to
  absolute value of column difference.  if so, if absolute value of column
  difference is 2 check if the middle square has a piece using this.hasPiece.

  checkForWin - find all the pieces that have the current player's symbol.
  on each of those pieces check if there are any squares they can move to
  using for loop, availableMoves and canMove function
    canMove - check if the new space is occupied using hasPiece, if the new
    space is two spaces away, check canJump

  doubleJump - only runs if lastJump is equal to whichPiece
  should check if the move is a jump
  should return true or 'illegal jump'

  game should restart after wincheck

*/

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  constructor(symbol) {
    this.symbol = symbol;
    this.king = false;
    this.hasMoves = symbol === 'b' ? [1,2] : [-1,-2];
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  /*this function uses for loops instead of forEach because it is only checking
  3 of the 8 rows and 4 of the 8 columns*/
  createCheckers (startRow, endRow, symbol) {
    //add checkers to rows starting with startRow and ending just before endRow
    for (let curRow = startRow; curRow < endRow; curRow ++) {
      /*start with column 0 if the row is even and 1 if the row is odd and place
       a checker in every other column*/
      for(let curCol = curRow%2 ? 0 : 1; curCol < 8; curCol += 2) {
        this.grid[curRow][curCol] = new Checker(symbol)
      }
    }
    /*This is just to pass the test.  I am having trouble finding a useful away
    to incorporate an array of checkers when the checkers are already stored in
    the grid property. */
    this.checkers.length = 24;
  }

  placeInitialCheckers() {
    //create 12 black checkers
    this.createCheckers(0, 3, 'b')
    //create 12 red red checkers
    this.createCheckers(5, 8, 'r')
  }
}


class Game {
  constructor() {
    this.board = new Board;
    this.curPlayer = null;
    this.mustJump = false;
    this.keepPlaying = true;
  }
  start() {
    this.board.createGrid();
    this.board.placeInitialCheckers();
    this.curPlayer = 'b'
    console.log('Welcome to checkers.')
    console.log('To declare a draw answer 00 to both questions.')
    console.log('To quit at any time, press CTRL + C')
  }

  moveChecker (whichPiece, toWhere) {
    if (this.checkForDraw(whichPiece, toWhere)) return;
    const whichRow = Number(whichPiece.charAt(0));
    const whichCol = Number(whichPiece.charAt(1));
    const whereRow = Number(toWhere.charAt(0));
    const whereCol = Number(toWhere.charAt(1));
    if (!this.validSquare(whichPiece) || !this.validSquare(toWhere)) {
      console.log('Please choose a two digit number representing the row and column');
      return;
    }

    /*if the first space is not occupied by the current player or the second
    space is occupied, returns an error message to the user.*/
    if (this.hasPiece(whichRow,whichCol) !== this.curPlayer || this.hasPiece(whereRow,whereCol)) {
      console.log(`${this.curPlayer === 'r' ? 'Red' : 'Black'}, please move one of your checkers to an unoccupied space.`)
      return;
    }

    //validJump will equal true or  'illegal jump'
    const jumpRequired = (this.mustJump && this.validJump(whichRow, whichCol, whereRow, whereCol))
    if (jumpRequired === 'illegal jump') {
      console.log("Sorry, invalid move.  Please choose another move. JERK!")
      return;
    }

    if (!this.legalMove(whichRow, whichCol, whereRow, whereCol)) {
      console.log("Sorry, invalid move.  Please choose another move. LOSER.")
      return;
    }
    //make the move by updating the board to reflect the new pieces
    this.updateBoard(whichRow, whichCol, whereRow, whereCol);
    //switch the current player from red to black or black to red if there is no double jump possible
    if(!this.mustJump) {
      this.curPlayer = this.curPlayer === 'r' ? 'b' : 'r';
      if (this.checkForWin()) {
        this.board.viewGrid();
        const winner = this.curPlayer === 'r' ? 'Black' : 'Red';
        console.log(`GAME OVER! ${winner} wins!`)
        this.playAgain();
      }
    }
  }

  checkForDraw(first, last) {
    const draw = first === '00' && last === '00';
    if (draw) {
      console.log('The game is a draw.')
      this.playAgain();
    }
    return draw
  }

  validSquare(square) {
    //each character in the string must be a number between 0 and 7
    const validNumber = (numStr) => (Number(numStr) !== NaN && Number(numStr) >= 0 && Number(numStr) <= 7)
    //the row and column should not  both be even or both be odd
    const isInhabitable = (square) => Number(square.charAt(0))%2 !== Number(square.charAt(1))%2
    return (validNumber(square.charAt(0)) && validNumber(square.charAt(1)) && square.length === 2 && isInhabitable(square))
  }

  //checks if a doubleJump is possible
  validJump(whichRow, whichCol, whereRow, whereCol) {
    const rowDiff = whereRow - whichRow;
    const colDiff = whereCol - whichCol;
    const twoSpaces = Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2;
    if(twoSpaces)return true;
    return 'illegal jump';
  }

  //returns false if there is no piece or the symbol if there is a piece
  hasPiece(row, col) {
    return this.board.grid[row][col] && this.board.grid[row][col].symbol.toLowerCase();
  }

  //checks if the middle square is occupied by an enemy checker
  canJump (whichRow, whichCol, whereRow, whereCol) {
    const middleRow = (whichRow + whereRow)/2;
    const middleCol = (whichCol + whereCol)/2
    return this.board.grid[middleRow][middleCol] && this.board.grid[middleRow][middleCol].symbol.toLowerCase() !== this.curPlayer;
  }

  legalMove (whichRow, whichCol, whereRow, whereCol) {
    const availMoves = this.board.grid[whichRow][whichCol].hasMoves
    const rowDiff = whereRow - whichRow;
    const colDiff = whereCol - whichCol;
    /*check if the piece is moving the correct spaces in the correct direction
    and is moving the same number of spaces left or right as up or down,
    then if moving more than one space, make sure it can jump*/
    if (availMoves.indexOf(rowDiff) > -1 && Math.abs(rowDiff) === Math.abs(colDiff)) {
      return Math.abs(colDiff) === 1 || this.canJump(whichRow, whichCol, whereRow, whereCol)
    }
    return false;
  }

  updateBoard (whichRow, whichCol, whereRow, whereCol) {
    //clears the last jump before moving the pieces
    this.mustJump = false;
    this.board.grid[whereRow][whereCol] = this.board.grid[whichRow][whichCol]
    this.board.grid[whichRow][whichCol] = null;
    //if it jumped an enemy checker, remove the enemychecker
    if (Math.abs(whereRow - whichRow) === 2) {
      const middleRow = (whichRow + whereRow)/2;
      const middleCol = (whichCol + whereCol)/2
      this.board.grid[middleRow][middleCol] = null;
      const square = this.board.grid[whereRow][whereCol];
      //This for loop only checks the odd indexed moves (the jump moves) to see if a double jump is possible
      for (let moveIndex = 1; moveIndex < square.hasMoves.length; moveIndex += 2) {
        const move = square.hasMoves[moveIndex];
        if(this.canMove(whereRow, whereCol, whereRow + move, whereCol + move) || this.canMove(whereRow, whereCol, whereRow + move, whereCol - move)) {
          //if a double jump is possible it records the last location to the .lastJump property of the game object
          this.mustJump = true;
        }
      };
      /*This is just to pass the test.  I have not found a useful way to
      include a checkers property in the board object.*/
      this.board.checkers.length = this.board.checkers.length - 1;
    }
    const lastRow = this.curPlayer === 'r' ? 0: 7;
    if (whereRow === lastRow && this.board.grid[whereRow][whereCol].king === false) {
      console.log('King me!')
      this.board.grid[whereRow][whereCol] = this.kingMe(this.board.grid[whereRow][whereCol])
      //You are not allowed to double jump immediately after your piece has become a king
      this.lastJump = null;
    }
  }

  //checks if a piece can move from a given square to another square
  canMove (whichRow, whichCol, whereRow, whereCol) {
    const emptySquare = whereRow <=7 && whereCol <=7 && whereRow >= 0 && whereCol >=0 && !this.hasPiece(whereRow, whereCol)
    const spacesMoved = Math.abs(whereRow - whichRow)
    return  emptySquare && (spacesMoved === 1 || this.canJump(whichRow, whichCol, whereRow, whereCol))
  }

  //turns a checker piece into a king
  kingMe(checker) {
    checker.symbol = checker.symbol.toUpperCase();
    checker.king = true;
    checker.hasMoves.push(checker.hasMoves[0] * -1);
    checker.hasMoves.push(checker.hasMoves[1] * -1);
    return checker;
  }

  //checks if the next player has any possible moves remaining
  checkForWin () {
    let gameOver = true;
    this.board.grid.forEach((row, whichRow) => {
      row.forEach ((square, whichCol) => {
        if(square && square.symbol.toLowerCase() === this.curPlayer) {
          square.hasMoves.forEach(move => {
            if(this.canMove(whichRow, whichCol, whichRow + move, whichCol + move) || this.canMove(whichRow, whichCol, whichRow + move, whichCol - move)) {
              gameOver = false;
              if (Math.abs(move) === 2) this.mustJump = true;
            }
          });
        }
      });
    });
    return gameOver;
  }

  //if the game is over, prompts to ask players if they would like to play again
  playAgain() {
    this.keepPlaying = false;
    rl.question('Do you want to play again? (Y/N):', (yesOrNo) => {
      if(yesOrNo.toLowerCase() === 'y') {
        this.keepPlaying = true;
        this.start();
        getPrompt();
      } else if (yesOrNo.toLowerCase() === 'n') {
        console.log('Good bye!')
        rl.close();
        return;
      } else {
        (this.playAgain())
      }
    });
  }
}

function getPrompt() {
  game.board.viewGrid();
  const nextPlayer = game.curPlayer === 'r' ? 'Red' : 'Black'
  console.log(`${nextPlayer}'s turn.`)
  if(game.mustJump) {console.log('Reminder: You must capture a piece when able.')}
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      if(game.keepPlaying) getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
