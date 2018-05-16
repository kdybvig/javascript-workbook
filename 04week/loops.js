// for loop for carsInReverse
const carsInReverse = ['Toyota', 'Ford', 'Honda', 'Chevy', 'BMW', 'Audi'];
for (let i = 0; i < carsInReverse.length; i++) {
  console.log(carsInReverse[i]);
}

const persons = {
  firstName: 'Jane',
  lastName: 'Doe',
  birthDate: 'Jan 5, 1925',
  gender: 'female'
}

//for...in loop to log each key
for (const key in persons) {
  console.log('key:',key);
}

//for...in loop + if state to log birthDate value
for (const key in persons) {
  if (key === 'birthDate') console.log('birth date:',persons[key])
}

//while loop to count from 1 to 1000
let count = 1;
while (count < 1001) {
  console.log(count);
  count ++;
};

//do...while loop to count from 1 to 1000
count = 1
do {
  console.log(count);
  count++;
} while (count < 1001);

/*
When is a for loop better than a while loop?
Generally, a for loop is better than a while loop
when the number of iterations is fixed, such as when
iterating over the values in an array.  A while loop
is more useful when a code will run over an unknown
number of iterations until a stop condition is met.

A for loop can also run code until a stop condition is met
after an unknown number of iterations, but a while loop
will be much more readable for this type of condition.

Also, generally while loops tend to be a little easier
to read, but with a while loop it is easier to accidentally
create an infinite loop.
*/

/*
What is the difference between a for loop and a for...in loop?
A for...in loop iterates over all of the elements in an object, but
in a non-sequential order.  A for...in loop can only be used for objects
(including arrays), whereas a for loop can be used for many different
purposes.  A for...in loop is a more convenient way to iterate over all
the properties in an object than a for loop due to the fact that the
properties in an object.
*/

/*
What is the difference between a while loop and a do...while loop?
A while loop only executes the code contained in the loop while the given
condition is met.  A do while loop always executes the code contained in
the loop once, and then afterwards continues to execute the code in the
loop until the condition is met.
*/
