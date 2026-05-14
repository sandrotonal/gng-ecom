/* ═══════════════════════════════════════════════════════════════
   GNG — GHETTO NEED GANGSTAZ
   Ana JavaScript Dosyası
   ═══════════════════════════════════════════════════════════════ */

// ═══ SCROLL REVEAL ═══
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('on');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal, .line-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ═══ LAZY LOADING + FADE-IN ═══
function initLazyImages() {
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.classList.add('loaded');
        });
    }
    const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    document.querySelectorAll('img:not(.loaded)').forEach(img => {
        imgObserver.observe(img);
    });
    // Image onload handler
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) img.classList.add('loaded');
        else img.addEventListener('load', function() { this.classList.add('loaded'); });
    });
}

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ═══ TOAST BİLDİRİM ═══
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('up');
        setTimeout(() => {
            toast.classList.remove('up');
        }, 2500);
    }
}
var toast = showToast;

// ═══ NEWSLETTER ═══
function handleNewsletter(e) {
    e.preventDefault();
    const message = document.getElementById('nlMsg');
    if (message) {
        message.classList.remove('hidden');
        message.textContent = 'GNG ailesine hoş geldin.';
        e.target.reset();
        setTimeout(() => {
            message.classList.add('hidden');
        }, 4000);
    }
}

// ═══ PRODUCT SLIDER ═══
function initProductSliders() {
    const sliders = document.querySelectorAll('.product-slider');
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.slider-container');
        const images = container.querySelectorAll('img');
        const dots = slider.querySelectorAll('.slider-dots .dot');
        let currentIndex = 0;
        let autoSlideInterval;
        
        function showSlide(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }
        
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            showSlide(nextIndex);
        }
        
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showSlide(prevIndex);
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Mouse drag support
        let isDragging = false;
        let startX = 0;
        
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            stopAutoSlide();
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
        });
        
        slider.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - e.clientX;
            const dragThreshold = 50;
            
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoSlide();
        });
        
        slider.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                startAutoSlide();
            }
        });
        
        // Start auto slide
        startAutoSlide();
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    });
}

// ═══ SAYFA YÜKLENDİĞİNDE ═══
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    const site = document.getElementById('site');
    if (site) {
        site.style.opacity = '1';
    }
    document.body.style.overflow = 'auto';
    
    initScrollReveal();
    initLazyImages();
    initProductSliders();
});

