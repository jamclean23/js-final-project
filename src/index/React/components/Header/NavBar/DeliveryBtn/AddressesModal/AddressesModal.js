// Addresses modal component

// ====== IMPORTS ======

import React, { useContext, useEffect, useRef } from 'react';
import './addressesmodal.css';
import { appContext } from '../../../../../App';
import { render } from '@testing-library/react';


// ====== COMPONENT ======

function AddressesModal (props) {

    // VARIABLES

    const userData = useContext(appContext).userData;
    const renderCounter = useRef(0);


    // LISTENERS

    useEffect(() => {

        // On mount
        if (renderCounter.current = 0) {
            getAddresses();
        }

        renderCounter.current = renderCounter.current + 1;
    }, []);

    // FUNCTIONS

    function getAddresses () {
        userData.updateUserData();
    }

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