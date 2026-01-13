// ===============================
// PRODUCTOS - CARRITO POR USUARIO Y DISPOSITIVO
// ===============================

// Lista de productos
const productos = [
  { nombre: "Cera para Cabello", precio: 35, imagen: "../img/ceras.jpeg" },
  { nombre: "Perfume", precio: 35, imagen: "../img/perfume.jpeg" },
  { nombre: "Mascarilla", precio: 35, imagen: "../img/mascarilla.jpeg" },
  { nombre: "Cera para Cabello 2", precio: 35, imagen: "../img/ceras.jpeg" },
  { nombre: "Perfume 2", precio: 35, imagen: "../img/perfumes2.0.jpeg" }
];

// Elementos DOM
const listaProductos = document.getElementById("listaProductos");
const buscarInput = document.getElementById("buscar");

// ===============================
// CLAVE ÚNICA DE CARRITO
// ===============================
function claveCarrito() {
  const userId = localStorage.getItem("user_id");
  const deviceId = localStorage.getItem("device_id");
  return `carrito_${userId}_${deviceId}`;
}

// Obtener carrito actual
let carrito = JSON.parse(localStorage.getItem(claveCarrito())) || [];

// ===============================
// MOSTRAR PRODUCTOS
// ===============================
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

    // Agregar al carrito
    div.querySelector("button").addEventListener("click", () => {
      carrito.push(producto);
      localStorage.setItem(claveCarrito(), JSON.stringify(carrito));
      alert(`${producto.nombre} agregado al carrito`);
    });

    listaProductos.appendChild(div);
  });
}

// Mostrar todos al cargar
mostrarProductos(productos);

// ===============================
// BUSCADOR
// ===============================
buscarInput.addEventListener("input", () => {
  const texto = buscarInput.value.toLowerCase();
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  mostrarProductos(filtrados);
});

// ===============================
// MENÚ HAMBURGUESA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".navbar nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
