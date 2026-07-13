// ===========================
// DOCKYARD LE BISTRO
// SCRIPT PART 1
// ===========================

let cart = {};

const UPI_ID = "Q051599316@ybl";

// ADD ITEM
function addItem(name, price) {

    if (!cart[name]) {

        cart[name] = {
            price: Number(price),
            qty: 1,
            free: false,
            discount: 0
        };

    } else {

        cart[name].qty++;

    }

    checkOffers();
    updateCart();
    updateMenuButtons();

}


// REMOVE ITEM
function removeItem(name) {

    if (!cart[name]) return;

    cart[name].qty--;

    if (cart[name].qty <= 0) {
        delete cart[name];
    }

    checkOffers();
    updateCart();
    updateMenuButtons();

}



// UPDATE CART

function updateCart() {

    const cartBox = document.getElementById("cartItems");
    const totalBox = document.getElementById("total");

    if (!cartBox || !totalBox) return;

    let html = "";
    let total = 0;


    for (let item in cart) {

        const data = cart[item];

        let amount = data.price * data.qty;

        if (data.discount > 0) {
            amount -= data.discount * data.qty;
        }

        total += amount;

        html += `
        <div class="cart-row">

            <b>${item}</b><br>

            ₹${data.price}

            ${data.discount ? `<span style="color:green;"> (-₹${data.discount}/item)</span>` : ""}

            <br><br>

            <button onclick="removeItem('${item}')">−</button>

            <span style="margin:0 15px;font-size:18px;font-weight:bold;">
            ${data.qty}
            </span>

            <button onclick="addItem('${item}',${data.price})">+</button>

            <br><br>

            Total : ₹${amount}

        </div>

        <hr>
        `;

    }


    if (html === "") {
        html = "Your selected items will appear here";
    }

    cartBox.innerHTML = html;
    totalBox.innerHTML = total;

    updateUPI(total);

}
// ===========================
// SCRIPT PART 2
// OFFERS + UPI + MENU BUTTONS
// ===========================

// UPDATE PHONEPE UPI LINK
function updateUPI(total){

    const payButton = document.querySelector(".pay-button");

    if(!payButton) return;

    payButton.href =
    "upi://pay?pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent("Dockyard Le Bistro") +
    "&am=" + total +
    "&cu=INR";

}



// REMOVE OLD FREE ITEMS
function removeFreeItems(){

    for(let item in cart){

        if(cart[item].free){

            delete cart[item];

        }

    }

}



// HAPPY OFFERS

function checkOffers(){

    removeFreeItems();

    // Reset shake discounts
    for(let item in cart){
        if(cart[item]){
            cart[item].discount = 0;
        }
    }

    // 6 Veg Burger = 1 FREE Veg Burger

    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        cart["FREE Veg Burger"]={
            price:0,
            qty:1,
            free:true,
            discount:0
        };

    }


    // 3 Any Pasta = FREE Spring Roll

    let pastaQty=0;

    for(let item in cart){

        if(item.includes("Pasta")){

            pastaQty+=cart[item].qty;

        }

    }

    if(pastaQty>=3){

        cart["FREE Spring Roll"]={
            price:0,
            qty:1,
            free:true,
            discount:0
        };

    }



    // 3 Pizza = FREE Fried Momos

    let pizzaQty=0;

    for(let item in cart){

        if(item.includes("Pizza")){

            pizzaQty+=cart[item].qty;

        }

    }

    if(pizzaQty>=3){

        cart["FREE Fried Momos"]={
            price:0,
            qty:1,
            free:true,
            discount:0
        };

    }



    // 6 SAME SHAKES = ₹10 OFF EACH

    for(let item in cart){

        if(item.includes("Shake") || item.includes("Cold Coffee")){

            if(cart[item].qty>=6){

                cart[item].discount=10;

            }

        }

    }

}



// UPDATE + / - BUTTONS

