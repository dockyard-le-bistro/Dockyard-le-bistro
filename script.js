let cart = {};

const UPI_ID = "Q051599316@ybl";


// ADD ITEM
function addItem(name, price) {

    if (!cart[name]) {
        cart[name] = {
            price: price,
            qty: 1
        };
    } else {
        cart[name].qty++;
    }

    updateMenuButtons();
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

    updateMenuButtons();
    updateCart();
}



// CHANGE MENU BUTTONS
function updateMenuButtons() {

    let buttons = document.querySelectorAll(".food-card button");


    buttons.forEach(btn => {

        let text = btn.getAttribute("onclick");


        if (!text) return;


        let match = text.match(/addItem\('(.+?)',(\d+)\)/);


        if (!match) return;


        let itemName = match[1];
        let price = match[2];


        if (cart[itemName]) {


            btn.innerHTML =
            `
            <span onclick="removeItem('${itemName}')">−</span>
            <b>${cart[itemName].qty}</b>
            <span onclick="addItem('${itemName}',${price})">+</span>
            `;


            btn.onclick = function(e){
                e.preventDefault();
            };


        } else {


            btn.innerHTML = "+ Add";


            btn.onclick = function(){

                addItem(itemName,price);

            };

        }

    });

}



// UPDATE CART
function updateCart(){

    let cartBox =
    document.getElementById("cartItems");


    let totalBox =
    document.getElementById("total");


    let html = "";

    let total = 0;


    for(let item in cart){

        let amount =
        cart[item].price *
        cart[item].qty;


        total += amount;


        html +=
        `
        <div class="cart-row">

        ${item}

        <button onclick="removeItem('${item}')">
        −
        </button>

        <b>
        ${cart[item].qty}
        </b>

        <button onclick="addItem('${item}',${cart[item].price})">
        +
        </button>

        ₹${amount}

        </div>
        `;

    }


    if(html==""){
        html="Your selected items will appear here";
    }


    cartBox.innerHTML = html;

    totalBox.innerHTML = total;


    updatePayment(total);

}



// UPDATE UPI PAYMENT
function updatePayment(total){

    let payButton =
    document.querySelector(".pay-button");


    if(payButton){

        payButton.href =
        "upi://pay?pa=Q051599316%40ybl" +
        "&pn=Dockyard%20Le%20Bistro" +
        "&am=" + total +
        "&cu=INR";

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
    "Dockyard Le Bistro Order%0A%0";


    message +=
    "Name: "+name+"%0A";


    message +=
    "Phone: "+phone+"%0A%0";


    for(let item in cart){

        message +=
        item+
        " x "+
        cart[item].qty+
        "%0A";

    }


    message +=
    "%0ATotal ₹"+
    document.getElementById("total").innerHTML;



    window.open(
    "https://wa.me/917626845853?text="+message,
    "_blank"
    );


});
