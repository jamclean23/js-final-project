// Function for converting cents to dollars

function formatPrice (cents) {
    return `$${cents/100}`;
}

export default formatPrice;