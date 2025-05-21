

let productos = [];
let cartProducts = [];
let cartCounter = document.getElementById("cart-counter");
let productsContainer = document.getElementById("products-container");
let vaciarCarritoButton = document.getElementById("vaciar-carrito");

fetch("./data/libros.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    renderProductos(productos);
  });

function actualizarContador() {
  cartCounter.innerText = cartProducts.reduce((acc, producto) => acc + producto.cantidad, 0);
}

function actualizarCarrito() {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  actualizarContador();
  renderProductos(productos); 
}

function agregarProducto(id) {
  const producto = productos.find(p => p.id === id);
  const productoEnCarrito = cartProducts.find(p => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    cartProducts.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

function quitarProducto(id) {
  const index = cartProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    cartProducts[index].cantidad--;
    if (cartProducts[index].cantidad <= 0) {
      cartProducts.splice(index, 1);
    }
    actualizarCarrito();
  }
}

function renderProductos(productsArray) {
  productsContainer.innerHTML = "";

  productsArray.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");

    const productoEnCarrito = cartProducts.find(p => p.id === producto.id);
    const cantidad = productoEnCarrito ? productoEnCarrito.cantidad : 0;

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <p>Cantidad en carrito: <span id="cantidad-${producto.id}">${cantidad}</span></p>
    `;

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "+";
    btnAgregar.addEventListener("click", () => {
      agregarProducto(producto.id);
    });

    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "-";
    btnQuitar.addEventListener("click", () => {
      quitarProducto(producto.id);
    });

    card.appendChild(btnAgregar);
    card.appendChild(btnQuitar);
    productsContainer.appendChild(card);
  });
}

if (localStorage.getItem("cartProducts")) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  actualizarContador();
}


vaciarCarritoButton.addEventListener("click", () => {
  if (cartProducts.length === 0) {
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
      cartProducts = [];
      localStorage.removeItem("cartProducts");
      actualizarCarrito();

      Swal.fire('¡Carrito vaciado!', '', 'success');
    }
  });
});
