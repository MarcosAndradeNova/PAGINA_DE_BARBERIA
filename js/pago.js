const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const totalSpan = document.getElementById("total");
const btn = document.getElementById("enviarWhatsapp");
const input = document.getElementById("comprobante");

// calcular total
let total = 0;
carrito.forEach(p => {
  total += p.precio * p.cantidad;
});
totalSpan.textContent = total;

// habilitar botón cuando sube imagen
input.addEventListener("change", () => {
  if (input.files.length > 0) {
    btn.disabled = false;
  }
});

// enviar a WhatsApp
btn.addEventListener("click", () => {
  let mensaje = "💈 *Nuevo pago - Barber's Style*\n\n";

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} — Bs ${p.precio * p.cantidad}\n`;
  });

  mensaje += `\n💰 Total: Bs ${total}`;
  mensaje += `\n🕒 Fecha: ${new Date().toLocaleString()}`;
  mensaje += `\n\nAdjunto comprobante de pago 📸`;

  const telefono = "59173122588"; // número del dueño
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});
