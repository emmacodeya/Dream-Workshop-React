import { NavLink } from "react-router-dom";

const FotgetPasswordStep3 = () => {
    return (
        <>
             <div className="container">
                <div className="login">
                    <h1 className="mb-8">忘記密碼</h1>
                    <form className="row needs-validation" noValidate>
                        <div className="mx-auto mb-6">
                            <label htmlFor="email" className="text-gray-100 fs-5 mb-2">重置新密碼</label>
                            <input 
                            id="email" 
                            type="text" 
                            className="login-input form-control mb-4" placeholder="請輸入新密碼 ( 設定6-18位半形英文數字含大小寫)" required />
                            <label htmlFor="email" className="text-gray-100 fs-5 mb-2">輸入第2次新密碼</label>
                            <input 
                            id="email" 
                            type="text" 
                            className="login-input form-control" placeholder="請再輸入新密碼 ( 設定6-18位半形英文數字含大小寫)" required />
                        </div>
                        <div>
                            <NavLink to="/" className="btn btn-primary-600 w-100 p-2">送出</NavLink>
                        </div>
                    </form>    
                </div>  
            </div>
        </>
    )
}

export default FotgetPasswordStep3