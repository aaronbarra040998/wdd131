// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const tempEl = document.getElementById('temp');
  const windEl = document.getElementById('windSpeed');
  const wcEl   = document.getElementById('windChill');
  const yearEl = document.getElementById('year');
  const lastModEl = document.getElementById('lastModified');

  const temp = parseFloat(tempEl?.textContent) || 0;   // °C
  const wind = parseFloat(windEl?.textContent) || 0;   // km/h

  // Función de una sola línea para wind chill (métrica)
  function calculateWindChill(t, v) { return 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16); }

  // Condición métrica: T <= 10°C y V > 4.8 km/h
  if (temp <= 10 && wind > 4.8) {
    const wc = Math.round(calculateWindChill(temp, wind) * 10) / 10;
    wcEl.textContent = `${wc} °C`;
  } else {
    wcEl.textContent = 'N/A';
  }

  // Footer dinámico
  yearEl.textContent = new Date().getFullYear();
  lastModEl.textContent = document.lastModified || 'Desconocida';
});
