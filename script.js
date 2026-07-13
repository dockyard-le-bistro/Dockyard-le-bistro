let cart = {};

const UPI_ID = "Q051599316@ybl";
const WHATSAPP_NUMBER = "917626845853";


// ADD ITEM
function increaseQty(name, price){

    if(!cart[name]){

        cart[name]={
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



// REMOVE ITEM
function decreaseQty(name){

    if(cart[name]){

        cart[name].qty--;

        if(cart[name].qty<=0){
            delete cart[name];
        }

    }

    checkOffers();
    updateQuantity(name);
    updateCart();

}



// QUANTITY DISPLAY
function updateQuantity(name){

    let box=document.getElementById(name);

    if(box){

        box.innerText =
        cart[name] ? cart[name].qty : 0;

    }

}




// CART UPDATE

function updateCart(){

let cartBox=document.getElementById("cartItems");
let totalBox=document.getElementById("total");
let discountBox=document.getElementById("discount");

if(!cartBox || !totalBox) return;


cartBox.innerHTML="";


let total=0;


for(let item in cart){

let amount =
cart[item].price * cart[item].qty;


total += amount;


cartBox.innerHTML +=

`
<p>
${item} × ${cart[item].qty}
= ₹${amount}
</p>
`;

}


// discount

let discount = calculateDiscount();


if(discountBox){

discountBox.innerText =
"Discount: ₹"+discount;

}


total = total - discount;


totalBox.innerText = total;


}




// OFFERS

function checkOffers(){


// Burger free

if(cart["Veg Burger"] &&
cart["Veg Burger"].qty>=6 &&
!cart["FREE Veg Burger"]){


cart["FREE Veg Burger"]={
price:0,
qty:1
};


}



// Pasta offer

let pasta=0;

Object.keys(cart).forEach(item=>{

if(item.includes("Pasta")){
pasta += cart[item].qty;
}

});


if(pasta>=3 &&
!cart["FREE Spring Roll"]){


cart["FREE Spring Roll"]={
price:0,
qty:1
};

}



// Pizza offer

let pizza=0;


Object.keys(cart).forEach(item=>{

if(item.includes("Pizza")){
pizza += cart[item].qty;
}

});


if(pizza>=3 &&
!cart["FREE Fried Momos"]){


cart["FREE Fried Momos"]={
price:0,
qty:1
};

}



}





// 10% DISCOUNT

function calculateDiscount(){

let subtotal=0;


for(let item in cart){

subtotal +=
cart[item].price *
cart[item].qty;

}



let discount=0;


// example: total above 1000 gets 10%

if(subtotal>=1000){

discount =
Math.round(subtotal*0.10);

}


return discount;

}




// WHATSAPP

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
" = ₹"+
(cart[item].price*cart[item].qty)+
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



let link =

"upi://pay?pa="+
UPI_ID+
"&pn=Dockyard%20Le%20Bistro"+
"&am="+total+
"&cu=INR";


window.location.href=link;


}
