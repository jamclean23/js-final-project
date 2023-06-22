// Delivery Button Component

// ====== IMPORTS ======

import React from "react";
import './deliverybtn.css';

// Images
import pin from '../../../../../../assets/icons/pinWhite.png';

// ====== COMPONENT ======

function DeliveryBtn (props) {
    
    // RENDER 

    return (
        <a className="navBtn addressBtn">
            <div className='addressWrapper'>
                <img className='pinImg' src={pin} alt='pin' />
                <div>
                    <p>Deliver to BLANK</p>
                    <p>BLANK</p>
                </div>
            </div>
        </a>
    );
}


// ====== EXPORT ======

export default DeliveryBtn;
