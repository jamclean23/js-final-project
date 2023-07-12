// ProductDiv component for displaying product information on the home screen

// ====== IMPORTS =======

// React
import React, { useEffect } from "react";

// Css
import './productdiv.css';


// ====== COMPONENT ======

function ProductDiv (props) {

    // LISTENERS

    // FUNCTIONS

    function handleProductDivClick () {
        window.location.href = window.location.href + '#/product/' + props.productData.id;
    }

    // RENDER

    return (
        <div onClick={handleProductDivClick} className='ProductDiv'>
            <img src={props.productData.images[0].src} />
        </div>
    );
}

// ====== EXPORTS ======

export default ProductDiv;