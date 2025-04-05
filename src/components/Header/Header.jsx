import React from 'react';
import './Header.scss'; 
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarNav");
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (!navbarCollapse || !navbarToggler) return;
  
    const collapseInstance = new bootstrap.Collapse(navbarCollapse, {
      toggle: false, 
    });
  
    const onTogglerClick = (e) => {
      e.preventDefault();
      if (navbarCollapse.classList.contains("show")) {
        collapseInstance.hide();
      } else {
        collapseInstance.show();
      }
    };
  
    navbarToggler.addEventListener("click", onTogglerClick);
  
    return () => {
      navbarToggler.removeEventListener("click", onTogglerClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsMenuOpen(false);
    alert("已登出！");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (!navbarCollapse) return;

    const collapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (collapse && navbarCollapse.classList.contains("show")) {
      collapse.hide();
    }
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
        className="navbar-toggler "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="d-flex align-items-center justify-content-center">
          <i className="bi bi-list list-icon"></i>
        </span>
      </button>

<<<<<<< HEAD
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
=======
      <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/projects"  onClick={handleNavLinkClick}>找創業項目</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/investor"  onClick={handleNavLinkClick}>找投資人</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pay-plan"  onClick={handleNavLinkClick}>付費方案</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/discuss"  onClick={handleNavLinkClick}>討論區</NavLink>
          </li>
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad

          {/* 手機版會員資訊 */}
          {currentUser && (
            <li className="nav-item d-lg-none">
              <div className="bg-gray-900 text-white p-3 rounded-3 ">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={currentUser.avatar}
                      alt="會員頭像"
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      className="me-3"
                    />
<<<<<<< HEAD
                  ) : (
                    <div className="avatar-placeholder me-2"></div> 
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
=======
                    <div>
                      <div className="fw-bold">{currentUser.name}</div>
                      <div className="small text-white-50">{currentUser.points || 0} 點</div>
                    </div>
                  </div>
                  <i className={`bi ${isMenuOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
                </div>

                {isMenuOpen && (
                  <div className="mt-3">
                    <NavLink to="/member" className="dropdown-item text-white"  onClick={handleNavLinkClick}>會員中心</NavLink>
                    <NavLink to="/member/created-projects" className="dropdown-item text-white"  onClick={handleNavLinkClick}>創業項目</NavLink>
                    <NavLink to="/member/new-investor" className="dropdown-item text-white"  onClick={handleNavLinkClick}>投資人</NavLink>
                    <NavLink to="/member/evaluate-projects" className="dropdown-item text-white"  onClick={handleNavLinkClick}>創業項目評價</NavLink>
                    <NavLink to="/member/evaluate-investor" className="dropdown-item text-white"  onClick={handleNavLinkClick}>投資人評價</NavLink>
                    <NavLink to="/member/collect-projects" className="dropdown-item text-white"  onClick={handleNavLinkClick}>創業項目收藏</NavLink>
                    <NavLink to="/member/collect-investor" className="dropdown-item text-white"  onClick={handleNavLinkClick}>投資人收藏</NavLink>
                    <NavLink to="/member/activity-record" className="dropdown-item text-white"  onClick={handleNavLinkClick}>活動紀錄</NavLink>
                    <NavLink to="/member/site-news" className="dropdown-item text-white"  onClick={handleNavLinkClick}>站內消息</NavLink>
                    <NavLink to="/discuss" className="dropdown-item text-white"  onClick={handleNavLinkClick}>討論區</NavLink>
                    <button onClick={handleLogout} className="dropdown-item text-danger mt-2" >會員登出</button>
                  </div>
                )}
              </div>
            </li>
          )}
<<<<<<< HEAD
=======


          {/* 未登入：手機顯示登入按鈕 */}
          {!currentUser && (
            <li className="nav-item text-end d-lg-none mt-8 mt-lg">
              <NavLink to="/login" className="btn login-btn btn-primary-600"  onClick={handleNavLinkClick}>註冊/登入</NavLink>
            </li>
          )}
        </ul>
>>>>>>> 203eb8546c82ce3aeab4ebdb39b342f610788bad
      </div>

      {/* 桌機會員資訊（右上） */}
      {currentUser ? (
        <div className="user-menu d-none d-lg-block">
          <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
            <span className="me-2">👋 歡迎, {currentUser.name || "使用者"}</span>
            <NavLink to="/member" className="d-flex align-items-center text-decoration-none">
              {currentUser.avatar?.trim() ? (
                <img 
                  src={currentUser.avatar} 
                  alt="會員頭像"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  className="me-2"
                />
              ) : (
                <div className="avatar-placeholder me-2"></div>
              )}
            </NavLink>
            <i className={`bi ${isMenuOpen ? "bi-chevron-up" : "bi-chevron-down"}`} onClick={toggleMenu}></i>
          </div>

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
