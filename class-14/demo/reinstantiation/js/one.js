'use strict';

if (localStorage.cats) {
  const catsFromLS = JSON.parse(localStorage.cats);
  // catsFromLS is now an array of generic objects
  for (let i = 0; i < catsFromLS.length; i++) {
    let newCat = new Cat(catsFromLS[i].name);
    state.allCats.push(newCat);
    state.allCats[i].render();
  }
}

catform.addEventListener('submit', handleCatSubmit);
