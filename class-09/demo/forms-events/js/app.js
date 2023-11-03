// problem domain: the Seattle Kitten Rescue has tons of kittens who need good homes. One of the best ways to reach prospective adoptive homes is to have profiles for each kitten available on a website. There are hundreds of kittens, though, and only a few volunteers; it's too time-consuming to hand-code each kitten's profile on their website. They need a better way.

'use strict';

const kittens = [];

// defined later
let dataRowParent = null;
let table = null;

// this is a capital K kitten because it's a constructor function
function Kitten (name, interests, isGoodWithKids, isGoodWithDogs, isGoodWithOtherCats) {
  this.name = name;
  this.age = this.estimateAge();
  this.interests = interests;
  this.isGoodWithKids = isGoodWithKids;
  this.isGoodWithDogs = isGoodWithDogs;
  this.isGoodWithOtherCats = isGoodWithOtherCats;
}

Kitten.prototype.estimateAge = function() {
  return randomInRange(3, 12)
};

Kitten.prototype.render = function() {
  const row = document.createElement('tr');
  dataRowParent.appendChild(row);

  const tdName = document.createElement('td');
  row.appendChild(tdName);
  tdName.textContent = this.name;

  const tdAge = document.createElement('td');
  row.appendChild(tdAge);
  tdAge.textContent = this.age;

  const tdInterests = document.createElement('td');
  row.appendChild(tdInterests);
  tdInterests.textContent = this.interests.join();

  const tdKids = document.createElement('td');
  row.appendChild(tdKids);
  tdKids.textContent = this.isGoodWithKids;

  const tdDogs = document.createElement('td');
  row.appendChild(tdDogs);
  tdDogs.textContent = this.isGoodWithDogs;

  const tdCats = document.createElement('td');
  row.appendChild(tdCats);
  tdCats.textContent = this.isGoodWithOtherCats;
}


///////////////////////////
// FORM
///////////////////////////

const kittenForm = document.getElementById('addKittenForm');

// event listeners need to know: what event do they care about, and what do they want to do when it happens.
kittenForm.addEventListener('submit',
  function (event) {
    event.preventDefault();
    const name = event.target.name.value;
    let interests = event.target.interests.value;
    interests = interests.split(',');
    const isGoodWithKids = event.target.isGoodWithKids.checked;
    const isGoodWithDogs = event.target.isGoodWithDogs.checked;
    const isGoodWithOtherCats = event.target.isGoodWithOtherCats.checked;

    const newKitten = new Kitten(name, interests, isGoodWithKids, isGoodWithDogs, isGoodWithOtherCats);
    newKitten.estimateAge();
    kittenForm.reset();
    newKitten.render();
    kittens.push(newKitten);
    renderTableFooter();
  }
);

///////////////////////////
// Helper Functions
///////////////////////////

function randomInRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderTable() {
  const parentElement = document.getElementById('kittenProfiles');
  table = document.createElement('table');
  parentElement.appendChild(table);

  renderTableHeader();

  dataRowParent = document.createElement('tbody');
  table.appendChild(dataRowParent);

  renderTableFooter()
}

function renderTableHeader() {

  const thead = document.createElement('thead');
  table.appendChild(thead);

  const row = document.createElement('tr');
  thead.appendChild(row);

  const thName = document.createElement('th');
  row.appendChild(thName);
  thName.textContent = 'Name';

  const thAge = document.createElement('th');
  row.appendChild(thAge);
  thAge.textContent = 'Age in months';

  const thInterests = document.createElement('th');
  row.appendChild(thInterests);
  thInterests.textContent = 'Interests';

  const thKids = document.createElement('th');
  row.appendChild(thKids);
  thKids.textContent = 'Good With Kids';

  const thDogs = document.createElement('th');
  row.appendChild(thDogs);
  thDogs.textContent = 'Good With Dogs';

  const thCats = document.createElement('th');
  row.appendChild(thCats);
  thCats.textContent = 'Good With Other Cats';
}

function renderTableFooter() {
  // Since the footer row now needs to be able to render repeatedly
  // then we need to empty it out if it has already rendered

  let tfoot = document.querySelector('tfoot');

  if(tfoot) {
    tfoot.innerHTML = ""; // removes all children of existing tfoot
  } else {
    tfoot = document.createElement('tfoot');
    table.appendChild(tfoot);
  }

  const row = document.createElement('tr');
  tfoot.appendChild(row);

  const kittenCountCell = document.createElement('th');
  row.appendChild(kittenCountCell);
  kittenCountCell.textContent = "Kitten Count: " + kittens.length;
  kittenCountCell.setAttribute('colspan',3);
  kittenCountCell.classList = ['text-left'];

  let ageSum = 0;
  for(let i=0; i<kittens.length; i++) {
    const currentKitten = kittens[i];
    ageSum += currentKitten.age;
  }


  const averageAge = ageSum / kittens.length || 0;
  const averageAgeCell = document.createElement('th');
  row.appendChild(averageAgeCell);
  averageAgeCell.textContent = 'Average age: ' + averageAge;
  averageAgeCell.setAttribute('colspan', 3);
  averageAgeCell.classList = ['text-left'];
}

///////////////////////////
// start app
///////////////////////////

renderTable();
