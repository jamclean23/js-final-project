// CatsBar Component

// ====== IMPORTS ======

import React, { useEffect, useState } from "react";
import './catsbar.css';


// ====== COMPONENT ======

function CatsBar (props) {

    // VARIABLES

    const [catLinks, setCatLinks] = useState([]);

    // LISTENERS

    useEffect(() => {
        for (const cat in props.cats) {
            
        }
    }, []);

    // FUNCTIONS

    // RENDER

    return (
        <div className="CatsBar">
            {catLinks}
        </div>
    );
}


// ====== EXPORTS ======

export default CatsBar;