'use strict';

// global variable
const allProducts = [];
const uniqIndexCount = 6;
const holdingArr = [];
const ctx = document.getElementById('myChart').getContext('2d');
let totalClicks = 0;
let votesAllowed = 25;
let imgSection = document.querySelector('section');
let firstProduct = document.querySelector('section img:first-child');
let secondProduct = document.querySelectorAll('section img')[1];
let thirdProduct = document.querySelector('section img:last-child');

// constructor function to make each product
function Product(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExt}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

// Instantiate all products
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  function getSixUniqIndexes() { // unshift six uniq indexes to holdingArr
    while (holdingArr.length < uniqIndexCount) {
      let randomIndex = getRandomIndex();
      while (holdingArr.includes(randomIndex)) {
        randomIndex = getRandomIndex();
      }
      holdingArr.unshift(randomIndex);
    }
  }

  function renderEachProduct(img, index) {
    img.src = allProducts[index].src;
    img.title = allProducts[index].name;
    allProducts[index].views++;
  }

  getSixUniqIndexes(); // now holdingArr holds six uniq indexes
  let firstProductIndex = holdingArr.pop();
  let secondProductIndex = holdingArr.pop();
  let thirdProductIndex = holdingArr.pop();
  renderEachProduct(firstProduct, firstProductIndex);
  renderEachProduct(secondProduct, secondProductIndex);
  renderEachProduct(thirdProduct, thirdProductIndex);
}

function handleClick(e) {
  totalClicks++;
  if (totalClicks === votesAllowed + 1) {
    imgSection.removeEventListener('click', handleClick);
    renderBarChart();
  } else {
    let productClicked = e.target.title;
    for (let product of allProducts) {
      if (product.name === productClicked) {
        product.clicks++;
        break;
      }
    }
    renderProducts();
  }
}

function renderBarChart() {
  const productNamesArr = [];
  const viewsArr = [];
  const clicksArr = [];

  for (let product of allProducts) {
    productNamesArr.push(product.name);
    viewsArr.push(product.views);
    clicksArr.push(product.clicks);
  }

  // create a bar chart
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNamesArr,
      datasets: [{
        label: '# of Views',
        data: viewsArr,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: clicksArr,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

renderProducts();
imgSection.addEventListener('click', handleClick);
