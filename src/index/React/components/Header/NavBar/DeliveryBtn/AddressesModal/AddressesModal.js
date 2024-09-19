// Addresses modal component

// ====== IMPORTS ======

import React, { useContext, useEffect, useRef, useState } from 'react';
import './addressesmodal.css';
import { appContext } from '../../../../../App';
import uniqid from 'uniqid';

// Firebase

import { addDoc, collection, doc, updateDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { firestoreDb } from '../../../../../App';
import { getAuth } from 'firebase/auth';

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
        zip: '',
        default: false
    });


    // LISTENERS

    useEffect(() => {

        // On mount
        if (renderCounter.current === 0) {
            getAddressesJsx();
        }

        renderCounter.current = renderCounter.current + 1;
    }, []);

    useEffect(() => {
        buildAddressesJsx();
    }, [userData.addresses]);

    // FUNCTIONS

    async function getAddressesJsx () {
        await updateUserData();
        setRetrieveAddresses(true);
    }

    async function handleAddressDivClick (event) {
        
        // Filter out clicks on children

        let clicked;

        if (event.target.classList.contains('addressDiv')) {
            clicked = event.target;
        } else if (event.target.classList.contains('firstName') || event.target.classList.contains('lastName')) {
            clicked = event.target.parentNode.parentNode;
        } else if (event.target.classList.contains('xButton')) {
            handleXButtonClick(event);
            return;
        } else {
            clicked = event.target.parentNode;
        }

        // Reset the old default address
        await resetDefaults();

        // Set the clicked address to the new default
        await updateField(clicked.getAttribute('data-id'), 'default', true);

        // Update userdata
        updateUserData();

        props.setShouldDisplay(false);
    }

    async function handleXButtonClick (event) {
        console.log('x clicked', event);
        console.log('id:', event.target.parentNode.getAttribute('data-id'));
        await deleteDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid, 'addresses', event.target.parentNode.getAttribute('data-id')));
        updateUserData();

    }

    function updateField (docId, field, value) {
        return new Promise(async (resolve, reject) => {

            if (!docId) {
                console.error('Document id not provided');
                return;
            } else if (!field) {
                console.error('Field not provided');
            } else if (!value) {
                console.error('Value not provided');
            }
            
            let docRef = doc(firestoreDb, 'user-data', getAuth().currentUser.uid, 'addresses', docId);
            
            let docObj = {};
            docObj[field] = value;
            
            await updateDoc(docRef, docObj);
            resolve();
        });
    }
        
    async function resetDefaults () {
        return new Promise(async (resolve, reject) => {
            
            const defaultsQuery = 
                query(
                    collection(firestoreDb, 'user-data', getAuth().currentUser.uid, 'addresses'),
                    where('default', '==', true)
                );
                
            const querySnapshot = await getDocs(defaultsQuery);
                
            querySnapshot.forEach((address) => {
                console.log(address.id);
                updateDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid, 'addresses', address.id), { 
                    default: false
                });
            });

            resolve();
        });
    }

    function buildAddressesJsx () {
        if (!userData.addresses) {
            return;
        }
        // Use address data from userData to build array of jsx, then set it to state
        let addressesArray = [];

        userData.addresses.forEach((address) => {
            const content = 
                <div data-id={address.id} onClick={handleAddressDivClick} className={address.default ? 'defaultAddress addressDiv' : 'addressDiv' } key={uniqid()}>
                    <button className='xButton' >X</button>
                    <h2><span className='firstName'>{address.firstName}</span> <span className='lastName'>{address.lastName}</span></h2>
                    <p className='streetAddress'>{address.streetAddress},</p>
                    <p className='city'>{address.city},</p>
                    <p className='state'>{address.state},</p>
                    <p className='zip'>{address.zip}</p>
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

    async function handleAddAddressSubmitBtnClick () {

        // Upload information to firestore
        try {
            console.log('Adding address');
            await addDoc(collection(firestoreDb, 'user-data', getAuth().currentUser.uid, 'addresses'), addressFormInfo);
        } catch (err) {
            console.log(err);
        }

        // Sync userdata with firestore
        updateUserData();

        // Go back to "choose address" modal
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
                            : <span className='addressesLoading'>No known addresses</span>
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