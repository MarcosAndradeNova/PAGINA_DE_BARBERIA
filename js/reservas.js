// ====== ELEMENTOS DOM ======
const listaBarberos = document.querySelectorAll('input[name="barbero"]');
const horariosDiv = document.getElementById('horarios');
const calendario = document.getElementById('calendario');
const listaHorarios = document.getElementById('listaHorarios');
const btnReservar = document.getElementById('btnReservar');

// ====== SET MIN DATE ======
const hoy = new Date().toISOString().split('T')[0];
calendario.setAttribute('min', hoy);

// ====== HORARIOS DISPONIBLES ======
const horarios = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00",
  "17:00","18:00"
];

// ====== CARGAR HORARIOS RESERVADOS ======
let reservasConfirmadas = JSON.parse(localStorage.getItem('confirmadas')) || [];

// ====== SELECCIÓN DE BARBERO ======
listaBarberos.forEach(barbero => {
  barbero.addEventListener('change', () => {
    horariosDiv.classList.remove('oculto');
    btnReservar.classList.add('oculto');
    listaHorarios.innerHTML = '';
  });
});

// ====== SELECCIÓN DE FECHA ======
calendario.addEventListener('change', () => {
  listaHorarios.innerHTML = '';
  const barberoElegido = document.querySelector('input[name="barbero"]:checked')?.value;
  if(!barberoElegido) return;

  horarios.forEach(h => {
    const btnHora = document.createElement('button');
    btnHora.textContent = h;
    btnHora.classList.add('hora');

    // Revisar si ya está reservado
    const ocupado = reservasConfirmadas.some(r => 
      r.barbero === barberoElegido && r.fecha === calendario.value && r.hora === h
    );
    if(ocupado){
      btnHora.disabled = true;
      btnHora.classList.add('ocupado');
      btnHora.textContent += " (Reservado)";
    }

    listaHorarios.appendChild(btnHora);

    btnHora.addEventListener('click', () => {
      // desmarcar otras horas
      document.querySelectorAll('.hora').forEach(b => b.classList.remove('seleccionada'));
      btnHora.classList.add('seleccionada');
      btnReservar.classList.remove('oculto');

      // Guardar reserva temporal en localStorage
      const reserva = { barbero: barberoElegido, fecha: calendario.value, hora: h };
      localStorage.setItem('reserva', JSON.stringify(reserva));
    });
  });
});
