'use strict';

// If conditional based confirm command
let answer1 = confirm('Are you ready to rumble?');
if (answer1 === true) {
  console.log('LET\'S GET READY TO RUMBLE!!!');
} else {
  console.log('Oh. Well then.');
}

// logical operator example
let first = true;
let second = false;
let third = true;

// And = both conditions have to be true
if (first && third) {
  console.log('first and third were both true');
} // only one of these have to be true
else if (first || second) {
  console.log('first or second was true!');
} // only third can be true
else if (third) {
  console.log('first and second were false, but third was true.');
} // none of the above conditions were true
else {
  console.log('Were any of my variables true?');
}

let color = prompt('What is your favorite color');

// convert the variable of color to lower case and evaluate it
switch (color.toLowerCase()) {
case 'red':
  console.log('Your favorite color was red!');
  break;
case 'blue':
  console.log('Your favorite color was blue!');
  break;
default:
  console.log('i don\'t know what your favorite color was ¯\\_(ツ)_/¯');
}
