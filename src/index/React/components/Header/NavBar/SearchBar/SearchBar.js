// SearchBar Component

// ====== IMPORTS ======

import React, {useState} from "react";
import './searchbar.css';

// ====== COMPONENT ======

function SearchBar (props) {

    const [selectedCat, setSelectedCat] = useState('All');
    
    function handleSelectChange (event) {
        setSelectedCat(event.target.value);
    }

    return (
        <div className="SearchBar">
            <select id='searchBarCats' value={selectedCat} onChange={handleSelectChange}>
                <option value="All">All</option>
                <option value="Other">Other</option>
            </select>
            <input type='text'/>
            <button>🔍</button>
        </div>
    );
}


// ====== EXPORTS ======

export default SearchBar;