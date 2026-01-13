// ===============================
// PAGO - CARRITO POR USUARIO Y DISPOSITIVO
// ===============================

// Elementos DOM
const totalSpan = document.getElementById("total");
const comprobanteInput = document.getElementById("comprobante");
const btnWhatsapp = document.getElementById("enviarWhatsapp");
const btnDescargar = document.getElementById("descargarComprobante");

// ===============================
// CLAVE ÚNICA DE CARRITO
// ===============================
function claveCarrito() {
  const userId = localStorage.getItem("user_id");
  const deviceId = localStorage.getItem("device_id");
  return `carrito_${userId}_${deviceId}`;
}

// ===============================
// CARGAR CARRITO Y CALCULAR TOTAL
// ===============================
let carrito = JSON.parse(localStorage.getItem(claveCarrito())) || [];

function mostrarTotal() {
  if (!carrito || carrito.length === 0) {
    totalSpan.textContent = "0";
    return;
  }

  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio;
  });

  totalSpan.textContent = total;
}

// Mostrar total al cargar
mostrarTotal();

// ===============================
// HABILITAR BOTONES AL SUBIR COMPROBANTE
// ===============================
comprobanteInput.addEventListener("change", () => {
  if (comprobanteInput.files.length > 0) {
    btnWhatsapp.disabled = false;
    btnDescargar.disabled = false;
  } else {
    btnWhatsapp.disabled = true;
    btnDescargar.disabled = true;
  }
});

// ===============================
// DESCARGAR COMPROBANTE
// ===============================
btnDescargar.addEventListener("click", () => {
  const file = comprobanteInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
});

// ===============================
// ENVIAR POR WHATSAPP
// ===============================
btnWhatsapp.addEventListener("click", () => {
  const file = comprobanteInput.files[0];
  if (!file) return;

  // Número de WhatsApp del negocio (modificar)
  const telefono = "59170000000"; // Formato internacional sin signos

  const mensaje = `Hola, envío mi comprobante de pago del total Bs ${totalSpan.textContent}`;
  const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
  alert("Se abrirá WhatsApp para enviar el comprobante");
});
