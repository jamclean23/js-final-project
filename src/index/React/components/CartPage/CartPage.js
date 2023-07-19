// Component to display cart information before checkout

// ====== IMPORTS ======

// React
import React, { useState, useContext, useEffect, useRef } from 'react';

// Firebase
import { appContext, firestoreDb } from '../../App';
import { getAuth } from 'firebase/auth';

// CSS
import './cartpage.css';

// Functions
import uniqid from 'uniqid';

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

        renderCounter.current = renderCounter.current + 1;
    }, []);

    // FUNCTIONS

    async function buildCartItems () {
        let cartItemsArray = [];

        if (getAuth().currentUser) {
            cartItemsArray = AppLevel.getFirestoreCartArray();
        } else {
            cartItemsArray = AppLevel.getLocalCartArray();
        }

        console.log('CART', cartItemsArray);

    }

    // RENDER
    
    return (
        <div className='CartPage'>
            <div className='cartPageWrapper'>
                <div className='cartContententsDiv'>
                    {cartItems}
                </div>
                <div className='checkoutSidebar'>

                </div>

            </div>
        </div>
    );
}


// ====== EXPORTS ====== 

export default CartPage;