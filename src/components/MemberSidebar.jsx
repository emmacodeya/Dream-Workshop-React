import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MemberSidebar = () => {
  const location = useLocation();

  // 定義頁面標題
  const pageTitles = {
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
  };

  // 設定當前頁面標題
  const currentPageTitle = pageTitles[location.pathname] || "會員中心";

  // 手機版標題
  const [mobileTitle, setMobileTitle] = useState(currentPageTitle);

  // 更新標題
  const updateTitle = (title) => {
    setMobileTitle(title);
  };

  return (
    <>
      {/* 電腦版 Sidebar */}
      <div className="d-flex flex-column p-3 text-white sidemenu-link d-none d-lg-block bg-gray-1000 bg-opacity-75">
        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4">我的帳戶</li>
          <li>
            <Link to="/member" 
             className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("個人資料")}>
              個人資料
            </Link>
          </li>
          <li>
            <Link to="/member/identity" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/identity" ? "text-primary-600" : "text-white"}`}  
            onClick={() => updateTitle("身分審核")}>
              身分審核
            </Link>
          </li>
          <li>
            <Link to="/member/change-password" 
             className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/change-password" ? "text-primary-600" : "text-white"}`}  
            onClick={() => updateTitle("修改密碼")}>
              修改密碼
            </Link>
          </li>
          <li>
            <Link to="/member/points" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/points" ? "text-primary-600" : "text-white"}`}  
            onClick={() => updateTitle("可用點數")}>
              可用點數
            </Link>
          </li>
          <li>
            <Link to="/member/settings" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/settings" ? "text-primary-600" : "text-white"}`}
            onClick={() => updateTitle("隱私設置")}>
              隱私設置
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">創業項目</li>
          <li>
            <Link to="/member/new-projects" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/new-projects" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("新增創業項目")}>
              新增創業項目
            </Link>
          </li>
          <li>
            <Link to="/member/created-projects" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/created-projects" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("已建創業項目")}>
              已建創業項目
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">投資人</li>
          <li>
            <Link to="/member/new-investor" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/new-investor" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("建立/修改投資人資料")}>
            建立/修改投資人資料
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">評價紀錄</li>
          <li>
            <Link to="/member/evaluate-projects" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/evaluate-projects" ? "text-primary-600" : "text-white"}`}
            onClick={() => updateTitle("創業項目評價")}>
            創業項目評價
            </Link>
          </li>
          <li>
            <Link to="/member/evaluate-investor" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/evaluate-investor" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("投資人評價")}>
            投資人評價
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">我的收藏</li>
          <li>
            <Link to="/member/collect-projects" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/collect-projects" ? "text-primary-600" : "text-white"}`}
            onClick={() => updateTitle("創業項目收藏列表")}>
            創業項目收藏列表
            </Link>
          </li>
          <li>
            <Link to="/member/collect-investor" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/collect-investor" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("投資人收藏列表")}>
            投資人收藏列表
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">我的活動</li>
          <li>
            <Link to="/member/apply-activity" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/apply-activity" ? "text-primary-600" : "text-white"}`}
            onClick={() => updateTitle("已申請活動")}>
            已申請活動
            </Link>
          </li>
          <li>
            <Link to="/member/activity-record" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/activity-record" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("活動紀錄")}>
            活動紀錄
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">我的消息</li>
          <li>
            <Link to="/member/site-news" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/site-news" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("站內消息")}>
            站內消息
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-4 pt-2">討論區</li>
          <li>
            <Link to="/member/post-article" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/post-article" ? "text-primary-600" : "text-white"}`}
            onClick={() => updateTitle("新增文章")}>
            新增文章
            </Link>
          </li>
          <li>
            <Link to="/member/post-list" 
            className={`nav-link fs-5 ps-1 lh-lg ${location.pathname === "/member/post-list" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("發文列表")}>
            發文列表
            </Link>
          </li>
          <li>
            <Link to="/member/article-message" 
            className={`nav-link fs-5 ps-1 lh-lg pb-2 ${location.pathname === "/member/article-message" ? "text-primary-600" : "text-white"}`} 
            onClick={() => updateTitle("查看留言")}>
            查看留言
            </Link>
          </li>
        </ul>
      </div>

      {/* 手機版 Sidebar */}
      <div className="d-block d-lg-none">
        <a className="btn border-bottom w-100 px-0" data-bs-toggle="offcanvas" href="#offcanvasSidebar" role="button">
          <div className="d-flex align-items-center text-gray-100 fs-5">
            <img src="/assets/images/icons/sidebar.png" alt="sidebar" style={{ width: "40px", height: "40px" }} />
            <p className="ps-1 fw-bold">{mobileTitle}</p>
          </div>
        </a>

        <div className="offcanvas offcanvas-start bg-gray-1000 opacity-75" id="offcanvasSidebar">
          <div className="offcanvas-header border-bottom">
            <h5 className="text-primary-600 fw-bold fs-5">會員中心</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="flex-column fw-bold list-unstyled">
              <li className="nav-link text-gray-400 fs-5">我的帳戶</li>
              <li>
                <Link to="/member" className="nav-link text-white ps-1 lh-lg pt-2" onClick={() => updateTitle("個人資料")}>
                  個人資料
                </Link>
              </li>
              <li>
                <Link to="/member/identity" className="nav-link text-white ps-1 lh-lg" onClick={() => updateTitle("身分審核")}>
                  身分審核
                </Link>
              </li>
              <li>
                <Link to="/member/change-password" className="nav-link text-white ps-1 lh-lg" onClick={() => updateTitle("修改密碼")}>
                  修改密碼
                </Link>
              </li>
              <li>
                <Link to="/member/points" className="nav-link text-white ps-1 lh-lg" onClick={() => updateTitle("可用點數")}>
                  可用點數
                </Link>
              </li>
              <li>
                <Link to="/member/settings" className="nav-link text-white ps-1 lh-lg pb-2" onClick={() => updateTitle("隱私設置")}>
                  隱私設置
                </Link>
              </li>
            </ul>
            
            <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">創業項目</li>
          <li>
            <Link to="/member/new-projects" className="nav-link text-white  ps-1 lh-lg" onClick={() => updateTitle("新增創業項目")}>
              新增創業項目
            </Link>
          </li>
          <li>
            <Link to="/member/created-projects" className="nav-link text-white  ps-1 lh-lg pb-1" onClick={() => updateTitle("已建創業項目")}>
              已建創業項目
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">投資人</li>
          <li>
            <Link to="/member/new-investor" className="nav-link text-white  ps-1 lh-lg pb-1" onClick={() => updateTitle("建立/修改投資人資料")}>
            建立/修改投資人資料
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">評價紀錄</li>
          <li>
            <Link to="/member/evaluate-projects" className="nav-link text-white  ps-1 lh-lg" onClick={() => updateTitle("創業項目評價")}>
            創業項目評價
            </Link>
          </li>
          <li>
            <Link to="/member/evaluate-investor" className="nav-link text-white  ps-1 lh-lg pb-1" onClick={() => updateTitle("投資人評價")}>
            投資人評價
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">我的收藏</li>
          <li>
            <Link to="/member/collect-projects" className="nav-link text-white  ps-1 lh-lg" onClick={() => updateTitle("創業項目收藏列表")}>
            創業項目收藏列表
            </Link>
          </li>
          <li>
            <Link to="/member/collect-investor" className="nav-link text-white  ps-1 lh-lg pb-1" onClick={() => updateTitle("投資人收藏列表")}>
            投資人收藏列表
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">我的活動</li>
          <li>
            <Link to="/member/activity" className="nav-link text-white  ps-1 lh-lg" onClick={() => updateTitle("已申請活動")}>
            已申請活動
            </Link>
          </li>
          <li>
            <Link to="/member/activity-record" className="nav-link text-white ps-1 lh-lg pb-1" onClick={() => updateTitle("活動紀錄")}>
            活動紀錄
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">我的消息</li>
          <li>
            <Link to="/member/site-news" className="nav-link text-white  ps-1 lh-lg pb-1" onClick={() => updateTitle("站內消息")}>
            站內消息
            </Link>
          </li>
        </ul>

        <ul className="flex-column fw-bold list-unstyled">
          <li className="nav-link text-gray-400 fs-5 pt-1">討論區</li>
          <li>
            <Link to="/member/post-article" className="nav-link text-white  ps-1 lh-lg" onClick={() => updateTitle("新增文章")}>
            新增文章
            </Link>
          </li>
          <li>
            <Link to="/member/post-list" className="nav-link text-white  ps-1 lh-lg" onClick={() => updateTitle("發文列表")}>
            發文列表
            </Link>
          </li>
          <li>
            <Link to="/member/article-message" className="nav-link text-white  ps-1 lh-lg pb-1" onClick={() => updateTitle("查看留言")}>
            查看留言
            </Link>
          </li>
        </ul>

          </div>
        </div>
      </div>
    </>
  );
};

export default MemberSidebar;
