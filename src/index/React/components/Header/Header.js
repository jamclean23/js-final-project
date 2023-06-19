// Header Component

//  ====== IMPORTS ======

import React from 'react';
import './header.css';

import NavBar from './NavBar/NavBar.js';
import CatsBar from './CatsBar/CatsBar.js';


// ====== COMPONENT ======

function Header (props) {
    return (
        <header className='Header'>
            <NavBar />
            <CatsBar />
        </header>
    );
}


// ====== EXPORTS ======

export default Header;