// Component for testing react router

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function TestComponent (props) {

    // VARIABLES

    const params = useParams();

    // LISTENERS

    useEffect(() => {
        console.log(params.id);
    }, []);

    // RENDER

    return (
        <div>TEST</div>
    );
}

export default TestComponent;