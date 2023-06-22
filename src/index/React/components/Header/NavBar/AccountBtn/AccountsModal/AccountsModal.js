// Accounts and Lists modal Component

// ====== IMPORTS ======

import React, { useContext } from "react";
import './accountsmodal.css';
import { appContext } from "../../../../../App";

// ====== COMPONENT ======

function AccountsModal (props) {

    // VARIABLES

    const userSignOut = useContext(appContext).userSignOut;

    // RENDER

    return (
        <div className='AccountsModal' >
            <div className='accountMenu'>
                <div>
                    <h1>Your Account</h1>
                    <div className='accountLinks'>
                        <span onClick={userSignOut}>Sign Out</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


// ====== EXPORT ======

export default AccountsModal;