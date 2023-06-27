// Delivery Button Component

// ====== IMPORTS ======

import React, { useContext, useEffect, useState } from "react";
import './deliverybtn.css';
import { appContext } from "../../../../App";

// Images
import pin from '../../../../../../assets/icons/pinWhite.png';

// ====== COMPONENT ======

function DeliveryBtn (props) {
    
    // VARIABLES

    const userData = useContext(appContext).userData;
    const [currentAddress, setCurrentAddress] = useState();

    // LISTENERS

    useEffect(() => {
        if (userData.addresses) {
            setCurrentAddress(userData.addresses[0]);
        }
    }, [userData]);

    // RENDER 

    return (
        <a className="navBtn addressBtn">
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
    );
}


// ====== EXPORT ======

export default DeliveryBtn;
