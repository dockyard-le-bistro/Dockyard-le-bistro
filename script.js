// =================================
// DOCKYARD LE BISTRO
// FINAL SCRIPT
// PART 1
// =================================


const UPI_ID = "q051599316@ybl";
const PHONE = "917626845853";

let cart = {};

let subtotal = 0;
let discount = 0;
let finalTotal = 0;
let totalItems = 0;


// ===============================
// ADD ITEM
// ===============================

function addItem(name, price){

    if(!cart[name]){

        cart[name] = {

            name:name,
            price:Number(price),
            qty:1,
            free:false,
            offer:false

        };

    }

    else{

        cart[name].qty++;

    }


    updateCart();

}



// ===============================
// + BUTTON
// ===============================

function increaseQty(name,price){

    addItem(name,price);

}



// ===============================
// - BUTTON
// ===============================

function decreaseQty(name){


    if(!cart[name]) return;


    cart[name].qty--;


    if(cart[name].qty <= 0){

        delete cart[name];

    }


    updateCart();


}



// ===============================
// REMOVE ITEM
// ===============================

function removeItem(name){

    delete cart[name];

    updateCart();

}



// ===============================
// UPDATE CART
// ===============================

function updateCart(){


    subtotal = 0;
    totalItems = 0;



    Object.values(cart).forEach(item=>{


        subtotal += item.price * item.qty;

        totalItems += item.qty;


    });



    applyOffers();



    let count =
    document.getElementById("cartCount");


    if(count){

        count.innerText = totalItems;

    }
// Floating Cart Total

let floatingTotal = document.getElementById("floatingTotal");

if(floatingTotal){

    floatingTotal.innerText = finalTotal;

}


    updateMenuQuantity();


    renderCart();


}



// ===============================
// UPDATE MENU NUMBERS
// ===============================

function updateMenuQuantity(){


    document.querySelectorAll(".quantity span")
    .forEach(span=>{


        span.innerText = 0;


    });



    Object.values(cart).forEach(item=>{


        let qty =
        document.getElementById(item.name);


        if(qty){

            qty.innerText = item.qty;

        }


    });


}
// ===============================
// HAPPY OFFERS SYSTEM
// ===============================

function applyOffers(){


    // Remove old free items and old offers

    Object.keys(cart).forEach(key=>{


        if(cart[key].free || cart[key].offer){

            delete cart[key];

        }


    });



    discount = 0;



    // ===============================
    // OFFER 1
    // Buy any 3 Pasta
    // Get 1 Veg Spring Roll FREE
    // ===============================


    let pastaQty = 0;


    Object.values(cart).forEach(item=>{


        if(item.name.toLowerCase().includes("pasta")){

            pastaQty += item.qty;

        }


    });



    if(pastaQty >= 3){


        cart["Free Veg Spring Roll"] = {


            name:"Free Veg Spring Roll",

            price:0,

            qty:1,

            free:true,

            offer:true


        };


    }




    // ===============================
    // OFFER 2
    // Buy 6 Veg Burger
    // Get 1 Veg Burger FREE
    // ===============================


    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){


        cart["Free Veg Burger"] = {


            name:"Free Veg Burger",

            price:0,

            qty:1,

            free:true,

            offer:true


        };


    }




    // ===============================
    // OFFER 3
    // Buy any 3 Pizza
    // Get Fried Momos FREE
    // ===============================


    let pizzaQty = 0;



    Object.values(cart).forEach(item=>{


        if(item.name.toLowerCase().includes("pizza")){


            pizzaQty += item.qty;


        }


    });



    if(pizzaQty >= 3){


        cart["Free Fried Momos"] = {


            name:"Free Fried Momos",

            price:0,

            qty:1,

            free:true,

            offer:true


        };


    }





    // ===============================
    // OFFER 4
    // Buy 6 Same Flavour Shake
    // Get ₹10 OFF each shake
    // ===============================



    Object.values(cart).forEach(item=>{


        if(item.name.toLowerCase().includes("shake")
        && item.qty >= 6){


            discount += item.qty * 10;


        }


    });




    // Recalculate subtotal


    subtotal = 0;

    totalItems = 0;



    Object.values(cart).forEach(item=>{


        subtotal += item.price * item.qty;

        totalItems += item.qty;


    });



    finalTotal = subtotal - discount;



}
// ===============================
// CART DISPLAY
// ===============================

function renderCart(){


    let cartBox =
    document.getElementById("cartItems");


    if(!cartBox) return;



    cartBox.innerHTML = "";



    Object.values(cart).forEach(item=>{


        let offerText = "";


        if(item.free){

            offerText = " (FREE OFFER)";

        }



        cartBox.innerHTML += `

        <div class="cart-row">


            <div>

            <b>${item.name}${offerText}</b>

            <br>

            ₹${item.price} × ${item.qty}


            </div>



            <div>

            ₹${item.price * item.qty}


            </div>


        </div>


        `;


    });




    let st =
    document.getElementById("subTotal");


    let dis =
    document.getElementById("discount");


    let gt =
    document.getElementById("grandTotal");




    if(st){

        st.innerText = subtotal;

    }



    if(dis){

        dis.innerText = discount;

    }



    if(gt){

        gt.innerText = finalTotal;

    }



}




