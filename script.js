let cart = {};

const UPI_ID = "Q051599316@ybl";


// ADD ITEM
function increaseQty(name, price){

    if(!cart[name]){
        cart[name] = {
            price: price,
            qty: 1
        };
    }
    else{
        cart[name].qty++;
    }

    updateDisplay(name);
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

    updateDisplay(name);
    updateCart();
}



// UPDATE NUMBER BESIDE ITEM
function updateDisplay(name){

    let id = document.getElementById(name);

    if(id){

        if(cart[name]){
            id.innerText = cart[name].qty;
        }
        else{
            id.innerText = 0;
        }

    }

}



// CART DISPLAY
function updateCart(){

    let cartBox = document.getElementById("cartItems");

    let totalBox = document.getElementById("total");


    cartBox.innerHTML="";

    let total = 0;


    for(let item in cart){

        let product = cart[item];

        let amount = product.price * product.qty;

        total += amount;


        cartBox.innerHTML += `

        <p>
        ${item} × ${product.qty}
        = ₹${amount}
        </p>

        `;

    }


    totalBox.innerText = total;


    checkOffers();

}



// OFFER CHECK
function checkOffers(){

    let freeItems = "";


    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        freeItems += "🎁 1 Veg Burger FREE<br>";

    }


    if(cart["Pizza"] && cart["Pizza"].qty >= 3){

        freeItems += "🎁 Fried Momos FREE<br>";

    }


    if(freeItems!=""){

        document.getElementById("cartItems").innerHTML +=
        `<p style="color:green">${freeItems}</p>`;

    }

}

// PAY NOW FUNCTION

function payNow(){

    let total = document.getElementById("total").innerText;


    if(total == 0){

        alert("Please add items to cart first");

        return;

    }


    let upiLink =
    `upi://pay?pa=${UPI_ID}&pn=Dockyard%20Le%20Bistro&am=${total}&cu=INR`;


    window.location.href = upiLink;


}




// WHATSAPP ORDER FUNCTION

function sendWhatsApp(){

    let message = "Dockyard Le Bistro Order%0A%0A";


    let total = 0;


    for(let item in cart){

        let qty = cart[item].qty;

        let price = cart[item].price * qty;

        total += price;


        message += `${item} x ${qty} = ₹${price}%0A`;

    }


    message += `%0ATotal Amount: ₹${total}`;


    let phone = "917626845853";


    window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
    );


}
