import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FillInfo = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const navigate = useNavigate();

    const handleCompleteRegistration = async () => {
      try {
        await axios.post("http://localhost:5000/register", { email, password, name, phone, gender });
        alert("Registration complete!");
        navigate("/");
      } catch (error) {
        console.error("Registration failed", error);
      }
    };

    return (
      <>
         <div className="container">
        <div className="login">
        <div
            className="position-relative mb-6"
            style={{width: "90%", margin: "0"}}>
            <div className="progress" style={{height: "1px"}}>
              <div
                className="progress-bar bg-primary-600"
                role="progressbar"
                style={{width: "100"}}
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
              className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-gray-600 rounded-pill"
              style={{width: "2rem", height:"2rem"}}
            >
              2
            </button>
            <button
              type="button"
              className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary-600 rounded-pill"
              style={{width: "3rem", height:"3rem"}}
            >
              3
            </button>
          </div>
          <h2 className="mt-8 mb-8">填寫會員資料</h2>
            <form className="row needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="text" className="text-gray-100 fs-5 mb-2">姓名</label>
                    <input 
                    id="text" 
                    type="text" 
                    className="login-input form-control" 
                    placeholder="請輸入密碼"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="text-gray-100 fs-5 mb-2">手機號碼</label>
                    <input 
                    id="number" 
                    type="text" 
                    className="login-input form-control mb-2" 
                    placeholder="請輸入密碼"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <p>性別</p>
                    <div className="form-check form-check-inline">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        name="male" 
                        id="male" 
                        value={gender} onChange={(e) => setGender(e.target.value)}/>
                        <label className="form-check-label text-gray-100" htmlFor="inlineRadio1">男</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        name="female" 
                        id="female" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}/>
                        <label className="form-check-label text-gray-100" htmlFor="inlineRadio2">女</label>
                    </div>
                    <small className="text-danger">此選項確定後無法再修改</small>
                </div>
                
                <div className="mb-5">
                    <NavLink 
                    to="/" 
                    className="btn btn-primary-600 w-100 p-2"
                    onClick={handleCompleteRegistration}>
                      送出
                    </NavLink>
                </div>
                <div>
                    <a href="email-verify.html" className="btn btn-outline-primary-600 w-100 p-2">回前頁</a>
                </div>
            </form> 
        </div>  
    </div>
      </>
    );
  };
  
  export default FillInfo;
  