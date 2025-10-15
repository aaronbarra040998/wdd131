/**
 * proyect/script.js
 * Portfolio JavaScript - Enhanced with dark theme, search functionality
 * Features: Project filtering, modal system, theme switching, contact form
 * Optimized for performance with fetchpriority and srcset
 */

'use strict';

/**
 * PROJECTS DATA
 * Contains all portfolio projects with metadata and file paths
 */
const projects = [
  {
    id: 'temple-album',
    title: 'Temple Album',
    short: 'Responsive temple gallery with optimized images.',
    description: 'Gallery built with HTML, CSS and JS; includes lazy-loading and descriptive captions.',
    tech: ['HTML','CSS','JavaScript'],
    thumb: '../images/a_aba_nigeria_temple_lds_9_11zon_1_11zon.webp',
    imgs: [
      '../images/a_aba_nigeria_temple_lds_9_11zon_1_11zon.webp',
      '../images/b_abuquerque_temple_lds_10_11zon_2_11zon.webp'
    ],
    demo: '../temples.html'
  },
  {
    id: 'filtered-temples',
    title: 'Filtered Temples',
    short: 'Dynamic gallery with filters (old/new/large/small).',
    description: 'Items injected from array and filtered using array methods.',
    tech: ['JavaScript','Accessibility'],
    thumb: '../images/h_auckland_new_zealand_temple_exteriors_7_11zon_8_11zon.webp',
    imgs: [
      '../images/h_auckland_new_zealand_temple_exteriors_7_11zon_8_11zon.webp',
      '../images/i_birmingham_alabama_temple_8_11zon_9_11zon.webp'
    ],
    demo: '../filtered-temples.html'
  },
  {
    id: 'place-arequipa',
    title: 'Place — Arequipa',
    short: 'Arequipa page with wind chill calculation.',
    description: 'Using <picture> for responsive images and wind chill calculation in JS.',
    tech: ['HTML','JavaScript'],
    thumb: '../images/Arequipa1_11zon.webp',
    imgs: [
      '../images/Arequipa1_11zon.webp',
      '../images/plaza-arms-arequipa_11zon.jpg',
      '../images/war_place_aqp_11zon.webp'
    ],
    demo: '../place.html'
  }
];

/**
 * LOCAL STORAGE KEYS
 * Constants for localStorage keys to maintain consistency
 */
const KEYS = {
  FAVS: 'aa_favs_v1',
  CONTACTS: 'aa_contacts_v1',
  THEME: 'aa_theme_v1'
};

// DOM selector helpers
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/**
 * PROJECT CARD TEMPLATE
 * Generates HTML for project cards with performance optimizations
 * MODIFICACIÓN: Solo aplica lazy loading a imágenes fuera del viewport inicial
 */
function cardTemplate(p, index){
  const isAboveFold = index < 3; // Primeros 3 proyectos visibles sin scroll
  
  return `
    <article class="project-card" data-id="${p.id}" tabindex="0" aria-labelledby="${p.id}-title">
      <img 
        src="${p.thumb}" 
        alt="${p.title} thumbnail" 
        ${isAboveFold ? '' : 'loading="lazy"'}
        width="478"
        height="299"
        srcset="${p.thumb} 478w, ${p.thumb} 800w"
        sizes="(max-width: 768px) 100vw, 478px"
      >
      <div class="card-body">
        <h3 id="${p.id}-title">${p.title}</h3>
        <p class="short">${p.short}</p>
        <p class="tech">Tech: ${(p.tech||[]).join(', ')}</p>
        <div class="card-actions">
          <button class="btn view-btn" data-id="${p.id}">View</button>
          <button class="fav" aria-label="toggle favorite" data-id="${p.id}">❤</button>
        </div>
      </div>
    </article>
  `;
}

/**
 * MODAL TEMPLATE
 * Generates HTML for project detail modals - SOLO MUESTRA UNA IMAGEN
 */
