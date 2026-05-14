/* ═══════════════════════════════════════════════════════════════
   GNG — GHETTO NEED GANGSTAZ
   Bileşen JavaScript Dosyası
   ═══════════════════════════════════════════════════════════════ */

// Script zaten yüklendi mi kontrol et
if (window.gngComponentsLoaded) {
    console.log('components.js zaten yüklendi');
} else {
    window.gngComponentsLoaded = true;

// ═══ MOBİL MENÜ ═══
var mobileMenuOpen = false;

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    var mobMenu = document.getElementById('mobMenu');
    if (mobMenu) {
        mobMenu.classList.toggle('open', mobileMenuOpen);
    }
}
var toggleMob = toggleMobileMenu;

// ═══ SEPET ═══
var cart = [];

function loadCart() {
    var savedCart = localStorage.getItem('gng_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
}

function saveCart() {
    localStorage.setItem('gng_cart', JSON.stringify(cart));
}

loadCart();
updateCart();

function addToCart(name, price, size, quantity) {
    size = size || 'M';
    quantity = quantity || 1;
    const existing = cart.find(item => item.name === name && item.size === size);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: quantity
        });
    }
    updateCart();
    saveCart();
    showToast(name + ' sepete eklendi');
}
var addCart = addToCart;

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

function checkout() {
    if (cart.length === 0) {
        showToast('Sepetiniz boş');
        openCart();
    } else {
        var base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = base + 'checkout.html';
    }
}

function getCart() {
    return cart;
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
                        <p class="text-neutral-600 text-[10px]">${item.size} — x${item.quantity} — ₺${(item.price * item.quantity).toLocaleString()}</p>
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
    if (cartOv) {
        cartOv.classList.remove('hidden');
        cartOv.classList.add('show');
    }
}

function closeCart() {
    const cartBox = document.getElementById('cartBox');
    const cartOv = document.getElementById('cartOv');
    if (cartBox) cartBox.classList.remove('open');
    if (cartOv) {
        cartOv.classList.remove('show');
        cartOv.classList.add('hidden');
    }
}

// ═══ AUTH (GİRİŞ / KAYIT) ═══
var gngUser = null;

function loadUser() {
    var saved = localStorage.getItem('gng_user');
    if (saved) { try { gngUser = JSON.parse(saved); } catch(e) { gngUser = null; } }
}

function saveUser() {
    if (gngUser) {
        gngUser.lastSeen = Date.now();
        localStorage.setItem('gng_user', JSON.stringify(gngUser));
    } else {
        localStorage.removeItem('gng_user');
    }
}

// Basit şifre hash (SHA-256 simülasyonu - gerçek projede bcrypt kullanın)
function hashPass(pass) {
    var h = 0;
    for (var i = 0; i < pass.length; i++) { h = ((h << 5) - h) + pass.charCodeAt(i); h |= 0; }
    return btoa('gng_' + h + '_' + pass.length + '_salt');
}

// Input güvenlik temizliği
function sanitize(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML.replace(/[<>]/g, '').trim();
}

// Şifre gücü kontrolü
function passStrength(pass) {
    var score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score; // 0-5
}

loadUser();

function openAuth() {
    var modal = document.getElementById('authModal');
    if (modal) modal.classList.add('show');
}

function closeAuth() {
    var modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        document.querySelectorAll('.auth-error, .auth-success').forEach(function(e) { e.classList.remove('show'); e.textContent = ''; });
        document.querySelectorAll('.auth-pass-strength').forEach(function(e) { e.style.display = 'none'; e.innerHTML = ''; });
    }
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(function(t) { t.classList.toggle('active', t.dataset.tab === tab); });
    document.querySelectorAll('.auth-form').forEach(function(f) { f.classList.toggle('active', f.id === 'authForm' + tab.charAt(0).toUpperCase() + tab.slice(1)); });
    document.querySelectorAll('.auth-error, .auth-success').forEach(function(e) { e.classList.remove('show'); e.textContent = ''; });
}

