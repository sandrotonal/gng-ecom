/* ═══════════════════════════════════════════════════════════════
   GNG — GHETTO NEED GANGSTAZ
   Sayfa JavaScript Dosyası
   ═══════════════════════════════════════════════════════════════ */

// Script zaten yüklendi mi kontrol et
if (window.gngPagesLoaded) {
    console.log('pages.js zaten yüklendi');
} else {
    window.gngPagesLoaded = true;

// ═══ ÜRÜN DETAY SAYFASI ═══
function initProductPage() {
    const productImages = document.querySelectorAll('.product-gallery img');
    const thumbnails = document.querySelectorAll('.product-thumbnails img');
    
    if (thumbnails.length > 0) {
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                // Aktif thumbnail'i güncelle
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // Ana görseli güncelle
                if (productImages[index]) {
                    productImages.forEach(img => img.classList.remove('active'));
                    productImages[index].classList.add('active');
                }
            });
        });
    }
    
    // Beden seçimi
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Renk seçimi
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
}

// ═══ SEPET SAYFASI ═══
function initCartPage() {
    renderCartPage();
}

// Sepet sayfasında quantity güncelleme
function updateCartQuantity(input, change) {
    const currentValue = parseInt(input.value) || 0;
    const newValue = currentValue + change;

    if (newValue >= 1 && newValue <= 99) {
        input.value = newValue;

        // Sepet verilerini güncelle
        const cartItem = input.closest('.cart-item');
        if (cartItem) {
            const index = Array.from(document.querySelectorAll('.cart-item')).indexOf(cartItem);
            if (index >= 0 && index < cart.length) {
                cart[index].quantity = newValue;
                saveCart();
                updateCart();

                // Toplamı güncelle
                const price = parseFloat(cartItem.dataset.price);
                const total = price * newValue;
                const itemTotal = cartItem.querySelector('.item-total');
                if (itemTotal) {
                    itemTotal.textContent = formatPrice(total);
                }

                // Sepet toplamını güncelle
                updateCartTotal();
            }
        }
    }
}

// Ürünü sepetten güncelle
function updateCartItem(input) {
    const cartItem = input.closest('.cart-item');
    if (!cartItem) return;

    const index = Array.from(document.querySelectorAll('.cart-item')).indexOf(cartItem);
    if (index < 0 || index >= cart.length) return;

    const quantity = parseInt(input.value) || 1;
    if (quantity < 1 || quantity > 99) {
        input.value = cart[index].quantity;
        return;
    }

    // Sepet verilerini güncelle
    cart[index].quantity = quantity;
    saveCart();
    updateCart();

    // Toplamı güncelle
    const price = parseFloat(cartItem.dataset.price);
    const total = price * quantity;
    const itemTotal = cartItem.querySelector('.item-total');
    if (itemTotal) {
        itemTotal.textContent = formatPrice(total);
    }

    // Sepet toplamını güncelle
    updateCartTotal();
}

// Sepet toplamını güncelle
function updateCartTotal() {
    const items = document.querySelectorAll('.cart-item');
    let subtotal = 0;

    items.forEach(item => {
        const price = parseFloat(item.dataset.price);
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        subtotal += price * quantity;
    });

    const shipping = subtotal > 1500 ? 0 : 49;
    const total = subtotal + shipping;

    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping');
    const cartTotal = document.getElementById('cartTotal');

    if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
    if (cartShipping) cartShipping.textContent = shipping === 0 ? 'Ücretsiz' : formatPrice(shipping);
    if (cartTotal) cartTotal.textContent = formatPrice(total);
}

