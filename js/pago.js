// Obtener elementos del DOM
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const totalSpan = document.getElementById("total");
const btnWhatsApp = document.getElementById("enviarWhatsapp");
const inputComprobante = document.getElementById("comprobante");
const btnDescargar = document.getElementById("descargarComprobante");

// Inicializar botones
btnWhatsApp.disabled = true; // WhatsApp deshabilitado hasta subir comprobante
btnDescargar.disabled = true; // Descarga deshabilitada hasta enviar WhatsApp

// Calcular total
let total = carrito.reduce((sum, p) => sum + Number(p.precio) * (p.cantidad || 1), 0);
totalSpan.textContent = `Bs ${total}`;

// Habilitar botón WhatsApp cuando se sube comprobante
inputComprobante.addEventListener("change", () => {
  if (inputComprobante.files.length > 0) {
    btnWhatsApp.disabled = false;
  }
});

// Enviar a WhatsApp
btnWhatsApp.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("⚠️ El carrito está vacío");
    return;
  }

  // Construir mensaje
  let mensaje = "💈 *Nuevo pago - Barber's Style*\n\n";
  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad || 1} — Bs ${p.precio}\n`;
  });

  let totalComprobante = carrito.reduce((sum, p) => sum + Number(p.precio) * (p.cantidad || 1), 0);
  mensaje += `\n💰 Total: Bs ${totalComprobante}`;
  mensaje += `\n🕒 Fecha: ${new Date().toLocaleString()}`;
  mensaje += `\n\nAdjunta el comprobante de pago 📸`;

  const telefono = "59173122588"; // Número del dueño
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp
  window.open(url, "_blank");

  // ✅ Habilitar botón de descarga después de enviar
  btnDescargar.disabled = false;
});

// Generar comprobante para descargar
function generarComprobante() {
  if (carrito.length === 0) {
    alert("⚠️ No hay productos en el carrito");
    return;
  }

  let contenido = "💈 *Nuevo pago - Barber's Style*\n\n";
  carrito.forEach(p => {
    contenido += `• ${p.nombre} x${p.cantidad || 1} — Bs ${p.precio}\n`;
  });

  let totalComprobante = carrito.reduce((sum, p) => sum + Number(p.precio) * (p.cantidad || 1), 0);
  contenido += `\n💰 Total: Bs ${totalComprobante}`;
  contenido += `\n🕒 Fecha: ${new Date().toLocaleString()}`;
  contenido += `\n🕒 Este recibo solo será válido después `;
  contenido += `\n🕒 Este recibo solo será válido después de haber enviado el comprobante de pago`;
  // Canvas dinámico según cantidad de líneas
  const lineas = contenido.split("\n");
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = lineas.length * 25 + 20;
  const ctx = canvas.getContext("2d");

  // Fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texto negro
  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";

  let y = 30;
  lineas.forEach(linea => {
    ctx.fillText(linea, 10, y);
    y += 25;
  });

  // Descargar como imagen
  const enlace = document.createElement("a");
  enlace.href = canvas.toDataURL("image/png");
  enlace.download = "comprobante.png";
  enlace.click();
}

// Conectar botón de descarga
btnDescargar.addEventListener("click", generarComprobante);
