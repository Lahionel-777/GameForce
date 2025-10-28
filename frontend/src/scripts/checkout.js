
document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'ecommerce-cart-data';
    const TAX_RATE = 0.19;
    const SHIPPING_COST = 10000;
    const FREE_SHIPPING_THRESHOLD = 100000;

    let currentStep = 1;
    const totalSteps = 4;

    const steps = document.querySelectorAll('.checkout-step');
    const nextBtn = document.getElementById('next-step-btn');

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.style.display = index + 1 === stepNumber ? 'block' : 'none';
        });
    }

    function validateStep(stepNumber) {
        const requiredFieldsByStep = {
            1: ['nombre', 'apellido', 'email', 'telefono'],
            2: ['pais', 'ciudad', 'codigo-postal', 'direccion'],
            3: ['tarjeta-numero', 'tarjeta-nombre', 'tarjeta-cvc', 'tarjeta-fecha']
        };
        const requiredFields = requiredFieldsByStep[stepNumber] || [];
        for (const id of requiredFields) {
            const field = document.getElementById(id);
            if (!field || field.value.trim() === '') {
                alert(`Por favor completa el campo: ${id}`);
                field?.focus();
                return false;
            }
        }
        return true;
    }

    function renderCheckoutSummary() {
        const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        const container = document.getElementById('checkout-summary');
        const subtotalElement = document.getElementById('summary-subtotal');
        const shippingElement = document.getElementById('summary-shipping');
        const taxesElement = document.getElementById('summary-taxes');
        const totalElement = document.getElementById('summary-total');

        if (!container) return;
        container.innerHTML = '';

        let subtotal = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            const itemHTML = `
                <div class="checkout-item">
                    <p><strong>${item.name}</strong></p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio: $${itemTotal.toLocaleString()}</p>
                </div>
            `;
            container.innerHTML += itemHTML;
        });

        const taxes = Math.round(subtotal * TAX_RATE);
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const total = subtotal + taxes + shipping;

        subtotalElement.textContent = `$${subtotal.toLocaleString()}`;
        shippingElement.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`;
        taxesElement.textContent = `$${taxes.toLocaleString()}`;
        totalElement.textContent = `$${total.toLocaleString()}`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            if (!validateStep(currentStep)) return;
            currentStep++;
            showStep(currentStep);
            if (currentStep === 4) renderCheckoutSummary();
        } else {
            alert('✅ ¡Pedido confirmado! Gracias por tu compra.');
            localStorage.removeItem(CART_KEY);
            window.location.href = 'index.html';
        }
    });

    showStep(currentStep);
});