// Şifre gücü göstergesi
function checkPassStrength(val) {
    var el = document.getElementById('authPassStrength');
    if (!el) return;
    if (!val) { el.style.display = 'none'; return; }
    var s = passStrength(val);
    var labels = ['', 'Zayıf', 'Orta', 'İyi', 'Güçlü', 'Çok Güçlü'];
    var colors = ['', '#ff4444', '#ff8800', '#ffcc00', '#88cc00', '#00cc44'];
    el.style.display = 'block';
    el.innerHTML = '<div style="height:3px;background:rgba(255,255,255,0.1);border-radius:2px;margin-top:8px"><div style="height:100%;width:' + (s*20) + '%;background:' + colors[s] + ';border-radius:2px;transition:all 0.3s"></div></div><span style="font-size:9px;color:' + colors[s] + ';font-family:\'Space Mono\',monospace">' + labels[s] + '</span>';
}

function authLogin() {
    var email = document.getElementById('authEmail') ? sanitize(document.getElementById('authEmail').value) : '';
    var pass = document.getElementById('authPass') ? document.getElementById('authPass').value : '';
    var err = document.getElementById('authLoginError');
    if (!email || !pass) { if (err) { err.textContent = 'E-posta ve şifre gerekli'; err.classList.add('show'); } return; }
    var saved = localStorage.getItem('gng_registered');
    var users = saved ? JSON.parse(saved) : [];
    var hashed = hashPass(pass);
    var found = users.find(function(u) { return u.email === email && u.password === hashed; });
    if (!found) { if (err) { err.textContent = 'E-posta veya şifre hatalı'; err.classList.add('show'); } return; }
    gngUser = { name: found.name, email: found.email, phone: found.phone || '', method: 'email' };
    saveUser();
    updateAuthUI();
    closeAuth();
}

function authRegister() {
    var name = document.getElementById('authRegName') ? sanitize(document.getElementById('authRegName').value) : '';
    var email = document.getElementById('authRegEmail') ? sanitize(document.getElementById('authRegEmail').value) : '';
    var pass = document.getElementById('authRegPass') ? document.getElementById('authRegPass').value : '';
    var err = document.getElementById('authRegError');
    if (!name || !email || !pass) { if (err) { err.textContent = 'Tüm alanlar gerekli'; err.classList.add('show'); } return; }
    if (pass.length < 6) { if (err) { err.textContent = 'Şifre en az 6 karakter olmalı'; err.classList.add('show'); } return; }
    var saved = localStorage.getItem('gng_registered');
    var users = saved ? JSON.parse(saved) : [];
    if (users.find(function(u) { return u.email === email; })) { if (err) { err.textContent = 'Bu e-posta zaten kayıtlı'; err.classList.add('show'); } return; }
    var hashed = hashPass(pass);
    users.push({ name: name, email: email, password: hashed, phone: '' });
    localStorage.setItem('gng_registered', JSON.stringify(users));
    gngUser = { name: name, email: email, phone: '', method: 'email' };
    saveUser();
    updateAuthUI();
    closeAuth();
}

function authGoogle() {
    gngUser = { name: 'Google Kullanıcısı', email: 'google_' + Date.now() + '@gmail.com', phone: '', method: 'google' };
    // Google ile kayıt da otomatik (registered users'a ekle)
    var saved = localStorage.getItem('gng_registered');
    var users = saved ? JSON.parse(saved) : [];
    if (!users.find(function(u) { return u.email === gngUser.email; })) {
        users.push({ name: gngUser.name, email: gngUser.email, password: 'google_auth', phone: '' });
        localStorage.setItem('gng_registered', JSON.stringify(users));
    }
    saveUser();
    updateAuthUI();
    closeAuth();
}

function authSms() {
    var phone = document.getElementById('authSmsPhone') ? document.getElementById('authSmsPhone').value.trim() : '';
    var err = document.getElementById('authSmsError');
    if (!phone || phone.length < 10) { if (err) { err.textContent = 'Geçerli bir telefon numarası girin'; err.classList.add('show'); } return; }
    gngUser = { name: 'Kullanıcı', email: '', phone: phone, method: 'sms' };
    saveUser();
    updateAuthUI();
    closeAuth();
}

function authLogout() {
    if (cart.length > 0) {
        if (!confirm('Çıkış yaparsanız sepetiniz temizlenecek. Devam etmek istiyor musunuz?')) return;
        clearCart();
    }
    gngUser = null;
    saveUser();
    updateAuthUI();
    showToast('Çıkış yapıldı');
}

var authResetCode = null;
var authResetEmail = null;

