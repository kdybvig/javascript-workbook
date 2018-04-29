'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(word) {
  word = word.toLowerCase().trim(); //trims word (or phrase) and lower cases lettes
  if (/\s/.test(word)) { //checks if the word is actually a phrase (has spaces)
    const wordArr = word.split(' '); //if so, splits the phrase into words
    const pigLatinArr = [];
    for (let i=0; i<wordArr.length; i++) {
      if(/[a-z]/.test(wordArr[i])) {
  pigLatinArr.push(pigLatin(wordArr[i])) //should I re-write my code to do this without recursion?
}
} //changes each word (words must include at least one letter) to pig latin and pushes the words into an array
    return pigLatinArr.join(' ') //joins the array as a phrase

  }
  const vowels = ['a','e','i','o','u']; //list of vowels
  const isVowel = (char) => vowels.indexOf(char) > -1; //checks if first character is a vowel
  const firstToLast = (arr) => {
    const first = arr.shift();
    arr.push(first);
    return arr;
  } // moves the first element of an array to the last position
  const charArr = word.split(''); // splits the word into an array of characters
  let letterArr = charArr.filter(char => /[a-z]/.test(char)); //filters out all non-letter characters
  if (isVowel(letterArr[0]))return letterArr.join('') + 'yay'; //if the first letter is a vowel returns the word + yay
  for (let i=0; i< letterArr.length; i++) {
    letterArr = firstToLast(letterArr);
    if (isVowel(letterArr[0])) break;
  } //keeps moving the first letter to the end of the letter array until the first letter is a vowel
  return letterArr.join('') + 'ay'; //adds ay to the word if the first letter was not a vowel
}

/* I used regular expressions in this code, but only for my extra features of filtering out non-letter characters
and translating phrases/sentences. */

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
