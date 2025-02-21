import { Routes, Route, useLocation, Link } from "react-router-dom";
import MemberSidebar from "../../components/MemberSidebar";
import MemberInfo from "./MemberInfo";
import MemberIdentity from "./MemberIdentity";
import MemberChangePassword from "./MemberChangePassword";
import MemberPoints from "./MemberPoints";
import MemberSettings from "./MemberSettings";
import MemberNewProjects from "./MemberNewProjects";
import MemberCreatedProjects from "./MemberCreatedProjects";
import MemberNewInvestor from "./MemberNewInvestor";
import MemberEvaluateProjects from "./MemberEvaluateProjects";
import MemberEvaluateInvestor from "./MemberEvaluateInvestor";
import MemberCollectProjects from "./MemberCollectProjects";
import MemberCollectInvestor from "./MemberCollectInvestor";
import MemberApplyActivity from "./MemberApplyActivity";
import MemberActivityRecord from "./MemberActivityRecord";
import MemberSiteNews from "./MemberSiteNews";
import MemberPostArticle from "./MemberPostArticle";
import MemberPostList from "./MemberPostList";
import MemberArticleMessage from "./MemberArticleMessage";
import './MemberHome.scss';


import "bootstrap/dist/css/bootstrap.min.css";
import "./MemberHome.scss";

const MemberHome = () => {
  const location = useLocation();

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

  const currentPageTitle = pageTitles[location.pathname] || "會員中心";

  return (
    <div className="bg-green py-15">
      {/* 麵包屑 */}
      <section className="container pt-8 d-lg-block d-none">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-white">
              <Link to="/">首頁</Link>
            </li>
            <i className="bi bi-caret-right-fill text-white"></i>
            <li className="breadcrumb-item text-white">
              <Link to="/member">會員中心</Link>
            </li>
            <i className="bi bi-caret-right-fill text-white"></i>
            <li className="breadcrumb-item text-white fw-bold active">
              {currentPageTitle}
            </li>
          </ol>
        </nav>
        <h2 className="text-primary-600 py-1 fw-bold border-bottom pb-8">
          會員中心
        </h2>
      </section>

      {/* 會員中心內容*/}
      <div className="container"> 
        <div className="row">
          <aside className="col-lg-3">
            <MemberSidebar />
          </aside>
          <main className="col-lg-9">
            <Routes>
              <Route path="/" element={<MemberInfo />} />
              <Route path="identity" element={<MemberIdentity />} />
              <Route path="change-password" element={<MemberChangePassword />} />
              <Route path="points" element={<MemberPoints />} />
              <Route path="settings" element={<MemberSettings />} />
              <Route path="new-projects" element={<MemberNewProjects />} />
              <Route path="created-projects" element={<MemberCreatedProjects />} />
              <Route path="new-investor" element={<MemberNewInvestor />} />
              <Route path="evaluate-projects" element={<MemberEvaluateProjects />} />
              <Route path="evaluate-investor" element={<MemberEvaluateInvestor />} />
              <Route path="collect-projects" element={<MemberCollectProjects />} />
              <Route path="collect-investor" element={<MemberCollectInvestor />} />
              <Route path="apply-activity" element={<MemberApplyActivity />} />
              <Route path="activity-record" element={<MemberActivityRecord />} />
              <Route path="site-news" element={<MemberSiteNews />} />
              <Route path="post-article" element={<MemberPostArticle />} />
              <Route path="post-list" element={<MemberPostList />} />
              <Route path="article-message" element={<MemberArticleMessage />} />
              
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MemberHome;
