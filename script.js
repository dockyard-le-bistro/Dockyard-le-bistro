// ===============================
// DOCKYARD LE BISTRO SCRIPT
// PART 1
// ===============================

const UPI_ID = "Q051599316@ybl";
const PHONE = "917626845853";

let cart = {};
let totalItems = 0;
let subtotal = 0;
let discount = 0;
let finalTotal = 0;

function increaseQty(name, price) {

    if (!cart[name]) {

        cart[name] = {
            name: name,
            price: Number(price),
            qty: 1,
            free: false
        };

    } else {

        cart[name].qty++;

    }

    let span = document.getElementById(name);

    if (span)
        span.innerText = cart[name].qty;

    updateCart();

}

function decreaseQty(name) {

    if (!cart[name]) return;

    cart[name].qty--;

    if (cart[name].qty <= 0) {

        delete cart[name];

        let span = document.getElementById(name);

        if (span)
            span.innerText = 0;

    } else {

        let span = document.getElementById(name);

        if (span)
            span.innerText = cart[name].qty;

    }

    updateCart();

}

function updateCart() {

    subtotal = 0;
    totalItems = 0;

    Object.values(cart).forEach(item => {

        subtotal += item.price * item.qty;
        totalItems += item.qty;

    });

    document.getElementById("cartCount").innerText = totalItems;

    applyOffers();

}
// ===============================
// PART 2
// OFFERS + CART UPDATE
// ===============================

function applyOffers() {

    // Remove old free items
    Object.keys(cart).forEach(key => {
        if (cart[key].free) {
            delete cart[key];
        }
    });

    // Happy Offer
    // Buy 2 Paneer Kulcha -> 1 Cold Drink Free

    if (cart["Paneer Kulcha"] && cart["Paneer Kulcha"].qty >= 2) {

        cart["Free Cold Drink"] = {
            name: "Free Cold Drink",
            price: 0,
            qty: 1,
            free: true
        };

    }

    subtotal = 0;
    totalItems = 0;

    Object.values(cart).forEach(item => {

        subtotal += item.price * item.qty;
        totalItems += item.qty;

    });

    // 10% Discount on ₹500+

    if (subtotal >= 500) {

        discount = Math.round(subtotal * 0.10);

    } else {

        discount = 0;

    }

    finalTotal = subtotal - discount;

    document.getElementById("cartCount").innerText = totalItems;

    renderCart();

}

function renderCart() {

    const cartBox = document.getElementById("cartItems");

    if (!cartBox) return;

    cartBox.innerHTML = "";

    Object.values(cart).forEach(item => {

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

    document.getElementById("subTotal").innerText = subtotal;
    document.getElementById("discount").innerText = discount;
    document.getElementById("grandTotal").innerText = finalTotal;


// ===============================
// PART 3
// WHATSAPP + PAYMENT + SEARCH
// ===============================

function clearCart() {

    cart = {};

    subtotal = 0;
    discount = 0;
    finalTotal = 0;
    totalItems = 0;

    document.querySelectorAll(".quantity span").forEach(span => {
        span.innerText = "0";
    });

    updateCart();
}

function goToCart() {

    const cartSection = document.getElementById("cart");

    if (cartSection) {

        cartSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}

function payNow() {

    if (finalTotal <= 0) {

        alert("Please add items first.");
        return;

    }

    const upi = `upi://pay?pa=${UPI_ID}&pn=Dockyard%20Le%20Bistro&am=${finalTotal}&cu=INR`;

    window.location.href = upi;

}

function sendWhatsApp() {

    if (Object.keys(cart).length === 0) {

        alert("Cart is Empty");
        return;

    }

    let message = "🍽️ *Dockyard Le Bistro Order*%0A%0A";

    Object.values(cart).forEach(item => {

        message += `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}%0A`;

    });

    message += "%0A";
    message += `Subtotal : ₹${subtotal}%0A`;
    message += `Discount : ₹${discount}%0A`;
    message += `Total : ₹${finalTotal}`;

    window.open(
        `https://wa.me/${PHONE}?text=${message}`,
        "_blank"
    );

}

function searchFood() {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".menu-card");

    cards.forEach(card => {

        let text = card.innerText.toLowerCase();

        if (text.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}
  // ===============================
// PART 4
// CATEGORY + INITIALIZATION
// ===============================

// Hide all categories
function hideAllCategories() {

    document.querySelectorAll(".category-section").forEach(section => {

        section.style.display = "none";

    });

}

// Show selected category
function showCategory(id) {

    hideAllCategories();

    let section = document.getElementById(id);

    if (section) {

        section.style.display = "block";

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}

// On Page Load
window.onload = function () {

    hideAllCategories();

    updateCart();

};

// Cart total refresh
function refreshTotals() {

    subtotal = 0;
    totalItems = 0;

    Object.values(cart).forEach(item => {

        subtotal += item.price * item.qty;
        totalItems += item.qty;

    });

    discount = subtotal >= 500 ? Math.round(subtotal * 0.10) : 0;

    finalTotal = subtotal - discount;

    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.innerText = totalItems;

    const st = document.getElementById("subTotal");
    if (st) st.innerText = subtotal;

    const dis = document.getElementById("discount");
    if (dis) dis.innerText = discount;

    const gt = document.getElementById("grandTotal");
    if (gt) gt.innerText = finalTotal;

}

// Add item alias
function addItem(name, price) {

    increaseQty(name, price);

}

// Remove item completely
function removeItem(name) {

    if (!cart[name]) return;

    delete cart[name];

    const qty = document.getElementById(name);

    if (qty) qty.innerText = "0";

    updateCart();

}

// Debug
console.log("Dockyard Le Bistro Script Loaded Successfully");
