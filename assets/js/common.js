// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
    
    mobileMenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the closest mobile menu to this toggle button
            const mobileMenu = this.closest('nav').querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1280) { // xl breakpoint
            document.querySelectorAll('.mobile-menu').forEach(menu => {
                menu.classList.remove('hidden');
            });
        } else {
            document.querySelectorAll('.mobile-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        }
    });
}); 