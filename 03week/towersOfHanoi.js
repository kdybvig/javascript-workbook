'use strict';

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
  const startArr = stacks[startStack];
  const endArr = stacks[endStack];
  endArr.push(startArr.pop());
  return [startArr, endArr]
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
  const stacksArr = movePiece(startStack, endStack);
  stacks[startStack] = stacksArr[0];
  stacks[endStack] = stacksArr[1];
  if (checkForWin()) {
    console.log ('Congrats!  You are a winner.')
    resetStacks();
    return;
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
