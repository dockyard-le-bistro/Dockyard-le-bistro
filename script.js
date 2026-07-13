let cart = [];
let total = 0;

function addItem(name, price) {

    const existing = cart.find(item => item.name === name);

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

function increase(index) {
    cart[index].qty++;
    updateCart();
}

function decrease(index) {

    cart[index].qty--;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {

    const cartDiv = document.getElementById("cartItems");
    const totalSpan = document.getElementById("total");

    cartDiv.innerHTML = "";

    total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>No items added.</p>";
        totalSpan.innerHTML = "0";
        return;
    }
      cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartDiv.innerHTML += `
        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</p>

            <div class="qty-buttons">

                <button onclick="decrease(${index})">−</button>

                <span>${item.qty}</span>

                <button onclick="increase(${index})">+</button>

                <button onclick="removeItem(${index})">
                    ❌
                </button>

            </div>

        </div>
        `;

    });

    totalSpan.innerHTML = total;
}
function whatsappOrder() {

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let address = document.getElementById("address").value.trim();

    if (cart.length === 0) {
        alert("Please add at least one item.");
        return;
    }

    if (name === "" || phone === "" || address === "") {
        alert("Please fill Name, Phone Number and Address.");
        return;
    }

    let message =
`🍽️ *Dockyard Le Bistro Order*

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Order Details:
`;

    cart.forEach(item => {
        message += `• ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    });

    message += `\n💰 Total: ₹${total}`;

    window.open(
        "https://wa.me/917626845853?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}
function payNow() {

    let name = document.getElementById("customerName").value.trim();

    if (total <= 0) {
        alert("Please add items to your cart first.");
        return;
    }

    let upiId = "Q051599316@ybl";
    let merchantName = "Dockyard Le Bistro";

    let upiLink =
        "upi://pay?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent(merchantName) +
        "&am=" + total +
        "&cu=INR" +
        "&tn=" + encodeURIComponent("Food Order" + (name ? " - " + name : ""));

    window.location.href = upiLink;
}
// Initialize cart when page loads
window.onload = function () {
    updateCart();
};

// Optional: Clear cart after successful order
function clearCart() {
    cart = [];
    total = 0;

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("address").value = "";

    updateCart();
}