// ===============================
// CLEAR CART
// ===============================
function clearCart(){

    cart = {};

    subtotal = 0;
    discount = 0;
    finalTotal = 0;
    totalItems = 0;

    updateCart();

}

   
 

// ===============================
// WHATSAPP ORDER
// ===============================

function sendWhatsApp(){


    if(Object.keys(cart).length === 0){

        alert("Cart is Empty");
        return;

    }



    /*
if(finalTotal < 200){

    alert("A minimum order of ₹200 is required for deliveries beyond 500 metres.");

    return;

}
*/




    
let customerName = document.getElementById("customerName").value.trim();
let customerPhone = document.getElementById("customerPhone").value.trim();
let customerAddress = document.getElementById("customerAddress").value.trim();

let message =
"🍽️ Dockyard Le Bistro Order\n\n" +
"👤 Name: " + customerName + "\n" +
"📞 Phone: " + customerPhone + "\n" +
"🏠 Address: " + customerAddress + "\n\n";


    Object.values(cart).forEach(item=>{


        if(item.free){


            message +=
            "🎁 " + item.name + " - FREE\n";


        }

        else{


            message +=
            "• " + item.name +
            " x " + item.qty +
            " = ₹" +
            (item.price * item.qty) +
            "\n";


        }


    });




    message +=
    "\nSubtotal : ₹" + subtotal;



    message +=
    "\nOffer Discount : ₹" + discount;



    message +=
    "\nFinal Total : ₹" + finalTotal;



    window.open(

        "https://wa.me/" +
        PHONE +
        "?text=" +
        encodeURIComponent(message),

        "_blank"

    );

}





// ===============================
// UPI PAYMENT
// ===============================

function payNow(){

    if(Object.keys(cart).length === 0){
        alert("Please add items first.");
        return;
    }

    document.getElementById("paymentPopup").style.display = "flex";

}

function closePayment(){

    document.getElementById("paymentPopup").style.display = "none";

}



// ===============================
// GO TO CART
// ===============================

function goToCart(){

    let cartSection = document.getElementById("cart");

    if(cartSection){

        cartSection.scrollIntoView({
            behavior:"smooth"
        });

    }

}







// ===============================
// SEARCH MENU
// ===============================

function searchFood(){


    let input =

    document
    .getElementById("search")
    .value
    .toLowerCase();



    document
    .querySelectorAll(".menu-card")
    .forEach(card=>{


        let text =
        card.innerText.toLowerCase();



        if(text.includes(input)){


            card.style.display="block";


        }

        else{


            card.style.display="none";


        }



    });


}






// ===============================
// CATEGORY SYSTEM
// ===============================

function hideAllCategories(){


    document
    .querySelectorAll(".category-section")
    .forEach(section=>{


        section.style.display="none";


    });


}




function showCategory(id){


    hideAllCategories();



    let section =
    document.getElementById(id);



    if(section){


        section.style.display="block";


        section.scrollIntoView({

            behavior:"smooth"

        });


    }


}







// ===============================
// PAGE LOAD
// ===============================

window.onload=function(){


    hideAllCategories();


    updateCart();


};




console.log("Dockyard Le Bistro Final Script Loaded");
// ===============================
// TOGGLE FLOATING CART
// ===============================
function toggleCart(){

    let cart = document.getElementById("floatingCart");

    if(cart.classList.contains("open")){
        cart.classList.remove("open");
    }
    else{
        cart.classList.add("open");
    }

}
function searchFood() {

    let input = document.getElementById("search").value.toLowerCase().trim();

    document.querySelectorAll(".category-section").forEach(section => {

        let found = false;

        section.querySelectorAll(".menu-card").forEach(card => {

            let text = card.textContent.toLowerCase();

            if (text.includes(input)) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }

        });

        // Agar search box empty hai to sab categories dikhao
        if (input === "") {
            section.style.display = "block";
        } else {
            section.style.display = found ? "block" : "none";
        }

    });

}
function startUPIPayment(){

    let upiID = "q051599316@ybl";
    let receiverName = "Sandeep Singh";

    let upiURL = 
    "upi://pay?pa=" + upiID +
    "&pn=" + receiverName +
    "&am=" + finalTotal +
    "&cu=INR";

    window.location.href = upiURL;

}
function openUPI(){

    let upiID = "q051599316@ybl"; 
    let name = "Sandeep Singh";

    let link = "upi://pay?pa=" + upiID +
               "&pn=" + name +
               "&am=" + finalTotal +
               "&cu=INR";

    window.location.href = link;

}
