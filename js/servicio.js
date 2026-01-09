document.addEventListener("DOMContentLoaded", () => {

  /* ===== MENÚ MÓVIL ===== */
  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".navbar nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  /* ===== SERVICIOS ===== */
  const servicios = document.querySelectorAll('input[name="servicio"]');
  const btnPagar = document.getElementById("btnPagar");

  servicios.forEach(servicio => {
    servicio.addEventListener("change", () => {
      // Mostrar botón pagar
      btnPagar.classList.remove("oculto");

      // Guardar servicio seleccionado
      localStorage.setItem("servicio", servicio.value);
    });
  });

  /* ===== OPCIONAL: VERIFICAR DATOS PREVIOS ===== */
  // Si vienen de reservas.html
  const barbero = localStorage.getItem("barbero");
  const fecha = localStorage.getItem("fecha");
  const hora = localStorage.getItem("hora");

  if (!barbero || !fecha || !hora) {
    console.warn("⚠️ Faltan datos de la reserva previa");
  }

});
