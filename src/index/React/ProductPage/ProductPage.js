// Component for displaying a product in its own page

// ====== IMPORTS ======

// React 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// CSS
import './productpage.css';

// FUNCTIONS
import getPrintifyProductObj from "../../../functions/getPrintifyProductObj";
import getPrice from "../../../functions/getPrice";

// ====== COMPONENT ======

function ProductPage (props) {

    // VARIABLES

    const { id } = useParams();
    const [productData, setProductData] = useState('');
    const [productImg, setProductImg] = useState('');

    // LISTENERS

    useEffect(() => {
        setPrintifyObj(id);
    }, [id]);

    // FUNCTIONS

    async function setPrintifyObj (id) {
        let results = await getPrintifyProductObj(id);
        console.log(results);
        setProductData(results);
        setProductImg(<img className='productImg' src={results.images[0].src} />);
    }

    // RENDER

    return(
        <div className='ProductPage'>
            <div className='productWrapper'>
                <div className="leftColumn">
                    {productImg}
                </div>
                <div className="rightColumn">
                    <div className='description'>
                        <h2 className='title'>{productData.title}</h2>
                        <div className='price'>{getPrice(productData)}</div>
                    </div>
                    <div className='info'>Info</div>
                </div>
            </div>
            <div className='manuDetailsWrapper'></div>
        </div>);
}


// ====== EXPORTS ======

export default ProductPage;