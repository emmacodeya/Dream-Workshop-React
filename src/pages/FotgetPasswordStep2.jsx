import { NavLink } from "react-router-dom";

const FotgetPasswordStep2 = () => {
    return (
     
            <div className="container d-flex justify-content-center">
                <div className="login">
                    <h1 className="mb-8">忘記密碼</h1>
                    <p className="mb-5">系統已寄送 E-mail 驗證信函至您的會員註冊電子信箱
                        請您收到信件後於下方欄位輸入驗證碼</p>
                    <form className="row needs-validation" noValidate>
                        <div className="mx-auto mb-4">
                            <input id="number" type="text" className="login-input form-control mb-1" placeholder="請輸入驗證碼" required />
                            <button type="button" className="btn btn-primary-200 me-1">重發驗證碼</button> <span className="text-gray-200">60秒</span>  
                        </div>
                    
                        <div className="mb-5">
                            <NavLink to="/fotget-password-step3" className="btn btn-primary-600 w-100 p-2">驗證</NavLink>
                        </div>
                    </form>
                </div>  
            </div>
     
    )
}

export default FotgetPasswordStep2