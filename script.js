let cart = [];

function addToCart(item, price) {

  let existing = cart.find(food => food.item === item);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      item: item,
      price: price,
      qty: 1
    });
  }

  updateCart();
}


function updateCart() {

  let cartBox = document.getElementById("cart-items");
  let totalBox = document.getElementById("total");

  if (!cartBox) return;

  cartBox.innerHTML = "";

  let total = 0;

  cart.forEach((food,index)=>{

    total += food.price * food.qty;

    cartBox.innerHTML += `
    <div class="cart-item">
      <span>${food.item} x ${food.qty}</span>
      <span>₹${food.price * food.qty}</span>
    </div>
    `;

  });


  totalBox.innerHTML = "Total: ₹" + total;

}


/* WhatsApp Order */

function orderWhatsApp(){

let name = document.getElementById("customer-name").value;
let phone = document.getElementById("customer-phone").value;

if(cart.length === 0){
alert("Please add items to cart");
return;
}

let message = "🍽️ *Dockyard Le Bistro Order*%0A%0A";

message += "Customer Name: " + name + "%0A";
message += "Phone: " + phone + "%0A%0A";

let total = 0;

cart.forEach(food=>{

message += food.item + 
" x " + food.qty + 
" = ₹" + (food.price * food.qty) + "%0A";

total += food.price * food.qty;

});


message += "%0A*Total Amount: ₹" + total + "*";


let url =
"https://wa.me/917626845853?text=" + message;


window.open(url,"_blank");

}



/* UPI Payment */

function payNow(){

let total = 0;

cart.forEach(food=>{
total += food.price * food.qty;
});


if(total === 0){
alert("Please add items first");
return;
}


let upi =
"upi://pay?pa=Q051599316@ybl&pn=Dockyard%20Le%20Bistro&am="
+ total +
"&cu=INR";


window.location.href = r
  <button onclick="addToCart('Aloo Kulcha',70)">
Add to Cart
</button>
  <button class="whatsapp-btn" onclick="orderWhatsApp()">
Order on WhatsApp
</button>
  <button class="pay-btn" onclick="payNow()">
Pay Now
</button>
