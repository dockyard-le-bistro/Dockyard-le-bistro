// Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior:'smooth'
        });
    });
});

// Search Menu
function searchMenu(){
    let input = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".card li");

    items.forEach(item=>{
        if(item.innerText.toLowerCase().includes(input)){
            item.style.display="flex";
        }else{
            item.style.display="none";
        }
    });
}

// Current Year
document.getElementById("year").innerHTML = new Date().getFullYear();
