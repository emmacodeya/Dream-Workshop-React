import './Header.scss'; 
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // 取得登入會員資訊
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);

        if (userData.useraccount) {
          axios.get(`${API_URL}/members?useraccount=${userData.useraccount}`)
            .then((response) => {
              if (response.data.length > 0) {
                setCurrentUser(response.data[0]); 
              } else {
                setCurrentUser(null);
              }
            })
            .catch((error) => {
              console.error("取得會員資料失敗:", error);
              setCurrentUser(null);
            });
        }
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

   // 切換會員選單
   const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="header navbar navbar-expand-lg fixed-top">
      <div className="container d-flex justify-content-center">
        <div className="d-flex justify-content-between align-items-center me-auto">
          <NavLink className="navbar-brand" to="/">
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

        {/* 顯示會員資訊 */}
        {currentUser ? (
            <div className="user-menu">
              <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
                {/* 會員名稱 */}
                <span className="me-2">👋 歡迎, {currentUser.name || "使用者"}</span>
                <NavLink to="/member" className="d-flex align-items-center text-decoration-none">

                  {/* 會員頭像 */}
                  {currentUser.avatar?.trim() ? (
                    <img 
                      src={currentUser.avatar} 
                      alt="會員頭像"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                      className="me-2"
                    />
                  ) : (
                    <div className="avatar-placeholder me-2">H</div> 
                  )}

                
                </NavLink>

                {/* 會員選單展開按鈕 */}
                <i className={`bi ${isMenuOpen ? "bi-chevron-up" : "bi-chevron-down"}`} onClick={toggleMenu}></i>
              </div>

              {/* 會員中心選單 */}
              {isMenuOpen && (
                <div className="dropdown-menu bg-gray-800 show p-3 shadow ">
                  <NavLink className="dropdown-item text-white" end to="/member">會員中心</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/created-projects">創業項目</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/new-investor">投資人</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/evaluate-projects">創業項目評價</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/evaluate-investor">投資人評價</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/collect-projects">創業項目收藏</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/collect-investor">投資人收藏</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/activity-record">活動紀錄</NavLink>
                  <NavLink className="dropdown-item text-white" to="/member/site-news">站內消息</NavLink>
                  <NavLink className="dropdown-item text-white" to="/discuss">討論區</NavLink>
                  <button onClick={handleLogout} className="dropdown-item text-danger">會員登出</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="btn login-btn btn-primary-600 d-none d-lg-block">
              註冊/登入
            </NavLink>
          )}

      </div>
    </nav>
  );
};

export default Header;
