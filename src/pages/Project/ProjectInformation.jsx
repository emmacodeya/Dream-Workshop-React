import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectSidebar from "../../components/ProjectSidebar";
import ProjectIntroduction from "./ProjectIntroduction";
import ProjectCompete from "./ProjectCompete"; 
import ProjectEntrepreneur from "./ProjectEntrepreneur";
import ProjectEvaluate from "./ProjectEvaluate";
import ProjectMarket from "./ProjectMarket";
import ProjectModel from "./ProjectModel";
import ProjectPhoto from "./ProjectPhoto";
import ProjectProduct from "./ProjectProduct";
import ProjectSwot from "./ProjectSwot";
import ProjectTeam from "./ProjectTeam";


// 模擬專案數據
const projectData = [
  {
    id: "1",
    name: "林媽媽中式餐館",
    status: "未設立",
    industry: "餐飲",
    size: "10人以下",
    capital: "30,000,000",
    funding: "50,000,000",
    startDate: "2024/7/25",
    image: "/assets/images/mamacook.png",
  },
  {
    id: "2",
    name: "創新科技有限公司",
    status: "已設立",
    industry: "科技",
    size: "50人以上",
    capital: "100,000,000",
    funding: "200,000,000",
    startDate: "2023/5/12",
    image: "/assets/images/techcompany.png",
  },
];

const ProjectInformation = () => {
  const { id } = useParams(); // 獲取 URL 參數
  const [project, setProject] = useState(null);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    // 查找對應的專案
    const foundProject = projectData.find((p) => p.id === id);
    setProject(foundProject);
  }, [id]);

  // 若未找到專案，顯示錯誤訊息
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
                <img src={project.image} className="img-fluid rounded" alt={project.name} />
              </div>

              {/* 右側文字資訊 */}
              <div className="col-lg-8">
                <div className="card-body ps-5">
                  <h1 className="fs-1 text-primary-600 fw-bold m-1">
                    {project.name} <i className="bi bi-clipboard-check fs-3"></i>
                  </h1>
                  <h5 className="fs-5 text-light m-1">公司成立狀態：{project.status}</h5>
                  <h5 className="fs-5 text-light m-1">產業分類：{project.industry}</h5>
                  <h5 className="fs-5 text-light m-1">規模：{project.size}</h5>
                  <h5 className="fs-5 text-light m-1">資本額：{project.capital}</h5>
                  <h1 className="fs-2 m-1 text-light">募資金額：{project.funding}</h1>
                  <p className="m-1 fs-6 text-gray-400">開始募資時間：{project.startDate}</p>
                </div>
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">合作聯繫 <i className="bi bi-unlock ps-1"></i></button>
              <button className="btn btn-primary-600 mb-5 mx-3 rounded-2">內容解鎖 <i className="bi bi-unlock ps-1"></i></button>
            </div>
          </div>
        </div>

         {/* 側邊導航 */}
         <ProjectSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* 內容區域 */}
        <div className="row">
          <div className="col">
             {activeSection === "introduction" && <ProjectIntroduction />}
             {activeSection === "compete" && <ProjectCompete />}
             {activeSection === "entrepreneur" && <ProjectEntrepreneur />}
             {activeSection === "evaluate" && <ProjectEvaluate />}
             {activeSection === "market" && <ProjectMarket />}
             {activeSection === "model" && <ProjectModel />}
             {activeSection === "photo" && <ProjectPhoto />}
             {activeSection === "product" && <ProjectProduct />}
             {activeSection === "swot" && <ProjectSwot />}
             {activeSection === "team" && <ProjectTeam />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
