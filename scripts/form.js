// Product array
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Populate product dropdown
document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('productName');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
    
    // Set current date as default for installation date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('installDate').value = formattedDate;
    
    // Add interactivity to star ratings
    setupStarRatings();
    
    // Set up form submission with counter
    setupFormSubmission();
    
    // 🔥 CORREGIR: Configurar checkboxes correctamente
    setupCheckboxes();
});

// Enhanced star rating interaction
function setupStarRatings() {
    const ratingOptions = document.querySelectorAll('.radio-option');
    
    ratingOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        const stars = option.querySelector('.star-rating');
        
        stars.addEventListener('click', function() {
            radio.checked = true;
            updateStarDisplay();
        });
        
        option.addEventListener('click', function(e) {
            if (e.target !== radio) {
                radio.checked = true;
                updateStarDisplay();
            }
        });
    });
}

// Update visual display of selected stars
function updateStarDisplay() {
    const allStars = document.querySelectorAll('.star-rating');
    allStars.forEach(star => {
        star.style.color = '#ddd';
    });
    
    const checkedRadio = document.querySelector('input[name="rating"]:checked');
    if (checkedRadio) {
        const ratingValue = parseInt(checkedRadio.value);
        for (let i = 1; i <= ratingValue; i++) {
            const star = document.querySelector(`.radio-option input[value="${i}"] + .star-rating`);
            if (star) {
                star.style.color = '#ffc107';
            }
        }
    }
}

// 🔥 NUEVA FUNCIÓN: Configurar checkboxes correctamente
function setupCheckboxes() {
    const checkboxOptions = document.querySelectorAll('.checkbox-option');
    
    checkboxOptions.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        const label = option.querySelector('label');
        
        // Solo el checkbox y el label deben ser clickeables
        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        label.addEventListener('click', function(e) {
            e.stopPropagation();
            checkbox.checked = !checkbox.checked;
            
            // Disparar evento change para posibles listeners
            const event = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(event);
        });
        
        // Prevenir que el contenedor afecte el checkbox
        option.addEventListener('click', function(e) {
            // Si el click no fue en el checkbox ni en el label
            if (e.target !== checkbox && e.target !== label) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
}

// Set up form submission with counter
function setupFormSubmission() {
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        // Basic validation
        const featureCheckboxes = document.querySelectorAll('input[name="features"]:checked');
        if (featureCheckboxes.length === 0) {
            if (!confirm("You haven't selected any features. Are you sure you want to submit?")) {
                e.preventDefault();
                return;
            }
        }
        
        // ✅ INCREMENT COUNTER BEFORE SUBMITTING
        incrementReviewCounter();
        
        // Allow form to submit normally
        // No need to prevent default
    });
}

// Increment review counter in localStorage
function incrementReviewCounter() {
    let count = localStorage.getItem('reviewCount');
    if (count === null) {
        count = 0;
    } else {
        count = parseInt(count);
    }
    
    count++;
    localStorage.setItem('reviewCount', count);
}