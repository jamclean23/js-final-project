// SearchBar Component

// ====== IMPORTS ======

// React
import React, {useContext, useEffect, useState} from "react";

// Css
import './searchbar.css';

// Images
import searchImg from '../../../../../../assets/icons/search.png';

// Functions
import getSearchResults from '../../../../../../functions/getSearchResults.js';

// Context
import { appContext } from "../../../../App";

// ====== COMPONENT ======

function SearchBar (props) {

    // VARIABLES

    const AppLevel = useContext(appContext);
    const [selectedCat, setSelectedCat] = useState('All');
    const [searchBarContent, setSearchBarContent] = useState('');

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

    async function handleSearchClick () {
        AppLevel.goToHashUrl('results/' + searchBarContent);
    }

    function handleSearchBarOnChange (event) {
        setSearchBarContent(event.target.value)
    }

    // RENDER

    return (
        <div className="SearchBar">
            <select defaultValue={selectedCat} id='searchBarCats' onClick={handleCatsClick}>
                <option value='All'>All</option>
                <option value='A really long option'>A really long option</option>
            </select>
            <input className='searchInput' type='text' value={searchBarContent} onChange={handleSearchBarOnChange}/>
            <div className='searchBarOutline'></div>
            <a onClick={handleSearchClick} className='searchBtn'><img className='searchIcon' src={searchImg} alt='searchImg'/></a>
        </div>
    );
}


// ====== EXPORTS ======

export default SearchBar;