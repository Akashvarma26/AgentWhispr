document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;
    const darkmodeKey = 'darkmode';

    // Toggle theme on button click
    themeSwitch.addEventListener('click', () => {
        if (htmlElement.classList.contains('darkmode')) {
            // If currently in dark mode, switch to light mode
            htmlElement.classList.remove('darkmode');
            localStorage.removeItem(darkmodeKey); // Save the preference: remove 'darkmode'
        } else {
            // If currently in light mode, switch to dark mode
            htmlElement.classList.add('darkmode');
            localStorage.setItem(darkmodeKey, 'active'); // Save the preference: set 'darkmode' to 'active'
        }
    });
});