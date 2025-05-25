// Common Navigation Logic
function initializeNavigation(defaultPage) {
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length === 0) return; // No nav items on this page

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                localStorage.setItem('activePage', href);
                window.location.href = href;
            }
        });
    });

    const activePage = localStorage.getItem('activePage') || defaultPage;
    let activeFound = false;
    navItems.forEach(item => {
        if (item.getAttribute('href') === activePage) {
            item.classList.add('active');
            activeFound = true;
        } else {
            item.classList.remove('active');
        }
    });

    // If activePage from localStorage doesn't match any nav item,
    // and a defaultPage was provided, ensure the defaultPage item is active.
    if (!activeFound && defaultPage) {
        navItems.forEach(item => {
            if (item.getAttribute('href') === defaultPage) {
                item.classList.add('active');
            }
        });
    }
}

// Common Telegram WebApp Initialization Logic
function initializeTelegramApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

        // Set theme colors using CSS variables
        const bgColor = tg.themeParams.bg_color || '#f8f9fa'; // Default light background
        const textColor = tg.themeParams.text_color || '#1c1c1e'; // Default dark text
        const headerColor = tg.themeParams.header_bg_color || '#ffffff'; // Default light header
        // Hint color can also be themed if used by components
        // const hintColor = tg.themeParams.hint_color || '#999999'; 

        document.documentElement.style.setProperty('--tg-theme-bg-color', bgColor);
        document.documentElement.style.setProperty('--tg-theme-text-color', textColor);
        document.documentElement.style.setProperty('--tg-theme-header-color', headerColor);
        // document.documentElement.style.setProperty('--tg-theme-hint-color', hintColor);

        // Apply Telegram theme class for dark mode
        if (tg.colorScheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
}

// Global DOMContentLoaded listener to initialize Telegram features
document.addEventListener('DOMContentLoaded', function() {
    initializeTelegramApp();
    // Note: initializeNavigation(defaultPage) must be called by each specific page's JS
    // after its DOM is ready, providing its own default page.
});

console.log("common.js loaded and initialized Telegram App.");
