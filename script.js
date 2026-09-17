// Mobile Menu
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');
const overlay = document.querySelector('.nav-overlay');
const body = document.body;
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');

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

  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
  }
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

const heroImage = document.querySelector('.hero-image-container img');
const heroTextBox = document.querySelector('.hero-text-box');
if (heroImage) {
    if (heroImage.complete) {
        heroImage.classList.add('loaded');
    } else {
        heroImage.addEventListener('load', () => {
            heroImage.classList.add('loaded');
        });
    }
}

window.addEventListener('mousemove', (e) => {
    if (!heroTextBox || window.innerWidth <= 768) return;

    const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 8;
    heroTextBox.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
});

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

        const whatsappNumber = '916363879354';
        const whatsappMessage = `Hey !, New Booking Request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nDate: ${formData.date}\nTime: ${formData.time} \nThank You...`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');
        
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
