'use strict';

/////////////////////
// Globals
/////////////////////
const allGoats = [];
const leftGoatImage = document.querySelector('section img:first-child');
const rightGoatImage = document.querySelector('section img:nth-child(2)');
const viewResultsButton = document.getElementById('viewResultsBtn');
const ulElem = document.querySelector('ul');
const maxClicks = 9;
const goatStorageKey = 'goat-storage-key';

let clickCtr = 0;
let workingGoats = [];
let leftGoatInstance = null;
let rightGoatInstance = null;
let selector = null;

/////////////////////
// Constructors
/////////////////////
function Goat(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
}

function Selector(arr, limit = 2) {
  this.allItems = arr;
  this.workingItems = [];
  this.previousRound = [];
  this.limit = limit;
}
Selector.prototype.shuffle = function (array) {
  // Fisher Yates via Chat GPT
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

Selector.prototype.select = function () {

  // collect values for the next round
  let nextRound = [];

  if (this.workingItems.length >= this.limit) {

    // we have enough items in working list to do the next round
    while (nextRound.length < this.limit) {
      nextRound.push(this.workingItems.pop());
    }

  } else { // we don't have enough values in working list to do the next round

    // if we have any leftovers then make sure they are in next round
    nextRound = this.workingItems.slice();

    // make list of any values that must NOT be selected for next round
    // aka any values already in the next round plus any values in previous round
    const rejects = nextRound.concat(this.previousRound);

    // now make a list of acceptable values for next round
    const goodies = [];
    for (let value of this.allItems) {
      if (!rejects.includes(value)) {
        goodies.push(value);
      }
    }

    // shuffle the goodies
    this.shuffle(goodies);

    // fill up the next round list if needed
    while (nextRound.length < this.limit) {
      nextRound.push(goodies.pop());
    }

    // the working list should now be the goodies + the rejects at the end
    // they're not rejects any more but they must be at end
    // to avoid potential duplicates with previous round
    this.workingItems = goodies.concat(rejects);
  }

  // reset the previous round now that next round is has completed
  this.previousRound = nextRound;

  return nextRound;
}

/////////////////////
// Functions
/////////////////////
function loadGoats() {

  const storedGoatsText = localStorage.getItem(goatStorageKey);

  if(storedGoatsText) {
    parseStoredGoats(storedGoatsText);
  } else {
    initGoats();
  }

  selector = new Selector(allGoats, 2);
}

function parseStoredGoats(storedGoatsText) {
  // restore from storage
  const storedGoatObjects = JSON.parse(storedGoatsText);

  allGoats.length = 0;

  for(let goatObject of storedGoatObjects) {
    const currentGoat = new Goat(goatObject.name, goatObject.src, goatObject.views, goatObject.clicks);
    allGoats.push(currentGoat);
  }
}

function initGoats() {
  const cruising = new Goat('Cruising Goat', './images/cruisin-goat.jpg');
  const float = new Goat('Float Your Goat', './images/float-your-goat.jpg');
  const hand = new Goat('Goat Out of Hand', './images/goat-out-of-hand.jpg');
  const kissing = new Goat('Kissing Goat', './images/kissing-goat.jpg');
  const sassy = new Goat('Sassy Goat', './images/sassy-goat.jpg');
  const smiling = new Goat('Smiling Goat', './images/smiling-goat.jpg');
  const sweater = new Goat('Sweater Goat', './images/sweater-goat.jpg');

  allGoats.push(cruising);
  allGoats.push(float);
  allGoats.push(hand);
  allGoats.push(kissing);
  allGoats.push(sassy);
  allGoats.push(smiling);
  allGoats.push(sweater);
}

function renderGoats() {
  if (clickCtr === maxClicks) {
    endVoting();
  } else {
    nextRound();
  }
}

function endVoting() {
  // now make viewResults clickable
  viewResultsButton.hidden = false;
  viewResultsButton.addEventListener('click', handleViewResultsClick);
  viewResultsButton.classList.add('clicks-allowed');

  // also, disable the left and right imgs
  leftGoatImage.removeEventListener('click', handleLeftGoatClick);
  rightGoatImage.removeEventListener('click', handleRightGoatClick);

  // tell styling that voting is over
  document.querySelector('section').classList.add('no-voting');

  saveGoats();

}

function saveGoats() {
  localStorage.setItem(goatStorageKey, JSON.stringify(allGoats));
}

function nextRound() {

  const selectedGoats = selector.select();

  leftGoatInstance = selectedGoats[0];
  leftGoatImage.setAttribute('src', leftGoatInstance.src);

  rightGoatInstance = selectedGoats[1];
  rightGoatImage.setAttribute('src', rightGoatInstance.src);

  leftGoatInstance.views += 1;
  rightGoatInstance.views += 1;
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
  renderChart();
}

function initEventListeners() {
  leftGoatImage.addEventListener('click', handleLeftGoatClick);
  rightGoatImage.addEventListener('click', handleRightGoatClick);
}

function renderChart() {

  const goatNames = [];
  const goatLikes = [];
  const goatViews = [];

  for (let i = 0; i < allGoats.length; i++) {
    const currentGoat = allGoats[i];
    const goatName = currentGoat.name;
    const goatLikeCount = currentGoat.clicks;
    const goatViewCount = currentGoat.views;

    goatNames.push(goatName);
    goatLikes.push(goatLikeCount);
    goatViews.push(goatViewCount);

  }

  /* refer to Chart.js > Chart Types > Bar Chart:
  https://www.chartjs.org/docs/latest/charts/bar.html
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */
  const data = {
    labels: goatNames,
    datasets: [{
      label: 'Likes',
      data: goatLikes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: goatViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}

function start() {
  loadGoats();
  initEventListeners();
  renderGoats();
}

/////////////////////
// Entry point
/////////////////////
start();

/////////////////////
// testing example
// Pro Tip: move to separate JS file
/////////////////////
function testSelection() {
  const testSelector = new Selector([1, 2, 3, 4, 5, 6, 7], 3);
  for (let i = 0; i < 10000; i++) {
    const previous = testSelector.previousRound;
    const current = testSelector.select();
    for (let currentValue of current) {
      if (previous.includes(currentValue)) {
        console.error('Oh noes!!!');
        return;
      }
    }
  }
  console.log('TESTS PASSED!!!')
}

testSelection();



