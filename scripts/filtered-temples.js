// Footer and last modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent += document.lastModified;

// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
hamburgerBtn.addEventListener('click', () => {
    const isActive = mainNav.classList.toggle('active');
    hamburgerBtn.textContent = isActive ? 'X' : '☰';
    hamburgerBtn.setAttribute('aria-expanded', isActive);
});

// Close mobile menu when clicking links
document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mainNav.classList.remove('active');
            hamburgerBtn.textContent = '☰';
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temples (at least 3 more)
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10-12",
        area: 41010,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
    },
    {
        templeName: "Paris France",
        location: "Paris, France",
        dedicated: "2017, May, 21",
        area: 44175,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
    },
    {
        templeName: "Arequipa Peru",
        location: "Arequipa Peru",
        dedicated: "2019, December, 15",
        area: 26969,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/arequipa-peru-temple/arequipa-peru-temple-7186-main.jpg"
    }
];

// Function to create temple card
function createTempleCard(temple) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
        <figcaption>
            <h3>${temple.templeName}</h3>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
        </figcaption>
    `;
    return figure;
}

// Function to render temples
function renderTemples(templesArray) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    templesArray.forEach(temple => {
        const card = createTempleCard(temple);
        gallery.appendChild(card);
    });
}

// Filter functions
function filterOld() {
    return temples.filter(temple => {
        const year = new Date(temple.dedicated).getFullYear();
        return year < 1900;
    });
}

function filterNew() {
    return temples.filter(temple => {
        const year = new Date(temple.dedicated).getFullYear();
        return year > 2000;
    });
}

function filterLarge() {
    return temples.filter(temple => temple.area > 90000);
}

function filterSmall() {
    return temples.filter(temple => temple.area < 10000);
}

// Event listeners for navigation
document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('gallery-title').textContent = 'All Temples';
    renderTemples(temples);
});

document.getElementById('old').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('gallery-title').textContent = 'Old Temples (Before 1900)';
    renderTemples(filterOld());
});

document.getElementById('new').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('gallery-title').textContent = 'New Temples (After 2000)';
    renderTemples(filterNew());
});

document.getElementById('large').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('gallery-title').textContent = 'Large Temples (>90,000 sq ft)';
    renderTemples(filterLarge());
});

document.getElementById('small').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('gallery-title').textContent = 'Small Temples (<10,000 sq ft)';
    renderTemples(filterSmall());
});

// Initial render
renderTemples(temples);