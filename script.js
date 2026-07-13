let cart = {};

const UPI_ID = "Q051599316@ybl";
const WHATSAPP_NUMBER = "917626845853";


// =======================
// ADD ITEM
// =======================

function increaseQty(name, price){

    if(!cart[name]){

        cart[name] = {
            price:Number(price),
            qty:1
        };

    }else{

        cart[name].qty++;

    }


    checkOffers();
    updateQuantity(name);
    updateCart();

}




// =======================
// REMOVE ITEM
// =======================

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




// =======================
// QUANTITY DISPLAY
// =======================

function updateQuantity(name){

    let qtyBox =
    document.getElementById(name);


    if(qtyBox){

        qtyBox.innerText =
        cart[name] ? cart[name].qty : 0;

    }

}





// =======================
// UPDATE CART
// =======================

function updateCart(){

let cartBox =
document.getElementById("cartItems");


let totalBox =
document.getElementById("total");


let discountBox =
document.getElementById("discount");



if(!cartBox || !totalBox){

return;

}



cartBox.innerHTML="";


let subtotal = 0;



for(let item in cart){


let amount =
cart[item].price *
cart[item].qty;


subtotal += amount;



cartBox.innerHTML +=

`
<p>
${item} × ${cart[item].qty}
= ₹${amount}
</p>

`;

}



let discount =
calculateDiscount(subtotal);



if(discountBox){

discountBox.innerHTML =

"Discount: ₹"+discount;

}



let finalTotal =
subtotal - discount;



totalBox.innerText =
finalTotal;


}





// =======================
// OFFERS
// =======================

function checkOffers(){



// remove old free items first

delete cart["FREE Veg Burger"];
delete cart["FREE Spring Roll"];
delete cart["FREE Fried Momos"];




// BURGER OFFER

if(cart["Veg Burger"] &&
cart["Veg Burger"].qty >= 6){


cart["FREE Veg Burger"]={

price:0,

qty:1

};


}





// PASTA OFFER

let pastaQty=0;


Object.keys(cart).forEach(item=>{


if(item.includes("Pasta")){


pastaQty += cart[item].qty;


}


});



if(pastaQty >=3){


cart["FREE Spring Roll"]={

price:0,

qty:1

};


}





// PIZZA OFFER


let pizzaQty=0;


Object.keys(cart).forEach(item=>{


if(item.includes("Pizza")){


pizzaQty += cart[item].qty;


}


});



if(pizzaQty>=3){


cart["FREE Fried Momos"]={

price:0,

qty:1

};


}



}
// =======================
// DISCOUNT
// =======================

function calculateDiscount(subtotal){


let discount = 0;


// 10% discount above ₹1000

if(subtotal >= 1000){

discount =
Math.round(subtotal * 0.10);

}


return discount;

}





// =======================
// WHATSAPP ORDER
// =======================

function sendWhatsApp(){


let name =
document.getElementById("customerName").value;


let phone =
document.getElementById("customerPhone").value;



if(name==="" || phone===""){

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
" = ₹"+
(cart[item].price * cart[item].qty)+
"%0A";


}



message +=

"%0ATotal: ₹"+
total;



window.open(

"https://wa.me/"+
WHATSAPP_NUMBER+
"?text="+message,

"_blank"

);



}





// =======================
// UPI PAYMENT
// =======================

function payNow(){


let total =

Number(
document.getElementById("total").innerText
);



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



window.location.href =
upiLink;


}





// =======================
// SEARCH
// =======================

function searchFood(){


let input =

document
.getElementById("search")
.value
.toLowerCase();



let items =

document.querySelectorAll(".item");



items.forEach(item=>{


let text =

item.innerText.toLowerCase();



if(text.includes(input)){


item.style.display="flex";


}else{


item.style.display="none";


}



});


}





// =======================
// CATEGORY DISPLAY
// =======================

function showCategory(id){



let sections =

document.querySelectorAll(".category-section");



sections.forEach(section=>{


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





// SHOW COMPLETE MENU

function showAll(){


let sections =

document.querySelectorAll(".category-section");



sections.forEach(section=>{


section.style.display="block";


});


}
