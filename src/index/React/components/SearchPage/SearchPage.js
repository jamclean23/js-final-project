// Component for displaying search results

// ====== IMPORTS ======

// React
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

// Css
import './searchpage.css'
import getSearchResults from "../../../../functions/getSearchResults";

// Components
import ProductDiv from "../HomeContent/ProductDiv/ProductDiv";

// Functions
import uniqid from 'uniqid';


// ====== COMPONENT ======

function SearchPage (props) {
    // VARIABLES
    
    const { keyword } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [resultsJsx, setResultsJsx] = useState([]);


    // LISTENERS

    useEffect(() => {
        handleMount()
    }, [keyword]);

    useEffect(() => {
        // if (searchResults.length > 0) {
        //     buildProductsJsx();
        // }
        buildProductsJsx();
    }, [searchResults]);


    // FUNCTIONS

    async function handleMount() {
        let results = await getSearchResults(keyword || []);
        setSearchResults(results);
    }

    function buildProductsJsx () {
        let productsArrayJsx = [];

        searchResults.forEach((item) => {
            productsArrayJsx.push(
                <ProductDiv key={uniqid()} productData={item}/>
            );
        });

        setResultsJsx(productsArrayJsx);

    }

    // RENDER
    return (
        <div className='SearchPage'>
            <h2>Results for "{keyword}"</h2>
            <div className='resultsDiv'>
                {resultsJsx}
            </div>
        </div>  
    );
}

// ====== EXPORTS ======

export default SearchPage;