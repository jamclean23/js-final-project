// accountBtn Component


// ====== IMPORTS ======

import React, { useState } from 'react';
import './accountbtn.css';

// Images

import downArrow from '../../../../../../assets/icons/downArrow.png';


// ====== Component ======

function AccountBtn (props) {
    return (
        <a className='navBtn accountBtn'>
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