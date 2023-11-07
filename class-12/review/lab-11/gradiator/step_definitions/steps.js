'use strict';

const assert = require('assert');
const checkImages = require('../helpers/check-images.js');
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

const { I } = inject();

Given('I am on the home page', () => {
  I.amOnPage('/');
});

Then('I should see {int} different products on the page', async (num) => {
  const renderedImages = await I.grabAttributeFrom({ xpath: '//img' }, 'src');
  const images = checkImages(renderedImages);
  assert.strictEqual(images.count, num);
});

When('I click an img', () => {
  I.click('img');
});

Then('I should still see {int} products', async (num) => {
  const renderedImages = await I.grabAttributeFrom({ xpath: '//img' }, 'src');
  const images = checkImages(renderedImages);
  assert.strictEqual(images.count, num);
});

When('{int} images are clicked', (int) => {
  I.amOnPage('/');
  for (let i = 0; i < int; i++) {
    I.click('img');
  }
});

When('I click {string}', (buttonText) => {
  I.click(buttonText);
});

Then('results are displayed', () => {
  productNames.forEach(productName => {
    I.see(productName);
  });
});
