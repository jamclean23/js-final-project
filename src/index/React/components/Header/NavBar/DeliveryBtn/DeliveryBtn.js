// Delivery Button Component

// ====== IMPORTS ======

import React, { useContext, useEffect, useState } from "react";
import './deliverybtn.css';
import { appContext } from "../../../../App";

// Images
import pin from '../../../../../../assets/icons/pinWhite.png';

// Components
import AddressesModal from "./AddressesModal/AddressesModal";

// ====== COMPONENT ======

function DeliveryBtn (props) {
    
    // VARIABLES

    const userData = useContext(appContext).userData;
    const [currentAddress, setCurrentAddress] = useState();
    const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

    // LISTENERS

    useEffect(() => {
        if (userData.addresses) {
            setCurrentAddress(userData.addresses[0]);
        }
    }, [userData]);

    useEffect(() => {
        console.log(shouldDisplayModal);
    }, [shouldDisplayModal]);

    // FUNCTIONS

    function handleDeliveryBtnClick () {
        setShouldDisplayModal(true);
    }

    // RENDER 

    return (
        <>
            <a className="navBtn DeliveryBtn addressBtn" onClick={handleDeliveryBtnClick}>
                <div className='addressWrapper'>
                    <img className='pinImg' src={pin} alt='pin' />
                    <div>
                        {currentAddress
                            ? 
                                <>
                                    <p>Deliver to {currentAddress.firstName}</p>
                                    <p>{currentAddress.city} {currentAddress.zip}</p>
                                </>
                            :
                                <>
                                    <p>Add delivery address</p>
                                </>
                        }
                    </div>
                </div>
            </a>
            
            { shouldDisplayModal 
                ? <AddressesModal setShouldDisplay={setShouldDisplayModal} />
                : ''
            }
        </>
    );
}


// ====== EXPORT ======

export default DeliveryBtn;
