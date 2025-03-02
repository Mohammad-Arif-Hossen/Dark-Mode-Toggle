// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeOptionsToggle = document.getElementById('theme-options-toggle');
const themeOptionsPanel = document.getElementById('theme-options-panel');
const themeOptions = document.querySelectorAll('.theme-option');
const accentOptions = document.querySelectorAll('.accent-option');
const themeNotification = document.getElementById('theme-notification');
const notificationMessage = document.getElementById('notification-message');
const notificationUndo = document.getElementById('notification-undo');

// Theme State
let currentTheme = 'light-default';
let previousTheme = '';
let currentAccent = 'blue';
let notificationTimeout;

// Initialize theme based on system preference or saved preference
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const savedAccent = localStorage.getItem('accent');
    
    if (savedTheme) {
        // Apply saved theme
        setTheme(savedTheme);
        highlightActiveTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            setTheme('dark-default');
            highlightActiveTheme('dark-default');
        } else {
            setTheme('light-default');
            highlightActiveTheme('light-default');
        }
    }
    
    if (savedAccent) {
        setAccentColor(savedAccent);
        highlightActiveAccent(savedAccent);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only apply if user hasn't manually set a theme
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark-default' : 'light-default';
            setTheme(newTheme);
            highlightActiveTheme(newTheme);
            showNotification(`${newTheme.includes('dark') ? 'Dark' : 'Light'} mode applied based on system settings`);
        }
    });
});

// Toggle between light and dark mode
themeToggle.addEventListener('click', () => {
    const isDarkTheme = currentTheme.includes('dark');
    const newThemeBase = isDarkTheme ? 'light' : 'dark';
    
    // Preserve the variant (default, sepia/oled, cool/blue)
    let variant = 'default';
    if (currentTheme.includes('sepia') || currentTheme.includes('oled')) {
        variant = isDarkTheme ? 'sepia' : 'oled';
    } else if (currentTheme.includes('cool') || currentTheme.includes('blue')) {
        variant = isDarkTheme ? 'cool' : 'blue';
    }
    
    const newTheme = `${newThemeBase}-${variant}`;
    previousTheme = currentTheme;
    setTheme(newTheme);
    highlightActiveTheme(newTheme);
    
    // Update ARIA attributes
    themeToggle.setAttribute('aria-checked', newThemeBase === 'dark');
    
    // Show notification
    showNotification(`${newThemeBase === 'dark' ? 'Dark' : 'Light'} mode enabled`);
});

// Theme options panel toggle
themeOptionsToggle.addEventListener('click', () => {
    themeOptionsPanel.classList.toggle('active');
    
    // Close panel when clicking outside
    const closePanel = (e) => {
        if (!themeOptionsPanel.contains(e.target) && e.target !== themeOptionsToggle) {
            themeOptionsPanel.classList.remove('active');
            document.removeEventListener('click', closePanel);
        }
    };
    
    // Add event listener with a slight delay to prevent immediate closing
    setTimeout(() => {
        document.addEventListener('click', closePanel);
    }, 100);
});

// Theme option selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedTheme = option.dataset.theme;
        previousTheme = currentTheme;
        setTheme(selectedTheme);
        highlightActiveTheme(selectedTheme);
        showNotification(`Theme changed to ${formatThemeName(selectedTheme)}`);
    });
});

// Accent color selection
accentOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedAccent = option.dataset.accent;
        setAccentColor(selectedAccent);
        highlightActiveAccent(selectedAccent);
        showNotification(`Accent color changed to ${selectedAccent}`);
    });
});

// Undo theme change
notificationUndo.addEventListener('click', () => {
    if (previousTheme) {
        setTheme(previousTheme);
        highlightActiveTheme(previousTheme);
        hideNotification();
        
        // Swap current and previous to allow toggling back
        const temp = currentTheme;
        currentTheme = previousTheme;
        previousTheme = temp;
    }
});

// Helper Functions
function setTheme(theme) {
    // Remove any existing theme
    document.body.removeAttribute('data-theme');
    
    // Apply new theme
    document.body.setAttribute('data-theme', theme);
    currentTheme = theme;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
}

function setAccentColor(accent) {
    // Remove any existing accent
    document.body.removeAttribute('data-accent');
    
    // Apply new accent
    document.body.setAttribute('data-accent', accent);
    currentAccent = accent;
    
    // Save to localStorage
    localStorage.setItem('accent', accent);
}

function highlightActiveTheme(theme) {
    themeOptions.forEach(option => {
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function highlightActiveAccent(accent) {
    accentOptions.forEach(option => {
        if (option.dataset.accent === accent) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function showNotification(message) {
    // Clear any existing timeout
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }
    
    // Update message and show notification
    notificationMessage.textContent = message;
    themeNotification.classList.add('show');
    
    // Hide after 3 seconds
    notificationTimeout = setTimeout(() => {
        hideNotification();
    }, 3000);
}

function hideNotification() {
    themeNotification.classList.remove('show');
}

function formatThemeName(theme) {
    // Convert theme-name to Theme Name
    const parts = theme.split('-');
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

// Keyboard accessibility
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

themeOptionsToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeOptionsToggle.click();
    }
});

// Add keyboard navigation within theme options panel
themeOptionsPanel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        themeOptionsPanel.classList.remove('active');
    }
});
