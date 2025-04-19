import { useState } from "react";
import {  useNavigate } from "react-router-dom";


import { NavLink } from "react-router-dom";

const EmailVerify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerifyEmail = () => {
    alert("Email 驗證成功（模擬）");
    localStorage.setItem("emailVerified", "true");
    navigate('./fill-info');
  };

    return (
      <>
         <div className="container d-flex justify-content-center">
        <div className="login">
        <div
            className="position-relative mb-6"
            style={{width: "90%", margin: "0"}}>
            <div className="progress" style={{height: "1px"}}>
              <div
                className="progress-bar bg-primary-600"
                role="progressbar"
                style={{width: "50%"}}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <button
              type="button"
              className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-gray-600 rounded-pill"
              style={{width: "2rem", height:"2rem"}}
            >
              1
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary-600 rounded-pill"
              style={{width: "3rem", height:"3rem"}}
            >
              2
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-gray-600 rounded-pill"
              style={{width: "2rem", height:"2rem"}}
            >
              3
            </button>
          </div>
            <h2 className="mt-8 mb-8">信箱驗證</h2>
            <p className="mb-5">系統已寄送 E-mail 驗證信函至您的會員註冊電子信箱
                請您收到信件後於下方欄位輸入驗證碼</p>
            <form className="row needs-validation" noValidate onSubmit={handleVerifyEmail}>
                <div className="mx-auto mb-4">
                    <input 
                     value={code} 
                     onChange={(e) => setCode(e.target.value)}
                     id="number"
                     type="text" 
                     className="login-input form-control flex-grow-1 mb-1" 
                     placeholder="請輸入驗證碼" 
                     required/>
                    <button type="button" className="btn btn-primary-200 me-1">重發驗證碼</button> <span className="text-gray-200">60秒</span>  
                </div>
                
                <div className="mb-5">
                    <NavLink to="/fill-info" className="btn btn-primary-600 w-100 p-2">驗證</NavLink>
                </div>
                <div>
                    <a href="create-account.html" className="btn btn-outline-primary-600 w-100 p-2">回前頁</a>
                </div>
            </form> 
        </div>  
    </div>
      </>
    );
  };
  
  export default EmailVerify;
  