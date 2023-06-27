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

import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';
const firestoreDb = getFirestore(firebaseApp);

// Components
import Header from './components/Header/Header';
import HomeContent from './components/HomeContent/HomeContent';

// ====== FUNCTIONS ======

// Main app function 
function App () {

    const [signedIn, setSignedIn] = useState(false);
    const [userData, setUserData] = useState({});

    // LISTENERS
    
    useEffect(() => {
        onAuthStateChanged(getAuth(), handleOnAuthStateChange);
    }, []);

    // FUNCTIONS

    function handleOnAuthStateChange (user) {
        user
            ? handleUserSignIn()
            : handleUserSignOut()
        ;

        function handleUserSignIn () {
            setSignedIn(true);
            updateUserData();
        }

        function handleUserSignOut () {
            setSignedIn(false);
        }
    }

    async function updateUserData () {
        const docSnap = await getDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid));
        if (!docSnap.exists()) {
            console.log('Document not found, creating...');
            const data = {
                address: ''
            }
            setDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid), data);
        } else {
            console.log(docSnap.data());
        }
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
                <HomeContent />
            </appContext.Provider>
        </div>
    );
}

// ====== EXPORTS ======

export {
    App, appContext
}