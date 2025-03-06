// Product Detail Alpine.js Data
document.addEventListener('alpine:init', () => {
    Alpine.data('productDetail', () => ({
        product: null,
        selectedImage: null,
        async init() {
            // Get product ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            
            try {
                // Fetch products data
                const response = await fetch('products.json');
                const data = await response.json();
                
                // Find the specific product
                this.product = data.products.find(p => p.id === productId);
                
                // Set initial selected image
                this.selectedImage = this.product?.image;
                
                // Update page title
                document.title = this.product.name;
            } catch (error) {
                console.error('Error loading product:', error);
            }
        }
    }));
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu button functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menuContent = document.getElementById('menu-content');
    if (mobileMenuButton && menuContent) {
        mobileMenuButton.addEventListener('click', function() {
            menuContent.classList.toggle('hidden');
        });

        // Hide menu on window resize if screen becomes larger than mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // md breakpoint
                menuContent.classList.remove('hidden');
            } else {
                menuContent.classList.add('hidden');
            }
        });
    }

    // Mobile nav button functionality
    const mobileNavButton = document.getElementById('mobile-nav-button');
    const navContent = document.getElementById('nav-content');
    if (mobileNavButton && navContent) {
        mobileNavButton.addEventListener('click', function() {
            navContent.classList.toggle('hidden');
        });
    }
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.bg-gray-100 button').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            // Toggle content visibility
            content.classList.toggle('hidden');
            
            // Toggle icon
            if (content.classList.contains('hidden')) {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
});

// Initialize Owl Carousel
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        navText: [
            "<i class='fas fa-chevron-left'></i>",
            "<i class='fas fa-chevron-right'></i>"
        ],
        responsive:{
            0:{
                items: 1
            },
            640:{
                items: 2
            },
            1024:{
                items: 3
            },
            1280:{
                items: 4
            }
        }
    });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('border-[#0099FF]', 'text-[#0099FF]');
                btn.classList.add('border-transparent', 'text-gray-500');
            });

            // Add active classes to clicked button
            button.classList.remove('border-transparent', 'text-gray-500');
            button.classList.add('border-[#0099FF]', 'text-[#0099FF]');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected tab content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Star rating functionality
    const stars = document.querySelectorAll('.fa-star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'text-yellow-400');
                } else {
                    s.classList.remove('fas', 'text-yellow-400');
                    s.classList.add('far');
                }
            });
        });
    });
}); 