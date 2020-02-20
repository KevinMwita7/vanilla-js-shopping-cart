function appendChildren() {
    var products = [{"id":"0","src":"./public/images/1.jpg","title":"Books, Stationery and Accessories","initialPrice":"300","discountedPrice":"100"},{"id":"1","src":"./public/images/2.jpg","title":"Meal Plan","initialPrice":"50","discountedPrice":"15"},{"id":"2","src":"./public/images/3.jpg","title":"Musical Instruments","initialPrice":"500","discountedPrice":"200"},{"id":"3","src":"./public/images/4.jpg","title":"Plants Shopping","initialPrice":"100","discountedPrice":"65"},{"id":"4","src":"./public/images/5.jpg","title":"Decoration Material","initialPrice":"400","discountedPrice":"300"},{"id":"5","src":"./public/images/6.jpg","title":"Website Development","initialPrice":"1000","discountedPrice":"500"},{"id":"6","src":"./public/images/7.jpg","title":"Mexican Food","initialPrice":"70","discountedPrice":"45"},{"id":"7","src":"./public/images/8.jpg","title":"Sports Accessories","initialPrice":"800","discountedPrice":"499"}];    
    var header = document.getElementById('header');
    header.innerHTML = '<div class="navigation"></div>';
    var navigation = document.getElementsByClassName('navigation')[0];
    navigation.innerHTML = '<div class="container flex-items justify-content"></div>';
    navigation.innerHTML += '<a class="navigation-logo flex-items align-items" href="#"><img src="./logo.png" class="logo"/></a>';
    navigation.innerHTML += '<img src="./public/images/cart.png" class="cart-icon"/>';
    var parent = document.getElementById('content');
    parent.innerHTML = '<div class="container"></div>';
    var container = document.getElementsByClassName('container')[1];
    container.innerHTML = '<h1 class="text-align-center title">University of Houston E-Shopping</h1>';
    container.innerHTML += '<div class="row"></div>';
    var row = document.getElementsByClassName('row')[0];
    var i = 0;
    var productItems = '';
    for(i; i < products.length; ++i) {
            productItems += '<div class="col-md-4">' +
            '<div class="card mb-4">' +
            '<img class="product-img" src="' + products[i].src + '" alt="'+ products[i].title + '"/>'+
            '<div class="card-body">' +
            '<h3 class="productTitle">' + products[i].title + '</h3>'+
            '<img class="ratings" src="./public/images/ratings.png"/>'+
            '<div class="flex-items justify-content align-items">' +
            '<span class="text-align-left line-through text-red currentPrice"> $' + products[i].initialPrice + '</span>'+
            '<span class="text-align-right"> $' + products[i].discountedPrice + '</span>'+
            '</div>' +
            '<button class="btn mt-4 addToCart">Add to shopping cart</button>'+
            '</div>'+
            '</div>'+
            '</div>';
    }
    row.innerHTML = productItems;

    var cart = document.getElementById('cart');
    var cartItems = document.createElement('ul');
    cartItems.classList.add('list-group');
    cartItems.classList.add('mb-3');
    cartItems.classList.add('cart-items-list');
    cartItems.innerHTML = '<li class="list-group-item flex-items justify-content">' +
                          '<button class="btn make-order">Order</button>'+
                          '</li>';
    cart.appendChild(cartItems);
    cart.style.display = 'none';
}

appendChildren();

function addEventListeners(className, attachEventCb) {
    var targetElements = document.getElementsByClassName(className);
    var i = 0;
    for (i; i < targetElements.length; ++i) {
        targetElements[i].addEventListener('click', attachEventCb);
    }
}

function addToCartCb(event) {
    var clickedBtn = event.target;
    var grandParentElement = clickedBtn.parentElement.parentElement;
    var parentElement = grandParentElement.getElementsByClassName('card-body')[0];
    var productImg = grandParentElement.getElementsByClassName('product-img')[0].src;
    var title = parentElement.getElementsByClassName('productTitle')[0].innerText;
    var price = parentElement.getElementsByClassName('currentPrice')[0].innerText;
    
    var cartItem = document.createElement('li');
    cartItem.classList.add('flex-items');
    cartItem.classList.add('justify-content');
    cartItem.classList.add('list-group-item');
    cartItem.classList.add('cart-item');

    var row = document.createElement('div');
    row.classList.add('row');
    cartItem.appendChild(row);

    row.innerHTML = '<img src='+ productImg +' class="col-md-3"/>' +
                                             '<span class="col-md-3">'+ title +'</span>'+
                                             '<span class="col-md-3">'+ price +'</span>'+
                                             '<button class="col-md-3 removeFromCart">x</span>';
    document.getElementsByClassName('cart-items-list')[0].prepend(cartItem);
    removeFromCartEventListener();
}

addEventListeners('addToCart', addToCartCb);

function hideShowCart() {
    var cart = document.getElementById('cart');
    if(window.getComputedStyle(cart).display === 'none') {
        cart.style.cssText = "position: absolute; top: 7.5%; right: 5%; display: ''";
    }else {
        cart.style.display = 'none';
    }
}

addEventListeners('cart-icon', hideShowCart);

function makeOrder(event) {
    var cartItems = document.getElementsByClassName('cart-items-list')[0];
    var cartItemsChildren = cartItems.children;
    var i = cartItemsChildren.length - 2;
    for(i ; i > -1; --i) {
        cartItemsChildren[i].parentElement.removeChild(cartItemsChildren[i]);
    }
    alert('Thanks for shopping with us');
}

addEventListeners('make-order', makeOrder);

function removeFromCartEventListener() {
    var btn = document.getElementsByClassName('removeFromCart')[0];
    var cartItems = document.getElementsByClassName('cart-items-list')[0];
    btn.addEventListener('click', function() {
        cartItems.removeChild(btn.parentElement.parentElement);
    });
}