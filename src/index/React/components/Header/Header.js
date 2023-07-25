// Header Component

//  ====== IMPORTS ======

import React from 'react';
import './header.css';

import NavBar from './NavBar/NavBar.js';
import CatsBar from './CatsBar/CatsBar.js';


// ====== COMPONENT ======

function Header (props) {

    // VARABLES
    const testCats = {
        Hats: 'http://www.google.com',
        Hoodies: 'http://www.gmail.com',
        Candles: 'http://www.amazon.com',
        Paintings: 'http://www.reddit.com',
        'Phone Cases': 'http://www.w3schools.com',
        'T Shirts': 'http://www.fb.com'
    };

    // RENDER

    return (
        <header className='Header'>
            <NavBar address='placeholder' name='Guest'/>
            <CatsBar cats={testCats}/>
        </header>
    );
}


// ====== EXPORTS ======

export default Header;