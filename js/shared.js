/* ═══════════════════════════════════════════════════════════════
   GNG — Paylaşılan Site Bileşenleri
   Tüm sayfalarda aynı navbar, cart, auth modal ve footer
   ═══════════════════════════════════════════════════════════════ */

var SHARED = {};

SHARED.navbar = function(isSub) {
    var p = isSub ? '../' : '';
    return '<nav class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">\
        <div class="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">\
            <a href="' + p + 'index.html" class="font-mono font-bold text-lg md:text-xl text-white tracking-tight">GNG</a>\
            <div class="hidden lg:flex items-center gap-8">\
                <a href="' + p + 'index.html#drops" class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-300">Drops</a>\
                <a href="' + p + 'index.html#about" class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-300">Hakkında</a>\
                <a href="' + p + 'index.html#lookbook" class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-300">Lookbook</a>\
                <a href="' + p + 'index.html#faq" class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-300">SSS</a>\
                <a href="' + p + 'pages/tracking.html" class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-300">Kargo</a>\
                <a href="' + p + 'pages/contact.html" class="text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-white transition-colors duration-300">İletişim</a>\
            </div>\
            <div class="flex items-center gap-4">\
                <button class="auth-user-icon p-2 text-neutral-500 hover:text-white transition-colors" onclick="openAuth()">\
                    <i data-lucide="user" class="w-4 h-4"></i>\
                </button>\
                <button onclick="openCart()" class="relative p-2 text-neutral-500 hover:text-white transition-colors">\
                    <i data-lucide="shopping-bag" class="w-4 h-4"></i>\
                    <span id="cartN" class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">0</span>\
                </button>\
                <button class="lg:hidden p-2 text-white" onclick="toggleMob()">\
                    <i data-lucide="menu" class="w-5 h-5"></i>\
                </button>\
            </div>\
        </div>\
    </nav>\
    <div id="mobMenu" class="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6 lg:hidden">\
        <a href="' + p + 'index.html#drops" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">DROPS</a>\
        <a href="' + p + 'index.html#about" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">HAKKINDA</a>\
        <a href="' + p + 'index.html#lookbook" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">LOOKBOOK</a>\
        <a href="' + p + 'index.html#faq" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">SSS</a>\
        <a href="' + p + 'pages/tracking.html" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">KARGO</a>\
        <a href="' + p + 'pages/profile.html" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">PROFİL</a>\
        <a href="' + p + 'pages/contact.html" onclick="toggleMob()" class="text-2xl font-main font-black text-white tracking-tight">İLETİŞİM</a>\
        <div class="mt-8 flex items-center justify-center gap-4"><a href="#" class="text-neutral-600 hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="#" class="text-neutral-600 hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="#" class="text-neutral-600 hover:text-white transition-colors"><svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a></div>\
    </div>';
};

SHARED.cartDrawer = function(isSub) {
    var p = isSub ? '' : 'pages/';
    return '<div id="cartBox" class="fixed top-0 right-0 h-full w-full max-w-sm bg-black border-l border-white/5 z-50">\
        <div class="flex items-center justify-between p-6 border-b border-white/5">\
            <span class="text-[10px] uppercase tracking-[0.3em] font-bold">Sepet</span>\
            <button onclick="closeCart()" class="text-neutral-500 hover:text-white transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>\
        </div>\
        <div id="cartItems" class="p-6" style="max-height:calc(100vh - 230px); overflow-y:auto;">\
            <div id="cartEmpty" class="text-center py-20"><p class="text-neutral-600 text-xs">Sepetiniz boş</p></div>\
            <div id="cartList" class="space-y-3"></div>\
        </div>\
        <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">\
            <div class="flex justify-between mb-4">\
                <span class="text-neutral-500 text-xs">Toplam</span>\
                <span id="cartTot" class="font-mono font-bold text-sm">₺0</span>\
            </div>\
            <a href="' + p + 'cart.html" class="w-full bg-white text-black py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 transition-colors inline-block text-center mb-2">Sepeti Görüntüle</a>\
            <button onclick="checkout()" class="w-full border border-white/10 text-white py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:border-white/30 transition-colors">Satın Al</button>\
        </div>\
    </div>\
    <div id="cartOv" class="fixed inset-0 bg-black/70 z-40 hidden" onclick="closeCart()"></div>';
};

