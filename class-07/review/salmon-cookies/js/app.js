const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

const seattle = {
  location: 'Seattle',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerSale: 6.3,
  sales: [],
  estimate: function () {
    this.sales = estimateSales(this);
  },
}

const tokyo = {
  location: 'Tokyo',
  minCustomers: 3,
  maxCustomers: 18,
  avgCookiesPerSale: 2.3,
  sales: [],
  estimate: function () {
    this.sales = estimateSales(this);
  },
}

// initialize sales
seattle.estimate();
tokyo.estimate();

function estimateSales(store) {
  const sales = [];
  for (let i = 0; i < hours.length; i++) {
    const numCustomers = randomInRange(store.minCustomers, store.maxCustomers);
    const hourSales = Math.ceil(numCustomers * store.avgCookiesPerSale);
    sales.push(hourSales);
  }
  return sales;
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const container = document.getElementById('root');

function render(store) {
  // need an article per cookie stand
  const cookieStandArticle = document.createElement('article');
  container.appendChild(cookieStandArticle);

  const heading = document.createElement('h2');
  cookieStandArticle.appendChild(heading);
  heading.textContent = store.location;

  const hoursList = document.createElement('ul');
  cookieStandArticle.appendChild(hoursList);

  let totalSold = 0;

  for (let i = 0; i < store.sales.length; i++) {
    const salesItem = document.createElement('li');
    hoursList.appendChild(salesItem);
    const cookiesSoldThisHour = store.sales[i];
    totalSold += cookiesSoldThisHour;
    const salesInfo = `${hours[i]}: ${cookiesSoldThisHour} cookies`;
    salesItem.textContent = salesInfo;
  }

  // add total line
  const totalItem = document.createElement('li');
  hoursList.appendChild(totalItem);
  const totalInfo = `Total: ${totalSold} cookies sold`;
  totalItem.textContent = totalInfo;

}

render(seattle);
render(tokyo);











