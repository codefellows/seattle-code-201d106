'use strict';

// global varriables

let goatContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let clicks = 0;
let maxClicksAllowed = 9;
let uniqueImageCount = 4;

// State object holds the holds the current state of the application (all allGoatsArray and indexArray)
const state = {
  allGoatsArray: [],
  indexArray: [],
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
  while (state.indexArray.length < uniqueImageCount) {
    let randomNumber = getRandomNumber();
    if (!state.indexArray.includes(randomNumber)) {
      state.indexArray.push(randomNumber);
    }
  }
  /* refer to goat-array-includes.png in the facilitator/whiteboard-diagrams folder for a visualization of this */
  console.log(state.indexArray);

  let goat1 = state.indexArray.shift();
  let goat2 = state.indexArray.shift();

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
    goatContainer.className = 'no-voting';
    renderChart();
  } else {
    renderGoats();
  }
}

function renderChart() {
  let goatNames = [];
  let goatLikes = [];
  let goatViews = [];

  for (let i = 0; i < state.allGoatsArray.length; i++) {
    goatNames.push(state.allGoatsArray[i].name);
    goatLikes.push(state.allGoatsArray[i].clicks);
    goatViews.push(state.allGoatsArray[i].views);
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

// executable code

let cruisin = new Goat('Cruising Goat', './images/cruisin-goat.jpg');
let floatGoat = new Goat('Float Your Goat', './images/float-your-goat.jpg');
let hand = new Goat('Goat Out of Hand', './images/goat-out-of-hand.jpg');
let kissing = new Goat('Kissing Goat', './images/kissing-goat.jpg');
let sassy = new Goat('Sassy Goat', './images/sassy-goat.jpg');
let smiling = new Goat('Smiling Goat', './images/smiling-goat.jpg');
let sweater = new Goat('Sweater Goat', './images/sweater-goat.jpg');
state.allGoatsArray.push(cruisin, floatGoat, hand, kissing, sassy, smiling, sweater);

renderGoats();

goatContainer.addEventListener('click', handleGoatClick);
