import accesskey from "../../accesskey.js";

async function getPrintifyObject () {

    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch('https://server0424.lol/printify-object', {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: 'Bearer ' + accesskey
                }
            });
            const content = await response.json();
            resolve(content);
        } catch (error) {
            console.log(error);
        }
    });

}

export default getPrintifyObject;