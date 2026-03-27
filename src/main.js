import './style.css'
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Vercel Speed Insights
injectSpeedInsights();

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // Toggle logic for mobile menu will go here
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeUpElements = document.querySelectorAll('.fade-up');
  fadeUpElements.forEach(el => observer.observe(el));

  // Live Indian Time Logic
  const timeSpan = document.getElementById('indian-time');
  if (timeSpan) {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      timeSpan.textContent = formatter.format(new Date()) + ' (IST)';
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Universal Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) {
        const img = item.querySelector('img');
        if (img) {
          lightbox.style.display = 'flex';
          setTimeout(() => lightbox.classList.add('active'), 10);
          lightboxImg.src = img.src;
          document.body.style.overflow = 'hidden';
        }
      }
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        lightboxImg.src = '';
      }, 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }
});
