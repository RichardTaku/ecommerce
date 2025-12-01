
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    const renderCart = () => {
        cartContainer.innerHTML = ''; // Clear previous content

        if (cartItems.length === 0) {
            cartContainer.classList.add('empty-cart');
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        cartContainer.classList.remove('empty-cart');

        // Generate HTML for each cart item
        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="cart-item" data-index="${index}">
                <div class=imgadd-display>
                    <div><img src="${item.image}" alt="${item.title}" class="cart-item-img"></div>
                <div class="quantity-controls">
                            <button class="decrease-btn">-</button>
                            <span class="quantity">${item.quantity || 1}</span>
                            <button class="increase-btn">+</button>
                        </div>

                 </div>
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.price}</p>
                        
                        <button class="remove-btn">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        });

        // Add event listeners for quantity controls and remove buttons
        document.querySelectorAll('.increase-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.closest('.cart-item').getAttribute('data-index');
                cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
                saveCartToLocalStorage();
                renderCart();
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.closest('.cart-item').getAttribute('data-index');
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity -= 1;
                    saveCartToLocalStorage();
                    renderCart();
                }
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.closest('.cart-item').getAttribute('data-index');
                cartItems.splice(index, 1);
                saveCartToLocalStorage();
                renderCart();
            });
        });

        // Update total price
        updateTotalPrice();
    };

    // Function to calculate and update the total price
    const updateTotalPrice = () => {
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', '')) || 0;
            return sum + price * (item.quantity || 1);
        }, 0);
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    };

    // Function to save cart to localStorage
    const saveCartToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    // Initial render of the cart
    renderCart();
});


