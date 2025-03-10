import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvestorSidebar from "../../components/InvestorSidebar";
import InvestorEvaluate from "./InvestorEvaluate"; 


const API_URL = import.meta.env.VITE_API_URL;

const InvestorInformation = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [industryMap, setIndustryMap] = useState({});
  const [activeSection, setActiveSection] = useState("autobiography");

  useEffect(() => {
    // 獲取投資人資訊
    axios.get(`${API_URL}/investors/${id}`)
      .then((response) => setInvestor(response.data))
      .catch((error) => console.error("Error fetching investor data:", error));

    // 獲取產業對應表
    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        const mapping = response.data.reduce((acc, item) => {
          acc[item.value] = item.label; 
          return acc;
        }, {});
        setIndustryMap(mapping);
      })
      .catch((error) => console.error("Error fetching industry options:", error));
  }, [id]);

  

  if (!investor) {
    return <h2 className="text-center text-white">找不到該投資人</h2>;
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
                  src={investor.avatar}
                  className="img-fluid rounded"
                  alt={investor.name}
                />
              </div>

              {/* 右側投資人資訊 */}
              <div className="col-lg-8">
                <div className="card-body ps-5">
                  <div className="d-flex align-items-center">
                    <h1 className="fs-1 text-primary-600 fw-bold my-5">
                      {investor.name} <i className="bi bi-clipboard-check fs-3"></i>
                    </h1>
                  </div>
                   {/* 轉換偏好領域為中文 */}
                   <h5 className="fs-5 text-light m-1">
                    偏好領域：
                    {investor.industry.map((industryKey, index) => (
                      <span key={industryKey}>
                        {industryMap[industryKey] || "未知"}
                        {index !== investor.industry.length - 1 && "，"}
                      </span>
                    ))}
                  </h5>
                  <h2 className="fs-2 mx-1 my-5 text-light">
                    資金規模： {parseInt(investor.capital).toLocaleString()}
                  </h2>
                  <p className="m-1 fs-6 text-gray-400">
                    聯絡方式：{investor.email} | {investor.mobile}
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
            {/* 自傳 */}
            {activeSection === "autobiography" && (
              <div className="py-10">
                <p className="text-gray-200">{investor.introduction}</p>
              </div>
            )}

            {/* 投資經歷 */}
            {activeSection === "experience" && (
              <div className="py-10">
                <p className="text-gray-200">{investor.experience}</p>
              </div>
            )}

            {/* 具體相關資源 */}
            {activeSection === "resource" && (
              <div className="py-10">
                <p className="text-gray-200">{investor.resources}</p>
              </div>
            )}

            {/* 照片參考 */}
            {activeSection === "photo" && (
              <div className="py-10">
                {investor.referencePhotos.map((photo, index) => (
                  <img key={index} src={photo} alt={`投資人照片 ${index + 1}`} className="img-fluid rounded mb-2" />
                ))}
              </div>
            )}

            {/* 投資人評價 */}
            {activeSection === "evaluate" && <InvestorEvaluate investorId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorInformation;