function authForgot() {
    var email = document.getElementById('authEmail') ? sanitize(document.getElementById('authEmail').value) : '';
    var err = document.getElementById('authLoginError');
    var suc = document.getElementById('authLoginSuccess');
    if (!email) { if (err) { err.textContent = 'E-posta adresinizi girin'; err.classList.add('show'); } return; }
    // Check if user exists
    var saved = localStorage.getItem('gng_registered');
    var users = saved ? JSON.parse(saved) : [];
    var found = users.find(function(u) { return u.email === email; });
    if (!found) { if (err) { err.textContent = 'Bu e-posta kayıtlı değil'; err.classList.add('show'); } return; }
    // Generate reset code
    authResetCode = Math.floor(100000 + Math.random() * 900000).toString();
    authResetEmail = email;
    if (err) err.classList.remove('show');
    if (suc) {
        suc.innerHTML = 'Kod gönderildi: <strong>' + authResetCode + '</strong><br><span style="font-size:8px;color:#666">(gerçek projede e-posta ile gelir)</span>';
        suc.classList.add('show');
    }
    // Show code input
    var codeDiv = document.getElementById('authResetCode');
    if (!codeDiv) {
        codeDiv = document.createElement('div');
        codeDiv.id = 'authResetCode';
        codeDiv.className = 'mt-3 space-y-3';
        codeDiv.innerHTML = '<input type="text" id="authCodeInput" placeholder="Kod" class="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-white/30 text-center tracking-[0.3em]"><input type="password" id="authNewPass" placeholder="Yeni şifre (en az 6 karakter)" class="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-white/30"><button onclick="authResetPassword()" class="w-full bg-white text-black py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 transition-all">Şifreyi Sıfırla</button><div id="authResetError" class="auth-error"></div>';
        document.getElementById('authFormLogin').appendChild(codeDiv);
    }
    codeDiv.classList.remove('hidden');
}

function authResetPassword() {
    var code = document.getElementById('authCodeInput') ? document.getElementById('authCodeInput').value.trim() : '';
    var newPass = document.getElementById('authNewPass') ? document.getElementById('authNewPass').value : '';
    var err = document.getElementById('authResetError');
    if (code !== authResetCode) { if (err) { err.textContent = 'Hatalı kod'; err.classList.add('show'); } return; }
    if (!newPass || newPass.length < 6) { if (err) { err.textContent = 'Şifre en az 6 karakter'; err.classList.add('show'); } return; }
    var saved = localStorage.getItem('gng_registered');
    var users = saved ? JSON.parse(saved) : [];
    var idx = users.findIndex(function(u) { return u.email === authResetEmail; });
    if (idx === -1) return;
    users[idx].password = hashPass(newPass);
    localStorage.setItem('gng_registered', JSON.stringify(users));
    var suc = document.getElementById('authLoginSuccess');
    if (suc) { suc.textContent = 'Şifre başarıyla sıfırlandı. Şimdi giriş yapabilirsiniz.'; suc.classList.add('show'); }
    document.getElementById('authResetCode').classList.add('hidden');
    authResetCode = null;
    authResetEmail = null;
}

function updateAuthUI() {
    var icons = document.querySelectorAll('.auth-user-icon');
    icons.forEach(function(icon) {
        if (gngUser) {
            var letter = gngUser.name ? gngUser.name.charAt(0).toUpperCase() : (gngUser.phone ? gngUser.phone.slice(-2) : '?');
            icon.innerHTML = '<a href="' + getProfilePath() + '" class="auth-avatar no-underline">' + letter + '</a>';
            icon.onclick = null;
        } else {
            icon.innerHTML = '<i data-lucide="user" class="w-4 h-4"></i>';
            icon.onclick = openAuth;
        }
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function getProfilePath() {
    var isSub = window.location.pathname.includes('/pages/');
    return isSub ? 'profile.html' : 'pages/profile.html';
}

// Session timeout kontrolü (24 saat)
function checkSession() {
    if (gngUser && gngUser.lastSeen) {
        var elapsed = Date.now() - gngUser.lastSeen;
        if (elapsed > 86400000) { // 24 saat
            gngUser = null;
            saveUser();
            updateAuthUI();
        }
    }
}
checkSession();

document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeAuth();
    });
});

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

} // gngComponentsLoaded kontrolü sonu
