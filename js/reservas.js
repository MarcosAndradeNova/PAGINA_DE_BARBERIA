let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
let barberoSeleccionado = null;
let horarioSeleccionado = null;

// LIMPIAR RESERVAS PENDIENTES (30 min)
function limpiarPendientes() {
  reservas = reservas.filter(r =>
    r.estado === "confirmado" ||
    Date.now() - r.creadoEn < 30 * 60 * 1000
  );
  localStorage.setItem("reservas", JSON.stringify(reservas));
}
limpiarPendientes();

// HORARIOS BASE
const horariosBase = [
  "08:00","09:00","10:00","11:00",
  "14:00","15:00","16:00","17:00"
];

// SELECCIÓN DE BARBERO
document.querySelectorAll("input[name='barbero']").forEach(input => {
  input.addEventListener("change", () => {
    barberoSeleccionado = input.value;
    mostrarHorarios();
  });
});

// MOSTRAR HORARIOS DISPONIBLES
function mostrarHorarios() {
  const cont = document.getElementById("listaHorarios");
  const bloque = document.getElementById("horarios");
  const btn = document.getElementById("btnReservar");

  cont.innerHTML = "";
  bloque.classList.remove("oculto");
  btn.classList.add("oculto");

  const horaActual = new Date().getHours();

  horariosBase.forEach(h => {
    const hora = parseInt(h.split(":")[0]);

    const ocupado = reservas.some(r =>
      r.barbero === barberoSeleccionado &&
      r.horario === h &&
      r.estado === "confirmado"
    );

    if (ocupado || hora < horaActual) return;

    const div = document.createElement("div");
    div.className = "horario";
    div.textContent = h;

    div.addEventListener("click", () => {
      document.querySelectorAll(".horario").forEach(x => x.classList.remove("seleccionado"));
      div.classList.add("seleccionado");
      horarioSeleccionado = h;
      btn.classList.remove("oculto");
    });

    cont.appendChild(div);
  });
}

// CREAR RESERVA PENDIENTE
document.getElementById("btnReservar").addEventListener("click", () => {
  if (!barberoSeleccionado || !horarioSeleccionado) return;

  const reserva = {
    id: crypto.randomUUID(),
    barbero: barberoSeleccionado,
    horario: horarioSeleccionado,
    servicio: "Servicio estándar",
    estado: "pendiente",
    creadoEn: Date.now()
  };

  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(
    "✅ Reserva creada.\n\n" +
    "Envía el pago por WhatsApp con este ID:\n\n" +
    reserva.id
  );

  window.location.href = "pago.html";
});
