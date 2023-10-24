'use strict';

let timeToQuit = false;
let name = 'jb'; // remember in lab directions about toUpperCase toLowerCase

if (timeToQuit) {
  alert('Quitting time');
}

if (name === 'JB') {
  alert('Yes, it is JB');
} else if (name === 'jb') {
  alert('Yes (pretty much) it is JB');
} else {
  alert('Not JB');
}

switch (name) {
case 'JB':
  alert('yep');
  break;
case 'DeAndre':
  alert('nope, but heard he\'s a great dev');
  break;
default:
  alert('never heard of them');
}
