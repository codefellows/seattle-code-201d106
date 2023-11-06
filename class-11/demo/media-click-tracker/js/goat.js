'use strict';

let workingGoats = [];
const allGoats = [];
const leftGoatImage = document.querySelector('section img:first-child');
const rightGoatImage = document.querySelector('section img:nth-child(2)');
const viewResults = document.querySelector('div');
const ulElem = document.querySelector('ul');
let leftGoatInstance = null;
let rightGoatInstance = null;
let clickCtr = 0;
const maxClicks = 9;


function Goat(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}


let cruising = new Goat('Cruising Goat', './images/cruisin-goat.jpg');
let float = new Goat('Float Your Goat', './images/float-your-goat.jpg');
let hand = new Goat('Goat Out of Hand', './images/goat-out-of-hand.jpg');
let kissing = new Goat('Kissing Goat', './images/kissing-goat.jpg');
let sassy = new Goat('Sassy Goat', './images/sassy-goat.jpg');
let smiling = new Goat('Smiling Goat', './images/smiling-goat.jpg');
let sweater = new Goat('Sweater Goat', './images/sweater-goat.jpg');

allGoats.push(cruising);
allGoats.push(float);
allGoats.push(hand);
allGoats.push(kissing);
allGoats.push(sassy);
allGoats.push(smiling);
allGoats.push(sweater);


function renderGoats() {

  // see if clickCtr has reached max
  if(clickCtr == maxClicks) {
    // now make viewResults clickable
    viewResults.addEventListener('click', handleViewResultsClick);

    // also, disable the left and right imgs
    leftGoatImage.removeEventListener('click', handleLeftGoatClick);
    rightGoatImage.removeEventListener('click', handleRightGoatClick);
  }

  // show first goat in left img
  // show second goat in right img

  if(workingGoats.length <= 1) {
    workingGoats = allGoats.slice();
    shuffleArray(workingGoats);
  }

  leftGoatInstance = workingGoats.pop(); // retrieves AND removes the last item
  leftGoatImage.setAttribute('src', leftGoatInstance.src);

  rightGoatInstance = workingGoats.pop();
  rightGoatImage.setAttribute('src', rightGoatInstance.src);

  leftGoatInstance.views += 1;
  rightGoatInstance.views += 1;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function handleLeftGoatClick() {
  leftGoatInstance.clicks += 1;
  clickCtr += 1;
  renderGoats();
}

function handleRightGoatClick() {
  rightGoatInstance.clicks += 1;
  clickCtr += 1;
  renderGoats();
}

function handleViewResultsClick() {
  renderResults();
}

leftGoatImage.addEventListener('click', handleLeftGoatClick);
rightGoatImage.addEventListener('click', handleRightGoatClick);



renderGoats();

function renderResults() {
  for(let i=0; i<allGoats.length; i++) {
    const currentGoat = allGoats[i];
    const result = `${currentGoat.name} had ${currentGoat.views} views and was clicked ${currentGoat.clicks} times.`;
    // console.log(result);
    const liElem = document.createElement('li');
    ulElem.appendChild(liElem);
    liElem.textContent = result;
  }
}
