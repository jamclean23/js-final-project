// SearchBar Component

// ====== IMPORTS ======

import React, {useEffect, useState} from "react";
import './searchbar.css';

// ====== COMPONENT ======

function SearchBar (props) {

    // VARIABLES

    const [selectedCat, setSelectedCat] = useState('All');

    // LISTENERS

    useEffect(() => {
        // Calculate width of selected category name
        const selectedCatWidth = calculateTextWidth(selectedCat);

        // Set width of select box
        const select = document.querySelector('#searchBarCats');
        select.style.width = 'calc(' + selectedCatWidth + 'px + 2rem)';

    }, [selectedCat]);

    // FUNCTIONS

    function calculateTextWidth (text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        context.font = font || getComputedStyle(document.body).font;

        return context.measureText(text).width;
    }

    function handleCatsClick (event) {
        setSelectedCat(event.target.value);
    }

    return (
        <div className="SearchBar">
            <select defaultValue={selectedCat} id='searchBarCats' onClick={handleCatsClick}>
                <option value='All'>All</option>
                <option value='A really long option'>A really long option</option>
            </select>
            <input className='searchInput' type='text'/>
            <div className='searchBarOutline'></div>
            <a className='searchBtn'><span className='searchIcon'>🔎︎</span></a>
        </div>
    );
}


// ====== EXPORTS ======

export default SearchBar;