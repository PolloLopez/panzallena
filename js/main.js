// ir a cada seccion
// Obtener el enlace "Nosotros" y la sección "sobreNosotros"
//const nosotrosLink = document.querySelector('a[href="nosotros"] ');
//const nosotrosSection = document.querySelector('.sobreNosotros');

// Agregar evento de clic al enlace
//nosotrosLink.addEventListener('click', function (event) {
//    // Prevenir el comportamiento predeterminado del enlace
//    event.preventDefault();

    // Hacer scroll suave hacia la sección "sobreNosotros"
   // nosotrosSection.scrollIntoView({ behavior: 'smooth' });
//});


// Obtener todos los enlaces que apuntan a secciones dentro de la página
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
