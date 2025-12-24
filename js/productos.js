// Lista de productos
const productos = [
    { nombre: "Cera para Cabello", precio: 35, imagen: "../img/ceras.jpeg" },
    { nombre: "Perfume", precio: 35, imagen: "../img/perfume.jpeg" },
    { nombre: "Mascarilla", precio: 35, imagen: "../img/mascarilla.jpeg" },
    { nombre: "Cera para Cabello 2", precio: 35, imagen: "../img/ceras.jpeg" },
    { nombre: "Perfume 2", precio: 35, imagen: "../img/perfumes2.0.jpeg" }
];

// Contenedor de productos y buscador
const listaProductos = document.getElementById("listaProductos");
const buscarInput = document.getElementById("buscar");

// Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar productos
function mostrarProductos(productosArray) {
    listaProductos.innerHTML = "";
    productosArray.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">Bs ${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;

        // Botón agregar al carrito
        const boton = div.querySelector("button");
        boton.addEventListener("click", () => {
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert(`${producto.nombre} agregado al carrito`);
        });

        listaProductos.appendChild(div);
    });
}

// Mostrar todos al cargar
mostrarProductos(productos);

// Filtrar productos
buscarInput.addEventListener("input", () => {
    const texto = buscarInput.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    mostrarProductos(filtrados);
});
