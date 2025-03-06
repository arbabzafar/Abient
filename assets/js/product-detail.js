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



