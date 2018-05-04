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
}

function isLegal(startStack, endStack) {
  const startArr = stacks[startStack];
  const endArr = stacks[endStack];
  if (!startArr[0])return false
  if (!endArr[0])return true
  if (startArr[startArr.length -1] < endArr[endArr.length -1]) return true;
  return false;
}

function checkForWin() {
  return Boolean(stacks.b.length === 4)
}

function resetStacks() {
  stacks.a = [4, 3, 2, 1];
  stacks.b = [];
  stacks.c = [];
}

function towersOfHanoi(startStack, endStack) {
  const legalStacks = ['a','b','c'];
  if (legalStacks.indexOf(startStack) === -1 || legalStacks.indexOf(endStack) === -1) {
    console.log('Sorry, invalid entry. Please choose a, b, or c for each stack.')
    return;
  }
  if (!isLegal(startStack,endStack) || startStack === endStack) {
    console.log ('Sorry, invalid move.');
    return;
  }
  movePiece(startStack, endStack);
  if (checkForWin()) {
    console.log ('Congrats!  You are a winner.')
    resetStacks();
  }
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
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
