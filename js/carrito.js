const itemsCarrito = document.getElementById("itemsCarrito");
const totalSpan = document.getElementById("total");

// Obtener carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar carrito
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
            <p>Bs ${producto.precio}</p>
            <button class="btn-eliminar">Eliminar</button>
        `;

        // Botón eliminar
        div.querySelector("button").addEventListener("click", () => {
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });

        itemsCarrito.appendChild(div);
    });

    totalSpan.textContent = `Bs. ${total}`;
}

// Cargar carrito al abrir la página
mostrarCarrito();

const btn_car = document.getElementById("btn_car");

btn_car.addEventListener("click", (e) => {
    e.preventDefault(); // ⛔ frena el enlace
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("⚠️ El carrito está vacío");
        return;
    }

    // Si NO está vacío, recién pagas
    window.location.href = "pago.html";
});

