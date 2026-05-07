/* ═══════════════════════════════════════════════════════════════
   GNG — GHETTO NEED GANGSTAZ
   Bileşen JavaScript Dosyası
   ═══════════════════════════════════════════════════════════════ */

// ═══ MOBİL MENÜ ═══
let mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const mobMenu = document.getElementById('mobMenu');
    if (mobMenu) {
        mobMenu.classList.toggle('open', mobileMenuOpen);
    }
}
const toggleMob = toggleMobileMenu;

// ═══ SEPET ═══
let cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    updateCart();
    showToast(name + ' eklendi');
}
const addCart = addToCart;

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const cartN = document.getElementById('cartN');
    const cartTot = document.getElementById('cartTot');
    
    if (cartN) cartN.textContent = count;
    if (cartTot) cartTot.textContent = '₺' + total.toLocaleString();
    
    const cartList = document.getElementById('cartList');
    const cartEmpty = document.getElementById('cartEmpty');
    
    if (!cart.length) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartList) cartList.innerHTML = '';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartList) {
            cartList.innerHTML = cart.map((item, index) => `
                <div class="flex items-center justify-between p-3 border border-white/5">
                    <div>
                        <p class="text-white text-xs font-bold">${item.name}</p>
                        <p class="text-neutral-600 text-[10px]">x${item.quantity} — ₺${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="text-neutral-600 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-3 h-3"></i>
                    </button>
                </div>
            `).join('');
            lucide.createIcons();
        }
    }
}

function openCart() {
    const cartBox = document.getElementById('cartBox');
    const cartOv = document.getElementById('cartOv');
    if (cartBox) cartBox.classList.add('open');
    if (cartOv) cartOv.classList.remove('hidden');
}

function closeCart() {
    const cartBox = document.getElementById('cartBox');
    const cartOv = document.getElementById('cartOv');
    if (cartBox) cartBox.classList.remove('open');
    if (cartOv) cartOv.classList.add('hidden');
}

// ═══ FAQ ═══
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-i');
    if (!answer || !icon) return;
    
    const isOpen = answer.classList.contains('open');
    
    // Tüm FAQ'ları kapat
    document.querySelectorAll('.faq-a').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.faq-i').forEach(el => el.classList.remove('rot'));
    
    // Tıklananı aç (kapalıysa)
    if (!isOpen) {
        answer.classList.add('open');
        icon.classList.add('rot');
    }
}

// ═══ FORM VALIDASYONU ═══
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ═══ EMAIL VALIDASYONU ═══
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ═══ TELEFON VALIDASYONU ═══
function isValidPhone(phone) {
    const re = /^(\+90|0)?[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ═══ QUANTITY SELECTOR ═══
function updateQuantity(input, change) {
    const currentValue = parseInt(input.value) || 0;
    const newValue = currentValue + change;
    
    if (newValue >= 1 && newValue <= 99) {
        input.value = newValue;
        input.dispatchEvent(new Event('change'));
    }
}

// ═══ TABS ═══
function initTabs(container) {
    const tabs = container.querySelectorAll('[data-tab]');
    const contents = container.querySelectorAll('[data-tab-content]');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Tüm tabları devre dışı bırak
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Tıklanan tabı aktif yap
            tab.classList.add('active');
            const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ═══ MODAL ═══
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ═══ ACCORDION ═══
function initAccordion(container) {
    const items = container.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                // Tümünü kapat
                items.forEach(i => {
                    i.classList.remove('open');
                    const itemContent = i.querySelector('.accordion-content');
                    if (itemContent) {
                        itemContent.style.maxHeight = '';
                    }
                });
                
                // Tıklananı aç (kapalıysa)
                if (!isOpen) {
                    item.classList.add('open');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });
}

// ═══ LAZY LOADING ═══
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ═══ LOCAL STORAGE ═══
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Local storage error:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Local storage error:', e);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Local storage error:', e);
    }
}

// ═══ COOKIES ═══
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

// ═══ FORMAT FONKSİYONLARI ═══
function formatPrice(price) {
    return '₺' + price.toLocaleString();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ═══ URL PARAMETRELERİ ═══
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

function removeUrlParam(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.pushState({}, '', url);
}

// ═══ DEBOUNCE ═══
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ═══ THROTTLE ═══
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