function modalTemplate(p){
  // Mostrar solo la primera imagen del array o la imagen principal (thumb)
  const mainImage = p.thumb || (p.imgs && p.imgs[0]);
  const imageHtml = mainImage ? 
    `<div class="modal-image-container">
       <img src="${mainImage}" alt="${p.title} image" loading="lazy" onerror="this.style.display='none'">
     </div>` 
    : '<p class="no-images">(No image available)</p>';
  
  return `
    <div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="modal-tech">
        <strong>Tecnologías:</strong> ${(p.tech||[]).join(', ')}
      </div>
      <div class="modal-images">${imageHtml}</div>
      <p class="modal-demo-link"><a href="${p.demo}" target="_blank" rel="noopener" class="btn">🚀 Ver demo / abrir página</a></p>
    </div>
  `;
}

/**
 * RENDER PROJECTS
 * Displays projects in grid with filtering
 */
function renderProjects(list){
  const grid = $('#projects-grid');
  if(!grid) return;
  
  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No projects found matching your search.</p>';
    return;
  }
  
  grid.innerHTML = list.map((p, index) => cardTemplate(p, index)).join('');
}

/**
 * POPULATE TECH FILTER
 * Fills technology dropdown with unique values from projects
 */
function populateTechFilter(){
  const sel = $('#filter-tech');
  if(!sel) return;
  
  // Clear existing options (except "Show all")
  while (sel.children.length > 1) {
    sel.removeChild(sel.lastChild);
  }
  
  const techs = Array.from(new Set(projects.flatMap(p => p.tech || []))).sort();
  techs.forEach(t => {
    const opt = document.createElement('option'); 
    opt.value = t; 
    opt.textContent = t;
    sel.appendChild(opt);
  });
}

/**
 * APPLY FILTERS
 * Filters projects based on search input and technology selection
 */
function applyFilters(){
  const searchInput = $('#search');
  const techSelect = $('#filter-tech');
  
  if (!searchInput || !techSelect) return;
  
  const q = searchInput.value.trim().toLowerCase();
  const tech = techSelect.value;
  
  console.log('Searching:', q, 'Technology:', tech);
  
  const filteredProjects = projects.filter(p => {
    // Search in title, short description and technologies
    const searchableText = `${p.title} ${p.short} ${p.tech?.join(' ')}`.toLowerCase();
    const matchesSearch = q === '' || searchableText.includes(q);
    
    // Filter by technology
    const matchesTech = tech === 'all' || (p.tech && p.tech.includes(tech));
    
    return matchesSearch && matchesTech;
  });
  
  renderProjects(filteredProjects);
}

/**
 * MODAL MANAGEMENT
 * Handles opening/closing project detail modals with accessibility
 */
let lastFocus = null;

function openModal(id){
  const p = projects.find(x => x.id === id);
  if(!p) return;
  const modal = $('#modal');
  const content = modal.querySelector('.modal-content');
  content.innerHTML = modalTemplate(p);
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close btn ghost';
  closeBtn.textContent = 'Close ×';
  closeBtn.addEventListener('click', closeModal);
  content.prepend(closeBtn);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  lastFocus = document.activeElement;
  closeBtn.focus();
  trapFocus(modal);
}

function closeModal(){
  const modal = $('#modal');
  if(!modal) return;
  releaseFocus(modal);
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  if(lastFocus) lastFocus.focus();
}

