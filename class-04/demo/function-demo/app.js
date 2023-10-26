'use strict';




// resusable block of code
// relation between inputs and outputs









// what is a function?
// function declaration
function sayHello(){
  console.log('hello world');
}





// invoke or call a function
sayHello();

function doAnything(theThing) {
  // let theThing = "play frizbee"; //
  return "I will do this thing " + theThing;
}

doAnything("Drink espresso");

// when you declare a function you can have paramaters that give names to the function's inputs
function sayGoodBye(name){
  console.log('good bye ' + name);
}

// the data we pass into a function is called an argument
sayGoodBye('neo');

// to pass information back to the program use a return statment

function getFullName(firstName, secondName){
  return firstName + ' ' + secondName;
}

function getDefaultReturnValue() {
  // notice there is no explicit return statement
  // what, if anything, do you think gets returned?
}

let mysteryValue = getDefaultReturnValue();
console.log(mysteryValue);

let ada = getFullName('ada', 'lovelace');
console.log('ada: ' + ada);

function yesOrNoPrompt(promptInfo){
  let userInput = prompt(promptInfo);
  if (userInput === 'yess'){
    console.log('hurray');
  } else if ( userInput === 'no'){
    console.log('nope');
  } else if (userInput === 'mabe'){
    console.log('make up your mind');
  } else {
    console.log('ERROR: incorrect usage');
  }


}

yesOrNoPrompt('Do you like pineapples?');