SHARED.authModal = function() {
    return '<div id="authModal">\
        <div class="auth-box">\
            <button class="auth-close" onclick="closeAuth()"><i data-lucide="x" class="w-5 h-5"></i></button>\
            <div class="auth-tabs">\
                <button class="auth-tab active" data-tab="login" onclick="switchAuthTab(\'login\')">Giriş</button>\
                <button class="auth-tab" data-tab="register" onclick="switchAuthTab(\'register\')">Kayıt</button>\
            </div>\
            <div id="authFormLogin" class="auth-form active">\
                <div class="space-y-3">\
                    <input type="email" id="authEmail" placeholder="E-posta" autocomplete="email">\
                    <input type="password" id="authPass" placeholder="Şifre" autocomplete="current-password">\
                </div>\
                <label class="auth-remember"><input type="checkbox" checked> <span>Beni hatırla</span></label>\
                <div id="authLoginError" class="auth-error"></div>\
                <div id="authLoginSuccess" class="auth-success"></div>\
                <button class="auth-submit" onclick="authLogin()">Giriş Yap</button>\
                <button class="auth-forgot" onclick="authForgot()">Şifremi Unuttum</button>\
                <div class="auth-divider">veya</div>\
                <div class="auth-social">\
                    <button class="auth-social-btn" onclick="authGoogle()"><i data-lucide="mail"></i> Google ile devam et</button>\
                    <button class="auth-social-btn" onclick="document.getElementById(\'authSmsSection\').classList.toggle(\'hidden\')"><i data-lucide="phone"></i> SMS ile giriş</button>\
                    <div id="authSmsSection" class="hidden space-y-3" style="margin-top:6px">\
                        <input type="tel" id="authSmsPhone" placeholder="Telefon (05XX XXX XX XX)">\
                        <div id="authSmsError" class="auth-error"></div>\
                        <button class="auth-submit" onclick="authSms()">SMS Gönder</button>\
                    </div>\
                </div>\
            </div>\
            <div id="authFormRegister" class="auth-form">\
                <div class="space-y-3">\
                    <input type="text" id="authRegName" placeholder="Ad Soyad" autocomplete="name">\
                    <input type="email" id="authRegEmail" placeholder="E-posta" autocomplete="email">\
                    <input type="password" id="authRegPass" placeholder="Şifre (en az 6 karakter)" autocomplete="new-password" onkeyup="checkPassStrength(this.value)">\
                    <div id="authPassStrength" style="display:none"></div>\
                </div>\
                <div id="authRegError" class="auth-error"></div>\
                <button class="auth-submit" onclick="authRegister()">Kayıt Ol</button>\
                <div class="auth-divider">veya</div>\
                <div class="auth-social">\
                    <button class="auth-social-btn" onclick="authGoogle()"><i data-lucide="mail"></i> Google ile kayıt ol</button>\
                </div>\
            </div>\
        </div>\
    </div>';
};

