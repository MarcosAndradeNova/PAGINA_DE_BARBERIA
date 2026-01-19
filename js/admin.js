// ===============================
// ADMIN.JS
// ===============================

// BARBEROS Y CONTRASEÑAS
const barberos = {
  "Carlos": "1234",
  "Javier": "abcd",
  "Pedro": "5678",
  "Oscar": "0000"
};

// ELEMENTOS DOM
const barberoNombre = document.getElementById("barberoNombre");
const passwordBox = document.getElementById("passwordBox");
const panel = document.getElementById("panel");
const lista = document.getElementById("lista");

const barberoPass = document.getElementById("barberoPass");
const verBtn = document.getElementById("verBtn");
const errorPass = document.getElementById("errorPass");

// BARBERO LOGUEADO
const barbero = localStorage.getItem("barbero");

if (!barbero) {
  alert("No hay barbero logueado. Vuelve al inicio.");
  window.location.href = "../index.html";
}

barberoNombre.textContent = `Barbero: ${barbero}`;

// CARGAR RESERVAS
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// VERIFICAR CONTRASEÑA
verBtn.addEventListener("click", () => {
  const pass = barberoPass.value.trim();

  if (barberos[barbero] !== pass) {
    errorPass.textContent = "Contraseña incorrecta";
    return;
  }

  // Correcto
  passwordBox.style.display = "none";
  panel.style.display = "block";
  cargarReservas();
});

// MOSTRAR SOLO SUS RESERVAS
function cargarReservas() {
  lista.innerHTML = "";

  reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  const misReservas = reservas.filter(r => r.barbero === barbero);

  if (misReservas.length === 0) {
    lista.innerHTML = "<p>No tienes reservas pendientes.</p>";
    return;
  }

  misReservas.forEach(res => {
    const div = document.createElement("div");
    div.classList.add("reserva");

    div.innerHTML = `
      <p><strong>Cliente ID:</strong> ${res.device_id}</p>
      <p><strong>Fecha:</strong> ${res.fecha}</p>
      <p><strong>Hora:</strong> ${res.hora}</p>
      <p><strong>Servicios:</strong> ${res.servicios.map(s => s.nombre).join(", ")}</p>
      <p><strong>Total:</strong> Bs ${res.total}</p>
      <p><strong>Estado:</strong> ${res.estado || "Pendiente"}</p>

      <button class="aceptar" ${res.estado ? "disabled" : ""}>Aceptar</button>
      <button class="rechazar" ${res.estado ? "disabled" : ""}>Rechazar</button>
    `;

    // ===== ACEPTAR =====
    div.querySelector(".aceptar").addEventListener("click", () => {
      aceptarReserva(res.id);
    });

    // ===== RECHAZAR =====
    div.querySelector(".rechazar").addEventListener("click", () => {
      rechazarReserva(res.id);
    });

    lista.appendChild(div);
  });
}

// FUNCION ACEPTAR
function aceptarReserva(id) {
  reservas = reservas.map(r => {
    if (r.id === id) {
      r.estado = "Aceptada"; // Cambiar estado
    }
    return r;
  });

  // Guardar cambios
  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("Reserva aceptada ✔");

  // Recargar la lista
  cargarReservas();
}

// FUNCION RECHAZAR
function rechazarReserva(id) {
  // Eliminar reserva
  reservas = reservas.filter(r => r.id !== id);

  // Guardar cambios
  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("Reserva rechazada ❌");

  // Recargar la lista
  cargarReservas();
}

// LOGOUT
function logout() {
  localStorage.removeItem("barbero");
  window.location.href = "../index.html";
}