// Sepet sayfasında sepet verilerini göster
function renderCartPage() {
    const cartPageItems = document.getElementById('cartPageItems');
    if (!cartPageItems) return;

    if (cart.length === 0) {
        cartPageItems.innerHTML = `
            <div class="text-center py-20">
                <p class="text-neutral-600 text-xs">Sepetiniz boş</p>
            </div>
        `;
        updateCartTotal();
        return;
    }

    cartPageItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item border border-white/5 p-4 md:p-6 flex gap-4 md:gap-6" data-price="${item.price}">
            <div class="w-24 h-32 md:w-32 md:h-40 flex-shrink-0">
                <img src="https://picsum.photos/seed/gng-d${index + 1}/200/267.jpg" class="w-full h-full object-cover grs" alt="${item.name}">
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-bold text-sm md:text-base text-white uppercase tracking-tight">${item.name}</h3>
                        <p class="text-neutral-600 text-[10px] mt-1">${item.size || 'M'}</p>
                    </div>
                    <button class="remove-item text-neutral-600 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <div class="flex items-center gap-2">
                        <button onclick="updateCartQuantity(this.closest('.cart-item').querySelector('.quantity-input'), -1)" class="w-8 h-8 border border-white/10 text-white flex items-center justify-center hover:border-white/30 transition-colors">
                            <i data-lucide="minus" class="w-3 h-3"></i>
                        </button>
                        <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input w-12 h-8 bg-transparent border border-white/10 text-white text-center font-mono text-xs focus:outline-none focus:border-white/30">
                        <button onclick="updateCartQuantity(this.closest('.cart-item').querySelector('.quantity-input'), 1)" class="w-8 h-8 border border-white/10 text-white flex items-center justify-center hover:border-white/30 transition-colors">
                            <i data-lucide="plus" class="w-3 h-3"></i>
                        </button>
                    </div>
                    <p class="item-total font-mono font-bold text-sm">₺${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Event listener'ları tekrar ekle
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = btn.closest('.cart-item');
            const index = Array.from(document.querySelectorAll('.cart-item')).indexOf(cartItem);
            removeFromCart(index);
            renderCartPage();
        });
    });

    // Quantity input'ları için event listener'lar
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            updateCartItem(input);
        });
    });

    // Lucide ikonlarını oluştur
    lucide.createIcons();

    // Toplamı güncelle
    updateCartTotal();
}

// ═══ ÖDEME SAYFASI ═══
function initCheckoutPage() {
    const checkoutForm = document.getElementById('checkoutForm');
    const sameAsBilling = document.getElementById('sameAsBilling');
    const shippingAddress = document.getElementById('shippingAddress');
    
    // Fatura adresi ile kargo adresi aynı
    if (sameAsBilling && shippingAddress) {
        sameAsBilling.addEventListener('change', () => {
            if (sameAsBilling.checked) {
                shippingAddress.style.display = 'none';
            } else {
                shippingAddress.style.display = 'block';
            }
        });
    }
    
    // Ödeme yöntemi seçimi
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
            
            const methodType = method.dataset.method;
            document.querySelectorAll('.payment-details').forEach(details => {
                details.style.display = 'none';
            });
            const targetDetails = document.getElementById(methodType + 'Details');
            if (targetDetails) {
                targetDetails.style.display = 'block';
            }
        });
    });
    
    // Form gönderimi
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(checkoutForm)) {
                // Ödeme işlemini başlat
                processPayment();
            }
        });
    }
}

function processPayment() {
    const submitBtn = document.getElementById('checkoutSubmit');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> İşleniyor...';
    
    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
        // Siparişi kaydet
        var orders = JSON.parse(localStorage.getItem('gng_orders') || '[]');
        var total = cart.reduce(function(s, item) { return s + item.price * item.quantity; }, 0);
        var shipping = total > 1500 ? 0 : 49;
        orders.unshift({
            id: 'GNG-' + Math.floor(10000 + Math.random() * 90000),
            date: new Date().toLocaleDateString('tr-TR'),
            total: total + shipping,
            status: 'Hazırlanıyor',
            items: JSON.parse(JSON.stringify(cart))
        });
        localStorage.setItem('gng_orders', JSON.stringify(orders));
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Başarılı ödeme sayfasına yönlendir
        window.location.href = 'order-success.html';
    }, 2000);
}

// ═══ HESAP SAYFASI ═══
function initAccountPage() {
    // Tab navigasyonu
    const accountTabs = document.querySelector('.account-tabs');
    if (accountTabs) {
        initTabs(accountTabs);
    }
    
    // Sipariş geçmişi
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(item => {
        const viewDetails = item.querySelector('.view-order-details');
        const orderDetails = item.querySelector('.order-details');
        
        if (viewDetails && orderDetails) {
            viewDetails.addEventListener('click', () => {
                orderDetails.classList.toggle('open');
                viewDetails.textContent = orderDetails.classList.contains('open') 
                    ? 'Detayları Gizle' 
                    : 'Detayları Gör';
            });
        }
    });
    
    // Adres düzenleme
    const editAddressBtns = document.querySelectorAll('.edit-address');
    editAddressBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const addressForm = btn.closest('.address-card').querySelector('.address-form');
            addressForm.classList.toggle('editing');
        });
    });
}

// ═══ İLETİŞİM SAYFASI ═══
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                // Formu gönder
                submitContactForm(contactForm);
            }
        });
    }
}

function submitContactForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
    
    // Simüle edilmiş form gönderimi
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Başarı mesajı göster
        showToast('Mesajınız başarıyla gönderildi!');
        form.reset();
    }, 1500);
}

