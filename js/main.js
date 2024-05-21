// ir a cada seccion
// Obtener el enlace "Nosotros" y la sección "sobreNosotros"
const nosotrosLink = document.querySelector('a[href="nosotros"] ');
const nosotrosSection = document.querySelector('.sobreNosotros');

// Agregar evento de clic al enlace
nosotrosLink.addEventListener('click', function (event) {
    // Prevenir el comportamiento predeterminado del enlace
    event.preventDefault();

    // Hacer scroll suave hacia la sección "sobreNosotros"
    nosotrosSection.scrollIntoView({ behavior: 'smooth' });
});