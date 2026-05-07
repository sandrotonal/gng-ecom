/* ═══════════════════════════════════════════════════════════════
   GNG — GHETTO NEED GANGSTAZ
   Sayfa JavaScript Dosyası
   ═══════════════════════════════════════════════════════════════ */

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
    const cartItems = document.querySelectorAll('.cart-item');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateCartItem(input);
        });
    });
    
    // Sepeti güncelle
    function updateCartItem(input) {
        const cartItem = input.closest('.cart-item');
        const price = parseFloat(cartItem.dataset.price);
        const quantity = parseInt(input.value);
        const total = price * quantity;
        
        cartItem.querySelector('.item-total').textContent = formatPrice(total);
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
    
    // Ürünü sepetten kaldır
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const cartItem = btn.closest('.cart-item');
            cartItem.remove();
            updateCartTotal();
        });
    });
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

// ═══ SAYFA YÜKLENDİĞİNDE ═══
document.addEventListener('DOMContentLoaded', () => {
    // Sayfa tipine göre ilgili başlatma fonksiyonunu çağır
    const pageType = document.body.dataset.page;
    
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
});
