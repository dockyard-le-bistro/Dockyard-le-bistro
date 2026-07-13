let cart = {};

const UPI_ID = "Q051599316@ybl";
const WHATSAPP_NUMBER = "917626845853";


// ADD ITEM
function increaseQty(name, price){

    if(!cart[name]){

        cart[name] = {
            price:Number(price),
            qty:1
        };

    } else {

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



// DISPLAY QTY
function updateQuantity(name){

    let box=document.getElementById(name);

    if(box){

        box.innerText = cart[name] ? cart[name].qty : 0;

    }

}



// CART

function updateCart(){

    let cartBox=document.getElementById("cartItems");
    let totalBox=document.getElementById("total");


    if(!cartBox || !totalBox) return;


    cartBox.innerHTML="";


    let total=0;



    for(let item in cart){

        let amount =
        cart[item].price * cart[item].qty;


        total += amount;


        cartBox.innerHTML +=

        `<p>
        ${item} × ${cart[item].qty}
        = ₹${amount}
        </p>`;

    }



    let discount = applyOffers();


    total = total - discount;



    totalBox.innerText = total;



}




// OFFERS

function applyOffers(){


    let offerBox=document.getElementById("offersMessage");


    let offerText="";

    let discount=0;



    // Burger offer

    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        offerText +=
        "🎁 6 Veg Burger → 1 Veg Burger FREE<br>";

    }





    // Pasta offer

    let pastaQty=0;


    Object.keys(cart).forEach(item=>{

        if(item.includes("Pasta")){

            pastaQty += cart[item].qty;

        }

    });


    if(pastaQty >= 3){

        offerText +=
        "🎁 3 Pasta → Spring Roll FREE<br>";

    }




    // Pizza offer

    let pizzaQty=0;


    Object.keys(cart).forEach(item=>{

        if(item.includes("Pizza")){

            pizzaQty += cart[item].qty;

        }

    });



    if(pizzaQty >= 3){

        offerText +=
        "🎁 3 Pizza → Fried Momos FREE<br>";

    }





    // Shake discount

    Object.keys(cart).forEach(item=>{


        if(item.includes("Shake")){


            if(cart[item].qty >= 6){


                discount += cart[item].qty * 10;


                offerText +=
                "🥤 "+item+
                " → ₹10 discount each<br>";

            }

        }


    });




    if(offerBox){

        offerBox.innerHTML =
        offerText;

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

        alert("Enter name and phone number");

        return;

    }



    let total =
    document.getElementById("total").innerText;



    let message =
    "🍽 Dockyard Le Bistro Order%0A%0";


    message +=
    "Name: "+name+
    "%0APhone: "+phone+
    "%0A%0AOrder:%0A";



    for(let item in cart){


        message +=
        item+
        " x "+
        cart[item].qty+
        "%0A";

    }



    message +=
    "%0ATotal: ₹"+total;



    window.open(

    "https://wa.me/"+
    WHATSAPP_NUMBER+
    "?text="+message,

    "_blank"

    );


}







// UPI PAYMENT

function payNow(){


    let total =
    Number(document.getElementById("total").innerText);



    if(total<=0){

        alert("Add items first");

        return;

    }



    let upiLink =

    "upi://pay?pa="+
    UPI_ID+
    "&pn=Dockyard%20Le%20Bistro"+
    "&am="+total+
    "&cu=INR";



    window.location.href=upiLink;


}
