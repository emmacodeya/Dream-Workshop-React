import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
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
import ActivityCasper from "./pages/ActivityCasper";
import ArticleContent from "./pages/ArticleContent";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import EmailVerify from "./pages/EmailVerify";
import FillInfo from "./pages/FillInfo";
import FotgetPasswordStep1 from "./pages/FotgetPasswordStep1"
import FotgetPasswordStep2 from "./pages/FotgetPasswordStep2"
import FotgetPasswordStep3 from "./pages/FotgetPasswordStep3"
import PayPlan from "./pages/PayPlan"
import CheckOutPage from "./pages/Checkout/CheckOutPage";



const basename = import.meta.env.MODE === "development" ? "/" : "/Dream-Workshop-React";

function App() {
  return (
    <Router  basename={basename} >
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
