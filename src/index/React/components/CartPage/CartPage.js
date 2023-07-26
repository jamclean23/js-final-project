// Component to display cart information before checkout

// ====== IMPORTS ======

// React
import React, { useState, useContext, useEffect, useRef } from 'react';

// Firebase
import { appContext} from '../../App';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

// CSS
import './cartpage.css';

// Functions
import uniqid from 'uniqid';
import getPrintifyProductObj from '../../../../functions/getPrintifyProductObj';
import formatPrice from '../../../../functions/formatPrice';

// ====== COMPONENT ======

function CartPage () {

    // VARIABLES

    const [cartItems, setCartItems] = useState();
    const renderCounter = useRef(0);
    const AppLevel = useContext(appContext);
    const [cartTotalQuantity, setCartTotalQuantity] = useState();
    const [cartSubtotal, setCartSubtotal] = useState();

    // LISTENERS

    useEffect(() => {
        if (renderCounter.current === 0) {
            buildCartItems();
        }
        
        onAuthStateChanged(getAuth(), buildCartItems);

        renderCounter.current = renderCounter.current + 1;
    }, []);

    // FUNCTIONS

    async function buildCartItems () {
        let cartItemsArray = [];

        // Get current cart
        if (getAuth().currentUser) {
            try {
                cartItemsArray = await AppLevel.getFirestoreCartArray();
            } catch (error) {
                console.log(error);
            }
        } else {
            cartItemsArray = AppLevel.getLocalCartArray();
        }
        
        // Update quantity total 
        let totalItemQuantity = cartItemsArray.reduce((accumulator, item) => {
            return accumulator + +item.quantity;
        }, 0);
        setCartTotalQuantity(totalItemQuantity);

        // Update price subtotal
        setCartSubtotal('');
        let subtotal = 0;
        for (const item of cartItemsArray) {
            let productInfo = await getPrintifyProductObj(item.itemId);
            subtotal += productInfo.variants[0].price * item.quantity;
        }
        setCartSubtotal(formatPrice(subtotal));

        // Set empty message and return if no items in cart
        if (!cartItemsArray.length) {
            setCartItems(<p className='cartEmptyMessage'>Your cart is empty.</p>);
            return;
        }


        // Translate to jsx
        let cartItemsJsx = [];

        for (const item of cartItemsArray) {
            const productInfo = await getPrintifyProductObj(item.itemId);
            cartItemsJsx.push(
                <div key={uniqid()} className='cartPageItem'>
                    <button onClick={handleXBtnClick.bind(this, item.itemId)} className='xBtn'>X</button>
                    <img src={productInfo.images[0].src} />
                    <div className='productInfoWrapper'>
                        <p className='itemTitle'>{productInfo.title}</p>
                        <p className='itemPrice'>{formatPrice(productInfo.variants[0].price)}</p>
                        <div className='selectWrapper'>
                            <label>Qty:</label>
                            <select onChange={handleSelectChange.bind(this, item.itemId)} defaultValue={item.quantity}>
                                {(()=>{
                                    let jsxArray = [];
                                    for (let i = 1; i <= 100; i++) {
                                        jsxArray.push(<option key={uniqid()} value={i}>{i}</option>);
                                    }
                                    return jsxArray;
                                })()}
                            </select>
                        </div>
                    </div>
                </div>);
        }

        setCartItems(cartItemsJsx);
    }

    async function handleXBtnClick (itemId) {
        if (getAuth().currentUser) {
            try {
                await AppLevel.removeFromFirestoreCart(itemId);
            } catch (error) {
                console.log(error);
            }
            buildCartItems();
        } else {
            AppLevel.removeFromLocalCart(itemId);
            buildCartItems();
        }
    }

    async function handleSelectChange (itemId, event) {
        if (getAuth().currentUser) {
            await AppLevel.changeQuantityFirestoreCart(itemId, event.target.value);
            buildCartItems();

        } else {
            AppLevel.changeQuantityLocalCart(itemId, event.target.value);
            buildCartItems();
        }
    }

    // RENDER
    
    return (
        <div className='CartPage'>
            <h2>Your Cart</h2>
            <div className='cartPageWrapper'>
                <div className='cartContentsDiv'>
                    {cartItems}
                </div>
                <div className='checkoutSidebar'>
                    <div className='stickyCheckoutMenu'>
                        <div className='subtotalWrapper'>
                            <p>Subtotal &#40;{cartTotalQuantity} items&#41;: <span className='subtotal'>{cartSubtotal}</span></p>
                        </div>
                        <button>Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    );
}


// ====== EXPORTS ====== 

export default CartPage;