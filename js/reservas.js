// ====== ELEMENTOS DOM ======
const listaBarberos = document.querySelectorAll('input[name="barbero"]');
const horariosDiv = document.getElementById('horarios');
const calendario = document.getElementById('calendario');
const listaHorarios = document.getElementById('listaHorarios');
const btnReservar = document.getElementById('btnReservar');

// ====== SET MIN DATE ======
const hoySistema = new Date().toISOString().split('T')[0];
calendario.setAttribute('min', hoySistema);

// ====== HORARIOS DISPONIBLES ======
const horarios = [
  "09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00",
  "17:00","18:00","19:00","20:00"
];

// ====== CARGAR RESERVAS YA PAGADAS ======
let reservasConfirmadas = JSON.parse(localStorage.getItem('reservas')) || [];

// ====== FUNCIÓN PARA GENERAR HORARIOS ======
function generarHorarios(barberoElegido, fechaSeleccionada) {
  listaHorarios.innerHTML = '';
  const ahora = new Date();

  horarios.forEach(h => {
    const btnHora = document.createElement('button');
    btnHora.textContent = h;
    btnHora.classList.add('hora');

    // ===== BLOQUEAR HORAS PASADAS SI ES HOY =====
    if (fechaSeleccionada === hoySistema) {
      const [horaBtn, minutoBtn] = h.split(":").map(Number);
      const horaActual = ahora.getHours();
      const minutoActual = ahora.getMinutes();

      const horaYaPaso =
        horaBtn < horaActual ||
        (horaBtn === horaActual && minutoBtn <= minutoActual);

      if (horaYaPaso) {
        btnHora.disabled = true;
        btnHora.classList.add('ocupado');
        btnHora.textContent += " (No disponible)";
      }
    }

    // ===== BLOQUEAR HORAS YA PAGADAS =====
    const ocupado = reservasConfirmadas.some(r =>
      r.barbero === barberoElegido &&
      r.fecha === fechaSeleccionada &&
      r.hora === h &&
      r.pago === true
    );

    if (ocupado) {
      btnHora.disabled = true;
      btnHora.classList.add('ocupado');
      btnHora.textContent += " (Reservado)";
    }

    listaHorarios.appendChild(btnHora);

    // ===== CLICK EN HORA =====
    btnHora.addEventListener('click', () => {
      if (btnHora.disabled) return;

      // desmarcar otras horas
      document.querySelectorAll('.hora').forEach(b =>
        b.classList.remove('seleccionada')
      );

      btnHora.classList.add('seleccionada');
      btnReservar.classList.remove('oculto');

      // ===== GUARDAR RESERVA TEMPORAL =====
      const reservaTemp = {
        id: Date.now(),
        device_id: localStorage.getItem('device_id'),
        barbero: barberoElegido,
        fecha: fechaSeleccionada,
        hora: h,
        servicios: [],
        total: 0,
        pago: false
      };

      localStorage.setItem('reserva_temp', JSON.stringify(reservaTemp));
    });
  });
}

// ====== SELECCIÓN DE BARBERO ======
listaBarberos.forEach(barbero => {
  barbero.addEventListener('change', () => {
    horariosDiv.classList.remove('oculto');
    btnReservar.classList.add('oculto');
    listaHorarios.innerHTML = '';

    // Si ya hay fecha seleccionada, recalcular horarios
    if (calendario.value) {
      generarHorarios(barbero.value, calendario.value);
    }
  });
});

// ====== SELECCIÓN DE FECHA ======
calendario.addEventListener('change', () => {
  const barberoElegido = document.querySelector('input[name="barbero"]:checked')?.value;
  if (!barberoElegido) return;

  generarHorarios(barberoElegido, calendario.value);
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