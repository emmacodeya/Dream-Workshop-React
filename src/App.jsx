/* eslint-disable react/react-in-jsx-scope */
import { HashRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useContext  } from "react";
import { UserContext } from "./context/UserContext";


// 全局元件
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

// 前台
import Home from "./pages/Home/Home";
import MemberHome from "./pages/Member/MemberHome";
import ProjectList from "./pages/Project/ProjectList";
import InvestorList from "./pages/Investor/InvestorList";
import InvestorInformation from "./pages/Investor/InvestorInformation";
import ProjectInformation from "./pages/Project/ProjectInformation";
import Discuss from "./pages/Discuss";
import PostArticle from "./pages/PostArticle";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Activity from "./pages/Activity";
import ActivityDetail from "./pages/ActivityDetail";
import ArticleContent from "./pages/ArticleContent";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import EmailVerify from "./pages/EmailVerify";
import FillInfo from "./pages/FillInfo";
import FotgetPasswordStep1 from "./pages/FotgetPasswordStep1";
import FotgetPasswordStep2 from "./pages/FotgetPasswordStep2";
import FotgetPasswordStep3 from "./pages/FotgetPasswordStep3";
import PayPlan from "./pages/PayPlan";
import CheckOutPage from "./pages/Checkout/CheckOutPage";
import IndustryList from "./pages/Home/IndustryList";
import CheckoutSuccessPage from "./pages/Checkout/CheckoutSuccessPage";
// 後台
import AdminHome from './pages/Admin/AdminHome';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

 
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Content/>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

const Content = () => {
  const location = useLocation();
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
    }
  }, [location, setCurrentUser]);

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/industry-list" element={<IndustryList />} />
        <Route path="/member/*" element={<MemberHome />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/investor" element={<InvestorList />} />
        <Route path="/investor/:id" element={<InvestorInformation />} />
        <Route path="/project/:id" element={<ProjectInformation />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/article/:id" element={<ArticleContent />} />
        <Route path="/post-article" element={<PostArticle />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/article-content" element={<ArticleContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/fill-info" element={<FillInfo />} />
        <Route path="/fotget-password-step1" element={<FotgetPasswordStep1 />} />
        <Route path="/fotget-password-step2" element={<FotgetPasswordStep2 />} />
        <Route path="/fotget-password-step3" element={<FotgetPasswordStep3 />} />
        <Route path="/pay-plan" element={<PayPlan />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        {/* 後台路由 */}
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
};


