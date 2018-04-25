'use strict';
function dateAndTime(){
  const x = new Date();
  const day = x.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "November", "December"]
  const month = months[x.getMonth()]
  const year = x.getYear() + 1900;
  let hour = x.getHours();
  const min = x.getMinutes();
  let amPm;
  if (hour > 12) {
    hour -= 12;
    amPm = 'pm';} else {
      amPm = 'am';
    }
  const dateStr = month + " " + day + ", " + year + "  " + hour + ":" + min +amPm;
  return dateStr;
}

// used new Date to create a date object
// used getYear, getMonth, getDay, getHours, getMinutes,  methods to get the year, month, day, hours, and minutes

function numToStr(num) {
  return num.toString();
}

//passed the function a number as a parameter
//used the toString method to change the number to a string

function strToNum(str) {
  return Number(str);
}

//passed the function a string as a parameter
// used the Number method to convert the str to a number

function findDataType(input) {
  return typeof input;
}
//passed the function one parameter
//used typeof method to determine the data type of the parameter
function sumNums(x, y) {
  return x + y;
}
//passed the function two numbers
//used + to add the numbers

function bothTrue (foo, bar) {
  if (foo && bar) {
    return foo + " and " + bar + " are both true."
  }
}
//used two parameters to test if they are both true
//directions: program that runs only when 2 things are true... not certain if interpreted the meaning correctly.  Used && operator to test if both parameters are true.

function inclusiveOr (foo, bar) {
  if (foo || bar) {
    return "Either " + foo + " or " + bar + " is true, or they are both true.";
  }
}
//used two parameters of any type to check for truthiness
//used inclusive or || to check if one or more of the two parameters are true

function bothFalse (foo, bar) {
  if (!foo && !bar) {
    return "Both " +foo + " and " + bar + " are false."
  }
}

//used two parameters of any type to check for truthiness
// used ! and && to check if both parameters are not true.
