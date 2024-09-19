// HomeContent Component

// ====== IMPORTS ======

// React
import React, { useEffect, useRef, useState } from "react";

// CSS
import './homecontent.css';

// Components
import ProductDiv from "./ProductDiv/ProductDiv";
import ProductCarousel from "./ProductCarousel/ProductCarousel.js";

// Functions
import getPrintifyObject from "../../../../functions/getPrintifyObject";
import uniqid from 'uniqid';

// ====== COMPONENT ======

function HomeContent (props) {

    // VARIABLES

    const [productsJsx, setProductsJsx] = useState([]);
    const renderCounter = useRef(0);

    // LISTENERS

    useEffect(() => {
        
        if (renderCounter.current === 0) {
            console.log(renderCounter.current);
            buildProductsJsx();
        }

        renderCounter.current = renderCounter.current + 1;
    }, []);

    // FUNCTIONS

    async function buildProductsJsx () {

        // Retrieve printify object from server
        let printifyObj = await getPrintifyObject();
        console.log('PRINTIFY OBJECT', printifyObj);
        
        // Build products jsx and push to array, then set to state
        let productsJsxArray = [];

        printifyObj.data.forEach((product) => {
            console.log(product);
            productsJsxArray.push(<ProductDiv productData={product} key={uniqid()}/>);
        });

        setProductsJsx(productsJsxArray);
    }
    
    // RENDER

    return (
        <div className='HomeContent'>
            <div className='homeContentWrapper'>
                <ProductCarousel products={productsJsx} />
                <div className='gradientBackground'></div>
            </div>
        </div>
    );
}


// ====== EXPORT ======

export default HomeContent;