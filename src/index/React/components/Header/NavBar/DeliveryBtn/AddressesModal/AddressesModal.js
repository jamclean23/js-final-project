// Addresses modal component

// ====== IMPORTS ======

import React, { useContext, useEffect, useRef, useState } from 'react';
import './addressesmodal.css';
import { appContext } from '../../../../../App';
import uniqid from 'uniqid';


// ====== COMPONENT ======

function AddressesModal (props) {

    // VARIABLES

    const userData = useContext(appContext).userData;
    const updateUserData = useContext(appContext).updateUserData;
    const renderCounter = useRef(0);
    const [addresses, setAddresses] = useState([]);


    // LISTENERS

    useEffect(() => {

        // On mount
        if (renderCounter.current === 0) {
            getAddressesJsx();
        }

        renderCounter.current = renderCounter.current + 1;
    }, []);

    // FUNCTIONS

    async function getAddressesJsx () {
        await updateUserData();

        // Use address data from userData to build array of jsx, then set it to state
        let addressesArray = [];

        userData.addresses.forEach((address) => {
            addressesArray.push(<div className='addressDiv' key={uniqid()}>
                <h2>{address.firstName} {address.lastName}</h2>
                <p>{address.streetAddress},</p>
                <p>{address.city},</p>
                <p>{address.state},</p>
                <p>{address.zip}</p>
            </div>);
        });

        setAddresses(addressesArray);
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
                    {addresses}
                </div>
                <div className='addressesBtnsWrapper'>
                    <button>Add an address</button>
                    <button onClick={handleDoneClick}>Done</button>
                </div>
            </div>
        </div>
    );
}

// ====== EXPORTS ======

export default AddressesModal;