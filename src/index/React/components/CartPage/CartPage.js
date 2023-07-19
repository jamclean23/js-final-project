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

        let cartItemsJsx = [];
        cartItemsArray.forEach((item) => {
            cartItemsJsx.push(
                <div key={uniqid()} className='cartPageItem'>
                    <p>Item</p>
                    <p>{item.itemId}</p>                    
                    <p>{item.quantity}</p>
                </div>);
        });

        console.log('CartItems:', cartItemsJsx);

        setCartItems(cartItemsJsx);
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