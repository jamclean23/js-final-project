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
            <a className="navBtn logoBtn"><div>LOGO</div></a>
            <a className="navBtn addressBtn"><div>ADDRESS</div></a>
            <SearchBar />
            <a className='navBtn langBtn'>LANG</a>
            <a className='navBtn accountBtn'><div><p>Hello, user</p><p>Accounts & Lists</p></div></a>
            <a className='navBtn returnsOrdersBtn'><div><p>Returns</p><p>& Orders</p></div></a>
            <a className='navBtn cartBtn'>Cart</a>
        </div>
    );
}

//  ====== EXPORTS ======

export default NavBar;