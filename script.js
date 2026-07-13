// Dockyard Le Bistro - Cart + Quantity + UPI Payment

let cart = {};

const UPI_ID = "Q051599316@ybl";
const RESTAURANT_NAME = "Dockyard Le Bistro";


// ADD ITEM
function addItem(name, price) {

    if (!cart[name]) {
        cart[name] = {
            price: Number(price),
            quantity: 1
        };
    } else {
        cart[name].quantity++;
    }

    refreshItem(name);
    updateCart();
}


// REMOVE ITEM
function removeItem(name) {

    if (cart[name]) {

        cart[name].quantity--;

        if (cart[name].quantity <= 0) {
            delete cart[name];
        }
    }

    refreshItem(name);
    updateCart();
}


// UPDATE ITEM BUTTON
function refreshItem(name) {

    let id = name.replace(/[^a-zA-Z0-9]/g, "");

    let addButton = document.getElementById("add-" + id);
    let qtyBox = document.getElementById("qty-" + id);
    let qtyNumber = document.getElementById("count-" + id);


    if (cart[name]) {

        if(addButton) addButton.style.display = "none";
        if(qtyBox) qtyBox.style.display = "flex";

        if(qtyNumber)
            qtyNumber.innerHTML = cart[name].quantity;

    } else {

        if(addButton) addButton.style.display = "block";
        if(qtyBox) qtyBox.style.display = "none";
    }
}


// UPDATE CART TOTAL
function updateCart() {

    let total = 0;

    for(let item in cart){

        total += cart[item].price * cart[item].quantity;

    }


    let totalBox = document.getElementById("cart-total");

    if(totalBox){
        totalBox.innerHTML = "Total: ₹" + total;
    }


    return total;
}



// PAY NOW
function payNow(){

    let total = updateCart();


    if(total <= 0){

        alert("Please add items first");
        return;

    }


    let message = "";

    for(let item in cart){

        message += item + 
        " x " + 
        cart[item].quantity + 
        ", ";

    }


    let upiURL =
    "upi://pay?pa=" +
    UPI_ID +
    "&pn=" +
    encodeURIComponent(RESTAURANT_NAME) +
    "&am=" +
    total +
    "&cu=INR" +
    "&tn=" +
    encodeURIComponent(message);


    window.location.href = upiURL;

}



// CLEAR CART
function clearCart(){

    cart = {};

    document.querySelectorAll(".qty-box")
    .forEach(box=>{
        box.style.display="none";
    });


    document.querySelectorAll(".add-btn")
    .forEach(btn=>{
        btn.style.display="block";
    });


    updateCart();

}
