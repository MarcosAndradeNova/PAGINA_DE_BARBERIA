// ===============================
// BARBEROS Y CONTRASEÑAS
// ===============================
const barberos = {
  "Carlos": "1234",
  "Javier": "abcd",
  "Pedro": "5678",
  "Oscar": "0000"
};

// ===============================
// ELEMENTOS DOM
// ===============================
const barberoNombre = document.getElementById("barberoNombre");
const passwordBox = document.getElementById("passwordBox");
const panel = document.getElementById("panel");
const lista = document.getElementById("lista");

const barberoPass = document.getElementById("barberoPass");
const verBtn = document.getElementById("verBtn");
const errorPass = document.getElementById("errorPass");

// ===============================
// BARBERO LOGUEADO
// ===============================
const barbero = localStorage.getItem("barbero");

if (!barbero) {
  alert("No hay barbero logueado. Vuelve al inicio.");
  window.location.href = "../index.html";
}

barberoNombre.textContent = `Barbero: ${barbero}`;

// ===============================
// CARGAR RESERVAS
// ===============================
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// ===============================
// VERIFICAR CONTRASEÑA
// ===============================
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

// ===============================
// MOSTRAR SOLO SUS RESERVAS
// ===============================
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
      <p><strong>Servicios:</strong> ${res.servicios.join(", ")}</p>
      <p><strong>Total:</strong> Bs ${res.total}</p>
      <p><strong>Estado:</strong> ${res.estado || "Pendiente"}</p>

      <button class="aceptar" ${res.estado ? "disabled" : ""}>Aceptar</button>
      <button class="rechazar" ${res.estado ? "disabled" : ""}>Rechazar</button>
    `;

    // ===== ACEPTAR =====
    div.querySelector(".aceptar").addEventListener("click", () => {
      actualizarEstado(res.id, "Aceptada");
      alert("Reserva aceptada");
      cargarReservas();
    });

    // ===== RECHAZAR =====
    div.querySelector(".rechazar").addEventListener("click", () => {
      actualizarEstado(res.id, "Rechazada");
      alert("Reserva rechazada");
      cargarReservas();
    });

    lista.appendChild(div);
  });
}

// ===============================
// ACTUALIZAR ESTADO
// ===============================
function actualizarEstado(id, estado) {
  reservas = reservas.map(r => {
    if (r.id === id) {
      r.estado = estado;
    }
    return r;
  });

  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("barbero");
  window.location.href = "../index.html";
}
