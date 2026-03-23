// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Get all required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.5)';
                } else {
                    field.style.borderColor = '#444';
                    field.style.boxShadow = 'none';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill all required fields!');
                return false;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
            }
        });
    }

    // Reset field style on focus
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#e74c3c';
        });
        input.addEventListener('blur', function() {
            if (this.value) {
                this.style.borderColor = '#444';
            }
        });
    });
});
