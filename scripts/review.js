// Product array (same as in form.js)
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

// Update review counter and display review details
document.addEventListener('DOMContentLoaded', function() {
    // ✅ SOLUCIÓN: Solo mostrar el contador, NO incrementarlo aquí
    displayReviewCounter();
    
    // Display review details from URL parameters
    displayReviewDetails();
    
    // Clear the submission flag
    sessionStorage.removeItem('justSubmitted');
});

// ✅ CORREGIDO: Solo mostrar el contador, no incrementar
function displayReviewCounter() {
    let count = localStorage.getItem('reviewCount') || 0;
    document.getElementById('reviewCount').textContent = count;
}

// Display review details from URL parameters
function displayReviewDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const reviewDetails = document.getElementById('reviewDetails');
    
    // Check if we have any form data (basic validation)
    const hasFormData = urlParams.toString().length > 0;
    
    if (!hasFormData) {
        reviewDetails.innerHTML = `
            <div class="error-message">
                <p>No review data found. Please <a href="form.html">submit a review</a> first.</p>
            </div>
        `;
        return;
    }
    
    // Get product name from ID
    const productId = urlParams.get('productName');
    let productName = 'Unknown Product';
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            productName = product.name;
        }
    }
    
    // Get rating value and create star display
    const ratingValue = urlParams.get('rating');
    let ratingStars = '';
    let ratingText = 'Not rated';
    if (ratingValue) {
        const starCount = parseInt(ratingValue);
        ratingStars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
        ratingText = `${ratingValue}/5 stars`;
    }
    
    // Format installation date
    const installDate = urlParams.get('installDate');
    let formattedDate = 'Not specified';
    if (installDate) {
        const dateObj = new Date(installDate);
        formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Get selected features
    const features = urlParams.getAll('features');
    let featuresList = 'None selected';
    if (features.length > 0) {
        featuresList = '<ul class="feature-list">' + 
            features.map(feature => `<li>${feature}</li>`).join('') + 
            '</ul>';
    }
    
    // Get written review
    const writtenReview = urlParams.get('writtenReview');
    const displayReview = writtenReview || 'No review provided';
    
    // Get user name
    const userName = urlParams.get('userName');
    const displayName = userName || 'Anonymous';
    
    // Build the review details HTML
    const detailsHTML = `
        <div class="review-detail">
            <div class="detail-label">Product:</div>
            <div class="detail-value">${productName}</div>
        </div>
        <div class="review-detail">
            <div class="detail-label">Rating:</div>
            <div class="detail-value">${ratingStars} <br><small>(${ratingText})</small></div>
        </div>
        <div class="review-detail">
            <div class="detail-label">Installation Date:</div>
            <div class="detail-value">${formattedDate}</div>
        </div>
        <div class="review-detail">
            <div class="detail-label">Useful Features:</div>
            <div class="detail-value">${featuresList}</div>
        </div>
        <div class="review-detail">
            <div class="detail-label">Written Review:</div>
            <div class="detail-value">${displayReview}</div>
        </div>
        <div class="review-detail">
            <div class="detail-label">Submitted By:</div>
            <div class="detail-value">${displayName}</div>
        </div>
    `;
    
    reviewDetails.innerHTML = detailsHTML;
}