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




// ================= UPDATE NUMBER ON ITEM =================

function updateQuantity(name){

    let box = document.getElementById(name);

    if(box){

        box.innerText = cart[name] ? cart[name].qty : 0;

    }

}





// ================= CART DISPLAY =================


function updateCart(){

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");
    let discountBox = document.getElementById("discount");


    if(!cartBox || !totalBox){

        return;

    }


    cartBox.innerHTML="";


    let subtotal = 0;
    let count = 0;



    for(let item in cart){


        let amount =
        cart[item].price * cart[item].qty;


        subtotal += amount;

        count += cart[item].qty;



        cartBox.innerHTML +=

        `
        <div class="cart-row">

        <b>${item}</b><br>

        ${cart[item].qty} × ₹${cart[item].price}

        = ₹${amount}

        </div>

        `;

    }



    let discount = calculateDiscount(subtotal);



    if(discountBox){

        discountBox.innerHTML =
        "🎁 Offer Discount: ₹"+discount;

    }



    let delivery = 0;



    if(document.getElementById("subtotal")){

        document.getElementById("subtotal").innerHTML =
        subtotal;

    }



    if(document.getElementById("cartCount")){

        document.getElementById("cartCount").innerHTML =
        count;

    }



    let finalAmount =
    subtotal - discount + delivery;



    totalBox.innerHTML =
    finalAmount;



    let minimum =
    document.getElementById("minimumMsg");



    if(minimum){

        if(subtotal>0 && subtotal<200){

            minimum.innerHTML =
            "⚠️ Minimum order value is ₹200";

        }

        else{

            minimum.innerHTML =
            "✅ Order ready";

        }

    }


}
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




// ================= UPDATE NUMBER ON ITEM =================

function updateQuantity(name){

    let box = document.getElementById(name);

    if(box){

        box.innerText = cart[name] ? cart[name].qty : 0;

    }

}





// ================= CART DISPLAY =================


function updateCart(){

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");
    let discountBox = document.getElementById("discount");


    if(!cartBox || !totalBox){

        return;

    }


    cartBox.innerHTML="";


    let subtotal = 0;
    let count = 0;



    for(let item in cart){


        let amount =
        cart[item].price * cart[item].qty;


        subtotal += amount;

        count += cart[item].qty;



        cartBox.innerHTML +=

        `
        <div class="cart-row">

        <b>${item}</b><br>

        ${cart[item].qty} × ₹${cart[item].price}

        = ₹${amount}

        </div>

        `;

    }



    let discount = calculateDiscount(subtotal);



    if(discountBox){

        discountBox.innerHTML =
        "🎁 Offer Discount: ₹"+discount;

    }



    let delivery = 0;



    if(document.getElementById("subtotal")){

        document.getElementById("subtotal").innerHTML =
        subtotal;

    }



    if(document.getElementById("cartCount")){

        document.getElementById("cartCount").innerHTML =
        count;

    }



    let finalAmount =
    subtotal - discount + delivery;



    totalBox.innerHTML =
    finalAmount;



    let minimum =
    document.getElementById("minimumMsg");



    if(minimum){

        if(subtotal>0 && subtotal<200){

            minimum.innerHTML =
            "⚠️ Minimum order value is ₹200";

        }

        else{

            minimum.innerHTML =
            "✅ Order ready";

        }

    }


}
