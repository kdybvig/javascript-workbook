'use strict';
/*
Coding Plan

towersofhanoi function
check for valid input (must be a, b, or c, can't pick same letter twice)
check if the move is legal
 if not => say Sorry and return
 move piece
 after piece is moved change stack arrays
 checkForWin
  if win => print winner, resetStacks, return


isLegal function
  check for empty arrays
  if first array empty, return false
  if second array empty, return true
  if last from first array less than last from first array, true
  false

resetStacks
  all we need to do is change stacka stackb and stackc to their starting values

checkForWin
  too hard to check if arrays are equal so just check if stackb has length 4

movepiece -- just pop the second array and push it into the first one

that's all folks
*/
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
/*stacks should be declared wih const, but
cannot be changed without changing the tests*/
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  stacks[endStack].push(stacks[startStack].pop());
  //moves the top stone from the start stack to the top of the end stack
}

function isLegal(startStack, endStack) {
  const startArr = stacks[startStack];
  const endArr = stacks[endStack];
  if (!startArr[0])return false
  //you can't move something from nothing
  if (!endArr[0])return true
  //if you have something to move you can always move it to an empty stack
  if (startArr[startArr.length -1] < endArr[endArr.length -1]) return true;
  /*if the top stone in the starting stack is smaller than the top stone of the
  ending stack, you are in the clear. */
  return false;
}

function checkForWin() {
  return Boolean(stacks.b.length === 4)
  //if stackb has 4 stones, you win!
}

function resetStacks() {
  stacks.a = [4, 3, 2, 1]; //full
  stacks.b = [];// empty
  stacks.c = []; //empty
}

function towersOfHanoi(startStack, endStack) {
  const legalStacks = ['a','b','c'];
  startStack = startStack.toLowerCase().trim();
  endStack = endStack.toLowerCase().trim();
  if (legalStacks.indexOf(startStack) === -1) {
    console.log('Sorry, invalid entry. Please choose a, b, or c for each stack.')
    return;
  } //if they didn't choose a, b, or c for both stacks send error message and return
  if (startStack === endStack) {
    console.log('Sorry, invalid entry.  Please choose two different stacks.')
    return;
  } //This stops the player from choosing the same stack twice
  if (!isLegal(startStack,endStack) || startStack === endStack) {
    console.log ('Sorry, invalid move.');
    return;
  } //if the move is illegal, send an error message and prompt for a new choice
  movePiece(startStack, endStack); // otherwise make the move
  if (checkForWin()) {
    console.log ('Congrats!  You are a winner.')
    resetStacks();
  } //if the player won, send them a winner message and then reset the game
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] }); 
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      }; //This code requires stacks to be declared with let. It should be refactored.
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      }; //This code requires stacks to be declared with let. It should be refactored.
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] }; //This code requires stacks to be declared with let. It should be refactored.
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] }; //This code requires stacks to be declared with let. It should be refactored.
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
