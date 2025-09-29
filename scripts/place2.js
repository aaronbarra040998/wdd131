/*
Madagascar Place Page - WDD131
Script para calcular wind chill y actualizar información dinámica en el footer
*/

// Función para calcular el wind chill usando la fórmula métrica
function calculateWindChill(T, v) {
    return 13.12 + 0.6215 * T - 11.37 * Math.pow(v, 0.16) + 0.3965 * T * Math.pow(v, 0.16);
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener valores de temperatura y velocidad del viento del DOM
    const tempElement = document.getElementById('temp');
    const windSpeedElement = document.getElementById('wind-speed');
    const windChillElement = document.getElementById('wind-chill');
    
    // Convertir a números, eliminando espacios en blanco
    const temp = Number(tempElement.textContent.trim());
    const windSpeed = Number(windSpeedElement.textContent.trim());
    
    // Validar que los valores sean números válidos
    if (!isNaN(temp) && !isNaN(windSpeed)) {
        // Calcular wind chill si se cumplen las condiciones
        if (temp <= 10 && windSpeed > 4.8) {
            const wc = calculateWindChill(temp, windSpeed);
            windChillElement.textContent = `${wc.toFixed(1)} °C`;
        } else {
            windChillElement.textContent = 'N/A';
        }
    } else {
        console.error('Valores de temperatura o velocidad del viento no válidos');
        windChillElement.textContent = 'N/A';
    }
    
    // Actualizar información del footer
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('last-modified');
    
    // Año actual
    yearElement.textContent = new Date().getFullYear();
    
    // Última modificación del documento
    lastModifiedElement.textContent = document.lastModified || 'Unknown';
});