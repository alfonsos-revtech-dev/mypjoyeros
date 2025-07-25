document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre pantallas
    const navLinks = document.querySelectorAll('.nav-link');
    const screens = document.querySelectorAll('.screen');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const logoLink = document.querySelector('.logo-link');

    // Funcionalidad del menú de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('nav-active'));
            link.classList.add('nav-active');
            
            const target = link.getAttribute('data-target');
            screens.forEach(screen => {
                screen.classList.remove('active');
                if(screen.id === target) {
                    screen.classList.add('active');
                    window.scrollTo(0, 0);
                }
            });
            
            nav.classList.remove('active');
        });
    });

    // Toggle del menú móvil
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Logo redirige al inicio
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('nav-active'));
        document.querySelector('[data-target="home"]').classList.add('nav-active');
        
        screens.forEach(screen => {
            screen.classList.remove('active');
            if(screen.id === 'home') {
                screen.classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });

    // Botón "Explorar Colección"
    document.getElementById('explore-btn').addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('nav-active'));
        document.querySelector('[data-target="engagement"]').classList.add('nav-active');
        
        screens.forEach(screen => {
            screen.classList.remove('active');
            if(screen.id === 'engagement') {
                screen.classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });

    // Filtros de productos
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Carrito de compras
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    
    let cart = [];
    
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
            const productImage = productCard.querySelector('img').src;
            
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            updateCart();
            cartModal.classList.add('active');
        });
    });
    
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString('es-MX')} MXN</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartSubtotal.textContent = `$${subtotal.toLocaleString('es-MX')} MXN`;
        cartTotal.textContent = `$${subtotal.toLocaleString('es-MX')} MXN`;
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                if(cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                cart[index].quantity++;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if(cart.length === 0) return;
        
        alert('¡Gracias por tu compra! Serás redirigido a la página de pago...');
        cart = [];
        updateCart();
        cartModal.classList.remove('active');
    });

    // Contador de cuenta regresiva
    function updateCountdown() {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 45);
        targetDate.setHours(23, 59, 59, 999);

        function update() {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }

        update();
        setInterval(update, 1000);
    }

    updateCountdown();

    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // Formulario de contacto
    document.querySelector('.contact-form form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        e.target.reset();
    });

    // Ajustes responsive para móvil
    function setupMobileLayout() {
        const socialLinks = document.querySelector('.social-links');
        if (window.innerWidth <= 768) {
            // Centrar redes sociales
            if (socialLinks) {
                socialLinks.style.justifyContent = 'center';
            }
            
            // Reorganizar elementos del header
            const headerContainer = document.querySelector('.header-container');
            if (headerContainer) {
                headerContainer.style.flexWrap = 'wrap';
                headerContainer.style.justifyContent = 'space-between';
            }
            
            const mobileHeaderLeft = document.createElement('div');
            mobileHeaderLeft.className = 'mobile-header-left';
            
            const menuToggle = document.querySelector('.menu-toggle');
            const logoLink = document.querySelector('.logo-link');
            const cartIcon = document.querySelector('.cart-icon');
            const headerRight = document.querySelector('.header-right');
            
            if (menuToggle && logoLink && cartIcon && headerRight) {
                // Mover elementos al nuevo contenedor
                mobileHeaderLeft.appendChild(menuToggle);
                mobileHeaderLeft.appendChild(logoLink);
                mobileHeaderLeft.appendChild(cartIcon);
                
                // Insertar el nuevo contenedor
                headerContainer.insertBefore(mobileHeaderLeft, headerRight);
                
                // Estilos para el layout móvil
                mobileHeaderLeft.style.display = 'flex';
                mobileHeaderLeft.style.alignItems = 'center';
                mobileHeaderLeft.style.width = '100%';
                mobileHeaderLeft.style.justifyContent = 'space-between';
                mobileHeaderLeft.style.marginBottom = '15px';
                
                cartIcon.style.order = '1';
                logoLink.style.order = '0';
                menuToggle.style.order = '-1';
                menuToggle.style.marginRight = '15px';
            }
        }
    }

    // Ejecutar al cargar y al redimensionar
    setupMobileLayout();
    window.addEventListener('resize', setupMobileLayout);
});