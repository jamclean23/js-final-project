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
            let defaultAddress = userData.addresses[0];

            userData.addresses.forEach((address) => {
                if (address.default) {
                    defaultAddress = address;
                }
            });

            setCurrentAddress(defaultAddress);
        }
    }, [userData]);

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
                ? <AddressesModal setCurrentAddress={setCurrentAddress} setShouldDisplay={setShouldDisplayModal} />
                : ''
            }
        </>
    );
}


// ====== EXPORT ======

export default DeliveryBtn;
