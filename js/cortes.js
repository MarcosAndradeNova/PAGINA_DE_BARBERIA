const checks = document.querySelectorAll('input[type="checkbox"]');
const btnPagar = document.getElementById("btnPagar");

checks.forEach(check => {
    check.addEventListener("change", () => {
        const seleccionados = [...checks].some(c => c.checked);
        if (seleccionados) {
            btnPagar.classList.remove("oculto");
        } else {
            btnPagar.classList.add("oculto");
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
const toggle = document.getElementById('menuToggle');
const nav = document.querySelector('.navbar nav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}
});