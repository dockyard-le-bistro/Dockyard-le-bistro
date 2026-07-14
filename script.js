let cart = {};

const UPI_ID = "Q051599316@ybl";
const WHATSAPP_NUMBER = "917626845853";


// ================= ADD ITEM =================

function increaseQty(name, price){

    if(!cart[name]){

        cart[name] = {
            price: Number(price),
            qty: 1
        };

    }else{

        cart[name].qty++;

    }

    checkOffers();
    updateQuantity(name);
    updateCart();

}



// ================= REMOVE ITEM =================

function decreaseQty(name){

    if(cart[name]){

        cart[name].qty--;

        if(cart[name].qty <= 0){

            delete cart[name];

        }

    }

    checkOffers();
    updateQuantity(name);
    updateCart();

}



// ================= QUANTITY DISPLAY =================

function updateQuantity(name){

    let box = document.getElementById(name);

    if(box){

        box.innerText = cart[name] ? cart[name].qty : 0;

    }

}



// ================= CART =================


function updateCart(){

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");
    let discountBox = document.getElementById("discount");


    if(!cartBox) return;


    cartBox.innerHTML = "";


    let subtotal = 0;


    for(let item in cart){


        let amount = cart[item].price * cart[item].qty;


        subtotal += amount;


        cartBox.innerHTML += `

        <div class="cart-row">

        <b>${item}</b>

        <br>

        ${cart[item].qty} × ₹${cart[item].price}

        = ₹${amount}

        </div>

        `;

    }



    let discount = calculateDiscount(subtotal);


    let delivery = 0;


    if(subtotal > 0 && subtotal < 200){

        document.getElementById("minimumMsg").innerHTML =
        "⚠️ Minimum order value is ₹200";

    }else{

        if(document.getElementById("minimumMsg"))
        document.getElementById("minimumMsg").innerHTML =
        "✅ Minimum order reached";

    }



    if(discountBox){

        discountBox.innerHTML =
        "🎁 Offer Discount: ₹" + discount;

    }


    if(document.getElementById("subtotal")){

        document.getElementById("subtotal").innerHTML =
        subtotal;

    }


    if(document.getElementById("deliveryCharge")){

        document.getElementById("deliveryCharge").innerHTML =
        delivery;

    }



    let finalTotal =
    subtotal - discount + delivery;



    if(totalBox){

        totalBox.innerHTML =
        finalTotal;

    }


}



// ================= HAPPY OFFERS =================


function checkOffers(){


    delete cart["FREE Veg Burger"];
    delete cart["FREE Spring Roll"];
    delete cart["FREE Fried Momos"];



    // 6 Burger offer

    if(cart["Veg Burger"] &&
       cart["Veg Burger"].qty >= 6){


        cart["FREE Veg Burger"] = {

            price:0,
            qty:1

        };

    }



    // 3 Pasta offer

    let pastaQty = 0;


    for(let item in cart){

        if(item.includes("Pasta")){

            pastaQty += cart[item].qty;

        }

    }


    if(pastaQty >= 3){

        cart["FREE Spring Roll"]={

            price:0,
            qty:1

        };

    }




    // 3 Pizza offer


    let pizzaQty = 0;


    for(let item in cart){

        if(item.includes("Pizza")){

            pizzaQty += cart[item].qty;

        }

    }



    if(pizzaQty >= 3){

        cart["FREE Fried Momos"]={

            price:0,
            qty:1

        };

    }


}





// ================= DISCOUNT =================


function calculateDiscount(subtotal){

    let discount = 0;


    if(subtotal >= 1000){

        discount = Math.round(subtotal * 0.10);

    }


    return discount;

}





// ================= WHATSAPP ORDER =================


function sendWhatsApp(){


    let name =
    document.getElementById("customerName").value;


    let phone =
    document.getElementById("customerPhone").value;



    let total =
    document.getElementById("total").innerHTML;



    if(name=="" || phone==""){

        alert("Please enter name and phone number");

        return;

    }



    if(Number(total)<200){

        alert("Minimum order value is ₹200");

        return;

    }



    let message =
    "🍽 Dockyard Le Bistro Order\n\n";


    message +=
    "Name: "+name+
    "\nPhone: "+phone+
    "\n\nOrder:\n";



    for(let item in cart){


        message +=

        item+
        " × "+
        cart[item].qty+
        " = ₹"+
        (cart[item].price * cart[item].qty)
        +
        "\n";


    }



    message +=

    "\nTotal: ₹"+total;



    window.open(

    "https://wa.me/"+WHATSAPP_NUMBER+
    "?text="+encodeURIComponent(message)

    );


}







// ================= UPI PAYMENT =================


function payNow(){


    let total =
    Number(document.getElementById("total").innerHTML);



    if(total < 200){

        alert("Minimum order value is ₹200");

        return;

    }



    let link =

    "upi://pay?pa="+UPI_ID+
    "&pn=Dockyard%20Le%20Bistro"+
    "&am="+total+
    "&cu=INR";



    window.location.href = link;


}







// ================= SEARCH =================


document.addEventListener("DOMContentLoaded",()=>{


let search =
document.getElementById("search");


if(search){


search.addEventListener("keyup",()=>{


let value =
search.value.toLowerCase();



document.querySelectorAll(".item").forEach(item=>{


if(item.innerText.toLowerCase().includes(value)){


item.style.display="grid";


}else{


item.style.display="none";


}


});


});


}



});






// ================= CATEGORY =================


function showCategory(id){


document.querySelectorAll(".category-section")
.forEach(section=>{

section.style.display="none";

});


let selected =
document.getElementById(id);


if(selected){

selected.style.display="block";

}


window.scrollTo({

top:0,

behavior:"smooth"

});


}



// SHOW ALL

function showAll(){

document.querySelectorAll(".category-section")
.forEach(section=>{

section.style.display="block";

});

}
