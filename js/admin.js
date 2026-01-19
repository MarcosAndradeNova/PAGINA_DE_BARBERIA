console.log("ADMIN.JS CARGADO");

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

  errorPass.textContent = "";
  passwordBox.style.display = "none";
  panel.style.display = "block";
  cargarReservas();
});

// ===============================
// FUNCION CARGAR RESERVAS
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
    div.dataset.id = res.id; // 🔑 data-id para cada reserva

    div.innerHTML = `
      <p><strong>Cliente ID:</strong> ${res.device_id}</p>
      <p><strong>Fecha:</strong> ${res.fecha}</p>
      <p><strong>Hora:</strong> ${res.hora}</p>
      <p><strong>Servicios:</strong> ${
        Array.isArray(res.servicios)
          ? res.servicios.map(s => typeof s === "string" ? s : s.nombre).join(", ")
          : "Sin servicios"
      }</p>
      <p><strong>Total:</strong> Bs ${res.total}</p>
      <p><strong>Estado:</strong> ${res.estado || "Pendiente"}</p>

      
      
      <button type="button" class="aceptar" ${res.estado === "Aceptada" || res.estado === "Rechazada" ? "disabled" : ""}>Aceptar</button>

      <button type="button" class="rechazar" ${res.estado === "Aceptada" || res.estado === "Rechazada" ? "disabled" : ""}>Rechazar</button>

    `;

    lista.appendChild(div);
  });
}

// ===============================
// DELEGACION GLOBAL PARA BOTONES
// ===============================
document.addEventListener("click", e => {
  const card = e.target.closest(".reserva");
  if (!card) return;

  const id = card.dataset.id;

  if (e.target.classList.contains("aceptar")) {
    aceptarReserva(id);
  }

  if (e.target.classList.contains("rechazar")) {
    rechazarReserva(id);
  }
});

// ===============================
// FUNCION ACEPTAR
// ===============================
function aceptarReserva(id) {
  console.log("CLICK ACEPTAR", id);

  const idNum = Number(id);

  reservas = reservas.map(r => {
    if (Number(r.id) === idNum) {
      r.estado = "Aceptada";
    }
    return r;
  });

  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("Reserva aceptada ✔");
  cargarReservas();
}

// ===============================
// FUNCION RECHAZAR
// ===============================
function rechazarReserva(id) {
  console.log("CLICK RECHAZAR", id);

  const idNum = Number(id);

  reservas = reservas.filter(r => Number(r.id) !== idNum);

  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("Reserva rechazada ❌");
  cargarReservas();
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("barbero");
  window.location.href = "../index.html";
}
