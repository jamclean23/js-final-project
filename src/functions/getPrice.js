// Function for retrieving and parsing price from printify product object

function getPrice (productObj) {
    if (productObj && productObj.variants[0].price) {
        let displayPrice = '$' + productObj.variants[0].price.toString().slice(0, -2) + '.' + productObj.variants[0].price.toString().slice(-2);
        return displayPrice;
    } else {
        return 'No price given';
    }

}

export default getPrice;