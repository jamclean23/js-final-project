// Main app


// ====== IMPORTS ======

// React
import React, { createContext, useEffect, useState } from 'react';
const appContext = createContext();

// Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
const firebaseApp = initializeApp(firebaseConfig);

// Components
import Header from './components/Header/Header';

// ====== FUNCTIONS ======

// Main app function 
function App () {

    const [signedIn, setSignedIn] = useState(false);

    // LISTENERS
    
    useEffect(() => {
        onAuthStateChanged(getAuth(), handleOnAuthStateChange);
    }, []);

    // FUNCTIONS

    function handleOnAuthStateChange (user) {
        user
            ? setSignedIn(true)
            : setSignedIn(false)
        ;
    }

    async function googleSignIn () {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(getAuth(), provider)
    }

    async function userSignOut () {
        try {
            signOut(getAuth());
        } catch (error) {
            console.log(error);
        }
    }



    // RENDER

    return (
        <div className='App'>
            <appContext.Provider value={{ googleSignIn, userSignOut, signedIn }}>
                <Header />
            </appContext.Provider>
        </div>
    );
}

// ====== EXPORTS ======

export {
    App, appContext
}