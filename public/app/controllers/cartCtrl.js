angular.module('cartController', [])

.controller('cartCtrl',function(){
  // console.log("hello cart!");
  // console.log("inside cart");
var removeCartItemButtons = document.getElementsByClassName('btn-danger');

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    //console.log('click');
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem)
  }
  
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
      for (var i = 0; i < quantityInputs.length; i++) {
          var input = quantityInputs[i]
          input.addEventListener('change', quantityChanged)
  }
  
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
      for(var i =0 ; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
      }
  
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
  
  function purchaseClicked(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var len = cartRows.length;
  
    if(len == 0)
    {
      alert("your cart is empty! Add items to purchase");
      return;
    }
    else
    {
      console.log(localStorage);
      alert("Thank you for your purchace");
    var cartItems = document.getElementsByClassName('cart-items')[0]; 
    var cartItemNames = document.getElementsByClassName('cart-item-title');
    //localStorage.setItem('title', cartItemNames[0].innerText);
    console.log('local storage = ', localStorage.getItem('title'));
    while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild);
    }
   
    updateCartTotal();
   // window.location.assign('./app/views/checkout.html');
    
   window.location.assign('/checkout');
    }
    
  }

  function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }
  
  function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
        alert("minimum cart value is 1");
    }
    updateCartTotal()
  }

  function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var qty = shopItem.getElementsByClassName('shop-item-qty')[0].value;
    if(isNaN(qty))
    {
      alert("select the quantity to add to cart, you can update the quantity later in cart.");
      return;
    }
    console.log(title, price, qty);
    addItemToCart(title, price, qty)
    updateCartTotal()
  }
  
  function addItemToCart(title, price, qty){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title');
    for(var i=0; i<cartItemNames.length; i++){
      if(cartItemNames[i].innerText == title){
        alert('This Item is already added to the cart');
        return
      }
    }
    localStorage.setItem('title', title);
    console.log(localStorage);
    console.log(localStorage.getItem('title'));
    var cartRowContents = `
                      <div class="cart-item cart-column" height="100">
                          <span class="cart-item-title">${title}</span>
                      </div>
                      <span class="cart-price cart-column">${price}</span>
                      <div class="cart-quantity cart-column">
                          <input class="cart-quantity-input" type="number" value="${qty}">
                          <button class="btn btn-danger" type="button">REMOVE</button>
                      </div>
    `
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  }
  
  function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i=0; i<cartRows.length; i++){
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('cart-price')[0];
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      //console.log(priceElement, quantityElement);
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
      //console.log(price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
  }
  

});