function showProfile() {
  debugger;
  catalyst.auth.isUserAuthenticated().then(result => {
      document.body.style.visibility = "visible";
      const first_name = "First Name: " + result.content.first_name;
      document.getElementById("fname").innerHTML = first_name;
      const last_name = "Last Name: " + result.content.last_name;
      document.getElementById("lname").innerHTML = last_name;
      const mailid = "Email Address: " + result.content.email_id;
      document.getElementById("mailid").innerHTML = mailid;
      const tzone = "Time Zone: " + result.content.time_zone;
      document.getElementById("tzone").innerHTML = tzone;
      const created_time = " Joined On: " + result.content.created_time;
      document.getElementById("ctime").innerHTML = created_time;
  }).catch(err => {
      document.body.style.visibility = "visible";
      document.body.innerHTML = 'You are not logged in. Please log in to continue. Redirecting you to the login page..';
      setTimeout(function () {
          window.location.href = "/__catalyst/auth/login";
      }, 5000);
  });
}

function logout() {
  const redirectURL = location.protocol + "//" + location.hostname + "/app/index.html";
  catalyst.auth.signOut(redirectURL);
}

function showOrders() {
  const orders = [
      {
          id: 1,
          product: "Laptop",
          image: "images/hp laptop.png", // Replace with the URL of the laptop image
          quantity: 1,
          price: 1200
      },
      {
          id: 2,
          product: "Headphones",
          image: "images/dell laptop.png", // Replace with the URL of the headphones image
          quantity: 2,
          price: 100
      },
      {
          id: 3,
          product: "Mouse",
          image: "images/acer laptop.png", // Replace with the URL of the mouse image
          quantity: 1,
          price: 20
      }
  ];

  const ordersContainer = document.getElementById("orders-container");

  orders.forEach(order => {
      const orderCard = document.createElement("div");
      orderCard.classList.add("order-card");

      const image = document.createElement("img");
      image.src = order.image;
      image.alt = order.product;

      const orderId = document.createElement("p");
      orderId.textContent = "Order ID: " + order.id;

      const productName = document.createElement("p");
      productName.textContent = "Product: " + order.product;

      const quantity = document.createElement("p");
      quantity.textContent = "Quantity: " + order.quantity;

      const price = document.createElement("p");
      price.textContent = "Price: $" + order.price;

      orderCard.appendChild(image);
      orderCard.appendChild(orderId);
      orderCard.appendChild(productName);
      orderCard.appendChild(quantity);
      orderCard.appendChild(price);

      ordersContainer.appendChild(orderCard);
  });
}
