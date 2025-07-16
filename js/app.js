// Mode Toggle Functionality
const bulkBtn = document.querySelector('.bulk-mode');
const cutBtn = document.querySelector('.cut-mode');
const body = document.body;

bulkBtn.addEventListener('click', () => {
    bulkBtn.classList.add('active');
    cutBtn.classList.remove('active');
    body.style.setProperty('--bat-accent', '#f0c808');
    document.querySelectorAll('.bat-button img').forEach(img => {
        img.style.filter = 'invert(81%) sepia(59%) saturate(638%) hue-rotate(358deg) brightness(102%) contrast(97%)';
    });
});

cutBtn.addEventListener('click', () => {
    cutBtn.classList.add('active');
    bulkBtn.classList.remove('active');
    body.style.setProperty('--bat-accent', '#00a8e8');
    document.querySelectorAll('.bat-button img').forEach(img => {
        img.style.filter = 'invert(62%) sepia(88%) saturate(748%) hue-rotate(166deg) brightness(96%) contrast(101%)';
    });
});

// Initialize Bat Rings
function initBatRings() {
    const rings = document.querySelectorAll('.bat-ring');
    
    rings.forEach(ring => {
        const value = parseInt(ring.getAttribute('data-value'));
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (value / 100) * circumference;
        
        ring.style.setProperty('--circumference', circumference);
        ring.style.setProperty('--offset', offset);
        
        const after = window.getComputedStyle(ring, '::after');
        ring.style.setProperty('--dasharray', circumference);
        ring.style.setProperty('--dashoffset', offset);
    });
}

// Utility Belt Navigation
const beltItems = document.querySelectorAll('.belt-item');
beltItems.forEach(item => {
    item.addEventListener('click', () => {
        beltItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initBatRings();
});
