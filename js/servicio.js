document.addEventListener("DOMContentLoaded", () => {
  const checks = document.querySelectorAll("input[type=checkbox]");
  const btn = document.getElementById("btnPagar");

  function actualizar() {
    const seleccionados = [];
    let total = 0;

    checks.forEach(c => {
      if (c.checked) {
        const texto = c.value;
        const precio = Number(texto.match(/\d+/)[0]);
        seleccionados.push(texto);
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

  checks.forEach(c => c.addEventListener("change", actualizar));

  // ===== BOTÓN PAGAR =====
  btn.addEventListener("click", e => {
    e.preventDefault();

    const reservaTemp = JSON.parse(localStorage.getItem("reserva_temp"));
    const servicios = JSON.parse(localStorage.getItem("serviciosReserva"));
    const total = Number(localStorage.getItem("totalReserva"));

    if (!reservaTemp || !servicios) {
      alert("Error en la reserva");
      return;
    }

    const nuevaReserva = {
      ...reservaTemp,
      servicios: servicios,
      total: total,
      pago: true,
      estado: "Pendiente"
    };

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(nuevaReserva);

    localStorage.setItem("reservas", JSON.stringify(reservas));
    localStorage.removeItem("reserva_temp");

    window.location.href = "qr_barber1.html";
  });
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