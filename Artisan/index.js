const hamburger = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");
const searchInput = document.querySelector("input[type='text']");
const searchButton = document.querySelector("button");
const navLinks = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  if (
    event.target !== sidebar &&
    event.target.parentNode !== sidebar &&
    !event.target.classList.contains("hamburger-menu") &&
    sidebar.classList.contains("active")
  ) {
    sidebar.classList.remove("active");
  }
});

searchButton.addEventListener("click", function () {
  searchInput.classList.toggle("active");
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    sidebar.classList.remove("active");
  });
});

var galleryCards = document.querySelectorAll('.gallery-card');
var prevButton = document.querySelector('.gallery-prev');
var nextButton = document.querySelector('.gallery-next');
var currentIndex = 0;

showCards();

function showCards() {
  for (var i = 0; i < galleryCards.length; i++) {
    galleryCards[i].classList.add('hidden');
  }
  for (var i = currentIndex; i < currentIndex + 3; i++) {
    if (galleryCards[i]) {
      galleryCards[i].classList.remove('hidden');
    }
  }
}

// prevButton.addEventListener('click', function() {
//   currentIndex--;
//   if (currentIndex < 0) {
//     currentIndex = galleryCards.length - 3;
//   }
//   showCards();
// });

// nextButton.addEventListener('click', function() {
//   currentIndex++;
//   if (currentIndex > galleryCards.length - 3) {
//     currentIndex = 0;
//   }
//   showCards();
// });

for (var i = 0; i < galleryCards.length; i++) {
  galleryCards[i].addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
}

// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
}else {
  ready();
}

// Making Function
function ready(){
  // Remove Items From Cart
  var reomveCartButtons = document.getElementsByClassName('cart-remove')
  console.log(reomveCartButtons)
  for (var i = 0; i < reomveCartButtons.length; i++) {
    var button = reomveCartButtons[i]
    button.addEventListener("click", removeCartItem)
  }
  // Quantity Changes
  var quantityInputs = document.getElementsByClassName('cart-quantity')
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
  // Add to Cart
  var addCart = document.getElementsByClassName('add-cart')
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener('click', addCartClicked)
  }
  // Buy Button Work
  document
  .getElementsByClassName('btn-buy')[0]
  .addEventListener('click', buyButtonClicked);
}
// But Button
function buyButtonClicked(){
  alert('Your Order is placed')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updatetotal()
}

// Remove Items From Cart
function removeCartItem (event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
// Quantity Changes
function quantityChanged (event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updatetotal();
}
// Add To cart
function addCartClicked(event){
  var button = event.target
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText
  var price = shopProducts.getElementsByClassName('price')[0].innerText
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src
  addProductToCart(title,price,productImg)
  updatetotal();
}
function addProductToCart(title,price,productImg){
  var cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName('cart-content')[0]
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
  for (var i = 0; i < cartItemsNames.length; i++){
    if (cartItemsNames[i].innerText == title) {
    alert("You have already add this item to cart");
    return;
  }
}
var cartBoxContent = `
                        <img src="${productImg}" class="cart-img">
                        <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove cart  -->
                        <img class="cart-remove" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIJJREFUSEvtldENgCAMRB+b6ShOok6mo7iJpomRBC0VA3613829cgUu0LhCY33eADpgUQaZgSk3pAXIiYvuBgzAqkFSwF7Jskv3d0ClA0QZbQdfrbrpOSDdmVtk3mK3yC2KDjT/iyTBJGxKSkKnN5/22SDiYwFETTYrMktO8NjbHHAA6kwZGXDWtewAAAAASUVORK5CYII="/>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

}

// Update Total 
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace("$", ""))
    var quantity = quantityElement.value 
    total = total + (price * quantity);
  }
    // If price Contain some Cents value
    total = Math.round(total * 100) /100;

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
  
}

