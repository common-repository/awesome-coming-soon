function initCountdown(targetDateString, action, redirectUrl) {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const targetDate = new Date(targetDateString).getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            handleCountdownFinished(action, redirectUrl);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-value">${padZero(Math.max(0, days))}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${padZero(Math.max(0, hours))}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${padZero(Math.max(0, minutes))}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${padZero(Math.max(0, seconds))}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;
    }

    function padZero(num) {
        return Math.abs(num).toString().padStart(2, '0');
    }

    function handleCountdownFinished(action, redirectUrl) {
        switch (action) {
            case 'no_action':
                countdownElement.innerHTML = "Countdown finished!";
                break;
            case 'hide_counter':
                countdownElement.style.display = 'none';
                break;
            case 'disable_coming_soon':
                window.location.reload();
                break;
            case 'url_redirect':
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    console.error('Redirect URL not provided');
                }
                break;
            default:
                console.error('Unknown action:', action);
        }
    }

    updateCountdown(); // Initial call
    countdownInterval = setInterval(updateCountdown, 1000);
}

function startCountdown(targetDate, action, redirectUrl) {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Target date:", targetDate, "Action:", action, "Redirect URL:", redirectUrl);
        initCountdown(targetDate, action, redirectUrl);
    });
}