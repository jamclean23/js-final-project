// NavBar Component

// ====== IMPORTS ======

import React, { useState, useContext } from "react";
import './navbar.css';
import { appContext } from "../../../App";

// Firebase

import { getAuth } from "firebase/auth";

// Images

import whamazonLogo from '../../../../../assets/whamazonLogo/logo2.png';

// Components

import './SearchBar/SearchBar.js';
import SearchBar from './SearchBar/SearchBar.js';
import SignInButton from "./SignInBtn/SignInBtn";
import Cart from './Cart/Cart.js';
import AccountBtn from "./AccountBtn/AccountBtn";
import OrdersButton from "./OrdersBtn/OrdersButton";
import DeliveryBtn from "./DeliveryBtn/DeliveryBtn";

//  ====== COMPONENT ======

function NavBar (props) {

    // VARIABLES

    const signedIn = useContext(appContext).signedIn;
    const appLevel = useContext(appContext);

    // FUNCTIONS

    function handleTestClick () {
        appLevel.clearFirestoreCart(); 
    }

    function handleLogoClick () {
        let currentLocation = window.location.href.split('#');

        window.location.href = currentLocation[0] + '#/';

    }

    // RENDER

    return (
        <div className='NavBar'>
            <a className="navBtn logoBtn"><img className="logoImg" src={whamazonLogo} onClick={handleLogoClick} /></a>
            {signedIn
                ? <DeliveryBtn />
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