const loginForm = document.getElementById("loginForm");
const usuarioInput = document.getElementById("usuario");
const passInput = document.getElementById("pass");
const errorP = document.getElementById("error");

// 🔐 BARBEROS AUTORIZADOS
const barberos = {
  "Carlos": "1234",
  "Javier": "abcd",
  "Pedro": "5678",
  "Luis": "4321"
};

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = usuarioInput.value.trim();
  const pass = passInput.value.trim();

  if (!barberos[user] || barberos[user] !== pass) {
    errorP.textContent = "Acceso solo para barberos";
    errorP.style.display = "block";
    return;
  }

  // Guardar sesión
  localStorage.setItem("barbero", user);

  // Ir al panel del barbero
  window.location.href = "../pages/admin.html";
});