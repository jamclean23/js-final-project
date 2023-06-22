// accountBtn Component


// ====== IMPORTS ======

import React, { useEffect, useState } from 'react';
import './accountbtn.css';

// Firebase

import { getAuth } from 'firebase/auth';

// Components

import AccountsModal from './AccountsModal/AccountsModal';

// Images

import downArrow from '../../../../../../assets/icons/downArrow.png';

// ====== Component ======

function AccountBtn (props) {

    // VARIABLES

    const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

    // LISTENERS

    useEffect(() => {
        shouldDisplayModal
            ? showModal()
            : hideModal()
    }, [shouldDisplayModal]);

    // FUNCTIONS

    function showModal () {
        const modal = document.querySelector('.AccountsModal');
        modal.classList.add('active');
        const triangle = document.querySelector('.AccountBtn > .triangle');
        triangle.classList.add('active');
    }

    function hideModal () {
        const modal = document.querySelector('.AccountsModal');
        modal.classList.remove('active');
        const triangle = document.querySelector('.AccountBtn > .triangle');
        triangle.classList.remove('active');
    }

    function handleMouseEnter () {
        setShouldDisplayModal(true);
    }

    function handleMouseLeave () {
        setShouldDisplayModal(false);
    }

    //  RENDER

    return (
        <div className='navBtn AccountBtn' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <div className='accountBtnWrapper'>
                <div>
                    <p>Hello, {getAuth().currentUser.displayName}</p>
                    <p>Accounts & Lists</p>
                </div>
                <img className='downArrowImg' src={downArrow} />
            </div>
            <AccountsModal />
            <div className='triangle'></div>
        </div>
    )
}


// ====== EXPORTS ======

export default AccountBtn;