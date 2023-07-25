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

import { getFirestore, getDoc, setDoc, doc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
const firestoreDb = getFirestore(firebaseApp);

// Components
import Header from './components/Header/Header';
import HomeContent from './components/HomeContent/HomeContent';
import TestComponent from './components/TestComponent/TestComponent';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/CartPage';
import SearchPage from './components/SearchPage/SearchPage';
// ====== FUNCTIONS ======

// Main app function 
function App () {

    const [signedIn, setSignedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [count, setCount] = useState(0);

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
            combineCarts();
            updateUserData();
            updateCartBtn();
        }

        function handleUserSignOut () {
            setSignedIn(false);
            updateCartBtn();
        }
    }

    async function updateCartBtn () {
        let cart = [];


        if (getAuth().currentUser) {
            let cartQuery = await getDocs(collection(firestoreDb, 'user-data', getAuth().currentUser.uid, 'cart'));
            
            cartQuery.forEach((item) => {
                cart.push(item.data());
            });
          } else {
            let cartString = localStorage.getItem('cart');
            if (cartString) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
        }

        if (cart === null) {
            setCount(0);
            return;
        }

        let cartCount = cart.reduce((accumulator, item) => {
            return accumulator + +item.quantity;
        }, 0);

        setCount(cartCount);
    }

    function combineCarts () {
        let cart = localStorage.getItem('cart');
        
        if (cart) {   
            cart = JSON.parse(localStorage.getItem('cart'));
            cart.forEach(async (item) => {
                await addToFirestoreCart(item.itemId, item.quantity);
            });
        }

        clearLocalCart();
    }

    function addToLocalCart (itemId, quantity = 1) {
        let cart = [];

        let cartString = localStorage.getItem('cart');
        if (cartString) {
            cart = JSON.parse(cartString);
        }

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

        updateCartBtn();
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
        updateCartBtn();
    }

    function removeFromLocalCart (itemId) {
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
        updateCartBtn();
    }

    function clearLocalCart () {
        localStorage.setItem("cart", '');
        updateCartBtn();
    }

    async function addToFirestoreCart (itemId, quantity) {
        const docRef = doc(firestoreDb, "user-data", getAuth().currentUser.uid, "cart", itemId)
        const querySnap = await getDoc(docRef);
        
        if (querySnap.data()) {
            updateDoc(docRef, {
                quantity: +querySnap.data().quantity + +quantity,
            })
        } else {
            await setDoc(docRef, {
                "itemId": itemId,
                "quantity": quantity
            });
        }
        updateCartBtn();
    }

    async function removeFromFirestoreCart (itemId) {
        return new Promise(async (resolve, reject) => {

            const docRef = doc(firestoreDb, "user-data", getAuth().currentUser.uid, "cart", itemId);
            
            await deleteDoc(docRef);
            resolve()

            updateCartBtn();
        });
    }

    function clearFirestoreCart () {
        return new Promise(async (resolve, reject) => {

            const querySnap = await getDocs(collection(firestoreDb, 'user-data', getAuth().currentUser.uid, 'cart'));
            
            querySnap.forEach(async (currentDoc) => {
                await deleteDoc(doc(firestoreDb, "user-data", getAuth().currentUser.uid, "cart", currentDoc.id));
            });
            
            updateCartBtn();
            resolve();
        });
    }

    function changeQuantityFirestoreCart (itemId, newQuantity) {
        return new Promise(async (resolve, reject) => {

            const docRef = doc(firestoreDb, "user-data", getAuth().currentUser.uid, "cart", itemId);
            const querySnap = await getDoc(docRef);
            
            if (querySnap.empty) {
                resolve();
            }
            
            await updateDoc(docRef, {
                quantity: newQuantity
            })

            updateCartBtn();
            resolve();
            
        });
    }

    function updateUserData () {
        return new Promise(async (resolve, reject) => {

            const docSnap = await getDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid));

            if (!docSnap.exists()) {
                // If user has not signed in before, create new firestore doc
                setDoc(doc(firestoreDb, 'user-data', getAuth().currentUser.uid), {});
                setUserData({});
            } else {
                // If user has existing doc, retrieve addresses
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

    function getLocalCartArray () {
        let cart = localStorage.getItem('cart');

        if (!cart) {
            return [];
        }

        return JSON.parse(cart);
    }

    async function getFirestoreCartArray () {
        return new Promise(async (resolve, reject) => {
            
            let cart; 
            try {
                cart = await getDocs(collection(firestoreDb, 'user-data', getAuth().currentUser.uid, 'cart'));
            } catch (error) {
                console.log(error);
            }
            
            if (cart.empty) {
                reject();
            }
            
            let cartArray =[];
            
            cart.forEach((item) => {
                cartArray.push(item.data());
            });
            
            resolve(cartArray);
        });
    }

    function goToHashUrl (routeName) {
        let currentLocation = window.location.href.split('#');

        window.location.href = currentLocation[0] + '#/' + routeName;
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
                    getLocalCartArray,
                    addToFirestoreCart,
                    removeFromFirestoreCart,
                    clearFirestoreCart,
                    changeQuantityFirestoreCart,
                    getFirestoreCartArray,
                    goToHashUrl,
                    count
                }}>
                <HashRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<HomeContent />}/>
                        <Route path='/test' element={<TestComponent/>}/>
                        <Route path='product/:id' element={<ProductPage/>} />
                        <Route path='cart' element={<CartPage/>} />
                        <Route path='results/:keyword' element={<SearchPage/>}/>
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