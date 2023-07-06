// ProductDiv component for displaying product information on the home screen

// ====== IMPORTS =======

// React
import React from "react";

// Css
import './productdiv.css';


// ====== COMPONENT ======

function ProductDiv (props) {

    // FUNCTIONS

    function handleProductDivClick () {
        window.location.href = window.location.href + '#/test';
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