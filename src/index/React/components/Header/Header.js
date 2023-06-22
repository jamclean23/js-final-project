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
        cat1: 'google.com',
        cat2: 'gmail.com',
        cat3: 'amazon.com',
        cat4: 'reddit.com',
        cat5: 'w3schools.com',
        cat6: 'fb.com'
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