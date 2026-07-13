let cart = {};

const UPI_ID = "Q051599316@ybl";


// ADD ITEM
function increaseQty(name, price){

    if(!cart[name]){

        cart[name] = {
            price: Number(price),
            qty: 1
        };

    } else {

        cart[name].qty++;

    }

    updateDisplay(name);
    updateCart();

}



// REMOVE ITEM
function decreaseQty(name){

    if(cart[name]){

        cart[name].qty--;

        if(cart[name].qty <= 0){

            delete cart[name];

        }

    }

    updateDisplay(name);
    updateCart();

}



// SHOW QUANTITY
function updateDisplay(name){

    let item = document.getElementById(name);

    if(item){

        if(cart[name]){

            item.innerText = cart[name].qty;

        } else {

            item.innerText = 0;

        }

    }

}



// UPDATE CART
function updateCart(){

    let cartBox = document.getElementById("cartItems");

    let totalBox = document.getElementById("total");


    cartBox.innerHTML = "";

    let total = 0;


    for(let item in cart){

        let product = cart[item];

        let amount = product.price * product.qty;

        total += amount;


        cartBox.innerHTML +=
        `
        <p>
        ${item} × ${product.qty}
        = ₹${amount}
        </p>
        `;

    }


    totalBox.innerText = total;

}



// WHATSAPP ORDER
function sendWhatsApp(){


    let name = document.getElementById("customerName").value;

    let phone = document.getElementById("customerPhone").value;


    if(name=="" || phone==""){

        alert("Please enter your name and phone number");

        return;

    }


    if(Object.keys(cart).length==0){

        alert("Please add items first");

        return;

    }



    let message = 
    "🍽 Dockyard Le Bistro Order%0A%0A";


    message += 
    "Name: " + name +
    "%0APhone: " + phone +
    "%0A%0AItems:%0A";



    let total = 0;


    for(let item in cart){

        let qty = cart[item].qty;

        let amount = cart[item].price * qty;


        total += amount;


        message += 
        item + 
        " x " + qty +
        " = ₹" + amount +
        "%0A";

    }


    message +=
    "%0ATotal: ₹" + total;



    let restaurantNumber = "917626845853";


    window.open(

        "https://wa.me/" +
        restaurantNumber +
        "?text=" +
        message,

        "_blank"

    );


}



// UPI PAYMENT

function payNow(){

    let total = document.getElementById("total").innerText;


    if(total == 0){

        alert("Please add items first");

        return;

    }


    let upiURL =
    "upi://pay?pa=" +
    UPI_ID +
    "&pn=Dockyard%20Le%20Bistro" +
    "&am=" +
    total +
    "&cu=INR";


    window.location.href = upiURL;

}
