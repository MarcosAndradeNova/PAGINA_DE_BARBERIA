// ===== DEVICE ID AUTOMÁTICO =====
function obtenerDeviceId() {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("device_id", deviceId);
    console.log("Nuevo dispositivo registrado:", deviceId);
  } else {
    console.log("Dispositivo reconocido:", deviceId);
  }

  return deviceId;
}

// ===== INICIALIZAR =====
document.addEventListener("DOMContentLoaded", () => {
  obtenerDeviceId();
});