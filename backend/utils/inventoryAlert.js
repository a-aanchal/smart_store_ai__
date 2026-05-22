/**
 * Check if the product stock is below the threshold and log/return warning.
 * @param {Object} product - Product document
 * @param {Number} threshold - Low stock threshold (default: 10)
 */
const checkLowStock = (product, threshold = 10) => {
    if (product.stock < threshold) {
        console.warn(`[INVENTORY ALERT] "${product.title}" is running low on stock! Current stock: ${product.stock}`);
        return {
            isLow: true,
            productId: product._id,
            title: product.title,
            stock: product.stock,
            message: `Product "${product.title}" has only ${product.stock} items left in stock!`
        };
    }
    return { isLow: false };
};

module.exports = { checkLowStock };
