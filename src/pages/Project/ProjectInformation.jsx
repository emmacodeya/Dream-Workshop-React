/* eslint-disable react/react-in-jsx-scope */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectSidebar from "../../components/ProjectSidebar";
import ProjectEvaluate from "./ProjectEvaluate"; 

const API_URL = import.meta.env.VITE_API_URL;

const ProjectInformation = () => {
  const { id } = useParams();
  const [industryMap, setIndustryMap] = useState({});
  const [project, setProject] = useState(null);
  const [swot, setSwot] = useState({});
  const [team, setTeam] = useState("");
  const [marketSize, setMarketSize] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [competeDescription, setCompeteDescription] = useState("");
  const [founderInfo, setFounderInfo] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    axios.get(`${API_URL}/projects/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => console.error("Error fetching project data:", error));

    axios.get(`${API_URL}/industryOptions`)
      .then((response) => {
        const mapping = response.data.reduce((acc, item) => {
          acc[item.value] = item.label;
          return acc;
        }, {});
        setIndustryMap(mapping);
      })
      .catch((error) => console.error("Error fetching industry options:", error));
  
    axios.get(`${API_URL}/swot?projectId=${id}`)
      .then((response) => setSwot(response.data[0] || {}))
      .catch((error) => console.error("Error fetching SWOT data:", error));
  

    axios.get(`${API_URL}/teams?projectId=${id}`)
      .then((response) => setTeam(response.data[0]?.teamDescription || ""))
      .catch((error) => console.error("Error fetching team data:", error));
  

    axios.get(`${API_URL}/marketSize?projectId=${id}`)
      .then((response) => setMarketSize(response.data[0]?.content || ""))
      .catch((error) => console.error("Error fetching market size:", error));

    axios.get(`${API_URL}/models?projectId=${id}`)
      .then((response) => setBusinessModel(response.data[0]?.business_model || ""))
      .catch((error) => console.error("Error fetching business model:", error));
  

    axios.get(`${API_URL}/products?projectId=${id}`)
      .then((response) => setProductDescription(response.data[0]?.productDescription || ""))
      .catch((error) => console.error("Error fetching product description:", error));
  

    axios.get(`${API_URL}/projectCompete?projectId=${id}`)
      .then((response) => setCompeteDescription(response.data[0]?.competeDescription || ""))
      .catch((error) => console.error("Error fetching project competition:", error));
  
   
    axios.get(`${API_URL}/founderInfo?projectId=${id}`)
      .then((response) => setFounderInfo(response.data[0]?.entrepreneurDescription || ""))
      .catch((error) => console.error("Error fetching founder info:", error));
  
  }, [id]); 
  

  if (!project) {
    return <h2 className="text-center text-white">找不到該專案</h2>;
  }

  return (
    <div className="bg-green">
      <div className="container py-10">
        {/* 項目基本資訊 */}
        <div className="row g-0 py-10">
          <div className="border border-2">
            <div className="d-lg-flex">
              {/* 左側圖片 */}
              <div className="col-lg-4 d-flex justify-content-center align-items-center mt-4">
                <img src={project.companyLogo} className="img-fluid rounded w-50" alt={project.name} />
              </div>

              {/* 右側文字資訊 */}
              <div className="col-lg-8">
                <div className="card-body ps-5">
                  <h1 className="fs-1 text-primary-600 fw-bold my-5">
                    {project.name} <i className="bi bi-clipboard-check fs-3"></i>
                  </h1>
                  <h5 className="fs-5 text-light m-1">公司成立狀態：{project.status === "established" ? "已成立" : "未成立"}</h5>
                  <h5 className="fs-5 text-light m-1">產業分類：{industryMap[project.industry] || "未知"}</h5>
                  <h5 className="fs-5 text-light m-1">資本額： {parseInt(project.capital).toLocaleString()}</h5>
                  <h1 className="fs-2 mx-1 my-5 text-light">募資金額：{parseInt(project.funding).toLocaleString()}</h1>
                  <p className="m-1 fs-6 text-gray-00">地址：{project.address}</p>
                </div>
              </div>
            </div>
                {/* 按鈕 */}
                <div className="d-flex justify-content-center mt-5">
                  <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">
                    合作聯繫 <i className="bi bi-unlock ps-1"></i>
                  </button>
                  <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">
                    內容解鎖 <i className="bi bi-unlock ps-1"></i>
                  </button>
                </div>
          </div>
        </div>

        {/* 側邊導航 */}
        {project && (
        <ProjectSidebar 
          projectName={project.name || "未命名專案"} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      )}

        {/* 內容區域 */}
        <div className="row">
          <div className="col">
            {activeSection === "introduction" && (
              <div className="py-10">
                <p>{project.description}</p>
              </div>
            )}

            {activeSection === "swot" && (
              <div className="py-10">
                <p>優勢：{swot.strengths}</p>
                <p>劣勢：{swot.weaknesses}</p>
                <p>機會：{swot.opportunities}</p>
                <p>威脅：{swot.threats}</p>
              </div>
            )}
            {activeSection === "market" && <p className="py-10">{marketSize}</p>}
            {activeSection === "model" && <p className="py-10">{businessModel}</p>}
            {activeSection === "product" && <p className="py-10">{productDescription}</p>}
            {activeSection === "compete" && <p className="py-10">{competeDescription}</p>}
            {activeSection === "entrepreneur" && <p className="py-10">{founderInfo}</p>}
            {activeSection === "team" && <p className="py-10">{team}</p>}
            {activeSection === "photo" && (
              <div className="py-10">
                {project.companyImage ? (
                  <img src={project.companyImage} className="pb-15 d-block w-50 mx-auto" alt="項目圖片" />
                ) : (
                  <p className="text-light">暫無項目照片</p>
                )}
              </div>
            )}

            {activeSection === "evaluate" && <ProjectEvaluate className="py-10" projectId={id} />}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
