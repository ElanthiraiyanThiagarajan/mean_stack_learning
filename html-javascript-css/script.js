// Sample product data (replace with your actual product data)
var products = [
    {
      id: 1,
      name: "Product 1",
      category: "appetizer",
      price: 10,
      rating: 4,
      image: "product1.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: 2,
      name: "Product 2",
      category: "main-course",
      price: 20,
      rating: 3,
      image: "product2.jpg",
      description: "Nulla facilisi. Aenean consectetur luctus nisi sed aliquet."
    },
    // Add more product objects as needed
  ];
  
  var cartItems = [];
  
  // Function to display all products
  function displayProducts() {
    var productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    products.forEach(function(product) {
      var productCard = document.createElement("div");
      productCard.className = "col-md-6 product-card";
  
      var card = document.createElement("div");
      card.className = "card";
  
      var image = document.createElement("img");
      image.src = product.image;
      image.className = "card-img-top";
      card.appendChild(image);
  
      var cardBody = document.createElement("div");
      cardBody.className = "card-body";
  
      var productName = document.createElement("h5");
      productName.className = "card-title";
      productName.textContent = product.name;
      cardBody.appendChild(productName);
  
      var productDesc = document.createElement("p");
      productDesc.className = "card-text";
      productDesc.textContent = product.description;
      cardBody.appendChild(productDesc);
  
      var productPrice = document.createElement("p");
      productPrice.className = "card-text";
      productPrice.innerHTML = "Price: $" + product.price;
      cardBody.appendChild(productPrice);
  
      var addToCartBtn = document.createElement("button");
      addToCartBtn.className = "btn btn-primary";
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.addEventListener("click", function() {
        addToCart(product);
      });
      cardBody.appendChild(addToCartBtn);
  
      card.appendChild(cardBody);
      productCard.appendChild(card);
      productList.appendChild(productCard);
    });
  }
  
  // Function to filter products based on category, price, and rating
  function filterProducts() {
    var category = document.getElementById("category").value;
    var price = document.getElementById("price").value;
    var rating = document.getElementById("rating").value;
  
    var filteredProducts = products.filter(function(product) {
      return (
        (category === "" || product.category === category) &&
        (price === "" || (product.price >= Number(price.split("-")[0]) && product.price <= Number(price.split("-")[1]))) &&
        (rating === "" || product.rating === Number(rating))
      );
    });
  
    displayProducts(filteredProducts);
  }
  
  // Function to add a product to the cart
  function addToCart(product) {
    var existingCartItem = cartItems.find(function(item) {
      return item.product.id === product.id;
    });
  
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      cartItems.push({
        product: product,
        quantity: 1
      });
    }
  
    updateCart();
  }
  
  // Function to update the cart UI
  function updateCart() {
    var cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";
  
    cartItems.forEach(function(item) {
      var cartItem = document.createElement("li");
      cartItem.className = "cart-item";
  
      var itemDetails = document.createElement("div");
      itemDetails.className = "item-details";
  
      var itemName = document.createElement("span");
      itemName.className = "item-name";
      itemName.textContent = item.product.name;
      itemDetails.appendChild(itemName);
  
      var itemPrice = document.createElement("span");
      itemPrice.className = "item-price";
      itemPrice.textContent = "$" + item.product.price;
      itemDetails.appendChild(itemPrice);
  
      var itemQuantity = document.createElement("span");
      itemQuantity.className = "item-quantity";
      itemQuantity.textContent = "Quantity: " + item.quantity;
      itemDetails.appendChild(itemQuantity);
  
      var itemActions = document.createElement("span");
      itemActions.className = "item-actions";
  
      var increaseQtyBtn = document.createElement("button");
      increaseQtyBtn.className = "btn btn-sm btn-primary";
      increaseQtyBtn.textContent = "+";
      increaseQtyBtn.addEventListener("click", function() {
        increaseQuantity(item);
      });
      itemActions.appendChild(increaseQtyBtn);
  
      var decreaseQtyBtn = document.createElement("button");
      decreaseQtyBtn.className = "btn btn-sm btn-danger";
      decreaseQtyBtn.textContent = "-";
      decreaseQtyBtn.addEventListener("click", function() {
        decreaseQuantity(item);
      });
      itemActions.appendChild(decreaseQtyBtn);
  
      itemDetails.appendChild(itemActions);
      cartItem.appendChild(itemDetails);
      cartItemsList.appendChild(cartItem);
    });
  
    updateCartTotal();
  }
  
  // Function to increase quantity of a cart item
  function increaseQuantity(item) {
    item.quantity++;
    updateCart();
  }
  
  // Function to decrease quantity of a cart item
  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cartItems = cartItems.filter(function(cartItem) {
        return cartItem !== item;
      });
    }
  
    updateCart();
  }
  
  // Function to update the cart total
  function updateCartTotal() {
    var cartTotal = 0;
  
    cartItems.forEach(function(item) {
      cartTotal += item.product.price * item.quantity;
    });
  
    document.getElementById("cart-total").textContent = "$" + cartTotal;
  }
  
  // Function to handle checkout
  function checkout() {
    // Implement your checkout logic here
    // This function can redirect to a payment gateway or submit the order to a server
  
    alert("Order placed successfully!");
  }
  
  // Initial display of all products
  displayProducts();
  