// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavButton = document.getElementById('mobile-nav-button');
    const navContent = document.getElementById('nav-content');
    
    if (mobileNavButton && navContent) {
        mobileNavButton.addEventListener('click', function() {
            navContent.classList.toggle('hidden');
        });
    }
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle code...

    // Slider Configuration
    const sliderConfig = {
        currentSlide: 0,
        slides: [
            {
                image: 'assets/images/IMG_1033.JPEG',
                title: 'AMBIENTEBELEUCHTUNG',
                subtitle: 'steuerbar über Original System'
            },
            {
                image: 'assets/images/IMG_1033.JPEG',
                title: 'STERNENHIMMEL',
                subtitle: 'Premium Ausstattung'
            },
            // Add more slides as needed
        ],
        autoplayInterval: 5000, // 5 seconds between slides
        autoplayTimer: null
    };

    // Get slider elements
    const sliderContainer = document.querySelector('.overflow-hidden');
    const slideElement = sliderContainer.querySelector('.relative');
    const dotsContainer = sliderContainer.querySelector('.flex.space-x-2');
    const prevButton = sliderContainer.querySelector('.left-4');
    const nextButton = sliderContainer.querySelector('.right-4');

    // Initialize slider
    function initSlider() {
        // Create dots based on number of slides
        dotsContainer.innerHTML = sliderConfig.slides.map((_, index) => `
            <button class="w-2 h-2 rounded-full bg-white ${index === 0 ? '' : 'opacity-50'}" 
                    data-slide="${index}">
            </button>
        `).join('');

        // Add click events to dots
        dotsContainer.querySelectorAll('button').forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.slide));
            });
        });

        // Add click events to navigation arrows
        prevButton.addEventListener('click', () => {
            goToSlide((sliderConfig.currentSlide - 1 + sliderConfig.slides.length) % sliderConfig.slides.length);
        });

        nextButton.addEventListener('click', () => {
            goToSlide((sliderConfig.currentSlide + 1) % sliderConfig.slides.length);
        });

        // Start autoplay
        startAutoplay();
    }

    // Go to specific slide
    function goToSlide(index) {
        // Update current slide
        sliderConfig.currentSlide = index;

        // Update slide content with fade effect
        slideElement.style.opacity = '0';
        setTimeout(() => {
            const slide = sliderConfig.slides[index];
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="w-full h-[500px] object-cover">
                <div class="absolute bottom-8 left-8">
                    <div class="text-white">
                        <h2 class="text-2xl font-bold mb-2">${slide.title}</h2>
                        <p class="text-lg">${slide.subtitle}</p>
                    </div>
                </div>
            `;
            slideElement.style.opacity = '1';
        }, 300);

        // Update dots
        dotsContainer.querySelectorAll('button').forEach((dot, i) => {
            dot.classList.toggle('opacity-50', i !== index);
        });

        // Reset autoplay timer
        startAutoplay();
    }

    // Autoplay functions
    function startAutoplay() {
        stopAutoplay();
        sliderConfig.autoplayTimer = setInterval(() => {
            goToSlide((sliderConfig.currentSlide + 1) % sliderConfig.slides.length);
        }, sliderConfig.autoplayInterval);
    }

    function stopAutoplay() {
        if (sliderConfig.autoplayTimer) {
            clearInterval(sliderConfig.autoplayTimer);
        }
    }

    // Pause autoplay on hover
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    // Initialize slider
    initSlider();
});

// Alpine.js Store and Data
document.addEventListener('alpine:init', () => {
    Alpine.store('productData', {
        products: [],
        categories: [],
        selectedCategory: '',
        init() {
            fetch('products.json')
                .then(response => response.json())
                .then(data => {
                    this.products = data.products;
                    // Extract unique categories
                    const uniqueCategories = new Set();
                    data.products.forEach(product => {
                        if (Array.isArray(product.categories)) {
                            product.categories.forEach(cat => uniqueCategories.add(cat));
                        } else if (typeof product.categories === 'string') {
                            uniqueCategories.add(product.categories);
                        }
                    });
                    this.categories = Array.from(uniqueCategories).filter(cat => cat).sort();
                })
                .catch(error => {
                    console.error('Error loading products:', error);
                });
        },
        getFilteredProducts() {
            if (!this.selectedCategory) return this.products;
            return this.products.filter(product => {
                if (Array.isArray(product.categories)) {
                    return product.categories.includes(this.selectedCategory);
                }
                return product.categories === this.selectedCategory;
            });
        }
    });

    // Initialize the store
    Alpine.store('productData').init();
}); 