SHARED.footer = function(isSub) {
    var p = isSub ? '../' : '';
    return '<footer class="border-t border-white/5 pt-10 md:pt-16 pb-6 md:pb-8 bg-black">\
        <div class="max-w-7xl mx-auto px-5 md:px-10">\
            <div class="hidden md:grid md:grid-cols-4 gap-8 mb-16">\
                <div class="md:col-span-1">\
                    <span class="font-mono font-bold text-2xl text-white">GNG</span>\
                    <p class="text-neutral-600 text-xs mt-4 leading-relaxed max-w-xs">Sokaktan doğan, şehrin nabzını taşıyan marka.</p>\
                    <div class="flex gap-3 mt-6">\
                        <a href="#" class="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/20 transition-all"><svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>\
                        <a href="#" class="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/20 transition-all"><svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>\
                        <a href="#" class="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/20 transition-all"><svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>\
                    </div>\
                </div>\
                <div>\
                    <h4 class="text-[9px] uppercase tracking-[0.3em] text-white font-bold mb-5">Mağaza</h4>\
                    <ul class="space-y-2">\
                        <li><a href="' + p + 'index.html#drops" class="text-neutral-500 text-xs hover:text-white transition-colors">Yeni Gelenler</a></li>\
                        <li><a href="' + p + 'index.html#drops" class="text-neutral-500 text-xs hover:text-white transition-colors">Hoodie</a></li>\
                        <li><a href="' + p + 'index.html#drops" class="text-neutral-500 text-xs hover:text-white transition-colors">T-Shirt</a></li>\
                        <li><a href="' + p + 'index.html#drops" class="text-neutral-500 text-xs hover:text-white transition-colors">Pantolon</a></li>\
                        <li><a href="' + p + 'index.html#drops" class="text-neutral-500 text-xs hover:text-white transition-colors">Aksesuar</a></li>\
                    </ul>\
                </div>\
                <div>\
                    <h4 class="text-[9px] uppercase tracking-[0.3em] text-white font-bold mb-5">Bilgi</h4>\
                    <ul class="space-y-2">\
                        <li><a href="' + p + 'index.html#about" class="text-neutral-500 text-xs hover:text-white transition-colors">Hakkımızda</a></li>\
                        <li><a href="' + p + 'pages/shipping.html" class="text-neutral-500 text-xs hover:text-white transition-colors">Beden Rehberi</a></li>\
                        <li><a href="' + p + 'pages/tracking.html" class="text-neutral-500 text-xs hover:text-white transition-colors">Kargo Takip</a></li>\
                        <li><a href="' + p + 'pages/shipping.html" class="text-neutral-500 text-xs hover:text-white transition-colors">İade</a></li>\
                    </ul>\
                </div>\
                <div>\
                    <h4 class="text-[9px] uppercase tracking-[0.3em] text-white font-bold mb-5">Yasal</h4>\
                    <ul class="space-y-2">\
                        <li><a href="' + p + 'pages/privacy.html" class="text-neutral-500 text-xs hover:text-white transition-colors">Gizlilik</a></li>\
                        <li><a href="' + p + 'pages/terms.html" class="text-neutral-500 text-xs hover:text-white transition-colors">Koşullar</a></li>\
                        <li><a href="' + p + 'pages/shipping.html" class="text-neutral-500 text-xs hover:text-white transition-colors">Çerez</a></li>\
                    </ul>\
                </div>\
            </div>\
            <div class="md:hidden flex flex-col items-center gap-4 pb-4">\
                <div class="flex items-center justify-between w-full">\
                    <span class="font-mono font-bold text-lg text-white">GNG</span>\
                    <div class="flex gap-3">\
                        <a href="#" class="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white transition-all"><svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>\
                        <a href="#" class="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white transition-all"><svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>\
                        <a href="#" class="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white transition-all"><svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>\
                    </div>\
                </div>\
                <div class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-center">\
                    <a href="' + p + 'index.html#drops" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Drops</a>\
                    <a href="' + p + 'index.html#about" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Hakkında</a>\
                    <a href="' + p + 'index.html#lookbook" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Lookbook</a>\
                    <a href="' + p + 'index.html#faq" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">SSS</a>\
                    <a href="' + p + 'pages/contact.html" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">İletişim</a>\
                    <a href="' + p + 'pages/tracking.html" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Kargo Takip</a>\
                    <a href="' + p + 'pages/profile.html" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Profil</a>\
                    <a href="' + p + 'pages/privacy.html" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Gizlilik</a>\
                    <a href="' + p + 'pages/terms.html" class="text-neutral-500 text-[10px] uppercase tracking-[0.1em] hover:text-white transition-colors">Koşullar</a>\
                </div>\
            </div>\
            <div class="border-t border-white/5 pt-4 md:pt-6 flex items-center justify-between gap-3">\
                <p class="text-neutral-700 text-[9px] md:text-[10px] font-mono">© 2025 GNG — GHETTO NEED GANGSTAZ</p>\
                <div class="flex items-center gap-2 md:gap-3 text-neutral-700">\
                    <span class="text-[9px] md:text-[10px] font-mono">VISA</span>\
                    <span class="text-[9px] md:text-[10px] font-mono">MC</span>\
                    <span class="text-[9px] md:text-[10px] font-mono">AMEX</span>\
                </div>\
            </div>\
        </div>\
    </footer>';
};

SHARED.init = function(isSub) {
    var navEl = document.getElementById('gng-nav');
    if (navEl) navEl.innerHTML = SHARED.navbar(isSub);
    var cartEl = document.getElementById('gng-cart');
    if (cartEl) cartEl.innerHTML = SHARED.cartDrawer(isSub);
    var authEl = document.getElementById('gng-auth');
    if (authEl) authEl.innerHTML = SHARED.authModal();
    var footEl = document.getElementById('gng-footer');
    if (footEl) footEl.innerHTML = SHARED.footer(isSub);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof updateAuthUI !== 'undefined') updateAuthUI();
    if (typeof updateCart !== 'undefined') updateCart();
};
