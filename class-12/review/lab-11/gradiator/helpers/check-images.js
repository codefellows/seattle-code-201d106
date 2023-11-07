const assert = require('assert');

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

module.exports = (imgUrls) => {
  const results = { count: 0, matches: [] }

  productNames.forEach(name => {
    const match = imgUrls.filter(url => url.includes('/' + name));
    if (match.length) {
      results.count += 1;
      results.matches.push(name);
      assert.strictEqual(1, match.length);
    }
  });

  return results;
}
