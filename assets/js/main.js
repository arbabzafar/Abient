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