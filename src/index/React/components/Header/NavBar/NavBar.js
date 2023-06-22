// NavBar Component

// ====== IMPORTS ======

import React, { useState, useContext } from "react";
import './navbar.css';

// Firebase

import { getAuth } from "firebase/auth";

// Images

import whamazonLogo from '../../../../../assets/whamazonLogo/logo2.png';
import pin from '../../../../../assets/icons/pinWhite.png';

// Components

import './SearchBar/SearchBar.js';
import SearchBar from './SearchBar/SearchBar.js';
import SignInButton from "./SignInBtn/SignInBtn";
import Cart from './Cart/Cart.js';
import AccountBtn from "./AccountBtn/AccountBtn";
import OrdersButton from "./OrdersBtn/OrdersButton";
import { appContext } from "../../../App";

//  ====== COMPONENT ======

function NavBar (props) {

    // VARIABLES

    const signedIn = useContext(appContext).signedIn;

    // FUNCTIONS

    function handleTestClick () {
        console.log(getAuth());
    }

    // RENDER

    return (
        <div className='NavBar'>
            <a className="navBtn logoBtn"><img className="logoImg" src={whamazonLogo}/></a>
            {props.name && props.address 
                ? <a className="navBtn addressBtn"><div className='addressWrapper'><img className='pinImg' src={pin} alt='pin' /><div><p>Deliver to {props.name}</p><p>{props.address}</p></div></div></a>
                : ''
            }
            <SearchBar />
            {signedIn
                ? 
                    <AccountBtn />
                : <SignInButton />
            }
            {signedIn ? <OrdersButton /> : ''}
            <Cart />
            <span className="navBtn testBtn" onClick={handleTestClick}>test</span>
        </div>
    );
}

//  ====== EXPORTS ======

export default NavBar;