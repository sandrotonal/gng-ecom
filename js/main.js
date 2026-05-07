/* ═══════════════════════════════════════════════════════════════
   GNG — GHETTO NEED GANGSTAZ
   Ana JavaScript Dosyası
   ═══════════════════════════════════════════════════════════════ */

// ═══ SPLASH EKRANI ═══
let splashPct = 0;
const splashPctEl = document.getElementById('sPct');
const splashEnterEl = document.getElementById('sEnter');
const enterBtnEl = document.getElementById('enterBtn');

// Splash ekranı sadece ana sayfada çalışsın
if (splashPctEl && splashEnterEl && enterBtnEl) {
    const splashInterval = setInterval(() => {
        splashPct += Math.floor(Math.random() * 12) + 3;
        if (splashPct >= 100) {
            splashPct = 100;
            clearInterval(splashInterval);
            splashPctEl.textContent = '100%';
            splashEnterEl.classList.add('show');
        } else {
            splashPctEl.textContent = splashPct + '%';
        }
    }, 180);

    function enterSite() {
        const splash = document.getElementById('splash');
        const site = document.getElementById('site');
        if (splash) splash.classList.add('done');
        if (site) site.style.opacity = '1';
        document.body.style.overflow = 'auto';
        lucide.createIcons();
        initScrollReveal();
    }

    enterBtnEl.addEventListener('click', enterSite);
    document.addEventListener('keydown', e => {
        const splash = document.getElementById('splash');
        if (e.key === 'Enter' && splash && !splash.classList.contains('done')) {
            enterSite();
        }
    });
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash && !splash.classList.contains('done')) {
            enterSite();
        }
    }, 7000);
}

// ═══ SCROLL REVEAL ═══
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('on');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .line-reveal').forEach(el => {
        observer.observe(el);
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
const toast = showToast;

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
    // Lucide ikonlarını oluştur
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Eğer splash ekranı yoksa, siteyi göster ve overflow'u kaldır
    const splash = document.getElementById('splash');
    const site = document.getElementById('site');
    if (!splash) {
        document.body.style.overflow = 'auto';
        if (site) {
            site.style.opacity = '1';
        }
    }
    
    // Scroll reveal'i başlat (splash ekranı kapandıktan sonra)
    if (!splash || splash.classList.contains('done')) {
        initScrollReveal();
    }
    
    // Product slider'ları başlat
    initProductSliders();
});
