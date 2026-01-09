document.addEventListener("DOMContentLoaded", () => {

  // ===== RESERVAS =====
  const barberos = document.querySelectorAll('.barbero input');
  const horariosDiv = document.getElementById('horarios');
  const calendario = document.getElementById('calendario');
  const listaHorarios = document.getElementById('listaHorarios');
  const btnReservar = document.getElementById('btnReservar');

  if (calendario) {
    const hoy = new Date().toISOString().split("T")[0];
    calendario.min = hoy;
  }

  const horasDisponibles = [
    "09:00", "10:00", "11:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  barberos.forEach(barbero => {
    barbero.addEventListener("change", () => {
      horariosDiv.classList.remove("oculto");
      listaHorarios.innerHTML = "";
      btnReservar.classList.add("oculto");
    });
  });

  if (calendario) {
    calendario.addEventListener("change", () => {
      listaHorarios.innerHTML = "";
      btnReservar.classList.add("oculto");

      horasDisponibles.forEach(hora => {
        const div = document.createElement("div");
        div.classList.add("hora");
        div.textContent = hora;

        div.addEventListener("click", () => {
          document.querySelectorAll(".hora")
            .forEach(h => h.classList.remove("seleccionado"));

          div.classList.add("seleccionado");
          btnReservar.classList.remove("oculto");
        });

        listaHorarios.appendChild(div);
      });
    });
  }

  // ===== MENÚ MÓVIL =====
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.navbar nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

});
