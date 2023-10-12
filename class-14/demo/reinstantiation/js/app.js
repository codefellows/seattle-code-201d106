'use strict';

const catform = document.getElementById('catform');
const catlist = document.getElementById('catlist');

// State object holds the holds the current state of the application (all existing Cats)
const state = {
  allCats: [],
};

function Cat(name){
  this.name = name;
  this.render = function(){
    const listItem = document.createElement('li');
    listItem.textContent = this.name;
    catlist.appendChild(listItem);
  };
}

function handleCatSubmit(e){
  e.preventDefault();
  const newCat = new Cat(e.target.kitteh.value);
  state.allCats.push(newCat);
  catform.reset();
  newCat.render();
  localStorage.cats = JSON.stringify(state.allCats);
  console.log('this is what is in local storage', localStorage.cats);
}
