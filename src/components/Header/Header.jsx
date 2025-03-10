import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.scss'; 
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

   // 取得登入狀態
   useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
      } catch (error) {
        console.error("解析使用者資料失敗:", error);
        setCurrentUser(null);
      }
    }
  }, []);

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    alert("已登出！");
    navigate("/login");
  };
  return (
    <nav className="header navbar navbar-expand-lg fixed-top">
      <div className="container d-flex justify-content-center">
        <div className="d-flex justify-content-between align-items-center me-auto">
          <NavLink className="navbar-brand"  to="/">
            <img src="https://dream-workshop-api.onrender.com/assets/images/創夢工坊-logo.png" alt="創夢工坊" style={{ width: '56px' }} />
          </NavLink>
        </div>
        <button
          className="navbar-toggler btn-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon d-flex align-items-center justify-content-center">
            <i className="bi bi-list list-icon"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects">找創業項目</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/investor">找投資人</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pay-plan">付費方案</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/discuss">討論區</NavLink>
            </li>
            <li className="nav-item text-end d-lg-none mt-8 mt-lg">
              <NavLink to="/login" className="btn login-btn btn-primary-600">註冊/登入</NavLink>
            </li>
          </ul>
        </div>

        {currentUser ? (
          <>
            <span className="me-5">👋 歡迎, {currentUser.name || "使用者"}</span>
            <button
              onClick={handleLogout}
              className="btn btn-primary-600 px-3 py-1 rounded"
            >
              登出
            </button>
            
            
          </>
        ) : (
          <>
            {/* <Link to="/login" className="mr-4 hover:underline">
              登入
            </Link>
            <Link to="/register" className="hover:underline">
              註冊
            </Link> */}
             <NavLink to="/login" className="btn login-btn btn-primary-600 d-none d-lg-block">
              註冊/登入
              </NavLink>
          </>
        )}

       

       
      </div>
    </nav>
  );
};

export default Header;
