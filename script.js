let cart = {};

const UPI_ID = "Q051599316@ybl";

function addItem(name, price) {

    if (!cart[name]) {
        cart[name] = {
            price: price,
            qty: 1
        };
    } else {
        cart[name].qty++;
    }

    updateCart();
}


function removeItem(name) {

    if (cart[name]) {

        cart[name].qty--;

        if (cart[name].qty <= 0) {
            delete cart[name];
        }
    }

    updateCart();
}


function updateCart() {

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");

    let html = "";
    let total = 0;


    for (let item in cart) {

        let data = cart[item];

        let amount = data.price * data.qty;

        total += amount;


        html += `
        <div class="cart-row">

        <span>
        ${item}
        </span>

        <button onclick="removeItem('${item}')">
        −
        </button>

        <b>${data.qty}</b>

        <button onclick="addItem('${item}',${data.price})">
        +
        </button>

        <span>
        ₹${amount}
        </span>

        </div>
        `;
    }


    if(html==""){
        html="Your selected items will appear here";
    }


    cartBox.innerHTML = html;

    totalBox.innerHTML = total;


    updatePayment(total);
}



function updatePayment(total){

    let payButton = document.querySelector(".pay-button");

    if(payButton){

        payButton.href =
        "upi://pay?pa=" +
        UPI_ID +
        "&pn=Dockyard%20Le%20Bistro" +
        "&am=" +
        total +
        "&cu=INR";

    }

}



// WhatsApp Order

document.querySelector(".place-order")
.addEventListener("click",function(){

    let name =
    document.getElementById("customerName").value;

    let phone =
    document.getElementById("customerPhone").value;


    let message =
    "Dockyard Le Bistro Order%0A%0A";


    message += "Name: "+name+"%0A";
    message += "Phone: "+phone+"%0A%0A";


    for(let item in cart){

        message +=
        item+
        " x "+
        cart[item].qty+
        "%0A";

    }


    message +=
    "%0ATotal: ₹"+
    document.getElementById("total").innerHTML;



    window.open(
    "https://wa.me/917626845853?text="+message,
    "_blank"
    );


});
