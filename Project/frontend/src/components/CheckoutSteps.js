import React from "react";

 function CheckoutSteps(props) {
    return <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''} >Sign-In </div>
            <div className={props.step2 ? 'active' : ''} >Payment Method </div>
            <div className={props.step3 ? 'active' : ''} >Place order </div>
        </div>
}

export default CheckoutSteps;