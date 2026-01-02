let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
const panel = document.getElementById("panelAdmin");

function mostrarPanel() {
  panel.innerHTML = "";

  reservas
    .filter(r => r.estado === "pendiente")
    .forEach(r => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>
          💈 ${r.barbero} | ⏰ ${r.horario} | 🆔 ${r.id}
        </p>
        <button onclick="confirmar('${r.id}')">Confirmar pago</button>
        <hr>
      `;
      panel.appendChild(div);
    });
}

function confirmar(id) {
  reservas = reservas.map(r => {
    if (r.id === id) r.estado = "confirmado";
    return r;
  });

  localStorage.setItem("reservas", JSON.stringify(reservas));
  alert("✅ Pago confirmado");
  mostrarPanel();
}

mostrarPanel();
