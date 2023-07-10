// Product Carousel Component for use on the homescreen

// ====== IMPORTS ======

// React
import React from "react";

// Css
import './productcarousel.css';

// ====== COMPONENT ======

function ProductCarousel (props) {

    // ======= FUNCTION ======

    function handleLeftClick (event) {
        requestAnimationFrame(scrollDiv.bind(this, {
            element: event.target.parentNode.querySelector('.carousel'), 
            direction: 'left',
            accumulator: 0,
            amountInPx: 300
        }));
    }

    function handleRightClick (event) {
        requestAnimationFrame(scrollDiv.bind(this, {
            element: event.target.parentNode.querySelector('.carousel'),
            direction: 'right',
            accumulator: 0,
            amountInPx: 300
        }));
    }

    function scrollDiv (eventObj) {
            console.log('ELEMENT: ', eventObj.element);
            console.log('DIRECTION: ', eventObj.direction);
            console.log('ACCUMULATOR: ', eventObj.accumulator);
            console.log('AMOUNT IN PX: ', eventObj.amountInPx);

            let scrollSpeed = 20;

            if (eventObj.accumulator <= eventObj.amountInPx) {
                eventObj.direction === 'right'
                    ? eventObj.element.scrollLeft += scrollSpeed
                    : eventObj.element.scrollLeft -= scrollSpeed
                ;
                let passedObj = {...eventObj};
                passedObj.accumulator += scrollSpeed;
                requestAnimationFrame(scrollDiv.bind(this, passedObj));
                return;
            } else {
                return;
            };
    }


    // ====== RENDER ======

    return(
        <div className='ProductCarousel'>
            <h2>{props.header || 'Recommended for you'}</h2>
            <div className='carousel'>
                {props.products}
            </div>
            <button onClick={handleLeftClick} className="arrowBtn left">&#60;</button>
            <button onClick={handleRightClick} className="arrowBtn right">&#62;</button>
        </div>
    );
}

export default ProductCarousel;