// NavBar Component

// ====== IMPORTS ======

import React, { useState } from "react";
import './navbar.css';

// Images

import whamazonLogo from '../../../../../assets/whamazonLogo/logo2.png';
import pin from '../../../../../assets/icons/pinWhite.png';

// Components

import './SearchBar/SearchBar.js';
import SearchBar from './SearchBar/SearchBar.js';
import SignInButton from "./SignInBtn/SignInBtn";
import Cart from './Cart/Cart.js';
import AccountBtn from "./AccountBtn/accountBtn";

//  ====== COMPONENT ======

function NavBar (props) {

    // VARIABLES

    // RENDER
    return (
        <div className='NavBar'>
            <a className="navBtn logoBtn"><img className="logoImg" src={whamazonLogo}/></a>
            {props.name && props.address 
                ? <a className="navBtn addressBtn"><div className='addressWrapper'><img className='pinImg' src={pin} alt='pin' /><div><p>Deliver to {props.name}</p><p>{props.address}</p></div></div></a>
                : ''
            }
            <SearchBar />
            <SignInButton />
            <AccountBtn />
            <a className='navBtn returnsOrdersBtn'><div><p>Returns</p><p>& Orders</p></div></a>
            <Cart />
        </div>
    );
}

//  ====== EXPORTS ======

export default NavBar;