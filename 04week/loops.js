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
