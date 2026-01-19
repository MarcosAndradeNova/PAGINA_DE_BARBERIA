// ===============================
// SERVICIOS.JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const checks = document.querySelectorAll("input[type=checkbox]");
  const btn = document.getElementById("btnPagar");

  // ===== FUNCIÓN PARA ACTUALIZAR SERVICIOS Y TOTAL =====
  function actualizar() {
    const seleccionados = [];
    let total = 0;

    checks.forEach(c => {
      if (c.checked) {
        // Extraemos nombre y precio del valor
        const texto = c.value;
        const precio = Number(texto.match(/\d+/)[0]);
        seleccionados.push({ nombre: texto, precio });
        total += precio;
      }
    });

    if (seleccionados.length > 0) {
      btn.classList.remove("oculto");
      localStorage.setItem("serviciosReserva", JSON.stringify(seleccionados));
      localStorage.setItem("totalReserva", total);
    } else {
      btn.classList.add("oculto");
    }
  }

  // Escuchar cambios en los checkboxes
  checks.forEach(c => c.addEventListener("change", actualizar));

  // ===== BOTÓN PAGAR =====
  btn.addEventListener("click", () => {
    const reservaTemp = JSON.parse(localStorage.getItem("reserva_temp"));
    const servicios = JSON.parse(localStorage.getItem("serviciosReserva"));
    const total = Number(localStorage.getItem("totalReserva"));

    if (!reservaTemp || !servicios || servicios.length === 0) {
      alert("Error: falta información de la reserva");
      return;
    }

    // Crear la reserva final
    const nuevaReserva = {
      id: reservaTemp.id,
      device_id: reservaTemp.device_id,
      barbero: reservaTemp.barbero,
      fecha: reservaTemp.fecha,
      hora: reservaTemp.hora,
      servicios: servicios,
      total: total,
      pago: true,
      estado: "Pendiente"
    };

    // Guardar en localStorage
    const reservasExistentes = JSON.parse(localStorage.getItem("reservas") || "[]");
    reservasExistentes.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservasExistentes));
    localStorage.removeItem("reserva_temp");

    alert("Reserva enviada al barbero ✔");

    // Redirigir a QR
    window.location.href = "../pages/qr_barber1.html";
  });

  // ===== MENÚ =====
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.navbar nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  console.log("SERVICIO.JS CARGADO");
});

// ===== MENÚ =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.navbar nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});
