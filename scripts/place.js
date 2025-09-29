// Calculate wind chill function
function calculateWindChill(temp, windSpeed) {
    // Formula for metric units (ºC, km/h)
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temp * Math.pow(windSpeed, 0.16));
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set footer content
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // Get weather data
    const temperature = parseFloat(document.getElementById('temperature').textContent);
    const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);
    const windChillElement = document.getElementById('wind-chill');
    
    // Check if wind chill should be calculated
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)} °C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
});