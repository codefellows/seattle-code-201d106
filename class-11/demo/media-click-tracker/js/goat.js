'use strict';

// global varriables

let goatContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let clicks = 0;
let maxClicksAllowed = 9;

// State object holds the holds the current state of the application (all existing Goats)
const state = {
  allGoatsArray: [],
};

// functional logic

function Goat(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.allGoatsArray.length);
}

function renderGoats() {
  // call the getRandomNumber
  let goat1 = getRandomNumber();
  let goat2 = getRandomNumber();

  while (goat1 === goat2) {
    goat2 = getRandomNumber();
  }
  image1.src = state.allGoatsArray[goat1].src;
  image2.src = state.allGoatsArray[goat2].src;
  image1.alt = state.allGoatsArray[goat1].name;
  image2.alt = state.allGoatsArray[goat2].name;
  state.allGoatsArray[goat1].views++;
  state.allGoatsArray[goat2].views++;
}

function handleGoatClick(event) {
  if (event.target === goatContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickGoat = event.target.alt;
  for (let i = 0; i < state.allGoatsArray.length; i++) {
    if (clickGoat === state.allGoatsArray[i].name) {
      state.allGoatsArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    goatContainer.removeEventListener('click', handleGoatClick);
    // give the button an event lister and styles so the user
    // knows its an active button:
    resultButton.addEventListener('click', renderResults);
    resultButton.className = 'clicks-allowed';
    goatContainer.className = 'no-voting';
  } else {
    renderGoats();
  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < state.allGoatsArray.length; i++) {
    let li = document.createElement('li')
    li.textContent = `${state.allGoatsArray[i].name} had ${state.allGoatsArray[i].views} view and was clicked ${state.allGoatsArray[i].clicks} times.`;
    ul.appendChild(li);
  }
}

// executable code
let cruising = new Goat('Cruising Goat', './images/cruisin-goat.jpg');
let float = new Goat('Float Your Goat', './images/float-your-goat.jpg');
let hand = new Goat('Goat Out of Hand', './images/goat-out-of-hand.jpg');
let kissing = new Goat('Kissing Goat', './images/kissing-goat.jpg');
let sassy = new Goat('Sassy Goat', './images/sassy-goat.jpg');
let smiling = new Goat('Smiling Goat', './images/smiling-goat.jpg');
let sweater = new Goat('Sweater Goat', './images/sweater-goat.jpg');
state.allGoatsArray.push(cruising, float, hand, kissing, sassy, smiling, sweater);

renderGoats();

goatContainer.addEventListener('click', handleGoatClick);
