// ProductDiv component for displaying product information on the home screen

// ====== IMPORTS =======

// React
import React, { useEffect, useContext } from "react";

// Css
import './productdiv.css';

// Context
import { appContext } from "../../../App";

// ====== COMPONENT ======

function ProductDiv (props) {
    // VARIABLES

    const AppLevel = useContext(appContext);

    // LISTENERS

    useEffect(() => {
        console.log('PRODUCT DATA');
        console.log(props.productData.images);
    }, []);

    // FUNCTIONS

    function handleProductDivClick () {
        AppLevel.goToHashUrl('product/' + props.productData.id);
    }

    // RENDER

    return (
        <div onClick={handleProductDivClick} className='ProductDiv'>
            {(() => {
                if (props.productData.images.length) {
                    return <img src={props.productData.images[0].src} />
                }
            })()}
            <p className='prodTitle'>{props.productData.title}</p>
        </div>
    );
}

// ====== EXPORTS ======

export default ProductDiv;