import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; 

const Login = () => {
  const [members, setMembers] = useState({
    // username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setMembers((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}members`, {
        params: { 
          username: members.username, 
          password: members.password,
          email: members.email
        }
      });
      if (response.data.length > 0) {
        const user = response.data[0];
      
      // 儲存登入狀態到 localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      
        alert("登入成功！");
        navigate("/");
      } else {
        alert("帳號或密碼錯誤！");
      }
    } catch (error) {
      console.error("登入失敗:", error);
      alert("登入失敗，請再試一次！");
    }
  };


  return (
    <>
      <div className="container">
        <div className="login">
          <h1 className="mb-8">會員登入</h1>
          <form 
          className="row needs-validation" 
          noValidate 
          onSubmit={handleLoginSubmit}
          >
            <div className="mx-auto mb-4">
              <label htmlFor="email" className="text-gray-100 fs-5 mb-2">
                電子郵件
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="login-input form-control me-lg-3 me-1 flex-grow-1"
                placeholder="請輸入電子郵件"
                onChange={handleLogin}
                value={members.email || ""}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-gray-100 fs-5 mb-2">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="text"
                className="login-input form-control me-lg-3 me-1 flex-grow-1"
                placeholder="請輸入密碼"
                onChange={handleLogin}
                value={members.password || ""}
                required
              />
            </div>
            <div className="text-end">
              <NavLink
                to="/fotget-password-step1"
                className="text-gray-100 text-end mb-4"
              >
                忘記密碼
              </NavLink>
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary-600 w-100">
                登入
              </button>
            </div>
            <div>
              <NavLink
                to="/create-account"
                className="step-link btn btn-outline-primary-600 w-100"
                data-content="register-account"
              >
                註冊會員
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
