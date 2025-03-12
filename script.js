document.getElementById('pay').addEventListener('click', async () => {
    const phone = document.getElementById('phone').value.trim();
    const status = document.getElementById('status');

    if (!phone.startsWith('254') || phone.length !== 12) {
        status.textContent = 'Enter a valid Kenyan phone number (2547XXXXXXXX)';
        return;
    }

    status.textContent = 'Processing payment...';

    try {
        const response = await fetch('https://perontips-backend.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = result.accessUrl;  // Redirect to the paid page
        } else {
            status.textContent = 'Payment failed. Try again.';
        }
    } catch (error) {
        status.textContent = 'Error processing payment.';
    }
});
