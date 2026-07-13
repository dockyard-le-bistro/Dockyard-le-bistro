let cart = [];
let total = 0;


// ADD ITEM

function addItem(name, price){

    cart.push({
        name:name,
        price:price
    });

    total += price;

    updateCart();

}



// UPDATE CART

function updateCart(){

    let cartBox = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");


    if(cart.length === 0){

        cartBox.innerHTML = "Your selected items will appear here";

    }

    else{

        let html = "";

        cart.forEach((item,index)=>{

            html += `
            <div style="display:flex;justify-content:space-between;margin:8px 0;">
            
            <span>
            ${index+1}. ${item.name}
            </span>

            <b>
            ₹${item.price}
            </b>

            </div>
            `;

        });


        cartBox.innerHTML = html;

    }


    totalBox.innerHTML = total;

}



// PLACE ORDER

document.querySelector(".place-order").addEventListener("click",function(){


    let name = document.getElementById("customerName").value;

    let phone = document.getElementById("customerPhone").value;


    if(name==="" || phone===""){

        alert("Please enter your name and mobile number");

        return;

    }


    if(cart.length===0){

        alert("Please add items to your order");

        return;

    }



    let orderText = "🍽️ DOCKYARD LE BISTRO\n\n";

    orderText += "Customer Name: "+name+"\n";

    orderText += "Mobile: "+phone+"\n\n";

    orderText += "Order:\n";


    cart.forEach(item=>{

        orderText += "• "+item.name+" - ₹"+item.price+"\n";

    });


    orderText += "\nTotal Amount: ₹"+total;



    let whatsappNumber="7626845853";


    let whatsappURL =
    "https://wa.me/"+whatsappNumber+"?text="+encodeURIComponent(orderText);



    window.open(whatsappURL,"_blank");


});