// ═══ BLOG SAYFASI ═══
function initBlogPage() {
    // Blog kategorileri
    const categoryFilters = document.querySelectorAll('.category-filter');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.category;
            
            // Aktif filtreyi güncelle
            categoryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Blog gönderilerini filtrele
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Blog arama
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const searchTerm = searchInput.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        }, 300));
    }
}

// ═══ KARGO VE İADE SAYFASI ═══
function initShippingPage() {
    // SSS accordion
    const shippingFaq = document.querySelector('.shipping-faq');
    if (shippingFaq) {
        initAccordion(shippingFaq);
    }
}

// ═══ GİZLİLİK POLİTİKASI SAYFASI ═══
function initPrivacyPage() {
    // İçindekiler navigasyonu
    const tocLinks = document.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ═══ KULLANIM KOŞULLARI SAYFASI ═══
function initTermsPage() {
    // İçindekiler navigasyonu
    const tocLinks = document.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ═══ FİLTRE PANELİ AÇ/KAPA ═══
function toggleFilter() {
    const panel = document.getElementById('filterPanel');
    const overlay = document.getElementById('filterOverlay');
    if (!panel) return;
    
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        if (overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        panel.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function closeFilter() {
    const panel = document.getElementById('filterPanel');
    const overlay = document.getElementById('filterOverlay');
    if (panel) panel.classList.add('hidden');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// ═══ ÜRÜN FİLTRELEME & ARAMA ═══
const productData = [
    { name: 'Oversized Hoodie', cat: 'hoodie', price: 1890, instock: true },
    { name: 'Graphic Tee', cat: 'tee', price: 890, instock: false },
    { name: 'Bomber Jacket', cat: 'jacket', price: 3490, instock: true },
    { name: 'Snapback Cap', cat: 'accessory', price: 690, instock: true },
    { name: 'Cargo Pants', cat: 'pants', price: 2290, instock: true },
    { name: 'Shoulder Bag', cat: 'accessory', price: 1190, instock: true },
    { name: 'Ring Set', cat: 'accessory', price: 1490, instock: true },
    { name: 'Çorap 3\'lü', cat: 'accessory', price: 390, instock: true }
];

function initProductFilter() {
    const searchInput = document.getElementById('productSearch');
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    const products = productGrid.querySelectorAll('.prod');
    const filterToggle = document.getElementById('filterToggle');
    const filterPanel = document.getElementById('filterPanel');
    const filterApply = document.getElementById('filterApply');
    const filterReset = document.getElementById('filterReset');
    const filterCloseMobile = document.getElementById('filterCloseMobile');
    const filterTags = document.getElementById('filterTags');
    const catBtns = document.querySelectorAll('.filter-cat-btn');

    let noResult = document.getElementById('noResult');
    if (!noResult) {
        noResult = document.createElement('div');
        noResult.id = 'noResult';
        noResult.className = 'col-span-full text-center py-20 hidden';
        noResult.innerHTML = '<p class="text-neutral-600 text-xs">Eşleşen ürün bulunamadı</p>';
        productGrid.appendChild(noResult);
    }

    let overlay = document.getElementById('filterOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'filterOverlay';
        overlay.className = 'fixed inset-0 bg-black/70 z-[55] hidden';
        document.body.appendChild(overlay);
    }

    function openPanel() {
        if (filterPanel) filterPanel.classList.remove('hidden');
        if (overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        if (filterPanel) filterPanel.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (filterToggle) {
        filterToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (filterPanel.classList.contains('hidden')) {
                openPanel();
            } else {
                closePanel();
            }
        });
    }

    if (filterCloseMobile) {
        filterCloseMobile.addEventListener('click', closePanel);
    }

    if (overlay) {
        overlay.addEventListener('click', closePanel);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && filterPanel && !filterPanel.classList.contains('hidden')) {
            closePanel();
        }
    });

    function getFilters() {
        const sortEl = document.querySelector('input[name="sort"]:checked');
        const stockOnly = document.getElementById('stockFilter') ? document.getElementById('stockFilter').checked : false;
        const activeCat = document.querySelector('.filter-cat-btn.active');
        const category = activeCat ? activeCat.dataset.cat : 'all';
        const priceMin = parseFloat(document.getElementById('priceMin') ? document.getElementById('priceMin').value : '') || 0;
        const priceMax = parseFloat(document.getElementById('priceMax') ? document.getElementById('priceMax').value : '') || Infinity;
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        return { sort: sortEl ? sortEl.value : 'newest', stockOnly: stockOnly, category: category, priceMin: priceMin, priceMax: priceMax, searchTerm: searchTerm };
    }

    function updateFilterTags(filters) {
        var tags = [];
        if (filters.category !== 'all') {
            var names = { hoodie: 'Hoodie', tee: 'Tişört', jacket: 'Ceket', pants: 'Pantolon', accessory: 'Aksesuar' };
            if (names[filters.category]) tags.push(names[filters.category]);
        }
        if (filters.stockOnly) tags.push('Stokta');
        if (filters.priceMin > 0) tags.push('₺' + filters.priceMin + '+');
        if (filters.priceMax < Infinity) tags.push('₺' + filters.priceMax + '-');

        if (!filterTags) return;
        if (tags.length === 0) {
            filterTags.classList.add('hidden');
            filterTags.innerHTML = '';
            var countEl = document.getElementById('filterCount');
            if (countEl) countEl.classList.add('hidden');
            return;
        }
        filterTags.classList.remove('hidden');
        filterTags.innerHTML = tags.map(function(t) {
            return '<span class="text-[9px] uppercase tracking-[0.1em] font-mono border border-white/10 text-neutral-400 px-2.5 py-1.5 inline-block">' + t + '</span>';
        }).join('');

        var countEl = document.getElementById('filterCount');
        if (countEl) {
            countEl.textContent = tags.length;
            countEl.classList.remove('hidden');
        }
    }

    function applyFilter() {
        var filters = getFilters();
        var visible = [];

        products.forEach(function(prod, i) {
            var d = productData[i] || { name: '', cat: '', price: 0, instock: true };
            var name = d.name.toLowerCase();
            var show = true;

            if (filters.searchTerm && name.indexOf(filters.searchTerm) === -1) show = false;
            if (show && filters.category !== 'all' && d.cat !== filters.category) show = false;
            if (show && filters.stockOnly && !d.instock) show = false;
            if (show && (d.price < filters.priceMin || d.price > filters.priceMax)) show = false;

            prod.style.display = show ? '' : 'none';
            if (show) visible.push({ el: prod, data: d, index: i });
        });

        var sortMap = {
            'price-asc': function(a, b) { return a.data.price - b.data.price; },
            'price-desc': function(a, b) { return b.data.price - a.data.price; },
            'newest': function(a, b) { return b.index - a.index; },
            'oldest': function(a, b) { return a.index - b.index; }
        };
        var sortFn = sortMap[filters.sort] || sortMap['newest'];
        visible.sort(sortFn);

        var parent = productGrid;
        visible.forEach(function(v) { parent.appendChild(v.el); });

        noResult.classList.toggle('hidden', visible.length > 0);
        updateFilterTags(filters);
    }

    if (searchInput) searchInput.addEventListener('keyup', applyFilter);
    if (filterApply) filterApply.addEventListener('click', function() { applyFilter(); closePanel(); });

    if (filterReset) filterReset.addEventListener('click', function() {
        document.querySelectorAll('input[name="sort"]').forEach(function(r) { r.checked = r.value === 'newest'; });
        if (document.getElementById('stockFilter')) document.getElementById('stockFilter').checked = false;
        if (document.getElementById('priceMin')) document.getElementById('priceMin').value = '';
        if (document.getElementById('priceMax')) document.getElementById('priceMax').value = '';
        catBtns.forEach(function(b) {
            b.classList.remove('active');
            b.style.borderColor = 'rgba(255,255,255,0.1)';
            b.classList.add('text-neutral-500');
        });
        var first = document.querySelector('.filter-cat-btn[data-cat="all"]');
        if (first) { first.classList.add('active'); first.classList.remove('text-neutral-500'); first.style.borderColor = ''; }
        if (searchInput) searchInput.value = '';
        applyFilter();
        closePanel();
    });

    catBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            catBtns.forEach(function(b) {
                b.classList.remove('active');
                b.classList.add('text-neutral-500');
                b.style.borderColor = 'rgba(255,255,255,0.1)';
            });
            btn.classList.remove('text-neutral-500');
            btn.style.borderColor = '';
            btn.classList.add('active');
            applyFilter();
        });
    });

    applyFilter();
}

// ═══ SAYFA YÜKLENDİĞİNDE ═══
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa tipine göre ilgili başlatma fonksiyonunu çağır
    const pageType = document.body.dataset.page;
    
    // Sepet verilerini yükle
    loadCart();
    
    switch (pageType) {
        case 'product':
            initProductPage();
            break;
        case 'cart':
            initCartPage();
            break;
        case 'checkout':
            initCheckoutPage();
            break;
        case 'account':
            initAccountPage();
            break;
        case 'contact':
            initContactPage();
            break;
        case 'blog':
            initBlogPage();
            break;
        case 'shipping':
            initShippingPage();
            break;
        case 'privacy':
            initPrivacyPage();
            break;
        case 'terms':
            initTermsPage();
            break;
    }
    
    // Ürün filtreleme ve arama (tüm sayfalarda çalışır)
    initProductFilter();
});
}
