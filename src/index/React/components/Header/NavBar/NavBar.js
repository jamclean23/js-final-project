// NavBar Component

// ====== IMPORTS ======

import React from "react";
import './navbar.css';

// Components
import './SearchBar/SearchBar.js';
import SearchBar from './SearchBar/SearchBar.js';

//  ====== COMPONENT ======

function NavBar (props) {
    return (
        <div className='NavBar'>
            <a className="logoBtn">LOGO</a>
            <a className="addressBtn">ADDRESS</a>
            <SearchBar />
        </div>
    );
}

//  ====== EXPORTS ======

export default NavBar;