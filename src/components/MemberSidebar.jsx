import { useState, useEffect, useMemo  } from "react";
import { NavLink, useLocation } from "react-router-dom";

const MemberSidebar = () => {
  const location = useLocation();
  const [sidebarKey, setSidebarKey] = useState(0);

  // 定義頁面標題
  const pageTitles = useMemo(() => ({
    "/member": "個人資料",
    "/member/identity": "身分審核",
    "/member/change-password": "修改密碼",
    "/member/points": "可用點數",
    "/member/settings": "隱私設置",
    "/member/new-projects": "新增創業項目",
    "/member/created-projects": "已建創業項目",
    "/member/new-investor": "建立/修改投資人資料",
    "/member/evaluate-projects": "創業項目評價",
    "/member/evaluate-investor": "投資人評價",
    "/member/collect-projects": "創業項目收藏列表",
    "/member/collect-investor": "投資人收藏列表",
    "/member/apply-activity": "已申請活動",
    "/member/activity-record": "活動紀錄",
    "/member/site-news": "站內消息",
    "/member/post-article": "新增文章",
    "/member/post-list": "發文列表",
    "/member/article-message": "查看留言",
  }), []);

  // 手機版標題
  const [mobileTitle, setMobileTitle] = useState(pageTitles[location.pathname] || "會員中心");
  
  useEffect(() => {
    setMobileTitle(pageTitles[location.pathname] || "會員中心");
  }, [location.pathname, pageTitles]);
  

  useEffect(() => {
    const offcanvasElement = document.getElementById("offcanvasSidebar");
  
    const updateSidebarOnOpen = () => {
      setSidebarKey((prevKey) => prevKey + 1);
    };
  
    offcanvasElement.addEventListener("show.bs.offcanvas", updateSidebarOnOpen);
  
    return () => {
      offcanvasElement.removeEventListener("show.bs.offcanvas", updateSidebarOnOpen);
    };
  }, []);
  
  

  return (
    <>
      {/* 電腦版 Sidebar */}
      <div className="d-flex flex-column p-3 text-white sidemenu-link d-none d-lg-block bg-gray-1000 bg-opacity-75">
        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4">我的帳戶</li>
          <li>
            <NavLink  to="/member" 
             end
             className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
             >
              個人資料
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/identity" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
           >
              身分審核
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/change-password" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
            >
              修改密碼
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/points" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
            >
              可用點數
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/settings" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
            >
              隱私設置
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">創業項目</li>
          <li>
            <NavLink  to="/member/new-projects" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
            >
              新增創業項目
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/created-projects" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
           >
              已建創業項目
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">投資人</li>
          <li>
            <NavLink  to="/member/new-investor" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
            >
            建立/修改投資人資料
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">評價紀錄</li>
          <li>
            <NavLink  to="/member/evaluate-projects" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
            >
            創業項目評價
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/evaluate-investor" 
            className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
            >
            投資人評價
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">我的收藏</li>
          <li>
            <NavLink  to="/member/collect-projects" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}
           >
            創業項目收藏列表
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/collect-investor" 
          className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
            >
            投資人收藏列表
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">我的活動</li>
          <li>
            <NavLink  to="/member/apply-activity" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            已申請活動
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/activity-record" 
         className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
            >
            活動紀錄
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">我的消息</li>
          <li>
            <NavLink  to="/member/site-news" 
         className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}
           >
            站內消息
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">討論區</li>
          <li>
            <NavLink  to="/member/post-article" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            新增文章
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/post-list" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            發文列表
            </NavLink >
          </li>
          <li>
            <NavLink  to="/member/article-message" 
           className={({ isActive }) => `nav-link fs-5 ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            查看留言
            </NavLink >
          </li>
        </ul>
      </div>

      {/* 手機版 Sidebar */}
      <div className="d-block d-lg-none">
        <a className="btn border-bottom w-100 px-0" data-bs-toggle="offcanvas" href="#offcanvasSidebar" role="button">
          <div className="d-flex align-items-center text-gray-100 fs-5">
            <img src="https://dream-workshop-api.onrender.com/assets/images/icons/sidebar.png" alt="sidebar" style={{ width: "40px", height: "40px" }} />
            <p className="ps-1 fw-bold">{mobileTitle}</p>
          </div>
        </a>

        <div className="offcanvas offcanvas-start bg-gray-1000 opacity-75" id="offcanvasSidebar">
          <div className="offcanvas-header border-bottom">
            <h5 className="text-primary-600 fw-bold fs-5">會員中心</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body overflow-y-auto"  style={{
            maxHeight: 'calc(100vh - 60px)',
            overflowY: 'auto',
            paddingBottom: '100px' 
          }}>
            <ul className="flex-column fw-bold list-unstyled">
              <li className="nav-link text-gray-400 fs-5">我的帳戶</li>
              <li>
                <NavLink key={sidebarKey}  to="/member" end 
               className={({ isActive }) => `nav-link   ps-1 lh-lg pt-2 ${isActive ? "text-primary-600" : "text-white"}`}
               >
                  個人資料
                </NavLink >
              </li>
              <li>
                <NavLink  key={sidebarKey} to="/member/identity" 
                 className={({ isActive }) => `nav-link  ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
                  身分審核
                </NavLink >
              </li>
              <li>
                <NavLink key={sidebarKey} to="/member/change-password" 
                 className={({ isActive }) => `nav-link  ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
                  修改密碼
                </NavLink >
              </li>
              <li>
                <NavLink key={sidebarKey}  to="/member/points"  className={({ isActive }) => `nav-link   ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
                  可用點數
                </NavLink >
              </li>
              <li>
                <NavLink key={sidebarKey} to="/member/settings"  className={({ isActive }) => `nav-link   ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
                  隱私設置
                </NavLink >
              </li>
            </ul>
            
            <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">創業項目</li>
          <li>
            <NavLink key={sidebarKey} to="/member/new-projects" className={({ isActive }) => `nav-link  ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
              新增創業項目
            </NavLink >
          </li>
          <li>
            <NavLink key={sidebarKey} to="/member/created-projects" className={({ isActive }) => `nav-link   ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
              已建創業項目
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">投資人</li>
          <li>
            <NavLink key={sidebarKey} to="/member/new-investor" className={({ isActive }) => `nav-link  ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            建立/修改投資人資料
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">評價紀錄</li>
          <li>
          <NavLink key={sidebarKey} to="/member/evaluate-projects" className={({ isActive }) => `nav-link   ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            創業項目評價
          </NavLink >

          </li>
          <li>
            <NavLink key={sidebarKey} to="/member/evaluate-investor" className={({ isActive }) => `nav-link   ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            投資人評價
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">我的收藏</li>
          <li>
            <NavLink key={sidebarKey} to="/member/collect-projects" className={({ isActive }) => `nav-link  ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            創業項目收藏列表
            </NavLink >
          </li>
          <li>
            <NavLink key={sidebarKey} to="/member/collect-investor" className={({ isActive }) => `nav-link  ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            投資人收藏列表
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">我的活動</li>
          <li>
          <NavLink key={sidebarKey} to="/member/apply-activity" className={({ isActive }) => `nav-link   ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
          已申請活動
        </NavLink>

          </li>
          <li>
            <NavLink key={sidebarKey} to="/member/activity-record" className={({ isActive }) => `nav-link   ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            活動紀錄
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">我的消息</li>
          <li>
            <NavLink key={sidebarKey} to="/member/site-news" className={({ isActive }) => `nav-link   ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            站內消息
            </NavLink >
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">討論區</li>
          <li>
            <NavLink key={sidebarKey} to="/member/post-article" className={({ isActive }) => `nav-link   ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            新增文章
            </NavLink >
          </li>
          <li>
            <NavLink key={sidebarKey}  to="/member/post-list" className={({ isActive }) => `nav-link  ps-1 lh-lg ${isActive ? "text-primary-600" : "text-white"}`}>
            發文列表
            </NavLink >
          </li>
          <li>
            <NavLink  key={sidebarKey} to="/member/article-message" className={({ isActive }) => `nav-link   ps-1 lh-lg pb-2 ${isActive ? "text-primary-600" : "text-white"}`}>
            查看留言
            </NavLink >
          </li>
        </ul>

          </div>
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
