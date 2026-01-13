document.addEventListener("DOMContentLoaded", () => {
  const checks = document.querySelectorAll("input[type=checkbox]");
  const btn = document.getElementById("btnPagar");

  checks.forEach(() => {
    document.addEventListener("change", () => {
      const seleccionados = [];
      let total = 0;

      checks.forEach(c => {
        if (c.checked) {
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
    });
  });
});
