const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.bottom-nav a');
let currentIndex = 0;
let scrolling = false;

function showSection(index) {
    sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
    });
    navLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });
    currentIndex = index;
}

// Navbar click
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const index = parseInt(link.getAttribute('data-index'));
        showSection(index);
    });
});

// Scroll event PC
window.addEventListener('wheel', e => {
    if (scrolling) return;
    scrolling = true;
    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        showSection(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
        showSection(currentIndex - 1);
    }
    setTimeout(() => scrolling = false, 400);
});

// Swipe event HP
let startY = 0;
let endY = 0;
window.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
});
window.addEventListener('touchend', e => {
    endY = e.changedTouches[0].clientY;
    let diff = startY - endY;
    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < sections.length - 1) {
            showSection(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
            showSection(currentIndex - 1);
        }
    }
});

// RSVP form
document.getElementById('rsvpForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('rsvpMessage').innerText = "Terima kasih! Konfirmasi Anda sudah terkirim.";
    e.target.reset();
});
