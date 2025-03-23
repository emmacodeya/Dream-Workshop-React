/* eslint-disable react/react-in-jsx-scope */

import { Link } from "react-router-dom";
const CheckoutSuccessPage = () => {
    return (
        <div className="container"  style={{ marginTop: "150px" }}>
            <div style={{height:"500px"}} className="success-message d-flex justify-content-conter align-item-center">
                <h1 className="text-gray-100">訂單已成立</h1>
                <Link className="text-gray-100" to="/pay-plan">返回商店</Link>
            </div>
           
        </div>
    )
}

export default CheckoutSuccessPage;