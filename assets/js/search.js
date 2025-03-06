// Store for search functionality
document.addEventListener('alpine:init', () => {
    Alpine.store('searchStore', {
        searchQuery: '',
        products: [],
        filteredProducts: [],
        
        async init() {
            try {
                // Try to load products.json with a relative path
                const response = await fetch('products.json');
                const data = await response.json();
                this.products = data.products;
                console.log('Products loaded successfully:', this.products);

                // If there's a search query, perform the search
                const searchQuery = localStorage.getItem('searchQuery');
                if (searchQuery) {
                    this.searchQuery = searchQuery;
                    this.searchProducts(searchQuery);
                }
            } catch (error) {
                console.error('Failed to load products:', error);
                document.querySelector('.search-error')?.classList.remove('hidden');
            }
        },

        searchProducts(query) {
            if (!query) {
                this.filteredProducts = [];
                return;
            }

            query = query.toLowerCase().trim();
            console.log('Searching for:', query);
            console.log('Total products:', this.products.length);

            this.filteredProducts = this.products.filter(product => {
                // Basic check to ensure product has required properties
                if (!product || typeof product !== 'object') {
                    console.log('Invalid product:', product);
                    return false;
                }

                const name = (product.name || '').toLowerCase();
                const desc = (product.description || '').toLowerCase();
                const categories = product.categories || [];
                const tags = product.tags || [];

                // Convert categories and tags to arrays if they're strings
                const categoryArray = Array.isArray(categories) ? categories : [categories];
                const tagArray = Array.isArray(tags) ? tags : [tags];

                // Log each product being checked
                console.log('Checking product:', {
                    name: name,
                    matches: name.includes(query),
                    query: query
                });

                // Check for matches
                const nameMatch = name.includes(query);
                const descMatch = desc.includes(query);
                const categoryMatch = categoryArray.some(cat => 
                    (cat || '').toString().toLowerCase().includes(query)
                );
                const tagMatch = tagArray.some(tag => 
                    (tag || '').toString().toLowerCase().includes(query)
                );

                return nameMatch || descMatch || categoryMatch || tagMatch;
            });

            console.log('Search results:', {
                query: query,
                totalProducts: this.products.length,
                matchedProducts: this.filteredProducts.length,
                results: this.filteredProducts
            });
        }
    });
});

// Initialize Alpine data on the search page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search if we're on the search page
    if (window.location.pathname.includes('search.html')) {
        const searchQuery = localStorage.getItem('searchQuery');
        if (searchQuery) {
            // Initialize Alpine store if it exists
            if (Alpine.store('searchStore')) {
                Alpine.store('searchStore').searchQuery = searchQuery;
                Alpine.store('searchStore').init().then(() => {
                    Alpine.store('searchStore').searchProducts(searchQuery);
                });
            }
        }
    }

    // Handle search form submission
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            const searchQuery = searchInput.value.trim();
            
            if (searchQuery) {
                localStorage.setItem('searchQuery', searchQuery);
                window.location.href = 'search.html';
            }
        });
    });
}); 