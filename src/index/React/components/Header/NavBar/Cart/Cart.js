// Cart Component

// ====== IMPORTS ======

import React, { useState, useContext } from 'react';
import './cart.css';

// Images
import cart from '../../../../../../assets/icons/cart.png';

// Context
import { appContext } from '../../../../App';


//  ====== COMPONENT ======

function Cart (props) {

    // VARIABLES

    const cartCount = useContext(appContext).count;

    // RENDER

    return (
        <a className='navBtn cartBtn'>
            <div className='cartWrapper'>
                <img className='cartImg' src={cart} alt='cart'/>
                <span className='cartText'>Cart</span>
                <span className='cartCounter'>{cartCount || 0}</span>
            </div>
        </a>
    );
}

// ====== EXPORT ======

export default Cart;