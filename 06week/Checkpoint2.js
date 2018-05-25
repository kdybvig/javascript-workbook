/* code plan
To change strings to a number I could use parseInt or Number.  I will use Number
 because it is more efficient for this task. I am creating a new array with one
 new value for every orignal value, so I will use the map method.

To sum the evens I will use the reduce method.  I will use a callback function
that returns the number plus the current sum if the number is even, or just the
current sum if the number is odd.  I don't want to start the accumulator at the
first value (1) because it is not even, so I will need to use the optional
initial value parameter and set it equal to zero.

For numCount I could use a for loop to create all of the keys from 0-9, but the
code will look easier to read and require less memory if I manually input the
numbers from 0-9 and set all of their values to 0.  I will call the
Array.prototype.forEach() method on strNums because I need strings in order to
access the key values of the numCount object.  For each string number I will
increment the value of the corresponding key in numCount using bracket notation.

For atxIdx I am looking for the index of the number and not the number itself,
so I will use the Array.prototype.findIndex() method instead of the
Array.prototype.find() method.  In the callback function, I will use two
parameters, number and index.  Inside I will need to return true the first time
the number plus the index is equal to 512 in order for the
Array.prototype.findIndex() to return the correct index, so I will return
num + index === 512.
*/

'use strict'

const strNums = ["1","4","1","5","9","2","6","5","3","5","8","9","7","9","3","2","3","8","4","6","2","6","4","3","3","8","3","2","7","9","5","0","2","8","8","4","1","9","7","1","6","9","3","9","9","3","7","5","1","0","5","8","2","0","9","7","4","9","4","4","5","9","2","3","0","7","8","1","6","4","0","6","2","8","6","2","0","8","9","9","8","6","2","8","0","3","4","8","2","5","3","4","2","1","1","7","0","6","7","9","8","2","1","4","8","0","8","6","5","1","3","2","8","2","3","0","6","6","4","7","0","9","3","8","4","4","6","0","9","5","5","0","5","8","2","2","3","1","7","2","5","3","5","9","4","0","8","1","2","8","4","8","1","1","1","7","4","5","0","2","8","4","1","0","2","7","0","1","9","3","8","5","2","1","1","0","5","5","5","9","6","4","4","6","2","2","9","4","8","9","5","4","9","3","0","3","8","1","9","6","4","4","2","8","8","1","0","9","7","5","6","6","5","9","3","3","4","4","6","1","2","8","4","7","5","6","4","8","2","3","3","7","8","6","7","8","3","1","6","5","2","7","1","2","0","1","9","0","9","1","4","5","6","4","8","5","6","6","9","2","3","4","6","0","3","4","8","6","1","0","4","5","4","3","2","6","6","4","8","2","1","3","3","9","3","6","0","7","2","6","0","2","4","9","1","4","1","2","7","3","7","2","4","5","8","7","0","0","6","6","0","6","3","1","5","5","8","8","1","7","4","8","8","1","5","2","0","9","2","0","9","6","2","8","2","9","2","5","4","0","9","1","7","1","5","3","6","4","3","6","7","8","9","2","5","9","0","3","6","0","0","1","1","3","3","0","5","3","0","5","4","8","8","2","0","4","6","6","5","2","1","3","8","4","1","4","6","9","5","1","9","4","1","5","1","1","6","0","9","4","3","3","0","5","7","2","7","0","3","6","5","7","5","9","5","9","1","9","5","3","0","9","2","1","8","6","1","1","7","3","8","1","9","3","2","6","1","1","7","9","3","1","0","5","1","1","8","5","4","8","0","7","4","4","6","2","3","7","9","9","6","2","7","4","9","5","6","7","3","5","1","8","8","5","7","5","2","7","2","4","8","9","1","2","2","7","9","3","8","1","8","3","0","1","1","9","4","9","1","2","9","8","3","3","6","7","3","3","6","2","4","4","0","6","5","6","6","4","3","0","8","6","0","2","1","3","9","4","9","4","6","3","9","5","2","2","4","7","3","7","1","9","0","7","0","2","1","7","9","8","6","0","9","4","3","7","0","2","7","7","0","5","3","9","2","1","7","1","7","6","2","9","3","1","7","6","7","5","2","3","8","4","6","7","4","8","1","8","4","6","7","6","6","9","4","0","5","1","3","2","0","0","0","5","6","8","1","2","7","1","4","5","2","6","3","5","6","0","8","2","7","7","8","5","7","7","1","3","4","2","7","5","7","7","8","9","6","0","9","1","7","3","6","3","7","1","7","8","7","2","1","4","6","8","4","4","0","9","0","1","2","2","4","9","5","3","4","3","0","1","4","6","5","4","9","5","8","5","3","7","1","0","5","0","7","9","2","2","7","9","6","8","9","2","5","8","9","2","3","5","4","2","0","1","9","9","5","6","1","1","2","1","2","9","0","2","1","9","6","0","8","6","4","0","3","4","4","1","8","1","5","9","8","1","3","6","2","9","7","7","4","7","7","1","3","0","9","9","6","0","5","1","8","7","0","7","2","1","1","3","4","9","9","9","9","9","9","8","3","7","2","9","7","8","0","4","9","9","5","1","0","5","9","7","3","1","7","3","2","8","1","6","0","9","6","3","1","8","5","9","5","0","2","4","4","5","9","4","5","5","3","4","6","9","0","8","3","0","2","6","4","2","5","2","2","3","0","8","2","5","3","3","4","4","6","8","5","0","3","5","2","6","1","9","3","1","1","8","8","1","7","1","0","1","0","0","0","3","1","3","7","8","3","8","7","5","2","8","8","6","5","8","7","5","3","3","2","0","8","3","8","1","4","2","0","6","1","7","1","7","7","6","6","9","1","4","7","3","0","3","5","9","8","2","5","3","4","9","0","4","2","8","7","5","5","4","6","8","7","3","1","1","5","9","5","6","2","8","6","3","8","8","2","3","5","3","7","8","7","5","9","3","7","5","1","9","5","7","7","8","1","8","5","7","7","8","0","5","3","2","1","7","1","2","2","6","8","0","6","6","1","3","0","0","1","9","2","7","8","7","6","6","1","1","1","9","5","9","0","9","2","1","6","4","2","0","1","9","8","9"];

