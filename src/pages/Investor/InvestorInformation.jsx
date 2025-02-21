import { useState } from "react";
import { useParams } from "react-router-dom";
import InvestorSidebar from "../../components/InvestorSidebar";
import InvestorAutobiography from "./InvestorAutobiography";
import InvestorExperience from "./InvestorExperience";
import InvestorResource from "./InvestorResource";
import InvestorPhoto from "./InvestorPhoto";
import InvestorEvaluate from "./InvestorEvaluate";

// **模擬投資人資料**
const investorsData = [
  {
    id: "1",
    name: "謝阿金",
    industry: "餐飲，一般服務，批發／零售",
    capital: "40,000,000",
    fundingStart: "2024/7/25",
    image: "/assets/images/海綿寶寶.png",
  },
  {
    id: "2",
    name: "王大華",
    industry: "科技、軟體開發",
    capital: "100,000,000",
    fundingStart: "2024/8/15",
    image: "/assets/images/海綿寶寶.png",
  },
];

const InvestorInformation = () => {
  const { id } = useParams(); 
  const [activeSection, setActiveSection] = useState("autobiography");

  const investor = investorsData.find((inv) => inv.id === id);
  if (!investor) {
    return (
      <div className="text-center text-white">
        <h2>找不到該投資人</h2>
      </div>
    );
  }

  return (
    <div className="bg-green">
      <div className="container py-10">
        <div className="row g-0 py-10">
          <div className="border border-2">
            <div className="d-lg-flex">
              {/* 投資人圖片 */}
              <div className="col-lg-4 d-flex justify-content-center align-items-center mt-4">
                <img
                  src={investor.image}
                  className="img-fluid rounded"
                  alt={investor.name}
                />
              </div>

              {/* 投資人資訊 */}
              <div className="col-lg-8">
                <div className="card-body ps-5">
                  <div className="d-flex align-items-center">
                    <h1 className="fs-1 text-primary-600 fw-bold m-1">
                      {investor.name} <i className="bi bi-clipboard-check fs-3"></i>
                    </h1>
                  </div>
                  <h5 className="fs-5 text-light m-1">
                    偏好領域：{investor.industry}
                  </h5>
                  <h2 className="fs-2 m-1 text-light">
                    資金規模：NT$ {investor.capital.toLocaleString()}
                  </h2>
                  <p className="m-1 fs-6 text-gray-400">
                    開始募資時間：{investor.fundingStart}
                  </p>
                </div>
              </div>
            </div>

            {/* 按鈕 */}
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">
                合作聯繫 <i className="bi bi-unlock ps-1"></i>
              </button>
              <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">
                內容解鎖 <i className="bi bi-unlock ps-1"></i>
              </button>
            </div>
          </div>
        </div>

        {/* 側邊導覽列 */}
        <InvestorSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* 內容區塊 */}
        <div className="row">
          <div className="col">
            {activeSection === "autobiography" && <InvestorAutobiography />}
            {activeSection === "experience" && <InvestorExperience />}
            {activeSection === "resource" && <InvestorResource />}
            {activeSection === "photo" && <InvestorPhoto />}
            {activeSection === "evaluate" && <InvestorEvaluate />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorInformation;
