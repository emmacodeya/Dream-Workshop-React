import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminAccount from "./AdminAccount";
import AdminProjects from "./AdminProjects";
import AdminInvestors from "./AdminInvestors";
import AdminArticles from "./AdminArticles";
import AdminActivities from "./AdminActivities";




const AdminHome = () => {
  const [activeSection, setActiveSection] = useState("accounts");

  return (
    <div className="container-fluid admin">
      <div className="row vh-100">
        <div className="col-2 bg-dark pt-5">
           <div className="d-flex align-items-center mb-4 ps-3">
            <img src="https://dream-workshop-api.onrender.com/assets/images/創夢工坊-logo.png" alt="Logo" style={{ width: "40px", height: "40px" }} className="me-2" />
            <span className="fs-6 text-white ">Dream Workshop</span>
          </div>


          <AdminSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        </div>

        <div className="col-10 py-5">
          <div className="container">
            <div className={`content-section text-white ${activeSection === "accounts" ? "d-block" : "d-none"}`}>
            <AdminAccount />
            </div>
            <div className={`content-section text-white ${activeSection === "startups" ? "d-block" : "d-none"}`}>
            <AdminProjects />
            </div>
            <div className={`content-section text-white ${activeSection === "investors" ? "d-block" : "d-none"}`}>
            <AdminInvestors />
            </div>
            <div className={`content-section text-white ${activeSection === "activities" ? "d-block" : "d-none"}`}>
            <AdminActivities />
            </div>
            <div className={`content-section text-white ${activeSection === "pricingPlan" ? "d-block" : "d-none"}`}>
              <h2>點數管理</h2>
            </div>
            <div className={`content-section text-white ${activeSection === "transactions" ? "d-block" : "d-none"}`}>
              <h2>交易管理</h2>
            </div>
            <div className={`content-section text-white ${activeSection === "articles" ? "d-block" : "d-none"}`}>
            <AdminArticles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
