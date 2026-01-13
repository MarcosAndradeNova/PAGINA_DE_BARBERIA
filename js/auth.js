// ===== DEVICE ID =====
function obtenerDeviceId() {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("device_id", deviceId);
  }

  return deviceId;
}

// ===== VERIFICAR LOGIN =====
function verificarLogin() {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    window.location.href = "../pages/login.html";
  }
}

// ===== INICIALIZAR =====
obtenerDeviceId();
verificarLogin();
