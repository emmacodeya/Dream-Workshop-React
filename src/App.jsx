import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
import ActivityCasper from "./pages/ActivityCasper";







function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/*" element={<MemberHome />} />
        <Route path="/projects" element={<ProjectList />} /> 
        <Route path="/investor" element={<InvestorList />} />
        <Route path="/investor/:id" element={<InvestorInformation />} />
        <Route path="/project/:id" element={<ProjectInformation />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/post-article" element={<PostArticle />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity-casper" element={<ActivityCasper />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
