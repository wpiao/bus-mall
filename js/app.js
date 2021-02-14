'use strict';

// global variable
const allProducts = [];
let totalClicks = 0;
let votesAllowed = 25;
let imgSection = document.querySelector('section');
let firstProduct = document.querySelector('section img:first-child');
let secondProduct = document.querySelectorAll('section img')[1];
let thirdProduct = document.querySelector('section img:last-child');
let myButton = document.querySelector('div');

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
  let holdingArr = [];
  function getThreeUniqIndexes() { // push three uniq indexes to holdingArr
    for (let i = 0; i < 3; i++) {
      let randomIndex = getRandomIndex();
      while (holdingArr.includes(randomIndex)) {
        randomIndex = getRandomIndex();
      }
      holdingArr.push(randomIndex);
    }
  }

  function renderEachProduct(img, index) {
    img.src = allProducts[holdingArr[index]].src;
    img.title = allProducts[holdingArr[index]].name;
    allProducts[holdingArr[index]].views++;
  }

  getThreeUniqIndexes(); // now holdingArr holds three uniq indexes
  renderEachProduct(firstProduct, 0);
  renderEachProduct(secondProduct, 1);
  renderEachProduct(thirdProduct, 2);
}

function handleClick(e) {
  totalClicks++;
  if (totalClicks === votesAllowed + 1) {
    imgSection.removeEventListener('click', handleClick);
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

function renderResult() {
  let myList = document.querySelector('ul');
  for (let product of allProducts) {
    let li = document.createElement('li');
    li.textContent = `${product.name} had ${product.clicks} votes, and was seen ${product.views} times.`;
    myList.appendChild(li);
  }
}

function handleButtonClick() {
  if (totalClicks === votesAllowed + 1) {
    renderResult();
  }
}

renderProducts();
imgSection.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);
