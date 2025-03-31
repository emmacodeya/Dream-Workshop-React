import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccessPage = () => {
    return (
        <div className="container"  style={{ marginTop: "150px" }}>
            <div style={{height:"500px"}} className="success-message d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-gray-100 mb-5">訂單已成立!</h1>
                <Link className="btn btn-primary-600 text-gray-100 p-2 rounded" to="/pay-plan">返回商店</Link>
            </div>
           
        </div>
    )
}

export default CheckoutSuccessPage;