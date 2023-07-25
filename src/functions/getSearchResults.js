import accesskey from "../../accesskey.js";

async function getSearchResults (keyword) {
    try {
        let response = await fetch('https://server0424.lol/printify-search-results', {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: 'Bearer ' + accesskey,
                keyword: keyword || ''
            }
        });
        const content = await response.json();
        return content;
    } catch (error) {
        console.log(error);
    }

}

export default getSearchResults;