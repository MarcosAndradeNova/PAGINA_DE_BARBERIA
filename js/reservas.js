const barberos = {
  Carlos: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  Javier: ["10:00", "11:00", "12:00", "16:00"],
  Luis: ["09:30", "10:30", "13:00", "15:30"]
};

const radios = document.querySelectorAll('input[name="barbero"]');
const horariosDiv = document.getElementById("horarios");
const listaHorarios = document.getElementById("listaHorarios");
const btnCortes = document.getElementById("btnCortes");

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
let barberoSeleccionado = null;
let horarioSeleccionado = null;

// elegir barbero
radios.forEach(radio => {
  radio.addEventListener("change", () => {
    barberoSeleccionado = radio.value;
    mostrarHorarios();
  });
});

function mostrarHorarios() {
  listaHorarios.innerHTML = "";
  horariosDiv.classList.remove("oculto");
  btnCortes.classList.add("oculto");

  const horarios = barberos[barberoSeleccionado];

  const ocupados = reservas
    .filter(r => r.barbero === barberoSeleccionado)
    .map(r => r.horario);

  horarios.forEach(hora => {
    if (!ocupados.includes(hora)) {
      const btn = document.createElement("button");
      btn.textContent = hora;
      btn.className = "hora";

      btn.onclick = () => seleccionarHorario(hora);
      listaHorarios.appendChild(btn);
    }
  });
}

function seleccionarHorario(hora) {
  horarioSeleccionado = hora;

  localStorage.setItem("reservaActual", JSON.stringify({
    barbero: barberoSeleccionado,
    horario: horarioSeleccionado
  }));

  btnCortes.classList.remove("oculto");
}
