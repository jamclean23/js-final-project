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
import parsePrintifyDescription from "../../../functions/parsePrintifyDescription";
import uniqid from 'uniqid';

// ====== COMPONENT ======

function ProductPage (props) {

    // VARIABLES

    const { id } = useParams();
    const [productData, setProductData] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productDescription, setProductDescription] = useState([]);

    // LISTENERS

    useEffect(() => {
        setPrintifyObj(id);
    }, [id]);

    useEffect(() => {
        if (productData) {
            setProductDescription(parsePrintifyDescription(productData.description));
        }
    }, [productData]);

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
                        <br/>
                        <div className='price'><span className='priceText'>Price: </span>{getPrice(productData)}</div>
                        <br/>
                        <div className='moreDescription'>
                            {productDescription}
                        </div>
                    </div>
                    <div className='info'>
                        <div className='price'>{getPrice(productData)}</div>
                        <div>In Stock</div>
                        <div className='selectWrapper'>
                            <label htmlFor='quantity'>Qty: </label>
                            <select name='quantity' className='quantity'>
                                {(() => {
                                    let selectArray = []

                                    for(let i = 0; i < 20; i++) {
                                        selectArray.push(<option key={uniqid()}>{i + 1}</option>)
                                    }
                                    return selectArray;
                                })()}
                            </select>
                        </div>
                        <div className='btnWrapper'>
                            <button className='addToCartBtn'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='manuDetailsWrapper'></div>
        </div>);
}


// ====== EXPORTS ======

export default ProductPage;