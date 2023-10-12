'use strict';

//global Variables
CookieStand.totalHourArray = [];
CookieStand.storeForm = document.getElementById('storeForm');
CookieStand.standsTable = document.getElementById('standsTable');
//all are props of CoookieS

// State object holds the holds the current state of the application (all existing CookieStands and Location Refs)
const state = {
  allCookieStands: [],
  allLocationsRef: [],
};

//TODO add no maximum lower than minimum if(min > max) {return alert('min must be less than max')}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function CookieStand(name, minCustomers, maxCustomers, aveCookies){
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.aveCookies = aveCookies;
  this.openTime = 6;
  this.closeTime = 21;
  this.hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
  this.cookieSoldArray = [];
  this.cookieSoldTable = [];
  this.sumCookieSold = 0;
  this.randRate();
  this.createHourlyRateTable();
}


CookieStand.prototype.randRate = function(){
  for(let i = 0; i < (this.closeTime - this.openTime); i++){
    this.cookieSoldArray.push(Math.floor(this.aveCookies * (Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers)));
  };
  this.cookieSoldTotal = 0;
  for(i in this.cookieSoldArray){
    this.cookieSoldTotal += this.cookieSoldArray[i];
  }
  this.cookieSoldArray.push(this.cookieSoldTotal);
};

CookieStand.prototype.createHourlyRateTable = function(){
  this.trEl = document.createElement('tr');
  CookieStand.standsTable.appendChild(this.trEl);
  let locCSArray = this.cookieSoldArray.slice(0);
  // this.cookieSoldArray.unshift(this.name);

  for(let i = 0; i < locCSArray.length; i++){
    this.tdEl = document.createElement('td');
    this.tdEl.textContent = locCSArray[i];
    this.trEl.appendChild(this.tdEl);
  }
};

let makeHeaderRow = function(){
  let hoursLocal = ['Store', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];
  let trEl = document.createElement('tr');
  for(let i = 0; i < hoursLocal.length; i++){
    let thEl = document.createElement('th');
    thEl.textContent = hoursLocal[i];
    trEl.appendChild(thEl);
  };
  CookieStand.standsTable.appendChild(trEl);
};

makeHeaderRow();

let pike = new CookieStand('Pike', 23, 65, 6.3);
let seaTac = new CookieStand('SeaTac', 3, 24, 1.2);
let seattleCenter = new CookieStand('Seattle Center', 11, 38, 3.7 );
let capHill = new CookieStand('Capitol Hill', 20, 38, 2.3);
let alki = new CookieStand('Alki', 2, 16, 4.6);
state.allCookieStands.push(pike, seaTac, seattleCenter, capHill, alki);
state.allLocationsRef.push(pike.name, seaTac.name, seattleCenter.name, capHill.name, alki.name);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//new Location function
//function to re-render table
function renderTable(){
  CookieStand.standsTable.innerHTML = null;
  makeHeaderRow();
  for(let i in state.allCookieStands){
    state.allCookieStands[i].createHourlyRateTable();
  }
  sumColumns();
}

// // helper functions
// CookieStand.newElement = function(type, content, parent){
//   let newEl = document.createElement(type);
// };

function handleLocationSubmit(event) {
  event.preventDefault();
  // form validation
  let name = event.target.name.value;
  let minCustomers = parseInt(event.target.minCustomers.value);
  let maxCustomers = parseInt(event.target.maxCustomers.value);
  let aveCookies = parseInt(event.target.aveCookies.value);

  if(state.allLocationsRef.indexOf(name) > -1){
    state.allCookieStands[state.allLocationsRef.indexOf(name)].minCustomers = minCustomers;
    state.allCookieStands[state.allLocationsRef.indexOf(name)].maxCustomers = maxCustomers;
    state.allCookieStands[state.allLocationsRef.indexOf(name)].aveCookies = aveCookies;
    state.allCookieStands[state.allLocationsRef.indexOf(name)].cookieSoldArray = [];
    state.allCookieStands[state.allLocationsRef.indexOf(name)].randRate();
    renderTable();
    return;
  }

  let newCookieStand = new CookieStand(name,minCustomers,maxCustomers, aveCookies);
  state.allCookieStands.push(newCookieStand);
  state.allLocationsRef.push(newCookieStand);

  event.target.name.value = null;
  event.target.minCustomers.value = null;
  event.target.maxCustomers.value = null;
  event.target.aveCookies.value = null;
  renderTable();
};

CookieStand.storeForm.addEventListener('submit', handleLocationSubmit);


//end table construction adds
let sumColumns = function(){
  CookieStand.totalHourArray = [];
  for(let j = -1; j < state.allCookieStands[0].cookieSoldArray.length ; j++){
    let hourTotal = 0;
    for(let k in state.allCookieStands){
      hourTotal = hourTotal + state.allCookieStands[k].cookieSoldArray[j];
    };
    CookieStand.totalHourArray.push(hourTotal);
  };
  let trEl = document.createElement('tr');
  CookieStand.standsTable.appendChild(trEl);
  for (let i in CookieStand.totalHourArray){
    let tdEl = document.createElement('td');
    if(i == 0){
      tdEl.textContent = 'Total';
    }else{
      tdEl.textContent = CookieStand.totalHourArray[i];
    };
    trEl.appendChild(tdEl);
  };
};
sumColumns();

//img carousel
