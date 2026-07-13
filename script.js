let cart = [];


// ADD ITEM

function addItem(name, price) {

    let existing = cart.find(item => item.name === name);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            qty: 1
        });

    }

    updateCart();
}



// CHANGE QUANTITY

function changeQty(index, amount) {

    cart[index].qty += amount;


    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}



// UPDATE CART

function updateCart() {

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");


    let total = 0;


    if (cart.length === 0) {

        cartBox.innerHTML = "Your selected items will appear here";
        totalBox.innerHTML = 0;

        return;

    }


    let html = "";


    cart.forEach((item,index)=>{


        let itemTotal = item.price * item.qty;

        total += itemTotal;


        html += `

        <div class="cart-row">

        <div>
        ${item.name}<br>
        ₹${item.price} × ${item.qty}
        </div>


        <div>

        <button onclick="changeQty(${index},-1)">
        -
        </button>


        <b style="margin:0 8px">
        ${item.qty}
        </b>


        <button onclick="changeQty(${index},1)">
        +
        </button>

        </div>


        </div>

        `;


    });



    cartBox.innerHTML = html;

    totalBox.innerHTML = total;


}




// PLACE ORDER ON WHATSAPP


document.querySelector(".place-order")
.addEventListener("click",function(){


let name =
document.getElementById("customerName").value;


let phone =
document.getElementById("customerPhone").value;



if(name==="" || phone===""){

alert("Please enter your name and mobile number");

return;

}



if(cart.length===0){

alert("Please add items to your order");

return;

}



let message =
"🍽️ DOCKYARD LE BISTRO\n\n";


message +=
"🌱 PURE VEGETARIAN RESTAURANT\n\n";


message +=
"Customer Name: "+name+"\n";


message +=
"Mobile: "+phone+"\n\n";


message +=
"ORDER DETAILS:\n";



let total=0;


cart.forEach(item=>{


let amount=item.price*item.qty;

total += amount;


message +=
"• "+item.name+
" x "+item.qty+
" = ₹"+amount+"\n";


});


message +=
"\nTOTAL: ₹"+total;


message +=
"\n\n✨ Deliciousness is just a click away ✨";



let whatsappNumber="917626845853";


let url =
"https://wa.me/"+whatsappNumber+
"?text="+encodeURIComponent(message);



window.open(url,"_blank");


});
