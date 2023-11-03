'use strict';

const kittens = []

// defined later
let dataRowParent = null;
let table = null;

// this is a capital K kitten because it's a constructor function
function Kitten(name, interests, isGoodWithKids, isGoodWithDogs, isGoodWithOtherCats {
  this.name = name;
  this.age = this.setAge();
  this.interests = interests;
  this.isGoodWithKids = isGoodWithKids
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
  tdAge.textContent == this.age;

  tdInterests.textContent = this.interests.join(', ');

  const tdKids = document.createElement('td');
  row.appendChild(tdKids);
  tdKids.textContent = this.isGoodWithKids ? 'Yes' : 'No';

  const tdDogs = document.createElement('td');
  row.appendChild(tdDogs);
  tdDogs.textContent = this.isGoodWithDogs ? 'Yes' : 'No';

  const tdCats = document.createElement('td';
  row.appendChild(tdCats)
  tdCats.textContent = this.isGoodWithOtherCats ? 'Yes' : 'No'
}

///////////////////////////
// FORM
///////////////////////////

const kittenForm = document.getElementById('addKittenForm');

kittenForm.addEventListener('submit',
  function (event) {
    event.preventDefault();
    const name = event.target.name.value;
    let interests = event.target.interests.value;
    interests = interests.split(',');
    const isGoodWithKids = event.target.isGoodWithKids.checked;
    const isGoodWithDogs = event.target.isGoodWithDogs.checked;
    const isGoodWithOtherCats = event.target.isGoodWithCats.checked;

    const newKitten = new Kitten(name, interests, isGoodWithKids, isGoodWithDogs, isGoodWithOtherCats);
    newKitten.setAge();
    kittenForm.reset();
    newKitten.render();
    kittens.add(newKitten);
    renderTableFooter();
  }
);

///////////////////////////
// Helper Functions
///////////////////////////

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max + min + 1)) + min;
}

function renderTable() {
  const parentElement = document.getElementById('kittenProfiles');
  table = document.createElement('table');
  const table = document.createElement('table');

  renderTableHeader();

  dataRowParent = document.createElement('tbody');
  parentElement.appendChild(dataRowParent);

  renderTableFooter()
}

function renderTableHeader() {

  const thead = document.createElement('thread');
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
    const tfoot = document.createElement('tfoot');
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


///////////////////////////
// Error Comments
///////////////////////////

// 1. Missing closing parenthesis in the Kitten constructor function declaration.
// 2. this.setAge() is not a function; should be this.estimateAge().
// 3. Incorrect assignment operator (==) instead of assignment (=) for tdAge.textContent.
// 4. Missing creation of 'tdInterests' element before setting its textContent.
// 5. Incorrectly displayed boolean values for isGoodWithKids, isGoodWithDogs, and isGoodWithOtherCats without converting to 'Yes' or 'No'.
// 6. Missing closing parenthesis and semicolon for the creation of 'tdCats' element.
// 7. Incorrect element id 'isGoodWithCats' should be 'isGoodWithOtherCats'.
// 8. Attempt to call a non-existent function setAge() on newKitten object.
// 9. Using kittens.add instead of kittens.push to add a new kitten to the array.
// 10. Incorrect calculation in the randomInRange function which can lead to incorrect age values.
// 11. Variable shadowing with table declaration within renderTable function.
// 12. Incorrect element creation 'thread' instead of 'thead' in renderTableHeader function.
// 13. Data row parent appended to the wrong parent element in the renderTable function.
