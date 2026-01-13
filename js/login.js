// ===== ELEMENTOS DOM =====
const loginForm = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const errorP = document.getElementById('error');

// ===== EVENTO SUBMIT =====
loginForm.addEventListener('submit', function(e) {
  e.preventDefault(); // evitar recarga de página

  const user = usuarioInput.value.trim();

  if (!user) {
    errorP.textContent = "Ingresa un usuario";
    errorP.style.display = "block";
    return;
  }

  // Guardar usuario en localStorage
  localStorage.setItem("user_id", user);

  // Redirigir a página principal
  window.location.href = "../index.html";
});
