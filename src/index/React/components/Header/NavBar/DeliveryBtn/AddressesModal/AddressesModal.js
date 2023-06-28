// Addresses modal component

// ====== IMPORTS ======

import React from 'react';
import './addressesmodal.css';


// ====== COMPONENT ======

function AddressesModal (props) {

    // FUNCTIONS

    function handleDoneClick () {
        props.setShouldDisplay(false);
    }

    // RENDER

    return (
        <div className='modalWrapper' onClick={handleDoneClick}>
            <div className='AddressesModal'>
                <h1>Choose your location</h1>
                <div className='addressesList'>

                </div>
                <button>Add an address</button>
                <button onClick={handleDoneClick}>Done</button>
            </div>
        </div>
    );
}

// ====== EXPORTS ======

export default AddressesModal;