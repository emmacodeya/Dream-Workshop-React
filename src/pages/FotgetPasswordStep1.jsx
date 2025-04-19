import { NavLink } from "react-router-dom";

const FotgetPasswordStep1 = () => {
    return (
    
            <div className="container d-flex justify-content-center">
                <div className="login">
                    <h1 className="mb-8">忘記密碼</h1>
                    <form className="row needs-validation" noValidate>
                        <div className="mx-auto mb-5">
                            <label htmlFor="email" className="text-gray-100 fs-5 mb-2">電子郵件</label>
                            <input id="email" type="text" className="login-input form-control me-lg-3 me-1 flex-grow-1" placeholder="請輸入電子郵件" required/>
                        </div>
                        <div>
                            <NavLink to="/fotget-password-step2" className="btn btn-primary-600 w-100">送出</NavLink>
                        </div>
                    </form>    
                </div>  
            </div>
        
    )
}

export default FotgetPasswordStep1