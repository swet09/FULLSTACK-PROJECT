/**
 * This cartController Java Script is used to provide the functionalities of cart in Orders page.
 */
angular.module('cartController', [])

.controller('cartCtrl',function(){

  var removeCartItemButtons = document.getElementsByClassName('btn-danger');

  /** 
   * Event listener for Remove button in cart 
  */

    var i;
    var removeButtonLength = removeCartItemButtons.length;
    for (i = 0; i < removeButtonLength; i++) 
    {
      var button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem)
    }
  
    /** 
     * Event Listener for Quantity field in cart 
     */

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
      for (var i = 0; i < quantityInputs.length; i++) 
      {
          var input = quantityInputs[i]
          input.addEventListener('change', quantityChanged)
      }
  
    /**
     * Adding Event Listener for Menu items Add To cart button
     */
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
      for(var i =0 ; i<addToCartButtons.length; i++)
      {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
      }
  
    /**
     * When clicked purchace route to another page displaying card payment information
     */

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
  
  
  /**
   * Method that will be invoked when final purchace butto is clicked
   */
    function purchaseClicked(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var len = cartRows.length;
  
    //if no item in cart and tries to purchace

    if(len == 0)
    {
      alert("your cart is empty! Add items to purchase");
      return;
    }
    else
    {
      var cartItems = document.getElementsByClassName('cart-items')[0]; 
      var cartItemNames = document.getElementsByClassName('cart-item-title');
      while(cartItems.hasChildNodes())
      {
        cartItems.removeChild(cartItems.firstChild);
      }
   
    updateCartTotal();
    
   window.location.assign('/checkout');
    }
    
  }

  /**
   * This method removes the item from the cart when remove button is clicked
   * @param {Event} event 
   */
  function removeCartItem(event)
  {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }
  
  /**
   * This method is called when quantity in cart elements are being updated.
   * And checks for minimum Quantity (1). It does not allow user to make the Quantiy 0 or less
   * @param {Event} event 
   */
  function quantityChanged(event) 
  {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) 
    {
        input.value = 1
        alert("minimum cart value is 1");
    }
    updateCartTotal()
  }

  /**
   * This method will be called when Item is added.
   * This method adds the Item title, Price and Quantity to cart
   * @param {Event} event 
   */
  function addToCartClicked(event) 
  {
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
    addItemToCart(title, price, qty)
    updateCartTotal()
  }
  
  /**
   * This method adds a html div inside the HTML page. and checks 
   * if the item already exsists or not
   * @param {String} title 
   * @param {String} price 
   * @param {String} qty 
   */
  function addItemToCart(title, price, qty)
  {
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
  
  /**
   * Whenever an Item is added or removed or quantity is altered, 
   * the Cart total will be updated.
   */
  function updateCartTotal()
  {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i=0; i<cartRows.length; i++)
    {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('cart-price')[0];
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
  }
  

});