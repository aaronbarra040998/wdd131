// Actualizar el año del copyright
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Actualizar última modificación
document.getElementById('lastModified').textContent += document.lastModified;

// Funcionalidad del menú hamburguesa
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');

hamburgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    
    // Cambiar el ícono entre hamburguesa y X
    if (mainNav.classList.contains('active')) {
        hamburgerBtn.textContent = 'X';
    } else {
        hamburgerBtn.textContent = '☰';
    }
});

// Cerrar el menú al hacer clic en un enlace (solo en móvil)
const navLinks = document.querySelectorAll('#main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mainNav.classList.remove('active');
            hamburgerBtn.textContent = '☰';
        }
    });
});