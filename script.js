// ===============================
// DOCKYARD LE BISTRO
// COMPLETE SCRIPT
// PART 1
// ===============================

const UPI_ID = "Q051599316@ybl";
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
            free:false
        };

    }else{

        cart[name].qty++;

    }

    updateCart();

}



// ===============================
// INCREASE QTY
// ===============================

function increaseQty(name,price){

    addItem(name,price);

}



// ===============================
// DECREASE QTY
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

    if(cart[name]){

        delete cart[name];

    }

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


    let count=document.getElementById("cartCount");

    if(count){

        count.innerText=totalItems;

    }


    renderCart();

}
// ===============================
// OFFERS SYSTEM
// ===============================

function applyOffers(){

    // Remove previous free items

    Object.keys(cart).forEach(key=>{

        if(cart[key].free){

            delete cart[key];

        }

    });



    // HAPPY OFFER
    // Buy 2 Paneer Kulcha = Free Cold Drink

    if(cart["Paneer Kulcha"] && cart["Paneer Kulcha"].qty >= 2){

        cart["Free Cold Drink"]={

            name:"Free Cold Drink",
            price:0,
            qty:1,
            free:true

        };

    }



    subtotal=0;
    totalItems=0;


    Object.values(cart).forEach(item=>{

        subtotal += item.price * item.qty;
        totalItems += item.qty;

    });



    // 10% discount above ₹500

    if(subtotal >= 500){

        discount=Math.round(subtotal*0.10);

    }else{

        discount=0;

    }


    finalTotal=subtotal-discount;


}



// ===============================
// CART DISPLAY
// ===============================

function renderCart(){

    let cartBox=document.getElementById("cartItems");


    if(!cartBox) return;


    cartBox.innerHTML="";


    Object.values(cart).forEach(item=>{


        cartBox.innerHTML += `

        <div class="cart-row">

            <div>

            <b>${item.name}</b><br>

            ₹${item.price} × ${item.qty}

            </div>


            <div>

            ₹${item.price * item.qty}

            </div>

        </div>

        `;


    });



    let st=document.getElementById("subTotal");

    let dis=document.getElementById("discount");

    let gt=document.getElementById("grandTotal");



    if(st)
        st.innerText=subtotal;


    if(dis)
        dis.innerText=discount;


    if(gt)
        gt.innerText=finalTotal;


}



// ===============================
// CLEAR CART
// ===============================

function clearCart(){

    cart={};

    subtotal=0;
    discount=0;
    finalTotal=0;
    totalItems=0;


    updateCart();

}

// ===============================
// WHATSAPP ORDER
// ===============================
if(subtotal < 200){

alert("A minimum order of ₹200 is required for deliveries beyond 500 metres.");

return;

}
function sendWhatsApp(){

    if(Object.keys(cart).length === 0){

        alert("Cart is Empty");
        return;

    }


    let message="🍽️ *Dockyard Le Bistro Order*%0A%0A";


    Object.values(cart).forEach(item=>{

        message += `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}%0A`;

    });


    message += `%0ASubtotal : ₹${subtotal}%0A`;

    message += `Discount : ₹${discount}%0A`;

    message += `Total : ₹${finalTotal}`;



    window.open(
        `https://wa.me/${PHONE}?text=${message}`,
        "_blank"
    );

}



// ===============================
// PAYMENT
// ===============================
if(subtotal < 200){

alert("A minimum order of ₹200 is required for deliveries beyond 500 metres.");

return;

}
function payNow(){


    if(finalTotal <= 0){

        alert("Please add items first.");

        return;

    }



    let upi =
    `upi://pay?pa=${UPI_ID}&pn=Dockyard%20Le%20Bistro&am=${finalTotal}&cu=INR`;



    window.location.href=upi;


}



// ===============================
// GO TO CART
// ===============================

function goToCart(){

    let cartSection=document.getElementById("cart");


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


    let input=document
    .getElementById("search")
    .value
    .toLowerCase();



    let cards=document.querySelectorAll(".menu-card");



    cards.forEach(card=>{


        let text=card.innerText.toLowerCase();



        if(text.includes(input)){


            card.style.display="block";


        }else{


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



    let section=document.getElementById(id);



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



console.log("Dockyard Le Bistro Script Loaded Successfully");
