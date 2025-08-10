
document.addEventListener("DOMContentLoaded", function(){
    const quantities = document.querySelectorAll(".quantity");
    const prices = document.querySelectorAll(".price");
    const totalSpan = document.getElementById("total");

    function updateTotal(){
        let total = 0;
        for(let i=0; i<quantities.length; i++){
            total += parseInt(quantities[i].value) * parseFloat(prices[i].textContent);
        }
        totalSpan.textContent = total;
        if(total === 0){
            alert("El carrito está vacío");
        }
    }

    quantities.forEach(q => q.addEventListener("input", updateTotal));
    document.getElementById("checkout").addEventListener("click", function(){
        alert("Gracias por su compra!");
    });
});
