// Sign In Button Component

// ====== IMPORTS ======
 import React, { useState, useContext } from 'react';
 import { appContext } from "../../../../App";


//  ====== COMPONENT ======

function SignInButton (props) {

    // VARIABLES

    const appContextObj = useContext(appContext);

    // FUNCTIONS

    function handleSignInClick () {
        appContextObj.googleSignIn();
    }

    // RENDER

    return (
        <div className='navBtn SignInBtn' onClick={handleSignInClick}>
            <span>Sign In</span>
        </div>
    );
}


//  ====== EXPORTS ======

export default SignInButton;