document.addEventListener("DOMContentLoaded", () => {

  const barberos = document.querySelectorAll('.barbero input');
  const horariosDiv = document.getElementById('horarios');
  const calendario = document.getElementById('calendario');
  const listaHorarios = document.getElementById('listaHorarios');
  const btnReservar = document.getElementById('btnReservar');

  // ===== CONFIGURAR FECHA MÍNIMA =====
  const hoy = new Date().toISOString().split("T")[0];
  calendario.min = hoy;

  // ===== HORAS DISPONIBLES =====
  const horasDisponibles = [
    "09:00", "10:00", "11:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  // ===== MOSTRAR CALENDARIO AL ELEGIR BARBERO =====
  barberos.forEach(barbero => {
    barbero.addEventListener("change", () => {
      horariosDiv.classList.remove("oculto");
      listaHorarios.innerHTML = "";
      btnReservar.classList.add("oculto");
    });
  });

  // ===== MOSTRAR HORAS AL ELEGIR FECHA =====
  calendario.addEventListener("change", () => {
    listaHorarios.innerHTML = "";
    btnReservar.classList.add("oculto");

    horasDisponibles.forEach(hora => {
      const div = document.createElement("div");
      div.classList.add("hora");
      div.textContent = hora;

      div.addEventListener("click", () => {
        document.querySelectorAll(".hora").forEach(h =>
          h.classList.remove("seleccionado")
        );

        div.classList.add("seleccionado");
        btnReservar.classList.remove("oculto");
      });

      listaHorarios.appendChild(div);
    });
  });

  // ===== MENÚ RESPONSIVO =====
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".navbar nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

});
