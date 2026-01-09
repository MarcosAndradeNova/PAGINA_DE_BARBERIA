// ===== ELEMENTOS DEL DOM =====
const totalSpan = document.getElementById("total");
const btnWhatsApp = document.getElementById("enviarWhatsapp");
const inputComprobante = document.getElementById("comprobante");
const btnDescargar = document.getElementById("descargarComprobante");

// ===== INICIALIZAR VARIABLES =====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let reservas = JSON.parse(localStorage.getItem("reservas")) || []; // [{barbero, fecha, hora, servicios: [{nombre, precio}]}]

// ===== BOTONES =====
if(btnWhatsApp) btnWhatsApp.disabled = true;
if(btnDescargar) btnDescargar.disabled = true;

// ===== FUNCIONES AUXILIARES =====
function calcularTotal() {
    let totalProductos = carrito.reduce((sum, p) => sum + Number(p.precio) * (p.cantidad || 1), 0);

    let totalReservas = 0;
    reservas.forEach(r => {
        r.servicios.forEach(s => {
            totalReservas += Number(s.precio);
        });
    });

    return totalProductos + totalReservas;
}

function actualizarTotalDOM() {
    if(totalSpan) totalSpan.textContent = `Bs ${calcularTotal()}`;
}

// ===== ACTUALIZAR TOTAL INICIAL =====
actualizarTotalDOM();

// ===== HABILITAR BOTÓN WHATSAPP AL SUBIR COMPROBANTE =====
if(inputComprobante) {
    inputComprobante.addEventListener("change", () => {
        if (inputComprobante.files.length > 0 && btnWhatsApp) {
            btnWhatsApp.disabled = false;
        }
    });
}

// ===== ENVIAR MENSAJE A WHATSAPP =====
if(btnWhatsApp) {
    btnWhatsApp.addEventListener("click", () => {
        if(carrito.length === 0 && reservas.length === 0){
            alert("⚠️ No hay productos o reservas para pagar");
            return;
        }

        let mensaje = "💈 *Nuevo pago - Barber's Style*\n\n";

        if(carrito.length > 0){
            mensaje += "🛒 *Productos:*\n";
            carrito.forEach(p => {
                mensaje += `• ${p.nombre} x${p.cantidad || 1} — Bs ${p.precio}\n`;
            });
        }

        if(reservas.length > 0){
            mensaje += "\n💺 *Reservas:*\n";
            reservas.forEach(r => {
                mensaje += `Barbero: ${r.barbero}\nFecha: ${r.fecha}\nHora: ${r.hora}\nServicios:\n`;
                r.servicios.forEach(s => {
                    mensaje += `• ${s.nombre} — Bs ${s.precio}\n`;
                });
                mensaje += "\n";
            });
        }

        mensaje += `💰 Total: Bs ${calcularTotal()}\n`;
        mensaje += `🕒 Fecha: ${new Date().toLocaleString()}\n`;
        mensaje += `\n📸 Adjunta el comprobante de pago`;

        const telefono = "59173122588";
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");

        if(btnDescargar) btnDescargar.disabled = false;

        // Guardar horarios pagados
        reservas.forEach(r => {
            const key = `bloqueos_${r.barbero}_${r.fecha}`;
            let bloqueos = JSON.parse(localStorage.getItem(key)) || [];
            if(!bloqueos.includes(r.hora)) bloqueos.push(r.hora);
            localStorage.setItem(key, JSON.stringify(bloqueos));
        });

        // Limpiar carrito y reservas después de enviar
        carrito = [];
        reservas = [];
        localStorage.removeItem("carrito");
        localStorage.removeItem("reservas");
        actualizarTotalDOM();
    });
}

// ===== DESCARGAR COMPROBANTE =====
if(btnDescargar){
    btnDescargar.addEventListener("click", () => {
        let contenido = "💈 *Nuevo pago - Barber's Style*\n\n";

        if(carrito.length > 0){
            contenido += "🛒 Productos:\n";
            carrito.forEach(p => {
                contenido += `• ${p.nombre} x${p.cantidad || 1} — Bs ${p.precio}\n`;
            });
        }

        if(reservas.length > 0){
            contenido += "\n💺 Reservas:\n";
            reservas.forEach(r => {
                contenido += `Barbero: ${r.barbero}\nFecha: ${r.fecha}\nHora: ${r.hora}\nServicios:\n`;
                r.servicios.forEach(s => {
                    contenido += `• ${s.nombre} — Bs ${s.precio}\n`;
                });
                contenido += "\n";
            });
        }

        contenido += `💰 Total: Bs ${calcularTotal()}\n`;
        contenido += `🕒 Fecha: ${new Date().toLocaleString()}\n`;
        contenido += `🕒 Este recibo solo será válido después de haber enviado el comprobante de pago`;

        const lineas = contenido.split("\n");
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = lineas.length * 25 + 20;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";

        let y = 30;
        lineas.forEach(linea => {
            ctx.fillText(linea, 10, y);
            y += 25;
        });

        const enlace = document.createElement("a");
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "comprobante.png";
        enlace.click();
    });
}

// ===== FUNCIONES HORARIOS BLOQUEADOS =====
function estaHoraBloqueada(barbero, fecha, hora){
    const key = `bloqueos_${barbero}_${fecha}`;
    const bloqueos = JSON.parse(localStorage.getItem(key)) || [];
    return bloqueos.includes(hora);
}

// ===== EXPORTAR FUNCIONES PARA RESERVAS =====
function guardarReserva(barbero, fecha, hora, serviciosSeleccionados){
    if(!barbero || !fecha || !hora || serviciosSeleccionados.length === 0){
        alert("⚠️ Debes seleccionar barbero, fecha, hora y al menos un servicio");
        return;
    }

    reservas.push({
        barbero,
        fecha,
        hora,
        servicios: serviciosSeleccionados
    });

    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("✅ Reserva lista para pagar. Dirígete a la sección de pago.");
}
