// ======= ELEMENTOS DOM =======
const inputPass = document.getElementById('pass');
const btnLogin = document.querySelector('#login button');
const loginDiv = document.getElementById('login');
const panelDiv = document.getElementById('panel');
const listaDiv = document.getElementById('lista');

// ======= CONTRASEÑAS POR PELUQUERO =======
const peluqueros = {
  "Carlos": "1234",
  "Javier": "abcd",
  "Pedro": "5678",
  "Luis": "4321"
};

// ======= LOGIN =======
function login() {
  const pass = inputPass.value.trim();
  let barberoLogueado = null;

  // Verificar contraseña
  for (let nombre in peluqueros) {
    if (peluqueros[nombre] === pass) {
      barberoLogueado = nombre;
      break;
    }
  }

  if (barberoLogueado) {
    alert(`Bienvenido ${barberoLogueado}`);
    loginDiv.style.display = 'none';
    panelDiv.style.display = 'block';
    mostrarReservas(barberoLogueado);
  } else {
    alert("Contraseña incorrecta");
  }
}

// ======= FUNCION PARA MOSTRAR RESERVAS =======
function mostrarReservas(barbero) {
  listaDiv.innerHTML = '';

  // Obtener todas las reservas guardadas
  const reservaGuardada = JSON.parse(localStorage.getItem('reserva') || "[]");
  const serviciosGuardados = JSON.parse(localStorage.getItem('servicios') || "[]");

  // Filtrar por barbero
  if (!reservaGuardada.barbero || reservaGuardada.barbero !== barbero) {
    listaDiv.innerHTML = '<p>No hay reservas pendientes para ti.</p>';
    return;
  }

  const div = document.createElement('div');
  div.classList.add('reserva');
  div.innerHTML = `
    <strong>Barbero:</strong> ${reservaGuardada.barbero}<br>
    <strong>Fecha:</strong> ${reservaGuardada.fecha}<br>
    <strong>Hora:</strong> ${reservaGuardada.hora}<br>
    <strong>Servicios:</strong> ${serviciosGuardados.map(s => s.nombre).join(", ")}<br>
    <strong>Total:</strong> Bs ${serviciosGuardados.reduce((acc, s) => acc + s.precio, 0).toFixed(2)}
  `;

  // Botón para marcar como atendida
  const btnAtendida = document.createElement('button');
  btnAtendida.textContent = "Marcar como atendida";
  btnAtendida.addEventListener('click', () => {
    localStorage.removeItem('reserva');
    localStorage.removeItem('servicios');
    alert("Reserva eliminada");
    mostrarReservas(barbero);
  });

  div.appendChild(btnAtendida);
  listaDiv.appendChild(div);
}
