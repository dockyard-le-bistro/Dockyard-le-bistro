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
checkOffers();
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
function checkOffers(){

    let offerText = "";


    // Buy 6 Veg Burger get 1 FREE
    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        offerText += "🎁 1 Veg Burger FREE<br>";

    }


    // Buy 3 Pasta get Spring Roll FREE
    let pastaCount = 0;

    let pastaItems = [
        "Red Sauce Pasta",
        "White Sauce Pasta",
        "Mixed Sauce Pasta",
        "Makhni Sauce Pasta",
        "Alfredo Mushroom Pasta",
        "Alfredo Paneer Pasta"
    ];


    pastaItems.forEach(item=>{

        if(cart[item]){

            pastaCount += cart[item].qty;

        }

    });


    if(pastaCount >= 3){

        offerText += "🎁 1 Plate Spring Roll FREE<br>";

    }



    // Buy 3 Pizza get Fried Momos FREE
    let pizzaCount = 0;


    for(let item in cart){

        if(item.includes("Pizza")){

            pizzaCount += cart[item].qty;

        }

    }


    if(pizzaCount >= 3){

        offerText += "🎁 Fried Momos FREE<br>";

    }



    if(offerText!=""){

        document.getElementById("cartItems").innerHTML +=

        `<div style="color:green;font-weight:bold">
        ${offerText}
        </div>`;

    }

}
