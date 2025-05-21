let cartStorage = localStorage.getItem("cartProducts");
cartStorage = JSON.parse(cartStorage) || [];

let cartContainer = document.getElementById("cart-section");


const comprarCarritoButton = document.createElement("button");
comprarCarritoButton.textContent = "Comprar";
comprarCarritoButton.className = "btn";

const vaciarCarritoButton = document.createElement("button");
vaciarCarritoButton.textContent = "Vaciar Carrito";
vaciarCarritoButton.className = "btn";

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""; 
    let total = 0;

    cartItems.forEach(producto => {
        const cart = document.createElement("div");
        cart.classList.add("producto-carrito");
        cart.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>`;
        
            cartContainer.appendChild(cart);

        total += producto.precio * producto.cantidad;
    });

    const totalContainer = document.createElement("div");
    totalContainer.classList.add("total-container");

    const totalText = document.createElement("h2");
    totalText.textContent = `Total: $${total}`;
    totalText.classList.add("total-text");

    totalContainer.appendChild(totalText);
    totalContainer.appendChild(comprarCarritoButton);
    totalContainer.appendChild(vaciarCarritoButton);

    cartContainer.appendChild(totalContainer);
}

vaciarCarritoButton.addEventListener("click", () => {
    if (cartStorage.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Ya está vacío',
            text: 'No hay productos en el carrito.',
        });
        return;
    }

    Swal.fire({
        title: '¿Vaciar carrito?',
        text: "Se eliminarán todos los productos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("cartProducts");
            cartStorage = [];
            renderCarrito(cartStorage);

            Swal.fire('¡Carrito vaciado!', '', 'success');
        }
    });
});

comprarCarritoButton.addEventListener("click", () => {
    if (cartStorage.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'No hay productos para comprar.',
        });
        return;
    }

    Swal.fire({
        title: '¿Confirmar compra?',
        text: "¿Deseas realizar la compra?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Compra realizada!',
                'Gracias por tu compra.',
                'success'
            );

            localStorage.removeItem("cartProducts");
            cartStorage = [];
            renderCarrito(cartStorage);
        }
    });
});

renderCarrito(cartStorage);
