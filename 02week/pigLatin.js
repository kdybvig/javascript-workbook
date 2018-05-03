'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(word) {
  const trimLow = (str) => str.trim().toLowerCase(); //totally unnecessary but...
  word = trimLow(word) //I wasn't sure how else to add a second function in such a simple program
const noRegEx =() => {
      for (let i=0;i<word.length; i++) {
    if (['a','e','i','o','u'].indexOf(word.charAt(i)) > -1)return i;
    } // str.search would have been better here if we were allowed to use regular expressions
  }
  if (!noRegEx()) return word +'yay'; //if the vowel is in the first character add yay
  return word.slice(noRegEx()) + word.slice(0,noRegEx()) + 'ay'; //otherwise start with the first vowel, add the part before the vowel, then add ay
}

/* I wrote a four line solution but it used regEx and didn't contain two sub functions.
This version can no longer change a phrase into pig latin or deal with special characters,
but I suppose that was outside of the scope of the assignment*/

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
