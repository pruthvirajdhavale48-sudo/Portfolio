import fs from 'fs';
import path from 'path';

const portfolioDir = path.join(process.cwd(), 'public/my portfolio');
const files = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Full Portfolio | Wedding Photo Editor</title>
</head>
<body>
  <div id="app">
    <nav class="navbar scrolled" id="navbar">
      <div class="container nav-content">
        <a href="/" class="logo">PD.</a>
        <div class="nav-links">
          <a href="/">Back to Home</a>
        </div>
      </div>
    </nav>

    <section class="section bg-secondary" style="padding-top: 8rem; min-height: 100vh;">
      <div class="container">
        <div class="section-header text-center fade-up">
          <h2 class="section-title">All <span class="text-italic">Edits</span></h2>
          <p class="section-subtitle">A comprehensive showcase of ${files.length} previous edited works.</p>
        </div>

        <div class="gallery-grid" id="portfolio-grid">
          <!-- Images injected via JS -->
        </div>
        
        <div class="text-center fade-up" style="margin-top: 4rem;">
          <button id="load-more-btn" class="btn btn-primary" style="margin-right: 1rem;">Load More</button>
          <a href="/" class="btn btn-outline">Return to Home</a>
        </div>
      </div>
    </section>
  </div>
  
  <div id="lightbox" class="lightbox">
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" id="lightbox-img" alt="Fullscreen Edit">
  </div>
  
  <script type="module">
    import './src/style.css';
    
    const allImages = ${JSON.stringify(files)};
    const grid = document.getElementById('portfolio-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let currentIndex = 0;
    const batchSize = 24; // Load 24 images at a time for optimal performance
    
    function loadImages() {
      const fragment = document.createDocumentFragment();
      const endIndex = Math.min(currentIndex + batchSize, allImages.length);
      
      for (let i = currentIndex; i < endIndex; i++) {
        const file = allImages[i];
        const item = document.createElement('div');
        item.className = 'gallery-item fade-up visible';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        
        const img = document.createElement('img');
        img.src = '/my portfolio/' + file;
        img.alt = 'Edited Work';
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        item.appendChild(img);
        item.appendChild(overlay);
        fragment.appendChild(item);
      }
      
      grid.appendChild(fragment);
      currentIndex = endIndex;
      
      if (currentIndex >= allImages.length) {
        loadMoreBtn.style.display = 'none';
      }
    }
    
    // Initial load
    loadImages();
    
    // Infinite Scroll Implementation
    const scrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentIndex < allImages.length) {
        loadImages();
      }
    }, { rootMargin: '500px' }); // Trigger load 500px before the user reaches the button
    
    if (loadMoreBtn) {
      scrollObserver.observe(loadMoreBtn);
      // Keep click active as an immediate fallback
      loadMoreBtn.addEventListener('click', loadImages);
    }
    
    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    grid.addEventListener('click', (e) => {
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

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('portfolio.html', htmlContent);
console.log('portfolio.html optimized successfully with ' + files.length + ' images.');
