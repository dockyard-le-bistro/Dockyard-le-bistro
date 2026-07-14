let cart = {};

const UPI_ID = "Q051599316@ybl";

const WHATSAPP_NUMBER = "917626845853";




// ================= ADD ITEM =================


function increaseQty(name,price){


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






// ================= REMOVE ITEM =================


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







// ================= DISPLAY QUANTITY =================


function updateQuantity(name){


let box=document.getElementById(name);


if(box){

box.innerText=

cart[name] ?

cart[name].qty :

0;

}


}








// ================= CART UPDATE =================


function updateCart(){


let cartBox=document.getElementById("cartItems");


let subtotalBox=document.getElementById("subtotal");

let discountBox=document.getElementById("discount");

let totalBox=document.getElementById("total");


if(!cartBox)return;



cartBox.innerHTML="";


let subtotal=0;




for(let item in cart){


let amount=

cart[item].price *

cart[item].qty;



subtotal+=amount;



cartBox.innerHTML +=


`
<p>
<b>${item}</b><br>

${cart[item].qty} × ₹${cart[item].price}

= ₹${amount}

</p>

`;

}



let discount=

calculateDiscount(subtotal);



let delivery=0;



let final=subtotal-discount+delivery;



subtotalBox.innerText=subtotal;


discountBox.innerText=discount;


document.getElementById("deliveryCharge").innerText=delivery;


totalBox.innerText=final;



}









// ================= HAPPY OFFERS =================



function checkOffers(){



delete cart["FREE Veg Burger"];

delete cart["FREE Spring Roll"];

delete cart["FREE Fried Momos"];




// 6 BURGER FREE BURGER


if(cart["Veg Burger"] &&

cart["Veg Burger"].qty>=6){



cart["FREE Veg Burger"]={

price:0,

qty:1

};


}





// 3 PASTA FREE SPRING ROLL


let pasta=0;


for(let item in cart){


if(item.includes("Pasta")){


pasta += cart[item].qty;


}


}


if(pasta>=3){


cart["FREE Spring Roll"]={

price:0,

qty:1

};


}







// 3 PIZZA FREE MOMOS


let pizza=0;


for(let item in cart){


if(item.includes("Pizza")){


pizza+=cart[item].qty;


}


}



if(pizza>=3){


cart["FREE Fried Momos"]={

price:0,

qty:1

};


}



}









// ================= DISCOUNT =================



function calculateDiscount(subtotal){


let discount=0;



if(subtotal>=1000){


discount=Math.round(subtotal*0.10);


}



return discount;


}









// ================= WHATSAPP =================



function sendWhatsApp(){



let name=

document.getElementById("customerName").value;


let phone=

document.getElementById("customerPhone").value;



if(name=="" || phone==""){


alert("Please enter name and phone number");

return;


}





let total=

document.getElementById("total").innerText;



let message=

"🍽 Dockyard Le Bistro Order\n\n";



message +=

"Name: "+name+

"\nPhone: "+phone+

"\n\nOrder:\n";




for(let item in cart){



message +=


item+

" x "+

cart[item].qty+

" = ₹"+

(cart[item].price*cart[item].qty)

+

"\n";


}



message +=


"\nSubtotal: ₹"+

document.getElementById("subtotal").innerText+

"\nDiscount: ₹"+

document.getElementById("discount").innerText+

"\nTotal: ₹"+total;




window.open(

"https://wa.me/"+

WHATSAPP_NUMBER+

"?text="+

encodeURIComponent(message)

);


}









// ================= UPI PAYMENT =================



function payNow(){



let total=

Number(

document.getElementById("total").innerText

);



if(total<=0){


alert("Please add items first");

return;


}



if(total<200){


alert("Minimum order value is ₹200");


return;


}





let upi=

"upi://pay?pa="+

UPI_ID+

"&pn=Dockyard%20Le%20Bistro"+

"&am="+total+

"&cu=INR";



window.location.href=upi;



}








// ================= SEARCH =================



document
.getElementById("search")
.addEventListener("keyup",function(){



let value=this.value.toLowerCase();



document
.querySelectorAll(".menu-card")
.forEach(card=>{


if(card.innerText.toLowerCase().includes(value)){


card.style.display="block";


}else{


card.style.display="none";


}



});



});









// ================= CATEGORY =================



function showCategory(id){



document
.querySelectorAll(".category-section")
.forEach(section=>{


section.style.display="none";


});



let selected=

document.getElementById(id);



if(selected){


selected.style.display="block";


}


window.scrollTo({

top:0,

behavior:"smooth"

});


}






// SHOW ALL MENU


function showAll(){


document
.querySelectorAll(".category-section")
.forEach(section=>{


section.style.display="block";


});


}
