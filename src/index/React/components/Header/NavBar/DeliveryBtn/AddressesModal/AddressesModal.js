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
    const [modalToDisplay, setModalToDisplay] = useState('chooseAddressModal');
    const [retrieveAddresses, setRetrieveAddresses] = useState(false);

    // Variabes in state for adding an address
    const [addressFormInfo, setAddressFormInfo] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
    });


    // LISTENERS

    useEffect(() => {

        // On mount
        if (renderCounter.current === 0) {
            getAddressesJsx();
        }

        renderCounter.current = renderCounter.current + 1;
    }, []);

    // useEffect(() => {
    //     console.log('ADDRESS FORM INFO', addressFormInfo);
    // }, [addressFormInfo]);

    useEffect(() => {
        if (retrieveAddresses) {
            buildAddressesJsx();
        }
    }, [userData]);

    // FUNCTIONS

    async function getAddressesJsx () {
        await updateUserData();
        setRetrieveAddresses(true);
    }

    function buildAddressesJsx () {
        // Use address data from userData to build array of jsx, then set it to state
        let addressesArray = [];

        userData.addresses.forEach((address) => {
            const content = <div className={address.default ? 'defaultAddress addressDiv' : 'addressDiv' } key={uniqid()}>
            <h2>{address.firstName} {address.lastName}</h2>
            <p>{address.streetAddress},</p>
            <p>{address.city},</p>
            <p>{address.state},</p>
            <p>{address.zip}</p>
            {address.default
                ? <p className='defaultAddressText'>Default address</p>
                : ''
            }
            </div>

            if (address.default) {
                addressesArray.unshift(content);
            } else {
                addressesArray.push(content);
            }
        });

        setAddresses(addressesArray);
    }

    function handleDoneClick (event) {
        if (event.target === document.querySelector('.modalWrapper') || event.target === document.querySelector('.AddressesModal .doneBtn')) {
            props.setShouldDisplay(false);
        } 

    }

    function handleAddAddressBtnClick () {
        setModalToDisplay('addAddressModal');
    }

    function handleFormInput (event, field) {
        let copyObj = JSON.parse(JSON.stringify(addressFormInfo));
        copyObj[field] = event.target.value;
        setAddressFormInfo(copyObj);
    }

    function handleAddAddressCancelBtnClick () {
        setModalToDisplay('chooseAddressModal');
    }

    function handleAddAddressSubmitBtnClick () {
        setModalToDisplay('chooseAddressModal');
    }

    // RENDER

    return (
        <div className='modalWrapper' onClick={handleDoneClick}>
            {modalToDisplay === 'chooseAddressModal'
            ? 
                <div className='AddressesModal chooseAddressModal'>
                    <h1>Choose your location</h1>
                    <div className='addressesList'>
                        {addresses.length
                            ? addresses
                            : <span className='addressesLoading'>Loading...</span>
                        }
                    </div>
                    <div className='addressesBtnsWrapper'>
                        <button className='addAddressBtn' onClick={handleAddAddressBtnClick}>Add an address</button>
                        <button className='doneBtn' onClick={handleDoneClick}>Done</button>
                    </div>
                </div>
            : ''
            }

            {modalToDisplay === 'addAddressModal'
                ?
                    <div className='AddressesModal addAddressModal'>
                        <h1>Add an address</h1>
                        <div className='inputWrapper'>
                            <label>First name</label>
                            <input value={addressFormInfo.firstName} onChange={function (event) { handleFormInput(event, 'firstName') } } type='text' className='firstNameInput'/>
                        </div>
                        <div className='inputWrapper'>
                            <label>Last name</label>
                            <input  value={addressFormInfo.lastName} onChange={function (event) { handleFormInput(event, 'lastName') } } type='text' className='lastNameInput'/>
                        </div>
                        <div className='inputWrapper'>
                            <label>Street address</label>
                            <input value={addressFormInfo.streetAddress} onChange={function (event) { handleFormInput(event, 'streetAddress') } } type='text' className='streetAddressInput'/>
                        </div>    
                        <div className='inputWrapper'>
                            <label>City</label>
                            <input value={addressFormInfo.city} onChange={function (event) { handleFormInput(event, 'city') } } type='text' className='cityInput'/>
                        </div>                           
                        <div className='inputWrapper'>
                            <label>State</label>
                            <input value={addressFormInfo.state} onChange={function (event) { handleFormInput(event, 'state') } } type='text' className='stateInput'/>
                        </div>      
                        <div className='inputWrapper'>
                            <label>Zip</label>
                            <input value={addressFormInfo.zip} onChange={function (event) { handleFormInput(event, 'zip') } } type='text' className='zipInput'/>
                        </div>
                        <div className='addAddressBtnWrapper'>
                            <button onClick={handleAddAddressCancelBtnClick} >Cancel</button>
                            <button onClick={handleAddAddressSubmitBtnClick}>Submit</button>
                        </div>                                                                  
                    </div>
                : ''
            }

        </div>
    );
}

// ====== EXPORTS ======

export default AddressesModal;