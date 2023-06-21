// accountBtn Component


// ====== IMPORTS ======

import React, { useState } from 'react';
import './accountbtn.css';

// Images

import downArrow from '../../../../../../assets/icons/downArrow.png';

// ====== Component ======

function AccountBtn (props) {

    // FUNCTIONS

    function handleMouseEnter () {
        console.log('hovered');
    }

    function handleMouseLeave () {
        console.log('left');
    }

    //  RENDER

    return (
        <a className='navBtn accountBtn' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <div className='accountBtnWrapper'>
                <div>
                    <p>Hello, {props.name || 'Guest'}</p>
                    <p>Accounts & Lists</p>
                </div>
                <img className='downArrowImg' src={downArrow} />
            </div>
        </a>
    )
}


// ====== EXPORTS ======

export default AccountBtn;