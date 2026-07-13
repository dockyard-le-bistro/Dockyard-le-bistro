let cart = {};

const UPI_ID = "Q051599316@ybl";


// ADD ITEM
function addItem(name, price) {

    if (!cart[name]) {

        cart[name] = {
            price: Number(price),
            qty: 1,
            free: false,
            discount: 0
        };

    } else {

        cart[name].qty++;

    }

    checkOffers();
    updateCart();
    updateMenuButtons();

}



// REMOVE ITEM
function removeItem(name) {

    if (cart[name]) {

        cart[name].qty--;

        if (cart[name].qty <= 0) {

            delete cart[name];

        }

    }

    checkOffers();
    updateCart();
    updateMenuButtons();

}



// UPDATE CART

function updateCart() {

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");


    if (!cartBox || !totalBox) return;


    let html = "";
    let total = 0;



    for (let item in cart) {


        let data = cart[item];


        let amount = data.price * data.qty;


        if(data.discount){

            amount = amount - (data.discount * data.qty);

        }


        total += amount;



        html += `

        <div class="cart-row">

        <b>${item}</b>

        <br>

        ₹${amount}

        <br>

        <button onclick="removeItem('${item}')">
        −
        </button>

        <span style="margin:0 12px">
        ${data.qty}
        </span>

        <button onclick="addItem('${item}',${data.price})">
        +
        </button>

        </div>

        <hr>

        `;


    }



    if(html === ""){

        html = "Your selected items will appear here";

    }



    cartBox.innerHTML = html;

    totalBox.innerHTML = total;


    updateUPI(total);

}



// UPI LINK UPDATE

function updateUPI(total){


    let payButton =
    document.querySelector(".pay-button");



    if(payButton){


        payButton.href =

        "upi://pay?pa=" + UPI_ID +

        "&pn=Dockyard%20Le%20Bistro" +

        "&am=" + total +

        "&cu=INR";


    }


}

// HAPPY OFFERS

function checkOffers(){


    // Remove old free items

    removeFreeItems();



    // 6 Veg Burger = 1 Free Veg Burger

    if(cart["Veg Burger"] && cart["Veg Burger"].qty >= 6){

        cart["FREE Veg Burger"] = {

            price:0,
            qty:1,
            free:true,
            discount:0

        };

    }




    // 3 Pasta = Free Spring Roll

    let pastaCount = 0;


    for(let item in cart){

        if(item.includes("Pasta")){

            pastaCount += cart[item].qty;

        }

    }


    if(pastaCount >= 3){

        cart["FREE Spring Roll"] = {

            price:0,
            qty:1,
            free:true,
            discount:0

        };

    }




    // 3 Pizza = Free Fried Momos

    let pizzaCount = 0;


    for(let item in cart){

        if(item.includes("Pizza")){

            pizzaCount += cart[item].qty;

        }

    }



    if(pizzaCount >= 3){

        cart["FREE Fried Momos"] = {

            price:0,
            qty:1,
            free:true,
            discount:0

        };

    }




    // 6 Same Shake / Cold Coffee = ₹10 OFF each

    for(let item in cart){


        if(item.includes("Shake") || item.includes("Cold Coffee")){


            if(cart[item].qty >= 6){


                cart[item].discount = 10;


            }

        }


    }


}




// REMOVE FREE ITEMS

function removeFreeItems(){


    for(let item in cart){


        if(cart[item].free){


            delete cart[item];


        }


    }


}




// UPDATE MENU BUTTONS

function updateMenuButtons(){


    document.querySelectorAll(".food-card").forEach(card=>{


        let button = card.querySelector("button");


        if(!button) return;



        let code = button.getAttribute("onclick");


        if(!code) return;



        let match = code.match(/addItem\('(.+)',(\d+)\)/);



        if(!match) return;



        let name = match[1];

        let price = match[2];



        if(cart[name]){


            button.innerHTML = `

            <span onclick="event.stopPropagation();removeItem('${name}')">
            −
            </span>


            <b style="margin:0 10px">
            ${cart[name].qty}
            </b>


            <span onclick="event.stopPropagation();addItem('${name}',${price})">
            +
            </span>


            `;



        }else{


            button.innerHTML = "+ Add";


        }



    });


}





// WHATSAPP ORDER

document.addEventListener("DOMContentLoaded",()=>{


    updateMenuButtons();

    updateCart();



    let orderButton =
    document.querySelector(".place-order");



    if(orderButton){



        orderButton.addEventListener("click",()=>{



            let name =
            document.getElementById("customerName").value;


            let phone =
            document.getElementById("customerPhone").value;




            let message =

`Dockyard Le Bistro Order

Name: ${name}

Phone: ${phone}

Order:
`;



            for(let item in cart){


                message +=

`${item} x ${cart[item].qty} = ₹${cart[item].price * cart[item].qty}

`;

            }




            message +=

`Total: ₹${document.getElementById("total").innerHTML}`;



            window.open(

            "https://wa.me/917626845853?text="

            + encodeURIComponent(message),

            "_blank"

            );



        });



    }



});