// Given 1000 digits of PI as strings, return an array of the digits as numbers
const nums = strNums.map(str => Number(str)) //new array of 1000 numbers

// Find the sum of the even values
const sumEvens = nums.reduce((currentSum, newNumber) => {
  if(newNumber%2 === 0) return currentSum + newNumber //for evens add the number to the sum
  return currentSum //for odds keep the current sum
},0)

console.log(sumEvens);

// Return an object with counts for each number. The key
// should indicate the number and the value should indicate
// how many occurrences that number has in the pi array.

// for example, the array ['2','5','5','7'] would produce
// the following object
// {
//   0: 0,
//   1: 0,
//   2: 1,
//   3: 0,
//   4: 0,
//   5: 2,
//   6: 0,
//   7: 1,
// }
//
// create a similar object for the pi array.

const numCount = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0
};

/* add one to the value of the corresponding key each time a number appears in
the first 1000 digits of pi*/
strNums.forEach(strNum => numCount[strNum]++)


console.log(numCount)


//Find the index of the first "Austin" value (the value plus its index equals 512)
//findIndex returns the index of the first truthy output of the callback function
const atxIdx = nums.findIndex((num, index) => num + index === 512 )

console.log(`index: ${atxIdx}, value: ${nums[atxIdx]}`);



const assert = require('assert');

// Tests
if (typeof describe === 'function') {
  describe('nums', () => {
    it('should contain numbers', () => {
      assert.equal(typeof nums[512], 'number');
    });
    it('should have 1000 elements', () => {
      assert.equal(nums.length, 1000);
    });
  });

  describe('sumEvens', () => {
    it('should equal 1950', () => {
      assert.equal(sumEvens, 1950);
    });
  });
  describe('numCount', () => {
    it('should have 10 keys', () => {
      assert.equal(Object.keys(numCount).length, 10);
    });
    it('should correctly count the appearances of each digit', () => {
      assert.equal(numCount['0'], 93);
      assert.equal(numCount['5'], 97);
      assert.equal(numCount['7'], 95);
    });
  });
  describe('atxIdx', () => {
    it('should equal the index of the first "Austin" value ', () => {
      assert.equal(atxIdx + nums[atxIdx], 512);
    });
  });
}
