import accesskey from "../../accesskey.js";

async function getPrintifyProductObj (productId) {
    try {
        let response = await fetch('https://server0424.lol/printify-product', {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: 'Bearer ' + accesskey,
                productId: productId
            }
        });
        const content = await response.json();
        return content;
    } catch (error) {
        console.log(error);
    }

}

export default getPrintifyProductObj;