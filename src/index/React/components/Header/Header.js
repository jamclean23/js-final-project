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
        Google: 'http://www.google.com',
        Gmail: 'http://www.gmail.com',
        Amazon: 'http://www.amazon.com',
        Reddit: 'http://www.reddit.com',
        W3Schools: 'http://www.w3schools.com',
        Fb: 'http://www.fb.com'
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