function trapFocus(modal){
  const focusable = modal.querySelectorAll('a,button,input,textarea,[tabindex]:not([tabindex="-1"])');
  if(!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length-1];
  function handler(e){
    if(e.key === 'Escape'){ closeModal(); return; }
    if(e.key !== 'Tab') return;
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
  modal._handler = handler;
  document.addEventListener('keydown', handler);
}

function releaseFocus(modal){
  if(modal && modal._handler){ 
    document.removeEventListener('keydown', modal._handler); 
    delete modal._handler; 
  }
}

/**
 * FAVORITES MANAGEMENT
 * Handles favorite projects using localStorage
 */
function getFavs(){ 
  try{ return JSON.parse(localStorage.getItem(KEYS.FAVS) || '[]'); }
  catch{ return []; } 
}

function setFavs(arr){ 
  localStorage.setItem(KEYS.FAVS, JSON.stringify(arr)); 
}

function toggleFavorite(id){
  const favs = getFavs(); 
  const idx = favs.indexOf(id);
  if(idx === -1) favs.push(id); 
  else favs.splice(idx,1);
  setFavs(favs);
  applyFilters();
}

/**
 * CONTACT FORM
 * Handles contact form submission and localStorage saving
 */
function saveContact(data){
  const raw = localStorage.getItem(KEYS.CONTACTS) || '[]';
  let arr = [];
  try{ arr = JSON.parse(raw); }
  catch{ arr = []; }
  arr.push({...data, submittedAt: new Date().toISOString()});
  localStorage.setItem(KEYS.CONTACTS, JSON.stringify(arr));
}

function setupContact(){
  const form = $('#contact-form');
  if(!form) return;
  const status = $('#form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!form.checkValidity()){ 
      status.textContent = 'Please correct the fields.'; 
      status.style.color = 'crimson'; 
      form.reportValidity(); 
      return; 
    }
    const data = Object.fromEntries(new FormData(form).entries());
    saveContact(data);
    status.textContent = 'Message sent and saved locally.';
    status.style.color = 'green';
    form.reset();
  });
}

/**
 * DARK THEME MANAGEMENT
 * Handles theme switching and persistence
 */
function loadThemePreference() {
  try { 
    return localStorage.getItem(KEYS.THEME) || 'light';
  } catch { 
    return 'light'; 
  }
}

function saveThemePreference(theme) { 
  try { 
    localStorage.setItem(KEYS.THEME, theme); 
  } catch(e) { 
    console.warn('Could not save theme preference', e); 
  } 
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = $('#theme-toggle');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'dark');
    const icon = btn.querySelector('.theme-icon');
    const text = btn.querySelector('.text');
    
    if (icon && text) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      text.textContent = theme === 'dark' ? ' Light' : ' Dark';
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  saveThemePreference(newTheme);
}

/**
 * HEADER SCROLL EFFECT
 * Hides header on scroll down, shows on scroll up
 */
function initHeaderScroll() {
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.site-header');
  
  if (!header) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
  });
}

/**
 * NAVIGATION MANAGEMENT
 * Handles mobile navigation toggle
 */
function initNavigation() {
  const navToggle = $('#nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!navToggle || !mainNav) return;
  
  navToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    mainNav.setAttribute('aria-hidden', isExpanded);
    mainNav.classList.toggle('open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.setAttribute('aria-hidden', 'true');
      mainNav.classList.remove('open');
    }
  });
}

/**
 * INITIALIZATION
 * Main initialization function
 */
function init(){
  // Initialize projects if on projects page
  if ($('#projects-grid')) {
    renderProjects(projects);
    populateTechFilter();
    
    const grid = $('#projects-grid');
    if(grid){
      grid.addEventListener('click', (e) => {
        const view = e.target.closest('.view-btn');
        const fav = e.target.closest('.fav');
        if(view){ openModal(view.dataset.id); return; }
        if(fav){ toggleFavorite(fav.dataset.id); return; }
      });
      
      grid.addEventListener('keydown', (e) => { 
        if(e.key === 'Enter'){ 
          const card = e.target.closest('.project-card'); 
          if(card) openModal(card.dataset.id); 
        } 
      });
    }

    // Event listeners for search and filters
    const searchInput = $('#search');
    const techSelect = $('#filter-tech');
    
    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }
    
    if (techSelect) {
      techSelect.addEventListener('change', applyFilters);
    }
  }

  // Initialize contact form if exists
  setupContact();

  // Initialize navigation and effects
  initNavigation();
  initHeaderScroll();

  // Initialize theme
  const savedTheme = loadThemePreference();
  applyTheme(savedTheme);
  
  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Modal events
  $('#modal')?.addEventListener('click', (e) => { 
    if(e.target === $('#modal')) closeModal(); 
  });
  
  document.addEventListener('keydown', (e) => { 
    if(e.key === 'Escape') closeModal(); 
  });

  // Current year in footer
  $('#year') && ($('#year').textContent = new Date().getFullYear());
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);