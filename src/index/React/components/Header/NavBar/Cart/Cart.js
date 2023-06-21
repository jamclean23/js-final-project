// Cart Component

// ====== IMPORTS ======

import React, { useState } from 'react';
import './cart.css';

// Images

import cart from '../../../../../../assets/icons/cart.png';


//  ====== COMPONENT ======

function Cart (props) {
    return (
        <a className='navBtn cartBtn'>
            <div className='cartWrapper'>
                <img className='cartImg' src={cart} alt='cart'/>
                <span className='cartText'>Cart</span>
                <span className='cartCounter'>{props.count || 0}</span>
            </div>
        </a>
    );
}

// ====== EXPORT ======

export default Cart;