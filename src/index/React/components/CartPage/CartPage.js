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

// ====== COMPONENT ======

function CartPage () {

    // VARIABLES

    const [cartItems, setCartItems] = useState();
    const renderCounter = useRef(0);
    const AppLevel = useContext(appContext);

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

        if (getAuth().currentUser) {
            console.log('Using firestore cart');
            cartItemsArray = await AppLevel.getFirestoreCartArray();
            console.log('CART ITEMS ARRAY', cartItemsArray);
        } else {
            cartItemsArray = AppLevel.getLocalCartArray();
        }

        console.log('cartItemsArray', cartItemsArray);

        let cartItemsJsx = [];

        for (const item of cartItemsArray) {
            const productInfo = await getPrintifyProductObj(item.itemId);
            console.log(productInfo);
            cartItemsJsx.push(
                <div key={uniqid()} className='cartPageItem'>
                    <button className='xBtn'>X</button>
                    <img src={productInfo.images[0].src} />
                    <div className='productInfoWrapper'>
                        <p className='title'>{productInfo.title}</p>
                        <select defaultValue={item.quantity}>
                            {(()=>{
                                let jsxArray = [];
                                for (let i = 1; i <= 100; i++) {
                                    jsxArray.push(<option key={uniqid()} value={i}>{i}</option>);
                                }
                                return jsxArray;
                            })()}
                        </select>
                    </div>
                </div>);
        }

        console.log('CartItemsJSX:', cartItemsJsx);

        setCartItems(cartItemsJsx);
    }

    // RENDER
    
    return (
        <div className='CartPage'>
            <div className='cartPageWrapper'>
                <div className='cartContentsDiv'>
                    {cartItems}
                </div>
                <div className='checkoutSidebar'>
                    <div className='stickyCheckoutMenu'>
                        <div className='subtotalWrapper'>
                            <p>Checkout goes here</p>
                            <p>Subtotal: <span>subtotal goes here</span></p>
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