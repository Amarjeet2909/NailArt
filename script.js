// Mobile Menu
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');
const overlay = document.querySelector('.nav-overlay');
const body = document.body;

function toggleMenu() {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    burger.classList.toggle('active');
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

function closeMenu() {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    burger.classList.remove('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Scroll to top
const topBtn=document.getElementById('scrollTop');
window.addEventListener('scroll',()=>{
  topBtn.style.display=window.scrollY>300?'block':'none';
});
topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// Fade on scroll
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('visible');
  });
},{threshold:.2});
document.querySelectorAll('.fade-on-scroll')
.forEach(el=>observer.observe(el));

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const workItems = document.querySelectorAll('.work-item');

let currentImageIndex = 0;
const images = Array.from(workItems).map(item => item.getAttribute('data-image'));

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = images[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage.src = images[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentImageIndex];
}

// Open lightbox on image click
workItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigation
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
});

// Form submission handling
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');
const appointmentDateInput = document.getElementById('appointmentDate');

// Set minimum date to today
if (appointmentDateInput) {
    const today = new Date().toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', today);
}

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('fullName').value,
            phone: document.getElementById('phoneNumber').value,
            email: document.getElementById('email').value,
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show the success message
        
        // Show success message
        successMessage.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        bookingForm.reset();
        
        // Reset minimum date
        if (appointmentDateInput) {
            const today = new Date().toISOString().split('T')[0];
            appointmentDateInput.setAttribute('min', today);
        }
        
        // Optional: Scroll to top of success message
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });
}

// Close success message function
function closeSuccessMessage() {
    successMessage.classList.remove('active');
    document.body.style.overflow = '';
}

// Close success message on outside click
if (successMessage) {
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            closeSuccessMessage();
        }
    });
}

// Close success message on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successMessage.classList.contains('active')) {
        closeSuccessMessage();
    }
});
