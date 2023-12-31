// Component for displaying a product in its own page

// ====== IMPORTS ======

// React 
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { appContext } from "../../App";

// CSS
import './productpage.css';

// Firebase
import { getAuth } from 'firebase/auth';

// FUNCTIONS
import getPrintifyProductObj from "../../../../functions/getPrintifyProductObj";
import getPrice from "../../../../functions/getPrice";
import parsePrintifyDescription from "../../../../functions/parsePrintifyDescription";
import uniqid from 'uniqid';

// ====== COMPONENT ======

function ProductPage (props) {

    // VARIABLES

    const { id } = useParams();
    const [productData, setProductData] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productDescription, setProductDescription] = useState([]);
    const appLevel = useContext(appContext);
    const [quantity, setQuantity] = useState(1);

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
        setProductData(results);
        setProductImg(<img className='productImg' src={results.images[0].src} />);
    }

    async function handleAddToCartClick () {
        if (getAuth().currentUser) {
            appLevel.addToFirestoreCart(productData.id, quantity);
        } else {
            appLevel.addToLocalCart(productData.id, quantity);
        }
    }

    function handleQuantityChange (event) {
        setQuantity(event.target.value);
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
                            <select onChange={handleQuantityChange} name='quantity' className='quantity' value={quantity}>
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
                            <button onClick={handleAddToCartClick} className='addToCartBtn'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='manuDetailsWrapper'></div>
        </div>);
}


// ====== EXPORTS ======

export default ProductPage;