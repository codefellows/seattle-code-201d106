// problem domain: the Seattle Kitten Rescue has tons of kittens who need good homes. One of the best ways to reach prospective adoptive homes is to have profiles for each kitten available on a website. There are hundreds of kittens, though, and only a few volunteers; it's too time-consuming to hand-code each kitten's profile on their website. They need a better way.

// Each kitten's profile should have:
// - name
// - random age assigned
// - a list of what they like
// - an image
// good with kids
// good with dogs
// good with other cats
// breed

// TODO: dynamically generate kitten objects using form data

'use strict';

const frankie = {
  name: 'frankie',
  age: 0, // will be set soon
  interests: ['cuddling', 'chasing string', 'catnip'],
  generateAge: function () {
    this.age = randomAge(3, 12) + ' months';
  }
};
frankie.generateAge();
console.log(frankie);

const jumper = {
  name: 'jumper',
  age: 0, // will be set soon
  interests: ['stalking', 'pouncing', 'toying with prey'],
  generateAge: function () {
    this.age = randomAge(3, 18) + ' months';
  }
};
jumper.generateAge();
console.log(jumper);

// "standalone" functions can still be used
function randomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// we need to:
// get (from the DOM) who the parent element is going to be. where am I attaching this new element
const kittenContainerElement = document.getElementById('kittenProfiles');

function renderKitty(kitty) {
  // create a new element, or elements, that represents frankie
  // article
  // inside that article, h2 for the name, paragraph with their age, ul and some lis with their interests, image
  const article = document.createElement('article');
  kittenContainerElement.appendChild(article);

  const h2 = document.createElement('h2');
  h2.textContent = kitty.name;
  article.appendChild(h2);

  const p = document.createElement('p');
  p.textContent = kitty.name + ' is adorable, and is ' + kitty.age + ' old.';
  article.appendChild(p);

  const ul = document.createElement('ul');
  article.appendChild(ul);

  for (let i = 0; i < kitty.interests.length; i++) {
    const li = document.createElement('li');
    li.textContent = kitty.interests[i];
    ul.appendChild(li);
  }

  const img = document.createElement('img');
  img.setAttribute('src', 'images/' + kitty.name + '.jpeg');
  img.setAttribute('alt', 'cute picture of ' + kitty.name);
  article.appendChild(img);
}

renderKitty(frankie);
renderKitty(jumper);

