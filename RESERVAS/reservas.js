const barberos = document.querySelectorAll('input[name="barbero"]');
const horariosBox = document.getElementById("horarios");
const listaHorarios = document.getElementById("listaHorarios");
const btnCortes = document.getElementById("btnCortes");

let barberoSeleccionado = null;
let horarioSeleccionado = null;

// Generar horarios de 8am a 9pm
function generarHorarios() {
    const horas = [];
    for (let h = 8; h <= 21; h++) {
        horas.push(`${h}:00`);
    }
    return horas;
}

// Cuando se selecciona un barbero
barberos.forEach(barbero => {
    barbero.addEventListener("change", () => {
        barberoSeleccionado = barbero.value;
        horarioSeleccionado = null;
        btnCortes.classList.add("oculto");

        listaHorarios.innerHTML = "";
        horariosBox.classList.remove("oculto");

        const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
        const horarios = generarHorarios();

        horarios.forEach(hora => {
            const div = document.createElement("div");
            div.classList.add("horario");
            div.textContent = hora;

            // Si el horario está ocupado
            if (reservas[barberoSeleccionado]?.includes(hora)) {
                div.classList.add("ocupado");
            }

            div.addEventListener("click", () => {
                if (div.classList.contains("ocupado")) return;

                document.querySelectorAll(".horario").forEach(h => 
                    h.classList.remove("seleccionado")
                );

                div.classList.add("seleccionado");
                horarioSeleccionado = hora;

                // Mostrar botón Cortes
                btnCortes.classList.remove("oculto");
            });

            listaHorarios.appendChild(div);
        });
    });
});
