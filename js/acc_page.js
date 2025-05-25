document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation('acc_page.html');
    // Page-specific Telegram features like HapticFeedback or backButton handling remain.
});

function handleMenuClick(event, section) {
    // Add haptic feedback for Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }

    // Simple navigation simulation
    const menuItem = event.currentTarget; 
    menuItem.style.transform = 'scale(0.98)';
    setTimeout(() => {
        menuItem.style.transform = 'scale(1)';
    }, 150);

    // In a real app, you would navigate to different sections
    console.log('Navigating to:', section);
    
    switch(section) {
        case 'bbc':
            break;
        case 'events':
            break;
        case 'projects':
            break;
        case 'awards':
            break;
    }
}

// Handle back button for Telegram
if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
        window.history.back();
    });
}
