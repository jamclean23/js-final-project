// Function for formatting the product descriptions from printify

// ====== IMPORTS ======
import React from "react";
import uniqid from 'uniqid';


// ====== FUNCTIONS ======

function parsePrintifyDescription (printifyDescription) {
    let parsedString;
    let parsedArray = [];
    if (printifyDescription) {
        parsedString = printifyDescription.replaceAll('</p>', '').replaceAll('<p>', '').replaceAll('.:', '•').replaceAll('NB! ', '').split(/<br\/>/);

        parsedString.forEach((element) => {
            if (element) {
                parsedArray.push(<p key={uniqid()}>{element}</p>);

                if (element[0] != '•') {
                    parsedArray.push(<br key={uniqid()}/>);
                }
            }

        });
    } else {
        return;
    }

    return parsedArray;
}

export default parsePrintifyDescription;