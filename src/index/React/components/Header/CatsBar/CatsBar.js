// CatsBar Component

// ====== IMPORTS ======

import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';

// CSS
import './catsbar.css';


// ====== COMPONENT ======

function CatsBar (props) {

    // VARIABLES

    const [catLinks, setCatLinks] = useState([]);

    // LISTENERS

    useEffect(() => {
        let catsArray = [];

        for (const cat in props.cats) {
            catsArray.push(<span key={uniqid()} onClick={handleCatClick.bind(this, props.cats[cat])} className='catLink'>{cat}</span>);
        }

        setCatLinks(catsArray);
    }, []);

    // FUNCTIONS

    function handleCatClick (link) {
        window.open(link, "_blank");
    }

    // RENDER

    return (
        <div className="CatsBar">
            {catLinks}
        </div>
    );
}


// ====== EXPORTS ======

export default CatsBar;