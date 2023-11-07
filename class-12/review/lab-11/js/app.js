'use strict';

const leftImg = document.getElementById('img1');
const middleImg = document.getElementById('img2');
const rightImg = document.getElementById('img3');
const viewResultsButton = document.getElementById('showResults');
const resultsSection = document.getElementById('results');
const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];
const allProducts = [];
const maxRounds = 25;
let workingProducts = [];
let leftProduct = null;
let middleProduct = null;
let rightProduct = null;
let roundCtr = 0;


function Product(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.views = 0;
}

function initProducts() {
  for (let productName of productNames) {
    const productInstance = new Product(productName, `imgs/${productName}.jpg`);
    allProducts.push(productInstance);
  }
}

function renderProducts() {

  if(roundCtr == maxRounds) {
    endVoting();
  } else {
    roundCtr += 1;
  }

  if (workingProducts.length < 3) {
    workingProducts = allProducts.slice();
    shuffleArray(workingProducts);
  }

  leftProduct = workingProducts.pop();
  middleProduct = workingProducts.pop();
  rightProduct = workingProducts.pop();

  leftImg.setAttribute('src', leftProduct.src);
  middleImg.setAttribute('src', middleProduct.src);
  rightImg.setAttribute('src', rightProduct.src);

  leftProduct.views += 1;
  middleProduct.views += 1;
  rightProduct.views += 1;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function handleLeftImgClick() {
  leftProduct.votes += 1;
  renderProducts();
}
function handleMiddleImgClick() {
  middleProduct.votes += 1;
  renderProducts();
}
function handleRightImgClick() {
  rightProduct.votes += 1;
  renderProducts();
}

function endVoting() {
  viewResultsButton.hidden = false;
  leftImg.removeEventListener('click', handleLeftImgClick);
  middleImg.removeEventListener('click', handleMiddleImgClick);
  rightImg.removeEventListener('click', handleRighImgClick);
}

function handleViewResultsClick() {
  resultsSection.innerHTML = '';
  const ul = document.createElement('ul');
  resultsSection.appendChild(ul);
  for(let product of allProducts) {
    const li = document.createElement('li');
    ul.appendChild(li);
    const result = `${product.name} was viewed ${product.views} times and voted for ${product.votes} times.`;
    li.textContent = result;
  }
}

function initEventListeners() {
  leftImg.addEventListener('click', handleLeftImgClick);
  middleImg.addEventListener('click', handleMiddleImgClick);
  rightImg.addEventListener('click', handleRightImgClick);
  viewResultsButton.addEventListener('click', handleViewResultsClick);
}

function start() {
  initProducts();
  initEventListeners();
  renderProducts();
}

start();

