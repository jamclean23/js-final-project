// CatsBar Component

// ====== IMPORTS ======

// React
import React, { useEffect, useState, useContext } from "react";

// Context 
import { appContext } from "../../../App";

// Functions
import uniqid from 'uniqid';

// CSS
import './catsbar.css';


// ====== COMPONENT ======

function CatsBar (props) {

    // VARIABLES

    const AppLevel = useContext(appContext);

    const [catLinks, setCatLinks] = useState({
        Hats: 'category/hats',
        Hoodies: 'category/hoodie',
        Candles: 'category/candle',
        Paintings: 'category/gallery wraps',
        'Phone Cases': 'category/Phone Case',
        'T Shirts': 'category/t-shirt'
    });

    const [catLinksJsx, setCatLinksJsx] = useState([]);

    // LISTENERS

    useEffect(() => {
        let catsArray = [];

        for (const cat in catLinks) {
            catsArray.push(<span key={uniqid()} onClick={handleCatClick.bind(this, catLinks[cat])} className='catLink'>{cat}</span>);
        }

        setCatLinksJsx(catsArray);
    }, []);

    // FUNCTIONS

    function handleCatClick (link) {
        AppLevel.goToHashUrl(link);
    }

    // RENDER

    return (
        <div className="CatsBar">
            {catLinksJsx}
        </div>
    );
}


// ====== EXPORTS ======

export default CatsBar;