let cart = {};

const UPI_ID = "Q051599316@ybl";


// ADD ITEM
function addItem(name, price) {

    if (!cart[name]) {
        cart[name] = {
            price: Number(price),
            qty: 1,
            free: false
        };
    } else {
        cart[name].qty++;
    }

    checkOffers();
    updateCart();
}


// REMOVE ITEM
function removeItem(name) {

    if (cart[name]) {

        cart[name].qty--;

        if (cart[name].qty <= 0) {
            delete cart[name];
        }
    }

    checkOffers();
    updateCart();
}



// CART UPDATE
function updateCart() {

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");

    let html = "";
    let total = 0;


    for (let item in cart) {

        let data = cart[item];

        let amount = data.price * data.qty;

        total += amount;


        html += `
        <div class="cart-row">

        <b>${item}</b><br>

        Qty: ${data.qty}

        <br>

        ₹${data.price} × ${data.qty}
        = ₹${amount}

        <button onclick="removeItem('${item}')">
        −
        </button>

        <button onclick="addItem('${item}',${data.price})">
        +
        </button>

        </div>
        <hr>
        `;

    }


    if(html === ""){
        html = "Your selected items will appear here";
    }


    cartBox.innerHTML = html;

    totalBox.innerHTML = total;


    updateUPI(total);
}



// UPI UPDATE

function updateUPI(total){

    let pay =
    document.querySelector(".pay-button");


    if(pay){

        pay.href =
        "upi://pay?pa=Q051599316%40ybl" +
        "&pn=Dockyard%20Le%20Bistro" +
        "&am=" + total +
        "&cu=INR";

    }

}
// HAPPY OFFERS AUTOMATIC

function checkOffers() {

    // Remove old free items first
    removeFreeItems();


    // 6 Veg Burger = 1 Free Veg Burger

    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        cart["FREE Veg Burger"] = {
            price:0,
            qty:1,
            free:true
        };

    }



    // 3 Any Pasta = Free Spring Roll

    let pastaCount = 0;

    for(let item in cart){

        if(item.includes("Pasta")){
            pastaCount += cart[item].qty;
        }

    }


    if(pastaCount >= 3){

        cart["FREE Spring Roll"] = {
            price:0,
            qty:1,
            free:true
        };

    }




    // 3 Pizza = Free Fried Momos

    let pizzaCount = 0;


    for(let item in cart){

        if(item.includes("Pizza")){
            pizzaCount += cart[item].qty;
        }

    }


    if(pizzaCount >= 3){

        cart["FREE Fried Momos"] = {
            price:0,
            qty:1,
            free:true
        };

    }

}




// REMOVE OLD FREE ITEMS

function removeFreeItems(){

    for(let item in cart){

        if(cart[item].free){

            delete cart[item];

        }

    }

}





// WHATSAPP ORDER

document
.querySelector(".place-order")
.addEventListener("click",function(){


    let name =
    document.getElementById("customerName").value;


    let phone =
    document.getElementById("customerPhone").value;



    let message =
`Dockyard Le Bistro Order

Name: ${name}

Phone: ${phone}

Order:
`;



    for(let item in cart){

        message +=
        `${item} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}
`;

    }



    message +=
`
Total: ₹${document.getElementById("total").innerHTML}
`;



    window.open(

    "https://wa.me/917626845853?text="
    +
    encodeURIComponent(message),

    "_blank"

    );


});
