// Main app


// ====== IMPORTS ======

// React
import React, { createContext, useEffect, useState } from 'react';
const appContext = createContext();
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    HashRouter
} from 'react-router-dom';

// Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
const firebaseApp = initializeApp(firebaseConfig);

import { getFirestore, getDoc, setDoc, doc, collection, getDocs } from 'firebase/firestore';
const firestoreDb = getFirestore(firebaseApp);

// Components
import Header from './components/Header/Header';
import HomeContent from './components/HomeContent/HomeContent';
import TestComponent from './components/TestComponent/TestComponent';
import ProductPage from './ProductPage/ProductPage';

// ====== FUNCTIONS ======

// Main app function 
function App () {

    const [signedIn, setSignedIn] = useState(false);
    const [userData, setUserData] = useState({});

    // LISTENERS

    useEffect(() => {
        onAuthStateChanged(getAuth(), handleOnAuthStateChange);
    }, []);

    useEffect(() => {
        if (Object.keys(userData).length) {
            // console.log(userData);
        }
    }, [userData]);

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

    function addToLocalCart (itemId, quantity = 1) {

        console.log(`Adding item: ${itemId} to localCart. Quantity: ${quantity}.`);

        let cart = JSON.parse(localStorage.getItem("cart"));

        if (cart) {

            let itemFound = false;

            cart.forEach((item) => {
                if (item.itemId === itemId) {
                    item.quantity = +item.quantity + +quantity;
                    itemFound = true;
                }
            });

            if (!itemFound) {
                cart.push({ itemId, quantity });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

        } else {
            localStorage.setItem("cart", JSON.stringify([{ itemId, quantity }]));
        }

        console.log(localStorage.getItem("cart"));
    }

    function changeQuantityLocalCart (itemId, newQuantity) {
        `Changing quantity of item: ${itemId} to ${newQuantity}`

        let cart = JSON.parse(localStorage.getItem("cart"));

        if (!cart) {
            return;
        }

        cart.forEach((item) => {
            if (item.itemId === itemId) {
                item.quantity = newQuantity;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function removeFromLocalCart (itemId) {
        console.log(`Removing all items of type: ${itemId} from localCart.`);

        let cart = JSON.parse(localStorage.getItem("cart"));

        if (!cart) {
            return;
        }

        let itemIndex;

        cart.forEach((item, index) => {
            if (item.itemId === itemId) {
                itemIndex = index;
            }
        });

        cart.splice(itemIndex, 1);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function clearLocalCart () {
        console.log(`Clearing localCart.`);
        localStorage.setItem("cart", null);
    }

    async function addToFirestoreCart (itemId, quantity) {

    }

    async function removeFromFirestoreCart () {

    }

    async function clearFirestoreCart () {

    }

    async function changeQuantityFirestoreCart () {

    }

    function updateUserData () {
        return new Promise(async (resolve, reject) => {

            const docSnap = await getDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid));
            if (!docSnap.exists()) {
                console.log('Document not found, creating...');
                setDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid), {});
                setUserData({});
            } else {
                
                const addressesSnapshot = await getDocs(collection(firestoreDb, 'user-data', getAuth().currentUser.uid, 'addresses'));
                let addresses = [];
                
                
                addressesSnapshot.forEach((doc) => {
                    addresses.push({...doc.data(), id: doc.id});
                })
                
                setUserData({
                    userData: docSnap.data(),
                    addresses: addresses
                });
            }
            resolve();
        });
    }

    async function googleSignIn () {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider)
    }

    async function userSignOut () {
        try {
            signOut(getAuth());
            setUserData({});
        } catch (error) {
            console.log(error);
        }
    }



    // RENDER

    return (
        <div className='App'>
            <appContext.Provider value={{
                    googleSignIn,
                    userSignOut,
                    signedIn,
                    userData,
                    updateUserData,
                    addToLocalCart,
                    removeFromLocalCart,
                    clearLocalCart,
                    changeQuantityLocalCart,
                    addToFirestoreCart,
                    removeFromFirestoreCart,
                    clearFirestoreCart,
                    changeQuantityFirestoreCart
                }}>
                <HashRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<HomeContent />}/>
                        <Route path='/test' element={<TestComponent/>}/>
                        <Route path='product/:id' element={<ProductPage/>} />
                    </Routes>
                </HashRouter>
            </appContext.Provider>
        </div>
    );
}

// ====== EXPORTS ======

export {
    App, appContext, firestoreDb
}