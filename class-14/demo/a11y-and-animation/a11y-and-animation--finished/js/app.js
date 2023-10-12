'use strict';

const cta = document.querySelector('div.cta');
const results = document.getElementById('results');

function handleClick() {
  let newSection = document.createElement('section');
  newSection.setAttribute('class', 'deals');
  results.appendChild(newSection);

  // headline
  let headline = document.createElement('h3')
  headline.textContent = 'Today\'s Deal';
  newSection.appendChild(headline);

  // image
  let image = document.createElement('img');
  image.src = 'img/peppermint-bark.jpg';
  image.alt = 'today\'s candy deal';
  newSection.appendChild(image);

  // photo credit text
  let pTagCredit = document.createElement('p');
  pTagCredit.textContent = 'Photo by jim.choate59';
  newSection.appendChild(pTagCredit);

  // button
  let divBtn = document.createElement('div')
  divBtn.setAttribute('class', 'claim-deal');
  divBtn.textContent = 'Peppermint Bark is 30% off!';
  newSection.appendChild(divBtn);
}

cta.addEventListener('click', handleClick);

// !!!!! Add a keypress event listener
cta.addEventListener('keypress', handleClick);
