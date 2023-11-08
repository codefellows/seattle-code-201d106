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

/////////////////////
// Functions
/////////////////////
function Goat(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
}

function loadGoats() {
  const storedGoatText = localStorage.getItem(goatStorageKey);
  if (storedGoatText) {
    parseStoredGoats(storedGoatText);
  } else {
    initGoats();
  }
}

function parseStoredGoats(goatText) {
  allGoats.length = 0;
  const objects = JSON.parse(goatText);
  for (let goatObject of objects) {
    const goatInstance = new Goat(goatObject.name, goatObject.src, goatObject.clicks, goatObject.views);
    allGoats.push(goatInstance);
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

  // see if clickCtr has reached max
  if (clickCtr == maxClicks) {
    endVoting();
  } else {

    // handle case of unlucky leftover
    let leftOver = null;
    if (workingGoats.length == 1) {
      leftOver = workingGoats[0];
    }

    if (workingGoats.length <= 1) {
      workingGoats = allGoats.slice();
      shuffleArray(workingGoats);

      if (leftOver) {
        removeItem(workingGoats, leftOver);
        workingGoats.push(leftOver);
      }
    }

    leftGoatInstance = workingGoats.pop(); // retrieves AND removes the last item
    leftGoatImage.setAttribute('src', leftGoatInstance.src);

    rightGoatInstance = workingGoats.pop();
    rightGoatImage.setAttribute('src', rightGoatInstance.src);

    leftGoatInstance.views += 1;
    rightGoatInstance.views += 1;
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
  const storageText = JSON.stringify(allGoats);
  localStorage.setItem(goatStorageKey, storageText);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
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
  // initGoats();
  loadGoats();
  initEventListeners();
  renderGoats();
}

/////////////////////
// Entry point
/////////////////////
start();
