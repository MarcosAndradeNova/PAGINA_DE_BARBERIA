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
// ===== LOGIN BARBERO / CLIENTE =====
const btnLogin = document.getElementById("btnLogin");
const loginForm = document.getElementById("loginForm");
const usuarioInput = document.getElementById("usuario");
const passInput = document.getElementById("pass");
const entrarBtn = document.getElementById("entrar");
const errorP = document.getElementById("error");
const btnSolicitudes = document.getElementById("btnSolicitudes");

// Lista de barberos autorizados
const barberos = {
  "Carlos": "1234",
  "Javier": "abcd",
  "Pedro": "5678"
};

// Crear device_id si no existe
if (!localStorage.getItem("device_id")) {
  localStorage.setItem("device_id", crypto.randomUUID());
}

// Mostrar/ocultar botón según sesión
if (localStorage.getItem("barbero")) {
  btnLogin.style.display = "none";
  btnSolicitudes.style.display = "inline-block"; // mostrar solicitudes
} else {
  btnLogin.style.display = "inline-block";
  btnSolicitudes.style.display = "none";
}

// Mostrar formulario al hacer clic
btnLogin.addEventListener("click", () => {
  loginForm.style.display = "block";
});

// Redirigir botón solicitudes
btnSolicitudes.addEventListener("click", () => {
  window.location.href = "../pages/solicitudes.html"; // tu página de solicitudes
});

// Manejar login
entrarBtn.addEventListener("click", () => {
  const user = usuarioInput.value.trim();
  const pass = passInput.value.trim();

  if (!user || !pass) {
    errorP.textContent = "Ingresa nombre y contraseña";
    return;
  }

  // Si es barbero
  if (barberos[user] && barberos[user] === pass) {
    localStorage.setItem("barbero", user);
    btnLogin.style.display = "none";
    loginForm.style.display = "none";
    btnSolicitudes.style.display = "inline-block";
    alert(`Bienvenido ${user}, ahora eres barbero`);
    return;
  }

  // Si es cliente
  if (!barberos[user]) {
    alert("Bienvenido, ahora eres cliente");
    btnLogin.style.display = "none";
    loginForm.style.display = "none";
    return;
  }

  // Contraseña incorrecta
  errorP.textContent = "Contraseña incorrecta";
});