<template>
    <div class="product-detail-page">
        
        <!-- Left Side: Image Area (Placeholder structure) -->
        <div class="product-image-area">
            <div class="main-image-placeholder">
                <!-- Image goes here -->
                <div class="image-icon">🖼️</div>
            </div>
            <div class="thumbnail-placeholders">
                <div class="thumbnail"></div>
                <div class="thumbnail"></div>
                <div class="thumbnail"></div>
            </div>
        </div>

        <!-- Right Side: Content Area -->
        <div class="product-content-area">
            <h1 class="product-title">Advanced Traction Machine</h1>

            <div class="status-bar">
                <span class="rating">★ 4.8 (24 reviews)</span>
                <span class="stock-status">✓ In Stock</span>
            </div>

            <div class="price-section">
                <div class="price-badge">
                    <span class="current-price">NPR 85,000</span>
                    <span class="old-price">NPR 95,000</span>
                    <span class="discount-percent">11% OFF</span>
                </div>
            </div>

            <p class="product-description">
                Professional cervical and lumbar traction system with advanced controls and safety features. Ideal for clinical and physiotherapy settings.
            </p>

            <h2 class="features-title">Key Features</h2>
            <ul class="features-list">
                <li>✓ Dual axis cervical and lumbar traction</li>
                <li>✓ Digital control with preset programs</li>
                <li>✓ Adjustable traction force (10-50 kg)</li>
                <li>✓ Automatic timer with emergency stop</li>
            </ul>

            <!-- Quantity Selector Divs (as requested) -->
            <div class="quantity-section-container">
                <div class="quantity-label">Quantity:</div>
                <div class="quantity-control-wrapper">
                    <!-- Buttons linked to JS functionality -->
                    <button type="button" class="quantity-button decrement" onclick="updateQuantity(-1)">-</button>
                    <input type="text" class="quantity-input" id="quantityInput" value="1" readonly>
                    <button type="button" class="quantity-button increment" onclick="updateQuantity(1)">+</button>
                </div>
            </div>
            
            <button type="button" class="add-to-cart-button">
                <!-- Shopping cart icon placeholder -->
                🛒 Add to Cart
            </button>
        </div>
    </div>

    
</template>
<style scoped>
    .product-detail-page {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    gap: 30px; /* Space between the image side and content side */
}

/* --- Image Area Styles (Left Div) --- */
.product-image-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.main-image-placeholder {
    background-color: #f0f0f0;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}

.image-icon {
    font-size: 50px;
    color: #ccc;
}

.thumbnail-placeholders {
    display: flex;
    gap: 10px;
}

.thumbnail {
    width: 80px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 4px;
    border: 1px solid #ddd;
}

/* --- Content Area Styles (Right Div) --- */
.product-content-area {
    flex: 1.5; /* Content takes up slightly more space than images */
}

.product-title {
    font-size: 28px;
    color: #2c3e50;
    margin: 0 0 10px 0;
}

.status-bar {
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
}

.stock-status {
    color: #388e3c; /* Green color for in stock */
    font-weight: bold;
    margin-left: 15px;
}

.price-section {
    background-color: #eef7ee; /* Light green background for price box */
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.current-price {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.old-price {
    font-size: 18px;
    color: #999;
    text-decoration: line-through;
    margin-right: 10px;
}

.discount-percent {
    background-color: #388e3c;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
}

.product-description {
    color: #555;
    line-height: 1.4;
    margin-bottom: 20px;
}

.features-title {
    font-size: 18px;
    color: #2c3e50;
    margin-bottom: 10px;
}

.features-list {
    list-style-type: none; /* Removes default bullets */
    padding: 0;
    margin-bottom: 30px;
    color: #555;
}

.features-list li {
    margin-bottom: 5px;
    /* You would typically use a custom SVG for the checkmark */
}


/* --- Quantity Selector Styles (Right Div Aligned Side by Side) --- */
.quantity-section-container {
    display: flex; /* Aligns the two inner divs side-by-side */
    align-items: center; /* Vertically centers the label and the input box */
    gap: 20px; /* Space between the label and the control */
    margin-bottom: 20px;
}

.quantity-label {
    font-size: 16px;
    color: #333;
    font-weight: 500;
}

.quantity-control-wrapper {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
}

.quantity-button {
    background-color: #f9f9f9;
    border: none;
    padding: 8px 12px;
    font-size: 18px;
    cursor: pointer;
    color: #555;
    transition: background-color 0.2s;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
}

.quantity-button:hover {
    background-color: #e9e9e9;
}

.quantity-button.decrement { border-left: none; }
.quantity-button.increment { border-right: none; }

.quantity-input {
    width: 40px;
    padding: 8px 0;
    text-align: center;
    border: none;
    font-size: 16px;
    color: #333;
    outline: none; 
}


/* --- Add to Cart Button --- */
.add-to-cart-button {
    background-color: #388e3c; /* Green button background */
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s;
}

.add-to-cart-button:hover {
    background-color: #2e7d32;
}
</style>
<script>
    
</script>