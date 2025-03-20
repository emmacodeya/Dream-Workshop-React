/* eslint-disable react/react-in-jsx-scope */
import './Header.scss'; 
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";


const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 取得登入會員資訊
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("解析使用者資料失敗:", error);
        setCurrentUser(null);
      }
    }
  }, [setCurrentUser]);

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    closeMenu();
    alert("已登出！");
    navigate("/login");
  };

  // 切換會員選單
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 關閉選單
  const closeMenu = () => {
    setIsMenuOpen(false);
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
              <NavLink to="/projects"
               className={({ isActive }) =>
                isActive
                  ? "nav-link text-primary-600"
                  : "nav-link"
              } 
              >找創業項 </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/investor" 
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-primary-600"
                  : "nav-link"
              } >找投資人</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/pay-plan" 
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-primary-600"
                  : "nav-link"
              } >付費方案</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/discuss" 
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-primary-600"
                  : "nav-link"
              } >討論區</NavLink>
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
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" end to="/member" >會員中心</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/created-projects">創業項目</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/new-investor">投資人</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/evaluate-projects">創業項目評價</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/evaluate-investor">投資人評價</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/collect-projects">創業項目收藏</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/collect-investor">投資人收藏</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/activity-record">活動紀錄</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/member/site-news">站內消息</NavLink>
                  <NavLink onClick={closeMenu} className="dropdown-item text-white" to="/discuss">討論區</NavLink>
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
