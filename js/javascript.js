   // Welcome text animation
        const welcomeText = document.getElementById('welcomeText');
        let welcomeIndex = 0;
        const welcomeTexts = [
            "Welcome to your online shopping",
            "We sell the best fashion outfits"
        ];
        
        function changeWelcomeText() {
            welcomeIndex = (welcomeIndex + 1) % welcomeTexts.length;
            welcomeText.textContent = welcomeTexts[welcomeIndex];
            welcomeText.style.opacity = 0;
            
            setTimeout(() => {
                welcomeText.style.opacity = 1;
            }, 300);
        }
        
        // Change welcome text every 5 seconds
        setInterval(changeWelcomeText, 5000);
        
        // Banner slider
        let currentBannerIndex = 0;
        const banners = document.querySelectorAll('.banner-slide');
        
        function showNextBanner() {
            // Hide current banner
            banners[currentBannerIndex].classList.remove('active');
            
            // Move to next banner
            currentBannerIndex = (currentBannerIndex + 1) % banners.length;
            
            // Show next banner
            banners[currentBannerIndex].classList.add('active');
        }
        
        // Change banner every 4 seconds
        setInterval(showNextBanner, 4000);
        
        // Navigation button active state
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
        /*
        // Add to cart button functionality
        const addToCartButtons = document.querySelectorAll('.add-btn');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the cart count element
                const cartCount = document.querySelector('.cart-count');
                const mobileCartCount = document.querySelector('.mobile-cart-count');
                
                // Get the current count and increment
                let count = parseInt(cartCount.textContent);
                count++;
                cartCount.textContent = count;
                mobileCartCount.textContent = count;
                
                // Visual feedback
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                this.style.backgroundColor = '#28a745';
                
                // Reset button text after 1.5 seconds
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
                    this.style.backgroundColor = '';
                }, 1500);
            });
        });*/
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
        
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                e.target !== mobileMenuBtn) {
                mobileMenu.classList.remove('active');
            }
        });
        
        /* Cart functionality*/
        const cartBtns = document.querySelectorAll('.cart-btn');
        const closeCartBtn = document.getElementById('closeCartBtn');
        const cartModal = document.getElementById('cartModal');
        
        cartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cartModal.classList.add('active');
            });
        });
        
        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (cartModal.classList.contains('active') && 
                !cartModal.contains(e.target) && 
                !Array.from(cartBtns).includes(e.target) &&
                e.target !== closeCartBtn) {
                cartModal.classList.remove('active');
            }
        });


   document.addEventListener('DOMContentLoaded', () => {
    // Function to update the cart count in the UI
    const updateCartCount = () => {
        // Retrieve the cart from localStorage or initialize an empty array
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Calculate the total quantity of all items in the cart
        const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

        // Update the cart count in the UI
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalQuantity;
        }
    };

    // Select all product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(productCard => {
        const productTitle = productCard.querySelector('.product-title').innerText;
        const productPrice = productCard.querySelector('.product-price').innerText;
        const productImage = productCard.querySelector('.product-img').src;

        const addToCartButton = productCard.querySelector('.add-btn');

        addToCartButton.addEventListener('click', () => {
            // Create a product object with a default quantity of 1
            const product = {
                title: productTitle,
                price: productPrice,
                image: productImage,
                quantity: 1 // Default quantity
            };

            // Retrieve existing cart items from localStorage or initialize an empty array
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            const existingProductIndex = cartItems.findIndex(item => item.title === product.title);

            if (existingProductIndex !== -1) {
                // If the product is already in the cart, increase its quantity
                cartItems[existingProductIndex].quantity += 1;
            } else {
                // If the product is not in the cart, add it with a default quantity of 1
                cartItems.push(product);
            }

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // Update the cart count in the UI
            updateCartCount();
        });
    });

    // Initialize the cart count on page load
    updateCartCount();
});