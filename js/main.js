
const productos = [
  { id: 1, nombre: "1984", precio: 5000 },
  { id: 2, nombre: "Toma el control de tu vida", precio: 8000 },
  { id: 3, nombre: "El poder del ahora", precio: 7000 },
  { id: 4, nombre: "Padre rico, padre pobre", precio: 6000 },
  { id: 5, nombre: "48 Leyes de poder", precio: 9000 }
];

let cartProducts = [];
let cartCounter = document.getElementById("cart-counter");
let productsContainer = document.getElementById("products-container");
let vaciarCarritoButton = document.getElementById("vaciar-carrito");

function actualizarContador() {
  cartCounter.innerText = cartProducts.reduce((acc, producto) => acc + producto.cantidad, 0);
}

function renderProductos(productsArray) {
  productsArray.forEach(producto => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="productoAgregar" id="${producto.id}">Agregar</button>
    `;
    productsContainer.appendChild(card);
  });
  addToCartButton();
}

function addToCartButton() {
  const addButton = document.querySelectorAll(".productoAgregar");
  addButton.forEach(button => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id;
      const selecterProducts = productos.find(producto => producto.id == productId);
      const productoEnCarrito = cartProducts.find(producto => producto.id == selecterProducts.id);

      if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
      } else {
          cartProducts.push({ ...selecterProducts, cantidad: 1 });
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      actualizarContador();
    };
  });
}

if (localStorage.getItem("cartProducts")) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  actualizarContador();
}

renderProductos(productos);

vaciarCarritoButton.addEventListener("click", () => {
  cartProducts = [];
  localStorage.removeItem("cartProducts");
  actualizarContador();
});
