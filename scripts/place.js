/*
Arequipa Place Page - WDD131
Script mejorado para calcular sensación térmica y actualizar información
*/

// Función para calcular la sensación térmica usando la fórmula métrica
function calculateWindChill(temperature, windSpeed) {
    // Fórmula métrica para sensación térmica (viento frío)
    // T: temperatura en °C, v: velocidad del viento en km/h
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 
           0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

// Función para formatear fecha de manera legible
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Lima' // Zona horaria de Perú
    };
    
    return date.toLocaleString('es-PE', options);
}

// Función principal que se ejecuta cuando el DOM está listo
function initPage() {
    // Obtener elementos del DOM para el cálculo de sensación térmica
    const tempElement = document.getElementById('temp');
    const windSpeedElement = document.getElementById('wind-speed');
    const windChillElement = document.getElementById('wind-chill');
    
    // Validar que los elementos existan
    if (!tempElement || !windSpeedElement || !windChillElement) {
        console.error('No se encontraron los elementos necesarios para el cálculo de sensación térmica');
        return;
    }
    
    // Convertir valores a números
    const temperature = parseFloat(tempElement.textContent.trim());
    const windSpeed = parseFloat(windSpeedElement.textContent.trim());
    
    // Validar que los valores sean números válidos
    if (isNaN(temperature) || isNaN(windSpeed)) {
        console.error('Valores de temperatura o velocidad del viento no válidos');
        windChillElement.textContent = 'N/A';
        return;
    }
    
    // Calcular sensación térmica si se cumplen las condiciones
    // Condiciones para calcular sensación térmica: temperatura <= 10°C y viento > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)} °C`;
        windChillElement.setAttribute('aria-label', `Sensación térmica: ${windChill.toFixed(1)} grados Celsius`);
    } else {
        windChillElement.textContent = 'N/A';
        windChillElement.setAttribute('aria-label', 'Sensación térmica no aplicable');
    }
    
    // Actualizar información del footer
    updateFooterInfo();
}

// Función para actualizar la información del pie de página
function updateFooterInfo() {
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    // Validar que los elementos existan
    if (!yearElement || !lastModifiedElement) {
        console.error('No se encontraron los elementos del footer');
        return;
    }
    
    // Actualizar año actual
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
    
    // Actualizar última modificación del documento
    const lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = formatDate(lastModified);
}

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initPage);

// Exportar funciones para pruebas (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateWindChill,
        formatDate,
        initPage
    };
}