function updateMenuButtons(){

    document.querySelectorAll(".food-card button").forEach(btn=>{

        const code=btn.getAttribute("onclick");

        if(!code) return;

        const match=code.match(/addItem\('(.+?)',(\d+)\)/);

        if(!match) return;

        const name=match[1];
        const price=match[2];

        if(cart[name]){

            btn.innerHTML=`
            <span onclick="event.stopPropagation();removeItem('${name}')">−</span>

            <b style="margin:0 12px;">
            ${cart[name].qty}
            </b>

            <span onclick="event.stopPropagation();addItem('${name}',${price})">+</span>
            `;

        }else{

            btn.innerHTML="+ Add";

        }

    });

}
// ===========================
// SCRIPT PART 3
// WHATSAPP + SEARCH + STOCK
// ===========================

// SEARCH MENU

function searchFood(){

    const input = document.getElementById("searchMenu");

    if(!input) return;

    const value = input.value.toLowerCase();

    document.querySelectorAll(".food-card").forEach(card=>{

        const name = card.querySelector("h3").innerText.toLowerCase();

        if(name.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}



// STOCK SYSTEM

function setStock(name,status){

    document.querySelectorAll(".food-card").forEach(card=>{

        let title = card.querySelector("h3");

        if(!title) return;

        if(title.innerText===name){

            let btn = card.querySelector("button");

            if(status==="out"){

                btn.disabled=true;

                btn.innerHTML="Out of Stock";

                btn.style.background="red";

            }else{

                btn.disabled=false;

                btn.innerHTML="+ Add";

                btn.style.background="#ff9800";

            }

        }

    });

}



// WHATSAPP ORDER

function placeOrder(){

    let customerName =
    document.getElementById("customerName").value;

    let customerPhone =
    document.getElementById("customerPhone").value;

    let message =
`🍽️ Dockyard Le Bistro

Name : ${customerName}

Phone : ${customerPhone}

Order

`;

    for(let item in cart){

        message +=
`${item} × ${cart[item].qty}
₹${cart[item].price*cart[item].qty}

`;

    }

    message +=
`Total = ₹${document.getElementById("total").innerHTML}`;

    window.open(
    "https://wa.me/917626845853?text="
    + encodeURIComponent(message),
    "_blank"
    );

}



// ORDER READY BUTTON

function orderReady(){

    alert("✅ Your order is ready for pickup.");

}



// PAGE LOAD

document.addEventListener("DOMContentLoaded",()=>{

    updateCart();

    updateMenuButtons();

    let btn =
    document.querySelector(".place-order");

    if(btn){

        btn.addEventListener("click",placeOrder);

    }

});
// ===========================
// SCRIPT PART 4
// FINAL FUNCTIONS
// ===========================

// AUTO ADD FOOD IMAGES IF MISSING

function loadFoodImages() {

    document.querySelectorAll(".food-card").forEach(card => {

        if (card.querySelector("img")) return;

        const img = document.createElement("img");

        img.src = "images/food.jpg";
        img.className = "food-img";
        img.alt = "Food";

        card.insertBefore(img, card.firstChild);

    });

}



// CATEGORY SMOOTH SCROLL

document.querySelectorAll(".category-grid a").forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});



// PAYMENT BUTTON

function payNow(){

    const total = document.getElementById("total").innerText;

    window.location.href =
    "upi://pay?pa=" +
    encodeURIComponent(UPI_ID) +
    "&pn=" +
    encodeURIComponent("Dockyard Le Bistro") +
    "&am=" +
    total +
    "&cu=INR";

}



// STICKY CATEGORY HIGHLIGHT

window.addEventListener("scroll",()=>{

    document.querySelectorAll(".category").forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<120 && top>-200){

            const id=section.id;

            document.querySelectorAll(".category-grid a").forEach(a=>{

                a.classList.remove("active");

                if(a.getAttribute("href")==="#"+id){

                    a.classList.add("active");

                }

            });

        }

    });

});



// START WEBSITE

document.addEventListener("DOMContentLoaded",()=>{

    loadFoodImages();

    updateCart();

    updateMenuButtons();

    updateUPI(0);

    console.log("Dockyard Le Bistro Loaded Successfully");

});
