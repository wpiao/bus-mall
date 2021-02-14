'use strict';

// global variable
const allProducts = [];
let firstProduct = document.querySelector('section img:first-child');
let secondProduct = document.querySelectorAll('section img')[1];
let thirdProduct = document.querySelector('section img:last-child');

// constructor function to make each product
function Product(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExt}`;
  this.views = 0;
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

renderProducts();
// console.log(allProducts);
