const itemsCarrito = document.getElementById("itemsCarrito");
const totalSpan = document.getElementById("total");

// CLAVE ÚNICA
function claveCarrito() {
  const userId = localStorage.getItem("user_id");
  const deviceId = localStorage.getItem("device_id");
  return `carrito_${userId}_${deviceId}`;
}

let carrito = JSON.parse(localStorage.getItem(claveCarrito())) || [];

// MOSTRAR CARRITO ESTILO PRODUCTOS
function mostrarCarrito() {
  itemsCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = "<p>El carrito está vacío</p>";
    totalSpan.textContent = "Bs. 0";
    return;
  }

  carrito.forEach((producto, index) => {
    total += producto.precio;

    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="precio">Bs ${producto.precio}</p>
      <button class="btn-eliminar">Eliminar</button>
    `;

    div.querySelector(".btn-eliminar").addEventListener("click", () => {
      eliminarProducto(index);
    });

    itemsCarrito.appendChild(div);
  });

  totalSpan.textContent = `Bs. ${total}`;
}

// ELIMINAR PRODUCTO
function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem(claveCarrito(), JSON.stringify(carrito));
  mostrarCarrito();
}

// Mostrar al cargar
mostrarCarrito();
