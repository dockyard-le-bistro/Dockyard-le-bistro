let cart = {};

const UPI_ID = "Q051599316@ybl";
const WHATSAPP_NUMBER = "917626845853";


// ADD ITEM
function increaseQty(name, price){

    if(!cart[name]){
        cart[name] = {
            price: Number(price),
            qty: 1
        };
    }
    else{
        cart[name].qty++;
    }

    updateQuantity(name);
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

    updateQuantity(name);
    updateCart();
}



// SHOW QUANTITY
function updateQuantity(name){

    let box = document.getElementById(name);

    if(box){

        box.innerText = cart[name] ? cart[name].qty : 0;

    }

}



// CART UPDATE
function updateCart(){

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");


    if(!cartBox || !totalBox) return;


    cartBox.innerHTML = "";

    let total = 0;



    for(let item in cart){

        let amount = cart[item].price * cart[item].qty;

        total += amount;


        cartBox.innerHTML +=
        `
        <p>
        ${item} × ${cart[item].qty}
        = ₹${amount}
        </p>
        `;

    }



    // APPLY OFFERS

    let discount = applyOffers();



    total = total - discount;



    if(total < 0){
        total = 0;
    }



    totalBox.innerText = total;


}




// HAPPY OFFERS

function applyOffers(){

    let offerBox = document.getElementById("offersMessage");

    let message = "";

    let discount = 0;



    // 6 Veg Burger FREE

    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        message += "🎁 Buy 6 Veg Burger → 1 Veg Burger FREE<br>";

    }




    // 3 Pasta FREE Spring Roll

    let pasta = 0;


    let pastaList = [
        "Red Sauce Pasta",
        "White Sauce Pasta",
        "Mixed Sauce Pasta",
        "Makhni Sauce Pasta",
        "Alfredo Mushroom Pasta",
        "Alfredo Paneer Pasta"
    ];


    pastaList.forEach(item=>{

        if(cart[item]){
            pasta += cart[item].qty;
        }

    });



    if(pasta >= 3){

        message += "🎁 Buy 3 Pasta → Spring Roll FREE<br>";

    }





    // 3 Pizza FREE Fried Momos


    let pizza = 0;


    for(let item in cart){

        if(item.includes("Pizza")){

            pizza += cart[item].qty;

        }

    }



    if(pizza >= 3){

        message += "🎁 Buy 3 Pizza → Fried Momos FREE<br>";

    }





    // Shake Discount


    for(let item in cart){

        if(item.includes("Shake") || item.includes("Coffee")){


            if(cart[item].qty >= 6){

                discount += cart[item].qty * 10;


                message +=
                "🥤 "+item+
                " → ₹10 discount each<br>";

            }

        }

    }





    if(offerBox){

        offerBox.innerHTML = message;

    }



    return discount;

}







// WHATSAPP ORDER


function sendWhatsApp(){


    let name =
    document.getElementById("customerName").value;


    let phone =
    document.getElementById("customerPhone").value;



    if(name=="" || phone==""){

        alert("Please enter your name and phone number");

        return;

    }



    let total =
    document.getElementById("total").innerText;



    if(total=="0"){

        alert("Please add items first");

        return;

    }



    let message =
    "🍽 Dockyard Le Bistro Order%0A%0";


    message +=
    "Name: "+name+
    "%0APhone: "+phone+
    "%0A%0AItems:%0A";



    for(let item in cart){


        message +=
        item+
        " x "+
        cart[item].qty+
        "%0A";


    }



    message +=
    "%0ATotal: ₹"+total+
    "%0A%0AThank you";



    window.open(

    "https://wa.me/"+
    WHATSAPP_NUMBER+
    "?text="+
    message,

    "_blank"

    );


}







// PAYMENT


function payNow(){


    let total =
    document.getElementById("total").innerText;



    if(total=="0"){

        alert("Please add items first");

        return;

    }



    if(Number(total) < 200){

        alert(
        "Minimum order should be ₹200/- for delivery beyond 500 meters"
        );

        return;

    }




    let upi =
    "upi://pay?pa="+
    UPI_ID+
    "&pn=Dockyard%20Le%20Bistro"+
    "&am="+
    total+
    "&cu=INR";



    window.location.href = upi;


}
