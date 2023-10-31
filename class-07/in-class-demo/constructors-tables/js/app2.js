const seattleLiteral = {
  location: 'Seattle',
  minCustomers: 4,
  maxCustomers: 7,
  avgCookiesSoldPerHour: 2.3,
}

function CookieStand(location, minCustomers, maxCustomers, avgCookiesSoldPerHour) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesSoldPerHour = avgCookiesSoldPerHour;
  this.sales = this.estimate();
}

CookieStand.prototype.estimate = function() {
  // WARNING: not what you really need
  return [6,7,8,9];
}

// methods go on the prototype

const seattleWithConstructor = new CookieStand('Seattle',4,8,2.3);


