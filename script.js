let cart = [];

function addToCart(name, price, btnId) {

    let item = cart.find(i => i.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateButtons();
    updateCart();
}

function increase(name) {

    let item = cart.find(i => i.name === name);

    item.qty++;

    updateButtons();

    updateCart();

}

function decrease(name) {

    let item = cart.find(i => i.name === name);

    item.qty--;

    if (item.qty <= 0) {

        cart = cart.filter(i => i.name !== name);

    }

    updateButtons();

    updateCart();

}

function updateButtons() {

    document.querySelectorAll(".card").forEach(card => {

        let itemName = card.querySelector("h2").innerText;

        let button = card.querySelector("button");

        let item = cart.find(i => i.name === itemName);

        if (item) {

            button.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;gap:15px;">
            <span onclick="event.stopPropagation();decrease('${item.name}')">➖</span>
            <b>${item.qty}</b>
            <span onclick="event.stopPropagation();increase('${item.name}')">➕</span>
            </div>
            `;

        } else {

            button.innerHTML = "Add";

        }

    });

}

function updateCart() {

    let html = "";

    let total = 0;

    let count = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

        count += item.qty;

        html += `
        <div style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid #ddd;">
        <h3>${item.name}</h3>
        Qty : ${item.qty}<br>
        ₹${item.price * item.qty}
        </div>
        `;

    });

    document.getElementById("cartItems").innerHTML = html;

    document.getElementById("total").innerHTML = total;

    document.getElementById("count").innerHTML = count;

}

function openCart() {

    document.getElementById("cart").style.right = "0";

}

function closeCart() {

    document.getElementById("cart").style.right = "-100%";

}

function openPayment() {

    document.getElementById("paymentPopup").style.display = "flex";

}

function closePayment() {

    document.getElementById("paymentPopup").style.display = "none";

}

function sendWhatsApp() {

    if (cart.length == 0) {

        alert("Cart is empty");

        return;

    }

    let msg = "🍽️ *Dockyard Le Bistro Order*%0A%0A";

    let total = 0;

    cart.forEach(item => {

        msg += `✅ ${item.name} x ${item.qty} = ₹${item.price * item.qty}%0A`;

        total += item.price * item.qty;

    });

    msg += `%0A💰 Total : ₹${total}`;

    window.open(

        "https://wa.me/917626845853?text=" + msg,

        "_blank"

    );

}

function searchFood() {

    let input = document.getElementById("search").value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let title = card.querySelector("h2").innerText.toLowerCase();

        if (title.includes(input)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}
